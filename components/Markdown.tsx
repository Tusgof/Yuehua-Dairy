import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/* Renders a note's Markdown body. Styling lives in globals.css under
   `.prose` (headings get a ✦ marker in the project accent, tables are
   styled for quant data, blockquotes get an accent stem, etc.). */
export default function Markdown({ children }: { children: string }) {
  return (
    <div className="prose">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}
