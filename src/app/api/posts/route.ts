import { NextResponse, type NextRequest } from "next/server";
import { createPost, getFeed, isPostCategory } from "@/lib/posts";
import { isAdmin } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") ?? 0) || 0;
  const cat = searchParams.get("category") ?? "all";
  const category = isPostCategory(cat) ? cat : "all";
  const feed = await getFeed({ page, category });
  return NextResponse.json(feed, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  const title = String(body.title ?? "").trim();
  const text = String(body.body ?? "").trim();
  if (title.length < 3 || text.length < 3) return NextResponse.json({ error: "Title and body are required." }, { status: 400 });
  const category = isPostCategory(body.category) ? body.category : "announcement";
  const created = await createPost({
    title,
    body: text,
    category,
    imageUrl: typeof body.imageUrl === "string" ? body.imageUrl.trim() : null,
    attachmentUrl: typeof body.attachmentUrl === "string" ? body.attachmentUrl.trim() : null,
    attachmentLabel: typeof body.attachmentLabel === "string" ? body.attachmentLabel.trim() : null,
    pinned: Boolean(body.pinned),
    author: typeof body.author === "string" && body.author.trim() ? body.author.trim() : undefined,
  });
  return NextResponse.json(created, { status: 201 });
}
