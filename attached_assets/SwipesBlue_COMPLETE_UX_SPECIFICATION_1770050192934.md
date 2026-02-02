# SwipesBlue — COMPLETE UX FLOW SPECIFICATION

**This document maps every page, button, link, and piece of content for the add-on product experience.**

---

# CRITICAL FIXES FIRST

Before building new pages, fix these issues:

## Fix 1: Transaction Rates in Database
**Current (WRONG):** 2.90% + $0.30
**Correct:** 2.70% + $0.30

Update ALL tiers in `ratesActive` table:
```sql
UPDATE rates_active SET transaction_percent = '2.700' WHERE tier_name IN ('FREE', 'Starter', 'Pro', 'Enterprise', 'Payment API', 'API Pro');
```

## Fix 2: Enterprise Monthly Fee
**Current (WRONG):** $199.00
**Correct:** $299.00

```sql
UPDATE rates_active SET monthly_fee = '299.00' WHERE tier_name = 'Enterprise';
```

## Fix 3: Remove Direct Access to Tools from Products Page
When clicking "Subscribe" on Products page, users should NOT land on:
- Brand Studio tool
- Shopping cart
- Any functional tool

They should land on a **Product Detail Page** first.

---

# COMPLETE USER JOURNEY MAP

## Journey 1: Discovering Add-On Products

### Page 1A: Products Page (`/products`)
**Purpose:** Browse all available add-on products

**Header:** (Standard site header)
```
[Logo Icon + "swipesblue"] Products ▼  Pricing  Resources ▼  Dashboard    Sign in  [Get Started]
```

**Page Content:**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Products                                                                    │
│  Browse our e-commerce solutions and add-ons                                │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ [Search products...]  [All] [Customer Service] [Integration]        │   │
│  │                       [Security] [E-commerce] [Analytics] [Branding]│   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ┌─────────────────────┐ ┌─────────────────────┐ ┌─────────────────────┐   │
│  │ Customer Portal     │ │ Multi-Gateway       │ │ Transaction Security│   │
│  │ Access              │ │ Support             │ │ Suite               │   │
│  │ [FREE] [PAID]       │ │ [PAID] [PRO+]       │ │ [FREE] [PAID]       │   │
│  │                     │ │                     │ │                     │   │
│  │ Self-service portal │ │ Connect multiple    │ │ Advanced fraud      │   │
│  │ for your customers  │ │ payment gateways    │ │ prevention tools    │   │
│  │                     │ │                     │ │                     │   │
│  │ From $179.99/year   │ │ $449.99/year        │ │ From $399.99/year   │   │
│  │                     │ │                     │ │                     │   │
│  │ [Learn More]        │ │ [Learn More]        │ │ [Learn More]        │   │
│  └─────────────────────┘ └─────────────────────┘ └─────────────────────┘   │
│                                                                              │
│  (... 5 more product cards ...)                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Product Card Specifications:**

| Element | Style |
|---------|-------|
| Card | `background: white; border: 1px solid #E5E7EB; border-radius: 7px; padding: 24px;` |
| Title | `font-size: 18px; font-weight: 600; color: #09080E;` |
| FREE badge | `background: #10B981; color: white; padding: 2px 8px; border-radius: 4px; font-size: 12px;` |
| PAID badge | `background: #1844A6; color: white; padding: 2px 8px; border-radius: 4px; font-size: 12px;` |
| PRO+ badge | `background: #FFD700; color: black; padding: 2px 8px; border-radius: 4px; font-size: 12px;` |
| Description | `font-size: 14px; color: #4B5563; margin: 12px 0;` |
| Price | `font-size: 24px; font-weight: 700; color: #1844A6;` |
| Learn More button | `background: #1844A6; color: white; padding: 12px 24px; border-radius: 7px; width: 100%;` |

**Button Actions:**
- "Learn More" → `/products/[slug]` (Product Detail Page)

---

## Journey 2: Product Detail Pages

Each add-on product has its own detail page with complete information.

---

### Page 2A: Customer Portal Access (`/products/customer-portal`)

**Breadcrumb:**
```
Products > Customer Portal Access
```

