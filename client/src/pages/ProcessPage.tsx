import { useEffect } from 'react';
import { Link } from 'wouter';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const steps = [
  {
    number: 1,
    title: "Discovery & Alignment",
    description: "Through stakeholder interviews and workshops, we uncover your pain points, hidden opportunities, and define clear project objectives.",
    details: [
      "Initial consultation to understand your business objectives",
      "Analysis of your target audience and market position",
      "Identification of pain points and growth opportunities",
      "Definition of project scope, timeline, and success metrics"
    ]
  },
  {
    number: 2,
    title: "Blueprint & Prototyping",
    description: "We translate insights into wireframes, information architectures, and clickable prototypes, validating assumptions and gathering feedback before writing code.",
    details: [
      "Development of comprehensive digital strategy",
      "Creation of wireframes and user experience flows",
      "Design of visual concepts and brand integration",
      "Prototype testing and refinement based on feedback"
    ]
  },
  {
    number: 3,
    title: "Agile Development",
    description: "Our sprint-based approach delivers incremental value every 1–2 weeks. You'll see working features early, ensuring the end product aligns with your evolving needs.",
    details: [
      "Agile development with regular sprints",
      "Frontend and backend implementation",
      "Integration of third-party services and APIs",
      "Continuous testing and quality assurance",
      "Regular progress updates and milestone reviews"
    ]
  },
  {
    number: 4,
    title: "Quality Assurance & Security",
    description: "Rigorous testing—unit, integration, performance, and security audits—guarantees an enterprise-grade, reliable solution.",
    details: [
      "Comprehensive testing across multiple devices and environments",
      "Security assessments and vulnerability testing",
      "Performance optimization and benchmarking",
      "Code reviews and documentation",
      "Final quality verification and approval"
    ]
  },
  {
    number: 5,
    title: "Launch & Adoption",
    description: "We orchestrate seamless deployments, train your team, and provide comprehensive documentation for a smooth handoff.",
    details: [
      "Pre-launch testing and final preparation",
      "Smooth deployment and go-live procedures",
      "Staff training and detailed documentation",
      "Post-launch monitoring and fine-tuning",
      "Knowledge transfer and handover"
    ]
  },
  {
    number: 6,
    title: "Continuous Improvement",
    description: "Post-launch, we monitor performance, gather user feedback, and iterate rapidly—turning your software into a lasting competitive advantage.",
    details: [
      "Analytics tracking and performance monitoring",
      "User feedback collection and analysis",
      "Regular updates and security patches",
      "Feature enhancements based on real-world usage",
      "Ongoing optimization and support"
    ]
  }
];

