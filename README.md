# SwipesBlue Payment Gateway Platform

SwipesBlue is a comprehensive payment gateway platform that enables **BusinessBlueprint** and **HostsBlue** to accept payments on behalf of their clients through NMI (Network Merchants Inc.) sub-merchant accounts.

## Overview

SwipesBlue acts as a payment processing hub, allowing partner platforms to:

- **Create merchant accounts** for their clients via NMI Partner API
- **Process payments** on behalf of merchants through a unified API
- **Receive real-time notifications** via webhooks for payment and merchant events
- **Manage refunds** with full or partial refund support
- **Monitor transactions** with comprehensive logging and reporting

## Architecture

```
┌─────────────────────┐         ┌─────────────────────┐
│ BusinessBlueprint   │         │    HostsBlue        │
│  (Partner Platform) │         │ (Partner Platform)  │
└──────────┬──────────┘         └──────────┬──────────┘
           │                               │
           │ API Key Authentication        │
           │                               │
           └───────────┬───────────────────┘
                       │
                       ▼
            ┌──────────────────────┐
            │    SwipesBlue API    │
            │  (Payment Gateway)   │
            └──────────┬───────────┘
                       │
           ┌───────────┼───────────┐
           │           │           │
           ▼           ▼           ▼
    ┌──────────┐ ┌─────────┐ ┌──────────┐
    │ Merchant │ │ Payment │ │ Webhook  │
    │   Mgmt   │ │Processing│ │  Events  │
    └─────┬────┘ └────┬────┘ └────┬─────┘
          │           │            │
          └───────────┼────────────┘
                      │
                      ▼
            ┌─────────────────┐
            │   NMI Gateway   │
            │ (Payment Processor)│
            └─────────────────┘
```

## Tech Stack

- **Backend:** Node.js, Express, TypeScript
- **Database:** PostgreSQL (via Neon Serverless)
- **ORM:** Drizzle ORM
- **Session Store:** PostgreSQL (connect-pg-simple)
- **Payment Gateway:** NMI (Network Merchants Inc.)
- **API Authentication:** API Key + Secret (HMAC signing)
- **Webhooks:** HMAC-SHA256 signed notifications

## Features by Phase

### ✅ Phase 1: Merchant Management

Create and manage NMI sub-merchant accounts for partner platform clients.

**Features:**
- Merchant account creation via NMI Partner API
- Multi-platform support (BusinessBlueprint, HostsBlue, SwipesBlue)
- Merchant status management (pending, active, suspended, rejected)
- NMI boarding application tracking
- Merchant search and filtering by platform

**API Endpoints:**
- `POST /api/v1/merchants/create` - Create new merchant account
- `GET /api/v1/merchants` - List all merchants
- `GET /api/v1/merchants/platform/:platform` - Filter by platform
- `GET /api/v1/merchants/:id` - Get merchant details
- `PATCH /api/v1/merchants/:id/status` - Update merchant status
- `GET /api/v1/merchants/:id/nmi-status` - Check NMI application status

**Key Files:**
- `server/services/nmi-partner.ts` - NMI Partner API integration
- `shared/schema.ts:156-186` - Merchants table schema

### ✅ Phase 2: Payment Processing API

Secure API for processing payments on behalf of merchants.

**Features:**
- Payment processing with full card tokenization
- Refund support (full and partial)
- API key authentication with permissions
- Platform isolation (each platform can only access their data)
- Transaction logging with masked card details
- Support for custom merchant NMI credentials

**API Endpoints:**
- `POST /api/v1/payments/process` - Process payment (requires `process_payments` permission)
- `POST /api/v1/payments/refund` - Process refund (requires `process_refunds` permission)
- `GET /api/v1/payments/merchant/:merchantId` - Get merchant transactions
- `GET /api/v1/payments/platform/:platform` - Get platform transactions
- `GET /api/v1/payments/:transactionId` - Get transaction details

