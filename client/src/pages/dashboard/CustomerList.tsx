import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Users, Search, Plus, Mail, ArrowUpDown, Loader2 } from "lucide-react";
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
import { apiRequest } from "@/lib/queryClient";

const tabs = [
  { label: "All Customers", href: "/dashboard/customers" },
  { label: "Recent", href: "/dashboard/customers?tab=recent" },
  { label: "Top Customers", href: "/dashboard/customers?tab=top" },
  { label: "High Refunds", href: "/dashboard/customers?tab=refunds" },
];

interface VaultCustomer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  company: string | null;
  status: string;
  lifetimeValue: number;
  transactionCount: number;
  lastTransactionAt: string | null;
  createdAt: string;
}

export default function CustomerList() {
  const [search, setSearch] = useState("");
  const [location] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  // Fetch real customers from API
  const { data: customers = [], isLoading } = useQuery<VaultCustomer[]>({
    queryKey: ["/api/merchant/customers"],
  });

  // Add customer mutation
  const addCustomerMutation = useMutation({
    mutationFn: async ({ name, email }: { name: string; email: string }) => {
      const nameParts = name.trim().split(/\s+/);
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";
      const res = await apiRequest("POST", "/api/merchant/customers", {
        firstName,
        lastName,
        email,
        sourcePlatform: "swipesblue",
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/merchant/customers"] });
      toast({ title: "Customer added", description: `${newName} has been added to your customer list.` });
      setShowAddCustomer(false);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to add customer. Please try again.", variant: "destructive" });
    },
  });

  // Parse tab from URL
  const urlParams = new URLSearchParams(location.split("?")[1] || "");
  const activeTab = urlParams.get("tab") || "all";

  // Map vault records to display format
  const mappedCustomers = customers.map((c) => ({
    id: c.id,
    name: `${c.firstName} ${c.lastName}`.trim(),
    email: c.email,
    orders: c.transactionCount || 0,
    spent: (c.lifetimeValue || 0) / 100,
    lastOrder: c.lastTransactionAt ? new Date(c.lastTransactionAt).toLocaleDateString() : "—",
    status: c.status || "active",
  }));

  // Filter customers based on active tab
  let filteredCustomers = mappedCustomers;
  if (activeTab === "recent") {
    filteredCustomers = [...mappedCustomers].sort((a, b) => (b.lastOrder > a.lastOrder ? 1 : -1)).slice(0, 5);
  } else if (activeTab === "top") {
    filteredCustomers = [...mappedCustomers].sort((a, b) => b.spent - a.spent).slice(0, 5);
  } else if (activeTab === "refunds") {
    filteredCustomers = [];
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
      {isLoading ? (
        <div className="bg-white border border-gray-200 rounded-[7px] p-12 text-center">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400 mx-auto" />
        </div>
      ) : filteredCustomers.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-[7px] p-12 text-center">
          <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {activeTab === "refunds" ? "No high-refund customers" : search ? "No customers found" : "No customers yet"}
          </h3>
          <p className="text-gray-500 text-sm">
            {activeTab === "refunds"
              ? "Customers with high refund rates will appear here."
              : search
                ? "Try a different search term."
                : "Customers will appear here after their first transaction."}
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
              <Button
                className="bg-[#1844A6] hover:bg-[#1844A6]/90 text-white rounded-[7px]"
                disabled={addCustomerMutation.isPending || !newName.trim() || !newEmail.trim()}
                onClick={() => addCustomerMutation.mutate({ name: newName, email: newEmail })}
              >
                {addCustomerMutation.isPending ? "Adding..." : "Add Customer"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
