'use client';

import { useTheme } from '@/components/ThemeProvider';
import { useLanguage } from '@/components/LanguageProvider';
import { Building2, Building, Store, User } from 'lucide-react';

const cards = [
  { key: 'businesses', icon: Building2 },
  { key: 'organizations', icon: Building },
  { key: 'smallBusiness', icon: Store },
  { key: 'individuals', icon: User },
] as const;

export function HowCanIHelp() {
  const { theme } = useTheme();
  const { t, language } = useLanguage();
  const isDark = theme === 'dark';

  return (
    <section className={`py-20 ${isDark ? 'bg-slate-900/50' : 'bg-slate-50'}`}>
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          {t('howCanIHelp.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map(({ key, icon: Icon }) => {
            const bullets = language === 'en'
              ? (translations_en_bullets as Record<string, string[]>)[key]
              : (translations_ja_bullets as Record<string, string[]>)[key];

            return (
              <div
                key={key}
                className={`rounded-xl p-6 transition-all duration-200 hover:scale-[1.02] ${
                  isDark
                    ? 'bg-slate-800/50 border border-slate-700/50 hover:border-slate-600'
                    : 'bg-white border border-slate-200 hover:border-slate-300 shadow-soft'
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className={`text-xs font-medium uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                      {t(`howCanIHelp.${key}.label`)}
                    </p>
                    <h3 className="font-semibold">
                      {t(`howCanIHelp.${key}.title`)}
                    </h3>
                  </div>
                </div>
                <ul className={`space-y-2 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {bullets.map((bullet: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-accent mt-1">&#8226;</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const translations_en_bullets: Record<string, string[]> = {
  businesses: [
    'Custom AI integration and automation',
    'Cloud architecture and migration',
    'Technical strategy and roadmapping',
  ],
  organizations: [
    'Enterprise support engineering',
    'Developer tooling and CI/CD optimization',
    'Technical documentation and training',
  ],
  smallBusiness: [
    'Modern bilingual business websites',
    'E-commerce and booking systems',
    'SEO optimization and analytics',
  ],
  individuals: [
    'One-on-one programming instruction',
    'Career transition mentoring',
    'Portfolio and project guidance',
  ],
};

const translations_ja_bullets: Record<string, string[]> = {
  businesses: [
    'カスタムAI統合と自動化',
    'クラウドアーキテクチャと移行',
    '技術戦略とロードマップ策定',
  ],
  organizations: [
    'エンタープライズサポートエンジニアリング',
    '開発ツールとCI/CD最適化',
    '技術ドキュメントとトレーニング',
  ],
  smallBusiness: [
    'モダンなバイリンガルビジネスサイト',
    'ECサイトと予約システム',
    'SEO最適化とアナリティクス',
  ],
  individuals: [
    'マンツーマンプログラミング指導',
    'キャリア転換メンタリング',
    'ポートフォリオ・プロジェクト指導',
  ],
};
