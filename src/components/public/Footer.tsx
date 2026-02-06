'use client';

import Link from 'next/link';
import { useTheme } from '../ThemeProvider';

export function Footer() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`border-t transition-colors duration-300 ${
      isDark ? "border-slate-800" : "border-slate-200"
    }`}>
      <div className={`mx-auto max-w-5xl px-6 py-8 text-sm ${isDark ? "text-slate-500" : "text-slate-500"}`}>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p>&copy; {currentYear} Trevor Mearns</p>
          <div className="flex flex-wrap gap-6">
            <Link href="/blog" className={`transition-colors ${isDark ? "hover:text-slate-300" : "hover:text-slate-700"}`}>Blog</Link>
            <Link href="/portfolio" className={`transition-colors ${isDark ? "hover:text-slate-300" : "hover:text-slate-700"}`}>Projects</Link>
            <Link href="/privacy" className={`transition-colors ${isDark ? "hover:text-slate-300" : "hover:text-slate-700"}`}>Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
