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

    const { title, slug, excerpt, content, coverImage, status, publishedAt, tagIds } = body;

    // Validate required fields
    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: 'Title, slug, and content are required' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug },
    });

    if (existingPost) {
      return NextResponse.json(
        { error: 'A post with this slug already exists' },
        { status: 400 }
      );
    }

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
