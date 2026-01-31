# SwipesBlue.com Stripe-Style Redesign — Replit Agent Prompt

## Project Overview

Transform SwipesBlue.com from its current busy, product-catalog style into a clean, professional, Stripe-inspired payment gateway website. The site should feel premium, trustworthy, and approachable for Gen X small business owners and novice developers.

**Primary Tagline:** "Built for businesses to grow"
**Supporting Line:** "Less fees. More revenue."

---

## Brand Guidelines

### Color Palette

| Color Name | Hex Code | CSS Variable | Usage |
|------------|----------|--------------|-------|
| Red | #E00420 | --color-red | Primary CTAs, "swipes" in logo, buttons, key accents |
| Blue Pure | #0000FF | --color-blue-pure | "blue" in logo text, links, developer/code elements |
| Blue Deep | #1844A6 | --color-blue-deep | Secondary sections, card backgrounds, supporting UI |
| Teal | #064A6C | --color-teal | Dark sections, footer, alternate backgrounds |
| Purple | #A855F7 | --color-purple | Badges, highlights, tertiary accents |
| Orange/Gold | #F9A800 | --color-orange | Warnings, alerts, special highlights |
| Black | #09080E | --color-black | Dark backgrounds, body text, "/" in app names |
| White | #FFFFFF | --color-white | Light backgrounds, text on dark |
| Gray Light | #F5F5F5 | --color-gray-light | Subtle backgrounds, borders |
| Gray | #6B7280 | --color-gray | Secondary text, muted content |

### Logo Usage

