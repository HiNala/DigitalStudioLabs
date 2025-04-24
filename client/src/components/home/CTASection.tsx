import { useEffect, useRef } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const CTASection = () => {
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
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-br from-[#161B22]/90 to-[#0D1117]/90 backdrop-blur-sm rounded-xl border border-[#30363D] overflow-hidden animate-fade-in shadow-2xl">
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
                  Ready to Transform Your <span className="gradient-text">Digital Presence</span>?
                </motion.h2>
                
                <motion.p 
                  className="text-[#8B949E] text-lg mb-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Partner with us to build custom digital solutions that drive real business results. 
                  Our team of experts is ready to bring your vision to life.
                </motion.p>
                
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Link href="/contact" className="gradient-bg gradient-bg-hover px-8 py-4 rounded-md font-medium text-lg transition-all duration-300 glow-hover inline-flex items-center">
                    Schedule Consultation <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <Link href="/pricing" className="bg-[#0D1117] hover:bg-[#30363D] px-8 py-4 rounded-md font-medium text-lg transition-colors border border-[#30363D] hover:border-[#4D4DFF]">
                    View Pricing
                  </Link>
                </motion.div>
              </div>
              
              {/* Background Decoration */}
              <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full opacity-10 bg-[#00A0B0]"></div>
            </div>
            
            {/* Right side visual element */}
            <div className="hidden lg:block bg-gradient-to-br from-[#161B22] to-[#0D1117] relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center p-10">
                <div className="relative w-full aspect-square max-w-md">
                  {/* Circular gradient background */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full bg-gradient-to-br from-[#00A0B0]/20 to-[#4D4DFF]/20 blur-xl"></div>
                  
                  {/* Stats elements */}
                  <div className="absolute top-0 left-1/4 bg-[#161B22] p-4 rounded-xl border border-[#30363D] shadow-lg text-center">
                    <div className="text-[#00A0B0] text-3xl font-bold">100%</div>
                    <div className="text-sm text-[#8B949E]">Client Satisfaction</div>
                  </div>
                  
                  <div className="absolute bottom-0 right-1/4 bg-[#161B22] p-4 rounded-xl border border-[#30363D] shadow-lg text-center">
                    <div className="text-[#4D4DFF] text-3xl font-bold">24/7</div>
                    <div className="text-sm text-[#8B949E]">Support</div>
                  </div>
                  
                  <div className="absolute top-1/3 right-0 bg-[#161B22] p-4 rounded-xl border border-[#30363D] shadow-lg text-center">
                    <div className="text-[#00A0B0] text-3xl font-bold">2x</div>
                    <div className="text-sm text-[#8B949E]">Faster Delivery</div>
                  </div>
                  
                  <div className="absolute bottom-1/3 left-0 bg-[#161B22] p-4 rounded-xl border border-[#30363D] shadow-lg text-center">
                    <div className="text-[#4D4DFF] text-3xl font-bold">10+</div>
                    <div className="text-sm text-[#8B949E]">Technologies</div>
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
