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

// Send email using EmailJS
export const sendEmail = async (formData: {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}) => {
  try {
    // Map our form data to the expected template parameters
    // Note: These MUST match exactly what's in your EmailJS template
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone || 'N/A',
      service: formData.service || 'Not specified',
      message: formData.message,
      to_name: 'Digital Studio Labs', // Add recipient name for the template
      reply_to: formData.email // Ensure reply-to is set
    };

    console.log('Sending email with params:', templateParams);
    
    // Using only service ID, template ID, and parameters (public key is already initialized)
    return await emailjs.send(
      EMAIL_JS_CONFIG.SERVICE_ID,
      EMAIL_JS_CONFIG.TEMPLATE_ID,
      templateParams
    );
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}; 