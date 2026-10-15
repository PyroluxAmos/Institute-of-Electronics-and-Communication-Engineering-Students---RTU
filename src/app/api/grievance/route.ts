import { NextResponse, type NextRequest } from "next/server";
import { createGrievance, getGrievanceByTicket, isGrievanceType, listGrievances } from "@/lib/grievances";
import { isAdmin } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

/** GET ?ticket=IECES-2026-XXXXX → public status lookup. GET (admin) → full list. */
export async function GET(req: NextRequest) {
  const ticket = new URL(req.url).searchParams.get("ticket");
  if (ticket) {
    const row = await getGrievanceByTicket(ticket);
    if (!row) return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    return NextResponse.json(row);
  }
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await listGrievances());
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  // Honeypot for bots
  if (typeof body.website === "string" && body.website.length > 0) return NextResponse.json({ ok: true, ticket: "IECES-0000-BOT" });

  const subject = String(body.subject ?? "").trim();
  const message = String(body.message ?? "").trim();
  const anonymous = Boolean(body.anonymous);
  if (subject.length < 4) return NextResponse.json({ error: "Please provide a clear subject (at least 4 characters)." }, { status: 400 });
  if (message.length < 20) return NextResponse.json({ error: "Please describe your message in at least 20 characters." }, { status: 400 });
  if (message.length > 5000) return NextResponse.json({ error: "Message is too long (max 5000 characters)." }, { status: 400 });
  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!anonymous && email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const created = await createGrievance({
    type: isGrievanceType(body.type) ? body.type : "concern",
    subject,
    message,
    anonymous,
    name: typeof body.name === "string" ? body.name : undefined,
    studentNumber: typeof body.studentNumber === "string" ? body.studentNumber : undefined,
    email,
    yearSection: typeof body.yearSection === "string" ? body.yearSection : undefined,
  });
  return NextResponse.json({ ok: true, ticket: created.ticket }, { status: 201 });
}
