import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const prisma = new PrismaClient();
const AUTHOR_ID = 'cmjecn2ao0000i8cog6nehp36'; // Trevor Admin

interface ExportedPost {
  slug: string;
  published_date: string;
  content: string;
  excerpt: string;
  status: string;
}

function generateSlug(content: string, index: number): string {
  // Try to extract a title from the first heading in the content
  const headingMatch = content.match(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/i);
  if (headingMatch) {
    return headingMatch[1]
      .replace(/<[^>]*>/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 80);
  }
  return `untitled-post-${index + 1}`;
}

function extractTitle(post: ExportedPost): string {
  // Use slug as title basis, or extract from first heading
  const headingMatch = post.content.match(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/i);
  if (headingMatch) {
    return headingMatch[1].replace(/<[^>]*>/g, '').trim();
  }
  if (post.slug) {
    return post.slug
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  }
  return 'Untitled Post';
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

function mapStatus(status: string): 'PUBLISHED' | 'DRAFT' {
  return status === 'publish' ? 'PUBLISHED' : 'DRAFT';
}

async function main() {
  const filePath = process.argv[2] || 'trevormearns_wordpress_posts.json';
  const fullPath = resolve(filePath);

  console.log(`Reading posts from ${fullPath}...`);
  const raw = readFileSync(fullPath, 'utf-8');
  const posts: ExportedPost[] = JSON.parse(raw);
  console.log(`Found ${posts.length} posts.\n`);

  let imported = 0;
  let skipped = 0;

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const slug = post.slug || generateSlug(post.content, i);
    const title = extractTitle(post);
    const content = post.content;
    const excerpt = post.excerpt ? stripHtml(post.excerpt) : '';
    const status = mapStatus(post.status);
    const publishedAt = post.published_date ? new Date(post.published_date) : null;

    if (!content || !content.trim()) {
      console.log(`  SKIP: "${title}" (empty content)`);
      skipped++;
      continue;
    }

    const existing = await prisma.blogPost.findUnique({ where: { slug } });
    if (existing) {
      console.log(`  SKIP: "${title}" (slug "${slug}" already exists)`);
      skipped++;
      continue;
    }

    await prisma.blogPost.create({
      data: {
        slug,
        title,
        content,
        excerpt,
        status,
        publishedAt: status === 'PUBLISHED' ? publishedAt : null,
        authorId: AUTHOR_ID,
      },
    });

    console.log(`  OK: "${title}" [${status}]`);
    imported++;
  }

  console.log(`\nDone! Imported: ${imported}, Skipped: ${skipped}`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
