# Triad Blue Ecosystem - Cross-Platform Development Standards

**Purpose:** This document ensures consistency across all three Triad Blue platforms (Business Blueprint, Hosts Blue, Swipes Blue) while respecting their unique business models and branding.

**Last Updated:** October 24, 2025

---

## 🚨 CRITICAL RULES FOR ALL ASSISTANTS

### DO NOT:
- ❌ Assume agent-built features are buggy without thorough investigation
- ❌ Rename routes, move files, or restructure code without explicit user approval
- ❌ Rebuild features that already exist in Business Blueprint - COPY them instead
- ❌ Create database tables for business-specific models without asking user first
- ❌ Change navigation menu order, names, or icons without approval

### ALWAYS:
- ✅ Investigate root causes thoroughly before making changes
- ✅ Ask user before implementing business model changes
- ✅ Copy working patterns from Business Blueprint
- ✅ Preserve existing functionality when adding features
- ✅ Test changes in development before deploying to production

---

## 📱 NAVIGATION STANDARDS (HIGHEST PRIORITY)

**Navigation menus MUST match across all three platforms in:**
- Menu item names and order
- Icon choices (when platform-appropriate)
- Font family: Archivo
- Font sizes and weights
- Spacing and alignment
- Mobile/desktop consistency

### Header Navigation (Desktop)

**Top-level menu structure:**
```
Apps | Solutions | Pricing | [Login/Dashboard]
```

**Typography:**
- Font: Archivo, font-weight: 600
- Size: text-base (16px)
- Icon size: w-4 h-4 (16px)
- Spacing: gap-2 between icon and text

**Apps Mega Menu (Cross-Platform):**
All three platforms appear in every platform's "Apps" menu:

