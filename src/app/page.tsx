import Link from 'next/link';
import { Header } from '@/components/public/Header';
import { Footer } from '@/components/public/Footer';
import prisma from '@/lib/prisma';
import { formatDate } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

export default async function HomePage() {
  const [featuredPosts, featuredPortfolio] = await Promise.all([
    prisma.blogPost.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { publishedAt: 'desc' },
      take: 3,
      include: { author: true, tags: true },
    }),
    prisma.portfolioItem.findMany({
      where: { featured: true },
      orderBy: { order: 'asc' },
      take: 6,
    }),
  ]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 sm:py-32 bg-gradient-to-b from-white to-gray-50 dark:from-storm-950 dark:to-storm-900">
          <div className="absolute inset-0 dark:bg-lightning-glow opacity-5" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-3xl">
              <h1 className="text-5xl sm:text-7xl font-bold mb-6 dark:glow-text">
                Artist & Developer
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8">
                Exploring the intersection of art and technology through code,
                design, and creative expression.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/portfolio" className="btn btn-primary">
                  View Portfolio
                  <ArrowRight className="inline-block ml-2 w-5 h-5" />
                </Link>
                <Link href="/blog" className="btn btn-secondary">
                  Read Blog
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Portfolio */}
        <section className="py-20 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Featured Work
            </h2>
            <Link
              href="/portfolio"
              className="text-lightning-glow hover:underline flex items-center gap-2"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPortfolio.map((item) => (
              <Link
                key={item.id}
                href={`/portfolio/${item.slug}`}
                className="card group"
              >
                <div className="aspect-video bg-gradient-to-br from-lightning-glow to-storm-600 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold opacity-50">
                    {item.title[0]}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-lightning-glow transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {item.category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.techStack.slice(0, 3).map((tech) => (
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
        </section>

        {/* Latest Blog Posts */}
        <section className="py-20 bg-gray-50 dark:bg-storm-900/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold">
                Latest Posts
              </h2>
              <Link
                href="/blog"
                className="text-lightning-glow hover:underline flex items-center gap-2"
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="card"
                >
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag.id}
                        className="text-xs px-2 py-1 bg-lightning-glow/10 text-lightning-glow rounded"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold mb-2 hover:text-lightning-glow transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="text-xs text-gray-500 dark:text-gray-500">
                    {formatDate(post.publishedAt!)} • {post.author.name}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              About Me
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              I'm a creative technologist passionate about building beautiful,
              functional experiences. My work spans digital art, web development,
              and everything in between. I believe in the power of code as a
              creative medium and love exploring new ways to blend technology
              with artistic expression.
            </p>
            <Link href="/contact" className="btn btn-primary">
              Get in Touch
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
