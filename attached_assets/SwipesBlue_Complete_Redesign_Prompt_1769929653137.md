# SwipesBlue — Complete Redesign & Product Structure

**Before making ANY changes, read this entire prompt. Then present your plan and wait for approval.**

---

## PART 1: Brand Assets

### Asset Files (Use These Exactly)

| Asset | File Name | Usage |
|-------|-----------|-------|
| Company Name | `swipesblue_Company_Name.png` | Text-only logo |
| Logo (Icon) | `swipesblue_logo.png` | Icon only (card with blue swipe ring) |
| Full Lockup | `swipesblue_Company_Name_with_Logo.png` | Icon + text combined — USE FOR HEADER |
| URL Version | `swipesblue_url.png` | With .com in green |
| Color Palette | `Color_palette.webp` | Reference |

**Note:** All assets have transparent backgrounds. No background removal needed.

### Terminology (Add to replit.md)

- **Company Name** = the text "swipesblue"
- **Logo** = the icon only (card with blue swipe ring)
- **Company Name + Logo** = full lockup (icon + text)
- **URL** = web address version (with .com in green)

### Company Name Creation Standard (If Building in Code)

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

## PART 2: Brand Color Palette

**This is the FINAL palette. Remove ALL old colors.**

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

### Color Rules

1. **Logo colors (Charcoal Gray + Blue Pure) are RESERVED** — never use for general UI
2. **Blue Deep (#1844A6)** = Primary workhorse (buttons, links, active states)
3. **Teal (#064A6C)** = Secondary workhorse (secondary buttons, dark sections)
4. **Status colors are strict:**
   - Success = Trusted Green (#10B981)
   - Pending/Warning = Gold (#FFD700)
   - Error/Failed = Muted Red (#DC2626)
5. **Remove ALL colors not in this palette**

---

## PART 3: Product Structure & Pricing

SwipesBlue has TWO distinct product lines. The navigation and UI must clearly separate these.

### Product Line 1: E-Commerce Suite

For merchants who want to sell products online. Freemium model with upgrade tiers.

| Tier | Price | Features |
|------|-------|----------|
| **FREE** | $0 | Product Catalog (up to 25 products), Shopping Cart, Basic Checkout, Order History, Basic Dashboard |
| **Starter** | $29/mo | Unlimited products, Abandoned Cart Recovery (basic), Discount Codes, Basic Analytics |
| **Pro** | $79/mo | Everything in Starter + Brand Studio (white-label), Advanced Abandoned Cart (dynamic coupons), Inventory Alerts, Advanced Analytics, Priority Support |
| **Enterprise** | $199/mo | Everything in Pro + Multi-store, API Access, Webhooks, Custom Integrations, Dedicated Support |

**Plus transaction fees on ALL tiers: 2.9% + 30¢**

### Product Line 2: Developer Tools (SaaS)

For developers integrating SwipesBlue payments into their own platforms. Transaction-based pricing.

| Product | Price | For Who |
|---------|-------|---------|
| **Payment API** | 2.9% + 30¢ per transaction | Developers building custom integrations |
| **API Pro** | $99/mo + 2.5% + 25¢ per transaction | High-volume developers, lower transaction rate |

---

## PART 4: Navigation Structure

### Header Navigation

```
[Logo + Company Name]     Products ▼    Pricing    Resources ▼    Dashboard    [Sign In]  [Get Started →]
```

### Products Mega Menu (Full-Width Dropdown)

The Products menu tells a story. Two clear columns: one for merchants, one for developers.

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                         │
│   E-COMMERCE SUITE                          │   DEVELOPER TOOLS                         │
│   Everything you need to sell online        │   Build custom payment integrations       │
│                                             │                                           │
│   ┌─────────────────────────────────┐       │   ┌─────────────────────────────────┐     │
│   │ 🛒 Product Catalog              │       │   │ </> Payment API                 │     │
│   │    List and manage products     │       │   │    Accept payments anywhere     │     │
│   │    FREE                         │       │   │    2.9% + 30¢                   │     │
│   └─────────────────────────────────┘       │   └─────────────────────────────────┘     │
│                                             │                                           │
│   ┌─────────────────────────────────┐       │   ┌─────────────────────────────────┐     │
│   │ 🛍️ Shopping Cart                │       │   │ 🔗 Webhooks                     │     │
│   │    Add to cart, update qty      │       │   │    Real-time event notifications│     │
│   │    FREE                         │       │   │    Included with API            │     │
│   └─────────────────────────────────┘       │   └─────────────────────────────────┘     │
│                                             │                                           │
│   ┌─────────────────────────────────┐       │   ┌─────────────────────────────────┐     │
│   │ 💳 Checkout                     │       │   │ 🔑 API Keys                     │     │
│   │    Secure payment processing    │       │   │    Manage your credentials      │     │
│   │    FREE                         │       │   │    Included with API            │     │
│   └─────────────────────────────────┘       │   └─────────────────────────────────┘     │
│                                             │                                           │
│   ┌─────────────────────────────────┐       │   ┌─────────────────────────────────┐     │
│   │ 📦 Order Management             │       │   │ 📚 Documentation                │     │
│   │    Track and fulfill orders     │       │   │    API reference & guides       │     │
│   │    FREE                         │       │   │    FREE                         │     │
│   └─────────────────────────────────┘       │   └─────────────────────────────────┘     │
│                                             │                                           │
│   ┌─────────────────────────────────┐       │                                           │
│   │ 🎨 Brand Studio            PRO  │       │                                           │
│   │    White-label your checkout    │       │                                           │
│   │    $79/mo                       │       │                                           │
│   └─────────────────────────────────┘       │                                           │
│                                             │                                           │
│   ┌─────────────────────────────────┐       │                                           │
│   │ 📧 Abandoned Cart Recovery      │       │                                           │
│   │    Recover lost sales      NEW  │       │                                           │
│   │    From $29/mo                  │       │                                           │
│   └─────────────────────────────────┘       │                                           │
│                                             │                                           │
│   [View All E-Commerce Features →]          │   [View API Documentation →]              │
│                                             │                                           │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

### Badge System for Menu Items

| Badge | Color | Usage |
|-------|-------|-------|
| FREE | Trusted Green (#10B981) | Features included in free tier |
| NEW | Gold (#FFD700) | Recently launched features |
| PRO | Blue Deep (#1844A6) | Requires Pro tier or higher |
| POPULAR | Gold (#FFD700) | Most-used features |

### Resources Mega Menu

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   DOCUMENTATION                        │   SUPPORT                          │
│                                        │                                    │
│   📖 Getting Started                   │   💬 Help Center                   │
│      Quick start guide                 │      FAQs and tutorials            │
│                                        │                                    │
│   </> API Reference                    │   📞 Contact Sales                 │
│      Complete API docs                 │      Talk to our team              │
│                                        │                                    │
│   🔧 Integration Guides                │   📊 System Status                 │
│      Step-by-step tutorials            │      Uptime and incidents          │
│                                        │                                    │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Menu Link Destinations

| Menu Item | Route | Notes |
|-----------|-------|-------|
| **E-Commerce Suite** | | |
| Product Catalog | /products | Demo page |
| Shopping Cart | /cart | Demo page |
| Checkout | /checkout | Demo page |
| Order Management | /orders | Demo page |
| Brand Studio | /brand-studio | Requires Pro |
| Abandoned Cart Recovery | /features/abandoned-cart | Feature page |
| **Developer Tools** | | |
| Payment API | /developers | Landing page |
| Webhooks | /developers/webhooks | Docs |
| API Keys | /dashboard/api-keys | Requires login |
| Documentation | /docs | Docs home |
| **Resources** | | |
| Getting Started | /docs/getting-started | |
| API Reference | /docs/api | |
| Integration Guides | /docs/guides | |
| Help Center | /support | |
| Contact Sales | /contact | |
| System Status | /status | |
| **Main Nav** | | |
| Pricing | /pricing | |
| Dashboard | /dashboard | Requires login |

---

## PART 5: Pricing Page Structure

The pricing page should clearly show both product lines with upgrade paths.

### Section 1: E-Commerce Suite Pricing

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                         │
│                        E-Commerce Suite                                                 │
│            Everything you need to sell online                                           │
│                                                                                         │
│   ┌───────────────┐  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐           │
│   │     FREE      │  │    STARTER    │  │      PRO      │  │  ENTERPRISE   │           │
│   │               │  │               │  │   POPULAR     │  │               │           │
│   │     $0/mo     │  │    $29/mo     │  │    $79/mo     │  │   $199/mo     │           │
│   │               │  │               │  │               │  │               │           │
│   │ • 25 products │  │ • Unlimited   │  │ • Everything  │  │ • Everything  │           │
│   │ • Cart        │  │   products    │  │   in Starter  │  │   in Pro      │           │
│   │ • Checkout    │  │ • Abandoned   │  │ • Brand       │  │ • Multi-store │           │
│   │ • Orders      │  │   Cart basic  │  │   Studio      │  │ • API Access  │           │
│   │ • Dashboard   │  │ • Discount    │  │ • Advanced    │  │ • Webhooks    │           │
│   │               │  │   codes       │  │   Abandoned   │  │ • Custom      │           │
│   │               │  │ • Basic       │  │   Cart        │  │   integrations│           │
│   │               │  │   analytics   │  │ • Inventory   │  │ • Dedicated   │           │
│   │               │  │               │  │   alerts      │  │   support     │           │
│   │               │  │               │  │ • Advanced    │  │               │           │
│   │               │  │               │  │   analytics   │  │               │           │
│   │               │  │               │  │ • Priority    │  │               │           │
│   │               │  │               │  │   support     │  │               │           │
│   │               │  │               │  │               │  │               │           │
│   │ [Start Free→] │  │ [Get Started→]│  │ [Get Started→]│  │ [Contact Us→] │           │
│   └───────────────┘  └───────────────┘  └───────────────┘  └───────────────┘           │
│                                                                                         │
│                    + 2.9% + 30¢ per transaction on all plans                           │
│                                                                                         │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

### Section 2: Developer API Pricing

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                         │
│                         Developer API                                                   │
│              Build custom payment integrations                                          │
│                                                                                         │
│   ┌─────────────────────────────────┐  ┌─────────────────────────────────┐             │
│   │          PAYMENT API            │  │           API PRO               │             │
│   │                                 │  │                                 │             │
│   │      2.9% + 30¢                 │  │   $99/mo + 2.5% + 25¢           │             │
│   │      per transaction            │  │   per transaction               │             │
│   │                                 │  │                                 │             │
│   │ • Full API access               │  │ • Everything in Payment API     │             │
│   │ • Webhooks                      │  │ • Lower transaction fees        │             │
│   │ • API Keys                      │  │ • Higher rate limits            │             │
│   │ • Documentation                 │  │ • Priority support              │             │
│   │ • Community support             │  │ • Dedicated account manager     │             │
│   │                                 │  │                                 │             │
│   │      [Get API Keys →]           │  │      [Contact Sales →]          │             │
│   └─────────────────────────────────┘  └─────────────────────────────────┘             │
│                                                                                         │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

### Section 3: FAQ

Common pricing questions with expandable answers.

---

## PART 6: Dashboard & Admin Navigation

### Problem: Users Get Trapped

Currently, when entering Dashboard or Admin, users cannot return to the main site.

### Solution: Persistent Navigation

**Rule: Users should NEVER lose access to main site navigation.**

### Dashboard Layout (For Merchants)

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│ [Logo]  Products ▼   Pricing   Resources ▼   Dashboard   [Account ▼]                   │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                         │
│  SIDEBAR                    │  MAIN CONTENT                                             │
│                             │                                                           │
│  📊 Overview                │  Dashboard                                                │
│  📦 Products                │  ─────────────────────────────────────────                │
│  🛒 Orders                  │                                                           │
│  💳 Transactions            │  [Stats Cards: Revenue, Orders, Success Rate, Customers]  │
│  📧 Abandoned Carts    PRO  │                                                           │
│  🎨 Brand Studio       PRO  │  [Recent Transactions Table]                              │
│  📈 Analytics               │                                                           │
│  ⚙️ Settings                │  [Charts/Graphs]                                          │
│                             │                                                           │
│  ─────────────────          │                                                           │
│  DEVELOPER                  │                                                           │
│  🔑 API Keys                │                                                           │
│  🔗 Webhooks                │                                                           │
│                             │                                                           │
│  ─────────────────          │                                                           │
│  PLATFORMS                  │                                                           │
│  → SwipesBlue.com           │                                                           │
│  → HostsBlue.com            │                                                           │
│  → BusinessBlueprint.io     │                                                           │
│                             │                                                           │
│  ─────────────────          │                                                           │
│  Your Plan: FREE            │                                                           │
│  [Upgrade to Pro →]         │                                                           │
│                             │                                                           │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

### Admin Layout (Internal)

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│ [Logo]  ← Back to Site                                            [Admin Account ▼]    │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                         │
│  SIDEBAR                    │  MAIN CONTENT                                             │
│                             │                                                           │
│  📊 Dashboard               │  Admin Dashboard                                          │
│  👥 Merchants               │  ─────────────────────────────────────────                │
│  💳 Transactions            │                                                           │
│  🔑 API Keys                │  [Admin Stats]                                            │
│  🔗 Webhooks                │                                                           │
│  🎨 Brand Studio            │  [Merchant Management]                                    │
│                             │                                                           │
│  ─────────────────          │                                                           │
│  PLATFORMS                  │                                                           │
│  → SwipesBlue.com           │                                                           │
│  → HostsBlue.com            │                                                           │
│  → BusinessBlueprint.io     │                                                           │
│                             │                                                           │
│  ─────────────────          │                                                           │
│  SwipesBlue Admin           │                                                           │
│  Version 1.0.0              │                                                           │
│                             │                                                           │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

### Navigation Rules

1. **Header logo is ALWAYS clickable** — returns to homepage (/)
2. **"← Back to Site" link** in admin sidebar — returns to homepage
3. **Platform switcher** in sidebar — links to HostsBlue and BusinessBlueprint
4. **Dashboard keeps main nav** — Products, Pricing, Resources always visible
5. **Upgrade prompts** — Show current plan and upgrade CTA in sidebar

---

## PART 7: Homepage Updates

### Hero Section

Keep existing structure with these elements:
- Headline: "Built for businesses to grow"
- Subheadline: "Less fees. More revenue."
- Description: "Simple payment processing for small businesses and developers. Accept cards, manage transactions, and scale without complexity."
- Primary CTA: "Start Free →" (Blue Deep #1844A6)
- Secondary CTA: "View Documentation" (Teal #064A6C outline)
- Hero image: marching_colors.png with caption "Stand out from the crowd"

### Demo Section

Remove the individual demo cards with stock quantities. Replace with a cleaner presentation:

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                         │
│                           See SwipesBlue in Action                                      │
│                                                                                         │
│   ┌─────────────────────────────────────────────────────────────────────────────────┐   │
│   │                                                                                 │   │
│   │   [Interactive Demo Preview - Screenshot or Live Embed]                         │   │
│   │                                                                                 │   │
│   │   Showing: Product Catalog → Cart → Checkout → Order Confirmation               │   │
│   │                                                                                 │   │
│   └─────────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                         │
│   [Try the Full Demo →]                                                                 │
│                                                                                         │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

### Feature Comparison Section (NEW)

Show why SwipesBlue vs competitors:

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                         │
│                        Why Choose SwipesBlue?                                           │
│                                                                                         │
│   ┌───────────────────┐  ┌───────────────────┐  ┌───────────────────┐                  │
│   │                   │  │                   │  │                   │                  │
│   │   FREE to Start   │  │   All-in-One      │  │   Developer       │                  │
│   │                   │  │                   │  │   Friendly        │                  │
│   │   Full e-commerce │  │   Cart, checkout, │  │   Full API,       │                  │
│   │   suite at $0     │  │   orders, and     │  │   webhooks, and   │                  │
│   │                   │  │   payments in     │  │   documentation   │                  │
│   │                   │  │   one platform    │  │                   │                  │
│   └───────────────────┘  └───────────────────┘  └───────────────────┘                  │
│                                                                                         │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## PART 8: Button Standards

### Primary Button (Blue Deep)

```css
.btn-primary {
  background: #1844A6;
  color: white;
  border-radius: 7px;
  padding: 12px 24px;
  text-align: center;
  transition: all 0.15s ease;
}
.btn-primary:hover,
.btn-primary:active {
  background: #133A8A;
}
.btn-primary .arrow {
  opacity: 0;
  transform: translateX(-8px);
  transition: all 0.15s ease;
}
.btn-primary:hover .arrow,
.btn-primary:active .arrow {
  opacity: 1;
  transform: translateX(0);
}
```

### Secondary Button (Teal)

```css
.btn-secondary {
  background: transparent;
  border: 2px solid #064A6C;
  color: #064A6C;
  border-radius: 7px;
  padding: 12px 24px;
  text-align: center;
  transition: all 0.15s ease;
}
.btn-secondary:hover,
.btn-secondary:active {
  background: #064A6C;
  color: white;
}
.btn-secondary .arrow {
  opacity: 0;
  transform: translateX(-8px);
  transition: all 0.15s ease;
}
.btn-secondary:hover .arrow,
.btn-secondary:active .arrow {
  opacity: 1;
  transform: translateX(0);
}
```

### Button Rules

- ALL buttons: text CENTERED, border-radius: 7px
- Hover/Active: arrow (→) appears, animates in from left
- Apply to ALL buttons site-wide

---

## PART 9: Status Badges

| Status | Background | Text |
|--------|------------|------|
| Success | #10B981 (Trusted Green) | White |
| Pending | #FFD700 (Gold) | Black |
| Failed | #DC2626 (Muted Red) | White |
| Info | #1844A6 (Blue Deep) | White |
| FREE | #10B981 (Trusted Green) | White |
| NEW | #FFD700 (Gold) | Black |
| PRO | #1844A6 (Blue Deep) | White |
| POPULAR | #FFD700 (Gold) | Black |

---

## PART 10: Footer Structure

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                         │
│   [Logo]                                                                                │
│   Built for businesses to grow                                                          │
│                                                                                         │
│   PRODUCTS              DEVELOPERS           RESOURCES           COMPANY                │
│                                                                                         │
│   E-Commerce Suite      API Documentation    Help Center         About                  │
│   Shopping Cart         API Reference        Getting Started     Blog                   │
│   Checkout              Webhooks             Guides              Careers                │
│   Order Management      API Keys             System Status       Contact                │
│   Brand Studio          SDKs                                                            │
│   Pricing                                                                               │
│                                                                                         │
│   ─────────────────────────────────────────────────────────────────────────────────     │
│                                                                                         │
│   PLATFORMS                                                                             │
│   SwipesBlue.com  •  HostsBlue.com  •  BusinessBlueprint.io                            │
│                                                                                         │
│   ─────────────────────────────────────────────────────────────────────────────────     │
│                                                                                         │
│   © 2026 SwipesBlue. All rights reserved.           Terms  •  Privacy  •  Cookies      │
│                                                                                         │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

**Footer styling:**
- Background: White or very light gray (#F9FAFB)
- Text: Pro Gray (#4B5563)
- Links: Pro Gray, hover to Blue Deep (#1844A6)
- Platform links: Connect to HostsBlue and BusinessBlueprint

---

## PART 11: Pages to Create/Update

### New Pages Needed

| Page | Route | Purpose |
|------|-------|---------|
| Developers Landing | /developers | Landing page for API/developer tools |
| Feature: Abandoned Cart | /features/abandoned-cart | Feature page explaining abandoned cart recovery |
| Documentation Home | /docs | Docs landing page |
| Getting Started Guide | /docs/getting-started | Quick start guide |
| API Reference | /docs/api | API documentation |
| Integration Guides | /docs/guides | Step-by-step tutorials |
| Help Center | /support | FAQs and support |
| Contact/Sales | /contact | Contact form |
| System Status | /status | Uptime status page |

### Pages to Update

| Page | Updates Needed |
|------|----------------|
| Homepage | Update hero, remove stock qty cards, add feature comparison |
| Pricing | Complete rewrite with tiered structure |
| Dashboard | Add sidebar navigation, platform links, upgrade prompts |
| Admin | Add back-to-site link, platform links |
| Products demo | Add "DEMO" badge, link to signup |
| Cart demo | Add "DEMO" badge, link to signup |
| Checkout demo | Add "DEMO" badge, link to signup |
| Orders demo | Add "DEMO" badge, link to signup |

---

## PART 12: Execution Plan

| Step | Task | Deliverable |
|------|------|-------------|
| 1 | Update replit.md with terminology, colors, standards | Confirmation |
| 2 | Replace header with `swipesblue_Company_Name_with_Logo.png` | Screenshot |
| 3 | Implement new color palette site-wide | Screenshot of dashboard with new colors |
| 4 | Build Products mega menu with two-column layout | Screenshot of open menu |
| 5 | Build Resources mega menu | Screenshot of open menu |
| 6 | Update Pricing page with tiered structure | Screenshot |
| 7 | Fix Dashboard navigation (add sidebar, platform links) | Screenshot |
| 8 | Fix Admin navigation (add back-to-site, platform links) | Screenshot |
| 9 | Update Homepage (hero caption, remove stock cards) | Screenshot |
| 10 | Update all buttons to new standards | Confirmation |
| 11 | Update all status badges to new colors | Screenshot showing success/pending/failed |
| 12 | Build Footer with platform links | Screenshot |
| 13 | Create /developers landing page | Screenshot |
| 14 | Page audit — confirm all routes work | Route list confirmation |

---

## CRITICAL REMINDERS

1. **Do NOT start coding until you present your plan and receive approval**
2. **Complete ONE step at a time, show screenshot, wait for approval**
3. **Logo colors (Charcoal Gray + Blue Pure) are ONLY for the logo — never for UI elements**
4. **Blue Deep and Teal are your working colors for all UI**
5. **Users must NEVER be trapped — always provide navigation back to main site**
6. **All assets have transparent backgrounds — no background removal needed**
7. **Transaction fees (2.9% + 30¢) apply to ALL tiers including FREE**

---

**Present your plan now. Wait for approval before executing.**
