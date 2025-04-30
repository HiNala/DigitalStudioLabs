import { useEffect, useState, FormEvent, useRef } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { COMPANY_EMAIL, COMPANY_PHONE, COMPANY_LOCATION } from '@/lib/constants';
import { useToast } from '@/hooks/use-toast';
import { initEmailJS, sendFormDirectly, sendEmail } from '@/lib/emailjs';
import emailjs from '@emailjs/browser';
import { EMAIL_JS_CONFIG } from '@/lib/emailjs';

const ContactPage = () => {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  
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
    document.title = 'Contact Us | Digital Studio Labs';
    window.scrollTo(0, 0);
    
    // Initialize EmailJS
    initEmailJS();
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
      console.log('Submitting contact form...');
      console.log('Message content before sending:', formData.message);
      
      if (!formRef.current) {
        throw new Error('Form reference is not available');
      }
      
      // Use direct EmailJS send instead of form submission
      console.log('Using direct EmailJS send method');
      
      const templateParams = {
        from_name: formData.from_name,
        reply_to: formData.reply_to,
        email: formData.reply_to,
        phone: formData.phone || 'N/A',
        service: formData.service || 'Not specified',
        message: formData.message,
        title: formData.message, // Key field for the template
        to_name: 'Digital Studio Labs',
        subject: `New inquiry about ${formData.service || 'your services'}`
      };
      
      console.log('Sending with parameters:', templateParams);
      
      const response = await emailjs.send(
        EMAIL_JS_CONFIG.SERVICE_ID,
        EMAIL_JS_CONFIG.TEMPLATE_ID,
        templateParams
      );
      
      console.log('Form submission successful:', response);
      
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
      console.error('Error sending contact form:', error);
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
      <main className="pt-28 md:pt-32">
        {/* Contact Form and Info */}
        <section className="py-10 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-poppins font-bold mb-4">
                <span className="gradient-text-animated gradient-text-glow">Contact</span> Us
              </h1>
              <p className="dark:text-[#8B949E] light:text-gray-600 text-lg">
                Have questions or ready to start your project? Reach out to our team.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Contact Form */}
              <div className="lg:col-span-3 dark:bg-[#161B22] light:bg-white/90 backdrop-blur-sm rounded-xl p-8 dark:border-[#30363D] light:border-gray-200 border shadow-sm">
                <h2 className="text-2xl font-poppins font-semibold mb-6 dark:text-white light:text-gray-800">Send Us a Message</h2>
                <form ref={formRef} id="contact-form" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="from_name" className="block mb-2 font-medium dark:text-white light:text-gray-700">Name</label>
                      <input 
                        type="text" 
                        id="from_name" 
                        name="from_name" 
                        className="w-full px-4 py-3 dark:bg-[#0D1117] light:bg-gray-50 border dark:border-[#30363D] light:border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A0B0] dark:text-white light:text-gray-900 transition-colors" 
                        required
                        value={formData.from_name}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="reply_to" className="block mb-2 font-medium dark:text-white light:text-gray-700">Email</label>
                      <input 
                        type="email" 
                        id="reply_to" 
                        name="reply_to" 
                        className="w-full px-4 py-3 dark:bg-[#0D1117] light:bg-gray-50 border dark:border-[#30363D] light:border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A0B0] dark:text-white light:text-gray-900 transition-colors" 
                        required
                        value={formData.reply_to}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="phone" className="block mb-2 font-medium dark:text-white light:text-gray-700">Phone</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      className="w-full px-4 py-3 dark:bg-[#0D1117] light:bg-gray-50 border dark:border-[#30363D] light:border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A0B0] dark:text-white light:text-gray-900 transition-colors"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="service" className="block mb-2 font-medium dark:text-white light:text-gray-700">Service Interested In</label>
                    <select 
                      id="service" 
                      name="service" 
                      className="w-full px-4 py-3 dark:bg-[#0D1117] light:bg-gray-50 border dark:border-[#30363D] light:border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A0B0] dark:text-white light:text-gray-900 transition-colors"
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
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block mb-2 font-medium dark:text-white light:text-gray-700">Your Message</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows={5} 
                      className="w-full px-4 py-3 dark:bg-[#0D1117] light:bg-gray-50 border dark:border-[#30363D] light:border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00A0B0] dark:text-white light:text-gray-900 transition-colors"
                      required
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
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
                <div className="dark:bg-[#161B22] light:bg-white/90 backdrop-blur-sm rounded-xl p-8 dark:border-[#30363D] light:border-gray-200 border shadow-sm">
                  <h3 className="text-xl font-poppins font-semibold mb-4 dark:text-white light:text-gray-800">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <i className='bx bx-envelope text-[#00A0B0] text-xl mr-4 mt-1'></i>
                      <div>
                        <p className="font-medium dark:text-white light:text-gray-700">Email</p>
                        <a href={`mailto:${COMPANY_EMAIL}`} className="dark:text-[#8B949E] light:text-gray-600 hover:text-[#00A0B0] transition-colors">
                          {COMPANY_EMAIL}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <i className='bx bx-phone text-[#00A0B0] text-xl mr-4 mt-1'></i>
                      <div>
                        <p className="font-medium dark:text-white light:text-gray-700">Phone</p>
                        <a href={`tel:${COMPANY_PHONE.replace(/[^0-9]/g, '')}`} className="dark:text-[#8B949E] light:text-gray-600 hover:text-[#00A0B0] transition-colors">
                          {COMPANY_PHONE}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <i className='bx bx-map text-[#00A0B0] text-xl mr-4 mt-1'></i>
                      <div>
                        <p className="font-medium dark:text-white light:text-gray-700">Location</p>
                        <p className="dark:text-[#8B949E] light:text-gray-600">{COMPANY_LOCATION}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="dark:bg-[#161B22] light:bg-white/90 backdrop-blur-sm rounded-xl p-8 dark:border-[#30363D] light:border-gray-200 border shadow-sm">
                  <h3 className="text-xl font-poppins font-semibold mb-4 dark:text-white light:text-gray-800">Schedule a Call</h3>
                  <p className="dark:text-[#8B949E] light:text-gray-600 mb-6">
                    Choose a convenient time for a 30-minute consultation with our team.
                  </p>
                  <a 
                    href="https://calendly.com/digitalstudiolabs/free-consultation" 
                    target="_blank" 
                    rel="noreferrer"
                    className="block text-center gradient-bg gradient-bg-hover py-3 rounded-md font-medium transition-all duration-300 glow-hover"
                  >
                    View Calendar
                  </a>
                </div>
                
                <div className="dark:bg-[#161B22] light:bg-white/90 backdrop-blur-sm rounded-xl p-8 dark:border-[#30363D] light:border-gray-200 border shadow-sm">
                  <h3 className="text-xl font-poppins font-semibold mb-4 dark:text-white light:text-gray-800">Office Hours</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="dark:text-white light:text-gray-700">Monday - Friday</span>
                      <span className="dark:text-[#8B949E] light:text-gray-600">9:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="dark:text-white light:text-gray-700">Saturday</span>
                      <span className="dark:text-[#8B949E] light:text-gray-600">By Appointment</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="dark:text-white light:text-gray-700">Sunday</span>
                      <span className="dark:text-[#8B949E] light:text-gray-600">Closed</span>
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
            <div className="dark:bg-[#161B22] light:bg-white/90 backdrop-blur-sm rounded-xl dark:border-[#30363D] light:border-gray-200 border p-8 relative overflow-hidden shadow-sm">
              <h2 className="text-2xl font-poppins font-semibold mb-6 text-center dark:text-white light:text-gray-800">Find Us</h2>
              <div className="h-80 w-full dark:bg-[#0D1117]/50 light:bg-gray-50 rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="mb-4 text-[#00A0B0]">
                      <i className='bx bx-map-pin text-5xl'></i>
                    </div>
                    <h3 className="text-xl font-medium mb-2 dark:text-white light:text-gray-700">{COMPANY_LOCATION}</h3>
                    <p className="dark:text-[#8B949E] light:text-gray-600">
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
                <h2 className="text-3xl font-poppins font-bold mb-6 dark:text-white light:text-gray-800">Frequently Asked Questions</h2>
                <p className="dark:text-[#8B949E] light:text-gray-600">
                  Have questions about working with us? Find answers to common questions below.
                </p>
              </div>
              
              <div className="divide-y dark:divide-[#30363D] light:divide-gray-200">
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
                    <h3 className="text-xl font-poppins font-semibold mb-4 dark:text-white light:text-gray-800">{faq.question}</h3>
                    <p className="dark:text-[#8B949E] light:text-gray-600">{faq.answer}</p>
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
