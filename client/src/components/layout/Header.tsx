import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { NAV_LINKS } from '@/lib/constants';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { AnimatePresence, motion } from "framer-motion";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [pathname] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 5) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
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
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "py-3 dark:bg-black/80 bg-white/70 backdrop-blur-lg" 
          : "py-5 dark:bg-black/20 bg-white/30 backdrop-blur-sm"
      }`}
    >
      <div className="w-full px-0 sm:px-1">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0 pl-6">
            <Link href="/" className="flex items-center justify-center">
              <span className="text-4xl font-poppins font-bold gradient-text-animated gradient-text-glow">DSL</span>
            </Link>
          </div>
          
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
          <div className="hidden md:flex items-center space-x-5 pr-4">
            <ThemeToggle />
            <Link 
                href="/contact" 
                className="gradient-bg gradient-bg-hover px-5 py-2 rounded-md font-medium transition-all duration-300 glow-hover"
              >
                <span className="gradient-text-glow">Get in Touch</span>
              </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4 pr-4">
            <ThemeToggle />
            <button 
              onClick={toggleMenu}
              className="dark:text-[#E6EDF3] light:text-gray-900 focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              <i className={`bx ${isMenuOpen ? 'bx-x' : 'bx-menu'} text-3xl`}></i>
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden"
            >
              <div className="container py-4 dark:bg-black/80 bg-white/70 backdrop-blur-lg">
                <nav className="flex flex-col space-y-4">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.path}
                      href={link.path}
                      onClick={handleLinkClick}
                      className={`block py-2 ${
                        pathname === link.path
                          ? 'text-primary font-medium'
                          : 'text-foreground/80 hover:text-primary'
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <Link 
                      href="/contact" 
                      onClick={handleLinkClick}
                      className="gradient-bg gradient-bg-hover w-full text-center py-3 px-4 rounded-md font-medium transition-all duration-300 glow-hover mt-2 block"
                    >
                      <span className="gradient-text-glow">Get in Touch</span>
                    </Link>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
