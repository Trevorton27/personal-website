import { notFound } from 'next/navigation';
import { Header } from '@/components/public/Header';
import { Footer } from '@/components/public/Footer';
import { BlogPostArticle } from '@/components/public/BlogPostArticle';
import { getPostById } from '@/lib/blog';
import { requireAuth } from '@/lib/session';

export const dynamic = 'force-dynamic';

export default async function BlogPreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAuth();

  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      {/* Preview banner */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-amber-500 text-black text-center text-sm font-medium py-1.5">
        Preview Mode — This post is not published
      </div>

      <div className="mt-8">
        <Header />
      </div>

      <main className="flex-1">
        <BlogPostArticle post={post} />
      </main>

      <Footer />
    </div>
  );
}
