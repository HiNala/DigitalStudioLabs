import { Link } from 'wouter';
import { 
  COMPANY_NAME, 
  COMPANY_EMAIL,
  NAV_LINKS 
} from '@/lib/constants';
import { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail('');
    // This would normally connect to a newsletter service
    alert('Thank you for subscribing to our newsletter!');
  };

  return (
    <footer className="bg-[#0D1117] border-t border-[#30363D]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Logo & About */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-poppins font-bold gradient-text">{COMPANY_NAME}</span>
            </Link>
            <p className="text-[#8B949E] mb-6">
              Premium web development and AI solutions for businesses that demand excellence.
            </p>
            <div className="flex space-x-4">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-[#8B949E] hover:text-white transition-colors">
                <i className='bx bxl-linkedin text-xl'></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-[#8B949E] hover:text-white transition-colors">
                <i className='bx bxl-twitter text-xl'></i>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-[#8B949E] hover:text-white transition-colors">
                <i className='bx bxl-facebook text-xl'></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-[#8B949E] hover:text-white transition-colors">
                <i className='bx bxl-instagram text-xl'></i>
              </a>
            </div>
          </div>
          
          {/* Column 2: Services */}
          <div>
            <h3 className="text-lg font-poppins font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              <li><Link href="/services" className="text-[#8B949E] hover:text-white transition-colors">Website Design</Link></li>
              <li><Link href="/services" className="text-[#8B949E] hover:text-white transition-colors">Web Applications</Link></li>
              <li><Link href="/services" className="text-[#8B949E] hover:text-white transition-colors">AI Integration</Link></li>
              <li><Link href="/services" className="text-[#8B949E] hover:text-white transition-colors">E-commerce</Link></li>
              <li><Link href="/services" className="text-[#8B949E] hover:text-white transition-colors">SEO & Lead Gen</Link></li>
            </ul>
          </div>
          
          {/* Column 3: Company */}
          <div>
            <h3 className="text-lg font-poppins font-semibold mb-6">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-[#8B949E] hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/portfolio" className="text-[#8B949E] hover:text-white transition-colors">Portfolio</Link></li>
              <li><Link href="/process" className="text-[#8B949E] hover:text-white transition-colors">Process</Link></li>
              <li><Link href="/blog" className="text-[#8B949E] hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="text-[#8B949E] hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-lg font-poppins font-semibold mb-6">Subscribe</h3>
            <p className="text-[#8B949E] mb-4">
              Get the latest news and updates from our team.
            </p>
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="w-full px-4 py-2 bg-[#0D1117] border border-[#30363D] rounded-l-md focus:outline-none focus:border-[#00A0B0] transition-colors"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="gradient-bg gradient-bg-hover px-4 rounded-r-md transition-all duration-300">
                  <i className='bx bx-right-arrow-alt'></i>
                </button>
              </div>
            </form>
            <p className="text-[#8B949E] text-sm">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-[#30363D] flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#8B949E] text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-[#8B949E] hover:text-white text-sm transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-[#8B949E] hover:text-white text-sm transition-colors">Terms of Service</Link>
            <Link href="/sitemap" className="text-[#8B949E] hover:text-white text-sm transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
