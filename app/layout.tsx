import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  EB_Garamond,
  IBM_Plex_Mono,
  Noto_Serif_Thai,
} from "next/font/google";
import "./globals.css";

/* Display swash serif — the wordmark voice (headlines, hero numbers). */
const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

/* Body serif — long-form research prose. */
const serif = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

/* Data / labels — the "lab" register (tickers, figures, eyebrows). */
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

/* Thai — บุปผาแสงจันทร์ and Thai-language notes. */
const thai = Noto_Serif_Thai({
  subsets: ["thai"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-thai",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yuehua-diary.vercel.app"),
  title: {
    default: "Yuehua · Moonlit Blossom — บันทึกการวิจัยการลงทุน",
    template: "%s · Moonlit Blossom",
  },
  description:
    "บันทึกการวิจัยการลงทุนเชิงปริมาณ — a quantitative investment research diary, written slowly and in public. บุปผาแสงจันทร์.",
  icons: { icon: "/logo-mark.svg" },
  openGraph: {
    title: "Yuehua · Moonlit Blossom",
    description: "บันทึกการวิจัยการลงทุนเชิงปริมาณ — a research diary, written in public.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="th"
      className={`${display.variable} ${serif.variable} ${mono.variable} ${thai.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
