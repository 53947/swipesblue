import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, DollarSign, Percent, History, Calculator } from "lucide-react";

interface Rate {
  id: string;
  tierName: string;
  tierType: string;
  monthlyFee: string;
  transactionPercent: string;
  transactionFlat: string;
  description: string | null;
  features: string[] | null;
  isActive: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

interface CostBaseline {
  id: string;
  name: string;
  description: string | null;
  percentCost: string | null;
  flatCost: string | null;
  targetMarginPercent: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

interface AuditLog {
  id: string;
  action: string;
  tableName: string;
  recordId: string;
  previousValues: Record<string, unknown> | null;
  newValues: Record<string, unknown> | null;
  changedBy: string | null;
  reason: string | null;
  createdAt: string;
}

export default function RateManagement() {
  const { toast } = useToast();
  const [editingRate, setEditingRate] = useState<Rate | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const { data: rates = [], isLoading: ratesLoading } = useQuery<Rate[]>({
    queryKey: ["/api/admin/rates"],
  });

  const { data: costs = [], isLoading: costsLoading } = useQuery<CostBaseline[]>({
    queryKey: ["/api/admin/costs"],
  });

  const { data: auditLogs = [] } = useQuery<AuditLog[]>({
    queryKey: ["/api/admin/rates/audit"],
  });

  const createRateMutation = useMutation({
    mutationFn: async (data: Partial<Rate>) => {
      return apiRequest("POST", "/api/admin/rates", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/rates"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/rates/audit"] });
      toast({ title: "Rate created successfully" });
      setIsAddDialogOpen(false);
    },
    onError: () => {
      toast({ title: "Failed to create rate", variant: "destructive" });
    },
  });

