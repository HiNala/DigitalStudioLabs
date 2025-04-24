import { useEffect, useRef, useState } from 'react';
import { COMPANY_EMAIL, COMPANY_PHONE, COMPANY_LOCATION } from '@/lib/constants';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Calendar, Send } from 'lucide-react';

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await apiRequest('POST', '/api/contact', formData);
      
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll be in touch soon.",
      });
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
        consent: false
      });
    } catch (error) {
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
          <p className="text-[#8B949E] text-lg">
            Reach out to discuss your project, ask questions, or schedule a free consultation. 
            We're here to help turn your vision into reality.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact Form */}
          <motion.div 
            className="lg:col-span-7 bg-[#161B22]/80 backdrop-blur-sm rounded-xl p-8 border border-[#30363D] shadow-xl"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-poppins font-semibold mb-6">Send Us a Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block mb-2 font-medium">Name</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      className="w-full pl-10 px-4 py-3 bg-[#0D1117] border border-[#30363D] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A0B0] focus:border-transparent transition-all" 
                      required
                      value={formData.name}
                      onChange={handleChange}
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <i className='bx bx-user text-[#8B949E]'></i>
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 font-medium">Email</label>
                  <div className="relative">
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      className="w-full pl-10 px-4 py-3 bg-[#0D1117] border border-[#30363D] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A0B0] focus:border-transparent transition-all" 
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <i className='bx bx-envelope text-[#8B949E]'></i>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="phone" className="block mb-2 font-medium">Phone</label>
                <div className="relative">
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    className="w-full pl-10 px-4 py-3 bg-[#0D1117] border border-[#30363D] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A0B0] focus:border-transparent transition-all"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <i className='bx bx-phone text-[#8B949E]'></i>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="service" className="block mb-2 font-medium">Service Interested In</label>
                <div className="relative">
                  <select 
                    id="service" 
                    name="service" 
                    className="w-full pl-10 px-4 py-3 bg-[#0D1117] border border-[#30363D] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A0B0] focus:border-transparent transition-all appearance-none"
                    value={formData.service}
                    onChange={handleChange}
                  >
                    <option value="">Select a service</option>
                    <option value="website">Website Design</option>
                    <option value="webapp">Web Application</option>
                    <option value="ai">AI Integration</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="seo">SEO & Lead Generation</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <i className='bx bx-list-ul text-[#8B949E]'></i>
                  </div>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <i className='bx bx-chevron-down text-[#8B949E]'></i>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block mb-2 font-medium">Your Message</label>
                <div className="relative">
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={5} 
                    className="w-full pl-10 px-4 py-3 bg-[#0D1117] border border-[#30363D] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A0B0] focus:border-transparent transition-all"
                    required
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                  <div className="absolute top-3 left-0 pl-3 flex items-center">
                    <i className='bx bx-message-detail text-[#8B949E]'></i>
                  </div>
                </div>
              </div>
              
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
                  <span className="text-[#8B949E] text-sm">
                    I agree to the <a href="/privacy" className="text-[#00A0B0] hover:text-[#4D4DFF] transition-colors">Privacy Policy</a> and consent to be contacted regarding my inquiry.
                  </span>
                </label>
              </div>
              
              <button 
                type="submit" 
                className="w-full gradient-bg gradient-bg-hover py-3 rounded-md font-medium transition-all duration-300 glow-hover flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'} 
                {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
              </button>
            </form>
          </motion.div>
          
          {/* Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div 
              className="bg-[#161B22]/80 backdrop-blur-sm rounded-xl p-8 border border-[#30363D] shadow-xl"
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
                    <a href={`mailto:${COMPANY_EMAIL}`} className="text-[#8B949E] hover:text-[#00A0B0] transition-colors">
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
                    <a href={`tel:${COMPANY_PHONE.replace(/[^0-9]/g, '')}`} className="text-[#8B949E] hover:text-[#00A0B0] transition-colors">
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
                    <p className="text-[#8B949E]">{COMPANY_LOCATION}</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-[#161B22]/80 backdrop-blur-sm rounded-xl p-8 border border-[#30363D] shadow-xl"
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
                  <p className="text-[#8B949E]">
                    Book a convenient time for a free 30-minute consultation
                  </p>
                </div>
              </div>
              <a 
                href="https://calendly.com" 
                target="_blank" 
                rel="noreferrer"
                className="block text-center gradient-bg gradient-bg-hover py-3 rounded-md font-medium transition-all duration-300 glow-hover"
              >
                View Available Times
              </a>
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
