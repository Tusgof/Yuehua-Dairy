import type { Lang } from "./projects";
import type { Status } from "./notes";

/* Small, centralised UI strings so both languages stay in sync. */

export const STATUS_LABEL: Record<Status, Record<Lang, string>> = {
  active: { th: "กำลังทดลอง", en: "In progress" },
  concluded: { th: "สรุปแล้ว", en: "Concluded" },
  abandoned: { th: "ยุติแล้ว", en: "Abandoned" },
};

export const UI = {
  tagline: {
    th: "บันทึกการวิจัยการลงทุน เขียนอย่างช้า ๆ และเปิดเผยต่อสาธารณะ",
    en: "An investment research diary — written slowly, and in public.",
  },
  latest: { th: "บันทึกล่าสุด", en: "Latest notes" },
  allNotes: { th: "บันทึกทั้งหมด", en: "All notes" },
  readNote: { th: "อ่านบันทึก", en: "Read the note" },
  backToNotes: { th: "← กลับไปหน้าบันทึก", en: "← Back to notes" },
  projects: { th: "โปรเจกต์", en: "Projects" },
  about: { th: "เกี่ยวกับ", en: "About" },
  note: { th: "บันทึก", en: "Note" },
  disclaimer: {
    th: "บันทึกนี้เป็นการบันทึกความคิดและการวิจัยส่วนตัว ไม่ใช่คำแนะนำการลงทุน",
    en: "These are personal research notes, not financial advice.",
  },
  sampleBadge: {
    th: "เนื้อหาตัวอย่าง",
    en: "Sample content",
  },
} as const;

export function formatDate(iso: string, lang: Lang): string {
  const d = new Date(iso + "T00:00:00");
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat(lang === "th" ? "th-TH" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
}

export const LANGS: Lang[] = ["th", "en"];
export function isLang(x: string): x is Lang {
  return x === "th" || x === "en";
}
