# SwipesBlue Webhook Integration Guide

This directory contains example code for integrating with SwipesBlue's webhook notification system.

## Overview

SwipesBlue sends real-time webhook notifications to BusinessBlueprint and HostsBlue when payment and merchant events occur. Partners must implement a webhook receiver endpoint to receive these notifications.

## Security

All webhooks are signed with HMAC-SHA256 to verify authenticity. You must verify the signature before processing events.

### Signature Verification

The webhook signature is sent in the `X-Webhook-Signature` header. To verify:

1. Extract the raw request body (before parsing JSON)
2. Compute HMAC-SHA256 using your webhook secret
3. Compare with the signature header using timing-safe comparison

**Headers Sent:**
- `X-Webhook-Signature`: HMAC-SHA256 signature (hex encoded)
- `X-Webhook-Event`: Event type (e.g., "payment.success")
- `X-Webhook-Timestamp`: ISO 8601 timestamp
- `Content-Type`: application/json

## Event Types

### Payment Events

**payment.success**
```json
{
  "event": "payment.success",
  "timestamp": "2025-01-15T10:30:00.000Z",
  "platform": "businessblueprint",
  "data": {
    "transactionId": "uuid",
    "merchantId": "uuid",
    "platformOrderId": "BB-12345",
    "gatewayTransactionId": "12345678",
    "authCode": "ABC123",
    "amount": 99.99,
    "currency": "USD",
    "cardBrand": "visa",
    "cardLastFour": "4242",
    "customerEmail": "customer@example.com",
    "customerName": "John Doe",
    "metadata": {}
  }
}
```

**payment.failed**
```json
{
  "event": "payment.failed",
  "timestamp": "2025-01-15T10:30:00.000Z",
  "platform": "businessblueprint",
  "data": {
    "transactionId": "uuid",
    "merchantId": "uuid",
    "platformOrderId": "BB-12345",
    "amount": 99.99,
    "currency": "USD",
    "customerEmail": "customer@example.com",
    "errorMessage": "Insufficient funds",
    "metadata": {}
  }
}
```

**payment.refunded**
```json
{
  "event": "payment.refunded",
  "timestamp": "2025-01-15T10:30:00.000Z",
  "platform": "businessblueprint",
  "data": {
    "transactionId": "uuid",
    "merchantId": "uuid",
    "platformOrderId": "BB-12345",
    "gatewayTransactionId": "12345678",
    "originalAmount": 99.99,
    "refundAmount": 99.99,
    "totalRefunded": 99.99,
    "isFullyRefunded": true,
    "reason": "Customer requested refund",
    "customerEmail": "customer@example.com",
    "metadata": {}
  }
}
```

### Merchant Events

**merchant.created**
```json
{
  "event": "merchant.created",
  "timestamp": "2025-01-15T10:30:00.000Z",
  "platform": "businessblueprint",
  "data": {
    "merchantId": "uuid",
    "platformClientId": "BB-CLIENT-123",
    "nmiMerchantId": "NMI-12345",
    "businessName": "Acme Corp",
    "businessEmail": "merchant@acme.com",
    "status": "pending",
    "applicationId": "APP-12345"
  }
}
```

**merchant.approved**
```json
{
  "event": "merchant.approved",
  "timestamp": "2025-01-15T10:30:00.000Z",
  "platform": "businessblueprint",
  "data": {
    "merchantId": "uuid",
    "platformClientId": "BB-CLIENT-123",
    "nmiMerchantId": "NMI-12345",
    "businessName": "Acme Corp",
    "businessEmail": "merchant@acme.com",
    "status": "active"
  }
}
```

**merchant.suspended**
```json
{
  "event": "merchant.suspended",
  "timestamp": "2025-01-15T10:30:00.000Z",
  "platform": "businessblueprint",
  "data": {
    "merchantId": "uuid",
    "platformClientId": "BB-CLIENT-123",
    "nmiMerchantId": "NMI-12345",
    "businessName": "Acme Corp",
    "businessEmail": "merchant@acme.com",
    "status": "suspended"
  }
}
```

## Best Practices

### 1. Verify Signatures
Always verify the HMAC signature before processing events.

### 2. Respond Quickly
Return a 2xx status code within 30 seconds. Process events asynchronously.

```javascript
// Good
app.post('/webhooks/swipesblue', async (req, res) => {
  // Verify signature
  if (!verifySignature(req)) {
    return res.status(401).send('Invalid signature');
  }

  // Acknowledge receipt immediately
  res.status(200).send('OK');

  // Process asynchronously
  processWebhookAsync(req.body).catch(console.error);
});

// Bad - processing takes too long
app.post('/webhooks/swipesblue', async (req, res) => {
  await processWebhook(req.body); // May timeout
  res.status(200).send('OK');
});
```

### 3. Handle Idempotency
Webhooks may be delivered more than once. Use the event data to ensure idempotent processing.

```javascript
async function processPaymentSuccess(event) {
  const { transactionId } = event.data;

  // Check if already processed
  const existing = await db.webhookEvents.findOne({ transactionId });
  if (existing) {
    console.log('Event already processed:', transactionId);
    return;
  }

  // Process event
  await updateOrderStatus(event.data.platformOrderId, 'paid');

  // Mark as processed
  await db.webhookEvents.create({ transactionId, processedAt: new Date() });
}
```

### 4. Implement Retry Logic on Your Side
If your webhook processing fails, SwipesBlue will retry up to 5 times with exponential backoff. However, you should also log failures for manual review.

### 5. Monitor Webhook Health
Track webhook delivery success rates and alert on failures.

## Implementation Examples

See the language-specific examples:

- [Node.js / Express](./nodejs-express.js)
- [Node.js / NestJS](./nodejs-nestjs.ts)
- [PHP / Laravel](./php-laravel.php)
- [Python / Django](./python-django.py)
- [Python / Flask](./python-flask.py)

## Testing

Use the test endpoint to verify your webhook receiver:

```bash
POST /api/v1/webhooks/:webhookId/test
Authorization: Bearer <your-api-key>
```

This will send a test event to your endpoint.

## Troubleshooting

### Webhook Not Received
1. Check that your endpoint is publicly accessible (use ngrok for local testing)
2. Verify your firewall allows incoming requests from SwipesBlue
3. Check webhook logs in your application

### Invalid Signature Errors
1. Ensure you're using the raw request body (not parsed JSON)
2. Verify you're using the correct secret (shown only once during registration)
3. Check your HMAC implementation matches the example code

### Timeouts
1. Ensure you respond within 30 seconds
2. Move processing to background jobs
3. Return 200 immediately after signature verification

## Support

For issues or questions:
- Email: support@swipesblue.com
- Documentation: https://docs.swipesblue.com
- API Reference: https://api.swipesblue.com/docs
