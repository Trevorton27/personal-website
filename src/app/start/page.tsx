import type { Metadata } from 'next';
import { StartPageClient } from '@/components/services/StartPageClient';

export const metadata: Metadata = {
  title: 'Start',
  description: 'Connect with Trevor Mearns — bilingual technical consultant based in Japan.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function StartPage() {
  return <StartPageClient />;
}
