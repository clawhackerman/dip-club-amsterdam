# Dip Club Amsterdam Website

## Project Overview
One-page marketing website for Dip Club Amsterdam - an urban wellness community hosting weekly ice baths, breathwork, and outdoor activities.

## Deployment Setup

### GitHub Repository
1. Initialize git: `git init`
2. Create `.gitignore` with: `node_modules/`, `.DS_Store`, `.env.local`, `.vercel`
3. Make initial commit
4. Create GitHub repo: `gh repo create dip-club-amsterdam --public --source=.`
5. Push: `git push -u origin main`

### Vercel Deployment
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in project directory
3. Link to GitHub for automatic deployments
4. Set up custom domain: dipclub.ams (if available)
5. Enable automatic deployments on push to main

### Environment Variables (if needed)
- WHATSAPP_GROUP_LINK=https://chat.whatsapp.com/EJdZ0FDo1z0IkM9ayWujVo?mode=gi_t
- INSTAGRAM_HANDLE=https://www.instagram.com/dipclub.ams/
- CONTACT_EMAIL=hello@dipclub.nl

## Brand Identity
- **Tone**: Conversational, energetic, challenging but inclusive
- **Target**: Urban professionals, entrepreneurs, freelancers seeking real connection
- **Core message**: "Seek Discomfort. Find Yourself."
- **Visual inspiration**: Wayo adventure travel template - clean, modern, image-forward

## Technical Requirements
- Single-page responsive website with smooth scroll navigation
- Mobile-first design (breakpoints: 375px, 768px, 1024px, 1440px)
- WhatsApp CTA as primary conversion point
- Fast loading, minimal dependencies
- Deploy to Vercel with GitHub integration

## Setup Tasks
1. Initialize Git repository
2. Create GitHub repository and push initial commit
3. Connect to Vercel for automatic deployments
4. Set up custom domain (if available)

## Tech Stack
- HTML5, CSS3 (or Tailwind CSS)
- Vanilla JavaScript for smooth scroll and interactions
- No heavy frameworks - keep it fast and simple
- Optimize images (WebP format, lazy loading)

## Page Structure

### Hero Section
- Full viewport height
- Large hero image (group in ice bath, big smiles)
- Headline: "Seek Discomfort. Find Yourself."
- Subheadline: "Join Amsterdam's urban wellness community..."
- Primary CTA: "Join Our WhatsApp Community →"
- Supporting text: "Free weekly events • 20 people max • All levels welcome"
- Style: Large typography overlaid on hero image (like Wayo)

### What We Do Section
- Grid layout: 3 cards for the pillars
- Each card: Icon/image, title, description
- Clean spacing, hover effects
- Card style similar to Wayo's package cards

### Community Section
- Split layout: Image gallery on one side, content on other
- Stats row with animated counters
- Testimonial card with photo
- "Find Your Tribe in the Cold" headline

### How It Works Section
- 3-step process with numbered cards
- Visual flow indicators
- Clear, actionable copy
- CTA button at bottom

### FAQ Section
- Accordion-style or clean list format
- 4 key questions with personality
- Maintains conversational tone

### Final CTA Section
- Similar to hero but with different image
- Strong headline: "Stop Thinking. Start Dipping."
- Dual CTAs: Primary WhatsApp, Secondary Instagram
- High contrast design

### Footer
- Clean, minimal
- Contact info, social links
- Copyright
- "Made with cold hands and warm hearts in Amsterdam"

## Design Elements (Wayo-inspired)
- **Cards**: Rounded corners (12-16px), subtle shadows on hover
- **Images**: Full-bleed with text overlays, rounded corners on cards
- **Grid**: CSS Grid for package/pillar cards (3-column desktop, 1-column mobile)
- **Spacing**: Generous white space, consistent vertical rhythm
- **Animations**: Smooth hover states, fade-in on scroll
- **Typography**: Large headings with elegant serif accents for emphasis words

## Key Features
- Sticky navigation with smooth scroll
- WhatsApp link integration (whatsapp://send?phone=...)
- Instagram integration (@dipclub.ams)
- Email link (hello@dipclub.ams)
- Mobile-optimized for on-the-go signups
- Scroll-triggered animations for sections

## Success Criteria
- WhatsApp community clicks (primary metric)
- Mobile bounce rate < 40%
- Page loads under 3 seconds
- Clear value proposition within 5 seconds
- All images optimized and lazy-loaded
- Perfect Lighthouse score (90+ across all metrics)