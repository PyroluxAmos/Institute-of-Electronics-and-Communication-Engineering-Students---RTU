"use client";

import { SafeImage } from "@/components/ui/SafeImage";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Displays the original raster logo from /public/brand/logo.png.
 * The image is never converted or redrawn. SafeImage only supplies an
 * emergency fallback if the PNG was omitted from a deployment.
 */
export function LogoImage({
  className,
  sizes = "64px",
  priority = false,
}: {
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <SafeImage
      src={site.logo}
      alt={`${site.name} official logo`}
      sizes={sizes}
      className={cn("object-contain", className)}
      fallbackLabel={site.shortName}
      priority={priority}
    />
  );
}
