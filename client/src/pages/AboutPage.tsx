import { useEffect } from 'react';
import { Link } from 'wouter';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const team = [
  {
    name: "John Smith",
    title: "Founder & CEO",
    bio: "With over 15 years of experience in web development and digital strategy, John founded Digital Studio Labs to help businesses leverage technology for growth.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
  },
  {
    name: "Sarah Johnson",
    title: "Lead Designer",
    bio: "Sarah brings a perfect blend of creativity and user-centered thinking to every project, ensuring our designs are both beautiful and effective.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
  },
  {
    name: "Michael Thompson",
    title: "Technical Director",
    bio: "With expertise in both frontend and backend technologies, Michael ensures our technical implementations are robust, scalable, and future-proof.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
  },
  {
    name: "Emily Wilson",
    title: "AI Solutions Specialist",
    bio: "Emily specializes in implementing cutting-edge AI solutions that automate processes and create personalized user experiences.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80"
  }
];

const AboutPage = () => {
  useEffect(() => {
    document.title = 'About Us | Digital Studio Labs';
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
                About <span className="gradient-text-animated gradient-text-glow">Digital Studio Labs</span>
              </h1>
              <p className="text-xl text-[#8B949E] mb-6">
                Passionate About Creating Exceptional Software
              </p>
            </div>
          </div>
          
          {/* Background Decoration */}
          <div className="ambient-glow absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-10 bg-[#4D4DFF]"></div>
        </section>

        {/* Our Story */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-[#161B22] rounded-xl p-8 md:p-12 border border-[#30363D] mb-12">
                <h2 className="text-3xl font-poppins font-bold mb-6">Our Story</h2>
                <p className="text-[#8B949E] mb-6">
                  At Digital Studio Labs, we believe that exceptional software is more than just code—it's a strategic asset designed around your unique business goals. We're a dynamic team of software developers, designers, and data experts dedicated to delivering tailored solutions that simplify complexity and empower innovation.
                </p>
                <p className="text-[#8B949E] mb-6">
                  Our approach combines strategic thinking, creative design, and technical excellence to create digital solutions that not only impress visually but drive growth, generate leads, and improve operational efficiency.
                </p>
                <p className="text-[#8B949E]">
                  Today, we're proud to work with businesses across multiple industries, helping them transform their digital presence and achieve their business objectives.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                <div>
                  <h2 className="text-3xl font-poppins font-bold mb-6">Our Mission</h2>
                  <p className="text-[#8B949E]">
                    To empower businesses with custom digital solutions that deliver real, measurable results and provide exceptional return on investment.
                  </p>
                </div>
                <div>
                  <h2 className="text-3xl font-poppins font-bold mb-6">Why Choose Digital Studio Labs?</h2>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <i className='bx bx-check-circle text-[#00A0B0] mr-2 text-xl'></i>
                      <span><strong>Customized Solutions:</strong> Every solution is thoughtfully tailored specifically to your unique challenges and goals.</span>
                    </li>
                    <li className="flex items-start">
                      <i className='bx bx-check-circle text-[#00A0B0] mr-2 text-xl'></i>
                      <span><strong>Unmatched Expertise:</strong> Our team blends deep technical knowledge with strategic insight to deliver solutions that genuinely add value.</span>
                    </li>
                    <li className="flex items-start">
                      <i className='bx bx-check-circle text-[#00A0B0] mr-2 text-xl'></i>
                      <span><strong>Dedicated Partnership:</strong> We treat your project as if it were our own, ensuring proactive communication, reliable execution, and genuine commitment to your long-term success.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 bg-radial relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-6">Meet Our Team</h2>
              <p className="text-[#8B949E] text-lg">
                The experts behind Digital Studio Labs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div key={index} className="bg-[#161B22] rounded-xl overflow-hidden border border-[#30363D] card-scale">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-poppins font-semibold">{member.name}</h3>
                    <p className="text-[#00A0B0] mb-4">{member.title}</p>
                    <p className="text-[#8B949E] text-sm">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Background Decoration */}
          <div className="ambient-glow absolute bottom-1/4 -left-20 w-96 h-96 rounded-full opacity-10 bg-[#00A0B0]"></div>
        </section>

        {/* Values */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-6">Our Values</h2>
              <p className="text-[#8B949E] text-lg">
                Guiding principles that define our work and relationships.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: "bx-target-lock",
                  title: "Results-Focused",
                  description: "We measure success by the outcomes we deliver for our clients."
                },
                {
                  icon: "bx-star",
                  title: "Excellence",
                  description: "We maintain the highest standards in everything we do."
                },
                {
                  icon: "bx-bulb",
                  title: "Innovation",
                  description: "We continuously explore new technologies and approaches."
                },
                {
                  icon: "bx-conversation",
                  title: "Transparency",
                  description: "We maintain open, honest communication with our clients."
                },
                {
                  icon: "bx-group",
                  title: "Collaboration",
                  description: "We work closely with our clients to ensure their success."
                },
                {
                  icon: "bx-trending-up",
                  title: "Continuous Improvement",
                  description: "We're always learning and refining our process."
                }
              ].map((value, index) => (
                <div key={index} className="bg-[#161B22] rounded-xl p-8 border border-[#30363D] card-scale">
                  <div className="w-14 h-14 gradient-bg rounded-lg flex items-center justify-center mb-6">
                    <i className={`bx ${value.icon} text-2xl`}></i>
                  </div>
                  <h3 className="text-xl font-poppins font-semibold mb-4">{value.title}</h3>
                  <p className="text-[#8B949E]">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-radial">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#161B22] rounded-xl p-8 md:p-12 lg:p-16 relative overflow-hidden">
              <div className="relative z-10 max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-6">Together, Let's Create Something Extraordinary</h2>
                <p className="text-[#8B949E] text-lg mb-10">
                  Ready to discuss how our expertise can transform your digital presence?
                </p>
                <Link href="/contact" className="gradient-bg gradient-bg-hover px-8 py-4 rounded-md font-medium text-lg transition-all duration-300 glow-hover inline-block">
                  Get In Touch
                </Link>
              </div>
              
              {/* Background Decoration */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-[#4D4DFF]"></div>
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

export default AboutPage;
