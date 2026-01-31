# swipesblue.com - Project Documentation

## Company Branding (CRITICAL - DO NOT CHANGE)

### Naming Convention (IMPORTANT)
- **Website URL:** swipesblue.com (all lowercase, with .com in green)
- **Company Name:** SwipesBlue (PascalCase, no space)
- **Logo/Branding:** icon + swipesblue (lowercase text with the icon)

### Company Name: SwipesBlue

# SwipesBlue - Triad Blue Ecosystem
## Overview
Payment Gateway
**📘 CROSS-PLATFORM STANDARDS:** See `TRIAD_BLUE_STANDARDS.md` for comprehensive development standards that MUST be followed across all three platforms (navigation, typography, colors, technical architecture, features to copy vs rebuild).

**Logo Components:**
- **Icon:** Card with blue swoosh (from attached_assets/SwipesBlue_logo_-_icon_*.png)
- **"swipes"** - Red (#E00420), Archivo Semi Expanded Bold, lowercase
- **"blue"** - Blue (#0000FF), Archivo Bold, lowercase
- **".com"** (for URL only) - Green (#00FF40), Archivo Bold, lowercase

### Color Hierarchy
**PRIMARY ACCENT COLOR: RED (#E00420)**
- Red is used for headers, titles, and 1st highlighting
- Red is the primary brand color
- Blue is secondary
- Green is for success states and URL .com

### Brand Colors
- **Flourescent Blue** #0000FF- PRIMARY: Headers, titles, primary actions, main highlights
- **Fluorescent Red** `#FF0040` - SECONDARY: Secondary actions, accents
- **Fluorescent Green** `#00FF40` - SUCCESS: Success states, follows the hex black 09080e with names of apps (/), i.e. /checkout
- **White** `#FFFFFF` - Backgrounds, cards
- **Black** `#09080e` - Body text, navigation labels, navigation slashes (/) of proprietary apps

## Project Overview
Payment gateway application for swipesblue.com with Stripe-inspired financial interface using the fluorescent color palette.

## Recent Changes
- 2025-12-30: Added comprehensive data-testid attributes across all admin UI pages for automated testing
- 2025-10-24: Corrected company branding - SwipesBlue.com with proper color scheme (RED as primary)

## User Preferences
- Follow design_guidelines.md for all design decisions
- Use Shadcn components with Tailwind CSS
- Red is the primary accent color throughout the application
- Company name: SwipesBlue (PascalCase when written as text)
- Logo: icon + swipesblue (lowercase with icon)
- Website URL: swipesblue.com ("swipes" red, "blue" blue, ".com" green - all lowercase)

## Project Architecture
- Full-stack JavaScript application
- Frontend: React with Vite, Wouter for routing
- Backend: Express
- Database: PostgreSQL with Drizzle ORM
- UI: Shadcn + Tailwind CSS
- Typography: Archivo font family for branding, Inter for UI
