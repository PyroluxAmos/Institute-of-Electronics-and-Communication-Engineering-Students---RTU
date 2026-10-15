"use client";

import { useRef, useState } from "react";
import QRCode from "react-qr-code";
import { grievanceStatusMeta } from "@/lib/meta";
import type { GrievanceStatus } from "@/db/schema";
import { Button } from "@/components/ui/primitives";
import { cn, formatDate } from "@/lib/utils";

type Lookup = { ticket: string; type: string; subject: string; status: GrievanceStatus; createdAt: string; updatedAt: string };

export function GrievanceSidebar({ url }: { url: string }) {
  const [ticket, setTicket] = useState("");
  const [result, setResult] = useState<Lookup | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  async function lookup() {
    if (!ticket.trim()) return;
    setBusy(true);
    setErr(null);
    setResult(null);
    try {
      const res = await fetch(`/api/grievances?ticket=${encodeURIComponent(ticket.trim())}`);
      const data = (await res.json()) as Lookup & { error?: string };
      if (!res.ok) throw new Error(data.error || "Not found");
      setResult(data);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Not found");
    } finally {
      setBusy(false);
    }
  }

  async function copy() {
    await navigator.clipboard?.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="grid gap-5">
      {/* QR */}
      <div className="rounded-[1.75rem] bg-white p-6 shadow-m2 ring-1 ring-navy-900/5">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-electric-600">Share this form</p>
        <p className="mt-1 font-display text-xl font-extrabold text-navy-950">Scan to open on your phone</p>
        <div ref={qrRef} className="mx-auto mt-4 w-fit rounded-2xl bg-white p-3 ring-1 ring-navy-900/10">
          <QRCode value={url} size={176} fgColor="#0b2a5b" bgColor="#ffffff" level="M" />
        </div>
        <p className="mt-3 break-all text-center text-xs font-semibold text-slate-500">{url}</p>
        <div className="mt-4 flex gap-2">
          <Button variant="tonal" className="flex-1" onClick={copy}>
            {copied ? "Copied!" : "Copy link"}
          </Button>
          <Button
            variant="outlined"
            className="flex-1"
            onClick={() => {
              const node = qrRef.current?.querySelector("svg");
              if (!node) return;
              const blob = new Blob([new XMLSerializer().serializeToString(node)], { type: "image/svg+xml" });
              const a = document.createElement("a");
              a.href = URL.createObjectURL(blob);
              a.download = "ieces-grievance-qr.svg";
              a.click();
            }}
          >
            Download QR
          </Button>
        </div>
      </div>

      {/* Tracker */}
      <div className="rounded-[1.75rem] bg-white p-6 shadow-m2 ring-1 ring-navy-900/5">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-electric-600">Track a ticket</p>
        <p className="mt-1 font-display text-xl font-extrabold text-navy-950">Check your status</p>
        <div className="mt-4 flex gap-2">
          <input
            value={ticket}
            onChange={(e) => setTicket(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === "Enter" && lookup()}
            placeholder="IECES-2026-XXXXX"
            className="min-w-0 flex-1 rounded-full bg-surface-2 px-4 py-3 font-mono text-sm font-bold text-navy-950 outline-none focus:bg-white focus:ring-2 focus:ring-cyan-300"
          />
          <Button onClick={lookup} disabled={busy} className="px-5">
            {busy ? "…" : "Check"}
          </Button>
        </div>
        {err && <p className="mt-3 text-sm font-bold text-rose-600">{err}</p>}
        {result && (
          <div className="mt-4 rounded-2xl bg-surface-2 p-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-extrabold text-navy-950">{result.ticket}</span>
              <span className={cn("rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider", grievanceStatusMeta[result.status]?.color)}>
                {grievanceStatusMeta[result.status]?.label ?? result.status}
              </span>
            </div>
            <p className="mt-2 font-extrabold text-navy-950">{result.subject}</p>
            <p className="text-xs text-slate-500">
              {result.type} · Submitted {formatDate(result.createdAt)} · Updated {formatDate(result.updatedAt)}
            </p>
            <ol className="mt-4 grid grid-cols-3 gap-1 text-center text-[10px] font-extrabold uppercase tracking-wider">
              {(["new", "reviewing", "resolved"] as const).map((s, i) => {
                const idx = ["new", "reviewing", "resolved"].indexOf(result.status);
                const reached = i <= idx;
                return (
                  <li key={s} className="grid gap-1.5">
                    <span className={cn("h-1.5 rounded-full", reached ? "bg-navy-900" : "bg-navy-900/10")} />
                    <span className={reached ? "text-navy-950" : "text-slate-400"}>{grievanceStatusMeta[s].label}</span>
                  </li>
                );
              })}
            </ol>
          </div>
        )}
      </div>

      {/* Process */}
      <div className="silk grain relative overflow-hidden rounded-[1.75rem] p-6 text-white shadow-m2">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-cyan-200">How it works</p>
        <ol className="mt-3 grid gap-3 text-sm">
          {[
            ["Submit", "Fill out the form — anonymously or with contact details."],
            ["Review", "Internal Affairs reads every submission weekly."],
            ["Act & report", "Resolutions are summarized at General Assemblies and on the bulletin."],
          ].map(([t, d], i) => (
            <li key={t} className="flex gap-3">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-cyan-300 font-display text-xs font-extrabold text-navy-950">{i + 1}</span>
              <span>
                <span className="block font-extrabold">{t}</span>
                <span className="text-cyan-50/80">{d}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
