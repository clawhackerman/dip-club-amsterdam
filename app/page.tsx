import Hero from "./components/Hero";
import ActivityCard from "./components/ActivityCard";
import ScrollReveal from "./components/ScrollReveal";
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
