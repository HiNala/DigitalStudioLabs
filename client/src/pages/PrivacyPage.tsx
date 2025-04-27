import { PageWrapper } from "@/components/layout/PageWrapper";
import { TitleSection } from "@/components/sections/TitleSection";
import { COMPANY_NAME } from "@/constants";

const PrivacyPage = () => {
  return (
    <PageWrapper 
      title="Privacy Policy" 
      description="Our commitment to protecting your privacy and personal data."
    >
      <TitleSection
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your information"
      />
      
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="prose prose-lg dark:prose-invert mx-auto">
          <p className="text-gray-600 dark:text-gray-300">
            Last Updated: {new Date().toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800 dark:text-gray-100">Introduction</h2>
          <p className="text-gray-600 dark:text-gray-300">
            At {COMPANY_NAME}, we respect your privacy and are committed to protecting your personal data.
            This privacy policy will inform you about how we look after your personal data when you visit our website
            and tell you about your privacy rights and how the law protects you.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800 dark:text-gray-100">Information We Collect</h2>
          <p className="text-gray-600 dark:text-gray-300">
            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
          </p>
          <ul className="mt-4 list-disc pl-6 text-gray-600 dark:text-gray-300">
            <li>Identity Data includes first name, last name, username or similar identifier.</li>
            <li>Contact Data includes email address and telephone numbers.</li>
            <li>Technical Data includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
            <li>Usage Data includes information about how you use our website, products and services.</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800 dark:text-gray-100">How We Use Your Information</h2>
          <p className="text-gray-600 dark:text-gray-300">
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </p>
          <ul className="mt-4 list-disc pl-6 text-gray-600 dark:text-gray-300">
            <li>To provide and maintain our services.</li>
            <li>To notify you about changes to our services.</li>
            <li>To allow you to participate in interactive features of our services when you choose to do so.</li>
            <li>To provide customer support.</li>
            <li>To gather analysis or valuable information so that we can improve our services.</li>
            <li>To monitor the usage of our services.</li>
            <li>To detect, prevent and address technical issues.</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800 dark:text-gray-100">Cookies</h2>
          <p className="text-gray-600 dark:text-gray-300">
            We use cookies and similar tracking technologies to track the activity on our service and hold certain information.
            Cookies are files with a small amount of data which may include an anonymous unique identifier.
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800 dark:text-gray-100">Data Security</h2>
          <p className="text-gray-600 dark:text-gray-300">
            We have implemented appropriate security measures to prevent your personal data from being accidentally lost,
            used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data
            to those employees, agents, contractors and other third parties who have a business need to know.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800 dark:text-gray-100">Your Legal Rights</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
          </p>
          <ul className="mt-4 list-disc pl-6 text-gray-600 dark:text-gray-300">
            <li>Request access to your personal data.</li>
            <li>Request correction of your personal data.</li>
            <li>Request erasure of your personal data.</li>
            <li>Object to processing of your personal data.</li>
            <li>Request restriction of processing your personal data.</li>
            <li>Request transfer of your personal data.</li>
            <li>Right to withdraw consent.</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800 dark:text-gray-100">Changes to This Privacy Policy</h2>
          <p className="text-gray-600 dark:text-gray-300">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
            You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800 dark:text-gray-100">Contact Us</h2>
          <p className="text-gray-600 dark:text-gray-300">
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <ul className="mt-4 list-disc pl-6 text-gray-600 dark:text-gray-300">
            <li>By email: info@example.com</li>
            <li>By phone: (123) 456-7890</li>
          </ul>
        </div>
      </section>
    </PageWrapper>
  );
};

export default PrivacyPage; 