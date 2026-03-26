import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/public/Header';
import { Footer } from '@/components/public/Footer';
import {
  getPosts,
  formatPostDate,
  getReadingTime,
  stripHtml,
} from '@/lib/blog';

export const metadata = {
  title: 'Blog',
  description: 'Thoughts on technology, support engineering, and life in Japan.',
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page || '1', 10));
  const perPage = 10;

  let posts: Awaited<ReturnType<typeof getPosts>>['posts'] = [];
  let total = 0;
  let totalPages = 0;
  let error: string | null = null;

  try {
    const result = await getPosts({ page, perPage });
    posts = result.posts;
    total = result.total;
    totalPages = result.totalPages;
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to load blog posts';
  }

  // Clamp page to valid range
  const currentPage = Math.min(page, Math.max(1, totalPages));

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      <Header />

      <main className="flex-1 mx-auto max-w-4xl px-6 py-12 md:py-20">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Blog
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
            Thoughts on technology, support engineering, and life in Japan.
          </p>
        </div>

        {/* Posts */}
        {error ? (
          <div className="text-center py-16">
            <p className="text-red-600 dark:text-red-400 text-lg mb-2">
              Unable to load blog posts.
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              The blog is temporarily unavailable. Please try again later.
            </p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No posts found.
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            {posts.map((post) => {
              const excerpt = post.excerpt ? stripHtml(post.excerpt) : '';
              const readingTime = getReadingTime(post.content);

              return (
                <article
                  key={post.id}
                  className="group"
                >
                  <Link href={`/blog/${post.slug}`} className="block">
                    {/* Featured Image */}
                    {post.coverImage && (
                      <div className="relative aspect-[2/1] mb-5 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 800px"
                        />
                      </div>
                    )}

                    {/* Meta */}
                    <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-3">
                      {post.publishedAt && (
                        <time dateTime={post.publishedAt.toISOString()}>
                          {formatPostDate(post.publishedAt)}
                        </time>
                      )}
                      <span className="text-gray-300 dark:text-gray-600">·</span>
                      <span>{readingTime} min read</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-semibold mb-3 group-hover:text-accent transition-colors">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    {excerpt && (
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
                        {excerpt}
                      </p>
                    )}

                    {/* Read more */}
                    <span className="inline-block mt-4 text-accent font-medium group-hover:underline">
                      Read more →
                    </span>
                  </Link>
                </article>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <nav className="mt-16 flex items-center justify-center gap-4">
            {currentPage > 1 ? (
              <Link
                href={`/blog?page=${currentPage - 1}`}
                className="px-5 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium"
              >
                ← Previous
              </Link>
            ) : (
              <span className="px-5 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-400 dark:text-gray-600 cursor-not-allowed font-medium">
                ← Previous
              </span>
            )}

            <span className="text-gray-600 dark:text-gray-400 text-sm">
              Page {currentPage} of {totalPages}
            </span>

            {currentPage < totalPages ? (
              <Link
                href={`/blog?page=${currentPage + 1}`}
                className="px-5 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium"
              >
                Next →
              </Link>
            ) : (
              <span className="px-5 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-400 dark:text-gray-600 cursor-not-allowed font-medium">
                Next →
              </span>
            )}
          </nav>
        )}

        {/* Post count */}
        {total > 0 && (
          <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-500">
            {total} {total === 1 ? 'post' : 'posts'} total
          </p>
        )}
      </main>

      <Footer />
    </div>
  );
}
