# SwipesBlue Partner Gateway - Quick Start Guide

## Overview

SwipesBlue is a complete NMI affiliate payment gateway for the TriadBlue ecosystem (BusinessBlueprint, HostsBlue, SwipesBlue).

**What's Implemented:**
- ✅ Phase 1: Merchant Management (NMI sub-merchant onboarding)
- ✅ Phase 2: Payment Processing API (process payments on behalf of merchants)
- 🔜 Phase 3: Webhooks & Event System
- 🔜 Phase 4: White-Label Virtual Terminal

## Installation

### 1. Clone & Install
```bash
cd /Users/deanlewis/Documents/swipesblue
npm install
```

### 2. Configure Environment

Create `.env` file:
```bash
cp .env.example .env
```

Edit `.env` with your credentials:
```bash
# Database (Neon PostgreSQL)
DATABASE_URL=postgresql://your_neon_connection_string

# NMI Partner Credentials
NMI_PARTNER_ID=LaskowskiD3124
NMI_MERCHANT_BOARDING_KEY=your_merchant_boarding_key
NMI_API_KEY=your_nmi_transaction_api_key

# Session
SESSION_SECRET=random_secret_string_here
```

### 3. Push Database Schema
```bash
npm run db:push
```

This creates:
- `merchants` table
- `api_keys` table
- `partner_payment_transactions` table
- Updates `payment_transactions` table

### 4. Start Server
```bash
# Development
npm run dev

# Production
npm run build
npm start
```

Server runs on `http://localhost:5000`

## Quick Test Flow

### Step 1: Create API Key

```bash
curl -X POST http://localhost:5000/api/v1/api-keys/create \
  -H "Content-Type: application/json" \
  -d '{
    "platform": "businessblueprint",
    "name": "Test API Key",
    "permissions": ["*"]
  }'
```

**Save the returned `apiKey`** - you'll need it for authentication!

### Step 2: Create Merchant

```bash
curl -X POST http://localhost:5000/api/v1/merchants/create \
  -H "Content-Type: application/json" \
  -d '{
    "businessName": "Acme Corporation",
    "businessEmail": "merchant@acme.com",
    "platform": "businessblueprint",
    "platformClientId": "BB_CLIENT_001",
    "businessAddress": "123 Main St",
    "businessCity": "New York",
    "businessState": "NY",
    "businessZip": "10001",
    "businessCountry": "US"
  }'
```

**Save the returned `merchantId`**

### Step 3: Process Payment

```bash
curl -X POST http://localhost:5000/api/v1/payments/process \
  -H "Authorization: Bearer YOUR_API_KEY_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "merchantId": "YOUR_MERCHANT_ID_HERE",
    "amount": 25.00,
    "currency": "USD",
    "cardNumber": "4111111111111111",
    "cardName": "John Doe",
    "expiry": "1225",
    "cvv": "123",
    "customerEmail": "customer@example.com",
    "customerName": "John Doe",
    "platformOrderId": "TEST_ORDER_001"
  }'
```

**Success Response:**
```json
{
  "success": true,
  "transactionId": "uuid",
  "gatewayTransactionId": "nmi-12345",
  "authCode": "ABC123",
  "amount": 25.00,
  "status": "success",
  "cardBrand": "visa",
  "cardLastFour": "1111"
}
```

### Step 4: Query Transactions

```bash
curl http://localhost:5000/api/v1/payments/merchant/YOUR_MERCHANT_ID_HERE \
  -H "Authorization: Bearer YOUR_API_KEY_HERE"
```

### Step 5: Process Refund

```bash
curl -X POST http://localhost:5000/api/v1/payments/refund \
  -H "Authorization: Bearer YOUR_API_KEY_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "transactionId": "TRANSACTION_ID_FROM_STEP_3",
    "reason": "Customer request"
  }'
```

## API Endpoints Summary

### Merchant Management (Phase 1)
```
POST   /api/v1/merchants/create           # Create merchant & NMI sub-account
GET    /api/v1/merchants                  # List all merchants
GET    /api/v1/merchants/:id              # Get merchant details
PATCH  /api/v1/merchants/:id/status       # Update merchant status
GET    /api/v1/merchants/:id/nmi-status   # Check NMI approval status
```

### Payment Processing (Phase 2)
```
POST   /api/v1/payments/process           # Process payment (requires API key)
POST   /api/v1/payments/refund            # Refund payment (requires API key)
GET    /api/v1/payments/merchant/:id      # Get merchant transactions
GET    /api/v1/payments/platform/:platform # Get platform transactions
GET    /api/v1/payments/:transactionId    # Get transaction details
```

### API Key Management
```
POST   /api/v1/api-keys/create            # Generate new API key
GET    /api/v1/api-keys                   # List all API keys
DELETE /api/v1/api-keys/:id               # Deactivate API key
```

## Integration with BusinessBlueprint

### 1. Setup (One-Time)

In your BusinessBlueprint project:

```javascript
// config/swipesblue.js
export const SWIPESBLUE_CONFIG = {
  apiUrl: 'https://swipesblue.com/api/v1',
  apiKey: process.env.SWIPESBLUE_API_KEY,
  platform: 'businessblueprint'
};
```

