import prisma from '@/lib/prisma';

// Re-export utility functions (safe for client components)
export {
  formatPostDate,
  formatPostDateShort,
  stripHtml,
  getReadingTime,
} from '@/lib/blog-utils';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  status: string;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  author: {
    name: string | null;
  };
  tags: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
}

export interface BlogPostsResponse {
  posts: BlogPost[];
  total: number;
  totalPages: number;
}

export async function getPosts({
  page = 1,
  perPage = 10,
}: {
  page?: number;
  perPage?: number;
} = {}): Promise<BlogPostsResponse> {
  const where = {
    status: 'PUBLISHED' as const,
    publishedAt: { not: null, lte: new Date() },
  };

  const [posts, total] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      orderBy: { publishedAt: 'desc' },
      skip: (page - 1) * perPage,
      take: perPage,
      include: {
        author: { select: { name: true } },
        tags: { select: { id: true, name: true, slug: true } },
      },
    }),
    prisma.blogPost.count({ where }),
  ]);

  return {
    posts,
    total,
    totalPages: Math.ceil(total / perPage),
  };
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  return prisma.blogPost.findFirst({
    where: {
      slug,
      status: 'PUBLISHED',
      publishedAt: { not: null, lte: new Date() },
    },
    include: {
      author: { select: { name: true } },
      tags: { select: { id: true, name: true, slug: true } },
    },
  });
}

export async function getAllPostSlugs(): Promise<string[]> {
  const posts = await prisma.blogPost.findMany({
    where: {
      status: 'PUBLISHED',
      publishedAt: { not: null, lte: new Date() },
    },
    select: { slug: true },
  });
  return posts.map((p) => p.slug);
}

export async function getLatestPosts(count: number = 3): Promise<BlogPost[]> {
  return prisma.blogPost.findMany({
    where: {
      status: 'PUBLISHED',
      publishedAt: { not: null, lte: new Date() },
    },
    orderBy: { publishedAt: 'desc' },
    take: count,
    include: {
      author: { select: { name: true } },
      tags: { select: { id: true, name: true, slug: true } },
    },
  });
}
