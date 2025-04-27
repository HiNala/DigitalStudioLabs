import { useEffect, useRef, useState, FormEvent } from 'react';
import { COMPANY_EMAIL, COMPANY_PHONE, COMPANY_LOCATION } from '@/lib/constants';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Calendar, Send } from 'lucide-react';
import { useTheme } from '@/providers/ThemeProvider';
import StarButton from '../ui/star-button';
import emailjs from '@emailjs/browser';
import { EMAIL_JS_CONFIG, sendFormDirectly } from '@/lib/emailjs';

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const { theme } = useTheme();
  
  const [formData, setFormData] = useState({
    from_name: '',
    reply_to: '',
    phone: '',
    service: '',
    message: '',
    consent: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    // Initialize EmailJS
    emailjs.init(EMAIL_JS_CONFIG.PUBLIC_KEY);

    return () => {
      animatedElements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      console.log('Submitting form from home page...');
      
      if (!formRef.current) {
        throw new Error('Form reference is not available');
      }
      
      // Use EmailJS sendForm directly as documented
      const response = await emailjs.sendForm(
        EMAIL_JS_CONFIG.SERVICE_ID,
        EMAIL_JS_CONFIG.TEMPLATE_ID,
        formRef.current
      );
      
      console.log('Form submission successful from home page:', response);
      
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll be in touch soon.",
      });
      
      // Reset form after successful submission
      setFormData({
        from_name: '',
        reply_to: '',
        phone: '',
        service: '',
        message: '',
        consent: false
      });
      
      if (formRef.current) {
        formRef.current.reset();
      }
    } catch (error) {
      console.error('Error sending form from home page:', error);
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="py-24 relative overflow-hidden bg-radial">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1 bg-gradient-to-r from-[#00A0B0]/20 to-[#4D4DFF]/20 rounded-full text-[#00A0B0] text-sm font-medium mb-4">
            Contact Us
          </span>
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-6">
            Let's Start Your Digital <span className="gradient-text">Journey</span> Together
          </h2>
          <p className="dark:text-[#8B949E] light:text-gray-600 text-lg">
            Reach out to discuss your project, ask questions, or schedule a free consultation. 
            We're here to help turn your vision into reality.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact Form */}
          <motion.div 
            className="lg:col-span-7 dark:bg-[#161B22]/80 light:bg-white/90 backdrop-blur-sm rounded-xl p-8 border dark:border-[#30363D] light:border-gray-200 shadow-xl"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-poppins font-semibold mb-6">Send Us a Message</h3>
            <form ref={formRef} id="home-contact-form" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="home_from_name" className="block mb-2 font-medium">Name</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      id="home_from_name" 
                      name="from_name" 
                      className="w-full pl-10 px-4 py-3 dark:bg-[#0D1117] light:bg-gray-50 border dark:border-[#30363D] light:border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A0B0] focus:border-transparent transition-all" 
                      required
                      value={formData.from_name}
                      onChange={handleChange}
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <i className='bx bx-user dark:text-[#8B949E] light:text-gray-500'></i>
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="home_reply_to" className="block mb-2 font-medium">Email</label>
                  <div className="relative">
                    <input 
                      type="email" 
                      id="home_reply_to" 
                      name="reply_to" 
                      className="w-full pl-10 px-4 py-3 dark:bg-[#0D1117] light:bg-gray-50 border dark:border-[#30363D] light:border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A0B0] focus:border-transparent transition-all" 
                      required
                      value={formData.reply_to}
                      onChange={handleChange}
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <i className='bx bx-envelope dark:text-[#8B949E] light:text-gray-500'></i>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="home_phone" className="block mb-2 font-medium">Phone</label>
                <div className="relative">
                  <input 
                    type="tel" 
                    id="home_phone" 
                    name="phone" 
                    className="w-full pl-10 px-4 py-3 dark:bg-[#0D1117] light:bg-gray-50 border dark:border-[#30363D] light:border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A0B0] focus:border-transparent transition-all"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <i className='bx bx-phone dark:text-[#8B949E] light:text-gray-500'></i>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="home_service" className="block mb-2 font-medium">Service Interested In</label>
                <div className="relative">
                  <select 
                    id="home_service" 
                    name="service" 
                    className="w-full pl-10 px-4 py-3 dark:bg-[#0D1117] light:bg-gray-50 border dark:border-[#30363D] light:border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A0B0] focus:border-transparent transition-all appearance-none"
                    value={formData.service}
                    onChange={handleChange}
                  >
                    <option value="">Select a service</option>
                    <option value="Website Design">Website Design</option>
                    <option value="Web Application">Web Application</option>
                    <option value="AI Integration">AI Integration</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="SEO & Lead Generation">SEO & Lead Generation</option>
                    <option value="Other">Other</option>
                  </select>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <i className='bx bx-list-ul dark:text-[#8B949E] light:text-gray-500'></i>
                  </div>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <i className='bx bx-chevron-down dark:text-[#8B949E] light:text-gray-500'></i>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="home_message" className="block mb-2 font-medium">Your Message</label>
                <div className="relative">
                  <textarea 
                    id="home_message" 
                    name="message" 
                    rows={5} 
                    className="w-full pl-10 px-4 py-3 dark:bg-[#0D1117] light:bg-gray-50 border dark:border-[#30363D] light:border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A0B0] focus:border-transparent transition-all"
                    required
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                  <div className="absolute top-3 left-0 pl-3 flex items-center">
                    <i className='bx bx-message-detail dark:text-[#8B949E] light:text-gray-500'></i>
                  </div>
                </div>
              </div>
              
              {/* Hidden fields that EmailJS might expect */}
              <input type="hidden" name="to_name" value="Digital Studio Labs" />
              <input type="hidden" name="from_email" value={formData.reply_to} />
              <input 
                type="hidden" 
                name="subject" 
                value={`New inquiry about ${formData.service || 'your services'}`} 
              />
              
              <div className="mb-6">
                <label className="flex items-start">
                  <input 
                    type="checkbox" 
                    name="consent"
                    className="mt-1 mr-2" 
                    required
                    checked={formData.consent}
                    onChange={handleCheckboxChange}
                  />
                  <span className="dark:text-[#8B949E] light:text-gray-600 text-sm">
                    I agree to the <a href="/privacy" className="text-[#00A0B0] hover:text-[#4D4DFF] transition-colors">Privacy Policy</a> and consent to be contacted regarding my inquiry.
                  </span>
                </label>
              </div>
              
              <div className="w-full flex justify-center">
                <StarButton 
                  type="submit"
                  onClick={() => {}}
                  size="md"
                  className="w-full"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </StarButton>
              </div>
            </form>
          </motion.div>
          
          {/* Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div 
              className="dark:bg-[#161B22]/80 light:bg-white/90 backdrop-blur-sm rounded-xl p-8 border dark:border-[#30363D] light:border-gray-200 shadow-xl"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-2xl font-poppins font-semibold mb-6">Connect With Us</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00A0B0] to-[#4D4DFF] rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-lg">Email</p>
                    <a href={`mailto:${COMPANY_EMAIL}`} className="dark:text-[#8B949E] light:text-gray-600 hover:text-[#00A0B0] transition-colors">
                      {COMPANY_EMAIL}
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#4D4DFF] to-[#00A0B0] rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-lg">Phone</p>
                    <a href={`tel:${COMPANY_PHONE.replace(/[^0-9]/g, '')}`} className="dark:text-[#8B949E] light:text-gray-600 hover:text-[#00A0B0] transition-colors">
                      {COMPANY_PHONE}
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00A0B0] to-[#4D4DFF] rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-lg">Location</p>
                    <p className="dark:text-[#8B949E] light:text-gray-600">{COMPANY_LOCATION}</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="dark:bg-[#161B22]/80 light:bg-white/90 backdrop-blur-sm rounded-xl p-8 border dark:border-[#30363D] light:border-gray-200 shadow-xl"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-start mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#4D4DFF] to-[#00A0B0] rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-poppins font-semibold">Schedule a Call</h3>
                  <p className="dark:text-[#8B949E] light:text-gray-600">
                    Book a convenient time for a free 30-minute consultation
                  </p>
                </div>
              </div>
              <div className="flex justify-center">
                <StarButton 
                  href="https://calendly.com/nalamaui30/30min"
                  size="md"
                >
                  View Available Times
                </StarButton>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Background Decoration */}
      <div className="ambient-glow absolute bottom-1/4 -right-20 w-96 h-96 rounded-full opacity-10 bg-[#4D4DFF]"></div>
      <div className="ambient-glow absolute top-1/4 -left-20 w-96 h-96 rounded-full opacity-10 bg-[#00A0B0]"></div>
    </section>
  );
};

export default ContactSection;