**API Key Management:**
- `POST /api/v1/api-keys/create` - Create new API key
- `GET /api/v1/api-keys` - List API keys (sanitized)
- `DELETE /api/v1/api-keys/:id` - Deactivate API key

**Key Files:**
- `server/services/merchant-payment.ts` - Payment processing service
- `server/middleware/api-auth.ts` - API authentication middleware
- `server/payment-gateways/nmi.ts` - NMI gateway integration
- `shared/schema.ts:212-243` - Partner payment transactions schema
- `shared/schema.ts:188-209` - API keys schema

### ✅ Phase 3: Webhooks and Event System

Real-time event notifications for payment and merchant events.

**Features:**
- Webhook registration and management
- HMAC-SHA256 signed webhooks for security
- Automatic retry with exponential backoff (5 attempts, 1min → 1hr)
- Event tracking and delivery logging
- Test endpoint for webhook verification
- Background worker for retry queue

**Event Types:**
- `payment.success` - Payment successfully processed
- `payment.failed` - Payment processing failed
- `payment.refunded` - Payment refunded (full or partial)
- `merchant.created` - Merchant account created
- `merchant.approved` - Merchant account activated
- `merchant.suspended` - Merchant account suspended

**API Endpoints:**
- `POST /api/v1/webhooks/register` - Register webhook endpoint
- `GET /api/v1/webhooks` - List webhooks for platform
- `DELETE /api/v1/webhooks/:id` - Remove webhook
- `POST /api/v1/webhooks/:id/test` - Send test event

**Key Files:**
- `server/services/webhook.ts` - Webhook service with delivery and retry logic
- `server/workers/webhook-retry-worker.ts` - Background worker for retries
- `shared/schema.ts:245-264` - Webhook endpoints schema
- `shared/schema.ts:266-289` - Webhook deliveries schema
- `docs/webhook-examples/` - Partner integration documentation

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (or Neon account)
- NMI Partner account credentials

### Installation

```bash
# Clone repository
git clone <repository-url>
cd swipesblue

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your credentials
```

### Environment Variables

Create a `.env` file with:

```bash
# Database
DATABASE_URL=postgresql://user:password@host:5432/swipesblue?sslmode=require

# NMI Credentials
NMI_PARTNER_ID=your_partner_id
NMI_MERCHANT_BOARDING_KEY=your_boarding_key
NMI_API_KEY=your_api_key

# Session (generate a secure random string for production)
SESSION_SECRET=your_session_secret

# Optional
NMI_PARTNER_API_URL=https://secure.nmi.com/api/v1/boarding
NODE_ENV=development
PORT=5000
```

### Database Setup

```bash
# Push schema to database
npm run db:push

# Generate Drizzle types (optional)
npm run db:generate
```

### Running the Application

```bash
# Development mode (with Vite HMR)
npm run dev

# Production build
npm run build

# Production mode
npm start
```

The server will start on `http://localhost:5000` (or the PORT specified in `.env`).

## API Authentication

All API v1 endpoints require API key authentication.

### Creating an API Key

```bash
curl -X POST http://localhost:5000/api/v1/api-keys/create \
  -H "Content-Type: application/json" \
  -d '{
    "platform": "businessblueprint",
    "name": "Production API Key",
    "permissions": ["process_payments", "process_refunds"]
  }'
```

**Response:**
```json
{
  "id": "uuid",
  "platform": "businessblueprint",
  "name": "Production API Key",
  "apiKey": "sb_live_abc123...",
  "apiSecret": "sb_secret_xyz789...",
  "permissions": ["process_payments", "process_refunds"],
  "isActive": true,
  "createdAt": "2025-01-15T10:00:00.000Z",
  "message": "API key created successfully. Save the apiKey and apiSecret - they won't be shown again."
}
```

### Using API Keys

Include the API key in the `Authorization` header:

```bash
curl -X POST http://localhost:5000/api/v1/payments/process \
  -H "Authorization: Bearer sb_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{...}'
```

Or use the `X-Api-Key` header:

```bash
curl -X POST http://localhost:5000/api/v1/payments/process \
  -H "X-Api-Key: sb_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{...}'
```

