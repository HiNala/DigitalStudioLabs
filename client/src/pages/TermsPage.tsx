import { PageWrapper } from "@/components/layout/PageWrapper";
import { TitleSection } from "@/components/sections/TitleSection";
import { COMPANY_NAME } from "@/lib/constants";

const TermsPage = () => {
  return (
    <PageWrapper 
      title="Terms of Service" 
      description="Our terms of service outline the rules, guidelines, and obligations that govern the use of our services."
    >
      <TitleSection
        title="Terms of Service"
        subtitle="Last updated: June 2023"
      />
      
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p>
            Welcome to {COMPANY_NAME}. By accessing or using our website and services, you agree to be bound by these Terms of Service. 
            Please read these terms carefully before using our services.
          </p>
          
          <h2>Use of Our Services</h2>
          <p>
            You may use our services only as permitted by these terms and any applicable laws or regulations. 
            You agree not to misuse our services or help anyone else do so.
          </p>
          
          <h2>Your Account</h2>
          <p>
            To access certain features of our website, you may be required to provide information about yourself. 
            You agree that any information you provide will be accurate, current, and complete. 
            You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
          </p>
          
          <h2>Intellectual Property</h2>
          <p>
            All content on our website, including text, graphics, logos, images, and software, is the property of {COMPANY_NAME} 
            or its content suppliers and is protected by intellectual property laws. You may not use, reproduce, distribute, 
            or create derivative works from our content without explicit permission.
          </p>
          
          <h2>User-Generated Content</h2>
          <p>
            You retain ownership of any content you submit, post, or display on or through our services. 
            By submitting content, you grant {COMPANY_NAME} a worldwide, royalty-free license to use, reproduce, 
            modify, distribute, and display your content in connection with our services.
          </p>
          
          <h2>Privacy</h2>
          <p>
            Your use of our services is also governed by our Privacy Policy, which outlines how we collect, use, 
            and protect your personal information. By using our services, you consent to the collection and use of 
            information as described in our <a href="/privacy">Privacy Policy</a>.
          </p>
          
          <h2>Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, {COMPANY_NAME} shall not be liable for any indirect, incidental, 
            special, consequential, or punitive damages resulting from your access to or use of, or inability to access 
            or use, our services.
          </p>
          
          <h2>Warranty Disclaimer</h2>
          <p>
            Our services are provided "as is" without any warranties, expressed or implied. {COMPANY_NAME} does not 
            warrant that our services will be uninterrupted, secure, or error-free, or that defects will be corrected.
          </p>
          
          <h2>Changes to Terms</h2>
          <p>
            We may revise these Terms of Service at any time without notice. By continuing to use our services after 
            any changes, you agree to be bound by the revised terms.
          </p>
          
          <h2>Termination</h2>
          <p>
            We may terminate or suspend your access to our services immediately, without prior notice or liability, 
            for any reason, including breach of these Terms of Service.
          </p>
          
          <h2>Governing Law</h2>
          <p>
            These Terms of Service shall be governed by and construed in accordance with the laws of the jurisdiction 
            where {COMPANY_NAME} is established, without regard to its conflict of law provisions.
          </p>
          
          <h2>Contact Information</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us at:
          </p>
          <ul>
            <li>Email: info@{COMPANY_NAME.toLowerCase()}.com</li>
            <li>Contact form: <a href="/contact">Contact Page</a></li>
          </ul>
        </div>
      </section>
    </PageWrapper>
  );
};

export default TermsPage; 