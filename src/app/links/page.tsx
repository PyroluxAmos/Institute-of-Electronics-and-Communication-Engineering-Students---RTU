import type { Metadata } from "next";
import Image from "next/image";
import { LinkIcon } from "@/components/links/LinkIcon";
import { ButtonLink, Container, PageBanner } from "@/components/ui/primitives";
import { linkGroups } from "@/content/links";
import { officers, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Links & Contact",
  description: "Community group chats, official pages, forms, and how to contact IECES – RTU.",
};

export default function LinksPage() {
  return (
    <>
      <PageBanner
        eyebrow="Stay connected"
        title="Links & Contact"
        description="Every community chat, official page, form, and contact channel of the organization in one place."
        compact
      >
        <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
          {linkGroups.map((g) => (
            <a key={g.id} href={`#${g.id}`} className="pressable shrink-0 rounded-full bg-white/10 px-4 py-2 text-sm font-extrabold text-white ring-1 ring-white/20 backdrop-blur hover:bg-white/20">
              {g.title}
            </a>
          ))}
          <a href="#contact" className="pressable shrink-0 rounded-full bg-cyan-300 px-4 py-2 text-sm font-extrabold text-navy-950">
            Contact the board
          </a>
        </div>
      </PageBanner>

      <Container className="mt-12 grid gap-14">
        {linkGroups.map((g) => (
          <section key={g.id} id={g.id} className="scroll-mt-24">
            <h2 className="font-display text-2xl font-extrabold text-navy-950 sm:text-3xl">{g.title}</h2>
            <p className="mt-1 text-slate-600">{g.blurb}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {g.items.map((item) => {
                const external = item.href.startsWith("http");
                return (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="pressable group flex h-full items-center gap-4 rounded-[1.5rem] bg-white p-4 shadow-m1 ring-1 ring-navy-900/5 transition hover:-translate-y-0.5 hover:shadow-m2"
                    >
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-navy-900 text-white transition group-hover:bg-electric-600">
                        <LinkIcon name={item.icon} className="h-6 w-6" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2">
                          <span className="truncate font-extrabold text-navy-950">{item.label}</span>
                          {item.badge && <span className="shrink-0 rounded-full bg-cyan-100 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-navy-900">{item.badge}</span>}
                        </span>
                        {item.description && <span className="block truncate text-xs font-semibold text-slate-500">{item.description}</span>}
                      </span>
                      <span className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-navy-900">→</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}

        {/* Contact */}
        <section id="contact" className="scroll-mt-24 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="silk grain relative overflow-hidden rounded-[2rem] p-8 text-white shadow-m3 sm:p-10">
            <div className="flex items-center gap-4">
              <span className="relative h-16 w-16 overflow-hidden rounded-full bg-white ring-4 ring-white/20">
                <Image src={site.logo} alt="" fill sizes="64px" className="object-cover" />
              </span>
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-cyan-200">Contact the organization</p>
                <h2 className="font-display text-2xl font-extrabold">{site.shortName}</h2>
              </div>
            </div>
            <dl className="mt-8 grid gap-4 text-sm">
              {[
                ["📧 Official email", site.email, `mailto:${site.email}`],
                ["📧 Alternate email", site.altEmail, `mailto:${site.altEmail}`],
                ["💬 Messenger", "m.me/RTUIECES", site.socials.messenger],
                ["📍 Office", site.officeLocation, undefined],
                ["🕘 Office hours", site.officeHours, undefined],
              ].map(([k, v, href]) => (
                <div key={k} className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/15">
                  <dt className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-cyan-200">{k}</dt>
                  <dd className="mt-1 font-bold">
                    {href ? (
                      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="hover:underline">
                        {v}
                      </a>
                    ) : (
                      v
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href={site.socials.messenger} variant="cream">Message us</ButtonLink>
              <ButtonLink href="/grievance" variant="text" className="text-white hover:bg-white/10">Submit a concern →</ButtonLink>
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-8 shadow-m2 ring-1 ring-navy-900/5">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-electric-600">Executive Board</p>
            <h3 className="font-display text-2xl font-extrabold text-navy-950">Who to reach</h3>
            <ul className="mt-5 divide-y divide-navy-900/5">
              {officers.map((o) => (
                <li key={o.role} className="flex items-center justify-between gap-3 py-3">
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">{o.role}</p>
                    <p className="font-bold text-navy-950">{o.name}</p>
                  </div>
                  {"email" in o && o.email && (
                    <a href={`mailto:${o.email}`} className="text-xs font-extrabold text-electric-600 hover:underline">
                      Email
                    </a>
                  )}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-slate-500">Officer names are updated each academic year in <code className="rounded bg-surface-2 px-1 font-mono">src/content/site.ts</code>.</p>
          </div>
        </section>
      </Container>
    </>
  );
}
