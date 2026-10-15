import { db } from "@/db";
import { posts, postCategories, type Post, type PostCategory } from "@/db/schema";
import { seedPosts } from "@/content/bulletin-seed";
import { and, desc, eq, sql } from "drizzle-orm";

export const PAGE_SIZE = 6;

let seededThisProcess = false;

/** Seeds the bulletin from /src/content/bulletin-seed.ts if the table is empty. */
export async function ensureSeeded() {
  if (seededThisProcess) return;
  const [{ count }] = await db.select({ count: sql<number>`count(*)::int` }).from(posts);
  if (count === 0) {
    const now = Date.now();
    await db.insert(posts).values(
      seedPosts.map((p) => ({
        slug: p.slug,
        title: p.title,
        body: p.body,
        category: p.category,
        imageUrl: p.imageUrl ?? null,
        attachmentUrl: p.attachmentUrl ?? null,
        attachmentLabel: p.attachmentLabel ?? null,
        pinned: p.pinned ?? false,
        reactions: Math.floor(Math.random() * 40) + 5,
        createdAt: new Date(now - p.daysAgo * 86_400_000),
        updatedAt: new Date(now - p.daysAgo * 86_400_000),
      })),
    );
  }
  seededThisProcess = true;
}

export function isPostCategory(value: unknown): value is PostCategory {
  return typeof value === "string" && (postCategories as readonly string[]).includes(value);
}

export type FeedPage = { items: Post[]; nextCursor: number | null; total: number };

export async function getFeed(opts: { page?: number; category?: PostCategory | "all"; includeUnpublished?: boolean } = {}): Promise<FeedPage> {
  await ensureSeeded();
  const page = Math.max(0, opts.page ?? 0);
  const where = and(
    opts.includeUnpublished ? undefined : eq(posts.published, true),
    opts.category && opts.category !== "all" ? eq(posts.category, opts.category) : undefined,
  );

  const [items, [{ total }]] = await Promise.all([
    db
      .select()
      .from(posts)
      .where(where)
      .orderBy(desc(posts.pinned), desc(posts.createdAt))
      .limit(PAGE_SIZE)
      .offset(page * PAGE_SIZE),
    db.select({ total: sql<number>`count(*)::int` }).from(posts).where(where),
  ]);

  const nextCursor = (page + 1) * PAGE_SIZE < total ? page + 1 : null;
  return { items, nextCursor, total };
}

export async function getPostBySlug(slug: string) {
  await ensureSeeded();
  const [post] = await db.select().from(posts).where(eq(posts.slug, slug)).limit(1);
  return post ?? null;
}

export async function getLatestPosts(limit = 3) {
  await ensureSeeded();
  return db
    .select()
    .from(posts)
    .where(eq(posts.published, true))
    .orderBy(desc(posts.pinned), desc(posts.createdAt))
    .limit(limit);
}

export async function reactToPost(id: number) {
  const [updated] = await db
    .update(posts)
    .set({ reactions: sql`${posts.reactions} + 1` })
    .where(eq(posts.id, id))
    .returning({ reactions: posts.reactions });
  return updated?.reactions ?? null;
}

export function slugify(input: string) {
  return (
    input
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 140) || `post-${Date.now()}`
  );
}

export async function createPost(input: {
  title: string;
  body: string;
  category: PostCategory;
  imageUrl?: string | null;
  attachmentUrl?: string | null;
  attachmentLabel?: string | null;
  pinned?: boolean;
  author?: string;
}) {
  let slug = slugify(input.title);
  const existing = await db.select({ id: posts.id }).from(posts).where(eq(posts.slug, slug)).limit(1);
  if (existing.length) slug = `${slug}-${Date.now().toString(36)}`;
  const [created] = await db
    .insert(posts)
    .values({
      slug,
      title: input.title,
      body: input.body,
      category: input.category,
      imageUrl: input.imageUrl || null,
      attachmentUrl: input.attachmentUrl || null,
      attachmentLabel: input.attachmentLabel || null,
      pinned: input.pinned ?? false,
      author: input.author || "IECES – RTU",
    })
    .returning();
  return created;
}

export async function deletePost(id: number) {
  await db.delete(posts).where(eq(posts.id, id));
}

export async function togglePin(id: number, pinned: boolean) {
  await db.update(posts).set({ pinned, updatedAt: new Date() }).where(eq(posts.id, id));
}
