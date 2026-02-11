'use client';

import { useEffect, useState } from 'react';

interface WPPost {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
}

function decodeHtmlEntities(text: string): string {
  const entities: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#039;': "'",
    '&#8217;': "'",
    '&#8216;': "'",
    '&#8220;': '"',
    '&#8221;': '"',
    '&#8211;': '–',
    '&#8212;': '—',
    '&nbsp;': ' ',
    '&hellip;': '...',
  };

  let decoded = text;
  for (const [entity, char] of Object.entries(entities)) {
    decoded = decoded.replace(new RegExp(entity, 'g'), char);
  }
  return decoded;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });
}

function getReadingTime(content: string): number {
  const text = stripHtml(content);
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function WritingSection({ isDark }: { isDark: boolean }) {
  const [posts, setPosts] = useState<WPPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const WP_BASE_URL = process.env.NEXT_PUBLIC_WP_BASE_URL || 'https://trevormearns.com';

    fetch(`${WP_BASE_URL}/wp-json/wp/v2/posts?per_page=3&_embed=1`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section id="writing" className="mx-auto max-w-5xl px-6 py-24 md:py-32">
        <div className="flex items-end justify-between mb-12">
          <h2
            className={`text-sm font-medium tracking-wide uppercase ${isDark ? 'text-slate-500' : 'text-slate-500'}`}
          >
            Writing
          </h2>
          <a href="/blog" className="text-sm text-accent hover:underline">
            All posts →
          </a>
        </div>
        <div className="space-y-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className={`h-4 w-32 rounded mb-3 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`} />
              <div className={`h-6 w-3/4 rounded mb-2 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`} />
              <div className={`h-4 w-full rounded ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`} />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return (
      <section id="writing" className="mx-auto max-w-5xl px-6 py-24 md:py-32">
        <div className="flex items-end justify-between mb-12">
          <h2
            className={`text-sm font-medium tracking-wide uppercase ${isDark ? 'text-slate-500' : 'text-slate-500'}`}
          >
            Writing
          </h2>
          <a href="/blog" className="text-sm text-accent hover:underline">
            All posts →
          </a>
        </div>
        <p className={isDark ? 'text-slate-500' : 'text-slate-500'}>
          No posts yet. Check back soon!
        </p>
      </section>
    );
  }

  return (
    <section id="writing" className="mx-auto max-w-5xl px-6 py-24 md:py-32">
      <div className="flex items-end justify-between mb-12">
        <h2
          className={`text-sm font-medium tracking-wide uppercase ${isDark ? 'text-slate-500' : 'text-slate-500'}`}
        >
          Writing
        </h2>
        <a href="/blog" className="text-sm text-accent hover:underline">
          All posts →
        </a>
      </div>

      <div className="space-y-8">
        {posts.map((post, i) => {
          const excerpt = stripHtml(post.excerpt.rendered);
          const readingTime = getReadingTime(post.content.rendered);

          return (
            <article
              key={post.id}
              className={`group pb-8 ${
                i < posts.length - 1
                  ? `border-b ${isDark ? 'border-slate-800' : 'border-slate-200'}`
                  : ''
              }`}
            >
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-2">
                <span
                  className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-500'}`}
                >
                  {formatDate(post.date)}
                </span>
                <span
                  className={`text-sm ${isDark ? 'text-slate-600' : 'text-slate-400'}`}
                >
                  ·
                </span>
                <span
                  className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-500'}`}
                >
                  {readingTime} min read
                </span>
              </div>
              <h3
                className={`text-lg font-semibold mb-2 group-hover:text-accent transition-colors ${isDark ? 'text-slate-100' : 'text-slate-900'}`}
              >
                <a href={`/blog/${post.slug}`}>
                  {decodeHtmlEntities(post.title.rendered)}
                </a>
              </h3>
              <p
                className={`leading-relaxed line-clamp-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
              >
                {decodeHtmlEntities(excerpt)}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
