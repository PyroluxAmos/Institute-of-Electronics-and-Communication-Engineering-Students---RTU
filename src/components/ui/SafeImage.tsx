"use client";

import Image from "next/image";
import { useState } from "react";
import { BrandMark } from "@/components/brand/BrandMark";
import { cn } from "@/lib/utils";

export function SafeImage({
  src,
  alt,
  sizes,
  className,
  fallbackLabel = "IECES – RTU",
  priority = false,
  hideOnError = false,
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  fallbackLabel?: string;
  priority?: boolean;
  hideOnError?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (failed && hideOnError) return null;

  if (failed) {
    return (
      <div className="absolute inset-0 grid place-items-center overflow-hidden bg-gradient-to-br from-navy-950 via-navy-800 to-electric-600 p-8 text-center text-white">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="relative">
          <div className="mx-auto h-24 w-24 rounded-full bg-white shadow-m3 ring-4 ring-white/20">
            <BrandMark decorative />
          </div>
          <p className="mt-5 font-display text-xl font-extrabold">{fallbackLabel}</p>
          <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">Visual material unavailable</p>
        </div>
      </div>
    );
  }

  return <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={cn("object-cover", className)} onError={() => setFailed(true)} />;
}
