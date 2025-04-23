import { useEffect, useRef } from 'react';
import { TESTIMONIALS } from '@/lib/constants';

const TestimonialsSection = () => {
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
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-6">What Our Clients Say</h2>
          <p className="text-[#8B949E] text-lg">
            Don't just take our word for it - hear from some of our satisfied clients.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className="bg-[#161B22] p-8 rounded-xl border border-[#30363D] card-scale animate-fade-in"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, starIndex) => (
                  <i key={starIndex} className='bx bxs-star text-[#00A0B0]'></i>
                ))}
              </div>
              <p className="text-[#8B949E] mb-6 italic">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-[#30363D] overflow-hidden mr-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-poppins font-semibold">{testimonial.name}</h4>
                  <p className="text-[#8B949E] text-sm">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
