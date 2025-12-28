<?php

/**
 * SwipesBlue Webhook Receiver - PHP / Laravel Example
 *
 * This example shows how to receive and verify SwipesBlue webhook events
 * in a Laravel application.
 */

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;
use App\Jobs\ProcessSwipesBlueWebhook;
use App\Models\Order;
use App\Models\Client;
use App\Notifications\PaymentConfirmation;
use App\Notifications\PaymentFailed;
use App\Notifications\RefundConfirmation;

class SwipesBlueWebhookController extends Controller
{
    /**
     * Your webhook secret (from .env)
     */
    private string $webhookSecret;

    public function __construct()
    {
        $this->webhookSecret = config('services.swipesblue.webhook_secret');
    }

    /**
     * Handle incoming webhook
     *
     * Route: POST /webhooks/swipesblue
     */
    public function handle(Request $request)
    {
        try {
            // Get signature from header
            $signature = $request->header('X-Webhook-Signature');
            $eventType = $request->header('X-Webhook-Event');
            $timestamp = $request->header('X-Webhook-Timestamp');

            if (!$signature || !$eventType) {
                Log::error('SwipesBlue webhook missing headers');
                return response('Missing headers', 400);
            }

            // Get raw body for signature verification
            $payload = $request->getContent();

            // Verify signature
            if (!$this->verifySignature($payload, $signature)) {
                Log::error('SwipesBlue webhook invalid signature');
                return response('Invalid signature', 401);
            }

            // Acknowledge receipt immediately
            // Process asynchronously using Laravel queue
            ProcessSwipesBlueWebhook::dispatch([
                'event' => $eventType,
                'timestamp' => $timestamp,
                'data' => $request->all(),
            ]);

            return response('OK', 200);

        } catch (\Exception $e) {
            Log::error('SwipesBlue webhook error: ' . $e->getMessage());
            return response('Internal server error', 500);
        }
    }

    /**
     * Verify webhook signature using HMAC-SHA256
     */
    private function verifySignature(string $payload, string $signature): bool
    {
        if (empty($payload) || empty($signature) || empty($this->webhookSecret)) {
            return false;
        }

        $expectedSignature = hash_hmac('sha256', $payload, $this->webhookSecret);

        // Timing-safe comparison
        return hash_equals($expectedSignature, $signature);
    }
}

/**
 * Webhook Processing Job
 *
 * File: app/Jobs/ProcessSwipesBlueWebhook.php
 */

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;
use App\Models\Order;
use App\Models\Client;
use App\Notifications\PaymentConfirmation;
use App\Notifications\PaymentFailed;
use App\Notifications\RefundConfirmation;
use App\Notifications\MerchantApproved;

