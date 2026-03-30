import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/public/Header';
import { Footer } from '@/components/public/Footer';
import {
  getPostBySlug,
  getAllPostSlugs,
  formatPostDate,
  getReadingTime,
  stripHtml,
} from '@/lib/blog';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import type { Metadata } from 'next';

export const dynamicParams = true;
export const revalidate = 60;

// Generate static paths for all posts
export async function generateStaticParams() {
  try {
    const slugs = await getAllPostSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  let post;
  try {
    post = await getPostBySlug(slug);
  } catch {
    return { title: 'Blog Unavailable' };
  }

  if (!post) {
    return { title: 'Post Not Found' };
  }

  const excerpt = post.excerpt ? stripHtml(post.excerpt).slice(0, 160) : '';

  return {
    title: post.title,
    description: excerpt,
    openGraph: {
      title: post.title,
      description: excerpt,
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
      authors: [post.author.name || 'Trevor Mearns'],
      images: post.coverImage ? [post.coverImage] : undefined,
    },
    twitter: {
      card: post.coverImage ? 'summary_large_image' : 'summary',
      title: post.title,
      description: excerpt,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post;
  try {
    post = await getPostBySlug(slug);
  } catch {
    return (
      <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
        <Header />
        <main className="flex-1 mx-auto max-w-3xl px-6 py-12 md:py-20">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-accent hover:underline mb-8 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <div className="text-center py-16">
            <p className="text-red-600 dark:text-red-400 text-lg mb-2">
              Unable to load this post.
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              The blog is temporarily unavailable. Please try again later.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    notFound();
  }

  const authorName = post.author.name || 'Trevor Mearns';
  const readingTime = getReadingTime(post.content);

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt ? stripHtml(post.excerpt) : '',
    author: {
      '@type': 'Person',
      name: authorName,
    },
    datePublished: post.publishedAt?.toISOString(),
    image: post.coverImage || undefined,
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
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-accent" />
                <span>{authorName}</span>
              </div>
              {post.publishedAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                  <time dateTime={post.publishedAt.toISOString()}>
                    {formatPostDate(post.publishedAt)}
                  </time>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                <span>{readingTime} min read</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {post.coverImage && (
            <div className="relative aspect-[16/9] mb-10 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
              <Image
                src={post.coverImage}
                alt={post.title}
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
            dangerouslySetInnerHTML={{ __html: post.content }}
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
