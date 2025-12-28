# SwipesBlue Webhooks - Quick Start Guide

Get started with SwipesBlue webhooks in 10 minutes.

## What Are Webhooks?

Webhooks are real-time notifications sent from SwipesBlue to your application when payment and merchant events occur. Instead of polling our API, you receive instant updates.

## Why Use Webhooks?

- **Real-time Updates:** Know immediately when payments succeed or fail
- **Automated Workflows:** Trigger actions in your system automatically
- **Better UX:** Update order statuses and notify customers instantly
- **Reduced Load:** No need to poll our API repeatedly

## 5-Step Integration

### Step 1: Choose Your Implementation

Pick the example that matches your tech stack:

- **Node.js / Express** → [nodejs-express.js](./nodejs-express.js)
- **PHP / Laravel** → [php-laravel.php](./php-laravel.php)
- **Python / Flask** → [python-flask.py](./python-flask.py)

### Step 2: Implement Webhook Receiver

Copy the example code and customize it for your application:

```javascript
// Minimal Node.js example
const express = require('express');
const crypto = require('crypto');

const app = express();
app.use(express.json());

app.post('/webhooks/swipesblue', (req, res) => {
  // 1. Verify signature
  const signature = req.headers['x-webhook-signature'];
  const valid = verifySignature(req.body, signature, process.env.WEBHOOK_SECRET);

  if (!valid) {
    return res.status(401).send('Invalid signature');
  }

  // 2. Respond immediately
  res.status(200).send('OK');

  // 3. Process asynchronously
  processWebhook(req.body);
});

function verifySignature(payload, signature, secret) {
  const expected = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(payload))
    .digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

function processWebhook(event) {
  console.log('Processing:', event.event, event.data);
  // Add your business logic here
}

app.listen(3000);
```

**Key Requirements:**
- ✅ Verify HMAC signature
- ✅ Return 200 OK within 30 seconds
- ✅ Process events asynchronously
- ✅ Handle duplicate events (idempotency)

### Step 3: Test Locally

Use ngrok to expose your local server:

```bash
# Terminal 1: Start your server
node server.js

# Terminal 2: Start ngrok
ngrok http 3000
```

Copy the ngrok URL (e.g., `https://abc123.ngrok.io`).

### Step 4: Register Webhook

Register your webhook endpoint with SwipesBlue:

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

**Save the webhook secret from the response!**

```json
{
  "id": "webhook-id-here",
  "secret": "SAVE_THIS_SECRET",
  ...
}
```

Add the secret to your environment:

```bash
export SWIPESBLUE_WEBHOOK_SECRET="SAVE_THIS_SECRET"
```

### Step 5: Test & Verify

Send a test event:

```bash
curl -X POST https://api.swipesblue.com/api/v1/webhooks/WEBHOOK_ID/test \
  -H "Authorization: Bearer YOUR_API_KEY"
```

Check your server logs - you should see:
```
Processing: payment.success { test: true, message: 'This is a test webhook event' }
```

✅ **Success!** Your webhook receiver is working.

---

## Event Handling

Handle each event type based on your business logic:

### payment.success

**When:** Payment successfully processed

**Action:** Update order status to "paid", send confirmation email

```javascript
function handlePaymentSuccess(data) {
  updateOrder(data.platformOrderId, {
    status: 'paid',
    transactionId: data.transactionId,
  });
  sendConfirmationEmail(data.customerEmail, data.amount);
}
```

### payment.failed

**When:** Payment processing failed

**Action:** Update order status, notify customer of failure

```javascript
function handlePaymentFailed(data) {
  updateOrder(data.platformOrderId, {
    status: 'payment_failed',
    error: data.errorMessage,
  });
  sendPaymentFailedEmail(data.customerEmail);
}
```

### payment.refunded

**When:** Payment refunded (full or partial)

**Action:** Update order status, notify customer

```javascript
function handlePaymentRefunded(data) {
  updateOrder(data.platformOrderId, {
    status: data.isFullyRefunded ? 'refunded' : 'partially_refunded',
    refundedAmount: data.totalRefunded,
  });
  sendRefundEmail(data.customerEmail, data.refundAmount);
}
```

### merchant.created

**When:** New merchant account created

**Action:** Update client record with merchant ID

```javascript
function handleMerchantCreated(data) {
  updateClient(data.platformClientId, {
    merchantId: data.merchantId,
    merchantStatus: data.status,
  });
}
```

### merchant.approved

**When:** Merchant account approved (can now accept payments)

**Action:** Enable payment processing, notify client

```javascript
function handleMerchantApproved(data) {
  updateClient(data.platformClientId, {
    merchantStatus: 'active',
    canAcceptPayments: true,
  });
  sendApprovalEmail(data.businessEmail);
}
```

### merchant.suspended

**When:** Merchant account suspended

**Action:** Disable payment processing, notify client

