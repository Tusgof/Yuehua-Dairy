# AGENTS.md — guidance for AI assistants working on this repository

> This file is written for a future AI coding assistant (or developer) who is
> asked to extend or maintain the Yuehua diary. Read it before making changes.

## What this project is

A bilingual (Thai/English) **investment research diary** for *Yuehua ·
บุปผาแสงจันทร์ (Moonlit Blossom)*. It is a statically-generated Next.js site
(App Router) deployed on Vercel. Content is **Markdown files** — there is no
database and no backend. This "Git as CMS" model is a deliberate choice; do not
introduce a database, CMS service, or auth without the owner explicitly asking.

## The owner's intent (important — do not drift from this)

- **Voice:** the notes are a personal diary. They read like *a real person
  writing down what they did today, what they found, and how they felt* — not a
  cold machine report. Preserve this warmth in any sample/placeholder content
  you generate.
- **Content domain:** quantitative / systematic trading research (e.g. SPY
  0DTE), plus longer-horizon portfolio work. Projects are named after flowers.
- **Aesthetic:** premium monochrome — warm parchment paper, warm ink, moonlight
  silver — calm, minimal, "a quiet laboratory lit by moonlight; a Western-fantasy
  soul, not a sci-fi one." Each project adds exactly **one** reserved accent
  colour, used sparingly (~5%). Do not add rainbow palettes, gradients beyond
  the existing night-sky, or emoji.
- **No hype.** No exclamation-driven marketing tone, no "🚀 to the moon". Gains
  and losses are shown in monochrome with ▲▼ glyphs, never green/red.

## How content works

- Notes live in `content/notes/<slug>.<lang>.md` where `<lang>` is `th` or `en`.
- The `<slug>` is shared across languages so the site links TH ⇄ EN versions.
- Frontmatter contract is documented in `content/notes/_TEMPLATE.md` and README.
- Files starting with `_` are ignored by the loader (`lib/notes.ts`).
- All parsing is build-time only (Server Components), keeping the site static.

## How to do common tasks

- **Add a note:** create Markdown file(s) per the template. Nothing else.
- **Add a project:** add an entry in `lib/projects.ts` AND a
  `[data-project="<key>"]` accent block in `app/globals.css`. Pick one restrained
  accent colour that survives on both paper and the night-sky footer.
- **Change UI copy:** edit `lib/i18n.ts` (keep both `th` and `en` in sync).
- **Change visual tokens:** edit the `:root` block in `app/globals.css`.

## Conventions & guardrails

- TypeScript, App Router, Server Components by default. The only Client
  Component is `components/LangToggle.tsx` (`"use client"`), because it reads the
  pathname. Keep client components to a minimum.
- Fonts are loaded via `next/font/google` in `app/layout.tsx` and exposed as CSS
  variables (`--font-display/-serif/-mono/-thai`). Do not hard-code font URLs.
- Styling is plain CSS via tokens in `globals.css` + inline styles. There is no
  Tailwind or CSS-in-JS dependency — do not add one without reason.
- Keep the dependency list tiny (currently: next, react, gray-matter,
  react-markdown, remark-gfm). Every new dependency is a new way for the Vercel
  build to break.
- Sample/placeholder notes carry `sample: true` in frontmatter and render a
  "Sample content" tag. Real notes should not.

## Deployment

`npm run build` is what Vercel runs. The site is fully static (SSG via
`generateStaticParams`). If you add a route, give it `generateStaticParams` so it
prerenders. Verify `npm run build` passes before handing back.