## Usage Examples

### 1. Create a Merchant Account

```bash
curl -X POST http://localhost:5000/api/v1/merchants/create \
  -H "Content-Type: application/json" \
  -d '{
    "platform": "businessblueprint",
    "platformClientId": "BB-CLIENT-123",
    "businessName": "Acme Corporation",
    "businessEmail": "merchant@acme.com",
    "businessPhone": "555-0100",
    "businessAddress": "123 Main St",
    "businessCity": "New York",
    "businessState": "NY",
    "businessZip": "10001",
    "businessCountry": "US"
  }'
```

### 2. Process a Payment

```bash
curl -X POST http://localhost:5000/api/v1/payments/process \
  -H "Authorization: Bearer sb_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "merchantId": "merchant-uuid",
    "amount": 99.99,
    "currency": "USD",
    "cardNumber": "4111111111111111",
    "cardName": "John Doe",
    "expiry": "1225",
    "cvv": "123",
    "customerEmail": "customer@example.com",
    "platformOrderId": "ORDER-789"
  }'
```

### 3. Process a Refund

```bash
curl -X POST http://localhost:5000/api/v1/payments/refund \
  -H "Authorization: Bearer sb_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "transactionId": "transaction-uuid",
    "amount": 50.00,
    "reason": "Customer requested partial refund"
  }'
```

### 4. Register a Webhook

```bash
curl -X POST http://localhost:5000/api/v1/webhooks/register \
  -H "Authorization: Bearer sb_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://businessblueprint.com/webhooks/swipesblue",
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

## Webhook Integration

Partners receive real-time notifications when events occur. See the comprehensive integration guide:

- **[Quick Start Guide](./docs/webhook-examples/QUICKSTART.md)** - Get started in 10 minutes
- **[Integration Guide](./docs/webhook-examples/README.md)** - Complete overview and best practices
- **[API Reference](./docs/webhook-examples/API-REFERENCE.md)** - Full API documentation
- **[Testing Guide](./docs/webhook-examples/TESTING.md)** - Local testing and troubleshooting

**Code Examples:**
- [Node.js / Express](./docs/webhook-examples/nodejs-express.js)
- [PHP / Laravel](./docs/webhook-examples/php-laravel.php)
- [Python / Flask](./docs/webhook-examples/python-flask.py)

## Database Schema

### Core Tables

**users** - User authentication
- id, username, password

**merchants** - NMI sub-merchant accounts
- id, platform, platformClientId, nmiMerchantId, partnerId
- Business details (name, email, phone, address)
- Status tracking (pending, active, suspended, rejected)
- NMI application data

**apiKeys** - API authentication
- id, platform, name, apiKey, apiSecret
- Permissions, isActive, lastUsedAt

**partnerPaymentTransactions** - Payment records
- id, merchantId, platform, platformOrderId
- Amount, currency, status
- Card details (masked), customer info
- Gateway response, refund tracking

**webhookEndpoints** - Webhook subscriptions
- id, platform, url, events[], secret, isActive

**webhookDeliveries** - Webhook delivery tracking
- id, endpointId, event, payload, status
- Attempts, nextRetry, response details

## Security Features

### API Security
- **API Key Authentication** - Secure key-based access control
- **Permission System** - Granular operation permissions
- **Platform Isolation** - Strict data segregation by platform
- **Request Logging** - Sanitized logs (removes sensitive data)
- **Raw Body Capture** - For webhook signature verification

### Payment Security
- **Card Masking** - Only last 4 digits stored
- **No CVV Storage** - CVV never persisted
- **Gateway Tokens** - NMI handles sensitive data
- **Merchant Validation** - Active status required for processing

### Webhook Security
- **HMAC-SHA256 Signatures** - Prevent webhook spoofing
- **Timing-Safe Comparison** - Prevent timing attacks
- **Secret Management** - Secrets shown only once
- **Platform Verification** - Webhooks scoped to platform

## Development

### Project Structure

```
swipesblue/
├── client/                  # Frontend (Vite + React)
├── server/                  # Backend (Express + TypeScript)
│   ├── db.ts               # Database connection
│   ├── index.ts            # Server entry point
│   ├── routes.ts           # API routes
│   ├── storage.ts          # Database operations
│   ├── middleware/         # Express middleware
│   │   └── api-auth.ts    # API authentication
│   ├── payment-gateways/  # Payment gateway integrations
│   │   └── nmi.ts         # NMI gateway
│   ├── services/          # Business logic
│   │   ├── merchant-payment.ts   # Payment processing
│   │   ├── nmi-partner.ts        # Merchant boarding
│   │   └── webhook.ts            # Webhook delivery
│   └── workers/           # Background jobs
│       └── webhook-retry-worker.ts
├── shared/                 # Shared code
│   └── schema.ts          # Database schema (Drizzle)
├── docs/                  # Documentation
│   └── webhook-examples/  # Partner integration guides
├── drizzle.config.ts      # Drizzle ORM configuration
├── package.json
└── README.md
```

### Available Scripts

```bash
# Development
npm run dev              # Start dev server with hot reload
npm run build            # Build for production
npm start                # Start production server

