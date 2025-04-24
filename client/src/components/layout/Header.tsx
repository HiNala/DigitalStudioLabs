import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { NAV_LINKS, COMPANY_NAME } from '@/lib/constants';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  return (
    <header className={`fixed w-full top-0 z-50 backdrop-blur-md bg-[#0D1117]/90 dark:bg-[#0D1117]/90 light:bg-white/90 border-b border-[#30363D] dark:border-[#30363D] light:border-gray-200 transition-all duration-300 ${
      isScrolled ? 'py-3' : 'py-4'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-poppins font-bold gradient-text-animated dark:text-white light:text-gray-900">{COMPANY_NAME}</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.path}
                href={link.path} 
                className={`hover:text-[#00A0B0] font-medium transition-colors ${
                  isActive(link.path) 
                    ? 'text-[#E6EDF3] dark:text-[#E6EDF3] light:text-gray-900 active-nav' 
                    : 'text-[#8B949E] dark:text-[#8B949E] light:text-gray-700'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          
          {/* Theme Toggle + CTA Button (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Link 
              href="/contact" 
              className="gradient-bg gradient-bg-hover px-5 py-2 rounded-md font-medium transition-all duration-300 glow-hover inline-block"
            >
              Get in Touch
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <ThemeToggle />
            <button 
              onClick={toggleMenu}
              className="text-[#E6EDF3] dark:text-[#E6EDF3] light:text-gray-900 focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              <i className={`bx ${isMenuOpen ? 'bx-x' : 'bx-menu'} text-3xl`}></i>
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-[#0D1117] dark:bg-[#0D1117] light:bg-white rounded-lg mt-2 p-4 border border-[#30363D] dark:border-[#30363D] light:border-gray-200`}>
          <nav className="flex flex-col space-y-4">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.path}
                href={link.path} 
                onClick={handleLinkClick}
                className={`hover:text-[#00A0B0] font-medium ${
                  isActive(link.path) 
                    ? 'text-[#E6EDF3] dark:text-[#E6EDF3] light:text-gray-900' 
                    : 'text-[#8B949E] dark:text-[#8B949E] light:text-gray-700'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href="/contact" 
              onClick={handleLinkClick}
              className="gradient-bg gradient-bg-hover px-4 py-2 rounded-md font-medium text-center transition-all duration-300"
            >
              Get in Touch
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
