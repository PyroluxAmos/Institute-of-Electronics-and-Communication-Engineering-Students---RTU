import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/bulletin/PostCard";
import { Container } from "@/components/ui/primitives";
import { getLatestPosts, getPostBySlug } from "@/lib/posts";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.body.slice(0, 160),
    openGraph: { title: post.title, description: post.body.slice(0, 160), images: post.imageUrl ? [{ url: post.imageUrl }] : undefined },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post || !post.published) notFound();
  const more = (await getLatestPosts(4)).filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <Container className="py-10">
      <Link href="/bulletin" className="inline-flex items-center gap-2 text-sm font-extrabold text-electric-600 hover:underline">
        ← Back to bulletin
      </Link>
      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_320px]">
        <PostCard post={post} expanded />
        <aside className="grid h-fit gap-4">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-electric-600">More posts</p>
          {more.map((p) => (
            <Link key={p.id} href={`/bulletin/${p.slug}`} className="rounded-2xl bg-white p-4 shadow-m1 ring-1 ring-navy-900/5 transition hover:shadow-m2">
              <p className="line-clamp-2 font-extrabold text-navy-950">{p.title}</p>
              <p className="mt-1 line-clamp-2 text-sm text-slate-600">{p.body}</p>
            </Link>
          ))}
        </aside>
      </div>
    </Container>
  );
}
