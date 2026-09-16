import { notFound } from 'next/navigation';
import { Header } from '@/components/public/Header';
import { Footer } from '@/components/public/Footer';
import { PortfolioDetailArticle } from '@/components/public/PortfolioDetailArticle';
import {
  getPortfolioProjectBySlug,
  getAllPortfolioSlugs,
} from '@/lib/portfolio';
import type { Metadata } from 'next';

export const dynamicParams = true;
export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const slugs = await getAllPortfolioSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPortfolioProjectBySlug(slug);

  if (!project) {
    return { title: 'Project Not Found' };
  }

  const description = project.details?.extendedDescription
    ? project.details.extendedDescription.slice(0, 160)
    : project.description.slice(0, 160);

  return {
    title: project.title,
    description,
    openGraph: {
      title: project.title,
      description,
      type: 'article',
      images: project.image ? [project.image] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description,
      images: project.image ? [project.image] : undefined,
    },
  };
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getPortfolioProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title,
    description: project.description,
    applicationCategory: project.category,
    operatingSystem: 'Web',
    url: project.demoUrl || project.githubUrl,
    author: {
      '@type': 'Person',
      name: 'Trevor Mearns',
    },
    image: project.image || undefined,
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="flex-1">
        <PortfolioDetailArticle project={project} />
      </main>

      <Footer />
    </div>
  );
}
