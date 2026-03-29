import type { Metadata } from "next";
import Image from "next/image";
import Hero from "../components/Hero";
import ScrollReveal from "../components/ScrollReveal";
import WaveDivider from "../components/WaveDivider";

export const metadata: Metadata = {
  title: "Excursions — Dip Club Amsterdam",
  description:
    "Day and weekend trips beyond Amsterdam. Hiking, outdoor challenges, and exploring new terrain together every semester.",
};

export default function ExcursionsPage() {
  return (
    <>
      {/* Hero */}
      <Hero title="EXCURSIONS" subtitle="Beyond the city limits" badge="Every semester" />

      {/* Overview section 1 — Text left, Image right */}
      <section className="bg-offwhite py-24 lg:py-32">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-20">
            {/* Left: text */}
            <ScrollReveal className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-green mb-4">
                What to expect
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold leading-tight">
                Day and weekend trips to get out of Amsterdam
              </h2>
              <p className="mt-6 text-base leading-relaxed text-slate">
                Twice a year we organize an excursion beyond the city. These are day or
                weekend trips to nearby destinations — think the Ardennes, the Belgian
                coast, or the German countryside. We hike, swim, cook together, and
                explore terrain you won&apos;t find in the Vondelpark.
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate">
                Excursions are about getting out of your routine together. Short enough
                to fit into a busy schedule, long enough to feel like a real adventure.
              </p>
            </ScrollReveal>

            {/* Right: image */}
            <ScrollReveal delay={0.2} className="flex-1">
              <div className="relative h-[300px] sm:h-[400px] overflow-hidden rounded-sm">
                <Image
                  src="/media/dc-quarterly-excursion.JPG"
                  alt="Dip Club Amsterdam quarterly excursion"
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
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-green mb-4">
                The details
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold leading-tight">
                What an excursion looks like
              </h2>
              <ul className="mt-6 space-y-4">
                {[
                  "Duration: 1-2 days, usually a weekend",
                  "Destinations: Ardennes, Belgian coast, German countryside, and more",
                  "Group size: 10-15 people",
                  "What to bring: Hiking gear, sleeping bag (for overnights), an open mind",
                  "Cost: Shared expenses (transport, accommodation, food)",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-base text-slate">
                    <span className="h-2 w-2 flex-shrink-0 rounded-none bg-green" />
                    {item}
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            {/* Left: image */}
            <ScrollReveal delay={0.2} className="flex-1">
              <div className="relative h-[300px] sm:h-[400px] overflow-hidden rounded-sm">
                <Image
                  src="/media/Pascal Climbing Ardennes.JPG"
                  alt="Pascal climbing in the Ardennes"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Why it works — local appreciation */}
      <section className="bg-offwhite py-24 lg:py-32 border-t border-dark/5">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-20">
            <ScrollReveal className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-green mb-4">
                Why we explore close to home
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold leading-tight">
                Learning to see what&apos;s{" "}
                <span className="font-accent italic">already here</span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-slate">
                Most of us live surrounded by landscapes we&apos;ve never explored. The Netherlands and its neighbours hold centuries of natural beauty, cultural richness, and culinary traditions that reward anyone willing to slow down and pay attention.
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate">
                On excursions, we forage wild garlic in the Ardennes, swim in rivers most locals have forgotten about, eat at farms rather than restaurants, and learn the names of the trees we walk under. It&apos;s a practice of local appreciation — discovering that adventure doesn&apos;t require a long-haul flight, just a willingness to look closer at where you already are.
              </p>
            </ScrollReveal>
            <ScrollReveal className="flex-1" delay={0.1}>
              <div className="grid gap-px bg-dark/10 rounded-sm overflow-hidden border border-dark/10">
                {[
                  {
                    title: "Flora & Fauna",
                    text: "Learn to identify local plants, spot wildlife, and understand the ecosystems you walk through. Every trail tells a story if you know how to read it.",
                  },
                  {
                    title: "Local Cuisine",
                    text: "We cook with regional ingredients, eat at local farms, and discover food traditions rooted in the landscape. A meal tastes different when you understand where it came from.",
                  },
                  {
                    title: "Culture & Heritage",
                    text: "From medieval Wallonian villages to Dutch polders, each destination has layers of history. We explore places with curiosity, not just checkboxes.",
                  },
                ].map((item, i) => (
                  <ScrollReveal key={item.title} delay={0.1 + i * 0.08}>
                    <div className="bg-offwhite p-6">
                      <h3 className="font-heading text-sm font-extrabold uppercase tracking-wide">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate">
                        {item.text}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Photo gallery */}
      <section className="bg-offwhite py-24 lg:py-32">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <ScrollReveal>
            <h2 className="font-heading text-3xl font-extrabold mb-12">
              From our excursions
            </h2>
          </ScrollReveal>
          <div className="grid gap-4 sm:grid-cols-2">
            <ScrollReveal delay={0}>
              <div className="group relative aspect-[4/3] overflow-hidden rounded-sm">
                <Image
                  src="/media/IMG_4961.jpg"
                  alt="Excursion photo"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="group relative aspect-[4/3] overflow-hidden rounded-sm">
                <Image
                  src="/media/IMG_5026.jpg"
                  alt="Excursion group activity"
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
      <WaveDivider topColor="#e8e5e2" bottomColor="#f06530" />
      <section className="bg-terracotta py-24 lg:py-32 text-center">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <ScrollReveal>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              Join the next excursion
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base text-white/80">
              Sign up for our next trip or join the WhatsApp group to stay in the loop.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row sm:justify-center items-center gap-4">
              <a
                href="#"
                className="inline-block rounded-none bg-offwhite px-8 py-3.5 text-sm font-semibold text-dark hover:scale-[1.02] hover:bg-offwhite/90 transition-all"
              >
                Sign Up for Next Trip ↘
              </a>
              <a
                href="https://chat.whatsapp.com/Hgi483zWWtQ3XWt0dBnfnl"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-none border-2 border-white text-white px-8 py-3.5 text-sm font-semibold hover:bg-offwhite hover:text-dark transition-all"
              >
                Join WhatsApp
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
