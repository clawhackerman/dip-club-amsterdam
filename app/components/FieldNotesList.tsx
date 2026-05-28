"use client";

import { useState } from "react";
import FieldNoteCard from "./FieldNoteCard";
import type { FieldNoteMeta } from "@/lib/field-notes";

const PILLARS = [
  "Cold Exposure",
  "Heat Exposure",
  "Breathwork",
  "Time in Nature",
  "Real Connection",
];

export default function FieldNotesList({ posts }: { posts: FieldNoteMeta[] }) {
  const [active, setActive] = useState<string | null>(null);

  const filtered =
    active ? posts.filter((p) => p.pillars.includes(active)) : posts;

  return (
    <div>
      {/* Pillar filter bar */}
      <div className="flex flex-wrap gap-2 mb-12">
        <button
          onClick={() => setActive(null)}
          className={[
            "px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] border-2 border-dark transition-colors duration-200",
            active === null
              ? "bg-dark text-offwhite"
              : "bg-transparent text-dark hover:bg-dark/5",
          ].join(" ")}
        >
          All
        </button>
        {PILLARS.map((pillar) => (
          <button
            key={pillar}
            onClick={() => setActive(pillar === active ? null : pillar)}
            className={[
              "px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] border-2 border-dark transition-colors duration-200",
              active === pillar
                ? "bg-dark text-offwhite"
                : "bg-transparent text-dark hover:bg-dark/5",
            ].join(" ")}
          >
            {pillar}
          </button>
        ))}
      </div>

      {/* Card grid */}
      {filtered.length === 0 ? (
        <p className="text-slate">No posts for this pillar yet.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <FieldNoteCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
