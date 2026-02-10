import { useState } from "react";
import { useLocation } from "wouter";
import { ShoppingCart, Search, Eye, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import SubNavTabs from "@/components/dashboard/SubNavTabs";
import { useToast } from "@/hooks/use-toast";

const tabs = [
  { label: "All Orders", href: "/dashboard/orders" },
  { label: "Pending", href: "/dashboard/orders?tab=pending" },
  { label: "Fulfilled", href: "/dashboard/orders?tab=fulfilled" },
  { label: "Refunded", href: "/dashboard/orders?tab=refunded" },
];

interface MockOrder {
  id: string;
  orderNumber: string;
  date: string;
  customer: string;
  email: string;
  items: number;
  total: number;
  status: "pending" | "processing" | "fulfilled" | "refunded" | "cancelled";
  paymentStatus: "paid" | "pending" | "failed" | "refunded";
}

const mockOrders: MockOrder[] = [
  { id: "ord-001", orderNumber: "ORD-1024", date: "2025-10-24", customer: "Sarah Johnson", email: "sarah@example.com", items: 3, total: 189.97, status: "pending", paymentStatus: "paid" },
  { id: "ord-002", orderNumber: "ORD-1023", date: "2025-10-24", customer: "Mike Chen", email: "mike@example.com", items: 1, total: 49.99, status: "fulfilled", paymentStatus: "paid" },
  { id: "ord-003", orderNumber: "ORD-1022", date: "2025-10-23", customer: "Emily Davis", email: "emily@example.com", items: 5, total: 345.50, status: "fulfilled", paymentStatus: "paid" },
  { id: "ord-004", orderNumber: "ORD-1021", date: "2025-10-23", customer: "James Wilson", email: "james@example.com", items: 2, total: 129.98, status: "processing", paymentStatus: "paid" },
  { id: "ord-005", orderNumber: "ORD-1020", date: "2025-10-22", customer: "Lisa Anderson", email: "lisa@example.com", items: 1, total: 79.99, status: "refunded", paymentStatus: "refunded" },
  { id: "ord-006", orderNumber: "ORD-1019", date: "2025-10-22", customer: "Robert Taylor", email: "robert@example.com", items: 4, total: 259.96, status: "fulfilled", paymentStatus: "paid" },
  { id: "ord-007", orderNumber: "ORD-1018", date: "2025-10-21", customer: "Amanda Martinez", email: "amanda@example.com", items: 2, total: 159.98, status: "pending", paymentStatus: "pending" },
];

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  fulfilled: "bg-green-100 text-green-700",
  refunded: "bg-gray-100 text-gray-600",
  cancelled: "bg-red-100 text-red-600",
};

const paymentStatusColors: Record<string, string> = {
  paid: "bg-green-100 text-green-700",
  pending: "bg-yellow-100 text-yellow-700",
  failed: "bg-red-100 text-red-600",
  refunded: "bg-gray-100 text-gray-600",
};

export default function OrdersDashboard() {
  const [search, setSearch] = useState("");
  const [location] = useLocation();
  const { toast } = useToast();
  const [viewOrder, setViewOrder] = useState<MockOrder | null>(null);
  const [refundOrder, setRefundOrder] = useState<MockOrder | null>(null);

  const urlParams = new URLSearchParams(location.split("?")[1] || "");
  const activeTab = urlParams.get("tab") || "all";

  let filteredOrders = mockOrders;
  if (activeTab === "pending") {
    filteredOrders = mockOrders.filter((o) => o.status === "pending" || o.status === "processing");
  } else if (activeTab === "fulfilled") {
    filteredOrders = mockOrders.filter((o) => o.status === "fulfilled");
  } else if (activeTab === "refunded") {
    filteredOrders = mockOrders.filter((o) => o.status === "refunded");
  }

  if (search) {
    const q = search.toLowerCase();
    filteredOrders = filteredOrders.filter(
      (o) => o.customer.toLowerCase().includes(q) || o.orderNumber.toLowerCase().includes(q) || o.email.toLowerCase().includes(q)
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
          <p className="text-gray-500 mt-1">View and manage customer orders</p>
        </div>
      </div>

      <SubNavTabs tabs={tabs} />

      {/* Search */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by order number, customer, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 rounded-[7px]"
          />
        </div>
      </div>

      {/* Orders Table */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-[7px] p-12 text-center">
          <ShoppingCart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-500 text-sm">Orders will appear here as customers make purchases.</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-[7px] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F6F9FC] border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Order</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Items</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Total</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Payment</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <span className="text-sm font-medium text-[#1844A6]">{order.orderNumber}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{order.date}</td>
                  <td className="px-4 py-3">
                    <div>
                      <span className="text-sm font-medium text-gray-900 block">{order.customer}</span>
                      <span className="text-xs text-gray-400">{order.email}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{order.items}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">${order.total.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <Badge className={`text-xs rounded-full ${statusColors[order.status]}`}>
                      {order.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge className={`text-xs rounded-full ${paymentStatusColors[order.paymentStatus]}`}>
                      {order.paymentStatus}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="View details" onClick={() => setViewOrder(order)}>
                        <Eye className="h-4 w-4 text-gray-500" />
                      </Button>
                      {order.status !== "refunded" && order.paymentStatus === "paid" && (
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Refund" onClick={() => setRefundOrder(order)}>
                          <RotateCcw className="h-4 w-4 text-gray-500" />
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
        <span className="text-xs text-gray-400">{filteredOrders.length} orders</span>
      </div>

      {/* View Order Modal */}
      <Dialog open={!!viewOrder} onOpenChange={(open) => !open && setViewOrder(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          {viewOrder && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500">Order Number</p>
                <p className="text-sm font-medium text-gray-900">{viewOrder.orderNumber}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Date</p>
                <p className="text-sm text-gray-900">{viewOrder.date}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Customer</p>
                <p className="text-sm font-medium text-gray-900">{viewOrder.customer}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="text-sm text-gray-900">{viewOrder.email}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Items</p>
                <p className="text-sm text-gray-900">{viewOrder.items}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Total</p>
                <p className="text-sm font-medium text-gray-900">${viewOrder.total.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Status</p>
                <Badge className={`text-xs rounded-full ${statusColors[viewOrder.status]}`}>{viewOrder.status}</Badge>
              </div>
              <div>
                <p className="text-xs text-gray-500">Payment</p>
                <Badge className={`text-xs rounded-full ${paymentStatusColors[viewOrder.paymentStatus]}`}>{viewOrder.paymentStatus}</Badge>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Refund Confirmation */}
      <AlertDialog open={!!refundOrder} onOpenChange={(open) => !open && setRefundOrder(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Refund</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to refund ${refundOrder?.total.toFixed(2)} for order {refundOrder?.orderNumber}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-[7px]">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 text-white rounded-[7px]"
              onClick={() => {
                toast({ title: "Refund initiated", description: `Refund of $${refundOrder?.total.toFixed(2)} initiated for ${refundOrder?.orderNumber}.` });
                setRefundOrder(null);
              }}
            >
              Issue Refund
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
