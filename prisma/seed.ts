import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const adminHash = await argon2.hash('admin123');
  const admin = await prisma.user.upsert({
    where: { email: 'admin@trevor.dev' },
    update: {},
    create: {
      email: 'admin@trevor.dev',
      passwordHash: adminHash,
      name: 'Trevor Admin',
      role: 'ADMIN',
    },
  });

  console.log('✅ Created admin user:', admin.email);

  // Create tags
  const tags = await Promise.all([
    prisma.tag.upsert({
      where: { slug: 'web-development' },
      update: {},
      create: { name: 'Web Development', slug: 'web-development' },
    }),
    prisma.tag.upsert({
      where: { slug: 'design' },
      update: {},
      create: { name: 'Design', slug: 'design' },
    }),
    prisma.tag.upsert({
      where: { slug: 'art' },
      update: {},
      create: { name: 'Art', slug: 'art' },
    }),
    prisma.tag.upsert({
      where: { slug: 'typescript' },
      update: {},
      create: { name: 'TypeScript', slug: 'typescript' },
    }),
  ]);

  console.log('✅ Created tags');

  // Create blog posts
  const post1 = await prisma.blogPost.upsert({
    where: { slug: 'welcome-to-my-blog' },
    update: {},
    create: {
      slug: 'welcome-to-my-blog',
      title: 'Welcome to My Blog',
      excerpt: 'An introduction to my creative journey as an artist and developer.',
      content: `# Welcome to My Blog

Hello and welcome! I'm excited to share my journey as both an artist and developer.

## What You'll Find Here

- **Art & Design**: Explorations in visual creativity
- **Code & Tech**: Web development insights and tutorials
- **Creative Process**: Behind-the-scenes of my projects

## About Me

I believe in the intersection of art and technology. This blog is where I document my experiments, learnings, and creations.

Stay tuned for more posts!`,
      status: 'PUBLISHED',
      publishedAt: new Date(),
      authorId: admin.id,
      tags: {
        connect: [{ id: tags[0].id }, { id: tags[1].id }],
      },
    },
  });

  const post2 = await prisma.blogPost.upsert({
    where: { slug: 'building-with-nextjs' },
    update: {},
    create: {
      slug: 'building-with-nextjs',
      title: 'Building Modern Web Apps with Next.js',
      excerpt: 'A deep dive into creating production-ready applications with Next.js and TypeScript.',
      content: `# Building Modern Web Apps with Next.js

Next.js has become my go-to framework for building web applications. Here's why.

## Why Next.js?

1. **Server-Side Rendering**: Better performance and SEO
2. **File-based Routing**: Intuitive and simple
3. **API Routes**: Backend and frontend in one place
4. **Image Optimization**: Built-in image optimization
5. **TypeScript Support**: First-class TypeScript support

## My Setup

I typically use:
- Next.js 15
- TypeScript
- Tailwind CSS
- Prisma for database
- Vercel for deployment

## Conclusion

Next.js makes it easy to build fast, scalable applications. Give it a try!`,
      status: 'PUBLISHED',
      publishedAt: new Date(Date.now() - 86400000), // Yesterday
      authorId: admin.id,
      tags: {
        connect: [{ id: tags[0].id }, { id: tags[3].id }],
      },
    },
  });

  console.log('✅ Created blog posts');

  // Create portfolio items
  const portfolio1 = await prisma.portfolioItem.upsert({
    where: { slug: 'personal-portfolio' },
    update: {},
    create: {
      slug: 'personal-portfolio',
      title: 'Personal Portfolio Website',
      description: `A custom-built portfolio website showcasing my work as an artist and developer.

## Features
- Dark/light theme with smooth transitions
- Responsive design
- Blog with markdown support
- Contact form
- SEO optimized

## Technical Details
Built with Next.js, TypeScript, and Tailwind CSS. Deployed on Vercel with PostgreSQL database.`,
      category: 'Web Development',
      images: [],
      links: {
        github: 'https://github.com/trevor/portfolio',
        demo: 'https://trevor.dev',
      },
      techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Prisma'],
      featured: true,
      order: 1,
      authorId: admin.id,
    },
  });

  const portfolio2 = await prisma.portfolioItem.upsert({
    where: { slug: 'digital-art-series' },
    update: {},
    create: {
      slug: 'digital-art-series',
      title: 'Abstract Digital Art Series',
      description: `A collection of abstract digital artworks exploring the intersection of chaos and order.

## Concept
This series examines the beauty found in algorithmic generation and human curation.

## Process
Created using generative algorithms written in JavaScript, then refined by hand.`,
      category: 'Art',
      images: [],
      links: null,
      techStack: ['p5.js', 'Canvas API', 'JavaScript'],
      featured: true,
      order: 2,
      authorId: admin.id,
    },
  });

  console.log('✅ Created portfolio items');

  console.log('');
  console.log('🎉 Database seeded successfully!');
  console.log('');
  console.log('📧 Admin credentials:');
  console.log('   Email: admin@trevor.dev');
  console.log('   Password: admin123');
  console.log('');
  console.log('🔒 Change the password after first login!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
