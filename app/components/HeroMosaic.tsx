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
    const delays = [0, 0.12, 0.06, 0.2, 0.1, 0.25, 0.08, 0.18, 0.3, 0.14];

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

  // Layout: first 4 photos in top row (varying widths), rest in bottom row
  const topRow = photos.slice(0, 4);
  const bottomRow = photos.slice(4, 8);

  return (
    <div ref={containerRef} className="flex flex-col gap-2">
      {/* Top row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {topRow.map((photo, i) => {
          // Alternate between wider and narrower tiles
          const colSpan = i === 0 || i === 3 ? "md:col-span-1" : "md:col-span-1";
          return (
            <div
              key={photo.src}
              data-hero-tile
              className={`group relative overflow-hidden rounded-sm opacity-0 translate-y-4 transition-all duration-700 ease-out aspect-[4/3] ${colSpan}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
                priority={i < 2}
              />
            </div>
          );
        })}
      </div>
      {/* Bottom row — different rhythm */}
      {bottomRow.length > 0 && (
        <div className="grid grid-cols-3 md:grid-cols-12 gap-2">
          {bottomRow.map((photo, i) => {
            // Varying spans: wide, narrow, narrow, wide
            const spans = [
              "col-span-1 md:col-span-5",
              "col-span-1 md:col-span-3",
              "col-span-1 md:col-span-4",
            ];
            return (
              <div
                key={photo.src}
                data-hero-tile
                className={`group relative overflow-hidden rounded-sm opacity-0 translate-y-4 transition-all duration-700 ease-out aspect-[4/3] md:aspect-auto md:h-[180px] ${spans[i % 3]}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 33vw, 40vw"
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
