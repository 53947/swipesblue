import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import CheckoutProgress from "@/components/CheckoutProgress";
import PaymentForm from "@/components/PaymentForm";
import OrderSummary from "@/components/OrderSummary";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import type { CartItem as CartItemType, Product } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Checkout() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [shippingInfo, setShippingInfo] = useState({
    email: "",
    fullName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });
  const [paymentData, setPaymentData] = useState<any>(null);

  const { data: items, isLoading: isLoadingCart } = useQuery<(CartItemType & { product: Product })[]>({
    queryKey: ["/api/cart"],
  });

  const subtotal = items?.reduce((sum, item) =>
    sum + parseFloat(item.product.price) * (item.quantity || 0), 0
  ) || 0;

  const tax = subtotal * 0.09;
  const shipping = 15.00;
  const total = subtotal + tax + shipping;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!items || items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checking out",
        variant: "destructive",
      });
      setLocation("/products");
      return;
    }

    if (!shippingInfo.email || !shippingInfo.fullName || !shippingInfo.address || 
        !shippingInfo.city || !shippingInfo.state || !shippingInfo.zip) {
      toast({
        title: "Missing information",
        description: "Please fill in all shipping information fields",
        variant: "destructive",
      });
      return;
    }

    setCurrentStep(2);
  };

  const handlePaymentSubmit = async (data: any) => {
    if (!items || items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Cannot process payment without items in cart",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setPaymentData(data);

    try {
      const orderNumber = `ORD-${Date.now()}`;
      
      const orderData = {
        orderNumber,
        customerEmail: shippingInfo.email,
        customerName: shippingInfo.fullName,
        shippingAddress: shippingInfo.address,
        shippingCity: shippingInfo.city,
        shippingState: shippingInfo.state,
        shippingZip: shippingInfo.zip,
        subtotal: subtotal.toFixed(2),
        tax: tax.toFixed(2),
        shipping: shipping.toFixed(2),
        discount: "0.00",
        total: total.toFixed(2),
        status: "pending",
        paymentStatus: "pending",
        items: items.map(item => ({
          productId: item.productId,
          productName: item.product.name,
          productPrice: item.product.price,
          quantity: item.quantity,
          subtotal: (parseFloat(item.product.price) * (item.quantity || 0)).toFixed(2),
        })),
        payment: {
          paymentToken: data.paymentToken,
          cardholderName: data.cardholderName,
        },
      };

      const response = await apiRequest("POST", "/api/orders", orderData);
      const result = await response.json();

      await queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      await queryClient.invalidateQueries({ queryKey: ["/api/orders"] });

      setOrderNumber(result.orderNumber);
      setCurrentStep(3);
      
      toast({
        title: "Order placed successfully",
        description: `Your order #${result.orderNumber} has been confirmed`,
      });
    } catch (error: any) {
      console.error("Order error:", error);
      toast({
        title: "Payment failed",
        description: error.message || "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoadingCart) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-4xl font-bold" style={{ color: "#10B981" }}>/</span>
            <h1 className="text-4xl font-bold" style={{ color: "#09080e" }}>checkout</h1>
          </div>
          <p className="text-muted-foreground">Complete your secure purchase</p>
        </div>
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-muted rounded" />
          <div className="h-96 bg-muted rounded" />
        </div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground mb-4">Your cart is empty</p>
          <Button onClick={() => setLocation("/products")} data-testid="button-continue-shopping">
            Browse Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Demo Banner */}
      <div className="bg-[#1844A6] text-white py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-sm">
          <span className="bg-white/20 text-white px-2 py-0.5 rounded text-xs font-semibold">DEMO</span>
          <span>This is a live demo of the swipesblue checkout experience</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gray-900">Checkout</h1>
          <p className="text-gray-500">Complete your secure purchase</p>
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
                      required
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
                      required
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
                      required
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
                        required
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
                        required
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
                      required
                      data-testid="input-zip"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    style={{ backgroundColor: "#1844A6", color: "white" }}
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
              <PaymentForm onSubmit={handlePaymentSubmit} isProcessing={isProcessing} />
              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentStep(1)} 
                  className="flex-1" 
                  disabled={isProcessing}
                  data-testid="button-back"
                >
                  Back
                </Button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <Card>
              <CardContent className="py-16 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6" style={{ backgroundColor: "#10B981" }}>
                  <Check className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-2" style={{ color: "#10B981" }}>Order Confirmed!</h2>
                <p className="text-muted-foreground mb-6">
                  Thank you for your purchase. Your order has been successfully processed.
                </p>
                <div className="bg-muted rounded-lg p-4 mb-6 inline-block">
                  <p className="text-sm text-muted-foreground mb-1">Order Number</p>
                  <p className="font-mono font-bold" data-testid="text-order-number">{orderNumber}</p>
                </div>
                <div className="flex gap-4 justify-center">
                  <Button onClick={() => setLocation("/products")} data-testid="button-continue-shopping">
                    Continue Shopping
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setLocation("/orders")}
                    data-testid="button-view-orders"
                  >
                    View My Orders
                  </Button>
                </div>
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
    </div>
  );
}
