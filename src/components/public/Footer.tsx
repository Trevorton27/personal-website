'use client';

import Link from 'next/link';
import { useTheme } from '../ThemeProvider';
import { Github, Linkedin, FileText } from 'lucide-react';

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
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/blog" className={`transition-colors ${isDark ? "hover:text-slate-300" : "hover:text-slate-700"}`}>Blog</Link>
            <Link href="/#portfolio" className={`transition-colors ${isDark ? "hover:text-slate-300" : "hover:text-slate-700"}`}>Projects</Link>
            <Link href="/privacy" className={`transition-colors ${isDark ? "hover:text-slate-300" : "hover:text-slate-700"}`}>Privacy</Link>
            <Link
              href="/resume"
              className={`inline-flex items-center gap-1.5 transition-colors ${isDark ? "hover:text-slate-300" : "hover:text-slate-700"}`}
            >
              <FileText className="w-4 h-4" />
              <span className="sr-only sm:not-sr-only">Resume</span>
            </Link>
            <a
              href="https://github.com/Trevorton27"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 transition-colors ${isDark ? "hover:text-slate-300" : "hover:text-slate-700"}`}
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
              <span className="sr-only sm:not-sr-only">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/trevor-mearns/"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 transition-colors ${isDark ? "hover:text-slate-300" : "hover:text-slate-700"}`}
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
              <span className="sr-only sm:not-sr-only">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
