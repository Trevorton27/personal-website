'use client';

import { useTheme } from '../ThemeProvider';

export function ResumeViewer() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div
      className={`w-full rounded-lg border overflow-hidden ${
        isDark ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white'
      }`}
    >
      <iframe
        src="/resume.pdf"
        className="w-full"
        style={{ height: '80vh' }}
        title="Trevor Mearns Resume"
      />
    </div>
  );
}
