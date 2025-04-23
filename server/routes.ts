import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

// Contact form schema
const contactFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(1, { message: "Message is required" }),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to the privacy policy",
  }),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate form data
      const formData = contactFormSchema.parse(req.body);
      
      // In a production environment, you would typically:
      // 1. Save the contact form submission to a database
      // 2. Send an email notification
      // 3. Maybe trigger a CRM integration
      
      console.log("Contact form submission:", formData);
      
      // For now, just return success
      res.status(200).json({ 
        success: true, 
        message: "Message received! We'll be in touch soon." 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Return validation errors
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
      
      // Validate email
      if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ 
          success: false, 
          message: "Please provide a valid email address" 
        });
      }
      
      // In production, you'd add this to a newsletter service or database
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

  const httpServer = createServer(app);

  return httpServer;
}
