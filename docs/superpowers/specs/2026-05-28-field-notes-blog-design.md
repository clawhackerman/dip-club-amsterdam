# Field Notes Blog — Design Spec

**Date:** 2026-05-28  
**Project:** Dip Club Amsterdam  
**Scope:** Add a "Field Notes" blog to the existing static Next.js site

---

## Overview

Add a blog section called **Field Notes** to dipclub.nl. Posts cover event recaps, survival/nature skill guides, and personal field reflections. The existing five community pillars (Cold Exposure, Heat Exposure, Breathwork, Time in Nature, Real Connection) are used as content tags to categorize posts — no changes to the pillars themselves.

Content is written by the site owner in MDX, stored in the repo, and deployed via the existing Vercel git push workflow. No CMS is needed now; migration to one later is straightforward.

---

## Stack

- **MDX parsing:** `next-mdx-remote` — supports custom React components inside posts
- **Frontmatter:** `gray-matter` — extracts metadata at build time
- **Rendering:** fully static via `generateStaticParams` — no server-side features added
- **Images:** `next/image` as always; post images go in `/public/media/field-notes/`

---

## File Structure

```
content/
  field-notes/
    YYYY-MM-DD-slug.mdx     ← one file per post

app/
  field-notes/
    page.tsx                ← listing page (/field-notes)
    [slug]/
      page.tsx              ← individual post (/field-notes/[slug])

app/components/
  FieldNoteCard.tsx         ← card component for listing page
  mdx-components.tsx        ← custom MDX component registry
```

---

## Post Frontmatter

Each `.mdx` file starts with:

```yaml
---
title: "What the Dolomites taught me about reading terrain"
date: 2026-05-28
pillars: ["Time in Nature", "Real Connection"]
excerpt: "Three days above the treeline and a map that kept lying to us."
coverImage: /media/field-notes/dolomites-terrain.jpg
---
```

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | yes | Used in card and post heading |
| `date` | YYYY-MM-DD | yes | Used for sorting and display |
| `pillars` | string[] | yes | Must match one of the five pillar names exactly |
| `excerpt` | string | yes | 1–2 sentences, shown in card |
| `coverImage` | string | yes | Path under `/public/` |

Posts are sorted by `date` descending on the listing page.

---

## Data Flow

1. At build time, Next.js reads all `.mdx` files from `content/field-notes/`
2. `gray-matter` parses frontmatter from each file
3. Listing page receives sorted array of frontmatter objects (no MDX body needed)
4. Post page uses `next-mdx-remote` to compile the full MDX body for a single slug
5. `generateStaticParams` pre-renders all slugs — output is fully static

---

## Listing Page (`/field-notes`)

**Hero:** reuses existing `<Hero>` component — `title="FIELD NOTES"`, `subtitle="Stories from the water, the trail, and the wild"`

**Pillar filter bar:** client-side only (`"use client"`). Five pillar buttons + "All". Active filter stored in `useState`. Clicking a pillar filters the visible cards without a page reload. No URL state needed at this stage.

**Card grid:**
- 3 columns desktop / 2 tablet / 1 mobile
- Each `<FieldNoteCard>` shows: cover image, pillar badge(s), title, excerpt, date, "Read ↘" link
- Visually consistent with `<ActivityCard>` — square corners, thick border, same spacing conventions

---

## Post Page (`/field-notes/[slug]`)

**Layout:** centered, max-width `820px`, matching the Manifesto page.

**Structure (top to bottom):**
1. Cover image — full width, `400px` tall, `object-cover`
2. Pillar badge(s) + formatted date
3. Title — Anton SC, large
4. MDX body content
5. Footer — "← Back to Field Notes" link + standard WhatsApp join CTA card

**MDX typography:** standard markdown elements (headings, paragraphs, lists, blockquotes, `code`) are styled to match site typography. No unstyled fallbacks.

---

## Custom MDX Components

Available inside any `.mdx` post file:

| Component | Usage | Style |
|---|---|---|
| `<PullQuote>` | Large stylized quote | Italic, terracotta color, left border |
| `<Callout>` | Tip or warning box | Yellow (`#FFE034`) background, dark text |
| `<PhotoGallery images={[{src, alt, caption}]} />` | 2–3 column image grid | Captions below each image, `next/image` inside |

---

## Navigation

Add "Field Notes" to `<Navbar>` as a top-level link in `NAV_LINKS`, pointing to `/field-notes`. Sits between "Activities" and "Contact" in the nav order:

```
Home · About · Manifesto · Activities · Field Notes · Contact
```

Note: "Activities" is a dropdown (Dips, Excursions, Adventures) — "Field Notes" is a flat top-level link, not a dropdown child.

---

## Out of Scope

- CMS integration (can be added later with minimal refactoring)
- RSS feed
- Search
- Comments
- Member-submitted posts
- Pagination (not needed until post count is large)