**Page Layout:**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│  ← Back to Products                                                         │
│                                                                              │
│  ┌────────────────────────────────┐  ┌────────────────────────────────────┐│
│  │                                │  │                                    ││
│  │  [Product Screenshot/Icon]     │  │  Customer Portal Access            ││
│  │                                │  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  ││
│  │  (Show mockup of customer      │  │                                    ││
│  │   portal interface)            │  │  Give your customers self-service  ││
│  │                                │  │  access to their order history,    ││
│  │                                │  │  invoices, payment methods, and    ││
│  │                                │  │  support tickets.                  ││
│  │                                │  │                                    ││
│  │                                │  │  ┌──────────────────────────────┐ ││
│  │                                │  │  │  FREE         $0/year       │ ││
│  │                                │  │  │  • Last 10 orders            │ ││
│  │                                │  │  │  • Order status viewing      │ ││
│  │                                │  │  │                              │ ││
│  │                                │  │  │  [Start Free]                │ ││
│  │                                │  │  └──────────────────────────────┘ ││
│  │                                │  │                                    ││
│  │                                │  │  ┌──────────────────────────────┐ ││
│  │                                │  │  │  FULL ACCESS   $179.99/year │ ││
│  │                                │  │  │  ✓ Unlimited order history   │ ││
│  │                                │  │  │  ✓ Download invoices (PDF)   │ ││
│  │                                │  │  │  ✓ Manage payment methods    │ ││
│  │                                │  │  │  ✓ Subscription management   │ ││
│  │                                │  │  │  ✓ Support ticket submission │ ││
│  │                                │  │  │  ✓ Real-time order tracking  │ ││
│  │                                │  │  │                              │ ││
│  │                                │  │  │  [Subscribe — $179.99/year]  │ ││
│  │                                │  │  └──────────────────────────────┘ ││
│  └────────────────────────────────┘  └────────────────────────────────────┘│
│                                                                              │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                              │
│  How It Works                                                                │
│  ─────────────                                                               │
│                                                                              │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐              │
│  │ 1. Enable       │  │ 2. Customers    │  │ 3. Self-Service │              │
│  │                 │  │    Register     │  │                 │              │
│  │ Turn on the     │  │                 │  │ Customers view  │              │
│  │ portal in your  │  │ Customers       │  │ orders, download│              │
│  │ dashboard       │  │ create accounts │  │ invoices, manage│              │
│  │                 │  │ using their     │  │ payment methods │              │
│  │                 │  │ email           │  │                 │              │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘              │
│                                                                              │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                              │
│  Features Included                                                           │
│  ─────────────────                                                           │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                                                                         ││
│  │  Order History                    Payment Methods                       ││
│  │  ─────────────                    ───────────────                       ││
│  │  Customers see all past orders    Customers can add, remove, and       ││
│  │  with details, dates, amounts,    update their saved credit cards      ││
│  │  and current status.              for faster checkout.                 ││
│  │                                                                         ││
│  │  Invoice Downloads                Subscription Management               ││
│  │  ─────────────────                ──────────────────────                ││
│  │  PDF invoices for any order,      Customers can pause, cancel, or      ││
│  │  ready for accounting or          update their recurring subscriptions ││
│  │  expense reports.                 without contacting support.          ││
│  │                                                                         ││
│  │  Support Tickets                  Order Tracking                        ││
│  │  ───────────────                  ──────────────                        ││
│  │  Customers submit support         Real-time tracking with carrier      ││
│  │  requests directly. You see       integration showing delivery         ││
│  │  them in your dashboard.          status and ETA.                      ││
│  │                                                                         ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                              │
│  Frequently Asked Questions                                                  │
│  ──────────────────────────                                                  │
│                                                                              │
│  ▸ How do my customers access the portal?                                   │
│    They visit yourdomain.com/portal and log in with their email.            │
│                                                                              │
│  ▸ Can I customize the portal appearance?                                   │
│    Yes, with the Custom Branding Package add-on you can white-label         │
│    the portal with your logo and colors.                                    │
│                                                                              │
│  ▸ Is the FREE version limited?                                             │
│    The free version shows the last 10 orders only. Upgrade for unlimited.   │
│                                                                              │
│  ▸ Can customers update their own payment methods?                          │
│    Yes, with the paid version they can add, remove, and set default cards.  │
│                                                                              │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                              │
│  Ready to give your customers self-service access?                          │
│                                                                              │
│  [Start Free]                    [Subscribe — $179.99/year]                 │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Button Actions:**

| Button | Link | Notes |
|--------|------|-------|
| ← Back to Products | `/products` | Text link, not button |
| Start Free | `/subscribe/customer-portal?plan=free` | Blue Deep button |
| Subscribe — $179.99/year | `/subscribe/customer-portal?plan=paid` | Blue Deep button |

**Styling:**

| Element | Style |
|---------|-------|
| Page max-width | `1200px` centered |
| Section dividers | `border-top: 1px solid #E5E7EB; padding-top: 48px; margin-top: 48px;` |
| Section headings | `font-size: 24px; font-weight: 600; color: #09080E; margin-bottom: 24px;` |
| FREE plan card | `border: 2px solid #10B981; border-radius: 7px; padding: 24px;` |
| PAID plan card | `border: 2px solid #1844A6; border-radius: 7px; padding: 24px; background: #F8FAFC;` |
| Feature checkmarks | `color: #10B981;` (Trusted Green) |
| FAQ accordion | Expandable, `border-bottom: 1px solid #E5E7EB;` |

---

### Page 2B: Multi-Gateway Support (`/products/multi-gateway`)

**Breadcrumb:**
```
Products > Multi-Gateway Support
```

**Content:**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│  ← Back to Products                                                         │
│                                                                              │
│  Multi-Gateway Support                                                       │
│  ━━━━━━━━━━━━━━━━━━━━━                                                      │
│                                                                              │
│  Connect multiple payment processors and route transactions intelligently.  │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │  ⚠️  REQUIRES PRO OR ENTERPRISE PLAN                                   │ │
│  │  This add-on is only available for Pro ($79/mo) and Enterprise        │ │
│  │  ($299/mo) subscribers.                                                │ │
│  │                                                                        │ │
│  │  Current plan: FREE    [Upgrade to Pro →]                             │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │  $449.99/year                                                          │ │
│  │                                                                        │ │
│  │  ✓ Connect up to 3 additional gateways                                │ │
│  │  ✓ Smart routing by card type, amount, or geography                   │ │
│  │  ✓ Automatic failover protection                                       │ │
│  │  ✓ Split processing across multiple processors                        │ │
│  │  ✓ Real-time routing analytics                                        │ │
│  │                                                                        │ │
│  │  [Subscribe — $449.99/year]                                           │ │
│  │  (Button disabled if not Pro/Enterprise)                              │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  Supported Gateways                                                          │
│  ──────────────────                                                          │
│                                                                              │
│  [Stripe logo]  [PayPal/Braintree logo]  [Authorize.net logo]  [Square logo]│
│                                                                              │
│  How Smart Routing Works                                                     │
│  ───────────────────────                                                     │
│                                                                              │
│  ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐        │
│  │ Transaction     │ ──▶ │ Routing Rules   │ ──▶ │ Best Gateway    │        │
│  │ Comes In        │     │ Engine          │     │ Selected        │        │
│  └─────────────────┘     └─────────────────┘     └─────────────────┘        │
│                                                                              │
│  Example routing rules:                                                      │
│  • AMEX cards → Authorize.net (lower AMEX fees)                             │
│  • Orders > $500 → Primary gateway (higher approval rate)                   │
│  • International → PayPal (better currency support)                         │
│  • 50/50 split → A/B test gateway performance                               │
│                                                                              │
│  Failover Protection                                                         │
│  ───────────────────                                                         │
│                                                                              │
│  If your primary gateway fails, transactions automatically retry on your    │
│  backup gateway. No lost sales. No manual intervention.                     │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │  Primary Gateway → [FAIL] → Backup Gateway → [SUCCESS] → Order Complete ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
│  FAQ                                                                         │
│  ───                                                                         │
│                                                                              │
│  ▸ Why do I need multiple gateways?                                         │
│    Different gateways have different strengths: approval rates, fees,       │
│    currency support, and fraud detection. Multi-gateway lets you optimize.  │
│                                                                              │
│  ▸ What happens to existing transactions?                                   │
│    Existing transactions stay with their original gateway. New routing      │
│    rules only apply to new transactions.                                    │
│                                                                              │
│  ▸ Can I add my own gateway credentials?                                    │
│    Yes. You'll enter your API keys for each gateway you want to connect.    │
│                                                                              │
│  [Subscribe — $449.99/year]                                                 │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Button Actions:**

