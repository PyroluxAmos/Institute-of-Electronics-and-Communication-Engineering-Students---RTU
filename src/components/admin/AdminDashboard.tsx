"use client";

import { upload } from "@vercel/blob/client";
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
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [uploadPercent, setUploadPercent] = useState(0);
  const [imageFileName, setImageFileName] = useState<string | null>(null);
  const [attachmentFileName, setAttachmentFileName] = useState<string | null>(null);

  async function uploadOfficerFile(file: File, kind: "image" | "attachment") {
    const safeName = file.name
      .toLowerCase()
      .replace(/[^a-z0-9._-]+/g, "-")
      .replace(/^-+|-+$/g, "") || `${kind}-${Date.now()}`;
    const folder = kind === "image" ? "bulletin/images" : "bulletin/attachments";

    setUploadStatus(kind === "image" ? "Uploading pubmat…" : "Uploading attachment…");
    setUploadPercent(0);

    return upload(`${folder}/${safeName}`, file, {
      access: "public",
      handleUploadUrl: "/api/admin/uploads",
      clientPayload: JSON.stringify({ kind }),
      multipart: file.size > 4 * 1024 * 1024,
      onUploadProgress: ({ percentage }) => setUploadPercent(Math.round(percentage)),
    });
  }

  async function createPost(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const imageFile = fd.get("imageFile");
    const attachmentFile = fd.get("attachmentFile");

    setBusy(true);
    setMsg(null);
    setUploadStatus(null);
    setUploadPercent(0);

    try {
      let imageUrl = String(fd.get("imageUrl") ?? "").trim();
      let attachmentUrl = String(fd.get("attachmentUrl") ?? "").trim();
      let attachmentLabel = String(fd.get("attachmentLabel") ?? "").trim();

      if (imageFile instanceof File && imageFile.size > 0) {
        const imageBlob = await uploadOfficerFile(imageFile, "image");
        imageUrl = imageBlob.url;
      }

      if (attachmentFile instanceof File && attachmentFile.size > 0) {
        const attachmentBlob = await uploadOfficerFile(attachmentFile, "attachment");
        attachmentUrl = attachmentBlob.url;
        if (!attachmentLabel) attachmentLabel = attachmentFile.name;
      }

      setUploadStatus("Publishing post…");
      setUploadPercent(100);

      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: fd.get("title"),
          body: fd.get("body"),
          category: fd.get("category"),
          imageUrl,
          attachmentUrl,
          attachmentLabel,
          author: fd.get("author"),
          pinned: fd.get("pinned") === "on",
        }),
      });

      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error || "Failed to publish.");

      form.reset();
      setImageFileName(null);
      setAttachmentFileName(null);
      setMsg("Post and files published successfully ✔");
      router.refresh();
    } catch (error) {
      const detail = error instanceof Error ? error.message : "Upload failed.";
      setMsg(
        detail.includes("BLOB") || detail.includes("token")
          ? "File storage is not connected yet. Connect a Vercel Blob store to this project, then try again."
          : detail,
      );
    } finally {
      setBusy(false);
      setUploadStatus(null);
      setUploadPercent(0);
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

            <fieldset className="grid gap-2 rounded-2xl bg-cyan-100/60 p-4 ring-1 ring-cyan-200">
              <legend className="px-1 text-xs font-extrabold uppercase tracking-[0.18em] text-electric-600">Pubmat / post image</legend>
              <label className="pressable flex cursor-pointer items-center gap-3 rounded-xl bg-white p-3 text-sm font-extrabold text-navy-950 shadow-m1 ring-1 ring-navy-900/5 hover:bg-cyan-50">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-navy-900 text-xl text-white">🖼️</span>
                <span className="min-w-0">
                  <span className="block">Choose pubmat from device</span>
                  <span className="block text-xs font-semibold text-slate-500">JPG, PNG, WebP or GIF · maximum 10 MB</span>
                </span>
                <input
                  name="imageFile"
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  className="sr-only"
                  onChange={(event) => setImageFileName(event.target.files?.[0]?.name ?? null)}
                />
              </label>
              {imageFileName && <p className="break-all text-xs font-bold text-emerald-700">✓ Selected: {imageFileName}</p>}
            </fieldset>

            <fieldset className="grid gap-2 rounded-2xl bg-surface-2 p-4 ring-1 ring-navy-900/5">
              <legend className="px-1 text-xs font-extrabold uppercase tracking-[0.18em] text-slate-500">Optional document attachment</legend>
              <label className="pressable flex cursor-pointer items-center gap-3 rounded-xl bg-white p-3 text-sm font-extrabold text-navy-950 shadow-m1 ring-1 ring-navy-900/5 hover:bg-cyan-50">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-electric-600 text-xl text-white">📎</span>
                <span className="min-w-0">
                  <span className="block">Choose document from device</span>
                  <span className="block text-xs font-semibold text-slate-500">PDF, Word, Excel, PowerPoint, ZIP or TXT · maximum 25 MB</span>
                </span>
                <input
                  name="attachmentFile"
                  type="file"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.txt"
                  className="sr-only"
                  onChange={(event) => setAttachmentFileName(event.target.files?.[0]?.name ?? null)}
                />
              </label>
              {attachmentFileName && <p className="break-all text-xs font-bold text-emerald-700">✓ Selected: {attachmentFileName}</p>}
              <input name="attachmentLabel" placeholder="Download button label (optional)" className={inputCls} />
            </fieldset>

            <details className="rounded-2xl bg-surface-2 p-3 text-sm">
              <summary className="cursor-pointer font-extrabold text-navy-900">Advanced: use an existing URL instead</summary>
              <div className="mt-3 grid gap-2">
                <input name="imageUrl" type="url" placeholder="Existing image URL (optional)" className={inputCls} />
                <input name="attachmentUrl" type="url" placeholder="Existing attachment URL (optional)" className={inputCls} />
                <p className="text-xs text-slate-500">A selected device file takes priority over an existing URL.</p>
              </div>
            </details>

            <input name="author" placeholder="Author (default: IECES – RTU)" className={inputCls} />
            <label className="flex items-center gap-2 text-sm font-bold text-navy-950">
              <input type="checkbox" name="pinned" className="h-4 w-4 accent-navy-900" /> Pin to top
            </label>

            {uploadStatus && (
              <div className="rounded-2xl bg-navy-950 p-3 text-white">
                <div className="flex items-center justify-between text-xs font-extrabold uppercase tracking-wider">
                  <span>{uploadStatus}</span>
                  <span className="text-cyan-300">{uploadPercent}%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/15">
                  <div className="h-full rounded-full bg-cyan-300 transition-[width]" style={{ width: `${uploadPercent}%` }} />
                </div>
              </div>
            )}

            <Button type="submit" disabled={busy}>
              {busy ? uploadStatus || "Working…" : "Upload files & publish"}
            </Button>
            {msg && <p className={cn("rounded-xl px-3 py-2 text-sm font-bold", msg.includes("✔") ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700")}>{msg}</p>}
            <p className="text-xs text-slate-500">Files are stored securely in Vercel Blob and linked to the post automatically—no GitHub upload required.</p>
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
