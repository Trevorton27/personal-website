'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '../ThemeProvider';
import { useLanguage } from '../LanguageProvider';
import { LanguageToggle } from '../LanguageToggle';
import { Menu, X, Github, Linkedin } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

const navItems = [
  { href: '/services', key: 'common.services' },
  { href: '/#portfolio', key: 'common.portfolio' },
  { href: '/blog', key: 'common.blog' },
  { href: '/#about', key: 'common.about' },
  { href: '/#contact', key: 'common.contact' },
];

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDark = theme === 'dark';

  const closeMobile = useCallback(() => setMobileMenuOpen(false), []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMobile();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [mobileMenuOpen, closeMobile]);

  const isActive = (href: string) => {
    if (href.startsWith('/#')) return pathname === '/';
    return pathname === href || pathname.startsWith(href + '/');
  };

  const linkClass = (href: string) => {
    const active = isActive(href);
    if (active) {
      return `transition-colors duration-200 text-accent font-medium`;
    }
    return `transition-colors duration-200 ${
      isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
    }`;
  };

  const mobileLinkClass = (href: string) => {
    const active = isActive(href);
    if (active) {
      return `block py-3 px-4 rounded-lg text-sm transition-colors duration-200 text-accent font-medium ${
        isDark ? 'bg-white/5' : 'bg-slate-50'
      }`;
    }
    return `block py-3 px-4 rounded-lg text-sm transition-colors duration-200 ${
      isDark
        ? 'text-slate-400 hover:text-white hover:bg-white/5'
        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
    }`;
  };

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-xl transition-colors duration-300 ${
      isDark ? 'bg-black/80' : 'bg-white/80'
    }`}>
      <nav className="mx-auto max-w-6xl px-6" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center gap-3 font-medium flex-shrink-0">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-black">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </span>
            <span className="hidden sm:inline">Trevor Mearns</span>
          </Link>

          {/* Center: Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={linkClass(item.href)}
              >
                {t(item.key)}
              </Link>
            ))}
          </div>

          {/* Right: Controls */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <LanguageToggle />

            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                isDark ? 'hover:bg-white/10 text-slate-400' : 'hover:bg-slate-100 text-slate-600'
              }`}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                isDark ? 'hover:bg-white/10 text-slate-400' : 'hover:bg-slate-100 text-slate-600'
              }`}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className={`lg:hidden py-4 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={mobileLinkClass(item.href)}
                  onClick={closeMobile}
                >
                  {t(item.key)}
                </Link>
              ))}

              {/* Divider */}
              <div className={`my-3 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`} />

              {/* Social links in mobile menu */}
              <a
                href="https://github.com/trevormearns"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 py-3 px-4 rounded-lg text-sm transition-colors duration-200 ${
                  isDark
                    ? 'text-slate-400 hover:text-white hover:bg-white/5'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
                onClick={closeMobile}
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/trevormearns"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 py-3 px-4 rounded-lg text-sm transition-colors duration-200 ${
                  isDark
                    ? 'text-slate-400 hover:text-white hover:bg-white/5'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
                onClick={closeMobile}
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>

            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
