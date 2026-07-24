import type { Metadata } from 'next';
import { ServicesPageClient } from '@/components/services/ServicesPageClient';

export const metadata: Metadata = {
  title: 'Services',
  description: 'AI consulting, web development, cloud solutions, and programming education for Japanese businesses. Bilingual EN/JP support. バイリンガル技術コンサルティング。',
  keywords: [
    'AI consulting Japan',
    'web development Japan',
    'bilingual developer',
    'cloud consulting Tokyo',
    'programming tutor Japan',
    'バイリンガル開発者',
    '技術コンサルティング',
    'AI統合',
    'ウェブ開発',
  ],
  openGraph: {
    title: 'Services | Trevor Mearns',
    description: 'AI consulting, web development, cloud solutions, and programming education for Japanese businesses.',
    type: 'website',
  },
};

export default function ServicesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Trevor Mearns — Technical Consulting Services',
    description: 'AI consulting, web development, cloud solutions, and programming education for Japanese businesses.',
    provider: {
      '@type': 'Person',
      name: 'Trevor Mearns',
      url: process.env.NEXT_PUBLIC_SITE_URL,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Japan',
    },
    availableLanguage: ['English', 'Japanese'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Technical Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Modern Bilingual Business Website',
          },
          priceSpecification: {
            '@type': 'PriceSpecification',
            priceCurrency: 'JPY',
            minPrice: 250000,
            maxPrice: 500000,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI Features & Integration',
          },
          priceSpecification: {
            '@type': 'PriceSpecification',
            priceCurrency: 'JPY',
            minPrice: 100000,
            maxPrice: 400000,
          },
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicesPageClient />
    </>
  );
}
