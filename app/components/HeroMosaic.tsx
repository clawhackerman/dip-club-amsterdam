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
    const delays = [0, 0.2, 0.06, 0.16, 0.1, 0.25, 0.04, 0.18];

    items.forEach((item, i) => {
      item.style.transitionDelay = `${delays[i % delays.length]}s`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const item = entry.target as HTMLElement;
            item.classList.add("opacity-100", "translate-y-0");
            item.classList.remove("opacity-0", "translate-y-6");
            observer.unobserve(item);
          }
        });
      },
      { threshold: 0.05 }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const p = photos.slice(0, 8);

  const tile = (photo: HeroPhoto, flex: string, priority = false) => (
    <div
      key={photo.src}
      data-hero-tile
      className={`group relative ${flex} min-h-0 overflow-hidden rounded-none opacity-0 translate-y-6 transition-all duration-700 ease-out`}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 25vw, 14vw"
        priority={priority}
      />
    </div>
  );

  return (
    <div ref={containerRef} className="flex gap-2 h-[380px] sm:h-[480px] lg:h-[560px]">
      {/* Col 1 — flush top */}
      <div className="flex flex-1 flex-col gap-2">
        {p[0] && tile(p[0], "flex-[3]", true)}
        {p[1] && tile(p[1], "flex-[2]", true)}
      </div>

      {/* Col 2 — step down */}
      <div className="flex flex-1 flex-col gap-2 mt-10 sm:mt-14">
        {p[2] && tile(p[2], "flex-[2]")}
        {p[3] && tile(p[3], "flex-[3]")}
      </div>

      {/* Col 3 — step further */}
      <div className="flex flex-1 flex-col gap-2 mt-20 sm:mt-28">
        {p[4] && tile(p[4], "flex-[3]")}
        {p[5] && tile(p[5], "flex-[2]")}
      </div>

      {/* Col 4 — most offset */}
      <div className="hidden sm:flex flex-1 flex-col gap-2 mt-28 sm:mt-40">
        {p[6] && tile(p[6], "flex-[2]")}
        {p[7] && tile(p[7], "flex-[3]")}
      </div>
    </div>
  );
}
