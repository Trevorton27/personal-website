import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/public/Header';
import { Footer } from '@/components/public/Footer';
import {
  getPostBySlug,
  getAllPostSlugs,
  getFeaturedImageUrl,
  getFeaturedImageAlt,
  getAuthorName,
  formatWPDate,
  getReadingTime,
  sanitizeContent,
  decodeHtmlEntities,
} from '@/lib/wordpress';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import type { Metadata } from 'next';

// Generate static paths for all posts
export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  const title = decodeHtmlEntities(post.title.rendered);
  const featuredImage = getFeaturedImageUrl(post);

  return {
    title,
    description: decodeHtmlEntities(post.excerpt.rendered).slice(0, 160),
    openGraph: {
      title,
      description: decodeHtmlEntities(post.excerpt.rendered).slice(0, 160),
      type: 'article',
      publishedTime: post.date,
      authors: [getAuthorName(post)],
      images: featuredImage ? [featuredImage] : undefined,
    },
    twitter: {
      card: featuredImage ? 'summary_large_image' : 'summary',
      title,
      description: decodeHtmlEntities(post.excerpt.rendered).slice(0, 160),
      images: featuredImage ? [featuredImage] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const title = decodeHtmlEntities(post.title.rendered);
  const authorName = getAuthorName(post);
  const featuredImage = getFeaturedImageUrl(post);
  const readingTime = getReadingTime(post.content.rendered);
  const sanitizedContent = sanitizeContent(post.content.rendered);

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: decodeHtmlEntities(post.excerpt.rendered),
    author: {
      '@type': 'Person',
      name: authorName,
    },
    datePublished: post.date,
    image: featuredImage || undefined,
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-6 py-12 md:py-20">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-accent hover:underline mb-8 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          {/* Header */}
          <header className="mb-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight">
              {title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-accent" />
                <span>{authorName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                <time dateTime={post.date}>{formatWPDate(post.date)}</time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                <span>{readingTime} min read</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {featuredImage && (
            <div className="relative aspect-[16/9] mb-10 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
              <Image
                src={featuredImage}
                alt={getFeaturedImageAlt(post)}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
          )}

          {/* Content */}
          <div
            className="prose prose-lg dark:prose-invert max-w-none
              prose-headings:font-semibold prose-headings:tracking-tight
              prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
              prose-p:leading-relaxed prose-p:text-gray-700 dark:prose-p:text-gray-300
              prose-a:text-accent prose-a:no-underline hover:prose-a:underline
              prose-strong:text-black dark:prose-strong:text-white
              prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-gray-50 dark:prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-gray-800
              prose-blockquote:border-l-accent prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-400 prose-blockquote:not-italic
              prose-img:rounded-xl
              prose-li:text-gray-700 dark:prose-li:text-gray-300"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-accent hover:underline font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all posts
            </Link>
          </footer>
        </article>
      </main>

      <Footer />
    </div>
  );
}