| Button | Link | Condition |
|--------|------|-----------|
| Upgrade to Pro → | `/pricing` | Show if user is FREE or Starter |
| Subscribe — $449.99/year | `/subscribe/multi-gateway` | Enabled only if Pro or Enterprise |

---

### Page 2C: Transaction Security Suite (`/products/security-suite`)

**Content:**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│  ← Back to Products                                                         │
│                                                                              │
│  Transaction Security Suite                                                  │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━                                                  │
│                                                                              │
│  Advanced fraud prevention and security tools to protect your business.     │
│                                                                              │
│  ┌─────────────────────────────┐  ┌─────────────────────────────────────┐   │
│  │  FREE                       │  │  FULL PROTECTION    $399.99/year   │   │
│  │  $0/year                    │  │                                     │   │
│  │                             │  │  Everything in FREE, plus:          │   │
│  │  ✓ AVS (Address             │  │                                     │   │
│  │    Verification)            │  │  ✓ Velocity checks (block rapid     │   │
│  │  ✓ CVV verification         │  │    repeated charges)                │   │
│  │                             │  │  ✓ Geolocation blocking             │   │
│  │  Basic protection           │  │  ✓ Device fingerprinting            │   │
│  │  included with all plans    │  │  ✓ 3D Secure 2.0 integration        │   │
│  │                             │  │  ✓ Real-time fraud scoring (0-100)  │   │
│  │  [Already Included]         │  │  ✓ Manual review queue              │   │
│  │  (disabled button)          │  │  ✓ Chargeback alerts (Verifi,       │   │
│  │                             │  │    Ethoca integration)              │   │
│  └─────────────────────────────┘  │                                     │   │
│                                   │  [Subscribe — $399.99/year]         │   │
│                                   └─────────────────────────────────────┘   │
│                                                                              │
│  Feature Deep Dive                                                           │
│  ─────────────────                                                           │
│                                                                              │
│  Velocity Checks                                                             │
│  ───────────────                                                             │
│  Block or flag transactions when:                                           │
│  • Same card used more than X times in Y minutes                            │
│  • Same IP address attempts multiple cards                                  │
│  • Configurable thresholds in your dashboard                                │
│                                                                              │
│  Geolocation Blocking                                                        │
│  ────────────────────                                                        │
│  • Block transactions from specific countries                               │
│  • Whitelist only countries you ship to                                     │
│  • Flag mismatches between billing and IP location                          │
│                                                                              │
│  Fraud Scoring                                                               │
│  ─────────────                                                               │
│  Every transaction gets a 0-100 risk score based on:                        │
│  • Card history                                                              │
│  • IP reputation                                                             │
│  • Device fingerprint                                                        │
│  • Behavioral signals                                                        │
│                                                                              │
│  You set thresholds:                                                         │
│  • 0-30: Auto-approve                                                        │
│  • 31-70: Manual review queue                                               │
│  • 71-100: Auto-decline                                                      │
│                                                                              │
│  Chargeback Alerts                                                           │
│  ─────────────────                                                           │
│  Get notified BEFORE a chargeback is filed. Integrates with:                │
│  • Verifi (Visa)                                                             │
│  • Ethoca (Mastercard)                                                       │
│  Resolve disputes proactively and reduce chargeback fees.                   │
│                                                                              │
│  [Subscribe — $399.99/year]                                                 │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### Page 2D: Checkout Optimizer (`/products/checkout-optimizer`)

