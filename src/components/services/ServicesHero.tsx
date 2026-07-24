'use client';

import Link from 'next/link';
import { useTheme } from '@/components/ThemeProvider';
import { useLanguage } from '@/components/LanguageProvider';

export function ServicesHero() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
            {t('hero.headline')}
          </h1>
          <p className={`mt-6 text-lg sm:text-xl leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {t('hero.subtitle')}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#work-with-me"
              className="inline-flex rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-accent-hover shadow-accent hover:shadow-accent-lg"
            >
              {t('hero.cta1')}
            </a>
            <Link
              href="/portfolio"
              className={`inline-flex rounded-lg px-6 py-3 text-sm font-medium transition-all duration-200 border ${
                isDark
                  ? 'border-slate-700 text-slate-300 hover:bg-white/5'
                  : 'border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {t('hero.cta2')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
