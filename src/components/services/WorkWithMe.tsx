'use client';

import { useState } from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { useLanguage } from '@/components/LanguageProvider';

const serviceOptions = ['website', 'ai', 'support', 'education', 'consulting', 'other'] as const;

export function WorkWithMe() {
  const { theme } = useTheme();
  const { t, language } = useLanguage();
  const isDark = theme === 'dark';

  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    company: string;
    serviceInterest: string;
    message: string;
    preferredLanguage: 'en' | 'ja';
  }>({
    name: '',
    email: '',
    company: '',
    serviceInterest: 'consulting',
    message: '',
    preferredLanguage: language,
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('/api/services-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', company: '', serviceInterest: 'consulting', message: '', preferredLanguage: language });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const inputClass = `w-full rounded-lg px-4 py-2.5 text-sm transition-colors duration-200 ${
    isDark
      ? 'bg-slate-800 border border-slate-700 text-slate-100 focus:border-accent placeholder-slate-500'
      : 'bg-white border border-slate-300 text-slate-900 focus:border-accent placeholder-slate-400'
  } focus:outline-none focus:ring-1 focus:ring-accent`;

  return (
    <section id="work-with-me" className="py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">{t('workWithMe.title')}</h2>
          <p className={`mt-3 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {t('workWithMe.subtitle')}
          </p>
        </div>

        <div className="max-w-xl mx-auto">
            <h3 className="text-lg font-semibold mb-6">{t('workWithMe.formTitle')}</h3>

            {status === 'success' ? (
              <div className="rounded-xl p-6 bg-green-500/10 border border-green-500/20 text-green-400 text-center">
                {t('workWithMe.success')}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {t('common.name')}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t('form.name')}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {t('common.email')}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t('form.email')}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {t('common.company')} <span className={isDark ? 'text-slate-500' : 'text-slate-400'}>({t('common.optional')})</span>
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder={t('form.company')}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {t('workWithMe.serviceInterest')}
                  </label>
                  <select
                    value={formData.serviceInterest}
                    onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                    className={inputClass}
                  >
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {t(`workWithMe.serviceOptions.${opt}`)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {t('workWithMe.preferredLanguage')}
                  </label>
                  <select
                    value={formData.preferredLanguage}
                    onChange={(e) => setFormData({ ...formData, preferredLanguage: e.target.value as 'en' | 'ja' })}
                    className={inputClass}
                  >
                    <option value="en">English</option>
                    <option value="ja">日本語</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {t('common.message')}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t('form.message')}
                    className={inputClass}
                  />
                </div>

                {status === 'error' && (
                  <p className="text-red-400 text-sm">{t('workWithMe.error')}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-accent-hover shadow-accent hover:shadow-accent-lg disabled:opacity-50"
                >
                  {status === 'sending' ? t('common.sending') : t('common.submit')}
                </button>
              </form>
            )}
        </div>
      </div>
    </section>
  );
}
