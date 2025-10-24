# Swipes Blue Payment Gateway - Design Guidelines

## Core Design Principles
**Stripe-inspired financial interface** with Swipes Blue's fluorescent palette. Prioritizes trust, efficiency, and accessibility with strategic color use on clean white backgrounds.

---

## Color System

**Brand Palette:**
- **Fluorescent Blue** `#0000FF` - Primary actions, headers, buttons
- **Fluorescent Red** `#FF0040` - Alerts, destructive actions
- **Fluorescent Green** `#00FF40` - Success states, navigation slashes (/)
- **White** `#FFFFFF` - Backgrounds, cards
- **Black** `#09080e` - Body text, navigation labels

**Utility Colors:**
- Backgrounds: `#F7F7F7` (subtle), `#E5E5E5` (borders)
- Secondary text: `#666666`, Placeholder: `#999999`

**Application Rules:**
- Navigation format: Fluorescent Green "/" + Black page name
- Status badges: Green (success), Blue (pending), Red (failed)
- Trust indicators: Use with lock icons

---

## Typography

**Fonts:**
- **Display**: Archivo Semi Expanded Bold (brand "Swipes") + Archivo Bold (suffix ".com")
- **Interface**: Inter/SF Pro (Google Fonts CDN)

**Scale:**
- Logo: 24pt | H1: 48px | H2: 36px | H3: 24px
- Body: 16px (regular) | Small: 14px | Caption: 12px
- Button: 16px (medium weight)

**Hierarchy:**
- Financial values: Bold
- Form labels: Medium, 14px
- Helper text: Regular, 12px, `#666666`

---

## Layout & Spacing

**Spacing (Tailwind):**
- Micro: 1-2 (4-8px) | Standard: 4-8 (16-32px)
- Section: 12-20 (48-80px) | Page margins: 24-32 (96-128px)

**Grid:**
- Container: `max-w-7xl` (1280px)
- Forms/Cards: `max-w-2xl` (672px)
- Dashboard: 12-column responsive grid

**Breakpoints:**
- Mobile: <768px (stacked) | Tablet: 768-1024px | Desktop: >1024px

---

## Component Specifications

### Navigation
**Global Header:**
- White bg, `#E5E5E5` bottom border, 72px desktop/64px mobile
- Logo: 24pt Archivo fonts (left)
- Nav items: Fluorescent Green "/" + Black `#09080e` text (right)
- Sticky on scroll

**Sidebar (Dashboard):**
- Active: 4px Fluorescent Blue left border + light tint
- Collapsible mobile

### Cards
- White bg, 8px radius, `p-6` padding
- Border: 1px `#E5E5E5`
- Shadow: `0 1px 3px rgba(0,0,0,0.1)`
- Hover: Increased shadow lift

### Forms & Inputs
**Text Inputs:**
- 48px height, 6px radius, 1px `#E5E5E5` border
- Focus: 2px Fluorescent Blue border
- Error: 2px Fluorescent Red border + message
- Success: Fluorescent Green checkmark

**Buttons:**
- Height: 48px, Radius: 6px, Padding: `px-8 py-3`
- **Primary**: Blue bg, white text
- **Secondary**: White bg, Blue border/text
- **Destructive**: Red bg, white text
- Hover: 10% opacity reduction | Disabled: 50% opacity

### Shopping Cart
**Item Row:**
- 80px square product image (left)
- Quantity controls: Fluorescent Blue +/- buttons
- Remove: Fluorescent Red X icon
- Line total: Bold, right-aligned

**Summary Panel:**
- Sticky, white card with border
- Total in Bold Fluorescent Blue
- CTA: "Proceed to Checkout" (Blue primary button)

### Checkout
**Layout:**
- 3-step progress: Info → Payment → Confirmation (Blue active, Green complete)
- Left (60%): Forms | Right (40%): Sticky order summary
- NMI tokenized payment frame with lock icon
- Security badges: PCI, SSL

**Order Summary:**
- Collapsed item list (expand/collapse)
- 60x60px thumbnails
- Pricing breakdown
- Coupon field
- Prominent total display

### Transactions
**Table:**
- Columns: Date, ID, Customer, Amount, Status, Actions
- Sortable, searchable, filterable
- Status badges (colored)
- Pagination

**Detail Panel:**
- Slide-in from right
- Complete transaction info
- Masked payment method
- Event timeline
- Refund/void actions

### Brand Studio
**Asset Grid:**
- Categories: Wordmarks, Brandmarks, Avatars, Icons, Favicons
- Upload dropzone with preview
- Active: Fluorescent Blue border
- Edit/Replace/Delete controls per asset

### Feedback
**Toasts:**
- Top-right, 5s auto-dismiss
- White card with colored left border (Green/Red/Blue)

**Loading:**
- Fluorescent Blue spinner
- Gray pulsing skeletons

**Empty States:**
- Centered gray icon + message
- Secondary CTA button

---

## Page Layouts

### Dashboard
4 metric cards → Full-width chart → Recent transactions → Quick actions sidebar

### /shoppingcart
Header (green slash + black text) → Items list (2/3) + Summary sidebar (1/3) → Security badges

### /checkout
Header → Progress → Forms (60%) + Sticky summary (40%) → Trust badges throughout

### Brand Studio
Category sidebar → Asset grid → Upload FAB (Blue) → Edit modal with preview

---

## Visual Assets

**Required Images Only:**
- Security badges (PCI, SSL) - footer/checkout
- Product thumbnails: 80x80px (cart), 60x60px (checkout)
- Empty state line-art icons (gray)
- User-uploaded brand assets (Brand Studio)

**Icons:**
- Heroicons CDN: 20px inline, 24px standalone
- Fluorescent Blue (active), `#666666` (inactive)

---

## Interactions

**Animation (200ms max):**
- Button hover: Opacity shift (150ms)
- Card hover: Shadow lift (200ms ease-out)
- Form focus: Border color (150ms)
- Toast slide-in: 300ms ease-out
- Success checkmark: Scale-in (200ms)

**Prohibited:** Page transitions, parallax, scroll animations

---

## Accessibility (WCAG AA)

- **Contrast**: 4.5:1 minimum for text
- **Focus**: 2px Fluorescent Blue outline on all interactive elements
- **Keyboard**: Full navigation support with visible states
- **ARIA**: Proper labels on all inputs/interactions
- **Validation**: Visual + text error messages
- **Color**: Never sole indicator (use icons + text)

---

## Key Don'ts

❌ Large hero images  
❌ Decorative animations  
❌ Color-only status indicators  
❌ Non-Archivo fonts for brand name  
❌ Low-contrast text combinations

## Quick Reference

**Primary CTA Pattern:**
```html
<button class="bg-[#0000FF] text-white h-12 px-8 rounded-md font-medium hover:opacity-90">
  Proceed to Checkout
</button>
```

**Navigation Format:**
```html
<nav>
  <span class="text-[#00FF40]">/</span>
  <span class="text-[#09080e]">shoppingcart</span>
</nav>
```

**Card Component:**
```html
<div class="bg-white rounded-lg p-6 border border-[#E5E5E5] shadow-sm">
  <!-- Content -->
</div>
```