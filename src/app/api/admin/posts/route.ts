import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/session';

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();

    if (!session.isLoggedIn || !session.userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    const body = await request.json();

    const { title, excerpt, content, coverImage, status, publishedAt, tagIds } = body;
    let { slug } = body;

    // Validate required fields (drafts only need a title)
    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    if (status !== 'DRAFT' && (!slug || !content)) {
      return NextResponse.json(
        { error: 'Slug and content are required for non-draft posts' },
        { status: 400 }
      );
    }

    // Auto-generate slug from title if not provided
    if (!slug) {
      slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    // Ensure slug uniqueness by appending a suffix if needed
    let finalSlug = slug;
    let suffix = 0;
    while (await prisma.blogPost.findUnique({ where: { slug: finalSlug } })) {
      suffix++;
      finalSlug = `${slug}-${suffix}`;
    }
    slug = finalSlug;

    // Prepare published date
    let publishedAtDate = null;
    if (status === 'PUBLISHED' || status === 'SCHEDULED') {
      publishedAtDate = publishedAt ? new Date(publishedAt) : new Date();
    }

    // Create the post
    const post = await prisma.blogPost.create({
      data: {
        title,
        slug,
        excerpt: excerpt || '',
        content,
        coverImage: coverImage || null,
        status,
        publishedAt: publishedAtDate,
        authorId: session.userId!,
        tags: tagIds && tagIds.length > 0
          ? {
              connect: tagIds.map((id: string) => ({ id })),
            }
          : undefined,
      },
      include: {
        author: true,
        tags: true,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
