# SwipesBlue — COMPLETE NMI FEATURE PARITY

**RULE: If NMI offers it, we offer it. No exceptions.**

This document lists EVERY feature NMI provides. We must build a UI for ALL of them.

---

# COMPLETE NMI FEATURE LIST

## SECTION 1: TRANSACTION PROCESSING

### 1.1 Virtual Terminal
**What it is:** Web-based interface for manually keying in payments (phone orders, mail orders, in-person without hardware)

**NMI provides:**
- Credit Card Sale
- Credit Card Authorize (hold funds)
- Credit Card Capture (collect held funds)
- Credit Card Void
- Credit Card Refund
- Credit Card Credit (blind credit)
- Electronic Check (ACH) Sale
- Electronic Check Void
- Electronic Check Refund
- Cash Sale (record keeping)
- Cash Refund
- Customizable form fields per user
- Product lookup from Product Manager
- Customer Vault lookup
- Tip entry
- Tax calculation
- Shipping calculation
- Merchant Defined Fields (custom fields)
- Surcharging/Convenience fee option
- Duplicate transaction checking
- Receipt printing
- Email receipt to customer

**Dashboard page needed:** `/dashboard/terminal`
**Sub-pages:**
- `/dashboard/terminal/card-sale`
- `/dashboard/terminal/card-authorize`
- `/dashboard/terminal/card-capture`
- `/dashboard/terminal/check-sale`
- `/dashboard/terminal/cash-sale`

---

### 1.2 Batch Upload
**What it is:** Upload CSV/file to process many transactions at once

**NMI provides:**
- Upload transaction file (CSV)
- Configurable file format mapping
- Process credit card batches
- Process ACH batches
- Add to Customer Vault in bulk
- Recurring billing setup in bulk
- Status tracking
- Error reporting
- FTP upload option

**Dashboard page needed:** `/dashboard/batch-upload`

---

### 1.3 Transaction Search & Reporting
**What it is:** Find, view, and act on past transactions

**NMI provides:**
- Search by date range
- Search by transaction ID
- Search by amount
- Search by card type
- Search by last 4 digits
- Search by customer name/email
- Search by order ID
- Search by transaction status (approved, declined, pending, settled, voided, refunded)
- Export to CSV
- Export to PDF
- Transaction details view
- Void transaction
- Refund transaction (full or partial)
- Re-run transaction
- Print receipt
- Email receipt
- View AVS/CVV response
- View fraud score
- View processor response codes

**Dashboard page needed:** `/dashboard/transactions`
**Already exists but needs enhancement**

---

## SECTION 2: INVOICING

### 2.1 Invoice Management
**What it is:** Create and send invoices via email, customer pays via hosted page

**NMI provides:**
- Create invoice
- Set amount
- Set due date
- Add line items
- Add tax
- Add shipping
- Customer email (auto-sends)
- Custom invoice number
- Memo/notes
- Update invoice
- Resend invoice
- Close/cancel invoice
- Invoice status tracking (draft, sent, viewed, paid, overdue, cancelled)
- Invoice history
- Invoice search
- Payment link in email
- Hosted payment page for invoice
- Partial payments
- Automatic receipts

**Dashboard page needed:** `/dashboard/invoices`
**Sub-pages:**
- `/dashboard/invoices/create`
- `/dashboard/invoices/[id]`

---

## SECTION 3: RECURRING BILLING & SUBSCRIPTIONS

### 3.1 Recurring Plans
**What it is:** Create billing plans that customers can subscribe to

**NMI provides:**
- Create plan
- Plan name
- Plan amount
- Number of payments (or unlimited)
- Billing frequency (daily, weekly, monthly, yearly, custom days)
- Day of month to charge
- Trial period
- Setup fee
- Edit plan
- Delete plan
- View subscribers per plan

**Dashboard page needed:** `/dashboard/plans`
**Sub-pages:**
- `/dashboard/plans/create`
- `/dashboard/plans/[id]`

---

### 3.2 Subscriptions
**What it is:** Individual customer subscriptions (assigned to plans or custom)

**NMI provides:**
- Create subscription (assign customer to plan)
- Custom subscription (unique amount/frequency per customer)
- Start date
- End date / number of payments
- Payment method (from Customer Vault)
- Pause subscription
- Resume subscription
- Cancel subscription
- Update subscription amount
- Update subscription frequency
- Update payment method
- Retry failed payment
- Subscription history (all charges)
- Upcoming payment schedule
- Failed payment notifications
- Subscription search
- Export subscriptions

