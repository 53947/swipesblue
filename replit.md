# swipesblue.com - Project Documentation

## Company Branding (CRITICAL - DO NOT CHANGE)

### Company Name: Swipes Blue

# Swipes Blue - Triad Blue Ecosystem
## Overview
Payment Gateway
**📘 CROSS-PLATFORM STANDARDS:** See `TRIAD_BLUE_STANDARDS.md` for comprehensive development standards that MUST be followed across all three platforms (navigation, typography, colors, technical architecture, features to copy vs rebuild).

**Logo Components:**
- **"swipes"** - Flourescent Red (#FF0040), Archivo Semi Expanded Bold, 24pt, Shadow Black, 50% Opacity, 5pt Blur, 5-10pt Distance
- **"blue"** - Fluorescent Blue (#0000FF), Archivo Bold, 24pt, Shadow Black, 50% Opacity, 5pt Blur, 5-10pt Distance  
- **".com"** - Green Fluorescent (#00FF40), Archivo Bold, 24pt, Shadow Black, 50% Opacity, 5pt Blur, 5-10pt Distance

### Color Hierarchy
**PRIMARY ACCENT COLOR: RED (#FF0040)**
- Red is used for headers, titles, and 1st highlighting
- Red is the primary brand color
- Blue is secondary
- Green is for success states

### Brand Colors
- **Flourescent Blue** #0000FF- PRIMARY: Headers, titles, primary actions, main highlights
- **Fluorescent Red** `#FF0040` - SECONDARY: Secondary actions, accents
- **Fluorescent Green** `#00FF40` - SUCCESS: Success states, follows the hex black 09080e with names of apps (/), i.e. /checkout
- **White** `#FFFFFF` - Backgrounds, cards
- **Black** `#09080e` - Body text, navigation labels, navigation slashes (/) of proprietary apps

## Project Overview
Payment gateway application for swipesblue.com with Stripe-inspired financial interface using the fluorescent color palette.

## Recent Changes
- 2025-10-24: Corrected company branding - SwipesBlue.com with proper color scheme (RED as primary)

## User Preferences
- Follow design_guidelines.md for all design decisions
- Use Shadcn components with Tailwind CSS
- Red is the primary accent color throughout the application
- Company name must always be rendered correctly as "SWIPES" (red) + "BLUE" (blue) + ".COM" (green)

## Project Architecture
- Full-stack JavaScript application
- Frontend: React with Vite, Wouter for routing
- Backend: Express
- Database: PostgreSQL with Drizzle ORM
- UI: Shadcn + Tailwind CSS
- Typography: Archivo font family for branding, Inter for UI
