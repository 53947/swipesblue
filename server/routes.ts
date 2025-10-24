import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertProductSchema, 
  insertCartItemSchema, 
  insertOrderSchema,
  insertOrderItemSchema,
  insertPaymentGatewaySchema,
  insertPaymentTransactionSchema,
  type InsertOrderItem,
} from "@shared/schema";
import { z } from "zod";
import { createPaymentGateway } from "./payment-gateways/nmi";

export async function registerRoutes(app: Express): Promise<Server> {
  // Session helper to get or create session ID
  function getSessionId(req: any): string {
    if (!req.session) {
      req.session = {};
    }
    if (!req.session.id) {
      req.session.id = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    }
    return req.session.id;
  }

  // Products endpoints
  app.get("/api/products", async (_req, res) => {
    try {
      const products = await storage.getAllProducts();
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/search", async (req, res) => {
    try {
      const { q } = req.query;
      if (!q || typeof q !== "string") {
        return res.status(400).json({ message: "Search query is required" });
      }
      const products = await storage.searchProducts(q);
      res.json(products);
    } catch (error) {
      console.error("Error searching products:", error);
      res.status(500).json({ message: "Failed to search products" });
    }
  });

  app.get("/api/products/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const products = await storage.getProductsByCategory(category);
      res.json(products);
    } catch (error) {
      console.error("Error fetching products by category:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  app.post("/api/products", async (req, res) => {
    try {
      const validatedData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(validatedData);
      res.status(201).json(product);
    } catch (error) {
      console.error("Error creating product:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid product data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create product" });
    }
  });

  app.patch("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.updateProduct(req.params.id, req.body);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ message: "Failed to update product" });
    }
  });

  app.delete("/api/products/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteProduct(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ message: "Failed to delete product" });
    }
  });

  // Cart endpoints
  app.get("/api/cart", async (req, res) => {
    try {
      const sessionId = getSessionId(req);
      const items = await storage.getCartItemsWithProducts(sessionId);
      res.json(items);
    } catch (error) {
      console.error("Error fetching cart:", error);
      res.status(500).json({ message: "Failed to fetch cart" });
    }
  });

  app.post("/api/cart", async (req, res) => {
    try {
      const sessionId = getSessionId(req);
      const validatedData = insertCartItemSchema.parse({
        ...req.body,
        sessionId,
      });
      const item = await storage.addToCart(validatedData);
      res.status(201).json(item);
    } catch (error) {
      console.error("Error adding to cart:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid cart item data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to add to cart" });
    }
  });

  app.patch("/api/cart/:id", async (req, res) => {
    try {
      const { quantity } = req.body;
      if (typeof quantity !== "number" || quantity < 1) {
        return res.status(400).json({ message: "Invalid quantity" });
      }
      const item = await storage.updateCartItemQuantity(req.params.id, quantity);
      if (!item) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      res.json(item);
    } catch (error) {
      console.error("Error updating cart item:", error);
      res.status(500).json({ message: "Failed to update cart item" });
    }
  });

  app.delete("/api/cart/:id", async (req, res) => {
    try {
      const deleted = await storage.removeFromCart(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      res.json({ message: "Item removed from cart" });
    } catch (error) {
      console.error("Error removing from cart:", error);
      res.status(500).json({ message: "Failed to remove from cart" });
    }
  });

  app.delete("/api/cart", async (req, res) => {
    try {
      const sessionId = getSessionId(req);
      await storage.clearCart(sessionId);
      res.json({ message: "Cart cleared" });
    } catch (error) {
      console.error("Error clearing cart:", error);
      res.status(500).json({ message: "Failed to clear cart" });
    }
  });

  // Orders endpoints
  app.get("/api/orders", async (req, res) => {
    try {
      const sessionId = getSessionId(req);
      const orders = await storage.getOrdersBySession(sessionId);
      res.json(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  app.get("/api/orders/:id", async (req, res) => {
    try {
      const order = await storage.getOrder(req.params.id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      const items = await storage.getOrderItems(order.id);
      res.json({ ...order, items });
    } catch (error) {
      console.error("Error fetching order:", error);
      res.status(500).json({ message: "Failed to fetch order" });
    }
  });

  app.post("/api/orders", async (req, res) => {
    try {
      const sessionId = getSessionId(req);
      
      const orderSchema = insertOrderSchema.extend({
        items: z.array(insertOrderItemSchema),
        payment: z.object({
          cardNumber: z.string(),
          cardName: z.string(),
          expiry: z.string(),
          cvv: z.string(),
        }),
      });

      const validatedData = orderSchema.parse({
        ...req.body,
        sessionId,
      });

      const { items: orderItemsData, payment, ...orderData } = validatedData;

      const gateway = await storage.getDefaultPaymentGateway();
      if (!gateway) {
        return res.status(400).json({ message: "No payment gateway configured" });
      }

      const paymentGateway = createPaymentGateway(gateway);
      if (!paymentGateway) {
        return res.status(500).json({ message: "Payment gateway not supported" });
      }

      const paymentResult = await paymentGateway.processPayment({
        amount: parseFloat(orderData.total as string),
        cardNumber: payment.cardNumber,
        cardName: payment.cardName,
        expiry: payment.expiry,
        cvv: payment.cvv,
        email: orderData.customerEmail,
        billingAddress: {
          address: orderData.shippingAddress,
          city: orderData.shippingCity,
          state: orderData.shippingState,
          zip: orderData.shippingZip,
        },
      });

      if (!paymentResult.success) {
        return res.status(400).json({ 
          message: "Payment failed", 
          error: paymentResult.errorMessage 
        });
      }

      const order = await storage.createOrder(orderData, orderItemsData as InsertOrderItem[]);

      await storage.updateOrderPaymentStatus(order.id, "paid");

      await storage.createPaymentTransaction({
        orderId: order.id,
        gatewayId: gateway.id,
        gatewayTransactionId: paymentResult.transactionId,
        amount: orderData.total,
        status: "success",
        paymentMethod: `****${payment.cardNumber.slice(-4)}`,
        gatewayResponse: paymentResult.rawResponse,
      });

      await storage.clearCart(sessionId);

      res.status(201).json({ ...order, transactionId: paymentResult.transactionId });
    } catch (error) {
      console.error("Error creating order:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid order data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create order" });
    }
  });

  // Payment gateways endpoints
  app.get("/api/payment-gateways", async (_req, res) => {
    try {
      const gateways = await storage.getAllPaymentGateways();
      res.json(gateways.map(g => ({ ...g, config: undefined })));
    } catch (error) {
      console.error("Error fetching payment gateways:", error);
      res.status(500).json({ message: "Failed to fetch payment gateways" });
    }
  });

  app.get("/api/payment-gateways/default", async (_req, res) => {
    try {
      const gateway = await storage.getDefaultPaymentGateway();
      if (!gateway) {
        return res.status(404).json({ message: "No default payment gateway configured" });
      }
      res.json({ ...gateway, config: undefined });
    } catch (error) {
      console.error("Error fetching default gateway:", error);
      res.status(500).json({ message: "Failed to fetch default gateway" });
    }
  });

  app.post("/api/payment-gateways", async (req, res) => {
    try {
      const validatedData = insertPaymentGatewaySchema.parse(req.body);
      const gateway = await storage.createPaymentGateway(validatedData);
      res.status(201).json({ ...gateway, config: undefined });
    } catch (error) {
      console.error("Error creating payment gateway:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid gateway data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create payment gateway" });
    }
  });

  app.patch("/api/payment-gateways/:id", async (req, res) => {
    try {
      const gateway = await storage.updatePaymentGateway(req.params.id, req.body);
      if (!gateway) {
        return res.status(404).json({ message: "Payment gateway not found" });
      }
      res.json({ ...gateway, config: undefined });
    } catch (error) {
      console.error("Error updating payment gateway:", error);
      res.status(500).json({ message: "Failed to update payment gateway" });
    }
  });

  app.post("/api/payment-gateways/:id/set-default", async (req, res) => {
    try {
      const gateway = await storage.setDefaultGateway(req.params.id);
      if (!gateway) {
        return res.status(404).json({ message: "Payment gateway not found" });
      }
      res.json({ ...gateway, config: undefined });
    } catch (error) {
      console.error("Error setting default gateway:", error);
      res.status(500).json({ message: "Failed to set default gateway" });
    }
  });

  // Transactions endpoints
  app.get("/api/transactions", async (_req, res) => {
    try {
      const transactions = await storage.getAllTransactions();
      res.json(transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      res.status(500).json({ message: "Failed to fetch transactions" });
    }
  });

  app.get("/api/transactions/order/:orderId", async (req, res) => {
    try {
      const transactions = await storage.getTransactionsByOrder(req.params.orderId);
      res.json(transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      res.status(500).json({ message: "Failed to fetch transactions" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
