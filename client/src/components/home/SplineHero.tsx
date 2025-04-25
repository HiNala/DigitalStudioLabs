import { SplineScene } from "@/components/ui/spline";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider";
import { useEffect, useState } from "react";
import StarButton from "@/components/ui/star-button";

export function SplineHero() {
  const { theme } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Set isLoaded to true after components mount
  useEffect(() => {
    // Use requestAnimationFrame to delay until after the first paint
    requestAnimationFrame(() => {
      // Then use setTimeout to ensure everything has stabilized
      setTimeout(() => setIsLoaded(true), 200);
    });
  }, []);
  
  return (
    <section className="w-full h-[700px] md:h-[600px] relative overflow-hidden">      
      <div className="flex flex-col md:flex-row h-full">
        {/* Left content */}
        <div className="flex-1 p-8 relative z-10 flex flex-col justify-center items-center text-center">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:to-neutral-300 light:text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Transform Your Business With <span className="gradient-text-animated gradient-text-glow">Custom Digital Solutions</span>
          </motion.h1>
          
          <motion.p 
            className="mt-4 text-xl dark:text-neutral-300 light:text-gray-600 max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We build premium websites, web applications, and AI solutions that drive real business results.
          </motion.p>
          
          <motion.div 
            className="mt-8 flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <StarButton href="/contact" size="lg">
              Schedule Free Consultation
            </StarButton>
            <div className="relative inline-block" style={{ outline: 'none' }}>
              <StarButton 
                href="/services" 
                size="lg" 
                className="!bg-transparent !text-[#00A0B0] !border !border-[#00A0B0] !outline-none !shadow-none"
                style={{ boxShadow: 'none', outline: 'none' }}
              >
                Explore Our Services
              </StarButton>
              <div className="absolute inset-0 pointer-events-none" style={{ border: '0 solid transparent', outline: 'none' }}></div>
            </div>
          </motion.div>
        </div>

        {/* Right content - Only show when loaded */}
        <div className={`flex-1 relative transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
            hideAttribution={true}
            followCursor={true}
            followSpeed={0.04}  
            followDistance={2.5}
          />
          {/* Additional overlay to cover the Spline attribution */}
          <div className="spline-attribution-blocker"></div>
        </div>
      </div>
    </section>
  );
}