import emailjs from '@emailjs/browser';

// EmailJS Configuration
export const EMAIL_JS_CONFIG = {
  SERVICE_ID: 'service_mrusfr8',
  TEMPLATE_ID: 'template_2klwocb',
  PUBLIC_KEY: 'D_R-nmFgf2X_Vh8yy'
};

// Initialize EmailJS
export const initEmailJS = () => {
  try {
    emailjs.init(EMAIL_JS_CONFIG.PUBLIC_KEY);
    console.log('EmailJS initialized successfully');
  } catch (error) {
    console.error('Error initializing EmailJS:', error);
  }
};

// Direct implementation of sendForm for reliable form submissions
export const sendFormDirectly = async (form: HTMLFormElement) => {
  try {
    console.log('Sending form via EmailJS sendForm...');
    
    // Use the native EmailJS sendForm method
    const response = await emailjs.sendForm(
      EMAIL_JS_CONFIG.SERVICE_ID,
      EMAIL_JS_CONFIG.TEMPLATE_ID,
      form
    );
    
    console.log('SUCCESS!', response.status, response.text);
    return response;
  } catch (error: any) {
    console.error('EMAILJS FORM ERROR:', error);
    if (error.text) console.error('Error text:', error.text);
    if (error.status) console.error('Error status:', error.status);
    throw error;
  }
};

// Send email using EmailJS with detailed error reporting
export const sendEmail = async (formData: {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}) => {
  try {
    // Create a simple object with all the parameters
    // These must match EXACTLY what your EmailJS template expects
    const templateParams = {
      // Common EmailJS template parameters
      to_name: 'Digital Studio Labs',
      from_name: formData.name,
      from_email: formData.email,
      reply_to: formData.email,
      message: formData.message,
      
      // Additional parameters
      phone: formData.phone || 'N/A',
      service: formData.service || 'Not specified',
      
      // Include all possible variations of parameter names that might be in the template
      name: formData.name,
      email: formData.email,
      subject: `New inquiry about ${formData.service || 'your services'}`
    };

    console.log('Attempting to send email with params:', templateParams);
    
    // Use promise with explicit error handling
    const response = await emailjs.send(
      EMAIL_JS_CONFIG.SERVICE_ID, 
      EMAIL_JS_CONFIG.TEMPLATE_ID,
      templateParams
    );
    
    console.log('SUCCESS!', response.status, response.text);
    return response;
  } catch (error: any) {
    console.error('EMAILJS ERROR:', error);
    // Log detailed error information
    if (error.text) console.error('Error text:', error.text);
    if (error.status) console.error('Error status:', error.status);
    throw error;
  }
};

// Simpler function for newsletter subscription
export const sendNewsletterSubscription = async (email: string) => {
  try {
    const templateParams = {
      to_name: 'Digital Studio Labs',
      from_name: 'Newsletter Subscription',
      from_email: email,
      reply_to: email,
      email: email,
      message: `Please add this email to the newsletter: ${email}`,
      subject: 'Newsletter Subscription Request'
    };
    
    console.log('Sending newsletter subscription:', templateParams);
    
    const response = await emailjs.send(
      EMAIL_JS_CONFIG.SERVICE_ID,
      EMAIL_JS_CONFIG.TEMPLATE_ID,
      templateParams
    );
    
    console.log('SUCCESS!', response.status, response.text);
    return response;
  } catch (error: any) {
    console.error('NEWSLETTER ERROR:', error);
    if (error.text) console.error('Error text:', error.text);
    if (error.status) console.error('Error status:', error.status);
    throw error;
  }
}; 