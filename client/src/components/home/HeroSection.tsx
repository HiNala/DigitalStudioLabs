import { useEffect, useRef } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';

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

  return (
    <section ref={sectionRef} className="bg-radial relative overflow-hidden py-16 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
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
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in"
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
      
      {/* Background Decoration */}
      <div className="ambient-glow absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-10 bg-[#4D4DFF]"></div>
      <div className="ambient-glow absolute -bottom-32 -left-20 w-96 h-96 rounded-full opacity-10 bg-[#00A0B0]"></div>
    </section>
  );
};

export default HeroSection;
