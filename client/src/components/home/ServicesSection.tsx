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
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { useTheme } from '@/providers/ThemeProvider';
import { useIsMobile } from '@/hooks/use-mobile';
import StarButton from '@/components/ui/star-button';

// Map service icons to corresponding React Icons
const ServiceIcon = ({ icon }: { icon: string }) => {
  const { theme } = useTheme();
  const iconSize = 36;
  const iconClass = theme === 'dark' ? "text-white" : "text-white";
  
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
  const { theme } = useTheme();
  const isMobile = useIsMobile();

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

  // Animation for the icon background - now always lit
  const iconBgVariants = {
    lit: { 
      scale: 1, 
      opacity: 1,
      boxShadow: theme === 'dark' 
        ? "0 0 25px rgba(0, 160, 176, 0.5)"
        : "0 0 25px rgba(0, 160, 176, 0.3)"
    }
  };

  return (
    <section id="services" ref={sectionRef} className="py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-5">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-6">
            Innovative <span className="gradient-text">Digital Solutions</span>
          </h2>
          <p className="dark:text-[#8B949E] light:text-gray-600 text-lg">
            Tailored technology expertise to transform your ideas into powerful digital realities
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
              className="relative dark:bg-[#161B22] light:bg-white light:shadow-md p-8 rounded-xl border dark:border-[#30363D] light:border-gray-200 transition-all duration-300 group"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              {/* Add the GlowingEffect component with customized settings */}
              <GlowingEffect
                spread={20}
                glow={true}
                disabled={false}
                proximity={100}
                inactiveZone={0}
                borderWidth={1}
                movementDuration={0.5}
                className="will-change-transform"
              />
              
              <motion.div 
                className="w-20 h-20 bg-gradient-to-br from-[#00A0B0] to-[#4D4DFF] rounded-2xl flex items-center justify-center mb-6 p-5 group-hover:scale-110 transition-all duration-300"
                variants={iconBgVariants}
                animate="lit"
                transition={{ duration: 0.3 }}
              >
                <ServiceIcon icon={service.icon} />
              </motion.div>
              
              <h3 className="text-xl font-poppins font-semibold mb-4">{service.title}</h3>
              <p className="dark:text-[#8B949E] light:text-gray-600 mb-6">
                {service.description}
              </p>
              
              <StarButton href={`/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`} size="sm" className="!bg-transparent !text-[#00A0B0] !border !border-[#00A0B0] !py-2 !px-4">
                Explore Details
              </StarButton>
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
          <StarButton href="/services" size="md">
            See All Services
          </StarButton>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
