import { useState } from "react";
import { useLocation } from "wouter";
import { Users, Search, Plus, Mail, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SubNavTabs from "@/components/dashboard/SubNavTabs";
import { useToast } from "@/hooks/use-toast";

const tabs = [
  { label: "All Customers", href: "/dashboard/customers" },
  { label: "Recent", href: "/dashboard/customers?tab=recent" },
  { label: "Top Customers", href: "/dashboard/customers?tab=top" },
  { label: "High Refunds", href: "/dashboard/customers?tab=refunds" },
];

const mockCustomers = [
  { id: "cust-001", name: "Sarah Johnson", email: "sarah@example.com", orders: 12, spent: 1450.00, lastOrder: "2025-10-24", status: "active" },
  { id: "cust-002", name: "Mike Chen", email: "mike@example.com", orders: 8, spent: 890.50, lastOrder: "2025-10-23", status: "active" },
  { id: "cust-003", name: "Emily Davis", email: "emily@example.com", orders: 23, spent: 3200.00, lastOrder: "2025-10-22", status: "active" },
  { id: "cust-004", name: "James Wilson", email: "james@example.com", orders: 3, spent: 245.99, lastOrder: "2025-10-20", status: "active" },
  { id: "cust-005", name: "Lisa Anderson", email: "lisa@example.com", orders: 15, spent: 1890.75, lastOrder: "2025-10-19", status: "active" },
  { id: "cust-006", name: "Robert Taylor", email: "robert@example.com", orders: 1, spent: 59.99, lastOrder: "2025-10-15", status: "inactive" },
  { id: "cust-007", name: "Amanda Martinez", email: "amanda@example.com", orders: 6, spent: 720.00, lastOrder: "2025-10-18", status: "active" },
  { id: "cust-008", name: "David Brown", email: "david@example.com", orders: 0, spent: 0, lastOrder: "-", status: "inactive" },
];

export default function CustomerList() {
  const [search, setSearch] = useState("");
  const [location] = useLocation();
  const { toast } = useToast();
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  // Parse tab from URL
  const urlParams = new URLSearchParams(location.split("?")[1] || "");
  const activeTab = urlParams.get("tab") || "all";

  // Filter customers based on active tab
  let filteredCustomers = mockCustomers;
  if (activeTab === "recent") {
    filteredCustomers = [...mockCustomers].sort((a, b) => (b.lastOrder > a.lastOrder ? 1 : -1)).slice(0, 5);
  } else if (activeTab === "top") {
    filteredCustomers = [...mockCustomers].sort((a, b) => b.spent - a.spent).slice(0, 5);
  } else if (activeTab === "refunds") {
    filteredCustomers = []; // No refund data in mock
  }

  // Apply search filter
  if (search) {
    const q = search.toLowerCase();
    filteredCustomers = filteredCustomers.filter(
      (c) => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customer List</h1>
          <p className="text-gray-500 mt-1">Manage your customers and their details</p>
        </div>
        <Button className="bg-[#1844A6] hover:bg-[#1844A6]/90 text-white rounded-[7px]" onClick={() => { setNewName(""); setNewEmail(""); setShowAddCustomer(true); }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Customer
        </Button>
      </div>

      <SubNavTabs tabs={tabs} />

      {/* Search */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 rounded-[7px]"
          />
        </div>
      </div>

      {/* Customer Table */}
      {filteredCustomers.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-[7px] p-12 text-center">
          <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {activeTab === "refunds" ? "No high-refund customers" : "No customers found"}
          </h3>
          <p className="text-gray-500 text-sm">
            {activeTab === "refunds"
              ? "Customers with high refund rates will appear here."
              : "Customers will appear here once they make purchases."}
          </p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-[7px] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F6F9FC] border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Email</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                  <span className="flex items-center gap-1">Orders <ArrowUpDown className="h-3 w-3" /></span>
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                  <span className="flex items-center gap-1">Total Spent <ArrowUpDown className="h-3 w-3" /></span>
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Last Order</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#1844A6]/10 flex items-center justify-center">
                        <span className="text-xs font-semibold text-[#1844A6]">
                          {customer.name.split(" ").map(n => n[0]).join("")}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{customer.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-600 flex items-center gap-1">
                      <Mail className="h-3 w-3 text-gray-400" />
                      {customer.email}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{customer.orders}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">${customer.spent.toFixed(2)}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{customer.lastOrder}</td>
                  <td className="px-4 py-3">
                    <Badge
                      className={`text-xs rounded-full ${
                        customer.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {customer.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4 text-center">
        <span className="text-xs text-gray-400">{filteredCustomers.length} customers</span>
      </div>

      {/* Add Customer Modal */}
      <Dialog open={showAddCustomer} onOpenChange={setShowAddCustomer}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Customer</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-900">Full Name</Label>
              <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="John Doe" className="rounded-[7px]" />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-900">Email</Label>
              <Input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="john@example.com" className="rounded-[7px]" />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" className="rounded-[7px]" onClick={() => setShowAddCustomer(false)}>Cancel</Button>
              <Button className="bg-[#1844A6] hover:bg-[#1844A6]/90 text-white rounded-[7px]" onClick={() => { toast({ title: "Customer added", description: `${newName} has been added to your customer list.` }); setShowAddCustomer(false); }}>Add Customer</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
