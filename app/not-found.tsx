import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(120% 120% at 70% 10%, #1d1810, var(--night))",
        color: "var(--paper-on-night)",
        textAlign: "center",
        padding: 32,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo-mark-white.svg" alt="" width={80} height={80} style={{ opacity: 0.85 }} />
      <div
        className="mono"
        style={{
          marginTop: 24,
          fontSize: 11,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: "var(--moon-deep)",
        }}
      >
        404 · ไม่พบหน้า / Not found
      </div>
      <p style={{ color: "var(--moon)", margin: "12px 0 24px", maxWidth: 360 }}>
        หน้าที่คุณตามหาได้จางหายไปกับแสงจันทร์ — The page you sought has faded with the moonlight.
      </p>
      <Link
        href="/th"
        className="mono"
        style={{
          fontSize: 12,
          letterSpacing: "0.1em",
          color: "var(--paper-on-night)",
          border: "1px solid var(--night-line)",
          borderRadius: "var(--r-sm)",
          padding: "10px 20px",
        }}
      >
        ← กลับหน้าแรก / Home
      </Link>
    </div>
  );
}
