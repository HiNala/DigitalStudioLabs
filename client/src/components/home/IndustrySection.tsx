import { useEffect, useRef } from 'react';
import { INDUSTRIES } from '@/lib/constants';

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

  return (
    <section ref={sectionRef} className="py-20 bg-radial relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-6">Solutions For Your Industry</h2>
          <p className="text-[#8B949E] text-lg">
            We serve a diverse range of industries with tailored digital solutions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INDUSTRIES.map((industry, index) => (
            <div 
              key={industry.id}
              className="bg-[#161B22] p-8 rounded-xl border border-[#30363D] card-scale animate-fade-in relative overflow-hidden group"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div 
                className="absolute inset-0 opacity-5 bg-cover bg-center" 
                style={{ backgroundImage: `url('${industry.background}')` }}
              ></div>
              <div className="relative z-10">
                <h3 className="text-xl font-poppins font-semibold mb-4">{industry.title}</h3>
                <p className="text-[#8B949E] mb-6">
                  {industry.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {industry.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="text-xs bg-[#30363D]/50 px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Background Decoration */}
      <div className="ambient-glow absolute top-1/2 -left-20 w-96 h-96 rounded-full opacity-10 bg-[#4D4DFF]"></div>
    </section>
  );
};

export default IndustrySection;
