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
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Filter, Eye, CheckCircle, XCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Merchant {
  id: string;
  platform: string;
  platformClientId: string;
  businessName: string;
  businessEmail: string;
  nmiMerchantId: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function Merchants() {
  const [searchQuery, setSearchQuery] = useState("");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch merchants
  const { data: merchants, isLoading } = useQuery({
    queryKey: ["/api/v1/merchants"],
    queryFn: async () => {
      const response = await fetch("/api/v1/merchants");
      if (!response.ok) throw new Error("Failed to fetch merchants");
      return response.json();
    },
  });

  // Update merchant status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const response = await fetch(`/api/v1/merchants/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error("Failed to update status");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/v1/merchants"] });
      toast({
        title: "Success",
        description: "Merchant status updated successfully",
      });
      setSelectedMerchant(null);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update merchant status",
        variant: "destructive",
      });
    },
  });

  // Filter merchants
  const filteredMerchants = (merchants || []).filter((merchant: Merchant) => {
    const matchesSearch =
      !searchQuery ||
      merchant.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      merchant.businessEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      merchant.platformClientId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPlatform =
      platformFilter === "all" || merchant.platform === platformFilter;

    const matchesStatus =
      statusFilter === "all" || merchant.status === statusFilter;

    return matchesSearch && matchesPlatform && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const config: Record<string, { variant: any; icon: any }> = {
      active: { variant: "default", icon: CheckCircle },
      pending: { variant: "secondary", icon: Clock },
      suspended: { variant: "destructive", icon: XCircle },
      rejected: { variant: "destructive", icon: XCircle },
    };

    const { variant, icon: Icon } = config[status] || config.pending;

    return (
      <Badge variant={variant} className="flex items-center gap-1 w-fit">
        <Icon className="h-3 w-3" />
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Merchants</h1>
        <p className="text-gray-600 mt-1">Manage merchant accounts across all platforms</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search merchants..."
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
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
                  <TableHead>Business Name</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Client ID</TableHead>
                  <TableHead>NMI ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
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
                ) : filteredMerchants.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                      No merchants found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredMerchants.map((merchant: Merchant) => (
                    <TableRow
                      key={merchant.id}
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => setSelectedMerchant(merchant)}
                    >
                      <TableCell className="font-medium">{merchant.businessName}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{merchant.platform}</Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {merchant.businessEmail}
                      </TableCell>
                      <TableCell className="text-sm font-mono">
                        {merchant.platformClientId}
                      </TableCell>
                      <TableCell className="text-sm font-mono">
                        {merchant.nmiMerchantId || "-"}
                      </TableCell>
                      <TableCell>{getStatusBadge(merchant.status)}</TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {new Date(merchant.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedMerchant(merchant);
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

      {/* Merchant Details Dialog */}
      <Dialog open={!!selectedMerchant} onOpenChange={() => setSelectedMerchant(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Merchant Details</DialogTitle>
            <DialogDescription>
              View and manage merchant account information
            </DialogDescription>
          </DialogHeader>

          {selectedMerchant && (
            <div className="space-y-6">
              {/* Business Info */}
              <div>
                <h3 className="font-semibold mb-3">Business Information</h3>
                <dl className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="text-gray-500">Business Name</dt>
                    <dd className="font-medium mt-1">{selectedMerchant.businessName}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Email</dt>
                    <dd className="font-medium mt-1">{selectedMerchant.businessEmail}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Platform</dt>
                    <dd className="mt-1">
                      <Badge variant="outline">{selectedMerchant.platform}</Badge>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Client ID</dt>
                    <dd className="font-mono text-xs mt-1">{selectedMerchant.platformClientId}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">NMI Merchant ID</dt>
                    <dd className="font-mono text-xs mt-1">
                      {selectedMerchant.nmiMerchantId || "Not assigned"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Status</dt>
                    <dd className="mt-1">{getStatusBadge(selectedMerchant.status)}</dd>
                  </div>
                </dl>
              </div>

              {/* Status Actions */}
              <div>
                <h3 className="font-semibold mb-3">Status Management</h3>
                <div className="flex gap-2">
                  {selectedMerchant.status !== "active" && (
                    <Button
                      size="sm"
                      onClick={() =>
                        updateStatusMutation.mutate({
                          id: selectedMerchant.id,
                          status: "active",
                        })
                      }
                      disabled={updateStatusMutation.isPending}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                  )}
                  {selectedMerchant.status === "active" && (
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() =>
                        updateStatusMutation.mutate({
                          id: selectedMerchant.id,
                          status: "suspended",
                        })
                      }
                      disabled={updateStatusMutation.isPending}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Suspend
                    </Button>
                  )}
                  {selectedMerchant.status === "suspended" && (
                    <Button
                      size="sm"
                      onClick={() =>
                        updateStatusMutation.mutate({
                          id: selectedMerchant.id,
                          status: "active",
                        })
                      }
                      disabled={updateStatusMutation.isPending}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Reactivate
                    </Button>
                  )}
                </div>
              </div>

              {/* Timestamps */}
              <div>
                <h3 className="font-semibold mb-3">Timestamps</h3>
                <dl className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="text-gray-500">Created</dt>
                    <dd className="font-medium mt-1">
                      {new Date(selectedMerchant.createdAt).toLocaleString()}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Last Updated</dt>
                    <dd className="font-medium mt-1">
                      {new Date(selectedMerchant.updatedAt).toLocaleString()}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
