import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl().replace(/\/$/, "");
  const now = new Date();
  return ["/", "/bulletin", "/grievance", "/library", "/library/records", "/library/designs", "/calendar", "/links"].map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: p === "/bulletin" ? "daily" : "weekly",
    priority: p === "/" ? 1 : 0.8,
  }));
}
