import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface OrderSummaryProps {
  subtotal: number;
  tax?: number;
  shipping?: number;
  discount?: number;
  onCheckout?: () => void;
  ctaText?: string;
  showCta?: boolean;
}

export default function OrderSummary({ 
  subtotal, 
  tax = 0, 
  shipping = 0, 
  discount = 0, 
  onCheckout,
  ctaText = "Proceed to Checkout",
  showCta = true 
}: OrderSummaryProps) {
  const total = subtotal + tax + shipping - discount;

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span data-testid="text-subtotal">${subtotal.toFixed(2)}</span>
          </div>
          {tax > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax</span>
              <span data-testid="text-tax">${tax.toFixed(2)}</span>
            </div>
          )}
          {shipping > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span data-testid="text-shipping">${shipping.toFixed(2)}</span>
            </div>
          )}
          {discount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Discount</span>
              <span style={{ color: "#10B981" }} data-testid="text-discount">-${discount.toFixed(2)}</span>
            </div>
          )}
        </div>

        <Separator />

        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span style={{ color: "#1844A6" }} data-testid="text-total">${total.toFixed(2)}</span>
        </div>

        {showCta && (
          <Button 
            className="w-full" 
            style={{ backgroundColor: "#1844A6", color: "white" }}
            onClick={onCheckout}
            data-testid="button-checkout"
          >
            {ctaText}
          </Button>
        )}

        <div className="pt-4 space-y-2 text-xs text-muted-foreground text-center">
          <p>🔒 Secure payment powered by NMI</p>
          <p>PCI-DSS compliant</p>
        </div>
      </CardContent>
    </Card>
  );
}
