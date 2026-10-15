import { Container, PageBanner } from "@/components/ui/primitives";
import { shelves, type Shelf as ShelfKey } from "@/content/library";
import { Shelf, ShelfTabs } from "./Shelf";

const eyebrow: Record<ShelfKey, string> = {
  academic: "Library · Academic Shelf",
  record: "Library · Records",
  design: "Library · Design & Visual Materials",
};

export function LibraryPage({ shelf }: { shelf: ShelfKey }) {
  const data = shelves[shelf];
  return (
    <>
      <PageBanner eyebrow={eyebrow[shelf]} title={data.title} description={data.blurb} compact>
        <ShelfTabs active={shelf} />
      </PageBanner>
      <Container className="mt-10">
        <Shelf items={data.items} />
        <div className="mt-12 rounded-[1.5rem] border-2 border-dashed border-navy-900/15 bg-white/60 p-6 text-sm text-slate-600">
          <p className="font-extrabold text-navy-950">Want to contribute a material?</p>
          <p className="mt-1">
            Send it to the Academics or Creatives Committee via the{" "}
            <a href="/grievance" className="font-bold text-electric-600 underline">
              suggestion form
            </a>{" "}
            or email{" "}
            <a href="mailto:ieces@rtu.edu.ph" className="font-bold text-electric-600 underline">
              ieces@rtu.edu.ph
            </a>
            . Officers: drop the file into <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-xs">public/materials/</code> and add one entry in{" "}
            <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-xs">src/content/library.ts</code>.
          </p>
        </div>
      </Container>
    </>
  );
}
