"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { shelves, type LibraryItem, type Shelf as ShelfKey } from "@/content/library";
import { BookBanner } from "./BookBanner";
import { cn } from "@/lib/utils";

const tabs: { key: ShelfKey; label: string; icon: string }[] = [
  { key: "academic", label: "Academic Materials", icon: "📚" },
  { key: "record", label: "Records", icon: "🗄️" },
  { key: "design", label: "Design & Visuals", icon: "🎨" },
];

export function ShelfTabs({ active }: { active: ShelfKey }) {
  return (
    <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0">
      {tabs.map((t) => (
        <Link
          key={t.key}
          href={shelves[t.key].href}
          className={cn(
            "pressable inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-3 text-sm font-extrabold ring-1 ring-inset transition",
            active === t.key ? "bg-navy-900 text-white ring-navy-900 shadow-m2" : "bg-white text-navy-900 ring-navy-900/10 hover:bg-cyan-100",
          )}
        >
          <span>{t.icon}</span>
          {t.label}
          <span className={cn("rounded-full px-2 py-0.5 text-[10px]", active === t.key ? "bg-white/15" : "bg-surface-2")}>{shelves[t.key].items.length}</span>
        </Link>
      ))}
    </div>
  );
}

export function Shelf({ items }: { items: LibraryItem[] }) {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [sort, setSort] = useState<"recent" | "title">("recent");

  const categories = useMemo(() => Array.from(new Set(items.map((i) => i.category))), [items]);

  const visible = useMemo(() => {
    const term = q.trim().toLowerCase();
    return items
      .filter((i) => category === "all" || i.category === category)
      .filter(
        (i) =>
          !term ||
          [i.title, i.subtitle, i.description, i.author, i.category, ...(i.tags ?? [])]
            .filter(Boolean)
            .join(" ")
            .toLowerCase()
            .includes(term),
      )
      .sort((a, b) => {
        if (sort === "title") return a.title.localeCompare(b.title);
        return (b.updatedAt ?? "").localeCompare(a.updatedAt ?? "");
      });
  }, [items, q, category, sort]);

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col gap-3 rounded-[1.5rem] bg-white p-3 shadow-m1 ring-1 ring-navy-900/5 sm:flex-row sm:items-center">
        <label className="flex flex-1 items-center gap-3 rounded-full bg-surface-2 px-4 py-3 ring-1 ring-transparent focus-within:bg-white focus-within:ring-cyan-300">
          <span aria-hidden>🔎</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search titles, subjects, tags…"
            className="w-full bg-transparent text-sm font-semibold text-navy-950 outline-none placeholder:text-slate-400"
          />
        </label>
        <div className="flex gap-2">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-full bg-surface-2 px-4 py-3 text-sm font-bold text-navy-900 outline-none focus:ring-2 focus:ring-cyan-300"
          >
            <option value="all">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as "recent" | "title")}
            className="rounded-full bg-surface-2 px-4 py-3 text-sm font-bold text-navy-900 outline-none focus:ring-2 focus:ring-cyan-300"
          >
            <option value="recent">Recently updated</option>
            <option value="title">Title A–Z</option>
          </select>
        </div>
      </div>

      <p className="mb-4 mt-6 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
        {visible.length} {visible.length === 1 ? "item" : "items"}
      </p>

      {/* Shelf */}
      <div className="relative grid gap-5">
        {visible.map((item, i) => (
          <BookBanner key={item.id} item={item} index={i} />
        ))}
        {visible.length === 0 && (
          <div className="rounded-[1.5rem] bg-white p-12 text-center ring-1 ring-navy-900/5">
            <p className="text-4xl">📭</p>
            <p className="mt-3 font-extrabold text-navy-950">No materials match your search</p>
            <p className="text-sm text-slate-500">Try a different keyword or clear the filters.</p>
          </div>
        )}
      </div>

      {/* wooden shelf edge */}
      <div className="mt-6 h-3 rounded-full bg-gradient-to-r from-cream-200 via-cream-100 to-cream-200 shadow-m2" />
      <div className="mx-6 h-2 rounded-b-full bg-navy-900/10" />
    </div>
  );
}
