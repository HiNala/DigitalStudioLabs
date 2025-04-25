import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/providers/ThemeProvider';

const values = [
  {
    id: 1,
    title: "Results-Focused",
    description: "We measure success by the outcomes we deliver, focusing on solutions that drive meaningful business impact and ROI.",
    icon: "bx-target-lock"
  },
  {
    id: 2,
    title: "Transparent Collaboration",
    description: "Our agile sprints, regular demos, and clear milestones ensure you always know where your project stands.",
    icon: "bx-conversation"
  },
  {
    id: 3,
    title: "Technical Excellence",
    description: "We maintain the highest standards in everything we do, from clean code to elegant user interfaces.",
    icon: "bx-code-alt"
  }
];

const approaches = [
  {
    id: 1,
    title: "Strategy First",
    description: "We begin by understanding your business goals and challenges before proposing technical solutions.",
    icon: "bx-bulb"
  },
  {
    id: 2,
    title: "Future-Proof Solutions",
    description: "We build flexible, scalable systems designed to grow with your business and adapt to changing needs.",
    icon: "bx-trending-up"
  },
  {
    id: 3,
    title: "Continuous Improvement",
    description: "We're committed to ongoing optimization and refinement of your digital solutions to maximize long-term value.",
    icon: "bx-refresh"
  }
];

const ValuesAndApproachSection = () => {
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

  // Animation variants
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
    <section ref={sectionRef} className="py-20 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-6">
            Our Values & <span className="gradient-text">Approach</span>
          </h2>
          <p className="dark:text-[#8B949E] light:text-gray-600 text-lg">
            Guiding principles that define our work and help us deliver exceptional results
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div>
            <motion.h3 
              className="text-2xl font-poppins font-bold mb-8 text-center md:text-left gradient-text-subtle"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Our Core Values
            </motion.h3>
            
            <motion.div 
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {values.map((value) => (
                <motion.div 
                  key={value.id}
                  className="dark:bg-[#161B22] light:bg-white p-6 rounded-xl border dark:border-[#30363D] light:border-gray-200 flex items-start space-x-4 transition-colors duration-300"
                  variants={itemVariants}
                  whileHover={{ y: -5, borderColor: 'rgba(0, 160, 176, 0.5)' }}
                >
                  <div className="bg-gradient-to-br from-[#00A0B0] to-[#4D4DFF] rounded-lg p-3 flex-shrink-0">
                    <i className={`bx ${value.icon} text-2xl text-white`}></i>
                  </div>
                  <div>
                    <h4 className="text-xl font-poppins font-semibold mb-2">{value.title}</h4>
                    <p className="dark:text-[#8B949E] light:text-gray-600">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          <div>
            <motion.h3 
              className="text-2xl font-poppins font-bold mb-8 text-center md:text-left gradient-text-subtle"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Our Approach
            </motion.h3>
            
            <motion.div 
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {approaches.map((approach) => (
                <motion.div 
                  key={approach.id}
                  className="dark:bg-[#161B22] light:bg-white p-6 rounded-xl border dark:border-[#30363D] light:border-gray-200 flex items-start space-x-4 transition-colors duration-300"
                  variants={itemVariants}
                  whileHover={{ y: -5, borderColor: 'rgba(77, 77, 255, 0.5)' }}
                >
                  <div className="bg-gradient-to-br from-[#4D4DFF] to-[#00A0B0] rounded-lg p-3 flex-shrink-0">
                    <i className={`bx ${approach.icon} text-2xl text-white`}></i>
                  </div>
                  <div>
                    <h4 className="text-xl font-poppins font-semibold mb-2">{approach.title}</h4>
                    <p className="dark:text-[#8B949E] light:text-gray-600">{approach.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuesAndApproachSection;