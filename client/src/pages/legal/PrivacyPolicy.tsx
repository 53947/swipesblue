import { Link } from "wouter";

export default function PrivacyPolicy() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-8 py-16">
        <h1 className="text-3xl font-bold text-swipes-black mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-8">Last Updated: February 6, 2026</p>

        <div className="prose prose-gray max-w-none">
          <h2 className="text-xl font-semibold text-swipes-black mt-8 mb-4">1. Introduction</h2>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            swipesblue ("we," "us," or "our"), operated by TriadBlue, Inc., is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you visit our website swipesblue.com and use our payment processing services (collectively, the "Services").
          </p>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            swipesblue provides payment processing services through NMI (Network Merchants, LLC), our payment gateway infrastructure provider. This Privacy Policy covers data practices for both swipesblue and the data shared with NMI in connection with providing the Services.
          </p>

          <h2 className="text-xl font-semibold text-swipes-black mt-8 mb-4">2. Information We Collect</h2>

          <h3 className="text-lg font-medium text-swipes-black mt-6 mb-3">2.1. Information You Provide Directly:</h3>
          <ul className="list-disc pl-6 text-swipes-pro-gray text-base leading-relaxed mb-4 space-y-1">
            <li>Account registration information (name, email address, phone number, business name)</li>
            <li>Business information (business address, tax identification number, business type)</li>
            <li>Payment information for your subscription (processed securely through our payment infrastructure)</li>
            <li>Transaction data you submit through our APIs and services</li>
            <li>Communications you send to us (support requests, feedback)</li>
          </ul>

          <h3 className="text-lg font-medium text-swipes-black mt-6 mb-3">2.2. Information Collected About Your Customers:</h3>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            When you use our payment processing services, we process information about your customers on your behalf, including:
          </p>
          <ul className="list-disc pl-6 text-swipes-pro-gray text-base leading-relaxed mb-4 space-y-1">
            <li>Customer names and contact information</li>
            <li>Payment card numbers (encrypted and tokenized)</li>
            <li>Billing and shipping addresses</li>
            <li>Transaction amounts and descriptions</li>
            <li>IP addresses associated with transactions</li>
          </ul>

          <h3 className="text-lg font-medium text-swipes-black mt-6 mb-3">2.3. Information Collected Automatically:</h3>
          <ul className="list-disc pl-6 text-swipes-pro-gray text-base leading-relaxed mb-4 space-y-1">
            <li>IP address and device information</li>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Pages visited and time spent on our website</li>
            <li>Referring URLs</li>
            <li>Cookie data (see our <Link href="/cookies" className="text-swipes-blue-deep hover:underline">Cookie Policy</Link> for details)</li>
          </ul>

          <h3 className="text-lg font-medium text-swipes-black mt-6 mb-3">2.4. Information from Third Parties:</h3>
          <ul className="list-disc pl-6 text-swipes-pro-gray text-base leading-relaxed mb-4 space-y-1">
            <li>Identity verification data from NMI and its service providers</li>
            <li>Credit and fraud screening data</li>
            <li>Information from payment networks (Visa, Mastercard, etc.)</li>
          </ul>

          <h2 className="text-xl font-semibold text-swipes-black mt-8 mb-4">3. How We Use Your Information</h2>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            We use your information to:
          </p>
          <ol className="list-[lower-alpha] pl-6 text-swipes-pro-gray text-base leading-relaxed mb-4 space-y-1">
            <li>Provide, maintain, and improve the Services</li>
            <li>Process payment transactions on your behalf</li>
            <li>Verify your identity and prevent fraud</li>
            <li>Communicate with you about your account and the Services</li>
            <li>Send you technical notices, updates, and security alerts</li>
            <li>Respond to your support requests and inquiries</li>
            <li>Comply with legal obligations, including anti-money laundering (AML) and Know Your Customer (KYC) requirements</li>
            <li>Enforce our Terms of Service and protect our rights</li>
            <li>Analyze usage patterns to improve our Services</li>
            <li>Detect and prevent fraudulent or illegal activities</li>
          </ol>

          <h2 className="text-xl font-semibold text-swipes-black mt-8 mb-4">4. How We Share Your Information</h2>

          <h3 className="text-lg font-medium text-swipes-black mt-6 mb-3">4.1. Payment Processing Partners:</h3>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            We share your data with NMI (Network Merchants, LLC) as necessary to provide payment processing services. NMI may collect personal data including transaction data, device information, and payment method details. NMI processes this data in accordance with their privacy policy, available at{" "}
            <a href="https://www.nmi.com/privacy/" target="_blank" rel="noopener noreferrer" className="text-swipes-blue-deep hover:underline">https://www.nmi.com/privacy/</a>. Banking services are provided by Merrick Bank, Member FDIC.
          </p>

          <h3 className="text-lg font-medium text-swipes-black mt-6 mb-3">4.2. Payment Networks:</h3>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            Transaction data is shared with applicable payment networks (Visa, Mastercard, American Express, Discover, JCB) as required to process and settle transactions.
          </p>

          <h3 className="text-lg font-medium text-swipes-black mt-6 mb-3">4.3. triadblue Ecosystem:</h3>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            swipesblue is part of the triadblue ecosystem. We may share limited account information with other triadblue platforms (hostsblue.com, businessblueprint.io, scansblue.com) if you use services across multiple platforms, and only as necessary to provide integrated services.
          </p>

          <h3 className="text-lg font-medium text-swipes-black mt-6 mb-3">4.4. Service Providers:</h3>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            We may share information with third-party service providers who perform services on our behalf, including hosting, analytics, customer support, and email delivery. These providers are contractually obligated to use your information only as directed by us.
          </p>

          <h3 className="text-lg font-medium text-swipes-black mt-6 mb-3">4.5. Legal Requirements:</h3>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            We may disclose your information if required to do so by law, regulation, legal process, or governmental request, or when we believe disclosure is necessary to protect our rights, your safety, or the safety of others.
          </p>

          <h3 className="text-lg font-medium text-swipes-black mt-6 mb-3">4.6. Business Transfers:</h3>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction.
          </p>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4 font-medium">
            We do not sell your personal information to third parties.
          </p>

          <h2 className="text-xl font-semibold text-swipes-black mt-8 mb-4">5. Data Security</h2>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            5.1. swipesblue's payment processing is built on NMI's PCI DSS Level 1 certified infrastructure, the highest level of security certification in the payment card industry.
          </p>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            5.2. We implement industry-standard security measures including:
          </p>
          <ul className="list-disc pl-6 text-swipes-pro-gray text-base leading-relaxed mb-4 space-y-1">
            <li>TLS 1.2+ encryption for all data in transit</li>
            <li>AES-256 encryption for data at rest</li>
            <li>Tokenization of payment card data</li>
            <li>Regular security assessments and vulnerability scans</li>
            <li>Access controls and authentication requirements</li>
            <li>Monitoring and logging of system access</li>
          </ul>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            5.3. While we take reasonable measures to protect your information, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security.
          </p>

          <h2 className="text-xl font-semibold text-swipes-black mt-8 mb-4">6. Data Retention</h2>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            We retain your personal information for as long as your account is active or as needed to provide the Services. We may also retain and use your information as necessary to comply with legal obligations, resolve disputes, and enforce our agreements. Transaction records are retained for a minimum of 7 years as required by applicable financial regulations.
          </p>

          <h2 className="text-xl font-semibold text-swipes-black mt-8 mb-4">7. Your Rights and Choices</h2>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            Depending on your jurisdiction, you may have the following rights:
          </p>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            <strong>7.1. Access:</strong> You may request a copy of the personal information we hold about you.
          </p>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            <strong>7.2. Correction:</strong> You may request that we correct inaccurate or incomplete personal information.
          </p>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            <strong>7.3. Deletion:</strong> You may request that we delete your personal information, subject to certain legal exceptions (such as transaction records we are required to retain).
          </p>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            <strong>7.4. Portability:</strong> You may request a machine-readable copy of your personal data.
          </p>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            <strong>7.5. Opt-Out:</strong> You may opt out of receiving marketing communications from us at any time by clicking "unsubscribe" in any marketing email or contacting us directly.
          </p>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            <strong>7.6. Do Not Sell:</strong> We do not sell personal information. If you are a California resident, you have the right to know that no sale of personal information has occurred.
          </p>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            To exercise any of these rights, please contact us at privacy@swipesblue.com.
          </p>

          <h2 className="text-xl font-semibold text-swipes-black mt-8 mb-4">8. California Privacy Rights (CCPA/CPRA)</h2>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA) and the California Privacy Rights Act (CPRA), including:
          </p>
          <ul className="list-disc pl-6 text-swipes-pro-gray text-base leading-relaxed mb-4 space-y-1">
            <li>The right to know what personal information we collect, use, and disclose</li>
            <li>The right to request deletion of your personal information</li>
            <li>The right to opt out of the sale or sharing of personal information (we do not sell or share personal information for cross-context behavioral advertising)</li>
            <li>The right to non-discrimination for exercising your privacy rights</li>
          </ul>

          <h2 className="text-xl font-semibold text-swipes-black mt-8 mb-4">9. European Privacy Rights (GDPR)</h2>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            If you are located in the European Economic Area (EEA), United Kingdom, or Switzerland, you have additional rights under the General Data Protection Regulation (GDPR), including:
          </p>
          <ul className="list-disc pl-6 text-swipes-pro-gray text-base leading-relaxed mb-4 space-y-1">
            <li>The right to access, rectify, or erase your personal data</li>
            <li>The right to restrict or object to processing</li>
            <li>The right to data portability</li>
            <li>The right to withdraw consent at any time</li>
            <li>The right to lodge a complaint with a supervisory authority</li>
          </ul>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            Our legal bases for processing include: performance of a contract, compliance with legal obligations, legitimate interests, and consent.
          </p>

          <h2 className="text-xl font-semibold text-swipes-black mt-8 mb-4">10. Children's Privacy</h2>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            Our Services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected personal information from a child, we will take steps to delete such information.
          </p>

          <h2 className="text-xl font-semibold text-swipes-black mt-8 mb-4">11. International Data Transfers</h2>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place for such transfers in compliance with applicable data protection laws.
          </p>

          <h2 className="text-xl font-semibold text-swipes-black mt-8 mb-4">12. Changes to This Privacy Policy</h2>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on our website with a new "Last Updated" date. We encourage you to review this Privacy Policy periodically.
          </p>

          <h2 className="text-xl font-semibold text-swipes-black mt-8 mb-4">13. Contact Us</h2>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            For privacy-related inquiries, please contact us at:
          </p>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            swipesblue (operated by TriadBlue, Inc.)<br />
            Email: privacy@swipesblue.com<br />
            Website: https://swipesblue.com
          </p>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            For information about NMI's privacy practices:<br />
            NMI Privacy Policy:{" "}
            <a href="https://www.nmi.com/privacy/" target="_blank" rel="noopener noreferrer" className="text-swipes-blue-deep hover:underline">https://www.nmi.com/privacy/</a>
          </p>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200">
          <Link href="/" className="text-swipes-blue-deep hover:underline text-sm">
            &larr; Back to swipesblue.com
          </Link>
        </div>
      </div>
    </div>
  );
}
