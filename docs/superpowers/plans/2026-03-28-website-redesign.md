# Dip Club Website Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Dip Club Amsterdam website as a multi-page Next.js static site with terracotta/orange hero styling inspired by the Affogato Framer template, three activity pages (Dips, Excursions, Adventures), and shared layout.

**Architecture:** Next.js 16 App Router with static export. All content hardcoded in components. Tailwind CSS v4 for styling. Shared layout with Navbar and Footer. Reusable components for Hero, ActivityCard, StatsBar, WaveDivider, PhotoGrid, and ScrollReveal. Images served via `next/image` from `public/media/`.

**Tech Stack:** Next.js 16, TypeScript, Tailwind CSS v4, Vercel (static deploy)

---

## Task 1: Scaffold Next.js Project

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `tailwind.config.ts`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`
- Modify: `.gitignore`
- Move: `media/*` → `public/media/*`, `TAN-Tangkiwood-Regular.otf` → `public/fonts/TAN-Tangkiwood-Regular.otf`, `brand-assets/*` → `public/brand-assets/*`

- [ ] **Step 1: Initialize Next.js project**

Run from the project root. Since we're converting an existing repo, use `--yes` to accept defaults and we'll configure after:

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --yes
```

If it complains about existing files, we may need to initialize in a temp dir and move files. If it works, proceed.

- [ ] **Step 2: Configure next.config.ts for static export**

Replace `next.config.ts` with:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

Note: `images.unoptimized: true` is required for static export since there's no server to optimize images at runtime. Images are still served efficiently — they just won't be resized on-the-fly.

- [ ] **Step 3: Move static assets to public/**

```bash
mkdir -p public/media public/fonts public/brand-assets
cp media/*.{jpg,JPG,png,PNG,jpeg,JPEG} public/media/ 2>/dev/null || true
cp media/*.{svg,SVG} public/media/ 2>/dev/null || true
cp TAN-Tangkiwood-Regular.otf public/fonts/
cp brand-assets/*.{svg,SVG,PNG,png} public/brand-assets/ 2>/dev/null || true
```

- [ ] **Step 4: Update .gitignore**

Append to `.gitignore`:

```
# Next.js
.next/
out/
```

- [ ] **Step 5: Set up globals.css with Tailwind and custom fonts**

Replace `app/globals.css` with:

```css
@import "tailwindcss";

@theme {
  --color-terracotta: #E2725B;
  --color-terracotta-dark: #C9604B;
  --color-blue: #2e77d4;
  --color-blue-dark: #2563b8;
  --color-green: #4A7C59;
  --color-dark: #1A1A1A;
  --color-offwhite: #F5F3EF;
  --color-slate: #5A5A5A;
  --font-display: "TAN Tangkiwood", serif;
  --font-heading: "Inter", system-ui, sans-serif;
  --font-body: "DM Sans", system-ui, sans-serif;
  --font-accent: "Playfair Display", Georgia, serif;
}

@font-face {
  font-family: "TAN Tangkiwood";
  src: url("/fonts/TAN-Tangkiwood-Regular.otf") format("opentype");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-body);
  color: var(--color-dark);
  -webkit-font-smoothing: antialiased;
}
```

- [ ] **Step 6: Create minimal layout.tsx**

Replace `app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { DM_Sans, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["800"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dip Club Amsterdam — Seek Discomfort. Find Yourself.",
  description:
    "Amsterdam's urban wellness community. Ice baths, breathwork, and outdoor adventures. Join 200+ brave souls who chose discomfort over comfort.",
  openGraph: {
    title: "Dip Club Amsterdam — Seek Discomfort. Find Yourself.",
    description:
      "Amsterdam's urban wellness community. Ice baths, breathwork & outdoor adventures.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${inter.variable} ${playfair.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 7: Create placeholder homepage**

Replace `app/page.tsx` with:

```tsx
export default function Home() {
  return (
    <main>
      <div className="flex min-h-screen items-center justify-center bg-terracotta">
        <h1 className="font-display text-8xl text-white">DIP CLUB</h1>
      </div>
    </main>
  );
}
```

- [ ] **Step 8: Verify dev server runs**

```bash
npm run dev
```

Open `http://localhost:3000` — should see "DIP CLUB" in white on terracotta background. Stop the dev server after confirming.

- [ ] **Step 9: Verify static build works**

```bash
npm run build
```

Should produce an `out/` directory with static HTML files.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js project with Tailwind CSS and static export"
```

---

## Task 2: Shared Components — Navbar

**Files:**
- Create: `app/components/Navbar.tsx`
- Modify: `app/layout.tsx` (import and render Navbar)

- [ ] **Step 1: Create Navbar component**

Create `app/components/Navbar.tsx`:

```tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/dips", label: "Dips" },
  { href: "/excursions", label: "Excursions" },
  { href: "/adventures", label: "Adventures" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1320px] items-center justify-between px-6 py-5 lg:px-12">
        <Link href="/" aria-label="Dip Club Home">
          <Image
            src={
              scrolled
                ? "/brand-assets/dip-club-logo-blue.svg"
                : "/brand-assets/dipclub-logo-white.svg"
            }
            alt="Dip Club"
            width={48}
            height={48}
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  scrolled
                    ? "text-dark hover:text-terracotta"
                    : "text-white/90 hover:text-white"
                } ${pathname === link.href ? "border-b-2 border-current pb-0.5" : ""}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span
            className={`block h-0.5 w-6 transition-all duration-300 ${
              menuOpen
                ? "translate-y-2 rotate-45 bg-dark"
                : scrolled
                  ? "bg-dark"
                  : "bg-white"
            }`}
          />
          <span
            className={`block h-0.5 w-6 transition-all duration-300 ${
              menuOpen
                ? "opacity-0"
                : scrolled
                  ? "bg-dark"
                  : "bg-white"
            }`}
          />
          <span
            className={`block h-0.5 w-6 transition-all duration-300 ${
              menuOpen
                ? "-translate-y-2 -rotate-45 bg-dark"
                : scrolled
                  ? "bg-dark"
                  : "bg-white"
            }`}
          />
        </button>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 top-0 z-40 bg-white transition-opacity duration-300 md:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-full flex-col items-center justify-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-heading text-3xl font-extrabold transition-colors ${
                pathname === link.href ? "text-terracotta" : "text-dark"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://chat.whatsapp.com/Hgi483zWWtQ3XWt0dBnfnl"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 rounded-full bg-terracotta px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-terracotta-dark"
          >
            Join WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Add Navbar to layout.tsx**

In `app/layout.tsx`, import and render the Navbar inside `<body>`:

```tsx
import Navbar from "./components/Navbar";
```

Update the body content:

```tsx
<body>
  <Navbar />
  {children}
</body>
```

- [ ] **Step 3: Verify navbar renders**

Run `npm run dev`, check:
- Desktop: logo + 4 nav links visible, white text on terracotta
- Scrolling down: nav background becomes white, text becomes dark
- Mobile (resize < 768px): hamburger icon visible, tapping opens full-screen menu

- [ ] **Step 4: Commit**

```bash
git add app/components/Navbar.tsx app/layout.tsx
git commit -m "feat: add sticky Navbar with scroll transition and mobile menu"
```

---

## Task 3: Shared Components — Footer, WaveDivider, ScrollReveal

**Files:**
- Create: `app/components/Footer.tsx`, `app/components/WaveDivider.tsx`, `app/components/ScrollReveal.tsx`
- Modify: `app/layout.tsx` (add Footer)

- [ ] **Step 1: Create Footer component**

Create `app/components/Footer.tsx`:

```tsx
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/dips", label: "Dips" },
  { href: "/excursions", label: "Excursions" },
  { href: "/adventures", label: "Adventures" },
];

const socialLinks = [
  {
    href: "https://www.instagram.com/dipclub.ams/",
    label: "Instagram",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    href: "mailto:hello@dipclub.nl",
    label: "Email",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-dark text-white">
      <div className="mx-auto max-w-[1320px] px-6 py-16 lg:px-12">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          {/* Logo + tagline */}
          <div className="flex flex-col gap-4">
            <Image
              src="/brand-assets/dipclub-logo-white.svg"
              alt="Dip Club"
              width={48}
              height={48}
              className="h-10 w-auto"
            />
            <p className="max-w-xs text-sm text-white/60">
              Made with cold hands and warm hearts in Amsterdam
            </p>
          </div>

          {/* Nav links */}
          <nav>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact + social */}
          <div className="flex flex-col gap-4">
            <p className="text-sm font-semibold">Got a question?</p>
            <a
              href="mailto:hello@dipclub.nl"
              className="text-sm text-white/70 transition-colors hover:text-white"
            >
              hello@dipclub.nl
            </a>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={social.label}
                  className="text-white/60 transition-colors hover:text-white"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-white/10 pt-8 text-center text-xs text-white/40">
          &copy; {new Date().getFullYear()} Dip Club Amsterdam. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Create WaveDivider component**

