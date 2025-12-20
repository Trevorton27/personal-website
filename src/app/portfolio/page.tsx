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
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Portfolio</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            A collection of my creative work and projects.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Link
            href="/portfolio"
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              !category
                ? 'bg-lightning-glow text-white'
                : 'bg-gray-100 dark:bg-storm-800 hover:bg-gray-200 dark:hover:bg-storm-700'
            }`}
          >
            All
          </Link>
          {uniqueCategories.map((cat) => (
            <Link
              key={cat}
              href={`/portfolio?category=${cat}`}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                category === cat
                  ? 'bg-lightning-glow text-white'
                  : 'bg-gray-100 dark:bg-storm-800 hover:bg-gray-200 dark:hover:bg-storm-700'
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <Link key={item.id} href={`/portfolio/${item.slug}`} className="card">
              <div className="aspect-video bg-gradient-to-br from-lightning-glow to-storm-600 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-white text-4xl font-bold opacity-50">
                  {item.title[0]}
                </span>
              </div>
              <h2 className="text-xl font-bold mb-2 group-hover:text-lightning-glow transition-colors">
                {item.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {item.category}
              </p>
              <div className="flex flex-wrap gap-2">
                {item.techStack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-1 bg-gray-100 dark:bg-storm-700 rounded"
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