**Content:**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│  ← Back to Products                                                         │
│                                                                              │
│  Checkout Optimizer                                                          │
│  ━━━━━━━━━━━━━━━━━━                                                         │
│                                                                              │
│  Reduce cart abandonment and increase conversion rates.                     │
│                                                                              │
│  ┌─────────────────────────────┐  ┌─────────────────────────────────────┐   │
│  │  FREE                       │  │  FULL OPTIMIZATION  $249.99/year   │   │
│  │  $0/year                    │  │                                     │   │
│  │                             │  │  Everything in FREE, plus:          │   │
│  │  ✓ Basic one-page checkout  │  │                                     │   │
│  │  ✓ Standard form validation │  │  ✓ One-click checkout (returning   │   │
│  │                             │  │    customers skip form entry)       │   │
│  │  [Already Included]         │  │  ✓ Express checkout (Apple Pay,    │   │
│  │                             │  │    Google Pay)                      │   │
│  └─────────────────────────────┘  │  ✓ Address autocomplete (Google    │   │
│                                   │    Places)                          │   │
│                                   │  ✓ Smart inline form validation     │   │
│                                   │  ✓ Checkout A/B testing             │   │
│                                   │  ✓ Conversion funnel analytics      │   │
│                                   │                                     │   │
│                                   │  [Subscribe — $249.99/year]         │   │
│                                   └─────────────────────────────────────┘   │
│                                                                              │
│  Conversion Impact                                                           │
│  ─────────────────                                                           │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                                                                         ││
│  │   Average conversion improvement: +23%                                  ││
│  │                                                                         ││
│  │   ┌─────────────────────────────────────────────────────────────────┐  ││
│  │   │ One-click checkout     │████████████████████████│ +18% faster   │  ││
│  │   │ Express checkout       │██████████████████████████│ +12% conv   │  ││
│  │   │ Address autocomplete   │████████████████│ -40% form errors      │  ││
│  │   └─────────────────────────────────────────────────────────────────┘  ││
│  │                                                                         ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
│  A/B Testing                                                                 │
│  ──────────                                                                  │
│                                                                              │
│  Test different checkout experiences:                                        │
│  • Single page vs multi-step                                                │
│  • Payment method order                                                      │
│  • Button text and colors                                                    │
│  • Field layouts                                                             │
│                                                                              │
│  See real conversion data for each variant. Pick the winner automatically.  │
│                                                                              │
│  [Subscribe — $249.99/year]                                                 │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### Page 2E: Shopping Cart Pro (`/products/shopping-cart-pro`)

**Content:**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│  ← Back to Products                                                         │
│                                                                              │
│  Shopping Cart Pro                                                           │
│  ━━━━━━━━━━━━━━━━━                                                          │
│                                                                              │
│  Advanced cart features to increase average order value.                    │
│                                                                              │
│  ┌─────────────────────────────┐  ┌─────────────────────────────────────┐   │
│  │  FREE                       │  │  FULL FEATURES      $349.99/year   │   │
│  │  $0/year                    │  │                                     │   │
│  │                             │  │  Everything in FREE, plus:          │   │
│  │  ✓ Add to cart              │  │                                     │   │
│  │  ✓ Update quantity          │  │  ✓ Save cart for later (with       │   │
│  │  ✓ Remove items             │  │    email reminder)                  │   │
│  │  ✓ View subtotal            │  │  ✓ Cart sharing (generate link,    │   │
│  │                             │  │    recipient loads same cart)       │   │
│  │  [Already Included]         │  │  ✓ Cross-sell/upsell suggestions   │   │
│  │                             │  │  ✓ Cart notes (gift messages,      │   │
│  └─────────────────────────────┘  │    special instructions)            │   │
│                                   │  ✓ Multi-currency display           │   │
│                                   │  ✓ Inventory reservation (hold      │   │
│                                   │    items with countdown timer)      │   │
│                                   │                                     │   │
│                                   │  [Subscribe — $349.99/year]         │   │
│                                   └─────────────────────────────────────┘   │
│                                                                              │
│  Save Cart for Later                                                         │
│  ───────────────────                                                         │
│                                                                              │
│  Customer leaves without buying? No problem.                                │
│  • Cart saved automatically                                                  │
│  • Email sent with link to restore cart                                     │
│  • Configurable timing (1 hour, 24 hours, 3 days)                           │
│                                                                              │
│  Cart Sharing                                                                │
│  ────────────                                                                │
│                                                                              │
│  Perfect for:                                                                │
│  • Gift registries                                                           │
│  • Team purchases                                                            │
│  • "What do you think?" sharing                                             │
│                                                                              │
│  Customer clicks "Share Cart" → Gets unique link → Anyone with link sees    │
│  the same cart and can check out.                                           │
│                                                                              │
│  Inventory Reservation                                                       │
│  ─────────────────────                                                       │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │  ⏱️ Items reserved for 15:00                                            ││
│  │                                                                         ││
│  │  Your items are held while you complete checkout.                       ││
│  │  After the timer expires, items return to available inventory.          ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
│  Prevents overselling. Creates urgency. Increases conversions.              │
│                                                                              │
│  [Subscribe — $349.99/year]                                                 │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### Page 2F: Advanced Analytics Dashboard (`/products/advanced-analytics`)

