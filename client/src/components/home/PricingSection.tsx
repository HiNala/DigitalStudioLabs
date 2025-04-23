import { useEffect, useRef } from 'react';
import { Link } from 'wouter';
import { PRICING_PLANS, MAINTENANCE_PLANS } from '@/lib/constants';

const PricingSection = () => {
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
    <section id="pricing" ref={sectionRef} className="py-20 bg-radial relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-6">Transparent Pricing</h2>
          <p className="text-[#8B949E] text-lg">
            Competitive rates for premium quality digital solutions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRICING_PLANS.map((plan, index) => (
            <div 
              key={plan.id}
              className={`bg-[#161B22] rounded-xl border ${
                plan.isFeatured ? 'border-[#00A0B0]' : 'border-[#30363D]'
              } p-8 card-scale animate-fade-in relative`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {plan.isFeatured && (
                <div className="absolute top-0 inset-x-0 -translate-y-1/2 text-center">
                  <span className="bg-[#00A0B0] px-4 py-1 rounded-full text-sm font-medium">Most Popular</span>
                </div>
              )}
              
              <h3 className="text-2xl font-poppins font-semibold mb-2">{plan.name}</h3>
              <p className="text-[#8B949E] mb-6">{plan.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-poppins font-bold">{plan.price}</span>
                {plan.priceSubtext && (
                  <span className="text-[#8B949E]"> {plan.priceSubtext}</span>
                )}
              </div>
              <ul className="mb-8 space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <i className='bx bx-check-circle text-[#00A0B0] mr-2 text-xl'></i>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link 
                href="/contact" 
                className={`block text-center ${
                  plan.isFeatured 
                    ? 'gradient-bg gradient-bg-hover glow-hover' 
                    : plan.ctaText === 'Request Quote' 
                      ? 'bg-[#0D1117] hover:bg-[#30363D]' 
                      : 'gradient-bg gradient-bg-hover glow-hover'
                } py-3 rounded-md font-medium transition-all duration-300`}
              >
                {plan.ctaText}
              </Link>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-[#161B22] rounded-xl border border-[#30363D] p-8 animate-fade-in">
          <h3 className="text-2xl font-poppins font-semibold mb-6 text-center">Maintenance & Support Plans</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#30363D]">
                  <th className="text-left py-4 px-4">Plan</th>
                  <th className="text-left py-4 px-4">Price</th>
                  <th className="text-left py-4 px-4">Includes</th>
                  <th className="py-4 px-4"></th>
                </tr>
              </thead>
              <tbody>
                {MAINTENANCE_PLANS.map((plan, index) => (
                  <tr key={plan.id} className={index < MAINTENANCE_PLANS.length - 1 ? "border-b border-[#30363D]" : ""}>
                    <td className="py-4 px-4 font-medium">{plan.name}</td>
                    <td className="py-4 px-4">{plan.price}</td>
                    <td className="py-4 px-4">{plan.features}</td>
                    <td className="py-4 px-4">
                      <Link href="/contact" className="text-[#00A0B0] hover:text-[#4D4DFF] transition-colors">Select</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Background Decoration */}
      <div className="ambient-glow absolute top-1/3 -left-20 w-96 h-96 rounded-full opacity-10 bg-[#4D4DFF]"></div>
    </section>
  );
};

export default PricingSection;
