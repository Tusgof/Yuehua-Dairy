import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLang, formatDate, UI } from "@/lib/i18n";
import type { Lang } from "@/lib/projects";
import { getProject } from "@/lib/projects";
import { getNote, getNoteSlugs, getAvailableLangs } from "@/lib/notes";
import StatusBadge from "@/components/StatusBadge";
import StatBand from "@/components/StatBand";
import Markdown from "@/components/Markdown";

export function generateStaticParams({ params }: { params: { lang: string } }) {
  if (!isLang(params.lang)) return [];
  return getNoteSlugs(params.lang).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang: rawLang, slug } = await params;
  const lang = rawLang as Lang;
  const note = getNote(lang, slug);
  if (!note) return {};
  const project = getProject(note.project);
  return {
    title: `${project.name} · No. ${note.number} — ${note.title}`,
    description: note.summary,
  };
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: rawLang, slug } = await params;
  if (!isLang(rawLang)) notFound();
  const lang = rawLang as Lang;
  const note = getNote(lang, slug);
  if (!note) notFound();

  const project = getProject(note.project);
  const langs = getAvailableLangs(note.slug);
  const otherLang: Lang = lang === "th" ? "en" : "th";
  const hasOther = langs.includes(otherLang);

  return (
    <div data-project={note.project}>
      <article style={{ maxWidth: 720, margin: "0 auto", padding: "56px 32px 0" }}>
        <Link
          href={`/${lang}`}
          className="mono"
          style={{ fontSize: 12, color: "var(--text-faint)" }}
        >
          {UI.backToNotes[lang]}
        </Link>

        {/* Eyebrow */}
        <div
          className="mono"
          style={{
            marginTop: 28,
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--text-faint)",
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <span style={{ color: "var(--project-accent)" }}>{project.name}</span>
          <span>·</span>
          <span>
            {UI.note[lang]} {note.number}
          </span>
          <span>·</span>
          <span>{formatDate(note.date, lang)}</span>
        </div>

        {/* Title */}
        <h1
          className={lang === "th" ? "th" : undefined}
          style={{
            fontFamily: lang === "th" ? undefined : "var(--font-display), serif",
            fontSize: 46,
            fontWeight: 600,
            lineHeight: 1.06,
            letterSpacing: lang === "th" ? "0" : "-0.02em",
            color: "var(--ink-900)",
            margin: "16px 0 0",
          }}
        >
          {note.title}
        </h1>
        {note.subtitle && (
          <div
            style={{
              fontFamily: "var(--font-display), serif",
              fontStyle: "italic",
              fontSize: 22,
              color: "var(--text-muted)",
              marginTop: 12,
            }}
          >
            {note.subtitle}
          </div>
        )}

        {/* Meta row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginTop: 22,
            flexWrap: "wrap",
          }}
        >
          <StatusBadge status={note.status} lang={lang} />
          {hasOther && (
            <Link
              href={`/${otherLang}/notes/${note.slug}`}
              className="mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.1em",
                color: "var(--text-muted)",
                borderBottom: "1px solid var(--project-accent)",
                paddingBottom: 1,
              }}
            >
              {otherLang === "en" ? "Read in English" : "อ่านภาษาไทย"}
            </Link>
          )}
          {note.sample && (
            <span
              className="mono"
              style={{
                fontSize: 9.5,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--text-disabled)",
                border: "1px dashed var(--ink-300)",
                borderRadius: "var(--r-sm)",
                padding: "2px 7px",
              }}
            >
              {UI.sampleBadge[lang]}
            </span>
          )}
        </div>

        <hr style={{ border: 0, height: 1, background: "var(--rule-fade)", margin: "32px 0" }} />

        {/* Lead / summary */}
        <p
          className={lang === "th" ? "th" : undefined}
          style={{
            fontSize: 21,
            lineHeight: 1.55,
            color: "var(--text-strong)",
            margin: "0 0 8px",
          }}
        >
          {note.summary}
        </p>

        {/* Metrics band */}
        {note.metrics && note.metrics.length > 0 && <StatBand metrics={note.metrics} />}

        {/* Body */}
        <div className={lang === "th" ? "th" : undefined} style={{ marginTop: 24 }}>
          <Markdown>{note.body}</Markdown>
        </div>

        {/* Tags */}
        {note.tags && note.tags.length > 0 && (
          <div style={{ display: "flex", gap: 14, marginTop: 28, flexWrap: "wrap" }}>
            {note.tags.map((t) => (
              <span
                key={t}
                className="mono"
                style={{
                  fontSize: 12,
                  color: "var(--text-faint)",
                  borderBottom: "1px solid var(--line-hairline)",
                }}
              >
                #{t}
              </span>
            ))}
          </div>
        )}

        <div className="rule-node">
          <span>☾ ☆ ☽</span>
        </div>
      </article>
    </div>
  );
}
