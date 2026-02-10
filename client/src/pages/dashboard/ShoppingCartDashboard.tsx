import { useLocation } from "wouter";
import {
  ShoppingCart,
  Settings as SettingsIcon,
  BarChart3,
  Palette,
  Clock,
  Mail,
  Eye,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SubNavTabs from "@/components/dashboard/SubNavTabs";

const tabs = [
  { label: "Overview", href: "/dashboard/ecommerce/cart" },
  { label: "Active Carts", href: "/dashboard/ecommerce/cart?tab=active" },
  { label: "Abandoned", href: "/dashboard/ecommerce/cart?tab=abandoned" },
  { label: "Settings", href: "/dashboard/ecommerce/cart?tab=settings" },
];

const mockActiveCarts = [
  { id: "cart-001", customer: "Sarah Johnson", items: 3, total: "$189.97", created: "2 min ago" },
  { id: "cart-002", customer: "Mike Chen", items: 1, total: "$49.99", created: "12 min ago" },
  { id: "cart-003", customer: "Guest", items: 2, total: "$79.98", created: "25 min ago" },
];

const mockAbandonedCarts = [
  { id: "ab-001", customer: "Emily Davis", email: "emily@example.com", items: 5, total: "$345.50", abandonedAt: "2025-10-24", recovered: false },
  { id: "ab-002", customer: "James Wilson", email: "james@example.com", items: 2, total: "$129.98", abandonedAt: "2025-10-23", recovered: true },
  { id: "ab-003", customer: "Lisa Anderson", email: "lisa@example.com", items: 1, total: "$79.99", abandonedAt: "2025-10-22", recovered: false },
  { id: "ab-004", customer: "Robert Taylor", email: "robert@example.com", items: 4, total: "$259.96", abandonedAt: "2025-10-21", recovered: false },
];

export default function ShoppingCartDashboard() {
  const [location] = useLocation();
  const urlParams = new URLSearchParams(location.split("?")[1] || "");
  const activeTab = urlParams.get("tab") || "overview";

  const abandonedCount = mockAbandonedCarts.filter((c) => !c.recovered).length;
  const recoveredCount = mockAbandonedCarts.filter((c) => c.recovered).length;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-500 mt-1">Manage your online shopping cart and recover abandoned carts</p>
        </div>
      </div>

      <SubNavTabs tabs={tabs} />

      {/* Metrics — always visible */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="rounded-[7px] border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-50 rounded-[7px]">
                <ShoppingCart className="h-4 w-4 text-blue-600" />
              </div>
              <span className="text-sm text-gray-500">Active Carts</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{mockActiveCarts.length}</p>
            <p className="text-xs text-gray-400 mt-1">Currently shopping</p>
          </CardContent>
        </Card>

        <Card className="rounded-[7px] border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-amber-50 rounded-[7px]">
                <Clock className="h-4 w-4 text-amber-600" />
              </div>
              <span className="text-sm text-gray-500">Abandoned</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{abandonedCount}</p>
            <p className="text-xs text-gray-400 mt-1">Last 30 days</p>
          </CardContent>
        </Card>

        <Card className="rounded-[7px] border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-50 rounded-[7px]">
                <BarChart3 className="h-4 w-4 text-green-600" />
              </div>
              <span className="text-sm text-gray-500">Recovery Rate</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {mockAbandonedCarts.length > 0
                ? `${Math.round((recoveredCount / mockAbandonedCarts.length) * 100)}%`
                : "0%"}
            </p>
            <p className="text-xs text-gray-400 mt-1">Abandoned carts recovered</p>
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
            <p className="text-2xl font-bold text-gray-900">68%</p>
            <p className="text-xs text-gray-400 mt-1">Cart to checkout</p>
          </CardContent>
        </Card>
      </div>

      {/* Tab: Overview — show active carts table */}
      {(activeTab === "overview" || activeTab === "active") && (
        <div>
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
            {activeTab === "overview" ? "Active Carts" : "All Active Carts"}
          </h3>
          {mockActiveCarts.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-[7px] p-12 text-center">
              <ShoppingCart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No active carts</h3>
              <p className="text-gray-500 text-sm">Active shopping carts will appear here in real time.</p>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-[7px] overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#F6F9FC] border-b border-gray-200">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Cart ID</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Customer</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Items</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Total</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Created</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockActiveCarts.map((cart) => (
                    <tr key={cart.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-mono text-gray-900">{cart.id}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{cart.customer}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{cart.items}</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{cart.total}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{cart.created}</td>
                      <td className="px-4 py-3 text-right">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="View cart">
                          <Eye className="h-4 w-4 text-gray-500" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Tab: Abandoned */}
      {activeTab === "abandoned" && (
        <div>
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
            Abandoned Carts
          </h3>
          <div className="bg-white border border-gray-200 rounded-[7px] overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-[#F6F9FC] border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Customer</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Items</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Total</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Abandoned</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockAbandonedCarts.map((cart) => (
                  <tr key={cart.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">{cart.customer}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{cart.email}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{cart.items}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{cart.total}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{cart.abandonedAt}</td>
                    <td className="px-4 py-3">
                      <Badge className={`text-xs rounded-full ${cart.recovered ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                        {cart.recovered ? "Recovered" : "Abandoned"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {!cart.recovered && (
                        <Button variant="ghost" size="sm" className="h-8 px-2" title="Send recovery email">
                          <Mail className="h-4 w-4 text-gray-500 mr-1" />
                          <span className="text-xs text-gray-500">Recover</span>
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
                <h3 className="font-semibold text-gray-900">Cart Settings</h3>
              </div>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Tax calculation</span>
                  <span className="text-gray-400">Not configured</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping methods</span>
                  <span className="text-gray-400">None added</span>
                </div>
                <div className="flex justify-between">
                  <span>Currency</span>
                  <span className="font-medium text-gray-900">USD</span>
                </div>
                <div className="flex justify-between">
                  <span>Cart expiry</span>
                  <span className="font-medium text-gray-900">24 hours</span>
                </div>
                <div className="flex justify-between">
                  <span>Minimum order</span>
                  <span className="text-gray-400">No minimum</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[7px] border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Palette className="h-5 w-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">Appearance</h3>
              </div>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Theme</span>
                  <span className="font-medium text-gray-900">Default</span>
                </div>
                <div className="flex justify-between">
                  <span>Button color</span>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-[#1844A6]" />
                    <span className="font-medium text-gray-900">#1844A6</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span>Show product images</span>
                  <span className="font-medium text-gray-900">Yes</span>
                </div>
                <div className="flex justify-between">
                  <span>Show quantity selector</span>
                  <span className="font-medium text-gray-900">Yes</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[7px] border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="h-5 w-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">Abandoned Cart Recovery</h3>
              </div>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Auto-recovery emails</span>
                  <span className="text-gray-400">Disabled</span>
                </div>
                <div className="flex justify-between">
                  <span>First reminder</span>
                  <span className="text-gray-400">1 hour after</span>
                </div>
                <div className="flex justify-between">
                  <span>Second reminder</span>
                  <span className="text-gray-400">24 hours after</span>
                </div>
                <div className="flex justify-between">
                  <span>Include discount</span>
                  <span className="text-gray-400">No</span>
                </div>
              </div>
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
