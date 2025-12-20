import Link from 'next/link';
import { Header } from '@/components/public/Header';
import { Footer } from '@/components/public/Footer';
import prisma from '@/lib/prisma';
import { formatDate, getReadingTime } from '@/lib/utils';
import { Search } from 'lucide-react';

export const metadata = {
  title: 'Blog',
  description: 'Thoughts on art, code, and everything in between.',
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; tag?: string; page?: string }>;
}) {
  const params = await searchParams;
  const search = params.search || '';
  const tagSlug = params.tag;
  const page = parseInt(params.page || '1');
  const perPage = 12;

  const where: any = { status: 'PUBLISHED' };

  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { excerpt: { contains: search, mode: 'insensitive' } },
    ];
  }

  if (tagSlug) {
    where.tags = { some: { slug: tagSlug } };
  }

  const [posts, total, tags] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      orderBy: { publishedAt: 'desc' },
      skip: (page - 1) * perPage,
      take: perPage,
      include: { author: true, tags: true },
    }),
    prisma.blogPost.count({ where }),
    prisma.tag.findMany({
      orderBy: { name: 'asc' },
    }),
  ]);

  const totalPages = Math.ceil(total / perPage);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Thoughts on art, code, and everything in between.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <form action="/blog" method="get">
              <input
                type="text"
                name="search"
                placeholder="Search posts..."
                defaultValue={search}
                className="input pl-10"
              />
            </form>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/blog"
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                !tagSlug
                  ? 'bg-lightning-glow text-white'
                  : 'bg-gray-100 dark:bg-storm-800 hover:bg-gray-200 dark:hover:bg-storm-700'
              }`}
            >
              All
            </Link>
            {tags.map((tag) => (
              <Link
                key={tag.id}
                href={`/blog?tag=${tag.slug}`}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  tagSlug === tag.slug
                    ? 'bg-lightning-glow text-white'
                    : 'bg-gray-100 dark:bg-storm-800 hover:bg-gray-200 dark:hover:bg-storm-700'
                }`}
              >
                {tag.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="card">
              {post.coverImage && (
                <div className="aspect-video bg-gradient-to-br from-lightning-glow to-storm-600 rounded-lg mb-4" />
              )}
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="text-xs px-2 py-1 bg-lightning-glow/10 text-lightning-glow rounded"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
              <h2 className="text-xl font-bold mb-2 hover:text-lightning-glow transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              <div className="text-xs text-gray-500">
                {formatDate(post.publishedAt!)} • {getReadingTime(post.content)} min read
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={`/blog?page=${p}${tagSlug ? `&tag=${tagSlug}` : ''}${
                  search ? `&search=${search}` : ''
                }`}
                className={`px-4 py-2 rounded-lg ${
                  p === page
                    ? 'bg-lightning-glow text-white'
                    : 'bg-gray-100 dark:bg-storm-800 hover:bg-gray-200 dark:hover:bg-storm-700'
                }`}
              >
                {p}
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
