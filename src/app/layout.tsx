import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: "Trevor's Portfolio | Artist & Developer",
    template: "%s | Trevor's Portfolio",
  },
  description: 'Portfolio and blog of Trevor - artist, developer, and creative technologist.',
  keywords: ['portfolio', 'art', 'development', 'web design', 'creative coding'],
  authors: [{ name: 'Trevor' }],
  creator: 'Trevor',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    title: "Trevor's Portfolio",
    description: 'Portfolio and blog of Trevor - artist, developer, and creative technologist.',
    siteName: "Trevor's Portfolio",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Trevor's Portfolio",
    description: 'Portfolio and blog of Trevor - artist, developer, and creative technologist.',
    creator: '@trevor',
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
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
