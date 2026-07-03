import { notFound } from "next/navigation";
import { isLang, LANGS } from "@/lib/i18n";
import type { Lang } from "@/lib/projects";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  if (!isLang(params.lang)) notFound();
  const lang = params.lang as Lang;

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <SiteHeader lang={lang} />
      <main style={{ flex: 1 }}>{children}</main>
      <SiteFooter lang={lang} />
    </div>
  );
}
