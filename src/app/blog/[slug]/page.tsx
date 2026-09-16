import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/public/Header';
import { Footer } from '@/components/public/Footer';
import { BlogPostArticle } from '@/components/public/BlogPostArticle';
import {
  getPostBySlug,
  getAllPostSlugs,
  stripHtml,
} from '@/lib/blog';
import { ArrowLeft } from 'lucide-react';
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
        <BlogPostArticle post={post} />
      </main>

      <Footer />
    </div>
  );
}
