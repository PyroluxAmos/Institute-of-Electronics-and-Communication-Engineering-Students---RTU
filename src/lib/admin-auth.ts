import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Minimal, dependency-free admin gate.
 * Set ADMIN_PASSWORD in .env (and in Vercel → Project → Environment Variables).
 * Officers log in at /admin/login; a signed HttpOnly cookie is issued.
 */
export const ADMIN_COOKIE = "ieces_admin";

function secret() {
  return process.env.ADMIN_PASSWORD || "ieces-change-me";
}

export function adminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export function signToken(ts: number) {
  const sig = createHmac("sha256", secret()).update(String(ts)).digest("hex");
  return `${ts}.${sig}`;
}

export function verifyToken(token: string | undefined) {
  if (!token) return false;
  const [tsStr, sig] = token.split(".");
  if (!tsStr || !sig) return false;
  const expected = createHmac("sha256", secret()).update(tsStr).digest("hex");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
  // 7-day session
  return Date.now() - Number(tsStr) < 7 * 86_400_000;
}

export function checkPassword(input: string) {
  const a = Buffer.from(input);
  const b = Buffer.from(secret());
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function isAdmin() {
  const store = await cookies();
  return verifyToken(store.get(ADMIN_COOKIE)?.value);
}