Create `app/components/WaveDivider.tsx`:

```tsx
type WaveDividerProps = {
  topColor: string;
  bottomColor: string;
  variant?: "gentle" | "steep";
  flip?: boolean;
};

export default function WaveDivider({
  topColor,
  bottomColor,
  variant = "gentle",
  flip = false,
}: WaveDividerProps) {
  const path =
    variant === "gentle"
      ? "M0,64 C320,120 640,0 960,64 C1280,128 1600,20 1920,64 L1920,200 L0,200Z"
      : "M0,96 C240,160 480,0 720,80 C960,160 1200,20 1440,96 C1680,172 1920,60 1920,96 L1920,200 L0,200Z";

  return (
    <div
      className={`relative w-full overflow-hidden leading-[0] ${flip ? "rotate-180" : ""}`}
      style={{ backgroundColor: topColor }}
    >
      <svg
        viewBox="0 0 1920 200"
        preserveAspectRatio="none"
        className="block h-[60px] w-full md:h-[100px]"
      >
        <path d={path} fill={bottomColor} />
      </svg>
    </div>
  );
}
```

- [ ] **Step 3: Create ScrollReveal component**

Create `app/components/ScrollReveal.tsx`:

```tsx
"use client";

import { useEffect, useRef, type ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = `${delay}s`;
          el.classList.add("opacity-100", "translate-y-0");
          el.classList.remove("opacity-0", "translate-y-6");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`translate-y-6 opacity-0 transition-all duration-700 ease-out ${className}`}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 4: Add Footer to layout.tsx**

In `app/layout.tsx`, import Footer and render below `{children}`:

```tsx
import Footer from "./components/Footer";
```

Update body:

```tsx
<body>
  <Navbar />
  {children}
  <Footer />
