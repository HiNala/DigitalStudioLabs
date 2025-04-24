import { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ServicesSection from '@/components/home/ServicesSection';
import IndustrySection from '@/components/home/IndustrySection';
import PortfolioSection from '@/components/home/PortfolioSection';
import ProcessSection from '@/components/home/ProcessSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import PricingSection from '@/components/home/PricingSection';
import CTASection from '@/components/home/CTASection';
import ContactSection from '@/components/home/ContactSection';
import { SplineHero } from '@/components/home/SplineHero';
import { LightSpotlightLayout } from '@/components/layout/LightSpotlightLayout';

const AltHomePage = () => {
  useEffect(() => {
    document.title = 'Digital Studio Labs | Light Theme';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white text-gray-900">
      <Header />
      <LightSpotlightLayout
        className="pt-20 min-h-screen"
        spotlightColor="rgba(0, 160, 176, 0.10)"
        spotlightSize={1200}
        withMultipleSpotlights={true}
      >
        <main>
          {/* Hero section */}
          <SplineHero />
          
          {/* Services section */}
          <ServicesSection />
          
          {/* Industry section */}
          <IndustrySection />
          
          {/* Portfolio section */}
          <PortfolioSection />
          
          {/* Process section */}
          <ProcessSection />
          
          {/* Testimonials section */}
          <TestimonialsSection />
          
          {/* Pricing section */}
          <PricingSection />
          
          {/* CTA section */}
          <CTASection />
          
          {/* Contact section */}
          <ContactSection />
        </main>
      </LightSpotlightLayout>
      <Footer />
    </div>
  );
};

export default AltHomePage; 