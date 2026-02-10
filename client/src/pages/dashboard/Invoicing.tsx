import { useState } from "react";
import { useLocation } from "wouter";
import { FileText, Plus, Eye, Edit, Send, DollarSign, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import MetricCard from "@/components/MetricCard";
import SubNavTabs from "@/components/dashboard/SubNavTabs";
import { useToast } from "@/hooks/use-toast";

const tabs = [
  { label: "All Invoices", href: "/dashboard/invoices" },
  { label: "Draft", href: "/dashboard/invoices?tab=draft" },
  { label: "Sent", href: "/dashboard/invoices?tab=sent" },
  { label: "Paid", href: "/dashboard/invoices?tab=paid" },
  { label: "Overdue", href: "/dashboard/invoices?tab=overdue" },
];

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
  draft: { label: "Draft", className: "bg-gray-100 text-gray-600" },
  sent: { label: "Sent", className: "bg-blue-100 text-blue-700" },
  paid: { label: "Paid", className: "bg-green-100 text-green-700" },
  overdue: { label: "Overdue", className: "bg-red-100 text-red-600" },
};

export default function Invoicing() {
  const [location] = useLocation();
  const { toast } = useToast();
  const [viewInvoice, setViewInvoice] = useState<Invoice | null>(null);
  const [editInvoice, setEditInvoice] = useState<Invoice | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [formCustomer, setFormCustomer] = useState("");
  const [formAmount, setFormAmount] = useState("");
  const urlParams = new URLSearchParams(location.split("?")[1] || "");
  const activeTab = urlParams.get("tab") || "all";

  const filteredInvoices = activeTab === "all"
    ? mockInvoices
    : mockInvoices.filter((inv) => inv.status === activeTab);

  return (
    <div className="p-8">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Invoicing</h1>
          <p className="text-gray-500 mt-1">Create, send, and track invoices for your customers</p>
        </div>
        <Button className="bg-[#1844A6] hover:bg-[#1844A6]/90 text-white rounded-[7px]" onClick={() => { setFormCustomer(""); setFormAmount(""); setShowCreate(true); }}>
          <Plus className="h-4 w-4 mr-2" />
          Create Invoice
        </Button>
      </div>

      <SubNavTabs tabs={tabs} />

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Total Outstanding"
          value="$12,450.00"
          change="3 invoices awaiting payment"
          changeType="neutral"
          icon={DollarSign}
        />
        <MetricCard
          title="Total Overdue"
          value="$4,325.00"
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

      {/* Invoice Table */}
      {filteredInvoices.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-[7px] p-12 text-center">
          <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No invoices found</h3>
          <p className="text-gray-500 text-sm">No invoices match this filter.</p>
        </div>
      ) : (
        <div className="bg-white rounded-[7px] border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F6F9FC] border-b border-gray-200">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Invoice #</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Customer</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Amount</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Due Date</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-mono text-gray-900">{invoice.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{invoice.customer}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{invoice.amount}</td>
                  <td className="px-4 py-3">
                    <Badge className={`text-xs rounded-full ${statusConfig[invoice.status].className}`}>
                      {statusConfig[invoice.status].label}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{invoice.dueDate}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="View" onClick={() => setViewInvoice(invoice)}>
                        <Eye className="h-4 w-4 text-gray-500" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Edit" onClick={() => { setFormCustomer(invoice.customer); setFormAmount(invoice.amount); setEditInvoice(invoice); }}>
                        <Edit className="h-4 w-4 text-gray-500" />
                      </Button>
                      {invoice.status === "draft" && (
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Send" onClick={() => toast({ title: "Invoice sent", description: `${invoice.id} sent to ${invoice.customer}.` })}>
                          <Send className="h-4 w-4 text-gray-500" />
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4 text-center">
        <span className="text-xs text-gray-400">{filteredInvoices.length} invoices</span>
      </div>

      {/* View Invoice Modal */}
      <Dialog open={!!viewInvoice} onOpenChange={(open) => !open && setViewInvoice(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Invoice Details</DialogTitle>
          </DialogHeader>
          {viewInvoice && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500">Invoice #</p>
                <p className="text-sm font-mono font-medium text-gray-900">{viewInvoice.id}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Status</p>
                <Badge className={`text-xs rounded-full ${statusConfig[viewInvoice.status].className}`}>{statusConfig[viewInvoice.status].label}</Badge>
              </div>
              <div>
                <p className="text-xs text-gray-500">Customer</p>
                <p className="text-sm font-medium text-gray-900">{viewInvoice.customer}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Amount</p>
                <p className="text-sm font-medium text-gray-900">{viewInvoice.amount}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Due Date</p>
                <p className="text-sm text-gray-900">{viewInvoice.dueDate}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Create Invoice Modal */}
      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create Invoice</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-900">Customer</Label>
              <Input value={formCustomer} onChange={(e) => setFormCustomer(e.target.value)} placeholder="Customer name" className="rounded-[7px]" />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-900">Amount</Label>
              <Input value={formAmount} onChange={(e) => setFormAmount(e.target.value)} placeholder="$0.00" className="rounded-[7px]" />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" className="rounded-[7px]" onClick={() => setShowCreate(false)}>Cancel</Button>
              <Button className="bg-[#1844A6] hover:bg-[#1844A6]/90 text-white rounded-[7px]" onClick={() => { toast({ title: "Invoice created", description: `Invoice for ${formCustomer} created as draft.` }); setShowCreate(false); }}>Create Invoice</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Invoice Modal */}
      <Dialog open={!!editInvoice} onOpenChange={(open) => !open && setEditInvoice(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Invoice</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-900">Customer</Label>
              <Input value={formCustomer} onChange={(e) => setFormCustomer(e.target.value)} className="rounded-[7px]" />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-900">Amount</Label>
              <Input value={formAmount} onChange={(e) => setFormAmount(e.target.value)} className="rounded-[7px]" />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" className="rounded-[7px]" onClick={() => setEditInvoice(null)}>Cancel</Button>
              <Button className="bg-[#1844A6] hover:bg-[#1844A6]/90 text-white rounded-[7px]" onClick={() => { toast({ title: "Invoice updated", description: `${editInvoice?.id} has been updated.` }); setEditInvoice(null); }}>Save Changes</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