**Content:**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│  ← Back to Products                                                         │
│                                                                              │
│  Advanced Analytics Dashboard                                                │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━                                               │
│                                                                              │
│  Deep reporting and business intelligence for data-driven decisions.        │
│                                                                              │
│  ┌─────────────────────────────┐  ┌─────────────────────────────────────┐   │
│  │  FREE                       │  │  FULL ANALYTICS     $199.99/year   │   │
│  │  $0/year                    │  │                                     │   │
│  │                             │  │  Everything in FREE, plus:          │   │
│  │  ✓ Total revenue            │  │                                     │   │
│  │    (today/week/month)       │  │  ✓ Revenue breakdown (by product,  │   │
│  │  ✓ Transaction count        │  │    category, time, payment method) │   │
│  │  ✓ Success rate             │  │  ✓ Customer analytics (LTV, AOV,   │   │
│  │  ✓ Last 5 transactions      │  │    purchase frequency)             │   │
│  │                             │  │  ✓ Cohort analysis                  │   │
│  │  [Already Included]         │  │  ✓ Funnel visualization            │   │
│  │                             │  │  ✓ Exportable reports (CSV, PDF)   │   │
│  └─────────────────────────────┘  │  ✓ Scheduled email reports         │   │
│                                   │  ✓ Custom date ranges              │   │
│                                   │  ✓ Year-over-year comparison        │   │
│                                   │                                     │   │
│                                   │  [Subscribe — $199.99/year]         │   │
│                                   └─────────────────────────────────────┘   │
│                                                                              │
│  [Screenshot of analytics dashboard with charts]                            │
│                                                                              │
│  Customer Lifetime Value (LTV)                                               │
│  ─────────────────────────────                                               │
│                                                                              │
│  See which customers are most valuable:                                      │
│  • Total spent over time                                                     │
│  • Number of orders                                                          │
│  • Average order value                                                       │
│  • Days since last purchase                                                  │
│                                                                              │
│  Cohort Analysis                                                             │
│  ───────────────                                                             │
│                                                                              │
│  Track customer behavior over time:                                          │
│  • Do January customers come back in February?                               │
│  • Which acquisition channels have best retention?                          │
│  • Identify trends before they become problems                              │
│                                                                              │
│  Scheduled Reports                                                           │
│  ─────────────────                                                           │
│                                                                              │
│  Get reports in your inbox automatically:                                   │
│  • Daily summary                                                             │
│  • Weekly revenue report                                                     │
│  • Monthly business review                                                   │
│  • Send to yourself or your team                                            │
│                                                                              │
│  [Subscribe — $199.99/year]                                                 │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### Page 2G: Custom Branding Package (`/products/custom-branding`)

**Content:**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│  ← Back to Products                                                         │
│                                                                              │
│  Custom Branding Package                                                     │
│  ━━━━━━━━━━━━━━━━━━━━━━━                                                    │
│                                                                              │
│  White-label your checkout experience with your brand.                      │
│                                                                              │
│  ┌─────────────────────────────┐  ┌─────────────────────────────────────┐   │
│  │  FREE                       │  │  WHITE-LABEL        $149.99/year   │   │
│  │  $0/year                    │  │                                     │   │
│  │                             │  │  Complete brand control:            │   │
│  │  • SwipesBlue logo on       │  │                                     │   │
│  │    checkout                 │  │  ✓ Your logo on checkout           │   │
│  │  • "Powered by SwipesBlue"  │  │  ✓ Your logo on receipts           │   │
│  │    footer                   │  │  ✓ Your logo in customer portal    │   │
│  │  • Default colors           │  │  ✓ Custom colors (primary,         │   │
│  │                             │  │    secondary, background)          │   │
│  │  [Current Plan]             │  │  ✓ Custom fonts (Google Fonts      │   │
│  │                             │  │    or upload your own)             │   │
│  └─────────────────────────────┘  │  ✓ Remove "Powered by SwipesBlue"  │   │
│                                   │  ✓ Custom email templates          │   │
│                                   │  ✓ Custom receipt design           │   │
│                                   │  ✓ Custom checkout domain          │   │
│                                   │    (checkout.yourdomain.com)       │   │
│                                   │                                     │   │
│                                   │  [Subscribe — $149.99/year]         │   │
│                                   └─────────────────────────────────────┘   │
│                                                                              │
│  Before & After                                                              │
│  ──────────────                                                              │
│                                                                              │
│  ┌─────────────────────────────┐  ┌─────────────────────────────────────┐   │
│  │  BEFORE (Free)              │  │  AFTER (Custom Branding)           │   │
│  │                             │  │                                     │   │
│  │  [SwipesBlue Logo]          │  │  [Your Logo]                       │   │
│  │                             │  │                                     │   │
│  │  Checkout                   │  │  Checkout                          │   │
│  │  [Blue Deep buttons]        │  │  [Your brand color buttons]        │   │
│  │                             │  │                                     │   │
│  │  Powered by SwipesBlue      │  │  © Your Company 2026               │   │
│  │                             │  │                                     │   │
│  └─────────────────────────────┘  └─────────────────────────────────────┘   │
│                                                                              │
│  Custom Domain                                                               │
│  ─────────────                                                               │
│                                                                              │
│  Instead of: checkout.swipesblue.com/your-store                             │
│  You get: checkout.yourdomain.com                                           │
│                                                                              │
│  We'll guide you through DNS setup. Takes about 10 minutes.                 │
│                                                                              │
│  Email Templates                                                             │
│  ───────────────                                                             │
│                                                                              │
│  Customize every email your customers receive:                              │
│  • Order confirmation                                                        │
│  • Shipping notification                                                     │
│  • Receipt                                                                   │
│  • Subscription renewal                                                      │
│  • Password reset                                                            │
│                                                                              │
│  Full HTML editor with your branding pre-loaded.                            │
│                                                                              │
│  ℹ️ Note: Pro tier includes Brand Studio. This add-on is for FREE and      │
│     Starter users who want branding without upgrading to Pro.               │
│                                                                              │
│  [Subscribe — $149.99/year]                                                 │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### Page 2H: Premium Payment Gateway Integration (`/products/api-integration`)

