"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation, site } from "@/content/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/85 shadow-m2 backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label={`${site.shortName} home`}>
          <span className="relative h-11 w-11 overflow-hidden rounded-full bg-white shadow-m2 ring-2 ring-white">
            <Image src={site.logo} alt="" fill sizes="44px" className="object-cover" priority />
          </span>
          <span className="hidden flex-col leading-none sm:flex">
            <span className={cn("font-display text-lg font-extrabold tracking-tight", scrolled || pathname !== "/" ? "text-navy-950" : "text-white")}>
              {site.shortName}
            </span>
            <span className={cn("text-[11px] font-bold uppercase tracking-[0.18em]", scrolled || pathname !== "/" ? "text-electric-600" : "text-cyan-200")}>
              Est. {site.established}
            </span>
          </span>
        </Link>

        {/* Desktop */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => {
            const active = isActive(item.href);
            const accent = "accent" in item && item.accent;
            const onDark = !scrolled && pathname === "/";
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "pressable rounded-full px-4 py-2.5 text-sm font-bold transition-colors",
                    accent
                      ? "ml-2 bg-cyan-300 text-navy-950 shadow-m2 hover:bg-cyan-200"
                      : active
                        ? onDark
                          ? "bg-white/15 text-white"
                          : "bg-navy-900 text-white"
                        : onDark
                          ? "text-white/85 hover:bg-white/10 hover:text-white"
                          : "text-navy-900 hover:bg-navy-900/5",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle navigation"
          className={cn(
            "pressable grid h-11 w-11 place-items-center rounded-full lg:hidden",
            scrolled || pathname !== "/" ? "bg-navy-900 text-white" : "bg-white/15 text-white backdrop-blur",
          )}
        >
          <span className="relative block h-4 w-5">
            <span className={cn("absolute left-0 top-0 h-0.5 w-5 rounded bg-current transition-all", open && "top-1.5 rotate-45")} />
            <span className={cn("absolute left-0 top-1.5 h-0.5 w-5 rounded bg-current transition-all", open && "opacity-0")} />
            <span className={cn("absolute left-0 top-3 h-0.5 w-5 rounded bg-current transition-all", open && "top-1.5 -rotate-45")} />
          </span>
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={cn(
          "overflow-hidden bg-white shadow-m3 transition-[max-height,opacity] duration-300 lg:hidden",
          open ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <ul className="grid gap-1 px-5 pb-5 pt-2">
          {navigation.map((item) => {
            const accent = "accent" in item && item.accent;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-bold",
                    accent ? "bg-cyan-300 text-navy-950" : isActive(item.href) ? "bg-navy-900 text-white" : "bg-surface-2 text-navy-900",
                  )}
                >
                  {item.label}
                  <span aria-hidden>→</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
