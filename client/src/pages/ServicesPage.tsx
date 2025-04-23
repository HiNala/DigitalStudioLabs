import { useEffect } from 'react';
import { Link } from 'wouter';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { SERVICES } from '@/lib/constants';

const ServicesPage = () => {
  useEffect(() => {
    document.title = 'Services | Digital Studio Labs';
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-radial relative overflow-hidden py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-6">
                Our <span className="gradient-text-animated gradient-text-glow">Premium Services</span>
              </h1>
              <p className="text-xl text-[#8B949E] mb-6">
                Comprehensive digital solutions tailored to your unique business needs.
              </p>
            </div>
          </div>
          
          {/* Background Decoration */}
          <div className="ambient-glow absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-10 bg-[#4D4DFF]"></div>
        </section>

        {/* Detailed Services */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {SERVICES.map((service, index) => (
              <div 
                key={service.id}
                className={`flex flex-col lg:flex-row gap-12 py-16 ${
                  index !== SERVICES.length - 1 ? 'border-b border-[#30363D]' : ''
                }`}
              >
                <div className="lg:w-1/3">
                  <div className="w-16 h-16 gradient-bg rounded-lg flex items-center justify-center mb-6">
                    <i className={`bx ${service.icon} text-2xl`}></i>
                  </div>
                  <h2 className="text-3xl font-poppins font-bold mb-4">{service.title}</h2>
                  <p className="text-[#8B949E] mb-6">{service.description}</p>
                  <Link href="/contact" className="inline-flex items-center gradient-bg gradient-bg-hover px-6 py-3 rounded-md font-medium transition-all duration-300 glow-hover">
                    Request Consultation <i className='bx bx-right-arrow-alt ml-2'></i>
                  </Link>
                </div>
                <div className="lg:w-2/3 bg-[#161B22] rounded-xl p-8 border border-[#30363D]">
                  <h3 className="text-xl font-poppins font-semibold mb-4">Benefits</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {[1, 2, 3, 4].map((item) => (
                      <li key={item} className="flex items-start">
                        <i className='bx bx-check-circle text-[#00A0B0] mr-2 text-xl'></i>
                        <span>Benefit {item} of {service.title}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <h3 className="text-xl font-poppins font-semibold mb-4">Our Approach</h3>
                  <p className="text-[#8B949E] mb-4">
                    We take a strategic approach to {service.title.toLowerCase()} that focuses on your specific business goals and target audience.
                  </p>
                  <p className="text-[#8B949E]">
                    Our team of experienced professionals uses the latest technologies and best practices to deliver solutions that exceed expectations.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-radial">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#161B22] rounded-xl p-8 md:p-12 lg:p-16 relative overflow-hidden">
              <div className="relative z-10 max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-6">Ready to Transform Your Digital Presence?</h2>
                <p className="text-[#8B949E] text-lg mb-10">
                  Let's discuss how our custom solutions can help you achieve your business goals.
                </p>
                <Link href="/contact" className="gradient-bg gradient-bg-hover px-8 py-4 rounded-md font-medium text-lg transition-all duration-300 glow-hover inline-block">
                  Get In Touch
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
