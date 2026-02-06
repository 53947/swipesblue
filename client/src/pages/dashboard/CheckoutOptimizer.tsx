import { useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import MetricCard from "@/components/MetricCard";

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
      return "bg-swipes-trusted-green text-white";
    case "Completed":
      return "bg-swipes-blue-deep text-white";
    case "Paused":
      return "bg-swipes-gold text-white";
  }
}

export default function CheckoutOptimizer() {
  const [features, setFeatures] = useState(initialFeatures);
  const [autoRetry, setAutoRetry] = useState(true);
  const [retryDelay, setRetryDelay] = useState("5");

  const toggleFeature = (featureId: string) => {
    setFeatures((prev) =>
      prev.map((f) => (f.id === featureId ? { ...f, enabled: !f.enabled } : f))
    );
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2 text-swipes-black">Checkout Optimizer</h1>
        <p className="text-swipes-pro-gray">
          Optimize conversion rates with A/B testing, smart payment routing, and checkout flow analytics
        </p>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* Tabs */}
      <Tabs defaultValue="optimization" className="space-y-6">
        <TabsList>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
          <TabsTrigger value="ab-tests">A/B Tests</TabsTrigger>
          <TabsTrigger value="smart-routing">Smart Routing</TabsTrigger>
          <TabsTrigger value="checkout-analytics">Checkout Analytics</TabsTrigger>
        </TabsList>

        {/* Optimization Tab */}
        <TabsContent value="optimization" className="space-y-4">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white rounded-[7px] border border-gray-200 p-6 flex items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-[7px] bg-swipes-blue-deep/10 flex items-center justify-center shrink-0">
                  <Zap className="h-5 w-5 text-swipes-blue-deep" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-base font-semibold text-swipes-black">
                      {feature.name}
                    </h3>
                    <Badge
                      className={
                        feature.enabled
                          ? "bg-swipes-trusted-green text-white"
                          : "bg-gray-400 text-white"
                      }
                    >
                      {feature.enabled ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>
                  <p className="text-sm text-swipes-pro-gray">{feature.description}</p>
                </div>
              </div>
              <Switch
                checked={feature.enabled}
                onCheckedChange={() => toggleFeature(feature.id)}
              />
            </div>
          ))}
        </TabsContent>

        {/* A/B Tests Tab */}
        <TabsContent value="ab-tests" className="space-y-6">
          <div className="bg-white rounded-[7px] border border-gray-200">
            <div className="p-4 flex items-center justify-between border-b border-gray-200">
              <h3 className="text-lg font-semibold text-swipes-black">A/B Tests</h3>
              <Button className="bg-swipes-blue-deep hover:bg-swipes-blue-deep/90 text-white rounded-[7px]">
                <Plus className="h-4 w-4 mr-2" />
                Create Test
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Test Name</TableHead>
                  <TableHead>Variant A</TableHead>
                  <TableHead>Variant B</TableHead>
                  <TableHead>Split</TableHead>
                  <TableHead>Conv. A</TableHead>
                  <TableHead>Conv. B</TableHead>
                  <TableHead>Winner</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {abTests.map((test) => (
                  <TableRow key={test.id}>
                    <TableCell className="font-medium text-swipes-black">{test.name}</TableCell>
                    <TableCell className="text-swipes-pro-gray">{test.variantA}</TableCell>
                    <TableCell className="text-swipes-pro-gray">{test.variantB}</TableCell>
                    <TableCell className="text-swipes-pro-gray">{test.trafficSplit}</TableCell>
                    <TableCell className="text-swipes-black">{test.conversionsA}</TableCell>
                    <TableCell className="text-swipes-black">{test.conversionsB}</TableCell>
                    <TableCell className="text-swipes-black font-medium">{test.winner}</TableCell>
                    <TableCell>
                      <Badge className={getTestStatusClasses(test.status)}>{test.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline" className="rounded-[7px]">
                        {test.status === "Running" ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Smart Routing Tab */}
        <TabsContent value="smart-routing" className="space-y-6">
          {/* Gateway Priority */}
          <div className="bg-white rounded-[7px] border border-gray-200 p-6 space-y-4">
            <h3 className="text-lg font-semibold text-swipes-black">Gateway Priority</h3>
            <p className="text-sm text-swipes-pro-gray">
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
                  <GripVertical className="h-5 w-5 text-swipes-pro-gray shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-swipes-black">{gw.name}</span>
                      <Badge
                        className={
                          gw.active
                            ? "bg-swipes-trusted-green text-white"
                            : "bg-gray-400 text-white"
                        }
                      >
                        {gw.priority}
                      </Badge>
                      {!gw.active && (
                        <Badge className="bg-gray-400 text-white">Disabled</Badge>
                      )}
                    </div>
                    {gw.active && (
                      <p className="text-sm text-swipes-pro-gray mt-1">
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
                <h3 className="text-lg font-semibold text-swipes-black">Routing Rules</h3>
                <p className="text-sm text-swipes-pro-gray mt-1">
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
                    <ArrowRight className="h-4 w-4 text-swipes-blue-deep" />
                    <span className="text-sm font-medium text-swipes-black">{rule.condition}</span>
                    <ArrowRight className="h-4 w-4 text-swipes-pro-gray" />
                    <Badge className="bg-swipes-blue-deep text-white">{rule.gateway}</Badge>
                  </div>
                  <Switch checked={rule.enabled} />
                </div>
              ))}
            </div>
          </div>

          {/* Failover Settings */}
          <div className="bg-white rounded-[7px] border border-gray-200 p-6 space-y-4">
            <h3 className="text-lg font-semibold text-swipes-black">Failover Settings</h3>
            <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-[7px]">
              <div>
                <p className="text-sm font-medium text-swipes-black">Auto-Retry on Decline</p>
                <p className="text-sm text-swipes-pro-gray">Automatically retry failed transactions on the next available gateway</p>
              </div>
              <Switch checked={autoRetry} onCheckedChange={setAutoRetry} />
            </div>
            <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-[7px]">
              <div>
                <p className="text-sm font-medium text-swipes-black">Retry Delay</p>
                <p className="text-sm text-swipes-pro-gray">Time to wait before retrying on fallback gateway</p>
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
        </TabsContent>

        {/* Checkout Analytics Tab */}
        <TabsContent value="checkout-analytics" className="space-y-6">
          {/* Funnel Visualization */}
          <div className="bg-white rounded-[7px] border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-swipes-black mb-6">Checkout Funnel</h3>
            <div className="space-y-1">
              {funnelSteps.map((step, i) => (
                <div key={step.name}>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-swipes-black w-28 shrink-0">
                      {step.name}
                    </span>
                    <div className="flex-1 h-10 bg-gray-100 rounded-[7px] overflow-hidden">
                      <div
                        className="h-full bg-swipes-blue-deep rounded-[7px] flex items-center justify-end pr-3 transition-all"
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
                      <span className="text-xs text-swipes-muted-red ml-2">
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
              <h3 className="text-lg font-semibold text-swipes-black mb-4">
                Top Drop-off Reasons
              </h3>
              <div className="space-y-3">
                {dropOffReasons.map((item) => (
                  <div key={item.reason} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-swipes-black">{item.reason}</span>
                      <span className="text-swipes-pro-gray">{item.percent}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-swipes-muted-red rounded-full transition-all"
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-[7px] border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-swipes-black mb-4">
                Checkout by Device
              </h3>
              <div className="space-y-6">
                {[
                  { label: "Desktop", percent: 52, icon: Monitor, color: "bg-swipes-blue-deep" },
                  { label: "Mobile", percent: 38, icon: Smartphone, color: "bg-swipes-trusted-green" },
                  { label: "Tablet", percent: 10, icon: Tablet, color: "bg-swipes-gold" },
                ].map((device) => {
                  const Icon = device.icon;
                  return (
                    <div key={device.label} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-swipes-pro-gray" />
                          <span className="font-medium text-swipes-black">{device.label}</span>
                        </div>
                        <span className="text-swipes-pro-gray">{device.percent}%</span>
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
              <h3 className="text-lg font-semibold text-swipes-black">
                Payment Method Conversion Rates
              </h3>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Method</TableHead>
                  <TableHead>Attempts</TableHead>
                  <TableHead>Successes</TableHead>
                  <TableHead>Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentMethodConversions.map((pm) => (
                  <TableRow key={pm.method}>
                    <TableCell className="font-medium text-swipes-black">{pm.method}</TableCell>
                    <TableCell className="text-swipes-pro-gray">{pm.attempts.toLocaleString()}</TableCell>
                    <TableCell className="text-swipes-pro-gray">{pm.successes.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge className="bg-swipes-trusted-green text-white">{pm.rate}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
