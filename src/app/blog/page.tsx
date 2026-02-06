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
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      <Header />

      <main className="flex-1 mx-auto max-w-6xl px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Thoughts on art, code, and everything in between.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <form action="/blog" method="get">
              <input
                type="text"
                name="search"
                placeholder="Search posts..."
                defaultValue={search}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 text-black dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d48a27] transition-all duration-200"
              />
            </form>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/blog"
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                !tagSlug
                  ? 'bg-gradient-to-r from-[#d48a27] to-[#b8751f] text-white shadow-lg shadow-[#d48a27]/25'
                  : 'bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/5 dark:border-white/10'
              }`}
            >
              All
            </Link>
            {tags.map((tag) => (
              <Link
                key={tag.id}
                href={`/blog?tag=${tag.slug}`}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  tagSlug === tag.slug
                    ? 'bg-gradient-to-r from-[#d48a27] to-[#b8751f] text-white shadow-lg shadow-[#d48a27]/25'
                    : 'bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/5 dark:border-white/10'
                }`}
              >
                {tag.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group rounded-2xl p-6 bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 hover:border-[#8b5cf6]/50 dark:hover:border-[#8b5cf6]/50 shadow-sm dark:shadow-none hover:shadow-lg transition-all duration-300 hover:scale-[1.01]"
            >
              {post.coverImage && (
                <div className="aspect-video bg-gradient-to-br from-[#d48a27] to-[#8b5cf6] rounded-xl mb-4" />
              )}
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="text-xs px-2 py-1 bg-[#d48a27]/10 text-[#d48a27] rounded-lg"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
              <h2 className="text-xl font-bold mb-2 group-hover:text-[#8b5cf6] dark:group-hover:text-[#a78bfa] transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              <div className="text-xs text-gray-500 dark:text-[#a78bfa]">
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
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  p === page
                    ? 'bg-gradient-to-r from-[#d48a27] to-[#b8751f] text-white shadow-lg shadow-[#d48a27]/25'
                    : 'bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/5 dark:border-white/10'
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
