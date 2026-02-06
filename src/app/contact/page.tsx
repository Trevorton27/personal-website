'use client';

import { useState } from 'react';
import { Header } from '@/components/public/Header';
import { Footer } from '@/components/public/Footer';
import { useTheme } from '@/components/ThemeProvider';
import { Mail, Send } from 'lucide-react';

export default function ContactPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    honeypot: '', // Anti-spam honeypot
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (formData.honeypot) {
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '', honeypot: '' });
    } catch (error: any) {
      setStatus('error');
      setErrorMessage(error.message);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
      <Header />

      <main className="flex-1 mx-auto max-w-6xl px-6 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 ${isDark ? "bg-gradient-to-br from-[#d48a27] via-[#c97b22] to-[#8b5cf6] shadow-lg shadow-[#8b5cf6]/25" : "bg-gradient-to-br from-[#d48a27] via-[#c97b22] to-[#4B5563] shadow-lg shadow-[#4B5563]/25"}`}>
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Get in Touch</h1>
            <p className={`text-xl ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              Have a question or want to work together? Drop me a message!
            </p>
          </div>

          <form onSubmit={handleSubmit} className={`rounded-2xl p-6 ${isDark ? "bg-white/5 border border-white/10" : "bg-white border border-black/5 shadow-lg"}`}>
            {/* Honeypot field - hidden from users */}
            <input
              type="text"
              name="website"
              value={formData.honeypot}
              onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#d48a27] ${
                    isDark
                      ? "bg-white/5 border border-white/10 text-white placeholder-gray-500"
                      : "bg-white border border-black/10 text-black placeholder-gray-400"
                  }`}
                  disabled={status === 'submitting'}
                />
              </div>

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
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl resize-none transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#d48a27] ${
                    isDark
                      ? "bg-white/5 border border-white/10 text-white placeholder-gray-500"
                      : "bg-white border border-black/10 text-black placeholder-gray-400"
                  }`}
                  disabled={status === 'submitting'}
                />
              </div>

              {status === 'error' && (
                <div className={`p-4 rounded-xl ${isDark ? "bg-red-500/10 border border-red-500/20 text-red-400" : "bg-red-50 border border-red-200 text-red-700"}`}>
                  {errorMessage}
                </div>
              )}

              {status === 'success' && (
                <div className={`p-4 rounded-xl ${isDark ? "bg-green-500/10 border border-green-500/20 text-green-400" : "bg-green-50 border border-green-200 text-green-700"}`}>
                  Thanks for your message! I'll get back to you soon.
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#d48a27] to-[#b8751f] px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-[#d48a27]/30 transition-all duration-200 hover:shadow-[#d48a27]/50 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {status === 'submitting' ? (
                  'Sending...'
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
