# SwipesBlue Merchant Management API - Setup Guide

## Phase 1 - Task 1: Partner API for Merchant Management ✅

This implementation adds full NMI Partner API integration for creating and managing sub-merchant accounts across the TriadBlue ecosystem (BusinessBlueprint, HostsBlue, SwipesBlue).

## What's Been Implemented

### 1. Database Schema
**File:** `shared/schema.ts`

Added `merchants` table with the following fields:
- `id` - Primary key (UUID)
- `platform` - Which platform owns this merchant ('businessblueprint' | 'hostsblue' | 'swipesblue')
- `platformClientId` - The client ID from BusinessBlueprint/HostsBlue
- `nmiMerchantId` - NMI sub-merchant ID (assigned after approval)
- `partnerId` - Your NMI Partner ID (LaskowskiD3124)
- `businessName` - Legal business name
- `businessEmail` - Business contact email
- `businessPhone` - Business phone number
- `businessAddress`, `businessCity`, `businessState`, `businessZip`, `businessCountry` - Business location
- `status` - Merchant status ('pending' | 'active' | 'suspended' | 'rejected')
- `nmiApplicationStatus` - Status from NMI boarding process
- `nmiApplicationData` - Full NMI boarding response (JSON)
- `metadata` - Additional platform-specific data (JSON)
- `createdAt`, `updatedAt` - Timestamps

### 2. NMI Partner Service
**File:** `server/services/nmi-partner.ts`

Complete NMI Partner API integration with:
- `createSubMerchant()` - Submit merchant boarding application to NMI
- `getMerchantStatus()` - Check boarding application status
- `updateMerchant()` - Update merchant information
- `updateMerchantStatus()` - Activate/suspend merchant accounts

### 3. Database Operations
**File:** `server/storage.ts`

Added merchant CRUD operations:
- `getMerchant(id)` - Get merchant by ID
- `getMerchantByPlatformClientId(platform, clientId)` - Find merchant by platform client ID
- `getMerchantByNmiMerchantId(nmiMerchantId)` - Find merchant by NMI ID
- `getMerchantsByPlatform(platform)` - List all merchants for a platform
- `getAllMerchants()` - List all merchants
- `createMerchant(merchant)` - Create new merchant record
- `updateMerchant(id, updates)` - Update merchant information
- `updateMerchantStatus(id, status)` - Update merchant status

### 4. API Endpoints
**File:** `server/routes.ts`

#### POST `/api/v1/merchants/create`
Create a new merchant account via NMI Partner API.

**Request Body:**
```json
{
  "businessName": "Acme Corporation",
  "businessEmail": "merchant@acme.com",
  "businessPhone": "555-123-4567",
  "businessAddress": "123 Main St",
  "businessCity": "New York",
  "businessState": "NY",
  "businessZip": "10001",
  "businessCountry": "US",
  "platform": "businessblueprint",
  "platformClientId": "BB_CLIENT_12345",
  "dba": "Acme Store",
  "website": "https://acme.com",
  "taxId": "12-3456789",
  "businessType": "corporation",
  "merchantCategoryCode": "5999",
  "annualVolume": 500000,
  "averageTicket": 75,
  "highTicket": 500
}
```

**Response (201 Created):**
```json
{
  "merchantId": "uuid-here",
  "nmiMerchantId": "nmi-merchant-id",
  "applicationId": "application-id",
  "status": "pending",
  "message": "Merchant application submitted successfully"
}
```

**Error (409 Conflict)** - Merchant already exists:
```json
{
  "message": "Merchant already exists for this platform client",
  "merchantId": "uuid-here",
  "status": "active"
}
```

#### GET `/api/v1/merchants`
List all merchants across all platforms.

**Response:**
```json
[
  {
    "id": "uuid",
    "platform": "businessblueprint",
    "platformClientId": "BB_CLIENT_12345",
    "nmiMerchantId": "nmi-123",
    "businessName": "Acme Corporation",
    "status": "active",
    ...
  }
]
```

#### GET `/api/v1/merchants/platform/:platform`
List all merchants for a specific platform.

**Example:** `GET /api/v1/merchants/platform/businessblueprint`

#### GET `/api/v1/merchants/:id`
Get specific merchant details.

#### PATCH `/api/v1/merchants/:id/status`
Update merchant status (active, suspended, pending, rejected).

**Request Body:**
```json
{
  "status": "active"
}
```

**Note:** Setting status to 'active' or 'suspended' also updates the status in NMI.

#### GET `/api/v1/merchants/:id/nmi-status`
Check merchant application status with NMI and sync to database.