**Content:**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│  ← Back to Products                                                         │
│                                                                              │
│  Premium Payment Gateway Integration                                         │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━                                         │
│                                                                              │
│  Full API access for custom integrations.                                   │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │  $299.99/year                                                          │ │
│  │                                                                        │ │
│  │  ✓ Full REST API access                                               │ │
│  │  ✓ Webhooks with automatic retry                                      │ │
│  │  ✓ Test and live API keys                                             │ │
│  │  ✓ Sandbox environment                                                 │ │
│  │  ✓ SDK libraries (JavaScript, PHP, Python, Ruby)                      │ │
│  │  ✓ Interactive API documentation                                       │ │
│  │  ✓ Priority developer support                                          │ │
│  │                                                                        │ │
│  │  [Subscribe — $299.99/year]                                           │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
│  ℹ️ Note: Enterprise tier includes API access. This add-on is for FREE,    │
│     Starter, and Pro users who need API access without Enterprise.          │
│                                                                              │
│  API Endpoints                                                               │
│  ─────────────                                                               │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ POST   /api/v1/transactions           Create a transaction             ││
│  │ GET    /api/v1/transactions           List transactions                ││
│  │ GET    /api/v1/transactions/:id       Get transaction details          ││
│  │ POST   /api/v1/transactions/:id/refund  Refund a transaction          ││
│  │ POST   /api/v1/transactions/:id/void    Void a transaction            ││
│  │                                                                         ││
│  │ POST   /api/v1/customers              Create a customer                ││
│  │ GET    /api/v1/customers              List customers                   ││
│  │ GET    /api/v1/customers/:id          Get customer details             ││
│  │ PUT    /api/v1/customers/:id          Update customer                  ││
│  │ DELETE /api/v1/customers/:id          Delete customer                  ││
│  │                                                                         ││
│  │ POST   /api/v1/subscriptions          Create subscription              ││
│  │ GET    /api/v1/subscriptions          List subscriptions               ││
│  │ PUT    /api/v1/subscriptions/:id      Update subscription              ││
│  │ DELETE /api/v1/subscriptions/:id      Cancel subscription              ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
│  Webhook Events                                                              │
│  ──────────────                                                              │
│                                                                              │
│  Subscribe to real-time events:                                             │
│  • payment.success                                                           │
│  • payment.failed                                                            │
│  • payment.refunded                                                          │
│  • subscription.created                                                      │
│  • subscription.cancelled                                                    │
│  • chargeback.received                                                       │
│                                                                              │
│  Automatic retries with exponential backoff. Delivery logs in dashboard.   │
│                                                                              │
│  Code Example                                                                │
│  ────────────                                                                │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ curl https://api.swipesblue.com/v1/transactions \                      ││
│  │   -H "Authorization: Bearer sk_live_..." \                             ││
│  │   -d amount=2000 \                                                     ││
│  │   -d currency=usd \                                                    ││
│  │   -d card_number=4242424242424242 \                                    ││
│  │   -d card_exp=1225 \                                                   ││
│  │   -d card_cvv=123                                                      ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
│  [Subscribe — $299.99/year]        [View Documentation →]                   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

# Journey 3: Subscription Checkout Flow

When user clicks "Subscribe" on any product detail page, they go to the subscription checkout.

---

### Page 3A: Subscription Checkout (`/subscribe/[product-slug]`)

**Example: `/subscribe/customer-portal?plan=paid`**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│  [Logo]                                              Secure Checkout 🔒     │
│                                                                              │
│  ┌─────────────────────────────────────┐  ┌───────────────────────────────┐ │
│  │                                     │  │                               │ │
│  │  Order Summary                      │  │  Payment Details              │ │
│  │  ─────────────                      │  │  ───────────────              │ │
│  │                                     │  │                               │ │
│  │  Customer Portal Access             │  │  Email                        │ │
│  │  Full Access Plan                   │  │  ┌───────────────────────┐   │ │
│  │                                     │  │  │                       │   │ │
│  │  ┌───────────────────────────────┐ │  │  └───────────────────────┘   │ │
│  │  │ ✓ Unlimited order history     │ │  │                               │ │
│  │  │ ✓ Download invoices (PDF)     │ │  │  Card Number                  │ │
│  │  │ ✓ Manage payment methods      │ │  │  ┌───────────────────────┐   │ │
│  │  │ ✓ Subscription management     │ │  │  │ 4242 4242 4242 4242   │   │ │
│  │  │ ✓ Support ticket submission   │ │  │  └───────────────────────┘   │ │
│  │  │ ✓ Real-time order tracking    │ │  │                               │ │
│  │  └───────────────────────────────┘ │  │  Expiration      CVV          │ │
│  │                                     │  │  ┌───────────┐  ┌─────────┐  │ │
│  │  ─────────────────────────────────  │  │  │ MM / YY   │  │ 123     │  │ │
│  │                                     │  │  └───────────┘  └─────────┘  │ │
│  │  Subtotal              $179.99     │  │                               │ │
│  │  ─────────────────────────────────  │  │  Name on Card                │ │
│  │  Total (billed annually) $179.99   │  │  ┌───────────────────────┐   │ │
│  │                                     │  │  │                       │   │ │
│  │  Renews on Feb 2, 2027             │  │  └───────────────────────┘   │ │
│  │                                     │  │                               │ │
│  │  ─────────────────────────────────  │  │  Billing Address             │ │
│  │                                     │  │  ┌───────────────────────┐   │ │
│  │  Have a coupon code?               │  │  │                       │   │ │
│  │  ┌─────────────────┐ [Apply]       │  │  └───────────────────────┘   │ │
│  │  │                 │               │  │                               │ │
│  │  └─────────────────┘               │  │  City         State    Zip   │ │
│  │                                     │  │  ┌─────────┐ ┌─────┐ ┌─────┐│ │
│  └─────────────────────────────────────┘  │  │         │ │     │ │     ││ │
│                                           │  └─────────┘ └─────┘ └─────┘│ │
│                                           │                               │ │
│                                           │  ☐ I agree to the Terms of   │ │
│                                           │    Service and Privacy Policy │ │
│                                           │                               │ │
│                                           │  [Subscribe — $179.99/year]   │ │
│                                           │                               │ │
│                                           │  🔒 256-bit SSL encryption    │ │
│                                           │                               │ │
│                                           └───────────────────────────────┘ │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Styling:**