</body>
```

- [ ] **Step 5: Verify components render**

Run `npm run dev`:
- Scroll to bottom — footer visible with logo, nav links, social icons, copyright
- Page structure: Navbar at top, content in middle, Footer at bottom

- [ ] **Step 6: Commit**

```bash
git add app/components/Footer.tsx app/components/WaveDivider.tsx app/components/ScrollReveal.tsx app/layout.tsx
git commit -m "feat: add Footer, WaveDivider, and ScrollReveal shared components"
```

---

## Task 4: Homepage — Hero Section

**Files:**
- Create: `app/components/Hero.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create reusable Hero component**

Create `app/components/Hero.tsx`:

```tsx
import Image from "next/image";

type HeroProps = {
  title: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  imageSrc?: string;
  imageAlt?: string;
  fullHeight?: boolean;
  badge?: string;
};

export default function Hero({
  title,
  subtitle,
  description,
  ctaText,
  ctaHref,
  imageSrc,
  imageAlt,
  fullHeight = false,
  badge,
}: HeroProps) {
  return (
    <section
      className={`relative flex items-end bg-terracotta ${
        fullHeight ? "min-h-screen" : "min-h-[60vh]"
      }`}
    >
      <div className="mx-auto w-full max-w-[1320px] px-6 pb-16 pt-32 lg:px-12 lg:pb-24">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
          {/* Text content */}
          <div className="flex max-w-2xl flex-col gap-6">
            <h1 className="font-display text-7xl leading-[0.9] text-white sm:text-8xl lg:text-[120px]">
              {title}
            </h1>
            {subtitle && (
              <p className="text-lg font-medium text-white/90 sm:text-xl">
                {subtitle}
              </p>
            )}
            {description && (
              <p className="max-w-md text-base text-white/70">{description}</p>
            )}
            {badge && (
              <span className="w-fit rounded-full bg-white/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white">
                {badge}
              </span>
            )}
            {ctaText && ctaHref && (
              <a
                href={ctaHref}
                target={ctaHref.startsWith("http") ? "_blank" : undefined}
                rel={ctaHref.startsWith("http") ? "noopener noreferrer" : undefined}
                className="mt-2 w-fit rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-dark transition-all hover:scale-[1.02] hover:bg-white/90"
              >
                {ctaText}
              </a>
            )}
          </div>

          {/* Featured image */}
          {imageSrc && (
            <div className="relative h-[280px] w-full overflow-hidden rounded-2xl sm:h-[340px] lg:h-[400px] lg:w-[440px] lg:flex-shrink-0">
              <Image
                src={imageSrc}
                alt={imageAlt || ""}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 440px"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Build homepage with Hero**

Replace `app/page.tsx`:

```tsx
import Hero from "./components/Hero";

export default function Home() {
  return (
    <main>
      <Hero
        title="DIP CLUB"
        subtitle="Seek Discomfort. Find Yourself."
        description="Amsterdam's urban wellness community. Ice baths, breathwork, and outdoor adventures for those who choose growth over comfort."
        ctaText="Join Our WhatsApp Community →"
        ctaHref="https://chat.whatsapp.com/Hgi483zWWtQ3XWt0dBnfnl"
        imageSrc="/media/dc-hero-image-website.png"
        imageAlt="Dip Club community members at an outdoor ice bath"
        fullHeight
      />
    </main>
  );
}
```

- [ ] **Step 3: Verify hero renders**

Run `npm run dev`:
- Full-viewport terracotta section with "DIP CLUB" in large display font
- Subtitle, description, CTA button visible
- Community photo on the right (desktop) / below text (mobile)
- Navbar overlays the hero with white text

- [ ] **Step 4: Commit**

```bash
git add app/components/Hero.tsx app/page.tsx
git commit -m "feat: add Hero component and homepage hero section"
```

---

## Task 5: Homepage — Intro and Activities Sections

**Files:**
- Create: `app/components/ActivityCard.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create ActivityCard component**

Create `app/components/ActivityCard.tsx`:

