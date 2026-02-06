import { useState } from "react";
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
import MetricCard from "@/components/MetricCard";

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

export default function PaymentLinks() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyLink = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const statusBadge = (status: PaymentLink["status"]) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-swipes-trusted-green text-white hover:bg-swipes-trusted-green">
            Active
          </Badge>
        );
      case "expired":
        return (
          <Badge className="bg-gray-100 text-gray-600 hover:bg-gray-100">
            Expired
          </Badge>
        );
      case "disabled":
        return (
          <Badge className="bg-swipes-muted-red text-white hover:bg-swipes-muted-red">
            Disabled
          </Badge>
        );
    }
  };

  const typeBadge = (type: PaymentLink["type"]) => {
    switch (type) {
      case "one-time":
        return (
          <Badge className="bg-swipes-blue-deep text-white hover:bg-swipes-blue-deep">
            One-time
          </Badge>
        );
      case "recurring":
        return (
          <Badge className="bg-swipes-teal text-white hover:bg-swipes-teal">
            Recurring
          </Badge>
        );
    }
  };

  return (
    <div className="p-8 space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold mb-2 text-swipes-black">
          Payment Links
        </h1>
        <p className="text-swipes-pro-gray">
          Create and manage shareable payment URLs for one-time or recurring
          payments
        </p>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* Header Row with Create Button */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-swipes-black">
          All Payment Links
        </h2>
        <Button className="bg-swipes-blue-deep hover:bg-swipes-blue-deep/90 text-white rounded-[7px]">
          <Plus className="h-4 w-4 mr-2" />
          Create Payment Link
        </Button>
      </div>

      {/* Payment Links Table */}
      <div className="bg-white rounded-[7px] border border-gray-200 p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-swipes-pro-gray">
                  Link Name
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-swipes-pro-gray">
                  Amount
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-swipes-pro-gray">
                  Type
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-swipes-pro-gray">
                  Views
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-swipes-pro-gray">
                  Conversions
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-swipes-pro-gray">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-swipes-pro-gray">
                  Created
                </th>
                <th className="text-right py-3 px-4 text-sm font-medium text-swipes-pro-gray">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {mockPaymentLinks.map((link) => (
                <tr
                  key={link.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <LinkIcon className="h-4 w-4 text-swipes-blue-deep" />
                      <span className="text-sm font-medium text-swipes-black">
                        {link.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-swipes-black font-medium">
                    {link.amount}
                  </td>
                  <td className="py-4 px-4">{typeBadge(link.type)}</td>
                  <td className="py-4 px-4 text-sm text-swipes-pro-gray">
                    {link.views.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-sm text-swipes-pro-gray">
                    {link.conversions.toLocaleString()}
                  </td>
                  <td className="py-4 px-4">{statusBadge(link.status)}</td>
                  <td className="py-4 px-4 text-sm text-swipes-pro-gray">
                    {link.created}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-[7px] text-xs"
                        onClick={() => handleCopyLink(link.id, link.url)}
                      >
                        {copiedId === link.id ? (
                          <>
                            <CheckCircle className="h-3 w-3 mr-1 text-swipes-trusted-green" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3 mr-1" />
                            Copy Link
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-[7px] text-xs"
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-[7px] text-xs text-swipes-muted-red hover:text-swipes-muted-red"
                      >
                        <XCircle className="h-3 w-3 mr-1" />
                        Disable
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
