import { useEffect, useRef } from 'react';
import { Link } from 'wouter';
import { SERVICES } from '@/lib/constants';
import { motion } from 'framer-motion';
import { 
  FaLaptopCode, 
  FaPalette, 
  FaRobot, 
  FaChartLine, 
  FaDatabase, 
  FaLightbulb 
} from 'react-icons/fa';

// Map service icons to corresponding React Icons
const ServiceIcon = ({ icon }: { icon: string }) => {
  const iconSize = 36;
  const iconClass = "text-white";
  
  switch (icon) {
    case 'design':
      return <FaPalette size={iconSize} className={iconClass} />;
    case 'development':
      return <FaLaptopCode size={iconSize} className={iconClass} />;
    case 'ai':
      return <FaRobot size={iconSize} className={iconClass} />;
    case 'seo':
      return <FaChartLine size={iconSize} className={iconClass} />;
    case 'data':
      return <FaDatabase size={iconSize} className={iconClass} />;
    case 'strategy':
      return <FaLightbulb size={iconSize} className={iconClass} />;
    default:
      return <FaLaptopCode size={iconSize} className={iconClass} />;
  }
};

const ServicesSection = () => {
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

  // Animation for the icon background
  const iconBgVariants = {
    initial: { scale: 0.8, opacity: 0.5 },
    hover: { 
      scale: 1, 
      opacity: 1,
      boxShadow: "0 0 25px rgba(0, 160, 176, 0.5)"
    }
  };

  return (
    <section id="services" ref={sectionRef} className="py-24 bg-[#0D1117]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-6">
            Our Premium <span className="gradient-text">Services</span>
          </h2>
          <p className="text-[#8B949E] text-lg">
            Custom digital solutions tailored to your business goals and challenges.
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {SERVICES.map((service) => (
            <motion.div 
              key={service.id}
              className="bg-[#161B22] p-8 rounded-xl border border-[#30363D] hover:border-[#00A0B0]/50 transition-all duration-300"
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0, 160, 176, 0.15)" }}
            >
              <motion.div 
                className="w-20 h-20 bg-gradient-to-br from-[#00A0B0] to-[#4D4DFF] rounded-2xl flex items-center justify-center mb-6 p-5"
                variants={iconBgVariants}
                initial="initial"
                whileHover="hover"
                transition={{ duration: 0.3 }}
              >
                <ServiceIcon icon={service.icon} />
              </motion.div>
              
              <h3 className="text-xl font-poppins font-semibold mb-4">{service.title}</h3>
              <p className="text-[#8B949E] mb-6">
                {service.description}
              </p>
              
              <Link href="/contact" className="group inline-flex items-center text-[#00A0B0] hover:text-[#4D4DFF] transition-colors">
                Learn More 
                <motion.span 
                  className="ml-2 inline-block"
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  →
                </motion.span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-16 animate-fade-in"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Link href="/contact" className="gradient-bg gradient-bg-hover px-8 py-4 rounded-md font-medium transition-all duration-300 glow-hover inline-block">
            Discuss Your Project
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
