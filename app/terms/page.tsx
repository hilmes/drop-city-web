import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — Drop City',
  description: 'Terms of Service for Drop City, the AR location-based drop app.',
};

export default function Terms() {
  return (
    <div className="pt-32 pb-24 px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="mb-16">
          <p className="label text-gray-400 mb-4">Legal</p>
          <h1 className="text-title font-extralight mb-4">
            Terms of Service
          </h1>
          <p className="text-small text-gray-400">
            Last updated: February 3, 2025
          </p>
        </header>

        {/* Content */}
        <div className="space-y-12 text-body text-gray-600 dark:text-gray-400">
          <section>
            <h2 className="text-heading font-light text-gray-700 dark:text-gray-200 mb-4">
              Agreement to Terms
            </h2>
            <p>
              By accessing or using Drop City ("the App"), you agree to be bound 
              by these Terms of Service ("Terms"). If you do not agree to these 
              Terms, do not use the App.
            </p>
          </section>

          <section>
            <h2 className="text-heading font-light text-gray-700 dark:text-gray-200 mb-4">
              Description of Service
            </h2>
            <p>
              Drop City is a mobile application that allows users to create, 
              discover, and interact with augmented reality (AR) content anchored 
              to real-world GPS coordinates. The service includes creating "drops" 
              (AR content), viewing drops created by others, and social features 
              such as following other users.
            </p>
          </section>

          <section>
            <h2 className="text-heading font-light text-gray-700 dark:text-gray-200 mb-4">
              User Accounts
            </h2>
            <div className="space-y-4">
              <p>
                To use certain features of the App, you must create an account. 
                You agree to:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Immediately notify us of any unauthorized use</li>
                <li>Accept responsibility for all activities under your account</li>
              </ul>
              <p>
                You must be at least 13 years old to use the App. If you are 
                under 18, you must have parental consent.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-heading font-light text-gray-700 dark:text-gray-200 mb-4">
              User Content
            </h2>
            <div className="space-y-4">
              <p>
                You retain ownership of content you create ("User Content"). 
                By posting User Content, you grant us a worldwide, non-exclusive, 
                royalty-free license to use, display, and distribute your content 
                as necessary to provide the service.
              </p>
              <p>You agree not to post content that:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Infringes intellectual property rights</li>
                <li>Is illegal, harmful, threatening, or harassing</li>
                <li>Contains malware or malicious code</li>
                <li>Impersonates others or misrepresents your identity</li>
                <li>Violates others' privacy</li>
                <li>Is spam or unauthorized advertising</li>
                <li>Is obscene, defamatory, or discriminatory</li>
              </ul>
              <p>
                We reserve the right to remove any content that violates these 
                Terms or is otherwise objectionable at our sole discretion.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-heading font-light text-gray-700 dark:text-gray-200 mb-4">
              Acceptable Use
            </h2>
            <p className="mb-4">You agree not to:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Use the App for any illegal purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with the proper functioning of the App</li>
              <li>Create drops in locations where you don't have permission</li>
              <li>Use the App while operating a vehicle or in dangerous situations</li>
              <li>Scrape, crawl, or collect data from the App</li>
              <li>Reverse engineer or decompile the App</li>
            </ul>
          </section>

          <section>
            <h2 className="text-heading font-light text-gray-700 dark:text-gray-200 mb-4">
              Location Services
            </h2>
            <p>
              The App requires access to your device's location. By using the App, 
              you consent to the collection and use of your location data as 
              described in our Privacy Policy. You understand that AR drops are 
              tied to specific GPS coordinates and may be discoverable by other 
              users in those locations.
            </p>
          </section>

          <section>
            <h2 className="text-heading font-light text-gray-700 dark:text-gray-200 mb-4">
              Safety
            </h2>
            <div className="space-y-4">
              <p>
                You are responsible for your own safety while using the App. 
                Always be aware of your surroundings when viewing AR content.
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Do not trespass on private property to access drops</li>
                <li>Do not use the App in unsafe areas or situations</li>
                <li>Do not use the App while driving or operating machinery</li>
                <li>Be respectful of others in public spaces</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-heading font-light text-gray-700 dark:text-gray-200 mb-4">
              Intellectual Property
            </h2>
            <p>
              The App, including its design, code, and branding, is owned by 
              Drop City and protected by intellectual property laws. You may not 
              copy, modify, or distribute our intellectual property without 
              written permission.
            </p>
          </section>

          <section>
            <h2 className="text-heading font-light text-gray-700 dark:text-gray-200 mb-4">
              Disclaimers
            </h2>
            <div className="space-y-4">
              <p className="uppercase font-medium text-small">
                THE APP IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, 
                EXPRESS OR IMPLIED.
              </p>
              <p>
                We do not guarantee that the App will be uninterrupted, secure, 
                or error-free. We are not responsible for any damage to your 
                device or loss of data. GPS accuracy may vary based on device 
                and environmental conditions.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-heading font-light text-gray-700 dark:text-gray-200 mb-4">
              Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by law, Drop City shall not be 
              liable for any indirect, incidental, special, consequential, or 
              punitive damages, including loss of profits, data, or goodwill, 
              arising from your use of the App.
            </p>
          </section>

          <section>
            <h2 className="text-heading font-light text-gray-700 dark:text-gray-200 mb-4">
              Indemnification
            </h2>
            <p>
              You agree to indemnify and hold harmless Drop City and its 
              affiliates from any claims, damages, or expenses arising from 
              your use of the App, your User Content, or your violation of 
              these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-heading font-light text-gray-700 dark:text-gray-200 mb-4">
              Termination
            </h2>
            <p>
              We may suspend or terminate your account at any time for any 
              reason, including violation of these Terms. You may delete your 
              account at any time through the App settings. Upon termination, 
              your right to use the App ceases immediately.
            </p>
          </section>

          <section>
            <h2 className="text-heading font-light text-gray-700 dark:text-gray-200 mb-4">
              Changes to Terms
            </h2>
            <p>
              We may modify these Terms at any time. We will notify you of 
              significant changes through the App or via email. Continued use 
              of the App after changes constitutes acceptance of the updated 
              Terms.
            </p>
          </section>

          <section>
            <h2 className="text-heading font-light text-gray-700 dark:text-gray-200 mb-4">
              Governing Law
            </h2>
            <p>
              These Terms are governed by the laws of the United States and 
              the State of California, without regard to conflict of law 
              principles. Any disputes shall be resolved in the courts of 
              San Francisco County, California.
            </p>
          </section>

          <section>
            <h2 className="text-heading font-light text-gray-700 dark:text-gray-200 mb-4">
              Contact
            </h2>
            <p>
              Questions about these Terms? Contact us at legal@dropcity.io.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
