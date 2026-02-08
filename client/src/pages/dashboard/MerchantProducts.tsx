import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "wouter";
import {
  Package,
  Plus,
  Search,
  Download,
  Trash2,
  Edit,
  MoreHorizontal,
  AlertTriangle,
  Archive,
  CheckCircle,
  FileText,
  ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { useToast } from "@/hooks/use-toast";
import { useMerchantAuth } from "@/hooks/use-merchant-auth";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: string;
  image: string | null;
  images: string[] | null;
  category: string | null;
  stock: number;
  sku: string | null;
  status: string | null;
  compareAtPrice: string | null;
  lowStockThreshold: number | null;
  trackInventory: boolean | null;
  createdAt: string;
  updatedAt: string | null;
}

export default function MerchantProducts() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { tier, canAccess } = useMerchantAuth();

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/merchant/products", search, statusFilter, categoryFilter],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (statusFilter !== "all") params.set("status", statusFilter);
      if (categoryFilter !== "all") params.set("category", categoryFilter);
      const res = await fetch(`/api/merchant/products?${params}`);
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    },
  });

  const { data: countData } = useQuery<{ count: number; limit: number; tier: string }>({
    queryKey: ["/api/merchant/products/count"],
    queryFn: async () => {
      const res = await fetch("/api/merchant/products/count");
      if (!res.ok) throw new Error("Failed to fetch count");
      return res.json();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/merchant/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/merchant/products"] });
      queryClient.invalidateQueries({ queryKey: ["/api/merchant/products/count"] });
      toast({ title: "Product deleted" });
      setDeleteId(null);
    },
  });

  const bulkDeleteMutation = useMutation({
    mutationFn: async (ids: string[]) => {
      const res = await fetch("/api/merchant/products/bulk-delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      });
      if (!res.ok) throw new Error("Failed to bulk delete");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/merchant/products"] });
      queryClient.invalidateQueries({ queryKey: ["/api/merchant/products/count"] });
      toast({ title: `${selectedIds.size} products deleted` });
      setSelectedIds(new Set());
      setBulkDeleteOpen(false);
    },
  });

  const bulkStatusMutation = useMutation({
    mutationFn: async ({ ids, status }: { ids: string[]; status: string }) => {
      const res = await fetch("/api/merchant/products/bulk-update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          updates: ids.map(id => ({ id, data: { status } })),
        }),
      });
      if (!res.ok) throw new Error("Failed to update");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/merchant/products"] });
      toast({ title: "Products updated" });
      setSelectedIds(new Set());
    },
  });

  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const toggleAll = () => {
    if (selectedIds.size === products.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(products.map(p => p.id)));
    }
  };

  const activeCount = products.filter(p => p.status === "active").length;
  const draftCount = products.filter(p => p.status === "draft").length;
  const lowStockCount = products.filter(p => {
    const threshold = p.lowStockThreshold ?? 5;
    return p.trackInventory !== false && p.stock <= threshold && p.status === "active";
  }).length;

  const categories = Array.from(new Set(products.map(p => p.category).filter(Boolean))) as string[];

  const handleExport = async () => {
    try {
      const res = await fetch("/api/merchant/products/export?format=csv");
      if (!res.ok) throw new Error("Export failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "products.csv";
      a.click();
      URL.revokeObjectURL(url);
      toast({ title: "Products exported" });
    } catch {
      toast({ title: "Export failed", variant: "destructive" });
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Your Catalog</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your product catalog</p>
        </div>
        <div className="flex items-center gap-3">
          {canAccess("Growth") && (
            <Button
              variant="outline"
              className="rounded-[7px]"
              onClick={handleExport}
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          )}
          <Link href="/dashboard/catalog/create">
            <Button className="bg-[#374151] hover:bg-[#374151]/90 text-white rounded-[7px]">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-[7px] p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Total Products</span>
            <Package className="h-4 w-4 text-gray-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">{countData?.count ?? 0}</span>
            <span className="text-sm text-gray-400">
              / {countData?.limit === Infinity ? "\u221E" : countData?.limit ?? 25}
            </span>
          </div>
          <div className="mt-2 w-full bg-gray-100 rounded-full h-1.5">
            <div
              className="bg-[#374151] h-1.5 rounded-full transition-all"
              style={{
                width: `${Math.min(
                  ((countData?.count ?? 0) / (countData?.limit === Infinity ? 1000 : countData?.limit ?? 25)) * 100,
                  100
                )}%`,
              }}
            />
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-[7px] p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Active</span>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </div>
          <span className="text-2xl font-bold text-gray-900 mt-2 block">{activeCount}</span>
        </div>
        <div className="bg-white border border-gray-200 rounded-[7px] p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Draft</span>
            <FileText className="h-4 w-4 text-gray-400" />
          </div>
          <span className="text-2xl font-bold text-gray-900 mt-2 block">{draftCount}</span>
        </div>
        <div className="bg-white border border-gray-200 rounded-[7px] p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Low Stock</span>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </div>
          <span className="text-2xl font-bold text-gray-900 mt-2 block">{lowStockCount}</span>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 rounded-[7px]"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[140px] rounded-[7px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[160px] rounded-[7px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(c => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Bulk Actions Toolbar */}
      {selectedIds.size > 0 && (
        <div className="flex items-center gap-3 mb-4 p-3 bg-blue-50 border border-blue-200 rounded-[7px]">
          <span className="text-sm font-medium text-blue-700">{selectedIds.size} selected</span>
          <Button
            variant="outline"
            size="sm"
            className="rounded-[7px]"
            onClick={() => setBulkDeleteOpen(true)}
            disabled={!canAccess("Growth")}
          >
            <Trash2 className="h-3 w-3 mr-1" />
            Delete
          </Button>
          <Select
            onValueChange={(v) =>
              bulkStatusMutation.mutate({ ids: Array.from(selectedIds), status: v })
            }
          >
            <SelectTrigger className="w-[130px] h-8 rounded-[7px]" disabled={!canAccess("Growth")}>
              <SelectValue placeholder="Set Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedIds(new Set())}
          >
            Clear
          </Button>
        </div>
      )}

      {/* Product Table */}
      {isLoading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-[7px] p-4 animate-pulse">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-[7px]" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                  <div className="h-3 bg-gray-100 rounded w-1/4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-[7px] p-12 text-center">
          <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No products yet</h3>
          <p className="text-sm text-gray-500 mb-4">Add your first product to start building your catalog.</p>
          <Link href="/dashboard/catalog/create">
            <Button className="bg-[#374151] hover:bg-[#374151]/90 text-white rounded-[7px]">
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Product
            </Button>
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-[7px] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F6F9FC] border-b border-gray-200">
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedIds.size === products.length && products.length > 0}
                    onChange={toggleAll}
                    className="rounded"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Product</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">SKU</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Price</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Stock</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const thumbnail = product.images?.[0] || product.image;
                const isLowStock = product.trackInventory !== false && product.stock <= (product.lowStockThreshold ?? 5) && product.status === "active";
                return (
                  <tr
                    key={product.id}
                    className={`border-b border-gray-100 hover:bg-gray-50 ${
                      selectedIds.has(product.id) ? "bg-blue-50" : ""
                    }`}
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(product.id)}
                        onChange={() => toggleSelect(product.id)}
                        className="rounded"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-[7px] bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                          {thumbnail ? (
                            <img src={thumbnail} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <ImageIcon className="h-4 w-4 text-gray-400" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <Link href={`/dashboard/catalog/${product.id}/edit`}>
                            <span className="text-sm font-medium text-gray-900 hover:text-[#374151] cursor-pointer truncate block">
                              {product.name}
                            </span>
                          </Link>
                          {product.category && (
                            <span className="text-xs text-gray-400">{product.category}</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{product.sku || "—"}</td>
                    <td className="px-4 py-3">
                      <div className="text-sm font-medium text-gray-900">
                        ${parseFloat(product.price).toFixed(2)}
                      </div>
                      {product.compareAtPrice && (
                        <div className="text-xs text-gray-400 line-through">
                          ${parseFloat(product.compareAtPrice).toFixed(2)}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-sm ${isLowStock ? "text-amber-600 font-medium" : "text-gray-600"}`}>
                        {product.stock}
                        {isLowStock && <AlertTriangle className="h-3 w-3 inline ml-1" />}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        className={`text-xs rounded-full ${
                          product.status === "active"
                            ? "bg-green-100 text-green-700"
                            : product.status === "draft"
                            ? "bg-gray-100 text-gray-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {product.status || "active"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <Link href={`/dashboard/catalog/${product.id}/edit`}>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                          </Link>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => setDeleteId(product.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Tier limit badge */}
      {countData && (
        <div className="mt-4 text-center">
          <span className="text-xs text-gray-400">
            {countData.count}/{countData.limit === Infinity ? "\u221E" : countData.limit} Products
            {" \u00B7 "}
            {tier} Plan
          </span>
        </div>
      )}

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete product?</AlertDialogTitle>
            <AlertDialogDescription>
              This product will be archived and hidden from your catalog. This action can be reversed by changing the status back to active.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-[7px]">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 rounded-[7px]"
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bulk Delete Confirmation */}
      <AlertDialog open={bulkDeleteOpen} onOpenChange={setBulkDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {selectedIds.size} products?</AlertDialogTitle>
            <AlertDialogDescription>
              These products will be archived and hidden from your catalog.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-[7px]">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 rounded-[7px]"
              onClick={() => bulkDeleteMutation.mutate(Array.from(selectedIds))}
            >
              Delete All
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