- The SwipesBlue logo consists of:
  - Icon: Red credit card with blue swipe/orbit ring
  - Text: "swipes" in Red (#E00420) + "blue" in Blue Pure (#0000FF)
- Logo files are located in `/attached_assets/` directory
- Use `SwipesBlue_logo_-_icon.png` for full logo with icon
- Use `SwipesBlue_icon.png` for icon only (favicon, small spaces)
- Use `SwipesBlue_logo.png` for text-only wordmark

### Typography

- Use system font stack for performance: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`
- Headlines: Bold, tight letter-spacing (-0.02em)
- Body: Regular weight, comfortable line-height (1.6)
- Code/Developer content: `'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', monospace`

### Design Principles (Stripe-Style)

1. **Whitespace is your friend** — Generous padding and margins
2. **Clear visual hierarchy** — One focal point per section
3. **Subtle animations** — Smooth transitions, no flashy effects
4. **Professional photography/illustrations** — Abstract gradients, not stock photos
5. **Minimal UI chrome** — Borders should be subtle (#E5E7EB), shadows soft
6. **Consistent spacing** — Use 8px grid (8, 16, 24, 32, 48, 64, 96, 128)

---

## Site Structure

### Navigation (Global Header)

```
[Logo]                    Products  Pricing  Docs  Support  |  Sign In  [Get Started]
```

- Sticky header with subtle shadow on scroll
- "Get Started" is primary CTA button (Red #E00420, white text)
- Clean, minimal — no mega menus

### Pages to Create/Update

| Route | Purpose | Priority |
|-------|---------|----------|
| `/` | Homepage | HIGH |
| `/pricing` | Pricing page | HIGH |
| `/docs` | API Documentation | HIGH |
| `/demo` | Interactive demos hub | MEDIUM |
| `/dashboard` | Merchant dashboard (auth required) | MEDIUM |
| `/admin/*` | Admin console (existing, restyle) | MEDIUM |
| `/login` | Authentication | MEDIUM |
| `/signup` | Registration | MEDIUM |

---

## Homepage Structure

### Section 1: Hero

**Layout:** Centered text, gradient background (subtle Blue Deep to Teal)

```
[Logo - large, centered]

# Built for businesses to grow

Less fees. More revenue.

Simple payment processing for small businesses and developers.
Accept cards, manage transactions, and scale without complexity.

[Get Started - Red Button]  [View Documentation - Outline Button]

───────────────────────────────────────────────────
✓ PCI Compliant    ✓ Real-time Processing    ✓ 24/7 Support
```

**Styling:**
- Headline: 48-56px, bold, white or Black depending on background
- Subhead ("Less fees..."): 24px, Purple #A855F7 or lighter weight
- Description: 18px, Gray #6B7280
- Trust badges: Small icons + text, subtle

### Section 2: Social Proof / Stats Bar

**Layout:** Horizontal stats ribbon, light gray background

```
$2.4M+              99.99%              500+              <2 sec
Processed           Uptime              Businesses        Avg Response
```

**Styling:**
- Large numbers: 32px, bold, Blue Deep #1844A6
- Labels: 14px, Gray
- Subtle dividers between stats

### Section 3: Features Grid

**Layout:** 2x2 or 3-column grid of feature cards

```
┌─────────────────────────┐  ┌─────────────────────────┐
│ 💳 Payment Processing   │  │ 🔧 Developer API        │
│                         │  │                         │
│ Accept all major cards  │  │ RESTful API with clear  │
│ online and in-person.   │  │ docs. Integrate in      │
│ Competitive rates with  │  │ minutes, not days.      │
│ no hidden fees.         │  │                         │
│                         │  │                         │
│ [Learn more →]          │  │ [View docs →]           │
└─────────────────────────┘  └─────────────────────────┘

┌─────────────────────────┐  ┌─────────────────────────┐
│ 📊 Merchant Dashboard   │  │ 🛒 E-commerce Tools     │
│                         │  │                         │
│ Real-time transaction   │  │ Cart, checkout, and     │
│ monitoring. See every   │  │ subscription management │
│ payment as it happens.  │  │ for your online store.  │
│                         │  │                         │
│ [See dashboard →]       │  │ [Explore tools →]       │
└─────────────────────────┘  └─────────────────────────┘
```

**Styling:**
- Cards: White background, subtle border (#E5E7EB), rounded corners (12px)
- Icons: 32px, colored (use palette colors)
- Card hover: Subtle shadow lift
- "Learn more" links: Blue Pure #0000FF with arrow

### Section 4: Pricing Preview

**Layout:** Two-track pricing, centered

```
                    Simple, transparent pricing

    ┌─────────────────────────┐    ┌─────────────────────────┐
    │     TRANSACTION         │    │     E-COMMERCE          │
    │                         │    │                         │
    │     2.9% + 30¢          │    │     Starting at         │
    │     per transaction     │    │     $99/month           │
    │                         │    │                         │
    │  • No monthly fees      │    │  • Shopping cart        │
    │  • No setup fees        │    │  • Checkout system      │
    │  • No hidden costs      │    │  • Subscription billing │
    │                         │    │                         │
    │  [Start processing →]   │    │  [View plans →]         │
    └─────────────────────────┘    └─────────────────────────┘

                    [See full pricing details →]
```

**Styling:**
- Section background: Light gray #F5F5F5
- Cards: White, equal height
- Price: 36px, bold, Red #E00420
- Feature list: Checkmarks in Blue Pure

### Section 5: Developer Preview

**Layout:** Split — code snippet left, description right

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Start accepting payments                                   │
│  in minutes                                                 │
│                                                             │
│  Our RESTful API is designed for                            │
│  developers who want to integrate                           │
│  fast without the complexity.                               │
│                                                             │
│  [Read the docs →]  [Get API keys →]                        │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ curl https://api.swipesblue.com/v1/payments \       │    │
│  │   -H "Authorization: Bearer sk_live_..." \          │    │
│  │   -d amount=2000 \                                  │    │
│  │   -d currency=usd \                                 │    │
│  │   -d description="Payment for order #1234"          │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Styling:**
- Code block: Dark background (#09080E), syntax highlighting
- Monospace font for code
- Subtle glow/border on code block

### Section 6: Demo Section

**Layout:** Centered heading with card links

```
                    See it in action

    Experience SwipesBlue-powered commerce with our live demos.

    ┌──────────┐  ┌──────────┐  ┌──────────┐
    │ 🛒 Cart  │  │ 💳 Checkout│  │ 📦 Orders │
    │          │  │          │  │          │
    │ [Try →]  │  │ [Try →]  │  │ [Try →]  │
    └──────────┘  └──────────┘  └──────────┘
```

**Styling:**
- Compact cards, icon-forward
- Links to existing demo pages (repositioned)

### Section 7: CTA Section

**Layout:** Full-width, gradient background (Blue Deep to Teal)

```
                    Ready to get started?

        Create your account in minutes and start accepting payments today.

                         [Get Started Free]
```

**Styling:**
- White text on gradient
- Large CTA button (Red #E00420)

### Section 8: Footer

**Layout:** Multi-column links + copyright

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  [Logo]              Products    Resources    Company       │
│                      Payments    Docs         About         │
│  Built for           E-commerce  API Ref      Contact       │
│  businesses          Dashboard   Support      Careers       │
│  to grow.            Pricing     Status                     │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│  © 2026 SwipesBlue. All rights reserved.   Terms  Privacy   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Styling:**
- Background: Teal #064A6C or Black #09080E
- Text: White/light gray
- Links: Subtle hover state

---

## Component Specifications

### Buttons

**Primary Button (CTA)**
```css
.btn-primary {
  background-color: #E00420;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s ease;
}
.btn-primary:hover {
  background-color: #C00320;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(224, 4, 32, 0.3);
}
```

**Secondary Button (Outline)**
```css
.btn-secondary {
  background-color: transparent;
  color: #1844A6;
  border: 2px solid #1844A6;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s ease;
}
.btn-secondary:hover {
  background-color: #1844A6;
  color: white;
}
```

### Cards

```css
.card {
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  padding: 24px;
  transition: all 0.2s ease;
}
.card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}
```

### Form Inputs

```css
.input {
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 16px;
  transition: border-color 0.2s ease;
}
.input:focus {
  outline: none;
  border-color: #0000FF;
  box-shadow: 0 0 0 3px rgba(0, 0, 255, 0.1);
}
```

---

## Files to Modify

### Priority 1: Core Pages

1. **`client/src/pages/Home.tsx`**
   - Complete rewrite following homepage structure above
   - Remove demo transaction form from hero
   - Remove product pricing cards (move to /pricing)
   - Implement Stripe-style sections

2. **`client/src/components/Header.tsx`**
   - Simplify navigation
   - Add sticky behavior with shadow on scroll
   - Update logo to new assets
   - Clean up links

3. **`client/src/components/Logo.tsx`**
   - Update to use new logo assets from `/attached_assets/`
   - Support different variants (full, icon, wordmark)

4. **`client/src/index.css`**
   - Add CSS custom properties for color palette
   - Reset default styles for Stripe-like base
   - Add utility classes

### Priority 2: New/Updated Pages

5. **`client/src/pages/Pricing.tsx`** (NEW)
   - Full pricing page with both tracks
   - Transaction fees details
   - Subscription tier comparison table
   - FAQ section

6. **`client/src/pages/Demo.tsx`** (NEW)
   - Hub page linking to existing demos
   - Reframe as "See what you can build"
   - Cards for each demo type

7. **Update existing demo pages:**
   - `Products.tsx` → Restyle, add context as demo
   - `ShoppingCart.tsx` → Restyle, add context as demo
   - `Checkout.tsx` → Restyle, add context as demo
   - `Orders.tsx` → Restyle, add context as demo

### Priority 3: Dashboard & Admin

8. **`client/src/pages/Dashboard.tsx`**
   - Apply Stripe-style design system
   - Clean up metric cards
   - Improve data visualization styling

9. **`client/src/components/AdminLayout.tsx`**
   - Update sidebar styling
   - Apply consistent color palette

10. **Admin pages (`client/src/pages/admin/*.tsx`):**
    - `AdminDashboard.tsx` — Restyle charts and stats
    - `Merchants.tsx` — Clean up table styling
    - `AdminTransactions.tsx` — Consistent with new design
    - `ApiKeys.tsx` — Developer-friendly styling
    - `Webhooks.tsx` — Clean table and form styling

### Priority 4: Supporting Components

11. **`client/src/components/ui/*.tsx`**
    - Review and update shadcn components to match palette
    - Ensure consistent border radius, shadows, colors

12. **Footer component** (NEW)
    - Create `client/src/components/Footer.tsx`
    - Include in App.tsx layout

---

## App.tsx Router Updates

Update the router to include new pages:

```tsx
import Pricing from "@/pages/Pricing";
import Demo from "@/pages/Demo";

// Add routes:
<Route path="/pricing" component={Pricing} />
<Route path="/demo" component={Demo} />
```

---

## Tailwind Config Updates

If using Tailwind, extend the config:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        'swipes-red': '#E00420',
        'swipes-blue-pure': '#0000FF',
        'swipes-blue-deep': '#1844A6',
        'swipes-teal': '#064A6C',
        'swipes-purple': '#A855F7',
        'swipes-orange': '#F9A800',
        'swipes-black': '#09080E',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', 'monospace'],
      },
      borderRadius: {
        'card': '12px',
      },
      boxShadow: {
        'card': '0 4px 12px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.08)',
      },
    },
  },
}
```

---

## Important Notes

1. **Preserve all backend functionality** — This is a frontend redesign only. Do not modify any files in `/server/`.

2. **Keep existing API routes working** — The demo pages should continue to function with the existing cart, checkout, and order APIs.

3. **Mobile responsive** — All pages must work on mobile. Use Tailwind's responsive prefixes or media queries.

4. **Accessibility** — Maintain proper heading hierarchy, alt text, ARIA labels, and keyboard navigation.

5. **Performance** — Lazy load images, minimize bundle size, use system fonts.

6. **Test thoroughly** — After changes, verify:
   - Homepage loads correctly
   - Navigation works
   - Demo pages function
   - Admin dashboard accessible
   - Forms submit properly

---

## Reference Sites

Study these for design patterns:
- https://stripe.com (primary reference)
- https://stripe.com/pricing
- https://stripe.com/docs

Match the tone: Professional, clean, confident, developer-friendly but accessible to non-technical users.

---

## Execution Order

1. Update color palette and base styles (index.css, tailwind.config)
2. Update Logo component with new assets
3. Update Header component
4. Create Footer component
5. Rewrite Homepage
6. Create Pricing page
7. Create Demo hub page
8. Restyle demo pages (Products, Cart, Checkout, Orders)
9. Restyle Dashboard
10. Restyle Admin pages
11. Final QA and polish

---

## Success Criteria

When complete, SwipesBlue.com should:
- ✅ Feel like a professional payment gateway (Stripe-level quality)
- ✅ Clearly communicate value proposition in <5 seconds
- ✅ Use the correct, updated brand colors throughout
- ✅ Have clear paths for both business owners and developers
- ✅ Maintain all existing functionality
- ✅ Work flawlessly on mobile devices
- ✅ Load fast and feel smooth

---

*End of prompt. Execute sections in order, committing after each major milestone.*
