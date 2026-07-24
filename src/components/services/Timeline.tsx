'use client';

import { useTheme } from '@/components/ThemeProvider';
import { useLanguage } from '@/components/LanguageProvider';
import { timelineEntries } from '@/data/services';

export function Timeline() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const { t } = useLanguage();
  const isDark = theme === 'dark';

  return (
    <section className="py-20">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          {t('timeline.title')}
        </h2>

        {/* Desktop horizontal timeline */}
        <div className="hidden md:block">
          <div className="relative">
            <div className={`absolute top-6 left-0 right-0 h-0.5 ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`} />
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-accent/30" />
            <div className="flex justify-between">
              {timelineEntries.map((entry, i) => (
                <div key={i} className="relative flex flex-col items-center text-center" style={{ width: `${100 / timelineEntries.length}%` }}>
                  <div className="w-3 h-3 rounded-full bg-accent ring-4 ring-accent/20 z-10" />
                  <span className="mt-3 text-xs font-bold text-accent">{entry.year}</span>
                  <h3 className="mt-2 text-sm font-semibold">
                    {language === 'en' ? entry.titleEn : entry.titleJa}
                  </h3>
                  <p className={`mt-1 text-xs px-2 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                    {language === 'en' ? entry.descriptionEn : entry.descriptionJa}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile vertical timeline */}
        <div className="md:hidden space-y-0">
          {timelineEntries.map((entry, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-accent ring-4 ring-accent/20 flex-shrink-0" />
                {i < timelineEntries.length - 1 && (
                  <div className={`w-0.5 flex-1 ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`} />
                )}
              </div>
              <div className="pb-8">
                <span className="text-xs font-bold text-accent">{entry.year}</span>
                <h3 className="text-sm font-semibold mt-1">
                  {language === 'en' ? entry.titleEn : entry.titleJa}
                </h3>
                <p className={`text-xs mt-1 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                  {language === 'en' ? entry.descriptionEn : entry.descriptionJa}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
