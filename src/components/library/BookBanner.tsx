import Image from "next/image";
import type { LibraryItem } from "@/content/library";
import { cn, formatDate } from "@/lib/utils";

/** Spine colors — pick one per item in /src/content/library.ts */
const SPINE_COLORS: Record<NonNullable<LibraryItem["spine"]>, { cover: string; spine: string; banner: string; text: string }> = {
  navy: { cover: "from-navy-800 to-navy-950", spine: "bg-navy-950", banner: "from-navy-900 via-navy-800 to-electric-600", text: "text-white" },
  blue: { cover: "from-electric-500 to-navy-800", spine: "bg-navy-900", banner: "from-electric-600 via-navy-800 to-navy-900", text: "text-white" },
  cyan: { cover: "from-cyan-300 to-electric-600", spine: "bg-electric-600", banner: "from-cyan-300 via-electric-500 to-navy-800", text: "text-white" },
  cream: { cover: "from-cream-100 to-cream-200", spine: "bg-cream-200", banner: "from-cream-100 via-white to-cyan-100", text: "text-navy-950" },
  slate: { cover: "from-slate-600 to-slate-900", spine: "bg-slate-900", banner: "from-slate-800 via-slate-700 to-navy-800", text: "text-white" },
  indigo: { cover: "from-indigo-500 to-indigo-900", spine: "bg-indigo-950", banner: "from-indigo-800 via-indigo-700 to-electric-600", text: "text-white" },
};

const formatIcon: Record<string, string> = {
  PDF: "📕",
  DOCX: "📘",
  PPTX: "📙",
  ZIP: "🗜️",
  PNG: "🖼️",
  IMAGE: "🖼️",
  LINK: "🔗",
  FIGMA: "🎨",
};

export function BookBanner({ item, index = 0 }: { item: LibraryItem; index?: number }) {
  const palette = SPINE_COLORS[item.spine ?? "navy"];
  const external = item.href.startsWith("http");
  const light = palette.text === "text-white";

  return (
    <a
      href={item.href}
      target={external || item.format !== "LINK" ? "_blank" : undefined}
      rel="noopener noreferrer"
      style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
      className={cn(
        "group animate-rise relative block overflow-hidden rounded-[1.75rem] bg-gradient-to-r shadow-m2 ring-1 ring-navy-900/10 transition hover:-translate-y-0.5 hover:shadow-m3",
        palette.banner,
        palette.text,
      )}
    >
      {/* subtle silk highlight */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_200px_at_80%_0%,rgba(255,255,255,0.22),transparent)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:repeating-linear-gradient(135deg,rgba(255,255,255,.6)_0_1px,transparent_1px_14px)]" />

      <div className="relative grid min-h-[11.5rem] grid-cols-[6.5rem_1fr] items-center gap-4 p-4 sm:grid-cols-[9rem_1fr_auto] sm:gap-6 sm:p-6">
        {/* Book */}
        <div className="relative flex h-full items-center justify-center [perspective:900px]">
          <div className="book relative h-36 w-24 sm:h-40 sm:w-28">
            {/* pages */}
            <div className="absolute inset-y-1 -right-1.5 w-2 rounded-r-sm bg-white/90 shadow-inner" />
            <div className="absolute inset-y-1.5 -right-2.5 w-1.5 rounded-r-sm bg-white/70" />
            {/* spine */}
            <div className={cn("absolute inset-y-0 left-0 w-3 rounded-l-md", palette.spine)} />
            {/* cover */}
            <div className={cn("absolute inset-0 overflow-hidden rounded-r-md rounded-l-sm bg-gradient-to-br shadow-m3", palette.cover)}>
              {item.cover ? (
                <Image src={item.cover} alt="" fill sizes="112px" className="object-cover opacity-90" />
              ) : (
                <div className="flex h-full flex-col justify-between p-2.5 pl-4">
                  <span className={cn("text-[9px] font-extrabold uppercase tracking-[0.2em]", light ? "text-white/70" : "text-navy-900/60")}>IECES</span>
                  <span className={cn("font-display text-[11px] font-extrabold leading-tight", light ? "text-white" : "text-navy-950", item.spine === "cream" && "text-navy-950")}>
                    {item.title}
                  </span>
                  <span className={cn("text-[9px] font-bold", light ? "text-white/70" : "text-navy-900/60")}>{item.year}</span>
                </div>
              )}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/30 to-transparent" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/30" />
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className={cn("rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.18em]", light ? "bg-white/15 text-white" : "bg-navy-900/10 text-navy-900")}>
              {item.category}
            </span>
            <span className={cn("text-[10px] font-extrabold uppercase tracking-[0.18em]", light ? "text-white/70" : "text-navy-900/60")}>
              {formatIcon[item.format] ?? "📄"} {item.format}
              {item.size && ` · ${item.size}`}
              {item.pages && ` · ${item.pages} pages`}
            </span>
            {item.featured && (
              <span className="rounded-full bg-cyan-300 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-navy-950">Featured</span>
            )}
          </div>
          <h3 className="mt-2 font-display text-xl font-extrabold leading-tight sm:text-2xl lg:text-3xl">{item.title}</h3>
          {item.subtitle && <p className={cn("mt-0.5 text-sm font-bold sm:text-base", light ? "text-cyan-100" : "text-navy-800")}>{item.subtitle}</p>}
          <p className={cn("mt-2 line-clamp-2 text-sm leading-relaxed", light ? "text-white/80" : "text-navy-900/75")}>{item.description}</p>
          <p className={cn("mt-3 text-xs font-semibold", light ? "text-white/60" : "text-navy-900/60")}>
            {item.author && <>By {item.author} · </>}
            {item.year}
            {item.updatedAt && <> · Updated {formatDate(item.updatedAt)}</>}
          </p>
          {item.tags && item.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {item.tags.map((t) => (
                <span key={t} className={cn("rounded-md px-1.5 py-0.5 text-[10px] font-bold", light ? "bg-black/20 text-white/80" : "bg-navy-900/10 text-navy-900")}>
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Action */}
        <div className="col-span-2 flex items-center justify-end sm:col-span-1 sm:self-stretch">
          <span
            className={cn(
              "pressable inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-extrabold shadow-m2 transition group-hover:gap-3",
              light ? "bg-white text-navy-950" : "bg-navy-900 text-white",
            )}
          >
            {item.format === "LINK" ? "Open link" : "Open / Download"} <span aria-hidden>→</span>
          </span>
        </div>
      </div>
    </a>
  );
}
