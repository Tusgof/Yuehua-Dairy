import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLang } from "@/lib/i18n";
import type { Lang } from "@/lib/projects";
import { getAllNotes } from "@/lib/notes";
import { UI } from "@/lib/i18n";
import { allProjects } from "@/lib/projects";
import NoteCard from "@/components/NoteCard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = rawLang as Lang;
  return {
    title: lang === "th" ? "บันทึกการวิจัยการลงทุน" : "An investment research diary",
    description: UI.tagline[lang === "en" ? "en" : "th"],
  };
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params;
  if (!isLang(rawLang)) notFound();
  const lang = rawLang as Lang;
  const notes = getAllNotes(lang);
  const projects = allProjects();

  return (
    <>
      {/* Hero — night sky */}
      <section
        style={{
          background: "radial-gradient(120% 160% at 78% -10%, #221b12, var(--night))",
          color: "var(--text-inverse)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {[
          { top: 44, left: "18%", s: 20, o: 0.5 },
          { top: 90, left: "72%", s: 12, o: 0.4 },
          { top: 150, left: "40%", s: 9, o: 0.35 },
          { top: 70, left: "88%", s: 15, o: 0.45 },
        ].map((st, i) => (
          <span
            key={i}
            style={{
              position: "absolute",
              top: st.top,
              left: st.left,
              color: "var(--moon)",
              fontSize: st.s,
              opacity: st.o,
            }}
          >
            ✦
          </span>
        ))}
        <div className="container" style={{ padding: "80px 32px 72px", position: "relative" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-mark-white.svg"
            alt=""
            width={72}
            height={72}
            style={{ opacity: 0.92, objectFit: "contain" }}
          />
          <h1
            style={{
              fontFamily: "var(--font-display), serif",
              fontSize: 52,
              fontWeight: 600,
              lineHeight: 1.04,
              letterSpacing: "-0.02em",
              color: "var(--text-inverse)",
              margin: "24px 0 0",
              maxWidth: 720,
            }}
          >
            Yuehua
            <span className="th" style={{ color: "var(--moon)", fontWeight: 500 }}>
              {" "}· บุปผาแสงจันทร์
            </span>
          </h1>
          <p
            className={lang === "th" ? "th" : undefined}
            style={{
              fontSize: 19,
              lineHeight: 1.6,
              color: "var(--moon)",
              margin: "18px 0 0",
              maxWidth: 560,
            }}
          >
            {UI.tagline[lang]}
          </p>

          {/* Project legend */}
          <div style={{ display: "flex", gap: 28, marginTop: 40, flexWrap: "wrap" }}>
            {projects.map((p) => (
              <div
                key={p.key}
                data-project={p.key}
                style={{ display: "flex", alignItems: "center", gap: 10 }}
              >
                <span
                  style={{
                    width: 9,
                    height: 9,
                    borderRadius: "50%",
                    background: "var(--project-accent-on-night)",
                    boxShadow: "var(--glow-moon)",
                  }}
                />
                <span
                  className="mono"
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--paper-on-night)",
                  }}
                >
                  {p.name}
                </span>
                <span style={{ fontSize: 13, color: "var(--moon-deep)" }}>
                  {p.focus[lang]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notes list */}
      <section className="container" style={{ padding: "56px 32px 0" }}>
        <div className="eyebrow" style={{ marginBottom: 4 }}>
          {UI.latest[lang]}
        </div>
        {notes.length === 0 ? (
          <p style={{ color: "var(--text-muted)", padding: "40px 0" }}>
            {lang === "th" ? "ยังไม่มีบันทึก" : "No notes yet."}
          </p>
        ) : (
          <div>
            {notes.map((note) => (
              <NoteCard key={note.slug} note={note} lang={lang} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
