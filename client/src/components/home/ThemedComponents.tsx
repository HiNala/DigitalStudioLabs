import { CheckCircle2, X, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { 
  ThemedCard, 
  ThemedTable, 
  ThemedTableHead, 
  ThemedTableRow,
  ThemedTestimonial,
  ThemedCTA
} from '@/components/ui/themed-card';

export function ServiceCard() {
  return (
    <ThemedCard variant="elevated" className="p-8 card-scale h-full">
      <div className="w-16 h-16 gradient-bg rounded-lg flex items-center justify-center mb-6">
        <i className="bx development text-2xl text-white"></i>
      </div>
      <h2 className="text-2xl font-poppins font-bold mb-4">Modern Web Applications</h2>
      <ul className="space-y-3 mb-6">
        <li className="flex items-start">
          <CheckCircle2 className="text-[#00A0B0] mr-2 h-5 w-5 flex-shrink-0 mt-0.5" />
          <span>High-performance applications built with modern technologies</span>
        </li>
        <li className="flex items-start">
          <CheckCircle2 className="text-[#00A0B0] mr-2 h-5 w-5 flex-shrink-0 mt-0.5" />
          <span>Cross-platform compatibility for all devices</span>
        </li>
        <li className="flex items-start">
          <CheckCircle2 className="text-[#00A0B0] mr-2 h-5 w-5 flex-shrink-0 mt-0.5" />
          <span>Intuitive user interfaces with exceptional UX</span>
        </li>
        <li className="flex items-start">
          <CheckCircle2 className="text-[#00A0B0] mr-2 h-5 w-5 flex-shrink-0 mt-0.5" />
          <span>Scalable architecture for future growth</span>
        </li>
      </ul>
      <Link href="/contact" className="inline-flex items-center gradient-bg gradient-bg-hover px-6 py-3 rounded-md font-medium transition-all duration-300 glow-hover">
        Discuss Your Project <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </ThemedCard>
  );
}

export function PricingTable() {
  return (
    <ThemedTable>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <ThemedTableHead>
              <th className="p-4 text-left border-b border-[#30363D] w-[300px]">Feature</th>
              <th className="p-4 text-center border-b border-[#30363D]">Basic</th>
              <th className="p-4 text-center border-b border-[#30363D]">Professional</th>
              <th className="p-4 text-center border-b border-[#30363D]">Enterprise</th>
            </ThemedTableHead>
          </thead>
          <tbody>
            <ThemedTableRow>
              <td className="p-4 font-medium">Initial Consultation</td>
              <td className="p-4 text-center"><CheckCircle2 className="h-5 w-5 text-[#00A0B0] mx-auto" /></td>
              <td className="p-4 text-center"><CheckCircle2 className="h-5 w-5 text-[#00A0B0] mx-auto" /></td>
              <td className="p-4 text-center"><CheckCircle2 className="h-5 w-5 text-[#00A0B0] mx-auto" /></td>
            </ThemedTableRow>
            <ThemedTableRow>
              <td className="p-4 font-medium">Requirements Analysis</td>
              <td className="p-4 text-center"><CheckCircle2 className="h-5 w-5 text-[#00A0B0] mx-auto" /></td>
              <td className="p-4 text-center"><CheckCircle2 className="h-5 w-5 text-[#00A0B0] mx-auto" /></td>
              <td className="p-4 text-center"><CheckCircle2 className="h-5 w-5 text-[#00A0B0] mx-auto" /></td>
            </ThemedTableRow>
            <ThemedTableRow>
              <td className="p-4 font-medium">24/7 Support</td>
              <td className="p-4 text-center"><X className="h-5 w-5 text-[#8B949E] mx-auto" /></td>
              <td className="p-4 text-center"><X className="h-5 w-5 text-[#8B949E] mx-auto" /></td>
              <td className="p-4 text-center"><CheckCircle2 className="h-5 w-5 text-[#00A0B0] mx-auto" /></td>
            </ThemedTableRow>
          </tbody>
        </table>
      </div>
    </ThemedTable>
  );
}

export function Testimonial() {
  return (
    <ThemedTestimonial>
      <div className="mb-6">
        <svg width="30" height="24" viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.8182 0H7.63636L0 12V24H12V12H4.36364L12.8182 0ZM30 0H24.8182L17.1818 12V24H29.1818V12H21.5455L30 0Z" fill="url(#paint0_linear)"></path>
          <defs>
            <linearGradient id="paint0_linear" x1="0" y1="0" x2="30" y2="24" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00A0B0"></stop>
              <stop offset="1" stopColor="#4D4DFF"></stop>
            </linearGradient>
          </defs>
        </svg>
      </div>
      <p className="dark:text-[#E6EDF3] light:text-gray-800 italic mb-6">Digital Studio Labs transformed our outdated website into a lead-generating machine. Our conversion rate increased by 78% within the first month after launch.</p>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" alt="Michael Thompson" className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="font-medium">Michael Thompson</p>
          <p className="text-sm dark:text-[#8B949E] light:text-gray-600">CEO, Thompson Real Estate</p>
        </div>
      </div>
    </ThemedTestimonial>
  );
}

export function CTAComponent() {
  return (
    <ThemedCTA>
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-6">Ready to Transform Your Business?</h2>
        <p className="dark:text-[#8B949E] light:text-gray-600 text-lg mb-10">
          Contact us today to discuss how our innovative solutions can help you achieve your goals.
        </p>
        <Link href="/contact" className="gradient-bg gradient-bg-hover px-8 py-4 rounded-md font-medium text-lg transition-all duration-300 glow-hover inline-flex items-center">
          Get Started <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
      <div className="absolute inset-0 opacity-5">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-[#4D4DFF]"></div>
      </div>
    </ThemedCTA>
  );
}

export function FeatureCard() {
  return (
    <ThemedCard variant="bordered" className="p-6">
      <h3 className="text-xl font-poppins font-semibold mb-2">Concept-to-Completion Showcase</h3>
      <p className="dark:text-[#8B949E] light:text-gray-600 m-0">
        From initial wireframes to polished deployments, you'll see every milestone tracked—demonstrating our commitment to transparency and measurable outcomes.
      </p>
    </ThemedCard>
  );
}

export default function ThemedComponents() {
  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      <div>
        <h2 className="text-2xl font-bold mb-6">Service Card</h2>
        <ServiceCard />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-6">Pricing Table</h2>
        <PricingTable />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-6">Testimonial</h2>
        <Testimonial />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-6">CTA Component</h2>
        <CTAComponent />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-6">Feature Card</h2>
        <FeatureCard />
      </div>
    </div>
  );
} 