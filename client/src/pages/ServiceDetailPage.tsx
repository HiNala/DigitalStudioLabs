import { useEffect, useState } from 'react';
import { useLocation, Link } from 'wouter';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { SpotlightLayout } from '@/components/layout/SpotlightLayout';
import { SERVICES } from '@/lib/constants';
import { CheckCircle, ArrowRight, Play, ChevronRight, Phone, Mail } from 'lucide-react';
import { FaLaptopCode, FaPalette, FaRobot, FaChartLine, FaDatabase, FaLightbulb } from 'react-icons/fa';
import { FiCheckCircle } from 'react-icons/fi';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { FloatingOrbs } from '@/components/ui/floating-orbs';
import StarButton from '@/components/ui/star-button';
import { COMPANY_PHONE, COMPANY_EMAIL } from '@/lib/constants';

// Service icon component
const ServiceIcon = ({ icon, size = 36 }: { icon: string; size?: number }) => {
  const iconClass = "text-white";
  
  switch (icon) {
    case 'design':
      return <FaPalette size={size} className={iconClass} />;
    case 'development':
      return <FaLaptopCode size={size} className={iconClass} />;
    case 'ai':
      return <FaRobot size={size} className={iconClass} />;
    case 'seo':
      return <FaChartLine size={size} className={iconClass} />;
    case 'data':
      return <FaDatabase size={size} className={iconClass} />;
    case 'strategy':
      return <FaLightbulb size={size} className={iconClass} />;
    default:
      return <FaLaptopCode size={size} className={iconClass} />;
  }
};

