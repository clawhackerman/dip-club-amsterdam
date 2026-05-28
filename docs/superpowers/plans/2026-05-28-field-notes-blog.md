# Field Notes Blog Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "Field Notes" blog to dipclub.nl — MDX posts stored in the repo, categorized by community pillar, rendered as fully static pages.

**Architecture:** `gray-matter` extracts frontmatter from `.mdx` files at build time; `next-mdx-remote/rsc` compiles MDX in Server Components; `generateStaticParams` pre-renders all post slugs; a `'use client'` component handles pillar filtering on the listing page without a page reload.

**Tech Stack:** `next-mdx-remote` v5 (RSC flavor), `gray-matter`, Next.js 15 App Router, static export (`output: 'export'`), Tailwind v4, TypeScript.

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `content/field-notes/*.mdx` | Create | MDX source for all posts |
| `lib/field-notes.ts` | Create | Read MDX files, parse frontmatter, export typed data |
| `app/components/mdx-components.tsx` | Create | Custom MDX components (PullQuote, Callout, PhotoGallery) + styled base elements |
| `app/components/FieldNoteCard.tsx` | Create | Card for listing page |
| `app/components/FieldNotesList.tsx` | Create | Client component: pillar filter state + card grid |
| `app/field-notes/page.tsx` | Create | Listing page — server component, fetches all posts |
| `app/field-notes/[slug]/page.tsx` | Create | Post page — server component, renders MDX |
| `app/components/Navbar.tsx` | Modify | Add "Field Notes" link to `NAV_LINKS` |
| `package.json` | Modify | Add `next-mdx-remote` and `gray-matter` |

---

## Task 1: Install packages

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install dependencies**

```bash
npm install next-mdx-remote gray-matter
```

- [ ] **Step 2: Verify installation**

```bash
node -e "require('gray-matter'); require('next-mdx-remote'); console.log('ok')"
```

Expected output: `ok`

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add next-mdx-remote and gray-matter"
```

---

## Task 2: Create sample MDX post

**Files:**
- Create: `content/field-notes/2026-05-10-dolomites-terrain.mdx`

- [ ] **Step 1: Create content directory and sample post**

Create the directory:
```bash
mkdir -p content/field-notes
```

Create `content/field-notes/2026-05-10-dolomites-terrain.mdx`:

```mdx
---
title: "What the Dolomites taught me about reading terrain"
date: "2026-05-10"
pillars: ["Time in Nature", "Real Connection"]
excerpt: "Three days above the treeline with a map that kept lying to us. Here is what we actually learned."
coverImage: /media/dc-polaroid-2-dolomites-hike.jpg
---

Three days above the treeline and a map that kept lying to us.

We set off from Cortina d'Ampezzo with eight people, two guides, and the kind of confidence that comes from never having been genuinely lost. By day two we had misread the contour lines twice, taken a shortcut that added four kilometres, and learned to stop trusting the path that looked obvious from above.

## Reading contour lines versus reading the land

Topographic maps tell you the shape of the land in theory. What they do not tell you is which theory is correct at ground level.

<PullQuote>
  The terrain does not care what your map says. It just is what it is.
</PullQuote>

Contour lines bunched tightly together mean steep ground. But steep means something different when you are crossing it with a full pack after twelve kilometres than when you are reading it over breakfast.

## What we actually learned

By day three we had stopped arguing about the map and started reading the land directly — following the natural drainage lines, moving toward the ridgelines we could see, trusting the way water had shaped the ground over centuries.

<Callout>
  **Tip:** When in doubt, find the water. Streams always flow downhill toward habitation. In European mountains, follow a stream long enough and you will find a trail, a road, or a village.
</Callout>

The Dolomites are forgiving enough to make mistakes in. Other landscapes are not. That is the real lesson — learn to read terrain here, while the margins for error are still generous.
```

Note: date is quoted (`"2026-05-10"`) so gray-matter treats it as a string, not a JavaScript Date object.

- [ ] **Step 2: Commit**

```bash
git add content/
git commit -m "content: add first Field Notes sample post"
```

---

## Task 3: Create `lib/field-notes.ts` data utilities

**Files:**
- Create: `lib/field-notes.ts`

- [ ] **Step 1: Create `lib/field-notes.ts`**

```typescript
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content/field-notes");

