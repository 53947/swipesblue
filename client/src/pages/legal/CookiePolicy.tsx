import { Link } from "wouter";

export default function CookiePolicy() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-8 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Cookie Policy</h1>
        <p className="text-sm text-gray-400 mb-8">Last Updated: February 6, 2026</p>

        <div className="prose prose-gray max-w-none">
          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">1. What Are Cookies</h2>
          <p className="text-gray-500 text-base leading-relaxed mb-4">
            Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website. They help websites function properly, remember your preferences, and provide information to the site owners.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">2. How We Use Cookies</h2>
          <p className="text-gray-500 text-base leading-relaxed mb-4">
            swipesblue uses cookies and similar technologies to:
          </p>
          <ol className="list-[lower-alpha] pl-6 text-gray-500 text-base leading-relaxed mb-4 space-y-1">
            <li>Keep you signed in to your account</li>
            <li>Remember your preferences and settings</li>
            <li>Process payment transactions securely</li>
            <li>Detect and prevent fraud</li>
            <li>Understand how you use our website so we can improve it</li>
            <li>Ensure the security of our Services</li>
          </ol>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">3. Types of Cookies We Use</h2>

          <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">3.1. Essential Cookies (Required)</h3>
          <p className="text-gray-500 text-base leading-relaxed mb-4">
            These cookies are necessary for the website to function and cannot be disabled. They include:
          </p>
          <ul className="list-disc pl-6 text-gray-500 text-base leading-relaxed mb-4 space-y-1">
            <li>Session cookies that maintain your login state</li>
            <li>Security cookies that help detect and prevent fraud</li>
            <li>Load balancing cookies that ensure the website performs properly</li>
          </ul>

          <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">3.2. Functional Cookies</h3>
          <p className="text-gray-500 text-base leading-relaxed mb-4">
            These cookies enable enhanced functionality and personalization, including:
          </p>
          <ul className="list-disc pl-6 text-gray-500 text-base leading-relaxed mb-4 space-y-1">
            <li>Language and region preferences</li>
            <li>Dashboard layout preferences</li>
            <li>Recently viewed pages and features</li>
          </ul>

          <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">3.3. Analytics Cookies</h3>
          <p className="text-gray-500 text-base leading-relaxed mb-4">
            These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. We may use third-party analytics services that set their own cookies.
          </p>

          <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">3.4. Payment Processing Cookies</h3>
          <p className="text-gray-500 text-base leading-relaxed mb-4">
            NMI, our payment processing partner, may set cookies as part of the payment processing and fraud detection process. These cookies are essential to the secure processing of transactions. For more information, see NMI's privacy policy at{" "}
            <a href="https://www.nmi.com/privacy/" target="_blank" rel="noopener noreferrer" className="text-[#1844A6] hover:underline">https://www.nmi.com/privacy/</a>.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">4. Third-Party Cookies</h2>
          <p className="text-gray-500 text-base leading-relaxed mb-4">
            Some cookies on our website are set by third-party services we use:
          </p>
          <ul className="list-disc pl-6 text-gray-500 text-base leading-relaxed mb-4 space-y-1">
            <li>NMI (payment processing and fraud detection)</li>
            <li>Analytics providers (website usage analysis)</li>
          </ul>
          <p className="text-gray-500 text-base leading-relaxed mb-4">
            These third parties have their own privacy and cookie policies. We recommend reviewing their policies for more information.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">5. Your Cookie Choices</h2>
          <p className="text-gray-500 text-base leading-relaxed mb-4">
            <strong>5.1. Browser Settings:</strong> Most web browsers allow you to control cookies through their settings. You can set your browser to refuse all cookies or to alert you when a cookie is being sent. However, disabling cookies may affect the functionality of our Services.
          </p>
          <p className="text-gray-500 text-base leading-relaxed mb-4">
            <strong>5.2. Essential Cookies:</strong> These cannot be disabled as they are required for the Services to function. If you disable these cookies, you may not be able to use certain features of our platform.
          </p>
          <p className="text-gray-500 text-base leading-relaxed mb-4">
            <strong>5.3. Opt-Out Links:</strong>
          </p>
          <ul className="list-disc pl-6 text-gray-500 text-base leading-relaxed mb-4 space-y-1">
            <li>Google Analytics:{" "}
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-[#1844A6] hover:underline">https://tools.google.com/dlpage/gaoptout</a>
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">6. Do Not Track Signals</h2>
          <p className="text-gray-500 text-base leading-relaxed mb-4">
            Some browsers offer a "Do Not Track" (DNT) setting. There is currently no industry standard for how companies should respond to DNT signals. We do not currently respond to DNT signals, but we do not track users across third-party websites.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">7. Changes to This Cookie Policy</h2>
          <p className="text-gray-500 text-base leading-relaxed mb-4">
            We may update this Cookie Policy from time to time to reflect changes in our practices or for operational, legal, or regulatory reasons. The "Last Updated" date at the top indicates when the policy was last revised.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">8. Contact Us</h2>
          <p className="text-gray-500 text-base leading-relaxed mb-4">
            For questions about our use of cookies, please contact us at:
          </p>
          <p className="text-gray-500 text-base leading-relaxed mb-4">
            swipesblue (operated by TriadBlue, Inc.)<br />
            Email: privacy@swipesblue.com<br />
            Website: https://swipesblue.com
          </p>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200">
          <Link href="/" className="text-[#1844A6] hover:underline text-sm">
            &larr; Back to swipesblue.com
          </Link>
        </div>
      </div>
    </div>
  );
}
