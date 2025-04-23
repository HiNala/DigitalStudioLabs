import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { COMPANY_EMAIL, COMPANY_PHONE, COMPANY_LOCATION } from '@/lib/constants';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

const ContactPage = () => {
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
    document.title = 'Contact Us | Digital Studio Labs';
    window.scrollTo(0, 0);
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
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-radial relative overflow-hidden py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-6">
                Get In <span className="gradient-text">Touch</span>
              </h1>
              <p className="text-xl text-[#8B949E] mb-6">
                Ready to transform your digital presence? We're here to help.
              </p>
            </div>
          </div>
          
          {/* Background Decoration */}
          <div className="ambient-glow absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-10 bg-[#4D4DFF]"></div>
        </section>

        {/* Contact Form and Info */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Contact Form */}
              <div className="lg:col-span-3 bg-[#161B22] rounded-xl p-8 border border-[#30363D]">
                <h2 className="text-2xl font-poppins font-semibold mb-6">Send Us a Message</h2>
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
              <div className="lg:col-span-2 space-y-8">
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
                
                <div className="bg-[#161B22] rounded-xl p-8 border border-[#30363D]">
                  <h3 className="text-xl font-poppins font-semibold mb-4">Office Hours</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span className="text-[#8B949E]">9:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span className="text-[#8B949E]">By Appointment</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span className="text-[#8B949E]">Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map or Image */}
        <section className="py-10 bg-radial relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#161B22] rounded-xl border border-[#30363D] p-8 relative overflow-hidden">
              <h2 className="text-2xl font-poppins font-semibold mb-6 text-center">Find Us</h2>
              <div className="h-80 w-full bg-[#0D1117]/50 rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="mb-4 text-[#00A0B0]">
                      <i className='bx bx-map-pin text-5xl'></i>
                    </div>
                    <h3 className="text-xl font-medium mb-2">{COMPANY_LOCATION}</h3>
                    <p className="text-[#8B949E]">
                      Serving clients globally from our base in {COMPANY_LOCATION}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Background Decoration */}
          <div className="ambient-glow absolute bottom-1/4 -left-20 w-96 h-96 rounded-full opacity-10 bg-[#00A0B0]"></div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-poppins font-bold mb-6">Frequently Asked Questions</h2>
                <p className="text-[#8B949E]">
                  Have questions about working with us? Find answers to common questions below.
                </p>
              </div>
              
              <div className="divide-y divide-[#30363D]">
                {[
                  {
                    question: "How quickly do you respond to inquiries?",
                    answer: "We aim to respond to all inquiries within 24 business hours. For urgent matters, please call us directly."
                  },
                  {
                    question: "Do you work with clients internationally?",
                    answer: "Yes, we work with clients around the world. Our team is equipped to handle remote collaboration efficiently through video calls and project management tools."
                  },
                  {
                    question: "What information should I prepare for our first call?",
                    answer: "To make our initial consultation most productive, it helps to have a general idea of your project goals, timeline, budget range, and any specific requirements or inspirations you'd like to share."
                  },
                  {
                    question: "How do you handle project revisions?",
                    answer: "Our process includes designated revision rounds at key project stages. We'll work with you to ensure the final product meets your expectations while maintaining the project's scope and timeline."
                  }
                ].map((faq, index) => (
                  <div key={index} className="py-8">
                    <h3 className="text-xl font-poppins font-semibold mb-4">{faq.question}</h3>
                    <p className="text-[#8B949E]">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ContactPage;
