import { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import { PORTFOLIO_PROJECTS, PORTFOLIO_CATEGORIES } from '@/lib/constants';

const PortfolioSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleProjects, setVisibleProjects] = useState(PORTFOLIO_PROJECTS);

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
    <section id="portfolio" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-6">Our Featured Work</h2>
          <p className="text-[#8B949E] text-lg">
            Explore our portfolio of successful projects and transformative solutions.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in">
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
          {visibleProjects.map((project, index) => (
            <div 
              key={project.id}
              className="bg-[#161B22] rounded-xl overflow-hidden border border-[#30363D] card-scale animate-fade-in group"
              style={{ transitionDelay: `${index * 100}ms` }}
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
        
        <div className="text-center mt-12 animate-fade-in">
          <Link href="/portfolio" className="bg-[#161B22] hover:bg-[#30363D] px-8 py-4 rounded-md font-medium transition-all duration-300 inline-block">
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
