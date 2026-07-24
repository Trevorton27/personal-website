import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { LanguageProvider } from '@/components/LanguageProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: "Trevor Mearns | Support & Software Professional",
    template: "%s | Trevor Mearns",
  },
  description: 'Bilingual technical problem-solver bridging cloud, code, and customers. Cloud support, full-stack development, and technical solutions.',
  keywords: ['cloud support', 'software development', 'technical support', 'Next.js', 'TypeScript', 'AWS', 'bilingual'],
  authors: [{ name: 'Trevor Mearns' }],
  creator: 'Trevor Mearns',
  icons: {
    icon: '/icon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    title: "Trevor Mearns | Support & Software Professional",
    description: 'Bilingual technical problem-solver bridging cloud, code, and customers.',
    siteName: "Trevor Mearns",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Trevor Mearns | Support & Software Professional",
    description: 'Bilingual technical problem-solver bridging cloud, code, and customers.',
    creator: '@trevmearns',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
