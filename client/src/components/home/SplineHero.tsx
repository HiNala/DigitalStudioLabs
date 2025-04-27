import { SplineScene } from "@/components/ui/spline";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider";
import { useEffect, useState } from "react";
import StarButton from "@/components/ui/star-button";

export function SplineHero() {
  const { theme } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Set isLoaded to true after components mount
  useEffect(() => {
    // Use requestAnimationFrame to delay until after the first paint
    requestAnimationFrame(() => {
      // Then use setTimeout to ensure everything has stabilized
      setTimeout(() => setIsLoaded(true), 200);
    });
    
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  return (
    <section className="w-full min-h-[700px] md:h-[600px] relative overflow-hidden pt-6 md:pt-0">      
      <div className="flex flex-col md:flex-row h-full">
        {/* Left content */}
        <div className="flex-1 px-4 sm:px-8 py-8 md:py-0 relative z-10 flex flex-col justify-center items-center text-center">
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-poppins dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:to-neutral-300 light:text-gray-900 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Transform Your Business With <span className="gradient-text-animated gradient-text-glow">Custom Digital Solutions</span>
          </motion.h1>
          
          <motion.p 
            className="mt-4 text-base sm:text-lg md:text-xl dark:text-neutral-300 light:text-gray-600 max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We build premium websites, web applications, and AI solutions that drive real business results.
          </motion.p>
          
          <motion.div 
            className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-4 md:gap-6 justify-center w-full px-4 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a 
              href="https://calendly.com/nalamaui30/30min" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="gradient-bg gradient-bg-hover px-6 sm:px-8 py-3 md:py-4 rounded-md font-medium text-base md:text-lg transition-all duration-300 glow-hover inline-flex items-center justify-center"
              aria-label="Schedule a free consultation"
            >
              <span className="hidden sm:inline">Schedule Free </span>
              <span className="sm:hidden">Free </span>
              Consultation
              <i className='bx bx-calendar-check ml-2 text-lg'></i>
            </a>
            <StarButton 
              href="/services" 
              size={isMobile ? "md" : "lg"} 
              className="!bg-transparent !text-[#00A0B0] !border-2 !border-[#00A0B0]"
              aria-label="Explore our services"
            >
              <span className="hidden sm:inline">Explore Our </span>Services
              <i className='bx bx-right-arrow-alt ml-2 text-lg'></i>
            </StarButton>
          </motion.div>
        </div>

        {/* Right content - Only show when loaded */}
        <div className={`h-[300px] sm:h-[350px] md:h-auto flex-1 relative transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
            hideAttribution={true}
            followCursor={isMobile ? false : true}
            followSpeed={0.04}  
            followDistance={2.5}
          />
          {/* Additional overlay to cover the Spline attribution */}
          <div className="spline-attribution-blocker"></div>
        </div>
      </div>
      
      {/* Mobile scroll indicator */}
      <motion.div 
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 md:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ 
          opacity: { delay: 1, duration: 0.6 },
          y: { repeat: Infinity, duration: 1.5 }
        }}
      >
        <i className="bx bx-chevron-down text-3xl text-[#00A0B0]"></i>
      </motion.div>
    </section>
  );
}