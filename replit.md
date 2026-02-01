# SwipesBlue.com - Project Documentation

## Company Branding (CRITICAL - DO NOT CHANGE)

### Brand Asset Files

| Asset | File Name | Usage |
|-------|-----------|-------|
| Company Name | `swipesblue_Company_Name.png` | Text-only logo |
| Logo (Icon) | `swipesblue_logo.png` | Icon only (card with blue swipe ring) |
| Full Lockup | `swipesblue_Company_Name_with_Logo.png` | Icon + text combined — USE FOR HEADER |
| URL Version | `swipesblue_url.png` | With .com in green |
| Color Palette | `Color_palette.webp` | Reference |

**Note:** All assets have transparent backgrounds. No background removal needed.

### Terminology (MASTER DEFINITIONS)
- **Company Name** = the text "swipesblue" (text-only)
- **Logo** = the icon only (card with blue swipe ring)
- **Company Name + Logo** = full lockup (icon + text combined)
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

## Brand Color Palette (FINAL - Remove ALL old colors)

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

## Product Structure

SwipesBlue has TWO distinct product lines:

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
For developers integrating SwipesBlue payments into their own platforms.

| Product | Price | For Who |
|---------|-------|---------|
| **Payment API** | 2.9% + 30¢ per transaction | Developers building custom integrations |
| **API Pro** | $99/mo + 2.5% + 25¢ per transaction | High-volume developers, lower transaction rate |

---

## Button Standards

### Primary Button (Blue Deep)
- Background: #1844A6
- Text: White
- Border-radius: 7px
- Hover/Active: Darker (#133A8A), arrow appears

### Secondary Button (Teal)
- Background: Transparent
- Border: 2px solid #064A6C
- Text: #064A6C
- Border-radius: 7px
- Hover/Active: Background fills to #064A6C, text becomes white, arrow appears

### Button Rules
- ALL buttons: text CENTERED, border-radius: 7px
- Hover/Active: arrow (→) appears, animates in from left
- Apply to ALL buttons site-wide

---

## Status Badge Colors

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

## Navigation Rules

1. **Header logo is ALWAYS clickable** — returns to homepage (/)
2. **"← Back to Site" link** in admin sidebar — returns to homepage
3. **Platform switcher** in sidebar — links to HostsBlue and BusinessBlueprint
4. **Dashboard keeps main nav** — Products, Pricing, Resources always visible
5. **Users must NEVER be trapped** — always provide navigation back to main site

---

## Project Architecture
- Full-stack JavaScript application
- Frontend: React with Vite, Wouter for routing
- Backend: Express
- Database: PostgreSQL with Drizzle ORM
- UI: Shadcn + Tailwind CSS
- Typography: Archivo font family for branding, Inter for UI

## Recent Changes
- 2026-02-01: Complete redesign with new color palette and product structure
- 2025-12-30: Added comprehensive data-testid attributes across all admin UI pages
- 2025-10-24: Initial branding setup

## Cross-Platform Integration
**Platforms in the Triad Blue Ecosystem:**
- SwipesBlue.com (Payment Gateway)
- HostsBlue.com (Web Hosting)
- BusinessBlueprint.io (Business Tools)

See `TRIAD_BLUE_STANDARDS.md` for comprehensive development standards.
