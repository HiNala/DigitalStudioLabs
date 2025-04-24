import { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { LightSpotlightLayout } from '@/components/layout/LightSpotlightLayout';
import ThemedComponents from '@/components/home/ThemedComponents';

const AltHomePage = () => {
  useEffect(() => {
    document.title = 'Digital Studio Labs | Theme Components';
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
            Theme Component Showcase
          </h1>
          <p className="text-lg text-center max-w-2xl mx-auto mb-12">
            These components support both light and dark themes and will be used throughout the site.
          </p>
          
          <ThemedComponents />
        </main>
      </LightSpotlightLayout>
      <Footer />
    </div>
  );
};

export default AltHomePage; 