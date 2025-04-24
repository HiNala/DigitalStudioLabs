import { SplineScene } from "@/components/ui/spline";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider";

export function SplineHero() {
  const { theme } = useTheme();
  
  return (
    <section className="w-full h-[700px] md:h-[600px] relative overflow-hidden">      
      <div className="flex flex-col md:flex-row h-full">
        {/* Left content */}
        <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:to-neutral-300 light:text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Transform Your Business With <span className="gradient-text-animated gradient-text-glow">Custom Digital Solutions</span>
          </motion.h1>
          
          <motion.p 
            className="mt-4 text-xl dark:text-neutral-300 light:text-gray-600 max-w-lg"
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
            <Link href="/services" className="dark:bg-[#161B22] dark:hover:bg-[#30363D] light:bg-gray-100 light:hover:bg-gray-200 light:text-gray-900 px-8 py-4 rounded-md font-medium text-lg transition-all border-0 duration-300">
              Explore Our Services
            </Link>
          </motion.div>
        </div>

        {/* Right content */}
        <div className="flex-1 relative">
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
      
      {/* Enhanced gradient blur transition with more subtle effect */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t dark:from-background dark:via-background/60 dark:to-transparent light:from-white light:via-white/60 light:to-transparent pointer-events-none z-20 transition-colors duration-300"></div>
      
      {/* Additional blur effect for light mode, positioned lower to appear above robot animation - made more subtle */}
      {theme === 'light' && (
        <div 
          className="absolute -bottom-2 left-0 right-0 h-12 z-30 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.5) 60%, rgba(255,255,255,0) 100%)',
            backdropFilter: 'blur(2px)'
          }}
        ></div>
      )}
    </section>
  );
}