export type FieldNoteMeta = {
  slug: string;
  title: string;
  date: string; // ISO date string YYYY-MM-DD
  pillars: string[];
  excerpt: string;
  coverImage: string;
};

export type FieldNotePost = FieldNoteMeta & {
  content: string;
};

function normalizeDate(raw: unknown): string {
  if (raw instanceof Date) return raw.toISOString().split("T")[0];
  return String(raw);
}

export function getAllPosts(): FieldNoteMeta[] {
  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"));

  return files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf-8");
      const { data } = matter(raw);
      return {
        slug,
        title: String(data.title),
        date: normalizeDate(data.date),
        pillars: Array.isArray(data.pillars) ? data.pillars : [],
        excerpt: String(data.excerpt),
        coverImage: String(data.coverImage),
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string): FieldNotePost {
  const filepath = path.join(POSTS_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filepath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    content,
    title: String(data.title),
    date: normalizeDate(data.date),
    pillars: Array.isArray(data.pillars) ? data.pillars : [],
    excerpt: String(data.excerpt),
    coverImage: String(data.coverImage),
  };
}
```

- [ ] **Step 2: Verify the utility parses the sample post correctly**

```bash
node -e "
const matter = require('gray-matter');
const fs = require('fs');
const raw = fs.readFileSync('content/field-notes/2026-05-10-dolomites-terrain.mdx', 'utf-8');
const { data, content } = matter(raw);
console.log('title:', data.title);
console.log('date type:', typeof data.date, data.date);
console.log('pillars:', data.pillars);
console.log('content length:', content.length);
"
```

Expected: title and pillars printed correctly, date is a string (not a Date object because we quoted it in the frontmatter), content has a positive length.

- [ ] **Step 3: Commit**

```bash
git add lib/field-notes.ts
git commit -m "feat: add field-notes data utilities"
```

---

## Task 4: Create custom MDX components

**Files:**
- Create: `app/components/mdx-components.tsx`

- [ ] **Step 1: Create `app/components/mdx-components.tsx`**

```tsx
import Image from "next/image";

export function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-8 border-l-4 border-terracotta pl-6 font-accent italic text-xl text-terracotta leading-relaxed">
      {children}
    </blockquote>
  );
}

export function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 border-l-4 border-dark bg-[#FFE034] px-6 py-4 text-dark">
      {children}
    </div>
  );
}

type GalleryImage = { src: string; alt: string; caption?: string };

