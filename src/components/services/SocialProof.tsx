'use client';

import { useTheme } from '@/components/ThemeProvider';
import { useLanguage } from '@/components/LanguageProvider';
import { Shield, Globe, Users, Building2 } from 'lucide-react';

export function SocialProof() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';

  const badges = [
    { icon: Globe, label: t('socialProof.badge1') },
    { icon: Shield, label: t('socialProof.badge2') },
    { icon: Users, label: t('socialProof.badge3') },
    { icon: Building2, label: t('socialProof.badge4') },
  ];

  return (
    <section className="py-16">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-2xl font-bold text-center mb-8">
          {t('socialProof.title')}
        </h2>

        <div className={`rounded-xl p-6 mb-8 ${isDark ? 'bg-slate-800/50 border border-slate-700/50' : 'bg-slate-50 border border-slate-200'}`}>
          <div className={`space-y-2 text-sm text-center ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            <p>{t('socialProof.alarm')}</p>
            <p>{t('socialProof.bitrise')}</p>
            <p>{t('socialProof.teaching')}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className={`flex flex-col items-center gap-2 rounded-lg p-4 text-center ${
                isDark ? 'bg-slate-800/30' : 'bg-white border border-slate-100'
              }`}
            >
              <Icon className="w-5 h-5 text-accent" />
              <span className={`text-xs font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
