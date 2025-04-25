import { useEffect } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Check, Star, LightbulbIcon, MessageSquare, Users, TrendingUp } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { SpotlightLayout } from '@/components/layout/SpotlightLayout';
import StarButton from '@/components/ui/star-button';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { FloatingOrbs } from '@/components/ui/floating-orbs';

const team = [
  {
    name: "Alex Permut",
    title: "Founder & CEO",
    bio: "Visionary leader with 15+ years of experience transforming businesses through innovative digital solutions and strategic technology implementations.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
  },
  {
    name: "Brian Permut",
    title: "CTO & Technical Director",
    bio: "Engineering mastermind behind our most complex solutions, Brian crafts scalable architectures and drives technical excellence across all projects.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
  },
  {
    name: "Romano Mittani",
    title: "Lead Designer",
    bio: "Award-winning designer uniting aesthetic brilliance with UX strategy to create immersive digital experiences that captivate and convert.",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
  },
  {
    name: "Julian Frost",
    title: "AI & Innovation Director",
    bio: "Leading our AI initiatives with cutting-edge expertise in machine learning, data science, and developing intelligent solutions that transform businesses.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
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
        {/* Floating Orbs Background - Spans entire page */}
        <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none">
          <FloatingOrbs 
            count={12}
            colors={['#4D4DFF', '#00A0B0']}
            minSize={100}
            maxSize={400}
            minSpeed={0.1}
            maxSpeed={0.3}
            minOpacity={0.03}
            maxOpacity={0.08}
          />
        </div>
        
        {/* Hero */}
        <SpotlightLayout
          className="relative overflow-hidden py-20 md:py-28"
          spotlightColor="rgba(77, 77, 255, 0.15)"
          spotlightSize={500}
          withMultipleSpotlights={true}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-poppins font-bold mb-8">
                About <span className="gradient-text-animated gradient-text-glow">Digital Studio Labs</span>
              </h1>
              <p className="text-xl md:text-2xl text-[#8B949E] mb-8">
                We craft digital experiences that<br/>transform businesses and inspire users
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <StarButton href="#our-story" size="md">
                  Our Story
                </StarButton>
                <StarButton href="#meet-our-team" size="md" className="bg-transparent border border-white/30">
                  Meet Our Team
                </StarButton>
              </div>
            </motion.div>
          </div>
        </SpotlightLayout>

        {/* Our Story */}
        <section id="our-story" className="py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="rounded-2xl relative">
                <div className="absolute inset-0 rounded-2xl opacity-50" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(77, 77, 255, 0.15), transparent 60%)' }}></div>
                <motion.div 
                  className="bg-[#161B22]/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-[#30363D] mb-16 relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                >
                  <div className="absolute -top-10 right-10 w-20 h-20 bg-gradient-to-br from-[#4D4DFF] to-[#00A0B0] rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white text-3xl font-bold">DSL</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-8 inline-block gradient-text">Our Story</h2>
                  <div className="text-lg space-y-6">
                    <p className="text-[#8B949E]">
                      <span className="text-white">Digital Studio Labs</span> was born from a simple yet powerful idea: <span className="text-white">exceptional software should transform businesses</span>, not just serve them. Founded in Boise, Idaho by the Permut brothers, we've assembled a team of digital craftspeople who blend artistry, technology, and business strategy to create digital experiences that inspire and perform.
                    </p>
                    <p className="text-[#8B949E]">
                      Our journey began with a focus on custom web applications that went beyond expectations. Today, we've evolved into a full-service digital studio that bridges the gap between <span className="text-white">cutting-edge technology and practical business solutions</span>. From immersive web experiences to intelligent AI implementations, we create digital assets that become powerful tools for growth.
                    </p>
                    <p className="text-[#8B949E]">
                      What sets us apart isn't just technical expertise, but our <span className="text-white">deep commitment to understanding each client's unique goals</span>. We embrace complexity, transforming challenging requirements into elegant, intuitive solutions that drive measurable results across industries from healthcare to fintech, retail to professional services.
                    </p>
                  </div>
                </motion.div>
              </div>
              
              <div className="mb-24 relative">
                <div className="bg-gradient-to-r from-transparent via-[#4D4DFF]/10 to-transparent h-px w-full absolute top-0 left-0"></div>
                
                <motion.div 
                  className="max-w-4xl mx-auto py-16"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-8 gradient-text inline-block">Our Mission</h2>
                    <div className="text-lg space-y-6 max-w-3xl mx-auto">
                      <p className="text-[#8B949E]">
                        To elevate businesses through <span className="text-white">transformative digital experiences</span> that combine technical excellence with strategic insight—creating solutions that don't just meet expectations but redefine them.
                      </p>
                      <p className="text-[#8B949E]">
                        We measure our success not by the complexity of our work, but by the <span className="text-white">tangible growth</span> and <span className="text-white">measurable outcomes</span> we generate for our partners.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-20">
                    <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-8 gradient-text text-center">Why Choose Us</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      >
                        <h3 className="text-2xl font-semibold text-white mb-4">Strategic Innovation</h3>
                        <p className="text-[#8B949E] text-lg">
                          We don't just build what you ask for—we collaborate to discover what your business truly needs to excel. Our approach transforms challenges into opportunities for growth and differentiation.
                        </p>
                      </motion.div>
                      
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <h3 className="text-2xl font-semibold text-white mb-4">Technical Excellence</h3>
                        <p className="text-[#8B949E] text-lg">
                          Our solutions are crafted with meticulous attention to detail, scalability, and future-proof architecture. We leverage cutting-edge technologies to deliver robust, high-performance systems.
                        </p>
                      </motion.div>
                      
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        <h3 className="text-2xl font-semibold text-white mb-4">Transformative Results</h3>
                        <p className="text-[#8B949E] text-lg">
                          The digital assets we create become pivotal tools for growth, user engagement, and operational efficiency. We focus on delivering measurable outcomes that align with your business objectives.
                        </p>
                      </motion.div>
                      
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        <h3 className="text-2xl font-semibold text-white mb-4">Collaborative Partnership</h3>
                        <p className="text-[#8B949E] text-lg">
                          We view ourselves as an extension of your team, bringing our expertise and creativity to the table while respecting your vision and business goals throughout the entire process.
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
                
                <div className="bg-gradient-to-r from-transparent via-[#00A0B0]/10 to-transparent h-px w-full absolute bottom-0 left-0"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section id="meet-our-team" className="py-24 relative overflow-hidden">
          <SpotlightLayout
            className="relative"
            spotlightColor="rgba(0, 160, 176, 0.15)"
            spotlightSize={500}
            withMultipleSpotlights={true}
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <motion.div 
                className="max-w-3xl mx-auto text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-6">
                  Meet Our <span className="gradient-text">Leadership Team</span>
                </h2>
                <p className="text-[#8B949E] text-lg max-w-2xl mx-auto">
                  Passionate experts combining technical mastery, creative vision, and business acumen to deliver transformative digital solutions.
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {team.map((member, index) => (
                  <motion.div 
                    key={index} 
                    className="bg-[#161B22]/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-[#30363D] card-scale"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ 
                      y: -10, 
                      boxShadow: "0 10px 30px -15px rgba(77, 77, 255, 0.3)",
                      borderColor: "rgba(77, 77, 255, 0.3)"
                    }}
                  >
                    <div className="relative">
                      <div className="aspect-square overflow-hidden relative">
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] to-transparent opacity-70"></div>
                      </div>
                      <div className="absolute bottom-0 left-0 w-full p-6">
                        <h3 className="text-2xl font-poppins font-semibold text-white">{member.name}</h3>
                        <p className="gradient-text text-lg">{member.title}</p>
                      </div>
                    </div>
                    <div className="p-6 pt-4">
                      <p className="text-[#8B949E]">{member.bio}</p>
                      <div className="flex gap-2 mt-4">
                        <div className="w-8 h-8 bg-[#30363D]/50 rounded-full flex items-center justify-center hover:bg-[#4D4DFF]/30 transition-colors cursor-pointer">
                          <i className="bx bxl-linkedin text-white"></i>
                        </div>
                        <div className="w-8 h-8 bg-[#30363D]/50 rounded-full flex items-center justify-center hover:bg-[#4D4DFF]/30 transition-colors cursor-pointer">
                          <i className="bx bxl-twitter text-white"></i>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <p className="text-[#8B949E] text-lg mb-4">Want to join our growing team?</p>
                <StarButton href="/contact" size="md">
                  View Open Positions
                </StarButton>
              </motion.div>
            </div>

          </SpotlightLayout>
        </section>

        {/* Values */}
        <section className="py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="max-w-3xl mx-auto text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-6">
                Our <span className="gradient-text">Core Values</span>
              </h2>
              <p className="text-[#8B949E] text-lg max-w-2xl mx-auto">
                These foundational principles guide every decision we make and shape how we approach every project and relationship.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: <div className="w-16 h-16 bg-gradient-to-br from-[#4D4DFF]/80 to-[#00A0B0]/80 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <Star className="h-8 w-8 text-white" />
                  </div>,
                  title: "Excellence Without Compromise",
                  description: "We hold ourselves to rigorous standards, constantly raising the bar to deliver solutions that exceed expectations in every dimension."
                },
                {
                  icon: <div className="w-16 h-16 bg-gradient-to-br from-[#00A0B0]/80 to-[#4D4DFF]/80 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <LightbulbIcon className="h-8 w-8 text-white" />
                  </div>,
                  title: "Boundless Innovation",
                  description: "We actively pursue new ideas, technologies, and methodologies to solve complex challenges and create transformative experiences."
                },
                {
                  icon: <div className="w-16 h-16 bg-gradient-to-br from-[#4D4DFF]/80 to-[#00A0B0]/80 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <Users className="h-8 w-8 text-white" />
                  </div>,
                  title: "Client Partnership",
                  description: "We view ourselves as an extension of your team, aligning our success with yours and investing deeply in understanding your goals."
                },
                {
                  icon: <div className="w-16 h-16 bg-gradient-to-br from-[#00A0B0]/80 to-[#4D4DFF]/80 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <MessageSquare className="h-8 w-8 text-white" />
                  </div>,
                  title: "Radical Transparency",
                  description: "We believe in open, honest communication at every stage, creating trust through visibility into our processes and decisions."
                },
                {
                  icon: <div className="w-16 h-16 bg-gradient-to-br from-[#4D4DFF]/80 to-[#00A0B0]/80 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <Check className="h-8 w-8 text-white" />
                  </div>,
                  title: "Measurable Impact",
                  description: "We focus relentlessly on outcomes that matter—increased efficiency, enhanced engagement, and tangible business growth."
                },
                {
                  icon: <div className="w-16 h-16 bg-gradient-to-br from-[#00A0B0]/80 to-[#4D4DFF]/80 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>,
                  title: "Perpetual Growth",
                  description: "We embrace continuous learning and improvement, constantly evolving our skills and methodologies to stay at the leading edge."
                }
              ].map((value, index) => (
                <motion.div 
                  key={index} 
                  className="bg-[#161B22]/80 backdrop-blur-sm rounded-2xl p-8 border border-[#30363D] relative overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ 
                    y: -5, 
                    boxShadow: "0 10px 30px -15px rgba(77, 77, 255, 0.2)",
                    borderColor: "rgba(77, 77, 255, 0.3)"
                  }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#4D4DFF]/5 to-[#00A0B0]/5 rounded-full -mr-10 -mt-10"></div>
                  {value.icon}
                  <h3 className="text-xl font-poppins font-semibold mb-4 text-white">{value.title}</h3>
                  <p className="text-[#8B949E]">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <SpotlightLayout
          className="py-24 relative"
          spotlightColor="rgba(77, 77, 255, 0.15)"
          spotlightSize={600}
          withMultipleSpotlights={true}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="bg-[#161B22]/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 lg:p-16 relative overflow-hidden border border-[#30363D]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative z-10 max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-8">
                  Let's Create Your <span className="gradient-text-animated gradient-text-glow">Digital Future</span>
                </h2>
                <p className="text-[#8B949E] text-lg md:text-xl mb-12 max-w-2xl mx-auto">
                  Ready to transform your digital presence with cutting-edge technology and innovative design? Our team of experts is ready to bring your vision to life.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <StarButton href="/contact" size="lg">
                    Start Your Project
                  </StarButton>
                  <StarButton href="/portfolio" size="lg" className="bg-transparent border border-white/30">
                    Explore Our Work
                  </StarButton>
                </div>
              </div>
              

            </motion.div>
          </div>
        </SpotlightLayout>
      </main>
      <Footer />
    </>
  );
};

export default AboutPage;