```tsx
import Image from "next/image";
import Link from "next/link";

type ActivityCardProps = {
  title: string;
  frequency: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
  accentColor?: string;
};

export default function ActivityCard({
  title,
  frequency,
  description,
  imageSrc,
  imageAlt,
  href,
  accentColor = "bg-terracotta",
}: ActivityCardProps) {
  return (
    <Link href={href} className="group block">
      <article className="overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-lg">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <div className="flex flex-col gap-3 p-6">
          <div className="flex items-center gap-3">
            <h3 className="font-heading text-xl font-extrabold uppercase tracking-wide">
              {title}
            </h3>
            <span
              className={`rounded-full px-3 py-0.5 text-xs font-semibold text-white ${accentColor}`}
            >
              {frequency}
            </span>
          </div>
          <p className="text-sm text-slate">{description}</p>
          <span className="mt-1 text-sm font-semibold text-terracotta transition-colors group-hover:text-terracotta-dark">
            Learn more &rarr;
          </span>
        </div>
      </article>
    </Link>
  );
}
```

- [ ] **Step 2: Add Intro and Activities sections to homepage**

In `app/page.tsx`, add below the Hero:

```tsx
import Hero from "./components/Hero";
import ActivityCard from "./components/ActivityCard";
import ScrollReveal from "./components/ScrollReveal";
import WaveDivider from "./components/WaveDivider";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Hero
        title="DIP CLUB"
        subtitle="Seek Discomfort. Find Yourself."
        description="Amsterdam's urban wellness community. Ice baths, breathwork, and outdoor adventures for those who choose growth over comfort."
        ctaText="Join Our WhatsApp Community →"
        ctaHref="https://chat.whatsapp.com/Hgi483zWWtQ3XWt0dBnfnl"
        imageSrc="/media/dc-hero-image-website.png"
        imageAlt="Dip Club community members at an outdoor ice bath"
        fullHeight
      />

      {/* Intro Section */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-20">
            <ScrollReveal className="flex-1">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-terracotta">
                Begin Your Journey
              </p>
              <h2 className="font-heading text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                Explore the wonders of{" "}
                <span className="font-accent italic">discomfort</span>
              </h2>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-slate">
                Dip Club Amsterdam is an urban wellness community that brings together people who believe growth starts where comfort ends. From monthly ice baths in local waterways to multi-day adventures across Europe — we create experiences that challenge, connect, and transform.
              </p>
            </ScrollReveal>
            <ScrollReveal className="flex-1" delay={0.2}>
              <div className="relative h-[300px] overflow-hidden rounded-2xl sm:h-[400px]">
                <Image
                  src="/media/dc-polaroid-5-amsterdam-dip-spot.jpg"
                  alt="Dip Club members at an Amsterdam swimming spot"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="bg-offwhite py-24 lg:py-32">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <ScrollReveal>
            <h2 className="mb-12 font-heading text-3xl font-extrabold sm:text-4xl lg:text-5xl">
              Our Activities
            </h2>
          </ScrollReveal>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <ScrollReveal delay={0.1}>
              <ActivityCard
                title="Dips"
                frequency="Monthly"
                description="Ice baths and breathwork at local Amsterdam spots. A few hours of cold, community, and post-dip coffee."
                imageSrc="/media/dc-biweekly-dip.jpg"
                imageAlt="Community members during a cold water dip in Amsterdam"
                href="/dips"
                accentColor="bg-blue"
              />
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <ActivityCard
                title="Excursions"
                frequency="Every Semester"
                description="Day and weekend trips beyond Amsterdam. Hiking, outdoor challenges, and exploring new terrain together."
                imageSrc="/media/dc-quarterly-excursion.JPG"
                imageAlt="Dip Club group on a hiking excursion"
                href="/excursions"
                accentColor="bg-green"
              />
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <ActivityCard
                title="Adventures"
                frequency="Once a Year"
                description="Multi-day international trips across Europe. Up to 12 days of intensive hiking, bonding, and unforgettable experiences."
                imageSrc="/media/dc-annual-adventure-2.JPG"
                imageAlt="Dip Club adventure trip in the mountains"
                href="/adventures"
                accentColor="bg-terracotta"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 3: Verify sections render**

Run `npm run dev`:
- Below hero: white intro section with text left, photo right
- Below intro: off-white section with 3 activity cards in a grid
- Cards show images, titles, frequency badges, descriptions
- Cards are clickable (links to /dips, /excursions, /adventures — will 404 for now, that's fine)
- Scroll reveal animations trigger on scroll

- [ ] **Step 4: Commit**

```bash
git add app/components/ActivityCard.tsx app/page.tsx
git commit -m "feat: add homepage Intro and Activities sections with activity cards"
```

---

## Task 6: Homepage — Stats, Community, Contact Sections

**Files:**
- Create: `app/components/StatsBar.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create StatsBar component**

Create `app/components/StatsBar.tsx`:

