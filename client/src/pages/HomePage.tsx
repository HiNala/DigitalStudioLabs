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
import { SpotlightLayout } from '@/components/layout/SpotlightLayout';

const HomePage = () => {
  useEffect(() => {
    document.title = 'Digital Studio Labs | Custom Web Development & AI Solutions';
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <main className="pt-20 bg-[#0D1117]">
        {/* Hero section with its own spotlights */}
        <SplineHero />
        
        {/* Services section with spotlights */}
        <SpotlightLayout
          spotlightColor="rgba(0, 160, 176, 0.15)"
          spotlightSize={900}
        >
          <ServicesSection />
        </SpotlightLayout>
        
        {/* Industry section with different spotlight color */}
        <SpotlightLayout
          spotlightColor="rgba(77, 77, 255, 0.15)"
          spotlightSize={1000}
        >
          <IndustrySection />
        </SpotlightLayout>
        
        {/* Portfolio section with spotlights */}
        <SpotlightLayout
          spotlightColor="rgba(0, 160, 176, 0.2)"
          spotlightSize={850}
        >
          <PortfolioSection />
        </SpotlightLayout>
        
        {/* Process section with different spotlight color */}
        <SpotlightLayout
          spotlightColor="rgba(130, 71, 229, 0.15)"
          spotlightSize={950}
        >
          <ProcessSection />
        </SpotlightLayout>
        
        {/* Testimonials section with spotlights */}
        <SpotlightLayout
          spotlightColor="rgba(0, 160, 176, 0.15)"
          spotlightSize={800}
        >
          <TestimonialsSection />
        </SpotlightLayout>
        
        {/* Pricing section with different spotlight color */}
        <SpotlightLayout
          spotlightColor="rgba(77, 77, 255, 0.15)"
          spotlightSize={750}
        >
          <PricingSection />
        </SpotlightLayout>
        
        {/* CTA section with spotlights */}
        <SpotlightLayout
          spotlightColor="rgba(0, 160, 176, 0.2)"
          spotlightSize={700}
          withMultipleSpotlights={false}
        >
          <CTASection />
        </SpotlightLayout>
        
        {/* Contact section with spotlights */}
        <SpotlightLayout
          spotlightColor="rgba(0, 160, 176, 0.1)"
          spotlightSize={600}
        >
          <ContactSection />
        </SpotlightLayout>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
