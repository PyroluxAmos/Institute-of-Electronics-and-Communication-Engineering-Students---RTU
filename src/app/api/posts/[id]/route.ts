import { NextResponse, type NextRequest } from "next/server";
import { deletePost, togglePin } from "@/lib/posts";
import { isAdmin } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  const body = (await req.json().catch(() => ({}))) as { pinned?: boolean };
  await togglePin(Number(id), Boolean(body.pinned));
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  await deletePost(Number(id));
  return NextResponse.json({ ok: true });
}
