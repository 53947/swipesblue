import { useState } from "react";
import { useLocation } from "wouter";
import {
  Link as LinkIcon,
  Plus,
  Copy,
  Edit,
  XCircle,
  Eye,
  DollarSign,
  TrendingUp,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MetricCard from "@/components/MetricCard";
import SubNavTabs from "@/components/dashboard/SubNavTabs";
import { useToast } from "@/hooks/use-toast";

const tabs = [
  { label: "All Links", href: "/dashboard/payment-links" },
  { label: "Active", href: "/dashboard/payment-links?tab=active" },
  { label: "Expired", href: "/dashboard/payment-links?tab=expired" },
  { label: "Disabled", href: "/dashboard/payment-links?tab=disabled" },
];

interface PaymentLink {
  id: string;
  name: string;
  amount: string;
  type: "one-time" | "recurring";
  views: number;
  conversions: number;
  status: "active" | "expired" | "disabled";
  created: string;
  url: string;
}

const mockPaymentLinks: PaymentLink[] = [
  {
    id: "PL-001",
    name: "Premium Subscription",
    amount: "$49.99/mo",
    type: "recurring",
    views: 342,
    conversions: 218,
    status: "active",
    created: "2025-10-15",
    url: "https://pay.swipesblue.com/link/premium-sub",
  },
  {
    id: "PL-002",
    name: "One-Time Setup Fee",
    amount: "$199.00",
    type: "one-time",
    views: 156,
    conversions: 112,
    status: "active",
    created: "2025-10-12",
    url: "https://pay.swipesblue.com/link/setup-fee",
  },
  {
    id: "PL-003",
    name: "Consulting Hour",
    amount: "$150.00",
    type: "one-time",
    views: 89,
    conversions: 64,
    status: "active",
    created: "2025-10-08",
    url: "https://pay.swipesblue.com/link/consulting",
  },
  {
    id: "PL-004",
    name: "Annual License",
    amount: "$499.00/yr",
    type: "recurring",
    views: 210,
    conversions: 143,
    status: "active",
    created: "2025-09-28",
    url: "https://pay.swipesblue.com/link/annual-license",
  },
  {
    id: "PL-005",
    name: "Early Bird Discount",
    amount: "$29.99",
    type: "one-time",
    views: 425,
    conversions: 301,
    status: "expired",
    created: "2025-09-15",
    url: "https://pay.swipesblue.com/link/early-bird",
  },
  {
    id: "PL-006",
    name: "Basic Plan",
    amount: "$19.99/mo",
    type: "recurring",
    views: 178,
    conversions: 95,
    status: "disabled",
    created: "2025-09-10",
    url: "https://pay.swipesblue.com/link/basic-plan",
  },
  {
    id: "PL-007",
    name: "Workshop Registration",
    amount: "$75.00",
    type: "one-time",
    views: 67,
    conversions: 48,
    status: "active",
    created: "2025-10-20",
    url: "https://pay.swipesblue.com/link/workshop",
  },
  {
    id: "PL-008",
    name: "Enterprise Tier",
    amount: "$999.00/mo",
    type: "recurring",
    views: 54,
    conversions: 12,
    status: "active",
    created: "2025-10-22",
    url: "https://pay.swipesblue.com/link/enterprise",
  },
];

const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  expired: "bg-gray-100 text-gray-600",
  disabled: "bg-red-100 text-red-600",
};

const typeColors: Record<string, string> = {
  "one-time": "bg-blue-100 text-blue-700",
  recurring: "bg-purple-100 text-purple-700",
};

