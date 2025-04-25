// Vercel serverless function for API routes
import express from 'express';
import { z } from 'zod';

// Contact form schema
const contactFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(1, { message: "Message is required" }),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to the privacy policy"
  })
});

// Initialize express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Contact form endpoint
app.post("/api/contact", async (req, res) => {
  try {
    const formData = contactFormSchema.parse(req.body);
    console.log("Contact form submission:", formData);
    res.status(200).json({
      success: true,
      message: "Message received! We'll be in touch soon."
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.errors
      });
    }
    console.error("Error handling contact form:", error);
    res.status(500).json({
      success: false,
      message: "There was a problem processing your request. Please try again."
    });
  }
});

// Newsletter subscription endpoint
app.post("/api/subscribe", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address"
      });
    }
    console.log("Newsletter subscription:", email);
    res.status(200).json({
      success: true,
      message: "Successfully subscribed to the newsletter!"
    });
  } catch (error) {
    console.error("Error handling newsletter subscription:", error);
    res.status(500).json({
      success: false,
      message: "There was a problem with your subscription. Please try again."
    });
  }
});

// Error handler
app.use((err, _req, res, _next) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

// Export for Vercel serverless function
export default app; 