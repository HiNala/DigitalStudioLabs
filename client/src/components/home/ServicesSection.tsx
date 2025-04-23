import { useEffect, useRef } from 'react';
import { Link } from 'wouter';
import { SERVICES } from '@/lib/constants';

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

  return (
    <section id="services" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-6">Our Premium Services</h2>
          <p className="text-[#8B949E] text-lg">
            Custom digital solutions tailored to your business goals and challenges.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <div 
              key={service.id}
              className="bg-[#161B22] p-8 rounded-xl border border-[#30363D] card-scale animate-fade-in"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 gradient-bg rounded-lg flex items-center justify-center mb-6">
                <i className={`bx ${service.icon} text-2xl`}></i>
              </div>
              <h3 className="text-xl font-poppins font-semibold mb-4">{service.title}</h3>
              <p className="text-[#8B949E] mb-6">
                {service.description}
              </p>
              <Link href="/contact" className="inline-flex items-center text-[#00A0B0] hover:text-[#4D4DFF] transition-colors">
                Learn More <i className='bx bx-right-arrow-alt ml-2'></i>
              </Link>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12 animate-fade-in">
          <Link href="/contact" className="gradient-bg gradient-bg-hover px-8 py-4 rounded-md font-medium transition-all duration-300 glow-hover inline-block">
            Discuss Your Project
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
