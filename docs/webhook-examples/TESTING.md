# Testing Your Webhook Receiver

This guide helps you test your webhook receiver implementation locally before going to production.

## Testing Locally with ngrok

Since SwipesBlue needs to send webhooks to a publicly accessible URL, you'll need to expose your local development server to the internet. The easiest way is using [ngrok](https://ngrok.com/).

### Step 1: Install ngrok

```bash
# macOS with Homebrew
brew install ngrok

# Or download from https://ngrok.com/download
```

### Step 2: Start Your Local Server

```bash
# Node.js / Express
node nodejs-express.js

# PHP / Laravel
php artisan serve

# Python / Flask
python python-flask.py
```

Your server should now be running on `http://localhost:3000` (or whatever port you configured).

### Step 3: Start ngrok Tunnel

```bash
ngrok http 3000
```

You'll see output like:
```
Forwarding  https://abc123.ngrok.io -> http://localhost:3000
```

Copy the `https://abc123.ngrok.io` URL - this is your public webhook URL.

### Step 4: Register Your Webhook

Use your ngrok URL to register the webhook with SwipesBlue:

```bash
curl -X POST https://api.swipesblue.com/api/v1/webhooks/register \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://abc123.ngrok.io/webhooks/swipesblue",
    "events": [
      "payment.success",
      "payment.failed",
      "payment.refunded",
      "merchant.created",
      "merchant.approved",
      "merchant.suspended"
    ]
  }'
```

**Save the webhook secret from the response!** You'll need it to verify signatures.

### Step 5: Test the Webhook

Use the test endpoint to send a test event:

```bash
curl -X POST https://api.swipesblue.com/api/v1/webhooks/WEBHOOK_ID/test \
  -H "Authorization: Bearer YOUR_API_KEY"
```

Check your local server logs to see if the webhook was received and processed correctly.

## Manual Testing with curl

You can also manually test your signature verification by crafting webhook requests:

### Generate HMAC Signature

**Using Node.js:**
```javascript
const crypto = require('crypto');

const secret = 'your_webhook_secret';
const payload = '{"event":"payment.success","timestamp":"2025-01-15T10:30:00.000Z","platform":"businessblueprint","data":{}}';

const signature = crypto
  .createHmac('sha256', secret)
  .update(payload)
  .digest('hex');

console.log('Signature:', signature);
```

**Using Python:**
```python
import hmac
import hashlib

secret = 'your_webhook_secret'
payload = '{"event":"payment.success","timestamp":"2025-01-15T10:30:00.000Z","platform":"businessblueprint","data":{}}'

signature = hmac.new(
    secret.encode('utf-8'),
    payload.encode('utf-8'),
    hashlib.sha256
).hexdigest()

print('Signature:', signature)
```

**Using PHP:**
```php
$secret = 'your_webhook_secret';
$payload = '{"event":"payment.success","timestamp":"2025-01-15T10:30:00.000Z","platform":"businessblueprint","data":{}}';

$signature = hash_hmac('sha256', $payload, $secret);

echo "Signature: $signature\n";
```

### Send Test Webhook

```bash
curl -X POST http://localhost:3000/webhooks/swipesblue \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Signature: YOUR_GENERATED_SIGNATURE" \
  -H "X-Webhook-Event: payment.success" \
  -H "X-Webhook-Timestamp: 2025-01-15T10:30:00.000Z" \
  -d '{
    "event": "payment.success",
    "timestamp": "2025-01-15T10:30:00.000Z",
    "platform": "businessblueprint",
    "data": {
      "transactionId": "test-transaction-123",
      "merchantId": "test-merchant-456",
      "platformOrderId": "ORDER-789",
      "gatewayTransactionId": "GTW-12345",
      "authCode": "AUTH123",
      "amount": 99.99,
      "currency": "USD",
      "cardBrand": "visa",
      "cardLastFour": "4242",
      "customerEmail": "test@example.com",
      "customerName": "Test Customer",
      "metadata": {}
    }
  }'
```

## Testing Checklist

Use this checklist to verify your webhook receiver is production-ready:

### ✅ Security

- [ ] Webhook signature is verified before processing
- [ ] Invalid signatures return 401 Unauthorized
- [ ] Signature verification uses timing-safe comparison
- [ ] Webhook secret is stored securely (environment variable)
- [ ] Raw request body is used for signature verification (not parsed JSON)

### ✅ Performance

- [ ] Webhook handler responds within 30 seconds (ideally < 1 second)
- [ ] Response sent immediately (200 OK) before processing
- [ ] Event processing happens asynchronously (queue/background job)
- [ ] No blocking operations in webhook handler