  const updateRateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Rate> }) => {
      return apiRequest("PATCH", `/api/admin/rates/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/rates"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/rates/audit"] });
      toast({ title: "Rate updated successfully" });
      setEditingRate(null);
    },
    onError: () => {
      toast({ title: "Failed to update rate", variant: "destructive" });
    },
  });

  const deleteRateMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/admin/rates/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/rates"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/rates/audit"] });
      toast({ title: "Rate deleted successfully" });
    },
    onError: () => {
      toast({ title: "Failed to delete rate", variant: "destructive" });
    },
  });

  const ecommerceRates = rates.filter(r => r.tierType === "ecommerce");
  const developerRates = rates.filter(r => r.tierType === "developer");

  const RateForm = ({ rate, onSubmit, onCancel, isNew = false }: {
    rate?: Rate | null;
    onSubmit: (data: Partial<Rate>) => void;
    onCancel: () => void;
    isNew?: boolean;
  }) => {
    const [formData, setFormData] = useState({
      tierName: rate?.tierName || "",
      tierType: rate?.tierType || "ecommerce",
      monthlyFee: rate?.monthlyFee || "0",
      transactionPercent: rate?.transactionPercent || "2.9",
      transactionFlat: rate?.transactionFlat || "0.30",
      description: rate?.description || "",
      features: rate?.features?.join("\n") || "",
      isActive: rate?.isActive ?? true,
      displayOrder: rate?.displayOrder || 0,
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit({
        tierName: formData.tierName,
        tierType: formData.tierType,
        monthlyFee: formData.monthlyFee,
        transactionPercent: formData.transactionPercent,
        transactionFlat: formData.transactionFlat,
        description: formData.description || null,
        features: formData.features ? formData.features.split("\n").filter(f => f.trim()) : null,
        isActive: formData.isActive,
        displayOrder: formData.displayOrder,
      });
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="tierName">Tier Name</Label>
            <Input
              id="tierName"
              value={formData.tierName}
              onChange={(e) => setFormData({ ...formData, tierName: e.target.value })}
              placeholder="e.g., FREE, Starter, Pro"
              required
              data-testid="input-tier-name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tierType">Tier Type</Label>
            <Select
              value={formData.tierType}
              onValueChange={(v) => setFormData({ ...formData, tierType: v })}
            >
              <SelectTrigger data-testid="select-tier-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ecommerce">E-Commerce</SelectItem>
                <SelectItem value="developer">Developer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="monthlyFee">Monthly Fee ($)</Label>
            <Input
              id="monthlyFee"
              type="number"
              step="0.01"
              value={formData.monthlyFee}
              onChange={(e) => setFormData({ ...formData, monthlyFee: e.target.value })}
              data-testid="input-monthly-fee"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="transactionPercent">Transaction %</Label>
            <Input
              id="transactionPercent"
              type="number"
              step="0.001"
              value={formData.transactionPercent}
              onChange={(e) => setFormData({ ...formData, transactionPercent: e.target.value })}
              data-testid="input-transaction-percent"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="transactionFlat">Per Transaction ($)</Label>
            <Input
              id="transactionFlat"
              type="number"
              step="0.01"
              value={formData.transactionFlat}
              onChange={(e) => setFormData({ ...formData, transactionFlat: e.target.value })}
              data-testid="input-transaction-flat"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Brief description of this tier"
            data-testid="input-description"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="features">Features (one per line)</Label>
          <Textarea
            id="features"
            value={formData.features}
            onChange={(e) => setFormData({ ...formData, features: e.target.value })}
            placeholder="Unlimited products&#10;Priority support&#10;Advanced analytics"
            rows={4}
            data-testid="textarea-features"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Switch
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(v) => setFormData({ ...formData, isActive: v })}
              data-testid="switch-is-active"
            />
            <Label htmlFor="isActive">Active</Label>
          </div>
          <div className="space-y-2">
            <Label htmlFor="displayOrder">Display Order</Label>
            <Input
              id="displayOrder"
              type="number"
              className="w-20"
              value={formData.displayOrder}
              onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
              data-testid="input-display-order"
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline" onClick={onCancel} data-testid="button-cancel">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" data-testid="button-save-rate">
            {isNew ? "Create Rate" : "Save Changes"}
          </Button>
        </DialogFooter>
      </form>
    );
  };

  const RateCard = ({ rate }: { rate: Rate }) => (
    <Card className="relative" data-testid={`card-rate-${rate.id}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg">{rate.tierName}</CardTitle>
            {!rate.isActive && (
              <Badge variant="secondary" className="text-xs">Inactive</Badge>
            )}
          </div>
          <div className="flex gap-1">
            <Dialog open={editingRate?.id === rate.id} onOpenChange={(open) => !open && setEditingRate(null)}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setEditingRate(rate)}
                  data-testid={`button-edit-rate-${rate.id}`}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Edit Rate: {rate.tierName}</DialogTitle>
                  <DialogDescription>
                    Update the pricing configuration for this tier.
                  </DialogDescription>
                </DialogHeader>
                <RateForm
                  rate={rate}
                  onSubmit={(data) => updateRateMutation.mutate({ id: rate.id, data })}
                  onCancel={() => setEditingRate(null)}
                />
              </DialogContent>
            </Dialog>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                if (confirm(`Delete rate "${rate.tierName}"?`)) {
                  deleteRateMutation.mutate(rate.id);
                }
              }}
              data-testid={`button-delete-rate-${rate.id}`}
            >
              <Trash2 className="h-4 w-4 text-swipes-muted-red" />
            </Button>
          </div>
        </div>
        <CardDescription>
          {rate.tierType === "ecommerce" ? "E-Commerce Suite" : "Developer API"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-swipes-pro-gray">
              <DollarSign className="h-4 w-4" />
              Monthly Fee
            </div>
            <span className="font-semibold text-swipes-black">
              ${parseFloat(rate.monthlyFee).toFixed(2)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-swipes-pro-gray">
              <Percent className="h-4 w-4" />
              Transaction Rate
            </div>
            <span className="font-semibold text-swipes-black">
              {parseFloat(rate.transactionPercent).toFixed(2)}% + ${parseFloat(rate.transactionFlat).toFixed(2)}
            </span>
          </div>
          {rate.description && (
            <p className="text-sm text-swipes-pro-gray mt-2 pt-2 border-t">
              {rate.description}
            </p>
          )}
          {rate.features && Array.isArray(rate.features) && rate.features.length > 0 && (
            <div className="mt-2 pt-2 border-t">
              <p className="text-xs font-medium text-swipes-pro-gray mb-1">Features:</p>
              <ul className="text-xs text-swipes-pro-gray space-y-0.5">
                {rate.features.slice(0, 3).map((f, i) => (
                  <li key={i}>• {f}</li>
                ))}
                {rate.features.length > 3 && (
                  <li className="text-swipes-blue-deep">+{rate.features.length - 3} more</li>
                )}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  if (ratesLoading || costsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-swipes-pro-gray">Loading rates...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6" data-testid="page-rate-management">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-swipes-black mb-2">Rate Management</h1>
          <p className="text-swipes-pro-gray">Configure transaction rates and fees for all pricing tiers.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-add-rate">
              <Plus className="h-4 w-4 mr-2" />
              Add Rate
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Create New Rate</DialogTitle>
              <DialogDescription>
                Add a new pricing tier for the platform.
              </DialogDescription>
            </DialogHeader>
            <RateForm
              isNew
              onSubmit={(data) => createRateMutation.mutate(data)}
              onCancel={() => setIsAddDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="ecommerce" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="ecommerce" className="gap-2" data-testid="tab-ecommerce">
            <DollarSign className="h-4 w-4" />
            E-Commerce ({ecommerceRates.length})
          </TabsTrigger>
          <TabsTrigger value="developer" className="gap-2" data-testid="tab-developer">
            <Calculator className="h-4 w-4" />
            Developer ({developerRates.length})
          </TabsTrigger>
          <TabsTrigger value="costs" className="gap-2" data-testid="tab-costs">
            <Percent className="h-4 w-4" />
            Base Costs ({costs.length})
          </TabsTrigger>
          <TabsTrigger value="audit" className="gap-2" data-testid="tab-audit">
            <History className="h-4 w-4" />
            Audit Log
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ecommerce">
          {ecommerceRates.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-swipes-pro-gray">
                No e-commerce rates configured. Click "Add Rate" to create one.
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ecommerceRates.map((rate) => (
                <RateCard key={rate.id} rate={rate} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="developer">
          {developerRates.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-swipes-pro-gray">
                No developer rates configured. Click "Add Rate" to create one.
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {developerRates.map((rate) => (
                <RateCard key={rate.id} rate={rate} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="costs">
          <Card>
            <CardHeader>
              <CardTitle>Base Cost Configuration</CardTitle>
              <CardDescription>
                These are your underlying costs from the payment processor (NMI). 
                Use these to calculate your profit margins.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {costs.length === 0 ? (
                <p className="text-swipes-pro-gray text-center py-4">
                  No base costs configured yet.
                </p>
              ) : (
                <div className="space-y-4">
                  {costs.map((cost) => (
                    <div key={cost.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-swipes-black">{cost.name}</p>
                        {cost.description && (
                          <p className="text-sm text-swipes-pro-gray">{cost.description}</p>
                        )}
                      </div>
                      <div className="text-right">
                        {cost.percentCost && (
                          <p className="text-sm">{parseFloat(cost.percentCost).toFixed(3)}%</p>
                        )}
                        {cost.flatCost && (
                          <p className="text-sm">${parseFloat(cost.flatCost).toFixed(2)}</p>
                        )}
                        {cost.targetMarginPercent && (
                          <p className="text-xs text-swipes-green">
                            Target: {parseFloat(cost.targetMarginPercent).toFixed(2)}% margin
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit">
          <Card>
            <CardHeader>
              <CardTitle>Rate Change History</CardTitle>
              <CardDescription>
                All changes to pricing rates are logged here for compliance and auditing.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {auditLogs.length === 0 ? (
                <p className="text-swipes-pro-gray text-center py-4">
                  No rate changes recorded yet.
                </p>
              ) : (
                <div className="space-y-2">
                  {auditLogs.map((log) => (
                    <div key={log.id} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg text-sm">
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={log.action === "create" ? "default" : log.action === "delete" ? "destructive" : "secondary"}
                            className="text-xs"
                          >
                            {log.action.toUpperCase()}
                          </Badge>
                          <span className="font-medium">{log.tableName}</span>
                        </div>
                        <p className="text-swipes-pro-gray mt-1">
                          Record: {log.recordId.substring(0, 8)}...
                          {log.changedBy && ` by ${log.changedBy}`}
                        </p>
                      </div>
                      <span className="text-xs text-swipes-pro-gray">
                        {new Date(log.createdAt).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
