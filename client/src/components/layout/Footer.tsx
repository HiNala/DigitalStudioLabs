import { Link } from 'wouter';
import { 
  COMPANY_NAME, 
  COMPANY_EMAIL,
  NAV_LINKS 
} from '@/lib/constants';
import { useState } from 'react';
import { sendEmail } from '@/lib/emailjs';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';
import { EMAIL_JS_CONFIG } from '@/lib/emailjs';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      console.log('Subscribing to newsletter:', email);
      
      // Direct EmailJS call for newsletter subscription
      const templateParams = {
        from_name: 'Newsletter Subscription',
        from_email: email,
        phone: 'N/A',
        service: 'Newsletter',
        message: `Please add this email to the newsletter subscription list: ${email}`
      };
      
      console.log('Sending with params:', templateParams);
      
      const response = await emailjs.send(
        EMAIL_JS_CONFIG.SERVICE_ID,
        EMAIL_JS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAIL_JS_CONFIG.PUBLIC_KEY
      );
      
      console.log('Newsletter subscription successful:', response);
      
      toast({
        title: "Subscription Successful!",
        description: "Thank you for subscribing to our newsletter.",
      });
      
      setEmail('');
    } catch (error) {
      console.error('Error with newsletter subscription:', error);
      toast({
        title: "Error",
        description: "There was a problem with your subscription. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-background border-t dark:border-[#30363D] light:border-gray-200 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Logo & About */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-poppins font-bold gradient-text">{COMPANY_NAME}</span>
            </Link>
            <p className="dark:text-[#8B949E] light:text-gray-600 mb-6">
              Premium web development and AI solutions for businesses that demand excellence.
            </p>
            <div className="flex space-x-4">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="dark:text-[#8B949E] light:text-gray-500 hover:text-[#00A0B0] transition-colors">
                <i className='bx bxl-linkedin text-xl'></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="dark:text-[#8B949E] light:text-gray-500 hover:text-[#00A0B0] transition-colors">
                <i className='bx bxl-twitter text-xl'></i>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="dark:text-[#8B949E] light:text-gray-500 hover:text-[#00A0B0] transition-colors">
                <i className='bx bxl-facebook text-xl'></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="dark:text-[#8B949E] light:text-gray-500 hover:text-[#00A0B0] transition-colors">
                <i className='bx bxl-instagram text-xl'></i>
              </a>
            </div>
          </div>
          
          {/* Column 2: Services */}
          <div>
            <h3 className="text-lg font-poppins font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              <li><Link href="/services" className="dark:text-[#8B949E] light:text-gray-600 hover:text-[#00A0B0] transition-colors">Website Design</Link></li>
              <li><Link href="/services" className="dark:text-[#8B949E] light:text-gray-600 hover:text-[#00A0B0] transition-colors">Web Applications</Link></li>
              <li><Link href="/services" className="dark:text-[#8B949E] light:text-gray-600 hover:text-[#00A0B0] transition-colors">AI Integration</Link></li>
              <li><Link href="/services" className="dark:text-[#8B949E] light:text-gray-600 hover:text-[#00A0B0] transition-colors">E-commerce</Link></li>
              <li><Link href="/services" className="dark:text-[#8B949E] light:text-gray-600 hover:text-[#00A0B0] transition-colors">SEO & Lead Gen</Link></li>
            </ul>
          </div>
          
          {/* Column 3: Company */}
          <div>
            <h3 className="text-lg font-poppins font-semibold mb-6">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="dark:text-[#8B949E] light:text-gray-600 hover:text-[#00A0B0] transition-colors">About Us</Link></li>
              <li><Link href="/process" className="dark:text-[#8B949E] light:text-gray-600 hover:text-[#00A0B0] transition-colors">Process</Link></li>
              <li><Link href="/blog" className="dark:text-[#8B949E] light:text-gray-600 hover:text-[#00A0B0] transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="dark:text-[#8B949E] light:text-gray-600 hover:text-[#00A0B0] transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-lg font-poppins font-semibold mb-6">Subscribe</h3>
            <p className="dark:text-[#8B949E] light:text-gray-600 mb-4">
              Get the latest news and updates from our team.
            </p>
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="space-y-2">
                <div className="relative">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="w-full px-4 py-3 dark:bg-[#161B22] light:bg-white dark:border-[#30363D] light:border-gray-300 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A0B0] focus:border-transparent transition-all"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <i className='bx bx-envelope dark:text-[#8B949E] light:text-gray-500'></i>
                  </div>
                </div>
                <button 
                  type="submit" 
                  className="w-full gradient-bg gradient-bg-hover py-3 rounded-md font-medium transition-all duration-300 glow-hover flex items-center justify-center"
                  disabled={isSubmitting}
                >
                  <span>{isSubmitting ? 'Subscribing...' : 'Subscribe'}</span>
                  <i className='bx bx-right-arrow-alt ml-2'></i>
                </button>
              </div>
            </form>
            <p className="dark:text-[#8B949E] light:text-gray-500 text-sm">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t dark:border-[#30363D] light:border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="dark:text-[#8B949E] light:text-gray-600 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="dark:text-[#8B949E] light:text-gray-600 hover:text-[#00A0B0] text-sm transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="dark:text-[#8B949E] light:text-gray-600 hover:text-[#00A0B0] text-sm transition-colors">Terms of Service</Link>
            <Link href="/sitemap" className="dark:text-[#8B949E] light:text-gray-600 hover:text-[#00A0B0] text-sm transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
