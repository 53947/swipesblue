import { useState } from "react";
import {
  Settings,
  Building2,
  Bell,
  CreditCard,
  Receipt,
  Code,
  Upload,
  ExternalLink,
  Copy,
  Palette,
} from "lucide-react";
import { useMerchantAuth } from "@/hooks/use-merchant-auth";
import TierBadge from "@/components/TierBadge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
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

const billingHistory = [
  { date: "Oct 1, 2025", description: "Scale Plan — Monthly", amount: "$49.00", status: "Paid", invoice: "INV-2025-0010" },
  { date: "Sep 1, 2025", description: "Scale Plan — Monthly", amount: "$49.00", status: "Paid", invoice: "INV-2025-0009" },
  { date: "Aug 1, 2025", description: "Scale Plan — Monthly", amount: "$49.00", status: "Paid", invoice: "INV-2025-0008" },
  { date: "Jul 1, 2025", description: "Growth Plan — Monthly", amount: "$19.00", status: "Paid", invoice: "INV-2025-0007" },
  { date: "Jun 1, 2025", description: "Growth Plan — Monthly", amount: "$19.00", status: "Paid", invoice: "INV-2025-0006" },
  { date: "May 15, 2025", description: "Plan upgrade: Growth → Scale", amount: "$30.00", status: "Paid", invoice: "INV-2025-0005" },
];

