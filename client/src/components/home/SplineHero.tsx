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
            <Link 
              href="/services"
              className="relative inline-flex justify-center items-center px-8 py-4 rounded-[20px] bg-transparent text-[#00A0B0] hover:text-white border-2 border-[#00A0B0] hover:bg-gradient-to-r hover:from-[#00A0B0] hover:to-[#4D4DFF] transition-all duration-300 group text-lg font-medium"
            >
              <span className="z-10">Explore Our Services</span>
              
              {/* Stars go here but are custom to this button */}
              <div className="absolute top-[20%] left-[20%] w-[25px] opacity-0 group-hover:opacity-100 group-hover:-top-[40%] group-hover:-left-[15%] transition-all duration-1000 ease-in-out group-hover:filter group-hover:drop-shadow-[0_0_10px_#00A0B0] group-hover:rotate-[-15deg] group-hover:z-20">
                <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" viewBox="0 0 784.11 815.53">
                  <path fill="#00A0B0" d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z" />
                </svg>
              </div>
              
              <div className="absolute top-[45%] left-[45%] w-[15px] opacity-0 group-hover:opacity-100 group-hover:-top-[20%] group-hover:left-[15%] transition-all duration-1000 ease-in-out group-hover:filter group-hover:drop-shadow-[0_0_10px_#00A0B0] group-hover:rotate-[5deg] group-hover:z-20">
                <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" viewBox="0 0 784.11 815.53">
                  <path fill="#00A0B0" d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z" />
                </svg>
              </div>
              
              <div className="absolute top-[50%] left-[65%] w-[8px] opacity-0 group-hover:opacity-100 group-hover:top-[110%] group-hover:left-[80%] transition-all duration-700 ease-in-out group-hover:filter group-hover:drop-shadow-[0_0_10px_#4D4DFF] group-hover:rotate-[25deg] group-hover:z-20">
                <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" viewBox="0 0 784.11 815.53">
                  <path fill="#4D4DFF" d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z" />
                </svg>
              </div>
              
              <div className="absolute top-[60%] left-[35%] w-[12px] opacity-0 group-hover:opacity-100 group-hover:top-[120%] group-hover:left-[20%] transition-all duration-900 ease-in-out group-hover:filter group-hover:drop-shadow-[0_0_10px_#00A0B0] group-hover:rotate-[-15deg] group-hover:z-20">
                <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" viewBox="0 0 784.11 815.53">
                  <path fill="#00A0B0" d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z" />
                </svg>
              </div>
            </Link>
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