### 2. Create Merchant When Client Signs Up

```javascript
async function createClientMerchantAccount(client) {
  const response = await fetch(`${SWIPESBLUE_CONFIG.apiUrl}/merchants/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      businessName: client.businessName,
      businessEmail: client.email,
      platform: SWIPESBLUE_CONFIG.platform,
      platformClientId: client.id,
      businessAddress: client.address,
      businessCity: client.city,
      businessState: client.state,
      businessZip: client.zip,
    })
  });

  const { merchantId, nmiMerchantId, status } = await response.json();

  // Save these to your client record
  await updateClient(client.id, {
    swipesBlueMerchantId: merchantId,
    nmiMerchantId: nmiMerchantId,
    paymentStatus: status
  });

  return merchantId;
}
```

### 3. Process Payment for Client

```javascript
async function processClientPayment(orderId) {
  const order = await getOrder(orderId);
  const client = await getClient(order.clientId);

  const response = await fetch(`${SWIPESBLUE_CONFIG.apiUrl}/payments/process`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${SWIPESBLUE_CONFIG.apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      merchantId: client.swipesBlueMerchantId,
      amount: order.total,
      cardNumber: order.payment.cardNumber,
      cardName: order.payment.cardName,
      expiry: order.payment.expiry,
      cvv: order.payment.cvv,
      customerEmail: order.customerEmail,
      platformOrderId: order.id,
      metadata: {
        orderType: order.type,
        clientId: client.id
      }
    })
  });

  const result = await response.json();

  if (result.success) {
    await updateOrder(orderId, {
      paymentStatus: 'paid',
      transactionId: result.transactionId,
      gatewayTransactionId: result.gatewayTransactionId
    });
    return result;
  } else {
    throw new Error(result.message);
  }
}
```

## Architecture

```
BusinessBlueprint/HostsBlue (Partner Platforms)
          ↓
    [API Key Auth]
          ↓
  SwipesBlue Partner API
          ↓
    [Merchant Routing]
          ↓
      NMI Gateway
          ↓
  Card Processing Networks
```

## Revenue Model

As NMI Partner ID `LaskowskiD3124`:
- All sub-merchants created via Phase 1 are linked to your partner account
- You earn per-transaction fees + monthly residuals
- Revenue split defined in your NMI partner agreement
- Access NMI Partner Portal for revenue reports

## Security Notes

- **API Keys:** Store securely - never commit to git
- **Card Data:** Never logged or stored (processed through NMI)
- **Platform Isolation:** BB can't access HB data and vice versa
- **Permissions:** Use least-privilege principle for API keys

## Test Cards (NMI Sandbox)

- **Approved:** 4111111111111111
- **Declined:** 4000000000000002
- **Insufficient Funds:** 4000000000009995
- **Expiry:** Any future date (MMYY)
- **CVV:** Any 3-4 digits

## Documentation

- **Phase 1 Details:** `MERCHANT_API_SETUP.md`
- **Phase 2 Details:** `PAYMENT_API_PHASE2.md`
- **NMI API Docs:** https://secure.nmi.com/merchants/resources/integration/

## Troubleshooting

### "DATABASE_URL must be set"
- Ensure `.env` file exists with valid Neon PostgreSQL connection string
- Run `npm run db:push` to create tables

### "Invalid API key"
- Check Authorization header format: `Bearer sb_live_xxxxx`
- Verify API key hasn't been deactivated
- Ensure API key exists in database

### "Merchant account is pending"
- Newly created merchants start in 'pending' status
- Check NMI approval status: `GET /api/v1/merchants/:id/nmi-status`
- Approval typically takes 1-3 business days

### "Cannot process payments for merchants from other platforms"
- BusinessBlueprint API key can only process for BB merchants
- Use correct API key for the platform
- Or create 'internal' API key for testing

## Project Structure

```
swipesblue/
├── client/                 # React frontend
├── server/
│   ├── db.ts              # Database connection
│   ├── index.ts           # Express server
│   ├── routes.ts          # API endpoints
│   ├── storage.ts         # Database operations
│   ├── middleware/
│   │   └── api-auth.ts    # API authentication
│   ├── services/
│   │   ├── nmi-partner.ts # Merchant boarding
│   │   └── merchant-payment.ts # Payment processing
│   └── payment-gateways/
│       └── nmi.ts         # NMI integration
├── shared/
│   └── schema.ts          # Database schema
├── .env                   # Environment variables (git ignored)
├── .env.example           # Template
└── package.json
```

## Support

For issues:
1. Check logs: `npm run dev` shows detailed error messages
2. Verify environment variables are set correctly
3. Test with NMI sandbox credentials first
4. Review NMI transaction logs in NMI portal

## Next Steps

After getting familiar with Phases 1 & 2:
- **Phase 3:** Implement webhooks for real-time notifications
- **Phase 4:** Add white-label virtual terminal
- **Production:** Switch to production NMI credentials
- **PCI Compliance:** Implement tokenization for enhanced security

---

**You're ready to go!** Start with the Quick Test Flow above to verify your setup.
