import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Order } from "@shared/schema";
import { format } from "date-fns";

export default function Orders() {
  const { data: orders, isLoading } = useQuery<Order[]>({
    queryKey: ["/api/orders"],
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "pending":
        return "default";
      case "processing":
        return "secondary";
      case "shipped":
        return "secondary";
      case "delivered":
        return "secondary";
      case "cancelled":
        return "destructive";
      default:
        return "default";
    }
  };

  const getPaymentStatusColor = (paymentStatus: string) => {
    switch (paymentStatus) {
      case "paid":
        return "bg-[#00FF40] text-[#09080e]";
      case "pending":
        return "bg-[#0000FF] text-white";
      case "failed":
        return "bg-[#FF0040] text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Demo Banner */}
      <div className="bg-swipes-blue-deep text-white py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-sm">
          <span className="bg-white/20 text-white px-2 py-0.5 rounded text-xs font-semibold">DEMO</span>
          <span>This is a live demo of the SwipesBlue order management</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-swipes-black">My Orders</h1>
          <p className="text-swipes-gray">View your order history and track shipments</p>
        </div>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-muted rounded w-1/3" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-full" />
                  <div className="h-4 bg-muted rounded w-2/3" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : !orders || orders.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground mb-4">No orders yet</p>
          <p className="text-sm text-muted-foreground">Your order history will appear here once you make a purchase</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <Card key={order.id} data-testid={`order-${order.id}`}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg mb-2">Order {order.orderNumber}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Placed on {format(new Date(order.createdAt), "MMMM d, yyyy 'at' h:mm a")}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={getStatusVariant(order.status)} data-testid={`status-${order.id}`}>
                      {order.status}
                    </Badge>
                    <Badge className={`${getPaymentStatusColor(order.paymentStatus)} no-default-hover-elevate`} data-testid={`payment-status-${order.id}`}>
                      {order.paymentStatus}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Customer</span>
                    <span className="font-medium" data-testid={`customer-${order.id}`}>{order.customerName}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Email</span>
                    <span className="font-medium" data-testid={`email-${order.id}`}>{order.customerEmail}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping Address</span>
                    <span className="font-medium text-right" data-testid={`address-${order.id}`}>
                      {order.shippingAddress}, {order.shippingCity}, {order.shippingState} {order.shippingZip}
                    </span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span data-testid={`subtotal-${order.id}`}>${parseFloat(order.subtotal).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Tax</span>
                      <span data-testid={`tax-${order.id}`}>${parseFloat(order.tax).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Shipping</span>
                      <span data-testid={`shipping-${order.id}`}>${parseFloat(order.shipping).toFixed(2)}</span>
                    </div>
                    {parseFloat(order.discount) > 0 && (
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Discount</span>
                        <span style={{ color: "#00FF40" }} data-testid={`discount-${order.id}`}>-${parseFloat(order.discount).toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-lg font-bold mt-2">
                      <span>Total</span>
                      <span style={{ color: "#0000FF" }} data-testid={`total-${order.id}`}>${parseFloat(order.total).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      </div>
    </div>
  );
}
