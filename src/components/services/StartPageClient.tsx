'use client';

import Link from 'next/link';
import { useTheme } from '@/components/ThemeProvider';
import { useLanguage } from '@/components/LanguageProvider';
import { LanguageToggle } from '@/components/LanguageToggle';
import { Briefcase, Mail, Linkedin, FolderOpen } from 'lucide-react';

export function StartPageClient() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';

  const actions = [
    { href: '/services', label: t('start.viewServices'), icon: Briefcase },
    { href: 'mailto:trevor@trevormearns.com', label: t('start.emailMe'), icon: Mail, external: true },
    { href: 'https://www.linkedin.com/in/trevor-mearns/', label: t('start.linkedin'), icon: Linkedin, external: true },
    { href: '/portfolio', label: t('start.portfolio'), icon: FolderOpen },
  ];

  return (
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${isDark ? 'bg-black text-slate-100' : 'bg-white text-slate-900'}`}>
      <div className="w-full max-w-sm mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-12">
          <LanguageToggle />
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors duration-200 ${
              isDark ? 'hover:bg-white/10 text-slate-400' : 'hover:bg-slate-100 text-slate-600'
            }`}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
        </div>

        <div className="text-center mb-10">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-black mb-4">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold">{t('start.title')}</h1>
          <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {t('start.subtitle')}
          </p>
          <p className={`text-xs mt-2 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
            {t('start.tagline')}
          </p>
        </div>

        <div className="space-y-3">
          {actions.map(({ href, label, icon: Icon, external }) => {
            const className = `flex items-center gap-3 w-full rounded-xl px-5 py-3.5 text-sm font-medium transition-all duration-200 ${
              isDark
                ? 'bg-slate-800/50 border border-slate-700/50 hover:border-slate-600 hover:bg-slate-800'
                : 'bg-white border border-slate-200 hover:border-slate-300 shadow-soft hover:shadow-soft-md'
            }`;

            if (external) {
              return (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  <Icon className="w-4 h-4 text-accent" />
                  {label}
                </a>
              );
            }

            return (
              <Link key={href} href={href} className={className}>
                <Icon className="w-4 h-4 text-accent" />
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