export default function PaymentLinks() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [location] = useLocation();
  const { toast } = useToast();
  const [showCreate, setShowCreate] = useState(false);
  const [editLink, setEditLink] = useState<PaymentLink | null>(null);
  const [formName, setFormName] = useState("");
  const [formAmount, setFormAmount] = useState("");
  const urlParams = new URLSearchParams(location.split("?")[1] || "");
  const activeTab = urlParams.get("tab") || "all";

  const handleCopyLink = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  let filteredLinks = mockPaymentLinks;
  if (activeTab !== "all") {
    filteredLinks = mockPaymentLinks.filter((l) => l.status === activeTab);
  }

  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payment Links</h1>
          <p className="text-gray-500 mt-1">Create and manage shareable payment URLs</p>
        </div>
        <Button className="bg-[#1844A6] hover:bg-[#1844A6]/90 text-white rounded-[7px]" onClick={() => { setFormName(""); setFormAmount(""); setShowCreate(true); }}>
          <Plus className="h-4 w-4 mr-2" />
          Create Payment Link
        </Button>
      </div>

      <SubNavTabs tabs={tabs} />

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Active Links"
          value="24"
          change="+3 this week"
          changeType="positive"
          icon={LinkIcon}
        />
        <MetricCard
          title="Total Collected"
          value="$15,830"
          change="+12.4% from last month"
          changeType="positive"
          icon={DollarSign}
        />
        <MetricCard
          title="Conversion Rate"
          value="68.5%"
          change="+4.2% from last month"
          changeType="positive"
          icon={TrendingUp}
        />
        <MetricCard
          title="Average Link Value"
          value="$245"
          change="-2.1% from last month"
          changeType="negative"
          icon={Eye}
        />
      </div>

      {/* Payment Links Table */}
      {filteredLinks.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-[7px] p-12 text-center">
          <LinkIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No payment links found</h3>
          <p className="text-gray-500 text-sm">No links match this filter.</p>
        </div>
      ) : (
        <div className="bg-white rounded-[7px] border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F6F9FC] border-b border-gray-200">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Link Name</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Amount</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Type</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Views</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Conversions</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Created</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLinks.map((link) => (
                <tr key={link.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <LinkIcon className="h-4 w-4 text-[#1844A6]" />
                      <span className="text-sm font-medium text-gray-900">{link.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{link.amount}</td>
                  <td className="px-4 py-3">
                    <Badge className={`text-xs rounded-full ${typeColors[link.type]}`}>
                      {link.type === "one-time" ? "One-time" : "Recurring"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{link.views.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{link.conversions.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <Badge className={`text-xs rounded-full ${statusColors[link.status]}`}>
                      {link.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{link.created}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 text-xs"
                        onClick={() => handleCopyLink(link.id, link.url)}
                      >
                        {copiedId === link.id ? (
                          <>
                            <CheckCircle className="h-3 w-3 mr-1 text-green-600" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3 mr-1 text-gray-500" />
                            Copy
                          </>
                        )}
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Edit" onClick={() => { setFormName(link.name); setFormAmount(link.amount); setEditLink(link); }}>
                        <Edit className="h-4 w-4 text-gray-500" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4 text-center">
        <span className="text-xs text-gray-400">{filteredLinks.length} payment links</span>
      </div>

      {/* Create Payment Link Modal */}
      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create Payment Link</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-900">Link Name</Label>
              <Input value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="e.g. Premium Subscription" className="rounded-[7px]" />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-900">Amount</Label>
              <Input value={formAmount} onChange={(e) => setFormAmount(e.target.value)} placeholder="$0.00" className="rounded-[7px]" />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" className="rounded-[7px]" onClick={() => setShowCreate(false)}>Cancel</Button>
              <Button className="bg-[#1844A6] hover:bg-[#1844A6]/90 text-white rounded-[7px]" onClick={() => { toast({ title: "Payment link created", description: `"${formName}" has been created.` }); setShowCreate(false); }}>Create Link</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Payment Link Modal */}
      <Dialog open={!!editLink} onOpenChange={(open) => !open && setEditLink(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Payment Link</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-900">Link Name</Label>
              <Input value={formName} onChange={(e) => setFormName(e.target.value)} className="rounded-[7px]" />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-900">Amount</Label>
              <Input value={formAmount} onChange={(e) => setFormAmount(e.target.value)} className="rounded-[7px]" />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" className="rounded-[7px]" onClick={() => setEditLink(null)}>Cancel</Button>
              <Button className="bg-[#1844A6] hover:bg-[#1844A6]/90 text-white rounded-[7px]" onClick={() => { toast({ title: "Payment link updated", description: `"${formName}" has been updated.` }); setEditLink(null); }}>Save Changes</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
