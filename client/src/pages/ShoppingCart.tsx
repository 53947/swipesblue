import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import CartItem from "@/components/CartItem";
import OrderSummary from "@/components/OrderSummary";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import type { CartItem as CartItemType, Product } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function ShoppingCart() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const { data: items, isLoading } = useQuery<(CartItemType & { product: Product })[]>({
    queryKey: ["/api/cart"],
  });

  const handleUpdateQuantity = async (id: string, quantity: number) => {
    try {
      await apiRequest("PATCH", `/api/cart/${id}`, { quantity });
      await queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update cart item",
        variant: "destructive",
      });
    }
  };

  const handleRemove = async (id: string) => {
    try {
      await apiRequest("DELETE", `/api/cart/${id}`);
      await queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "Item removed",
        description: "Item has been removed from your cart",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove item from cart",
        variant: "destructive",
      });
    }
  };

  const subtotal = items?.reduce((sum, item) => 
    sum + parseFloat(item.product.price) * (item.quantity || 0), 0
  ) || 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Demo Banner */}
      <div className="bg-[#1844A6] text-white py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-sm">
          <span className="bg-white/20 text-white px-2 py-0.5 rounded text-xs font-semibold">DEMO</span>
          <span>This is a live demo of the swipesblue shopping cart</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gray-900">Shopping Cart</h1>
          <p className="text-gray-500">Review your items and proceed to checkout</p>
        </div>

      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-card rounded-lg border border-card-border p-6">
              <div className="animate-pulse space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-20 bg-muted rounded" />
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="h-96 bg-card rounded-lg border border-card-border p-6 animate-pulse" />
          </div>
        </div>
      ) : !items || items.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground mb-4">Your cart is empty</p>
          <Button onClick={() => setLocation("/products")} data-testid="button-continue-shopping">
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
                  id={item.id}
                  name={item.product.name}
                  price={parseFloat(item.product.price)}
                  quantity={item.quantity || 0}
                  image={item.product.image || undefined}
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
    </div>
  );
}