```tsx
import ScrollReveal from "./ScrollReveal";

type Stat = {
  value: string;
  label: string;
};

type StatsBarProps = {
  stats: Stat[];
};

export default function StatsBar({ stats }: StatsBarProps) {
  return (
    <section className="bg-terracotta py-16 lg:py-20">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
        <div className="grid grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1} className="text-center">
              <p className="font-heading text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">
                {stat.value}
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-white/70">
                {stat.label}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add Stats, Community, and Contact sections to homepage**

In `app/page.tsx`, add these sections after the Activities section (before closing `</main>`):

```tsx
      {/* Wave divider: offwhite → terracotta */}
      <WaveDivider topColor="#F5F3EF" bottomColor="#E2725B" />

      {/* Stats */}
      <StatsBar
        stats={[
          { value: "200+", label: "Members" },
          { value: "50+", label: "Events" },
          { value: "3", label: "Countries" },
        ]}
      />

      {/* Wave divider: terracotta → white */}
      <WaveDivider topColor="#E2725B" bottomColor="#FFFFFF" />

      {/* Community Section */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <ScrollReveal>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-terracotta">
              Exploring together
            </p>
            <h2 className="mb-12 font-heading text-3xl font-extrabold sm:text-4xl">
              Stories from our recent trips
            </h2>
          </ScrollReveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <ScrollReveal delay={0.1}>
              <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src="/media/dc-polaroid-2-dolomites-hike.jpg"
                  alt="Dip Club hiking in the Dolomites"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src="/media/dc-polaroid-1-amstel-dip.JPG"
                  alt="Ice dip at the Amstel river"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src="/media/dc-polaroid-3-south-africa-hike.jpg"
                  alt="Dip Club adventure in South Africa"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </ScrollReveal>
          </div>
          {/* Social links */}
          <div className="mt-12 flex items-center gap-4">
            <a
              href="https://www.instagram.com/dipclub.ams/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-dark/20 px-4 py-2 text-sm font-medium transition-colors hover:bg-dark hover:text-white"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              Instagram
            </a>
          </div>
        </div>
      </section>

      {/* Contact Card Section */}
      <section className="bg-offwhite py-24 lg:py-32">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-12">
            <ScrollReveal className="flex-1">
              <div className="flex h-full flex-col justify-center rounded-2xl border border-dark/10 bg-white p-8 lg:p-12">
                <h3 className="font-heading text-2xl font-extrabold sm:text-3xl">
                  Contact
                </h3>
                <p className="mt-4 text-base text-slate">
                  Got a question?<br />
                  Don&apos;t hesitate to ask us.
                </p>
                <a
                  href="mailto:hello@dipclub.nl"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-terracotta transition-colors hover:text-terracotta-dark"
                >
                  hello@dipclub.nl
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17l10-10M7 7h10v10" />
                  </svg>
                </a>
              </div>
            </ScrollReveal>
            <ScrollReveal className="flex-1" delay={0.15}>
              <div className="flex h-full flex-col justify-center rounded-2xl bg-terracotta p-8 text-white lg:p-12">
                <h3 className="font-heading text-2xl font-extrabold sm:text-3xl">
                  Join the community
                </h3>
                <p className="mt-4 text-base text-white/80">
                  Be the first to know about upcoming dips, excursions, and adventures.
                </p>
                <a
                  href="https://chat.whatsapp.com/Hgi483zWWtQ3XWt0dBnfnl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 w-fit rounded-full bg-white px-8 py-3 text-sm font-semibold text-dark transition-all hover:scale-[1.02] hover:bg-white/90"
                >
                  Join WhatsApp →
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
```

Also update imports at the top of `app/page.tsx` to include `StatsBar`:

```tsx
import StatsBar from "./components/StatsBar";
```

- [ ] **Step 3: Verify full homepage**

Run `npm run dev`. Scroll through:
1. Hero (terracotta, "DIP CLUB", photo)
2. Intro (white, text + photo)
3. Activities (off-white, 3 cards)
4. Wave divider → Stats bar (terracotta, 3 numbers)
5. Wave divider → Community (white, 3 photos, Instagram link)
6. Contact section (off-white, two cards side by side)
7. Footer (dark)

- [ ] **Step 4: Commit**

```bash
git add app/components/StatsBar.tsx app/page.tsx
git commit -m "feat: add Stats, Community, and Contact sections to homepage"
```

---

## Task 7: Activity Page — Dips

**Files:**
- Create: `app/dips/page.tsx`

- [ ] **Step 1: Create the Dips page**

Create `app/dips/page.tsx`:

```tsx
import type { Metadata } from "next";
import Hero from "../components/Hero";
import ScrollReveal from "../components/ScrollReveal";
import WaveDivider from "../components/WaveDivider";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Dips — Dip Club Amsterdam",
  description:
    "Monthly ice baths and breathwork sessions at local Amsterdam spots. Open to everyone, all levels welcome.",
};

