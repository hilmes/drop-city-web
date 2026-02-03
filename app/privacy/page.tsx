import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — Drop City',
  description: 'Privacy Policy for Drop City, the AR location-based drop app.',
};

export default function Privacy() {
  return (
    <div className="pt-32 pb-24 px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="mb-16">
          <p className="label text-gray-400 mb-4">Legal</p>
          <h1 className="text-title font-extralight mb-4">
            Privacy Policy
          </h1>
          <p className="text-small text-gray-400">
            Last updated: February 3, 2025
          </p>
        </header>

        {/* Content */}
        <div className="space-y-12 text-body text-gray-600 dark:text-gray-400">
          <section>
            <h2 className="text-heading font-light text-gray-700 dark:text-gray-200 mb-4">
              Introduction
            </h2>
            <p>
              Drop City ("we," "our," or "us") respects your privacy and is 
              committed to protecting your personal data. This privacy policy 
              explains how we collect, use, and safeguard your information 
              when you use our mobile application and services.
            </p>
          </section>

          <section>
            <h2 className="text-heading font-light text-gray-700 dark:text-gray-200 mb-4">
              Information We Collect
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-large font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Location Data
                </h3>
                <p>
                  Drop City requires access to your device's location to function. 
                  We collect precise GPS coordinates when you create drops and 
                  when you discover drops nearby. Location data is essential to 
                  our core service of anchoring AR content to real-world positions.
                </p>
              </div>
              <div>
                <h3 className="text-large font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Account Information
                </h3>
                <p>
                  When you create an account, we collect your Apple ID (via Sign 
                  in with Apple) and any profile information you choose to provide, 
                  such as a username and bio.
                </p>
              </div>
              <div>
                <h3 className="text-large font-medium text-gray-700 dark:text-gray-300 mb-2">
                  User Content
                </h3>
                <p>
                  We store the content you create, including photos, text, and 
                  drawings, along with associated metadata like creation time 
                  and location coordinates.
                </p>
              </div>
              <div>
                <h3 className="text-large font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Usage Data
                </h3>
                <p>
                  We collect anonymized analytics about how you use the app to 
                  improve our service. This includes features used, session 
                  duration, and crash reports.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-heading font-light text-gray-700 dark:text-gray-200 mb-4">
              How We Use Your Information
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>To provide and maintain our service</li>
              <li>To anchor AR content to GPS coordinates</li>
              <li>To notify you when drops are nearby</li>
              <li>To enable social features like following and discovery</li>
              <li>To improve and optimize the app experience</li>
              <li>To detect and prevent fraud or abuse</li>
            </ul>
          </section>

          <section>
            <h2 className="text-heading font-light text-gray-700 dark:text-gray-200 mb-4">
              Data Sharing
            </h2>
            <p className="mb-4">
              We do not sell your personal data. We may share information in 
              limited circumstances:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>With other users:</strong> Your public drops and profile 
                are visible to other users as part of the app's social features.
              </li>
              <li>
                <strong>Service providers:</strong> We use third-party services 
                for hosting, analytics, and push notifications. These providers 
                are contractually bound to protect your data.
              </li>
              <li>
                <strong>Legal requirements:</strong> We may disclose information 
                if required by law or to protect our rights and safety.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-heading font-light text-gray-700 dark:text-gray-200 mb-4">
              Data Retention
            </h2>
            <p>
              We retain your data for as long as your account is active. Drops 
              may expire based on settings you choose (24 hours or permanent). 
              You can delete your account and associated data at any time through 
              the app settings.
            </p>
          </section>

          <section>
            <h2 className="text-heading font-light text-gray-700 dark:text-gray-200 mb-4">
              Your Rights
            </h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Export your data in a portable format</li>
              <li>Withdraw consent for data processing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-heading font-light text-gray-700 dark:text-gray-200 mb-4">
              Security
            </h2>
            <p>
              We implement industry-standard security measures to protect your 
              data, including encryption in transit and at rest. However, no 
              method of transmission over the Internet is 100% secure, and we 
              cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-heading font-light text-gray-700 dark:text-gray-200 mb-4">
              Children's Privacy
            </h2>
            <p>
              Drop City is not intended for children under 13. We do not 
              knowingly collect personal information from children under 13. 
              If we discover such data has been collected, we will delete it 
              immediately.
            </p>
          </section>

          <section>
            <h2 className="text-heading font-light text-gray-700 dark:text-gray-200 mb-4">
              Changes to This Policy
            </h2>
            <p>
              We may update this privacy policy from time to time. We will notify 
              you of any significant changes through the app or via email. 
              Continued use of the app after changes constitutes acceptance of 
              the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-heading font-light text-gray-700 dark:text-gray-200 mb-4">
              Contact Us
            </h2>
            <p>
              If you have questions about this privacy policy or our data 
              practices, please contact us at privacy@dropcity.io.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
