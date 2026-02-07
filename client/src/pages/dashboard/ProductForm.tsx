import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useParams, Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  X,
  GripVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const productFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  price: z.string().min(1, "Price is required").refine(v => !isNaN(parseFloat(v)) && parseFloat(v) >= 0, "Must be a valid price"),
  compareAtPrice: z.string().optional(),
  category: z.string().optional(),
  sku: z.string().optional(),
  stock: z.number().min(0).default(0),
  status: z.string().default("active"),
  trackInventory: z.boolean().default(true),
  lowStockThreshold: z.number().min(0).default(5),
  weight: z.string().optional(),
  weightUnit: z.string().default("lb"),
  taxClass: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  tags: z.string().optional(),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

interface Variant {
  id?: string;
  variantType: string;
  variantValue: string;
  price: string;
  sku: string;
  stockQuantity: number;
}

export default function ProductForm() {
  const params = useParams<{ id: string }>();
  const isEdit = !!params.id;
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [variants, setVariants] = useState<Variant[]>([]);
  const [activeTab, setActiveTab] = useState("general");

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      compareAtPrice: "",
      category: "",
      sku: "",
      stock: 0,
      status: "active",
      trackInventory: true,
      lowStockThreshold: 5,
      weight: "",
      weightUnit: "lb",
      taxClass: "",
      seoTitle: "",
      seoDescription: "",
      tags: "",
    },
  });

  // Fetch existing product for edit mode
  const { data: existingProduct } = useQuery({
    queryKey: ["/api/merchant/products", params.id],
    queryFn: async () => {
      const res = await fetch(`/api/merchant/products/${params.id}`);
      if (!res.ok) throw new Error("Failed to fetch product");
      return res.json();
    },
    enabled: isEdit,
  });

  // Populate form when existing product loads
  useEffect(() => {
    if (existingProduct) {
      form.reset({
        name: existingProduct.name || "",
        description: existingProduct.description || "",
        price: existingProduct.price || "",
        compareAtPrice: existingProduct.compareAtPrice || "",
        category: existingProduct.category || "",
        sku: existingProduct.sku || "",
        stock: existingProduct.stock || 0,
        status: existingProduct.status || "active",
        trackInventory: existingProduct.trackInventory ?? true,
        lowStockThreshold: existingProduct.lowStockThreshold ?? 5,
        weight: existingProduct.weight || "",
        weightUnit: existingProduct.weightUnit || "lb",
        taxClass: existingProduct.taxClass || "",
        seoTitle: existingProduct.seoTitle || "",
        seoDescription: existingProduct.seoDescription || "",
        tags: Array.isArray(existingProduct.tags) ? existingProduct.tags.join(", ") : "",
      });
      setImageUrls(Array.isArray(existingProduct.images) ? existingProduct.images : existingProduct.image ? [existingProduct.image] : []);
      if (existingProduct.variants) {
        setVariants(existingProduct.variants.map((v: any) => ({
          id: v.id,
          variantType: v.variantType || "",
          variantValue: v.variantValue || "",
          price: v.price || "",
          sku: v.sku || "",
          stockQuantity: v.stockQuantity || 0,
        })));
      }
    }
  }, [existingProduct, form]);

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch("/api/merchant/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to create product");
      }
      return res.json();
    },
    onSuccess: async (product) => {
      // Create variants
      for (const v of variants) {
        if (v.variantType && v.variantValue) {
          await fetch(`/api/merchant/products/${product.id}/variants`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(v),
          });
        }
      }
      queryClient.invalidateQueries({ queryKey: ["/api/merchant/products"] });
      toast({ title: "Product created" });
      navigate("/dashboard/catalog");
    },
    onError: (err: Error) => {
      toast({ title: err.message, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch(`/api/merchant/products/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update product");
      return res.json();
    },
    onSuccess: async () => {
      // Manage variants — delete removed, update existing, create new
      if (existingProduct?.variants) {
        const existingIds = new Set(variants.filter(v => v.id).map(v => v.id));
        for (const ev of existingProduct.variants) {
          if (!existingIds.has(ev.id)) {
            await fetch(`/api/merchant/products/variants/${ev.id}`, { method: "DELETE" });
          }
        }
      }
      for (const v of variants) {
        if (v.id) {
          await fetch(`/api/merchant/products/variants/${v.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(v),
          });
        } else if (v.variantType && v.variantValue) {
          await fetch(`/api/merchant/products/${params.id}/variants`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(v),
          });
        }
      }
      queryClient.invalidateQueries({ queryKey: ["/api/merchant/products"] });
      toast({ title: "Product updated" });
      navigate("/dashboard/catalog");
    },
    onError: () => {
      toast({ title: "Failed to update product", variant: "destructive" });
    },
  });

  const onSubmit = (values: ProductFormValues) => {
    const productData = {
      ...values,
      image: imageUrls[0] || null,
      images: imageUrls.length > 0 ? imageUrls : null,
      tags: values.tags ? values.tags.split(",").map(t => t.trim()).filter(Boolean) : null,
      stock: Number(values.stock),
      lowStockThreshold: Number(values.lowStockThreshold),
    };

    if (isEdit) {
      updateMutation.mutate(productData);
    } else {
      createMutation.mutate(productData);
    }
  };

  const addImage = () => {
    if (newImageUrl.trim()) {
      setImageUrls([...imageUrls, newImageUrl.trim()]);
      setNewImageUrl("");
    }
  };

  const removeImage = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  const addVariant = () => {
    setVariants([...variants, { variantType: "", variantValue: "", price: "", sku: "", stockQuantity: 0 }]);
  };

  const updateVariant = (index: number, field: keyof Variant, value: string | number) => {
    const next = [...variants];
    (next[index] as any)[field] = value;
    setVariants(next);
  };

  const removeVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const generateSku = () => {
    const name = form.getValues("name");
    const prefix = name ? name.substring(0, 3).toUpperCase().replace(/[^A-Z]/g, "") : "PRD";
    const num = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
    form.setValue("sku", `${prefix}-${num}`);
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="p-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard/catalog">
          <Button variant="ghost" size="sm" className="rounded-[7px]">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">
            {isEdit ? "Edit Product" : "Add Product"}
          </h1>
        </div>
        <Button
          className="bg-[#374151] hover:bg-[#374151]/90 text-white rounded-[7px]"
          onClick={form.handleSubmit(onSubmit)}
          disabled={isSaving}
        >
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "Saving..." : "Save Product"}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6 bg-gray-100 rounded-[7px]">
          <TabsTrigger value="general" className="rounded-[7px]">General</TabsTrigger>
          <TabsTrigger value="pricing" className="rounded-[7px]">Pricing</TabsTrigger>
          <TabsTrigger value="inventory" className="rounded-[7px]">Inventory</TabsTrigger>
          <TabsTrigger value="shipping" className="rounded-[7px]">Shipping</TabsTrigger>
          <TabsTrigger value="seo" className="rounded-[7px]">SEO</TabsTrigger>
          <TabsTrigger value="variants" className="rounded-[7px]">
            Variants
            {variants.length > 0 && (
              <span className="ml-1 text-xs bg-gray-200 rounded-full px-1.5">{variants.length}</span>
            )}
          </TabsTrigger>
          <TabsTrigger value="images" className="rounded-[7px]">
            Images
            {imageUrls.length > 0 && (
              <span className="ml-1 text-xs bg-gray-200 rounded-full px-1.5">{imageUrls.length}</span>
            )}
          </TabsTrigger>
        </TabsList>

        {/* General Tab */}
        <TabsContent value="general">
          <div className="bg-white border border-gray-200 rounded-[7px] p-6 space-y-4">
            <div>
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                {...form.register("name")}
                className="rounded-[7px] mt-1"
                placeholder="Enter product name"
              />
              {form.formState.errors.name && (
                <p className="text-xs text-red-500 mt-1">{form.formState.errors.name.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...form.register("description")}
                className="rounded-[7px] mt-1 min-h-[120px]"
                placeholder="Describe your product (markdown supported)"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={form.watch("status")}
                  onValueChange={(v) => form.setValue("status", v)}
                >
                  <SelectTrigger className="rounded-[7px] mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  {...form.register("category")}
                  className="rounded-[7px] mt-1"
                  placeholder="e.g., Electronics"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                {...form.register("tags")}
                className="rounded-[7px] mt-1"
                placeholder="Comma-separated tags (e.g., featured, sale, new)"
              />
            </div>
          </div>
        </TabsContent>

        {/* Pricing Tab */}
        <TabsContent value="pricing">
          <div className="bg-white border border-gray-200 rounded-[7px] p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price *</Label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                  <Input
                    id="price"
                    {...form.register("price")}
                    className="rounded-[7px] pl-7"
                    placeholder="0.00"
                    type="number"
                    step="0.01"
                    min="0"
                  />
                </div>
                {form.formState.errors.price && (
                  <p className="text-xs text-red-500 mt-1">{form.formState.errors.price.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="compareAtPrice">Compare-at Price</Label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                  <Input
                    id="compareAtPrice"
                    {...form.register("compareAtPrice")}
                    className="rounded-[7px] pl-7"
                    placeholder="0.00"
                    type="number"
                    step="0.01"
                    min="0"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">Original price shown with strikethrough</p>
              </div>
            </div>
            <div>
              <Label htmlFor="taxClass">Tax Class</Label>
              <Select
                value={form.watch("taxClass") || ""}
                onValueChange={(v) => form.setValue("taxClass", v)}
              >
                <SelectTrigger className="rounded-[7px] mt-1">
                  <SelectValue placeholder="Select tax class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="reduced">Reduced</SelectItem>
                  <SelectItem value="exempt">Tax Exempt</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>

        {/* Inventory Tab */}
        <TabsContent value="inventory">
          <div className="bg-white border border-gray-200 rounded-[7px] p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="sku">SKU</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="sku"
                    {...form.register("sku")}
                    className="rounded-[7px]"
                    placeholder="SKU-001"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="rounded-[7px] whitespace-nowrap"
                    onClick={generateSku}
                  >
                    Auto
                  </Button>
                </div>
              </div>
              <div>
                <Label htmlFor="stock">Stock Quantity</Label>
                <Input
                  id="stock"
                  type="number"
                  min={0}
                  {...form.register("stock", { valueAsNumber: true })}
                  className="rounded-[7px] mt-1"
                />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-[7px]">
              <div>
                <Label>Track Inventory</Label>
                <p className="text-xs text-gray-400">Automatically track stock levels</p>
              </div>
              <Switch
                checked={form.watch("trackInventory")}
                onCheckedChange={(v) => form.setValue("trackInventory", v)}
              />
            </div>
            <div>
              <Label htmlFor="lowStockThreshold">Low Stock Threshold</Label>
              <Input
                id="lowStockThreshold"
                type="number"
                min={0}
                {...form.register("lowStockThreshold", { valueAsNumber: true })}
                className="rounded-[7px] mt-1 max-w-[200px]"
              />
              <p className="text-xs text-gray-400 mt-1">Alert when stock falls below this number</p>
            </div>
          </div>
        </TabsContent>

        {/* Shipping Tab */}
        <TabsContent value="shipping">
          <div className="bg-white border border-gray-200 rounded-[7px] p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="weight">Weight</Label>
                <Input
                  id="weight"
                  {...form.register("weight")}
                  className="rounded-[7px] mt-1"
                  placeholder="0.00"
                  type="number"
                  step="0.01"
                  min="0"
                />
              </div>
              <div>
                <Label htmlFor="weightUnit">Unit</Label>
                <Select
                  value={form.watch("weightUnit")}
                  onValueChange={(v) => form.setValue("weightUnit", v)}
                >
                  <SelectTrigger className="rounded-[7px] mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lb">Pounds (lb)</SelectItem>
                    <SelectItem value="oz">Ounces (oz)</SelectItem>
                    <SelectItem value="kg">Kilograms (kg)</SelectItem>
                    <SelectItem value="g">Grams (g)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* SEO Tab */}
        <TabsContent value="seo">
          <div className="bg-white border border-gray-200 rounded-[7px] p-6 space-y-4">
            <div>
              <Label htmlFor="seoTitle">SEO Title</Label>
              <Input
                id="seoTitle"
                {...form.register("seoTitle")}
                className="rounded-[7px] mt-1"
                placeholder="Product title for search engines"
              />
              <p className="text-xs text-gray-400 mt-1">
                {(form.watch("seoTitle") || "").length}/60 characters recommended
              </p>
            </div>
            <div>
              <Label htmlFor="seoDescription">Meta Description</Label>
              <Textarea
                id="seoDescription"
                {...form.register("seoDescription")}
                className="rounded-[7px] mt-1"
                placeholder="Brief description for search engine results"
              />
              <p className="text-xs text-gray-400 mt-1">
                {(form.watch("seoDescription") || "").length}/160 characters recommended
              </p>
            </div>
            {/* Preview */}
            <div className="p-4 bg-gray-50 rounded-[7px]">
              <p className="text-xs text-gray-400 mb-2">Search Engine Preview</p>
              <p className="text-blue-600 text-sm font-medium">
                {form.watch("seoTitle") || form.watch("name") || "Product Title"}
              </p>
              <p className="text-green-700 text-xs">yourstore.com/products/...</p>
              <p className="text-gray-500 text-xs mt-1">
                {form.watch("seoDescription") || form.watch("description")?.substring(0, 160) || "Product description..."}
              </p>
            </div>
          </div>
        </TabsContent>

        {/* Variants Tab */}
        <TabsContent value="variants">
          <div className="bg-white border border-gray-200 rounded-[7px] p-6">
            {variants.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-sm text-gray-500 mb-4">No variants yet. Add variants for different sizes, colors, etc.</p>
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-[7px]"
                  onClick={addVariant}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Variant
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {variants.map((v, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-[7px]">
                    <GripVertical className="h-4 w-4 text-gray-300 flex-shrink-0" />
                    <Input
                      placeholder="Type (e.g. Size)"
                      value={v.variantType}
                      onChange={(e) => updateVariant(i, "variantType", e.target.value)}
                      className="rounded-[7px] w-28"
                    />
                    <Input
                      placeholder="Value (e.g. Large)"
                      value={v.variantValue}
                      onChange={(e) => updateVariant(i, "variantValue", e.target.value)}
                      className="rounded-[7px] w-28"
                    />
                    <div className="relative w-24">
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">$</span>
                      <Input
                        placeholder="Price"
                        value={v.price}
                        onChange={(e) => updateVariant(i, "price", e.target.value)}
                        className="rounded-[7px] pl-5"
                        type="number"
                        step="0.01"
                      />
                    </div>
                    <Input
                      placeholder="SKU"
                      value={v.sku}
                      onChange={(e) => updateVariant(i, "sku", e.target.value)}
                      className="rounded-[7px] w-28"
                    />
                    <Input
                      placeholder="Stock"
                      value={v.stockQuantity}
                      onChange={(e) => updateVariant(i, "stockQuantity", parseInt(e.target.value) || 0)}
                      className="rounded-[7px] w-20"
                      type="number"
                      min={0}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-red-500"
                      onClick={() => removeVariant(i)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="rounded-[7px]"
                  onClick={addVariant}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Variant
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Images Tab */}
        <TabsContent value="images">
          <div className="bg-white border border-gray-200 rounded-[7px] p-6">
            <div className="flex gap-2 mb-4">
              <Input
                placeholder="Image URL (https://...)"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                className="rounded-[7px]"
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addImage())}
              />
              <Button
                type="button"
                variant="outline"
                className="rounded-[7px]"
                onClick={addImage}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {imageUrls.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4">No images added. The first image will be used as the primary thumbnail.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {imageUrls.map((url, i) => (
                  <div key={i} className="relative group">
                    <div className="aspect-square bg-gray-100 rounded-[7px] overflow-hidden">
                      <img src={url} alt="" className="w-full h-full object-cover" />
                    </div>
                    {i === 0 && (
                      <span className="absolute top-1 left-1 text-xs bg-black/60 text-white px-1.5 py-0.5 rounded">
                        Primary
                      </span>
                    )}
                    <button
                      type="button"
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImage(i)}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
