import Link from 'next/link';
import Image from 'next/image';
import { formatPostDate, getReadingTime } from '@/lib/blog';
import { contentToHtml } from '@/lib/blog-utils';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import type { BlogPost } from '@/lib/blog';

export function BlogPostArticle({ post }: { post: BlogPost }) {
  const authorName = post.author.name || 'Trevor Mearns';
  const readingTime = getReadingTime(post.content);

  return (
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
        dangerouslySetInnerHTML={{ __html: contentToHtml(post.content) }}
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
  );
}