class ProcessSwipesBlueWebhook implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 3;
    public int $timeout = 120;

    private array $webhookData;

    public function __construct(array $webhookData)
    {
        $this->webhookData = $webhookData;
    }

    public function handle()
    {
        $event = $this->webhookData['event'];
        $timestamp = $this->webhookData['timestamp'];
        $data = $this->webhookData['data']['data'];

        // Check for duplicate events (idempotency)
        $eventId = $this->getEventId($event, $data, $timestamp);

        if ($this->isEventProcessed($eventId)) {
            Log::info("SwipesBlue webhook already processed: {$eventId}");
            return;
        }

        Log::info("Processing SwipesBlue webhook: {$event}", ['eventId' => $eventId]);

        // Route to appropriate handler
        try {
            match ($event) {
                'payment.success' => $this->handlePaymentSuccess($data),
                'payment.failed' => $this->handlePaymentFailed($data),
                'payment.refunded' => $this->handlePaymentRefunded($data),
                'merchant.created' => $this->handleMerchantCreated($data),
                'merchant.approved' => $this->handleMerchantApproved($data),
                'merchant.suspended' => $this->handleMerchantSuspended($data),
                default => Log::warning("Unknown webhook event: {$event}"),
            };

            // Mark as processed
            $this->markEventProcessed($eventId);

            Log::info("SwipesBlue webhook processed successfully: {$eventId}");

        } catch (\Exception $e) {
            Log::error("Error processing SwipesBlue webhook: {$e->getMessage()}", [
                'eventId' => $eventId,
                'event' => $event,
            ]);
            throw $e; // Re-throw to trigger job retry
        }
    }

    private function handlePaymentSuccess(array $data): void
    {
        $order = Order::where('order_number', $data['platformOrderId'])->firstOrFail();

        $order->update([
            'status' => 'paid',
            'payment_status' => 'paid',
            'transaction_id' => $data['transactionId'],
            'gateway_transaction_id' => $data['gatewayTransactionId'],
            'auth_code' => $data['authCode'],
            'paid_at' => now(),
        ]);

        // Send confirmation email
        $order->customer->notify(new PaymentConfirmation($order, $data));

        Log::info("Order marked as paid: {$order->order_number}");
    }

    private function handlePaymentFailed(array $data): void
    {
        $order = Order::where('order_number', $data['platformOrderId'])->firstOrFail();

        $order->update([
            'status' => 'payment_failed',
            'payment_status' => 'failed',
            'payment_error' => $data['errorMessage'],
        ]);

        // Notify customer
        $order->customer->notify(new PaymentFailed($order, $data));

        Log::info("Order payment failed: {$order->order_number}");
    }

    private function handlePaymentRefunded(array $data): void
    {
        $order = Order::where('order_number', $data['platformOrderId'])->firstOrFail();

        $order->update([
            'status' => $data['isFullyRefunded'] ? 'refunded' : 'partially_refunded',
            'payment_status' => $data['isFullyRefunded'] ? 'refunded' : 'partially_refunded',
            'refunded_amount' => $data['totalRefunded'],
            'refund_reason' => $data['reason'] ?? null,
            'refunded_at' => now(),
        ]);

        // Notify customer
        $order->customer->notify(new RefundConfirmation($order, $data));

        Log::info("Order refunded: {$order->order_number}");
    }

    private function handleMerchantCreated(array $data): void
    {
        $client = Client::where('client_id', $data['platformClientId'])->firstOrFail();

        $client->update([
            'swipesblue_merchant_id' => $data['merchantId'],
            'nmi_merchant_id' => $data['nmiMerchantId'],
            'merchant_status' => $data['status'],
            'merchant_application_id' => $data['applicationId'],
        ]);

        Log::info("Client merchant account created: {$client->business_name}");
    }

    private function handleMerchantApproved(array $data): void
    {
        $client = Client::where('client_id', $data['platformClientId'])->firstOrFail();

        $client->update([
            'merchant_status' => 'active',
            'merchant_approved_at' => now(),
            'can_accept_payments' => true,
        ]);

        // Notify client
        $client->notify(new MerchantApproved($client));

        Log::info("Client merchant account approved: {$client->business_name}");
    }

    private function handleMerchantSuspended(array $data): void
    {
        $client = Client::where('client_id', $data['platformClientId'])->firstOrFail();

        $client->update([
            'merchant_status' => 'suspended',
            'merchant_suspended_at' => now(),
            'can_accept_payments' => false,
        ]);

        Log::warning("Client merchant account suspended: {$client->business_name}");
    }

    private function getEventId(string $event, array $data, string $timestamp): string
    {
        $identifier = $data['transactionId'] ?? $data['merchantId'] ?? 'unknown';
        return "{$event}-{$identifier}-{$timestamp}";
    }

    private function isEventProcessed(string $eventId): bool
    {
        return Cache::has("webhook:{$eventId}");
    }

    private function markEventProcessed(string $eventId): void
    {
        // Store for 24 hours
        Cache::put("webhook:{$eventId}", true, now()->addDay());
    }
}

/**
 * Routes Configuration
 *
 * File: routes/api.php
 */

// Add this to your routes/api.php:
// Route::post('/webhooks/swipesblue', [SwipesBlueWebhookController::class, 'handle'])
//     ->withoutMiddleware([\App\Http\Middleware\VerifyCsrfToken::class]);

/**
 * Service Configuration
 *
 * File: config/services.php
 */

// Add this to your config/services.php:
/*
'swipesblue' => [
    'api_key' => env('SWIPESBLUE_API_KEY'),
    'api_secret' => env('SWIPESBLUE_API_SECRET'),
    'webhook_secret' => env('SWIPESBLUE_WEBHOOK_SECRET'),
    'base_url' => env('SWIPESBLUE_BASE_URL', 'https://api.swipesblue.com'),
],
*/

/**
 * Environment Variables
 *
 * File: .env
 */

// Add these to your .env file:
// SWIPESBLUE_API_KEY=your_api_key_here
// SWIPESBLUE_API_SECRET=your_api_secret_here
// SWIPESBLUE_WEBHOOK_SECRET=your_webhook_secret_here