const ProcessPage = () => {
  useEffect(() => {
    document.title = 'Our Process | Digital Studio Labs';
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
                Our <span className="gradient-text-animated gradient-text-glow">Process</span>
              </h1>
              <p className="text-xl text-[#8B949E] mb-6">
                We follow a structured yet flexible methodology that keeps you informed and in control every step of the way.
              </p>
            </div>
          </div>
          
          {/* Background Decoration */}
          <div className="ambient-glow absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-10 bg-[#4D4DFF]"></div>
        </section>

        {/* Process Steps */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {steps.map((step, index) => (
                <div 
                  key={step.number}
                  className={`flex flex-col md:flex-row gap-8 py-16 ${
                    index !== steps.length - 1 ? 'border-b border-[#30363D]' : ''
                  }`}
                >
                  <div className="md:w-1/3">
                    <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center font-poppins font-bold text-2xl mb-6">
                      {step.number}
                    </div>
                    <h2 className="text-3xl font-poppins font-bold mb-4">{step.title}</h2>
                    <p className="text-[#8B949E]">{step.description}</p>
                  </div>
                  
                  <div className="md:w-2/3 bg-[#161B22] rounded-xl p-8 border border-[#30363D]">
                    <h3 className="text-xl font-poppins font-semibold mb-6">What Happens in This Phase</h3>
                    <ul className="space-y-4">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start">
                          <i className='bx bx-check-circle text-[#00A0B0] mr-2 text-xl'></i>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="max-w-4xl mx-auto mt-8 text-center">
              <p className="text-[#8B949E] mb-8">
                Our proven process ensures consistent results and client satisfaction. We adapt our approach to meet your specific needs while maintaining our commitment to quality and transparency.
              </p>
              <Link href="/contact" className="gradient-bg gradient-bg-hover px-8 py-4 rounded-md font-medium transition-all duration-300 glow-hover inline-block">
                Start Your Project
              </Link>
            </div>
          </div>
        </section>

        {/* Why Partner with Us */}
        <section className="py-20 bg-radial">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-6">Why Partner with Us</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-[#161B22] rounded-xl p-8 border border-[#30363D] card-scale">
                <div className="w-14 h-14 gradient-bg rounded-lg flex items-center justify-center mb-6">
                  <i className='bx bx-bulb text-2xl'></i>
                </div>
                <h3 className="text-xl font-poppins font-semibold mb-4">Tailored Expertise</h3>
                <p className="text-[#8B949E]">
                  We immerse ourselves in your industry—whether it's food production, healthcare, or technology—to deliver precisely the features you need.
                </p>
              </div>
              
              <div className="bg-[#161B22] rounded-xl p-8 border border-[#30363D] card-scale">
                <div className="w-14 h-14 gradient-bg rounded-lg flex items-center justify-center mb-6">
                  <i className='bx bx-conversation text-2xl'></i>
                </div>
                <h3 className="text-xl font-poppins font-semibold mb-4">Transparent Collaboration</h3>
                <p className="text-[#8B949E]">
                  Agile sprints, regular demos, and clear milestones mean you always know where your project stands.
                </p>
              </div>
              
              <div className="bg-[#161B22] rounded-xl p-8 border border-[#30363D] card-scale">
                <div className="w-14 h-14 gradient-bg rounded-lg flex items-center justify-center mb-6">
                  <i className='bx bx-support text-2xl'></i>
                </div>
                <h3 className="text-xl font-poppins font-semibold mb-4">Local & Responsive</h3>
                <p className="text-[#8B949E]">
                  Based in Rohnert Park with clients in Boise and beyond, we offer personal attention with the capabilities of a global firm.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-6">Frequently Asked Questions</h2>
              <p className="text-[#8B949E] text-lg">
                Common questions about our process and approach.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto divide-y divide-[#30363D]">
              {[
                {
                  question: "How long does a typical project take?",
                  answer: "Project timelines vary based on scope and complexity. A standard website may take 4-8 weeks, while more complex web applications or AI implementations might require 8-16 weeks or more. We'll provide a detailed timeline during the discovery phase."
                },
                {
                  question: "What involvement is required from my team?",
                  answer: "We aim to minimize the demands on your time while ensuring your vision is fully realized. Key touchpoints include the initial discovery session, feedback on designs and prototypes, content provision, and milestone approvals. We'll establish clear communication channels and expectations at the project start."
                },
                {
                  question: "How do you handle changes during the project?",
                  answer: "We understand that requirements may evolve. Minor changes can often be accommodated within the project scope. For significant changes, we'll discuss the impact on timeline and budget before proceeding. Our agile approach allows for flexibility while maintaining project integrity."
                },
                {
                  question: "What happens after the project launches?",
                  answer: "We provide a 30-day warranty period after launch to address any issues. For ongoing support, we offer various maintenance plans to ensure your solution remains secure, optimized, and up-to-date. We're also available for future enhancements and expansions."
                }
              ].map((faq, index) => (
                <div key={index} className="py-8">
                  <h3 className="text-xl font-poppins font-semibold mb-4">{faq.question}</h3>
                  <p className="text-[#8B949E]">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ProcessPage;
