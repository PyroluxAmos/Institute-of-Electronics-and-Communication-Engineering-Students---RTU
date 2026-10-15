import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ───────── Buttons ───────── */
type ButtonVariant = "filled" | "tonal" | "outlined" | "text" | "cream";
const variants: Record<ButtonVariant, string> = {
  filled: "bg-navy-900 text-white hover:bg-navy-800 shadow-m2 hover:shadow-m3",
  tonal: "bg-cyan-100 text-navy-900 hover:bg-cyan-200",
  outlined: "border-2 border-navy-900/15 text-navy-900 hover:border-navy-900/40 hover:bg-white",
  text: "text-navy-900 hover:bg-navy-900/5",
  cream: "bg-cream-100 text-navy-900 hover:bg-cream-200 shadow-m2",
};
const base =
  "pressable inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold tracking-wide transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-cyan-300/50 disabled:opacity-50 disabled:pointer-events-none";

export function Button({ variant = "filled", className, ...props }: ComponentProps<"button"> & { variant?: ButtonVariant }) {
  return <button className={cn(base, variants[variant], className)} {...props} />;
}

export function ButtonLink({
  variant = "filled",
  className,
  href,
  external,
  ...props
}: ComponentProps<"a"> & { variant?: ButtonVariant; href: string; external?: boolean }) {
  if (external || href.startsWith("http")) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className={cn(base, variants[variant], className)} {...props} />;
  }
  return <Link href={href} className={cn(base, variants[variant], className)} {...props} />;
}

/* ───────── Card ───────── */
export function Card({ className, children, elevated = 1 }: { className?: string; children: ReactNode; elevated?: 0 | 1 | 2 | 3 }) {
  const shadow = ["", "shadow-m1", "shadow-m2", "shadow-m3"][elevated];
  return <div className={cn("rounded-[1.5rem] bg-white", shadow, className)}>{children}</div>;
}

/* ───────── Chip / Badge ───────── */
export function Chip({ className, children, active }: { className?: string; children: ReactNode; active?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ring-1 ring-inset",
        active ? "bg-navy-900 text-white ring-navy-900" : "bg-surface-2 text-navy-900 ring-navy-900/10",
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ───────── Section heading ───────── */
export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  light,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between", className)}>
      <div className="max-w-2xl">
        {eyebrow && (
          <p className={cn("mb-2 text-xs font-extrabold uppercase tracking-[0.2em]", light ? "text-cyan-200" : "text-electric-600")}>
            {eyebrow}
          </p>
        )}
        <h2 className={cn("text-3xl font-extrabold leading-tight sm:text-4xl", light ? "text-white" : "text-navy-950")}>{title}</h2>
        {description && <p className={cn("mt-3 text-base leading-relaxed", light ? "text-cyan-100/90" : "text-slate-600")}>{description}</p>}
      </div>
      {action}
    </div>
  );
}

/* ───────── Page hero banner ───────── */
export function PageBanner({
  eyebrow,
  title,
  description,
  children,
  compact,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
  compact?: boolean;
}) {
  return (
    <section className={cn("silk grain relative overflow-hidden text-white", compact ? "py-14 sm:py-16" : "py-20 sm:py-24")}>
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-electric-400/20 blur-3xl" />
      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
        <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.25em] text-cyan-200">{eyebrow}</p>
        <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">{title}</h1>
        {description && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-cyan-50/90">{description}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}

/* ───────── Container ───────── */
export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}>{children}</div>;
}
