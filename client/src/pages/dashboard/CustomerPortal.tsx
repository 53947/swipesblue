import { useState } from "react";
import {
  Users,
  Zap,
  HeadphonesIcon,
  ThumbsUp,
  Settings,
  Palette,
  ToggleLeft,
  Activity,
  Copy,
  Upload,
  Eye,
  CreditCard,
  FileText,
  RefreshCw,
  Clock,
  Receipt,
  MessageSquare,
  CalendarCheck,
  Search,
  LogIn,
  PenLine,
  Download,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { Checkbox } from "@/components/ui/checkbox";
import MetricCard from "@/components/MetricCard";

interface PortalFeature {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  icon: typeof CreditCard;
}

interface ActivityEntry {
  id: string;
  timestamp: string;
  customer: string;
  action: string;
  details: string;
  ipAddress: string;
}

const initialFeatures: PortalFeature[] = [
  { id: "payment-methods", name: "Payment Method Management", description: "Customers can add, update, and remove payment methods", enabled: true, icon: CreditCard },
  { id: "invoices", name: "Invoice Center", description: "Customers can view and download all invoices", enabled: true, icon: FileText },
  { id: "subscriptions", name: "Subscription Management", description: "Customers can upgrade, downgrade, pause, or cancel subscriptions", enabled: true, icon: RefreshCw },
  { id: "history", name: "Transaction History", description: "Customers can view their complete payment history", enabled: true, icon: Clock },
  { id: "receipts", name: "Receipt Downloads", description: "Customers can download PDF receipts for any transaction", enabled: false, icon: Receipt },
  { id: "support", name: "Support Ticket Submission", description: "Customers can submit support requests directly from the portal", enabled: true, icon: MessageSquare },
  { id: "auto-pay", name: "Auto-Payment Setup", description: "Customers can enroll in automatic payments for recurring invoices", enabled: false, icon: CalendarCheck },
];

const activityEntries: ActivityEntry[] = [
  { id: "act-01", timestamp: "Oct 24, 2025 10:45 AM", customer: "john@acme.com", action: "Logged in", details: "Chrome on Windows", ipAddress: "192.168.1.45" },
  { id: "act-02", timestamp: "Oct 24, 2025 10:42 AM", customer: "sarah@techstart.io", action: "Updated card", details: "Changed Visa ending 4242 to 8888", ipAddress: "10.0.0.88" },
  { id: "act-03", timestamp: "Oct 24, 2025 10:38 AM", customer: "mike@globalretail.co", action: "Viewed invoice", details: "Invoice #INV-2025-0142", ipAddress: "203.0.113.55" },
  { id: "act-04", timestamp: "Oct 24, 2025 10:30 AM", customer: "anna@summit.digital", action: "Downloaded receipt", details: "Transaction #TXN-8834", ipAddress: "198.51.100.12" },
  { id: "act-05", timestamp: "Oct 24, 2025 10:22 AM", customer: "tom@bright.solutions", action: "Logged in", details: "Safari on macOS", ipAddress: "172.16.0.33" },
  { id: "act-06", timestamp: "Oct 24, 2025 10:15 AM", customer: "lisa@webdesign.co", action: "Cancelled subscription", details: "Pro Plan — reason: switching providers", ipAddress: "10.1.1.77" },
  { id: "act-07", timestamp: "Oct 24, 2025 10:08 AM", customer: "david@startup.io", action: "Submitted ticket", details: "Subject: Billing question about invoice #INV-2025-0138", ipAddress: "192.168.5.21" },
  { id: "act-08", timestamp: "Oct 24, 2025 09:55 AM", customer: "emma@shop.com", action: "Updated card", details: "Added new Mastercard ending 5555", ipAddress: "10.0.2.44" },
  { id: "act-09", timestamp: "Oct 24, 2025 09:48 AM", customer: "john@acme.com", action: "Viewed invoice", details: "Invoice #INV-2025-0140", ipAddress: "192.168.1.45" },
  { id: "act-10", timestamp: "Oct 24, 2025 09:40 AM", customer: "sarah@techstart.io", action: "Downloaded receipt", details: "Transaction #TXN-8830", ipAddress: "10.0.0.88" },
  { id: "act-11", timestamp: "Oct 24, 2025 09:32 AM", customer: "chris@enterprise.co", action: "Logged in", details: "Firefox on Linux", ipAddress: "172.16.1.99" },
  { id: "act-12", timestamp: "Oct 24, 2025 09:25 AM", customer: "anna@summit.digital", action: "Submitted ticket", details: "Subject: Request refund for duplicate charge", ipAddress: "198.51.100.12" },
  { id: "act-13", timestamp: "Oct 24, 2025 09:18 AM", customer: "mike@globalretail.co", action: "Logged in", details: "Chrome on Android", ipAddress: "203.0.113.55" },
  { id: "act-14", timestamp: "Oct 24, 2025 09:10 AM", customer: "tom@bright.solutions", action: "Downloaded receipt", details: "Transaction #TXN-8828", ipAddress: "172.16.0.33" },
  { id: "act-15", timestamp: "Oct 24, 2025 09:02 AM", customer: "emma@shop.com", action: "Viewed invoice", details: "Invoice #INV-2025-0136", ipAddress: "10.0.2.44" },
];

function getActionBadgeClasses(action: string): string {
  if (action.includes("Logged in")) return "bg-swipes-blue-deep text-white";
  if (action.includes("Updated card")) return "bg-swipes-trusted-green text-white";
  if (action.includes("Viewed invoice")) return "bg-swipes-blue-deep/70 text-white";
  if (action.includes("Downloaded")) return "bg-swipes-gold text-white";
  if (action.includes("Cancelled")) return "bg-swipes-muted-red text-white";
  if (action.includes("Submitted")) return "bg-swipes-teal text-white";
  return "bg-gray-400 text-white";
}

export default function CustomerPortal() {
  const [portalEnabled, setPortalEnabled] = useState(true);
  const [requireLogin, setRequireLogin] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState("30m");
  const [loginMethod, setLoginMethod] = useState("email-password");
  const [enable2FA, setEnable2FA] = useState(false);
  const [allowSocialLogin, setAllowSocialLogin] = useState(true);
  const [socialGoogle, setSocialGoogle] = useState(true);
  const [socialApple, setSocialApple] = useState(false);
  const [allowUpdatePayment, setAllowUpdatePayment] = useState(true);
  const [allowViewInvoices, setAllowViewInvoices] = useState(true);
  const [allowCancelSubs, setAllowCancelSubs] = useState(true);
  const [allowRefunds, setAllowRefunds] = useState(false);
  const [allowDownloadReceipts, setAllowDownloadReceipts] = useState(true);
  const [allowUpdateAddress, setAllowUpdateAddress] = useState(true);
  const [features, setFeatures] = useState(initialFeatures);
  const [brandColor, setBrandColor] = useState("#1844A6");
  const [welcomeMessage, setWelcomeMessage] = useState("Welcome to your account portal. Manage your payments, invoices, and subscriptions.");
  const [footerText, setFooterText] = useState("Powered by swipesblue — Secure payment processing");
  const [customDomain, setCustomDomain] = useState("");
  const [activityFilter, setActivityFilter] = useState("all");
  const [activitySearch, setActivitySearch] = useState("");

  const toggleFeature = (featureId: string) => {
    setFeatures((prev) =>
      prev.map((f) => (f.id === featureId ? { ...f, enabled: !f.enabled } : f))
    );
  };

  const filteredActivity = activityEntries.filter((entry) => {
    const matchesFilter =
      activityFilter === "all" ||
      entry.action.toLowerCase().includes(activityFilter.toLowerCase());
    const matchesSearch =
      activitySearch === "" ||
      entry.customer.toLowerCase().includes(activitySearch.toLowerCase()) ||
      entry.action.toLowerCase().includes(activitySearch.toLowerCase()) ||
      entry.details.toLowerCase().includes(activitySearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2 text-swipes-black">Customer Portal</h1>
        <p className="text-swipes-pro-gray">
          Self-service portal settings for your customers — payment method management, invoice viewing, and subscription management
        </p>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Portal Visitors This Month"
          value="234"
          change="+12% from last month"
          changeType="positive"
          icon={Users}
        />
        <MetricCard
          title="Self-Service Actions"
          value="89"
          change="This month"
          changeType="neutral"
          icon={Zap}
        />
        <MetricCard
          title="Support Tickets Avoided"
          value="~45"
          change="Estimated self-service savings"
          changeType="positive"
          icon={HeadphonesIcon}
        />
        <MetricCard
          title="Customer Satisfaction"
          value="94%"
          change="+2% from last month"
          changeType="positive"
          icon={ThumbsUp}
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="portal-settings" className="space-y-6">
        <TabsList>
          <TabsTrigger value="portal-settings">Portal Settings</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        {/* Portal Settings Tab */}
        <TabsContent value="portal-settings" className="space-y-6">
          {/* General */}
          <div className="bg-white rounded-[7px] border border-gray-200 p-6 space-y-6">
            <h3 className="text-lg font-semibold text-swipes-black">General</h3>
            <div className="flex items-center justify-between py-2">
              <div>
                <Label className="text-sm font-medium text-swipes-black">Enable Customer Portal</Label>
                <p className="text-sm text-swipes-pro-gray">Allow customers to access the self-service portal</p>
              </div>
              <Switch checked={portalEnabled} onCheckedChange={setPortalEnabled} />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-swipes-black">Portal URL</Label>
              <div className="flex gap-2">
                <Input
                  value="https://pay.swipesblue.com/portal/merchant-id"
                  readOnly
                  className="rounded-[7px] bg-gray-50 flex-1"
                />
                <Button variant="outline" className="rounded-[7px]">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <Label className="text-sm text-swipes-black">Require login</Label>
              <Switch checked={requireLogin} onCheckedChange={setRequireLogin} />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-swipes-black">Session Timeout</Label>
              <Select value={sessionTimeout} onValueChange={setSessionTimeout}>
                <SelectTrigger className="w-[200px] rounded-[7px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15m">15 minutes</SelectItem>
                  <SelectItem value="30m">30 minutes</SelectItem>
                  <SelectItem value="1h">1 hour</SelectItem>
                  <SelectItem value="4h">4 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Authentication */}
          <div className="bg-white rounded-[7px] border border-gray-200 p-6 space-y-6">
            <h3 className="text-lg font-semibold text-swipes-black">Authentication</h3>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-swipes-black">Login Method</Label>
              <div className="flex gap-3">
                {[
                  { value: "email-password", label: "Email + Password" },
                  { value: "magic-link", label: "Magic Link" },
                  { value: "sso", label: "SSO" },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setLoginMethod(option.value)}
                    className={`px-4 py-2 rounded-[7px] text-sm font-medium border transition-colors ${
                      loginMethod === option.value
                        ? "bg-swipes-blue-deep text-white border-swipes-blue-deep"
                        : "bg-white text-swipes-pro-gray border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <Label className="text-sm text-swipes-black">Enable 2FA for customers</Label>
              <Switch checked={enable2FA} onCheckedChange={setEnable2FA} />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2">
                <Label className="text-sm text-swipes-black">Allow social login</Label>
                <Switch checked={allowSocialLogin} onCheckedChange={setAllowSocialLogin} />
              </div>
              {allowSocialLogin && (
                <div className="flex gap-4 pl-4">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={socialGoogle}
                      onCheckedChange={(checked) => setSocialGoogle(checked as boolean)}
                    />
                    <Label className="text-sm text-swipes-pro-gray">Google</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={socialApple}
                      onCheckedChange={(checked) => setSocialApple(checked as boolean)}
                    />
                    <Label className="text-sm text-swipes-pro-gray">Apple</Label>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Access */}
          <div className="bg-white rounded-[7px] border border-gray-200 p-6 space-y-4">
            <h3 className="text-lg font-semibold text-swipes-black">Access Permissions</h3>
            {[
              { label: "Allow customers to update payment methods", checked: allowUpdatePayment, onChange: setAllowUpdatePayment },
              { label: "Allow customers to view invoices", checked: allowViewInvoices, onChange: setAllowViewInvoices },
              { label: "Allow customers to cancel subscriptions", checked: allowCancelSubs, onChange: setAllowCancelSubs },
              { label: "Allow customers to request refunds", checked: allowRefunds, onChange: setAllowRefunds },
              { label: "Allow customers to download receipts", checked: allowDownloadReceipts, onChange: setAllowDownloadReceipts },
              { label: "Allow customers to update billing address", checked: allowUpdateAddress, onChange: setAllowUpdateAddress },
            ].map((toggle) => (
              <div key={toggle.label} className="flex items-center justify-between py-2">
                <Label className="text-sm text-swipes-black">{toggle.label}</Label>
                <Switch checked={toggle.checked} onCheckedChange={toggle.onChange} />
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Branding Tab */}
        <TabsContent value="branding" className="space-y-6">
          <div className="bg-white rounded-[7px] border border-gray-200 p-6 space-y-6">
            <h3 className="text-lg font-semibold text-swipes-black">Portal Branding</h3>

            {/* Logo Upload */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-swipes-black">Portal Logo</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-[7px] p-8 text-center hover:border-swipes-blue-deep transition-colors">
                <Upload className="h-8 w-8 text-swipes-pro-gray mx-auto mb-2" />
                <p className="text-sm text-swipes-pro-gray">
                  Drag and drop your logo here, or click to browse
                </p>
                <p className="text-xs text-swipes-pro-gray mt-1">PNG, JPG, or SVG — max 2MB</p>
                <Button variant="outline" className="mt-3 rounded-[7px]">
                  Choose File
                </Button>
              </div>
            </div>

            {/* Brand Color */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-swipes-black">Primary Brand Color</Label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={brandColor}
                  onChange={(e) => setBrandColor(e.target.value)}
                  className="w-10 h-10 rounded-[7px] border border-gray-200 cursor-pointer"
                />
                <Input
                  value={brandColor}
                  onChange={(e) => setBrandColor(e.target.value)}
                  className="w-32 rounded-[7px]"
                />
              </div>
            </div>

            {/* Custom Domain */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-swipes-black">Custom Domain</Label>
              <Input
                placeholder="e.g., billing.merchantsite.com"
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
                className="rounded-[7px]"
              />
              <p className="text-xs text-swipes-pro-gray">Point a CNAME record to portal.swipesblue.com</p>
            </div>

            {/* Welcome Message */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-swipes-black">Welcome Message</Label>
              <Textarea
                value={welcomeMessage}
                onChange={(e) => setWelcomeMessage(e.target.value)}
                className="rounded-[7px]"
                rows={3}
              />
            </div>

            {/* Footer Text */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-swipes-black">Footer Text</Label>
              <Textarea
                value={footerText}
                onChange={(e) => setFooterText(e.target.value)}
                className="rounded-[7px]"
                rows={2}
              />
            </div>

            {/* Preview */}
            <Button variant="outline" className="rounded-[7px]">
              <Eye className="h-4 w-4 mr-2" />
              Preview Portal
            </Button>
          </div>

          {/* Portal Preview Card */}
          <div className="bg-white rounded-[7px] border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-swipes-black mb-4">Portal Preview</h3>
            <div className="border border-gray-200 rounded-[7px] overflow-hidden">
              <div className="p-4" style={{ backgroundColor: brandColor }}>
                <h4 className="text-white font-semibold">Your Brand</h4>
              </div>
              <div className="p-6 bg-gray-50 space-y-4">
                <p className="text-sm text-swipes-pro-gray">{welcomeMessage}</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-white rounded-[7px] border border-gray-200">
                    <CreditCard className="h-5 w-5 mb-2" style={{ color: brandColor }} />
                    <p className="text-sm font-medium text-swipes-black">Payment Methods</p>
                  </div>
                  <div className="p-3 bg-white rounded-[7px] border border-gray-200">
                    <FileText className="h-5 w-5 mb-2" style={{ color: brandColor }} />
                    <p className="text-sm font-medium text-swipes-black">Invoices</p>
                  </div>
                  <div className="p-3 bg-white rounded-[7px] border border-gray-200">
                    <RefreshCw className="h-5 w-5 mb-2" style={{ color: brandColor }} />
                    <p className="text-sm font-medium text-swipes-black">Subscriptions</p>
                  </div>
                  <div className="p-3 bg-white rounded-[7px] border border-gray-200">
                    <Clock className="h-5 w-5 mb-2" style={{ color: brandColor }} />
                    <p className="text-sm font-medium text-swipes-black">History</p>
                  </div>
                </div>
              </div>
              <div className="p-3 border-t border-gray-200 bg-gray-50">
                <p className="text-xs text-swipes-pro-gray text-center">{footerText}</p>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Features Tab */}
        <TabsContent value="features" className="space-y-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="bg-white rounded-[7px] border border-gray-200 p-6 flex items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-[7px] bg-swipes-blue-deep/10 flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-swipes-blue-deep" />
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
            );
          })}
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-6">
          <div className="bg-white rounded-[7px] border border-gray-200">
            <div className="p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 border-b border-gray-200">
              <div className="relative flex-1 w-full sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-swipes-pro-gray" />
                <Input
                  placeholder="Search customers or actions..."
                  value={activitySearch}
                  onChange={(e) => setActivitySearch(e.target.value)}
                  className="pl-9 rounded-[7px]"
                />
              </div>
              <Select value={activityFilter} onValueChange={setActivityFilter}>
                <SelectTrigger className="w-[180px] rounded-[7px]">
                  <SelectValue placeholder="Filter by action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="logged in">Logged in</SelectItem>
                  <SelectItem value="updated card">Updated card</SelectItem>
                  <SelectItem value="viewed invoice">Viewed invoice</SelectItem>
                  <SelectItem value="cancelled">Cancelled subscription</SelectItem>
                  <SelectItem value="downloaded">Downloaded receipt</SelectItem>
                  <SelectItem value="submitted">Submitted ticket</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>IP Address</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredActivity.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell className="text-swipes-pro-gray text-sm">{entry.timestamp}</TableCell>
                    <TableCell className="font-medium text-swipes-black">{entry.customer}</TableCell>
                    <TableCell>
                      <Badge className={getActionBadgeClasses(entry.action)}>{entry.action}</Badge>
                    </TableCell>
                    <TableCell className="text-swipes-pro-gray text-sm">{entry.details}</TableCell>
                    <TableCell className="text-swipes-pro-gray font-mono text-sm">{entry.ipAddress}</TableCell>
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
