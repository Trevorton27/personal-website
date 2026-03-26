import {
  formatPostDateShort,
  getReadingTime,
  stripHtml,
} from '@/lib/blog-utils';

export interface WritingSectionPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  publishedAt: string | null;
}

export function WritingSection({ isDark, posts }: { isDark: boolean; posts: WritingSectionPost[] }) {
  if (!posts || posts.length === 0) {
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
          const excerpt = post.excerpt ? stripHtml(post.excerpt) : '';
          const readingTime = getReadingTime(post.content);

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
                {post.publishedAt && (
                  <span
                    className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-500'}`}
                  >
                    {formatPostDateShort(post.publishedAt)}
                  </span>
                )}
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
                  {post.title}
                </a>
              </h3>
              {excerpt && (
                <p
                  className={`leading-relaxed line-clamp-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
                >
                  {excerpt}
                </p>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
