# SwipesBlue — MASTER BUILD PROMPT

**Before making ANY changes, read this ENTIRE prompt. Then present your plan and wait for approval.**

**This is the complete specification for SwipesBlue. Do not skip any section.**

---

# TABLE OF CONTENTS

1. Business Overview & How We Sell
2. Brand Assets
3. Brand Color Palette
4. Subscription Tiers & Pricing
5. Add-On Products (8 Products — Full Specs)
6. Rate Management Worksheet (Admin Tool)
7. Competitive Positioning
8. Navigation Structure
9. Homepage Structure
10. Pricing Page Structure
11. Products Page Structure
12. Dashboard & Admin Navigation
13. Button & Badge Standards
14. Footer Structure
15. Pages to Create/Update
16. Animated Demo Video
17. Database Schema (All Tables)
18. Execution Plan
19. Critical Reminders

---

# PART 1: Business Overview & How We Sell

## What SwipesBlue Is

SwipesBlue is a **payment gateway and e-commerce platform**. We provide merchants with everything they need to sell online — shopping cart, checkout, order management, and payment processing — powered by NMI on the backend.

## Target Audience

- **Primary:** Gen X small business owners (40-55 years old) who want simple, reliable payment processing
- **Secondary:** Novice developers who need payment integration without complexity

## How We Make Money (3 Revenue Streams)

### Revenue Stream 1: Transaction Fees
- Applied to EVERY transaction processed through SwipesBlue
- Default rate: **2.70% + $0.30** per transaction
- Our cost from NMI: ~2.20% + $0.30 (Interchange Plus)
- Our margin: **0.50%** per transaction
- This is our primary revenue driver — even FREE tier merchants generate transaction revenue

### Revenue Stream 2: Subscription Tiers (Monthly)
- Recurring monthly fees for platform access
- Higher tiers unlock more features
- Tiers: FREE → Starter ($29) → Pro ($79) → Enterprise ($299)

### Revenue Stream 3: Add-On Products (Annual Subscriptions)
- 8 add-on products that enhance any tier
- Annual subscriptions ($149.99 - $449.99/year)
- Some have FREE versions with limited functionality
- Can be stacked with any subscription tier

## Key Differentiator

**"WooCommerce is free until it isn't."**

WooCommerce + Stripe charges 2.9% + $0.30 PLUS merchants need hosting ($10-50/mo), abandoned cart plugins ($79-399/year), analytics plugins ($99-199/year), etc.

SwipesBlue gives everything in one platform with LOWER transaction fees.

---

# PART 2: Brand Assets

## Asset Files (Use These Exactly)

| Asset | File Name | Usage |
|-------|-----------|-------|
| Company Name | `swipesblue_Company_Name.png` | Text-only logo |
| Logo (Icon) | `swipesblue_logo.png` | Icon only (card with blue swipe ring) |
| Full Lockup | `swipesblue_Company_Name_with_Logo.png` | Icon + text combined — USE FOR HEADER |
| URL Version | `swipesblue_url.png` | With .com in green |
| Color Palette | `Color_palette.webp` | Reference |

**Note:** All assets have transparent backgrounds. No background removal needed.

## Terminology (Add to replit.md)

- **Company Name** = the text "swipesblue"
- **Logo** = the icon only (card with blue swipe ring)
- **Company Name + Logo** = full lockup (icon + text)
- **URL** = web address version (with .com in green)

## Company Name Creation Standard (If Building in Code)

If creating the company name in code/text rather than using the image asset:

