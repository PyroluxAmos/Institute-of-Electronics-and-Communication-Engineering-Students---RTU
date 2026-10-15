import { NextResponse } from "next/server";
import { reactToPost } from "@/lib/posts";

export const dynamic = "force-dynamic";

export async function POST(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const numeric = Number(id);
  if (!Number.isInteger(numeric)) return NextResponse.json({ error: "Bad id" }, { status: 400 });
  const reactions = await reactToPost(numeric);
  if (reactions === null) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ reactions });
}
