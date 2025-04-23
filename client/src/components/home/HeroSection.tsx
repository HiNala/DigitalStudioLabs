import { useEffect, useRef } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Splite } from '@/components/ui/splite-simple';

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    const animatedElements = sectionRef.current?.querySelectorAll('.animate-fade-in');
    animatedElements?.forEach((el) => observer.observe(el));

    return () => {
      animatedElements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Left side content for the split component
  const leftSideContent = (
    <div className="flex h-full w-full items-center px-6 md:px-12 relative">
      <div className="max-w-xl">
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-poppins font-bold mb-6 text-glow animate-fade-in"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Transform Your Business With <span className="gradient-text">Custom Digital Solutions</span>
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl text-[#8B949E] mb-10 animate-fade-in"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          We build premium websites, web applications, and AI solutions that drive real business results.
        </motion.p>
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 animate-fade-in"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link href="/contact" className="gradient-bg gradient-bg-hover px-8 py-4 rounded-md font-medium text-lg transition-all duration-300 glow-hover">
            Schedule Free Consultation
          </Link>
          <Link href="/portfolio" className="bg-[#161B22] hover:bg-[#30363D] px-8 py-4 rounded-md font-medium text-lg transition-all duration-300">
            View Our Portfolio
          </Link>
        </motion.div>
      </div>
    </div>
  );

  // Right side content for the split component (a showcase image or visualization)
  const rightSideContent = (
    <div className="h-full w-full bg-[#161B22] flex items-center justify-center relative overflow-hidden">
      {/* Visualization or showcase content */}
      <div className="relative w-full h-full">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            className="w-[80%] h-[80%] rounded-lg overflow-hidden shadow-2xl border border-[#30363D]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* This could be a screenshot, mockup or visualization */}
            <div className="bg-[#0D1117] w-full h-full p-6 flex flex-col">
              <div className="flex mb-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1 bg-[#161B22] rounded-md border border-[#30363D] p-4 overflow-hidden">
                <div className="w-full h-6 mb-4 bg-[#30363D] rounded-md opacity-70"></div>
                <div className="w-3/4 h-6 mb-4 bg-[#30363D] rounded-md opacity-70"></div>
                <div className="w-full h-32 mb-4 bg-gradient-to-r from-[#00A0B0] to-[#4D4DFF] rounded-md opacity-30"></div>
                <div className="w-full h-6 mb-4 bg-[#30363D] rounded-md opacity-70"></div>
                <div className="w-5/6 h-6 mb-4 bg-[#30363D] rounded-md opacity-70"></div>
                <div className="w-full h-20 bg-[#30363D] rounded-md opacity-70"></div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Background decorations */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-[#4D4DFF] filter blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-[#00A0B0] filter blur-3xl"></div>
        </div>
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} className="bg-[#0D1117] relative overflow-hidden">
      <Splite 
        size="5xl" 
        leftSide={leftSideContent}
        rightSide={rightSideContent}
        initialPosition={45}
        gapSize={1}
        className="border-b border-[#30363D]"
      />
      
      {/* Background Decoration */}
      <div className="ambient-glow absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-10 bg-[#4D4DFF]"></div>
      <div className="ambient-glow absolute -bottom-32 -left-20 w-96 h-96 rounded-full opacity-10 bg-[#00A0B0]"></div>
    </section>
  );
};

export default HeroSection;
