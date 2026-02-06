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
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      <Header />

      <main className="flex-1">
        <article className="mx-auto max-w-4xl px-6 py-12">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-[#d48a27] hover:text-[#b8751f] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>

          <header className="mb-8">
            <div className="text-sm text-[#8b5cf6] dark:text-[#a78bfa] mb-4">
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
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#d48a27] to-[#b8751f] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#d48a27]/30 transition-all duration-200 hover:shadow-[#d48a27]/50 hover:scale-105"
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
                  className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 border border-black/10 dark:border-white/10 transition-all duration-200"
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
                  className="px-3 py-1 bg-[#d48a27]/10 text-[#d48a27] rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </header>

          <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-black dark:prose-headings:text-white prose-a:text-[#d48a27] prose-a:no-underline hover:prose-a:underline">
            <ReactMarkdown>{item.description}</ReactMarkdown>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