### ✅ Reliability

- [ ] Idempotency check prevents duplicate processing
- [ ] Events are stored/logged before processing
- [ ] Failed processing is logged and monitored
- [ ] Retry logic handles transient failures
- [ ] Database transactions ensure data consistency

### ✅ Event Handling

- [ ] All event types are handled correctly:
  - [ ] payment.success
  - [ ] payment.failed
  - [ ] payment.refunded
  - [ ] merchant.created
  - [ ] merchant.approved
  - [ ] merchant.suspended
- [ ] Unknown event types are logged (for future compatibility)
- [ ] Event data is validated before processing

### ✅ Monitoring

- [ ] Webhook receipts are logged
- [ ] Processing errors are logged with context
- [ ] Success/failure metrics are tracked
- [ ] Alerts configured for failures
- [ ] Dead letter queue for failed events

### ✅ Testing

- [ ] Test webhook endpoint works correctly
- [ ] All event types tested with sample data
- [ ] Signature verification tested with invalid signatures
- [ ] Idempotency tested with duplicate events
- [ ] Error handling tested with invalid data
- [ ] Performance tested under load

## Common Issues

### Signature Verification Fails

**Problem:** Webhook signature doesn't match

**Solutions:**
1. Ensure you're using the raw request body, not parsed JSON
2. Check that you're using the correct webhook secret
3. Verify HMAC algorithm is SHA-256
4. Check for encoding issues (UTF-8)

**Debug:**
```javascript
console.log('Received signature:', receivedSignature);
console.log('Expected signature:', expectedSignature);
console.log('Payload:', rawBody);
console.log('Secret length:', secret.length);
```

### Timeouts

**Problem:** Webhook times out after 30 seconds

**Solutions:**
1. Return 200 response immediately, before processing
2. Move processing to background job/queue
3. Remove blocking operations (external API calls, etc.)

**Example:**
```javascript
// Good
app.post('/webhook', (req, res) => {
  res.status(200).send('OK'); // Respond immediately
  processAsync(req.body); // Process in background
});

// Bad
app.post('/webhook', async (req, res) => {
  await processEvent(req.body); // Blocks response
  res.status(200).send('OK');
});
```

### Duplicate Events

**Problem:** Same event processed multiple times

**Solutions:**
1. Implement idempotency using event ID
2. Store processed event IDs (Redis, database)
3. Check before processing

**Example:**
```javascript
const eventId = `${event.type}-${event.data.transactionId}-${event.timestamp}`;

if (await isProcessed(eventId)) {
  console.log('Already processed');
  return;
}

await processEvent(event);
await markProcessed(eventId);
```

### Missing Events

**Problem:** Not receiving webhooks

**Solutions:**
1. Check webhook is registered correctly
2. Verify endpoint is publicly accessible
3. Check firewall/security group rules
4. Look for errors in SwipesBlue webhook delivery logs
5. Use test endpoint to verify setup

## Production Deployment

### Environment Variables

Ensure these are set in production:

```bash
SWIPESBLUE_WEBHOOK_SECRET=prod_secret_here
SWIPESBLUE_API_KEY=prod_api_key_here
SWIPESBLUE_API_SECRET=prod_api_secret_here

# Queue/Redis (for background processing)
REDIS_URL=redis://prod-redis:6379/0

# Database
DATABASE_URL=postgresql://user:pass@host/db
```

### Infrastructure Requirements

- **HTTPS:** Webhook URL must use HTTPS in production
- **Firewall:** Allow inbound HTTPS from SwipesBlue servers
- **Load Balancer:** Configure health checks on `/health` endpoint
- **Queue:** Redis, RabbitMQ, or cloud service for background jobs
- **Monitoring:** Set up logging and alerting

### Update Webhook URL

When deploying to production, update your webhook URL:

```bash
# Delete dev webhook
curl -X DELETE https://api.swipesblue.com/api/v1/webhooks/DEV_WEBHOOK_ID \
  -H "Authorization: Bearer YOUR_API_KEY"

# Register production webhook
curl -X POST https://api.swipesblue.com/api/v1/webhooks/register \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://your-production-domain.com/webhooks/swipesblue",
    "events": ["payment.success", "payment.failed", "payment.refunded", "merchant.created", "merchant.approved", "merchant.suspended"]
  }'
```

## Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review the example code for your platform
3. Test with the `/test` endpoint
4. Contact SwipesBlue support with:
   - Webhook ID
   - Event timestamp
   - Error logs
   - Your endpoint URL

Email: support@swipesblue.com
