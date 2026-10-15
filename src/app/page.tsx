import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { PostCard } from "@/components/bulletin/PostCard";
import { BookBanner } from "@/components/library/BookBanner";
import { ButtonLink, Container, SectionHeading } from "@/components/ui/primitives";
import { getLatestPosts } from "@/lib/posts";
import { gpoaActivities } from "@/content/gpoa";
import { allLibraryItems } from "@/content/library";
import { site } from "@/content/site";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

const quickLinks = [
  { href: "/bulletin", title: "Transparency Bulletin", blurb: "Announcements, pubmats, financial & executive matters in a scrolling feed.", icon: "📢", tone: "from-navy-900 to-navy-700" },
  { href: "/grievance", title: "Grievance Form", blurb: "Raise suggestions, concerns & questions — anonymously if you prefer.", icon: "🗳️", tone: "from-electric-600 to-cyan-300" },
  { href: "/library", title: "Library", blurb: "Reviewers, handbooks, lab manuals, records, and design assets on one shelf.", icon: "📚", tone: "from-indigo-700 to-electric-500" },
  { href: "/calendar", title: "GPOA Calendar", blurb: "Trello-style board of every planned, ongoing and completed activity.", icon: "🗓️", tone: "from-sky-700 to-cyan-400" },
  { href: "/links", title: "Links & Contact", blurb: "Community chats, official pages, forms and how to reach the board.", icon: "🔗", tone: "from-slate-800 to-navy-700" },
];

export default async function HomePage() {
  const latest = await getLatestPosts(3);
  const upcoming = gpoaActivities
    .filter((a) => a.status !== "done")
    .sort((a, b) => a.start.localeCompare(b.start))
    .slice(0, 4);
  const featured = allLibraryItems.filter((i) => i.featured).slice(0, 3);

  return (
    <>
      <Hero />

      {/* Quick access */}
      <Container className="-mt-10 relative z-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {quickLinks.map((q) => (
            <Link
              key={q.href}
              href={q.href}
              className="pressable group relative overflow-hidden rounded-[1.5rem] bg-white p-5 shadow-m2 ring-1 ring-navy-900/5 transition hover:-translate-y-1 hover:shadow-m3"
            >
              <span className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${q.tone} text-2xl shadow-m1`}>{q.icon}</span>
              <p className="mt-4 font-display text-lg font-extrabold text-navy-950">{q.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">{q.blurb}</p>
              <span className="mt-4 inline-block text-sm font-extrabold text-electric-600 transition group-hover:translate-x-1">Open →</span>
            </Link>
          ))}
        </div>
      </Container>

      {/* Latest posts */}
      <Container className="mt-24">
        <SectionHeading
          eyebrow="Transparency Board"
          title="Latest from the bulletin"
          description="Every post is public. Finances, GPOA progress, executive resolutions and announcements — no need to dig through social media."
          action={<ButtonLink href="/bulletin" variant="outlined">View all posts</ButtonLink>}
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {latest.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </div>
      </Container>

      {/* GPOA + About */}
      <section className="mt-24 bg-navy-950 py-20 text-white">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionHeading
              light
              eyebrow="GPOA"
              title="What's coming up"
              description="Pulled straight from the approved General Plan of Activities."
            />
            <ol className="mt-8 grid gap-3">
              {upcoming.map((a) => (
                <li key={a.id} className="flex gap-4 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-cyan-300 text-navy-950">
                    <span className="font-display text-xl font-extrabold leading-none">{new Date(`${a.start}T00:00:00`).getDate()}</span>
                    <span className="text-[10px] font-extrabold uppercase">{new Date(`${a.start}T00:00:00`).toLocaleString("en", { month: "short" })}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-extrabold">{a.title}</p>
                    <p className="text-sm text-cyan-100/80">
                      {a.committee} · {formatDate(a.start)}
                      {a.end && ` – ${formatDate(a.end)}`}
                    </p>
                  </div>
                  <span className={`ml-auto h-fit shrink-0 rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider ${a.status === "ongoing" ? "bg-emerald-400 text-navy-950" : "bg-white/10 text-cyan-200"}`}>
                    {a.status}
                  </span>
                </li>
              ))}
            </ol>
            <ButtonLink href="/calendar" className="mt-6 bg-cyan-300 text-navy-950 hover:bg-cyan-200">
              Open the GPOA board
            </ButtonLink>
          </div>
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-navy-800 to-navy-900 p-8 ring-1 ring-white/10 sm:p-10">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-300/20 blur-3xl" />
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-cyan-200">About IECES</p>
            <h3 className="mt-3 font-display text-3xl font-extrabold leading-tight">Built by ECE students, for ECE students — since {site.established}.</h3>
            <p className="mt-5 leading-relaxed text-cyan-50/85">{site.description}</p>
            <ul className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
              {[
                ["🧭", "Transparent governance & open financial records"],
                ["📖", "Academic support: reviewers, tutorials, and seminars"],
                ["🤝", "A community where every student's voice is heard"],
                ["🚀", "Industry exposure through ECETSS and partnerships"],
              ].map(([i, t]) => (
                <li key={t} className="flex items-start gap-3 rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
                  <span className="text-lg">{i}</span>
                  <span className="font-semibold">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Library preview */}
      <Container className="mt-24">
        <SectionHeading
          eyebrow="Library"
          title="Featured on the shelf"
          description="Open-access academic materials, organization records, and design assets."
          action={<ButtonLink href="/library" variant="outlined">Browse the library</ButtonLink>}
        />
        <div className="mt-10 grid gap-5">
          {featured.map((item, i) => (
            <BookBanner key={item.id} item={item} index={i} />
          ))}
        </div>
      </Container>

      {/* CTA */}
      <Container className="mt-24">
        <div className="silk grain relative overflow-hidden rounded-[2rem] px-8 py-14 text-center text-white shadow-m3 sm:px-14">
          <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-cyan-200">Your voice matters</p>
          <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-extrabold sm:text-5xl">Suggestions, concerns, or questions? We&apos;re listening.</h2>
          <p className="mx-auto mt-4 max-w-xl text-cyan-50/90">Submit through the grievance form — anonymously if you prefer — and track your ticket status anytime.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/grievance" variant="cream" className="px-7 py-3.5 text-base">Open the form</ButtonLink>
            <ButtonLink href="/links" variant="text" className="px-7 py-3.5 text-base text-white hover:bg-white/10">Contact the board →</ButtonLink>
          </div>
        </div>
      </Container>
    </>
  );
}
