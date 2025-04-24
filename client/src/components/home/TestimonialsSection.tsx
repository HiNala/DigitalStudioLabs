import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { TESTIMONIALS } from '@/lib/constants';
import { useTheme } from '@/providers/ThemeProvider';

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
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

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-radial overflow-hidden relative">
      {/* Background Decoration */}
      <div className="ambient-glow absolute -left-40 top-1/3 w-96 h-96 rounded-full opacity-10 bg-[#4D4DFF]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-6">
            What Our <span className="gradient-text">Clients</span> Say
          </h2>
          <p className="dark:text-[#8B949E] light:text-gray-600 text-lg">
            Read what our clients have to say about their experience working with us
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {TESTIMONIALS.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="dark:bg-[#161B22] light:bg-white p-8 md:p-10 rounded-xl border dark:border-[#30363D] light:border-gray-200 mb-6 transition-colors duration-300"
                initial={{ opacity: 0, x: 100 }}
                animate={{ 
                  opacity: index === activeIndex ? 1 : 0,
                  x: index === activeIndex ? 0 : 100,
                  position: index === activeIndex ? 'relative' : 'absolute',
                  top: 0,
                  width: '100%',
                  zIndex: index === activeIndex ? 10 : 0
                }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#00A0B0] flex-shrink-0">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <p className="text-lg md:text-xl dark:text-[#E6EDF3] light:text-gray-800 italic mb-6 leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                    
                    <div>
                      <h4 className="font-poppins font-semibold dark:text-[#E6EDF3] light:text-gray-900">{testimonial.name}</h4>
                      <p className="dark:text-[#8B949E] light:text-gray-600">{testimonial.title}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex ? 'bg-[#00A0B0] w-6' : 'dark:bg-[#30363D] light:bg-gray-300'
                }`}
                onClick={() => setActiveIndex(index)}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
