'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTheme } from '@/components/ThemeProvider';
import { LogIn } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      router.push('/admin');
    } catch (err: any) {
      setStatus('error');
      setError(err.message);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 transition-colors duration-300 ${
      isDark
        ? "bg-black text-white"
        : "bg-white text-black"
    }`}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 font-semibold tracking-tight">
            <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${isDark ? "bg-gradient-to-br from-[#d48a27] via-[#c97b22] to-[#8b5cf6] shadow-lg shadow-[#8b5cf6]/25" : "bg-gradient-to-br from-[#d48a27] via-[#c97b22] to-[#4B5563] shadow-lg shadow-[#4B5563]/25"}`}>
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </span>
            <span className="text-lg">Trevor Mearns</span>
          </Link>
          <h1 className="text-3xl font-bold mt-6 mb-2">Admin Login</h1>
          <p className={isDark ? "text-gray-400" : "text-gray-600"}>
            Enter your credentials to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className={`rounded-2xl p-6 ${isDark ? "bg-white/5 border border-white/10" : "bg-white border border-black/5 shadow-lg"}`}>
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#d48a27] ${
                  isDark
                    ? "bg-white/5 border border-white/10 text-white placeholder-gray-500"
                    : "bg-white border border-black/10 text-black placeholder-gray-400"
                }`}
                disabled={status === 'submitting'}
                autoComplete="email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#d48a27] ${
                  isDark
                    ? "bg-white/5 border border-white/10 text-white placeholder-gray-500"
                    : "bg-white border border-black/10 text-black placeholder-gray-400"
                }`}
                disabled={status === 'submitting'}
                autoComplete="current-password"
              />
            </div>

            {status === 'error' && (
              <div className={`p-4 rounded-xl text-sm ${isDark ? "bg-red-500/10 border border-red-500/20 text-red-400" : "bg-red-50 border border-red-200 text-red-700"}`}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#d48a27] to-[#b8751f] px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-[#d48a27]/30 transition-all duration-200 hover:shadow-[#d48a27]/50 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {status === 'submitting' ? (
                'Logging in...'
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Log In
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm">
          <Link href="/" className="text-[#d48a27] hover:text-[#b8751f] transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
