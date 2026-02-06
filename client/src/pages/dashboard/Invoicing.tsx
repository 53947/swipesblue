import { useState } from "react";
import { FileText, Plus, Eye, Edit, Send, DollarSign, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MetricCard from "@/components/MetricCard";

type InvoiceStatus = "draft" | "sent" | "paid" | "overdue";

interface Invoice {
  id: string;
  customer: string;
  amount: string;
  status: InvoiceStatus;
  dueDate: string;
}

const mockInvoices: Invoice[] = [
  { id: "INV-001", customer: "Acme Corporation", amount: "$2,500.00", status: "paid", dueDate: "2025-10-15" },
  { id: "INV-002", customer: "Globex Industries", amount: "$1,200.00", status: "sent", dueDate: "2025-11-01" },
  { id: "INV-003", customer: "Wayne Enterprises", amount: "$3,200.00", status: "overdue", dueDate: "2025-10-01" },
  { id: "INV-004", customer: "Stark Technologies", amount: "$850.00", status: "draft", dueDate: "2025-11-15" },
  { id: "INV-005", customer: "Umbrella Corp", amount: "$4,750.00", status: "paid", dueDate: "2025-10-10" },
  { id: "INV-006", customer: "Initech LLC", amount: "$320.00", status: "sent", dueDate: "2025-11-05" },
  { id: "INV-007", customer: "Hooli Inc", amount: "$1,680.00", status: "paid", dueDate: "2025-10-20" },
  { id: "INV-008", customer: "Pied Piper", amount: "$475.00", status: "draft", dueDate: "2025-11-20" },
  { id: "INV-009", customer: "Soylent Corp", amount: "$6,250.00", status: "sent", dueDate: "2025-11-10" },
  { id: "INV-010", customer: "Cyberdyne Systems", amount: "$1,125.00", status: "overdue", dueDate: "2025-09-28" },
];

const statusConfig: Record<InvoiceStatus, { label: string; className: string }> = {
  draft: { label: "Draft", className: "bg-gray-100 text-gray-600 hover:bg-gray-100" },
  sent: { label: "Sent", className: "bg-swipes-blue-deep text-white hover:bg-swipes-blue-deep" },
  paid: { label: "Paid", className: "bg-swipes-trusted-green text-white hover:bg-swipes-trusted-green" },
  overdue: { label: "Overdue", className: "bg-swipes-muted-red text-white hover:bg-swipes-muted-red" },
};

function InvoiceTable({ invoices }: { invoices: Invoice[] }) {
  return (
    <div className="bg-white rounded-[7px] border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="text-left px-6 py-3 text-xs font-medium text-swipes-pro-gray uppercase tracking-wider">Invoice #</th>
            <th className="text-left px-6 py-3 text-xs font-medium text-swipes-pro-gray uppercase tracking-wider">Customer</th>
            <th className="text-left px-6 py-3 text-xs font-medium text-swipes-pro-gray uppercase tracking-wider">Amount</th>
            <th className="text-left px-6 py-3 text-xs font-medium text-swipes-pro-gray uppercase tracking-wider">Status</th>
            <th className="text-left px-6 py-3 text-xs font-medium text-swipes-pro-gray uppercase tracking-wider">Due Date</th>
            <th className="text-left px-6 py-3 text-xs font-medium text-swipes-pro-gray uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {invoices.map((invoice) => (
            <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 text-sm font-medium text-swipes-black">{invoice.id}</td>
              <td className="px-6 py-4 text-sm text-swipes-pro-gray">{invoice.customer}</td>
              <td className="px-6 py-4 text-sm font-medium text-swipes-black">{invoice.amount}</td>
              <td className="px-6 py-4">
                <Badge className={statusConfig[invoice.status].className}>
                  {statusConfig[invoice.status].label}
                </Badge>
              </td>
              <td className="px-6 py-4 text-sm text-swipes-pro-gray">{invoice.dueDate}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="rounded-[7px]">
                    <Eye className="h-3.5 w-3.5 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-[7px]">
                    <Edit className="h-3.5 w-3.5 mr-1" />
                    Edit
                  </Button>
                  {invoice.status === "draft" && (
                    <Button variant="outline" size="sm" className="rounded-[7px]">
                      <Send className="h-3.5 w-3.5 mr-1" />
                      Send
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
          {invoices.length === 0 && (
            <tr>
              <td colSpan={6} className="px-6 py-12 text-center text-sm text-swipes-pro-gray">
                No invoices found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default function Invoicing() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredInvoices = activeTab === "all"
    ? mockInvoices
    : mockInvoices.filter((inv) => inv.status === activeTab);

  return (
    <div className="p-8 space-y-8">
      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Outstanding"
          value="$12,450.00"
          change="3 invoices awaiting payment"
          changeType="neutral"
          icon={DollarSign}
        />
        <MetricCard
          title="Total Overdue"
          value="$3,200.00"
          change="2 invoices past due"
          changeType="negative"
          icon={AlertCircle}
        />
        <MetricCard
          title="Paid This Month"
          value="$28,750.00"
          change="+12.4% from last month"
          changeType="positive"
          icon={CheckCircle}
        />
        <MetricCard
          title="Average Invoice Value"
          value="$485.00"
          change="+3.2% from last month"
          changeType="positive"
          icon={Clock}
        />
      </div>

      {/* Header Row */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-swipes-black">Invoicing</h1>
          <p className="text-swipes-pro-gray">Create, send, and track invoices for your customers</p>
        </div>
        <Button className="bg-swipes-blue-deep rounded-[7px] hover:bg-swipes-blue-deep/90">
          <Plus className="h-4 w-4 mr-2" />
          Create Invoice
        </Button>
      </div>

      {/* Tabs and Invoice Table */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="rounded-[7px]">
          <TabsTrigger value="all" className="rounded-[7px]">
            <FileText className="h-4 w-4 mr-2" />
            All Invoices
          </TabsTrigger>
          <TabsTrigger value="draft" className="rounded-[7px]">
            Draft
          </TabsTrigger>
          <TabsTrigger value="sent" className="rounded-[7px]">
            Sent
          </TabsTrigger>
          <TabsTrigger value="paid" className="rounded-[7px]">
            Paid
          </TabsTrigger>
          <TabsTrigger value="overdue" className="rounded-[7px]">
            Overdue
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <InvoiceTable invoices={filteredInvoices} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
