"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Post, PostCategory } from "@/db/schema";
import { postCategories } from "@/db/schema";
import { categoryMeta } from "@/lib/meta";
import { PostCard } from "./PostCard";
import { cn } from "@/lib/utils";

type Category = PostCategory | "all";
type FeedResponse = { items: Post[]; nextCursor: number | null; total: number };

export function Feed({ initial, initialCategory = "all" }: { initial: FeedResponse; initialCategory?: Category }) {
  const [category, setCategory] = useState<Category>(initialCategory);
  const [items, setItems] = useState<Post[]>(initial.items);
  const [cursor, setCursor] = useState<number | null>(initial.nextCursor);
  const [total, setTotal] = useState(initial.total);
  const [loading, setLoading] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);

  const load = useCallback(
    async (page: number, cat: Category, replace = false) => {
      setLoading(true);
      try {
        const res = await fetch(`/api/posts?page=${page}&category=${cat}`, { cache: "no-store" });
        const data = (await res.json()) as FeedResponse;
        setItems((prev) => (replace ? data.items : [...prev, ...data.items]));
        setCursor(data.nextCursor);
        setTotal(data.total);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  function changeCategory(cat: Category) {
    if (cat === category) return;
    setCategory(cat);
    setItems([]);
    setCursor(null);
    void load(0, cat, true);
    const url = new URL(window.location.href);
    if (cat === "all") url.searchParams.delete("category");
    else url.searchParams.set("category", cat);
    window.history.replaceState(null, "", url.toString());
  }

  useEffect(() => {
    const el = sentinel.current;
    if (!el || cursor === null) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && cursor !== null) void load(cursor, category);
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [cursor, loading, category, load]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
      <div className="min-w-0">
        {/* Category chips */}
        <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-4 sm:mx-0 sm:flex-wrap sm:px-0">
          <FilterChip active={category === "all"} onClick={() => changeCategory("all")}>
            All posts
          </FilterChip>
          {postCategories.map((c) => (
            <FilterChip key={c} active={category === c} onClick={() => changeCategory(c)}>
              {categoryMeta[c].label}
            </FilterChip>
          ))}
        </div>

        <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
          {total} {total === 1 ? "post" : "posts"} {category !== "all" && `· ${categoryMeta[category].label}`}
        </p>

        <div className="grid gap-5">
          {items.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
          {loading &&
            Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="h-72 animate-pulse rounded-[1.5rem] bg-white ring-1 ring-navy-900/5" />
            ))}
          {!loading && items.length === 0 && (
            <div className="rounded-[1.5rem] bg-white p-10 text-center ring-1 ring-navy-900/5">
              <p className="text-4xl">🗂️</p>
              <p className="mt-3 font-extrabold text-navy-950">Nothing here yet</p>
              <p className="text-sm text-slate-500">Posts in this category will appear as soon as they are published.</p>
            </div>
          )}
        </div>
        <div ref={sentinel} className="h-8" />
        {cursor === null && items.length > 0 && (
          <p className="py-6 text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-400">You&apos;re all caught up</p>
        )}
      </div>

      {/* Sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-24 grid gap-4">
          <div className="rounded-[1.5rem] bg-white p-5 shadow-m1 ring-1 ring-navy-900/5">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-electric-600">Categories</p>
            <ul className="mt-3 grid gap-1">
              {postCategories.map((c) => (
                <li key={c}>
                  <button
                    type="button"
                    onClick={() => changeCategory(c)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-bold transition",
                      category === c ? "bg-navy-900 text-white" : "text-navy-900 hover:bg-surface-2",
                    )}
                  >
                    {categoryMeta[c].label}
                    <span className={cn("text-xs font-semibold", category === c ? "text-cyan-200" : "text-slate-400")}>{categoryMeta[c].description}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="silk grain relative overflow-hidden rounded-[1.5rem] p-5 text-white shadow-m2">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-cyan-200">Have something to say?</p>
            <p className="mt-2 font-display text-xl font-extrabold">Raise a concern or suggestion</p>
            <a href="/grievance" className="pressable mt-4 inline-flex rounded-full bg-cyan-300 px-4 py-2 text-sm font-extrabold text-navy-950">
              Open grievance form →
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "pressable shrink-0 rounded-full px-4 py-2 text-sm font-bold ring-1 ring-inset transition",
        active ? "bg-navy-900 text-white ring-navy-900 shadow-m2" : "bg-white text-navy-900 ring-navy-900/10 hover:bg-cyan-100",
      )}
    >
      {children}
    </button>
  );
}
