import { useState } from "react";
import { useLocation } from "wouter";
import {
  Zap,
  ShoppingCart,
  Clock,
  DollarSign,
  Play,
  Pause,
  CheckCircle,
  ArrowRight,
  Monitor,
  Smartphone,
  Tablet,
  Plus,
  GripVertical,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MetricCard from "@/components/MetricCard";
import SubNavTabs from "@/components/dashboard/SubNavTabs";

const basePath = "/dashboard/enhance/checkout-optimizer";

const tabs = [
  { label: "Optimization", href: basePath },
  { label: "A/B Tests", href: `${basePath}?tab=ab-tests` },
  { label: "Smart Routing", href: `${basePath}?tab=smart-routing` },
  { label: "Checkout Analytics", href: `${basePath}?tab=checkout-analytics` },
];

interface OptimizationFeature {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

interface ABTest {
  id: string;
  name: string;
  variantA: string;
  variantB: string;
  trafficSplit: string;
  conversionsA: string;
  conversionsB: string;
  winner: string;
  status: "Running" | "Completed" | "Paused";
}

interface RoutingRule {
  id: string;
  condition: string;
  gateway: string;
  enabled: boolean;
}

interface PaymentMethodConversion {
  method: string;
  attempts: number;
  successes: number;
  rate: string;
}

const initialFeatures: OptimizationFeature[] = [
  { id: "one-click", name: "One-Click Checkout", description: "Allow returning customers to pay with saved payment methods in one click", enabled: true },
  { id: "address-auto", name: "Address Auto-Complete", description: "Auto-fill shipping and billing address using Google Places", enabled: true },
  { id: "smart-order", name: "Smart Payment Method Order", description: "Show payment methods in order of highest conversion for each customer's profile", enabled: false },
  { id: "express", name: "Express Checkout", description: "Enable Apple Pay, Google Pay, and Link for faster checkout", enabled: true },
  { id: "guest", name: "Guest Checkout", description: "Allow purchases without account creation", enabled: true },
  { id: "card-validation", name: "Real-Time Card Validation", description: "Validate card numbers and show brand icon as customer types", enabled: true },
  { id: "currency-detect", name: "Automatic Currency Detection", description: "Display prices in customer's local currency based on IP geolocation", enabled: false },
];

const abTests: ABTest[] = [
  { id: "ab-1", name: "Button Color Test", variantA: "Blue Button", variantB: "Green Button", trafficSplit: "50/50", conversionsA: "12.4%", conversionsB: "14.1%", winner: "Variant B", status: "Completed" },
  { id: "ab-2", name: "Single vs Multi-Step", variantA: "Single Page", variantB: "Multi-Step", trafficSplit: "50/50", conversionsA: "11.8%", conversionsB: "13.6%", winner: "—", status: "Running" },
  { id: "ab-3", name: "Show Trust Badges", variantA: "No Badges", variantB: "Trust Badges", trafficSplit: "70/30", conversionsA: "10.2%", conversionsB: "12.8%", winner: "Variant B", status: "Completed" },
  { id: "ab-4", name: "Price Display Format", variantA: "$99.00", variantB: "$99", trafficSplit: "50/50", conversionsA: "11.1%", conversionsB: "11.3%", winner: "—", status: "Paused" },
];

const routingRules: RoutingRule[] = [
  { id: "rr-1", condition: "Card Brand = Amex", gateway: "NMI", enabled: true },
  { id: "rr-2", condition: "Amount > $1,000", gateway: "NMI", enabled: true },
  { id: "rr-3", condition: "Card Country ≠ US", gateway: "Backup Gateway", enabled: false },
];

const funnelSteps = [
  { name: "Cart", count: 1420, percent: 100 },
  { name: "Shipping", count: 1136, percent: 80 },
  { name: "Payment", count: 1023, percent: 72 },
  { name: "Confirmation", count: 1040, percent: 73.2 },
];

const dropOffReasons = [
  { reason: "Unexpected shipping costs", percent: 28 },
  { reason: "Required to create account", percent: 22 },
  { reason: "Payment method not available", percent: 18 },
  { reason: "Checkout too long/complex", percent: 15 },
  { reason: "Concerns about security", percent: 10 },
  { reason: "Other", percent: 7 },
];

const paymentMethodConversions: PaymentMethodConversion[] = [
  { method: "Apple Pay", attempts: 312, successes: 289, rate: "92.6%" },
  { method: "Visa", attempts: 1845, successes: 1642, rate: "89.0%" },
  { method: "Mastercard", attempts: 1120, successes: 985, rate: "87.9%" },
  { method: "Google Pay", attempts: 198, successes: 172, rate: "86.9%" },
  { method: "Amex", attempts: 456, successes: 378, rate: "82.9%" },
  { method: "Discover", attempts: 234, successes: 187, rate: "79.9%" },
];

function getTestStatusClasses(status: ABTest["status"]): string {
  switch (status) {
    case "Running":
      return "bg-green-600 text-white";
    case "Completed":
      return "bg-[#1844A6] text-white";
    case "Paused":
      return "bg-yellow-500 text-white";
  }
}

export default function CheckoutOptimizer() {
  const [features, setFeatures] = useState(initialFeatures);
  const [autoRetry, setAutoRetry] = useState(true);
  const [retryDelay, setRetryDelay] = useState("5");
  const [location] = useLocation();
  const urlParams = new URLSearchParams(location.split("?")[1] || "");
  const activeTab = urlParams.get("tab") || "optimization";

  const toggleFeature = (featureId: string) => {
    setFeatures((prev) =>
      prev.map((f) => (f.id === featureId ? { ...f, enabled: !f.enabled } : f))
    );
  };

  return (
    <div>
      <p className="text-gray-500 mb-6">
        Optimize conversion rates with A/B testing, smart payment routing, and checkout flow analytics
      </p>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Checkout Conversion Rate"
          value="73.2%"
          change="+4.1% from last period"
          changeType="positive"
          icon={Zap}
        />
        <MetricCard
          title="Cart Abandonment Rate"
          value="26.8%"
          change="-3.2% from last period"
          changeType="positive"
          icon={ShoppingCart}
        />
        <MetricCard
          title="Average Checkout Time"
          value="47 seconds"
          change="-8s from last period"
          changeType="positive"
          icon={Clock}
        />
        <MetricCard
          title="Recovery Revenue"
          value="$4,230"
          change="From abandoned cart recovery"
          changeType="positive"
          icon={DollarSign}
        />
      </div>

      <SubNavTabs tabs={tabs} />

      {/* Optimization Tab */}
      {activeTab === "optimization" && (
        <div className="space-y-4">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white rounded-[7px] border border-gray-200 p-6 flex items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-[7px] bg-[#1844A6]/10 flex items-center justify-center shrink-0">
                  <Zap className="h-5 w-5 text-[#1844A6]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-base font-semibold text-gray-900">
                      {feature.name}
                    </h3>
                    <Badge
                      className={`rounded-full ${
                        feature.enabled
                          ? "bg-green-600 text-white"
                          : "bg-gray-400 text-white"
                      }`}
                    >
                      {feature.enabled ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500">{feature.description}</p>
                </div>
              </div>
              <Switch
                checked={feature.enabled}
                onCheckedChange={() => toggleFeature(feature.id)}
              />
            </div>
          ))}
        </div>
      )}

      {/* A/B Tests Tab */}
      {activeTab === "ab-tests" && (
        <div className="space-y-6">
          <div className="bg-white rounded-[7px] border border-gray-200">
            <div className="p-4 flex items-center justify-between border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">A/B Tests</h3>
              <Button className="bg-[#1844A6] hover:bg-[#1844A6]/90 text-white rounded-[7px]">
                <Plus className="h-4 w-4 mr-2" />
                Create Test
              </Button>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-[#F6F9FC] border-b border-gray-200">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Test Name</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Variant A</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Variant B</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Split</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Conv. A</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Conv. B</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Winner</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {abTests.map((test) => (
                  <tr key={test.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{test.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{test.variantA}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{test.variantB}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{test.trafficSplit}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{test.conversionsA}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{test.conversionsB}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{test.winner}</td>
                    <td className="px-4 py-3">
                      <Badge className={`rounded-full ${getTestStatusClasses(test.status)}`}>{test.status}</Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button size="sm" variant="outline" className="rounded-[7px]">
                        {test.status === "Running" ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Smart Routing Tab */}
      {activeTab === "smart-routing" && (
        <div className="space-y-6">
          {/* Gateway Priority */}
          <div className="bg-white rounded-[7px] border border-gray-200 p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Gateway Priority</h3>
            <p className="text-sm text-gray-500">
              Configure the order in which gateways are used for payment processing.
            </p>
            <div className="space-y-3">
              {[
                { priority: "Primary", name: "NMI", uptime: "98.5%", declineRate: "2.1%", active: true },
                { priority: "Fallback 1", name: "Backup Gateway", uptime: "97.2%", declineRate: "3.4%", active: true },
                { priority: "Fallback 2", name: "Tertiary Gateway", uptime: "—", declineRate: "—", active: false },
              ].map((gw) => (
                <div
                  key={gw.priority}
                  className={`flex items-center gap-4 p-4 rounded-[7px] border ${
                    gw.active ? "border-gray-200 bg-gray-50" : "border-dashed border-gray-300 bg-gray-50/50"
                  }`}
                >
                  <GripVertical className="h-5 w-5 text-gray-500 shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-gray-900">{gw.name}</span>
                      <Badge
                        className={`rounded-full ${
                          gw.active
                            ? "bg-green-600 text-white"
                            : "bg-gray-400 text-white"
                        }`}
                      >
                        {gw.priority}
                      </Badge>
                      {!gw.active && (
                        <Badge className="rounded-full bg-gray-400 text-white">Disabled</Badge>
                      )}
                    </div>
                    {gw.active && (
                      <p className="text-sm text-gray-500 mt-1">
                        {gw.uptime} uptime · {gw.declineRate} decline rate
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Routing Rules */}
          <div className="bg-white rounded-[7px] border border-gray-200 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Routing Rules</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Route transactions to specific gateways based on conditions.
                </p>
              </div>
              <Button variant="outline" className="rounded-[7px]">
                <Plus className="h-4 w-4 mr-2" />
                Add Rule
              </Button>
            </div>
            <div className="space-y-3">
              {routingRules.map((rule) => (
                <div
                  key={rule.id}
                  className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-[7px]"
                >
                  <div className="flex items-center gap-4">
                    <ArrowRight className="h-4 w-4 text-[#1844A6]" />
                    <span className="text-sm font-medium text-gray-900">{rule.condition}</span>
                    <ArrowRight className="h-4 w-4 text-gray-500" />
                    <Badge className="rounded-full bg-[#1844A6] text-white">{rule.gateway}</Badge>
                  </div>
                  <Switch checked={rule.enabled} />
                </div>
              ))}
            </div>
          </div>

          {/* Failover Settings */}
          <div className="bg-white rounded-[7px] border border-gray-200 p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Failover Settings</h3>
            <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-[7px]">
              <div>
                <p className="text-sm font-medium text-gray-900">Auto-Retry on Decline</p>
                <p className="text-sm text-gray-500">Automatically retry failed transactions on the next available gateway</p>
              </div>
              <Switch checked={autoRetry} onCheckedChange={setAutoRetry} />
            </div>
            <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-[7px]">
              <div>
                <p className="text-sm font-medium text-gray-900">Retry Delay</p>
                <p className="text-sm text-gray-500">Time to wait before retrying on fallback gateway</p>
              </div>
              <Select value={retryDelay} onValueChange={setRetryDelay}>
                <SelectTrigger className="w-[140px] rounded-[7px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Immediate</SelectItem>
                  <SelectItem value="5">5 seconds</SelectItem>
                  <SelectItem value="10">10 seconds</SelectItem>
                  <SelectItem value="30">30 seconds</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Analytics Tab */}
      {activeTab === "checkout-analytics" && (
        <div className="space-y-6">
          {/* Funnel Visualization */}
          <div className="bg-white rounded-[7px] border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Checkout Funnel</h3>
            <div className="space-y-1">
              {funnelSteps.map((step, i) => (
                <div key={step.name}>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-900 w-28 shrink-0">
                      {step.name}
                    </span>
                    <div className="flex-1 h-10 bg-gray-100 rounded-[7px] overflow-hidden">
                      <div
                        className="h-full bg-[#1844A6] rounded-[7px] flex items-center justify-end pr-3 transition-all"
                        style={{ width: `${step.percent}%` }}
                      >
                        <span className="text-xs font-medium text-white">
                          {step.count.toLocaleString()} ({step.percent}%)
                        </span>
                      </div>
                    </div>
                  </div>
                  {i < funnelSteps.length - 1 && (
                    <div className="flex items-center gap-4 py-1">
                      <span className="w-28 shrink-0" />
                      <span className="text-xs text-red-600 ml-2">
                        ↓ {((1 - funnelSteps[i + 1].count / step.count) * 100).toFixed(1)}% drop-off
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Drop-off Reasons + Device Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-[7px] border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Top Drop-off Reasons
              </h3>
              <div className="space-y-3">
                {dropOffReasons.map((item) => (
                  <div key={item.reason} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-gray-900">{item.reason}</span>
                      <span className="text-gray-500">{item.percent}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-red-600 rounded-full transition-all"
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-[7px] border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Checkout by Device
              </h3>
              <div className="space-y-6">
                {[
                  { label: "Desktop", percent: 52, icon: Monitor, color: "bg-[#1844A6]" },
                  { label: "Mobile", percent: 38, icon: Smartphone, color: "bg-green-600" },
                  { label: "Tablet", percent: 10, icon: Tablet, color: "bg-yellow-500" },
                ].map((device) => {
                  const Icon = device.icon;
                  return (
                    <div key={device.label} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-gray-500" />
                          <span className="font-medium text-gray-900">{device.label}</span>
                        </div>
                        <span className="text-gray-500">{device.percent}%</span>
                      </div>
                      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${device.color} rounded-full transition-all`}
                          style={{ width: `${device.percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Payment Method Conversion Rates */}
          <div className="bg-white rounded-[7px] border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Payment Method Conversion Rates
              </h3>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-[#F6F9FC] border-b border-gray-200">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Method</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Attempts</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Successes</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Rate</th>
                </tr>
              </thead>
              <tbody>
                {paymentMethodConversions.map((pm) => (
                  <tr key={pm.method} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{pm.method}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{pm.attempts.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{pm.successes.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <Badge className="rounded-full bg-green-600 text-white">{pm.rate}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
