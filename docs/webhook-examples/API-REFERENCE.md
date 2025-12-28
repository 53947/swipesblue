# SwipesBlue Webhook API Reference

Quick reference for managing webhooks via the SwipesBlue API.

## Authentication

All webhook endpoints require API key authentication:

```
Authorization: Bearer YOUR_API_KEY
```

Or alternatively:

```
X-Api-Key: YOUR_API_KEY
```

## Base URL

```
Production: https://api.swipesblue.com
Development: http://localhost:5000
```

---

## Register Webhook

Register a new webhook endpoint to receive event notifications.

**Endpoint:** `POST /api/v1/webhooks/register`

**Headers:**
```
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json
```

**Request Body:**
```json
{
  "url": "https://your-domain.com/webhooks/swipesblue",
  "events": [
    "payment.success",
    "payment.failed",
    "payment.refunded",
    "merchant.created",
    "merchant.approved",
    "merchant.suspended"
  ]
}
```

**Parameters:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| url | string | Yes | Your webhook endpoint URL (must be HTTPS in production) |
| events | array | Yes | Array of event types to subscribe to (minimum 1) |

**Available Event Types:**
- `payment.success` - Payment processed successfully
- `payment.failed` - Payment processing failed
- `payment.refunded` - Payment refunded (full or partial)
- `merchant.created` - Merchant account created
- `merchant.approved` - Merchant account approved (status changed to active)
- `merchant.suspended` - Merchant account suspended

**Response:** `201 Created`
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "platform": "businessblueprint",
  "url": "https://your-domain.com/webhooks/swipesblue",
  "events": [
    "payment.success",
    "payment.failed",
    "payment.refunded"
  ],
  "secret": "AbCdEfGh123456789...",
  "isActive": true,
  "createdAt": "2025-01-15T10:30:00.000Z",
  "message": "Webhook registered successfully. Save the secret - it won't be shown again."
}
```

**Important:** The `secret` is only returned once during registration. Save it securely - you'll need it to verify webhook signatures.

**Error Responses:**

`400 Bad Request` - Invalid URL or event types
```json
{
  "error": "Invalid webhook data",
  "message": "Webhook URL must use HTTP or HTTPS protocol"
}
```

`401 Unauthorized` - Invalid or missing API key
```json
{
  "error": "Unauthorized",
  "message": "Invalid API key"
}
```

---

## List Webhooks

Get all webhook endpoints for your platform.

**Endpoint:** `GET /api/v1/webhooks`

**Headers:**
```
Authorization: Bearer YOUR_API_KEY
```

**Response:** `200 OK`
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "platform": "businessblueprint",
    "url": "https://your-domain.com/webhooks/swipesblue",
    "events": ["payment.success", "payment.failed"],
    "isActive": true,
    "createdAt": "2025-01-15T10:30:00.000Z",
    "updatedAt": "2025-01-15T10:30:00.000Z"
  },
  {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "platform": "businessblueprint",
    "url": "https://backup.your-domain.com/webhooks/swipesblue",
    "events": ["merchant.created", "merchant.approved"],
    "isActive": true,
    "createdAt": "2025-01-14T08:00:00.000Z",
    "updatedAt": "2025-01-14T08:00:00.000Z"
  }
]
```

**Note:** The webhook `secret` is never returned in list/get responses for security reasons.

---

## Delete Webhook

Remove a webhook endpoint. This will also delete all delivery records.

**Endpoint:** `DELETE /api/v1/webhooks/:id`

**Headers:**
```
Authorization: Bearer YOUR_API_KEY
```

**Parameters:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string (path) | Yes | Webhook endpoint ID |

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Webhook deleted successfully"
}
```

**Error Responses:**

`404 Not Found` - Webhook doesn't exist
```json
{
  "error": "Webhook not found",
  "message": "The specified webhook endpoint does not exist"
}
```

`403 Forbidden` - Trying to delete webhook from another platform
```json
{
  "error": "Forbidden",
  "message": "Cannot delete webhooks from other platforms"
}
```

---

## Test Webhook

Send a test event to verify your webhook endpoint is configured correctly.

**Endpoint:** `POST /api/v1/webhooks/:id/test`

**Headers:**
```
Authorization: Bearer YOUR_API_KEY
```

**Parameters:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string (path) | Yes | Webhook endpoint ID |

**Response (Success):** `200 OK`
```json
{
  "success": true,
  "status": 200,
  "message": "Test webhook delivered successfully"
}
```

**Response (Failure):** `400 Bad Request`
```json
{
  "success": false,
  "message": "Failed to deliver test webhook: Connection refused"
}
```

**Test Event Format:**

The test endpoint sends a `payment.success` event with test data:

```json
{
  "event": "payment.success",
  "timestamp": "2025-01-15T10:30:00.000Z",
  "platform": "businessblueprint",
  "data": {
    "test": true,
    "message": "This is a test webhook event"
  }
}
```

**Verification:**

Your endpoint should:
1. Verify the HMAC signature in `X-Webhook-Signature` header
2. Return a 2xx status code
3. Process the test event (can ignore `data.test === true`)

---

## Webhook Delivery Format

All webhooks are delivered as HTTP POST requests with the following format:

**Headers:**
```
Content-Type: application/json
X-Webhook-Signature: abc123def456...
X-Webhook-Event: payment.success
X-Webhook-Timestamp: 2025-01-15T10:30:00.000Z
User-Agent: SwipesBlue-Webhook/1.0
```

**Body:**
```json
{
  "event": "payment.success",
  "timestamp": "2025-01-15T10:30:00.000Z",
  "platform": "businessblueprint",
  "data": {
    "transactionId": "uuid",
    "merchantId": "uuid",
    "platformOrderId": "ORDER-123",
    "amount": 99.99,
    ...
  }
}
```

### Signature Verification

The `X-Webhook-Signature` header contains an HMAC-SHA256 signature of the raw request body:

```javascript
const crypto = require('crypto');

