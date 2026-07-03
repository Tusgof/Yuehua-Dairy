---
# ============================================================================
# NOTE TEMPLATE  —  copy this file to create a new research note.
# Filename convention:  <slug>.<lang>.md   e.g.  higanbana-003.th.md
#   • <slug>  is shared across languages (so TH and EN of the same note
#             link together and share a URL: /<lang>/notes/<slug>)
#   • <lang>  is either  th  or  en
# Files beginning with "_" (like this one) are IGNORED by the loader.
# ============================================================================

project: higanbana        # project key — must exist in lib/projects.ts
number: "003"             # note number within the project (string, keep quotes)
title: "หัวข้อบันทึก"       # main title, in this file's language
subtitle: "optional tagline"   # optional — shown in italic display serif
date: "2026-07-01"        # ISO date  YYYY-MM-DD  (drives ordering)
status: active            # active | concluded | abandoned
summary: >
  บทสรุปสั้น ๆ 1–2 ประโยค ใช้เป็นทั้งคำโปรยในหน้ารวมบันทึก
  และย่อหน้านำในหน้าบันทึก
tags: [tag-one, tag-two]  # optional

# Optional quant metric band (shown above the article body).
# direction is up | down | flat  → renders ▲ ▼ – in a monochrome tone.
metrics:
  - label: "Win rate"
    value: "58.3%"
    direction: up
  - label: "Net PnL"
    value: "+$420"
    direction: up

# sample: true marks placeholder content. Remove it for real notes.
sample: true
---

เขียนเนื้อหาด้วย Markdown ปกติ รองรับ:

## หัวข้อระดับสอง (ได้เครื่องหมาย ✦ สีประจำโปรเจกต์อัตโนมัติ)

- รายการ
- **ตัวหนา** และ *ตัวเอียง*
- `inline code` และ code block

> คำคมหรือประโยคสำคัญจะได้เส้นขีดข้างสีประจำโปรเจกต์

| ตาราง | รองรับ |
| --- | --- |
| ตัวเลข | ชิดขวาอัตโนมัติ |

เขียนเล่าในน้ำเสียงของคนที่กำลังจดบันทึกการวิจัยของตัวเองจริง ๆ — เล่าว่าวันนี้ทำอะไร เจออะไร รู้สึกยังไง ไม่ใช่รายงานที่ไร้อารมณ์
