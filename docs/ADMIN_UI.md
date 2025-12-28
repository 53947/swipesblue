# SwipesBlue Admin UI Documentation

Complete admin dashboard for managing the SwipesBlue payment gateway platform.

## Overview

The Admin UI provides a comprehensive interface for managing all aspects of the SwipesBlue platform, including merchants, transactions, API keys, and webhooks.

## Pages

### 1. Dashboard (`/admin`)

**Location:** `client/src/pages/admin/AdminDashboard.tsx`

**Features:**
- **Revenue Metrics Cards:**
  - Total Processed (all-time)
  - This Month (with trend)
  - Success Rate (with trend)
  - Active Merchants (with pending count)

- **Payment Volume Chart:**
  - 30-day area chart
  - Shows daily payment volume trends
  - Responsive with tooltips

- **Platform Breakdown:**
  - Pie chart showing revenue distribution
  - BusinessBlueprint vs HostsBlue
  - Percentage labels

- **Merchant Status Widget:**
  - Active/Pending/Suspended counts
  - Color-coded status indicators

- **Recent Transactions:**
  - Last 10 transactions
  - Status badges
  - Customer info
  - Payment method (masked card)

**API Endpoints Required:**
```
GET /api/admin/metrics
GET /api/admin/transactions/recent
GET /api/admin/volume
```

---

### 2. Merchants (`/admin/merchants`)

**Location:** `client/src/pages/admin/Merchants.tsx`

**Features:**
- **Search & Filters:**
  - Search by business name, email, client ID
  - Filter by platform (BusinessBlueprint, HostsBlue, SwipesBlue)
  - Filter by status (Active, Pending, Suspended, Rejected)

- **Data Table:**
  - Business Name
  - Platform (badge)
  - Email
  - Client ID (monospaced)
  - NMI Merchant ID (monospaced)
  - Status (color-coded badge)
  - Created date
  - Actions

- **Merchant Details Modal:**
  - Full business information
  - Status management actions:
    - Approve (pending → active)
    - Suspend (active → suspended)
    - Reactivate (suspended → active)
  - Timestamps

**API Endpoints Used:**
```
GET /api/v1/merchants
PATCH /api/v1/merchants/:id/status
```

---

### 3. Transactions (`/admin/transactions`)

**Location:** `client/src/pages/admin/AdminTransactions.tsx`

**Features:**
- **Search & Filters:**
  - Search by customer, order ID, transaction ID
  - Filter by platform
  - Filter by status (Success, Failed, Refunded, Pending)

- **Data Table:**
  - Date
  - Customer (name + email)
  - Order ID
  - Amount
  - Platform
  - Payment Method (masked card)
  - Status
  - Actions

- **Transaction Details Modal:**
  - Transaction information
  - Customer information
  - Payment method details
  - Refund button (for successful transactions)

- **Refund Dialog:**
  - Full or partial refund
  - Amount input
  - Reason (optional)
  - Real-time validation

- **Export to CSV:**
  - Export filtered transactions
  - Includes all relevant fields
  - Automatic download

**API Endpoints Required:**
```
GET /api/admin/transactions
POST /api/v1/payments/refund (existing)
```

---

### 4. API Keys (`/admin/api-keys`)

**Location:** `client/src/pages/admin/ApiKeys.tsx`

**Features:**
- **Data Table:**
  - Name
  - Platform (badge)
  - API Key (masked/revealed with toggle)
  - Permissions (badges)
  - Last Used date
  - Status (Active/Inactive)
  - Actions

- **Create API Key Dialog:**
  - Name input
  - Platform selection
  - Permission checkboxes:
    - Process Payments
    - Process Refunds
    - View Transactions
    - Manage Merchants
  - Validation

- **New Key Result Dialog:**
  - Shows API Key (one-time)
  - Shows API Secret (one-time)
  - Copy buttons
  - Warning message
  - Security reminder

- **Key Management:**
  - Show/hide keys
  - Copy to clipboard
  - Deactivate keys

