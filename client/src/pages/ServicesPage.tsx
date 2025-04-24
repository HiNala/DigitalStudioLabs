import { useEffect } from 'react';
import { Link } from 'wouter';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { SERVICES } from '@/lib/constants';
import TechBanner from '@/components/home/TechBanner';

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
                Innovative <span className="gradient-text-animated gradient-text-glow">Software Solutions</span>
              </h1>
              <p className="text-xl text-[#8B949E] mb-6">
                Expertly built to transform your business
              </p>
            </div>
          </div>
          
          {/* Background Decoration */}
          <div className="ambient-glow absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-10 bg-[#4D4DFF]"></div>
        </section>

        {/* Tech Banner */}
        <TechBanner />

        {/* Services Overview */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <p className="text-xl text-[#8B949E]">
                We combine cutting-edge technology with strategic insights to craft solutions that empower your company from day one.
              </p>
            </div>
          </div>
        </section>

        {/* Detailed Services */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
              <div className="bg-[#161B22] rounded-xl p-8 border border-[#30363D] card-scale">
                <div className="w-16 h-16 gradient-bg rounded-lg flex items-center justify-center mb-6">
                  <i className='bx bx-code-alt text-2xl'></i>
                </div>
                <h2 className="text-2xl font-poppins font-bold mb-4">Custom Web & Mobile Apps</h2>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <i className='bx bx-check-circle text-[#00A0B0] mr-2 text-xl'></i>
                    <span>High-performance applications designed to engage users, built with technologies like Next.js, React, TypeScript, and Tailwind.</span>
                  </li>
                  <li className="flex items-start">
                    <i className='bx bx-check-circle text-[#00A0B0] mr-2 text-xl'></i>
                    <span>Cross-platform capabilities that deliver consistent and exceptional user experiences on any device.</span>
                  </li>
                  <li className="flex items-start">
                    <i className='bx bx-check-circle text-[#00A0B0] mr-2 text-xl'></i>
                    <span>Intuitive interfaces that prioritize user experience and engagement.</span>
                  </li>
                </ul>
                <Link href="/contact" className="inline-flex items-center gradient-bg gradient-bg-hover px-6 py-3 rounded-md font-medium transition-all duration-300 glow-hover">
                  Discuss Your Project <i className='bx bx-right-arrow-alt ml-2'></i>
                </Link>
              </div>
              
              <div className="bg-[#161B22] rounded-xl p-8 border border-[#30363D] card-scale">
                <div className="w-16 h-16 gradient-bg rounded-lg flex items-center justify-center mb-6">
                  <i className='bx bx-sync text-2xl'></i>
                </div>
                <h2 className="text-2xl font-poppins font-bold mb-4">Automation & System Integrations</h2>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <i className='bx bx-check-circle text-[#00A0B0] mr-2 text-xl'></i>
                    <span>Automate routine tasks, reduce costs, and enhance accuracy with Robotic Process Automation (RPA).</span>
                  </li>
                  <li className="flex items-start">
                    <i className='bx bx-check-circle text-[#00A0B0] mr-2 text-xl'></i>
                    <span>Seamlessly integrate your existing systems through powerful APIs, improving efficiency and productivity company-wide.</span>
                  </li>
                  <li className="flex items-start">
                    <i className='bx bx-check-circle text-[#00A0B0] mr-2 text-xl'></i>
                    <span>Custom workflows that streamline operations and reduce manual intervention.</span>
                  </li>
                </ul>
                <Link href="/contact" className="inline-flex items-center gradient-bg gradient-bg-hover px-6 py-3 rounded-md font-medium transition-all duration-300 glow-hover">
                  Automate Your Workflow <i className='bx bx-right-arrow-alt ml-2'></i>
                </Link>
              </div>
              
              <div className="bg-[#161B22] rounded-xl p-8 border border-[#30363D] card-scale">
                <div className="w-16 h-16 gradient-bg rounded-lg flex items-center justify-center mb-6">
                  <i className='bx bx-line-chart text-2xl'></i>
                </div>
                <h2 className="text-2xl font-poppins font-bold mb-4">Data Analytics & AI Solutions</h2>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <i className='bx bx-check-circle text-[#00A0B0] mr-2 text-xl'></i>
                    <span>Predictive analytics and AI-driven forecasting to help you make smarter, faster business decisions.</span>
                  </li>
                  <li className="flex items-start">
                    <i className='bx bx-check-circle text-[#00A0B0] mr-2 text-xl'></i>
                    <span>Beautiful, intuitive dashboards that visualize key metrics clearly, transforming raw data into actionable insights.</span>
                  </li>
                  <li className="flex items-start">
                    <i className='bx bx-check-circle text-[#00A0B0] mr-2 text-xl'></i>
                    <span>Machine learning models that improve over time, delivering increasingly valuable business intelligence.</span>
                  </li>
                </ul>
                <Link href="/contact" className="inline-flex items-center gradient-bg gradient-bg-hover px-6 py-3 rounded-md font-medium transition-all duration-300 glow-hover">
                  Unlock Your Data's Potential <i className='bx bx-right-arrow-alt ml-2'></i>
                </Link>
              </div>
              
              <div className="bg-[#161B22] rounded-xl p-8 border border-[#30363D] card-scale">
                <div className="w-16 h-16 gradient-bg rounded-lg flex items-center justify-center mb-6">
                  <i className='bx bx-building-house text-2xl'></i>
                </div>
                <h2 className="text-2xl font-poppins font-bold mb-4">Industry-Specific Expertise</h2>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <i className='bx bx-check-circle text-[#00A0B0] mr-2 text-xl'></i>
                    <span><strong>Food & Beverage:</strong> Traceability, sustainability reporting, inventory management, and regulatory compliance solutions.</span>
                  </li>
                  <li className="flex items-start">
                    <i className='bx bx-check-circle text-[#00A0B0] mr-2 text-xl'></i>
                    <span><strong>Healthcare:</strong> Secure patient portals, telehealth integration, automated administrative tasks, and patient analytics tools.</span>
                  </li>
                  <li className="flex items-start">
                    <i className='bx bx-check-circle text-[#00A0B0] mr-2 text-xl'></i>
                    <span><strong>Technology & SaaS:</strong> Developer productivity tools, internal automation, seamless API integrations, and custom analytics solutions.</span>
                  </li>
                </ul>
                <Link href="/contact" className="inline-flex items-center gradient-bg gradient-bg-hover px-6 py-3 rounded-md font-medium transition-all duration-300 glow-hover">
                  Explore Industry Solutions <i className='bx bx-right-arrow-alt ml-2'></i>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How We Work */}
        <section className="py-20 bg-radial">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-6">How We Work</h2>
              <p className="text-[#8B949E] text-lg">
                Our collaborative approach ensures we deliver exactly what you need.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-[#161B22] rounded-xl p-8 border border-[#30363D] card-scale">
                <div className="w-14 h-14 gradient-bg rounded-lg flex items-center justify-center mb-6 font-poppins font-bold text-xl">
                  1
                </div>
                <h3 className="text-xl font-poppins font-semibold mb-4">Consultation</h3>
                <p className="text-[#8B949E]">
                  We begin by understanding your business, goals, and challenges to identify the perfect solution.
                </p>
              </div>
              
              <div className="bg-[#161B22] rounded-xl p-8 border border-[#30363D] card-scale">
                <div className="w-14 h-14 gradient-bg rounded-lg flex items-center justify-center mb-6 font-poppins font-bold text-xl">
                  2
                </div>
                <h3 className="text-xl font-poppins font-semibold mb-4">Strategy & Design</h3>
                <p className="text-[#8B949E]">
                  We create a detailed blueprint and prototype, ensuring everyone is aligned before development begins.
                </p>
              </div>
              
              <div className="bg-[#161B22] rounded-xl p-8 border border-[#30363D] card-scale">
                <div className="w-14 h-14 gradient-bg rounded-lg flex items-center justify-center mb-6 font-poppins font-bold text-xl">
                  3
                </div>
                <h3 className="text-xl font-poppins font-semibold mb-4">Implementation & Support</h3>
                <p className="text-[#8B949E]">
                  We build, test, and deploy your solution with ongoing support to ensure long-term success.
                </p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Link href="/process" className="inline-flex items-center text-[#00A0B0] hover:text-[#4D4DFF] font-medium transition-colors">
                Learn more about our process <i className='bx bx-right-arrow-alt ml-1'></i>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
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
