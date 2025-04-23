import { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TrustBar from '@/components/home/TrustBar';
import ServicesSection from '@/components/home/ServicesSection';
import IndustrySection from '@/components/home/IndustrySection';
import PortfolioSection from '@/components/home/PortfolioSection';
import ProcessSection from '@/components/home/ProcessSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import PricingSection from '@/components/home/PricingSection';
import CTASection from '@/components/home/CTASection';
import ContactSection from '@/components/home/ContactSection';
import { SplineHero } from '@/components/home/SplineHero';

const HomePage = () => {
  useEffect(() => {
    document.title = 'Digital Studio Labs | Custom Web Development & AI Solutions';
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <main className="pt-20">
        <SplineHero />
        <TrustBar />
        <ServicesSection />
        <IndustrySection />
        <PortfolioSection />
        <ProcessSection />
        <TestimonialsSection />
        <PricingSection />
        <CTASection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