const signature = crypto
  .createHmac('sha256', webhookSecret)
  .update(rawRequestBody)
  .digest('hex');

// Compare with X-Webhook-Signature header using timing-safe comparison
```

See the [example implementations](./README.md) for complete signature verification code.

---

## Webhook Retry Behavior

If your endpoint doesn't respond with a 2xx status code, SwipesBlue will retry delivery:

- **Max Attempts:** 5
- **Initial Delay:** 1 minute
- **Max Delay:** 1 hour
- **Backoff:** Exponential (1min, 2min, 4min, 8min, 16min → 1hr max)

**Retry Schedule:**
1. Immediate attempt (0s)
2. First retry (1 minute)
3. Second retry (2 minutes)
4. Third retry (4 minutes)
5. Fourth retry (8 minutes)
6. Fifth retry (16 minutes)

After 5 failed attempts, the delivery is marked as permanently failed.

**Best Practice:** Respond with `200 OK` immediately after verifying the signature, then process the event asynchronously.

---

## Rate Limits

- **Webhook Registration:** 10 per hour
- **Test Endpoint:** 60 per hour
- **Webhook Delivery:** No limit (event-driven)

Rate limits are per API key.

---

## Examples

### cURL Examples

**Register webhook:**
```bash
curl -X POST https://api.swipesblue.com/api/v1/webhooks/register \
  -H "Authorization: Bearer sb_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://businessblueprint.com/webhooks/swipesblue",
    "events": ["payment.success", "payment.failed", "payment.refunded"]
  }'
```

**List webhooks:**
```bash
curl https://api.swipesblue.com/api/v1/webhooks \
  -H "Authorization: Bearer sb_live_abc123..."
```

**Test webhook:**
```bash
curl -X POST https://api.swipesblue.com/api/v1/webhooks/550e8400-e29b-41d4-a716-446655440000/test \
  -H "Authorization: Bearer sb_live_abc123..."
```

**Delete webhook:**
```bash
curl -X DELETE https://api.swipesblue.com/api/v1/webhooks/550e8400-e29b-41d4-a716-446655440000 \
  -H "Authorization: Bearer sb_live_abc123..."
```

### JavaScript/Node.js Example

```javascript
const axios = require('axios');

const SWIPESBLUE_API_KEY = 'sb_live_abc123...';
const BASE_URL = 'https://api.swipesblue.com';

async function registerWebhook() {
  const response = await axios.post(
    `${BASE_URL}/api/v1/webhooks/register`,
    {
      url: 'https://businessblueprint.com/webhooks/swipesblue',
      events: [
        'payment.success',
        'payment.failed',
        'payment.refunded',
        'merchant.created',
        'merchant.approved',
        'merchant.suspended'
      ]
    },
    {
      headers: {
        'Authorization': `Bearer ${SWIPESBLUE_API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  );

  console.log('Webhook registered:', response.data);
  console.log('Secret:', response.data.secret);
  // IMPORTANT: Save this secret securely!
}

async function listWebhooks() {
  const response = await axios.get(
    `${BASE_URL}/api/v1/webhooks`,
    {
      headers: {
        'Authorization': `Bearer ${SWIPESBLUE_API_KEY}`
      }
    }
  );

  console.log('Webhooks:', response.data);
}

async function testWebhook(webhookId) {
  const response = await axios.post(
    `${BASE_URL}/api/v1/webhooks/${webhookId}/test`,
    {},
    {
      headers: {
        'Authorization': `Bearer ${SWIPESBLUE_API_KEY}`
      }
    }
  );

  console.log('Test result:', response.data);
}
```

---

## Support

For questions or issues:
- **Email:** support@swipesblue.com
- **Documentation:** https://docs.swipesblue.com
- **Status:** https://status.swipesblue.com
