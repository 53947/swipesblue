import { useState, useEffect } from "react";
import { CreditCard, ShoppingCart as CartIcon, Check, Package, Palette, ArrowRight, Zap, Shield, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import Logo from "@/components/Logo";
import { Link } from "wouter";

export default function Home() {
  const [transactionState, setTransactionState] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    amount: "99.99"
  });

  useEffect(() => {
    if (transactionState === "success" || transactionState === "error") {
      console.log("Success/Error state detected, setting timeout to reset");
      const timer = setTimeout(() => {
        console.log("Resetting to idle");
        setTransactionState("idle");
      }, 4000);
      
      return () => {
        console.log("Cleaning up timer");
        clearTimeout(timer);
      };
    }
  }, [transactionState]);

  const handleDemoTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Demo transaction started", formData);
    setTransactionState("processing");
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const isSuccess = formData.cardNumber.replace(/\s/g, '').startsWith("4242");
    console.log("Card number check:", formData.cardNumber, "-> isSuccess:", isSuccess);
    
    if (isSuccess) {
      console.log("Setting success state");
      setTransactionState("success");
    } else {
      console.log("Setting error state");
      setTransactionState("error");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden border-b border-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-8">
            <div className="flex justify-center mb-8">
              <Logo showIcon variant="default" className="scale-150" />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              <span style={{ color: "#FF0040" }}>Payment Infrastructure</span>
              <br />
              <span className="text-foreground">for Modern Commerce</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Build faster with modular payment tools. Subscribe to what you need—cart, checkout, or complete platform—and scale as you grow.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/shoppingcart">
                <Button size="lg" className="bg-[#FF0040] text-white px-8" data-testid="button-get-started">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/transactions">
                <Button size="lg" variant="outline" data-testid="button-view-demo">
                  View Demo
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-8 pt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" style={{ color: "#00FF40" }} />
                <span>PCI Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4" style={{ color: "#0000FF" }} />
                <span>Real-time Processing</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" style={{ color: "#FF0040" }} />
                <span>Global Payments</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <Zap className="h-8 w-8" style={{ color: "#0000FF" }} />
              <span style={{ color: "#0000FF" }}>Try It Live</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Test our payment processing in real-time with instant feedback
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" style={{ color: "#FF0040" }} />
                  Demo Transaction
                </CardTitle>
                <CardDescription>
                  Use card number 4242 4242 4242 4242 for success, any other for decline
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleDemoTransaction} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="demo-card">Card Number</Label>
                    <Input
                      id="demo-card"
                      placeholder="4242 4242 4242 4242"
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                      disabled={transactionState !== "idle"}
                      data-testid="input-demo-card"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="demo-expiry">Expiry</Label>
                      <Input
                        id="demo-expiry"
                        placeholder="MM/YY"
                        value={formData.expiry}
                        onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                        disabled={transactionState !== "idle"}
                        data-testid="input-demo-expiry"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="demo-cvv">CVV</Label>
                      <Input
                        id="demo-cvv"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                        disabled={transactionState !== "idle"}
                        data-testid="input-demo-cvv"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="demo-amount">Amount</Label>
                    <Input
                      id="demo-amount"
                      placeholder="99.99"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      disabled={transactionState !== "idle"}
                      data-testid="input-demo-amount"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-[#0000FF] text-white"
                    disabled={transactionState !== "idle"}
                    data-testid="button-process-demo"
                  >
                    {transactionState === "processing" && "Processing..."}
                    {transactionState === "success" && "Success!"}
                    {transactionState === "error" && "Declined"}
                    {transactionState === "idle" && "Process Payment"}
                  </Button>
                </form>
              </CardContent>
              {(transactionState === "success" || transactionState === "error") && (
                <CardFooter>
                  <div 
                    className={`w-full p-4 rounded-md ${
                      transactionState === "success" ? "bg-[#00FF40]/10" : "bg-[#FF0040]/10"
                    }`}
                    role="status"
                    aria-live="polite"
                    data-testid={transactionState === "success" ? "message-success" : "message-error"}
                  >
                    <div className="flex items-center gap-2">
                      {transactionState === "success" ? (
                        <>
                          <Check className="h-5 w-5" style={{ color: "#00FF40" }} data-testid="icon-success" />
                          <span style={{ color: "#00FF40" }} className="font-medium" data-testid="text-success">
                            Transaction approved • ${formData.amount}
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="text-xl" style={{ color: "#FF0040" }} data-testid="icon-error">×</span>
                          <span style={{ color: "#FF0040" }} className="font-medium" data-testid="text-error">
                            Transaction declined • Insufficient funds
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </CardFooter>
              )}
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <Package className="h-8 w-8" style={{ color: "#FF0040" }} />
              <span style={{ color: "#FF0040" }}>Build Your Stack</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Subscribe to individual apps or get the complete platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="relative hover-elevate" data-testid="card-product-shoppingcart">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <CartIcon className="h-6 w-6" style={{ color: "#00FF40" }} />
                  <Badge variant="secondary">App</Badge>
                </div>
                <CardTitle className="text-2xl">
                  <span style={{ color: "#09080e" }}>/</span>
                  <span style={{ color: "#00FF40" }}>shoppingcart</span>
                </CardTitle>
                <CardDescription className="text-base">
                  Powerful cart management for any website or platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold" style={{ color: "#FF0040" }}>
                  $49<span className="text-lg text-muted-foreground">/mo</span>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-0.5" style={{ color: "#00FF40" }} />
                    <span>Multi-device cart sync</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-0.5" style={{ color: "#00FF40" }} />
                    <span>Abandoned cart recovery</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-0.5" style={{ color: "#00FF40" }} />
                    <span>Real-time inventory</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-0.5" style={{ color: "#00FF40" }} />
                    <span>API & webhook integration</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Link href="/shoppingcart" className="w-full">
                  <Button variant="outline" className="w-full" data-testid="button-demo-shoppingcart">
                    View Demo
                  </Button>
                </Link>
                <Button className="w-full bg-[#00FF40] text-black" data-testid="button-subscribe-shoppingcart">
                  Subscribe
                </Button>
              </CardFooter>
            </Card>

            <Card className="relative hover-elevate" data-testid="card-product-checkout">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="h-6 w-6" style={{ color: "#00FF40" }} />
                  <Badge variant="secondary">App</Badge>
                </div>
                <CardTitle className="text-2xl">
                  <span style={{ color: "#09080e" }}>/</span>
                  <span style={{ color: "#00FF40" }}>checkout</span>
                </CardTitle>
                <CardDescription className="text-base">
                  Optimized checkout experience with one-click payments
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold" style={{ color: "#FF0040" }}>
                  $79<span className="text-lg text-muted-foreground">/mo</span>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-0.5" style={{ color: "#00FF40" }} />
                    <span>One-click checkout</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-0.5" style={{ color: "#00FF40" }} />
                    <span>Saved payment methods</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-0.5" style={{ color: "#00FF40" }} />
                    <span>PCI-compliant tokenization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-0.5" style={{ color: "#00FF40" }} />
                    <span>Multiple payment gateways</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Link href="/checkout" className="w-full">
                  <Button variant="outline" className="w-full" data-testid="button-demo-checkout">
                    View Demo
                  </Button>
                </Link>
                <Button className="w-full bg-[#00FF40] text-black" data-testid="button-subscribe-checkout">
                  Subscribe
                </Button>
              </CardFooter>
            </Card>

            <Card className="relative hover-elevate" data-testid="card-product-brandstudio">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Palette className="h-6 w-6" style={{ color: "#00FF40" }} />
                  <Badge variant="secondary">Premium</Badge>
                </div>
                <CardTitle className="text-2xl">
                  <span style={{ color: "#09080e" }}>/</span>
                  <span style={{ color: "#00FF40" }}>brand-studio</span>
                </CardTitle>
                <CardDescription className="text-base">
                  White-label gateway with full brand customization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold" style={{ color: "#FF0040" }}>
                  $199<span className="text-lg text-muted-foreground">/mo</span>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-0.5" style={{ color: "#00FF40" }} />
                    <span>Custom branding & colors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-0.5" style={{ color: "#00FF40" }} />
                    <span>Upload logos & assets</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-0.5" style={{ color: "#00FF40" }} />
                    <span>White-label gateway</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-0.5" style={{ color: "#00FF40" }} />
                    <span>Priority support</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Link href="/brand-studio" className="w-full">
                  <Button variant="outline" className="w-full" data-testid="button-demo-brandstudio">
                    View Demo
                  </Button>
                </Link>
                <Button className="w-full bg-[#00FF40] text-black" data-testid="button-subscribe-brandstudio">
                  Subscribe
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card className="bg-gradient-to-br from-[#FF0040]/5 to-[#0000FF]/5 border-2" style={{ borderColor: "#FF0040" }} data-testid="card-bundle">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-2">
                <Badge className="bg-[#FF0040] text-white">Best Value</Badge>
              </div>
              <CardTitle className="text-3xl">Complete Platform Bundle</CardTitle>
              <CardDescription className="text-lg">
                Get all three apps with premium features and save 40%
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div>
                  <div className="text-5xl font-bold" style={{ color: "#FF0040" }}>
                    $199<span className="text-2xl text-muted-foreground">/mo</span>
                  </div>
                  <p className="text-muted-foreground mt-2">
                    Save $128/month compared to individual subscriptions
                  </p>
                </div>
                
                <div className="flex items-center justify-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4" style={{ color: "#00FF40" }} />
                    <span>All Apps Included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" style={{ color: "#00FF40" }} />
                    <span>Enterprise Support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4" style={{ color: "#00FF40" }} />
                    <span>Priority Features</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button size="lg" className="bg-[#FF0040] text-white px-12" data-testid="button-subscribe-bundle">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      <section className="py-20 bg-muted/30 border-t border-[#E5E5E5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to <span style={{ color: "#0000FF" }}>build better</span> commerce?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Join thousands of businesses processing payments with SwipesBlue
          </p>
          <Link href="/shoppingcart">
            <Button size="lg" className="bg-[#FF0040] text-white px-8" data-testid="button-cta-start">
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
