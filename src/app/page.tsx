import portfolioData from "@/data/portfolio.json";
import { HomePageClient } from "@/components/HomePageClient";
import { getLatestPosts } from "@/lib/blog";

export default async function HomePage() {
  let recentPosts: Array<{
    id: string;
    slug: string;
    title: string;
    excerpt: string | null;
    content: string;
    publishedAt: string | null;
  }> = [];

  try {
    const posts = await getLatestPosts(3);
    recentPosts = posts.map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      content: p.content,
      publishedAt: p.publishedAt?.toISOString() ?? null,
    }));
  } catch {
    // Blog posts unavailable — homepage still renders
  }

  return <HomePageClient projects={portfolioData} recentPosts={recentPosts} />;
}
