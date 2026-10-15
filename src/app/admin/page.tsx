import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { Container, PageBanner } from "@/components/ui/primitives";
import { adminConfigured, isAdmin } from "@/lib/admin-auth";
import { listGrievances, grievanceStats } from "@/lib/grievances";
import { getFeed } from "@/lib/posts";

export const metadata: Metadata = { title: "Officer Dashboard", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdmin())) redirect("/admin/login");
  const [feed, grievances, stats] = await Promise.all([getFeed({ page: 0, includeUnpublished: true }), listGrievances(), grievanceStats()]);
  // fetch all posts for management (up to 200)
  const all = feed.total > feed.items.length ? (await Promise.all(Array.from({ length: Math.ceil(feed.total / 6) }, (_, i) => getFeed({ page: i, includeUnpublished: true })))).flatMap((f) => f.items) : feed.items;

  return (
    <>
      <PageBanner eyebrow="Officers only" title="Dashboard" description="Publish to the bulletin and triage student submissions." compact>
        <div className="flex flex-wrap gap-2 text-xs font-extrabold uppercase tracking-[0.18em] text-cyan-100">
          <span className="rounded-full bg-white/10 px-3 py-1.5 ring-1 ring-white/20">{feed.total} posts</span>
          <span className="rounded-full bg-white/10 px-3 py-1.5 ring-1 ring-white/20">{stats.new} new · {stats.reviewing} reviewing · {stats.resolved} resolved</span>
          {!adminConfigured() && <span className="rounded-full bg-amber-300 px-3 py-1.5 text-navy-950">⚠ Set ADMIN_PASSWORD in .env</span>}
        </div>
      </PageBanner>
      <Container className="mt-8">
        <AdminDashboard posts={all} grievances={grievances} />
      </Container>
    </>
  );
}
