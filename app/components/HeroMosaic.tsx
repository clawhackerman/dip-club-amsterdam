"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

type HeroPhoto = {
  src: string;
  alt: string;
};

type HeroMosaicProps = {
  photos: HeroPhoto[];
};

export default function HeroMosaic({ photos }: HeroMosaicProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const items = el.querySelectorAll<HTMLElement>("[data-hero-tile]");
    const delays = [0, 0.15, 0.08, 0.22, 0.12];

    items.forEach((item, i) => {
      item.style.transitionDelay = `${delays[i % delays.length]}s`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const item = entry.target as HTMLElement;
            item.classList.add("opacity-100", "translate-y-0");
            item.classList.remove("opacity-0", "translate-y-4");
            observer.unobserve(item);
          }
        });
      },
      { threshold: 0.05 }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const p = photos.slice(0, 5);

  return (
    <div ref={containerRef} className="grid grid-cols-6 grid-rows-2 gap-2 h-[280px] sm:h-[360px] lg:h-[420px]">
      {/* Top-left: wide */}
      {p[0] && (
        <div
          data-hero-tile
          className="group relative col-span-4 row-span-1 overflow-hidden rounded-sm opacity-0 translate-y-4 transition-all duration-700 ease-out"
        >
          <Image
            src={p[0].src}
            alt={p[0].alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 66vw, 33vw"
            priority
          />
        </div>
      )}
      {/* Top-right: narrow */}
      {p[1] && (
        <div
          data-hero-tile
          className="group relative col-span-2 row-span-1 overflow-hidden rounded-sm opacity-0 translate-y-4 transition-all duration-700 ease-out"
        >
          <Image
            src={p[1].src}
            alt={p[1].alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 33vw, 17vw"
            priority
          />
        </div>
      )}
      {/* Bottom row: 3 equal tiles */}
      {p[2] && (
        <div
          data-hero-tile
          className="group relative col-span-2 row-span-1 overflow-hidden rounded-sm opacity-0 translate-y-4 transition-all duration-700 ease-out"
        >
          <Image
            src={p[2].src}
            alt={p[2].alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 33vw, 17vw"
          />
        </div>
      )}
      {p[3] && (
        <div
          data-hero-tile
          className="group relative col-span-2 row-span-1 overflow-hidden rounded-sm opacity-0 translate-y-4 transition-all duration-700 ease-out"
        >
          <Image
            src={p[3].src}
            alt={p[3].alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 33vw, 17vw"
          />
        </div>
      )}
      {p[4] && (
        <div
          data-hero-tile
          className="group relative col-span-2 row-span-1 overflow-hidden rounded-sm opacity-0 translate-y-4 transition-all duration-700 ease-out"
        >
          <Image
            src={p[4].src}
            alt={p[4].alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 33vw, 17vw"
          />
        </div>
      )}
    </div>
  );
}