| Element | Style |
|---------|-------|
| Page background | `#F8FAFC` |
| Cards | `background: white; border-radius: 7px; padding: 32px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);` |
| Input fields | `border: 1px solid #D1D5DB; border-radius: 7px; padding: 12px; font-size: 16px;` |
| Subscribe button | `background: #1844A6; color: white; padding: 16px 32px; border-radius: 7px; width: 100%; font-weight: 600;` |
| Feature checkmarks | `color: #10B981;` |

**Button Action:**
- Subscribe button → POST to `/api/subscriptions/create` → Redirect to `/subscription/success`

---

### Page 3B: Subscription Success (`/subscription/success`)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│  [Logo]                                                                      │
│                                                                              │
│                          ┌─────────────────────────────┐                    │
│                          │                             │                    │
│                          │      ✓                      │                    │
│                          │   (large green checkmark)   │                    │
│                          │                             │                    │
│                          │   Subscription Activated!   │                    │
│                          │                             │                    │
│                          │   Customer Portal Access    │                    │
│                          │   Full Access Plan          │                    │
│                          │                             │                    │
│                          │   $179.99/year              │                    │
│                          │   Next billing: Feb 2, 2027 │                    │
│                          │                             │                    │
│                          │   A confirmation email has  │                    │
│                          │   been sent to your inbox.  │                    │
│                          │                             │                    │
│                          │   ─────────────────────────  │                    │
│                          │                             │                    │
│                          │   [Go to Dashboard]         │                    │
│                          │                             │                    │
│                          │   [Configure Customer Portal]│                    │
│                          │                             │                    │
│                          └─────────────────────────────┘                    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Button Actions:**

| Button | Link |
|--------|------|
| Go to Dashboard | `/dashboard` |
| Configure Customer Portal | `/dashboard/customer-portal` (or relevant settings page for that add-on) |

---

# Journey 4: Dashboard Access to Purchased Add-Ons

After purchase, add-ons appear in the dashboard sidebar.

---

### Updated Dashboard Sidebar

```
┌─────────────────────────────────────────┐
│  [Logo]                                 │
│                                         │
│  📊 Overview                            │
│  📦 Products                            │
│  🛒 Orders                              │
│  💳 Transactions                        │
│                                         │
│  ─────────────────────────────────────  │
│  E-COMMERCE                             │
│  ─────────────────────────────────────  │
│                                         │
│  🛍️ Shopping Cart     [FREE]           │
│  📧 Abandoned Carts   [PRO]  🔒        │
│  🎨 Brand Studio      [PRO]  🔒        │
│                                         │
│  ─────────────────────────────────────  │
│  ADD-ONS                                │
│  ─────────────────────────────────────  │
│                                         │
│  👤 Customer Portal   [ACTIVE]          │  ← Shows if subscribed
│  🔒 Security Suite    [ACTIVE]          │
│  📈 Analytics         [UPGRADE]  🔒     │  ← Shows lock if not subscribed
│  ⚡ Checkout Optimizer [UPGRADE] 🔒     │
│  🛒 Cart Pro          [UPGRADE]  🔒     │
│  🌐 Multi-Gateway     [UPGRADE]  🔒     │
│  🔑 API Access        [UPGRADE]  🔒     │
│                                         │
│  ─────────────────────────────────────  │
│  DEVELOPER                              │
│  ─────────────────────────────────────  │
│                                         │
│  🔑 API Keys                            │
│  🔗 Webhooks                            │
│                                         │
│  ─────────────────────────────────────  │
│  SETTINGS                               │
│  ─────────────────────────────────────  │
│                                         │
│  ⚙️ Settings                            │
│                                         │
│  ─────────────────────────────────────  │
│  PLATFORMS                              │
│  ─────────────────────────────────────  │
│                                         │
│  → SwipesBlue.com                       │
│  → HostsBlue.com                        │
│  → BusinessBlueprint.io                 │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  Your Plan: FREE                        │
│  [Upgrade to Pro →]                     │
│                                         │
└─────────────────────────────────────────┘
```

**Sidebar Logic:**

| Condition | Display |
|-----------|---------|
| Add-on subscribed | Show item, badge: `[ACTIVE]` (green), clickable |
| Add-on NOT subscribed | Show item, badge: `[UPGRADE]` (gray), lock icon 🔒, clicking goes to `/products/[slug]` |
| Feature requires higher tier | Show item, badge: `[PRO]` or `[ENTERPRISE]`, lock icon 🔒, clicking goes to `/pricing` |

---

# Journey 5: Using Purchased Add-Ons

Each purchased add-on has its own section in the dashboard.

---

### Page 5A: Customer Portal Settings (`/dashboard/customer-portal`)

**Only accessible if add-on is subscribed.**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│  Customer Portal Settings                                                    │
│  ━━━━━━━━━━━━━━━━━━━━━━━━                                                   │
│                                                                              │
│  Status: [ACTIVE] ●                          [View Customer Portal →]       │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  Portal URL                                                                  │
│  ──────────                                                                  │
│  Your customers access the portal at:                                       │
│  https://portal.swipesblue.com/your-store-slug                              │
│  [Copy Link]                                                                │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  Features Enabled                                                            │
│  ────────────────                                                            │
│                                                                              │
│  ☑️ Order History               Customers can view all past orders          │
│  ☑️ Invoice Downloads           Customers can download PDF invoices         │
│  ☑️ Payment Methods             Customers can manage saved cards            │
│  ☑️ Subscription Management     Customers can pause/cancel subscriptions    │
│  ☑️ Support Tickets             Customers can submit support requests       │
│  ☑️ Order Tracking              Customers see real-time delivery status     │
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  Customer Accounts                                                           │
│  ─────────────────                                                           │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ Email                    │ Name           │ Orders │ Last Login        ││
│  │─────────────────────────────────────────────────────────────────────────││
│  │ john@example.com         │ John Smith     │ 12     │ 2 hours ago       ││
│  │ jane@example.com         │ Jane Doe       │ 5      │ Yesterday         ││
│  │ bob@example.com          │ Bob Wilson     │ 23     │ 3 days ago        ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                              │
│  Support Tickets                                                             │
│  ───────────────                                                             │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │ Ticket #  │ Customer          │ Subject              │ Status  │ Date  ││
│  │─────────────────────────────────────────────────────────────────────────││
│  │ #1234     │ john@example.com  │ Where is my order?   │ OPEN    │ Today ││
│  │ #1233     │ jane@example.com  │ Refund request       │ CLOSED  │ Feb 1 ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                              │
│  [View All Tickets →]                                                       │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

