import Image from "next/image";

export function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-8 border-l-4 border-terracotta pl-6 font-accent italic text-xl text-terracotta leading-relaxed">
      {children}
    </blockquote>
  );
}

export function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 border-l-4 border-dark bg-yellow px-6 py-4 text-dark">
      {children}
    </div>
  );
}

type GalleryImage = { src: string; alt: string; caption?: string };

export function PhotoGallery({ images }: { images: GalleryImage[] }) {
  const cols =
    images.length === 2
      ? "sm:grid-cols-2"
      : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <div className={`my-8 grid gap-4 ${cols}`}>
      {images.map((img) => (
        <figure key={img.src} className="flex flex-col gap-2">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 33vw"
            />
          </div>
          {img.caption && (
            <figcaption className="text-xs text-slate text-center">
              {img.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}

export const mdxComponents = {
  PullQuote,
  Callout,
  PhotoGallery,
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="font-heading text-3xl font-extrabold mt-10 mb-4"
      {...props}
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="font-heading text-2xl font-extrabold mt-8 mb-3"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="font-heading text-xl font-extrabold mt-6 mb-2"
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-base leading-relaxed text-slate mb-5" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="list-disc list-outside ml-5 space-y-1.5 text-slate mb-5"
      {...props}
    />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="list-decimal list-outside ml-5 space-y-1.5 text-slate mb-5"
      {...props}
    />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-dark/20 pl-5 italic text-slate my-6"
      {...props}
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="bg-dark/5 px-1.5 py-0.5 text-sm font-mono"
      {...props}
    />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="bg-dark/5 p-4 overflow-x-auto text-sm font-mono my-6"
      {...props}
    />
  ),
};
