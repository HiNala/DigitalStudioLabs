import { useEffect } from 'react';
import { Link } from 'wouter';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { PRICING_PLANS, MAINTENANCE_PLANS } from '@/lib/constants';

const PricingPage = () => {
  useEffect(() => {
    document.title = 'Pricing | Digital Studio Labs';
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
                Transparent <span className="gradient-text-animated gradient-text-glow">Pricing</span>
              </h1>
              <p className="text-xl text-[#8B949E] mb-6">
                Competitive rates for premium quality digital solutions.
              </p>
            </div>
          </div>
          
          {/* Background Decoration */}
          <div className="ambient-glow absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-10 bg-[#4D4DFF]"></div>
        </section>

        {/* Pricing Plans */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {PRICING_PLANS.map((plan) => (
                  <div 
                    key={plan.id}
                    className={`bg-[#161B22] rounded-xl border ${
                      plan.isFeatured ? 'border-[#00A0B0]' : 'border-[#30363D]'
                    } p-8 card-scale relative`}
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
            </div>
          </div>
        </section>

        {/* Maintenance Plans */}
        <section className="py-20 bg-radial">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="mb-16 text-center">
                <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-6">Maintenance & Support Plans</h2>
                <p className="text-[#8B949E] text-lg">
                  Keep your digital assets secure, up-to-date, and performing at their best.
                </p>
              </div>
              
              <div className="bg-[#161B22] rounded-xl border border-[#30363D] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#30363D]">
                        <th className="text-left py-6 px-6">Plan</th>
                        <th className="text-left py-6 px-6">Price</th>
                        <th className="text-left py-6 px-6">Includes</th>
                        <th className="py-6 px-6"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {MAINTENANCE_PLANS.map((plan, index) => (
                        <tr key={plan.id} className={index < MAINTENANCE_PLANS.length - 1 ? "border-b border-[#30363D]" : ""}>
                          <td className="py-6 px-6 font-medium">{plan.name}</td>
                          <td className="py-6 px-6">{plan.price}</td>
                          <td className="py-6 px-6">{plan.features}</td>
                          <td className="py-6 px-6">
                            <Link href="/contact" className="inline-block px-4 py-2 text-center gradient-bg gradient-bg-hover rounded-md font-medium transition-all duration-300 glow-hover">Select</Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-[#8B949E] mb-8">
                  All maintenance plans include priority support and regular security updates. We also offer custom maintenance solutions for complex projects.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="mb-16 text-center">
                <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-6">Frequently Asked Questions</h2>
                <p className="text-[#8B949E] text-lg">
                  Common questions about our pricing and services.
                </p>
              </div>
              
              <div className="divide-y divide-[#30363D]">
                {[
                  {
                    question: "Do you offer custom pricing for special requirements?",
                    answer: "Yes, we offer custom quotes for projects with unique requirements or scope. Our team will work with you to understand your needs and provide a tailored solution and pricing."
                  },
                  {
                    question: "What payment methods do you accept?",
                    answer: "We accept credit cards, bank transfers, and PayPal. For larger projects, we typically structure payments in milestones: an initial deposit, payments at key project milestones, and a final payment upon completion."
                  },
                  {
                    question: "Are there any hidden costs or fees?",
                    answer: "No, we believe in transparent pricing. The quote we provide includes all costs for the agreed scope. If additional requirements emerge during the project, we'll discuss any potential cost implications before proceeding."
                  },
                  {
                    question: "Can I upgrade my maintenance plan later?",
                    answer: "Absolutely! You can upgrade your maintenance plan at any time as your needs evolve. We'll prorate the difference and adjust your billing accordingly."
                  }
                ].map((faq, index) => (
                  <div key={index} className="py-8">
                    <h3 className="text-xl font-poppins font-semibold mb-4">{faq.question}</h3>
                    <p className="text-[#8B949E]">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-radial">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#161B22] rounded-xl p-8 md:p-12 lg:p-16 relative overflow-hidden">
              <div className="relative z-10 max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-6">Ready to Get Started?</h2>
                <p className="text-[#8B949E] text-lg mb-10">
                  Contact us today for a custom quote tailored to your specific needs.
                </p>
                <Link href="/contact" className="gradient-bg gradient-bg-hover px-8 py-4 rounded-md font-medium text-lg transition-all duration-300 glow-hover inline-block">
                  Request a Quote
                </Link>
              </div>
              
              {/* Background Decoration */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-[#00A0B0]"></div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default PricingPage;
