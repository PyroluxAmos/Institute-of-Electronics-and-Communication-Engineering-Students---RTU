import type { Metadata } from "next";
import { LibraryPage } from "@/components/library/LibraryPage";

export const metadata: Metadata = { title: "Design Materials", description: "Brand kit, logo pack, templates, and visual materials of IECES – RTU." };

export default function Page() {
  return <LibraryPage shelf="design" />;
}
