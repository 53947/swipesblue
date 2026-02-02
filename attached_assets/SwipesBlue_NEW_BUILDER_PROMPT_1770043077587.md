# SwipesBlue — MASTER BUILD PROMPT

**Read this ENTIRE prompt before making ANY changes. Then present your plan and wait for approval.**

---

# CURRENT STATE AUDIT

A previous builder worked on this project. Here is exactly what exists and what needs to be done.

## What EXISTS and is CORRECT (Do Not Redo)

### Database Tables (schema.ts)
- ✅ `ratesActive` — tier rates with monthlyFee, transactionPercent, transactionFlat
- ✅ `ratesStaged` — staged rates pending approval
- ✅ `costsBaseline` — NMI cost configuration
- ✅ `ratesAuditLog` — audit trail for rate changes
- ✅ `addOnProducts` — table exists (but needs data and has wrong `monthlyPrice` field)
- ✅ Core tables: products, orders, cartItems, orderItems, users, session
- ✅ Payment tables: paymentGateways, paymentTransactions, merchants, apiKeys
- ✅ Webhook tables: webhookEndpoints, webhookDeliveries, partnerPaymentTransactions

### Pages That Work
- ✅ Home page — hero, features, pricing preview, CTA sections
- ✅ Pricing page — tier cards pulling from database
- ✅ Demo page — interactive animation (but NOT the video you wanted)
- ✅ Developers page — exists
- ✅ Dashboard with sidebar layout
- ✅ Admin with protected routes
- ✅ Rate Management page — basic CRUD exists

### Routes (App.tsx)
```
Public: /, /pricing, /demo, /developers, /products, /cart, /shoppingcart, /checkout, /orders, /brand-studio, /transactions

Dashboard: /dashboard, /dashboard/products, /dashboard/orders, /dashboard/transactions, /dashboard/abandoned-carts (placeholder), /dashboard/brand-studio, /dashboard/analytics (placeholder), /dashboard/security (placeholder), /dashboard/settings (placeholder), /dashboard/api-keys, /dashboard/webhooks

Admin: /admin/login, /admin, /admin/merchants, /admin/transactions, /admin/rates, /admin/api-keys, /admin/webhooks
```

---

## What is WRONG (Must Be Fixed)

### 1. Header Logo
**Current:** Unknown implementation
**Required:** Logo ICON image (`swipesblue_logo.png`) placed NEXT TO company name built in CODE

Company name in code:
- "swipes" = Archivo Semi Expanded, #374151 (Charcoal Gray)
- "blue" = Archivo Narrow, #0000FF (Blue Pure)
- Combined as one word, 24px for header
- Shadow effect: black version offset 1pt right, 1pt down

