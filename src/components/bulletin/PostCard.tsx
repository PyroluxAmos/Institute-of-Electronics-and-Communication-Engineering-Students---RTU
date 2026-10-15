"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Post, PostCategory } from "@/db/schema";
import { categoryMeta } from "@/lib/meta";
import { site } from "@/content/site";
import { cn, timeAgo } from "@/lib/utils";

type SerializedPost = Omit<Post, "createdAt" | "updatedAt"> & { createdAt: string | Date; updatedAt: string | Date };

export function PostCard({ post, expanded = false }: { post: SerializedPost; expanded?: boolean }) {
  const [reactions, setReactions] = useState(post.reactions);
  const [reacted, setReacted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showAll, setShowAll] = useState(expanded);
  const meta = categoryMeta[post.category as PostCategory] ?? categoryMeta.announcement;
  const paragraphs = post.body.split(/\n{2,}/);
  const long = post.body.length > 320 && !showAll;

  async function react() {
    if (reacted) return;
    setReacted(true);
    setReactions((r) => r + 1);
    try {
      const res = await fetch(`/api/posts/${post.id}/react`, { method: "POST" });
      const data = (await res.json()) as { reactions?: number };
      if (typeof data.reactions === "number") setReactions(data.reactions);
    } catch {
      /* optimistic */
    }
  }

  async function share() {
    const url = `${window.location.origin}/bulletin/${post.slug}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: post.title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* dismissed */
    }
  }

  return (
    <article className="animate-rise overflow-hidden rounded-[1.5rem] bg-white shadow-m1 ring-1 ring-navy-900/5 transition hover:shadow-m2">
      <header className="flex items-start gap-3 px-5 pt-5">
        <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-white ring-2 ring-cyan-100">
          <Image src={site.logo} alt="" fill sizes="44px" className="object-cover" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <p className="truncate text-sm font-extrabold text-navy-950">{post.author}</p>
            <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider ring-1 ring-inset", meta.color)}>
              {meta.label}
            </span>
            {post.pinned && (
              <span className="inline-flex items-center gap-1 rounded-full bg-navy-900 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white">
                📌 Pinned
              </span>
            )}
          </div>
          <p className="text-xs font-medium text-slate-500">
            <time dateTime={new Date(post.createdAt).toISOString()}>{timeAgo(post.createdAt)}</time> · 🌐 Public
          </p>
        </div>
      </header>

      <div className="px-5 pt-4">
        <h3 className="text-xl font-extrabold leading-snug text-navy-950">
          {expanded ? post.title : <Link href={`/bulletin/${post.slug}`} className="hover:underline">{post.title}</Link>}
        </h3>
        <div className={cn("mt-2 space-y-3 text-[15px] leading-relaxed text-slate-700", long && "line-clamp-4")}>
          {paragraphs.map((p, i) => (
            <p key={i} className="whitespace-pre-line">
              {p}
            </p>
          ))}
        </div>
        {long && (
          <button type="button" onClick={() => setShowAll(true)} className="mt-1 text-sm font-bold text-electric-600 hover:underline">
            See more
          </button>
        )}
        {post.attachmentUrl && (
          <a
            href={post.attachmentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center gap-3 rounded-2xl bg-surface-2 p-3 ring-1 ring-navy-900/5 transition hover:bg-cyan-100"
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-navy-900 text-white">📎</span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-bold text-navy-950">{post.attachmentLabel || "Attachment"}</span>
              <span className="block truncate text-xs text-slate-500">{post.attachmentUrl}</span>
            </span>
          </a>
        )}
      </div>

      {post.imageUrl && (
        <Link href={expanded ? post.imageUrl : `/bulletin/${post.slug}`} className="relative mt-4 block aspect-square w-full bg-navy-950 sm:aspect-[4/3]">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            sizes="(min-width: 1024px) 680px, 100vw"
            className="object-contain"
          />
        </Link>
      )}

      <footer className="mt-1 flex items-center justify-between px-5 py-3">
        <p className="text-xs font-semibold text-slate-500">
          <span className="mr-1 inline-grid h-5 w-5 place-items-center rounded-full bg-gradient-to-br from-rose-500 to-pink-500 text-[10px] text-white">♥</span>
          {reactions.toLocaleString()} {reactions === 1 ? "reaction" : "reactions"}
        </p>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={react}
            className={cn(
              "pressable inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition",
              reacted ? "bg-rose-50 text-rose-600" : "text-slate-600 hover:bg-surface-2",
            )}
          >
            <span className={cn("text-base transition", reacted && "scale-125")}>{reacted ? "❤️" : "🤍"}</span> Love
          </button>
          <button
            type="button"
            onClick={share}
            className="pressable inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-surface-2"
          >
            <span aria-hidden>↗</span> {copied ? "Copied!" : "Share"}
          </button>
        </div>
      </footer>
    </article>
  );
}
