import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { useState } from "react";
import { useCollectJs } from "@/hooks/use-collectjs";

interface PaymentFormProps {
  onSubmit?: (data: { paymentToken: string; cardholderName: string }) => void;
  isProcessing?: boolean;
}

export default function PaymentForm({ onSubmit, isProcessing }: PaymentFormProps) {
  const { isReady, error: collectError, requestToken } = useCollectJs();
  const [cardholderName, setCardholderName] = useState("");
  const [tokenError, setTokenError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isReady || isProcessing) return;

    setTokenError(null);
    try {
      const response = await requestToken();
      onSubmit?.({ paymentToken: response.token, cardholderName });
    } catch (err) {
      setTokenError(err instanceof Error ? err.message : "Tokenization failed");
    }
  };

  if (collectError) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <Lock className="h-8 w-8 mx-auto text-gray-300 mb-3" />
          <p className="text-sm text-muted-foreground">{collectError}</p>
        </CardContent>
      </Card>
    );
  }

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
            <Label>Card Number</Label>
            <div id="collect-ccnumber" className="h-10" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardholderName">Cardholder Name</Label>
            <Input
              id="cardholderName"
              placeholder="John Doe"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
              required
              disabled={isProcessing}
              data-testid="input-card-name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Expiry Date</Label>
              <div id="collect-ccexp" className="h-10" />
            </div>

            <div className="space-y-2">
              <Label>CVV</Label>
              <div id="collect-cvv" className="h-10" />
            </div>
          </div>

          {tokenError && (
            <p className="text-sm text-red-600">{tokenError}</p>
          )}

          <Button
            type="submit"
            className="w-full"
            style={{ backgroundColor: "#1844A6", color: "white" }}
            disabled={isProcessing || !isReady}
            data-testid="button-place-order"
          >
            {isProcessing ? "Processing..." : !isReady ? "Loading payment form..." : "Place Order"}
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
