import { useState, useRef, useEffect, ReactNode } from "react";
import { motion, AnimatePresence, Variant, Transition, useInView } from "framer-motion";
import { Filter, Code, Laptop, Smartphone, Palette, Database, Server } from "lucide-react";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { PORTFOLIO_PROJECTS } from '@/lib/constants';
import { Link } from 'wouter';
import { cn } from "@/lib/utils";

// Types
interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  tags: string[];
  summary: string;
  featured?: boolean;
}

interface InViewProps {
  children: ReactNode;
  variants?: {
    hidden: Variant;
    visible: Variant;
  };
  transition?: Transition;
  viewOptions?: any;
}

// InView Component
function InView({
  children,
  variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  transition,
  viewOptions,
}: InViewProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, viewOptions);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}

// ProjectCard Component
const ProjectCard = ({ project }: { project: Project }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-lg",
        project.featured ? "md:col-span-2 row-span-2" : ""
      )}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-full bg-[#161B22] border border-[#30363D] overflow-hidden rounded-xl">
        <div className="relative overflow-hidden aspect-video">
          <img
            src={project.image}
            alt={project.title}
            className="object-cover w-full h-full transition-transform duration-500 ease-in-out"
            style={{
              transform: isHovered ? "scale(1.05)" : "scale(1)",
            }}
          />
          <div 
            className="absolute inset-0 bg-gradient-to-t from-[#0D1117]/90 to-transparent flex items-end p-6 transition-opacity duration-300"
            style={{
              opacity: isHovered ? 1 : 0,
            }}
          >
            <div className="text-white">
              <h3 className="text-xl font-bold font-poppins">{project.title}</h3>
              <p className="text-sm mt-2 text-[#8B949E]">{project.summary}</p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-poppins font-semibold">{project.title}</h3>
            {project.featured && (
              <span className="text-xs bg-gradient-to-r from-[#00A0B0] to-[#4D4DFF] text-white px-3 py-1 rounded-full ml-2">
                Featured
              </span>
            )}
          </div>
          <p className="text-[#8B949E] mt-2 line-clamp-2">{project.summary}</p>
        
          <div className="flex justify-between items-center mt-6">
            <div className="flex gap-2 flex-wrap">
              {project.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-xs bg-[#30363D]/50 px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
              {project.tags.length > 3 && (
                <span className="text-xs bg-[#30363D]/50 px-3 py-1 rounded-full">
                  +{project.tags.length - 3}
                </span>
              )}
            </div>
            <Link 
              href={`/portfolio/${project.id}`} 
              className="text-[#00A0B0] hover:text-[#4D4DFF] transition-colors"
            >
              <i className='bx bx-link-external'></i>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// FeaturedProject Component
const FeaturedProject = ({ project }: { project: Project }) => {
  return (
    <div className="bg-[#161B22] overflow-hidden border border-[#30363D] rounded-xl">
      <div className="grid md:grid-cols-2 gap-0">
        <div className="relative aspect-square md:aspect-auto overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="p-8 flex flex-col justify-between">
          <div>
            <span className="inline-block px-3 py-1 text-sm bg-gradient-to-r from-[#00A0B0] to-[#4D4DFF] text-white rounded-full mb-4">
              Featured Project
            </span>
            <h3 className="text-2xl md:text-3xl font-poppins font-bold mb-3">{project.title}</h3>
            <p className="text-[#8B949E] text-base">{project.summary}</p>
            
            <div className="mt-8 grid grid-cols-2 gap-4">
              {project.tags.slice(0, 4).map((tag) => (
                <div key={tag} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#00A0B0]"></div>
                  <span className="text-sm text-[#8B949E]">{tag}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-8">
            <Link href={`/portfolio/${project.id}`} className="gradient-bg gradient-bg-hover px-6 py-3 rounded-md font-medium transition-all duration-300 glow-hover inline-block">
              View Case Study
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const PortfolioPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(
    PORTFOLIO_PROJECTS.map(p => ({
      ...p,
      description: p.summary,
      category: p.category,
      featured: p.id === 1 // Making the first project featured for demonstration
    }))
  );
  
  const categories = [
    { id: 'All', label: 'All Projects', icon: <Filter className="h-4 w-4" /> },
    { id: 'Websites', label: 'Websites', icon: <Laptop className="h-4 w-4" /> },
    { id: 'Web Apps', label: 'Web Apps', icon: <Code className="h-4 w-4" /> },
    { id: 'AI Solutions', label: 'AI Solutions', icon: <Server className="h-4 w-4" /> },
    { id: 'E-commerce', label: 'E-commerce', icon: <Database className="h-4 w-4" /> },
  ];
  
  const featuredProject = filteredProjects.find(project => project.featured);

  useEffect(() => {
    document.title = 'Portfolio | Digital Studio Labs';
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredProjects(
        PORTFOLIO_PROJECTS.map(p => ({
          ...p,
          description: p.summary,
          category: p.category,
          featured: p.id === 1
        }))
      );
    } else {
      setFilteredProjects(
        PORTFOLIO_PROJECTS
          .filter(project => project.category === activeCategory)
          .map(p => ({
            ...p,
            description: p.summary,
            category: p.category,
            featured: p.id === 1
          }))
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
                Transforming Ideas into Digital Excellence
              </p>
            </div>
          </div>
          
          {/* Background Decoration */}
          <div className="ambient-glow absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-10 bg-[#4D4DFF]"></div>
        </section>

        {/* Portfolio Introduction */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto prose prose-lg prose-invert">
              <p className="text-[#8B949E]">
                We're just getting started, and while our official case studies are forthcoming, 
                we've already laid the groundwork for transformative digital solutions that will 
                revolutionize how businesses operate and connect with their customers.
              </p>
              
              <div className="mt-10 space-y-8">
                <div className="bg-[#161B22] p-6 rounded-lg border border-[#30363D]">
                  <h3 className="text-xl font-poppins font-semibold mb-2">Concept-to-Completion Showcase</h3>
                  <p className="text-[#8B949E] m-0">
                    From initial wireframes to polished deployments, you'll see every milestone tracked—demonstrating our commitment to transparency and measurable outcomes.
                  </p>
                </div>
                
                <div className="bg-[#161B22] p-6 rounded-lg border border-[#30363D]">
                  <h3 className="text-xl font-poppins font-semibold mb-2">Future-Forward Technology</h3>
                  <p className="text-[#8B949E] m-0">
                    Our portfolio will showcase innovative applications across industries, illustrating our technical expertise in web development, AI integration, and custom software solutions.
                  </p>
                </div>
                
                <div className="bg-[#161B22] p-6 rounded-lg border border-[#30363D]">
                  <h3 className="text-xl font-poppins font-semibold mb-2">Your Success Story</h3>
                  <p className="text-[#8B949E] m-0">
                    As our partner, your project will become one of our signature case studies—highlighting the transformative impact of our collaborative work together.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {featuredProject && (
              <div className="mb-16">
                <h2 className="text-2xl font-bold font-poppins mb-6">Featured Project</h2>
                <FeaturedProject project={featuredProject} />
              </div>
            )}
            
            <div className="mb-12">
              <h2 className="text-2xl font-bold font-poppins mb-6">Our Projects</h2>
              
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                {categories.map((category) => (
                  <button 
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md border transition-colors ${
                      activeCategory === category.id 
                        ? 'border-[#00A0B0] bg-[#161B22]' 
                        : 'border-[#30363D] bg-[#161B22] hover:border-[#00A0B0]'
                    }`}
                  >
                    {category.icon}
                    <span className="hidden sm:inline">{category.label}</span>
                  </button>
                ))}
              </div>
              
              <InView
                viewOptions={{ once: true, margin: "0px 0px -200px 0px" }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1 },
                  },
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProjects.map((project) => (
                    <motion.div
                      key={project.id}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 },
                      }}
                    >
                      <ProjectCard project={project} />
                    </motion.div>
                  ))}
                </div>
              </InView>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-radial">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#161B22] rounded-xl p-8 md:p-12 lg:p-16 relative overflow-hidden">
              <div className="relative z-10 max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-6">Let's Create Your Digital Success Story</h2>
                <p className="text-[#8B949E] text-lg mb-10">
                  Partner with us to build innovative digital solutions that drive real business growth and transform your industry.
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
