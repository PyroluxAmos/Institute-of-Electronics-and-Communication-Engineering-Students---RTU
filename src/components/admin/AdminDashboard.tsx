"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import type { Grievance, GrievanceStatus, Post } from "@/db/schema";
import { postCategories } from "@/db/schema";
import { categoryMeta, grievanceStatusMeta, grievanceTypeMeta } from "@/lib/meta";
import { Button } from "@/components/ui/primitives";
import { cn, formatDate } from "@/lib/utils";
import type { GrievanceType } from "@/db/schema";

const inputCls =
  "w-full rounded-2xl bg-surface-2 px-4 py-3 text-sm font-semibold text-navy-950 outline-none ring-1 ring-transparent focus:bg-white focus:ring-2 focus:ring-cyan-300";

export function AdminDashboard({ posts, grievances }: { posts: Post[]; grievances: Grievance[] }) {
  const router = useRouter();
  const [tab, setTab] = useState<"posts" | "grievances">("posts");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function createPost(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setBusy(true);
    setMsg(null);
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: fd.get("title"),
        body: fd.get("body"),
        category: fd.get("category"),
        imageUrl: fd.get("imageUrl"),
        attachmentUrl: fd.get("attachmentUrl"),
        attachmentLabel: fd.get("attachmentLabel"),
        author: fd.get("author"),
        pinned: fd.get("pinned") === "on",
      }),
    });
    setBusy(false);
    if (res.ok) {
      e.currentTarget.reset();
      setMsg("Post published ✔");
      router.refresh();
    } else {
      const d = (await res.json()) as { error?: string };
      setMsg(d.error || "Failed to publish.");
    }
  }

  async function pin(p: Post) {
    await fetch(`/api/posts/${p.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ pinned: !p.pinned }) });
    router.refresh();
  }
  async function remove(p: Post) {
    if (!confirm(`Delete "${p.title}"? This cannot be undone.`)) return;
    await fetch(`/api/posts/${p.id}`, { method: "DELETE" });
    router.refresh();
  }
  async function setStatus(g: Grievance, status: GrievanceStatus) {
    await fetch(`/api/grievances/${g.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    router.refresh();
  }
  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex rounded-full bg-white p-1 shadow-m1 ring-1 ring-navy-900/5">
          {(["posts", "grievances"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn("pressable rounded-full px-5 py-2 text-sm font-extrabold capitalize", tab === t ? "bg-navy-900 text-white" : "text-navy-900")}
            >
              {t} <span className="ml-1 text-xs opacity-70">({t === "posts" ? posts.length : grievances.length})</span>
            </button>
          ))}
        </div>
        <Button variant="outlined" onClick={logout}>
          Log out
        </Button>
      </div>

      {tab === "posts" ? (
        <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
          <form onSubmit={createPost} className="grid h-fit gap-3 rounded-[1.5rem] bg-white p-6 shadow-m2 ring-1 ring-navy-900/5">
            <p className="font-display text-xl font-extrabold text-navy-950">New post</p>
            <input name="title" required placeholder="Title" className={inputCls} />
            <select name="category" className={inputCls} defaultValue="announcement">
              {postCategories.map((c) => (
                <option key={c} value={c}>
                  {categoryMeta[c].label}
                </option>
              ))}
            </select>
            <textarea name="body" required rows={6} placeholder="Write the post… (blank line = new paragraph)" className={cn(inputCls, "resize-y")} />
            <input name="imageUrl" placeholder="Image URL — e.g. /materials/bulletin/my-pubmat.jpg" className={inputCls} />
            <input name="attachmentUrl" placeholder="Attachment URL — e.g. /materials/records/report.pdf" className={inputCls} />
            <input name="attachmentLabel" placeholder="Attachment label — e.g. Download PDF" className={inputCls} />
            <input name="author" placeholder="Author (default: IECES – RTU)" className={inputCls} />
            <label className="flex items-center gap-2 text-sm font-bold text-navy-950">
              <input type="checkbox" name="pinned" className="h-4 w-4 accent-navy-900" /> Pin to top
            </label>
            <Button type="submit" disabled={busy}>
              {busy ? "Publishing…" : "Publish"}
            </Button>
            {msg && <p className="text-sm font-bold text-electric-600">{msg}</p>}
            <p className="text-xs text-slate-500">
              Tip: drop images into <code className="font-mono">public/materials/bulletin/</code>, commit, and reference them as <code className="font-mono">/materials/bulletin/file.jpg</code>.
            </p>
          </form>

          <ul className="grid gap-3">
            {posts.map((p) => (
              <li key={p.id} className="flex flex-wrap items-center gap-3 rounded-2xl bg-white p-4 shadow-m1 ring-1 ring-navy-900/5">
                <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider ring-1 ring-inset", categoryMeta[p.category as keyof typeof categoryMeta]?.color)}>
                  {p.category}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-extrabold text-navy-950">
                    {p.pinned && "📌 "}
                    {p.title}
                  </p>
                  <p className="text-xs text-slate-500">
                    {formatDate(p.createdAt)} · ♥ {p.reactions}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="tonal" className="px-3 py-2 text-xs" onClick={() => pin(p)}>
                    {p.pinned ? "Unpin" : "Pin"}
                  </Button>
                  <Button variant="outlined" className="px-3 py-2 text-xs text-rose-600" onClick={() => remove(p)}>
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <ul className="grid gap-3">
          {grievances.length === 0 && <li className="rounded-2xl bg-white p-8 text-center text-sm font-bold text-slate-500">No submissions yet.</li>}
          {grievances.map((g) => (
            <li key={g.id} className="rounded-2xl bg-white p-5 shadow-m1 ring-1 ring-navy-900/5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-extrabold text-navy-950">{g.ticket}</span>
                <span className="rounded-full bg-surface-2 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-navy-900">
                  {grievanceTypeMeta[g.type as GrievanceType]?.emoji} {g.type}
                </span>
                <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider", grievanceStatusMeta[g.status as GrievanceStatus]?.color)}>
                  {grievanceStatusMeta[g.status as GrievanceStatus]?.label}
                </span>
                <span className="ml-auto text-xs text-slate-500">{formatDate(g.createdAt, { hour: "2-digit", minute: "2-digit" })}</span>
              </div>
              <p className="mt-2 font-extrabold text-navy-950">{g.subject}</p>
              <p className="mt-1 whitespace-pre-line text-sm text-slate-700">{g.message}</p>
              <p className="mt-3 text-xs font-semibold text-slate-500">
                {g.anonymous ? "Anonymous" : [g.name, g.studentNumber, g.email].filter(Boolean).join(" · ") || "No contact given"}
                {g.yearSection && ` · ${g.yearSection}`}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {(["new", "reviewing", "resolved"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStatus(g, s)}
                    className={cn("pressable rounded-full px-3 py-1.5 text-xs font-extrabold ring-1 ring-inset", g.status === s ? "bg-navy-900 text-white ring-navy-900" : "bg-white text-navy-900 ring-navy-900/10 hover:bg-cyan-100")}
                  >
                    {grievanceStatusMeta[s].label}
                  </button>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
