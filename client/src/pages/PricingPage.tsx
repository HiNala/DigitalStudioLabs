import { useEffect } from 'react';
import { Link } from 'wouter';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

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
                Clear, Flexible, and <span className="gradient-text-animated gradient-text-glow">Transparent Pricing</span>
              </h1>
              <p className="text-xl text-[#8B949E] mb-6">
                Straightforward pricing designed to align with your budget, needs, and growth objectives.
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
              <div className="bg-[#161B22] rounded-xl border border-[#30363D] overflow-hidden mb-12">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#30363D]">
                        <th className="text-left p-6">Engagement Type</th>
                        <th className="text-left p-6">Starting Investment</th>
                        <th className="text-left p-6">Includes</th>
                        <th className="p-6"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-[#30363D]">
                        <td className="p-6 font-medium">Discovery & Strategy Session</td>
                        <td className="p-6">Free (30-minute call)</td>
                        <td className="p-6">Needs assessment, high-level roadmap, actionable next steps</td>
                        <td className="p-6">
                          <Link href="/contact" className="inline-block px-4 py-2 text-center bg-[#0D1117] hover:bg-[#30363D] rounded-md font-medium transition-all duration-300">Book Call</Link>
                        </td>
                      </tr>
                      <tr className="border-b border-[#30363D]">
                        <td className="p-6 font-medium">Fixed-Scope Development</td>
                        <td className="p-6">$10,000</td>
                        <td className="p-6">Requirements, design, development, testing, + 1-month support</td>
                        <td className="p-6">
                          <Link href="/contact" className="inline-block px-4 py-2 text-center gradient-bg gradient-bg-hover rounded-md font-medium transition-all duration-300 glow-hover">Get Quote</Link>
                        </td>
                      </tr>
                      <tr className="border-b border-[#30363D]">
                        <td className="p-6 font-medium">Complex Automations & Integrations</td>
                        <td className="p-6">$18,000</td>
                        <td className="p-6">Advanced API work, RPA bots, data migrations, + 2-month support</td>
                        <td className="p-6">
                          <Link href="/contact" className="inline-block px-4 py-2 text-center gradient-bg gradient-bg-hover rounded-md font-medium transition-all duration-300 glow-hover">Get Quote</Link>
                        </td>
                      </tr>
                      <tr className="border-b border-[#30363D]">
                        <td className="p-6 font-medium">AI & Advanced Analytics Solutions</td>
                        <td className="p-6">$22,500</td>
                        <td className="p-6">Custom ML pipelines, forecasting models, dashboards, + 3-month support</td>
                        <td className="p-6">
                          <Link href="/contact" className="inline-block px-4 py-2 text-center gradient-bg gradient-bg-hover rounded-md font-medium transition-all duration-300 glow-hover">Get Quote</Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-6 font-medium">Ongoing Support Retainer</td>
                        <td className="p-6">From $750/month</td>
                        <td className="p-6">Priority bug fixes, performance tuning, feature enhancements</td>
                        <td className="p-6">
                          <Link href="/contact" className="inline-block px-4 py-2 text-center bg-[#0D1117] hover:bg-[#30363D] rounded-md font-medium transition-all duration-300">Learn More</Link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="text-center text-[#8B949E] text-sm italic mb-12">
                *Custom packages and volume discounts available for multi-project engagements.
              </div>
              
              <div className="flex justify-center">
                <Link href="/contact" className="gradient-bg gradient-bg-hover px-8 py-4 rounded-md font-medium text-lg transition-all duration-300 glow-hover inline-block">
                  Schedule Your Free Discovery Call
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-20 bg-radial">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-6">What's Included in Every Project</h2>
              <p className="text-[#8B949E] text-lg">
                No matter the size of your engagement, we deliver exceptional quality and service.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: "bx-bulb",
                  title: "Strategic Planning",
                  description: "We identify opportunities beyond the obvious technical solutions to add maximum business value."
                },
                {
                  icon: "bx-code-alt",
                  title: "Quality Code",
                  description: "Clean, maintainable code that follows best practices and industry standards."
                },
                {
                  icon: "bx-devices",
                  title: "Responsive Design",
                  description: "Solutions that work seamlessly across all devices, from desktop to mobile."
                },
                {
                  icon: "bx-line-chart",
                  title: "Performance Optimization",
                  description: "Speed and efficiency built in from the ground up, not added as an afterthought."
                },
                {
                  icon: "bx-shield-quarter",
                  title: "Security Focus",
                  description: "Protection against common vulnerabilities and best security practices."
                },
                {
                  icon: "bx-trending-up",
                  title: "Scalable Architecture",
                  description: "Systems designed to grow with your business and adapt to changing needs."
                }
              ].map((item, index) => (
                <div key={index} className="bg-[#161B22] rounded-xl p-8 border border-[#30363D] card-scale">
                  <div className="w-14 h-14 gradient-bg rounded-lg flex items-center justify-center mb-6">
                    <i className={`bx ${item.icon} text-2xl`}></i>
                  </div>
                  <h3 className="text-xl font-poppins font-semibold mb-4">{item.title}</h3>
                  <p className="text-[#8B949E]">
                    {item.description}
                  </p>
                </div>
              ))}
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
                <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-6">Get Your Custom Quote Today</h2>
                <p className="text-[#8B949E] text-lg mb-10">
                  Contact us today for a personalized quote tailored to your specific needs and goals.
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
