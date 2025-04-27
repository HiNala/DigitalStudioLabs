import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { NAV_LINKS } from '@/lib/constants';
import { LightPullThemeSwitcher } from '@/components/ui/light-pull-theme-switcher';
import StarButton from '@/components/ui/star-button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [pathname] = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 5) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Toggle body scroll lock
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-[9999] transition-all duration-300 ${
          isScrolled 
            ? "py-3 dark:bg-black/80 bg-white/70 backdrop-blur-lg" 
            : "py-5 dark:bg-black/20 bg-white/30 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center justify-center">
              <span className="text-4xl font-poppins font-bold gradient-text-animated gradient-text-glow">DSL</span>
            </Link>
            
            {/* Desktop Navigation - Centered */}
            <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-10">
              {NAV_LINKS.map((link) => (
                <Link 
                  key={link.path}
                  href={link.path} 
                  className={`hover:text-[#00A0B0] font-medium transition-colors ${
                    isActive(link.path) 
                      ? 'dark:text-[#E6EDF3] light:text-gray-900 active-nav' 
                      : 'dark:text-[#8B949E] light:text-gray-700'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            
            {/* CTA Button + Theme Toggle (Desktop) */}
            <div className="hidden md:flex items-center space-x-5">
              <div className="mt-4 mr-5">
                <LightPullThemeSwitcher />
              </div>
              <StarButton href="/contact" size="sm">
                Get in Touch
              </StarButton>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center">
              <div className="mr-6">
                <LightPullThemeSwitcher />
              </div>
              <button 
                onClick={toggleMenu}
                className="w-10 h-10 flex flex-col justify-center items-center focus:outline-none"
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                <span 
                  className="block w-6 h-0.5 bg-black dark:bg-white transition-all duration-300 ease-in-out"
                  style={{
                    transform: isMenuOpen ? 'translateY(6px) rotate(45deg)' : 'none'
                  }}
                ></span>
                <span 
                  className="block w-6 h-0.5 bg-black dark:bg-white my-1 transition-all duration-300 ease-in-out"
                  style={{
                    opacity: isMenuOpen ? 0 : 1
                  }}
                ></span>
                <span 
                  className="block w-6 h-0.5 bg-black dark:bg-white transition-all duration-300 ease-in-out"
                  style={{
                    transform: isMenuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none'
                  }}
                ></span>
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Simple Fullscreen Mobile Menu */}
      {isMenuOpen && (
        <>
          {/* Menu Panel */}
          <div 
            className="fixed top-[70px] right-0 bottom-0 w-4/5 max-w-xs z-[9999] bg-white dark:bg-[#0D1117] border-l dark:border-[#30363D] border-gray-200 shadow-2xl px-6 py-8 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            ref={menuRef}
          >
            <nav className="flex flex-col space-y-6 mb-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={handleLinkClick}
                  className={`flex items-center py-3 px-4 rounded-md transition-all ${
                    isActive(link.path)
                      ? 'bg-gradient-to-r from-[#00A0B0]/20 to-[#4D4DFF]/20 dark:text-[#00A0B0] light:text-[#00A0B0] font-medium'
                      : 'dark:text-[#8B949E] light:text-gray-700 hover:bg-gradient-to-r hover:from-[#00A0B0]/10 hover:to-[#4D4DFF]/10'
                  }`}
                >
                  <span className={`mr-3 text-xl ${isActive(link.path) ? 'dark:text-[#00A0B0] light:text-[#00A0B0]' : 'dark:text-[#8B949E] light:text-gray-500'}`}>
                    {link.name === 'Home' && <i className='bx bx-home'></i>}
                    {link.name === 'Services' && <i className='bx bx-layer'></i>}
                    {link.name === 'About' && <i className='bx bx-info-circle'></i>}
                    {link.name === 'Process' && <i className='bx bx-git-branch'></i>}
                    {link.name === 'Blog' && <i className='bx bx-news'></i>}
                    {link.name === 'Contact' && <i className='bx bx-envelope'></i>}
                  </span>
                  <span className="text-lg">{link.name}</span>
                </Link>
              ))}
            </nav>
            
            <div className="pt-6 border-t dark:border-[#30363D] border-gray-200">
              <StarButton 
                href="/contact" 
                onClick={handleLinkClick}
                className="w-full text-center block"
                size="md"
              >
                Get in Touch
              </StarButton>
              
              <div className="mt-8 text-center">
                <p className="dark:text-[#8B949E] text-gray-500 text-sm">
                  © {new Date().getFullYear()} Digital Studio Labs
                </p>
              </div>
            </div>
          </div>
          
          {/* Glassmorphism overlay */}
          <div 
            className="fixed inset-0 z-[9998] md:hidden dark:bg-black/40 bg-white/30 backdrop-blur-lg" 
            onClick={toggleMenu}
            aria-hidden="true"
            style={{
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)'
            }}
          />
        </>
      )}
    </>
  );
};

export default Header;
