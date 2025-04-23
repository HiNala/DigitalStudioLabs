import { useEffect, useRef } from 'react';
import { Link } from 'wouter';

const CTASection = () => {
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
    <section ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#161B22] rounded-xl p-8 md:p-12 lg:p-16 relative overflow-hidden animate-fade-in">
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-6">Ready to Transform Your Digital Presence?</h2>
            <p className="text-[#8B949E] text-lg mb-10">
              Let's discuss how our custom solutions can help you achieve your business goals. Schedule a free consultation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="gradient-bg gradient-bg-hover px-8 py-4 rounded-md font-medium text-lg transition-all duration-300 glow-hover">
                Schedule Free Consultation
              </Link>
              <Link href="/pricing" className="bg-[#0D1117] hover:bg-[#30363D] px-8 py-4 rounded-md font-medium text-lg transition-colors">
                View Pricing
              </Link>
            </div>
          </div>
          
          {/* Background Decoration */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-[#4D4DFF]"></div>
            <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-[#00A0B0]"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
