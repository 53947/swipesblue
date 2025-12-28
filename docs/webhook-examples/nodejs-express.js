/**
 * SwipesBlue Webhook Receiver - Node.js / Express Example
 *
 * This example shows how to receive and verify SwipesBlue webhook events
 * in a Node.js Express application.
 */

const express = require('express');
const crypto = require('crypto');

const app = express();

// IMPORTANT: Capture raw body for signature verification
app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf.toString('utf8');
  }
}));

// Your webhook secret (received when registering the webhook)
const WEBHOOK_SECRET = process.env.SWIPESBLUE_WEBHOOK_SECRET;

/**
 * Verify webhook signature using HMAC-SHA256
 * @param {string} payload - Raw request body
 * @param {string} signature - Signature from X-Webhook-Signature header
 * @param {string} secret - Your webhook secret
 * @returns {boolean} True if signature is valid
 */
function verifyWebhookSignature(payload, signature, secret) {
  if (!payload || !signature || !secret) {
    return false;
  }

  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  // Use timing-safe comparison to prevent timing attacks
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

/**
 * Process payment.success event
 */
async function handlePaymentSuccess(data) {
  console.log('Payment successful:', data.transactionId);

  // Update order in your database
  await updateOrder(data.platformOrderId, {
    status: 'paid',
    transactionId: data.transactionId,
    gatewayTransactionId: data.gatewayTransactionId,
    authCode: data.authCode,
    paidAt: new Date(),
  });

  // Send confirmation email
  await sendPaymentConfirmationEmail(data.customerEmail, {
    amount: data.amount,
    orderId: data.platformOrderId,
    transactionId: data.transactionId,
  });

  console.log('Order updated:', data.platformOrderId);
}

/**
 * Process payment.failed event
 */
async function handlePaymentFailed(data) {
  console.log('Payment failed:', data.transactionId);

  // Update order status
  await updateOrder(data.platformOrderId, {
    status: 'payment_failed',
    errorMessage: data.errorMessage,
  });

  // Notify customer
  await sendPaymentFailedEmail(data.customerEmail, {
    orderId: data.platformOrderId,
    errorMessage: data.errorMessage,
  });
}

/**
 * Process payment.refunded event
 */
async function handlePaymentRefunded(data) {
  console.log('Payment refunded:', data.transactionId);

  // Update order
  await updateOrder(data.platformOrderId, {
    status: data.isFullyRefunded ? 'refunded' : 'partially_refunded',
    refundedAmount: data.totalRefunded,
    refundReason: data.reason,
    refundedAt: new Date(),
  });

  // Notify customer
  await sendRefundConfirmationEmail(data.customerEmail, {
    orderId: data.platformOrderId,
    refundAmount: data.refundAmount,
    isFullRefund: data.isFullyRefunded,
  });
}

/**
 * Process merchant.created event
 */
async function handleMerchantCreated(data) {
  console.log('Merchant created:', data.merchantId);

  // Update client record
  await updateClient(data.platformClientId, {
    swipesBlueeMerchantId: data.merchantId,
    nmiMerchantId: data.nmiMerchantId,
    merchantStatus: data.status,
    merchantApplicationId: data.applicationId,
  });

  // Notify client
  await sendMerchantCreatedEmail(data.businessEmail, {
    businessName: data.businessName,
    status: data.status,
  });
}

/**
 * Process merchant.approved event
 */
async function handleMerchantApproved(data) {
  console.log('Merchant approved:', data.merchantId);

  // Update client record
  await updateClient(data.platformClientId, {
    merchantStatus: 'active',
    merchantApprovedAt: new Date(),
  });

  // Enable payment processing for this client
  await enablePaymentProcessing(data.platformClientId);

  // Notify client
  await sendMerchantApprovedEmail(data.businessEmail, {
    businessName: data.businessName,
  });
}

/**
 * Process merchant.suspended event
 */
async function handleMerchantSuspended(data) {
  console.log('Merchant suspended:', data.merchantId);

  // Update client record
  await updateClient(data.platformClientId, {
    merchantStatus: 'suspended',
    merchantSuspendedAt: new Date(),
  });

  // Disable payment processing
  await disablePaymentProcessing(data.platformClientId);

  // Notify client
  await sendMerchantSuspendedEmail(data.businessEmail, {
    businessName: data.businessName,
  });
}

/**
 * Main webhook endpoint
 */
app.post('/webhooks/swipesblue', async (req, res) => {
  try {
    // Get signature from header
    const signature = req.get('X-Webhook-Signature');
    const eventType = req.get('X-Webhook-Event');
    const timestamp = req.get('X-Webhook-Timestamp');

    if (!signature || !eventType) {
      console.error('Missing webhook headers');
      return res.status(400).send('Missing headers');
    }

    // Verify signature
    if (!verifyWebhookSignature(req.rawBody, signature, WEBHOOK_SECRET)) {
      console.error('Invalid webhook signature');
      return res.status(401).send('Invalid signature');
    }

    // Acknowledge receipt immediately (before processing)
    res.status(200).send('OK');

    // Parse webhook event
    const event = req.body;

    console.log('Received webhook:', {
      event: eventType,
      timestamp: timestamp,
      platform: event.platform,
    });

    // Process asynchronously (don't block the response)
    setImmediate(async () => {
      try {
        // Check for duplicate events (idempotency)
        const eventId = `${eventType}-${event.data.transactionId || event.data.merchantId}-${timestamp}`;
        const alreadyProcessed = await isEventProcessed(eventId);

        if (alreadyProcessed) {
          console.log('Event already processed:', eventId);
          return;
        }

        // Route to appropriate handler
        switch (event.event) {
          case 'payment.success':
            await handlePaymentSuccess(event.data);
            break;

          case 'payment.failed':
            await handlePaymentFailed(event.data);
            break;

          case 'payment.refunded':
            await handlePaymentRefunded(event.data);
            break;

          case 'merchant.created':
            await handleMerchantCreated(event.data);
            break;

          case 'merchant.approved':
            await handleMerchantApproved(event.data);
            break;

          case 'merchant.suspended':
            await handleMerchantSuspended(event.data);
            break;

          default:
            console.warn('Unknown event type:', event.event);
        }

        // Mark event as processed
        await markEventProcessed(eventId);

        console.log('Webhook processed successfully:', eventId);
      } catch (error) {
        console.error('Error processing webhook:', error);
        // Log to error tracking service (Sentry, etc.)
        // Don't throw - we already responded to SwipesBlue
      }
    });

  } catch (error) {
    console.error('Webhook error:', error);
    // If we haven't responded yet, send error
    if (!res.headersSent) {
      res.status(500).send('Internal server error');
    }
  }
});

// Placeholder functions - implement based on your application
async function updateOrder(orderId, updates) {
  // Update order in your database
  console.log('Updating order:', orderId, updates);
}

async function updateClient(clientId, updates) {
  // Update client in your database
  console.log('Updating client:', clientId, updates);
}

async function sendPaymentConfirmationEmail(email, data) {
  // Send email using your email service
  console.log('Sending payment confirmation to:', email);
}

async function sendPaymentFailedEmail(email, data) {
  console.log('Sending payment failed notification to:', email);
}

async function sendRefundConfirmationEmail(email, data) {
  console.log('Sending refund confirmation to:', email);
}

async function sendMerchantCreatedEmail(email, data) {
  console.log('Sending merchant created notification to:', email);
}

async function sendMerchantApprovedEmail(email, data) {
  console.log('Sending merchant approved notification to:', email);
}

async function sendMerchantSuspendedEmail(email, data) {
  console.log('Sending merchant suspended notification to:', email);
}

async function enablePaymentProcessing(clientId) {
  console.log('Enabling payment processing for client:', clientId);
}

async function disablePaymentProcessing(clientId) {
  console.log('Disabling payment processing for client:', clientId);
}

async function isEventProcessed(eventId) {
  // Check if event was already processed (implement with Redis or database)
  // Example with Redis:
  // return await redis.exists(`webhook:${eventId}`);
  return false;
}

async function markEventProcessed(eventId) {
  // Mark event as processed (implement with Redis or database)
  // Example with Redis:
  // await redis.setex(`webhook:${eventId}`, 86400, '1'); // 24 hour TTL
  console.log('Marked event as processed:', eventId);
}

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Webhook receiver listening on port ${PORT}`);
  console.log(`Endpoint: POST http://localhost:${PORT}/webhooks/swipesblue`);
});

module.exports = app;
