import Image from "next/image";
import Link from "next/link";
import type { FieldNoteMeta } from "@/lib/field-notes";

export default function FieldNoteCard({ post }: { post: FieldNoteMeta }) {
  const displayDate = new Date(post.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Link
      href={`/field-notes/${post.slug}`}
      className="group flex flex-col overflow-hidden border-[6px] border-dark bg-offwhite hover:border-terracotta transition-colors duration-200"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.pillars.map((pillar) => (
            <span
              key={pillar}
              className="text-xs font-semibold uppercase tracking-[0.12em] text-terracotta"
            >
              {pillar}
            </span>
          ))}
        </div>
        <h3 className="font-heading text-lg font-extrabold leading-tight mb-2">
          {post.title}
        </h3>
        <p className="text-sm text-slate leading-relaxed flex-1">
          {post.excerpt}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-slate">{displayDate}</span>
          <span className="text-sm font-semibold text-dark group-hover:text-terracotta transition-colors duration-200">
            Read ↘
          </span>
        </div>
      </div>
    </Link>
  );
}
