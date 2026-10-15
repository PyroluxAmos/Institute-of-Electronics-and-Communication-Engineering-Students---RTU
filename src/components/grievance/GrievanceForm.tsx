"use client";

import { useState, type FormEvent } from "react";
import { grievanceTypes, type GrievanceType } from "@/db/schema";
import { grievanceTypeMeta } from "@/lib/meta";
import { Button } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

const inputCls =
  "w-full rounded-2xl bg-surface-2 px-4 py-3.5 text-sm font-semibold text-navy-950 outline-none ring-1 ring-transparent transition placeholder:font-medium placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-cyan-300";

export function GrievanceForm() {
  const [type, setType] = useState<GrievanceType>("concern");
  const [anonymous, setAnonymous] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [ticket, setTicket] = useState<string | null>(null);
  const [chars, setChars] = useState(0);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/grievances", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          anonymous,
          subject: fd.get("subject"),
          message: fd.get("message"),
          name: fd.get("name"),
          studentNumber: fd.get("studentNumber"),
          email: fd.get("email"),
          yearSection: fd.get("yearSection"),
          website: fd.get("website"),
        }),
      });
      const data = (await res.json()) as { ok?: boolean; ticket?: string; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong.");
      setTicket(data.ticket ?? null);
      setStatus("done");
      form.reset();
      setChars(0);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "done" && ticket) {
    return (
      <div className="animate-rise rounded-[1.75rem] bg-white p-8 text-center shadow-m2 ring-1 ring-navy-900/5 sm:p-12">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-100 text-4xl">✅</div>
        <h3 className="mt-6 font-display text-2xl font-extrabold text-navy-950 sm:text-3xl">Submission received</h3>
        <p className="mt-2 text-slate-600">Thank you for speaking up. Save your ticket number to track the status anytime.</p>
        <div className="mx-auto mt-6 w-fit rounded-2xl bg-navy-950 px-6 py-4 font-mono text-2xl font-extrabold tracking-widest text-cyan-300 shadow-m3">
          {ticket}
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button variant="tonal" onClick={() => navigator.clipboard?.writeText(ticket)}>
            Copy ticket
          </Button>
          <Button variant="outlined" onClick={() => setStatus("idle")}>
            Submit another
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-8 rounded-[1.75rem] bg-white p-6 shadow-m2 ring-1 ring-navy-900/5 sm:p-10">
      {/* Type */}
      <fieldset>
        <legend className="text-xs font-extrabold uppercase tracking-[0.2em] text-electric-600">1 · What is this about?</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {grievanceTypes.map((t) => {
            const m = grievanceTypeMeta[t];
            const active = type === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={cn(
                  "pressable flex items-start gap-3 rounded-2xl p-4 text-left ring-2 transition",
                  active ? "bg-navy-900 text-white ring-navy-900 shadow-m2" : "bg-surface-2 text-navy-950 ring-transparent hover:ring-cyan-300",
                )}
              >
                <span className="text-2xl">{m.emoji}</span>
                <span>
                  <span className="block font-extrabold">{m.label}</span>
                  <span className={cn("block text-xs", active ? "text-cyan-100" : "text-slate-500")}>{m.hint}</span>
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Message */}
      <fieldset className="grid gap-4">
        <legend className="text-xs font-extrabold uppercase tracking-[0.2em] text-electric-600">2 · Tell us more</legend>
        <label className="grid gap-1.5">
          <span className="text-sm font-extrabold text-navy-950">Subject *</span>
          <input name="subject" required minLength={4} maxLength={160} placeholder="e.g., Schedule of review sessions" className={inputCls} />
        </label>
        <label className="grid gap-1.5">
          <span className="flex items-center justify-between text-sm font-extrabold text-navy-950">
            Message *
            <span className={cn("text-xs font-semibold", chars < 20 ? "text-slate-400" : "text-emerald-600")}>{chars} / 5000</span>
          </span>
          <textarea
            name="message"
            required
            minLength={20}
            maxLength={5000}
            rows={6}
            onChange={(e) => setChars(e.target.value.length)}
            placeholder="Describe your suggestion, concern, or question. Be as specific as you can — dates, places, and people involved (if any) help us act faster."
            className={cn(inputCls, "resize-y")}
          />
        </label>
        <label className="grid gap-1.5">
          <span className="text-sm font-extrabold text-navy-950">Year & Section (optional)</span>
          <input name="yearSection" maxLength={40} placeholder="e.g., 3rd Year · CEIT-03-301A" className={inputCls} />
        </label>
      </fieldset>

      {/* Identity */}
      <fieldset className="grid gap-4">
        <legend className="text-xs font-extrabold uppercase tracking-[0.2em] text-electric-600">3 · Who&apos;s sending?</legend>
        <button
          type="button"
          role="switch"
          aria-checked={anonymous}
          onClick={() => setAnonymous((v) => !v)}
          className={cn(
            "flex items-center justify-between rounded-2xl p-4 text-left ring-2 transition",
            anonymous ? "bg-cyan-100 ring-cyan-300" : "bg-surface-2 ring-transparent",
          )}
        >
          <span>
            <span className="block font-extrabold text-navy-950">Submit anonymously</span>
            <span className="block text-xs text-slate-600">We won&apos;t store your name, student number, or email. You can still track your ticket.</span>
          </span>
          <span className={cn("relative h-7 w-12 shrink-0 rounded-full transition", anonymous ? "bg-navy-900" : "bg-slate-300")}>
            <span className={cn("absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all", anonymous ? "left-6" : "left-1")} />
          </span>
        </button>
        <div className={cn("grid gap-4 transition sm:grid-cols-2", anonymous && "pointer-events-none opacity-40")}>
          <label className="grid gap-1.5">
            <span className="text-sm font-extrabold text-navy-950">Full name</span>
            <input name="name" maxLength={120} disabled={anonymous} placeholder="Juan Dela Cruz" className={inputCls} />
          </label>
          <label className="grid gap-1.5">
            <span className="text-sm font-extrabold text-navy-950">Student number</span>
            <input name="studentNumber" maxLength={40} disabled={anonymous} placeholder="2023-xxxxx" className={inputCls} />
          </label>
          <label className="grid gap-1.5 sm:col-span-2">
            <span className="text-sm font-extrabold text-navy-950">Email (for follow-up)</span>
            <input name="email" type="email" maxLength={160} disabled={anonymous} placeholder="you@rtu.edu.ph" className={inputCls} />
          </label>
        </div>
        {/* honeypot */}
        <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      </fieldset>

      {error && <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700 ring-1 ring-rose-200">{error}</p>}

      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-slate-500">
          By submitting, you agree that the IECES Executive Board may review this message. Submissions are handled per Board Resolution No. 003.
        </p>
        <Button type="submit" disabled={status === "sending"} className="px-8 py-3.5 text-base">
          {status === "sending" ? "Sending…" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
