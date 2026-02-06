import { useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import MetricCard from "@/components/MetricCard";

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
      return "bg-swipes-blue-deep text-white";
    case "Admin":
      return "bg-swipes-gold text-white";
    case "Analyst":
      return "bg-swipes-trusted-green text-white";
    case "Read-only":
      return "bg-gray-400 text-white";
  }
}

function getStatusClasses(status: AccessUser["status"]): string {
  switch (status) {
    case "Active":
      return "bg-swipes-trusted-green text-white";
    case "Inactive":
      return "bg-swipes-muted-red text-white";
    case "Pending":
      return "bg-swipes-gold text-white";
  }
}

export default function SecurityDashboard() {
  const [encryptionFeatures, setEncryptionFeatures] = useState(initialEncryptionFeatures);
  const [tlsVersion, setTlsVersion] = useState("1.3");
  const [auditFilter, setAuditFilter] = useState("all");
  const [auditSearch, setAuditSearch] = useState("");

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
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2 text-swipes-black">Security</h1>
        <p className="text-swipes-pro-gray">
          PCI compliance monitoring, encryption settings, access control, and security audit log
        </p>
      </div>

      {/* Compliance Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* Tabs */}
      <Tabs defaultValue="encryption" className="space-y-6">
        <TabsList>
          <TabsTrigger value="encryption">Encryption</TabsTrigger>
          <TabsTrigger value="access-control">Access Control</TabsTrigger>
          <TabsTrigger value="audit-log">Audit Log</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        {/* Encryption Tab */}
        <TabsContent value="encryption" className="space-y-4">
          {encryptionFeatures.map((feature) => {
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
                  onCheckedChange={() => toggleEncryption(feature.id)}
                />
              </div>
            );
          })}

          {/* TLS Version Selector */}
          <div className="bg-white rounded-[7px] border border-gray-200 p-6 flex items-center justify-between gap-4">
            <div className="flex items-start gap-4 flex-1 min-w-0">
              <div className="w-10 h-10 rounded-[7px] bg-swipes-blue-deep/10 flex items-center justify-center shrink-0">
                <Lock className="h-5 w-5 text-swipes-blue-deep" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-swipes-black mb-1">
                  TLS Version
                </h3>
                <p className="text-sm text-swipes-pro-gray">
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
        </TabsContent>

        {/* Access Control Tab */}
        <TabsContent value="access-control" className="space-y-6">
          {/* User Table */}
          <div className="bg-white rounded-[7px] border border-gray-200">
            <div className="p-4 flex items-center justify-between border-b border-gray-200">
              <h3 className="text-lg font-semibold text-swipes-black">Users & Roles</h3>
              <Button className="bg-swipes-blue-deep hover:bg-swipes-blue-deep/90 text-white rounded-[7px]">
                <Plus className="h-4 w-4 mr-2" />
                Invite User
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>2FA</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {accessUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium text-swipes-black">{user.name}</TableCell>
                    <TableCell className="text-swipes-pro-gray">{user.email}</TableCell>
                    <TableCell>
                      <Badge className={getRoleClasses(user.role)}>{user.role}</Badge>
                    </TableCell>
                    <TableCell className="text-swipes-pro-gray">{user.lastLogin}</TableCell>
                    <TableCell>
                      {user.twoFactor ? (
                        <Badge className="bg-swipes-trusted-green text-white">Enabled</Badge>
                      ) : (
                        <Badge className="bg-gray-400 text-white">Disabled</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusClasses(user.status)}>{user.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button size="sm" variant="outline" className="rounded-[7px]">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          className="bg-swipes-muted-red hover:bg-swipes-muted-red/90 text-white rounded-[7px]"
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* IP Whitelist */}
          <div className="bg-white rounded-[7px] border border-gray-200 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-swipes-black">IP Whitelist</h3>
                <p className="text-sm text-swipes-pro-gray mt-1">
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
                  <code className="text-sm text-swipes-black font-mono">{ip}</code>
                  <Button size="sm" variant="ghost" className="text-swipes-muted-red h-8 w-8 p-0">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Audit Log Tab */}
        <TabsContent value="audit-log" className="space-y-4">
          <div className="bg-white rounded-[7px] border border-gray-200">
            <div className="p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 border-b border-gray-200">
              <div className="relative flex-1 w-full sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-swipes-pro-gray" />
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Resource</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAudit.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell className="text-swipes-pro-gray text-sm font-mono">
                      {entry.timestamp}
                    </TableCell>
                    <TableCell className="font-medium text-swipes-black">{entry.user}</TableCell>
                    <TableCell className="text-swipes-black">{entry.action}</TableCell>
                    <TableCell className="text-swipes-pro-gray">{entry.resource}</TableCell>
                    <TableCell className="text-swipes-pro-gray font-mono text-sm">
                      {entry.ipAddress}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          entry.status === "Success"
                            ? "bg-swipes-trusted-green text-white"
                            : "bg-swipes-muted-red text-white"
                        }
                      >
                        {entry.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Compliance Tab */}
        <TabsContent value="compliance" className="space-y-6">
          <div className="bg-white rounded-[7px] border border-gray-200 p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-swipes-black">
                  PCI DSS Compliance Checklist
                </h3>
                <p className="text-sm text-swipes-pro-gray mt-1">
                  {passedCount} of {complianceItems.length} requirements met — {compliancePercent}%
                  compliant
                </p>
              </div>
              <Button className="bg-swipes-blue-deep hover:bg-swipes-blue-deep/90 text-white rounded-[7px]">
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
                      <CheckCircle className="h-5 w-5 text-swipes-trusted-green" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-swipes-gold" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-swipes-black">{item.requirement}</p>
                  </div>
                  <Badge
                    className={
                      item.status === "passed"
                        ? "bg-swipes-trusted-green text-white"
                        : "bg-swipes-gold text-white"
                    }
                  >
                    {item.status === "passed" ? "Passed" : "Action Required"}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