1. Use lowercase **Archivo Semi Expanded** for "swipes" — color: #374151 (Charcoal Gray)
2. Use lowercase **Archivo Narrow** for "blue" — color: #0000FF (Blue Pure)
3. Combine as one word: "swipesblue"
4. Create a solid black (#09080E) version behind each word
5. Offset black versions 1pt right, 1pt down (shadow effect)
6. Apply glow shadow:
   - Angle: 0° | Blur: 100pt | Distance: 100pt | Color: #FFFFFF at 10% opacity
   - Apply same to black version at angle: 180°
7. **Font size for navigation header: 24px**

---

# PART 3: Brand Color Palette

**This is the FINAL palette. Remove ALL old colors (including #FF0040, #00FF40, etc.).**

| Color | Hex | Usage |
|-------|-----|-------|
| Charcoal Gray | #374151 | "swipes" in logo ONLY |
| Blue Pure | #0000FF | "blue" in logo, major headlines ONLY |
| Blue Deep | #1844A6 | Primary buttons, links, active states, everyday UI |
| Teal | #064A6C | Secondary buttons, dark sections |
| Trusted Green | #10B981 | Success states, success badges, ".com" in URL |
| Gold | #FFD700 | Pending states, warnings, featured badges |
| Muted Red | #DC2626 | Error/failed states ONLY |
| Pro Gray | #4B5563 | Secondary text |
| Black | #09080E | Body text, headings |
| White | #FFFFFF | Backgrounds, text on dark |

## Color Rules

1. **Logo colors (Charcoal Gray + Blue Pure) are RESERVED** — never use for general UI
2. **Blue Deep (#1844A6)** = Primary workhorse (buttons, links, active states)
3. **Teal (#064A6C)** = Secondary workhorse (secondary buttons, dark sections)
4. **Status colors are strict:**
   - Success = Trusted Green (#10B981)
   - Pending/Warning = Gold (#FFD700)
   - Error/Failed = Muted Red (#DC2626)
5. **Remove ALL colors not in this palette**

---

# PART 4: Subscription Tiers & Pricing

**IMPORTANT: All rates below are DEFAULT values. Actual rates are managed through the Rate Management Worksheet in Admin and pulled dynamically from the database.**

## E-Commerce Suite Tiers

| Tier | Monthly | Transaction Fee | Features |
|------|---------|-----------------|----------|
| **FREE** | $0 | 2.70% + $0.30 | Product Catalog (25 max), Shopping Cart, Basic Checkout, Order History, Basic Dashboard |
| **Starter** | $29 | 2.70% + $0.30 | + Unlimited products, Abandoned Cart Recovery (basic), Discount Codes, Basic Analytics |
| **Pro** | $79 | 2.70% + $0.30 | + Brand Studio, Advanced Abandoned Cart (dynamic coupons), Inventory Alerts, Advanced Analytics, Priority Support |
| **Enterprise** | $299 | 2.70% + $0.30 | + Multi-store, API Access, Webhooks, Custom Integrations, Dedicated Support |

## Developer Tools Tiers

| Tier | Monthly | Transaction Fee | Features |
|------|---------|-----------------|----------|
| **Payment API** | $0 | 2.70% + $0.30 | Full API access, Webhooks, Documentation |
| **API Pro** | $99 | 2.70% + $0.30 | + Higher rate limits, Priority support, Technical account manager |

## Additional Fees (Default)

| Fee Type | Amount |
|----------|--------|
| Chargeback Fee | $15.00 |
| ACH Return Fee | $25.00 |
| Voice Auth Fee | $0.45 |
| Retrieval Request Fee | $5.00 |
| Regulatory/1099 Fee | $6.95 |
| Monthly Minimum | $10.00 |

---

# PART 5: Add-On Products (8 Products)

All add-ons are **annual subscriptions**. Some have FREE versions with limited functionality.

## Add-On #1: Customer Portal Access

**Price:** FREE (limited) / $179.99/year (full)

**What It Is:** Self-service portal where merchant's customers can view orders, download invoices, manage payment methods, and submit support tickets.

### FREE Version
- View last 10 orders only
- View order status

### PAID Version ($179.99/year)
- Unlimited order history
- Download invoices as PDF
- Manage saved payment methods (add/remove/update cards)
- Subscription management (pause, cancel, update)
- Support ticket submission
- Order tracking (if merchant provides tracking numbers)

### Database Tables
```sql
customer_accounts (
  id, merchant_id, email, password_hash, name, created_at, last_login
)

customer_payment_methods (
  id, customer_id, card_last_four, card_brand, token, is_default, created_at
)

customer_support_tickets (
  id, customer_id, merchant_id, subject, message, status, created_at, updated_at
)
```

### Pages to Build
- `/portal/login` — customer login
- `/portal/orders` — order history
- `/portal/orders/[id]` — order detail + invoice download
- `/portal/payment-methods` — manage saved cards
- `/portal/subscriptions` — manage subscriptions
- `/portal/support` — support tickets

### Merchant Dashboard Integration
- Toggle to enable/disable portal
- View customer support tickets
- Manage customer accounts

### Ties Into
- Checkout (save payment method option)
- Orders (data displayed in portal)
- NMI Vault (tokenized card storage)

---

## Add-On #2: Multi-Gateway Support

**Price:** $449.99/year (no free version)

**Restriction:** Pro and Enterprise tiers only

**What It Is:** Connect multiple payment processors and route transactions based on rules.

### PAID Version Features
- Connect up to 3 additional gateways (Stripe, PayPal/Braintree, Authorize.net, Square)
- Smart routing rules:
  - By card type (Amex → Processor A, Visa/MC → Processor B)
  - By amount (orders over $500 → Processor A)
  - By geography (international cards → Processor B)
  - By percentage (load balancing)
- Failover protection (auto-retry on secondary if primary fails)
- Split processing across multiple processors

### Database Tables
```sql
merchant_gateways (
  id, merchant_id, gateway_type, api_key_encrypted, api_secret_encrypted,
  is_active, is_primary, created_at
)

gateway_routing_rules (
  id, merchant_id, rule_type, condition_value, target_gateway_id, priority, is_active
)

gateway_failover_log (
  id, merchant_id, original_gateway_id, failover_gateway_id, transaction_id, reason, created_at
)
```

### Pages to Build
- `/dashboard/gateways` — list connected gateways
- `/dashboard/gateways/connect` — connect new gateway
- `/dashboard/gateways/routing` — configure routing rules
- `/dashboard/gateways/failover` — failover settings
- `/dashboard/gateways/logs` — failover event log

### Ties Into
- Checkout (gateway selection)
- Admin Transactions (show which gateway processed)
- Webhooks (receive events from multiple gateways)

---

## Add-On #3: Transaction Security Suite

**Price:** FREE (basic) / $399.99/year (full)

**What It Is:** Advanced fraud prevention and security tools.

### FREE Version
- AVS (Address Verification Service)
- CVV verification

### PAID Version ($399.99/year)
- Velocity checks (flag/block multiple transactions from same card/IP)
- Geolocation blocking (block/whitelist countries)
- Device fingerprinting
- 3D Secure 2.0 integration
- Real-time fraud scoring (AI-based 0-100 score)
- Manual review queue for mid-range scores
- Chargeback alerts (Verifi, Ethoca integration)
- Auto-refund option to prevent chargebacks

### Database Tables
```sql
security_settings (
  id, merchant_id, velocity_enabled, velocity_card_limit, velocity_ip_limit,
  velocity_window_minutes, geo_blocking_enabled, blocked_countries,
  device_fingerprint_enabled, 3ds_enabled, 3ds_threshold_amount,
  fraud_score_enabled, fraud_score_decline_threshold, fraud_score_review_threshold,
  created_at, updated_at
)

fraud_scores (
  id, transaction_id, score, risk_factors, decision, created_at
)

device_fingerprints (
  id, fingerprint_hash, merchant_id, is_blocked, transaction_count, first_seen, last_seen
)

chargeback_alerts (
  id, merchant_id, transaction_id, alert_type, alert_source, amount, action_taken, created_at
)
```

### Pages to Build
- `/dashboard/security` — main security settings
- `/dashboard/security/velocity` — velocity rules
- `/dashboard/security/geo` — geo blocking
- `/dashboard/security/3ds` — 3D Secure config
- `/dashboard/security/fraud-scores` — fraud score history
- `/dashboard/security/review-queue` — manual review queue
- `/dashboard/security/chargebacks` — chargeback alerts

### Ties Into
- Checkout (security checks at payment time)
- Dashboard (security metrics)
- Webhooks (fraud event alerts)

---

## Add-On #4: Checkout Optimizer

**Price:** FREE (basic) / $249.99/year (full)

**What It Is:** Tools to reduce cart abandonment and increase conversion.

### FREE Version
- Basic one-page checkout
- Standard form validation

### PAID Version ($249.99/year)
- One-click checkout (returning customers skip form entry)
- Express checkout buttons (Apple Pay, Google Pay)
- Address autocomplete (Google Places)
- Smart form validation (real-time, inline errors)
- Checkout A/B testing
- Conversion analytics (funnel visualization)

### Database Tables
```sql
checkout_settings (
  id, merchant_id, one_click_enabled, express_checkout_enabled,
  apple_pay_enabled, google_pay_enabled, address_autocomplete_enabled,
  smart_validation_enabled, created_at, updated_at
)

ab_tests (
  id, merchant_id, test_name, variant_a_config, variant_b_config,
  start_date, end_date, status, winner
)

ab_test_results (
  id, test_id, variant, sessions, conversions, conversion_rate, revenue, updated_at
)

checkout_analytics (
  id, merchant_id, date, cart_views, checkout_starts, payment_attempts,
  completions, avg_time_to_checkout, device_type, created_at
)
```

### Pages to Build
- `/dashboard/checkout-optimizer` — main settings
- `/dashboard/checkout-optimizer/express` — express checkout config
- `/dashboard/checkout-optimizer/ab-tests` — A/B test management
- `/dashboard/checkout-optimizer/analytics` — conversion funnel

### External Integrations
- Google Places API
- Apple Pay (via NMI)
- Google Pay (via NMI)

### Ties Into
- Checkout (all features apply here)
- Shopping Cart (express buttons)
- Customer Portal (saved payment methods)

---

## Add-On #5: Shopping Cart Pro

**Price:** FREE (basic) / $349.99/year (full)

**What It Is:** Advanced shopping cart features.

### FREE Version
- Add to cart
- Update quantity
- Remove items
- View subtotal

### PAID Version ($349.99/year)
- Save cart for later (with email reminder)
- Cart sharing (generate link, recipient loads same cart)
- Cross-sell / upsell suggestions
- Cart notes (special instructions, gift messages)
- Multi-currency display
- Inventory reservation (hold items for X minutes, countdown timer)

### Database Tables
```sql
saved_carts (
  id, customer_id, merchant_id, cart_data, share_token, created_at, expires_at
)

cart_recommendations (
  id, merchant_id, product_id, recommended_product_id, recommendation_type, priority, created_at
)

cart_notes (
  id, cart_id, note_text, is_gift_message, created_at
)

inventory_reservations (
  id, product_id, cart_id, quantity, reserved_at, expires_at, status
)
```

### Pages to Build
- `/dashboard/cart-settings` — main cart config
- `/dashboard/cart-settings/recommendations` — cross-sell/upsell
- `/dashboard/cart-settings/inventory` — reservation settings

### Ties Into
- Shopping Cart (all features)
- Products (recommendations)
- Checkout (notes passed to order)

---

## Add-On #6: Advanced Analytics Dashboard

**Price:** FREE (basic) / $199.99/year (full)

**What It Is:** Deep reporting and business intelligence.

### FREE Version
- Total revenue (today, week, month)
- Transaction count
- Success rate
- Last 5 transactions

### PAID Version ($199.99/year)
- Revenue breakdown (by product, category, time period, payment method)
- Customer analytics (LTV, AOV, purchase frequency, new vs returning)
- Cohort analysis
- Funnel visualization (product view → cart → checkout → purchase)
- Exportable reports (CSV, PDF)
- Scheduled email reports
- Custom date ranges
- Year-over-year comparison

### Database Tables
```sql
analytics_daily (
  id, merchant_id, date, revenue, transaction_count, success_count, failed_count,
  avg_order_value, new_customers, returning_customers, created_at
)

analytics_products (
  id, merchant_id, product_id, date, units_sold, revenue, views, add_to_cart_count
)

customer_ltv (
  id, customer_id, merchant_id, total_spent, order_count, first_order_date,
  last_order_date, avg_order_value, calculated_at
)

scheduled_reports (
  id, merchant_id, report_type, recipients, frequency, last_sent, next_send, config, is_active
)
```

### Pages to Build
- `/dashboard/analytics` — main dashboard
- `/dashboard/analytics/revenue` — revenue breakdown
- `/dashboard/analytics/customers` — customer analytics
- `/dashboard/analytics/cohorts` — cohort analysis
- `/dashboard/analytics/funnels` — funnel visualization
- `/dashboard/analytics/reports` — scheduled reports
- `/dashboard/analytics/export` — manual export

### Ties Into
- All transactions
- Products
- Customers
- Orders

---

## Add-On #7: Custom Branding Package (Brand Studio)

**Price:** FREE (SwipesBlue branding) / $149.99/year (white-label)

**Note:** This is the same as Brand Studio in Pro tier. Standalone purchase unlocks for FREE/Starter users.

### FREE Version
- SwipesBlue logo on checkout
- "Powered by SwipesBlue" footer
- Default colors

### PAID Version ($149.99/year)
- Custom logo (checkout, receipts, portal)
- Custom colors (primary, secondary, background, text)
- Custom fonts (Google Fonts or upload)
- Remove "Powered by SwipesBlue"
- Custom email templates
- Custom receipt design
- Custom checkout domain (checkout.yourdomain.com)

### Database Tables
```sql
brand_settings (
  id, merchant_id, logo_url, favicon_url, primary_color, secondary_color,
  background_color, text_color, font_family, custom_font_url,
  remove_swipesblue_branding, custom_domain, custom_domain_verified,
  created_at, updated_at
)

email_templates (
  id, merchant_id, template_type, subject, body_html, is_active, created_at, updated_at
)

receipt_settings (
  id, merchant_id, show_logo, header_text, footer_text, terms_text, custom_fields,
  created_at, updated_at
)
```

### Pages to Build (Enhance existing Brand Studio)
- `/dashboard/brand-studio` — main page
- `/dashboard/brand-studio/colors` — color picker
- `/dashboard/brand-studio/fonts` — font selection
- `/dashboard/brand-studio/emails` — email template editor
- `/dashboard/brand-studio/receipts` — receipt customization
- `/dashboard/brand-studio/domain` — custom domain setup

### Ties Into
- Checkout (branding applied)
- Customer Portal (branding applied)
- Emails (templates)
- Invoices/Receipts

---

## Add-On #8: Premium Payment Gateway Integration

**Price:** $299.99/year (no free version)

**Note:** This is the same as API Access in Enterprise tier. Standalone purchase unlocks for FREE/Starter/Pro users.

### PAID Version Features
- Full REST API access (transactions, refunds, voids, customers, payment methods, subscriptions)
- Webhooks (real-time event notifications with retry logic)
- API keys management (test/live keys, rotation, permissions)
- Sandbox environment
- SDK libraries (JavaScript, PHP, Python, Ruby)
- Technical documentation
- Developer support

### Database Tables
```sql
api_keys (
  id, merchant_id, key_type, key_hash, key_prefix, permissions,
  last_used, request_count, created_at, revoked_at
)

webhooks (
  id, merchant_id, endpoint_url, events, secret_key, is_active, created_at
)

webhook_deliveries (
  id, webhook_id, event_type, payload, response_code, response_body,
  attempts, delivered_at, created_at
)

api_logs (
  id, merchant_id, api_key_id, endpoint, method, request_body,
  response_code, response_time_ms, ip_address, created_at
)
```

### Pages to Build
- `/dashboard/developers` — developer hub
- `/dashboard/developers/api-keys` — API key management
- `/dashboard/developers/webhooks` — webhook management
- `/dashboard/developers/logs` — API request logs
- `/dashboard/developers/docs` — embedded docs

### Public Pages
- `/developers` — public developer landing
- `/docs` — documentation home
- `/docs/api` — API reference
- `/docs/webhooks` — webhook guide
- `/docs/sdks` — SDK downloads

### API Endpoints
```
POST   /api/v1/transactions
GET    /api/v1/transactions
GET    /api/v1/transactions/:id
POST   /api/v1/transactions/:id/refund
POST   /api/v1/transactions/:id/void

POST   /api/v1/customers
GET    /api/v1/customers
GET    /api/v1/customers/:id
PUT    /api/v1/customers/:id
DELETE /api/v1/customers/:id

POST   /api/v1/payment-methods
GET    /api/v1/payment-methods
DELETE /api/v1/payment-methods/:id

POST   /api/v1/subscriptions
GET    /api/v1/subscriptions
GET    /api/v1/subscriptions/:id
PUT    /api/v1/subscriptions/:id
DELETE /api/v1/subscriptions/:id
```

---

# PART 6: Rate Management Worksheet (Admin Tool)

**This is a critical admin tool. Build in Admin panel under "Rate Management".**

## Purpose

Allows admin to:
- Set and adjust all transaction rates and fees
- Research rates against competitors and cost baseline
- Stage rates for review before activation
- Compare proposed rates to current active rates

## Section 1: Your Costs (Baseline)

| Field | Description | Default |
|-------|-------------|---------|
| Interchange Plus Markup (%) | NMI percentage cost | 2.20% |
| Per-Transaction Cost ($) | NMI per-item cost | $0.30 |
| Target Margin (%) | **YOUR PROFIT GOAL** | 0.50% |

## Section 2: Subscription Fees

| Tier | Monthly Fee |
|------|-------------|
| FREE | $0 (locked) |
| Starter | $_______ |
| Pro | $_______ |
| Enterprise | $_______ |
| API Pro | $_______ |

## Section 3: Transaction Fees

| Tier | Percent (%) | Per Item ($) |
|------|-------------|--------------|
| FREE | _____% | $_____ |
| Starter | _____% | $_____ |
| Pro | _____% | $_____ |
| Enterprise | _____% | $_____ |
| Payment API | _____% | $_____ |
| API Pro | _____% | $_____ |

## Section 4: Additional Fees

| Fee Type | Amount ($) |
|----------|------------|
| Chargeback Fee | $_____ |
| ACH Return Fee | $_____ |
| Voice Auth Fee | $_____ |
| Retrieval Request Fee | $_____ |
| Regulatory/1099 Fee | $_____ |
| Monthly Minimum | $_____ |
| Non-Swiped Fee (extra %) | _____% |

## 5 Buttons

### Button 1: 💾 SAVE DRAFT
- Saves values to local/draft storage
- Does NOT upload or affect live rates
- Shows: "Draft saved at [timestamp]"

### Button 2: 🔍 RESEARCH
- Triggers DeepSeek AI analysis
- Performs:
  1. **Margin Check:** (Your Rate - Your Cost) vs Target Margin
  2. **Competitor Check:** Current Stripe, PayPal, Square, WooCommerce rates
  3. **Flags:**
     - ❌ RED: Margin below target
     - ⚠️ YELLOW: Rate higher than competitor
     - ✅ GREEN: Margin met and competitive
- Returns report with margins, competitor table, recommendations
- Must complete before Upload enabled

### Button 3: ⬆️ UPLOAD
- Pushes rates to database as STAGED (not active)
- Only enabled after Research (or admin override)
- Shows: "Rates staged at [timestamp]"

### Button 4: ✅ ACTIVATE
- Makes staged rates LIVE
- Requires confirmation dialog
- Shows: "Rates activated at [timestamp]"
- Logs to audit trail

### Button 5: 📊 COMPARE
- Side-by-side view:
  - Current ACTIVE rates
  - STAGED rates
  - DRAFT rates
  - Competitor rates from Research
- Highlights differences
- Shows margin for each

## Research Report Format

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
├── Your Margin: 0.50% + $0.00
└── Status: ✅ MEETS TARGET

[...all tiers...]

───────────────────────────────────────────────────────────────
COMPETITOR COMPARISON (on $100 transaction)
───────────────────────────────────────────────────────────────

| Provider           | Rate           | Fee on $100 | vs SwipesBlue |
|--------------------|----------------|-------------|---------------|
| SwipesBlue FREE    | 2.70% + $0.30  | $3.00       | --            |
| Stripe             | 2.90% + $0.30  | $3.20       | You save $0.20|
| PayPal             | 2.99% + $0.49  | $3.48       | You save $0.48|
| Square (online)    | 2.90% + $0.30  | $3.20       | You save $0.20|
| WooCommerce+Stripe | 2.90% + $0.30  | $3.20       | You save $0.20|

───────────────────────────────────────────────────────────────
SUMMARY
───────────────────────────────────────────────────────────────

✅ All tiers meet target margin
✅ Rates are competitive vs all major providers
✅ READY TO UPLOAD

═══════════════════════════════════════════════════════════════
```

## Database Schema for Rates

```sql
rates_active (
  id, tier, subscription_monthly, transaction_percent,
  transaction_per_item, activated_at, activated_by
)

rates_staged (
  id, tier, subscription_monthly, transaction_percent,
  transaction_per_item, uploaded_at, uploaded_by
)

fees_active (
  id, fee_type, amount, activated_at
)

fees_staged (
  id, fee_type, amount, uploaded_at
)

costs_baseline (
  id, interchange_percent, per_transaction, target_margin,
  updated_at, updated_by
)

rates_audit_log (
  id, action, old_values, new_values, performed_by, performed_at
)
```

## Where Rates Display

Once activated, rates dynamically populate:
- Pricing Page
- Checkout (fee calculation)
- Dashboard
- API Documentation
- Comparison tables

---

# PART 7: Competitive Positioning

## SwipesBlue vs Competitors

### Transaction Fee Comparison (on $100 sale)

| Provider | Rate | Fee | Customer Keeps |
|----------|------|-----|----------------|
| **SwipesBlue** | 2.70% + $0.30 | **$3.00** | **$97.00** |
| Stripe | 2.90% + $0.30 | $3.20 | $96.80 |
| PayPal | 2.99% + $0.49 | $3.48 | $96.52 |
| Square (online) | 2.90% + $0.30 | $3.20 | $96.80 |
| WooCommerce + Stripe | 2.90% + $0.30 | $3.20 | $96.80 |

**SwipesBlue saves $0.20-$0.48 per $100 transaction.**

### WooCommerce Total Cost Comparison

A merchant doing $10,000/month in sales:

**WooCommerce + Stripe:**
- Hosting: ~$30/month = $360/year
- Stripe fees (2.9% + $0.30): ~$320/month = $3,840/year
- Abandoned cart plugin: ~$149/year
- Analytics plugin: ~$99/year
- **Total: ~$4,448/year**

**SwipesBlue Pro ($79/month):**
- Platform: $948/year
- Transaction fees (2.70% + $0.30): ~$290/month = $3,480/year
- Abandoned cart, analytics, brand studio: INCLUDED
- **Total: ~$4,428/year — PLUS better features**

### Key Messages

- "Less fees. More revenue."
- "Save up to $0.48 per transaction vs PayPal"
- "WooCommerce is free until it isn't"
- "Everything included. No plugin headaches."
- "Zero WordPress. Zero maintenance."

---

# PART 8: Navigation Structure

## Header

```
[Logo + Company Name]  Products ▼  Pricing  Resources ▼  Dashboard  [Sign In] [Get Started →]
```

## Products Mega Menu

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   E-COMMERCE SUITE                    │   DEVELOPER TOOLS                   │
│   Everything you need to sell online  │   Build custom integrations         │
│                                       │                                     │
│   🛒 Product Catalog          FREE    │   </> Payment API        FREE       │
│   🛍️ Shopping Cart            FREE    │   🔗 Webhooks           FREE       │
│   💳 Checkout                 FREE    │   🔑 API Keys           FREE       │
│   📦 Order Management         FREE    │   📚 Documentation      FREE       │
│   🎨 Brand Studio             PRO     │                                     │
│   📧 Abandoned Cart Recovery  NEW     │                                     │
│                                       │                                     │
│   [View All Features →]               │   [View API Docs →]                 │
│                                       │                                     │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Resources Mega Menu

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   DOCUMENTATION                │   SUPPORT                                  │
│                                │                                            │
│   📖 Getting Started           │   💬 Help Center                           │
│   </> API Reference            │   📞 Contact Sales                         │
│   🔧 Integration Guides        │   📊 System Status                         │
│                                │                                            │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

# PART 9: Homepage Structure

## Hero Section

- **Headline:** "Built for businesses to grow"
- **Subheadline:** "Less fees. More revenue."
- **Description:** "Simple payment processing for small businesses and developers. Accept cards, manage transactions, and scale without complexity."
- **Primary CTA:** "Start Free →" (Blue Deep)
- **Secondary CTA:** "Watch Demo" (Teal outline)
- **Hero image:** marching_colors.png with caption "Stand out from the crowd"
- **Trust badges:** PCI Compliant, Real-time Processing, Global Payments

## Demo Section

- **Heading:** "See SwipesBlue in Action"
- **Embed animated demo video** (see Part 16)
- **CTA:** "Try It Free →"

## Feature Comparison Section

- **Heading:** "Why Choose SwipesBlue?"
- Three cards:
  1. FREE to Start — Full e-commerce suite at $0
  2. All-in-One — Cart, checkout, orders, payments in one platform
  3. Developer Friendly — Full API, webhooks, documentation

## Pricing Preview Section

- Show 4 tier cards (FREE, Starter, Pro, Enterprise)
- Link to full Pricing page

## Competitor Comparison Section

- **Heading:** "Save on Every Transaction"
- Table showing SwipesBlue vs Stripe vs PayPal vs Square
- Highlight savings

## CTA Section

- **Heading:** "Ready to build better commerce?"
- **CTA:** "Get Started Free"

---

# PART 10: Pricing Page Structure

## Section 1: E-Commerce Suite

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                        E-Commerce Suite                                     │
│            Everything you need to sell online                               │
│                                                                             │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐       │
│   │    FREE     │  │   STARTER   │  │     PRO     │  │ ENTERPRISE  │       │
│   │             │  │             │  │   POPULAR   │  │             │       │
│   │    $0/mo    │  │   $29/mo    │  │   $79/mo    │  │  $299/mo    │       │
│   │             │  │             │  │             │  │             │       │
│   │ [features]  │  │ [features]  │  │ [features]  │  │ [features]  │       │
│   │             │  │             │  │             │  │             │       │
│   │[Start Free] │  │[Get Started]│  │[Get Started]│  │[Contact Us] │       │
│   └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘       │
│                                                                             │
│              + 2.70% + $0.30 per transaction on all plans                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Section 2: Developer API

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                         Developer API                                       │
│              Build custom payment integrations                              │
│                                                                             │
│   ┌───────────────────────────┐  ┌───────────────────────────┐             │
│   │       PAYMENT API         │  │         API PRO           │             │
│   │                           │  │                           │             │
│   │    2.70% + $0.30          │  │   $99/mo + 2.70% + $0.30  │             │
│   │                           │  │                           │             │
│   │ [features]                │  │ [features]                │             │
│   │                           │  │                           │             │
│   │    [Get API Keys →]       │  │    [Contact Sales →]      │             │
│   └───────────────────────────┘  └───────────────────────────┘             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Section 3: Add-Ons

Show all 8 add-ons with:
- Name
- FREE/PAID badge
- Annual price
- Brief description
- "Learn More" link

## Section 4: Competitor Comparison

Table showing SwipesBlue vs Stripe vs PayPal vs WooCommerce

## Section 5: FAQ

Common pricing questions

---

# PART 11: Products Page Structure

## Remove
- Stock numbers ("90 in stock") — **software doesn't have stock**

## Updates
- Change "Add to Cart" to "Subscribe" for annual products
- Show annual price clearly ($X/year)
- Add FREE/PAID badges
- Add "Included in [Tier]" badges where applicable

## Sections

### Section 1: E-Commerce Add-Ons
- Customer Portal Access
- Checkout Optimizer
- Shopping Cart Pro
- Custom Branding Package
- Advanced Analytics Dashboard

### Section 2: Security & Compliance
- Transaction Security Suite

### Section 3: Developer Tools
- Premium Payment Gateway Integration
- Multi-Gateway Support

---

# PART 12: Dashboard & Admin Navigation

## Problem
Users get trapped in Dashboard/Admin with no way back to main site.

## Solution

### Dashboard Layout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [Logo]  Products ▼   Pricing   Resources ▼   Dashboard   [Account ▼]       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  SIDEBAR                    │  MAIN CONTENT                                 │
│                             │                                               │
│  📊 Overview                │                                               │
│  📦 Products                │                                               │
│  🛒 Orders                  │                                               │
│  💳 Transactions            │                                               │
│  📧 Abandoned Carts    PRO  │                                               │
│  🎨 Brand Studio       PRO  │                                               │
│  📈 Analytics               │                                               │
│  🔒 Security                │                                               │
│  ⚙️ Settings                │                                               │
│                             │                                               │
│  ─────────────────          │                                               │
│  DEVELOPER                  │                                               │
│  🔑 API Keys                │                                               │
│  🔗 Webhooks                │                                               │
│                             │                                               │
│  ─────────────────          │                                               │
│  PLATFORMS                  │                                               │
│  → SwipesBlue.com           │                                               │
│  → HostsBlue.com            │                                               │
│  → BusinessBlueprint.io     │                                               │
│                             │                                               │
│  ─────────────────          │                                               │
│  Your Plan: FREE            │                                               │
│  [Upgrade to Pro →]         │                                               │
│                             │                                               │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Admin Layout

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [Logo]  ← Back to Site                                    [Admin Account ▼] │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  SIDEBAR                    │  MAIN CONTENT                                 │
│                             │                                               │
│  📊 Dashboard               │                                               │
│  👥 Merchants               │                                               │
│  💳 Transactions            │                                               │
│  💰 Rate Management    NEW  │                                               │
│  🔑 API Keys                │                                               │
│  🔗 Webhooks                │                                               │
│  🎨 Brand Studio            │                                               │
│                             │                                               │
│  ─────────────────          │                                               │
│  PLATFORMS                  │                                               │
│  → SwipesBlue.com           │                                               │
│  → HostsBlue.com            │                                               │
│  → BusinessBlueprint.io     │                                               │
│                             │                                               │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Navigation Rules
1. Header logo ALWAYS clickable → returns to homepage
2. "← Back to Site" link in admin
3. Platform switcher in sidebar
4. Main nav visible in Dashboard
5. Upgrade prompts show current plan

---

# PART 13: Button & Badge Standards

## Primary Button (Blue Deep)

```css
.btn-primary {
  background: #1844A6;
  color: white;
  border-radius: 7px;
  padding: 12px 24px;
  text-align: center;
  transition: all 0.15s ease;
}
.btn-primary:hover { background: #133A8A; }
.btn-primary .arrow {
  opacity: 0;
  transform: translateX(-8px);
  transition: all 0.15s ease;
}
.btn-primary:hover .arrow {
  opacity: 1;
  transform: translateX(0);
}
```

## Secondary Button (Teal)

```css
.btn-secondary {
  background: transparent;
  border: 2px solid #064A6C;
  color: #064A6C;
  border-radius: 7px;
  padding: 12px 24px;
}
.btn-secondary:hover {
  background: #064A6C;
  color: white;
}
```

## Button Rules
- ALL buttons: text CENTERED, border-radius: 7px
- Hover: arrow (→) appears, animates in
- Apply site-wide

## Status Badges

| Status | Background | Text |
|--------|------------|------|
| Success | #10B981 | White |
| Pending | #FFD700 | Black |
| Failed | #DC2626 | White |
| Info | #1844A6 | White |
| FREE | #10B981 | White |
| NEW | #FFD700 | Black |
| PRO | #1844A6 | White |
| POPULAR | #FFD700 | Black |

---

# PART 14: Footer Structure

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   [Logo]                                                                    │
│   Built for businesses to grow                                              │
│                                                                             │
│   PRODUCTS              DEVELOPERS           RESOURCES           COMPANY    │
│                                                                             │
│   E-Commerce Suite      API Documentation    Help Center         About      │
│   Shopping Cart         API Reference        Getting Started     Blog       │
│   Checkout              Webhooks             Guides              Careers    │
│   Order Management      API Keys             System Status       Contact    │
│   Brand Studio          SDKs                                                │
│   Pricing                                                                   │
│                                                                             │
│   ─────────────────────────────────────────────────────────────────────     │
│                                                                             │
│   PLATFORMS                                                                 │
│   SwipesBlue.com  •  HostsBlue.com  •  BusinessBlueprint.io                │
│                                                                             │
│   ─────────────────────────────────────────────────────────────────────     │
│                                                                             │
│   © 2026 SwipesBlue. All rights reserved.       Terms • Privacy • Cookies  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

# PART 15: Pages to Create/Update

## New Pages

| Page | Route | Purpose |
|------|-------|---------|
| Developers Landing | /developers | Public dev landing page |
| Documentation Home | /docs | Docs landing |
| API Reference | /docs/api | API docs |
| Webhook Guide | /docs/webhooks | Webhook docs |
| SDK Downloads | /docs/sdks | SDK links |
| Getting Started | /docs/getting-started | Quick start |
| Integration Guides | /docs/guides | Tutorials |
| Help Center | /support | FAQs |
| Contact/Sales | /contact | Contact form |
| System Status | /status | Uptime page |
| Demo | /demo | Interactive demo |
| Customer Portal | /portal/* | All portal pages |

## Pages to Update

| Page | Updates |
|------|---------|
| Homepage | New hero, demo embed, competitor comparison |
| Pricing | Complete rewrite with dynamic rates |
| Products | Remove stock, add badges, sections, change to Subscribe |
| Dashboard | Sidebar nav, platform links, upgrade prompts |
| Admin | Back-to-site, platform links, Rate Management |
| Brand Studio | Enhance with all customization options |
| Checkout | Apply branding, security checks, optimizer features |
| Shopping Cart | Apply Cart Pro features |

---

# PART 16: Animated Demo Video

## Requirements

Create an **animated video** (not interactive walkthrough) that shows the complete e-commerce flow.

## Video Specifications

- **Format:** MP4 or WebM
- **Resolution:** 1920x1080 (16:9)
- **Duration:** 60-90 seconds
- **Style:** Screen recording style with smooth animations, highlights, and captions
- **Audio:** Optional background music, no voiceover required (captions explain)

## Scenes

### Scene 1: Product Browsing (10 sec)
- Show products page with sample products
- Highlight product cards
- Caption: "Browse your product catalog"

### Scene 2: Add to Cart (8 sec)
- Cursor clicks "Add to Cart" button
- Button animates
- Cart icon in header updates with badge
- Caption: "Add items to cart with one click"

### Scene 3: View Cart (10 sec)
- Navigate to cart page
- Show item in cart with quantity controls
- Show subtotal calculation
- Caption: "Review your cart anytime"

### Scene 4: Checkout - Shipping (12 sec)
- Click "Proceed to Checkout"
- Show shipping form
- Demonstrate address autocomplete
- Fill in shipping info
- Caption: "Fast checkout with address autocomplete"

### Scene 5: Checkout - Payment (12 sec)
- Show payment form
- Card number auto-formats as typed
- Show Apple Pay / Google Pay buttons
- Caption: "Secure payment with multiple options"

### Scene 6: Processing (5 sec)
- Click "Pay Now"
- Show processing spinner
- Caption: "PCI-compliant payment processing"

### Scene 7: Confirmation (8 sec)
- Show success screen with checkmark animation
- Display order number
- Caption: "Order confirmed instantly"

### Scene 8: Merchant Dashboard (15 sec)
- Transition to merchant dashboard
- Show new order appearing
- Show transaction in list
- Show revenue updating
- Caption: "Track everything in your dashboard"

### Scene 9: Call to Action (10 sec)
- SwipesBlue logo
- "Start Free Today"
- "swipesblue.com"

## Implementation Options

### Option A: Use Animation Tool
- Create with After Effects, Premiere, or similar
- Export as MP4
- Upload and embed

### Option B: Use Screen Recording + Editing
- Record actual demo flow
- Edit with captions and highlights
- Export as MP4

### Option C: Use Animated GIF/WebP Sequence
- Create animated graphics
- Combine into video

## Embed Location

- Homepage: "See SwipesBlue in Action" section
- /demo page: Full page with video player
- Pricing page: Optional embed

## Fallback

If video cannot be created, build an **interactive step-by-step tour** using Shepherd.js or Intro.js that walks users through the actual interface.

---

# PART 17: Database Schema (Complete)

## Core Tables (Existing)

```sql
-- Products
products (id, name, description, price, category, stock, image, created_at)

-- Cart
cart_items (id, product_id, quantity, created_at)

-- Orders
orders (id, order_number, customer_email, customer_name, shipping_address,
        shipping_city, shipping_state, shipping_zip, subtotal, tax, shipping,
        discount, total, status, payment_status, created_at)

-- Order Items
order_items (id, order_id, product_id, product_name, product_price, quantity, subtotal)
```

## Rate Management Tables (New)

```sql
rates_active (id, tier, subscription_monthly, transaction_percent, transaction_per_item, activated_at, activated_by)
rates_staged (id, tier, subscription_monthly, transaction_percent, transaction_per_item, uploaded_at, uploaded_by)
fees_active (id, fee_type, amount, activated_at)
fees_staged (id, fee_type, amount, uploaded_at)
costs_baseline (id, interchange_percent, per_transaction, target_margin, updated_at, updated_by)
rates_audit_log (id, action, old_values, new_values, performed_by, performed_at)
```

## Add-On Tables (New)

```sql
-- Customer Portal
customer_accounts (id, merchant_id, email, password_hash, name, created_at, last_login)
customer_payment_methods (id, customer_id, card_last_four, card_brand, token, is_default, created_at)
customer_support_tickets (id, customer_id, merchant_id, subject, message, status, created_at, updated_at)

-- Multi-Gateway
merchant_gateways (id, merchant_id, gateway_type, api_key_encrypted, api_secret_encrypted, is_active, is_primary, created_at)
gateway_routing_rules (id, merchant_id, rule_type, condition_value, target_gateway_id, priority, is_active)
gateway_failover_log (id, merchant_id, original_gateway_id, failover_gateway_id, transaction_id, reason, created_at)

-- Security Suite
security_settings (id, merchant_id, velocity_enabled, velocity_card_limit, velocity_ip_limit, velocity_window_minutes, geo_blocking_enabled, blocked_countries, device_fingerprint_enabled, 3ds_enabled, 3ds_threshold_amount, fraud_score_enabled, fraud_score_decline_threshold, fraud_score_review_threshold, created_at, updated_at)
fraud_scores (id, transaction_id, score, risk_factors, decision, created_at)
device_fingerprints (id, fingerprint_hash, merchant_id, is_blocked, transaction_count, first_seen, last_seen)
chargeback_alerts (id, merchant_id, transaction_id, alert_type, alert_source, amount, action_taken, created_at)

-- Checkout Optimizer
checkout_settings (id, merchant_id, one_click_enabled, express_checkout_enabled, apple_pay_enabled, google_pay_enabled, address_autocomplete_enabled, smart_validation_enabled, created_at, updated_at)
ab_tests (id, merchant_id, test_name, variant_a_config, variant_b_config, start_date, end_date, status, winner)
ab_test_results (id, test_id, variant, sessions, conversions, conversion_rate, revenue, updated_at)
checkout_analytics (id, merchant_id, date, cart_views, checkout_starts, payment_attempts, completions, avg_time_to_checkout, device_type, created_at)

-- Shopping Cart Pro
saved_carts (id, customer_id, merchant_id, cart_data, share_token, created_at, expires_at)
cart_recommendations (id, merchant_id, product_id, recommended_product_id, recommendation_type, priority, created_at)
cart_notes (id, cart_id, note_text, is_gift_message, created_at)
inventory_reservations (id, product_id, cart_id, quantity, reserved_at, expires_at, status)

-- Analytics
analytics_daily (id, merchant_id, date, revenue, transaction_count, success_count, failed_count, avg_order_value, new_customers, returning_customers, created_at)
analytics_products (id, merchant_id, product_id, date, units_sold, revenue, views, add_to_cart_count)
customer_ltv (id, customer_id, merchant_id, total_spent, order_count, first_order_date, last_order_date, avg_order_value, calculated_at)
scheduled_reports (id, merchant_id, report_type, recipients, frequency, last_sent, next_send, config, is_active)

-- Branding
brand_settings (id, merchant_id, logo_url, favicon_url, primary_color, secondary_color, background_color, text_color, font_family, custom_font_url, remove_swipesblue_branding, custom_domain, custom_domain_verified, created_at, updated_at)
email_templates (id, merchant_id, template_type, subject, body_html, is_active, created_at, updated_at)
receipt_settings (id, merchant_id, show_logo, header_text, footer_text, terms_text, custom_fields, created_at, updated_at)

-- API/Developer
api_keys (id, merchant_id, key_type, key_hash, key_prefix, permissions, last_used, request_count, created_at, revoked_at)
webhooks (id, merchant_id, endpoint_url, events, secret_key, is_active, created_at)
webhook_deliveries (id, webhook_id, event_type, payload, response_code, response_body, attempts, delivered_at, created_at)
api_logs (id, merchant_id, api_key_id, endpoint, method, request_body, response_code, response_time_ms, ip_address, created_at)

-- Subscriptions
merchant_subscriptions (id, merchant_id, tier, status, started_at, expires_at, stripe_subscription_id)
addon_subscriptions (id, merchant_id, addon_id, status, started_at, expires_at, stripe_subscription_id)
```

---

# PART 18: Execution Plan

**Builder completed Steps 1-6. Continue from Step 7.**

| Step | Task | Deliverable |
|------|------|-------------|
| 1 | ✅ Update replit.md | Done |
| 2 | ✅ Replace header logo | Done |
| 3 | ✅ Implement color palette | Done |
| 4 | ✅ Build Products mega menu | Done |
| 5 | ✅ Build Resources mega menu | Done |
| 6 | ✅ Update Pricing page | Done |
| 7 | Fix Dashboard navigation (sidebar, platform links, upgrade prompts) | Screenshot |
| 8 | Fix Admin navigation (back-to-site, platform links) | Screenshot |
| 9 | Update Homepage (hero, demo section, competitor comparison) | Screenshot |
| 10 | Update all buttons to standards | Confirmation |
| 11 | Update all status badges to new colors | Screenshot |
| 12 | Build Footer with platform links | Screenshot |
| 13 | Create /developers landing page | Screenshot |
| 14 | **Build Rate Management Worksheet in Admin** | Screenshot with all 5 buttons |
| 15 | Build database schema for rates | Schema confirmation |
| 16 | Integrate DeepSeek AI for Research function | Demo of Research working |
| 17 | Connect Pricing page to dynamic rates | Confirm rates update |
| 18 | **Update Products page** (remove stock, add badges, sections) | Screenshot |
| 19 | **Build Add-On #6: Advanced Analytics Dashboard** | Screenshot + demo |
| 20 | **Build Add-On #4: Checkout Optimizer** | Screenshot + demo |
| 21 | **Enhance Add-On #7: Brand Studio** | Screenshot |
| 22 | **Build Add-On #1: Customer Portal** | Screenshot + demo |
| 23 | **Build Add-On #5: Shopping Cart Pro** | Screenshot + demo |
| 24 | **Build Add-On #3: Transaction Security Suite** | Screenshot |
| 25 | **Build Add-On #8: Premium Payment Gateway Integration** | Screenshot + API test |
| 26 | **Build Add-On #2: Multi-Gateway Support** | Screenshot |
| 27 | **Create Animated Demo Video** | Video file |
| 28 | Embed demo video on Homepage and /demo | Screenshot |
| 29 | Page audit — confirm all routes work | Route list |
| 30 | Final review | Full walkthrough |

---

# PART 19: Critical Reminders

1. **Do NOT start coding until you present your plan and receive approval**
2. **Complete ONE step at a time, show screenshot, wait for approval**
3. **Logo colors (Charcoal Gray + Blue Pure) are ONLY for the logo — never for UI**
4. **Blue Deep and Teal are your working colors for all UI**
5. **Users must NEVER be trapped — always provide navigation back to main site**
6. **All assets have transparent backgrounds — no removal needed**
7. **Transaction fees are DYNAMIC — pulled from rates_active, not hardcoded**
8. **Rate Management Worksheet requires all 5 buttons functional**
9. **Research function must integrate with DeepSeek AI**
10. **All rate changes must be logged in rates_audit_log**
11. **Remove stock numbers from Products page — software doesn't have stock**
12. **Add-ons are ANNUAL subscriptions, not one-time purchases**
13. **Each add-on needs full database tables and UI built**
14. **Demo video is required — not optional**

---

**Present your plan for Steps 7-30. Wait for approval before executing.**