```javascript
function handleMerchantSuspended(data) {
  updateClient(data.platformClientId, {
    merchantStatus: 'suspended',
    canAcceptPayments: false,
  });
  sendSuspensionEmail(data.businessEmail);
}
```

---

## Production Deployment

### Checklist

Before going to production:

- [ ] Use HTTPS for webhook URL
- [ ] Verify signatures on all webhooks
- [ ] Process events asynchronously (use queue)
- [ ] Implement idempotency checks
- [ ] Add error logging and monitoring
- [ ] Test all event types
- [ ] Set up alerts for webhook failures
- [ ] Document retry behavior for your team

### Update Webhook URL

When deploying to production:

1. **Delete test webhook:**
```bash
curl -X DELETE https://api.swipesblue.com/api/v1/webhooks/TEST_WEBHOOK_ID \
  -H "Authorization: Bearer YOUR_API_KEY"
```

2. **Register production webhook:**
```bash
curl -X POST https://api.swipesblue.com/api/v1/webhooks/register \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://your-production-domain.com/webhooks/swipesblue",
    "events": ["payment.success", "payment.failed", "payment.refunded", "merchant.created", "merchant.approved", "merchant.suspended"]
  }'
```

3. **Save the new production secret**

### Environment Setup

Set these environment variables in production:

```bash
SWIPESBLUE_API_KEY=sb_live_production_key
SWIPESBLUE_API_SECRET=sb_secret_production_secret
SWIPESBLUE_WEBHOOK_SECRET=production_webhook_secret

# Optional but recommended
REDIS_URL=redis://production-redis:6379/0
DATABASE_URL=postgresql://user:pass@host/db
NODE_ENV=production
```

---

## Monitoring

Track webhook health with these metrics:

- **Success Rate:** % of webhooks processed successfully
- **Processing Time:** Average time to process events
- **Failure Count:** Number of failed webhook deliveries
- **Event Volume:** Webhooks received per hour/day

### Example Monitoring

```javascript
const metrics = {
  received: 0,
  processed: 0,
  failed: 0,
  processingTimes: [],
};

app.post('/webhooks/swipesblue', async (req, res) => {
  metrics.received++;
  const start = Date.now();

  try {
    // ... process webhook ...
    metrics.processed++;
    metrics.processingTimes.push(Date.now() - start);
    res.status(200).send('OK');
  } catch (error) {
    metrics.failed++;
    console.error('Webhook failed:', error);
    res.status(500).send('Error');
  }
});

// Log metrics every hour
setInterval(() => {
  const avgTime = metrics.processingTimes.reduce((a, b) => a + b, 0) / metrics.processingTimes.length;
  const successRate = (metrics.processed / metrics.received) * 100;

  console.log({
    received: metrics.received,
    processed: metrics.processed,
    failed: metrics.failed,
    successRate: successRate.toFixed(2) + '%',
    avgProcessingTime: avgTime.toFixed(2) + 'ms',
  });

  // Reset counters
  metrics.received = 0;
  metrics.processed = 0;
  metrics.failed = 0;
  metrics.processingTimes = [];
}, 3600000); // Every hour
```

---

## Troubleshooting

### "Invalid signature" errors

**Cause:** Signature verification failing

**Fix:**
1. Check you're using the correct webhook secret
2. Verify you're using raw request body (not parsed JSON)
3. Ensure HMAC algorithm is SHA-256

### Webhook timeouts

**Cause:** Endpoint takes too long to respond

**Fix:**
1. Return 200 immediately
2. Process asynchronously
3. Remove blocking operations

### Missing webhooks

**Cause:** Events not being received

**Fix:**
1. Verify webhook is registered
2. Check endpoint is publicly accessible
3. Test with `/test` endpoint
4. Check firewall rules

### Duplicate events

**Cause:** Same event processed multiple times

**Fix:**
1. Implement idempotency using event ID
2. Store processed event IDs
3. Check before processing

---

## Next Steps

1. **Review Full Examples:** See language-specific examples in this directory
2. **Read API Reference:** Complete API documentation in [API-REFERENCE.md](./API-REFERENCE.md)
3. **Testing Guide:** Comprehensive testing instructions in [TESTING.md](./TESTING.md)
4. **Monitor Webhooks:** Set up logging and alerting
5. **Production Deploy:** Follow production checklist above

---

## Support

Need help?

- **Documentation:** [README.md](./README.md)
- **API Reference:** [API-REFERENCE.md](./API-REFERENCE.md)
- **Testing Guide:** [TESTING.md](./TESTING.md)
- **Email:** support@swipesblue.com
- **Status:** https://status.swipesblue.com

---

## Summary

✅ **You now have:**
- Working webhook receiver
- Signature verification
- Event handling
- Idempotency checks
- Production deployment plan

✅ **Your application will:**
- Receive real-time payment notifications
- Update order statuses automatically
- Notify customers instantly
- Handle merchant account changes

**Total setup time:** ~10 minutes

**Ready to go live!** 🚀
