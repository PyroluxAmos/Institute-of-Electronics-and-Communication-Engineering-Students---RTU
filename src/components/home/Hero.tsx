import Image from "next/image";
import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/primitives";

const marquee = ["Transparency", "Academics", "Community", "Innovation", "Service", "Integrity"];

export function Hero() {
  return (
    <section className="silk grain relative -mt-18 overflow-hidden pt-18 text-white">
      {/* silk texture overlay */}
      <Image
        src={site.heroTexture}
        alt=""
        fill
        priority
        sizes="100vw"
        className="pointer-events-none object-cover opacity-35 mix-blend-screen"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-950/40 via-transparent to-navy-950/70" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-5 pb-20 pt-16 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:pb-28 lg:pt-24">
        <div className="animate-rise">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.22em] text-cyan-200 ring-1 ring-white/20 backdrop-blur">
            <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300" />
            Official Academic Organization · Est. {site.established}
          </span>
          <h1 className="mt-6 text-[clamp(2.75rem,8vw,6rem)] font-extrabold leading-[0.95] tracking-tight">
            Easy for you,
            <br />
            <span className="bg-gradient-to-r from-cyan-200 via-white to-cyan-300 bg-clip-text text-transparent">ECE for us.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-cyan-50/90 sm:text-xl">
            The transparency hub of the <strong className="font-extrabold text-white">{site.name}</strong>. Announcements,
            finances, GPOA, academic materials, and a direct line to your officers — all in one place.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/bulletin" variant="cream" className="px-7 py-3.5 text-base">
              Open Bulletin Board
            </ButtonLink>
            <ButtonLink href="/grievance" className="bg-cyan-300 px-7 py-3.5 text-base text-navy-950 hover:bg-cyan-200">
              Raise a Concern
            </ButtonLink>
            <ButtonLink href="/library" variant="text" className="px-5 py-3.5 text-base text-white hover:bg-white/10">
              Browse Library →
            </ButtonLink>
          </div>
          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-4">
            {[
              ["40+", "Years of service"],
              ["3.8K", "Community followers"],
              ["100%", "Open records"],
            ].map(([v, l]) => (
              <div key={l} className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/15 backdrop-blur">
                <dt className="font-display text-2xl font-extrabold sm:text-3xl">{v}</dt>
                <dd className="text-xs font-semibold uppercase tracking-wider text-cyan-200">{l}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto flex w-full max-w-md items-center justify-center lg:max-w-none">
          <div className="absolute h-[22rem] w-[22rem] rounded-full bg-cyan-300/30 blur-3xl sm:h-[28rem] sm:w-[28rem]" />
          <div className="animate-float relative">
            <div className="absolute -inset-6 rounded-full border border-white/20" />
            <div className="absolute -inset-12 rounded-full border border-white/10" />
            <div className="relative h-64 w-64 overflow-hidden rounded-full bg-white shadow-m4 ring-8 ring-white/20 sm:h-80 sm:w-80 lg:h-[22rem] lg:w-[22rem]">
              <Image src={site.logo} alt={`${site.name} seal`} fill priority sizes="(min-width:1024px) 352px, 320px" className="object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="relative border-t border-white/10 bg-navy-950/40 py-3 backdrop-blur">
        <div className="flex overflow-hidden">
          <div className="animate-marquee flex shrink-0 gap-10 pr-10">
            {[...marquee, ...marquee, ...marquee, ...marquee].map((w, i) => (
              <span key={i} className="flex items-center gap-10 text-xs font-extrabold uppercase tracking-[0.3em] text-cyan-100/80">
                {w} <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
