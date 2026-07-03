import type { Lang } from "@/lib/projects";
import type { Status } from "@/lib/notes";
import { STATUS_LABEL } from "@/lib/i18n";

/* Monochrome status marker. The dot carries the project accent; the rest
   stays ink so the signal reads by shape, not colour. */
export default function StatusBadge({
  status,
  lang,
}: {
  status: Status;
  lang: Lang;
}) {
  const dot =
    status === "active"
      ? "var(--project-accent)"
      : status === "concluded"
        ? "var(--ink-700)"
        : "var(--ink-300)";

  return (
    <span
      className="mono"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        height: 22,
        padding: "0 10px",
        fontSize: 10,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "var(--text-strong)",
        background: "var(--paper-sunk)",
        border: "1px solid var(--line-hairline)",
        borderRadius: "var(--r-sm)",
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: dot,
          boxShadow:
            status === "active"
              ? "0 0 0 3px color-mix(in oklch, var(--project-accent) 20%, transparent)"
              : "none",
        }}
      />
      {STATUS_LABEL[status][lang]}
    </span>
  );
}
