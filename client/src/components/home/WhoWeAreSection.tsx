import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/providers/ThemeProvider';

const WhoWeAreSection = () => {
  const { theme } = useTheme();
  
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-5">
        <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-8">
            Who <span className="gradient-text">We</span> Are
          </h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="prose prose-lg max-w-3xl mx-auto dark:prose-invert"
          >
            <p className="text-xl leading-relaxed dark:text-neutral-300 light:text-gray-700">
              At Digital Studio Labs, we breathe life into digital experiences through 
              a blend of intuition and innovation. Our team navigates the digital landscape 
              with an intimate understanding of emerging technologies, transforming complex 
              challenges into elegant solutions that feel effortless to users. We don't just 
              build digital products—we craft experiences where technology recedes into the 
              background, leaving only the magic of seamless interaction.
            </p>
            
            <p className="text-xl leading-relaxed mt-6 dark:text-neutral-300 light:text-gray-700">
              Every pixel we place and every line of code we write reflects our passion for 
              harmonizing form and function. When you work with us, you're collaborating with 
              minds that have spent years refining their craft, pushing boundaries, and 
              anticipating the next wave of digital evolution before it reaches shore.
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative element - subtle gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
    </section>
  );
};

export default WhoWeAreSection;