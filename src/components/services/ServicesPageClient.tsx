'use client';

import { Header } from '@/components/public/Header';
import { Footer } from '@/components/public/Footer';
import { useTheme } from '@/components/ThemeProvider';
import { ServicesHero } from './ServicesHero';
import { HowCanIHelp } from './HowCanIHelp';
import { SocialProof } from './SocialProof';
import { ServicePackages } from './ServicePackages';
import { Timeline } from './Timeline';
import { CaseStudies } from './CaseStudies';
import { WorkWithMe } from './WorkWithMe';

export function ServicesPageClient() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-black text-slate-100' : 'bg-white text-slate-900'}`}>
      <Header />
      <main>
        <ServicesHero />
        <HowCanIHelp />
        <SocialProof />
        <ServicePackages />
        <Timeline />
        <CaseStudies />
        <WorkWithMe />
      </main>
      <Footer />
    </div>
  );
}
