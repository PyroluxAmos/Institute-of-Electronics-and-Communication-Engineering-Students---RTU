"use client";

import { useMemo, useState } from "react";
import { gpoaActivities, type GpoaActivity, type GpoaStatus } from "@/content/gpoa";
import { cn, formatDate } from "@/lib/utils";

const columns: { key: GpoaStatus; label: string; tone: string; dot: string }[] = [
  { key: "planned", label: "Planned", tone: "bg-surface-2", dot: "bg-electric-500" },
  { key: "ongoing", label: "Ongoing", tone: "bg-emerald-50", dot: "bg-emerald-500" },
  { key: "done", label: "Accomplished", tone: "bg-slate-100", dot: "bg-slate-500" },
];

const statusChip: Record<GpoaStatus, string> = {
  planned: "bg-blue-100 text-blue-800",
  ongoing: "bg-emerald-100 text-emerald-800",
  done: "bg-slate-200 text-slate-700",
};

function toDate(s: string) {
  return new Date(`${s}T00:00:00`);
}

export function GpoaBoard() {
  const [view, setView] = useState<"board" | "calendar">("board");
  const [committee, setCommittee] = useState("all");
  const [selected, setSelected] = useState<GpoaActivity | null>(null);

  const committees = useMemo(() => Array.from(new Set(gpoaActivities.map((a) => a.committee))), []);
  const items = useMemo(
    () => gpoaActivities.filter((a) => committee === "all" || a.committee === committee).sort((a, b) => a.start.localeCompare(b.start)),
    [committee],
  );

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col gap-3 rounded-[1.5rem] bg-white p-3 shadow-m1 ring-1 ring-navy-900/5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex rounded-full bg-surface-2 p-1">
          {(["board", "calendar"] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              className={cn("pressable rounded-full px-5 py-2 text-sm font-extrabold capitalize transition", view === v ? "bg-navy-900 text-white shadow-m1" : "text-navy-900")}
            >
              {v === "board" ? "🗂 Board" : "📅 Calendar"}
            </button>
          ))}
        </div>
        <select
          value={committee}
          onChange={(e) => setCommittee(e.target.value)}
          className="rounded-full bg-surface-2 px-4 py-2.5 text-sm font-bold text-navy-900 outline-none focus:ring-2 focus:ring-cyan-300"
        >
          <option value="all">All committees</option>
          {committees.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Stats */}
      <div className="mt-5 grid grid-cols-3 gap-3">
        {columns.map((c) => {
          const n = items.filter((a) => a.status === c.key).length;
          return (
            <div key={c.key} className="rounded-2xl bg-white p-4 shadow-m1 ring-1 ring-navy-900/5">
              <p className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-slate-500">
                <span className={cn("h-2 w-2 rounded-full", c.dot)} /> {c.label}
              </p>
              <p className="mt-1 font-display text-3xl font-extrabold text-navy-950">{n}</p>
            </div>
          );
        })}
      </div>

      {view === "board" ? (
        <div className="no-scrollbar -mx-5 mt-6 flex snap-x gap-4 overflow-x-auto px-5 pb-4 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-3">
          {columns.map((col) => {
            const cards = items.filter((a) => a.status === col.key);
            return (
              <section key={col.key} className={cn("w-[85vw] shrink-0 snap-start rounded-[1.5rem] p-3 sm:w-96 lg:w-auto", col.tone)}>
                <header className="flex items-center justify-between px-2 py-2">
                  <h3 className="flex items-center gap-2 font-display text-base font-extrabold text-navy-950">
                    <span className={cn("h-2.5 w-2.5 rounded-full", col.dot)} /> {col.label}
                  </h3>
                  <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-extrabold text-navy-900 shadow-m1">{cards.length}</span>
                </header>
                <div className="mt-1 grid gap-3">
                  {cards.map((a) => (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => setSelected(a)}
                      className="pressable group rounded-2xl bg-white p-4 text-left shadow-m1 ring-1 ring-navy-900/5 transition hover:-translate-y-0.5 hover:shadow-m2"
                    >
                      <div className="flex flex-wrap gap-1.5">
                        {a.tags?.map((t) => (
                          <span key={t} className="rounded-md bg-cyan-100 px-1.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-navy-900">
                            {t}
                          </span>
                        ))}
                      </div>
                      <p className="mt-2 font-extrabold leading-snug text-navy-950">{a.title}</p>
                      <p className="mt-1 text-xs font-semibold text-slate-500">{a.committee}</p>
                      <div className="mt-3 flex items-center justify-between text-xs font-bold text-slate-600">
                        <span>
                          📅 {formatDate(a.start, { year: undefined })}
                          {a.end && ` – ${formatDate(a.end, { year: undefined })}`}
                        </span>
                        {a.budget && <span className="rounded-full bg-surface-2 px-2 py-0.5">{a.budget}</span>}
                      </div>
                    </button>
                  ))}
                  {cards.length === 0 && <p className="rounded-2xl border-2 border-dashed border-navy-900/10 p-6 text-center text-xs font-bold text-slate-400">No activities</p>}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        <MonthCalendar items={items} onSelect={setSelected} />
      )}

      {/* Detail dialog */}
      {selected && (
        <div className="fixed inset-0 z-[60] grid place-items-end bg-navy-950/60 p-0 backdrop-blur-sm sm:place-items-center sm:p-6" onClick={() => setSelected(null)}>
          <div
            role="dialog"
            aria-modal
            onClick={(e) => e.stopPropagation()}
            className="animate-rise w-full max-w-lg rounded-t-[2rem] bg-white p-6 shadow-m4 sm:rounded-[2rem] sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <span className={cn("rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider", statusChip[selected.status])}>{selected.status}</span>
              <button type="button" onClick={() => setSelected(null)} className="grid h-9 w-9 place-items-center rounded-full bg-surface-2 text-navy-900" aria-label="Close">
                ✕
              </button>
            </div>
            <h3 className="mt-3 font-display text-2xl font-extrabold leading-tight text-navy-950">{selected.title}</h3>
            <p className="mt-1 text-sm font-bold text-electric-600">{selected.committee}</p>
            <dl className="mt-5 grid gap-3 text-sm">
              <Row k="When">
                {formatDate(selected.start, { weekday: "short" })}
                {selected.end && ` → ${formatDate(selected.end, { weekday: "short" })}`}
              </Row>
              {selected.venue && <Row k="Where">{selected.venue}</Row>}
              <Row k="Objective">{selected.objective}</Row>
              {selected.budget && <Row k="Budget">{selected.budget}</Row>}
            </dl>
            {selected.link && (
              <a href={selected.link} target="_blank" rel="noopener noreferrer" className="pressable mt-6 inline-flex rounded-full bg-navy-900 px-5 py-3 text-sm font-extrabold text-white shadow-m2">
                Open related link →
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ k, children }: { k: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[5.5rem_1fr] gap-3 rounded-xl bg-surface-2 p-3">
      <dt className="text-xs font-extrabold uppercase tracking-wider text-slate-500">{k}</dt>
      <dd className="font-semibold text-navy-950">{children}</dd>
    </div>
  );
}

function MonthCalendar({ items, onSelect }: { items: GpoaActivity[]; onSelect: (a: GpoaActivity) => void }) {
  const today = new Date();
  const [cursor, setCursor] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const first = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const cells = Array.from({ length: first + days }, (_, i) => (i < first ? null : i - first + 1));
  while (cells.length % 7) cells.push(null);

  const eventsOn = (d: number) => {
    const day = new Date(year, month, d);
    return items.filter((a) => {
      const s = toDate(a.start);
      const e = a.end ? toDate(a.end) : s;
      return day >= s && day <= e;
    });
  };

  return (
    <div className="mt-6 rounded-[1.5rem] bg-white p-4 shadow-m1 ring-1 ring-navy-900/5 sm:p-6">
      <div className="flex items-center justify-between">
        <button type="button" onClick={() => setCursor(new Date(year, month - 1, 1))} className="pressable grid h-10 w-10 place-items-center rounded-full bg-surface-2 font-extrabold text-navy-900">
          ‹
        </button>
        <h3 className="font-display text-xl font-extrabold text-navy-950">{cursor.toLocaleString("en", { month: "long", year: "numeric" })}</h3>
        <button type="button" onClick={() => setCursor(new Date(year, month + 1, 1))} className="pressable grid h-10 w-10 place-items-center rounded-full bg-surface-2 font-extrabold text-navy-900">
          ›
        </button>
      </div>
      <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1">
        {cells.map((d, i) => {
          const evs = d ? eventsOn(d) : [];
          const isToday = d && today.getFullYear() === year && today.getMonth() === month && today.getDate() === d;
          return (
            <div key={i} className={cn("min-h-[4.5rem] rounded-xl p-1.5 sm:min-h-[6rem]", d ? "bg-surface-2" : "bg-transparent")}>
              {d && (
                <>
                  <span className={cn("inline-grid h-6 w-6 place-items-center rounded-full text-xs font-extrabold", isToday ? "bg-navy-900 text-white" : "text-navy-900")}>{d}</span>
                  <div className="mt-1 grid gap-1">
                    {evs.slice(0, 3).map((a) => (
                      <button
                        key={a.id}
                        type="button"
                        onClick={() => onSelect(a)}
                        title={a.title}
                        className={cn("truncate rounded-md px-1.5 py-0.5 text-left text-[10px] font-extrabold", statusChip[a.status])}
                      >
                        {a.title}
                      </button>
                    ))}
                    {evs.length > 3 && <span className="text-[10px] font-bold text-slate-500">+{evs.length - 3} more</span>}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
