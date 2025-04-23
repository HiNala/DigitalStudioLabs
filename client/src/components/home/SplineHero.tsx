import { SplineScene } from "@/components/ui/spline";
import { Link } from "wouter";
import { motion } from "framer-motion";

export function SplineHero() {
  return (
    <section className="w-full h-[700px] md:h-[600px] relative overflow-hidden">
      {/* Spline background - positioned absolutely to be behind content */}
      <div className="absolute inset-0 w-full h-full z-0">
        <SplineScene 
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="w-full h-full"
          hideAttribution={true}
          followCursor={true}
          followSpeed={0.04}  
          followDistance={2.5}
        />
        <div className="spline-attribution-blocker"></div>
      </div>
      
      {/* Centered content */}
      <div className="relative z-10 flex items-center justify-center h-full w-full">
        <div className="max-w-4xl text-center p-8 backdrop-blur-sm bg-black/30 rounded-xl">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-300 font-poppins"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Transform Your Business With <span className="gradient-text">Custom Digital Solutions</span>
          </motion.h1>
          
          <motion.p 
            className="mt-4 text-neutral-300 text-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We build premium websites, web applications, and AI solutions that drive real business results.
          </motion.p>
          
          <motion.div 
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
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
    </section>
  );
}