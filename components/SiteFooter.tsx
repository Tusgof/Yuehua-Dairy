import type { Lang } from "@/lib/projects";
import { UI } from "@/lib/i18n";

export default function SiteFooter({ lang }: { lang: Lang }) {
  return (
    <footer
      style={{
        marginTop: 96,
        background: "radial-gradient(120% 140% at 80% -20%, #221b12, var(--night))",
        color: "var(--text-inverse)",
      }}
    >
      <div
        className="container"
        style={{ padding: "56px 32px", textAlign: "center" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-mark-white.png"
          alt="Moonlit Blossom"
          width={64}
          height={64}
          style={{ margin: "0 auto", opacity: 0.9, objectFit: "contain" }}
        />
        <div
          className="mono"
          style={{
            marginTop: 20,
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--moon-deep)",
          }}
        >
          Yuehua · บุปผาแสงจันทร์
        </div>
        <p
          className={lang === "th" ? "th" : undefined}
          style={{
            maxWidth: 440,
            margin: "16px auto 0",
            fontSize: 14,
            lineHeight: 1.6,
            color: "var(--moon)",
          }}
        >
          {UI.disclaimer[lang]}
        </p>
      </div>
    </footer>
  );
}