// Service data content by slug
const serviceContent = {
  'modern-web-applications': {
    title: "Modern Web Applications",
    icon: "development",
    slug: "modern-web-applications",
    headline: "High-performance web solutions to power your business",
    description: "Our web application development service creates custom, scalable, and high-performance solutions designed for your business needs.",
    intro: "In today's digital landscape, modern web applications are the backbone of business innovation. Our full-stack development team builds responsive, scalable, and intuitive web applications that provide seamless experiences across all devices.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2426&q=80",
    features: [
      "Progressive Web App (PWA) development",
      "Real-time data synchronization",
      "Cross-platform compatibility",
      "Secure authentication and authorization",
      "Performance optimization",
      "API development and integration",
      "Third-party service integration",
      "Responsive and mobile-first design"
    ],
    benefits: [
      {
        title: "Improved User Experience",
        description: "Modern web applications offer intuitive interfaces and responsive designs that adapt to any device, ensuring an optimal user experience."
      },
      {
        title: "Enhanced Performance",
        description: "Our applications are built with performance in mind, utilizing the latest technologies to deliver fast load times and smooth interactions."
      },
      {
        title: "Scalability",
        description: "As your business grows, your web application can scale seamlessly to handle increased traffic and expanded functionality."
      },
      {
        title: "Cost Efficiency",
        description: "Web applications require less maintenance than native apps and can be updated instantly without requiring users to download updates."
      }
    ],
    technologies: [
      "React", "Next.js", "TypeScript", "Node.js", "Express", "GraphQL", "REST APIs", "PostgreSQL", "MongoDB", "AWS/Azure", "Docker"
    ],
    process: [
      {
        title: "Discovery and Planning",
        description: "We analyze your requirements, define objectives, and develop a detailed roadmap for your web application."
      },
      {
        title: "UI/UX Design",
        description: "Our designers create intuitive and engaging interfaces focused on providing exceptional user experiences."
      },
      {
        title: "Development",
        description: "Our expert developers build your application using modern frameworks and best practices in coding."
      },
      {
        title: "Testing and QA",
        description: "Rigorous testing ensures your application is bug-free, secure, and performs exceptionally."
      },
      {
        title: "Deployment",
        description: "We handle the smooth deployment of your application to production environments."
      },
      {
        title: "Maintenance and Support",
        description: "Ongoing support, updates, and enhancements keep your application running smoothly."
      }
    ],
    caseStudies: [
      {
        title: "B2B Client Portal",
        description: "Developed a secure client portal for a financial services company that streamlined client communications and document sharing.",
        outcome: "Reduced operational overhead by 40% and improved client satisfaction scores by 65%."
      },
      {
        title: "Healthcare Scheduling System",
        description: "Built a comprehensive appointment booking and management system for a multi-location healthcare provider.",
        outcome: "Increased appointment bookings by 28% and reduced no-shows by 35%."
      }
    ],
    faqs: [
      {
        question: "How long does it take to develop a web application?",
        answer: "Development timelines vary based on complexity, but most projects range from 2-6 months. We provide detailed timelines during our discovery phase."
      },
      {
        question: "Will my web application work on all devices?",
        answer: "Yes, we build responsive web applications that function seamlessly across desktops, tablets, and mobile devices of all sizes."
      },
      {
        question: "Can you integrate with our existing systems?",
        answer: "Absolutely. Our team specializes in creating integrations with existing software, APIs, and databases to ensure seamless data flow."
      },
      {
        question: "Do you provide ongoing maintenance?",
        answer: "Yes, we offer flexible maintenance plans to keep your application secure, up-to-date, and running smoothly after launch."
      }
    ]
  },
  'smart-business-automation': {
    title: "Smart Business Automation",
    icon: "strategy",
    slug: "smart-business-automation",
    headline: "Streamline operations and boost productivity",
    description: "Our business automation solutions eliminate manual tasks, streamline workflows, and increase operational efficiency across your organization.",
    intro: "Smart Business Automation transforms how your company operates by replacing manual, time-consuming processes with efficient, automated workflows. By integrating systems, connecting data sources, and implementing intelligent automation, we help you reduce costs, minimize errors, and free your team to focus on high-value activities.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    features: [
      "Custom workflow automation",
      "Business process management",
      "Document processing and management",
      "System integration and API development",
      "Robotic Process Automation (RPA)",
      "Automated reporting and analytics",
      "Task scheduling and management",
      "Custom notification systems"
    ],
    benefits: [
      {
        title: "Increased Efficiency",
        description: "Automate repetitive tasks to save time and reduce the risk of human error in your operations."
      },
      {
        title: "Reduced Operational Costs",
        description: "Cut expenses by optimizing processes and reducing the need for manual intervention in routine tasks."
      },
      {
        title: "Enhanced Accuracy",
        description: "Eliminate errors common in manual data entry and processing through precision automation."
      },
      {
        title: "Improved Scalability",
        description: "Handle business growth without proportionally increasing your operational workforce."
      }
    ],
    technologies: [
      "Zapier", "Make (Integromat)", "Power Automate", "Node.js", "Python", "REST APIs", "Webhooks", "UiPath", "Automation Anywhere"
    ],
    process: [
      {
        title: "Process Analysis",
        description: "We analyze your current workflows to identify bottlenecks and automation opportunities."
      },
      {
        title: "Solution Architecture",
        description: "Our team designs a comprehensive automation solution tailored to your specific business needs."
      },
      {
        title: "Development",
        description: "We build custom automation tools and integrate them with your existing systems."
      },
      {
        title: "Testing",
        description: "Rigorous testing ensures all automated processes work flawlessly and handle exceptions appropriately."
      },
      {
        title: "Implementation",
        description: "We carefully roll out automation solutions with minimal disruption to your operations."
      },
      {
        title: "Training and Support",
        description: "Your team receives comprehensive training and ongoing support to maximize automation benefits."
      }
    ],
    caseStudies: [
      {
        title: "Invoice Processing System",
        description: "Developed an automated system for a manufacturing company that processes invoices, matches purchase orders, and routes for approval.",
        outcome: "Reduced invoice processing time by 85% and eliminated data entry errors."
      },
      {
        title: "HR Onboarding Automation",
        description: "Created an end-to-end employee onboarding system that automates document collection, account provisioning, and training assignments.",
        outcome: "Reduced onboarding time from 3 days to 4 hours and improved new hire satisfaction."
      }
    ],
    faqs: [
      {
        question: "Which business processes can be automated?",
        answer: "Most repetitive, rule-based processes are candidates for automation, including data entry, document processing, approval workflows, reporting, and more."
      },
      {
        question: "How do you ensure security in automated processes?",
        answer: "We implement robust security measures including encryption, secure authentication, role-based access controls, and audit trails throughout all automation solutions."
      },
      {
        question: "What's the ROI for business automation?",
        answer: "Most clients see ROI within 3-6 months. We provide detailed ROI projections during the discovery phase based on your specific processes."
      },
      {
        question: "Can automation integrate with our legacy systems?",
        answer: "Yes, we specialize in creating integrations that connect modern automation tools with legacy systems, even those without native APIs."
      }
    ]
  },
  'ai-machine-learning': {
    title: "AI & Machine Learning",
    icon: "ai",
    slug: "ai-machine-learning",
    headline: "Intelligent solutions for data-driven decisions",
    description: "Our AI and machine learning services help you leverage the power of data to gain valuable insights, automate complex tasks, and make smarter business decisions.",
    intro: "Artificial Intelligence and Machine Learning are transforming how businesses operate, from customer interactions to predictive analytics. Our expertise in developing and implementing AI solutions allows you to harness the full potential of your data, creating competitive advantages and unlocking new opportunities for innovation.",
    image: "https://images.unsplash.com/photo-1677442320859-47621418c0f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80",
    features: [
      "Predictive analytics and forecasting",
      "Natural Language Processing (NLP)",
      "Computer vision and image recognition",
      "Recommendation systems",
      "Anomaly detection",
      "Conversational AI and chatbots",
      "Process automation with AI",
      "Custom machine learning models"
    ],
    benefits: [
      {
        title: "Data-Driven Insights",
        description: "Extract actionable intelligence from your data to guide strategic decision-making and identify opportunities."
      },
      {
        title: "Enhanced Customer Experiences",
        description: "Deploy AI-powered solutions that personalize interactions and anticipate customer needs."
      },
      {
        title: "Operational Efficiency",
        description: "Automate complex tasks and processes that previously required significant human intervention."
      },
      {
        title: "Competitive Advantage",
        description: "Stay ahead of the curve by leveraging cutting-edge AI technologies to solve business challenges."
      }
    ],
    technologies: [
      "Python", "TensorFlow", "PyTorch", "OpenAI", "Azure Cognitive Services", "AWS AI Services", "Computer Vision", "NLP", "Scikit-learn", "Hugging Face"
    ],
    process: [
      {
        title: "Problem Definition",
        description: "We work with you to clearly define the business problem that AI can solve for your organization."
      },
      {
        title: "Data Assessment",
        description: "Our team evaluates your data sources, quality, and structure to determine feasibility and requirements."
      },
      {
        title: "Solution Design",
        description: "We design a custom AI solution architecture tailored to your specific business needs."
      },
      {
        title: "Model Development",
        description: "Our data scientists build and train machine learning models using your data and industry best practices."
      },
      {
        title: "Testing and Validation",
        description: "Rigorous testing ensures the models perform reliably and accurately with real-world data."
      },
      {
        title: "Deployment and Integration",
        description: "We implement the AI solution into your existing systems and workflows."
      },
      {
        title: "Monitoring and Improvement",
        description: "Continuous monitoring and refinement ensure your AI solution improves over time."
      }
    ],
    caseStudies: [
      {
        title: "Predictive Maintenance System",
        description: "Developed an AI-powered predictive maintenance solution for a manufacturing company to forecast equipment failures.",
        outcome: "Reduced unplanned downtime by 37% and maintenance costs by 25% in the first year."
      },
      {
        title: "Customer Service AI Assistant",
        description: "Built a conversational AI platform that handles customer inquiries and routes complex issues to human agents.",
        outcome: "Automated 65% of customer service interactions while maintaining 93% customer satisfaction."
      }
    ],
    faqs: [
      {
        question: "Do we need a large amount of data to use AI?",
        answer: "While more data typically improves AI performance, we can work with smaller datasets using transfer learning and other techniques. We'll assess your data during the discovery phase."
      },
      {
        question: "How long does it take to develop an AI solution?",
        answer: "Timelines vary based on complexity, but most projects take 3-6 months from concept to deployment. We provide detailed timelines during our discovery process."
      },
      {
        question: "How do you ensure AI makes ethical decisions?",
        answer: "We implement rigorous bias testing, transparency measures, and human oversight in all our AI solutions to ensure ethical and fair decision-making."
      },
      {
        question: "Can AI solutions integrate with our existing systems?",
        answer: "Yes, we design our AI solutions to integrate seamlessly with your existing software, databases, and business processes."
      }
    ]
  },
  'interactive-data-dashboards': {
    title: "Interactive Data Dashboards",
    icon: "data",
    slug: "interactive-data-dashboards",
    headline: "Transform complex data into actionable insights",
    description: "Our custom dashboard solutions turn your raw data into intuitive visualizations that drive better decision-making and reveal hidden opportunities.",
    intro: "Interactive Data Dashboards provide real-time visibility into your key business metrics and performance indicators. Our custom dashboard solutions consolidate data from multiple sources, presenting it in visually compelling and easy-to-understand formats that enable faster, more informed decision-making across your organization.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    features: [
      "Real-time data visualization",
      "Interactive filtering and drill-down capabilities",
      "Customizable widgets and layouts",
      "Multi-source data integration",
      "Role-based access controls",
      "Automated reporting",
      "Mobile-responsive design",
      "Alert and notification systems"
    ],
    benefits: [
      {
        title: "Data Democratization",
        description: "Make data accessible to all stakeholders in a format they can understand and act upon."
      },
      {
        title: "Faster Decision Making",
        description: "Access real-time insights that enable quicker, more confident business decisions."
      },
      {
        title: "Performance Tracking",
        description: "Monitor KPIs and business metrics in real-time to stay on top of performance."
      },
      {
        title: "Trend Identification",
        description: "Spot patterns and trends that might be missed in traditional reports and spreadsheets."
      }
    ],
    technologies: [
      "Tableau", "Power BI", "D3.js", "Chart.js", "React", "SQL", "NoSQL", "REST APIs", "GraphQL", "ETL Tools"
    ],
    process: [
      {
        title: "Requirements Analysis",
        description: "We work with stakeholders to identify key metrics and reporting needs for your dashboard."
      },
      {
        title: "Data Assessment",
        description: "Our team evaluates your data sources and quality to determine integration requirements."
      },
      {
        title: "Dashboard Design",
        description: "We create intuitive dashboard layouts that highlight key metrics and support your decision-making processes."
      },
      {
        title: "Development",
        description: "Our engineers build the dashboard solution, including data connectors and interactive visualizations."
      },
      {
        title: "Testing",
        description: "Rigorous testing ensures accuracy, performance, and usability across devices."
      },
      {
        title: "Training and Deployment",
        description: "We deploy your dashboard and provide comprehensive training for your team."
      },
      {
        title: "Ongoing Support",
        description: "Continuous support ensures your dashboard evolves with your business needs."
      }
    ],
    caseStudies: [
      {
        title: "Sales Performance Dashboard",
        description: "Created a comprehensive sales dashboard for a retail company that tracks performance across regions, products, and sales teams.",
        outcome: "Increased sales team productivity by 23% and improved forecast accuracy by 35%."
      },
      {
        title: "Manufacturing Operations Dashboard",
        description: "Developed a real-time operations dashboard for a manufacturing facility to monitor production, quality, and maintenance metrics.",
        outcome: "Improved production efficiency by 18% and reduced quality issues by 27%."
      }
    ],
    faqs: [
      {
        question: "Can you integrate data from multiple systems?",
        answer: "Yes, our dashboards can consolidate data from multiple sources including CRMs, ERPs, databases, spreadsheets, and third-party APIs."
      },
      {
        question: "How do you handle data security?",
        answer: "We implement robust security measures including encryption, role-based access controls, and secure data transmission protocols to protect your sensitive information."
      },
      {
        question: "Can dashboards be accessed on mobile devices?",
        answer: "Yes, all our dashboard solutions are designed to be responsive and accessible across desktops, tablets, and smartphones."
      },
      {
        question: "How often is dashboard data updated?",
        answer: "Depending on your requirements and data sources, dashboards can be updated in real-time, hourly, daily, or on custom schedules."
      }
    ]
  },
  'digital-transformation': {
    title: "Digital Transformation",
    icon: "seo",
    slug: "digital-transformation",
    headline: "Modernize your business for the digital age",
    description: "Our comprehensive digital transformation services help you reimagine your business processes, customer experiences, and operational models using modern technology.",
    intro: "Digital Transformation is about leveraging technology to fundamentally change how your business operates and delivers value to customers. Our strategic approach combines technology expertise with business analysis to create sustainable transformation that drives growth, efficiency, and competitive advantage.",
    image: "https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1625&q=80",
    features: [
      "Digital strategy development",
      "Business process reengineering",
      "Legacy system modernization",
      "Cloud migration and adoption",
      "Enterprise application integration",
      "Data infrastructure modernization",
      "Digital workplace implementation",
      "Customer experience transformation"
    ],
    benefits: [
      {
        title: "Enhanced Customer Experience",
        description: "Create seamless, personalized customer journeys that build loyalty and drive retention."
      },
      {
        title: "Operational Efficiency",
        description: "Streamline processes and reduce costs through automation and modern technology adoption."
      },
      {
        title: "Business Agility",
        description: "Build adaptable systems and processes that can quickly respond to market changes."
      },
      {
        title: "Data-Driven Culture",
        description: "Foster a culture of data-informed decision making throughout your organization."
      }
    ],
    technologies: [
      "Cloud Platforms (AWS, Azure, GCP)", "Microservices", "Containers", "DevOps", "APIs", "Enterprise Integration", "Data Lakes/Warehouses", "Low-Code Platforms"
    ],
    process: [
      {
        title: "Digital Assessment",
        description: "We evaluate your current digital maturity, identify gaps, and prioritize transformation opportunities."
      },
      {
        title: "Strategy Development",
        description: "Our team creates a comprehensive digital roadmap aligned with your business objectives."
      },
      {
        title: "Solution Architecture",
        description: "We design scalable, future-proof technical architectures to support your transformation."
      },
      {
        title: "Implementation",
        description: "Our experts execute the digital initiatives in prioritized phases to deliver value quickly."
      },
      {
        title: "Change Management",
        description: "We support organizational adaptation through training, communication, and adoption strategies."
      },
      {
        title: "Measurement and Optimization",
        description: "Continuous monitoring of KPIs ensures transformation initiatives deliver expected outcomes."
      }
    ],
    caseStudies: [
      {
        title: "Retail Digital Transformation",
        description: "Led a comprehensive digital transformation for a retail chain, including e-commerce platform, inventory management, and customer loyalty systems.",
        outcome: "Increased online sales by 87%, reduced operational costs by 23%, and improved customer satisfaction scores."
      },
      {
        title: "Financial Services Modernization",
        description: "Transformed legacy banking systems into a modern, cloud-based architecture with enhanced customer-facing applications.",
        outcome: "Reduced IT maintenance costs by 40%, improved product launch speed by 65%, and enhanced customer retention."
      }
    ],
    faqs: [
      {
        question: "How long does digital transformation take?",
        answer: "Digital transformation is a journey rather than a destination. While initial projects may take 3-12 months, comprehensive transformation typically spans 1-3 years depending on organization size and complexity."
      },
      {
        question: "How do you handle resistance to change?",
        answer: "We implement proven change management methodologies, including stakeholder analysis, communication planning, training programs, and adoption strategies to ensure smooth transitions."
      },
      {
        question: "Can transformation be done in phases?",
        answer: "Yes, we recommend a phased approach that delivers quick wins while building toward long-term strategic goals. This reduces risk and demonstrates value early."
      },
      {
        question: "How do you measure transformation success?",
        answer: "We establish clear KPIs tied to business outcomes at the outset, then implement monitoring systems to track progress throughout the transformation journey."
      }
    ]
  },
  'uxui-design-systems': {
    title: "UX/UI Design Systems",
    icon: "design",
    slug: "uxui-design-systems",
    headline: "Create intuitive, cohesive digital experiences",
    description: "Our UX/UI design systems establish consistent, intuitive user experiences across all your digital products while strengthening your brand identity.",
    intro: "A well-crafted design system serves as the foundation for exceptional user experiences. By creating cohesive design languages, component libraries, and interaction patterns, we help you deliver consistent, intuitive interfaces that delight users while accelerating your development process and strengthening your brand identity.",
    image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    features: [
      "Comprehensive user research",
      "User journey mapping",
      "Information architecture design",
      "Wireframing and prototyping",
      "Visual design and branding",
      "Component library development",
      "Interaction design patterns",
      "Accessibility implementation"
    ],
    benefits: [
      {
        title: "Consistent User Experience",
        description: "Create cohesive experiences across all touchpoints to build user trust and familiarity."
      },
      {
        title: "Accelerated Development",
        description: "Streamline development with reusable components and established patterns."
      },
      {
        title: "Improved Brand Perception",
        description: "Strengthen brand identity through consistent visual language and interactions."
      },
      {
        title: "Enhanced Accessibility",
        description: "Build inclusive experiences that work for all users, including those with disabilities."
      }
    ],
    technologies: [
      "Figma", "Adobe XD", "Sketch", "InVision", "Storybook", "React", "CSS/SCSS", "Tailwind CSS", "Framer Motion", "Web Accessibility Standards"
    ],
    process: [
      {
        title: "Discovery and Research",
        description: "We analyze user needs, business goals, and current experiences to establish a strong foundation."
      },
      {
        title: "Information Architecture",
        description: "Our team creates intuitive structures for your digital products based on user expectations."
      },
      {
        title: "Wireframing and Prototyping",
        description: "We develop low and high-fidelity prototypes to test concepts before full implementation."
      },
      {
        title: "Visual Design",
        description: "Our designers craft beautiful, branded interfaces that align with your identity."
      },
      {
        title: "Component Development",
        description: "We build a comprehensive library of reusable, accessible UI components."
      },
      {
        title: "Documentation",
        description: "Detailed guidelines ensure consistent implementation across all products and teams."
      },
      {
        title: "Testing and Refinement",
        description: "User testing validates design decisions and identifies opportunities for improvement."
      }
    ],
    caseStudies: [
      {
        title: "E-commerce Design System",
        description: "Created a comprehensive design system for a multi-brand e-commerce platform, including component library and interaction patterns.",
        outcome: "Reduced design and development time by 40% and increased conversion rates by 22% through improved user experience."
      },
      {
        title: "Financial Services App Redesign",
        description: "Redesigned a banking application with a focus on simplicity, accessibility, and intuitive interactions.",
        outcome: "Improved user satisfaction scores by 48% and increased mobile banking adoption by 35%."
      }
    ],
    faqs: [
      {
        question: "What's the difference between a UI kit and a design system?",
        answer: "A UI kit is a collection of visual elements, while a design system is more comprehensive, including interaction patterns, usage guidelines, principles, and often code components."
      },
      {
        question: "How long does it take to create a design system?",
        answer: "Initial versions typically take 2-3 months to develop, with ongoing refinement and expansion. We create phased implementation plans to deliver value incrementally."
      },
      {
        question: "How do you ensure designs are accessible?",
        answer: "We follow WCAG guidelines throughout the design process, incorporating accessible color contrast, keyboard navigation, screen reader compatibility, and other accessibility best practices."
      },
      {
        question: "Can a design system work with our existing products?",
        answer: "Yes, we can create design systems that evolve from your current interfaces, allowing for gradual implementation without disrupting existing users."
      }
    ]
  }
};

