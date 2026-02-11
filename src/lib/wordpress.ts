import sanitizeHtml from 'sanitize-html';

// ============================================================================
// Types
// ============================================================================

export interface WPPost {
  id: number;
  slug: string;
  date: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text?: string;
    }>;
    author?: Array<{
      name: string;
      slug: string;
    }>;
  };
}

export interface WPPostsResponse {
  posts: WPPost[];
  total: number;
  totalPages: number;
}

// ============================================================================
// Configuration
// ============================================================================

const WP_BASE_URL = process.env.WP_BASE_URL || 'https://trevormearns.com';
const WP_API_URL = `${WP_BASE_URL}/wp-json/wp/v2`;

const DEFAULT_REVALIDATE = 3600; // 1 hour

// Allowed HTML tags for sanitization
const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    'p', 'br', 'strong', 'em', 'b', 'i', 'u', 's', 'strike',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'ul', 'ol', 'li',
    'blockquote', 'pre', 'code',
    'a', 'img',
    'table', 'thead', 'tbody', 'tr', 'th', 'td',
    'figure', 'figcaption',
    'div', 'span',
    'hr',
  ],
  allowedAttributes: {
    a: ['href', 'target', 'rel', 'title'],
    img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
    code: ['class'],
    pre: ['class'],
    div: ['class'],
    span: ['class'],
    figure: ['class'],
    blockquote: ['class', 'cite'],
  },
  allowedSchemes: ['http', 'https', 'mailto'],
  transformTags: {
    a: (tagName, attribs) => ({
      tagName,
      attribs: {
        ...attribs,
        target: '_blank',
        rel: 'noopener noreferrer',
      },
    }),
  },
};

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Sanitize WordPress HTML content
 */
export function sanitizeContent(html: string): string {
  return sanitizeHtml(html, SANITIZE_OPTIONS);
}

/**
 * Strip HTML tags to get plain text (for excerpts)
 */
export function stripHtml(html: string): string {
  return sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} })
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Extract featured image URL from embedded data
 */
export function getFeaturedImageUrl(post: WPPost): string | null {
  return post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
}

/**
 * Extract featured image alt text from embedded data
 */
export function getFeaturedImageAlt(post: WPPost): string {
  return post._embedded?.['wp:featuredmedia']?.[0]?.alt_text || post.title.rendered;
}

/**
 * Extract author name from embedded data
 */
export function getAuthorName(post: WPPost): string {
  return post._embedded?.author?.[0]?.name || 'Trevor Mearns';
}

/**
 * Decode HTML entities in strings (e.g., &#8217; -> ')
 */
export function decodeHtmlEntities(text: string): string {
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

/**
 * Format WordPress date to readable string
 */
export function formatWPDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Estimate reading time from content
 */
export function getReadingTime(content: string): number {
  const text = stripHtml(content);
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

// ============================================================================
// WordPress API Functions
// ============================================================================

/**
 * Fetch posts from WordPress with pagination
 */
export async function getPosts({
  page = 1,
  perPage = 10,
  revalidate = DEFAULT_REVALIDATE,
}: {
  page?: number;
  perPage?: number;
  revalidate?: number;
} = {}): Promise<WPPostsResponse> {
  const url = new URL(`${WP_API_URL}/posts`);
  url.searchParams.set('page', String(page));
  url.searchParams.set('per_page', String(perPage));
  url.searchParams.set('_embed', '1');
  url.searchParams.set('orderby', 'date');
  url.searchParams.set('order', 'desc');

  const response = await fetch(url.toString(), {
    next: { revalidate },
  });

  if (!response.ok) {
    // Handle pagination beyond bounds
    if (response.status === 400) {
      const errorData = await response.json().catch(() => ({}));
      if (errorData.code === 'rest_post_invalid_page_number') {
        return { posts: [], total: 0, totalPages: 0 };
      }
    }
    throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
  }

  const posts: WPPost[] = await response.json();
  const total = parseInt(response.headers.get('X-WP-Total') || '0', 10);
  const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '0', 10);

  return { posts, total, totalPages };
}

/**
 * Fetch a single post by slug
 */
export async function getPostBySlug(
  slug: string,
  revalidate = DEFAULT_REVALIDATE
): Promise<WPPost | null> {
  const url = new URL(`${WP_API_URL}/posts`);
  url.searchParams.set('slug', slug);
  url.searchParams.set('_embed', '1');

  const response = await fetch(url.toString(), {
    next: { revalidate },
  });

  if (!response.ok) {
    throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
  }

  const posts: WPPost[] = await response.json();
  return posts[0] || null;
}

/**
 * Fetch all post slugs (for static generation)
 */
export async function getAllPostSlugs(
  revalidate = DEFAULT_REVALIDATE
): Promise<string[]> {
  const slugs: string[] = [];
  let page = 1;
  const perPage = 100;

  while (true) {
    const url = new URL(`${WP_API_URL}/posts`);
    url.searchParams.set('page', String(page));
    url.searchParams.set('per_page', String(perPage));
    url.searchParams.set('_fields', 'slug');

    const response = await fetch(url.toString(), {
      next: { revalidate },
    });

    if (!response.ok) {
      if (response.status === 400) break; // No more pages
      throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
    }

    const posts: Array<{ slug: string }> = await response.json();
    if (posts.length === 0) break;

    slugs.push(...posts.map((p) => p.slug));

    const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1', 10);
    if (page >= totalPages) break;
    page++;
  }

  return slugs;
}