### 2. Products Page (Products.tsx)
**Current Problems:**
- Shows `{product.stock} in stock` — REMOVE THIS (software doesn't have stock)
- Uses "Add to Cart" button — should be "Subscribe" for annual add-ons
- Pulls from `/api/products` — should show add-on products
- No FREE/PAID badges
- No annual pricing display ($X/year)

### 3. Rate Management Worksheet (RateManagement.tsx)
**Current:** Basic CRUD with tabs (E-Commerce, Developer, Base Costs, Audit Log)
**Missing:**
- ❌ 5 buttons: Save Draft, Research, Upload, Activate, Compare
- ❌ DeepSeek AI integration for Research function
- ❌ Staged rates workflow (draft → research → upload → activate)
- ❌ Competitor comparison display
- ❌ Margin calculation display

### 4. Demo Page
**Current:** Interactive 5-step animation on page
**Required:** Embedded VIDEO file (MP4/WebM, 60-90 seconds) OR keep interactive but also create video

### 5. Home Page
**Missing:**
- ❌ Embedded demo video section
- ❌ Competitor comparison section (SwipesBlue vs Stripe vs PayPal vs Square table)

### 6. Add-On Products
**Current:** `addOnProducts` table exists but:
- Has `monthlyPrice` field — should be `annualPrice` (these are ANNUAL subscriptions)
- Table is empty — no products seeded
- No functionality built — just a table

**Required:** 8 specific add-on products with FULL FUNCTIONALITY (see Part 5)

---

## What DOES NOT EXIST (Must Be Built)

### Database Tables Needed
- Customer Portal: `customer_accounts`, `customer_payment_methods`, `customer_support_tickets`
- Multi-Gateway: `merchant_gateways`, `gateway_routing_rules`, `gateway_failover_log`
- Security: `security_settings`, `fraud_scores`, `device_fingerprints`, `chargeback_alerts`
- Checkout Optimizer: `checkout_settings`, `ab_tests`, `ab_test_results`, `checkout_analytics`
- Shopping Cart Pro: `saved_carts`, `cart_recommendations`, `cart_notes`, `inventory_reservations`
- Analytics: `analytics_daily`, `analytics_products`, `customer_ltv`, `scheduled_reports`
- Branding: `brand_settings`, `email_templates`, `receipt_settings`
- Subscriptions: `merchant_subscriptions`, `addon_subscriptions`

### Pages Needed
- `/portal/*` — Customer portal pages
- `/dashboard/gateways/*` — Multi-gateway management
- `/dashboard/security/*` — Security suite
- `/dashboard/checkout-optimizer/*` — Checkout optimizer
- `/dashboard/cart-settings/*` — Cart pro settings
- `/dashboard/analytics/*` — Full analytics (not placeholder)
- `/docs`, `/docs/api`, `/docs/webhooks`, `/docs/sdks` — Documentation
- `/support`, `/contact`, `/status` — Support pages

### Features Needed
- All 8 add-on products with full functionality
- Rate Management 5-button workflow with DeepSeek AI
- Demo video (or enhanced interactive demo)
- Footer with platform links
- Competitor comparison on homepage

---

# TABLE OF CONTENTS

1. Business Overview
2. Brand Assets & Colors
3. Subscription Tiers & Pricing
4. Rate Management Worksheet (5 Buttons)
5. Add-On Products (8 Products - Full Specs)
6. Competitive Positioning
7. Navigation & Page Structure
8. Button & Badge Standards
9. Database Schema
10. Execution Plan
11. Critical Reminders

---

# PART 1: Business Overview

## What SwipesBlue Is

SwipesBlue is a **payment gateway and e-commerce platform** powered by NMI on the backend.

## How We Make Money

### 1. Transaction Fees
- Default: **2.70% + $0.30** per transaction
- Our NMI cost: ~2.20% + $0.30
- Our margin: **0.50%**

### 2. Subscription Tiers (Monthly)
- FREE ($0) → Starter ($29) → Pro ($79) → Enterprise ($299)

### 3. Add-On Products (Annual)
- 8 products from $149.99 to $449.99/year

## Key Message
**"WooCommerce is free until it isn't. Less fees. More revenue."**

---

# PART 2: Brand Assets & Colors

## Header Logo Requirement

**Build company name in CODE + place logo ICON image next to it.**

Layout: `[swipesblue_logo.png] + [code-built "swipesblue"]`

Code standard:
1. "swipes" = Archivo Semi Expanded, #374151
2. "blue" = Archivo Narrow, #0000FF
3. Combined as one word: "swipesblue"
4. Black shadow offset 1pt right, 1pt down
5. Header size: 24px

**Do NOT use the full lockup image (swipesblue_Company_Name_with_Logo.png) for the header.**

## Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Charcoal Gray | #374151 | "swipes" in logo ONLY |
| Blue Pure | #0000FF | "blue" in logo, major headlines ONLY |
| Blue Deep | #1844A6 | **Primary** — buttons, links, active states |
| Teal | #064A6C | **Secondary** — secondary buttons, dark sections |
| Trusted Green | #10B981 | Success states |
| Gold | #FFD700 | Pending, warnings, featured |
| Muted Red | #DC2626 | Error states ONLY |
| Pro Gray | #4B5563 | Secondary text |
| Black | #09080E | Body text |
| White | #FFFFFF | Backgrounds |

**Rules:**
- Logo colors (Charcoal + Blue Pure) are RESERVED — never for UI
- Blue Deep = primary workhorse
- Teal = secondary workhorse

---

# PART 3: Subscription Tiers & Pricing

**Rates are dynamic — pulled from `ratesActive` table.**

## E-Commerce Tiers

| Tier | Monthly | Transaction Fee | Features |
|------|---------|-----------------|----------|
| FREE | $0 | 2.70% + $0.30 | 25 products, cart, checkout, orders, basic dashboard |
| Starter | $29 | 2.70% + $0.30 | + Unlimited products, abandoned cart (basic), discount codes, basic analytics |
| Pro | $79 | 2.70% + $0.30 | + Brand Studio, advanced abandoned cart, inventory alerts, advanced analytics |
| Enterprise | $299 | 2.70% + $0.30 | + Multi-store, API, webhooks, custom integrations, dedicated support |

## Developer Tiers

| Tier | Monthly | Transaction Fee |
|------|---------|-----------------|
| Payment API | $0 | 2.70% + $0.30 |
| API Pro | $99 | 2.70% + $0.30 |

## Additional Fees

| Fee | Amount |
|-----|--------|
| Chargeback | $15.00 |
| ACH Return | $25.00 |
| Voice Auth | $0.45 |
| Retrieval Request | $5.00 |
| Regulatory/1099 | $6.95 |
| Monthly Minimum | $10.00 |

---

# PART 4: Rate Management Worksheet

**Location:** Admin panel → `/admin/rates`

**Current state:** Basic CRUD exists. Missing the 5-button workflow.

## Required: 5 Buttons

### Section 1: Your Costs (Baseline)
| Field | Default |
|-------|---------|
| Interchange Plus Markup | 2.20% |
| Per-Transaction Cost | $0.30 |
| Target Margin | **0.50%** |

### Section 2-4: Rate Entry Fields
(Already exists — subscription fees, transaction fees, additional fees per tier)

### THE 5 BUTTONS (Must Build)

#### Button 1: 💾 SAVE DRAFT
- Saves to local storage only
- Does NOT affect database
- Shows: "Draft saved at [timestamp]"

#### Button 2: 🔍 RESEARCH
- **Integrates with DeepSeek AI**
- AI performs:
  1. Margin Check: (Your Rate - Your Cost) vs Target Margin
  2. Competitor Check: Fetches current Stripe, PayPal, Square rates
  3. Flags:
     - ❌ RED: Margin below target
     - ⚠️ YELLOW: Rate higher than competitor
     - ✅ GREEN: Margin met and competitive
- Returns formatted report
- Must complete before Upload enabled

#### Button 3: ⬆️ UPLOAD
- Pushes to `ratesStaged` table (not active)
- Only enabled after Research (or admin override)
- Shows: "Rates staged at [timestamp]"

#### Button 4: ✅ ACTIVATE
- Copies from `ratesStaged` to `ratesActive`
- Makes rates LIVE on website
- Requires confirmation dialog
- Logs to `ratesAuditLog`
- Shows: "Rates activated at [timestamp]"

#### Button 5: 📊 COMPARE
- Side-by-side display:
  - Current ACTIVE rates
  - STAGED rates
  - DRAFT rates
  - Competitor rates from Research
- Highlights differences
- Shows margin for each tier

### Research Report Format
```
═══════════════════════════════════════════════════════════════
                    RATE RESEARCH REPORT
                    Generated: [timestamp]
═══════════════════════════════════════════════════════════════

YOUR COSTS
├── Interchange Plus: 2.20% + $0.30
├── Target Margin: 0.50%
└── Minimum Rate Needed: 2.70% + $0.30

───────────────────────────────────────────────────────────────
MARGIN ANALYSIS BY TIER
───────────────────────────────────────────────────────────────

FREE Tier
├── Your Rate: 2.70% + $0.30
├── Your Cost: 2.20% + $0.30
├── Your Margin: 0.50%
└── Status: ✅ MEETS TARGET

[...all tiers...]

───────────────────────────────────────────────────────────────
COMPETITOR COMPARISON (on $100 transaction)
───────────────────────────────────────────────────────────────

| Provider           | Rate           | Fee    | vs SwipesBlue |
|--------------------|----------------|--------|---------------|
| SwipesBlue         | 2.70% + $0.30  | $3.00  | --            |
| Stripe             | 2.90% + $0.30  | $3.20  | Save $0.20    |
| PayPal             | 2.99% + $0.49  | $3.48  | Save $0.48    |
| Square             | 2.90% + $0.30  | $3.20  | Save $0.20    |

───────────────────────────────────────────────────────────────
SUMMARY: ✅ All tiers meet target margin. Ready to upload.
═══════════════════════════════════════════════════════════════
```

---

# PART 5: Add-On Products (8 Products)

**All add-ons are ANNUAL subscriptions. Each needs FULL FUNCTIONALITY built.**

## Schema Fix Required

Change `addOnProducts` table:
- Remove `monthlyPrice`
- Add `annualPrice` (decimal)
- Or rename `yearlyPrice` to be the primary price

---

## Add-On #1: Customer Portal Access

**Price:** FREE (limited) / **$179.99/year** (full)

### What It Does
Self-service portal for merchant's customers to view orders, download invoices, manage payment methods.

### FREE Version
- View last 10 orders
- View order status

### PAID Version
- Unlimited order history
- Download invoices as PDF
- Manage saved payment methods
- Subscription management
- Support ticket submission
- Order tracking

### Database Tables
```sql
customer_accounts (id, merchant_id, email, password_hash, name, created_at, last_login)
customer_payment_methods (id, customer_id, card_last_four, card_brand, token, is_default, created_at)
customer_support_tickets (id, customer_id, merchant_id, subject, message, status, created_at, updated_at)
```

### Pages to Build
- `/portal/login`
- `/portal/orders`
- `/portal/orders/[id]`
- `/portal/payment-methods`
- `/portal/subscriptions`
- `/portal/support`

---

## Add-On #2: Multi-Gateway Support

**Price:** **$449.99/year** (no free version)
**Restriction:** Pro and Enterprise only

### What It Does
Connect multiple payment processors, route transactions by rules, failover protection.

### Features
- Connect up to 3 gateways (Stripe, PayPal, Authorize.net, Square)
- Route by card type, amount, geography, percentage
- Auto-failover if primary fails

### Database Tables
```sql
merchant_gateways (id, merchant_id, gateway_type, api_key_encrypted, api_secret_encrypted, is_active, is_primary, created_at)
gateway_routing_rules (id, merchant_id, rule_type, condition_value, target_gateway_id, priority, is_active)
gateway_failover_log (id, merchant_id, original_gateway_id, failover_gateway_id, transaction_id, reason, created_at)
```

### Pages to Build
- `/dashboard/gateways`
- `/dashboard/gateways/connect`
- `/dashboard/gateways/routing`
- `/dashboard/gateways/failover`
- `/dashboard/gateways/logs`

---

## Add-On #3: Transaction Security Suite

**Price:** FREE (basic) / **$399.99/year** (full)

### FREE Version
- AVS (Address Verification)
- CVV verification

### PAID Version
- Velocity checks (flag multiple transactions from same card/IP)
- Geolocation blocking
- Device fingerprinting
- 3D Secure 2.0
- Real-time fraud scoring (0-100)
- Manual review queue
- Chargeback alerts (Verifi, Ethoca)

### Database Tables
```sql
security_settings (id, merchant_id, velocity_enabled, velocity_card_limit, velocity_ip_limit, velocity_window_minutes, geo_blocking_enabled, blocked_countries, device_fingerprint_enabled, 3ds_enabled, 3ds_threshold_amount, fraud_score_enabled, fraud_score_decline_threshold, fraud_score_review_threshold, created_at, updated_at)
fraud_scores (id, transaction_id, score, risk_factors, decision, created_at)
device_fingerprints (id, fingerprint_hash, merchant_id, is_blocked, transaction_count, first_seen, last_seen)
chargeback_alerts (id, merchant_id, transaction_id, alert_type, alert_source, amount, action_taken, created_at)
```

### Pages to Build
- `/dashboard/security`
- `/dashboard/security/velocity`
- `/dashboard/security/geo`
- `/dashboard/security/3ds`
- `/dashboard/security/fraud-scores`
- `/dashboard/security/review-queue`
- `/dashboard/security/chargebacks`

---

## Add-On #4: Checkout Optimizer

**Price:** FREE (basic) / **$249.99/year** (full)

### FREE Version
- Basic one-page checkout

### PAID Version
- One-click checkout (returning customers)
- Express checkout (Apple Pay, Google Pay)
- Address autocomplete (Google Places)
- Smart form validation
- A/B testing
- Conversion analytics (funnel)

### Database Tables
```sql
checkout_settings (id, merchant_id, one_click_enabled, express_checkout_enabled, apple_pay_enabled, google_pay_enabled, address_autocomplete_enabled, smart_validation_enabled, created_at, updated_at)
ab_tests (id, merchant_id, test_name, variant_a_config, variant_b_config, start_date, end_date, status, winner)
ab_test_results (id, test_id, variant, sessions, conversions, conversion_rate, revenue, updated_at)
checkout_analytics (id, merchant_id, date, cart_views, checkout_starts, payment_attempts, completions, avg_time_to_checkout, device_type, created_at)
```

### Pages to Build
- `/dashboard/checkout-optimizer`
- `/dashboard/checkout-optimizer/express`
- `/dashboard/checkout-optimizer/ab-tests`
- `/dashboard/checkout-optimizer/analytics`

---

## Add-On #5: Shopping Cart Pro

**Price:** FREE (basic) / **$349.99/year** (full)

### FREE Version
- Add to cart, update quantity, remove, subtotal

### PAID Version
- Save cart for later
- Cart sharing (shareable link)
- Cross-sell/upsell suggestions
- Cart notes (gift messages)
- Multi-currency display
- Inventory reservation (countdown timer)

### Database Tables
```sql
saved_carts (id, customer_id, merchant_id, cart_data, share_token, created_at, expires_at)
cart_recommendations (id, merchant_id, product_id, recommended_product_id, recommendation_type, priority, created_at)
cart_notes (id, cart_id, note_text, is_gift_message, created_at)
inventory_reservations (id, product_id, cart_id, quantity, reserved_at, expires_at, status)
```

### Pages to Build
- `/dashboard/cart-settings`
- `/dashboard/cart-settings/recommendations`
- `/dashboard/cart-settings/inventory`

---

## Add-On #6: Advanced Analytics Dashboard

**Price:** FREE (basic) / **$199.99/year** (full)

### FREE Version
- Total revenue, transaction count, success rate, last 5 transactions

### PAID Version
- Revenue breakdown (by product, category, time, payment method)
- Customer analytics (LTV, AOV, frequency, new vs returning)
- Cohort analysis
- Funnel visualization
- Exportable reports (CSV, PDF)
- Scheduled email reports
- Custom date ranges

### Database Tables
```sql
analytics_daily (id, merchant_id, date, revenue, transaction_count, success_count, failed_count, avg_order_value, new_customers, returning_customers, created_at)
analytics_products (id, merchant_id, product_id, date, units_sold, revenue, views, add_to_cart_count)
customer_ltv (id, customer_id, merchant_id, total_spent, order_count, first_order_date, last_order_date, avg_order_value, calculated_at)
scheduled_reports (id, merchant_id, report_type, recipients, frequency, last_sent, next_send, config, is_active)
```

### Pages to Build (Replace Placeholders)
- `/dashboard/analytics` — main dashboard
- `/dashboard/analytics/revenue`
- `/dashboard/analytics/customers`
- `/dashboard/analytics/cohorts`
- `/dashboard/analytics/funnels`
- `/dashboard/analytics/reports`
- `/dashboard/analytics/export`

---

## Add-On #7: Custom Branding Package (Brand Studio)

**Price:** FREE (SwipesBlue branding) / **$149.99/year** (white-label)

*Same as Brand Studio in Pro tier. Standalone unlocks for FREE/Starter.*

### FREE Version
- SwipesBlue logo on checkout
- "Powered by SwipesBlue" footer

### PAID Version
- Custom logo
- Custom colors
- Custom fonts
- Remove SwipesBlue branding
- Custom email templates
- Custom receipt design
- Custom checkout domain

### Database Tables
```sql
brand_settings (id, merchant_id, logo_url, favicon_url, primary_color, secondary_color, background_color, text_color, font_family, custom_font_url, remove_swipesblue_branding, custom_domain, custom_domain_verified, created_at, updated_at)
email_templates (id, merchant_id, template_type, subject, body_html, is_active, created_at, updated_at)
receipt_settings (id, merchant_id, show_logo, header_text, footer_text, terms_text, custom_fields, created_at, updated_at)
```

### Pages to Build (Enhance Existing)
- `/dashboard/brand-studio` — enhance
- `/dashboard/brand-studio/colors`
- `/dashboard/brand-studio/fonts`
- `/dashboard/brand-studio/emails`
- `/dashboard/brand-studio/receipts`
- `/dashboard/brand-studio/domain`

---

## Add-On #8: Premium Payment Gateway Integration

**Price:** **$299.99/year** (no free version)

*Same as API Access in Enterprise. Standalone unlocks for lower tiers.*

### Features
- Full REST API
- Webhooks with retry logic
- API keys (test/live)
- Sandbox environment
- SDK libraries
- Documentation
- Developer support

### Database Tables
```sql
api_keys — already exists
webhooks — already exists
webhook_deliveries — already exists
api_logs (id, merchant_id, api_key_id, endpoint, method, request_body, response_code, response_time_ms, ip_address, created_at)
```

### Pages to Build
- `/dashboard/developers` — developer hub
- `/dashboard/developers/api-keys` — (move from admin)
- `/dashboard/developers/webhooks` — (move from admin)
- `/dashboard/developers/logs`
- `/dashboard/developers/docs`

### Public Pages
- `/docs` — documentation home
- `/docs/api` — API reference
- `/docs/webhooks` — webhook guide
- `/docs/sdks` — SDK downloads

---

# PART 6: Competitive Positioning

## Transaction Fee Comparison ($100 sale)

| Provider | Rate | Fee | Customer Keeps |
|----------|------|-----|----------------|
| **SwipesBlue** | 2.70% + $0.30 | **$3.00** | **$97.00** |
| Stripe | 2.90% + $0.30 | $3.20 | $96.80 |
| PayPal | 2.99% + $0.49 | $3.48 | $96.52 |
| Square | 2.90% + $0.30 | $3.20 | $96.80 |

**Add this table to Homepage.**

---

# PART 7: Navigation & Page Structure

## Products Page Fix

**Remove:**
- `{product.stock} in stock` — DELETE THIS LINE

**Change:**
- "Add to Cart" → "Subscribe"
- Show annual price: "$X/year"
- Add FREE/PAID badges
- Group into sections: E-Commerce Add-Ons, Security, Developer Tools

## Dashboard Sidebar
```
📊 Overview
📦 Products
🛒 Orders
💳 Transactions
📧 Abandoned Carts [PRO]
🎨 Brand Studio [PRO]
📈 Analytics
🔒 Security
⚙️ Settings
───────────────
DEVELOPER
🔑 API Keys
🔗 Webhooks
───────────────
PLATFORMS
→ SwipesBlue.com
→ HostsBlue.com
→ BusinessBlueprint.io
───────────────
Your Plan: FREE
[Upgrade to Pro →]
```

## Admin Sidebar
```
← Back to Site
📊 Dashboard
👥 Merchants
💳 Transactions
💰 Rate Management
🔑 API Keys
🔗 Webhooks
🎨 Brand Studio
───────────────
PLATFORMS
→ SwipesBlue.com
→ HostsBlue.com
→ BusinessBlueprint.io
```

## Footer
```
[Logo]
Built for businesses to grow

PRODUCTS          DEVELOPERS         RESOURCES         COMPANY
E-Commerce Suite  API Documentation  Help Center       About
Shopping Cart     API Reference      Getting Started   Blog
Checkout          Webhooks           Guides            Careers
Order Management  API Keys           System Status     Contact
Brand Studio      SDKs
Pricing
───────────────────────────────────────────────────────────────
PLATFORMS
SwipesBlue.com • HostsBlue.com • BusinessBlueprint.io
───────────────────────────────────────────────────────────────
© 2026 SwipesBlue. All rights reserved.     Terms • Privacy
```

---

# PART 8: Button & Badge Standards

## Primary Button (Blue Deep)
```css
background: #1844A6;
color: white;
border-radius: 7px;
```
Hover: darker (#133A8A), arrow appears

## Secondary Button (Teal)
```css
background: transparent;
border: 2px solid #064A6C;
color: #064A6C;
border-radius: 7px;
```
Hover: fill with #064A6C, text white

## Status Badges

| Badge | Background | Text |
|-------|------------|------|
| Success | #10B981 | White |
| Pending | #FFD700 | Black |
| Failed | #DC2626 | White |
| FREE | #10B981 | White |
| PRO | #1844A6 | White |
| NEW | #FFD700 | Black |
| POPULAR | #FFD700 | Black |

---

# PART 9: Database Schema (What to Add)

Add these tables to schema.ts:

```typescript
// Customer Portal
export const customerAccounts = pgTable("customer_accounts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  merchantId: varchar("merchant_id").notNull(),
  email: text("email").notNull(),
  passwordHash: text("password_hash").notNull(),
  name: text("name"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  lastLogin: timestamp("last_login"),
});

export const customerPaymentMethods = pgTable("customer_payment_methods", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  customerId: varchar("customer_id").notNull(),
  cardLastFour: text("card_last_four"),
  cardBrand: text("card_brand"),
  token: text("token"),
  isDefault: boolean("is_default").default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const customerSupportTickets = pgTable("customer_support_tickets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  customerId: varchar("customer_id").notNull(),
  merchantId: varchar("merchant_id").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  status: text("status").notNull().default("open"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Security Suite
export const securitySettings = pgTable("security_settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  merchantId: varchar("merchant_id").notNull().unique(),
  velocityEnabled: boolean("velocity_enabled").default(false),
  velocityCardLimit: integer("velocity_card_limit"),
  velocityIpLimit: integer("velocity_ip_limit"),
  velocityWindowMinutes: integer("velocity_window_minutes"),
  geoBlockingEnabled: boolean("geo_blocking_enabled").default(false),
  blockedCountries: json("blocked_countries"),
  deviceFingerprintEnabled: boolean("device_fingerprint_enabled").default(false),
  threedsEnabled: boolean("threeds_enabled").default(false),
  threedsThresholdAmount: decimal("threeds_threshold_amount", { precision: 10, scale: 2 }),
  fraudScoreEnabled: boolean("fraud_score_enabled").default(false),
  fraudScoreDeclineThreshold: integer("fraud_score_decline_threshold"),
  fraudScoreReviewThreshold: integer("fraud_score_review_threshold"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const fraudScores = pgTable("fraud_scores", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  transactionId: varchar("transaction_id").notNull(),
  score: integer("score").notNull(),
  riskFactors: json("risk_factors"),
  decision: text("decision").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const deviceFingerprints = pgTable("device_fingerprints", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fingerprintHash: text("fingerprint_hash").notNull(),
  merchantId: varchar("merchant_id").notNull(),
  isBlocked: boolean("is_blocked").default(false),
  transactionCount: integer("transaction_count").default(0),
  firstSeen: timestamp("first_seen").notNull().defaultNow(),
  lastSeen: timestamp("last_seen").notNull().defaultNow(),
});

export const chargebackAlerts = pgTable("chargeback_alerts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  merchantId: varchar("merchant_id").notNull(),
  transactionId: varchar("transaction_id").notNull(),
  alertType: text("alert_type").notNull(),
  alertSource: text("alert_source"),
  amount: decimal("amount", { precision: 10, scale: 2 }),
  actionTaken: text("action_taken"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Checkout Optimizer
export const checkoutSettings = pgTable("checkout_settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  merchantId: varchar("merchant_id").notNull().unique(),
  oneClickEnabled: boolean("one_click_enabled").default(false),
  expressCheckoutEnabled: boolean("express_checkout_enabled").default(false),
  applePayEnabled: boolean("apple_pay_enabled").default(false),
  googlePayEnabled: boolean("google_pay_enabled").default(false),
  addressAutocompleteEnabled: boolean("address_autocomplete_enabled").default(false),
  smartValidationEnabled: boolean("smart_validation_enabled").default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const abTests = pgTable("ab_tests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  merchantId: varchar("merchant_id").notNull(),
  testName: text("test_name").notNull(),
  variantAConfig: json("variant_a_config"),
  variantBConfig: json("variant_b_config"),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  status: text("status").notNull().default("draft"),
  winner: text("winner"),
});

export const abTestResults = pgTable("ab_test_results", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  testId: varchar("test_id").notNull(),
  variant: text("variant").notNull(),
  sessions: integer("sessions").default(0),
  conversions: integer("conversions").default(0),
  conversionRate: decimal("conversion_rate", { precision: 5, scale: 4 }),
  revenue: decimal("revenue", { precision: 10, scale: 2 }),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const checkoutAnalytics = pgTable("checkout_analytics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  merchantId: varchar("merchant_id").notNull(),
  date: timestamp("date").notNull(),
  cartViews: integer("cart_views").default(0),
  checkoutStarts: integer("checkout_starts").default(0),
  paymentAttempts: integer("payment_attempts").default(0),
  completions: integer("completions").default(0),
  avgTimeToCheckout: integer("avg_time_to_checkout"),
  deviceType: text("device_type"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Shopping Cart Pro
export const savedCarts = pgTable("saved_carts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  customerId: varchar("customer_id"),
  merchantId: varchar("merchant_id").notNull(),
  cartData: json("cart_data").notNull(),
  shareToken: text("share_token").unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  expiresAt: timestamp("expires_at"),
});

export const cartRecommendations = pgTable("cart_recommendations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  merchantId: varchar("merchant_id").notNull(),
  productId: varchar("product_id").notNull(),
  recommendedProductId: varchar("recommended_product_id").notNull(),
  recommendationType: text("recommendation_type").notNull(),
  priority: integer("priority").default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const cartNotes = pgTable("cart_notes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  cartId: varchar("cart_id").notNull(),
  noteText: text("note_text"),
  isGiftMessage: boolean("is_gift_message").default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const inventoryReservations = pgTable("inventory_reservations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  productId: varchar("product_id").notNull(),
  cartId: varchar("cart_id").notNull(),
  quantity: integer("quantity").notNull(),
  reservedAt: timestamp("reserved_at").notNull().defaultNow(),
  expiresAt: timestamp("expires_at").notNull(),
  status: text("status").notNull().default("active"),
});

// Analytics
export const analyticsDaily = pgTable("analytics_daily", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  merchantId: varchar("merchant_id").notNull(),
  date: timestamp("date").notNull(),
  revenue: decimal("revenue", { precision: 10, scale: 2 }),
  transactionCount: integer("transaction_count").default(0),
  successCount: integer("success_count").default(0),
  failedCount: integer("failed_count").default(0),
  avgOrderValue: decimal("avg_order_value", { precision: 10, scale: 2 }),
  newCustomers: integer("new_customers").default(0),
  returningCustomers: integer("returning_customers").default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const analyticsProducts = pgTable("analytics_products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  merchantId: varchar("merchant_id").notNull(),
  productId: varchar("product_id").notNull(),
  date: timestamp("date").notNull(),
  unitsSold: integer("units_sold").default(0),
  revenue: decimal("revenue", { precision: 10, scale: 2 }),
  views: integer("views").default(0),
  addToCartCount: integer("add_to_cart_count").default(0),
});

export const customerLtv = pgTable("customer_ltv", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  customerId: varchar("customer_id").notNull(),
  merchantId: varchar("merchant_id").notNull(),
  totalSpent: decimal("total_spent", { precision: 10, scale: 2 }),
  orderCount: integer("order_count").default(0),
  firstOrderDate: timestamp("first_order_date"),
  lastOrderDate: timestamp("last_order_date"),
  avgOrderValue: decimal("avg_order_value", { precision: 10, scale: 2 }),
  calculatedAt: timestamp("calculated_at").notNull().defaultNow(),
});

export const scheduledReports = pgTable("scheduled_reports", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  merchantId: varchar("merchant_id").notNull(),
  reportType: text("report_type").notNull(),
  recipients: json("recipients"),
  frequency: text("frequency").notNull(),
  lastSent: timestamp("last_sent"),
  nextSend: timestamp("next_send"),
  config: json("config"),
  isActive: boolean("is_active").default(true),
});

// Branding
export const brandSettings = pgTable("brand_settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  merchantId: varchar("merchant_id").notNull().unique(),
  logoUrl: text("logo_url"),
  faviconUrl: text("favicon_url"),
  primaryColor: text("primary_color"),
  secondaryColor: text("secondary_color"),
  backgroundColor: text("background_color"),
  textColor: text("text_color"),
  fontFamily: text("font_family"),
  customFontUrl: text("custom_font_url"),
  removeSwipesblueBranding: boolean("remove_swipesblue_branding").default(false),
  customDomain: text("custom_domain"),
  customDomainVerified: boolean("custom_domain_verified").default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const emailTemplates = pgTable("email_templates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  merchantId: varchar("merchant_id").notNull(),
  templateType: text("template_type").notNull(),
  subject: text("subject"),
  bodyHtml: text("body_html"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const receiptSettings = pgTable("receipt_settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  merchantId: varchar("merchant_id").notNull().unique(),
  showLogo: boolean("show_logo").default(true),
  headerText: text("header_text"),
  footerText: text("footer_text"),
  termsText: text("terms_text"),
  customFields: json("custom_fields"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Subscriptions
export const merchantSubscriptions = pgTable("merchant_subscriptions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  merchantId: varchar("merchant_id").notNull(),
  tier: text("tier").notNull(),
  status: text("status").notNull().default("active"),
  startedAt: timestamp("started_at").notNull().defaultNow(),
  expiresAt: timestamp("expires_at"),
});

export const addonSubscriptions = pgTable("addon_subscriptions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  merchantId: varchar("merchant_id").notNull(),
  addonId: varchar("addon_id").notNull(),
  status: text("status").notNull().default("active"),
  startedAt: timestamp("started_at").notNull().defaultNow(),
  expiresAt: timestamp("expires_at"),
});

// API Logs
export const apiLogs = pgTable("api_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  merchantId: varchar("merchant_id"),
  apiKeyId: varchar("api_key_id"),
  endpoint: text("endpoint"),
  method: text("method"),
  requestBody: json("request_body"),
  responseCode: integer("response_code"),
  responseTimeMs: integer("response_time_ms"),
  ipAddress: text("ip_address"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
```

---

# PART 10: Execution Plan

| Step | Task | Deliverable |
|------|------|-------------|
| 1 | Verify/fix header (logo icon + code-built company name) | Screenshot |
| 2 | Fix Products page (remove stock, change to Subscribe, add badges) | Screenshot |
| 3 | Add competitor comparison table to Homepage | Screenshot |
| 4 | Build Footer with platform links | Screenshot |
| 5 | Add 5 buttons to Rate Management + DeepSeek integration | Screenshot + demo |
| 6 | Add all new database tables to schema.ts | Schema file |
| 7 | Seed 8 correct add-on products | Database confirmation |
| 8 | Build Add-On #6: Advanced Analytics (replace placeholder) | Screenshot |
| 9 | Build Add-On #4: Checkout Optimizer | Screenshot |
| 10 | Enhance Add-On #7: Brand Studio | Screenshot |
| 11 | Build Add-On #1: Customer Portal | Screenshot |
| 12 | Build Add-On #5: Shopping Cart Pro | Screenshot |
| 13 | Build Add-On #3: Security Suite | Screenshot |
| 14 | Build Add-On #8: API Integration (docs pages) | Screenshot |
| 15 | Build Add-On #2: Multi-Gateway | Screenshot |
| 16 | Build documentation pages (/docs/*) | Screenshot |
| 17 | Build support pages (/support, /contact, /status) | Screenshot |
| 18 | Create or embed demo video on Homepage | Screenshot |
| 19 | Full page audit | Route list |
| 20 | Final review | Walkthrough |

---

# PART 11: Critical Reminders

1. **Read this ENTIRE prompt first**
2. **Complete ONE step at a time, show screenshot, wait for approval**
3. **HEADER: Logo ICON image + company name in CODE — not full lockup**
4. **Blue Deep (#1844A6) and Teal (#064A6C) are UI colors — not logo colors**
5. **Products page: REMOVE stock numbers, change to Subscribe**
6. **Add-ons are ANNUAL ($149.99-$449.99/year) not monthly**
7. **Each add-on needs FULL FUNCTIONALITY — not just database entries**
8. **Rate Management needs 5 buttons + DeepSeek AI**
9. **All rate changes logged to ratesAuditLog**
10. **Users must NEVER be trapped — always provide back navigation**
11. **Platform links in sidebar: SwipesBlue, HostsBlue, BusinessBlueprint.io**
12. **Do NOT publish until all steps complete and approved**

---

**Present your plan for ALL 20 steps. Wait for approval before executing.**
