# SwipesBlue — COMPLETE BUILDER SPECIFICATION
## "Make it look like Stripe. Make it easy to sell."

**This document is the ONLY reference the builder needs. Everything is specified. Nothing is left to interpretation.**

---

# PART 1: STRIPE'S DESIGN PHILOSOPHY (COPY THIS EXACTLY)

## 1.1 How Stripe Sells

Stripe doesn't sell features. Stripe sells outcomes.

**BAD (Feature-focused):**
> "Our payment gateway supports credit cards, ACH, and digital wallets."

**GOOD (Outcome-focused, Stripe-style):**
> "Accept payments online, in person, and around the world—from your first transaction to your billionth."

**SwipesBlue applies this:**

| Instead of saying... | Say this... |
|---------------------|-------------|
| "We process credit cards" | "Accept every way your customers want to pay" |
| "We have a virtual terminal" | "Key in payments from anywhere—phone, email, or walk-in" |
| "We support recurring billing" | "Set it once. Get paid automatically. Forever." |
| "We have fraud detection" | "Stop fraud before it costs you money" |
| "We integrate with shopping carts" | "Works with your store. No code required." |

## 1.2 Stripe's Visual Language

**Colors:**
- Primary: Deep purple (#635BFF)
- Background: Near-white (#F6F9FC)
- Text: Near-black (#1A1F36)
- Accent gradients: Purple to blue to teal

**SwipesBlue equivalent:**
- Primary: Blue Deep (#1844A6)
- Secondary: Teal (#064A6C)
- Background: #F8FAFC
- Text: #09080E
- Accent: Subtle gradients blue → teal

**Typography:**
- Headlines: Large, bold, short
- Body: Clean, readable, lots of whitespace
- NO walls of text. Ever.

**Layout:**
- Hero section: One clear headline, one subhead, one CTA
- Features: Bento grid (mixed size cards)
- Social proof: Logos, stats, testimonials
- Footer: Comprehensive but organized

## 1.3 Stripe's Navigation Structure

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  [Logo]   Products ▼   Solutions ▼   Developers ▼   Resources ▼   Pricing  │
│                                                          [Sign in] [Start] │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Products dropdown (Stripe's pattern):**
```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ACCEPT PAYMENTS              │  MANAGE MONEY                              │
│  ─────────────────            │  ─────────────                             │
│  Payments                     │  Billing                                   │
│  Online payments              │  Subscriptions and recurring               │
│                               │                                            │
│  Checkout                     │  Invoicing                                 │
│  Prebuilt payment page        │  Online invoices                           │
│                               │                                            │
│  Payment Links                │  Tax                                       │
│  No-code payments             │  Sales tax automation                      │
│                               │                                            │
│  Terminal                     │  Revenue Recognition                       │
│  In-person payments           │  Accounting automation                     │
│                               │                                            │
│  FRAUD & SECURITY             │  PLATFORMS                                 │
│  ─────────────────            │  ─────────────                             │
│  Radar                        │  Connect                                   │
│  Fraud prevention             │  Payments for platforms                    │
│                               │                                            │
│  Identity                     │  Issuing                                   │
│  Online verification          │  Card creation                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

# PART 2: SWIPESBLUE NAVIGATION (EXACT STRUCTURE)

## 2.1 Header Navigation

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  [Logo Icon + "swipesblue"]   Products ▼   Pricing   Developers ▼   Resources ▼  │
│                                                          [Sign in] [Get Started] │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Logo:**
- Icon (from brand assets) + code-built text "swipesblue"
- Text: `font-family: 'Inter', sans-serif; font-weight: 700; font-size: 24px; color: #1844A6;`
- Clicking logo → `/` (homepage)

**Navigation Items:**

| Item | Type | Destination |
|------|------|-------------|
| Products | Mega menu | See 2.2 |
| Pricing | Link | `/pricing` |
| Developers | Mega menu | See 2.3 |
| Resources | Mega menu | See 2.4 |
| Sign in | Link | `/login` |
| Get Started | Button (primary) | `/register` |

**Button Styles:**
```css
/* Sign in */
.btn-signin {
  background: transparent;
  color: #1844A6;
  padding: 8px 16px;
  border-radius: 7px;
  font-weight: 500;
}
.btn-signin:hover {
  background: #F1F5F9;
}

/* Get Started */
.btn-primary {
  background: #1844A6;
  color: white;
  padding: 8px 20px;
  border-radius: 7px;
  font-weight: 600;
}
.btn-primary:hover {
  background: #133A8C;
}
```

## 2.2 Products Mega Menu

**Trigger:** Hover or click "Products"

**Layout:** 3-column grid

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                                                                  │
│  ACCEPT PAYMENTS               │  MANAGE BILLING              │  PROTECT        │
│  ─────────────────             │  ──────────────              │  ────────       │
│                                │                              │                 │
│  💳 Payments                   │  🔄 Recurring Billing        │  🛡️ Fraud Rules │
│  Accept cards, ACH, wallets    │  Subscriptions that scale    │  Block bad actors│
│                                │                              │                 │
│  🔗 Payment Links              │  📄 Invoicing                │  🔒 3D Secure   │
│  No-code payment pages         │  Send and track invoices     │  Extra auth layer│
│                                │                              │                 │
│  ⌨️ Virtual Terminal           │  📊 Reporting                │  ⚡ Velocity    │
│  Key in phone/mail orders      │  See where your money goes   │  Rate limiting  │
│                                │                              │                 │
│  👥 Customer Vault             │                              │                 │
│  Save cards for later          │                              │                 │
│                                │                              │                 │
│  📦 Product Catalog            │                              │                 │
│  Manage your inventory         │                              │                 │
│                                │                              │                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

**Menu Item Style:**
```css
.mega-menu-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  transition: background 0.15s;
}
.mega-menu-item:hover {
  background: #F1F5F9;
}
.mega-menu-icon {
  font-size: 20px;
  width: 24px;
}
.mega-menu-title {
  font-weight: 600;
  font-size: 14px;
  color: #09080E;
}
.mega-menu-desc {
  font-size: 13px;
  color: #64748B;
  margin-top: 2px;
}
```

**Link Destinations:**

| Menu Item | Route |
|-----------|-------|
| Payments | `/products/payments` |
| Payment Links | `/products/payment-links` |
| Virtual Terminal | `/products/terminal` |
| Customer Vault | `/products/customers` |
| Product Catalog | `/products/catalog` |
| Recurring Billing | `/products/billing` |
| Invoicing | `/products/invoicing` |
| Reporting | `/products/reporting` |
| Fraud Rules | `/products/fraud` |
| 3D Secure | `/products/3ds` |
| Velocity | `/products/velocity` |

## 2.3 Developers Mega Menu

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                                                                  │
│  DOCUMENTATION                 │  TOOLS                       │  RESOURCES      │
│  ─────────────                 │  ─────                       │  ─────────      │
│                                │                              │                 │
│  📚 API Reference              │  🔑 API Keys                 │  📖 Guides      │
│  Full endpoint docs            │  Manage your credentials     │  Step-by-step   │
│                                │                              │                 │
│  🚀 Quick Start                │  🔔 Webhooks                 │  💡 Examples    │
│  Get running in 10 min         │  Real-time notifications     │  Code samples   │
│                                │                              │                 │
│  📦 SDKs & Libraries           │  🧪 Sandbox                  │  ❓ Support     │
│  PHP, Node, Python, Ruby       │  Test without real money     │  Get help       │
│                                │                              │                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

**Link Destinations:**

| Menu Item | Route |
|-----------|-------|
| API Reference | `/developers/api` |
| Quick Start | `/developers/quickstart` |
| SDKs & Libraries | `/developers/sdks` |
| API Keys | `/dashboard/api-keys` (requires auth) |
| Webhooks | `/dashboard/webhooks` (requires auth) |
| Sandbox | `/developers/sandbox` |
| Guides | `/developers/guides` |
| Examples | `/developers/examples` |
| Support | `/support` |

## 2.4 Resources Mega Menu

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                                                                  │
│  LEARN                         │  COMPANY                     │  SUPPORT        │
│  ─────                         │  ───────                     │  ───────        │
│                                │                              │                 │
│  📖 Blog                       │  🏢 About Us                 │  💬 Contact     │
│  Tips and updates              │  Our story                   │  Get in touch   │
│                                │                              │                 │
│  📊 Case Studies               │  🤝 Partners                 │  📞 Sales       │
│  Customer success stories      │  Work with us                │  Talk to a human│
│                                │                              │                 │
│  🎓 Help Center                │  📰 Press                    │  🔧 Status      │
│  FAQs and how-tos              │  News and media              │  System status  │
│                                │                              │                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

# PART 3: HOMEPAGE (EXACT SPECIFICATION)

## 3.1 Hero Section

**Layout:**
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                                                                  │
│                                                                                  │
│     Payment infrastructure                                                       │
│     for every business.                                                          │
│                                                                                  │
│     Accept payments, send invoices, and manage                                   │
│     subscriptions—from your first sale to your millionth.                        │
│                                                                                  │
│     [Get Started]  [Contact Sales]                                               │
│                                                                                  │
│                                                                                  │
│     ┌─────────────────────────────────────────────────────────────────────┐     │
│     │                                                                     │     │
│     │              [Animated payment flow visualization]                  │     │
│     │                                                                     │     │
│     │   💳 ────────────────▶ ✓ ────────────────▶ 💰                      │     │
│     │   Card entered          Approved           Deposited                │     │
│     │                                                                     │     │
│     └─────────────────────────────────────────────────────────────────────┘     │
│                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

**Exact Copy:**

**Headline:** `Payment infrastructure for every business.`

**Subheadline:** `Accept payments, send invoices, and manage subscriptions—from your first sale to your millionth.`

**CTA Buttons:**
- Primary: `Get Started` → `/register`
- Secondary: `Contact Sales` → `/contact/sales`

**Styling:**
```css
.hero {
  padding: 120px 0 80px;
  text-align: center;
  background: linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%);
}
.hero-headline {
  font-size: 56px;
  font-weight: 700;
  line-height: 1.1;
  color: #09080E;
  max-width: 800px;
  margin: 0 auto 24px;
}
.hero-subheadline {
  font-size: 20px;
  font-weight: 400;
  color: #64748B;
  max-width: 600px;
  margin: 0 auto 40px;
}
.hero-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
}
```

## 3.2 Stats Bar (Social Proof)

**Layout:**
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                                                                  │
│    2.70%              $0                 99.99%              24/7               │
│    + $0.30            monthly fee        uptime              support            │
│    per transaction    on FREE plan       guaranteed          included           │
│                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

**Styling:**
```css
.stats-bar {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 48px;
  padding: 48px 0;
  border-top: 1px solid #E2E8F0;
  border-bottom: 1px solid #E2E8F0;
  text-align: center;
}
.stat-number {
  font-size: 36px;
  font-weight: 700;
  color: #1844A6;
}
.stat-label {
  font-size: 14px;
  color: #64748B;
  margin-top: 8px;
}
```

## 3.3 Features Bento Grid

**Layout (Stripe-style bento):**
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                                                                  │
│  Everything you need to get paid.                                               │
│                                                                                  │
│  ┌────────────────────────────────────┐ ┌──────────────────┐ ┌──────────────────┐│
│  │                                    │ │                  │ │                  ││
│  │  ACCEPT PAYMENTS                   │ │  SEND INVOICES   │ │  RECURRING       ││
│  │                                    │ │                  │ │  BILLING         ││
│  │  Cards, ACH, wallets—every way     │ │  Professional    │ │                  ││
│  │  your customers want to pay.       │ │  invoices that   │ │  Set it once.    ││
│  │                                    │ │  get paid fast.  │ │  Get paid on     ││
│  │  [Payment animation/visual]        │ │                  │ │  autopilot.      ││
│  │                                    │ │  [Invoice visual]│ │                  ││
│  │                                    │ │                  │ │  [Sub visual]    ││
│  │                                    │ │                  │ │                  ││
│  │  [Learn more →]                    │ │  [Learn more →]  │ │  [Learn more →]  ││
│  └────────────────────────────────────┘ └──────────────────┘ └──────────────────┘│
│                                                                                  │
│  ┌──────────────────┐ ┌──────────────────┐ ┌────────────────────────────────────┐│
│  │                  │ │                  │ │                                    ││
│  │  PAYMENT LINKS   │ │  VIRTUAL         │ │  FRAUD PROTECTION                  ││
│  │                  │ │  TERMINAL        │ │                                    ││
│  │  Share a link.   │ │                  │ │  Stop bad actors before they       ││
│  │  Get paid.       │ │  Key in phone    │ │  cost you money.                   ││
│  │  No code needed. │ │  and mail orders.│ │                                    ││
│  │                  │ │                  │ │  [Fraud visual with blocked txn]   ││
│  │  [Link visual]   │ │  [Terminal UI]   │ │                                    ││
│  │                  │ │                  │ │  [Learn more →]                    ││
│  │  [Learn more →]  │ │  [Learn more →]  │ │                                    ││
│  └──────────────────┘ └──────────────────┘ └────────────────────────────────────┘│
│                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

**Bento Card Styling:**
```css
.bento-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
}
.bento-grid-row-2 {
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  gap: 24px;
}
.bento-card {
  background: white;
  border: 1px solid #E2E8F0;
  border-radius: 16px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.2s;
}
.bento-card:hover {
  box-shadow: 0 8px 30px rgba(0,0,0,0.08);
}
.bento-card-label {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #1844A6;
  margin-bottom: 12px;
}
.bento-card-title {
  font-size: 20px;
  font-weight: 600;
  color: #09080E;
  margin-bottom: 8px;
}
.bento-card-desc {
  font-size: 15px;
  color: #64748B;
  line-height: 1.5;
  margin-bottom: 24px;
}
.bento-card-visual {
  flex: 1;
  min-height: 150px;
  background: #F8FAFC;
  border-radius: 8px;
  margin-bottom: 24px;
}
.bento-card-link {
  font-size: 14px;
  font-weight: 600;
  color: #1844A6;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 4px;
}
.bento-card-link:hover {
  text-decoration: underline;
}
```

## 3.4 Comparison Section

**Headline:** `Why businesses switch to SwipesBlue`

**Layout:**
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                                                                  │
│  Why businesses switch to SwipesBlue                                            │
│                                                                                  │
│  ┌─────────────────────────────────────────────────────────────────────────────┐│
│  │                     │ SwipesBlue  │   Stripe    │   PayPal    │   Square   ││
│  │─────────────────────────────────────────────────────────────────────────────││
│  │ Transaction fee     │ 2.70%+$0.30 │ 2.90%+$0.30 │ 2.99%+$0.49 │ 2.90%+$0.30││
│  │─────────────────────────────────────────────────────────────────────────────││
│  │ Monthly fee (basic) │ $0          │ $0          │ $0          │ $0         ││
│  │─────────────────────────────────────────────────────────────────────────────││
│  │ Invoicing           │ ✓ Included  │ +$0.40/inv  │ +$0.49/inv  │ ✓ Included ││
│  │─────────────────────────────────────────────────────────────────────────────││
│  │ Recurring billing   │ ✓ Included  │ +0.50%      │ ✓ Included  │ +$0.50     ││
│  │─────────────────────────────────────────────────────────────────────────────││
│  │ Fraud protection    │ ✓ Included  │ +$0.05/txn  │ ✓ Included  │ ✓ Included ││
│  │─────────────────────────────────────────────────────────────────────────────││
│  │ Virtual terminal    │ ✓ Included  │ ✓ Included  │ ✓ Included  │ ✓ Included ││
│  │─────────────────────────────────────────────────────────────────────────────││
│  │ Payment links       │ ✓ Included  │ ✓ Included  │ ✓ Included  │ ✓ Included ││
│  └─────────────────────────────────────────────────────────────────────────────┘│
│                                                                                  │
│  On $100,000 in annual sales:                                                   │
│  SwipesBlue saves you $200+ compared to Stripe.                                 │
│                                                                                  │
│  [Start saving today →]                                                         │
│                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

**Table Styling:**
```css
.comparison-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
.comparison-table th {
  background: #F8FAFC;
  padding: 16px 20px;
  text-align: left;
  font-weight: 600;
  font-size: 14px;
  border-bottom: 1px solid #E2E8F0;
}
.comparison-table th.highlight {
  background: #1844A6;
  color: white;
}
.comparison-table td {
  padding: 16px 20px;
  border-bottom: 1px solid #E2E8F0;
  font-size: 14px;
}
.comparison-table td.highlight {
  background: #F0F4FF;
  font-weight: 600;
  color: #1844A6;
}
.comparison-table .checkmark {
  color: #10B981;
}
```

## 3.5 Pricing Preview

**Layout:**
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                                                                  │
│  Simple, transparent pricing                                                    │
│  No hidden fees. No surprises. Cancel anytime.                                  │
│                                                                                  │
│  ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐ ┌──────────────┐│
│  │                  │ │                  │ │                  │ │              ││
│  │  FREE            │ │  STARTER         │ │  PRO             │ │  ENTERPRISE  ││
│  │                  │ │                  │ │  POPULAR         │ │              ││
│  │  $0              │ │  $29             │ │  $79             │ │  $299        ││
│  │  /month          │ │  /month          │ │  /month          │ │  /month      ││
│  │                  │ │                  │ │                  │ │              ││
│  │  2.70% + $0.30   │ │  2.70% + $0.30   │ │  2.70% + $0.30   │ │  2.70%+$0.30 ││
│  │  per transaction │ │  per transaction │ │  per transaction │ │  per txn     ││
│  │                  │ │                  │ │                  │ │              ││
│  │  ✓ Payments      │ │  Everything in   │ │  Everything in   │ │  Everything  ││
│  │  ✓ Invoicing     │ │  FREE, plus:     │ │  Starter, plus:  │ │  in Pro, plus││
│  │  ✓ Payment links │ │                  │ │                  │ │              ││
│  │  ✓ 1 user        │ │  ✓ Subscriptions │ │  ✓ Advanced fraud│ │  ✓ Full API  ││
│  │                  │ │  ✓ 3 users       │ │  ✓ Brand Studio  │ │  ✓ Dedicated ││
│  │                  │ │  ✓ Basic reports │ │  ✓ Priority      │ │    support   ││
│  │                  │ │                  │ │    support       │ │  ✓ Custom    ││
│  │                  │ │                  │ │  ✓ 10 users      │ │    routing   ││
│  │                  │ │                  │ │                  │ │              ││
│  │  [Get Started]   │ │  [Start Free     │ │  [Start Free     │ │  [Contact    ││
│  │                  │ │   Trial]         │ │   Trial]         │ │   Sales]     ││
│  │                  │ │                  │ │                  │ │              ││
│  └──────────────────┘ └──────────────────┘ └──────────────────┘ └──────────────┘│
│                                                                                  │
│  [See full pricing comparison →]                                                │
│                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## 3.6 Social Proof / Testimonials

**Layout:**
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                                                                  │
│  Trusted by businesses everywhere                                               │
│                                                                                  │
│  [Logo] [Logo] [Logo] [Logo] [Logo] [Logo]                                      │
│                                                                                  │
│  ───────────────────────────────────────────────────────────────────────────── │
│                                                                                  │
│  "SwipesBlue cut our payment processing fees by 15% and                         │
│   the dashboard is actually easy to use."                                       │
│                                                                                  │
│   [Photo] Sarah Chen                                                            │
│           Founder, Bloom Skincare                                               │
│                                                                                  │
│  ───────────────────────────────────────────────────────────────────────────── │
│                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## 3.7 CTA Section

**Layout:**
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                                                                  │
│  ┌─────────────────────────────────────────────────────────────────────────────┐│
│  │                                                                             ││
│  │        Ready to get started?                                                ││
│  │                                                                             ││
│  │        Create an account in minutes. No contracts.                          ││
│  │        No credit card required.                                             ││
│  │                                                                             ││
│  │        [Get Started — It's Free]        [Talk to Sales]                     ││
│  │                                                                             ││
│  └─────────────────────────────────────────────────────────────────────────────┘│
│                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

**Styling:**
```css
.cta-section {
  background: linear-gradient(135deg, #1844A6 0%, #064A6C 100%);
  border-radius: 24px;
  padding: 80px;
  text-align: center;
  margin: 80px 0;
}
.cta-headline {
  font-size: 40px;
  font-weight: 700;
  color: white;
  margin-bottom: 16px;
}
.cta-subheadline {
  font-size: 18px;
  color: rgba(255,255,255,0.8);
  margin-bottom: 32px;
}
.cta-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
}
.cta-btn-primary {
  background: white;
  color: #1844A6;
  padding: 16px 32px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
}
.cta-btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid rgba(255,255,255,0.3);
  padding: 14px 32px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
}
```

---

# PART 4: PRODUCT PAGES (STRIPE PATTERN)

Each product page follows Stripe's exact pattern:

## 4.1 Product Page Template

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  [HEADER NAV]                                                                   │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│  SECTION 1: HERO                                                                │
│  ───────────────                                                                │
│  • Headline (outcome-focused, 6-10 words)                                       │
│  • Subheadline (1-2 sentences)                                                  │
│  • Primary CTA + Secondary CTA                                                  │
│  • Hero visual (screenshot, animation, or illustration)                         │
│                                                                                  │
│  SECTION 2: FEATURE HIGHLIGHTS (3-4 cards)                                      │
│  ───────────────────────────────────────                                        │
│  • Icon + Title + 1-sentence description                                        │
│                                                                                  │
│  SECTION 3: DEEP DIVE (alternating left/right)                                  │
│  ─────────────────────────────────────────────                                  │
│  • Feature 1: Image left, text right                                            │
│  • Feature 2: Text left, image right                                            │
│  • Feature 3: Image left, text right                                            │
│                                                                                  │
│  SECTION 4: HOW IT WORKS (numbered steps)                                       │
│  ───────────────────────────────────────                                        │
│  • Step 1 → Step 2 → Step 3                                                     │
│                                                                                  │
│  SECTION 5: PRICING (if applicable)                                             │
│  ─────────────────────────────────                                              │
│  • Pricing card or link to /pricing                                             │
│                                                                                  │
│  SECTION 6: CTA                                                                 │
│  ──────────                                                                     │
│  • Final call to action                                                         │
│                                                                                  │
│  [FOOTER]                                                                       │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 4.2 Payment Links Page (`/products/payment-links`)

**Hero:**
- **Headline:** `Share a link. Get paid.`
- **Subheadline:** `Create a payment page in seconds. Send it anywhere. No code required.`
- **CTA:** `Create a Payment Link` → `/dashboard/payment-links/create`
- **Visual:** Animation of link being created → shared → payment received

**Feature Highlights:**

| Icon | Title | Description |
|------|-------|-------------|
| ⚡ | Instant setup | Create a payment link in under 60 seconds |
| 📱 | Share anywhere | Email, text, social, QR code—wherever your customers are |
| 💳 | Accept everything | Cards, ACH, Apple Pay, Google Pay |
| 🔒 | Secure by default | PCI compliant, fraud protection included |

**How It Works:**
```
1. Create your link          2. Share it anywhere         3. Get paid
   Set amount, description      Email, text, embed,          Money hits your
   and customize branding       social, QR code              account automatically
```

**Code Example (for developers):**
```javascript
// Create a payment link via API
const paymentLink = await swipesblue.paymentLinks.create({
  amount: 5000, // $50.00
  description: 'Consulting session',
  redirect_url: 'https://yoursite.com/thanks'
});

// Returns: https://pay.swipesblue.com/abc123
```

---

## 4.3 Virtual Terminal Page (`/products/terminal`)

**Hero:**
- **Headline:** `Accept payments from anywhere.`
- **Subheadline:** `Key in credit card and ACH payments for phone orders, mail orders, or in-person sales—no hardware needed.`
- **CTA:** `Open Virtual Terminal` → `/dashboard/terminal`
- **Visual:** Screenshot of virtual terminal interface

**Feature Highlights:**

| Icon | Title | Description |
|------|-------|-------------|
| ☎️ | Phone orders | Take card numbers over the phone securely |
| ✉️ | Mail orders | Process checks and card payments from mail |
| 🏪 | Walk-ins | Accept payments without card readers |
| 🔄 | Refunds & voids | Process returns with one click |

**What you can do:**
- Credit card sale, authorize, capture
- ACH/eCheck payments
- Cash transactions (for record keeping)
- Partial refunds
- Add to customer vault for future charges

---

## 4.4 Invoicing Page (`/products/invoicing`)

**Hero:**
- **Headline:** `Professional invoices that get paid fast.`
- **Subheadline:** `Create, send, and track invoices. Customers pay online with one click. Most invoices paid within 3 days.`
- **CTA:** `Create an Invoice` → `/dashboard/invoices/create`
- **Visual:** Invoice being created → sent → paid animation

**Feature Highlights:**

| Icon | Title | Description |
|------|-------|-------------|
| ✉️ | One-click send | Email invoices directly to customers |
| 💳 | Pay online | Customers click and pay—no login required |
| 📊 | Track status | See viewed, paid, overdue at a glance |
| 🔔 | Auto-reminders | Gentle nudges for unpaid invoices |

**How It Works:**
```
1. Create invoice            2. Customer receives email    3. Customer pays online
   Add line items,              With payment link             Click, enter card,
   set due date                 embedded                      done

                                         ↓

4. You get notified          5. Money deposited
   Instant confirmation         Next business day
```

---

## 4.5 Recurring Billing Page (`/products/billing`)

**Hero:**
- **Headline:** `Set it once. Get paid forever.`
- **Subheadline:** `Subscriptions, memberships, retainers—automate any recurring payment and never chase invoices again.`
- **CTA:** `Set Up Recurring Billing` → `/dashboard/subscriptions`
- **Visual:** Calendar showing automatic charges + subscription management UI

**Feature Highlights:**

| Icon | Title | Description |
|------|-------|-------------|
| 🔄 | Automatic billing | Charge customers on schedule, hands-free |
| 📅 | Flexible plans | Daily, weekly, monthly, annual—any interval |
| 💳 | Card updater | Automatically update expired cards |
| 🔔 | Failed payment alerts | Know immediately when a charge fails |

**Pricing models supported:**
- Flat rate (e.g., $29/month)
- Per-seat (e.g., $10/user/month)
- Usage-based (e.g., $0.01/API call)
- Tiered (e.g., $0-100 = $X, $101-500 = $Y)
- Hybrid (base + usage)

---

## 4.6 Customer Vault Page (`/products/customers`)

**Hero:**
- **Headline:** `Save payment methods. Charge with one click.`
- **Subheadline:** `Securely store customer card and bank info. Charge returning customers instantly without asking for details again.`
- **CTA:** `Start Storing Customers` → `/dashboard/customers`
- **Visual:** Customer profile with saved cards

**Feature Highlights:**

| Icon | Title | Description |
|------|-------|-------------|
| 🔒 | Bank-level security | PCI Level 1 compliant, tokenized storage |
| ⚡ | One-click charges | Bill saved customers instantly |
| 📜 | Full history | See every transaction for each customer |
| 💳 | Multiple methods | Store cards, bank accounts, or both |

---

## 4.7 Fraud Protection Page (`/products/fraud`)

**Hero:**
- **Headline:** `Stop fraud before it costs you.`
- **Subheadline:** `Custom rules, velocity limits, and blocklists—take control of what transactions you accept.`
- **CTA:** `Configure Fraud Rules` → `/dashboard/fraud-rules`
- **Visual:** Transaction being blocked with reason code

**Feature Highlights:**

| Icon | Title | Description |
|------|-------|-------------|
| 🚫 | Block bad actors | Blocklist cards, emails, IPs, countries |
| ⚡ | Velocity limits | Stop rapid-fire fraud attacks |
| 🎯 | Custom rules | Create rules for your specific business |
| ✅ | Whitelist trusted | Override rules for known good customers |

**What you can block:**
- Specific card numbers or BIN ranges
- IP addresses or entire countries
- Email domains (e.g., @tempmail.com)
- Transactions above/below certain amounts
- Too many attempts in a time period

---

# PART 5: DASHBOARD STRUCTURE

## 5.1 Dashboard Sidebar (Exact Layout)

```
┌─────────────────────────────────────────┐
│  [Logo]                                 │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  🏠 Home                                │
│                                         │
│  ─────────────────────────────────────  │
│  PAYMENTS                               │
│  ─────────────────────────────────────  │
│                                         │
│  💳 Transactions                        │
│  ⌨️ Virtual Terminal                    │
│  🔗 Payment Links                       │
│  📦 Products                            │
│                                         │
│  ─────────────────────────────────────  │
│  BILLING                                │
│  ─────────────────────────────────────  │
│                                         │
│  📄 Invoices                            │
│  🔄 Subscriptions                       │
│  📋 Plans                               │
│                                         │
│  ─────────────────────────────────────  │
│  CUSTOMERS                              │
│  ─────────────────────────────────────  │
│                                         │
│  👥 Customers                           │
│                                         │
│  ─────────────────────────────────────  │
│  REPORTS                                │
│  ─────────────────────────────────────  │
│                                         │
│  📊 Overview                            │
│  📈 Revenue                             │
│  📉 Settlements                         │
│                                         │
│  ─────────────────────────────────────  │
│  SECURITY                               │
│  ─────────────────────────────────────  │
│                                         │
│  🛡️ Fraud Rules                         │
│  🔒 3D Secure                           │
│                                         │
│  ─────────────────────────────────────  │
│  DEVELOPERS                             │
│  ─────────────────────────────────────  │
│                                         │
│  🔑 API Keys                            │
│  🔔 Webhooks                            │
│  🧪 Sandbox                             │
│                                         │
│  ─────────────────────────────────────  │
│  SETTINGS                               │
│  ─────────────────────────────────────  │
│                                         │
│  ⚙️ Settings                            │
│  👤 Team                                │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  📦 FREE Plan                           │
│  [Upgrade →]                            │
│                                         │
└─────────────────────────────────────────┘
```

**Sidebar Styling:**
```css
.sidebar {
  width: 240px;
  background: #FAFBFC;
  border-right: 1px solid #E2E8F0;
  height: 100vh;
  position: fixed;
  padding: 24px 0;
}
.sidebar-section-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #94A3B8;
  padding: 8px 24px;
  margin-top: 16px;
}
.sidebar-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 24px;
  color: #475569;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.15s;
  cursor: pointer;
}
.sidebar-item:hover {
  background: #F1F5F9;
  color: #1844A6;
}
.sidebar-item.active {
  background: #EFF6FF;
  color: #1844A6;
  border-right: 3px solid #1844A6;
}
.sidebar-icon {
  font-size: 18px;
  width: 20px;
}
```

## 5.2 Dashboard Home Page (`/dashboard`)

**Layout:**
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  Good morning, Alex                                                             │
│  Here's how your business is doing                                              │
│                                                                                  │
│  ┌────────────────┐ ┌────────────────┐ ┌────────────────┐ ┌────────────────┐   │
│  │ TODAY          │ │ THIS WEEK      │ │ THIS MONTH     │ │ PENDING        │   │
│  │ $1,234.56      │ │ $8,901.23      │ │ $45,678.90     │ │ $567.89        │   │
│  │ 23 transactions│ │ 156 txns       │ │ 892 txns       │ │ 3 invoices     │   │
│  └────────────────┘ └────────────────┘ └────────────────┘ └────────────────┘   │
│                                                                                  │
│  ┌─────────────────────────────────────────────────────────────────────────────┐│
│  │ Revenue                                                     [Last 30 days ▼]││
│  │                                                                             ││
│  │  $50K ┤                                                                     ││
│  │       │                              ╭───╮                                  ││
│  │  $40K ┤                         ╭────╯   ╰──╮                               ││
│  │       │                    ╭────╯           ╰───╮                           ││
│  │  $30K ┤               ╭────╯                    ╰──╮                        ││
│  │       │          ╭────╯                            ╰───╮                    ││
│  │  $20K ┤     ╭────╯                                     ╰────╮               ││
│  │       │╭────╯                                               ╰───────────   ││
│  │  $10K ┤                                                                     ││
│  │       └──────────────────────────────────────────────────────────────────   ││
│  │         Jan 3    Jan 10    Jan 17    Jan 24    Jan 31    Feb 2              ││
│  └─────────────────────────────────────────────────────────────────────────────┘│
│                                                                                  │
│  ┌─────────────────────────────────────┐ ┌─────────────────────────────────────┐│
│  │ Recent Transactions                 │ │ Quick Actions                       ││
│  │                                     │ │                                     ││
│  │ $125.00  john@example.com   2m ago │ │ [+ Create Payment Link]             ││
│  │ $49.99   jane@example.com  15m ago │ │                                     ││
│  │ $299.00  bob@example.com   1h ago  │ │ [+ Send Invoice]                    ││
│  │ $75.50   alice@example.com 2h ago  │ │                                     ││
│  │                                     │ │ [+ Add Customer]                    ││
│  │ [View all transactions →]          │ │                                     ││
│  └─────────────────────────────────────┘ └─────────────────────────────────────┘│
│                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

# PART 6: FOOTER

**Layout:**
```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                                                                  │
│  [Logo]                                                                         │
│                                                                                  │
│  PRODUCTS           DEVELOPERS         COMPANY           RESOURCES              │
│  ─────────          ──────────         ───────           ─────────              │
│  Payments           Documentation      About             Blog                   │
│  Payment Links      API Reference      Careers           Help Center            │
│  Invoicing          Quick Start        Press             Status                 │
│  Recurring Billing  SDKs               Contact           Security               │
│  Virtual Terminal   Webhooks           Partners                                 │
│  Customer Vault     Sandbox                                                     │
│  Fraud Protection                                                               │
│                                                                                  │
│  ─────────────────────────────────────────────────────────────────────────────  │
│                                                                                  │
│  © 2026 SwipesBlue. All rights reserved.                                        │
│                                                                                  │
│  Terms · Privacy · Cookies                       [Twitter] [LinkedIn] [GitHub]  │
│                                                                                  │
│  ─────────────────────────────────────────────────────────────────────────────  │
│                                                                                  │
│  PLATFORMS                                                                       │
│  → SwipesBlue.com                                                               │
│  → HostsBlue.com                                                                │
│  → BusinessBlueprint.io                                                         │
│                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

# PART 7: COMPLETE PAGE LIST WITH ROUTES

## Public Pages

| Route | Page Name | Purpose |
|-------|-----------|---------|
| `/` | Homepage | Hero, features, pricing preview, CTA |
| `/pricing` | Pricing | Full pricing comparison |
| `/products/payments` | Payments | Accept payments product page |
| `/products/payment-links` | Payment Links | Payment links product page |
| `/products/terminal` | Virtual Terminal | Terminal product page |
| `/products/invoicing` | Invoicing | Invoicing product page |
| `/products/billing` | Recurring Billing | Subscriptions product page |
| `/products/customers` | Customer Vault | Customer vault product page |
| `/products/catalog` | Product Catalog | Product manager product page |
| `/products/reporting` | Reporting | Reports product page |
| `/products/fraud` | Fraud Protection | Fraud rules product page |
| `/products/3ds` | 3D Secure | 3DS product page |
| `/products/velocity` | Velocity Limits | Velocity product page |
| `/developers` | Developers Home | Dev landing page |
| `/developers/api` | API Reference | Full API docs |
| `/developers/quickstart` | Quick Start | Getting started guide |
| `/developers/sdks` | SDKs | Download libraries |
| `/developers/sandbox` | Sandbox | Test environment info |
| `/developers/guides` | Guides | How-to articles |
| `/developers/examples` | Examples | Code samples |
| `/support` | Support | Help center |
| `/contact` | Contact | Contact form |
| `/contact/sales` | Sales | Talk to sales |
| `/about` | About | Company info |
| `/login` | Login | Sign in |
| `/register` | Register | Create account |

## Payment Pages (Public, hosted)

| Route | Page Name | Purpose |
|-------|-----------|---------|
| `/pay/[link-id]` | Payment Link Checkout | Hosted payment page |
| `/invoice/[invoice-id]` | Invoice Payment | Pay invoice |

## Dashboard Pages (Authenticated)

| Route | Page Name |
|-------|-----------|
| `/dashboard` | Dashboard Home |
| `/dashboard/transactions` | All Transactions |
| `/dashboard/transactions/[id]` | Transaction Detail |
| `/dashboard/terminal` | Virtual Terminal |
| `/dashboard/terminal/sale` | Card Sale |
| `/dashboard/terminal/authorize` | Card Authorize |
| `/dashboard/terminal/check` | ACH Payment |
| `/dashboard/payment-links` | Payment Links List |
| `/dashboard/payment-links/create` | Create Payment Link |
| `/dashboard/payment-links/[id]` | Payment Link Detail |
| `/dashboard/products` | Product Catalog |
| `/dashboard/products/create` | Add Product |
| `/dashboard/products/[id]` | Edit Product |
| `/dashboard/invoices` | Invoices List |
| `/dashboard/invoices/create` | Create Invoice |
| `/dashboard/invoices/[id]` | Invoice Detail |
| `/dashboard/subscriptions` | Subscriptions List |
| `/dashboard/subscriptions/create` | Create Subscription |
| `/dashboard/subscriptions/[id]` | Subscription Detail |
| `/dashboard/plans` | Billing Plans |
| `/dashboard/plans/create` | Create Plan |
| `/dashboard/plans/[id]` | Plan Detail |
| `/dashboard/customers` | Customer List |
| `/dashboard/customers/create` | Add Customer |
| `/dashboard/customers/[id]` | Customer Detail |
| `/dashboard/customers/[id]/charge` | Charge Customer |
| `/dashboard/reports` | Reports Overview |
| `/dashboard/reports/revenue` | Revenue Report |
| `/dashboard/reports/settlements` | Settlements |
| `/dashboard/fraud-rules` | Fraud Rules |
| `/dashboard/fraud-rules/create` | Create Rule |
| `/dashboard/fraud-rules/blocklist` | Blocklist |
| `/dashboard/fraud-rules/whitelist` | Whitelist |
| `/dashboard/3ds` | 3D Secure Settings |
| `/dashboard/api-keys` | API Keys |
| `/dashboard/webhooks` | Webhooks |
| `/dashboard/webhooks/[id]` | Webhook Detail |
| `/dashboard/sandbox` | Sandbox Mode |
| `/dashboard/settings` | Account Settings |
| `/dashboard/settings/business` | Business Info |
| `/dashboard/settings/branding` | Branding |
| `/dashboard/settings/receipts` | Receipt Settings |
| `/dashboard/settings/users` | Team Members |

---

# PART 8: EXECUTION ORDER

## Phase 1: Foundation (Week 1)
1. ✅ Fix database rates (2.70%, $299 Enterprise)
2. Homepage with Stripe-style layout
3. Header navigation with mega menus
4. Footer
5. Login/Register pages

## Phase 2: Core Product Pages (Week 2)
6. `/products/payments`
7. `/products/payment-links`
8. `/products/terminal`
9. `/products/invoicing`
10. `/products/billing`
11. `/products/customers`
12. `/pricing` (full page)

## Phase 3: Dashboard Core (Week 3)
13. Dashboard layout (sidebar, header)
14. Dashboard home with stats
15. `/dashboard/transactions`
16. `/dashboard/terminal` (virtual terminal)
17. `/dashboard/customers`

## Phase 4: Dashboard Billing (Week 4)
18. `/dashboard/payment-links`
19. `/dashboard/invoices`
20. `/dashboard/subscriptions`
21. `/dashboard/plans`
22. `/dashboard/products`

## Phase 5: Dashboard Security & Reports (Week 5)
23. `/dashboard/fraud-rules`
24. `/dashboard/reports`
25. `/dashboard/api-keys`
26. `/dashboard/webhooks`
27. `/dashboard/settings`

## Phase 6: Hosted Pages (Week 6)
28. `/pay/[link-id]` (payment link checkout)
29. `/invoice/[invoice-id]` (invoice payment)

## Phase 7: Developer Pages (Week 7)
30. `/developers` landing
31. `/developers/api`
32. `/developers/quickstart`
33. `/developers/sdks`

---

# CRITICAL RULES FOR BUILDER

1. **Copy exactly** — Use the headlines, button text, and descriptions in this document verbatim
2. **Layout exactly** — Match the wireframes pixel-for-pixel
3. **Style exactly** — Use the CSS provided, do not improvise
4. **No filler** — If content isn't specified, ask before inventing
5. **Test every link** — Every button must go somewhere real
6. **Mobile responsive** — Every page must work on mobile
7. **Screenshots after each step** — Show progress, wait for approval

**This is the only document you need. Follow it exactly.**
