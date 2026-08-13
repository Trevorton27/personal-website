import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const adminHash = await bcrypt.hash('catBear9', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'trevor@trevormearns.com' },
    update: {},
    create: {
      email: 'trevor@trevormearns.com',
      passwordHash: adminHash,
      name: 'Trevor Mearns',
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

  console.log('ℹ️  No seed blog posts (create posts via admin UI)');

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
  console.log('   Email: trevor@trevormearns.com');
  console.log('   Password: catBear9');
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
