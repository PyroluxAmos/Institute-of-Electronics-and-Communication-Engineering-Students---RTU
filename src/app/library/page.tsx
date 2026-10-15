import type { Metadata } from "next";
import { LibraryPage } from "@/components/library/LibraryPage";

export const metadata: Metadata = { title: "Library", description: "Academic materials, reviewers, and handbooks for ECE students." };

export default function Page() {
  return <LibraryPage shelf="academic" />;
}