**Dashboard page needed:** `/dashboard/subscriptions`
**Sub-pages:**
- `/dashboard/subscriptions/create`
- `/dashboard/subscriptions/[id]`

---

## SECTION 4: CUSTOMER VAULT

### 4.1 Customer Management
**What it is:** Securely store customer payment info for future charges

**NMI provides:**
- Add customer
- Customer ID (auto or custom)
- First/last name
- Email
- Phone
- Billing address
- Shipping address
- Store credit card (tokenized)
- Store ACH/bank account (tokenized)
- Multiple payment methods per customer
- Set default payment method
- Update customer info
- Update payment method
- Delete payment method
- Delete customer
- Charge customer (one-click)
- View customer transaction history
- Search customers
- Export customers
- Customer Vault ID for API use

**Dashboard page needed:** `/dashboard/customers`
**Sub-pages:**
- `/dashboard/customers/create`
- `/dashboard/customers/[id]`
- `/dashboard/customers/[id]/charge`

---

## SECTION 5: PAYMENT LINKS & HOSTED PAGES

### 5.1 QuickClick (Payment Buttons/Links)
**What it is:** Generate payment buttons/links to embed on website or send to customers

**NMI provides:**
- Shopping Cart button (multiple items)
- Single Item / Fixed Price button (one item, set price)
- Donation button (customer enters amount)
- Generate HTML embed code
- Generate shareable link
- QR code generation
- Customize button appearance
- Customize checkout fields
- Add products from Product Manager
- Recurring billing option
- Custom thank-you redirect URL
- Button history
- Disable/delete buttons
- Convenience fee/surcharge option

**Dashboard page needed:** `/dashboard/payment-links`
**Sub-pages:**
- `/dashboard/payment-links/create`
- `/dashboard/payment-links/[id]`

**Public page needed:** `/pay/[link-id]` (hosted checkout)

---

### 5.2 Collect Checkout (Hosted Payment Page)
**What it is:** Fully hosted, customizable checkout page

**NMI provides:**
- Hosted checkout page (NMI handles PCI)
- Customizable branding (logo, colors)
- Custom fields
- Product selection
- Quantity
- Tax
- Shipping
- Donation/custom amount option
- Recurring billing option
- Customer information collection
- Generate embed code
- Generate shareable link
- 3D Secure support
- Apple Pay / Google Pay
- Convenience fee/surcharge

**Dashboard page needed:** `/dashboard/checkout-pages`
**Sub-pages:**
- `/dashboard/checkout-pages/create`
- `/dashboard/checkout-pages/[id]`
- `/dashboard/checkout-pages/customize`

---

### 5.3 Text-to-Pay (TXT2PAY)
**What it is:** Send payment requests via SMS

**NMI provides:**
- Create payment request
- Send via SMS
- Customer receives link
- Customer pays on mobile-optimized page
- Conversation history
- Close conversation
- Payment status tracking

**Dashboard page needed:** `/dashboard/text-to-pay`

---

## SECTION 6: PRODUCT MANAGEMENT

### 6.1 Product Manager
**What it is:** Catalog of products/services for use in Virtual Terminal, QuickClick, etc.

**NMI provides:**
- Add product
- Product name
- SKU
- Description
- Price
- Product categories
- Tax settings
- Quantity/inventory tracking
- Edit product
- Delete product
- Search products
- Import products
- Export products
- Use in Virtual Terminal
- Use in QuickClick
- Use in invoices

**Dashboard page needed:** `/dashboard/products`
**Already exists but needs enhancement to support NMI product manager features**

---

## SECTION 7: FRAUD PREVENTION & SECURITY

### 7.1 iSpyFraud
**What it is:** Rule-based fraud detection and blocking

**NMI provides:**
- Create fraud rules
- Rule conditions:
  - Card number (block specific cards)
  - BIN range (block card types/issuers)
  - IP address (block IPs)
  - Email address (block emails)
  - Country (block countries)
  - Amount threshold
  - Velocity (transactions per time period)
- Rule actions:
  - Flag transaction
  - Decline transaction
  - Flag and decline