export default function SettingsPage() {
  const { tier } = useMerchantAuth();

  // General
  const [companyName, setCompanyName] = useState("swipesblue, inc.");
  const [primaryEmail, setPrimaryEmail] = useState("admin@swipesblue.com");
  const [timezone, setTimezone] = useState("america-new-york");
  const [language, setLanguage] = useState("en");
  const [defaultView, setDefaultView] = useState("overview");
  const [itemsPerPage, setItemsPerPage] = useState("25");
  const [dateFormat, setDateFormat] = useState("mdy");

  // Business Profile
  const [businessName, setBusinessName] = useState("swipesblue, inc.");
  const [dbaName, setDbaName] = useState("swipesblue");
  const [businessType, setBusinessType] = useState("llc");
  const [street, setStreet] = useState("123 Commerce St");
  const [city, setCity] = useState("New York");
  const [state, setState] = useState("NY");
  const [zip, setZip] = useState("10001");
  const [country, setCountry] = useState("us");
  const [supportPhone, setSupportPhone] = useState("+1 (555) 123-4567");
  const [supportEmail, setSupportEmail] = useState("support@swipesblue.com");
  const [websiteUrl, setWebsiteUrl] = useState("https://swipesblue.com");
  const [taxId, setTaxId] = useState("XX-XXXXXXX");

  // Notifications
  const [notifSuccessfulPayment, setNotifSuccessfulPayment] = useState(true);
  const [notifFailedPayment, setNotifFailedPayment] = useState(true);
  const [notifRefund, setNotifRefund] = useState(true);
  const [notifLargeTransaction, setNotifLargeTransaction] = useState(true);
  const [largeTransactionThreshold, setLargeTransactionThreshold] = useState("1000");
  const [notifNewDevice, setNotifNewDevice] = useState(true);
  const [notifApiKey, setNotifApiKey] = useState(true);
  const [notifFraud, setNotifFraud] = useState(true);
  const [notifFailedLogin, setNotifFailedLogin] = useState(true);
  const [notifUpcomingInvoice, setNotifUpcomingInvoice] = useState(true);
  const [notifExpiring, setNotifExpiring] = useState(true);
  const [notifPlanRenewal, setNotifPlanRenewal] = useState(false);
  const [notifDailySummary, setNotifDailySummary] = useState(true);
  const [notifWeeklySummary, setNotifWeeklySummary] = useState(false);
  const [notifMonthlyReport, setNotifMonthlyReport] = useState(true);

  // Payment Settings
  const [defaultCurrency, setDefaultCurrency] = useState("usd");
  const [autoCapture, setAutoCapture] = useState(true);
  const [cardVisa, setCardVisa] = useState(true);
  const [cardMc, setCardMc] = useState(true);
  const [cardAmex, setCardAmex] = useState(true);
  const [cardDiscover, setCardDiscover] = useState(true);
  const [cardJcb, setCardJcb] = useState(false);
  const [cardDiners, setCardDiners] = useState(false);
  const [avsSetting, setAvsSetting] = useState("require");
  const [cvvSetting, setCvvSetting] = useState("required");
  const [threeDSecure, setThreeDSecure] = useState(true);
  const [threeDThreshold, setThreeDThreshold] = useState("100");
  const [duplicateWindow, setDuplicateWindow] = useState("5min");
  const [autoReceipts, setAutoReceipts] = useState(true);
  const [receiptTemplate, setReceiptTemplate] = useState(
    "Thank you for your purchase! Your payment of {{amount}} has been processed successfully.\n\nOrder: {{order_id}}\nDate: {{date}}\n\nIf you have any questions, contact us at support@swipesblue.com"
  );

  // API
  const [testMode, setTestMode] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState("https://swipesblue.com/api/webhooks");

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2 text-swipes-black">Settings</h1>
        <p className="text-swipes-pro-gray">
          Configure your account, business profile, notifications, and preferences
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="business">Business Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="payment">Payment Settings</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>

        {/* General Tab */}
        <TabsContent value="general" className="space-y-6">
          <div className="bg-white rounded-[7px] border border-gray-200 p-6 space-y-6">
            <h3 className="text-lg font-semibold text-swipes-black">Account Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-swipes-black">Company Name</Label>
                <Input
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="rounded-[7px]"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-swipes-black">Primary Email</Label>
                <Input
                  type="email"
                  value={primaryEmail}
                  onChange={(e) => setPrimaryEmail(e.target.value)}
                  className="rounded-[7px]"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-swipes-black">Timezone</Label>
                <Select value={timezone} onValueChange={setTimezone}>
                  <SelectTrigger className="rounded-[7px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="america-new-york">America/New York (EST)</SelectItem>
                    <SelectItem value="america-chicago">America/Chicago (CST)</SelectItem>
                    <SelectItem value="america-denver">America/Denver (MST)</SelectItem>
                    <SelectItem value="america-los-angeles">America/Los Angeles (PST)</SelectItem>
                    <SelectItem value="europe-london">Europe/London (GMT)</SelectItem>
                    <SelectItem value="utc">UTC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-swipes-black">Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="rounded-[7px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[7px] border border-gray-200 p-6 space-y-6">
            <h3 className="text-lg font-semibold text-swipes-black">Display Preferences</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-swipes-black">Default Dashboard View</Label>
                <Select value={defaultView} onValueChange={setDefaultView}>
                  <SelectTrigger className="rounded-[7px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="overview">Overview</SelectItem>
                    <SelectItem value="transactions">Transactions</SelectItem>
                    <SelectItem value="analytics">Analytics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-swipes-black">Items Per Page</Label>
                <Select value={itemsPerPage} onValueChange={setItemsPerPage}>
                  <SelectTrigger className="rounded-[7px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-swipes-black">Date Format</Label>
                <Select value={dateFormat} onValueChange={setDateFormat}>
                  <SelectTrigger className="rounded-[7px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                    <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                    <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button className="bg-swipes-blue-deep hover:bg-swipes-blue-deep/90 text-white rounded-[7px]">
              Save Changes
            </Button>
          </div>
        </TabsContent>

        {/* Business Profile Tab */}
        <TabsContent value="business" className="space-y-6">
          <div className="bg-white rounded-[7px] border border-gray-200 p-6 space-y-6">
            <h3 className="text-lg font-semibold text-swipes-black">Business Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-swipes-black">Business Name</Label>
                <Input
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="rounded-[7px]"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-swipes-black">DBA Name</Label>
                <Input
                  value={dbaName}
                  onChange={(e) => setDbaName(e.target.value)}
                  className="rounded-[7px]"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-swipes-black">Business Type</Label>
                <Select value={businessType} onValueChange={setBusinessType}>
                  <SelectTrigger className="rounded-[7px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sole-prop">Sole Proprietorship</SelectItem>
                    <SelectItem value="llc">LLC</SelectItem>
                    <SelectItem value="corp">Corporation</SelectItem>
                    <SelectItem value="partnership">Partnership</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-swipes-black">Tax ID / EIN</Label>
                <Input
                  value={taxId}
                  onChange={(e) => setTaxId(e.target.value)}
                  className="rounded-[7px]"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[7px] border border-gray-200 p-6 space-y-6">
            <h3 className="text-lg font-semibold text-swipes-black">Business Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <Label className="text-sm font-medium text-swipes-black">Street Address</Label>
                <Input
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="rounded-[7px]"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-swipes-black">City</Label>
                <Input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="rounded-[7px]"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-swipes-black">State</Label>
                <Input
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="rounded-[7px]"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-swipes-black">ZIP Code</Label>
                <Input
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  className="rounded-[7px]"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-swipes-black">Country</Label>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger className="rounded-[7px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="gb">United Kingdom</SelectItem>
                    <SelectItem value="de">Germany</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[7px] border border-gray-200 p-6 space-y-6">
            <h3 className="text-lg font-semibold text-swipes-black">Contact & Support</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-swipes-black">Support Phone</Label>
                <Input
                  value={supportPhone}
                  onChange={(e) => setSupportPhone(e.target.value)}
                  className="rounded-[7px]"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-swipes-black">Support Email</Label>
                <Input
                  type="email"
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  className="rounded-[7px]"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-swipes-black">Website URL</Label>
                <Input
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  className="rounded-[7px]"
                />
              </div>
            </div>
          </div>

          {/* Logo Upload */}
          <div className="bg-white rounded-[7px] border border-gray-200 p-6 space-y-4">
            <h3 className="text-lg font-semibold text-swipes-black">Business Logo</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-[7px] p-8 text-center">
              <Upload className="h-8 w-8 text-swipes-pro-gray mx-auto mb-3" />
              <p className="text-sm font-medium text-swipes-black">
                Drag & drop your logo here, or click to browse
              </p>
              <p className="text-xs text-swipes-pro-gray mt-1">PNG, JPG, or SVG — Max 2MB</p>
              <Button variant="outline" className="mt-4 rounded-[7px]">
                Choose File
              </Button>
            </div>
          </div>

          {/* Basic Branding — available to ALL tiers */}
          <div className="bg-white rounded-[7px] border border-gray-200 p-6 space-y-6">
            <div className="flex items-center gap-3">
              <Palette className="h-5 w-5 text-swipes-blue-deep" />
              <h3 className="text-lg font-semibold text-swipes-black">Basic Branding</h3>
            </div>
            <p className="text-sm text-swipes-pro-gray">
              Customize how your business appears on checkout pages and customer-facing emails.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-swipes-black">Primary Brand Color</Label>
                <div className="flex items-center gap-3">
                  <Input
                    type="color"
                    defaultValue="#374151"
                    className="w-12 h-10 p-1 rounded-[7px] cursor-pointer"
                  />
                  <Input
                    defaultValue="#374151"
                    placeholder="#000000"
                    className="flex-1 rounded-[7px] font-mono text-sm"
                  />
                </div>
                <p className="text-xs text-swipes-pro-gray">
                  Used for buttons and accents on your checkout and emails.
                </p>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-swipes-black">Checkout Logo</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-[7px] p-4 text-center">
                  <Upload className="h-6 w-6 text-swipes-pro-gray mx-auto mb-2" />
                  <p className="text-xs text-swipes-pro-gray">
                    Upload a logo for your checkout page (PNG, JPG, SVG — Max 1MB)
                  </p>
                  <Button variant="outline" size="sm" className="mt-2 rounded-[7px]">
                    Choose File
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button className="bg-swipes-blue-deep hover:bg-swipes-blue-deep/90 text-white rounded-[7px]">
              Save Changes
            </Button>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          {/* Payments */}
          <div className="bg-white rounded-[7px] border border-gray-200 p-6 space-y-6">
            <h3 className="text-lg font-semibold text-swipes-black">Payments</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium text-swipes-black">Successful Payment</Label>
                  <p className="text-xs text-swipes-pro-gray mt-1">
                    Receive a notification when a payment is successfully processed.
                  </p>
                </div>
                <Switch checked={notifSuccessfulPayment} onCheckedChange={setNotifSuccessfulPayment} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium text-swipes-black">Failed Payment</Label>
                  <p className="text-xs text-swipes-pro-gray mt-1">
                    Get alerted when a payment attempt fails.
                  </p>
                </div>
                <Switch checked={notifFailedPayment} onCheckedChange={setNotifFailedPayment} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium text-swipes-black">Refund Processed</Label>
                  <p className="text-xs text-swipes-pro-gray mt-1">
                    Notification when a refund is issued to a customer.
                  </p>
                </div>
                <Switch checked={notifRefund} onCheckedChange={setNotifRefund} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium text-swipes-black">
                    Large Transaction Alert
                  </Label>
                  <p className="text-xs text-swipes-pro-gray mt-1">
                    Notify when a transaction exceeds the threshold below.
                  </p>
                  {notifLargeTransaction && (
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-swipes-pro-gray">Threshold: $</span>
                      <Input
                        value={largeTransactionThreshold}
                        onChange={(e) => setLargeTransactionThreshold(e.target.value)}
                        className="w-24 h-8 text-sm rounded-[7px]"
                      />
                    </div>
                  )}
                </div>
                <Switch checked={notifLargeTransaction} onCheckedChange={setNotifLargeTransaction} />
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="bg-white rounded-[7px] border border-gray-200 p-6 space-y-6">
            <h3 className="text-lg font-semibold text-swipes-black">Security</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium text-swipes-black">Login from New Device</Label>
                  <p className="text-xs text-swipes-pro-gray mt-1">
                    Alert when your account is accessed from an unrecognized device.
                  </p>
                </div>
                <Switch checked={notifNewDevice} onCheckedChange={setNotifNewDevice} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium text-swipes-black">API Key Usage</Label>
                  <p className="text-xs text-swipes-pro-gray mt-1">
                    Notify when API keys are created, modified, or used for the first time.
                  </p>
                </div>
                <Switch checked={notifApiKey} onCheckedChange={setNotifApiKey} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium text-swipes-black">Fraud Alert</Label>
                  <p className="text-xs text-swipes-pro-gray mt-1">
                    Immediate notification when a transaction is flagged as potential fraud.
                  </p>
                </div>
                <Switch checked={notifFraud} onCheckedChange={setNotifFraud} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium text-swipes-black">Failed Login Attempt</Label>
                  <p className="text-xs text-swipes-pro-gray mt-1">
                    Alert after multiple failed login attempts on your account.
                  </p>
                </div>
                <Switch checked={notifFailedLogin} onCheckedChange={setNotifFailedLogin} />
              </div>
            </div>
          </div>

          {/* Billing Notifications */}
          <div className="bg-white rounded-[7px] border border-gray-200 p-6 space-y-6">
            <h3 className="text-lg font-semibold text-swipes-black">Billing</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium text-swipes-black">Upcoming Invoice</Label>
                  <p className="text-xs text-swipes-pro-gray mt-1">
                    Reminder before your next billing date.
                  </p>
                </div>
                <Switch checked={notifUpcomingInvoice} onCheckedChange={setNotifUpcomingInvoice} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium text-swipes-black">
                    Payment Method Expiring
                  </Label>
                  <p className="text-xs text-swipes-pro-gray mt-1">
                    Alert when your payment method is about to expire.
                  </p>
                </div>
                <Switch checked={notifExpiring} onCheckedChange={setNotifExpiring} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium text-swipes-black">Plan Renewal</Label>
                  <p className="text-xs text-swipes-pro-gray mt-1">
                    Notification when your subscription renews.
                  </p>
                </div>
                <Switch checked={notifPlanRenewal} onCheckedChange={setNotifPlanRenewal} />
              </div>
            </div>
          </div>

          {/* Reports Notifications */}
          <div className="bg-white rounded-[7px] border border-gray-200 p-6 space-y-6">
            <h3 className="text-lg font-semibold text-swipes-black">Reports</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium text-swipes-black">Daily Summary</Label>
                  <p className="text-xs text-swipes-pro-gray mt-1">
                    End-of-day summary of transactions and revenue.
                  </p>
                </div>
                <Switch checked={notifDailySummary} onCheckedChange={setNotifDailySummary} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium text-swipes-black">Weekly Summary</Label>
                  <p className="text-xs text-swipes-pro-gray mt-1">
                    Weekly overview delivered every Monday morning.
                  </p>
                </div>
                <Switch checked={notifWeeklySummary} onCheckedChange={setNotifWeeklySummary} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium text-swipes-black">Monthly Report</Label>
                  <p className="text-xs text-swipes-pro-gray mt-1">
                    Comprehensive monthly analytics report.
                  </p>
                </div>
                <Switch checked={notifMonthlyReport} onCheckedChange={setNotifMonthlyReport} />
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Payment Settings Tab */}
        <TabsContent value="payment" className="space-y-6">
          <div className="bg-white rounded-[7px] border border-gray-200 p-6 space-y-6">
            <h3 className="text-lg font-semibold text-swipes-black">Payment Defaults</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-swipes-black">Default Currency</Label>
                <Select value={defaultCurrency} onValueChange={setDefaultCurrency}>
                  <SelectTrigger className="rounded-[7px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD — US Dollar</SelectItem>
                    <SelectItem value="eur">EUR — Euro</SelectItem>
                    <SelectItem value="gbp">GBP — British Pound</SelectItem>
                    <SelectItem value="cad">CAD — Canadian Dollar</SelectItem>
                    <SelectItem value="aud">AUD — Australian Dollar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-swipes-black">Capture Mode</Label>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-[7px]">
                  <div>
                    <p className="text-sm font-medium text-swipes-black">
                      {autoCapture ? "Auto-Capture" : "Auth-Only"}
                    </p>
                    <p className="text-xs text-swipes-pro-gray mt-0.5">
                      {autoCapture
                        ? "Payments are captured immediately"
                        : "Payments are authorized and captured manually"}
                    </p>
                  </div>
                  <Switch checked={autoCapture} onCheckedChange={setAutoCapture} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[7px] border border-gray-200 p-6 space-y-6">
            <h3 className="text-lg font-semibold text-swipes-black">Accepted Card Brands</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { label: "Visa", state: cardVisa, set: setCardVisa },
                { label: "Mastercard", state: cardMc, set: setCardMc },
                { label: "American Express", state: cardAmex, set: setCardAmex },
                { label: "Discover", state: cardDiscover, set: setCardDiscover },
                { label: "JCB", state: cardJcb, set: setCardJcb },
                { label: "Diners Club", state: cardDiners, set: setCardDiners },
              ].map((card) => (
                <div key={card.label} className="flex items-center gap-3 p-3 bg-gray-50 rounded-[7px]">
                  <Checkbox
                    checked={card.state}
                    onCheckedChange={(checked) => card.set(checked === true)}
                  />
                  <Label className="text-sm font-medium text-swipes-black cursor-pointer">
                    {card.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-[7px] border border-gray-200 p-6 space-y-6">
            <h3 className="text-lg font-semibold text-swipes-black">Verification Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-swipes-black">AVS (Address Verification)</Label>
                <Select value={avsSetting} onValueChange={setAvsSetting}>
                  <SelectTrigger className="rounded-[7px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="require">Require Match</SelectItem>
                    <SelectItem value="partial">Partial Match</SelectItem>
                    <SelectItem value="skip">Skip</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-swipes-black">CVV Verification</Label>
                <Select value={cvvSetting} onValueChange={setCvvSetting}>
                  <SelectTrigger className="rounded-[7px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="required">Required</SelectItem>
                    <SelectItem value="optional">Optional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[7px] border border-gray-200 p-6 space-y-6">
            <h3 className="text-lg font-semibold text-swipes-black">3D Secure</h3>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium text-swipes-black">Enable 3D Secure</Label>
                <p className="text-xs text-swipes-pro-gray mt-1">
                  Add an extra authentication step for online card payments.
                </p>
              </div>
              <Switch checked={threeDSecure} onCheckedChange={setThreeDSecure} />
            </div>
            {threeDSecure && (
              <div className="space-y-2">
                <Label className="text-sm font-medium text-swipes-black">
                  Minimum Transaction Amount
                </Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-swipes-pro-gray">$</span>
                  <Input
                    value={threeDThreshold}
                    onChange={(e) => setThreeDThreshold(e.target.value)}
                    className="w-32 rounded-[7px]"
                  />
                  <span className="text-xs text-swipes-pro-gray">
                    3D Secure applies to transactions above this amount
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-[7px] border border-gray-200 p-6 space-y-4">
              <h3 className="text-lg font-semibold text-swipes-black">Duplicate Detection</h3>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-swipes-black">
                  Duplicate Transaction Window
                </Label>
                <Select value={duplicateWindow} onValueChange={setDuplicateWindow}>
                  <SelectTrigger className="rounded-[7px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1min">1 Minute</SelectItem>
                    <SelectItem value="5min">5 Minutes</SelectItem>
                    <SelectItem value="15min">15 Minutes</SelectItem>
                    <SelectItem value="30min">30 Minutes</SelectItem>
                    <SelectItem value="1hour">1 Hour</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-swipes-pro-gray">
                  Block identical transactions within this time window.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-[7px] border border-gray-200 p-6 space-y-4">
              <h3 className="text-lg font-semibold text-swipes-black">Receipt Settings</h3>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium text-swipes-black">Auto-Send Receipts</Label>
                  <p className="text-xs text-swipes-pro-gray mt-1">
                    Automatically email receipts after each successful payment.
                  </p>
                </div>
                <Switch checked={autoReceipts} onCheckedChange={setAutoReceipts} />
              </div>
            </div>
          </div>

          {autoReceipts && (
            <div className="bg-white rounded-[7px] border border-gray-200 p-6 space-y-4">
              <h3 className="text-lg font-semibold text-swipes-black">Receipt Email Template</h3>
              <Textarea
                value={receiptTemplate}
                onChange={(e) => setReceiptTemplate(e.target.value)}
                rows={6}
                className="rounded-[7px] font-mono text-sm"
              />
              <p className="text-xs text-swipes-pro-gray">
                Available variables: {"{{amount}}"}, {"{{order_id}}"}, {"{{date}}"}, {"{{customer_name}}"}, {"{{customer_email}}"}
              </p>
            </div>
          )}

          <div className="flex justify-end">
            <Button className="bg-swipes-blue-deep hover:bg-swipes-blue-deep/90 text-white rounded-[7px]">
              Save Changes
            </Button>
          </div>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing" className="space-y-6">
          {/* Current Plan */}
          <div className="bg-white rounded-[7px] border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-swipes-black">Current Plan</h3>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-swipes-blue-deep">{tier} Plan</span>
                    <TierBadge tier={tier} size="sm" />
                    <Badge className="bg-swipes-trusted-green text-white">Active</Badge>
                  </div>
                  <p className="text-sm text-swipes-pro-gray">$49.00/month — Billed monthly</p>
                  <p className="text-sm text-swipes-pro-gray">Next billing date: November 1, 2025</p>
                </div>
              </div>
              <Button className="bg-swipes-blue-deep hover:bg-swipes-blue-deep/90 text-white rounded-[7px]">
                Upgrade Plan
              </Button>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-[7px] border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-swipes-black mb-4">Payment Method on File</h3>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-[7px]">
              <div className="flex items-center gap-3">
                <CreditCard className="h-6 w-6 text-swipes-blue-deep" />
                <div>
                  <p className="text-sm font-medium text-swipes-black">Visa ending in 4242</p>
                  <p className="text-xs text-swipes-pro-gray">Expires 12/2026</p>
                </div>
              </div>
              <Button variant="outline" className="rounded-[7px]">
                Update
              </Button>
            </div>
          </div>

          {/* Billing History */}
          <div className="bg-white rounded-[7px] border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-swipes-black">Billing History</h3>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Invoice</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {billingHistory.map((entry) => (
                  <TableRow key={entry.invoice}>
                    <TableCell className="text-swipes-pro-gray">{entry.date}</TableCell>
                    <TableCell className="font-medium text-swipes-black">
                      {entry.description}
                    </TableCell>
                    <TableCell className="text-swipes-black">{entry.amount}</TableCell>
                    <TableCell>
                      <Badge className="bg-swipes-trusted-green text-white">{entry.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline" className="rounded-[7px]">
                        <Receipt className="h-4 w-4 mr-1" />
                        {entry.invoice}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* API Tab */}
        <TabsContent value="api" className="space-y-6">
          <div className="bg-white rounded-[7px] border border-gray-200 p-6 space-y-6">
            <h3 className="text-lg font-semibold text-swipes-black">API Configuration</h3>

            {/* Environment Toggle */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-[7px]">
              <div className="flex items-center gap-3">
                <div
                  className={`w-3 h-3 rounded-full ${testMode ? "bg-swipes-gold" : "bg-swipes-trusted-green"}`}
                />
                <div>
                  <p className="text-sm font-medium text-swipes-black">
                    {testMode ? "Test Mode" : "Live Mode"}
                  </p>
                  <p className="text-xs text-swipes-pro-gray">
                    {testMode
                      ? "Transactions are simulated — no real charges"
                      : "All transactions are processed with real payment methods"}
                  </p>
                </div>
              </div>
              <Switch checked={testMode} onCheckedChange={setTestMode} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-swipes-black">API Version</Label>
                <div className="p-3 bg-gray-50 rounded-[7px]">
                  <code className="text-sm text-swipes-black font-mono">v1</code>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-swipes-black">Base URL</Label>
                <div className="p-3 bg-gray-50 rounded-[7px] flex items-center justify-between">
                  <code className="text-sm text-swipes-black font-mono">
                    https://api.swipesblue.com/v1
                  </code>
                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                    <Copy className="h-4 w-4 text-swipes-pro-gray" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[7px] border border-gray-200 p-6 space-y-4">
            <h3 className="text-lg font-semibold text-swipes-black">Webhook URL</h3>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-swipes-black">Endpoint URL</Label>
              <Input
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                className="rounded-[7px] font-mono text-sm"
              />
              <p className="text-xs text-swipes-pro-gray">
                We'll send POST requests to this URL when events occur.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-[7px] border border-gray-200 p-6 space-y-4">
            <h3 className="text-lg font-semibold text-swipes-black">Rate Limits</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-[7px]">
                <p className="text-sm text-swipes-pro-gray">Requests per Minute</p>
                <p className="text-2xl font-bold text-swipes-blue-deep mt-1">100</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-[7px]">
                <p className="text-sm text-swipes-pro-gray">Requests per Day</p>
                <p className="text-2xl font-bold text-swipes-blue-deep mt-1">50,000</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[7px] border border-gray-200 p-6 space-y-4">
            <h3 className="text-lg font-semibold text-swipes-black">Quick Reference</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-swipes-pro-gray">Authentication</span>
                <code className="text-sm text-swipes-black font-mono">Bearer Token (API Key)</code>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-swipes-pro-gray">Content Type</span>
                <code className="text-sm text-swipes-black font-mono">application/json</code>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-swipes-pro-gray">Developer Docs</span>
                <a
                  href="/developers"
                  className="text-sm text-swipes-blue-deep hover:underline flex items-center gap-1"
                >
                  View Documentation
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
