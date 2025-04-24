import { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { LightSpotlightLayout } from '@/components/layout/LightSpotlightLayout';

const AltHomePage = () => {
  useEffect(() => {
    document.title = 'Digital Studio Labs | New Landing';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-background text-foreground">
      <Header />
      <LightSpotlightLayout
        className="pt-20 min-h-screen"
        spotlightColor="rgba(0, 160, 176, 0.10)"
        spotlightSize={1200}
        withMultipleSpotlights={true}
      >
        <main className="container mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-8">
            New Landing Page
          </h1>
          <p className="text-lg text-center max-w-2xl mx-auto">
            This page will be rebuilt with our new light/dark theme components.
          </p>
        </main>
      </LightSpotlightLayout>
      <Footer />
    </div>
  );
};

export default AltHomePage; 