**API Endpoints Used:**
```
GET /api/v1/api-keys
POST /api/v1/api-keys/create
DELETE /api/v1/api-keys/:id
```

---

### 5. Webhooks (`/admin/webhooks`)

**Location:** `client/src/pages/admin/Webhooks.tsx`

**Features:**
- **Data Table:**
  - Platform (badge)
  - URL (truncated)
  - Events (multiple badges)
  - Status (Active/Inactive)
  - Created date
  - Actions

- **Register Webhook Dialog:**
  - Platform selection
  - URL input (with validation)
  - Event checkboxes:
    - payment.success
    - payment.failed
    - payment.refunded
    - merchant.created
    - merchant.approved
    - merchant.suspended
  - Validation

- **New Webhook Result Dialog:**
  - Shows webhook secret (one-time)
  - Copy button
  - Webhook details summary
  - Security warning

- **Webhook Actions:**
  - Test webhook (sends test event)
  - View deliveries
  - Delete webhook

- **Deliveries Dialog:**
  - Shows delivery attempts
  - Event type
  - Status (Success/Failed/Pending)
  - Attempts count
  - Response status
  - Error messages
  - Timestamps

**API Endpoints Required:**
```
GET /api/admin/webhooks
POST /api/admin/webhooks/register
POST /api/admin/webhooks/:id/test
GET /api/admin/webhooks/:id/deliveries
DELETE /api/admin/webhooks/:id
```

---

## Layout

### AdminLayout Component

**Location:** `client/src/components/AdminLayout.tsx`

**Features:**
- Responsive sidebar navigation
- Mobile-friendly hamburger menu
- Active route highlighting
- SwipesBlue branding
- Version display

**Navigation Items:**
- Dashboard
- Merchants
- Transactions
- API Keys
- Webhooks

**Design:**
- Clean white sidebar
- Blue accent color
- Icon-based navigation
- Smooth transitions
- Mobile backdrop overlay

---

## Design System

### Colors

