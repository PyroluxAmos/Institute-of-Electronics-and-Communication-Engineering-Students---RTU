"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/primitives";
import { site } from "@/content/site";

export function LoginForm() {
  const router = useRouter();
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    const password = new FormData(e.currentTarget).get("password");
    const res = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
    setBusy(false);
    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      const d = (await res.json()) as { error?: string };
      setErr(d.error || "Login failed");
    }
  }

  return (
    <form onSubmit={submit} className="animate-rise relative w-full max-w-sm rounded-[2rem] bg-white p-8 shadow-m4">
      <span className="relative mx-auto block h-16 w-16 overflow-hidden rounded-full ring-4 ring-cyan-100">
        <Image src={site.logo} alt="" fill sizes="64px" className="object-cover" />
      </span>
      <h1 className="mt-4 text-center font-display text-2xl font-extrabold text-navy-950">Officer Login</h1>
      <p className="mt-1 text-center text-sm text-slate-500">Enter the Executive Board password.</p>
      <input
        name="password"
        type="password"
        required
        autoFocus
        placeholder="Password"
        className="mt-6 w-full rounded-2xl bg-surface-2 px-4 py-3.5 text-sm font-semibold text-navy-950 outline-none focus:bg-white focus:ring-2 focus:ring-cyan-300"
      />
      {err && <p className="mt-3 text-sm font-bold text-rose-600">{err}</p>}
      <Button type="submit" disabled={busy} className="mt-4 w-full">
        {busy ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
