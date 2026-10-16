import { cn } from "@/lib/utils";

/**
 * Inline fallback-safe brand mark. Because this is SVG markup—not a fetched image—
 * the logo remains visible even when uploaded binary assets are missing.
 */
export function BrandMark({ className, decorative = false }: { className?: string; decorative?: boolean }) {
  return (
    <svg
      viewBox="0 0 120 120"
      role={decorative ? undefined : "img"}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : "IECES RTU seal"}
      className={cn("block h-full w-full", className)}
    >
      <defs>
        <linearGradient id="brand-blue" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#42a5f5" />
          <stop offset="1" stopColor="#061a3a" />
        </linearGradient>
        <linearGradient id="brand-cream" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#fffdf5" />
          <stop offset="1" stopColor="#ded3af" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="58" fill="url(#brand-blue)" />
      <circle cx="60" cy="60" r="51" fill="#fff" stroke="#e8dfc3" strokeWidth="2" />
      <circle cx="60" cy="60" r="39" fill="#0b2a5b" stroke="#e8dfc3" strokeWidth="3" />
      <g fill="none" stroke="url(#brand-cream)" strokeWidth="1.8" transform="translate(60 51)">
        <ellipse rx="23" ry="9" />
        <ellipse rx="23" ry="9" transform="rotate(60)" />
        <ellipse rx="23" ry="9" transform="rotate(120)" />
        <circle r="3" fill="#fff" stroke="none" />
      </g>
      <g fill="url(#brand-cream)">
        <circle cx="48" cy="77" r="5" />
        <circle cx="72" cy="77" r="5" />
        <path d="M38 95c1-11 5-17 10-17s9 6 10 17H38zm24 0c1-11 5-17 10-17s9 6 10 17H62z" />
        <rect x="51" y="83" width="18" height="15" rx="2" />
      </g>
      <text x="60" y="92" textAnchor="middle" fill="#0b2a5b" fontFamily="Arial,sans-serif" fontSize="5" fontWeight="900">
        IECES
      </text>
      <text x="60" y="113" textAnchor="middle" fill="#0b2a5b" fontFamily="Arial,sans-serif" fontSize="7" fontWeight="900" letterSpacing="2">
        RTU
      </text>
    </svg>
  );
}