export function PhotoGallery({ images }: { images: GalleryImage[] }) {
  const cols =
    images.length === 2
      ? "sm:grid-cols-2"
      : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <div className={`my-8 grid gap-4 ${cols}`}>
      {images.map((img) => (
        <figure key={img.src} className="flex flex-col gap-2">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 33vw"
            />
          </div>
          {img.caption && (
            <figcaption className="text-xs text-slate text-center">
              {img.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}

export const mdxComponents = {
  PullQuote,
  Callout,
  PhotoGallery,
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="font-heading text-3xl font-extrabold mt-10 mb-4"
      {...props}
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="font-heading text-2xl font-extrabold mt-8 mb-3"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="font-heading text-xl font-extrabold mt-6 mb-2"
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-base leading-relaxed text-slate mb-5" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="list-disc list-outside ml-5 space-y-1.5 text-slate mb-5"
      {...props}
    />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="list-decimal list-outside ml-5 space-y-1.5 text-slate mb-5"
      {...props}
    />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-dark/20 pl-5 italic text-slate my-6"
      {...props}
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="bg-dark/5 px-1.5 py-0.5 text-sm font-mono"
      {...props}
    />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="bg-dark/5 p-4 overflow-x-auto text-sm font-mono my-6"
      {...props}
    />
  ),
};
```

- [ ] **Step 2: Verify TypeScript compiles with no errors**

```bash
npx tsc --noEmit
```

Expected: no output (no errors).

- [ ] **Step 3: Commit**

```bash
git add app/components/mdx-components.tsx
git commit -m "feat: add custom MDX components (PullQuote, Callout, PhotoGallery)"
```

---

## Task 5: Create `FieldNoteCard` component

**Files:**
- Create: `app/components/FieldNoteCard.tsx`

- [ ] **Step 1: Create `app/components/FieldNoteCard.tsx`**

```tsx
import Image from "next/image";
import Link from "next/link";
import type { FieldNoteMeta } from "@/lib/field-notes";

export default function FieldNoteCard({ post }: { post: FieldNoteMeta }) {
  const displayDate = new Date(post.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Link
      href={`/field-notes/${post.slug}`}
      className="group flex flex-col overflow-hidden border-[6px] border-dark bg-offwhite hover:border-terracotta transition-colors duration-200"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.pillars.map((pillar) => (
            <span
              key={pillar}
              className="text-xs font-semibold uppercase tracking-[0.12em] text-terracotta"
            >
              {pillar}
            </span>
          ))}
        </div>
        <h3 className="font-heading text-lg font-extrabold leading-tight mb-2">
          {post.title}
        </h3>
        <p className="text-sm text-slate leading-relaxed flex-1">
          {post.excerpt}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-slate">{displayDate}</span>
          <span className="text-sm font-semibold text-dark group-hover:text-terracotta transition-colors duration-200">
            Read ↘
          </span>
        </div>
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no output.

- [ ] **Step 3: Commit**

```bash
git add app/components/FieldNoteCard.tsx
git commit -m "feat: add FieldNoteCard component"
```

---

## Task 6: Create `FieldNotesList` client component

**Files:**
- Create: `app/components/FieldNotesList.tsx`

- [ ] **Step 1: Create `app/components/FieldNotesList.tsx`**

```tsx
"use client";

import { useState } from "react";
import FieldNoteCard from "./FieldNoteCard";
import type { FieldNoteMeta } from "@/lib/field-notes";

const PILLARS = [
  "Cold Exposure",
  "Heat Exposure",
  "Breathwork",
  "Time in Nature",
  "Real Connection",
];

export default function FieldNotesList({ posts }: { posts: FieldNoteMeta[] }) {
  const [active, setActive] = useState<string | null>(null);

  const filtered =
    active ? posts.filter((p) => p.pillars.includes(active)) : posts;

  return (
    <div>
      {/* Pillar filter bar */}
      <div className="flex flex-wrap gap-2 mb-12">
        <button
          onClick={() => setActive(null)}
          className={[
            "px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] border-2 border-dark transition-colors duration-200",
            active === null
              ? "bg-dark text-offwhite"
              : "bg-transparent text-dark hover:bg-dark/5",
          ].join(" ")}
        >
          All
        </button>
        {PILLARS.map((pillar) => (
          <button
            key={pillar}
            onClick={() => setActive(pillar === active ? null : pillar)}
            className={[
              "px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] border-2 border-dark transition-colors duration-200",
              active === pillar
                ? "bg-dark text-offwhite"
                : "bg-transparent text-dark hover:bg-dark/5",
            ].join(" ")}
          >
            {pillar}
          </button>
        ))}
      </div>

      {/* Card grid */}
      {filtered.length === 0 ? (
        <p className="text-slate">No posts for this pillar yet.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <FieldNoteCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no output.

- [ ] **Step 3: Commit**

```bash
git add app/components/FieldNotesList.tsx
git commit -m "feat: add FieldNotesList client component with pillar filter"
```

---

## Task 7: Create the listing page

**Files:**
- Create: `app/field-notes/page.tsx`

- [ ] **Step 1: Create `app/field-notes/page.tsx`**

```tsx
import type { Metadata } from "next";
import Hero from "../components/Hero";
import { getAllPosts } from "@/lib/field-notes";
import FieldNotesList from "../components/FieldNotesList";

export const metadata: Metadata = {
  title: "Field Notes — Dip Club Amsterdam",
  description: "Stories from the water, the trail, and the wild.",
};

export default function FieldNotesPage() {
  const posts = getAllPosts();
  return (
    <main>
      <Hero
        title="FIELD NOTES"
        subtitle="Stories from the water, the trail, and the wild"
      />
      <section className="bg-offwhite py-24 lg:py-32">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <FieldNotesList posts={posts} />
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no output.

- [ ] **Step 3: Start dev server and check `/field-notes` loads**

```bash
npm run dev
```

Open `http://localhost:3000/field-notes`. Expected: hero with "FIELD NOTES", pillar filter buttons, one card for the Dolomites post. If the card image is broken, that's fine — the image path `/media/dc-polaroid-2-dolomites-hike.jpg` exists, but verify with the browser dev tools if needed.

Stop the dev server (Ctrl+C) before continuing.

- [ ] **Step 4: Commit**

```bash
git add app/field-notes/page.tsx
git commit -m "feat: add Field Notes listing page"
```

---

## Task 8: Create the post page

**Files:**
- Create: `app/field-notes/[slug]/page.tsx`

- [ ] **Step 1: Create `app/field-notes/[slug]/page.tsx`**

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/field-notes";
import { mdxComponents } from "../../components/mdx-components";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return {
    title: `${post.title} — Dip Club Amsterdam`,
    description: post.excerpt,
  };
}

export default async function FieldNotePostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const displayDate = new Date(post.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main>
      {/* Cover image — sits below fixed navbar (72px) */}
      <div className="relative w-full h-[400px] mt-[72px]">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      <article className="bg-offwhite py-16 lg:py-24">
        <div className="mx-auto max-w-[820px] px-6 lg:px-12">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {post.pillars.map((pillar) => (
              <span
                key={pillar}
                className="text-xs font-semibold uppercase tracking-[0.15em] text-terracotta"
              >
                {pillar}
              </span>
            ))}
            <span className="text-xs text-slate">{displayDate}</span>
          </div>

          {/* Title */}
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-10">
            {post.title}
          </h1>

          {/* MDX body */}
          <MDXRemote source={post.content} components={mdxComponents} />

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-dark/10 flex flex-col gap-8">
            <Link
              href="/field-notes"
              className="text-sm font-semibold text-terracotta hover:text-terracotta-dark transition-colors"
            >
              ← Back to Field Notes
            </Link>
            <div className="rounded-none border-[6px] border-terracotta bg-terracotta p-8 text-white">
              <h2 className="font-heading text-xl font-extrabold">
                Join the community
              </h2>
              <p className="mt-2 text-sm text-white/80">
                Be the first to know about upcoming dips, excursions, and
                adventures.
              </p>
              <a
                href="https://chat.whatsapp.com/Hgi483zWWtQ3XWt0dBnfnl"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block bg-offwhite px-8 py-3 text-sm font-semibold text-dark hover:bg-offwhite/90 transition-all"
              >
                Join WhatsApp ↘
              </a>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no output.

- [ ] **Step 3: Start dev server and check post page loads**

```bash
npm run dev
```

Open `http://localhost:3000/field-notes/2026-05-10-dolomites-terrain`. Expected: cover image, pillar badges, post title, MDX body with the PullQuote in terracotta and Callout in yellow, "Back to Field Notes" link, WhatsApp CTA. Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add "app/field-notes/[slug]/page.tsx"
git commit -m "feat: add Field Notes post page with MDX rendering"
```

---

## Task 9: Add Field Notes to navbar

**Files:**
- Modify: `app/components/Navbar.tsx:14-20`

- [ ] **Step 1: Add Field Notes to `NAV_LINKS` in `app/components/Navbar.tsx`**

Find the `NAV_LINKS` array (currently lines 14–20):

```typescript
const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Manifesto", href: "/manifesto" },
  { label: "Activities", href: "/dips", children: ACTIVITY_LINKS },
  { label: "Contact", href: "/contact" },
];
```

Replace with:

```typescript
const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Manifesto", href: "/manifesto" },
  { label: "Activities", href: "/dips", children: ACTIVITY_LINKS },
  { label: "Field Notes", href: "/field-notes" },
  { label: "Contact", href: "/contact" },
];
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no output.

- [ ] **Step 3: Start dev server and verify nav link appears**

```bash
npm run dev
```

Open `http://localhost:3000`. Expected: "Field Notes" appears in the desktop nav between "Activities" and "Contact". Click it — should navigate to `/field-notes`. Also open the mobile menu and confirm "Field Notes" appears there. Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add app/components/Navbar.tsx
git commit -m "feat: add Field Notes to navbar"
```

---

## Task 10: Add second sample post and verify full static build

**Files:**
- Create: `content/field-notes/2026-04-15-foraging-basics.mdx`

- [ ] **Step 1: Create a second sample post**

Create `content/field-notes/2026-04-15-foraging-basics.mdx`:

```mdx
---
title: "Foraging basics in the Netherlands — what you can actually eat"
date: "2026-04-15"
pillars: ["Time in Nature"]
excerpt: "The Dutch countryside is full of edible plants that most people walk right past. A beginner's guide to what is safe, what is not, and how to start."
coverImage: /media/dc-quarterly-excursion.JPG
---

The Netherlands is not the first place you think of when someone says foraging. But the Dutch countryside — particularly along the dunes, river banks, and forest edges — is surprisingly rich with edible plants.

The key is knowing what you are looking for before you start.

## Start with three plants only

Every forager will tell you: do not try to learn everything at once. Pick three plants, learn them absolutely cold, and only then add more. A misidentification in the field is not the same as a wrong answer on a test.

The three to start with in the Netherlands:

**Nettles** (*Urtica dioica*) — unmistakable, grows everywhere near water and disturbed soil, delicious cooked, rich in iron and vitamins. Wear gloves to pick; the sting disappears with heat.

**Elderflower** (*Sambucus nigra*) — the white flower clusters appear in May and June. Used for cordial, fritters, and tea. Do not confuse with water hemlock, which also has white flower clusters but grows near water and smells unpleasant. If in doubt, do not eat it.

**Wild garlic** (*Allium ursinum*) — carpet of green leaves in shaded woodland from March to May, strong garlic smell when crushed. The smell is the tell. No garlic smell means it is not wild garlic.

<Callout>
  **Rule:** If you cannot identify a plant with 100% certainty, leave it. Foraging is patient work. There is always a next time.
</Callout>

## What the Dip Club does differently

We do not forage alone. On excursions, we bring someone who knows the land — a local guide, a botanist, or a long-time forager — and we treat it as a learning session, not a harvest.

<PullQuote>
  The goal is not to fill a bag. The goal is to learn to see what was always there.
</PullQuote>

Start with your local park. You will be surprised what is growing under your feet.
```

- [ ] **Step 2: Run full static build**

```bash
npm run build
```

Expected: build succeeds with no errors. You should see routes for `/field-notes`, `/field-notes/2026-05-10-dolomites-terrain`, and `/field-notes/2026-04-15-foraging-basics` in the output.

- [ ] **Step 3: Run lint**

```bash
npm run lint
```

Expected: no errors (warnings are acceptable).

- [ ] **Step 4: Commit**

```bash
git add content/field-notes/2026-04-15-foraging-basics.mdx
git commit -m "content: add foraging basics Field Notes post"
```

---

## Self-Review Notes

- Spec required: listing page with pillar filter ✓ (Task 6–7)
- Spec required: post page with cover image, badges, MDX body, WhatsApp CTA ✓ (Task 8)
- Spec required: PullQuote, Callout, PhotoGallery MDX components ✓ (Task 4)
- Spec required: Field Notes in navbar ✓ (Task 9)
- Spec required: static build via `generateStaticParams` ✓ (Task 8)
- Spec required: posts sorted by date descending ✓ (`lib/field-notes.ts` uses `.sort()` on ISO strings)
- gray-matter date parsing: handled by `normalizeDate()` in `lib/field-notes.ts` ✓
- No test framework exists in the project — verification is done via `tsc --noEmit`, dev server inspection, and `npm run build`