# Database
npm run db:push          # Push schema changes to database
npm run db:generate      # Generate migration files

# Code Quality
npm run check            # TypeScript type checking
```

### Adding New Features

1. **Update Schema** - Add tables/columns in `shared/schema.ts`
2. **Add Storage Methods** - Implement in `server/storage.ts`
3. **Create Service** - Add business logic in `server/services/`
4. **Add Routes** - Define endpoints in `server/routes.ts`
5. **Push Database** - Run `npm run db:push`

## Monitoring and Logging

### Request Logging

All API requests are logged with:
- HTTP method and path
- Status code and duration
- Response data (sanitized - removes card details)

### Webhook Logging

Webhook system logs:
- Event deliveries and retries
- Success/failure status
- HTTP response codes
- Error messages

### Background Workers

The webhook retry worker logs:
- Worker start/stop
- Retry batch processing
- Individual delivery attempts

## Production Deployment

### Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use strong `SESSION_SECRET`
- [ ] Configure production `DATABASE_URL`
- [ ] Set up HTTPS/SSL
- [ ] Enable firewall rules
- [ ] Set up monitoring/alerts
- [ ] Configure log aggregation
- [ ] Set up backup strategy
- [ ] Test webhook delivery
- [ ] Document API keys securely

### Environment Setup

```bash
# Production environment variables
DATABASE_URL=postgresql://prod-user:prod-pass@prod-host/swipesblue
NMI_PARTNER_ID=prod_partner_id
NMI_MERCHANT_BOARDING_KEY=prod_boarding_key
NMI_API_KEY=prod_api_key
SESSION_SECRET=strong_random_secret_here
NODE_ENV=production
PORT=5000
```

### Scaling Considerations

- **Database Pooling** - Neon serverless handles connection pooling
- **Webhook Worker** - Deploy multiple instances for high volume
- **Session Store** - PostgreSQL session store scales with database
- **API Rate Limiting** - Add rate limiting middleware for production
- **Caching** - Consider Redis for frequently accessed data

## Support and Contribution

### Getting Help

- **Documentation** - Start with this README and `/docs` directory
- **API Reference** - See webhook API documentation in `/docs/webhook-examples`
- **Issues** - Check existing issues or create new ones

### Partner Platforms

**BusinessBlueprint** - Website builder and hosting platform
**HostsBlue** - Web hosting and domain management platform

Both platforms use SwipesBlue to process payments for their clients through managed merchant accounts.

## License

[Your License Here]

## Acknowledgments

- **NMI (Network Merchants Inc.)** - Payment gateway provider
- **Neon** - Serverless PostgreSQL hosting
- **Drizzle ORM** - TypeScript-first ORM

---

**SwipesBlue** - Powering seamless payment processing for partner platforms.

Built with ❤️ for BusinessBlueprint and HostsBlue.
