import { useState } from "react";
import CheckoutProgress from "@/components/CheckoutProgress";
import PaymentForm from "@/components/PaymentForm";
import OrderSummary from "@/components/OrderSummary";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

export default function Checkout() {
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    email: "",
    fullName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const subtotal = 849.96;
  const tax = subtotal * 0.09;
  const shipping = 15.00;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Shipping info submitted:', shippingInfo);
    setCurrentStep(2);
  };

  const handlePaymentSubmit = (data: any) => {
    console.log('Payment submitted:', data);
    setCurrentStep(3);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-4xl font-bold" style={{ color: "#00FF40" }}>/</span>
          <h1 className="text-4xl font-bold" style={{ color: "#09080e" }}>checkout</h1>
        </div>
        <p className="text-muted-foreground">Complete your secure purchase</p>
      </div>

      <CheckoutProgress currentStep={currentStep} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleShippingSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={shippingInfo.email}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                      data-testid="input-email"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      placeholder="John Doe"
                      value={shippingInfo.fullName}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                      data-testid="input-fullname"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      placeholder="123 Main St"
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                      data-testid="input-address"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        placeholder="New York"
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                        data-testid="input-city"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        placeholder="NY"
                        value={shippingInfo.state}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                        data-testid="input-state"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input
                      id="zip"
                      placeholder="10001"
                      value={shippingInfo.zip}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, zip: e.target.value })}
                      data-testid="input-zip"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    style={{ backgroundColor: "#0000FF", color: "white" }}
                    data-testid="button-continue-payment"
                  >
                    Continue to Payment
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <PaymentForm onSubmit={handlePaymentSubmit} />
              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setCurrentStep(1)} className="flex-1" data-testid="button-back">
                  Back
                </Button>
                <Button
                  className="flex-1"
                  style={{ backgroundColor: "#0000FF", color: "white" }}
                  onClick={() => handlePaymentSubmit({})}
                  data-testid="button-place-order"
                >
                  Place Order
                </Button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <Card>
              <CardContent className="py-16 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6" style={{ backgroundColor: "#00FF40" }}>
                  <Check className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-2" style={{ color: "#00FF40" }}>Order Confirmed!</h2>
                <p className="text-muted-foreground mb-6">
                  Thank you for your purchase. Your order has been successfully processed.
                </p>
                <div className="bg-muted rounded-lg p-4 mb-6 inline-block">
                  <p className="text-sm text-muted-foreground mb-1">Order Number</p>
                  <p className="font-mono font-bold" data-testid="text-order-number">ORD-2025-001234</p>
                </div>
                <Button onClick={() => console.log('View order details')} data-testid="button-view-order">
                  View Order Details
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        <div>
          <OrderSummary
            subtotal={subtotal}
            tax={tax}
            shipping={shipping}
            showCta={false}
          />
        </div>
      </div>
    </div>
  );
}
