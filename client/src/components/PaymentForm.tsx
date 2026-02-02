import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { useState } from "react";

interface PaymentFormProps {
  onSubmit?: (data: any) => void;
  isProcessing?: boolean;
}

export default function PaymentForm({ onSubmit, isProcessing }: PaymentFormProps) {
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lock className="h-5 w-5" style={{ color: "#1844A6" }} />
          Payment Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={formData.cardNumber}
              onChange={(e) => handleChange("cardNumber", e.target.value)}
              required
              disabled={isProcessing}
              data-testid="input-card-number"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardName">Cardholder Name</Label>
            <Input
              id="cardName"
              placeholder="John Doe"
              value={formData.cardName}
              onChange={(e) => handleChange("cardName", e.target.value)}
              required
              disabled={isProcessing}
              data-testid="input-card-name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input
                id="expiry"
                placeholder="MM/YY"
                value={formData.expiry}
                onChange={(e) => handleChange("expiry", e.target.value)}
                required
                disabled={isProcessing}
                data-testid="input-expiry"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                placeholder="123"
                type="password"
                maxLength={4}
                value={formData.cvv}
                onChange={(e) => handleChange("cvv", e.target.value)}
                required
                disabled={isProcessing}
                data-testid="input-cvv"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            style={{ backgroundColor: "#1844A6", color: "white" }}
            disabled={isProcessing}
            data-testid="button-place-order"
          >
            {isProcessing ? "Processing..." : "Place Order"}
          </Button>

          <div className="pt-4 text-xs text-muted-foreground space-y-1">
            <p className="flex items-center gap-2">
              <Lock className="h-3 w-3" />
              Your payment information is encrypted and secure
            </p>
            <p>Powered by NMI - PCI-DSS Level 1 Compliant</p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
