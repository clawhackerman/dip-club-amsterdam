# Dip Club Amsterdam Website — Claude Instructions

Static marketing site for Dip Club Amsterdam (urban wellness community: ice baths, breathwork, outdoor activities). Internal Ryzo side project. Next.js 15 static export on Vercel.

## Dev Commands

```bash
npm run dev      # localhost:3000
npm run build    # static export to /out
npm run lint
```

Deploy: `git push` to main → Vercel auto-deploys. No separate deploy step needed.

## Stack & Gotchas

- **Static export** (`output: 'export'` in next.config.ts) — no server-side features. No API routes, no middleware, no `cookies()`, no `headers()`.
- **Tailwind v4** — custom theme values live in `globals.css` under `@theme {}` block, not in `tailwind.config.ts`. Don't add a config file.
- WhatsApp join link is the **primary conversion CTA** on every page — don't remove or bury it.
- `ScrollReveal` uses `IntersectionObserver` — add `"use client"` to any component using it.
- **React 19** required — next-mdx-remote@6 needs React 19 to work with Next.js 15 RSC rendering.

## Design Constraints (non-negotiable)

- Dark background `#0e0e0e`, yellow `#FFE034` accent, red `#E8372A` for danger elements
- Display font: Anton SC (Google Fonts, loaded via next/font); body: Fredoka
- Load all Google Fonts via `next/font/google` in `layout.tsx` — no `<link>` tags
- Keep page.tsx clean: imports + section composition only, no JSX logic in the root page

## Structure

```
app/
  layout.tsx          → fonts + global styles
  page.tsx            → section composition only
  components/         → one file per section/component
  field-notes/        → blog listing + [slug] post pages
lib/
  field-notes.ts      → getAllPosts(), getPostBySlug() — data utilities
content/
  field-notes/        → .mdx blog posts (frontmatter: title, date, pillars, excerpt, coverImage)
```

## Key Rules

- Don't add server-side features — this is a static export
- Don't hardcode WhatsApp/Instagram/email links in components — read from `content/` or props
- Don't change section order without explicit instruction
- All images via `next/image` with explicit width + height
- Field Notes pillars must match exactly: Cold Exposure, Heat Exposure, Breathwork, Time in Nature, Real Connection
