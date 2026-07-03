import { redirect } from "next/navigation";

/* The site is bilingual. Thai is the primary audience, so the root
   sends visitors to /th. English lives at /en. */
export default function RootIndex() {
  redirect("/th");
}
