import { NextResponse, type NextRequest } from "next/server";
import { isGrievanceStatus, updateGrievanceStatus } from "@/lib/grievances";
import { isAdmin } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  const body = (await req.json().catch(() => ({}))) as { status?: string; adminNotes?: string };
  if (!isGrievanceStatus(body.status)) return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  await updateGrievanceStatus(Number(id), body.status, body.adminNotes);
  return NextResponse.json({ ok: true });
}
