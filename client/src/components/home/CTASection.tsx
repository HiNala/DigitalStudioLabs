import { useEffect, useRef } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '@/providers/ThemeProvider';
import StarButton from '../ui/star-button';

const CTASection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { theme } = useTheme();

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
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-br dark:from-[#161B22]/90 dark:to-[#0D1117]/90 light:from-white light:to-gray-50 backdrop-blur-sm rounded-xl border dark:border-[#30363D] light:border-gray-200 overflow-hidden animate-fade-in shadow-2xl transition-colors duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            {/* Main CTA content */}
            <div className="lg:col-span-2 p-10 md:p-14 lg:p-16 relative">
              <div className="max-w-2xl">
                <motion.span 
                  className="inline-block px-4 py-1 bg-gradient-to-r from-[#00A0B0]/20 to-[#4D4DFF]/20 rounded-full text-[#00A0B0] text-sm font-medium mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  Let's Work Together
                </motion.span>
                
                <motion.h2 
                  className="text-3xl md:text-4xl font-poppins font-bold mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  Ready to Elevate Your <span className="gradient-text">Digital Strategy</span>?
                </motion.h2>
                
                <motion.p 
                  className="dark:text-[#8B949E] light:text-gray-600 text-lg mb-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Partner with our expert team to create custom digital solutions that drive measurable business growth. We combine innovative design, cutting-edge technology, and strategic thinking to deliver exceptional results.
                </motion.p>
                
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <StarButton 
                    href="https://calendly.com/nalamaui30/30min" 
                    target="_blank"
                    rel="noopener noreferrer"
                    external={true}
                    size="md"
                  >
                    Schedule Consultation
                  </StarButton>
                  <StarButton href="/process" size="md" className="!bg-transparent !text-[#00A0B0] !border-2 !border-[#00A0B0]">
                    View Process
                  </StarButton>
                </motion.div>
              </div>
              
              {/* Background Decoration */}
              <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full opacity-10 bg-[#00A0B0]"></div>
            </div>
            
            {/* Right side visual element */}
            <div className="hidden lg:block dark:bg-gradient-to-br dark:from-[#161B22] dark:to-[#0D1117] light:bg-gradient-to-br light:from-gray-50 light:to-white relative overflow-hidden transition-colors duration-300">
              <div className="absolute inset-0 flex items-center justify-center p-10">
                <div className="relative w-full aspect-square max-w-md">
                  {/* Circular gradient background */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full bg-gradient-to-br from-[#00A0B0]/20 to-[#4D4DFF]/20 blur-xl"></div>
                  
                  {/* Stats elements */}
                  <div className="absolute top-0 left-1/4 dark:bg-[#161B22] light:bg-white p-4 rounded-xl border dark:border-[#30363D] light:border-gray-200 shadow-lg text-center transition-colors duration-300">
                    <div className="text-[#00A0B0] text-3xl font-bold">100%</div>
                    <div className="text-sm dark:text-[#8B949E] light:text-gray-600">Client Satisfaction</div>
                  </div>
                  
                  <div className="absolute bottom-0 right-1/4 dark:bg-[#161B22] light:bg-white p-4 rounded-xl border dark:border-[#30363D] light:border-gray-200 shadow-lg text-center transition-colors duration-300">
                    <div className="text-[#4D4DFF] text-3xl font-bold">24/7</div>
                    <div className="text-sm dark:text-[#8B949E] light:text-gray-600">Support</div>
                  </div>
                  
                  <div className="absolute top-1/3 right-0 dark:bg-[#161B22] light:bg-white p-4 rounded-xl border dark:border-[#30363D] light:border-gray-200 shadow-lg text-center transition-colors duration-300">
                    <div className="text-[#00A0B0] text-3xl font-bold">2x</div>
                    <div className="text-sm dark:text-[#8B949E] light:text-gray-600">Faster Delivery</div>
                  </div>
                  
                  <div className="absolute bottom-1/3 left-0 dark:bg-[#161B22] light:bg-white p-4 rounded-xl border dark:border-[#30363D] light:border-gray-200 shadow-lg text-center transition-colors duration-300">
                    <div className="text-[#4D4DFF] text-3xl font-bold">10+</div>
                    <div className="text-sm dark:text-[#8B949E] light:text-gray-600">Technologies</div>
                  </div>
                  
                  {/* Center element */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-[#00A0B0] to-[#4D4DFF] p-6 rounded-full shadow-lg flex items-center justify-center">
                    <i className='bx bx-rocket text-4xl text-white'></i>
                  </div>
                </div>
              </div>
              
              {/* Background Decoration */}
              <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-10 bg-[#4D4DFF]"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
