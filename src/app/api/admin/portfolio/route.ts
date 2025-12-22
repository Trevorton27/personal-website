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
    const { title, slug, description, category, techStack, images, featured, order, links } = body;

    // Validate required fields
    if (!title || !slug || !description || !category) {
      return NextResponse.json(
        { error: 'Title, slug, description, and category are required' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingItem = await prisma.portfolioItem.findUnique({
      where: { slug },
    });

    if (existingItem) {
      return NextResponse.json(
        { error: 'A portfolio item with this slug already exists' },
        { status: 400 }
      );
    }

    // Create the portfolio item
    const item = await prisma.portfolioItem.create({
      data: {
        title,
        slug,
        description,
        category,
        techStack: techStack || [],
        images: images || [],
        featured: featured || false,
        order: order || 0,
        links: links || null,
        authorId: session.userId!,
      },
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error('Error creating portfolio item:', error);
    return NextResponse.json(
      { error: 'Failed to create portfolio item' },
      { status: 500 }
    );
  }
}