- Rule priority
- Enable/disable rules
- View flagged transactions
- Whitelist (override rules)
- Blacklist management

**Dashboard page needed:** `/dashboard/fraud-rules`
**Sub-pages:**
- `/dashboard/fraud-rules/create`
- `/dashboard/fraud-rules/[id]`
- `/dashboard/fraud-rules/flagged`
- `/dashboard/fraud-rules/blacklist`
- `/dashboard/fraud-rules/whitelist`

---

### 7.2 AVS/CVV Settings
**What it is:** Address Verification and Card Verification settings

**NMI provides:**
- AVS settings (what to do on mismatch)
- CVV settings (what to do on mismatch)
- Per-action settings (approve, flag, decline)

**Dashboard page needed:** `/dashboard/security/avs-cvv`

---

### 7.3 3D Secure (3DS)
**What it is:** Additional cardholder authentication (Visa Secure, Mastercard Identity Check, etc.)

**NMI provides:**
- Enable/disable 3DS
- Set threshold amount (only require 3DS above X)
- Liability shift tracking
- 3DS results in transaction details

**Dashboard page needed:** `/dashboard/security/3ds`

---

### 7.4 Kount Fraud Manager (Value-Added Service)
**What it is:** AI-powered fraud detection

**NMI provides:**
- Enable/disable Kount
- Fraud score on each transaction
- Approve/Decline/Review thresholds
- Device fingerprinting
- Global fraud database

**Dashboard page needed:** `/dashboard/security/kount`

---

### 7.5 Velocity Controls
**What it is:** Limit transaction frequency

**NMI provides:**
- Transactions per card per time period
- Transactions per IP per time period
- Amount per card per time period
- Duplicate transaction blocking
- Configurable time windows

**Dashboard page needed:** `/dashboard/security/velocity`

---

## SECTION 8: REPORTING & ANALYTICS

### 8.1 Transaction Reports
**NMI provides:**
- Daily transaction summary
- Weekly/monthly transaction summary
- Transaction volume by card type
- Transaction volume by processor
- Approved vs declined breakdown
- Refund reports
- Void reports
- Settlement/batch reports
- Custom date range
- Export (CSV, PDF)
- Scheduled email reports

**Dashboard page needed:** `/dashboard/reports`
**Sub-pages:**
- `/dashboard/reports/transactions`
- `/dashboard/reports/settlements`
- `/dashboard/reports/refunds`
- `/dashboard/reports/declines`

---

### 8.2 Recurring Reports
**NMI provides:**
- Active subscriptions
- Upcoming charges
- Failed recurring payments
- Subscription churn
- Revenue by plan

**Dashboard page needed:** `/dashboard/reports/recurring`

---

### 8.3 Chargeback Reports
**NMI provides:**
- Chargeback list
- Chargeback amount
- Reason codes
- Due dates
- Status (open, won, lost)

**Dashboard page needed:** `/dashboard/reports/chargebacks`

---

## SECTION 9: SETTLEMENT & DEPOSITS

### 9.1 Batch/Settlement Management
**What it is:** View settled transactions and deposits

**NMI provides:**
- Batch history
- Batch details (transactions in batch)
- Settlement time configuration
- Auto-close batches
- Manual batch close
- Batch totals by card type
- Deposit tracking

**Dashboard page needed:** `/dashboard/settlements`
**Sub-pages:**
- `/dashboard/settlements/batches`
- `/dashboard/settlements/deposits`

---

## SECTION 10: MULTI-MERCHANT / MULTI-MID

### 10.1 Multi-MID Management
**What it is:** Manage multiple merchant accounts under one gateway

**NMI provides:**
- Multiple MIDs on one account
- Consolidated reporting
- Per-MID reporting
- Branch organization
- Product organization per MID

**Dashboard page needed:** `/dashboard/accounts`

---

### 10.2 Advanced Transaction Routing (ATRI)
**What it is:** Automatically route transactions to different MIDs/processors

**NMI provides:**
- Route by percentage (load balancing)
- Route by card type
- Route by amount
- Route by product
- Route by merchant defined field
- Failover routing
- Priority ordering

**Dashboard page needed:** `/dashboard/routing`

---

## SECTION 11: DEVELOPER TOOLS

### 11.1 API Keys
**What it is:** Keys for API access

**NMI provides:**
- Create API keys
- Multiple keys
- Key permissions
- IP restrictions per key
- Deactivate keys
- View last used
- Test vs live keys

