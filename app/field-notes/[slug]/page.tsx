import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/field-notes";
import { mdxComponents } from "../../components/mdx-components";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return {
    title: `${post.title} — Dip Club Amsterdam`,
    description: post.excerpt,
  };
}

export default async function FieldNotePostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const displayDate = new Date(post.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main>
      {/* Cover image — sits below fixed navbar (72px) */}
      <div className="relative w-full h-[400px] mt-[72px]">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      <article className="bg-offwhite py-16 lg:py-24">
        <div className="mx-auto max-w-[820px] px-6 lg:px-12">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {post.pillars.map((pillar) => (
              <span
                key={pillar}
                className="text-xs font-semibold uppercase tracking-[0.15em] text-terracotta"
              >
                {pillar}
              </span>
            ))}
            <span className="text-xs text-slate">{displayDate}</span>
          </div>

          {/* Title */}
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-10">
            {post.title}
          </h1>

          {/* MDX body */}
          <MDXRemote source={post.content} components={mdxComponents} />

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-dark/10 flex flex-col gap-8">
            <Link
              href="/field-notes"
              className="text-sm font-semibold text-terracotta hover:text-terracotta-dark transition-colors"
            >
              ← Back to Field Notes
            </Link>
            <div className="rounded-none border-[6px] border-terracotta bg-terracotta p-8 text-white">
              <h2 className="font-heading text-xl font-extrabold">
                Join the community
              </h2>
              <p className="mt-2 text-sm text-white/80">
                Be the first to know about upcoming dips, excursions, and
                adventures.
              </p>
              <a
                href="https://chat.whatsapp.com/Hgi483zWWtQ3XWt0dBnfnl"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block bg-offwhite px-8 py-3 text-sm font-semibold text-dark hover:bg-offwhite/90 transition-all"
              >
                Join WhatsApp ↘
              </a>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
