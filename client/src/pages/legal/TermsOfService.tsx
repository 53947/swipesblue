import { Link } from "wouter";

export default function TermsOfService() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-8 py-16">
        <h1 className="text-3xl font-bold text-swipes-black mb-2">Terms of Service</h1>
        <p className="text-sm text-gray-400 mb-8">Last Updated: February 6, 2026</p>

        <div className="prose prose-gray max-w-none">
          <h2 className="text-xl font-semibold text-swipes-black mt-8 mb-4">1. Introduction and Acceptance</h2>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            Welcome to swipesblue.com ("swipesblue," "we," "us," or "our"). These Terms of Service ("Terms") govern your access to and use of the swipesblue website, platform, APIs, and all related services (collectively, the "Services").
          </p>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Services.
          </p>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            swipesblue is operated by TriadBlue, Inc. Payment processing services are provided through NMI (Network Merchants, LLC), a PCI DSS Level 1 certified payment gateway provider. swipesblue operates as an authorized reseller of NMI's payment gateway services. All payment transactions are processed, authorized, and settled through NMI's infrastructure.
          </p>

          <h2 className="text-xl font-semibold text-swipes-black mt-8 mb-4">2. Description of Services</h2>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            swipesblue provides payment processing tools and services including but not limited to:
          </p>
          <ul className="list-disc pl-6 text-swipes-pro-gray text-base leading-relaxed mb-4 space-y-1">
            <li>Payment gateway access and transaction processing</li>
            <li>Virtual terminal for card-not-present transactions</li>
            <li>Online checkout and payment links</li>
            <li>Invoicing and recurring billing</li>
            <li>Customer vault for secure payment method storage</li>
            <li>Fraud prevention and dispute management tools</li>
            <li>Reporting and analytics</li>
            <li>API access for developer integrations</li>
            <li>E-commerce tools including shopping cart and checkout</li>
          </ul>

          <h2 className="text-xl font-semibold text-swipes-black mt-8 mb-4">3. Eligibility</h2>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            To use our Services, you must:
          </p>
          <ol className="list-[lower-alpha] pl-6 text-swipes-pro-gray text-base leading-relaxed mb-4 space-y-1">
            <li>Be at least 18 years of age</li>
            <li>Be engaged in a lawful business that includes the sale of products and/or services</li>
            <li>Be duly licensed to conduct such business under the laws of all jurisdictions in which you conduct business</li>
            <li>Provide true, accurate, and complete information in your registration and at all times thereafter</li>
            <li>Maintain the security of your account credentials</li>
          </ol>

          <h2 className="text-xl font-semibold text-swipes-black mt-8 mb-4">4. Account Registration and Security</h2>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            4.1. You must create an account to access certain features of the Services. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
          </p>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            4.2. You agree to immediately notify swipesblue of any unauthorized use of your account or any other breach of security.
          </p>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            4.3. swipesblue reserves the right to suspend or terminate your account if any information provided during registration or thereafter proves to be inaccurate, false, or incomplete.
          </p>

          <h2 className="text-xl font-semibold text-swipes-black mt-8 mb-4">5. Payment Processing</h2>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            5.1. Payment processing services are provided through NMI's payment gateway infrastructure. By using swipesblue's payment processing services, you also agree to be bound by NMI's Merchant Terms and Conditions, available at{" "}
            <a href="https://www.nmi.com/policy/" target="_blank" rel="noopener noreferrer" className="text-swipes-blue-deep hover:underline">https://www.nmi.com/policy/</a>.
          </p>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            5.2. NMI is not a bank. Banking services are provided by Merrick Bank, Member FDIC, and other acquiring bank partners as applicable.
          </p>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            5.3. swipesblue is an authorized reseller of NMI's services and is not a joint venturer, partner, or agent of NMI. The fees covered under these Terms apply only to those fees attributable to swipesblue's services and not to any fees which may be separately charged by NMI.
          </p>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            5.4. You may not request, introduce, or process transactions using the Services on behalf of any other person or entity without swipesblue's prior written authorization.
          </p>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            5.5. You acknowledge that swipesblue and NMI may collect, use, share, and hold personal or non-public information about you and your customers, including transaction data, account numbers, and purchase history, for the purpose of providing the Services.
          </p>

          <h2 className="text-xl font-semibold text-swipes-black mt-8 mb-4">6. Fees and Billing</h2>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            6.1. You agree to pay all fees associated with your use of the Services as described on our Pricing page and in any applicable Order Form or subscription agreement.
          </p>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            6.2. Transaction fees are calculated as a percentage of the transaction amount plus a flat per-transaction fee, as specified in your selected plan.
          </p>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            6.3. Subscription fees are billed monthly or annually as selected. All fees are non-refundable except as required by applicable law.
          </p>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            6.4. swipesblue reserves the right to modify fees upon 30 days' written notice. Continued use of the Services after such notice constitutes acceptance of the modified fees.
          </p>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            6.5. Additional fees may apply for chargebacks, ACH returns, voice authorizations, retrieval requests, and other services as disclosed on our Pricing page.
          </p>

          <h2 className="text-xl font-semibold text-swipes-black mt-8 mb-4">7. Compliance with Laws and Payment Network Rules</h2>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            7.1. You agree to comply with all applicable federal, state, local, and international laws, statutes, rules, and regulations in connection with your use of the Services.
          </p>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            7.2. You agree to comply with all applicable Payment Network rules and regulations (including those of Visa, Mastercard, American Express, Discover, and JCB) as they may be amended from time to time.
          </p>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            7.3. You are solely responsible for ensuring that your business and your use of the Services comply with all applicable laws, including but not limited to consumer protection laws, anti-money laundering laws, and export control regulations.
          </p>

          <h2 className="text-xl font-semibold text-swipes-black mt-8 mb-4">8. Data Security and PCI Compliance</h2>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            8.1. swipesblue's payment processing is built on NMI's PCI DSS Level 1 certified infrastructure. All cardholder data is processed, transmitted, and stored in accordance with PCI DSS requirements.
          </p>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            8.2. You agree not to store, retain, or capture complete card numbers, CVV/CVC codes, or magnetic stripe data on your own systems unless you maintain your own PCI DSS compliance certification.
          </p>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            8.3. You agree to cooperate with swipesblue and NMI in connection with any security audit, investigation, or compliance review.
          </p>

          <h2 className="text-xl font-semibold text-swipes-black mt-8 mb-4">9. Intellectual Property</h2>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            9.1. swipesblue and its licensors (including NMI) own and retain all right, title, and interest in and to the Services, including all intellectual property rights.
          </p>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            9.2. You are granted a limited, non-exclusive, non-transferable, revocable license to access and use the Services solely in accordance with these Terms.
          </p>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            9.3. You shall not reverse engineer, decompile, disassemble, or otherwise attempt to discover the source code of any aspect of the Services.
          </p>

          <h2 className="text-xl font-semibold text-swipes-black mt-8 mb-4">10. Prohibited Activities</h2>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            You may not use the Services to:
          </p>
          <ol className="list-[lower-alpha] pl-6 text-swipes-pro-gray text-base leading-relaxed mb-4 space-y-1">
            <li>Process transactions for any illegal products, services, or activities</li>
            <li>Process transactions that violate the rules of any Payment Network</li>
            <li>Engage in fraud, money laundering, or terrorist financing</li>
            <li>Infringe upon the intellectual property rights of any third party</li>
            <li>Distribute malware, viruses, or other harmful code</li>
            <li>Interfere with or disrupt the integrity or performance of the Services</li>
            <li>Attempt to gain unauthorized access to any systems or networks connected to the Services</li>
            <li>Use the Services in any manner that could damage, disable, or impair the Services</li>
          </ol>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            For a complete list of prohibited activities and restricted business types, see our{" "}
            <Link href="/acceptable-use" className="text-swipes-blue-deep hover:underline">Acceptable Use Policy</Link>.
          </p>

          <h2 className="text-xl font-semibold text-swipes-black mt-8 mb-4">11. Limitation of Liability</h2>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4 uppercase font-medium">
            11.1. To the maximum extent permitted by law, swipesblue, its affiliates, and its service providers (including NMI) shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.
          </p>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4 uppercase font-medium">
            11.2. In no event shall swipesblue's aggregate liability for all claims relating to the services exceed the greater of (a) the amount you paid to swipesblue in the 12 months preceding the claim, or (b) one hundred dollars ($100).
          </p>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4 uppercase font-medium">
            11.3. swipesblue does not guarantee that the services will be uninterrupted, timely, secure, or error-free.
          </p>

          <h2 className="text-xl font-semibold text-swipes-black mt-8 mb-4">12. Indemnification</h2>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            You agree to indemnify, defend, and hold harmless swipesblue, TriadBlue, Inc., NMI, and their respective officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses (including reasonable attorneys' fees) arising out of or in connection with (a) your use of the Services, (b) your violation of these Terms, (c) your violation of any third-party right, or (d) any fraud or illegal activity conducted through your account.
          </p>

          <h2 className="text-xl font-semibold text-swipes-black mt-8 mb-4">13. Termination</h2>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            13.1. You may terminate your account at any time by contacting us at support@swipesblue.com.
          </p>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            13.2. swipesblue may suspend or terminate your access to the Services at any time, with or without cause, with or without notice.
          </p>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            13.3. Upon termination, your right to use the Services will immediately cease. Sections that by their nature should survive termination shall survive, including but not limited to Sections 9, 11, 12, and 15.
          </p>

          <h2 className="text-xl font-semibold text-swipes-black mt-8 mb-4">14. Modifications to Terms</h2>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            swipesblue reserves the right to modify these Terms at any time. We will provide notice of material changes by posting the updated Terms on our website with a new "Last Updated" date. Your continued use of the Services following such changes constitutes your acceptance of the revised Terms.
          </p>

          <h2 className="text-xl font-semibold text-swipes-black mt-8 mb-4">15. Governing Law and Dispute Resolution</h2>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            15.1. These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of laws provisions.
          </p>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            15.2. Any dispute arising from or relating to these Terms or the Services shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.
          </p>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            15.3. You agree that any arbitration shall be conducted on an individual basis and not as a class action or representative proceeding.
          </p>

          <h2 className="text-xl font-semibold text-swipes-black mt-8 mb-4">16. General Provisions</h2>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            16.1. These Terms constitute the entire agreement between you and swipesblue regarding the use of the Services.
          </p>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            16.2. The failure of swipesblue to enforce any right or provision of these Terms shall not be deemed a waiver of such right or provision.
          </p>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            16.3. If any provision of these Terms is found to be unenforceable, the remaining provisions shall remain in full force and effect.
          </p>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            16.4. You may not assign or transfer these Terms without swipesblue's prior written consent.
          </p>

          <h2 className="text-xl font-semibold text-swipes-black mt-8 mb-4">17. Contact Information</h2>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            For questions about these Terms, please contact us at:
          </p>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            swipesblue (operated by TriadBlue, Inc.)<br />
            Email: legal@swipesblue.com<br />
            Website: https://swipesblue.com
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
