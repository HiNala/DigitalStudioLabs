import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { PORTFOLIO_PROJECTS, PORTFOLIO_CATEGORIES } from '@/lib/constants';
import { Link } from 'wouter';

const PortfolioPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleProjects, setVisibleProjects] = useState(PORTFOLIO_PROJECTS);

  useEffect(() => {
    document.title = 'Portfolio | Digital Studio Labs';
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (activeCategory === 'All') {
      setVisibleProjects(PORTFOLIO_PROJECTS);
    } else {
      setVisibleProjects(
        PORTFOLIO_PROJECTS.filter(project => project.category === activeCategory)
      );
    }
  }, [activeCategory]);

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-radial relative overflow-hidden py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-6">
                Our <span className="gradient-text-animated gradient-text-glow">Portfolio</span>
              </h1>
              <p className="text-xl text-[#8B949E] mb-6">
                Explore our work and the results we've delivered for our clients.
              </p>
            </div>
          </div>
          
          {/* Background Decoration */}
          <div className="ambient-glow absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-10 bg-[#4D4DFF]"></div>
        </section>

        {/* Portfolio */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {PORTFOLIO_CATEGORIES.map((category, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-md bg-[#161B22] border ${
                    activeCategory === category 
                      ? 'border-[#00A0B0]' 
                      : 'border-[#30363D] hover:border-[#00A0B0]'
                  } transition-colors`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visibleProjects.map((project) => (
                <div 
                  key={project.id}
                  className="bg-[#161B22] rounded-xl overflow-hidden border border-[#30363D] card-scale group"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-6">
                        <h3 className="text-xl font-poppins font-semibold text-white">{project.title}</h3>
                        <p className="text-[#8B949E]">{project.summary}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        {project.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="text-xs bg-[#30363D]/50 px-3 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Link href={`/portfolio/${project.id}`} className="text-[#00A0B0] hover:text-[#4D4DFF] transition-colors">
                        <i className='bx bx-link-external'></i>
                      </Link>
                    </div>
                  </div>
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
                <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-6">Ready to Create Your Success Story?</h2>
                <p className="text-[#8B949E] text-lg mb-10">
                  Let's discuss how we can deliver similar results for your business.
                </p>
                <Link href="/contact" className="gradient-bg gradient-bg-hover px-8 py-4 rounded-md font-medium text-lg transition-all duration-300 glow-hover inline-block">
                  Start Your Project
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

export default PortfolioPage;