export default function DipsPage() {
  return (
    <main>
      <Hero
        title="DIPS"
        subtitle="Cold water, warm community"
        badge="Every month"
      />

      {/* Overview: Text left, Image right */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-20">
            <ScrollReveal className="flex-1">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-blue">
                What to expect
              </p>
              <h2 className="font-heading text-3xl font-extrabold leading-tight sm:text-4xl">
                Ice baths and breathwork in the heart of Amsterdam
              </h2>
              <p className="mt-6 text-base leading-relaxed text-slate">
                Every month we gather at one of Amsterdam&apos;s local waterways for an ice bath session. We start with guided breathwork to prepare your body and mind, then take the plunge together. Afterwards, we warm up with hot drinks and good conversation. It&apos;s a few hours of your morning that will shift your entire week.
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate">
                No experience needed. First-timers are always welcome and we&apos;ll guide you through everything. The cold is the easy part — showing up is the hard part.
              </p>
            </ScrollReveal>
            <ScrollReveal className="flex-1" delay={0.2}>
              <div className="relative h-[300px] overflow-hidden rounded-2xl sm:h-[400px]">
                <Image
                  src="/media/dc-biweekly-dip.jpg"
                  alt="Community members during a cold water dip"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Overview: Image left, Text right */}
      <section className="bg-offwhite py-24 lg:py-32">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <div className="flex flex-col gap-12 lg:flex-row-reverse lg:items-center lg:gap-20">
            <ScrollReveal className="flex-1">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-blue">
                The details
              </p>
              <h2 className="font-heading text-3xl font-extrabold leading-tight sm:text-4xl">
                A typical dip session
              </h2>
              <ul className="mt-6 flex flex-col gap-4 text-base text-slate">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-blue" />
                  <span><strong>Duration:</strong> 2-3 hours on a Saturday or Sunday morning</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-blue" />
                  <span><strong>Location:</strong> Rotating Amsterdam waterways and swimming spots</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-blue" />
                  <span><strong>Group size:</strong> 10-20 people per session</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-blue" />
                  <span><strong>What to bring:</strong> Swimwear, towel, warm clothes for after</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-blue" />
                  <span><strong>Cost:</strong> Free — just show up</span>
                </li>
              </ul>
            </ScrollReveal>
            <ScrollReveal className="flex-1" delay={0.2}>
              <div className="relative h-[300px] overflow-hidden rounded-2xl sm:h-[400px]">
                <Image
                  src="/media/dc-polaroid-5-amsterdam-dip-spot.jpg"
                  alt="Amsterdam swimming spot used for dips"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Photo gallery */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <ScrollReveal>
            <h2 className="mb-12 font-heading text-3xl font-extrabold">
              From our dips
            </h2>
          </ScrollReveal>
          <div className="grid gap-4 sm:grid-cols-2">
            <ScrollReveal delay={0.1}>
              <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src="/media/dc-polaroid-1-amstel-dip.JPG"
                  alt="Ice dip at the Amstel river"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src="/media/IMG_2377.jpg"
                  alt="Dip Club members after a cold water session"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <WaveDivider topColor="#FFFFFF" bottomColor="#E2725B" />
      <section className="bg-terracotta py-24 lg:py-32">
        <div className="mx-auto max-w-[1320px] px-6 text-center lg:px-12">
          <ScrollReveal>
            <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              Ready for your first dip?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base text-white/80">
              Join our WhatsApp group to hear about the next session. We&apos;ll see you in the water.
            </p>
            <a
              href="https://chat.whatsapp.com/Hgi483zWWtQ3XWt0dBnfnl"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-dark transition-all hover:scale-[1.02] hover:bg-white/90"
            >
              Join WhatsApp Community →
            </a>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 2: Verify the Dips page**

Run `npm run dev`, navigate to `http://localhost:3000/dips`:
- Half-height hero with "DIPS" and "Every month" badge
- Two alternating text/image sections
- Photo gallery
- CTA section with wave divider and WhatsApp link

- [ ] **Step 3: Commit**

```bash
git add app/dips/page.tsx
git commit -m "feat: add Dips activity page"
```

---

## Task 8: Activity Page — Excursions

**Files:**
- Create: `app/excursions/page.tsx`

- [ ] **Step 1: Create the Excursions page**

Create `app/excursions/page.tsx`:

```tsx
import type { Metadata } from "next";
import Hero from "../components/Hero";
import ScrollReveal from "../components/ScrollReveal";
import WaveDivider from "../components/WaveDivider";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Excursions — Dip Club Amsterdam",
  description:
    "Day and weekend trips beyond Amsterdam. Hiking, outdoor challenges, and exploring new terrain together every semester.",
};

export default function ExcursionsPage() {
  return (
    <main>
      <Hero
        title="EXCURSIONS"
        subtitle="Beyond the city limits"
        badge="Every semester"
      />

      {/* Overview: Text left, Image right */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-20">
            <ScrollReveal className="flex-1">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-green">
                What to expect
              </p>
              <h2 className="font-heading text-3xl font-extrabold leading-tight sm:text-4xl">
                Day and weekend trips to get out of Amsterdam
              </h2>
              <p className="mt-6 text-base leading-relaxed text-slate">
                Twice a year we organize an excursion beyond the city. These are day or weekend trips to nearby destinations — think the Ardennes, the Belgian coast, or the German countryside. We hike, swim, cook together, and explore terrain you won&apos;t find in the Vondelpark.
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate">
                Excursions are about getting out of your routine together. Short enough to fit into a busy schedule, long enough to feel like a real adventure.
              </p>
            </ScrollReveal>
            <ScrollReveal className="flex-1" delay={0.2}>
              <div className="relative h-[300px] overflow-hidden rounded-2xl sm:h-[400px]">
                <Image
                  src="/media/dc-quarterly-excursion.JPG"
                  alt="Dip Club group on a hiking excursion"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Overview: Image left, Text right */}
      <section className="bg-offwhite py-24 lg:py-32">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <div className="flex flex-col gap-12 lg:flex-row-reverse lg:items-center lg:gap-20">
            <ScrollReveal className="flex-1">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-green">
                The details
              </p>
              <h2 className="font-heading text-3xl font-extrabold leading-tight sm:text-4xl">
                What an excursion looks like
              </h2>
              <ul className="mt-6 flex flex-col gap-4 text-base text-slate">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-green" />
                  <span><strong>Duration:</strong> 1-2 days, usually a weekend</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-green" />
                  <span><strong>Destinations:</strong> Ardennes, Belgian coast, German countryside, and more</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-green" />
                  <span><strong>Group size:</strong> 10-15 people</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-green" />
                  <span><strong>What to bring:</strong> Hiking gear, sleeping bag (for overnights), an open mind</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-green" />
                  <span><strong>Cost:</strong> Shared expenses (transport, accommodation, food)</span>
                </li>
              </ul>
            </ScrollReveal>
            <ScrollReveal className="flex-1" delay={0.2}>
              <div className="relative h-[300px] overflow-hidden rounded-2xl sm:h-[400px]">
                <Image
                  src="/media/Pascal Climbing Ardennes.JPG"
                  alt="Climbing in the Ardennes"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Photo gallery */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <ScrollReveal>
            <h2 className="mb-12 font-heading text-3xl font-extrabold">
              From our excursions
            </h2>
          </ScrollReveal>
          <div className="grid gap-4 sm:grid-cols-2">
            <ScrollReveal delay={0.1}>
              <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src="/media/IMG_4961.jpg"
                  alt="Dip Club on an outdoor excursion"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src="/media/IMG_5026.jpg"
                  alt="Group hiking during an excursion"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <WaveDivider topColor="#FFFFFF" bottomColor="#E2725B" />
      <section className="bg-terracotta py-24 lg:py-32">
        <div className="mx-auto max-w-[1320px] px-6 text-center lg:px-12">
          <ScrollReveal>
            <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              Join the next excursion
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base text-white/80">
              Sign up for our next trip or join the WhatsApp group to stay in the loop.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="#"
                className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-dark transition-all hover:scale-[1.02] hover:bg-white/90"
              >
                Sign Up for Next Trip →
              </a>
              <a
                href="https://chat.whatsapp.com/Hgi483zWWtQ3XWt0dBnfnl"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border-2 border-white px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-white hover:text-dark"
              >
                Join WhatsApp
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 2: Verify the Excursions page**

Run `npm run dev`, navigate to `http://localhost:3000/excursions`:
- Half-height hero with "EXCURSIONS" and green "Every semester" badge
- Two alternating sections with green accent dots
- Photo gallery
- CTA with dual buttons (signup + WhatsApp)

- [ ] **Step 3: Commit**

```bash
git add app/excursions/page.tsx
git commit -m "feat: add Excursions activity page"
```

---

## Task 9: Activity Page — Adventures

**Files:**
- Create: `app/adventures/page.tsx`

- [ ] **Step 1: Create the Adventures page**

Create `app/adventures/page.tsx`:

```tsx
import type { Metadata } from "next";
import Hero from "../components/Hero";
import ScrollReveal from "../components/ScrollReveal";
import WaveDivider from "../components/WaveDivider";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Adventures — Dip Club Amsterdam",
  description:
    "Once-a-year multi-day international trips across Europe. Up to 12 days of intensive hiking, bonding, and unforgettable experiences.",
};

export default function AdventuresPage() {
  return (
    <main>
      <Hero
        title="ADVENTURES"
        subtitle="The flagship experience"
        badge="Once a year"
      />

      {/* Overview: Text left, Image right */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-20">
            <ScrollReveal className="flex-1">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-terracotta">
                What to expect
              </p>
              <h2 className="font-heading text-3xl font-extrabold leading-tight sm:text-4xl">
                Multi-day trips that push your limits
              </h2>
              <p className="mt-6 text-base leading-relaxed text-slate">
                Once a year, we go big. The annual Dip Club adventure is a multi-day international trip — up to 12 days of intensive hiking, wild swimming, and shared experiences in some of Europe&apos;s most stunning landscapes. Past adventures have taken us through the Dolomites and to the coast of South Africa.
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate">
                This is where the deepest bonds are formed. You&apos;ll return home exhausted, inspired, and with a group of people who now feel like family.
              </p>
            </ScrollReveal>
            <ScrollReveal className="flex-1" delay={0.2}>
              <div className="relative h-[300px] overflow-hidden rounded-2xl sm:h-[400px]">
                <Image
                  src="/media/dc-annual-adventure-2.JPG"
                  alt="Dip Club adventure trip in the mountains"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Overview: Image left, Text right */}
      <section className="bg-offwhite py-24 lg:py-32">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <div className="flex flex-col gap-12 lg:flex-row-reverse lg:items-center lg:gap-20">
            <ScrollReveal className="flex-1">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-terracotta">
                The details
              </p>
              <h2 className="font-heading text-3xl font-extrabold leading-tight sm:text-4xl">
                What an adventure looks like
              </h2>
              <ul className="mt-6 flex flex-col gap-4 text-base text-slate">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-terracotta" />
                  <span><strong>Duration:</strong> 7-12 days</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-terracotta" />
                  <span><strong>Destinations:</strong> European mountain ranges, coastal trails, wild landscapes</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-terracotta" />
                  <span><strong>Group size:</strong> 8-12 people</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-terracotta" />
                  <span><strong>What to bring:</strong> Hiking boots, backpack, camping gear (full packing list provided)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-terracotta" />
                  <span><strong>Cost:</strong> Shared expenses — typically includes flights, accommodation, and food</span>
                </li>
              </ul>
            </ScrollReveal>
            <ScrollReveal className="flex-1" delay={0.2}>
              <div className="relative h-[300px] overflow-hidden rounded-2xl sm:h-[400px]">
                <Image
                  src="/media/dc-polaroid-4-dolomites-hike.jpg"
                  alt="Hiking in the Dolomites"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Photo gallery */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <ScrollReveal>
            <h2 className="mb-12 font-heading text-3xl font-extrabold">
              From our adventures
            </h2>
          </ScrollReveal>
          <div className="grid gap-4 sm:grid-cols-3">
            <ScrollReveal delay={0.1}>
              <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src="/media/dc-polaroid-2-dolomites-hike.jpg"
                  alt="Group hiking in the Dolomites"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src="/media/dc-polaroid-3-south-africa-hike.jpg"
                  alt="Adventure in South Africa"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src="/media/IMG_6342.jpg"
                  alt="Mountain landscape from a Dip Club adventure"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <WaveDivider topColor="#FFFFFF" bottomColor="#E2725B" />
      <section className="bg-terracotta py-24 lg:py-32">
        <div className="mx-auto max-w-[1320px] px-6 text-center lg:px-12">
          <ScrollReveal>
            <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              Ready for the adventure of a lifetime?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base text-white/80">
              Sign up for the next trip or join our community to be the first to know when registrations open.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="#"
                className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-dark transition-all hover:scale-[1.02] hover:bg-white/90"
              >
                Sign Up for Next Adventure →
              </a>
              <a
                href="https://chat.whatsapp.com/Hgi483zWWtQ3XWt0dBnfnl"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border-2 border-white px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-white hover:text-dark"
              >
                Join WhatsApp
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 2: Verify the Adventures page**

Run `npm run dev`, navigate to `http://localhost:3000/adventures`:
- Half-height hero with "ADVENTURES" and terracotta "Once a year" badge
- Two alternating sections with terracotta accent dots
- 3-column photo gallery
- CTA with dual buttons

- [ ] **Step 3: Commit**

```bash
git add app/adventures/page.tsx
git commit -m "feat: add Adventures activity page"
```

---

## Task 10: Final Polish — Static Build and Cleanup

**Files:**
- Modify: `.gitignore`
- Delete: `index.html` (old site), `styleguide.md` (replaced by Tailwind config), `claude.md` (superseded by CLAUDE.md)

- [ ] **Step 1: Remove old site files**

The old `index.html`, `styleguide.md`, and `claude.md` are replaced by the new Next.js app. Remove them:

```bash
git rm index.html
git rm styleguide.md
git rm claude.md
```

- [ ] **Step 2: Update .gitignore for Next.js**

Ensure `.gitignore` contains:

```
node_modules/
.DS_Store
.env.local
.vercel
.next/
out/
```

- [ ] **Step 3: Verify static build**

```bash
npm run build
```

Should produce `out/` directory with:
- `out/index.html` (homepage)
- `out/dips/index.html`
- `out/excursions/index.html`
- `out/adventures/index.html`
- Static assets copied

- [ ] **Step 4: Verify all pages work**

Run `npm run dev` and check all 4 pages:
- `http://localhost:3000/` — homepage with all sections
- `http://localhost:3000/dips` — dips activity page
- `http://localhost:3000/excursions` — excursions page
- `http://localhost:3000/adventures` — adventures page

Check on both desktop and mobile viewport sizes. Verify:
- Navbar works (scroll transition, mobile menu, active state)
- All images load
- Scroll animations trigger
- Wave dividers render correctly
- Footer renders on all pages
- All links work (WhatsApp opens in new tab, internal links navigate)

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: remove old site files, finalize Next.js static build"
```

- [ ] **Step 6: Update CLAUDE.md**

Update the CLAUDE.md to reflect the new tech stack. Key changes:
- Tech stack: Next.js 16, TypeScript, Tailwind CSS v4
- Route structure: 4 pages (home, dips, excursions, adventures)
- Remove references to "single-page" and "vanilla HTML/CSS/JS"
- Keep brand identity, external links, and success criteria sections

```bash
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md for Next.js redesign"
```
