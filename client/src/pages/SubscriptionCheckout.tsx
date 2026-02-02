import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, Lock, CreditCard, ArrowRight } from "lucide-react";
import type { AddOnProduct } from "@shared/schema";
import Logo from "@/components/Logo";
import { useToast } from "@/hooks/use-toast";

const productFeatures: Record<string, { free: string[]; paid: string[] }> = {
  "customer-portal": {
    free: ["Last 10 orders", "Order status viewing"],
    paid: ["Unlimited order history", "Download invoices (PDF)", "Manage payment methods", "Subscription management", "Support ticket submission", "Real-time order tracking"]
  },
  "multi-gateway": {
    free: [],
    paid: ["Connect up to 3 additional gateways", "Smart routing by card type, amount, or geography", "Automatic failover protection", "Split processing", "Real-time routing analytics"]
  },
  "security-suite": {
    free: ["Basic fraud scoring", "Transaction monitoring"],
    paid: ["Velocity checks", "Geolocation blocking", "Device fingerprinting", "3D Secure 2.0", "Real-time fraud scoring", "Manual review queue", "Chargeback alerts"]
  },
  "checkout-optimizer": {
    free: [],
    paid: ["One-click checkout", "Express checkout (Apple Pay, Google Pay)", "Address autocomplete", "Smart form validation", "A/B testing", "Conversion analytics"]
  },
  "shopping-cart-pro": {
    free: [],
    paid: ["Save cart for later", "Cart sharing", "Cross-sell/upsell suggestions", "Cart notes", "Multi-currency display", "Inventory reservation"]
  },
  "advanced-analytics": {
    free: ["Total revenue (today/week/month)", "Transaction count", "Success rate"],
    paid: ["Revenue breakdown", "Customer analytics (LTV, AOV)", "Cohort analysis", "Funnel visualization", "Exportable reports", "Scheduled email reports"]
  },
  "custom-branding": {
    free: ["SwipesBlue logo on checkout", "Default colors"],
    paid: ["Your logo on checkout", "Custom colors", "Custom fonts", "Remove SwipesBlue branding", "Custom email templates", "Custom checkout domain"]
  },
  "premium-api": {
    free: [],
    paid: ["Full REST API access", "Webhooks with retry", "Test and live API keys", "Sandbox environment", "SDK libraries", "Priority developer support"]
  }
};

