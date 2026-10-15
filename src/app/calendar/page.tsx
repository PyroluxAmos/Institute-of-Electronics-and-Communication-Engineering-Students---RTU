import type { Metadata } from "next";
import { GpoaBoard } from "@/components/calendar/GpoaBoard";
import { ButtonLink, Container, PageBanner } from "@/components/ui/primitives";
import { externalBoardEmbed, gpoaActivities } from "@/content/gpoa";

export const metadata: Metadata = {
  title: "GPOA Calendar",
  description: "General Plan of Activities of IECES – RTU: planned, ongoing, and accomplished activities in a live board and calendar.",
};

export default function CalendarPage() {
  const done = gpoaActivities.filter((a) => a.status === "done").length;
  const pct = Math.round((done / gpoaActivities.length) * 100);
  return (
    <>
      <PageBanner
        eyebrow="General Plan of Activities"
        title="GPOA Calendar & Board"
        description="Every activity approved by the Office of Student Affairs, tracked from planning to accomplishment. Click any card for objectives, venue, and budget."
        compact
      >
        <div className="grid max-w-md gap-2">
          <div className="flex items-center justify-between text-xs font-extrabold uppercase tracking-[0.18em] text-cyan-100">
            <span>Academic year progress</span>
            <span>{pct}% accomplished</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-white/15">
            <div className="h-full rounded-full bg-cyan-300" style={{ width: `${pct}%` }} />
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <ButtonLink href="/library/records" variant="cream" className="px-5 py-2.5">
              Download approved GPOA (PDF)
            </ButtonLink>
          </div>
        </div>
      </PageBanner>
      <Container className="mt-8">
        <GpoaBoard />
        {externalBoardEmbed.url && (
          <section className="mt-12">
            <h2 className="font-display text-2xl font-extrabold text-navy-950">{externalBoardEmbed.label}</h2>
            <div className="mt-4 overflow-hidden rounded-[1.5rem] shadow-m2 ring-1 ring-navy-900/10">
              <iframe src={externalBoardEmbed.url} title={externalBoardEmbed.label} className="h-[70vh] w-full bg-white" loading="lazy" />
            </div>
          </section>
        )}
      </Container>
    </>
  );
}
