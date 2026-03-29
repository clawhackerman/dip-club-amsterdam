"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type HomeHeroProps = {
  backgroundImage: string;
  backgroundAlt: string;
};

export default function HomeHero({
  backgroundImage,
  backgroundAlt,
}: HomeHeroProps) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    // Start reveal after a short delay to let the orange render first
    const timer = setTimeout(() => setRevealed(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background image — always present behind the overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt={backgroundAlt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Dark overlay for text legibility */}
        <div className="absolute inset-0 bg-dark/40" />
      </div>

      {/* Orange curtain that slides away */}
      <div
        className={[
          "absolute inset-0 z-10 bg-terracotta origin-left transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)]",
          revealed ? "translate-x-full" : "translate-x-0",
        ].join(" ")}
      />

      {/* Text content — always visible, on top of everything */}
      <div className="relative z-20 max-w-[1320px] mx-auto px-6 lg:px-12 pb-16 pt-32 lg:pb-24 min-h-screen flex items-end">
        <div className="max-w-3xl">
          <h1
            className={[
              "font-heading text-7xl sm:text-8xl lg:text-[120px] leading-[0.85] tracking-tight text-white uppercase transition-all duration-700 ease-out",
              revealed ? "opacity-100 translate-y-0 delay-500" : "opacity-100 translate-y-0",
            ].join(" ")}
          >
            DIP CLUB
          </h1>

          <p
            className={[
              "mt-4 text-lg sm:text-xl font-medium transition-all duration-700 ease-out",
              revealed ? "text-white/90 delay-700" : "text-white/90",
            ].join(" ")}
          >
            Seek Discomfort. Find Yourself.
          </p>

          <p
            className={[
              "mt-4 text-base max-w-md transition-all duration-700 ease-out",
              revealed ? "text-white/70 delay-[800ms]" : "text-white/70",
            ].join(" ")}
          >
            Amsterdam&apos;s urban wellness community. Ice baths, breathwork, and
            outdoor adventures for those who choose growth over comfort.
          </p>

          <div
            className={[
              "flex flex-wrap items-center gap-3 mt-6 transition-all duration-700 ease-out",
              revealed
                ? "opacity-100 translate-y-0 delay-[900ms]"
                : "opacity-100 translate-y-0",
            ].join(" ")}
          >
            <a
              href="https://chat.whatsapp.com/Hgi483zWWtQ3XWt0dBnfnl"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-none bg-white px-8 py-3.5 text-sm font-semibold text-dark hover:scale-[1.02] hover:bg-white/90 transition-all"
            >
              Join Our WhatsApp Community ↘
            </a>
            <a
              href="#activities"
              className="rounded-none border border-white/40 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-all"
            >
              See Activities ↘
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
