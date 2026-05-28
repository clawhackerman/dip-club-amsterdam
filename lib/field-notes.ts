import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content/field-notes");

export type FieldNoteMeta = {
  slug: string;
  title: string;
  date: string; // ISO date string YYYY-MM-DD
  pillars: string[];
  excerpt: string;
  coverImage: string;
};

export type FieldNotePost = FieldNoteMeta & {
  content: string;
};

function normalizeDate(raw: unknown): string {
  if (raw instanceof Date) return raw.toISOString().split("T")[0];
  return String(raw);
}

export function getAllPosts(): FieldNoteMeta[] {
  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"));

  return files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf-8");
      const { data } = matter(raw);
      return {
        slug,
        title: String(data.title),
        date: normalizeDate(data.date),
        pillars: Array.isArray(data.pillars) ? data.pillars : [],
        excerpt: String(data.excerpt),
        coverImage: String(data.coverImage),
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string): FieldNotePost {
  const filepath = path.join(POSTS_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filepath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    content,
    title: String(data.title),
    date: normalizeDate(data.date),
    pillars: Array.isArray(data.pillars) ? data.pillars : [],
    excerpt: String(data.excerpt),
    coverImage: String(data.coverImage),
  };
}
