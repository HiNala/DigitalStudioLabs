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
    
    // Inspect form fields before sending
    const formData = new FormData(form);
    console.log('Form fields before sending:');
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    
    // Check for the title field specifically
    const titleValue = formData.get('title');
    console.log('Title field value:', titleValue);
    
    if (!titleValue || titleValue === '') {
      console.warn('WARNING: Title field is empty or missing!');
      
      // Get the message field value
      const messageEl = form.querySelector('textarea[name="title"]') as HTMLTextAreaElement;
      const messageValue = messageEl?.value;
      
      if (messageValue) {
        console.log('Found message value in textarea:', messageValue);
        
        // Create a hidden input for the title field if it doesn't exist
        let titleInput = form.querySelector('input[name="title"]') as HTMLInputElement;
        if (!titleInput) {
          titleInput = document.createElement('input');
          titleInput.type = 'hidden';
          titleInput.name = 'title';
          form.appendChild(titleInput);
        }
        
        // Set the title value
        titleInput.value = messageValue;
        console.log('Added title field with value:', messageValue);
      }
    }
    
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
    console.log('Original message content:', formData.message);
    
    // Create a simple object with all the parameters
    // These must match EXACTLY what your EmailJS template expects
    const templateParams = {
      // Common EmailJS template parameters
      to_name: 'Digital Studio Labs',
      from_name: formData.name,
      from_email: formData.email,
      reply_to: formData.email,
      
      // Try setting the message directly as both title and content fields
      title: formData.message || "No message provided",
      content: formData.message || "No message provided",
      message: formData.message || "No message provided",
      
      // Additional parameters
      phone: formData.phone || 'N/A',
      service: formData.service || 'Not specified',
      
      // Include all possible variations of parameter names that might be in the template
      name: formData.name,
      email: formData.email,
      subject: `New inquiry about ${formData.service || 'your services'}`,
    };

    console.log('Sending with these exact parameters:', JSON.stringify(templateParams, null, 2));
    
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
      subject: 'Newsletter Subscription Request',
      
      // Add more variations of message field names
      content: `Please add this email to the newsletter: ${email}`,
      body: `Please add this email to the newsletter: ${email}`,
      user_message: `Please add this email to the newsletter: ${email}`,
      request: `Please add this email to the newsletter: ${email}`,
      
      // Add the title parameter that your template is using
      title: `Please add this email to the newsletter: ${email}`
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