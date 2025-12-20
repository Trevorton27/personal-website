import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/public/Header';
import { Footer } from '@/components/public/Footer';
import prisma from '@/lib/prisma';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await prisma.portfolioItem.findUnique({
    where: { slug },
  });

  if (!item) {
    return { title: 'Project Not Found' };
  }

  return {
    title: item.title,
    description: item.description.slice(0, 160),
  };
}

export default async function PortfolioItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await prisma.portfolioItem.findUnique({
    where: { slug },
  });

  if (!item) {
    notFound();
  }

  const links = item.links as any;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-lightning-glow hover:underline mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>

          <header className="mb-8">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {item.category}
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              {item.title}
            </h1>

            <div className="flex flex-wrap gap-3 mb-6">
              {links?.demo && (
                <a
                  href={links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary inline-flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Demo
                </a>
              )}
              {links?.github && (
                <a
                  href={links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary inline-flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  View Code
                </a>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {item.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-lightning-glow/10 text-lightning-glow rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </header>

          <div className="prose dark:prose-invert max-w-none">
            <ReactMarkdown>{item.description}</ReactMarkdown>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
