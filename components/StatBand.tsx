import type { Metric } from "@/lib/notes";

const GLYPH = { up: "▲", down: "▼", flat: "–" } as const;
const TONE = {
  up: "var(--signal-up)",
  down: "var(--signal-down)",
  flat: "var(--signal-flat)",
} as const;

/* A band of headline figures (win rate, PnL, drawdown …). Direction is
   shown by a ▲▼ glyph + ink tone, never green/red. */
export default function StatBand({ metrics }: { metrics: Metric[] }) {
  if (!metrics || metrics.length === 0) return null;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${Math.min(metrics.length, 4)}, 1fr)`,
        gap: 24,
        margin: "36px 0",
        padding: "26px 30px",
        background: "var(--card)",
        border: "1px solid var(--line-hairline)",
        borderRadius: "var(--r-md)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {metrics.map((m, i) => {
        const dir = m.direction ?? "flat";
        return (
          <div key={i}>
            <div
              className="mono"
              style={{
                fontSize: 10,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--text-faint)",
                marginBottom: 8,
              }}
            >
              {m.label}
            </div>
            <div
              className="mono"
              style={{
                fontSize: 26,
                fontWeight: 500,
                lineHeight: 1,
                color: "var(--ink-900)",
              }}
            >
              {m.value}
            </div>
            {m.direction && (
              <div
                className="mono"
                style={{ fontSize: 12, marginTop: 6, color: TONE[dir] }}
              >
                {GLYPH[dir]}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