- **Primary:** Blue (#3b82f6)
- **Success:** Green
- **Warning:** Yellow
- **Danger:** Red
- **Gray Scale:** 50-900

### Typography

- **Headings:** Bold, gray-900
- **Body:** Regular, gray-600
- **Monospace:** Used for IDs and keys

### Components Used

All from **shadcn/ui**:
- Table
- Card
- Badge
- Button
- Dialog
- Input
- Select
- Checkbox
- Skeleton
- Label
- Textarea
- Switch
- Toast

### Charts

**Recharts** library:
- AreaChart (payment volume)
- PieChart (platform breakdown)
- BarChart (future use)

---

## State Management

### TanStack Query

All data fetching uses TanStack Query for:
- Automatic caching
- Loading states
- Error handling
- Refetch on mutation
- Optimistic updates

### Query Keys

```typescript
["/api/admin/metrics"]
["/api/admin/transactions"]
["/api/admin/volume"]
["/api/v1/merchants"]
["/api/v1/api-keys"]
["/api/admin/webhooks"]
["/api/admin/webhook-deliveries", webhookId]
```

---

## Server Requirements

### Admin API Endpoints to Create

The following endpoints need to be added to the server:

#### 1. Admin Metrics
```typescript
GET /api/admin/metrics
Response: {
  totalProcessed: string,      // "$280,000"
  thisMonth: string,            // "$45,000"
  successRate: string,          // "96.5%"
  platformBreakdown: [
    { name: string, value: number, color: string }
  ],
  merchantStats: {
    active: number,
    pending: number,
    suspended: number
  }
}
```

#### 2. Recent Transactions
```typescript
GET /api/admin/transactions/recent
Response: Transaction[] (last 10)
```

#### 3. Payment Volume
```typescript
GET /api/admin/volume
Response: [
  { date: string, amount: number }
] (last 30 days)
```

#### 4. All Transactions (Admin)
```typescript
GET /api/admin/transactions
Response: Transaction[] (all transactions, no platform filter)
```

#### 5. Webhooks (Admin)
```typescript
GET /api/admin/webhooks
Response: WebhookEndpoint[] (all webhooks, all platforms)

POST /api/admin/webhooks/register
Body: { platform, url, events }
Response: { ...webhook, secret }

POST /api/admin/webhooks/:id/test
Response: { success, message, status? }

GET /api/admin/webhooks/:id/deliveries
Response: WebhookDelivery[]

DELETE /api/admin/webhooks/:id
Response: { success, message }
```

### Authentication

Admin endpoints should:
1. Require admin authentication (add middleware)
2. OR use internal API key
3. OR be protected by session auth

---

## Routing

All admin routes are prefixed with `/admin`:

```
/admin                  → Dashboard
/admin/merchants        → Merchants
/admin/transactions     → Transactions
/admin/api-keys         → API Keys
/admin/webhooks         → Webhooks
```

---

## Mobile Responsiveness

All pages are fully responsive:

- **Mobile:** Single column, hamburger menu
- **Tablet:** 2 columns where applicable
- **Desktop:** Full multi-column layout

Breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

---

## Data Loading States

All pages implement:

1. **Loading Skeletons:**
   - Table rows: Skeleton bars
   - Cards: Skeleton content
   - Charts: Full skeleton

2. **Empty States:**
   - Centered message
   - Helpful text
   - Call-to-action

3. **Error States:**
   - Toast notifications
   - Error messages
   - Retry options

---

## User Experience Features

### Toasts
- Success notifications (green)
- Error notifications (red)
- Info notifications (blue)
- Auto-dismiss (5 seconds)

### Copy to Clipboard
- API keys
- API secrets
- Webhook secrets
- Transaction IDs

### Confirmations
- Refund processing
- Webhook deletion
- API key deactivation

### Search & Filter
- Real-time search
- Multiple filter combinations
- Clear visual feedback

### CSV Export
- Filtered data only
- Proper formatting
- Auto-download

---

## Security Considerations

### Secrets Display

1. **API Keys:**
   - Masked by default
   - Reveal with eye icon
   - Copy button available

2. **API Secrets:**
   - Shown only on creation
   - Cannot be retrieved later
   - Warning displayed

3. **Webhook Secrets:**
   - Shown only on registration
   - Cannot be retrieved later
   - Warning displayed

### Actions

- Destructive actions (delete, deactivate) clearly marked
- No undo for deactivation/deletion
- Confirmation dialogs where appropriate

---

## Future Enhancements

Potential additions:

1. **Dashboard:**
   - More chart types
   - Date range filters
   - Export reports

2. **Merchants:**
   - Bulk actions
   - Advanced filters
   - Merchant analytics

3. **Transactions:**
   - Date range picker
   - Advanced filtering
   - Transaction details page

4. **API Keys:**
   - Key rotation
   - Usage analytics
   - Rate limiting config

5. **Webhooks:**
   - Retry failed deliveries
   - Webhook logs
   - Delivery analytics

6. **General:**
   - User management
   - Audit logs
   - System settings
   - Dark mode

---

## Development

### Running Locally

```bash
npm run dev
```

Navigate to `http://localhost:5000/admin`

### Building

```bash
npm run build
```

### File Structure

```
client/src/
├── components/
│   ├── AdminLayout.tsx
│   └── ui/              # shadcn components
├── pages/
│   ├── admin/
│   │   ├── AdminDashboard.tsx
│   │   ├── Merchants.tsx
│   │   ├── AdminTransactions.tsx
│   │   ├── ApiKeys.tsx
│   │   └── Webhooks.tsx
│   └── ...
└── App.tsx
```

---

## Summary

**Phase 4: Admin UI** is complete with:

✅ Clean, modern design
✅ Full responsiveness
✅ Comprehensive data tables
✅ Advanced filtering
✅ Modal dialogs
✅ Real-time updates
✅ Loading states
✅ Error handling
✅ Security features
✅ CSV export
✅ Refund processing
✅ API key management
✅ Webhook management

**Remaining:** Server-side admin API endpoints

The UI is production-ready and follows modern SaaS/fintech design patterns. All components use shadcn/ui for consistency and accessibility.
