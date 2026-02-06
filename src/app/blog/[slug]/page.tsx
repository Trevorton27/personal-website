import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/public/Header';
import { Footer } from '@/components/public/Footer';
import prisma from '@/lib/prisma';
import { formatDate, getReadingTime } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug, status: 'PUBLISHED' },
    include: { author: true },
  });

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: post.title,
    description: post.excerpt || undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
      authors: [post.author.name || 'Trevor'],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug, status: 'PUBLISHED' },
    include: { author: true, tags: true },
  });

  if (!post) {
    notFound();
  }

  const readingTime = getReadingTime(post.content);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: post.author.name || 'Trevor',
    },
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt.toISOString(),
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="flex-1">
        <article className="mx-auto max-w-4xl px-6 py-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#d48a27] hover:text-[#b8751f] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          <header className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <Link
                  key={tag.id}
                  href={`/blog?tag=${tag.slug}`}
                  className="text-xs px-3 py-1 bg-[#d48a27]/10 text-[#d48a27] rounded-full hover:bg-[#d48a27]/20 transition-colors"
                >
                  {tag.name}
                </Link>
              ))}
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
                {post.excerpt}
              </p>
            )}

            <div className="flex flex-wrap gap-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#d48a27]" />
                {post.author.name}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#8b5cf6] dark:text-[#a78bfa]" />
                {formatDate(post.publishedAt!)}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#d48a27]" />
                {readingTime} min read
              </div>
            </div>
          </header>

          <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-black dark:prose-headings:text-white prose-a:text-[#d48a27] prose-a:no-underline hover:prose-a:underline prose-code:bg-black/5 dark:prose-code:bg-white/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-black/5 dark:prose-pre:bg-white/5 prose-pre:border prose-pre:border-black/10 dark:prose-pre:border-white/10">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight, rehypeSanitize]}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
