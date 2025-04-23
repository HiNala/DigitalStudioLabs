import { useEffect, useRef } from 'react';
import { Link } from 'wouter';

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
    <section id="process" ref={sectionRef} className="py-20 bg-radial relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-6">Our Proven Process</h2>
          <p className="text-[#8B949E] text-lg">
            We follow a structured approach to ensure every project exceeds expectations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step, index) => (
            <div 
              key={step.number}
              className="bg-[#161B22] p-8 rounded-xl border border-[#30363D] card-scale animate-fade-in relative"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center font-poppins font-bold text-xl mb-6">
                {step.number}
              </div>
              <h3 className="text-xl font-poppins font-semibold mb-4">{step.title}</h3>
              <p className="text-[#8B949E]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16 animate-fade-in">
          <Link href="/contact" className="gradient-bg gradient-bg-hover px-8 py-4 rounded-md font-medium transition-all duration-300 glow-hover inline-block">
            Start Your Project
          </Link>
        </div>
      </div>
      
      {/* Background Decoration */}
      <div className="ambient-glow absolute bottom-1/4 -right-20 w-96 h-96 rounded-full opacity-10 bg-[#00A0B0]"></div>
    </section>
  );
};

export default ProcessSection;