# SUMMARY: Complete Page List

## Public Pages (No Auth)

| Route | Page | Purpose |
|-------|------|---------|
| `/` | Home | Landing page |
| `/pricing` | Pricing | Subscription tiers |
| `/products` | Products | Browse add-ons |
| `/products/customer-portal` | Product Detail | Customer Portal info |
| `/products/multi-gateway` | Product Detail | Multi-Gateway info |
| `/products/security-suite` | Product Detail | Security Suite info |
| `/products/checkout-optimizer` | Product Detail | Checkout Optimizer info |
| `/products/shopping-cart-pro` | Product Detail | Shopping Cart Pro info |
| `/products/advanced-analytics` | Product Detail | Analytics info |
| `/products/custom-branding` | Product Detail | Custom Branding info |
| `/products/api-integration` | Product Detail | API Integration info |
| `/demo` | Demo | Interactive demo |
| `/developers` | Developers | API landing page |
| `/docs` | Docs Home | Documentation |
| `/docs/api` | API Reference | API docs |
| `/docs/webhooks` | Webhooks Guide | Webhook docs |
| `/docs/sdks` | SDKs | SDK downloads |
| `/support` | Support | Help center |
| `/contact` | Contact | Contact form |
| `/status` | Status | System status |

## Auth Pages

| Route | Page | Purpose |
|-------|------|---------|
| `/subscribe/[slug]` | Subscription Checkout | Purchase add-on |
| `/subscription/success` | Success Page | Post-purchase confirmation |

## Dashboard Pages (Requires Login)

| Route | Page | Purpose |
|-------|------|---------|
| `/dashboard` | Overview | Main dashboard |
| `/dashboard/products` | Products | Manage products |
| `/dashboard/orders` | Orders | View orders |
| `/dashboard/transactions` | Transactions | Transaction history |
| `/dashboard/customer-portal` | Customer Portal | Portal settings (if subscribed) |
| `/dashboard/security` | Security Suite | Security settings (if subscribed) |
| `/dashboard/analytics` | Analytics | Analytics dashboard (if subscribed) |
| `/dashboard/checkout-optimizer` | Checkout Optimizer | Checkout settings (if subscribed) |
| `/dashboard/cart-settings` | Cart Pro | Cart settings (if subscribed) |
| `/dashboard/gateways` | Multi-Gateway | Gateway settings (if subscribed) |
| `/dashboard/brand-studio` | Brand Studio | Branding settings (if subscribed OR Pro+) |
| `/dashboard/developers` | Developer Hub | API management (if subscribed OR Enterprise) |
| `/dashboard/api-keys` | API Keys | Manage API keys |
| `/dashboard/webhooks` | Webhooks | Manage webhooks |
| `/dashboard/settings` | Settings | Account settings |

## Admin Pages (Requires Admin Auth)

| Route | Page | Purpose |
|-------|------|---------|
| `/admin/login` | Admin Login | Admin authentication |
| `/admin` | Admin Dashboard | Admin overview |
| `/admin/merchants` | Merchants | Manage merchants |
| `/admin/transactions` | Transactions | All transactions |
| `/admin/rates` | Rate Management | Manage rates |
| `/admin/api-keys` | API Keys | Admin API keys |
| `/admin/webhooks` | Webhooks | Admin webhooks |

---

# Execution Checklist

**Builder: Complete these in order. Show screenshot after each. Wait for approval.**

## Phase 1: Fixes (Do First)
- [ ] Fix transaction rate to 2.70% in database
- [ ] Fix Enterprise to $299 in database
- [ ] Show Research button output (DeepSeek report)

## Phase 2: Product Detail Pages
- [ ] Build `/products/customer-portal`
- [ ] Build `/products/multi-gateway`
- [ ] Build `/products/security-suite`
- [ ] Build `/products/checkout-optimizer`
- [ ] Build `/products/shopping-cart-pro`
- [ ] Build `/products/advanced-analytics`
- [ ] Build `/products/custom-branding`
- [ ] Build `/products/api-integration`

## Phase 3: Subscription Flow
- [ ] Build `/subscribe/[slug]` checkout page
- [ ] Build `/subscription/success` page
- [ ] Connect to payment processing

## Phase 4: Dashboard Integration
- [ ] Update sidebar with add-on items
- [ ] Build `/dashboard/customer-portal`
- [ ] Build `/dashboard/security`
- [ ] Build `/dashboard/analytics`
- [ ] Build `/dashboard/checkout-optimizer`
- [ ] Build `/dashboard/cart-settings`
- [ ] Build `/dashboard/gateways`
- [ ] Build `/dashboard/brand-studio` (enhance)
- [ ] Build `/dashboard/developers`

## Phase 5: Support Pages
- [ ] Build `/docs`
- [ ] Build `/docs/api`
- [ ] Build `/docs/webhooks`
- [ ] Build `/docs/sdks`
- [ ] Build `/support`
- [ ] Build `/contact`
- [ ] Build `/status`

---

**Do NOT proceed without approval at each phase.**