export default function SubscriptionCheckout() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug || "";
  const [location, setLocation] = useLocation();
  const { toast } = useToast();

  const searchParams = new URLSearchParams(location.split("?")[1] || "");
  const plan = searchParams.get("plan") || "paid";
  const isFree = plan === "free";

  const [formData, setFormData] = useState({
    email: "",
    cardNumber: "",
    expiration: "",
    cvv: "",
    nameOnCard: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    agreeToTerms: false,
    couponCode: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: addOn, isLoading } = useQuery<AddOnProduct>({
    queryKey: ["/api/add-ons", slug],
    queryFn: async () => {
      const res = await fetch(`/api/add-ons/${slug}`);
      if (!res.ok) throw new Error("Product not found");
      return res.json();
    },
    enabled: !!slug
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFree && !formData.agreeToTerms) {
      toast({
        title: "Please agree to terms",
        description: "You must agree to the Terms of Service and Privacy Policy",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      setLocation(`/subscription/success?product=${slug}&plan=${plan}`);
    } catch {
      toast({
        title: "Subscription failed",
        description: "There was an error processing your subscription. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="animate-pulse text-swipes-pro-gray">Loading...</div>
      </div>
    );
  }

  if (!addOn) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link href="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const features = productFeatures[slug] || { free: [], paid: [] };
  const selectedFeatures = isFree ? features.free : features.paid;
  const price = isFree ? 0 : parseFloat(addOn.annualPrice || "0");

  const nextYear = new Date();
  nextYear.setFullYear(nextYear.getFullYear() + 1);
  const renewalDate = nextYear.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/">
            <Logo />
          </Link>
          <div className="flex items-center gap-2 text-sm text-swipes-pro-gray">
            <Lock className="h-4 w-4" />
            Secure Checkout
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="rounded-[7px] shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h3 className="font-semibold text-swipes-black">{addOn.name}</h3>
                  <p className="text-sm text-swipes-pro-gray">{isFree ? "Free Plan" : "Full Access Plan"}</p>
                </div>

                <div className="bg-gray-50 rounded-[7px] p-4 mb-4">
                  <ul className="space-y-2">
                    {selectedFeatures.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-swipes-black">
                        <Check className="h-4 w-4 text-swipes-trusted-green flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-swipes-pro-gray">Subtotal</span>
                    <span className="font-medium">${price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total (billed annually)</span>
                    <span className="text-swipes-blue-deep">${price.toFixed(2)}</span>
                  </div>
                  {!isFree && (
                    <p className="text-sm text-swipes-pro-gray mt-2">Renews on {renewalDate}</p>
                  )}
                </div>

                {!isFree && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <Label htmlFor="coupon" className="text-sm">Have a coupon code?</Label>
                    <div className="flex gap-2 mt-2">
                      <Input
                        id="coupon"
                        placeholder="Enter code"
                        value={formData.couponCode}
                        onChange={(e) => setFormData({ ...formData, couponCode: e.target.value })}
                        className="flex-1"
                        data-testid="input-coupon"
                      />
                      <Button type="button" variant="outline" data-testid="button-apply-coupon">
                        Apply
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="rounded-[7px] shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">
                  {isFree ? "Confirm Your Email" : "Payment Details"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    data-testid="input-email"
                  />
                </div>

                {!isFree && (
                  <>
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <div className="relative">
                        <Input
                          id="cardNumber"
                          placeholder="4242 4242 4242 4242"
                          required
                          value={formData.cardNumber}
                          onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                          className="pl-10"
                          data-testid="input-card-number"
                        />
                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiration">Expiration</Label>
                        <Input
                          id="expiration"
                          placeholder="MM / YY"
                          required
                          value={formData.expiration}
                          onChange={(e) => setFormData({ ...formData, expiration: e.target.value })}
                          data-testid="input-expiration"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          required
                          value={formData.cvv}
                          onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                          data-testid="input-cvv"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="nameOnCard">Name on Card</Label>
                      <Input
                        id="nameOnCard"
                        placeholder="John Smith"
                        required
                        value={formData.nameOnCard}
                        onChange={(e) => setFormData({ ...formData, nameOnCard: e.target.value })}
                        data-testid="input-name-on-card"
                      />
                    </div>

                    <div>
                      <Label htmlFor="address">Billing Address</Label>
                      <Input
                        id="address"
                        placeholder="123 Main St"
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        data-testid="input-address"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          placeholder="San Francisco"
                          required
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          data-testid="input-city"
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          placeholder="CA"
                          required
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          data-testid="input-state"
                        />
                      </div>
                      <div>
                        <Label htmlFor="zip">Zip</Label>
                        <Input
                          id="zip"
                          placeholder="94102"
                          required
                          value={formData.zip}
                          onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                          data-testid="input-zip"
                        />
                      </div>
                    </div>

                    <div className="flex items-start gap-2 pt-2">
                      <Checkbox
                        id="terms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
                        data-testid="checkbox-terms"
                      />
                      <Label htmlFor="terms" className="text-sm text-swipes-pro-gray font-normal cursor-pointer">
                        I agree to the Terms of Service and Privacy Policy
                      </Label>
                    </div>
                  </>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-swipes-blue-deep text-white rounded-[7px] py-6 text-lg font-semibold group"
                  data-testid="button-subscribe"
                >
                  <span className="flex items-center justify-center">
                    {isSubmitting ? "Processing..." : isFree ? "Start Free" : `Subscribe — $${price.toFixed(2)}/year`}
                    <span className="inline-flex w-0 opacity-0 group-hover:w-6 group-hover:opacity-100 transition-all duration-200 overflow-hidden">
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </span>
                  </span>
                </Button>

                <div className="flex items-center justify-center gap-2 text-sm text-swipes-pro-gray">
                  <Lock className="h-4 w-4" />
                  256-bit SSL encryption
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </div>
  );
}
