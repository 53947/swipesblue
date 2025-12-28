import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Search, Download, Eye, RotateCcw, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Transaction {
  id: string;
  merchantId: string;
  platform: string;
  platformOrderId: string;
  gatewayTransactionId: string;
  amount: string;
  currency: string;
  status: string;
  paymentMethod: string;
  cardBrand: string;
  cardLastFour: string;
  customerEmail: string;
  customerName: string;
  refundedAmount: string;
  createdAt: string;
}

export default function AdminTransactions() {
  const [searchQuery, setSearchQuery] = useState("");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [refundDialogOpen, setRefundDialogOpen] = useState(false);
  const [refundAmount, setRefundAmount] = useState("");
  const [refundReason, setRefundReason] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch transactions
  const { data: transactions, isLoading } = useQuery({
    queryKey: ["/api/admin/transactions"],
    queryFn: async () => {
      const response = await fetch("/api/admin/transactions");
      if (!response.ok) throw new Error("Failed to fetch transactions");
      return response.json();
    },
  });

  // Process refund mutation
  const refundMutation = useMutation({
    mutationFn: async ({ transactionId, amount, reason }: { transactionId: string; amount?: number; reason?: string }) => {
      const response = await fetch("/api/v1/payments/refund", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transactionId, amount, reason }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to process refund");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/transactions"] });
      toast({
        title: "Success",
        description: "Refund processed successfully",
      });
      setRefundDialogOpen(false);
      setSelectedTransaction(null);
      setRefundAmount("");
      setRefundReason("");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to process refund",
        variant: "destructive",
      });
    },
  });

  // Filter transactions
  const filteredTransactions = (transactions || []).filter((transaction: Transaction) => {
    const matchesSearch =
      !searchQuery ||
      transaction.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.customerEmail?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.platformOrderId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.gatewayTransactionId?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPlatform =
      platformFilter === "all" || transaction.platform === platformFilter;

    const matchesStatus =
      statusFilter === "all" || transaction.status === statusFilter;

    return matchesSearch && matchesPlatform && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const config: Record<string, { variant: any; icon: any }> = {
      success: { variant: "default", icon: CheckCircle },
      failed: { variant: "destructive", icon: XCircle },
      refunded: { variant: "secondary", icon: RotateCcw },
      pending: { variant: "secondary", icon: null },
    };

    const { variant, icon: Icon } = config[status] || config.pending;

    return (
      <Badge variant={variant} className="flex items-center gap-1 w-fit">
        {Icon && <Icon className="h-3 w-3" />}
        {status}
      </Badge>
    );
  };

  const exportToCSV = () => {
    const headers = ["Date", "Transaction ID", "Customer", "Amount", "Status", "Platform", "Card"];
    const rows = filteredTransactions.map((t: Transaction) => [
      new Date(t.createdAt).toLocaleString(),
      t.gatewayTransactionId,
      t.customerName || t.customerEmail,
      `$${parseFloat(t.amount).toFixed(2)}`,
      t.status,
      t.platform,
      `${t.cardBrand} ****${t.cardLastFour}`,
    ]);

    const csv = [headers, ...rows].map(row => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transactions-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Success",
      description: `Exported ${filteredTransactions.length} transactions`,
    });
  };

  const handleRefund = () => {
    if (!selectedTransaction) return;

    const amount = refundAmount ? parseFloat(refundAmount) : undefined;
    refundMutation.mutate({
      transactionId: selectedTransaction.id,
      amount,
      reason: refundReason,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
          <p className="text-gray-600 mt-1">View and manage payment transactions</p>
        </div>
        <Button onClick={exportToCSV} disabled={filteredTransactions.length === 0}>
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={platformFilter} onValueChange={setPlatformFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Platforms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Platforms</SelectItem>
                <SelectItem value="businessblueprint">BusinessBlueprint</SelectItem>
                <SelectItem value="hostsblue">HostsBlue</SelectItem>
                <SelectItem value="swipesblue">SwipesBlue</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  [...Array(5)].map((_, i) => (
                    <TableRow key={i}>
                      <TableCell colSpan={8}>
                        <Skeleton className="h-12 w-full" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : filteredTransactions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                      No transactions found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTransactions.map((transaction: Transaction) => (
                    <TableRow
                      key={transaction.id}
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => setSelectedTransaction(transaction)}
                    >
                      <TableCell className="text-sm text-gray-600">
                        {new Date(transaction.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-sm">
                            {transaction.customerName || "Anonymous"}
                          </div>
                          <div className="text-xs text-gray-500">{transaction.customerEmail}</div>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {transaction.platformOrderId || "-"}
                      </TableCell>
                      <TableCell className="font-semibold">
                        ${parseFloat(transaction.amount).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{transaction.platform}</Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        {transaction.cardBrand && (
                          <span className="capitalize">
                            {transaction.cardBrand} ••••{transaction.cardLastFour}
                          </span>
                        )}
                      </TableCell>
                      <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTransaction(transaction);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Details Dialog */}
      <Dialog open={!!selectedTransaction && !refundDialogOpen} onOpenChange={() => setSelectedTransaction(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
            <DialogDescription>
              View transaction information and process refunds
            </DialogDescription>
          </DialogHeader>

          {selectedTransaction && (
            <div className="space-y-6">
              {/* Transaction Info */}
              <div>
                <h3 className="font-semibold mb-3">Transaction Information</h3>
                <dl className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="text-gray-500">Transaction ID</dt>
                    <dd className="font-mono text-xs mt-1">{selectedTransaction.id}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Gateway Transaction ID</dt>
                    <dd className="font-mono text-xs mt-1">
                      {selectedTransaction.gatewayTransactionId || "N/A"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Platform Order ID</dt>
                    <dd className="font-mono text-xs mt-1">
                      {selectedTransaction.platformOrderId || "N/A"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Status</dt>
                    <dd className="mt-1">{getStatusBadge(selectedTransaction.status)}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Amount</dt>
                    <dd className="font-semibold mt-1">
                      ${parseFloat(selectedTransaction.amount).toFixed(2)} {selectedTransaction.currency}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Refunded</dt>
                    <dd className="font-medium mt-1">
                      ${parseFloat(selectedTransaction.refundedAmount || "0").toFixed(2)}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Customer Info */}
              <div>
                <h3 className="font-semibold mb-3">Customer Information</h3>
                <dl className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="text-gray-500">Name</dt>
                    <dd className="font-medium mt-1">{selectedTransaction.customerName || "N/A"}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Email</dt>
                    <dd className="font-medium mt-1">{selectedTransaction.customerEmail}</dd>
                  </div>
                </dl>
              </div>

              {/* Payment Method */}
              <div>
                <h3 className="font-semibold mb-3">Payment Method</h3>
                <dl className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="text-gray-500">Type</dt>
                    <dd className="font-medium mt-1 capitalize">{selectedTransaction.paymentMethod}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Card</dt>
                    <dd className="font-medium mt-1 capitalize">
                      {selectedTransaction.cardBrand} ••••{selectedTransaction.cardLastFour}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Actions */}
              {selectedTransaction.status === "success" && (
                <div className="flex gap-2 pt-4 border-t">
                  <Button
                    onClick={() => {
                      setRefundDialogOpen(true);
                      setRefundAmount(selectedTransaction.amount);
                    }}
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Process Refund
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Refund Dialog */}
      <Dialog open={refundDialogOpen} onOpenChange={setRefundDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Process Refund</DialogTitle>
            <DialogDescription>
              Refund this transaction (full or partial amount)
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="refund-amount">Amount</Label>
              <Input
                id="refund-amount"
                type="number"
                step="0.01"
                placeholder="Leave empty for full refund"
                value={refundAmount}
                onChange={(e) => setRefundAmount(e.target.value)}
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                Original amount: ${selectedTransaction ? parseFloat(selectedTransaction.amount).toFixed(2) : "0.00"}
              </p>
            </div>

            <div>
              <Label htmlFor="refund-reason">Reason (optional)</Label>
              <Textarea
                id="refund-reason"
                placeholder="Refund reason..."
                value={refundReason}
                onChange={(e) => setRefundReason(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setRefundDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleRefund} disabled={refundMutation.isPending}>
              {refundMutation.isPending ? "Processing..." : "Process Refund"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
