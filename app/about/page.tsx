import type { Metadata } from "next";
import Image from "next/image";
import Hero from "../components/Hero";
import ScrollReveal from "../components/ScrollReveal";

export const metadata: Metadata = {
  title: "About — Dip Club Amsterdam",
  description:
    "How Dip Club Amsterdam started, who we are, and why we believe discomfort is the door to real connection.",
};

export default function AboutPage() {
  return (
    <main>
      <Hero title="ABOUT US" subtitle="How it started. Where it&apos;s going." />

      {/* Origin story */}
      <section className="bg-offwhite py-24 lg:py-32">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-20">
            <ScrollReveal className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-terracotta mb-4">
                The beginning
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold leading-tight">
                It started with a cold swim and a question
              </h2>
              <p className="mt-6 text-base leading-relaxed text-slate">
                In the winter of 2022, a small group of friends in Amsterdam started meeting
                at the Amstel river to swim in the cold. No breathwork certifications, no
                wellness brand — just a shared curiosity about what happens when you
                voluntarily step into discomfort with people you trust.
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate">
                The question was simple: what if the things that make us uncomfortable are
                actually the things that bring us closer together? Cold water. Long hikes.
                Sleeping outside. Cooking a meal with strangers. The answer turned out to be
                Dip Club.
              </p>
            </ScrollReveal>
            <ScrollReveal className="flex-1" delay={0.2}>
              <div className="relative h-[300px] sm:h-[400px] overflow-hidden rounded-sm">
                <Image
                  src="/media/dc-polaroid-1-amstel-dip.JPG"
                  alt="The first Dip Club swim at the Amstel"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Growth */}
      <section className="bg-offwhite py-24 lg:py-32 border-t border-dark/5">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <div className="flex flex-col gap-12 lg:flex-row-reverse lg:items-center lg:gap-20">
            <ScrollReveal className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-terracotta mb-4">
                What it became
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold leading-tight">
                From a few friends to a community of 200+
              </h2>
              <p className="mt-6 text-base leading-relaxed text-slate">
                Word spread the way real things do — through experience. Someone came to a
                dip, told a friend, and that friend brought two more. Within a year we had
                monthly dips, semester excursions to the Ardennes and the Belgian coast, and
                our first annual adventure — a 12-day hike through the Dolomites.
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate">
                Today, Dip Club is a community of over 200 people in Amsterdam. Entrepreneurs,
                designers, teachers, developers, chefs, students. What they share is not a
                demographic but a disposition: curiosity about the world, willingness to be
                uncomfortable, and a belief that the best moments happen outside of routine.
              </p>
            </ScrollReveal>
            <ScrollReveal className="flex-1" delay={0.2}>
              <div className="relative h-[300px] sm:h-[400px] overflow-hidden rounded-sm">
                <Image
                  src="/media/dc-polaroid-2-dolomites-hike.jpg"
                  alt="Dip Club community hiking together"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Who joins */}
      <section className="bg-offwhite py-24 lg:py-32 border-t border-dark/5">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-terracotta mb-4">
              Who we are
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold leading-tight mb-12">
              Not a fitness club. Not a wellness brand.
            </h2>
          </ScrollReveal>
          <div className="grid gap-px bg-dark/10 sm:grid-cols-3 rounded-sm overflow-hidden border border-dark/10">
            <ScrollReveal delay={0}>
              <div className="bg-offwhite p-6 lg:p-8 h-full">
                <h3 className="font-heading text-base font-extrabold uppercase tracking-wide">
                  No Prerequisites
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate">
                  You don&apos;t need to be fit, experienced, or brave. You need to be
                  willing to try something that makes you slightly nervous. That&apos;s
                  the only entry requirement.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.08}>
              <div className="bg-offwhite p-6 lg:p-8 h-full">
                <h3 className="font-heading text-base font-extrabold uppercase tracking-wide">
                  All Backgrounds
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate">
                  Our members come from everywhere — different countries, professions, and
                  walks of life. The cold water is the great equalizer. In the Amstel, nobody
                  cares what you do for a living.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.16}>
              <div className="bg-offwhite p-6 lg:p-8 h-full">
                <h3 className="font-heading text-base font-extrabold uppercase tracking-wide">
                  Real Connection
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate">
                  This isn&apos;t networking with a wellness veneer. The friendships that
                  form here are forged through shared experience — cold water, long trails,
                  honest conversations. That&apos;s the kind that lasts.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-terracotta py-24 lg:py-32 text-center">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <ScrollReveal>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
              Come find out for yourself
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base text-white/80">
              Join our WhatsApp community to hear about the next dip, excursion, or adventure.
            </p>
            <a
              href="https://chat.whatsapp.com/Hgi483zWWtQ3XWt0dBnfnl"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block rounded-none bg-offwhite px-8 py-3.5 text-sm font-semibold text-dark hover:scale-[1.02] hover:bg-offwhite/90 transition-all"
            >
              Join WhatsApp Community ↘
            </a>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
