import Hero from "./components/Hero";
import ActivityCard from "./components/ActivityCard";
import ScrollReveal from "./components/ScrollReveal";
import StatsBar from "./components/StatsBar";
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

      {/* Wave: offwhite → terracotta */}
      <WaveDivider topColor="#F5F3EF" bottomColor="#E2725B" />

      {/* Stats Bar */}
      <StatsBar stats={[
        { value: "200+", label: "Members" },
        { value: "50+", label: "Events" },
        { value: "3", label: "Countries" },
      ]} />

      {/* Wave: terracotta → white */}
      <WaveDivider topColor="#E2725B" bottomColor="#FFFFFF" />

      {/* Community Section */}
      <section className="bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-terracotta mb-2">
              Exploring together
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold mb-12">
              Stories from our recent trips
            </h2>
          </ScrollReveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <ScrollReveal delay={0.1}>
              <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src="/media/dc-polaroid-2-dolomites-hike.jpg"
                  alt="Dip Club members hiking in the Dolomites"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src="/media/dc-polaroid-1-amstel-dip.JPG"
                  alt="Dip Club members at an Amstel dip"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src="/media/dc-polaroid-3-south-africa-hike.jpg"
                  alt="Dip Club members hiking in South Africa"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </ScrollReveal>
          </div>
          <div className="mt-12">
            <a
              href="https://www.instagram.com/dipclub.ams/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-dark/20 px-4 py-2 text-sm font-medium hover:bg-dark hover:text-white transition-colors"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              @dipclub.ams
            </a>
          </div>
        </div>
      </section>

      {/* Contact Card Section */}
      <section className="bg-offwhite py-24 lg:py-32">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-12">
            {/* Card 1: Contact */}
            <ScrollReveal className="flex-1">
              <div className="h-full flex flex-col justify-center rounded-2xl border border-dark/10 bg-white p-8 lg:p-12">
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold">Contact</h2>
                <p className="mt-4 text-base text-slate">
                  Got a question?{"\n"}Don&apos;t hesitate to ask us.
                </p>
                <a
                  href="mailto:hello@dipclub.nl"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-terracotta hover:text-terracotta-dark"
                >
                  hello@dipclub.nl
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M7 17l10-10M7 7h10v10" />
                  </svg>
                </a>
              </div>
            </ScrollReveal>
            {/* Card 2: Join the community */}
            <ScrollReveal className="flex-1" delay={0.15}>
              <div className="h-full flex flex-col justify-center rounded-2xl bg-terracotta p-8 lg:p-12 text-white">
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold">Join the community</h2>
                <p className="mt-4 text-base text-white/80">
                  Be the first to know about upcoming dips, excursions, and adventures.
                </p>
                <a
                  href="https://chat.whatsapp.com/Hgi483zWWtQ3XWt0dBnfnl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 w-fit rounded-full bg-white px-8 py-3 text-sm font-semibold text-dark hover:scale-[1.02] hover:bg-white/90 transition-all"
                >
                  Join WhatsApp →
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
}
