'use client';

import { useTheme } from '@/components/ThemeProvider';
import { useLanguage } from '@/components/LanguageProvider';
import { caseStudies } from '@/data/services';

export function CaseStudies() {
  const { theme } = useTheme();
  const { language, t } = useLanguage();
  const isDark = theme === 'dark';

  return (
    <section className={`py-20 ${isDark ? 'bg-slate-900/50' : 'bg-slate-50'}`}>
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          {t('caseStudies.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseStudies.map((study, i) => (
            <div
              key={i}
              className={`rounded-xl p-6 ${
                isDark
                  ? 'bg-slate-800/50 border border-slate-700/50'
                  : 'bg-white border border-slate-200 shadow-soft'
              }`}
            >
              <h3 className="text-lg font-semibold mb-4">
                {language === 'en' ? study.titleEn : study.titleJa}
              </h3>

              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-accent text-xs uppercase tracking-wider mb-1">
                    {t('caseStudies.challenge')}
                  </p>
                  <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                    {language === 'en' ? study.challengeEn : study.challengeJa}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-accent text-xs uppercase tracking-wider mb-1">
                    {t('caseStudies.solution')}
                  </p>
                  <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                    {language === 'en' ? study.solutionEn : study.solutionJa}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-accent text-xs uppercase tracking-wider mb-1">
                    {t('caseStudies.result')}
                  </p>
                  <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                    {language === 'en' ? study.resultEn : study.resultJa}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-4">
                {study.tech.map((tech) => (
                  <span
                    key={tech}
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      isDark ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