// Map service slugs to icons for lookup
const serviceSlugToIconMap = {
  'modern-web-applications': 'development',
  'smart-business-automation': 'strategy',
  'ai-machine-learning': 'ai',
  'interactive-data-dashboards': 'data',
  'digital-transformation': 'seo',
  'uxui-design-systems': 'design'
};

// Component for benefit card
const BenefitCard = ({ title, description }: { title: string; description: string }) => {
  return (
    <motion.div 
      className="dark:bg-[#161B22]/60 light:bg-white/90 backdrop-blur-sm p-6 rounded-xl border dark:border-[#30363D] light:border-gray-200 h-full"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <GlowingEffect
        spread={10}
        glow={true}
        disabled={false}
        proximity={80}
        inactiveZone={0}
        borderWidth={1}
        movementDuration={0.3}
      />
      <div className="flex items-center gap-3 mb-3">
        <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-[#00A0B0] to-[#4D4DFF] shadow-lg">
          <FiCheckCircle className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-xl font-poppins font-semibold">{title}</h3>
      </div>
      <p className="dark:text-[#8B949E] light:text-gray-600">{description}</p>
    </motion.div>
  );
};

// Component for process step
const ProcessStep = ({ number, title, description }: { number: number; title: string; description: string }) => {
  return (
    <motion.div 
      className="flex gap-4 relative"
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#00A0B0] to-[#4D4DFF] font-poppins font-bold text-sm mt-1">
        {number}
      </div>
      <div>
        <h4 className="text-lg font-poppins font-semibold mb-2">{title}</h4>
        <p className="dark:text-[#8B949E] light:text-gray-600 mb-8">{description}</p>
      </div>
    </motion.div>
  );
};

// Component for case study
const CaseStudy = ({ title, description, outcome }: { title: string; description: string; outcome: string }) => {
  return (
    <motion.div 
      className="dark:bg-[#161B22]/60 light:bg-white/90 backdrop-blur-sm p-6 rounded-xl border dark:border-[#30363D] light:border-gray-200"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <h4 className="text-xl font-poppins font-semibold mb-3">{title}</h4>
      <p className="dark:text-[#8B949E] light:text-gray-600 mb-4">{description}</p>
      <div className="flex items-start gap-2">
        <div className="flex-shrink-0 mt-1">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#00A0B0] to-[#4D4DFF] flex items-center justify-center">
            <ChevronRight className="h-3 w-3 text-white" />
          </div>
        </div>
        <p className="font-medium">{outcome}</p>
      </div>
    </motion.div>
  );
};

// Component for FAQ item
const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b dark:border-[#30363D] light:border-gray-200 last:border-b-0">
      <button 
        className="flex justify-between items-center w-full py-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h4 className="text-lg font-poppins font-medium">{question}</h4>
        <div className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronRight className="h-5 w-5 rotate-90" />
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'}`}>
        <p className="dark:text-[#8B949E] light:text-gray-600">{answer}</p>
      </div>
    </div>
  );
};

