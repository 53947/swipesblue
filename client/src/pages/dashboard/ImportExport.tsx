import { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";
import {
  Upload,
  Download,
  FileText,
  Check,
  X,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Loader2,
  History,
  FileSpreadsheet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useMerchantAuth } from "@/hooks/use-merchant-auth";
import TierGate from "@/components/TierGate";

const PRODUCT_FIELDS = [
  { key: "name", label: "Name", required: true },
  { key: "sku", label: "SKU" },
  { key: "price", label: "Price", required: true },
  { key: "compareAtPrice", label: "Compare-at Price" },
  { key: "category", label: "Category" },
  { key: "stock", label: "Stock" },
  { key: "status", label: "Status" },
  { key: "description", label: "Description" },
  { key: "weight", label: "Weight" },
  { key: "weightUnit", label: "Weight Unit" },
  { key: "taxClass", label: "Tax Class" },
  { key: "seoTitle", label: "SEO Title" },
  { key: "seoDescription", label: "SEO Description" },
  { key: "tags", label: "Tags" },
  { key: "images", label: "Images" },
];

const AUTO_MAP: Record<string, string> = {
  product_name: "name",
  product: "name",
  title: "name",
  price: "price",
  cost: "price",
  sku: "sku",
  product_sku: "sku",
  compare_at_price: "compareAtPrice",
  compare_price: "compareAtPrice",
  category: "category",
  product_category: "category",
  stock: "stock",
  quantity: "stock",
  inventory: "stock",
  status: "status",
  description: "description",
  product_description: "description",
  weight: "weight",
  weight_unit: "weightUnit",
  tax_class: "taxClass",
  seo_title: "seoTitle",
  seo_description: "seoDescription",
  meta_description: "seoDescription",
  tags: "tags",
  images: "images",
  image: "images",
  image_url: "images",
};

function ImportExportContent() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { canAccess, tier } = useMerchantAuth();
  const [activeTab, setActiveTab] = useState("import");

  // Import state
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<Record<string, string>[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [fieldMapping, setFieldMapping] = useState<Record<string, string>>({});
  const [updateExisting, setUpdateExisting] = useState(false);
  const [importResult, setImportResult] = useState<any>(null);
  const [validationErrors, setValidationErrors] = useState<Array<{ row: number; message: string }>>([]);

  // Export state
  const [exportFormat, setExportFormat] = useState("csv");
  const [exportStatus, setExportStatus] = useState("all");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const f = acceptedFiles[0];
    if (!f) return;
    setFile(f);

    const ext = f.name.split(".").pop()?.toLowerCase();

    if (ext === "csv" || ext === "tsv") {
      Papa.parse(f, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const data = results.data as Record<string, string>[];
          const hdrs = results.meta.fields || [];
          setParsedData(data);
          setHeaders(hdrs);

          // Auto-map fields
          const mapping: Record<string, string> = {};
          for (const h of hdrs) {
            const normalized = h.toLowerCase().replace(/[^a-z0-9]/g, "_").replace(/_+/g, "_");
            if (AUTO_MAP[normalized]) {
              mapping[h] = AUTO_MAP[normalized];
            } else if (AUTO_MAP[h.toLowerCase()]) {
              mapping[h] = AUTO_MAP[h.toLowerCase()];
            }
          }
          setFieldMapping(mapping);
        },
        error: () => {
          toast({ title: "Failed to parse file", variant: "destructive" });
        },
      });
    } else if (ext === "xlsx" || ext === "xls") {
      // Use xlsx library
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const XLSX = await import("xlsx");
          const workbook = XLSX.read(e.target?.result, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const data = XLSX.utils.sheet_to_json<Record<string, string>>(sheet, { defval: "" });
          const hdrs = Object.keys(data[0] || {});
          setParsedData(data);
          setHeaders(hdrs);

          const mapping: Record<string, string> = {};
          for (const h of hdrs) {
            const normalized = h.toLowerCase().replace(/[^a-z0-9]/g, "_").replace(/_+/g, "_");
            if (AUTO_MAP[normalized]) {
              mapping[h] = AUTO_MAP[normalized];
            } else if (AUTO_MAP[h.toLowerCase()]) {
              mapping[h] = AUTO_MAP[h.toLowerCase()];
            }
          }
          setFieldMapping(mapping);
        } catch {
          toast({ title: "Failed to parse Excel file", variant: "destructive" });
        }
      };
      reader.readAsArrayBuffer(f);
    }
  }, [toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
      "text/tab-separated-values": [".tsv"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
      "application/vnd.ms-excel": [".xls"],
    },
    maxSize: 10 * 1024 * 1024,
    multiple: false,
  });

  // Validate step 3
  const validateData = () => {
    const errors: Array<{ row: number; message: string }> = [];
    const mappedProducts = getMappedProducts();

    for (let i = 0; i < mappedProducts.length; i++) {
      const p = mappedProducts[i];
      if (!p.name) errors.push({ row: i + 1, message: "Name is required" });
      if (!p.price || isNaN(parseFloat(p.price as string))) errors.push({ row: i + 1, message: "Price is required and must be a number" });
      if (p.price && parseFloat(p.price as string) < 0) errors.push({ row: i + 1, message: "Price cannot be negative" });
    }

    setValidationErrors(errors);
    return errors;
  };

  const getMappedProducts = (): Record<string, any>[] => {
    return parsedData.map(row => {
      const mapped: Record<string, any> = {};
      for (const [header, field] of Object.entries(fieldMapping)) {
        if (field && field !== "skip") {
          mapped[field] = row[header];
        }
      }
      return mapped;
    });
  };

  const importMutation = useMutation({
    mutationFn: async () => {
      const products = getMappedProducts();
      const res = await fetch("/api/merchant/products/import/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          products,
          fileName: file?.name || "import.csv",
          fileSize: file?.size || 0,
          updateExisting,
        }),
      });
      if (!res.ok) throw new Error("Import failed");
      return res.json();
    },
    onSuccess: (result) => {
      setImportResult(result);
      queryClient.invalidateQueries({ queryKey: ["/api/merchant/products"] });
      queryClient.invalidateQueries({ queryKey: ["/api/merchant/products/count"] });
      toast({ title: "Import complete" });
    },
    onError: () => {
      toast({ title: "Import failed", variant: "destructive" });
    },
  });

  // Import History
  const { data: importHistory = [] } = useQuery<any[]>({
    queryKey: ["/api/merchant/products/import/history"],
    queryFn: async () => {
      const res = await fetch("/api/merchant/products/import/history");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  const handleExport = async () => {
    try {
      const params = new URLSearchParams({ format: exportFormat, status: exportStatus });
      const res = await fetch(`/api/merchant/products/export?${params}`);
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Export failed");
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `products.${exportFormat}`;
      a.click();
      URL.revokeObjectURL(url);
      toast({ title: "Products exported" });
    } catch (err: any) {
      toast({ title: err.message || "Export failed", variant: "destructive" });
    }
  };

  const handleDownloadTemplate = async () => {
    try {
      const res = await fetch("/api/merchant/products/template");
      if (!res.ok) throw new Error("Failed to download");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "product_import_template.csv";
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      toast({ title: "Failed to download template", variant: "destructive" });
    }
  };

  const resetImport = () => {
    setStep(1);
    setFile(null);
    setParsedData([]);
    setHeaders([]);
    setFieldMapping({});
    setUpdateExisting(false);
    setImportResult(null);
    setValidationErrors([]);
  };

  const readyCount = parsedData.length - validationErrors.length;
  const mappedProducts = step >= 3 ? getMappedProducts() : [];

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Import / Export</h1>
        <p className="text-sm text-gray-500 mt-1">Import products from files or export your catalog</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6 bg-gray-100 rounded-[7px]">
          <TabsTrigger value="import" className="rounded-[7px]">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </TabsTrigger>
          <TabsTrigger value="export" className="rounded-[7px]">
            <Download className="h-4 w-4 mr-2" />
            Export
          </TabsTrigger>
          <TabsTrigger value="history" className="rounded-[7px]">
            <History className="h-4 w-4 mr-2" />
            History
          </TabsTrigger>
        </TabsList>

        {/* Import Tab */}
        <TabsContent value="import">
          {/* Step Indicator */}
          <div className="flex items-center gap-2 mb-6">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                    step >= s
                      ? "bg-[#374151] text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step > s ? <Check className="h-4 w-4" /> : s}
                </div>
                <span className="text-xs text-gray-500 ml-2 mr-4 hidden sm:inline">
                  {s === 1 ? "Upload" : s === 2 ? "Map Fields" : s === 3 ? "Preview" : "Import"}
                </span>
                {s < 4 && <div className="w-8 h-0.5 bg-gray-200" />}
              </div>
            ))}
          </div>

          {/* Step 1: Upload */}
          {step === 1 && (
            <div className="bg-white border border-gray-200 rounded-[7px] p-6">
              <div className="mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-[7px]"
                  onClick={handleDownloadTemplate}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Template
                </Button>
              </div>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-[7px] p-12 text-center cursor-pointer transition-colors ${
                  isDragActive ? "border-[#374151] bg-gray-50" : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <input {...getInputProps()} />
                <FileSpreadsheet className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                {isDragActive ? (
                  <p className="text-sm text-gray-600">Drop the file here...</p>
                ) : (
                  <>
                    <p className="text-sm text-gray-600 mb-1">
                      Drag and drop a file here, or click to browse
                    </p>
                    <p className="text-xs text-gray-400">CSV, XLSX, XLS, TSV (max 10MB)</p>
                  </>
                )}
              </div>
              {file && (
                <div className="mt-4 flex items-center justify-between p-3 bg-gray-50 rounded-[7px]">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{file.name}</p>
                      <p className="text-xs text-gray-400">
                        {(file.size / 1024).toFixed(1)} KB
                        {parsedData.length > 0 && ` \u00B7 ${parsedData.length} rows detected`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => { setFile(null); setParsedData([]); setHeaders([]); }}>
                      <X className="h-4 w-4" />
                    </Button>
                    <Button
                      className="bg-[#374151] hover:bg-[#374151]/90 text-white rounded-[7px]"
                      size="sm"
                      onClick={() => setStep(2)}
                      disabled={parsedData.length === 0}
                    >
                      Continue
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Field Mapping */}
          {step === 2 && (
            <div className="bg-white border border-gray-200 rounded-[7px] p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Map your columns</h3>
              <p className="text-sm text-gray-500 mb-6">
                Match each column from your file to a product field. We've auto-detected some mappings.
              </p>
              <div className="space-y-3">
                {headers.map(header => {
                  const sampleValues = parsedData.slice(0, 3).map(r => r[header]).filter(Boolean);
                  return (
                    <div key={header} className="flex items-center gap-4 p-3 bg-gray-50 rounded-[7px]">
                      <div className="w-40 min-w-[160px]">
                        <p className="text-sm font-medium text-gray-900">{header}</p>
                        <p className="text-xs text-gray-400 truncate">
                          {sampleValues.join(", ") || "—"}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-300 flex-shrink-0" />
                      <Select
                        value={fieldMapping[header] || "skip"}
                        onValueChange={(v) => setFieldMapping(prev => ({ ...prev, [header]: v }))}
                      >
                        <SelectTrigger className="w-52 rounded-[7px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="skip">Skip this column</SelectItem>
                          {PRODUCT_FIELDS.map(f => (
                            <SelectItem key={f.key} value={f.key}>
                              {f.label}{f.required ? " *" : ""}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center justify-between mt-6">
                <Button variant="outline" className="rounded-[7px]" onClick={() => setStep(1)}>
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
                <Button
                  className="bg-[#374151] hover:bg-[#374151]/90 text-white rounded-[7px]"
                  onClick={() => { validateData(); setStep(3); }}
                >
                  Preview
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Preview & Validate */}
          {step === 3 && (
            <div className="bg-white border border-gray-200 rounded-[7px] p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview & Validate</h3>

              {/* Summary */}
              <div className="flex gap-4 mb-6">
                <div className="px-4 py-2 bg-green-50 border border-green-200 rounded-[7px]">
                  <span className="text-sm font-medium text-green-700">{readyCount} ready</span>
                </div>
                <div className="px-4 py-2 bg-red-50 border border-red-200 rounded-[7px]">
                  <span className="text-sm font-medium text-red-700">{validationErrors.length} errors</span>
                </div>
                <div className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-[7px]">
                  <span className="text-sm font-medium text-gray-700">{parsedData.length} total</span>
                </div>
              </div>

              {/* Update existing toggle */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-[7px] mb-4">
                <div>
                  <Label className="text-sm font-medium">If SKU exists:</Label>
                  <p className="text-xs text-gray-400">Update existing products with matching SKUs</p>
                </div>
                <Switch checked={updateExisting} onCheckedChange={setUpdateExisting} />
              </div>

              {/* Validation errors */}
              {validationErrors.length > 0 && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-[7px]">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    <span className="text-sm font-medium text-red-700">Validation Errors</span>
                  </div>
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {validationErrors.slice(0, 10).map((err, i) => (
                      <p key={i} className="text-xs text-red-600">
                        Row {err.row}: {err.message}
                      </p>
                    ))}
                    {validationErrors.length > 10 && (
                      <p className="text-xs text-red-500">...and {validationErrors.length - 10} more</p>
                    )}
                  </div>
                </div>
              )}

              {/* Preview table */}
              <div className="overflow-x-auto border border-gray-200 rounded-[7px] mb-6">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[#F6F9FC]">
                      <th className="px-3 py-2 text-left font-semibold text-gray-500">#</th>
                      {PRODUCT_FIELDS.filter(f => Object.values(fieldMapping).includes(f.key)).map(f => (
                        <th key={f.key} className="px-3 py-2 text-left font-semibold text-gray-500">{f.label}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {mappedProducts.slice(0, 10).map((row, i) => {
                      const hasError = validationErrors.some(e => e.row === i + 1);
                      return (
                        <tr key={i} className={hasError ? "bg-red-50" : i % 2 === 1 ? "bg-gray-50" : ""}>
                          <td className="px-3 py-2 text-gray-400">{i + 1}</td>
                          {PRODUCT_FIELDS.filter(f => Object.values(fieldMapping).includes(f.key)).map(f => (
                            <td key={f.key} className="px-3 py-2 text-gray-700 max-w-[200px] truncate">
                              {String(row[f.key] || "—")}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between">
                <Button variant="outline" className="rounded-[7px]" onClick={() => setStep(2)}>
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
                <Button
                  className="bg-[#374151] hover:bg-[#374151]/90 text-white rounded-[7px]"
                  onClick={() => { setStep(4); importMutation.mutate(); }}
                  disabled={readyCount === 0}
                >
                  Import {readyCount} Products
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Execute */}
          {step === 4 && (
            <div className="bg-white border border-gray-200 rounded-[7px] p-6 text-center">
              {importMutation.isPending ? (
                <div className="py-12">
                  <Loader2 className="h-12 w-12 text-[#374151] mx-auto mb-4 animate-spin" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Importing...</h3>
                  <p className="text-sm text-gray-500">Processing your products</p>
                </div>
              ) : importResult ? (
                <div className="py-8">
                  <Check className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Import Complete</h3>
                  <div className="flex justify-center gap-4 mb-6">
                    <div className="px-4 py-2 bg-green-50 border border-green-200 rounded-[7px]">
                      <p className="text-2xl font-bold text-green-700">{importResult.importedCount}</p>
                      <p className="text-xs text-green-600">Imported</p>
                    </div>
                    <div className="px-4 py-2 bg-blue-50 border border-blue-200 rounded-[7px]">
                      <p className="text-2xl font-bold text-blue-700">{importResult.updatedCount}</p>
                      <p className="text-xs text-blue-600">Updated</p>
                    </div>
                    <div className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-[7px]">
                      <p className="text-2xl font-bold text-gray-700">{importResult.skippedCount}</p>
                      <p className="text-xs text-gray-600">Skipped</p>
                    </div>
                    <div className="px-4 py-2 bg-red-50 border border-red-200 rounded-[7px]">
                      <p className="text-2xl font-bold text-red-700">{importResult.errorCount}</p>
                      <p className="text-xs text-red-600">Errors</p>
                    </div>
                  </div>
                  {importResult.errors?.length > 0 && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-[7px] text-left max-w-md mx-auto">
                      <p className="text-sm font-medium text-red-700 mb-2">Errors:</p>
                      <div className="space-y-1 max-h-24 overflow-y-auto">
                        {importResult.errors.slice(0, 5).map((err: any, i: number) => (
                          <p key={i} className="text-xs text-red-600">Row {err.row}: {err.message}</p>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex justify-center gap-3">
                    <a href="/dashboard/catalog">
                      <Button className="bg-[#374151] hover:bg-[#374151]/90 text-white rounded-[7px]">
                        View Products
                      </Button>
                    </a>
                    <Button variant="outline" className="rounded-[7px]" onClick={resetImport}>
                      Import More
                    </Button>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </TabsContent>

        {/* Export Tab */}
        <TabsContent value="export">
          <div className="bg-white border border-gray-200 rounded-[7px] p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Products</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <Label className="mb-2 block">Format</Label>
                <Select value={exportFormat} onValueChange={setExportFormat}>
                  <SelectTrigger className="rounded-[7px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="csv">CSV (Growth+)</SelectItem>
                    <SelectItem value="json" disabled={!canAccess("Scale")}>
                      JSON (Scale+) {!canAccess("Scale") && "🔒"}
                    </SelectItem>
                    <SelectItem value="xml" disabled={!canAccess("Scale")}>
                      XML (Scale+) {!canAccess("Scale") && "🔒"}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="mb-2 block">Filter by Status</Label>
                <Select value={exportStatus} onValueChange={setExportStatus}>
                  <SelectTrigger className="rounded-[7px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Products</SelectItem>
                    <SelectItem value="active">Active Only</SelectItem>
                    <SelectItem value="draft">Draft Only</SelectItem>
                    <SelectItem value="archived">Archived Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button
              className="bg-[#374151] hover:bg-[#374151]/90 text-white rounded-[7px]"
              onClick={handleExport}
            >
              <Download className="h-4 w-4 mr-2" />
              Export Products
            </Button>
          </div>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history">
          <div className="bg-white border border-gray-200 rounded-[7px] overflow-hidden">
            {importHistory.length === 0 ? (
              <div className="p-12 text-center">
                <History className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-sm text-gray-500">No import history yet</p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="bg-[#F6F9FC] border-b border-gray-200">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">File</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Imported</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Errors</th>
                  </tr>
                </thead>
                <tbody>
                  {importHistory.map((record: any) => (
                    <tr key={record.id} className="border-b border-gray-100">
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {new Date(record.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">{record.fileName}</td>
                      <td className="px-4 py-3">
                        <Badge className={`text-xs ${
                          record.status === "completed" ? "bg-green-100 text-green-700" :
                          record.status === "failed" ? "bg-red-100 text-red-700" :
                          "bg-gray-100 text-gray-600"
                        }`}>
                          {record.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {record.importedCount || 0}
                        {record.updatedCount > 0 && ` (${record.updatedCount} updated)`}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{record.errorCount || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function ImportExport() {
  return (
    <TierGate
      requiredTier="Growth"
      featureName="Import / Export"
      featureDescription="Import products from CSV/Excel or export your catalog."
    >
      <ImportExportContent />
    </TierGate>
  );
}
