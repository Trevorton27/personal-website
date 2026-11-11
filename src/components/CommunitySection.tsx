import Image from 'next/image';
import Link from 'next/link';
import type { Language } from '@/components/LanguageProvider';
import { communityEntries, formatCommunityDate, type CommunityEntry, type CommunityImage } from '@/data/community';

interface CommunitySectionProps {
  isDark: boolean;
  language: Language;
  t: (key: string) => string;
}

export function CommunitySection({ isDark, language, t }: CommunitySectionProps) {
  return (
    <section id="community" aria-labelledby="community-heading" className="mx-auto max-w-5xl px-6 py-24 md:py-32">
      <div className="mb-12 max-w-2xl">
        <h2
          id="community-heading"
          className="text-sm font-medium tracking-wide uppercase mb-4 text-slate-500"
        >
          {t('home.communityTitle')}
        </h2>
        <p className={`text-lg leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          {t('home.communityIntro')}
        </p>
      </div>

      <div className="space-y-20">
        {communityEntries.map((entry) => (
          <CommunityEntryArticle key={entry.slug} entry={entry} isDark={isDark} language={language} t={t} />
        ))}
      </div>
    </section>
  );
}

function CommunityEntryArticle({ entry, isDark, language, t }: { entry: CommunityEntry } & CommunitySectionProps) {
  const headingId = `community-${entry.slug}`;
  const title = entry.title[language];
  const [primary, ...supporting] = entry.images;
  const muted = isDark ? 'text-slate-400' : 'text-slate-600';

  return (
    <article aria-labelledby={headingId} className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-5">
        <p className={`text-xs uppercase tracking-wide ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          {entry.category[language]} · {entry.location[language]} ·{' '}
          <time dateTime={entry.date}>{formatCommunityDate(entry.date, language)}</time>
        </p>
        <h3
          id={headingId}
          className={`mt-3 text-2xl md:text-3xl font-bold tracking-tight ${isDark ? 'text-slate-100' : 'text-slate-900'}`}
        >
          {title}
        </h3>
        <p className={`mt-5 leading-relaxed ${muted}`}>{entry.summary[language]}</p>

        {entry.details && entry.details.length > 0 && (
          <dl className="mt-8 space-y-5">
            {entry.details.map((detail) => (
              <div key={detail.label.en}>
                <dt className={`text-sm font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  {detail.label[language]}
                </dt>
                <dd className={`mt-1 text-sm leading-relaxed ${muted}`}>{detail.body[language]}</dd>
              </div>
            ))}
          </dl>
        )}

        <h4 className="sr-only">{t('home.communityTopics')}</h4>
        <ul className="mt-8 flex flex-wrap gap-2">
          {entry.tags[language].map((tag) => (
            <li
              key={tag}
              className={`text-xs px-2 py-1 rounded-full ${isDark ? 'bg-slate-800/60 text-slate-200' : 'bg-slate-100 text-slate-600'}`}
            >
              {tag}
            </li>
          ))}
        </ul>

        {entry.skills && (
          <p
            className={`mt-8 pt-6 border-t text-xs leading-relaxed text-slate-500 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}
          >
            {entry.skills[language].join(' · ')}
          </p>
        )}

        {entry.detailUrl && (
          <Link
            href={entry.detailUrl}
            className="mt-6 inline-flex items-center gap-1 rounded text-sm font-medium text-accent hover:text-accent-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {t('home.communityReadMore')} →
          </Link>
        )}
      </div>

      {/* Columns are ~8:5 so a portrait primary photo lines up with the stacked supporting photos at natural aspect ratios. */}
      <div
        role="group"
        aria-label={`${t('home.communityPhotos')}: ${title}`}
        className={`lg:col-span-7 grid gap-4 ${supporting.length > 0 ? 'md:grid-cols-[8fr_5fr]' : ''}`}
      >
        <CommunityPhoto
          image={primary}
          language={language}
          isDark={isDark}
          sizes="(min-width: 1024px) 340px, (min-width: 768px) 445px, 100vw"
        />
        {supporting.length > 0 && (
          <div className="grid gap-4 content-start">
            {supporting.map((image) => (
              <CommunityPhoto
                key={image.src}
                image={image}
                language={language}
                isDark={isDark}
                sizes="(min-width: 1024px) 210px, (min-width: 768px) 280px, 100vw"
              />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

function CommunityPhoto({
  image,
  language,
  isDark,
  sizes,
}: {
  image: CommunityImage;
  language: Language;
  isDark: boolean;
  sizes: string;
}) {
  return (
    <Image
      src={image.src}
      width={image.width}
      height={image.height}
      alt={image.alt[language]}
      sizes={sizes}
      className={`h-auto w-full rounded-xl ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}
    />
  );
}
