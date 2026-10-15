import type { Metadata } from "next";
import { LibraryPage } from "@/components/library/LibraryPage";

export const metadata: Metadata = { title: "Records", description: "Organization records: constitution, financial reports, GPOA, minutes, and resolutions." };

export default function Page() {
  return <LibraryPage shelf="record" />;
}
