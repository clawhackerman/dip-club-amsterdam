"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

type Photo = {
  src: string;
  alt: string;
  aspect?: "tall" | "wide" | "square";
};

type PhotoMosaicProps = {
  photos: Photo[];
};

export default function PhotoMosaic({ photos }: PhotoMosaicProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const items = el.querySelectorAll<HTMLElement>("[data-mosaic-item]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const item = entry.target as HTMLElement;
            const delay = item.dataset.delay || "0";
            item.style.transitionDelay = `${delay}s`;
            item.classList.add("opacity-100", "translate-y-0", "scale-100");
            item.classList.remove("opacity-0", "translate-y-8", "scale-95");
            observer.unobserve(item);
          }
        });
      },
      { threshold: 0.1 }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  // Assign irregular delays for staggered entrance
  const delays = [0, 0.15, 0.3, 0.08, 0.22, 0.4, 0.12, 0.35];

  return (
    <div ref={containerRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
      {photos.map((photo, i) => {
        const spanClass =
          photo.aspect === "tall"
            ? "row-span-2"
            : photo.aspect === "wide"
              ? "col-span-2"
              : "";

        const aspectClass =
          photo.aspect === "tall"
            ? "aspect-[3/4]"
            : photo.aspect === "wide"
              ? "aspect-[16/9]"
              : "aspect-square";

        return (
          <div
            key={photo.src}
            data-mosaic-item
            data-delay={delays[i % delays.length]}
            className={`group relative overflow-hidden rounded-sm opacity-0 translate-y-8 scale-95 transition-all duration-700 ease-out ${spanClass} ${aspectClass}`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
        );
      })}
    </div>
  );
}
