import { useEffect, useRef } from 'react';
import { INDUSTRIES } from '@/lib/constants';
import { motion } from 'framer-motion';

const IndustrySection = () => {
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

  // Animation variants for the cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-6">
            Solutions For <span className="gradient-text">Your Industry</span>
          </h2>
          <p className="text-[#8B949E] text-lg">
            We serve a diverse range of industries with tailored digital solutions.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {INDUSTRIES.map((industry) => (
            <motion.div 
              key={industry.id}
              className="bg-[#161B22] p-8 rounded-xl border border-[#30363D] relative overflow-hidden group"
              variants={itemVariants}
              whileHover={{ 
                y: -5, 
                boxShadow: "0 10px 30px -15px rgba(77, 77, 255, 0.15)",
                borderColor: "rgba(77, 77, 255, 0.3)"
              }}
            >
              <div 
                className="absolute inset-0 opacity-5 bg-cover bg-center transition-opacity duration-500 group-hover:opacity-10" 
                style={{ backgroundImage: `url('${industry.background}')` }}
              ></div>
              <div className="relative z-10">
                <h3 className="text-xl font-poppins font-semibold mb-4">{industry.title}</h3>
                <p className="text-[#8B949E] mb-6">
                  {industry.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {industry.tags.map((tag, tagIndex) => (
                    <motion.span 
                      key={tagIndex} 
                      className="text-xs bg-[#30363D]/50 px-3 py-1 rounded-full"
                      whileHover={{ 
                        backgroundColor: "rgba(77, 77, 255, 0.2)",
                        color: "#ffffff"
                      }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default IndustrySection;
