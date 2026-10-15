import Image from "next/image";
import Link from "next/link";
import { navigation, site } from "@/content/site";
import { LinkIcon } from "@/components/links/LinkIcon";

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-navy-950 text-white">
      <div className="silk grain absolute inset-x-0 top-0 h-1.5" />
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-4">
            <span className="relative h-16 w-16 overflow-hidden rounded-full bg-white ring-4 ring-white/10">
              <Image src={site.logo} alt={`${site.shortName} seal`} fill sizes="64px" className="object-cover" />
            </span>
            <div>
              <p className="font-display text-xl font-extrabold leading-tight">{site.name}</p>
              <p className="text-sm font-semibold text-cyan-200">Est. {site.established} · {site.campus}</p>
            </div>
          </div>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-white/70">{site.description}</p>
          <p className="mt-6 font-display text-2xl font-extrabold tracking-tight text-cyan-300">{site.tagline}</p>
        </div>

        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-cyan-200">Navigate</p>
          <ul className="mt-4 grid gap-2.5">
            {navigation.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-sm font-semibold text-white/80 transition hover:text-white">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/library/records" className="text-sm font-semibold text-white/80 transition hover:text-white">
                Records
              </Link>
            </li>
            <li>
              <Link href="/library/designs" className="text-sm font-semibold text-white/80 transition hover:text-white">
                Design Materials
              </Link>
            </li>
            <li>
              <Link href="/admin" className="text-sm font-semibold text-white/50 transition hover:text-white">
                Officer Login
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-cyan-200">Contact</p>
          <ul className="mt-4 grid gap-2.5 text-sm text-white/80">
            <li>
              <a href={`mailto:${site.email}`} className="font-semibold hover:text-white">
                {site.email}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.altEmail}`} className="font-semibold hover:text-white">
                {site.altEmail}
              </a>
            </li>
            <li className="text-white/60">{site.officeLocation}</li>
            <li className="text-white/60">{site.officeHours}</li>
          </ul>
          <div className="mt-5 flex gap-2">
            {(
              [
                ["facebook", site.socials.facebook],
                ["instagram", site.socials.instagram],
                ["tiktok", site.socials.tiktok],
                ["messenger", site.socials.messenger],
              ] as const
            ).map(([icon, href]) => (
              <a
                key={icon}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={icon}
                className="pressable grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-cyan-300 hover:text-navy-950"
              >
                <LinkIcon name={icon} className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-2 px-5 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:px-8">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Built with Next.js · Deployed on Vercel</p>
        </div>
      </div>
    </footer>
  );
}