**Dashboard page needed:** `/dashboard/api-keys`
**Already exists but needs enhancement**

---

### 11.2 Webhooks
**What it is:** Real-time event notifications

**NMI provides:**
- Transaction events (sale, auth, capture, void, refund)
- Recurring events (subscription created, charged, failed, cancelled)
- Settlement events (batch closed)
- Chargeback events
- Automatic Card Updater events
- Configure URL
- Configure events
- Retry logic
- Delivery logs
- Test webhook

**Dashboard page needed:** `/dashboard/webhooks`
**Already exists but needs enhancement for all event types**

---

### 11.3 Sandbox/Test Mode
**What it is:** Test environment for development

**NMI provides:**
- Test API keys
- Test transactions (not real money)
- Test card numbers
- Simulate approvals/declines
- Test webhooks

**Dashboard page needed:** `/dashboard/sandbox`

---

## SECTION 12: USER MANAGEMENT

### 12.1 User Accounts
**What it is:** Multiple users per merchant account

**NMI provides:**
- Create users
- User roles/permissions
- Permission types:
  - Virtual Terminal access
  - API access
  - Batch upload
  - Customer Vault access
  - Product Manager access
  - Administrative options
  - View other users' transactions
  - QuickClick access
  - Reporting access
- Transaction type restrictions per user
- Password reset
- Delete users
- User activity log

**Dashboard page needed:** `/dashboard/settings/users`

---

### 12.2 Security Settings
**What it is:** Account security configuration

**NMI provides:**
- Password requirements
- IP restrictions
- Two-factor authentication
- Session timeout
- Login notifications
- Security keys management

**Dashboard page needed:** `/dashboard/settings/security`

---

## SECTION 13: ACCOUNT SETTINGS

### 13.1 Business Information
**NMI provides:**
- Business name
- DBA name
- Address
- Phone
- Email
- Website
- Billing descriptor

**Dashboard page needed:** `/dashboard/settings/business`

---

### 13.2 Receipt/Email Settings
**NMI provides:**
- Email templates
- Receipt templates
- Logo on receipts
- Custom receipt text
- Auto-send receipts
- BCC on receipts

**Dashboard page needed:** `/dashboard/settings/receipts`

---

### 13.3 Country/Currency Settings
**NMI provides:**
- Default country
- Supported currencies
- Multi-currency display

**Dashboard page needed:** `/dashboard/settings/currency`

---

### 13.4 Merchant Defined Fields
**What it is:** Custom fields for transactions

**NMI provides:**
- Create up to 20 custom fields
- Field types (text, checkbox, dropdown)
- Required vs optional
- Labels
- Use in Virtual Terminal
- Use in QuickClick
- Use in reports
- Use in webhooks

**Dashboard page needed:** `/dashboard/settings/custom-fields`

---

## SECTION 14: INTEGRATIONS

### 14.1 Shopping Cart Integrations
**NMI provides:**
- WooCommerce
- Magento
- Shopify
- BigCommerce
- PrestaShop
- 125+ shopping carts
- Plugin installation guides
- API credentials for each

**Dashboard page needed:** `/dashboard/integrations`

---

### 14.2 QuickBooks Integration
**What it is:** Sync with QuickBooks accounting

**NMI provides:**
- Connect QuickBooks account
- Sync transactions
- Sync customers
- Sync invoices

**Dashboard page needed:** `/dashboard/integrations/quickbooks`

---

### 14.3 Terminal/Hardware Integrations
**NMI provides:**
- Cloud terminal integration
- Supported devices list
- Device management
- Remote key injection
- Firmware updates

**Dashboard page needed:** `/dashboard/terminals`

---

## SECTION 15: VALUE-ADDED SERVICES

### 15.1 Automatic Card Updater (ACU)
**What it is:** Automatically update expired/replaced cards in Customer Vault

**NMI provides:**
- Auto-update card numbers
- Auto-update expiration dates
- Update notifications
- Opt-in/opt-out per customer

**Dashboard page needed:** `/dashboard/services/card-updater`

---

### 15.2 Account Updater
**What it is:** Keep stored cards current

Same as above, different naming.

---

### 15.3 Chargeback Management
**What it is:** Handle disputes

