'use client';

import { useTheme } from '@/components/ThemeProvider';
import { useLanguage } from '@/components/LanguageProvider';
import { Globe, Wrench, Brain } from 'lucide-react';
import { packages, fullServices } from '@/data/services';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe,
  Wrench,
  Brain,
};

export function ServicePackages() {
  const { theme } = useTheme();
  const { t, language } = useLanguage();
  const isDark = theme === 'dark';

  return (
    <section className={`py-20 ${isDark ? 'bg-slate-900/50' : 'bg-slate-50'}`}>
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          {t('services.title')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {packages.map((pkg) => {
            const Icon = iconMap[pkg.icon];
            return (
              <div
                key={pkg.id}
                className={`relative rounded-xl p-6 transition-all duration-200 hover:scale-[1.02] ${
                  pkg.popular
                    ? 'border-2 border-accent shadow-accent'
                    : isDark
                      ? 'border border-slate-700/50 bg-slate-800/50'
                      : 'border border-slate-200 bg-white shadow-soft'
                } ${isDark && !pkg.popular ? '' : ''}`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-xs font-medium px-3 py-1 rounded-full">
                    Popular
                  </span>
                )}
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 mb-4">
                  {Icon && <Icon className="w-5 h-5 text-accent" />}
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {t(`${pkg.translationKey}.name`)}
                </h3>
                <p className={`text-sm mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {t(`${pkg.translationKey}.description`)}
                </p>
                <p className="text-lg font-bold text-accent mb-4">
                  {t(`${pkg.translationKey}.price`)}
                </p>
                <a
                  href="#work-with-me"
                  className="block w-full text-center rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-accent-hover"
                >
                  {t('services.cta')}
                </a>
              </div>
            );
          })}
        </div>

        <h3 className="text-2xl font-bold text-center mb-8">
          {t('services.fullServicesTitle')}
        </h3>
        <div className={`rounded-xl overflow-hidden border ${isDark ? 'border-slate-700/50' : 'border-slate-200'}`}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className={isDark ? 'bg-slate-800' : 'bg-slate-50'}>
                  <th className="text-left px-4 py-3 font-medium">{t('services.tableHeaders.service')}</th>
                  <th className="text-left px-4 py-3 font-medium hidden sm:table-cell">{t('services.tableHeaders.target')}</th>
                  <th className="text-right px-4 py-3 font-medium">{t('services.tableHeaders.price')}</th>
                </tr>
              </thead>
              <tbody>
                {fullServices.map((service, i) => (
                  <tr
                    key={i}
                    className={`border-t ${isDark ? 'border-slate-700/50' : 'border-slate-200'} ${
                      isDark ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="px-4 py-3">{language === 'en' ? service.nameEn : service.nameJa}</td>
                    <td className={`px-4 py-3 hidden sm:table-cell ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {language === 'en' ? service.targetEn : service.targetJa}
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-accent">
                      {language === 'en' ? service.priceEn : service.priceJa}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
