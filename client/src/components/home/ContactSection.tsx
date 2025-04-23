import { useEffect, useRef, useState } from 'react';
import { COMPANY_EMAIL, COMPANY_PHONE, COMPANY_LOCATION } from '@/lib/constants';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

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
    <section id="contact" ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-6">Get In Touch</h2>
          <p className="text-[#8B949E] text-lg">
            Ready to start your project? Contact us for a free consultation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-3 bg-[#161B22] rounded-xl p-8 border border-[#30363D] animate-fade-in">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block mb-2 font-medium">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    className="w-full px-4 py-3 bg-[#0D1117] border border-[#30363D] rounded-md focus:outline-none focus:border-[#00A0B0] transition-colors" 
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 font-medium">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    className="w-full px-4 py-3 bg-[#0D1117] border border-[#30363D] rounded-md focus:outline-none focus:border-[#00A0B0] transition-colors" 
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="phone" className="block mb-2 font-medium">Phone</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  className="w-full px-4 py-3 bg-[#0D1117] border border-[#30363D] rounded-md focus:outline-none focus:border-[#00A0B0] transition-colors"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="service" className="block mb-2 font-medium">Service Interested In</label>
                <select 
                  id="service" 
                  name="service" 
                  className="w-full px-4 py-3 bg-[#0D1117] border border-[#30363D] rounded-md focus:outline-none focus:border-[#00A0B0] transition-colors"
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
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block mb-2 font-medium">Your Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={5} 
                  className="w-full px-4 py-3 bg-[#0D1117] border border-[#30363D] rounded-md focus:outline-none focus:border-[#00A0B0] transition-colors"
                  required
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
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
                className="w-full gradient-bg gradient-bg-hover py-3 rounded-md font-medium transition-all duration-300 glow-hover"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
          
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8 animate-fade-in">
            <div className="bg-[#161B22] rounded-xl p-8 border border-[#30363D]">
              <h3 className="text-xl font-poppins font-semibold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <i className='bx bx-envelope text-[#00A0B0] text-xl mr-4 mt-1'></i>
                  <div>
                    <p className="font-medium">Email</p>
                    <a href={`mailto:${COMPANY_EMAIL}`} className="text-[#8B949E] hover:text-white transition-colors">
                      {COMPANY_EMAIL}
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <i className='bx bx-phone text-[#00A0B0] text-xl mr-4 mt-1'></i>
                  <div>
                    <p className="font-medium">Phone</p>
                    <a href={`tel:${COMPANY_PHONE.replace(/[^0-9]/g, '')}`} className="text-[#8B949E] hover:text-white transition-colors">
                      {COMPANY_PHONE}
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <i className='bx bx-map text-[#00A0B0] text-xl mr-4 mt-1'></i>
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-[#8B949E]">{COMPANY_LOCATION}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#161B22] rounded-xl p-8 border border-[#30363D]">
              <h3 className="text-xl font-poppins font-semibold mb-4">Schedule a Call</h3>
              <p className="text-[#8B949E] mb-6">
                Choose a convenient time for a 30-minute consultation with our team.
              </p>
              <a 
                href="https://calendly.com" 
                target="_blank" 
                rel="noreferrer"
                className="block text-center gradient-bg gradient-bg-hover py-3 rounded-md font-medium transition-all duration-300 glow-hover"
              >
                View Calendar
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background Decoration */}
      <div className="ambient-glow absolute bottom-1/4 -right-20 w-96 h-96 rounded-full opacity-10 bg-[#4D4DFF]"></div>
    </section>
  );
};

export default ContactSection;
