import Link from 'next/link';
import { Header } from '@/components/public/Header';
import { Footer } from '@/components/public/Footer';
import prisma from '@/lib/prisma';

export const metadata = {
  title: 'Portfolio',
  description: 'My creative work and projects.',
};

export default async function PortfolioPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const category = params.category;

  const where = category ? { category } : {};

  const [items, categories] = await Promise.all([
    prisma.portfolioItem.findMany({
      where,
      orderBy: [{ featured: 'desc' }, { order: 'asc' }],
    }),
    prisma.portfolioItem.findMany({
      select: { category: true },
      distinct: ['category'],
    }),
  ]);

  const uniqueCategories = [...new Set(categories.map((c) => c.category))];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      <Header />

      <main className="flex-1 mx-auto max-w-6xl px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Portfolio</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            A collection of my creative work and projects.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Link
            href="/portfolio"
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              !category
                ? 'bg-gradient-to-r from-[#d48a27] to-[#b8751f] text-white shadow-lg shadow-[#d48a27]/25'
                : 'bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/5 dark:border-white/10'
            }`}
          >
            All
          </Link>
          {uniqueCategories.map((cat) => (
            <Link
              key={cat}
              href={`/portfolio?category=${cat}`}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                category === cat
                  ? 'bg-gradient-to-r from-[#d48a27] to-[#b8751f] text-white shadow-lg shadow-[#d48a27]/25'
                  : 'bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/5 dark:border-white/10'
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/portfolio/${item.slug}`}
              className="group rounded-2xl p-6 bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 hover:border-[#d48a27]/50 shadow-sm dark:shadow-none hover:shadow-lg transition-all duration-300 hover:scale-[1.01]"
            >
              <div className="aspect-video bg-gradient-to-br from-[#d48a27] to-[#8b5cf6] rounded-xl mb-4 flex items-center justify-center">
                <span className="text-white text-4xl font-bold opacity-50">
                  {item.title[0]}
                </span>
              </div>
              <h2 className="text-xl font-bold mb-2 group-hover:text-[#d48a27] transition-colors">
                {item.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {item.category}
              </p>
              <div className="flex flex-wrap gap-2">
                {item.techStack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-1 bg-black/5 dark:bg-white/10 rounded-lg"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
