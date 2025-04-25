import { useRef } from 'react';
import { Link } from 'wouter';
import { useTheme } from '@/providers/ThemeProvider';
import { motion } from 'framer-motion';

const processSteps = [
  {
    number: 1,
    title: "Discovery",
    description: "We start by understanding your business, goals, and requirements through in-depth consultation."
  },
  {
    number: 2,
    title: "Strategy & Design",
    description: "We create a tailored solution design and project roadmap based on your specific needs."
  },
  {
    number: 3,
    title: "Development",
    description: "Our experts build your solution using modern technology and best practices with regular updates."
  },
  {
    number: 4,
    title: "Launch & Support",
    description: "We deploy your solution and provide ongoing maintenance and optimization support."
  }
];

const ProcessSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { theme } = useTheme();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="process" ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-6">
            Our <span className="gradient-text">Process</span>
          </h2>
          <p className="dark:text-[#8B949E] light:text-gray-600 text-lg">
            We follow a structured approach to ensure every project exceeds expectations.
          </p>
        </motion.div>
        
        {/* Centered timeline process */}
        <motion.div 
          className="max-w-4xl mx-auto relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Vertical line - visible only on desktop */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00A0B0] via-[#4D4DFF] to-[#00A0B0] -translate-x-1/2 hidden md:block"></div>
          
          {/* Mobile cards view */}
          <div className="md:hidden space-y-8">
            {processSteps.map((step) => (
              <motion.div 
                key={step.number}
                className="dark:bg-[#161B22]/70 light:bg-white/80 p-6 rounded-xl border dark:border-[#30363D] light:border-gray-200 relative backdrop-blur-sm"
                variants={itemVariants}
              >
                <div className="w-10 h-10 gradient-bg rounded-full flex items-center justify-center font-poppins font-bold text-lg mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-poppins font-semibold mb-3 gradient-text-subtle">
                  {step.title}
                </h3>
                <p className="dark:text-[#8B949E] light:text-gray-600 text-base">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
          
          {/* Desktop timeline view */}
          <div className="hidden md:block">
            {processSteps.map((step, index) => (
              <motion.div 
                key={step.number}
                className="relative mb-20 last:mb-0 flex items-center"
                variants={itemVariants}
              >
                {/* Step number circle */}
                <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full gradient-bg flex items-center justify-center font-poppins font-bold text-xl z-10 shadow-lg">
                  {step.number}
                </div>
                
                {/* Content container */}
                <div className={`w-5/12 ${
                  index % 2 === 0 
                    ? 'mr-auto text-right pr-16' 
                    : 'ml-auto pl-16'
                }`}>
                  <h3 className="text-2xl font-poppins font-semibold mb-3 gradient-text-subtle">
                    {step.title}
                  </h3>
                  <p className="dark:text-[#8B949E] light:text-gray-600 text-lg">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Link href="/contact" className="gradient-bg gradient-bg-hover px-8 py-4 rounded-md font-medium transition-all duration-300 glow-hover inline-block">
            Start Your Project
          </Link>
        </motion.div>
      </div>
      
      {/* Background Decoration */}
      <div className="ambient-glow absolute bottom-1/4 -right-20 w-96 h-96 rounded-full opacity-10 bg-[#00A0B0]"></div>
    </section>
  );
};

export default ProcessSection;
