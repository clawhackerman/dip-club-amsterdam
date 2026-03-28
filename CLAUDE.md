# Dip Club Amsterdam Website

## Project Overview
Multi-page marketing website for Dip Club Amsterdam - an urban wellness community hosting weekly ice baths, breathwork, and outdoor activities. Built with Next.js as a static export deployed on Vercel.

## Deployment Setup

### GitHub Repository
1. Initialize git: `git init`
2. Create `.gitignore` with: `node_modules/`, `.DS_Store`, `.env.local`, `.vercel`, `.next/`, `out/`
3. Make initial commit
4. Create GitHub repo: `gh repo create dip-club-amsterdam --public --source=.`
5. Push: `git push -u origin main`

### Vercel Deployment
This project deploys a Next.js static site via `next export` (output: 'export' in next.config.ts).

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in project directory
3. Link to GitHub for automatic deployments on push
4. Set up custom domain: dipclub.ams (if available)
5. Enable automatic deployments on push to main

### Environment Variables (if needed)
- WHATSAPP_GROUP_LINK=https://chat.whatsapp.com/Hgi483zWWtQ3XWt0dBnfnl
- INSTAGRAM_HANDLE=https://www.instagram.com/dipclub.ams/
- CONTACT_EMAIL=hello@dipclub.nl

## Brand Identity
- **Tone**: Conversational, energetic, challenging but inclusive
- **Target**: Urban professionals, entrepreneurs, freelancers seeking real connection
- **Core message**: "Seek Discomfort. Find Yourself."
- **Visual inspiration**: Wayo adventure travel template - clean, modern, image-forward

## Technical Requirements
- Multi-page responsive website with Next.js App Router
- Mobile-first design (breakpoints: 375px, 768px, 1024px, 1440px)
- WhatsApp CTA as primary conversion point
- Fast loading, static export (no server required)
- Deploy to Vercel with GitHub integration

## Tech Stack
- Next.js 15 (App Router, static export via `output: 'export'`)
- TypeScript
- Tailwind CSS v4
- Vercel (static hosting)
- No heavy client-side frameworks — pages are statically pre-rendered

## Page Structure

The site has four pages sharing a common Navbar and Footer:

### `/` — Home
- Hero section: full-viewport, headline "Seek Discomfort. Find Yourself.", WhatsApp CTA
- Intro / What We Do: 3-pillar cards (Dips, Excursions, Adventures)
- Stats row + Community section
- Contact / Final CTA section

### `/dips` — Weekly Ice Baths
- Details on the weekly dip events, schedule, what to expect
- WhatsApp join CTA

### `/excursions` — Local Excursions
- Day trips and outdoor activities around Amsterdam/Netherlands
- Event listings and CTA

### `/adventures` — Bigger Adventures
- Multi-day trips, international excursions
- Event listings and CTA

### Shared Components
- `Navbar` — sticky navigation with links to all four pages
- `Footer` — contact info, social links, copyright
- `WaveDivider` — SVG wave transitions between sections
- `ScrollReveal` — scroll-triggered fade-in animations

## Design Elements
- **Cards**: Rounded corners (12-16px), subtle shadows on hover
- **Images**: Full-bleed with text overlays, rounded corners on cards
- **Grid**: CSS Grid / Tailwind grid for pillar cards (3-column desktop, 1-column mobile)
- **Spacing**: Generous white space, consistent vertical rhythm
- **Animations**: Smooth hover states, fade-in on scroll (ScrollReveal component)
- **Typography**: Large headings, Inter Display for display text, orange brand accents

## Key Features
- Static export — all pages pre-rendered at build time
- WhatsApp link integration (primary CTA across all pages)
- Instagram integration (@dipclub.ams)
- Email link (hello@dipclub.nl)
- Mobile-optimized for on-the-go signups
- Scroll-triggered animations via ScrollReveal component

## Success Criteria
- WhatsApp community clicks (primary metric)
- Mobile bounce rate < 40%
- Page loads under 3 seconds
- Clear value proposition within 5 seconds
- All images optimized and lazy-loaded
- Perfect Lighthouse score (90+ across all metrics)
