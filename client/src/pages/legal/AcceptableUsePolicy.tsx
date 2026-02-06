import { Link } from "wouter";

export default function AcceptableUsePolicy() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-8 py-16">
        <h1 className="text-3xl font-bold text-swipes-black mb-2">Acceptable Use Policy</h1>
        <p className="text-sm text-gray-400 mb-8">Last Updated: February 6, 2026</p>

        <div className="prose prose-gray max-w-none">
          <h2 className="text-xl font-semibold text-swipes-black mt-8 mb-4">1. Overview</h2>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            This Acceptable Use Policy ("AUP") governs your use of swipesblue's payment processing services. This AUP is incorporated into and forms part of our{" "}
            <Link href="/terms" className="text-swipes-blue-deep hover:underline">Terms of Service</Link>. By using swipesblue, you agree to comply with this AUP.
          </p>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            swipesblue's payment processing is built on NMI's platform, which connects to major payment networks including Visa, Mastercard, American Express, and Discover. All transactions must comply with the rules and regulations of these payment networks.
          </p>

          <h2 className="text-xl font-semibold text-swipes-black mt-8 mb-4">2. Prohibited Activities</h2>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            You may not use swipesblue's Services to process payments for, facilitate, or engage in any of the following:
          </p>

          <h3 className="text-lg font-medium text-swipes-black mt-6 mb-3">2.1. Illegal Products and Services:</h3>
          <ul className="list-disc pl-6 text-swipes-pro-gray text-base leading-relaxed mb-4 space-y-1">
            <li>Narcotics, controlled substances, or illegal drugs</li>
            <li>Illegal weapons or ammunition</li>
            <li>Products that infringe on intellectual property rights (counterfeit goods)</li>
            <li>Stolen goods or property</li>
            <li>Any product or service that is illegal under applicable law</li>
          </ul>

          <h3 className="text-lg font-medium text-swipes-black mt-6 mb-3">2.2. Regulated or High-Risk Activities (without prior approval):</h3>
          <ul className="list-disc pl-6 text-swipes-pro-gray text-base leading-relaxed mb-4 space-y-1">
            <li>Gambling, gaming, or lottery services</li>
            <li>Adult content or services</li>
            <li>Cryptocurrency or virtual currency exchanges</li>
            <li>Firearms, weapons, or ammunition sales</li>
            <li>Tobacco, e-cigarettes, or vaping products</li>
            <li>Pharmaceuticals or prescription drugs</li>
            <li>CBD, hemp, or cannabis-related products</li>
            <li>Multi-level marketing or pyramid schemes</li>
            <li>Debt collection services</li>
            <li>Bail bonds</li>
            <li>Money transmission or currency exchange</li>
            <li>Telemarketing</li>
          </ul>

          <h3 className="text-lg font-medium text-swipes-black mt-6 mb-3">2.3. Fraudulent or Deceptive Practices:</h3>
          <ul className="list-disc pl-6 text-swipes-pro-gray text-base leading-relaxed mb-4 space-y-1">
            <li>Fraudulent transactions or schemes</li>
            <li>Identity theft or unauthorized use of personal information</li>
            <li>Transactions with no bona fide underlying goods or services</li>
            <li>Misleading, deceptive, or unfair business practices</li>
            <li>Creating false or misleading product descriptions</li>
            <li>Processing transactions on behalf of undisclosed third parties</li>
          </ul>

          <h3 className="text-lg font-medium text-swipes-black mt-6 mb-3">2.4. Financial Crimes:</h3>
          <ul className="list-disc pl-6 text-swipes-pro-gray text-base leading-relaxed mb-4 space-y-1">
            <li>Money laundering or terrorist financing</li>
            <li>Transactions that violate sanctions or embargoes (OFAC, etc.)</li>
            <li>Structuring transactions to avoid reporting requirements</li>
            <li>Ponzi schemes, investment fraud, or securities violations</li>
          </ul>

          <h3 className="text-lg font-medium text-swipes-black mt-6 mb-3">2.5. Harmful Content or Activities:</h3>
          <ul className="list-disc pl-6 text-swipes-pro-gray text-base leading-relaxed mb-4 space-y-1">
            <li>Content that exploits or harms minors</li>
            <li>Content that promotes violence, hatred, or discrimination</li>
            <li>Content that constitutes harassment, threats, or stalking</li>
            <li>Distribution of malware, viruses, or other harmful software</li>
          </ul>

          <h3 className="text-lg font-medium text-swipes-black mt-6 mb-3">2.6. Payment Network Violations:</h3>
          <ul className="list-disc pl-6 text-swipes-pro-gray text-base leading-relaxed mb-4 space-y-1">
            <li>Transactions that violate Visa, Mastercard, American Express, Discover, or JCB network rules</li>
            <li>Excessive chargebacks (exceeding 1% of total transactions or network thresholds)</li>
            <li>Card testing or carding activities</li>
            <li>Transactions using stolen or compromised payment credentials</li>
          </ul>

          <h2 className="text-xl font-semibold text-swipes-black mt-8 mb-4">3. Restricted Business Categories</h2>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            The following business categories require prior written approval from swipesblue before processing payments. Contact us at compliance@swipesblue.com for approval:
          </p>
          <ul className="list-disc pl-6 text-swipes-pro-gray text-base leading-relaxed mb-4 space-y-1">
            <li>Subscription or recurring billing services</li>
            <li>Travel agencies and tour operators</li>
            <li>Event ticketing</li>
            <li>Digital goods or downloadable content</li>
            <li>Crowdfunding platforms</li>
            <li>Non-profit organizations</li>
            <li>Government entities</li>
            <li>Import/export businesses</li>
            <li>Jewelry and precious metals</li>
          </ul>

          <h2 className="text-xl font-semibold text-swipes-black mt-8 mb-4">4. Your Responsibilities</h2>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            4.1. You are responsible for monitoring your transactions and ensuring compliance with this AUP.
          </p>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            4.2. You must promptly report any suspected unauthorized, fraudulent, or illegal activity to swipesblue at compliance@swipesblue.com.
          </p>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            4.3. You must maintain a chargeback rate below 1% of total transactions, or the applicable threshold set by payment networks.
          </p>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            4.4. You must provide accurate product and service descriptions to your customers.
          </p>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            4.5. You must display clear refund and return policies on your website or at your point of sale.
          </p>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            4.6. You must respond promptly to chargeback disputes and provide requested documentation within the timeframes specified.
          </p>

          <h2 className="text-xl font-semibold text-swipes-black mt-8 mb-4">5. Enforcement</h2>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            5.1. swipesblue reserves the right to monitor transactions and investigate potential violations of this AUP.
          </p>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            5.2. If we determine that you have violated this AUP, we may take one or more of the following actions:
          </p>
          <ol className="list-[lower-alpha] pl-6 text-swipes-pro-gray text-base leading-relaxed mb-4 space-y-1">
            <li>Issue a warning</li>
            <li>Temporarily suspend your account</li>
            <li>Permanently terminate your account</li>
            <li>Withhold or delay settlement of funds</li>
            <li>Report the activity to law enforcement or regulatory authorities</li>
            <li>Assess fees or penalties as permitted under the Terms of Service</li>
          </ol>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            5.3. In cases of severe violations (fraud, illegal activity, or imminent harm), swipesblue may take immediate action without prior notice.
          </p>

          <h2 className="text-xl font-semibold text-swipes-black mt-8 mb-4">6. Reporting Violations</h2>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            If you become aware of any violation of this AUP by any user of swipesblue's Services, please report it to compliance@swipesblue.com.
          </p>

          <h2 className="text-xl font-semibold text-swipes-black mt-8 mb-4">7. Changes to This Policy</h2>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            swipesblue reserves the right to modify this AUP at any time. We will provide notice of material changes by posting the updated AUP on our website. Your continued use of the Services constitutes acceptance of the updated AUP.
          </p>

          <h2 className="text-xl font-semibold text-swipes-black mt-8 mb-4">8. Contact Information</h2>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            For questions about this Acceptable Use Policy, please contact us at:
          </p>
          <p className="text-swipes-pro-gray text-base leading-relaxed mb-4">
            swipesblue (operated by TriadBlue, Inc.)<br />
            Email: compliance@swipesblue.com<br />
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
