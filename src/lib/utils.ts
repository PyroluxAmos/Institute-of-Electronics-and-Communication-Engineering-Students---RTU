export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(input: Date | string, opts: Intl.DateTimeFormatOptions = {}) {
  const d = typeof input === "string" ? new Date(input.length === 10 ? `${input}T00:00:00` : input) : input;
  return d.toLocaleDateString("en-PH", { year: "numeric", month: "short", day: "numeric", ...opts });
}

export function timeAgo(input: Date | string) {
  const d = typeof input === "string" ? new Date(input) : input;
  const diff = (Date.now() - d.getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86_400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 7 * 86_400) return `${Math.floor(diff / 86_400)}d ago`;
  return formatDate(d);
}

export function siteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
    "http://localhost:3000"
  );
}
