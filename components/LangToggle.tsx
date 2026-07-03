"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Lang } from "@/lib/projects";

/* Swaps the leading /th ⇄ /en segment of the current path so the reader
   stays on the same page when switching language. */
export default function LangToggle({ lang }: { lang: Lang }) {
  const pathname = usePathname() || `/${lang}`;

  return (
    <div
      className="mono"
      style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}
    >
      <Link
        href={`/th${stripLang(pathname)}`}
        aria-current={lang === "th"}
        style={langStyle(lang === "th")}
      >
        TH
      </Link>
      <span style={{ color: "var(--ink-300)" }}>/</span>
      <Link
        href={`/en${stripLang(pathname)}`}
        aria-current={lang === "en"}
        style={langStyle(lang === "en")}
      >
        EN
      </Link>
    </div>
  );

  function stripLang(p: string): string {
    return p.replace(/^\/(th|en)/, "");
  }
}

function langStyle(active: boolean): React.CSSProperties {
  return {
    letterSpacing: "0.1em",
    color: active ? "var(--ink-900)" : "var(--text-faint)",
    borderBottom: active ? "1.5px solid var(--project-accent)" : "1.5px solid transparent",
    paddingBottom: 2,
  };
}
