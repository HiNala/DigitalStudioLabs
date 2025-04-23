import { useEffect, useRef } from 'react';

const TrustBar = () => {
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
    <section ref={sectionRef} className="bg-[#161B22] py-10 border-y border-[#30363D]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[#8B949E] mb-8 text-sm uppercase tracking-wider font-medium animate-fade-in">
          Trusted by industry-leading companies
        </p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 justify-items-center items-center">
          {/* Client logos */}
          {[1, 2, 3, 4, 5].map((index) => (
            <div 
              key={index}
              className="h-12 w-32 bg-[#30363D]/30 rounded-md flex items-center justify-center text-[#8B949E] animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <i className='bx bx-building text-2xl mr-2'></i>
              <span>Client {index}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
