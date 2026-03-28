# Dip Club Amsterdam — Website Redesign Spec

## Overview

Redesign the Dip Club Amsterdam website from a single-page vanilla HTML site to a multi-page Next.js application. Inspired by the Affogato Framer template: bold display typography, warm terracotta hero backgrounds, editorial layouts with alternating image/text sections, and generous white space.

The site moves from a single marketing page to a structured experience with three activity tiers — Dips, Excursions, Adventures — each with its own dedicated page.

## Tech Stack

- **Framework:** Next.js 16 (App Router, static export via `output: "export"`)
- **Styling:** Tailwind CSS v4
- **Language:** TypeScript
- **Animations:** Vanilla JS (Intersection Observer for scroll reveals)
- **Images:** `next/image` for optimization, WebP auto-conversion
- **Deployment:** Vercel (static)
- **No CMS** — all content hardcoded in components

## Route Structure

```
app/
├── layout.tsx            # Shared nav + footer + fonts + metadata
├── page.tsx              # Homepage
├── dips/
│   └── page.tsx          # Dips activity page
├── excursions/
│   └── page.tsx          # Excursions activity page
├── adventures/
│   └── page.tsx          # Adventures activity page
└── components/
    ├── Navbar.tsx         # Sticky nav, hamburger on mobile
    ├── Footer.tsx         # Links, social, copyright
    ├── Hero.tsx           # Reusable hero (full/half height variants)
    ├── ActivityCard.tsx   # Card linking to activity page
    ├── StatsBar.tsx       # Stats row on colored background
    ├── WaveDivider.tsx    # SVG wavy pattern between sections
    ├── PhotoGrid.tsx      # 2-3 image grid with rounded corners
    └── ScrollReveal.tsx   # Intersection Observer wrapper
```

**Static assets:**
- `public/media/` — all existing images from `media/`
- `public/fonts/` — TAN Tangkiwood font file

## Color Palette

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| Primary / Hero | Terracotta | `#E2725B` | Hero backgrounds, primary CTA buttons |
| Accent Blue | Blue | `#2e77d4` | Links, Dips accent, interactive elements |
| Accent Green | Forest Green | `#4A7C59` | Excursions accent |
| Text Dark | Near Black | `#1A1A1A` | Headings, body text |
| Light Background | Warm Off-White | `#F5F3EF` | Section backgrounds (warm, not cold gray) |
| White | White | `#FFFFFF` | Card backgrounds, clean sections |

**Per-activity accent colors** (used on frequency badges, links, hover states):
- Dips: Blue `#2e77d4`
- Excursions: Green `#4A7C59`
- Adventures: Terracotta `#E2725B`

## Typography

| Role | Font | Weight | Size (desktop) |
|------|------|--------|----------------|
| Display (hero headlines) | TAN Tangkiwood | Regular | 80-120px |
| Section headings | Inter | 800 | 40-48px |
| Subheadings | DM Sans | 600 | 24-32px |
| Body | DM Sans | 400 | 16-18px |
| Emphasis words | Playfair Display | Italic | Contextual |
| Labels/badges | DM Sans | 600 uppercase | 12-14px |

## Homepage Layout

### 1. Hero (full viewport height)

