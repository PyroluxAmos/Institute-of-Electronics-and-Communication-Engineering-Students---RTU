import type { Metadata } from "next";
import { Feed } from "@/components/bulletin/Feed";
import { Container, PageBanner } from "@/components/ui/primitives";
import { getFeed, isPostCategory } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Transparency Bulletin",
  description: "Announcements, pubmats, financial reports, GPOA updates, and executive matters of IECES – RTU.",
};
export const dynamic = "force-dynamic";

export default async function BulletinPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  const cat = isPostCategory(category) ? category : "all";
  const initial = await getFeed({ page: 0, category: cat });

  return (
    <>
      <PageBanner
        eyebrow="Transparency Board"
        title="Bulletin Board"
        description="Scroll through everything the organization publishes — announcements, pubmats, financial statements, GPOA updates, and executive matters."
        compact
      >
        <div className="flex flex-wrap gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-cyan-100">
          <span className="rounded-full bg-white/10 px-3 py-1.5 ring-1 ring-white/20">{initial.total} public posts</span>
          <span className="rounded-full bg-white/10 px-3 py-1.5 ring-1 ring-white/20">Updated by the Executive Board</span>
        </div>
      </PageBanner>
      <Container className="mt-8">
        <Feed initial={initial} initialCategory={cat} />
      </Container>
    </>
  );
}
