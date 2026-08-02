import portfolioData from "@/data/portfolio.json";
import { HomePageClient } from "@/components/HomePageClient";
import { getLatestPosts } from "@/lib/blog";

export const revalidate = 60;

export default async function HomePage() {
  let latestPosts: Awaited<ReturnType<typeof getLatestPosts>> = [];
  try {
    latestPosts = await getLatestPosts(3);
  } catch {
    // Blog may be unavailable
  }

  const serializedPosts = latestPosts.map((post) => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    publishedAt: post.publishedAt?.toISOString() ?? null,
  }));

  return <HomePageClient projects={portfolioData} latestPosts={serializedPosts} />;
}