- **Background:** Solid terracotta `#E2725B`
- **Top bar:** Dip Club logo (white, top-left), nav links on desktop / hamburger on mobile (top-right)
- **Center-left:** Massive "DIP CLUB" in TAN Tangkiwood, white, stacked on two lines
- **Below headline:** "Seek Discomfort. Find Yourself." in DM Sans
- **Below subtitle:** Short intro line + WhatsApp CTA button (white button with dark text)
- **Bottom-right:** Featured community photo with rounded corners, slightly overlapping the fold (like Affogato's phone mockup placement)

### 2. Intro Section (white background)

- **Left side:** Small uppercase label "BEGIN YOUR JOURNEY" + paragraph describing Dip Club (urban wellness community in Amsterdam, ice baths, breathwork, outdoor activities)
- **Right side:** Offset photo with rounded corners
- Layout: two-column on desktop, stacked on mobile

### 3. Activities Section (off-white `#F5F3EF` background)

- **Section title:** "Our Activities"
- **Three cards** in a row (stacked on mobile):
  - Full-bleed photo top
  - Category name: DIPS / EXCURSIONS / ADVENTURES
  - Frequency tag: "Monthly" / "Every Semester" / "Once a Year"
  - One-line description
  - "Learn more ->" link to detail page
- Cards have 16px rounded corners, subtle shadow, hover lift
- **Wavy SVG divider** below this section

### 4. Stats Bar (terracotta background)

- Three stats in a row, white text:
  - "200+" — Members
  - "50+" — Events
  - "3" — Countries
- Large bold numbers, small uppercase labels below

### 5. Community Section (white background)

- **Headline:** "Exploring together"
- **Subline:** "Stories from our recent trips"
- 2-3 photos in a grid layout (rounded corners, hover zoom)
- Social media icon links (Instagram, YouTube)

### 6. Contact + Footer

- **Contact card:** Bordered card (like Affogato) — "Got a question? Don't hesitate to ask us." with email link and arrow
- **Footer:** Dark background (`#1A1A1A`), logo, nav links, social icons, copyright
- Footer tagline: "Made with cold hands and warm hearts in Amsterdam"

## Activity Page Template

All three activity pages (`/dips`, `/excursions`, `/adventures`) share the same layout structure with different content and accent colors.

### 1. Hero (half viewport height)

- Terracotta background (same as homepage)
- Large category name in TAN Tangkiwood ("DIPS" / "EXCURSIONS" / "ADVENTURES")
- Frequency badge below: "Every month" / "Every semester" / "Once a year" (uses per-activity accent color)

### 2. Overview (alternating image/text rows)

Like Affogato's "Current Programs" section — each row alternates image left/text right, then text left/image right.

Content per activity:

**Dips:**
- What: Ice baths and breathwork at local Amsterdam spots
- Who: Open to everyone, all levels
- When: Monthly, a few hours
- Vibe: Local, accessible, community-focused

**Excursions:**
- What: Day or weekend trips — hiking, outdoor challenges
- Where: Regional destinations (Ardennes, Belgian coast, etc.)
- When: Every semester
- Vibe: Getting out of Amsterdam together, moderate commitment

**Adventures:**
- What: Multi-day international trips, intensive experiences
- Where: European destinations (past: Dolomites, South Africa)
- When: Once a year, up to 12 days
- Vibe: The flagship experience, deep bonding

### 3. Photo Gallery

- 2-3 images in a responsive grid
- Rounded corners (16px)
- Subtle hover zoom (1.05x)
- Uses existing photos from `media/`

### 4. Practical Info

Simple list or card layout:
- What to bring
- Typical schedule/duration
- Group size
- Cost indication (if applicable)

### 5. CTA Section

- Wavy divider above
- **Dips:** "Join our WhatsApp to hear about the next dip" -> WhatsApp link (primary)
- **Excursions/Adventures:** "Sign up for the next trip" -> external form link (primary) + "Join WhatsApp for updates" (secondary)
- Background: terracotta or dark

## Navigation

**Desktop:**
- Sticky top bar
- Logo left (Dip Club white logo on hero, dark on scrolled)
- Links right: Home, Dips, Excursions, Adventures, Contact
- Semi-transparent background with backdrop blur on scroll
- Active page indicator (underline)

**Mobile:**
- Logo left, hamburger right
- Full-screen overlay menu on tap
- Large touch targets (48px minimum)
- Close button (X) top-right

**Behavior:**
- Transparent on hero (white text/logo)
- Solid white background with dark text after scrolling past hero
- Smooth transition between states

## Wavy Dividers

- SVG wave patterns placed between select sections
- Inherit background colors of adjacent sections for seamless transitions
- 2-3 wave shape variants to avoid repetition
- Rendered as full-width SVGs, not background images

## Animations

- **Scroll reveal:** Elements fade in from below (20px translateY) on entering viewport via Intersection Observer
- **Stagger:** Sequential elements animate with 0.1s delay between them
- **Hover:** Cards lift + shadow, buttons scale slightly, images subtle zoom
- **Nav transition:** Background opacity transitions on scroll
- No animation libraries — all CSS transitions + Intersection Observer

## Responsive Breakpoints

| Breakpoint | Width |
|-----------|-------|
| Mobile | < 768px |
| Tablet | 768px - 1023px |
| Desktop | 1024px - 1439px |
| Large Desktop | 1440px+ |

Container max-width: 1320px, centered with auto margins.

## External Links

| Purpose | Target | Used On |
|---------|--------|---------|
| WhatsApp Community | `https://chat.whatsapp.com/Hgi483zWWtQ3XWt0dBnfnl` | All pages (primary CTA) |
| Trip Signup | External form (Google Form / Typeform) | Excursions & Adventures pages |
| Instagram | `https://www.instagram.com/dipclub.ams/` | Footer, community section |
| Email | `hello@dipclub.nl` | Contact card, footer |

## Image Assets

All existing images from `media/` will be moved to `public/media/`. Key images and their planned usage:

- `dc-hero-image-website.png` — Homepage hero featured photo
- `dc-biweekly-dip.jpg` — Dips activity card + page
- `dc-quarterly-excursion.JPG` — Excursions activity card + page
- `dc-annual-adventure-2.JPG` — Adventures activity card + page (was `dc-annual-trip.jpg`)
- `dc-polaroid-*` images — Community section gallery
- `dc-quote-background.jpg` — Potential CTA section background
- `Pascal Climbing Ardennes.JPG` — Excursions page gallery
- Various `IMG_*.jpg` — Activity page galleries

## What's NOT In Scope

- No CMS integration
- No user authentication
- No booking/payment system (trip signup is an external form link)
- No blog
- No event calendar (just static descriptions of activity types)
- No email capture / newsletter signup
