import { useEffect } from 'react';
import { Link } from 'wouter';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { SERVICES } from '@/lib/constants';
import TechBanner from '@/components/home/TechBanner';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { FaLaptopCode, FaPalette, FaRobot, FaChartLine, FaDatabase, FaLightbulb } from 'react-icons/fa';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { useTheme } from '@/providers/ThemeProvider';
import { SpotlightLayout } from '@/components/layout/SpotlightLayout';

// ServiceIcon component - similar to home page
const ServiceIcon = ({ icon }: { icon: string }) => {
  const { theme } = useTheme();
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

// Service Card Component
interface ServiceCardProps {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

const ServiceCard = ({ title, description, icon, features }: ServiceCardProps) => {
  const { theme } = useTheme();
  
  // Icon background animation state
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
    <motion.div 
      className="relative dark:bg-[#161B22] light:bg-white light:shadow-md p-8 rounded-xl border dark:border-[#30363D] light:border-gray-200 transition-all duration-300 group h-full"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
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
        <ServiceIcon icon={icon} />
      </motion.div>
      
      <h2 className="text-2xl font-poppins font-bold mb-4">{title}</h2>
      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle className="text-[#00A0B0] mr-2 h-5 w-5 flex-shrink-0 mt-0.5" />
            <span className="dark:text-[#8B949E] light:text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>
      <Link href="/contact" className="inline-flex items-center gradient-bg gradient-bg-hover px-6 py-3 rounded-md font-medium transition-all duration-300 glow-hover">
        Discuss Your Project <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </motion.div>
  );
};

// Process Step Component
interface ProcessStepProps {
  number: number;
  title: string;
  description: string;
}

const ProcessStep = ({ number, title, description }: ProcessStepProps) => {
  return (
    <motion.div 
      className="flex gap-6 relative group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ x: 5 }}
    >
      <motion.div 
        className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-lg bg-gradient-to-br from-[#00A0B0] to-[#4D4DFF] font-poppins font-bold text-xl shadow-lg"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {number}
      </motion.div>
      <div>
        <h3 className="text-xl font-poppins font-semibold mb-2">{title}</h3>
        <p className="dark:text-[#8B949E] light:text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
};

const ServicesPage = () => {
  useEffect(() => {
    document.title = 'Services | Digital Studio Labs';
    window.scrollTo(0, 0);
  }, []);

  // Extra features for service cards
  const serviceFeatures = {
    development: [
      "High-performance applications built with modern technologies",
      "Cross-platform compatibility for all devices",
      "Intuitive user interfaces with exceptional UX",
      "Scalable architecture for future growth"
    ],
    strategy: [
      "Workflow automation to increase efficiency",
      "Seamless integration with existing systems",
      "Custom API development for connectivity",
      "Cloud-based solutions for accessibility"
    ],
    ai: [
      "Predictive analytics for data-driven decisions",
      "Machine learning models that improve over time",
      "Natural language processing capabilities",
      "Computer vision and image recognition"
    ],
    data: [
      "Real-time data visualization dashboards",
      "Interactive reports and analytics",
      "Business intelligence integration",
      "Custom KPI tracking and metrics"
    ],
    seo: [
      "End-to-end digital transformation roadmap",
      "Legacy system modernization",
      "Process optimization and workflow redesign",
      "Change management and training"
    ],
    design: [
      "User-centered design principles",
      "Consistent brand identity across platforms",
      "Accessibility-first approach",
      "Interactive prototypes and mockups"
    ]
  };

  // Process steps data
  const processSteps = [
    {
      number: 1,
      title: "Discovery",
      description: "We start by understanding your business, goals, and requirements through in-depth consultation to identify the perfect solution for your needs."
    },
    {
      number: 2,
      title: "Strategy",
      description: "Our team creates a tailored solution design and project roadmap based on your specific requirements and business objectives."
    },
    {
      number: 3,
      title: "Development",
      description: "Our experts build your solution using modern technology and best practices, with regular updates throughout the development process."
    },
    {
      number: 4,
      title: "Testing",
      description: "Rigorous testing ensures your solution meets the highest standards of quality, security, and performance before deployment."
    },
    {
      number: 5,
      title: "Launch",
      description: "We deploy your solution with minimal disruption to your business operations and provide comprehensive training for your team."
    },
    {
      number: 6,
      title: "Support",
      description: "We provide ongoing maintenance, optimization, and support to ensure your solution continues to deliver value as your business evolves."
    }
  ];

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative overflow-hidden py-16 md:py-24">
          <SpotlightLayout withMultipleSpotlights spotlightSize={600} spotlightColor="#4D4DFF">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-6">
                  Innovative <span className="gradient-text-animated gradient-text-glow">Digital Solutions</span>
                </h1>
                <p className="text-xl dark:text-[#8B949E] light:text-gray-600 mb-8">
                  Transform your business with our cutting-edge technology expertise. Discover how our
                  premium services can elevate your digital presence and operational efficiency.
                </p>
                <Link href="/contact" className="gradient-bg gradient-bg-hover px-8 py-4 rounded-md font-medium transition-all duration-300 glow-hover inline-block mt-4">
                  Schedule a Consultation
                </Link>
              </div>
            </div>
          </SpotlightLayout>
        </section>

        {/* Tech Banner */}
        <TechBanner />

        {/* Services List */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4">
                Our <span className="gradient-text">Services</span>
              </h2>
              <p className="text-xl dark:text-[#8B949E] light:text-gray-600">
                Comprehensive technology solutions tailored to meet your business needs and drive digital innovation
              </p>
            </div>
            
            <div className="max-w-6xl mx-auto">
              {SERVICES.map((service, index) => (
                <motion.div 
                  key={service.id}
                  className="py-12 first:pt-0 border-b dark:border-[#30363D] light:border-gray-200 last:border-b-0"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3">
                      <div className="flex items-center gap-4 mb-6">
                        <motion.div 
                          className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-lg bg-gradient-to-br from-[#00A0B0] to-[#4D4DFF] shadow-lg transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <ServiceIcon icon={service.icon} />
                        </motion.div>
                        <h3 className="text-2xl font-poppins font-semibold">{service.title}</h3>
                      </div>
                      <p className="dark:text-[#8B949E] light:text-gray-600 mb-6 md:mb-0">{service.description}</p>
                    </div>
                    <div className="md:w-2/3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {serviceFeatures[service.icon as keyof typeof serviceFeatures].map((feature, idx) => (
                          <div key={idx} className="flex items-start">
                            <CheckCircle className="flex-shrink-0 w-5 h-5 text-[#00A0B0] mr-3 mt-1" />
                            <span className="dark:text-[#E6EDF3] light:text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-8">
                        <Link 
                          href="/contact" 
                          className="inline-flex items-center text-[#00A0B0] hover:text-[#4D4DFF] font-medium transition-colors"
                        >
                          Learn more about {service.title.toLowerCase()} <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-14">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-10 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4">
                Our <span className="gradient-text">Process</span>
              </h2>
              <p className="text-xl dark:text-[#8B949E] light:text-gray-600">
                A structured approach to delivering successful technology solutions that exceed expectations
              </p>
            </div>
            
            <div className="relative">
              {/* Vertical line connecting the steps */}
              <div className="absolute left-7 top-7 bottom-7 w-0.5 bg-gradient-to-b from-[#00A0B0] to-[#4D4DFF] hidden md:block"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                {processSteps.map((step, index) => (
                  <ProcessStep 
                    key={step.number} 
                    {...step} 
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="dark:bg-[#161B22] light:bg-gray-900 rounded-xl p-8 md:p-12 lg:p-16 relative overflow-hidden border dark:border-[#30363D] light:border-gray-800"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <GlowingEffect
                spread={30}
                glow={true}
                disabled={false}
                proximity={120}
                inactiveZone={0}
                borderWidth={1}
                movementDuration={0.5}
                className="will-change-transform"
              />
            
              <div className="relative z-10 max-w-3xl mx-auto text-center">
                <motion.h2 
                  className="text-3xl md:text-4xl font-poppins font-bold mb-6"
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Ready to <span className="gradient-text">Transform</span> Your Business?
                </motion.h2>
                <motion.p 
                  className="dark:text-[#8B949E] light:text-gray-300 text-lg mb-10"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Contact us today to discuss how our innovative solutions can help you achieve your goals
                  and take your business to the next level.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Link href="/contact" className="gradient-bg gradient-bg-hover px-8 py-4 rounded-md font-medium text-lg transition-all duration-300 glow-hover inline-flex items-center">
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </motion.div>
              </div>
              
              {/* Background Decoration */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-[#4D4DFF]"></div>
                <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#00A0B0]"></div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ServicesPage;
