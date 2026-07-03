import Link from "next/link";
import type { Lang } from "@/lib/projects";
import { getProject } from "@/lib/projects";
import type { Note } from "@/lib/notes";
import { formatDate, UI } from "@/lib/i18n";
import StatusBadge from "./StatusBadge";

/* One research note in the index list. Editorial row, not a heavy grid
   card: the note number carries the project accent; everything else is ink. */
export default function NoteCard({ note, lang }: { note: Note; lang: Lang }) {
  const project = getProject(note.project);
  return (
    <Link
      href={`/${lang}/notes/${note.slug}`}
      data-project={note.project}
      style={{ display: "block" }}
    >
      <article
        style={{
          display: "grid",
          gridTemplateColumns: "132px 1fr",
          gap: 28,
          padding: "30px 0",
          borderBottom: "1px solid var(--line-soft)",
        }}
      >
        {/* Left rail: project + number */}
        <div>
          <div
            className="mono"
            style={{
              fontSize: 10,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--text-faint)",
            }}
          >
            {project.name}
          </div>
          <div
            className="mono"
            style={{
              fontSize: 34,
              fontWeight: 500,
              lineHeight: 1.05,
              marginTop: 4,
              color: "var(--project-accent)",
            }}
          >
            {note.number}
          </div>
          <div
            className="mono"
            style={{ fontSize: 11, color: "var(--text-faint)", marginTop: 8 }}
          >
            {formatDate(note.date, lang)}
          </div>
        </div>

        {/* Body */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <StatusBadge status={note.status} lang={lang} />
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
          <h2
            className={lang === "th" ? "th" : undefined}
            style={{
              fontFamily: lang === "th" ? undefined : "var(--font-display), serif",
              fontSize: 27,
              fontWeight: 600,
              lineHeight: 1.14,
              margin: 0,
              color: "var(--ink-900)",
            }}
          >
            {note.title}
          </h2>
          {note.subtitle && (
            <div
              style={{
                fontFamily: "var(--font-display), serif",
                fontStyle: "italic",
                fontSize: 17,
                color: "var(--text-muted)",
                marginTop: 4,
              }}
            >
              {note.subtitle}
            </div>
          )}
          <p
            className={lang === "th" ? "th" : undefined}
            style={{
              margin: "12px 0 0",
              fontSize: 16,
              lineHeight: 1.6,
              color: "var(--text-body)",
              maxWidth: "60ch",
            }}
          >
            {note.summary}
          </p>
          {note.tags && note.tags.length > 0 && (
            <div style={{ display: "flex", gap: 14, marginTop: 14, flexWrap: "wrap" }}>
              {note.tags.map((t) => (
                <span
                  key={t}
                  className="mono"
                  style={{
                    fontSize: 11,
                    color: "var(--text-faint)",
                    borderBottom: "1px solid var(--line-hairline)",
                  }}
                >
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
