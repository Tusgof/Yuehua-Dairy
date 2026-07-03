/* ==================================================================
   Projects registry
   ------------------------------------------------------------------
   Every research project has a flower codename and one reserved accent
   colour. The accent appears in ~5% of a note's surface (the note
   number, section markers, rules) — everything else stays monochrome.

   TO ADD A PROJECT: add an entry here, then set `project: <key>` in a
   note's frontmatter. The key is also used as the `data-project`
   attribute, which switches the CSS accent variables (see globals.css).
   Keep globals.css `[data-project="<key>"]` in sync with new entries.
   ================================================================== */

export type Lang = "th" | "en";

export interface ProjectMeta {
  key: string;
  /** Flower codename, e.g. "Higanbana". */
  name: string;
  /** The flower, in each language. */
  flower: Record<Lang, string>;
  /** One-line meaning / mood of the codename. */
  meaning: Record<Lang, string>;
  /** What the project studies. */
  focus: Record<Lang, string>;
}

export const PROJECTS: Record<string, ProjectMeta> = {
  higanbana: {
    key: "higanbana",
    name: "Higanbana",
    flower: { th: "ลิลลี่แมงมุมสีแดง (彼岸花)", en: "Red Spider Lily (彼岸花)" },
    meaning: {
      th: "ดอกไม้แห่งฝั่งโน้น — ความงามที่พรากจากและการปล่อยวาง",
      en: "The flower of the far shore — beauty in parting and letting go.",
    },
    focus: {
      th: "กลยุทธ์ SPY 0DTE เชิงปริมาณและระบบอัตโนมัติ",
      en: "Quantitative & systematic SPY 0DTE strategies.",
    },
  },
  lily: {
    key: "lily",
    name: "Lily",
    flower: { th: "ลิลลี่", en: "Lily" },
    meaning: {
      th: "ความสงบและความบริสุทธิ์ในสวนใต้แสงจันทร์",
      en: "Stillness and clarity in a moonlit garden.",
    },
    focus: {
      th: "การวิจัยพอร์ตโฟลิโอระยะยาวและการจัดสรรสินทรัพย์",
      en: "Long-horizon portfolio research and asset allocation.",
    },
  },
};

/** Neutral fallback so an unknown project key still renders sanely. */
export const FALLBACK_PROJECT: ProjectMeta = {
  key: "unknown",
  name: "Yuehua",
  flower: { th: "บุปผาแสงจันทร์", en: "Moonlit Blossom" },
  meaning: { th: "บันทึกการวิจัย", en: "Research notes." },
  focus: { th: "การวิจัยการลงทุน", en: "Investment research." },
};

export function getProject(key: string): ProjectMeta {
  return PROJECTS[key] ?? FALLBACK_PROJECT;
}

export function allProjects(): ProjectMeta[] {
  return Object.values(PROJECTS);
}
