import type { Metadata } from "next";
import Image from "next/image";
import Hero from "../components/Hero";
import ScrollReveal from "../components/ScrollReveal";
import WaveDivider from "../components/WaveDivider";

export const metadata: Metadata = {
  title: "Dips — Dip Club Amsterdam",
  description:
    "Monthly ice baths and breathwork sessions at local Amsterdam spots. Open to everyone, all levels welcome.",
};

export default function DipsPage() {
  return (
    <>
      {/* Hero */}
      <Hero title="DIPS" subtitle="Cold water, warm community" badge="Every month" />

      {/* Overview section 1 — Text left, Image right */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-20">
            {/* Left: text */}
            <ScrollReveal className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-blue mb-4">
                What to expect
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold leading-tight">
                Ice baths and breathwork in the heart of Amsterdam
              </h2>
              <p className="mt-6 text-base leading-relaxed text-slate">
                Every month we gather at one of Amsterdam&apos;s local waterways for an
                ice bath session. We start with guided breathwork to prepare your body
                and mind, then take the plunge together. Afterwards, we warm up with hot
                drinks and good conversation. It&apos;s a few hours of your morning that
                will shift your entire week.
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate">
                No experience needed. First-timers are always welcome and we&apos;ll guide
                you through everything. The cold is the easy part — showing up is the
                hard part.
              </p>
            </ScrollReveal>

            {/* Right: image */}
            <ScrollReveal delay={0.2} className="flex-1">
              <div className="relative h-[300px] sm:h-[400px] overflow-hidden rounded-2xl">
                <Image
                  src="/media/dc-biweekly-dip.jpg"
                  alt="Dip Club Amsterdam group ice bath session"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Overview section 2 — Image left, Text right */}
      <section className="bg-offwhite py-24 lg:py-32">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <div className="flex flex-col gap-12 lg:flex-row-reverse lg:items-center lg:gap-20">
            {/* Right: text (rendered first in DOM, flex-row-reverse visually puts it right) */}
            <ScrollReveal className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-blue mb-4">
                The details
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold leading-tight">
                A typical dip session
              </h2>
              <ul className="mt-6 space-y-4">
                {[
                  "Duration: 2-3 hours on a Saturday or Sunday morning",
                  "Location: Rotating Amsterdam waterways and swimming spots",
                  "Group size: 10-20 people per session",
                  "What to bring: Swimwear, towel, warm clothes for after",
                  "Cost: Free — just show up",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-base text-slate">
                    <span className="h-2 w-2 flex-shrink-0 rounded-full bg-blue" />
                    {item}
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            {/* Left: image */}
            <ScrollReveal delay={0.2} className="flex-1">
              <div className="relative h-[300px] sm:h-[400px] overflow-hidden rounded-2xl">
                <Image
                  src="/media/dc-polaroid-5-amsterdam-dip-spot.jpg"
                  alt="Amsterdam dip spot"
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
            <h2 className="font-heading text-3xl font-extrabold mb-12">
              From our dips
            </h2>
          </ScrollReveal>
          <div className="grid gap-4 sm:grid-cols-2">
            <ScrollReveal delay={0}>
              <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src="/media/dc-polaroid-1-amstel-dip.JPG"
                  alt="Amstel dip session"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src="/media/IMG_2377.jpg"
                  alt="Dip Club community gathering"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <WaveDivider topColor="#FFFFFF" bottomColor="#E2725B" />
      <section className="bg-terracotta py-24 lg:py-32 text-center">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <ScrollReveal>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              Ready for your first dip?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base text-white/80">
              Join our WhatsApp group to hear about the next session. We&apos;ll see you
              in the water.
            </p>
            <a
              href="https://chat.whatsapp.com/Hgi483zWWtQ3XWt0dBnfnl"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-dark hover:scale-[1.02] hover:bg-white/90 transition-all"
            >
              Join WhatsApp Community →
            </a>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
