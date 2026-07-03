# Yuehua · Moonlit Blossom — บันทึกการวิจัยการลงทุน

A bilingual (ไทย / English) **investment research diary**. Each note is a
Markdown file; the site is statically generated with **Next.js** and deploys
on **Vercel** with no backend ("Git as CMS").

Yuehua (Thai: **บุปผาแสงจันทร์**, "Moonlit Blossom") publishes slow,
first-person research notes — mostly on quantitative / systematic trading.
The identity is premium monochrome (warm paper + warm ink, moonlight silver),
with one reserved accent colour per project.

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000  → redirects to /th
npm run build      # production build (what Vercel runs)
```

Node 18.17+ or 20+ recommended.

---

## Writing a note (the only thing you normally do)

1. Copy `content/notes/_TEMPLATE.md`.
2. Save it as `content/notes/<slug>.<lang>.md`
   — e.g. `higanbana-003.th.md` (Thai) and/or `higanbana-003.en.md` (English).
   The `<slug>` is shared across languages so the two versions link together.
3. Fill in the frontmatter (see the template for the full contract) and write
   the body in Markdown.
4. Commit & push. Vercel rebuilds automatically. **That is the whole CMS.**

No database, no admin panel, no login — the Git repository *is* the content
store, and the design is intentionally minimal-premium.

### Frontmatter contract

| field | required | notes |
| --- | --- | --- |
| `project` | ✓ | key in `lib/projects.ts` (e.g. `higanbana`, `lily`) |
| `number` | ✓ | note number within the project, quoted string `"003"` |
| `title` | ✓ | in this file's language |
| `subtitle` | – | italic display-serif tagline |
| `date` | ✓ | ISO `YYYY-MM-DD`, drives ordering |
| `status` | ✓ | `active` \| `concluded` \| `abandoned` |
| `summary` | ✓ | 1–2 sentences; used as list blurb + lead paragraph |
| `tags` | – | array of strings |
| `metrics` | – | quant stat band; each `{label, value, direction?}` |
| `sample` | – | `true` marks placeholder content — remove for real notes |

---

## Projects & accent colours

Each project is a flower codename with **one reserved accent** (used in ~5% of
the surface — the note number, section ✦ markers, rules). Everything else stays
monochrome.

- **Higanbana** (彼岸花, red spider lily) → cinnabar crimson — SPY 0DTE / systematic
- **Lily** → pale celadon — long-horizon portfolio research

To add a project: add an entry to `lib/projects.ts` **and** a matching
`[data-project="<key>"]` block in `app/globals.css` (accent variables).

---

## Deploying to Vercel

1. Push this repo to GitHub (see below).
2. On [vercel.com](https://vercel.com) → **New Project** → import the repo.
3. Framework preset **Next.js** is auto-detected. No env vars needed.
4. Deploy. Every future `git push` to `main` triggers a rebuild.

### First push to GitHub

```bash
git init
git add .
git commit -m "Yuehua diary — initial site"
git branch -M main
git remote add origin https://github.com/Tusgof/Yuehua-Dairy.git
git push -u origin main
```

---

## Project structure

```
app/
  layout.tsx              root <html>, next/font (Cormorant, EB Garamond,
                          IBM Plex Mono, Noto Serif Thai) → CSS variables
  globals.css             design tokens + per-project theming + .prose styles
  page.tsx                / → redirects to /th
  not-found.tsx           404 (night-sky)
  [lang]/
    layout.tsx            header + footer; validates lang (th|en)
    page.tsx              home: hero + project legend + note list
    notes/[slug]/page.tsx a single research note (editorial layout)
components/                SiteHeader, SiteFooter, LangToggle, NoteCard,
                           StatusBadge, StatBand, Markdown
lib/
  projects.ts             project registry (codename → accent, focus)
  notes.ts                Markdown loader (gray-matter), build-time only
  i18n.ts                 UI strings, date formatting, lang helpers
content/notes/            the notes themselves (Markdown) + _TEMPLATE.md
public/                    logo assets
```

See **AGENTS.md** for guidance aimed at AI assistants working on this repo.

---

## Design system

The visual language (colours, type, spacing, the mark) comes from the Yuehua /
Moonlit Blossom design system. Tokens are ported into `app/globals.css`; if you
extend the visual language, keep it in sync with that system.

*Nothing published here is financial advice — it is a personal research diary.*
