import { useLocation } from "wouter";
import {
  CreditCard,
  Settings as SettingsIcon,
  BarChart3,
  Code,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SubNavTabs from "@/components/dashboard/SubNavTabs";

const tabs = [
  { label: "Overview", href: "/dashboard/ecommerce/checkout" },
  { label: "Recent Checkouts", href: "/dashboard/ecommerce/checkout?tab=recent" },
  { label: "Settings", href: "/dashboard/ecommerce/checkout?tab=settings" },
  { label: "Embed", href: "/dashboard/ecommerce/checkout?tab=embed" },
];

interface MockCheckout {
  id: string;
  date: string;
  customer: string;
  amount: string;
  status: "completed" | "abandoned" | "processing";
  paymentMethod: string;
}

const mockCheckouts: MockCheckout[] = [
  { id: "chk-001", date: "2025-10-24", customer: "Sarah Johnson", amount: "$189.97", status: "completed", paymentMethod: "Visa ****1234" },
  { id: "chk-002", date: "2025-10-24", customer: "Mike Chen", amount: "$49.99", status: "completed", paymentMethod: "MC ****5678" },
  { id: "chk-003", date: "2025-10-24", customer: "Guest", amount: "$79.98", status: "abandoned", paymentMethod: "-" },
  { id: "chk-004", date: "2025-10-23", customer: "Emily Davis", amount: "$345.50", status: "completed", paymentMethod: "Amex ****9012" },
  { id: "chk-005", date: "2025-10-23", customer: "James Wilson", amount: "$129.98", status: "processing", paymentMethod: "Visa ****3456" },
  { id: "chk-006", date: "2025-10-22", customer: "Lisa Anderson", amount: "$79.99", status: "completed", paymentMethod: "Visa ****7890" },
];

const statusConfig: Record<string, { icon: React.ElementType; colorClass: string }> = {
  completed: { icon: CheckCircle2, colorClass: "bg-green-100 text-green-700" },
  abandoned: { icon: XCircle, colorClass: "bg-red-100 text-red-600" },
  processing: { icon: Clock, colorClass: "bg-yellow-100 text-yellow-700" },
};

export default function CheckoutDashboard() {
  const [location] = useLocation();
  const urlParams = new URLSearchParams(location.split("?")[1] || "");
  const activeTab = urlParams.get("tab") || "overview";

  const completedCount = mockCheckouts.filter((c) => c.status === "completed").length;
  const totalRevenue = mockCheckouts
    .filter((c) => c.status === "completed")
    .reduce((sum, c) => sum + parseFloat(c.amount.replace("$", "").replace(",", "")), 0);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">One-Page Checkout</h1>
          <p className="text-gray-500 mt-1">Manage your streamlined checkout experience</p>
        </div>
      </div>

      <SubNavTabs tabs={tabs} />

      {/* Metrics — always visible */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="rounded-[7px] border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-50 rounded-[7px]">
                <CreditCard className="h-4 w-4 text-blue-600" />
              </div>
              <span className="text-sm text-gray-500">Checkouts Today</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {mockCheckouts.filter((c) => c.date === "2025-10-24").length}
            </p>
            <p className="text-xs text-gray-400 mt-1">Sessions started</p>
          </CardContent>
        </Card>

        <Card className="rounded-[7px] border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-50 rounded-[7px]">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              </div>
              <span className="text-sm text-gray-500">Completed</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{completedCount}</p>
            <p className="text-xs text-gray-400 mt-1">Successfully processed</p>
          </CardContent>
        </Card>

        <Card className="rounded-[7px] border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-50 rounded-[7px]">
                <BarChart3 className="h-4 w-4 text-purple-600" />
              </div>
              <span className="text-sm text-gray-500">Conversion Rate</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {mockCheckouts.length > 0
                ? `${Math.round((completedCount / mockCheckouts.length) * 100)}%`
                : "0%"}
            </p>
            <p className="text-xs text-gray-400 mt-1">Checkout to payment</p>
          </CardContent>
        </Card>

        <Card className="rounded-[7px] border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-amber-50 rounded-[7px]">
                <BarChart3 className="h-4 w-4 text-amber-600" />
              </div>
              <span className="text-sm text-gray-500">Avg Order Value</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              ${completedCount > 0 ? (totalRevenue / completedCount).toFixed(2) : "0.00"}
            </p>
            <p className="text-xs text-gray-400 mt-1">Per completed checkout</p>
          </CardContent>
        </Card>
      </div>

      {/* Tab: Overview — show recent checkouts */}
      {(activeTab === "overview" || activeTab === "recent") && (
        <div>
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
            {activeTab === "overview" ? "Recent Checkouts" : "All Checkouts"}
          </h3>
          <div className="bg-white border border-gray-200 rounded-[7px] overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-[#F6F9FC] border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">ID</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Customer</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Payment Method</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockCheckouts.map((checkout) => {
                  const config = statusConfig[checkout.status];
                  return (
                    <tr key={checkout.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-600">{checkout.date}</td>
                      <td className="px-4 py-3 text-sm font-mono text-gray-900">{checkout.id}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{checkout.customer}</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{checkout.amount}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{checkout.paymentMethod}</td>
                      <td className="px-4 py-3">
                        <Badge className={`text-xs rounded-full ${config.colorClass}`}>
                          {checkout.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="View details">
                          <Eye className="h-4 w-4 text-gray-500" />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-center">
            <span className="text-xs text-gray-400">{mockCheckouts.length} checkouts</span>
          </div>
        </div>
      )}

      {/* Tab: Settings */}
      {activeTab === "settings" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="rounded-[7px] border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <SettingsIcon className="h-5 w-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">Checkout Settings</h3>
              </div>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Required fields</span>
                  <span className="font-medium text-gray-900">Name, Email</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment methods</span>
                  <span className="font-medium text-gray-900">Card, ACH</span>
                </div>
                <div className="flex justify-between">
                  <span>Address collection</span>
                  <span className="text-gray-400">Optional</span>
                </div>
                <div className="flex justify-between">
                  <span>Phone number</span>
                  <span className="text-gray-400">Optional</span>
                </div>
                <div className="flex justify-between">
                  <span>Terms & conditions</span>
                  <span className="font-medium text-gray-900">Enabled</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[7px] border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <CreditCard className="h-5 w-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">Payment Options</h3>
              </div>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Credit / Debit cards</span>
                  <Badge className="text-xs bg-green-100 text-green-700 rounded-full">Enabled</Badge>
                </div>
                <div className="flex justify-between">
                  <span>ACH / Bank transfer</span>
                  <Badge className="text-xs bg-green-100 text-green-700 rounded-full">Enabled</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Apple Pay</span>
                  <Badge className="text-xs bg-gray-100 text-gray-500 rounded-full">Coming soon</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Google Pay</span>
                  <Badge className="text-xs bg-gray-100 text-gray-500 rounded-full">Coming soon</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[7px] border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="h-5 w-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">Post-Checkout</h3>
              </div>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Confirmation page</span>
                  <span className="font-medium text-gray-900">Default</span>
                </div>
                <div className="flex justify-between">
                  <span>Email receipt</span>
                  <span className="font-medium text-gray-900">Enabled</span>
                </div>
                <div className="flex justify-between">
                  <span>Redirect URL</span>
                  <span className="text-gray-400">Not set</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tab: Embed */}
      {activeTab === "embed" && (
        <div className="max-w-2xl">
          <Card className="rounded-[7px] border-gray-200 mb-6">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Code className="h-5 w-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">Embed Code</h3>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Add your checkout to any website with a simple script tag. The checkout form will render in place.
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-[7px] p-4 text-xs font-mono text-gray-600 leading-relaxed">
                <div className="text-gray-400 mb-1">&lt;!-- swipesblue Checkout --&gt;</div>
                <div>&lt;script src="https://swipesblue.com/checkout.js"&gt;&lt;/script&gt;</div>
                <div>&lt;div id="swipesblue-checkout"</div>
                <div className="pl-4">data-merchant="YOUR_MERCHANT_ID"</div>
                <div className="pl-4">data-theme="default"&gt;</div>
                <div>&lt;/div&gt;</div>
              </div>
              <Button variant="outline" className="mt-4 rounded-[7px] text-sm border-gray-300">
                Copy Embed Code
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-[7px] border-gray-200 mb-6">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <CreditCard className="h-5 w-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">Direct Link</h3>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Share this link directly with customers. They can complete their purchase without visiting your website.
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-[7px] p-4 text-sm font-mono text-[#1844A6]">
                https://pay.swipesblue.com/YOUR_MERCHANT_ID
              </div>
              <Button variant="outline" className="mt-4 rounded-[7px] text-sm border-gray-300">
                Copy Link
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-[7px] border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Code className="h-5 w-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">Buy Button</h3>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Add a styled purchase button to any page that opens your checkout in a modal.
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-[7px] p-4 text-xs font-mono text-gray-600 leading-relaxed">
                <div>&lt;a href="https://pay.swipesblue.com/YOUR_MERCHANT_ID"</div>
                <div className="pl-4">class="swipesblue-button"</div>
                <div className="pl-4">data-amount="49.99"&gt;</div>
                <div className="pl-4">Pay Now</div>
                <div>&lt;/a&gt;</div>
              </div>
              <Button variant="outline" className="mt-4 rounded-[7px] text-sm border-gray-300">
                Copy Button Code
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="mt-4 text-center">
        <span className="text-xs text-gray-400">
          Part of the E-Commerce Suite
        </span>
      </div>
    </div>
  );
}
