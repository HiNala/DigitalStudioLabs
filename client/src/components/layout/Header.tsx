import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { NAV_LINKS } from '@/lib/constants';
import { LightPullThemeSwitcher } from '@/components/ui/light-pull-theme-switcher';
import { AnimatePresence, motion } from "framer-motion";
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
    
    // Prevent body scroll when menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Click outside to close menu
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
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
            <div className="mt-4 mr-5">
              <LightPullThemeSwitcher />
            </div>
            <StarButton href="/contact" size="sm">
              Get in Touch
            </StarButton>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4 pr-4">
            <div className="mt-4">
              <LightPullThemeSwitcher />
            </div>
            <button 
              onClick={toggleMenu}
              className="dark:text-[#E6EDF3] light:text-gray-900 focus:outline-none z-50 relative"
              aria-label="Toggle mobile menu"
            >
              <span className="sr-only">Menu</span>
              <div className="w-7 h-7 flex items-center justify-center">
                <motion.div
                  animate={isMenuOpen ? "open" : "closed"}
                  className="relative"
                >
                  <motion.span
                    variants={{
                      closed: { rotate: 0, y: 0 },
                      open: { rotate: 45, y: 6 },
                    }}
                    className="block absolute h-0.5 w-6 bg-current transform transition-transform duration-300"
                  />
                  <motion.span
                    variants={{
                      closed: { opacity: 1 },
                      open: { opacity: 0 },
                    }}
                    className="block absolute h-0.5 w-6 bg-current my-0.5 transform transition-opacity duration-300"
                  />
                  <motion.span
                    variants={{
                      closed: { rotate: 0, y: 0 },
                      open: { rotate: -45, y: -6 },
                    }}
                    className="block absolute h-0.5 w-6 bg-current transform transition-transform duration-300"
                  />
                </motion.div>
              </div>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 md:hidden z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
            />
          )}
        </AnimatePresence>
        
        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              ref={menuRef}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm md:hidden z-40 dark:bg-[#0D1117] light:bg-white shadow-2xl overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-20 flex items-center justify-end px-6">
                {/* Mobile menu header with logo */}
                <div className="flex-1 flex justify-start">
                  <span className="text-3xl font-poppins font-bold gradient-text-animated gradient-text-glow">DSL</span>
                </div>
              </div>
              
              <div className="p-6">
                <nav className="flex flex-col space-y-6">
                  {NAV_LINKS.map((link, index) => (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={link.path}
                        onClick={handleLinkClick}
                        className={`flex items-center py-2 px-4 rounded-md transition-all duration-200 ${
                          isActive(link.path)
                            ? 'dark:bg-[#161B22] light:bg-gray-100 dark:text-[#00A0B0] light:text-[#00A0B0] font-medium'
                            : 'dark:text-[#8B949E] light:text-gray-700 hover:dark:bg-[#161B22] hover:light:bg-gray-100'
                        }`}
                      >
                        <span className="mr-3 text-lg">
                          {link.name === 'Home' && <i className='bx bx-home'></i>}
                          {link.name === 'Services' && <i className='bx bx-layer'></i>}
                          {link.name === 'About' && <i className='bx bx-info-circle'></i>}
                          {link.name === 'Process' && <i className='bx bx-git-branch'></i>}
                          {link.name === 'Blog' && <i className='bx bx-news'></i>}
                          {link.name === 'Contact' && <i className='bx bx-envelope'></i>}
                        </span>
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: NAV_LINKS.length * 0.1 }}
                  className="mt-8 pt-6 border-t dark:border-[#30363D] light:border-gray-200"
                >
                  <StarButton 
                    href="/contact" 
                    onClick={handleLinkClick}
                    className="w-full text-center block"
                  >
                    Get in Touch
                  </StarButton>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: NAV_LINKS.length * 0.1 + 0.1 }}
                  className="mt-8 text-center"
                >
                  <p className="dark:text-[#8B949E] light:text-gray-500 text-sm">
                    © {new Date().getFullYear()} Digital Studio Labs
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
