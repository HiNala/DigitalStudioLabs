import { useEffect } from 'react';
import { Link } from 'wouter';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { SERVICES } from '@/lib/constants';
import TechBanner from '@/components/home/TechBanner';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Service Card Component
interface ServiceCardProps {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

const ServiceCard = ({ title, description, icon, features }: ServiceCardProps) => {
  return (
    <motion.div 
      className="bg-[#161B22] rounded-xl p-8 border border-[#30363D] card-scale h-full"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="w-16 h-16 gradient-bg rounded-lg flex items-center justify-center mb-6">
        <i className={`bx ${icon} text-2xl text-white`}></i>
      </div>
      <h2 className="text-2xl font-poppins font-bold mb-4">{title}</h2>
      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle className="text-[#00A0B0] mr-2 h-5 w-5 flex-shrink-0 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Link href="/contact" className="inline-flex items-center gradient-bg gradient-bg-hover px-6 py-3 rounded-md font-medium transition-all duration-300 glow-hover">
        Discuss Your Project <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </motion.div>
  );
};

// Feature Comparison Table Component
interface FeatureComparisonProps {
  features: {
    name: string;
    basic: boolean;
    professional: boolean;
    enterprise: boolean;
  }[];
}

const FeatureComparison = ({ features }: FeatureComparisonProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#161B22]">
            <th className="p-4 text-left border-b border-[#30363D] w-[300px]">Feature</th>
            <th className="p-4 text-center border-b border-[#30363D]">Basic</th>
            <th className="p-4 text-center border-b border-[#30363D]">Professional</th>
            <th className="p-4 text-center border-b border-[#30363D]">Enterprise</th>
          </tr>
        </thead>
        <tbody>
          {features.map((feature, index) => (
            <tr key={index} className="border-b border-[#30363D] bg-[#161B22]/50">
              <td className="p-4 font-medium">{feature.name}</td>
              <td className="p-4 text-center">
                {feature.basic ? (
                  <CheckCircle className="h-5 w-5 text-[#00A0B0] mx-auto" />
                ) : (
                  <XCircle className="h-5 w-5 text-[#8B949E] mx-auto" />
                )}
              </td>
              <td className="p-4 text-center">
                {feature.professional ? (
                  <CheckCircle className="h-5 w-5 text-[#00A0B0] mx-auto" />
                ) : (
                  <XCircle className="h-5 w-5 text-[#8B949E] mx-auto" />
                )}
              </td>
              <td className="p-4 text-center">
                {feature.enterprise ? (
                  <CheckCircle className="h-5 w-5 text-[#00A0B0] mx-auto" />
                ) : (
                  <XCircle className="h-5 w-5 text-[#8B949E] mx-auto" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
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
      className="flex gap-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-lg bg-gradient-to-br from-[#00A0B0] to-[#4D4DFF] font-poppins font-bold text-xl">
        {number}
      </div>
      <div>
        <h3 className="text-xl font-poppins font-semibold mb-2">{title}</h3>
        <p className="text-[#8B949E]">{description}</p>
      </div>
    </motion.div>
  );
};

// Testimonial Component
interface TestimonialProps {
  quote: string;
  name: string;
  title: string;
  image: string;
}

const TestimonialCard = ({ quote, name, title, image }: TestimonialProps) => {
  return (
    <motion.div 
      className="bg-[#161B22] rounded-xl p-6 border border-[#30363D] h-full"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="mb-6">
        <svg width="30" height="24" viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.8182 0H7.63636L0 12V24H12V12H4.36364L12.8182 0ZM30 0H24.8182L17.1818 12V24H29.1818V12H21.5455L30 0Z" fill="url(#paint0_linear)" />
          <defs>
            <linearGradient id="paint0_linear" x1="0" y1="0" x2="30" y2="24" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00A0B0" />
              <stop offset="1" stopColor="#4D4DFF" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <p className="text-[#E6EDF3] italic mb-6">{quote}</p>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-[#8B949E]">{title}</p>
        </div>
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

  // Feature comparison data
  const featureComparison = [
    { name: "Initial Consultation", basic: true, professional: true, enterprise: true },
    { name: "Requirements Analysis", basic: true, professional: true, enterprise: true },
    { name: "Solution Design", basic: true, professional: true, enterprise: true },
    { name: "Implementation Support", basic: false, professional: true, enterprise: true },
    { name: "24/7 Support", basic: false, professional: false, enterprise: true },
    { name: "Dedicated Account Manager", basic: false, professional: true, enterprise: true },
    { name: "Custom Integrations", basic: false, professional: true, enterprise: true },
    { name: "Performance Monitoring", basic: false, professional: true, enterprise: true },
    { name: "Quarterly Business Reviews", basic: false, professional: false, enterprise: true },
    { name: "Priority Bug Fixes", basic: false, professional: true, enterprise: true },
  ];

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

  // Testimonials from constants
  const testimonials = [
    {
      quote: "Digital Studio Labs transformed our outdated website into a lead-generating machine. Our conversion rate increased by 78% within the first month after launch.",
      name: "Michael Thompson",
      title: "CEO, Thompson Real Estate",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
    },
    {
      quote: "The custom AI solution Digital Studio Labs built for our customer service team reduced response times by 62% and helped us scale without adding headcount.",
      name: "Sarah Johnson",
      title: "Operations Director, TechSoft",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
    },
    {
      quote: "Working with Digital Studio Labs on our MVP was a game-changer. They delivered a polished product in half the time we expected, helping us secure our next round of funding.",
      name: "David Wilson",
      title: "Founder, DataViz Analytics",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
    }
  ];

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-radial relative overflow-hidden py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-6">
                Innovative <span className="gradient-text-animated gradient-text-glow">Digital Solutions</span>
              </h1>
              <p className="text-xl text-[#8B949E] mb-6">
                Transform your business with our cutting-edge technology expertise
              </p>
            </div>
          </div>
          
          {/* Background Decoration */}
          <div className="ambient-glow absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-10 bg-[#4D4DFF]"></div>
        </section>

        {/* Tech Banner */}
        <TechBanner />

        {/* Services Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-6">Our Services</h2>
              <p className="text-xl text-[#8B949E]">
                Comprehensive technology solutions tailored to meet your business needs
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SERVICES.map((service) => (
                <ServiceCard 
                  key={service.id}
                  {...service}
                  features={serviceFeatures[service.icon as keyof typeof serviceFeatures]}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Feature Comparison */}
        <section className="py-20 bg-radial">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-6">Service Tiers</h2>
              <p className="text-xl text-[#8B949E]">
                Compare our service packages to find the right fit for your organization
              </p>
            </div>
            
            <div className="bg-[#0D1117]/60 rounded-xl border border-[#30363D] p-6 overflow-hidden">
              <FeatureComparison features={featureComparison} />
            </div>
            
            <div className="text-center mt-12">
              <Link href="/pricing" className="gradient-bg gradient-bg-hover px-8 py-4 rounded-md font-medium text-lg transition-all duration-300 glow-hover inline-flex items-center">
                View Detailed Pricing <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-6">Our Process</h2>
              <p className="text-xl text-[#8B949E]">
                A structured approach to delivering successful technology solutions
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {processSteps.map((step) => (
                <ProcessStep key={step.number} {...step} />
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-radial">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-6">Client Success Stories</h2>
              <p className="text-xl text-[#8B949E]">
                Hear from our clients about their experiences working with us
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} {...testimonial} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#161B22] rounded-xl p-8 md:p-12 lg:p-16 relative overflow-hidden">
              <div className="relative z-10 max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-6">Ready to Transform Your Business?</h2>
                <p className="text-[#8B949E] text-lg mb-10">
                  Contact us today to discuss how our innovative solutions can help you achieve your goals.
                </p>
                <Link href="/contact" className="gradient-bg gradient-bg-hover px-8 py-4 rounded-md font-medium text-lg transition-all duration-300 glow-hover inline-flex items-center">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
              
              {/* Background Decoration */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-[#4D4DFF]"></div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ServicesPage;
