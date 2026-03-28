import Image from "next/image";
import HeroMosaic from "./HeroMosaic";

type HeroPhoto = {
  src: string;
  alt: string;
};

type HeroProps = {
  title: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  imageSrc?: string;
  imageAlt?: string;
  fullHeight?: boolean;
  badge?: string;
  photos?: HeroPhoto[];
};

export default function Hero({
  title,
  subtitle,
  description,
  ctaText,
  ctaHref,
  secondaryCtaText,
  secondaryCtaHref,
  imageSrc,
  imageAlt,
  fullHeight = false,
  badge,
  photos,
}: HeroProps) {
  const isExternal = ctaHref?.startsWith("http");
  const hasVisual = (photos && photos.length > 0) || imageSrc;

  return (
    <section
      className={`bg-terracotta ${
        fullHeight ? "min-h-screen" : "min-h-[60vh]"
      }`}
    >
      <div className="max-w-[1320px] mx-auto px-6 lg:px-12 pb-12 pt-32 lg:pb-16 w-full">
        <div
          className={`flex flex-col gap-10 ${
            hasVisual ? "lg:flex-row lg:items-end lg:gap-12" : ""
          }`}
        >
          {/* Left: text content */}
          <div className={`flex flex-col gap-4 ${hasVisual ? "lg:flex-1" : "max-w-3xl"}`}>
            {badge && (
              <span className="rounded-sm bg-white/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white w-fit">
                {badge}
              </span>
            )}

            <h1 className="font-heading text-7xl sm:text-8xl lg:text-[120px] leading-[0.85] tracking-tight text-white uppercase">
              {title}
            </h1>

            {subtitle && (
              <p className="text-lg sm:text-xl font-medium text-white/90">
                {subtitle}
              </p>
            )}

            {description && (
              <p className="text-base text-white/70 max-w-md">{description}</p>
            )}

            {(ctaText || secondaryCtaText) && (
              <div className="flex flex-wrap items-center gap-3 mt-4">
                {ctaText && ctaHref && (
                  <a
                    href={ctaHref}
                    {...(isExternal
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="rounded-sm bg-white px-8 py-3.5 text-sm font-semibold text-dark hover:scale-[1.02] hover:bg-white/90 transition-all"
                  >
                    {ctaText}
                  </a>
                )}
                {secondaryCtaText && secondaryCtaHref && (
                  <a
                    href={secondaryCtaHref}
                    className="rounded-sm border border-white/40 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-all"
                  >
                    {secondaryCtaText}
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Right: photo mosaic or single image */}
          {photos && photos.length > 0 ? (
            <div className="lg:flex-1">
              <HeroMosaic photos={photos} />
            </div>
          ) : imageSrc ? (
            <div className="relative h-[280px] sm:h-[340px] lg:h-[400px] lg:flex-1 overflow-hidden rounded-lg">
              <Image
                src={imageSrc}
                alt={imageAlt ?? ""}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
