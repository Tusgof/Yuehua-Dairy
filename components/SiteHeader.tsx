import Link from "next/link";
import type { Lang } from "@/lib/projects";
import { UI } from "@/lib/i18n";
import LangToggle from "./LangToggle";

export default function SiteHeader({ lang }: { lang: Lang }) {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        background: "color-mix(in oklch, var(--paper) 86%, transparent)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderBottom: "1px solid var(--line-hairline)",
      }}
    >
      <div
        className="container"
        style={{
          height: 62,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link href={`/${lang}`} style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-mark.svg" alt="" width={30} height={30} style={{ objectFit: "contain" }} />
          <span
            style={{
              fontFamily: "var(--font-display), serif",
              fontSize: 20,
              fontWeight: 600,
              color: "var(--ink-900)",
            }}
          >
            Moonlit Blossom
          </span>
          <span
            className="th"
            style={{ fontSize: 14, color: "var(--text-faint)" }}
          >
            บุปผาแสงจันทร์
          </span>
        </Link>

        <nav style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <Link
            href={`/${lang}`}
            className="eyebrow"
            style={{ color: "var(--text-muted)" }}
          >
            {UI.allNotes[lang]}
          </Link>
          <LangToggle lang={lang} />
        </nav>
      </div>
    </header>
  );
}
