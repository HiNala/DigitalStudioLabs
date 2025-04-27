import emailjs from '@emailjs/browser';

// EmailJS Configuration
export const EMAIL_JS_CONFIG = {
  SERVICE_ID: 'service_mrusfr8',
  TEMPLATE_ID: 'template_2klwocb',
  PUBLIC_KEY: 'D_R-nmFgf2X_Vh8yy'
};

// Initialize EmailJS
export const initEmailJS = () => {
  emailjs.init(EMAIL_JS_CONFIG.PUBLIC_KEY);
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
    // Map our form data to match the expected template parameters
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      service: formData.service,
      message: formData.message
    };

    console.log('Sending email with params:', templateParams);
    
    return await emailjs.send(
      EMAIL_JS_CONFIG.SERVICE_ID,
      EMAIL_JS_CONFIG.TEMPLATE_ID,
      templateParams,
      EMAIL_JS_CONFIG.PUBLIC_KEY
    );
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}; 