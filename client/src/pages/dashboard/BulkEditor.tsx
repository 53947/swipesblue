import { useState, useCallback, useRef, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import {
  Search,
  Save,
  Trash2,
  Undo2,
  Plus,
  Filter,
  ImageIcon,
  ChevronDown,
  ChevronUp,
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
import TierGate from "@/components/TierGate";

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
  tags: string[] | null;
  updatedAt: string | null;
}

type CellKey = `${string}.${string}`;

interface EditingCell {
  rowId: string;
  field: string;
}

function EditableCell({
  value,
  rowId,
  field,
  type = "text",
  options,
  onChange,
  editingCell,
  setEditingCell,
  isModified,
}: {
  value: string | number;
  rowId: string;
  field: string;
  type?: "text" | "number" | "select";
  options?: { value: string; label: string }[];
  onChange: (rowId: string, field: string, value: string | number) => void;
  editingCell: EditingCell | null;
  setEditingCell: (cell: EditingCell | null) => void;
  isModified: boolean;
}) {
  const isEditing = editingCell?.rowId === rowId && editingCell?.field === field;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  if (isEditing) {
    if (type === "select" && options) {
      return (
        <Select
          value={String(value)}
          onValueChange={(v) => {
            onChange(rowId, field, v);
            setEditingCell(null);
          }}
        >
          <SelectTrigger className="h-8 text-xs rounded-[7px] border-blue-400">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {options.map(o => (
              <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }

    return (
      <Input
        ref={inputRef}
        type={type}
        value={value}
        onChange={(e) => onChange(rowId, field, type === "number" ? e.target.value : e.target.value)}
        onBlur={() => setEditingCell(null)}
        onKeyDown={(e) => {
          if (e.key === "Escape") setEditingCell(null);
          if (e.key === "Enter" || e.key === "Tab") {
            e.preventDefault();
            setEditingCell(null);
          }
        }}
        className="h-8 text-xs rounded-[7px] border-blue-400"
        step={type === "number" ? "0.01" : undefined}
        min={type === "number" ? "0" : undefined}
      />
    );
  }

  return (
    <div
      className={`cursor-pointer px-2 py-1 rounded text-xs min-h-[28px] flex items-center hover:bg-blue-50 transition-colors ${
        isModified ? "bg-yellow-50 border border-yellow-200" : ""
      }`}
      onClick={() => setEditingCell({ rowId, field })}
    >
      {value || <span className="text-gray-300">—</span>}
    </div>
  );
}

function BulkEditorContent() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { canAccess } = useMerchantAuth();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [editingCell, setEditingCell] = useState<EditingCell | null>(null);
  const [pendingChanges, setPendingChanges] = useState<Map<string, Record<string, string | number>>>(new Map());
  const [changeHistory, setChangeHistory] = useState<Array<{ rowId: string; field: string; oldValue: string | number }>>([]);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [localProducts, setLocalProducts] = useState<Product[]>([]);

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/merchant/products"],
    queryFn: async () => {
      const res = await fetch("/api/merchant/products");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  // Sync local state when products load
  useEffect(() => {
    setLocalProducts(products);
  }, [products]);

  const handleCellChange = useCallback((rowId: string, field: string, value: string | number) => {
    // Save old value to history
    const product = localProducts.find(p => p.id === rowId);
    if (product) {
      const oldValue = (product as any)[field];
      setChangeHistory(prev => [...prev, { rowId, field, oldValue }]);
    }

    // Update pending changes
    setPendingChanges(prev => {
      const next = new Map(prev);
      const existing = next.get(rowId) || {};
      next.set(rowId, { ...existing, [field]: value });
      return next;
    });

    // Update local display
    setLocalProducts(prev =>
      prev.map(p => p.id === rowId ? { ...p, [field]: value } : p)
    );
  }, [localProducts]);

  const handleUndo = useCallback(() => {
    if (changeHistory.length === 0) return;
    const last = changeHistory[changeHistory.length - 1];
    setChangeHistory(prev => prev.slice(0, -1));

    // Revert the local product
    setLocalProducts(prev =>
      prev.map(p => p.id === last.rowId ? { ...p, [last.field]: last.oldValue } : p)
    );

    // Update pending changes
    setPendingChanges(prev => {
      const next = new Map(prev);
      const changes = next.get(last.rowId);
      if (changes) {
        delete changes[last.field];
        if (Object.keys(changes).length === 0) {
          next.delete(last.rowId);
        } else {
          next.set(last.rowId, changes);
        }
      }
      return next;
    });
  }, [changeHistory]);

  // Keyboard shortcut: Ctrl+Z
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        e.preventDefault();
        handleUndo();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleUndo]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      const updates = Array.from(pendingChanges.entries()).map(([id, data]) => ({ id, data }));
      const res = await fetch("/api/merchant/products/bulk-update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updates }),
      });
      if (!res.ok) throw new Error("Failed to save");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/merchant/products"] });
      setPendingChanges(new Map());
      setChangeHistory([]);
      toast({ title: "Changes saved" });
    },
    onError: () => {
      toast({ title: "Failed to save changes", variant: "destructive" });
    },
  });

  const bulkDeleteMutation = useMutation({
    mutationFn: async (ids: string[]) => {
      const res = await fetch("/api/merchant/products/bulk-delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      });
      if (!res.ok) throw new Error("Failed to delete");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/merchant/products"] });
      queryClient.invalidateQueries({ queryKey: ["/api/merchant/products/count"] });
      setSelectedRows(new Set());
      setDeleteDialogOpen(false);
      toast({ title: "Products deleted" });
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
      setSelectedRows(new Set());
      toast({ title: "Status updated" });
    },
  });

  const addNewRow = () => {
    // Navigate to create form
    window.location.href = "/dashboard/catalog/create";
  };

  const isCellModified = (rowId: string, field: string): boolean => {
    return pendingChanges.has(rowId) && field in (pendingChanges.get(rowId) || {});
  };

  const toggleRow = (id: string) => {
    const next = new Set(selectedRows);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedRows(next);
  };

  const toggleAll = () => {
    if (selectedRows.size === filteredProducts.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(filteredProducts.map(p => p.id)));
    }
  };

  // Filter products
  let filteredProducts = localProducts;
  if (statusFilter !== "all") {
    filteredProducts = filteredProducts.filter(p => p.status === statusFilter);
  }
  if (categoryFilter !== "all") {
    filteredProducts = filteredProducts.filter(p => p.category === categoryFilter);
  }

  const categories = Array.from(new Set(localProducts.map(p => p.category).filter(Boolean))) as string[];

  const columns: ColumnDef<Product>[] = [
    {
      id: "select",
      header: () => (
        <input
          type="checkbox"
          checked={selectedRows.size === filteredProducts.length && filteredProducts.length > 0}
          onChange={toggleAll}
          className="rounded"
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={selectedRows.has(row.original.id)}
          onChange={() => toggleRow(row.original.id)}
          className="rounded"
        />
      ),
      size: 40,
    },
    {
      accessorKey: "image",
      header: "",
      cell: ({ row }) => {
        const src = row.original.images?.[0] || row.original.image;
        return (
          <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center overflow-hidden">
            {src ? (
              <img src={src} alt="" className="w-full h-full object-cover" />
            ) : (
              <ImageIcon className="h-3 w-3 text-gray-300" />
            )}
          </div>
        );
      },
      size: 48,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <EditableCell
          value={row.original.name}
          rowId={row.original.id}
          field="name"
          onChange={handleCellChange}
          editingCell={editingCell}
          setEditingCell={setEditingCell}
          isModified={isCellModified(row.original.id, "name")}
        />
      ),
      size: 200,
    },
    {
      accessorKey: "sku",
      header: "SKU",
      cell: ({ row }) => (
        <EditableCell
          value={row.original.sku || ""}
          rowId={row.original.id}
          field="sku"
          onChange={handleCellChange}
          editingCell={editingCell}
          setEditingCell={setEditingCell}
          isModified={isCellModified(row.original.id, "sku")}
        />
      ),
      size: 120,
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => (
        <EditableCell
          value={row.original.price}
          rowId={row.original.id}
          field="price"
          type="number"
          onChange={handleCellChange}
          editingCell={editingCell}
          setEditingCell={setEditingCell}
          isModified={isCellModified(row.original.id, "price")}
        />
      ),
      size: 100,
    },
    {
      accessorKey: "compareAtPrice",
      header: "Compare At",
      cell: ({ row }) => (
        <EditableCell
          value={row.original.compareAtPrice || ""}
          rowId={row.original.id}
          field="compareAtPrice"
          type="number"
          onChange={handleCellChange}
          editingCell={editingCell}
          setEditingCell={setEditingCell}
          isModified={isCellModified(row.original.id, "compareAtPrice")}
        />
      ),
      size: 100,
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
        <EditableCell
          value={row.original.category || ""}
          rowId={row.original.id}
          field="category"
          onChange={handleCellChange}
          editingCell={editingCell}
          setEditingCell={setEditingCell}
          isModified={isCellModified(row.original.id, "category")}
        />
      ),
      size: 120,
    },
    {
      accessorKey: "stock",
      header: "Stock",
      cell: ({ row }) => (
        <EditableCell
          value={row.original.stock}
          rowId={row.original.id}
          field="stock"
          type="number"
          onChange={handleCellChange}
          editingCell={editingCell}
          setEditingCell={setEditingCell}
          isModified={isCellModified(row.original.id, "stock")}
        />
      ),
      size: 80,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <EditableCell
          value={row.original.status || "active"}
          rowId={row.original.id}
          field="status"
          type="select"
          options={[
            { value: "active", label: "Active" },
            { value: "draft", label: "Draft" },
            { value: "archived", label: "Archived" },
          ]}
          onChange={handleCellChange}
          editingCell={editingCell}
          setEditingCell={setEditingCell}
          isModified={isCellModified(row.original.id, "status")}
        />
      ),
      size: 100,
    },
    {
      accessorKey: "updatedAt",
      header: "Updated",
      cell: ({ row }) => (
        <span className="text-xs text-gray-400">
          {row.original.updatedAt
            ? new Date(row.original.updatedAt).toLocaleDateString()
            : "—"}
        </span>
      ),
      size: 90,
    },
  ];

  const table = useReactTable({
    data: filteredProducts,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const totalChanges = pendingChanges.size;

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3" />
          <div className="h-64 bg-gray-100 rounded-[7px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bulk Editor</h1>
          <p className="text-sm text-gray-500 mt-1">Edit products in a spreadsheet-style view</p>
        </div>
        <div className="flex items-center gap-3">
          {totalChanges > 0 && (
            <span className="text-sm text-amber-600 font-medium">
              {totalChanges} unsaved change{totalChanges !== 1 ? "s" : ""}
            </span>
          )}
          {totalChanges === 0 && localProducts.length > 0 && (
            <span className="text-sm text-green-600">All changes saved</span>
          )}
          <Button
            variant="outline"
            size="sm"
            className="rounded-[7px]"
            onClick={handleUndo}
            disabled={changeHistory.length === 0}
          >
            <Undo2 className="h-4 w-4 mr-1" />
            Undo
          </Button>
          <Button
            className="bg-[#374151] hover:bg-[#374151]/90 text-white rounded-[7px]"
            onClick={() => saveMutation.mutate()}
            disabled={totalChanges === 0 || saveMutation.isPending}
          >
            <Save className="h-4 w-4 mr-2" />
            {saveMutation.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search products..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-9 rounded-[7px]"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[130px] rounded-[7px]">
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
          <SelectTrigger className="w-[140px] rounded-[7px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(c => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm" className="rounded-[7px]" onClick={addNewRow}>
          <Plus className="h-4 w-4 mr-1" />
          Add Row
        </Button>
      </div>

      {/* Bulk Actions */}
      {selectedRows.size > 0 && (
        <div className="flex items-center gap-3 mb-4 p-3 bg-blue-50 border border-blue-200 rounded-[7px]">
          <span className="text-sm font-medium text-blue-700">{selectedRows.size} selected</span>
          <Button
            variant="outline"
            size="sm"
            className="rounded-[7px]"
            onClick={() => setDeleteDialogOpen(true)}
          >
            <Trash2 className="h-3 w-3 mr-1" />
            Delete ({selectedRows.size})
          </Button>
          <Select
            onValueChange={(v) => bulkStatusMutation.mutate({ ids: Array.from(selectedRows), status: v })}
          >
            <SelectTrigger className="w-[130px] h-8 rounded-[7px]">
              <SelectValue placeholder="Set Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="ghost" size="sm" onClick={() => setSelectedRows(new Set())}>
            Clear
          </Button>
        </div>
      )}

      {/* Spreadsheet Table (hidden on mobile) */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-[7px] p-12 text-center">
          <p className="text-gray-500">No products to edit. Add products first.</p>
        </div>
      ) : (
        <div className="hidden md:block bg-white border border-gray-200 rounded-[7px] overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id} className="bg-[#F6F9FC] border-b border-gray-200 sticky top-0 z-10">
                  {headerGroup.headers.map(header => (
                    <th
                      key={header.id}
                      className="px-3 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase cursor-pointer select-none"
                      style={{ width: header.column.getSize() }}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center gap-1">
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getIsSorted() === "asc" && <ChevronUp className="h-3 w-3" />}
                        {header.column.getIsSorted() === "desc" && <ChevronDown className="h-3 w-3" />}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row, i) => (
                <tr
                  key={row.id}
                  className={`border-b border-gray-100 ${
                    selectedRows.has(row.original.id)
                      ? "bg-[#EBF0FF]"
                      : i % 2 === 1
                      ? "bg-[#FAFBFC]"
                      : "bg-white"
                  }`}
                >
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-3 py-1.5" style={{ width: cell.column.getSize() }}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Mobile Card View */}
      <div className="md:hidden mt-4 space-y-3">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white border border-gray-200 rounded-[7px] p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center overflow-hidden">
                {product.images?.[0] || product.image ? (
                  <img src={product.images?.[0] || product.image || ""} alt="" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="h-4 w-4 text-gray-300" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                <p className="text-xs text-gray-400">{product.sku || "No SKU"}</p>
              </div>
              <Badge className={`text-xs ${product.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                {product.status}
              </Badge>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <span className="text-gray-400">Price</span>
                <p className="font-medium">${parseFloat(product.price).toFixed(2)}</p>
              </div>
              <div>
                <span className="text-gray-400">Stock</span>
                <p className="font-medium">{product.stock}</p>
              </div>
              <div>
                <span className="text-gray-400">Category</span>
                <p className="font-medium">{product.category || "—"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bulk Delete Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {selectedRows.size} products?</AlertDialogTitle>
            <AlertDialogDescription>
              These products will be archived and hidden from your catalog.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-[7px]">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 rounded-[7px]"
              onClick={() => bulkDeleteMutation.mutate(Array.from(selectedRows))}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default function BulkEditor() {
  return (
    <TierGate
      requiredTier="Starter"
      featureName="Bulk Editor"
      featureDescription="Edit multiple products at once with a spreadsheet-style interface."
    >
      <BulkEditorContent />
    </TierGate>
  );
}