1. **Business Blueprint (businessblueprint.io)**
   - Icon: Blueprint Icon (36x36px)
   - Color: Orange (#FFA500) for hover/active
   - Subtitle: "Digital Intelligence Platform"
   - Features list: AI Assessment, AI Coach, Client Portal

2. **Hosts Blue (hostsblue.com / webhosted.io)**
   - Icon: Hosts Blue Icon (36x36px)  
   - Color: Purple (#A855F7) for hover/active
   - Subtitle: "Website Hosting & Builder"
   - Features list: WordPress Hosting, Plugin Suite, Expert Support

3. **Swipes Blue (swipesblue.com / airswiped.com)**
   - Icon: Swipes Blue Icon (36x36px)
   - Color: Red (#EF4444) for hover/active
   - Subtitle: "Payment Gateway"
   - Features list: Card Processing, Subscription Billing, Fraud Protection

### Client Portal Sidebar Navigation

**Fixed menu order (DO NOT CHANGE):**
```
1. inbox (icon: inbox icon, w-7 h-7)
2. livechat (icon: livechat icon, w-7 h-7)
3. Tasks (icon: CheckSquare, w-7 h-7)
--- DIVIDER ---
4. Local SEO Mgmt (icon: LOCAL SEO icon, w-7 h-7)
5. send (icon: send icon, w-7 h-7)
6. Social Media Mgmt (icon: Social Media icon, w-7 h-7)
7. Reputation Mgmt (icon: Reputation icon, w-7 h-7)
--- DIVIDER ---
8. AI Business Coach (icon: AI Coach icon, w-7 h-7)
9. Settings (icon: settings icon, w-7 h-7)
```

**Sidebar Typography:**
- Font: Archivo
- Navigation items: text-base (16px), font-weight: normal
- Commverse apps (/inbox, /livechat, /send): font-weight: 600
- Icon size: w-7 h-7 (28px) for ALL items
- Active state: Blue gradient background, font-semibold

**Commverse App Formatting:**
```jsx
// Special formatting for /inbox, /livechat, /send
<span className="flex-1 text-base font-['Archivo']" style={{ fontWeight: 600 }}>
  <span style={{ color: '#84D71A' }}>/</span>
  <span style={{ color: '#0057FF' }}>{item.label}</span>
</span>
```

**Logo in Sidebar:**
- Collapsed: Icon only (28px, matching nav icons)
- Expanded: Icon (28px) + Platform name text
- Collapse button: Same row as logo (top-right corner)

---

## 🎨 BRAND & DESIGN SYSTEM

### Core Colors (ALL PLATFORMS)

**Triad Blue Core:**
```css
--triad-blue: #0000FF;        /* Core brand blue */
--triad-green: #84D71A;       /* Fluorescent green (TLD accent) */
```

**Platform-Specific Colors:**
```css
/* Business Blueprint */
--bb-primary: #FFA500;        /* Orange */

/* Hosts Blue */
--hosts-primary: #A855F7;     /* Purple */

/* Swipes Blue */
--swipes-primary: #EF4444;    /* Red */
```

### Typography System

**Font Stack (MUST USE ACROSS ALL PLATFORMS):**
```css
/* Primary font - ALL branding uses this */
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800;900&display=swap');

/* Archivo Semi Expanded - ONLY for first word of brand names */
font-family: 'Archivo Semi Expanded', sans-serif;

/* Archivo Regular - For subsequent words */
font-family: 'Archivo', sans-serif;
```

**Logo Typography Rules (CRITICAL):**
1. **First word** = Archivo Semi Expanded (platform color)
2. **Subsequent words** = Archivo (Triad Blue #0000FF)
3. **TLD (.io, .com)** = Archivo (Fluorescent Green #84D71A)
4. **BOTH fonts SAME SIZE** - No size variation between words
5. **Text shadows on ALL wordmark text** - 5pt blur, 315° angle, 5-10pt distance

**Text Shadow Implementation:**
```css
/* All wordmark text uses this shadow */
text-shadow: 5pt 5pt 5pt rgba(0, 0, 0, 0.3);
/* 315° angle = positive X, positive Y offset */
/* Blur: 5pt, Distance: 5-10pt */
```

**Example - Business Blueprint:**
```jsx
<span style={{ 
  color: '#FFA500', 
  fontFamily: '"Archivo Semi Expanded", sans-serif',
  textShadow: '5pt 5pt 5pt rgba(0, 0, 0, 0.3)'
}}>business</span>
<span style={{ 
  color: '#0000FF', 
  fontFamily: 'Archivo, sans-serif',
  textShadow: '5pt 5pt 5pt rgba(0, 0, 0, 0.3)'
}}>blueprint</span>
<span style={{ 
  color: '#84D71A', 
  fontFamily: 'Archivo, sans-serif',
  textShadow: '5pt 5pt 5pt rgba(0, 0, 0, 0.3)'
}}>.io</span>
```

**Example - Hosts Blue:**
```jsx
<span style={{ 
  color: '#A855F7', 
  fontFamily: '"Archivo Semi Expanded", sans-serif',
  textShadow: '5pt 5pt 5pt rgba(0, 0, 0, 0.3)'
}}>hosts</span>
<span style={{ 
  color: '#0000FF', 
  fontFamily: 'Archivo, sans-serif',
  textShadow: '5pt 5pt 5pt rgba(0, 0, 0, 0.3)'
}}>blue</span>
<span style={{ 
  color: '#84D71A', 
  fontFamily: 'Archivo, sans-serif',
  textShadow: '5pt 5pt 5pt rgba(0, 0, 0, 0.3)'
}}>.com</span>
```

**Example - Swipes Blue:**
```jsx
<span style={{ 
  color: '#EF4444', 
  fontFamily: '"Archivo Semi Expanded", sans-serif',
  textShadow: '5pt 5pt 5pt rgba(0, 0, 0, 0.3)'
}}>swipes</span>
<span style={{ 
  color: '#0000FF', 
  fontFamily: 'Archivo, sans-serif',
  textShadow: '5pt 5pt 5pt rgba(0, 0, 0, 0.3)'
}}>blue</span>
<span style={{ 
  color: '#84D71A', 
  fontFamily: 'Archivo, sans-serif',
  textShadow: '5pt 5pt 5pt rgba(0, 0, 0, 0.3)'
}}>.com</span>
```

### Logo Sizing Standards

**Horizontal Logo (Headers, Sidebars):**
- Icon: 36px × 36px
- Text: 24px font size
- Gap between icon and text: 4px (gap-1)

**Vertical Logo (Dashboard Cards):**
- Icon: 48px × 48px
- Text: 18px font size
- Gap between icon and text: 8px (gap-2)

**Navigation Icons:**
- ALL icons: w-7 h-7 (28px × 28px)
- Consistent across sidebar and mobile menu

---

## 🦶 FOOTER STANDARDS (MUST MATCH)

### Footer Structure

**5-Column Grid Layout:**
```
[Brand + Sister Platforms] | [Services] | [Solutions] | [Company] | [Support]
```

**Background & Typography:**
- Background: `bg-gray-900` (dark gray)
- Text color: `text-white` (headings), `text-gray-400` (links)
- Heading font: text-lg, font-semibold
- Link font: text-sm
- Hover effect: `hover:text-white transition-colors`

### Column 1: Brand Section

**Primary Platform Logo:**
```jsx
<BrandLogo brand="[platform-name]" variant="dark" size="sm" />
```

**Tagline:**
- Font: text-sm, text-gray-400
- Content: "Helping local businesses succeed online. Get found, get customers, get business."

**Sister Platform Icons:**
Display compact logos for the other two platforms:
```jsx
<div className="flex flex-col space-y-2">
  <BrandLogoCompact brand="[platform-2]" variant="dark" />
  <BrandLogoCompact brand="[platform-3]" variant="dark" />
</div>
```

**Example for Business Blueprint footer:**
- Shows: Business Blueprint logo (main)
- Shows: Hosts Blue icon + Swipes Blue icon (compact)

**Example for Hosts Blue footer:**
- Shows: Hosts Blue logo (main)
- Shows: Business Blueprint icon + Swipes Blue icon (compact)

**Example for Swipes Blue footer:**
- Shows: Swipes Blue logo (main)
- Shows: Business Blueprint icon + Hosts Blue icon (compact)

### Column 2: Services

**Heading:** "Services"

**Links (platform-specific):**
Each platform lists its core services. Example structure:
```jsx
<ul className="space-y-2 text-sm text-gray-400">
  <li><a href="/[route]" className="hover:text-white transition-colors">[Service Name]</a></li>
  {/* 6 services total */}
</ul>
```

### Column 3: Solutions

**Heading:** "Solutions"

**Links (platform-specific):**
Lists solution types or packages. Same structure as Services column.

### Column 4: Company

**Heading:** "Company"

**Links (SHARED across all platforms):**
- About Us
- Contact
- Site Map
- Careers
- Press
- Partners

### Column 5: Support

**Heading:** "Support"

**Links (SHARED across all platforms):**
- Help Center
- Documentation
- Contact Support
- Live Chat
- Training Videos
- Community Forum

### Bottom Bar

**Layout:**
```jsx
<div className="border-t border-gray-800 pt-8 mt-8">
  <div className="flex flex-col md:flex-row justify-between items-center">
    <div className="text-sm text-gray-400 mb-4 md:mb-0">
      © {currentYear} [platform-domain]. All rights reserved.
    </div>
    <div className="flex items-center space-x-6 text-sm text-gray-400">
      <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
      <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
      <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
    </div>
  </div>
</div>
```

**Copyright Text:**
- Business Blueprint: "© 2025 businessblueprint.io. All rights reserved."
- Hosts Blue: "© 2025 hostsblue.com. All rights reserved."
- Swipes Blue: "© 2025 swipesblue.com. All rights reserved."

### Footer Component File

**Location:** `client/src/components/footer.tsx`

**Copy from Business Blueprint:**
1. Copy entire `footer.tsx` component
2. Update brand name in BrandLogo component
3. Update sister platform compact logos (show the other two)
4. Update Services & Solutions links (platform-specific)
5. Keep Company & Support links identical
6. Update copyright domain name

---

## 🛠️ TECHNICAL ARCHITECTURE (MUST MATCH)

### Route Hierarchy for Production

**CRITICAL - This order prevents conflicts:**
```javascript
// 1. Database-stored brand assets (favicons, logos, icons)
app.get("/brand-assets/:filename", async (req, res) => { ... });

// 2. Static files from attached_assets directory
app.use('/attached_assets', express.static('attached_assets'));

// 3. Vite build artifacts (JS, CSS bundles) - served from dist/public/assets/
app.use(express.static(distPath, { ... }));

// 4. SPA fallback - serve index.html for all other routes
app.use("*", (_req, res) => {
  res.sendFile(indexPath);
});
```

**Why this order matters:**
- `/brand-assets/` serves favicon/logo from database (won't conflict with Vite)
- `/attached_assets/` serves uploaded media files
- `/assets/` serves Vite JavaScript/CSS bundles (index-*.js, index-*.css)
- DO NOT create routes that start with `/assets/` - they will break production deployments

### Deployment Configuration

**Files Modified in .gitignore:**
```gitignore
node_modules
.DS_Store
server/public
vite.config.ts.*
*.tar.gz

# DO NOT include "dist" in .gitignore
# Build artifacts must be deployed to production
```

**.replit Configuration:**
```toml
[deployment]
deploymentTarget = "autoscale"
build = ["sh", "-c", "npm run build"]
run = ["sh", "-c", "NODE_ENV=production node dist/index.js"]
```

### Authentication System (COPY FROM BUSINESS BLUEPRINT)

**RS256 JWT Enterprise Authentication:**
- File: `server/routes.ts` (authentication routes section)
- Dual-token impersonation system
- Session management with connect-pg-simple
- Protected routes middleware

**DO NOT rebuild this - copy from Business Blueprint:**
```bash
# Reference files in Business Blueprint:
- server/routes.ts (lines ~100-300 for auth)
- Impersonation system (lines ~2700-2900)
```

### WebSocket Setup (COPY FROM BUSINESS BLUEPRINT)

**Socket.IO Configuration:**
- File: `server/websocket.ts`
- Real-time messaging for inbox, livechat
- Event handling patterns
- CORS configuration

**DO NOT rebuild this - copy from Business Blueprint**

---

## 📦 FEATURES TO COPY (NOT REBUILD)

### 1. Brand Studio (Admin-Only Asset Management)

**Source:** Business Blueprint `client/src/pages/brand-studio.tsx`

**What it does:**
- Stores brand assets (favicons, logos, icons) as base64 in PostgreSQL
- Converts to blob URLs for display (with memory leak prevention)
- Admin-only access (not in main navigation)
- Access via `/brand-studio` URL

**Database table:**
```sql
CREATE TABLE brand_assets (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL, -- 'logo' | 'icon' | 'additional'
  file_name TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  data BYTEA NOT NULL, -- base64 stored as bytea
  size INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**How to implement:**
1. Copy `client/src/pages/brand-studio.tsx` to new platform
2. Copy Brand Studio routes from `server/routes.ts` (lines ~2595-2700)
3. Add `brandAssets` table to `shared/schema.ts`
4. Update platform colors in UI (change orange to purple/red)
5. DO NOT modify functionality - only customize colors

### 2. Impersonation System

**Source:** Business Blueprint `server/routes.ts` (lines ~2700-2900)

**What it does:**
- Admin can impersonate clients for support
- Dual-token JWT system (admin + impersonation tokens)
- Audit logging
- Secure session management

**How to implement:**
1. Copy impersonation routes from Business Blueprint
2. Add `impersonationSessions` and `impersonationAuditLog` tables
3. Add admin UI routes
4. DO NOT modify security logic - only customize styling

### 3. Client Portal Dashboard Structure

**Source:** Business Blueprint `client/src/pages/dashboard.tsx`

**Navigation structure (matches sidebar exactly):**
- Same menu order as documented above
- Same icons (w-7 h-7)
- Same Archivo typography
- Platform-specific color accents

**How to implement:**
1. Copy sidebar structure from `client/src/components/side-nav.tsx`
2. Update platform colors (orange → purple/red)
3. Keep menu order IDENTICAL
4. Maintain icon consistency

---

## ⚠️ ASK USER FIRST (Business-Specific Items)

### Database Tables

**DO NOT create these tables without approval:**
- Payment/subscription tables (different business models)
- Product/service tables (platform-specific offerings)
- Whitelabel integration data (OpenSRS, WPMUDev, NMI specifics)
- Pricing tier structures (each platform has unique pricing)

**Safe to copy from Business Blueprint:**
- `clients` table (user accounts)
- `brand_assets` table (asset management)
- `impersonation_sessions` and `impersonation_audit_log` (admin tools)
- WebSocket/messaging tables (if using Commverse)

### Whitelabel Integrations

**Each platform has different integrations:**

**Business Blueprint:**
- Synup (listings & reputation management)
- OpenAI (AI assessment, coach, review responses)
- Telnyx (SMS)

**Hosts Blue:**
- WPMUDev (WordPress hosting white-label)
- OpenSRS (domain registration & email automation)

**Swipes Blue:**
- NMI (payment gateway)
- Plaid (bank verification - maybe?)

**ASK USER before:**
- Implementing any new whitelabel integration
- Creating integration-specific database tables
- Setting up API keys/webhooks for integrations

### Payment Flows

**Each platform has unique payment models:**

**Business Blueprint:**
- Subscription tiers (DIY/MSP pathways)
- À la carte marketplace
- Assessment-driven recommendations

**Hosts Blue:**
- Domain registration one-time fees
- Hosting subscription plans
- Service bundles

**Swipes Blue:**
- Merchant onboarding
- Payment processing (processes payments FOR other platforms)
- Transaction fees

**ASK USER before:**
- Creating checkout flows
- Implementing subscription billing
- Setting up payment tables

---

## 🎯 PLATFORM-SPECIFIC CUSTOMIZATIONS

### Colors to Replace

When copying features from Business Blueprint to other platforms:

**Business Blueprint → Hosts Blue:**
- Replace: `#FFA500` (orange) → `#A855F7` (purple)
- Replace: `orange-500` → `purple-500`
- Replace: `from-orange-50 to-orange-100` → `from-purple-50 to-purple-100`

**Business Blueprint → Swipes Blue:**
- Replace: `#FFA500` (orange) → `#EF4444` (red)
- Replace: `orange-500` → `red-500`
- Replace: `from-orange-50 to-orange-100` → `from-red-50 to-red-100`

**Keep unchanged:**
- Triad Blue: `#0000FF`
- Fluorescent Green: `#84D71A`
- All gray/neutral colors
- Dark mode colors

### Domain References

**Update domain references when copying code:**

**Business Blueprint:**
- businessblueprint.io
- /business-blueprint/ paths

**Hosts Blue:**
- hostsblue.com (primary)
- webhosted.io (alternative)
- /hosts-blue/ paths

**Swipes Blue:**
- swipesblue.com (primary)
- airswiped.com (alternative)
- /swipes-blue/ paths

---

## 📋 QUICK REFERENCE CHECKLIST

### Starting a New Feature in Hosts Blue or Swipes Blue

**Before writing code:**
- [ ] Check if this feature exists in Business Blueprint
- [ ] If yes, COPY it (don't rebuild)
- [ ] Update platform colors (orange → purple/red)
- [ ] Update domain references
- [ ] Keep navigation matching exactly

**If creating new database tables:**
- [ ] Is this table business-specific? → ASK USER FIRST
- [ ] Is this table for shared functionality? → Safe to copy from BB

**If implementing integrations:**
- [ ] Is this a whitelabel partner integration? → ASK USER FIRST
- [ ] Provide integration details and get approval before proceeding

**Before deployment:**
- [ ] Verify `/brand-assets/` route doesn't conflict with Vite bundles
- [ ] Ensure `dist` folder is NOT in `.gitignore`
- [ ] Test in development first (NODE_ENV=development)
- [ ] Build and test production locally (NODE_ENV=production node dist/index.js)
- [ ] Deploy to production

---

## 🚀 PRODUCTION DEPLOYMENT LESSONS

### Critical Production Issue (October 24, 2025)

**Problem:** Blank white screen in production despite working development environment

**Root Cause:** A route `/assets/:filename` was created to serve brand assets from database. This route intercepted Vite's JavaScript/CSS bundle requests (`/assets/index-*.js`, `/assets/index-*.css`) in production, returning 404 errors.

**Why it worked in dev:** Vite middleware served bundles before the custom route ran.

**Solution:** Renamed route from `/assets/:filename` to `/brand-assets/:filename`

**Lesson:** NEVER create routes that start with `/assets/` - they will break Vite bundle loading in production.

**Files to update when implementing Brand Studio:**
```javascript
// server/routes.ts
app.get("/brand-assets/:filename", async (req, res) => { ... });

// client/index.html
<link rel="icon" type="image/x-icon" href="/brand-assets/Blueprint_Favicon.ico" />
```

---

## 📞 WHEN IN DOUBT

**If you're unsure whether something should match across platforms or be platform-specific:**

1. **Navigation, typography, core design** → MUST MATCH (ask if unclear)
2. **Database tables for business models** → ASK USER FIRST
3. **Whitelabel integrations** → ASK USER FIRST
4. **Payment flows** → ASK USER FIRST
5. **Features like Brand Studio, Impersonation** → COPY from Business Blueprint

**Remember:** The user needs to rely on consistency. DO NOT make assumptions about what should change without discussing first.
