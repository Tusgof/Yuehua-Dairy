/* ==================================================================
   Content loader  —  "Git as CMS"
   ------------------------------------------------------------------
   Each note is a Markdown file in  content/notes/<slug>.<lang>.md
   (e.g. higanbana-001.th.md  and  higanbana-001.en.md).

   The <slug> is shared across languages so the site can offer a
   TH ⇄ EN toggle on the same note. All parsing happens at build time
   (these functions are only called from Server Components), so the
   deployed site is fully static — no database, no server.

   TO ADD A NOTE: drop a new <slug>.<lang>.md file in content/notes/.
   See content/notes/_TEMPLATE.md for the frontmatter contract.
   ================================================================== */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Lang } from "./projects";

export type Status = "active" | "concluded" | "abandoned";

export interface Metric {
  label: string;
  value: string;
  /** Monochrome directional signal — renders ▲ / ▼ / – . */
  direction?: "up" | "down" | "flat";
}

export interface NoteFrontmatter {
  project: string;
  number: string; // "001"
  title: string;
  subtitle?: string;
  date: string; // ISO  YYYY-MM-DD
  status: Status;
  summary: string;
  tags?: string[];
  metrics?: Metric[];
  /** true = placeholder example content, safe for a future author to replace. */
  sample?: boolean;
}

export interface Note extends NoteFrontmatter {
  slug: string;
  lang: Lang;
  body: string;
}

const NOTES_DIR = path.join(process.cwd(), "content", "notes");
const FILE_RE = /^(.+)\.(th|en)\.md$/;

function readAllFiles(): { slug: string; lang: Lang; file: string }[] {
  if (!fs.existsSync(NOTES_DIR)) return [];
  return fs
    .readdirSync(NOTES_DIR)
    .map((file) => {
      const m = file.match(FILE_RE);
      if (!m || file.startsWith("_")) return null;
      return { slug: m[1], lang: m[2] as Lang, file };
    })
    .filter((x): x is { slug: string; lang: Lang; file: string } => x !== null);
}

function parseFile(slug: string, lang: Lang, file: string): Note {
  const raw = fs.readFileSync(path.join(NOTES_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const fm = data as NoteFrontmatter;
  return {
    slug,
    lang,
    body: content.trim(),
    project: fm.project ?? "unknown",
    number: String(fm.number ?? ""),
    title: fm.title ?? slug,
    subtitle: fm.subtitle,
    date: fm.date ?? "1970-01-01",
    status: (fm.status ?? "active") as Status,
    summary: fm.summary ?? "",
    tags: fm.tags ?? [],
    metrics: fm.metrics ?? [],
    sample: fm.sample ?? false,
  };
}

function byDateDesc(a: Note, b: Note): number {
  if (a.date !== b.date) return a.date < b.date ? 1 : -1;
  return a.number < b.number ? 1 : -1;
}

/** All notes for a language, newest first. */
export function getAllNotes(lang: Lang): Note[] {
  return readAllFiles()
    .filter((f) => f.lang === lang)
    .map((f) => parseFile(f.slug, f.lang, f.file))
    .sort(byDateDesc);
}

/** A single note, or null if that language version does not exist. */
export function getNote(lang: Lang, slug: string): Note | null {
  const f = readAllFiles().find((x) => x.slug === slug && x.lang === lang);
  return f ? parseFile(f.slug, f.lang, f.file) : null;
}

/** Slugs that exist for a language (for generateStaticParams). */
export function getNoteSlugs(lang: Lang): string[] {
  return readAllFiles()
    .filter((f) => f.lang === lang)
    .map((f) => f.slug);
}

/** Which languages a given note is available in (for the TH ⇄ EN toggle). */
export function getAvailableLangs(slug: string): Lang[] {
  return readAllFiles()
    .filter((f) => f.slug === slug)
    .map((f) => f.lang);
}
