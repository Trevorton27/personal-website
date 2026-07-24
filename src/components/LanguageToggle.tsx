'use client';

import { useLanguage } from './LanguageProvider';
import { useTheme } from './ThemeProvider';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'ja' : 'en')}
      className={`px-2 py-1 rounded-lg text-xs font-medium transition-colors duration-200 ${
        isDark
          ? 'hover:bg-white/10 text-slate-400'
          : 'hover:bg-slate-100 text-slate-600'
      }`}
      aria-label="Toggle language"
    >
      {language === 'en' ? '日本語' : 'EN'}
    </button>
  );
}