// Main component
const ServiceDetailPage = () => {
  // Get slug from URL
  const [location] = useLocation();
  const slug = location.split('/').pop() || '';
  
  // Default to first service if slug not found
  const serviceData = serviceContent[slug as keyof typeof serviceContent] || 
                      serviceContent['modern-web-applications'];
  
  // Ensure scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${serviceData.title} | Digital Studio Labs`;
  }, [serviceData.title]);

  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen">
        {/* Floating ambient effects */}
        <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none">
          <FloatingOrbs 
            count={8}
            colors={['#4D4DFF', '#00A0B0']}
            minSize={150}
            maxSize={300}
            minSpeed={0.1}
            maxSpeed={0.2}
            minOpacity={0.03}
            maxOpacity={0.08}
          />
        </div>
        
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <SpotlightLayout withMultipleSpotlights spotlightSize={800} spotlightColor="#4D4DFF">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="w-full md:w-1/2">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <Link href="/services" className="text-[#00A0B0] hover:text-[#4D4DFF] transition-colors">
                        Services
                      </Link>
                      <ChevronRight className="h-4 w-4 text-[#8B949E]" />
                      <span className="text-[#8B949E]">{serviceData.title}</span>
                    </div>
                    
                    <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-6">
                      <span className="gradient-text-animated gradient-text-glow">{serviceData.title}</span>
                    </h1>
                    
                    <p className="text-xl dark:text-[#8B949E] light:text-gray-600 mb-8">
                      {serviceData.headline}
                    </p>
                    
                    <div className="flex flex-wrap gap-4">
                      <StarButton href="/contact" size="lg">
                        Schedule Consultation
                      </StarButton>
                      <Link 
                        href="#features" 
                        className="inline-flex items-center gap-2 text-[#00A0B0] hover:text-[#4D4DFF] transition-colors bg-[#00A0B0]/10 hover:bg-[#00A0B0]/20 px-6 py-3 rounded-md"
                      >
                        <Play className="h-5 w-5" />
                        Learn More
                      </Link>
                    </div>
                  </motion.div>
                </div>
                
                <div className="w-full md:w-1/2">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00A0B0]/20 to-[#4D4DFF]/20 rounded-xl blur-xl"></div>
                    <div className="w-20 h-20 absolute -top-10 -left-10 bg-gradient-to-br from-[#00A0B0] to-[#4D4DFF] rounded-2xl flex items-center justify-center p-5 z-10">
                      <ServiceIcon icon={serviceData.icon} />
                    </div>
                    <div className="rounded-xl overflow-hidden border dark:border-[#30363D] light:border-gray-200 relative z-0">
                      <img 
                        src={serviceData.image} 
                        alt={serviceData.title}
                        className="w-full h-auto object-cover rounded-xl hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </SpotlightLayout>
        </section>
        
        {/* Overview Section */}
        <section id="overview" className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-poppins font-bold mb-8 text-center">
                  Overview
                </h2>
                <div className="dark:text-[#E6EDF3] light:text-gray-700 text-lg leading-relaxed space-y-6">
                  <p>{serviceData.intro}</p>
                  <p className="dark:text-[#8B949E] light:text-gray-600">
                    Our team of experienced {serviceData.title.toLowerCase()} experts works closely with you to understand your unique needs and deliver tailored solutions that drive tangible business results.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section id="features" className="py-16 dark:bg-[#0D1117]/50 light:bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-poppins font-bold mb-4">
                Key <span className="gradient-text">Features</span>
              </h2>
              <p className="dark:text-[#8B949E] light:text-gray-600 text-lg max-w-2xl mx-auto">
                Comprehensive {serviceData.title.toLowerCase()} capabilities designed to deliver exceptional results
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {serviceData.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="dark:bg-[#161B22]/60 light:bg-white/90 backdrop-blur-sm p-6 rounded-xl border dark:border-[#30363D] light:border-gray-200"
                  whileHover={{ y: -5 }}
                >
                  <CheckCircle className="text-[#00A0B0] mb-4 h-6 w-6" />
                  <h3 className="font-medium text-lg mb-2">{feature}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section id="benefits" className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-poppins font-bold mb-4">
                Key <span className="gradient-text">Benefits</span>
              </h2>
              <p className="dark:text-[#8B949E] light:text-gray-600 text-lg max-w-2xl mx-auto">
                How our {serviceData.title.toLowerCase()} services create value for your business
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {serviceData.benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <BenefitCard 
                    title={benefit.title} 
                    description={benefit.description} 
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Technologies Section */}
        <section id="technologies" className="py-16 dark:bg-[#0D1117]/50 light:bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-poppins font-bold mb-4">
                Technologies & <span className="gradient-text">Tools</span>
              </h2>
              <p className="dark:text-[#8B949E] light:text-gray-600 text-lg max-w-2xl mx-auto">
                We leverage industry-leading technologies to deliver powerful {serviceData.title.toLowerCase()} solutions
              </p>
            </motion.div>
            
            <motion.div 
              className="flex flex-wrap justify-center gap-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {serviceData.technologies.map((tech, index) => (
                <motion.div
                  key={index}
                  className="px-4 py-2 bg-gradient-to-br from-[#161B22] to-[#0D1117] rounded-full border dark:border-[#30363D] light:border-gray-200"
                  whileHover={{ y: -3, scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-[#00A0B0]">{tech}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        
        {/* Process Section */}
        <section id="process" className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-poppins font-bold mb-4">
                Our <span className="gradient-text">Process</span>
              </h2>
              <p className="dark:text-[#8B949E] light:text-gray-600 text-lg max-w-2xl mx-auto">
                How we approach {serviceData.title.toLowerCase()} projects to ensure successful outcomes
              </p>
            </motion.div>
            
            <div className="max-w-4xl mx-auto">
              {serviceData.process.map((step, index) => (
                <ProcessStep 
                  key={index}
                  number={index + 1}
                  title={step.title}
                  description={step.description}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Case Studies Section */}
        <section id="case-studies" className="py-16 dark:bg-[#0D1117]/50 light:bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-poppins font-bold mb-4">
                Success <span className="gradient-text">Stories</span>
              </h2>
              <p className="dark:text-[#8B949E] light:text-gray-600 text-lg max-w-2xl mx-auto">
                Real-world results from our {serviceData.title.toLowerCase()} projects
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {serviceData.caseStudies.map((caseStudy, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <CaseStudy
                    title={caseStudy.title}
                    description={caseStudy.description}
                    outcome={caseStudy.outcome}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* FAQs Section */}
        <section id="faqs" className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-poppins font-bold mb-4">
                Frequently Asked <span className="gradient-text">Questions</span>
              </h2>
              <p className="dark:text-[#8B949E] light:text-gray-600 text-lg max-w-2xl mx-auto">
                Common questions about our {serviceData.title.toLowerCase()} services
              </p>
            </motion.div>
            
            <div className="max-w-3xl mx-auto">
              {serviceData.faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="dark:bg-[#161B22]/80 light:bg-gray-900 rounded-xl p-8 md:p-12 relative overflow-hidden border dark:border-[#30363D] light:border-gray-800"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <GlowingEffect
                spread={30}
                glow={true}
                disabled={false}
                proximity={120}
                inactiveZone={0}
                borderWidth={1}
                movementDuration={0.5}
                className="will-change-transform"
              />
              
              {/* Background Decoration */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute -right-20 top-0 rounded-full w-64 h-64 bg-[#4D4DFF] blur-3xl"></div>
                <div className="absolute -left-20 bottom-0 rounded-full w-64 h-64 bg-[#00A0B0] blur-3xl"></div>
              </div>
              
              <div className="relative z-10">
                <div className="md:flex md:items-center md:justify-between">
                  <div className="mb-8 md:mb-0 md:max-w-2xl">
                    <h2 className="text-3xl font-poppins font-bold mb-4">
                      Ready to discuss your {serviceData.title.toLowerCase()} needs?
                    </h2>
                    <p className="dark:text-[#8B949E] light:text-gray-300 text-lg mb-6">
                      Our team of experts is ready to help you create innovative solutions that drive real business results.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Phone className="h-5 w-5 text-[#00A0B0] mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Call us</p>
                          <a 
                            href={`tel:${COMPANY_PHONE.replace(/[^0-9]/g, '')}`} 
                            className="dark:text-[#8B949E] light:text-gray-300 hover:text-[#00A0B0] transition-colors"
                          >
                            {COMPANY_PHONE}
                          </a>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Mail className="h-5 w-5 text-[#00A0B0] mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Email us</p>
                          <a 
                            href={`mailto:${COMPANY_EMAIL}`} 
                            className="dark:text-[#8B949E] light:text-gray-300 hover:text-[#00A0B0] transition-colors"
                          >
                            {COMPANY_EMAIL}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <StarButton href="/contact" size="lg">
                      Schedule a Consultation
                    </StarButton>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Related Services Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-poppins font-bold mb-4">
                Related <span className="gradient-text">Services</span>
              </h2>
              <p className="dark:text-[#8B949E] light:text-gray-600 text-lg max-w-2xl mx-auto">
                Explore other ways we can help transform your business
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {SERVICES.filter(service => service.title !== serviceData.title)
                .slice(0, 3)
                .map((service, index) => (
                  <motion.div 
                    key={service.id}
                    className="relative dark:bg-[#161B22] light:bg-white light:shadow-md p-8 rounded-xl border dark:border-[#30363D] light:border-gray-200 transition-all duration-300 group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <GlowingEffect
                      spread={20}
                      glow={true}
                      disabled={false}
                      proximity={100}
                      inactiveZone={0}
                      borderWidth={1}
                      movementDuration={0.5}
                      className="will-change-transform"
                    />
                    
                    <motion.div 
                      className="w-16 h-16 bg-gradient-to-br from-[#00A0B0] to-[#4D4DFF] rounded-xl flex items-center justify-center mb-6 p-4 group-hover:scale-110 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ServiceIcon icon={service.icon} size={28} />
                    </motion.div>
                    
                    <h3 className="text-xl font-poppins font-semibold mb-4">{service.title}</h3>
                    <p className="dark:text-[#8B949E] light:text-gray-600 mb-6 line-clamp-3">
                      {service.description}
                    </p>
                    
                    <Link 
                      href={`/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`} 
                      className="inline-flex items-center text-[#00A0B0] hover:text-[#4D4DFF] font-medium transition-colors"
                    >
                      Learn more <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </motion.div>
                ))}
            </div>
            
            <div className="text-center mt-12">
              <Link 
                href="/services" 
                className="inline-flex items-center text-[#00A0B0] hover:text-[#4D4DFF] font-medium transition-colors"
              >
                View all services <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ServiceDetailPage;