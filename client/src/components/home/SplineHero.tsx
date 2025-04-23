import { SplineScene } from "@/components/ui/spline";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { Link } from "wouter";
import { motion } from "framer-motion";

export function SplineHero() {
  return (
    <Card className="w-full h-[700px] md:h-[600px] bg-black/[0.96] relative overflow-hidden border-none rounded-none">
      {/* Enhanced spotlight effect */}
      <Spotlight
        className=""
        fill="rgba(0, 160, 176, 0.25)"
        size={600}
        springOptions={{ stiffness: 100, damping: 15 }}
      />
      
      {/* Optional second spotlight for layered effect */}
      <Spotlight
        className=""
        fill="rgba(77, 77, 255, 0.15)"
        size={800}
        springOptions={{ stiffness: 80, damping: 20 }}
      />
      
      <div className="flex flex-col md:flex-row h-full">
        {/* Left content */}
        <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
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

        {/* Right content */}
        <div className="flex-1 relative">
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>
    </Card>
  );
}