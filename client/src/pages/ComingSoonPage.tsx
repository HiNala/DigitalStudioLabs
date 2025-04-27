import React from 'react';
import { Link } from 'wouter';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import StarButton from '@/components/ui/star-button';

interface ComingSoonPageProps {
  title: string;
  pageName: string;
}

const ComingSoonPage = ({ title, pageName }: ComingSoonPageProps) => {
  React.useEffect(() => {
    document.title = `${title} | Coming Soon`;
    window.scrollTo(0, 0);
  }, [title]);

  return (
    <>
      <Header />
      <main className="pt-24">
        <section className="py-24 px-4 flex flex-col items-center justify-center min-h-[60vh] text-center">
          <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-6">
            {title} <span className="gradient-text">Coming Soon</span>
          </h1>
          
          <p className="text-xl dark:text-gray-300 light:text-gray-600 max-w-2xl mb-12">
            We're currently working on our {pageName} page. 
            Please check back soon for updates, or return to our homepage.
          </p>
          
          <div className="flex justify-center">
            <StarButton href="/" size="lg">
              Return to Homepage
            </StarButton>
          </div>
          
          <div className="mt-20 w-full max-w-md p-8 border dark:border-[#30363D] light:border-gray-200 rounded-xl dark:bg-[#161B22]/80 light:bg-white/90 backdrop-blur-sm">
            <h2 className="text-2xl font-medium mb-4">Need immediate assistance?</h2>
            <p className="dark:text-gray-300 light:text-gray-600 mb-6">
              Feel free to contact us directly and we'll be happy to help.
            </p>
            <Link href="/contact" className="text-[#00A0B0] hover:text-[#4D4DFF] transition-all font-medium">
              Contact Us →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ComingSoonPage; 