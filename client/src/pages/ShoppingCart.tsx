import { useState } from "react";
import { useLocation } from "wouter";
import CartItem from "@/components/CartItem";
import OrderSummary from "@/components/OrderSummary";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface CartItemType {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export default function ShoppingCart() {
  const [, setLocation] = useLocation();
  const [items, setItems] = useState<CartItemType[]>([
    { id: "1", name: "Premium Payment Gateway Integration", price: 299.99, quantity: 1 },
    { id: "2", name: "Custom Branding Package", price: 149.99, quantity: 1 },
    { id: "3", name: "Advanced Analytics Dashboard", price: 199.99, quantity: 2 },
  ]);

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setItems(items.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const handleRemove = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-4xl font-bold" style={{ color: "#00FF40" }}>/</span>
          <h1 className="text-4xl font-bold" style={{ color: "#09080e" }}>shoppingcart</h1>
        </div>
        <p className="text-muted-foreground">Review your items and proceed to checkout</p>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground mb-4">Your cart is empty</p>
          <Button onClick={() => setLocation("/")} data-testid="button-continue-shopping">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-card rounded-lg border border-card-border p-6">
              {items.map(item => (
                <CartItem
                  key={item.id}
                  {...item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemove}
                />
              ))}
            </div>
          </div>

          <div>
            <OrderSummary
              subtotal={subtotal}
              tax={subtotal * 0.09}
              shipping={15.00}
              onCheckout={() => setLocation("/checkout")}
            />
          </div>
        </div>
      )}
    </div>
  );
}
