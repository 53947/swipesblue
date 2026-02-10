import { useState } from "react";
import { useLocation } from "wouter";
import {
  Shield,
  Lock,
  Key,
  Users,
  ClipboardList,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Plus,
  Trash2,
  Edit,
  Download,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MetricCard from "@/components/MetricCard";
import SubNavTabs from "@/components/dashboard/SubNavTabs";

const basePath = "/dashboard/enhance/security-suite";

const tabs = [
  { label: "Encryption", href: basePath },
  { label: "Access Control", href: `${basePath}?tab=access-control` },
  { label: "Audit Log", href: `${basePath}?tab=audit-log` },
  { label: "Compliance", href: `${basePath}?tab=compliance` },
];

interface EncryptionFeature {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  icon: typeof Shield;
}

interface AccessUser {
  id: string;
  name: string;
  email: string;
  role: "Owner" | "Admin" | "Analyst" | "Read-only";
  lastLogin: string;
  status: "Active" | "Inactive" | "Pending";
  twoFactor: boolean;
}

interface AuditEntry {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  ipAddress: string;
  status: "Success" | "Failed";
}

interface ComplianceItem {
  id: string;
  requirement: string;
  status: "passed" | "warning";
}

const initialEncryptionFeatures: EncryptionFeature[] = [
  {
    id: "tokenization",
    name: "Tokenization",
    description:
      "Replace sensitive card data with non-sensitive tokens for secure storage and processing.",
    enabled: true,
    icon: Key,
  },
  {
    id: "p2pe",
    name: "Point-to-Point Encryption (P2PE)",
    description:
      "Encrypt card data from the point of interaction to the secure decryption environment.",
    enabled: true,
    icon: Lock,
  },
  {
    id: "aes256",
    name: "Data-at-Rest Encryption (AES-256)",
    description:
      "Encrypt all stored cardholder data using industry-standard AES-256 encryption.",
    enabled: true,
    icon: Shield,
  },
];

const accessUsers: AccessUser[] = [
  {
    id: "usr-1",
    name: "Dean Lewis",
    email: "dean@swipesblue.com",
    role: "Owner",
    lastLogin: "2025-10-24 09:15 AM",
    status: "Active",
    twoFactor: true,
  },
  {
    id: "usr-2",
    name: "Sarah Mitchell",
    email: "sarah@swipesblue.com",
    role: "Admin",
    lastLogin: "2025-10-24 08:42 AM",
    status: "Active",
    twoFactor: true,
  },
  {
    id: "usr-3",
    name: "James Torres",
    email: "james@swipesblue.com",
    role: "Analyst",
    lastLogin: "2025-10-23 04:30 PM",
    status: "Active",
    twoFactor: false,
  },
  {
    id: "usr-4",
    name: "Emily Park",
    email: "emily@swipesblue.com",
    role: "Read-only",
    lastLogin: "2025-10-22 11:00 AM",
    status: "Active",
    twoFactor: false,
  },
  {
    id: "usr-5",
    name: "Michael Chen",
    email: "michael@swipesblue.com",
    role: "Analyst",
    lastLogin: "—",
    status: "Pending",
    twoFactor: false,
  },
];

const ipWhitelist = [
  "192.168.1.100",
  "10.0.0.50",
  "203.0.113.42",
  "198.51.100.7",
];

const auditEntries: AuditEntry[] = [
  { id: "aud-01", timestamp: "2025-10-24 09:15:32", user: "Dean Lewis", action: "Login", resource: "Dashboard", ipAddress: "192.168.1.100", status: "Success" },
  { id: "aud-02", timestamp: "2025-10-24 09:12:05", user: "Sarah Mitchell", action: "API key created", resource: "API Keys", ipAddress: "10.0.0.50", status: "Success" },
  { id: "aud-03", timestamp: "2025-10-24 08:58:41", user: "Dean Lewis", action: "Settings changed", resource: "Encryption Settings", ipAddress: "192.168.1.100", status: "Success" },
  { id: "aud-04", timestamp: "2025-10-24 08:42:17", user: "Sarah Mitchell", action: "Login", resource: "Dashboard", ipAddress: "10.0.0.50", status: "Success" },
  { id: "aud-05", timestamp: "2025-10-24 08:30:00", user: "System", action: "Payment processed", resource: "Transaction #TXN-8834", ipAddress: "—", status: "Success" },
  { id: "aud-06", timestamp: "2025-10-24 07:55:22", user: "System", action: "Payment processed", resource: "Transaction #TXN-8833", ipAddress: "—", status: "Success" },
  { id: "aud-07", timestamp: "2025-10-23 16:30:09", user: "James Torres", action: "Login", resource: "Dashboard", ipAddress: "203.0.113.42", status: "Success" },
  { id: "aud-08", timestamp: "2025-10-23 16:28:44", user: "Unknown", action: "Login", resource: "Dashboard", ipAddress: "45.33.22.11", status: "Failed" },
  { id: "aud-09", timestamp: "2025-10-23 15:10:33", user: "Dean Lewis", action: "User invited", resource: "Michael Chen", ipAddress: "192.168.1.100", status: "Success" },
  { id: "aud-10", timestamp: "2025-10-23 14:45:18", user: "Sarah Mitchell", action: "Settings changed", resource: "Notification Preferences", ipAddress: "10.0.0.50", status: "Success" },
  { id: "aud-11", timestamp: "2025-10-23 13:22:07", user: "System", action: "Payment processed", resource: "Transaction #TXN-8832", ipAddress: "—", status: "Success" },
  { id: "aud-12", timestamp: "2025-10-23 12:05:55", user: "System", action: "Payment processed", resource: "Transaction #TXN-8831", ipAddress: "—", status: "Failed" },
  { id: "aud-13", timestamp: "2025-10-23 11:00:41", user: "Emily Park", action: "Login", resource: "Dashboard", ipAddress: "198.51.100.7", status: "Success" },
  { id: "aud-14", timestamp: "2025-10-22 17:30:12", user: "Dean Lewis", action: "Settings changed", resource: "Payment Settings", ipAddress: "192.168.1.100", status: "Success" },
  { id: "aud-15", timestamp: "2025-10-22 16:15:08", user: "Sarah Mitchell", action: "API key created", resource: "API Keys", ipAddress: "10.0.0.50", status: "Success" },
  { id: "aud-16", timestamp: "2025-10-22 14:50:33", user: "Unknown", action: "Login", resource: "Dashboard", ipAddress: "91.198.44.12", status: "Failed" },
  { id: "aud-17", timestamp: "2025-10-22 13:20:19", user: "James Torres", action: "Login", resource: "Dashboard", ipAddress: "203.0.113.42", status: "Success" },
  { id: "aud-18", timestamp: "2025-10-22 10:05:44", user: "Dean Lewis", action: "Login", resource: "Dashboard", ipAddress: "192.168.1.100", status: "Success" },
];

const complianceItems: ComplianceItem[] = [
  { id: "pci-1", requirement: "Install and maintain a firewall configuration", status: "passed" },
  { id: "pci-2", requirement: "Do not use vendor-supplied defaults for passwords", status: "passed" },
  { id: "pci-3", requirement: "Protect stored cardholder data", status: "passed" },
  { id: "pci-4", requirement: "Encrypt transmission of cardholder data", status: "passed" },
  { id: "pci-5", requirement: "Use and regularly update anti-virus software", status: "passed" },
  { id: "pci-6", requirement: "Develop and maintain secure systems and applications", status: "passed" },
  { id: "pci-7", requirement: "Restrict access to cardholder data by business need-to-know", status: "warning" },
  { id: "pci-8", requirement: "Assign a unique ID to each person with computer access", status: "passed" },
  { id: "pci-9", requirement: "Restrict physical access to cardholder data", status: "passed" },
  { id: "pci-10", requirement: "Track and monitor all access to network resources", status: "passed" },
  { id: "pci-11", requirement: "Regularly test security systems and processes", status: "warning" },
  { id: "pci-12", requirement: "Maintain a policy that addresses information security", status: "passed" },
];

function getRoleClasses(role: AccessUser["role"]): string {
  switch (role) {
    case "Owner":
      return "bg-[#1844A6] text-white";
    case "Admin":
      return "bg-yellow-500 text-white";
    case "Analyst":
      return "bg-green-600 text-white";
    case "Read-only":
      return "bg-gray-400 text-white";
  }
}

function getStatusClasses(status: AccessUser["status"]): string {
  switch (status) {
    case "Active":
      return "bg-green-600 text-white";
    case "Inactive":
      return "bg-red-600 text-white";
    case "Pending":
      return "bg-yellow-500 text-white";
  }
}

export default function SecurityDashboard() {
  const [encryptionFeatures, setEncryptionFeatures] = useState(initialEncryptionFeatures);
  const [tlsVersion, setTlsVersion] = useState("1.3");
  const [auditFilter, setAuditFilter] = useState("all");
  const [auditSearch, setAuditSearch] = useState("");
  const [location] = useLocation();
  const urlParams = new URLSearchParams(location.split("?")[1] || "");
  const activeTab = urlParams.get("tab") || "encryption";

  const toggleEncryption = (featureId: string) => {
    setEncryptionFeatures((prev) =>
      prev.map((f) => (f.id === featureId ? { ...f, enabled: !f.enabled } : f))
    );
  };

  const passedCount = complianceItems.filter((i) => i.status === "passed").length;
  const compliancePercent = Math.round((passedCount / complianceItems.length) * 100);

  const filteredAudit = auditEntries.filter((entry) => {
    const matchesFilter =
      auditFilter === "all" ||
      (auditFilter === "success" && entry.status === "Success") ||
      (auditFilter === "failed" && entry.status === "Failed");
    const matchesSearch =
      auditSearch === "" ||
      entry.user.toLowerCase().includes(auditSearch.toLowerCase()) ||
      entry.action.toLowerCase().includes(auditSearch.toLowerCase()) ||
      entry.resource.toLowerCase().includes(auditSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div>
      <p className="text-gray-500 mb-6">
        PCI compliance monitoring, encryption settings, access control, and security audit log
      </p>

      {/* Compliance Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="PCI DSS Status"
          value="Compliant"
          change="Last assessed Oct 15, 2025"
          changeType="positive"
          icon={Shield}
        />
        <MetricCard
          title="SSL/TLS"
          value="TLS 1.3"
          change="Active — All endpoints secured"
          changeType="positive"
          icon={Lock}
        />
        <MetricCard
          title="Last Security Scan"
          value="Oct 20"
          change="Passed — 0 critical issues"
          changeType="positive"
          icon={CheckCircle}
        />
        <MetricCard
          title="Vulnerabilities"
          value="2 Low"
          change="0 Critical, 0 High, 2 Low"
          changeType="neutral"
          icon={AlertTriangle}
        />
      </div>

      <SubNavTabs tabs={tabs} />

      {/* Encryption Tab */}
      {activeTab === "encryption" && (
        <div className="space-y-4">
          {encryptionFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="bg-white rounded-[7px] border border-gray-200 p-6 flex items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-[7px] bg-[#1844A6]/10 flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-[#1844A6]" />
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
                  onCheckedChange={() => toggleEncryption(feature.id)}
                />
              </div>
            );
          })}

          {/* TLS Version Selector */}
          <div className="bg-white rounded-[7px] border border-gray-200 p-6 flex items-center justify-between gap-4">
            <div className="flex items-start gap-4 flex-1 min-w-0">
              <div className="w-10 h-10 rounded-[7px] bg-[#1844A6]/10 flex items-center justify-center shrink-0">
                <Lock className="h-5 w-5 text-[#1844A6]" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-gray-900 mb-1">
                  TLS Version
                </h3>
                <p className="text-sm text-gray-500">
                  Select the minimum TLS version for all API and payment connections.
                </p>
              </div>
            </div>
            <Select value={tlsVersion} onValueChange={setTlsVersion}>
              <SelectTrigger className="w-[120px] rounded-[7px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1.2">TLS 1.2</SelectItem>
                <SelectItem value="1.3">TLS 1.3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Access Control Tab */}
      {activeTab === "access-control" && (
        <div className="space-y-6">
          {/* User Table */}
          <div className="bg-white rounded-[7px] border border-gray-200">
            <div className="p-4 flex items-center justify-between border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Users & Roles</h3>
              <Button className="bg-[#1844A6] hover:bg-[#1844A6]/90 text-white rounded-[7px]">
                <Plus className="h-4 w-4 mr-2" />
                Invite User
              </Button>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-[#F6F9FC] border-b border-gray-200">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Name</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Email</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Role</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Last Login</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">2FA</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {accessUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{user.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{user.email}</td>
                    <td className="px-4 py-3">
                      <Badge className={`rounded-full ${getRoleClasses(user.role)}`}>{user.role}</Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">{user.lastLogin}</td>
                    <td className="px-4 py-3">
                      {user.twoFactor ? (
                        <Badge className="rounded-full bg-green-600 text-white">Enabled</Badge>
                      ) : (
                        <Badge className="rounded-full bg-gray-400 text-white">Disabled</Badge>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <Badge className={`rounded-full ${getStatusClasses(user.status)}`}>{user.status}</Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button size="sm" variant="outline" className="rounded-[7px]">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          className="bg-red-600 hover:bg-red-600/90 text-white rounded-[7px]"
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* IP Whitelist */}
          <div className="bg-white rounded-[7px] border border-gray-200 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">IP Whitelist</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Only allow access from these IP addresses.
                </p>
              </div>
              <Button variant="outline" className="rounded-[7px]">
                <Plus className="h-4 w-4 mr-2" />
                Add IP
              </Button>
            </div>
            <div className="space-y-2">
              {ipWhitelist.map((ip) => (
                <div
                  key={ip}
                  className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-[7px]"
                >
                  <code className="text-sm text-gray-900 font-mono">{ip}</code>
                  <Button size="sm" variant="ghost" className="text-red-600 h-8 w-8 p-0">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Audit Log Tab */}
      {activeTab === "audit-log" && (
        <div className="space-y-4">
          <div className="bg-white rounded-[7px] border border-gray-200">
            <div className="p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 border-b border-gray-200">
              <div className="relative flex-1 w-full sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search logs..."
                  value={auditSearch}
                  onChange={(e) => setAuditSearch(e.target.value)}
                  className="pl-9 rounded-[7px]"
                />
              </div>
              <Select value={auditFilter} onValueChange={setAuditFilter}>
                <SelectTrigger className="w-[150px] rounded-[7px]">
                  <SelectValue placeholder="Filter status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-[#F6F9FC] border-b border-gray-200">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Timestamp</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">User</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Action</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Resource</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">IP Address</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredAudit.map((entry) => (
                  <tr key={entry.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-500 font-mono">
                      {entry.timestamp}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{entry.user}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{entry.action}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{entry.resource}</td>
                    <td className="px-4 py-3 text-sm text-gray-500 font-mono">
                      {entry.ipAddress}
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        className={`rounded-full ${
                          entry.status === "Success"
                            ? "bg-green-600 text-white"
                            : "bg-red-600 text-white"
                        }`}
                      >
                        {entry.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Compliance Tab */}
      {activeTab === "compliance" && (
        <div className="space-y-6">
          <div className="bg-white rounded-[7px] border border-gray-200 p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  PCI DSS Compliance Checklist
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {passedCount} of {complianceItems.length} requirements met — {compliancePercent}%
                  compliant
                </p>
              </div>
              <Button className="bg-[#1844A6] hover:bg-[#1844A6]/90 text-white rounded-[7px]">
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </Button>
            </div>

            <Progress value={compliancePercent} className="h-3" />

            <div className="space-y-3">
              {complianceItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 py-2 px-3 rounded-[7px] bg-gray-50"
                >
                  <div className="mt-0.5">
                    {item.status === "passed" ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{item.requirement}</p>
                  </div>
                  <Badge
                    className={`rounded-full ${
                      item.status === "passed"
                        ? "bg-green-600 text-white"
                        : "bg-yellow-500 text-white"
                    }`}
                  >
                    {item.status === "passed" ? "Passed" : "Action Required"}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