**NMI provides:**
- Chargeback alerts (Verifi, Ethoca)
- Dispute details
- Submit evidence
- Track outcomes

**Dashboard page needed:** `/dashboard/chargebacks`

---

### 15.4 PCI Compliance (ScanX/MonitorX)
**What it is:** PCI compliance tools

**NMI provides:**
- Vulnerability scanning
- Compliance questionnaire
- Compliance certificate
- Monitoring

**Dashboard page needed:** `/dashboard/compliance`

---

# SUMMARY: COMPLETE PAGE LIST

## Core Dashboard Pages (Must Have)

| Route | Feature | Priority |
|-------|---------|----------|
| `/dashboard/terminal` | Virtual Terminal | 🔴 CRITICAL |
| `/dashboard/invoices` | Invoicing | 🔴 CRITICAL |
| `/dashboard/subscriptions` | Recurring Billing | 🔴 CRITICAL |
| `/dashboard/plans` | Billing Plans | 🔴 CRITICAL |
| `/dashboard/customers` | Customer Vault | 🔴 CRITICAL |
| `/dashboard/payment-links` | Payment Links / QuickClick | 🔴 CRITICAL |
| `/dashboard/text-to-pay` | Text-to-Pay | 🟡 IMPORTANT |
| `/dashboard/products` | Product Manager | 🟡 IMPORTANT |
| `/dashboard/transactions` | Transaction Search | 🔴 CRITICAL (exists, enhance) |
| `/dashboard/settlements` | Batches/Deposits | 🟡 IMPORTANT |
| `/dashboard/reports` | Reporting | 🟡 IMPORTANT |
| `/dashboard/fraud-rules` | iSpyFraud | 🟡 IMPORTANT |
| `/dashboard/security` | Security Settings | 🟡 IMPORTANT |
| `/dashboard/routing` | Transaction Routing (ATRI) | 🟢 LATER |
| `/dashboard/api-keys` | API Keys | 🔴 CRITICAL (exists, enhance) |
| `/dashboard/webhooks` | Webhooks | 🔴 CRITICAL (exists, enhance) |
| `/dashboard/sandbox` | Test Mode | 🟡 IMPORTANT |
| `/dashboard/integrations` | Integrations | 🟢 LATER |
| `/dashboard/terminals` | Hardware | 🟢 LATER |
| `/dashboard/chargebacks` | Disputes | 🟡 IMPORTANT |
| `/dashboard/compliance` | PCI Compliance | 🟢 LATER |
| `/dashboard/settings/*` | Account Settings | 🟡 IMPORTANT |

## Public Pages (For Payment Collection)

| Route | Feature |
|-------|---------|
| `/pay/[link-id]` | Hosted payment link checkout |
| `/invoice/[invoice-id]` | Invoice payment page |
| `/checkout/[page-id]` | Hosted checkout page |

---

# DATABASE TABLES NEEDED

Beyond what exists, we need:

```
invoices
invoice_items
billing_plans
subscriptions
subscription_payments
customer_vault
customer_payment_methods
payment_links
payment_link_transactions
fraud_rules
fraud_flagged_transactions
blacklist
whitelist
batches
batch_transactions
user_accounts
user_permissions
merchant_defined_fields
api_logs
```

---

# EXECUTION ORDER

## Phase 1: Core Payment Features (MUST DO FIRST)
1. Virtual Terminal (key in payments)
2. Customer Vault (store payment methods)
3. Payment Links / QuickClick (send links)
4. Invoicing (create/send invoices)
5. Recurring Billing (plans + subscriptions)

## Phase 2: Operations
6. Transaction Search (enhance existing)
7. Settlements/Batches
8. Reporting

## Phase 3: Security & Fraud
9. Fraud Rules (iSpyFraud)
10. AVS/CVV settings
11. Velocity controls
12. 3D Secure

## Phase 4: Developer
13. API Keys (enhance)
14. Webhooks (enhance)
15. Sandbox mode

## Phase 5: Administration
16. User accounts/permissions
17. Settings pages
18. Integrations

## Phase 6: Advanced
19. Multi-MID / ATRI
20. Chargeback management
21. PCI compliance
22. Hardware terminals

---

**NO FEATURE GETS SKIPPED.**

**Every feature NMI offers must have a corresponding page in our dashboard.**

**This is what makes SwipesBlue a real payment gateway, not a demo.**
