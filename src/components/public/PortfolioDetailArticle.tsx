import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, ExternalLink } from 'lucide-react';
import type { PortfolioProject } from '@/lib/portfolio';

export function PortfolioDetailArticle({ project }: { project: PortfolioProject }) {
  const details = project.details;
  const heroImage = details?.screenshots?.[0];
  const galleryImages = details?.screenshots?.slice(1) ?? [];

  return (
    <article className="mx-auto max-w-3xl px-6 py-12 md:py-20">
      {/* Back link */}
      <Link
        href="/#portfolio"
        className="inline-flex items-center gap-2 text-accent hover:underline mb-8 text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Portfolio
      </Link>

      {/* Header */}
      <header className="mb-10">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="text-xs uppercase tracking-wide font-medium px-2.5 py-1 rounded-full bg-accent/10 text-accent">
            {project.category}
          </span>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="w-4 h-4" />
            <time dateTime={project.lastUpdated}>
              {new Date(project.lastUpdated).toLocaleDateString(undefined, {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </time>
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight">
          {project.title}
        </h1>

        {/* Tech stack pills */}
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </header>

      {/* Hero image */}
      {heroImage && (
        <div className="relative aspect-[16/9] mb-10 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
          {heroImage.caption && (
            <p className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs px-4 py-2">
              {heroImage.caption}
            </p>
          )}
        </div>
      )}

      {/* Problem statement */}
      {details?.problemStatement && (
        <div className="mb-10 rounded-xl border-l-4 border-accent bg-accent/5 px-6 py-5">
          <p className="text-base font-medium leading-relaxed text-gray-800 dark:text-gray-200">
            {details.problemStatement}
          </p>
        </div>
      )}

      {/* Impact tags */}
      {details?.impactTags && details.impactTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10">
          {details.impactTags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Extended description */}
      {details?.extendedDescription && (
        <div
          className="prose prose-lg dark:prose-invert max-w-none mb-16
            prose-p:leading-relaxed prose-p:text-gray-700 dark:prose-p:text-gray-300"
        >
          {details.extendedDescription.split('\n\n').map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      )}

      {/* Key Features */}
      {details?.features && details.features.length > 0 && (
        <section className="mb-16">
          <h2 className="text-sm font-medium tracking-wide uppercase mb-8 text-gray-500 dark:text-gray-400">
            Key Features
          </h2>
          <div className="space-y-12">
            {details.features.map((feature, i) => (
              <div key={i}>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  {feature.description}
                </p>
                {feature.screenshot && (
                  <div className="overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                    <Image
                      src={feature.screenshot}
                      alt={feature.title}
                      width={768}
                      height={432}
                      className="w-full h-auto"
                      sizes="(max-width: 768px) 100vw, 768px"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Screenshot gallery */}
      {galleryImages.length > 0 && (
        <section className="mb-16">
          <h2 className="text-sm font-medium tracking-wide uppercase mb-8 text-gray-500 dark:text-gray-400">
            Screenshots
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {galleryImages.map((shot, i) => (
              <figure key={i} className="space-y-2">
                <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                {shot.caption && (
                  <figcaption className="text-xs text-gray-500 dark:text-gray-400">
                    {shot.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* Action links */}
      <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
        <div className="flex flex-wrap gap-4">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-gray-900 dark:bg-white px-6 py-3 text-sm font-medium text-white dark:text-gray-900 transition-colors hover:bg-gray-700 dark:hover:bg-gray-200"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.013c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.48 0-.237-.008-.866-.013-1.7-2.782.605-3.369-1.343-3.369-1.343-.454-1.157-1.11-1.466-1.11-1.466-.908-.621.069-.609.069-.609 1.004.071 1.532 1.032 1.532 1.032.892 1.531 2.341 1.089 2.91.833.092-.647.35-1.089.636-1.34-2.22-.253-4.555-1.112-4.555-4.951 0-1.094.39-1.988 1.029-2.689-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.748-1.026 2.748-1.026.546 1.378.203 2.397.1 2.65.64.701 1.028 1.595 1.028 2.689 0 3.848-2.339 4.695-4.566 4.943.359.31.679.919.679 1.853 0 1.337-.012 2.419-.012 2.747 0 .265.18.576.688.478C19.138 20.19 22 16.437 22 12.013 22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            View Code
          </a>
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </a>
          )}
        </div>

        <Link
          href="/#portfolio"
          className="inline-flex items-center gap-2 text-accent hover:underline font-medium mt-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link>
      </footer>
    </article>
  );
}
