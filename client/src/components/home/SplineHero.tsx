import { SplineScene } from "@/components/ui/spline";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export function SplineHero() {
  // Track mouse position for a more accurate Spline interaction
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full h-[700px] md:h-[600px] relative overflow-hidden">
      {/* Full-width spline scene container positioned absolutely to cover the entire hero area */}
      <div className="absolute inset-0 z-0">
        <SplineScene 
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="w-full h-full"
          hideAttribution={true}
          globalInteraction={true}
        />
        {/* Additional overlay to cover the Spline attribution */}
        <div className="spline-attribution-blocker"></div>
      </div>
      
      <div className="flex flex-col md:flex-row h-full relative z-10">
        {/* Left content */}
        <div className="flex-1 p-8 flex flex-col justify-center backdrop-blur-sm bg-black/10 rounded-xl md:ml-8 md:my-8">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-300 font-poppins"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Transform Your Business With <span className="gradient-text">Custom Digital Solutions</span>
          </motion.h1>
          
          <motion.p 
            className="mt-4 text-neutral-300 max-w-lg text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We build premium websites, web applications, and AI solutions that drive real business results.
          </motion.p>
          
          <motion.div 
            className="mt-8 flex flex-col sm:flex-row gap-4"
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

        {/* Right content area - intentionally empty to let the 3D scene show through */}
        <div className="flex-1 relative"></div>
      </div>
    </section>
  );
}