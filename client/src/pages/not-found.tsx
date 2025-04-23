import { Link } from "wouter";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-[80vh] w-full flex items-center justify-center py-20 bg-[#0D1117]">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8">
            <h1 className="text-7xl md:text-9xl font-bold gradient-text-animated gradient-text-glow">404</h1>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold mb-6">Page Not Found</h2>
          <p className="text-[#8B949E] max-w-lg mx-auto mb-10">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/" 
              className="gradient-bg gradient-bg-hover px-8 py-4 rounded-md font-medium text-lg transition-all duration-300 glow-hover"
            >
              Return Home
            </Link>
            <Link 
              href="/contact" 
              className="bg-[#161B22] hover:bg-[#30363D] px-8 py-4 rounded-md font-medium text-lg transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