**Response:**
```json
{
  "merchantId": "uuid",
  "nmiMerchantId": "nmi-123",
  "status": "approved",
  "message": "Merchant account is active"
}
```

## Setup Instructions

### 1. Environment Variables

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

Required variables:
```bash
# Your Neon PostgreSQL connection string
DATABASE_URL=postgresql://...

# Your NMI Partner credentials
NMI_PARTNER_ID=LaskowskiD3124
NMI_MERCHANT_BOARDING_KEY=your_boarding_key_here

# Session secret for Express
SESSION_SECRET=random_secret_here
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Push Database Schema

Once you have your `DATABASE_URL` configured:

```bash
npm run db:push
```

This creates the `merchants` table in your database.

### 4. Start the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm run build
npm start
```

## Testing the API

### Create a Test Merchant

```bash
curl -X POST http://localhost:5000/api/v1/merchants/create \
  -H "Content-Type: application/json" \
  -d '{
    "businessName": "Test Business",
    "businessEmail": "test@business.com",
    "platform": "businessblueprint",
    "platformClientId": "BB_TEST_001",
    "businessCountry": "US"
  }'
```

### List All Merchants

```bash
curl http://localhost:5000/api/v1/merchants
```

### Get Merchants by Platform

```bash
curl http://localhost:5000/api/v1/merchants/platform/businessblueprint
```

### Check NMI Status

```bash
curl http://localhost:5000/api/v1/merchants/{merchant-id}/nmi-status
```

### Update Merchant Status

```bash
curl -X PATCH http://localhost:5000/api/v1/merchants/{merchant-id}/status \
  -H "Content-Type: application/json" \
  -d '{"status": "active"}'
```

## Integration with BusinessBlueprint/HostsBlue

### Step 1: Create Merchant Account

When a new client signs up on BusinessBlueprint or HostsBlue, call:

```javascript
const response = await fetch('https://swipesblue.com/api/v1/merchants/create', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    businessName: client.businessName,
    businessEmail: client.email,
    platform: 'businessblueprint', // or 'hostsblue'
    platformClientId: client.id,
    // ... other business details
  })
});

const { merchantId, nmiMerchantId, status } = await response.json();
```

### Step 2: Store Merchant IDs

Store both `merchantId` and `nmiMerchantId` in your platform's database linked to the client.

### Step 3: Check Application Status

Poll the status endpoint to check when NMI approves the merchant:

```javascript
const response = await fetch(`https://swipesblue.com/api/v1/merchants/${merchantId}/nmi-status`);
const { status } = await response.json();

if (status === 'approved') {
  // Merchant can now accept payments
}
```

### Step 4: Process Payments (Phase 2)

Once approved, you can process payments on behalf of this merchant using their `nmiMerchantId` (to be implemented in Phase 2).

## NMI Partner API Notes

### Merchant Boarding Process

1. **Submission** - Merchant application is submitted to NMI
2. **Pending** - Application under review (can take 1-3 business days)
3. **Approved** - Merchant can accept payments
4. **Rejected** - Application denied (check error message)

### Revenue Sharing

As an NMI partner with ID `LaskowskiD3124`, you automatically receive revenue share on all transactions processed by your sub-merchants. The revenue split is configured in your NMI partner agreement.

### Required Fields

Minimum required for merchant boarding:
- Business name
- Business email
- Platform identifier
- Platform client ID

Recommended for faster approval:
- Complete business address
- Tax ID / EIN
- Business website
- Processing volume estimates
- Business phone number

## Next Steps

### Phase 2: Payment Processing API
- Add payment processing endpoints for partner platforms
- Process payments on behalf of merchants
- Transaction routing based on merchant ID

### Phase 3: Webhooks
- Implement webhook system for payment status notifications
- Notify BusinessBlueprint/HostsBlue of merchant status changes
- Real-time transaction updates

### Phase 4: White-Label Virtual Terminal
- Embed NMI Virtual Terminal for manual payment entry
- Merchant-specific login portals
- Transaction history and reporting

## Files Modified/Created

### New Files
- `server/services/nmi-partner.ts` - NMI Partner API service
- `.env.example` - Environment variables template
- `MERCHANT_API_SETUP.md` - This file

### Modified Files
- `shared/schema.ts` - Added merchants table
- `server/storage.ts` - Added merchant database operations
- `server/routes.ts` - Added merchant API endpoints

## Support

For NMI Partner API documentation:
- [NMI Partner Documentation](https://secure.nmi.com/merchants/resources/integration/integration_portal.html)
- [Merchant Boarding API](https://secure.nmi.com/merchants/resources/integration/api_documentation.html)

For issues or questions, contact your NMI partner representative.
