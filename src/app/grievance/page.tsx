import type { Metadata } from "next";
import { GrievanceForm } from "@/components/grievance/GrievanceForm";
import { GrievanceSidebar } from "@/components/grievance/GrievanceSidebar";
import { Container, PageBanner } from "@/components/ui/primitives";
import { siteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Grievance Form",
  description: "Raise suggestions, concerns, and questions to the IECES – RTU Executive Board. Anonymous submissions welcome.",
};

export default function GrievancePage() {
  const url = `${siteUrl().replace(/\/$/, "")}/grievance`;
  return (
    <>
      <PageBanner
        eyebrow="Student Voice"
        title="Grievance & Suggestion Form"
        description="Suggestions, concerns, questions, or commendations — this is your direct line to the Executive Board. Anonymous submissions are welcome, and every ticket is trackable."
        compact
      >
        <div className="flex flex-wrap gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-cyan-100">
          <span className="rounded-full bg-white/10 px-3 py-1.5 ring-1 ring-white/20">🔒 Anonymous option</span>
          <span className="rounded-full bg-white/10 px-3 py-1.5 ring-1 ring-white/20">🎫 Trackable ticket</span>
          <span className="rounded-full bg-white/10 px-3 py-1.5 ring-1 ring-white/20">⏱ Reviewed weekly</span>
        </div>
      </PageBanner>
      <Container className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
        <GrievanceForm />
        <GrievanceSidebar url={url} />
      </Container>
    </>
  );
}
