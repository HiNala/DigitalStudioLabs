import { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ServicesSection from '@/components/home/ServicesSection';
import IndustrySection from '@/components/home/IndustrySection';
import ProcessSection from '@/components/home/ProcessSection';
import ValuesAndApproachSection from '@/components/home/ValuesAndApproachSection';
import PricingSection from '@/components/home/PricingSection';
import CTASection from '@/components/home/CTASection';
import ContactSection from '@/components/home/ContactSection';
import { SplineHero } from '@/components/home/SplineHero';
import { SpotlightLayout } from '@/components/layout/SpotlightLayout';
import TechBanner from '@/components/home/TechBanner';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import StatisticsSection from '@/components/home/StatisticsSection';

const HomePage = () => {
  useEffect(() => {
    document.title = 'Digital Studio Labs | Custom Web Development & AI Solutions';
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <SpotlightLayout
        className="pt-20 min-h-screen"
        spotlightColor="rgba(0, 160, 176, 0.15)"
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
          
          {/* Process section */}
          <ProcessSection />
          
          {/* Testimonials section */}
          <TestimonialsSection />
          
          {/* Values & Approach section */}
          <ValuesAndApproachSection />
          
          {/* Statistics section */}
          <StatisticsSection />
          
          {/* CTA section */}
          <CTASection />
          
          {/* Contact section */}
          <ContactSection />
          
          {/* Technologies Section */}
          <section className="py-16 md:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto text-center mb-14">
                <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-6">
                  Technologies We <span className="gradient-text">Leverage</span>
                </h2>
                <p className="dark:text-[#8B949E] light:text-gray-600 text-lg">
                  Our expertise spans across modern technologies to deliver cutting-edge solutions
                </p>
              </div>
              <TechBanner />
            </div>
          </section>
        </main>
      </SpotlightLayout>
      <Footer />
    </>
  );
};

export default HomePage;
