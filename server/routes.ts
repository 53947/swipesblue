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
  insertMerchantSchema,
  type InsertOrderItem,
} from "@shared/schema";
import { z } from "zod";
import { createPaymentGateway } from "./payment-gateways/nmi";
import { createNMIPartnerService, type MerchantBoardingRequest } from "./services/nmi-partner";
import { createMerchantPaymentService, type MerchantPaymentRequest } from "./services/merchant-payment";
import { requireApiKey, requirePermission, generateApiKey, generateApiSecret, type AuthenticatedRequest } from "./middleware/api-auth";
import { webhookService, WebhookEventType } from "./services/webhook";

export async function registerRoutes(app: Express): Promise<Server> {
  // Session helper to get session ID from express-session
  function getSessionId(req: any): string {
    if (!req.session) {
      throw new Error("Session not initialized");
    }
    // Use the session ID provided by express-session
    // When saveUninitialized is false, we need to ensure the session exists
    // by setting a property on it
    if (!req.session.initialized) {
      req.session.initialized = true;
    }
    return req.sessionID;
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

  // Add-on Products endpoints
  app.get("/api/add-ons", async (_req, res) => {
    try {
      const addOns = await storage.getActiveAddOnProducts();
      res.json(addOns);
    } catch (error) {
      console.error("Error fetching add-on products:", error);
      res.status(500).json({ message: "Failed to fetch add-on products" });
    }
  });

  app.get("/api/add-ons/:slug", async (req, res) => {
    try {
      const addOn = await storage.getAddOnProductBySlug(req.params.slug);
      if (!addOn) {
        return res.status(404).json({ message: "Add-on product not found" });
      }
      res.json(addOn);
    } catch (error) {
      console.error("Error fetching add-on product:", error);
      res.status(500).json({ message: "Failed to fetch add-on product" });
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
      
      const orderItemInputSchema = insertOrderItemSchema.omit({ orderId: true });
      
      const orderSchema = insertOrderSchema.extend({
        items: z.array(orderItemInputSchema),
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

  // Merchant Management API endpoints (Partner API v1)

  // Create a new merchant account via NMI Partner API
  app.post("/api/v1/merchants/create", async (req, res) => {
    try {
      // Validate the merchant boarding request
      const merchantBoardingSchema = z.object({
        businessName: z.string().min(1, "Business name is required"),
        businessEmail: z.string().email("Valid email is required"),
        businessPhone: z.string().optional(),
        businessAddress: z.string().optional(),
        businessCity: z.string().optional(),
        businessState: z.string().optional(),
        businessZip: z.string().optional(),
        businessCountry: z.string().default("US"),
        platform: z.enum(["businessblueprint", "hostsblue", "swipesblue"]),
        platformClientId: z.string().min(1, "Platform client ID is required"),
        dba: z.string().optional(),
        website: z.string().url().optional(),
        taxId: z.string().optional(),
        businessType: z.string().optional(),
        merchantCategoryCode: z.string().optional(),
        annualVolume: z.number().optional(),
        averageTicket: z.number().optional(),
        highTicket: z.number().optional(),
      });

      const validatedData = merchantBoardingSchema.parse(req.body);

      // Check if merchant already exists for this platform client
      const existingMerchant = await storage.getMerchantByPlatformClientId(
        validatedData.platform,
        validatedData.platformClientId
      );

      if (existingMerchant) {
        return res.status(409).json({
          message: "Merchant already exists for this platform client",
          merchantId: existingMerchant.id,
          status: existingMerchant.status,
        });
      }

      // Initialize NMI Partner Service
      const nmiPartnerService = createNMIPartnerService();

      // Create sub-merchant via NMI Partner API
      const boardingRequest: MerchantBoardingRequest = {
        businessName: validatedData.businessName,
        businessEmail: validatedData.businessEmail,
        businessPhone: validatedData.businessPhone,
        businessAddress: validatedData.businessAddress,
        businessCity: validatedData.businessCity,
        businessState: validatedData.businessState,
        businessZip: validatedData.businessZip,
        businessCountry: validatedData.businessCountry,
        platform: validatedData.platform,
        platformClientId: validatedData.platformClientId,
        dba: validatedData.dba,
        website: validatedData.website,
        taxId: validatedData.taxId,
        businessType: validatedData.businessType,
        merchantCategoryCode: validatedData.merchantCategoryCode,
        annualVolume: validatedData.annualVolume,
        averageTicket: validatedData.averageTicket,
        highTicket: validatedData.highTicket,
      };

      const boardingResponse = await nmiPartnerService.createSubMerchant(boardingRequest);

      if (!boardingResponse.success) {
        return res.status(400).json({
          message: "Failed to create NMI sub-merchant",
          error: boardingResponse.errorMessage,
        });
      }

      // Store merchant in database
      const partnerId = process.env.NMI_PARTNER_ID || "LaskowskiD3124";
      const merchant = await storage.createMerchant({
        platform: validatedData.platform,
        platformClientId: validatedData.platformClientId,
        nmiMerchantId: boardingResponse.merchantId || null,
        partnerId: partnerId,
        businessName: validatedData.businessName,
        businessEmail: validatedData.businessEmail,
        businessPhone: validatedData.businessPhone || null,
        businessAddress: validatedData.businessAddress || null,
        businessCity: validatedData.businessCity || null,
        businessState: validatedData.businessState || null,
        businessZip: validatedData.businessZip || null,
        businessCountry: validatedData.businessCountry,
        status: boardingResponse.status || "pending",
        nmiApplicationStatus: boardingResponse.status || null,
        nmiApplicationData: boardingResponse.rawResponse || null,
        metadata: {
          dba: validatedData.dba,
          website: validatedData.website,
          businessType: validatedData.businessType,
          merchantCategoryCode: validatedData.merchantCategoryCode,
          annualVolume: validatedData.annualVolume,
          averageTicket: validatedData.averageTicket,
          highTicket: validatedData.highTicket,
        },
      });

      // Trigger merchant.created webhook
      await webhookService.sendWebhookEvent(
        WebhookEventType.MERCHANT_CREATED,
        validatedData.platform,
        {
          merchantId: merchant.id,
          platformClientId: validatedData.platformClientId,
          nmiMerchantId: merchant.nmiMerchantId,
          businessName: validatedData.businessName,
          businessEmail: validatedData.businessEmail,
          status: merchant.status,
          applicationId: boardingResponse.applicationId,
        }
      );

      res.status(201).json({
        merchantId: merchant.id,
        nmiMerchantId: merchant.nmiMerchantId,
        applicationId: boardingResponse.applicationId,
        status: merchant.status,
        message: boardingResponse.message || "Merchant application submitted successfully",
      });
    } catch (error) {
      console.error("Error creating merchant:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Invalid merchant data",
          errors: error.errors,
        });
      }
      res.status(500).json({
        message: "Failed to create merchant",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });

  // Get all merchants
  app.get("/api/v1/merchants", async (_req, res) => {
    try {
      const merchants = await storage.getAllMerchants();
      res.json(merchants);
    } catch (error) {
      console.error("Error fetching merchants:", error);
      res.status(500).json({ message: "Failed to fetch merchants" });
    }
  });

  // Get merchants by platform
  app.get("/api/v1/merchants/platform/:platform", async (req, res) => {
    try {
      const { platform } = req.params;
      const merchants = await storage.getMerchantsByPlatform(platform);
      res.json(merchants);
    } catch (error) {
      console.error("Error fetching merchants by platform:", error);
      res.status(500).json({ message: "Failed to fetch merchants" });
    }
  });

  // Get specific merchant
  app.get("/api/v1/merchants/:id", async (req, res) => {
    try {
      const merchant = await storage.getMerchant(req.params.id);
      if (!merchant) {
        return res.status(404).json({ message: "Merchant not found" });
      }
      res.json(merchant);
    } catch (error) {
      console.error("Error fetching merchant:", error);
      res.status(500).json({ message: "Failed to fetch merchant" });
    }
  });

  // Update merchant status
  app.patch("/api/v1/merchants/:id/status", async (req, res) => {
    try {
      const statusSchema = z.object({
        status: z.enum(["active", "suspended", "pending", "rejected"]),
      });

      const { status } = statusSchema.parse(req.body);
      const merchant = await storage.updateMerchantStatus(req.params.id, status);

      if (!merchant) {
        return res.status(404).json({ message: "Merchant not found" });
      }

      // If activating or suspending, also update in NMI
      if (status === "active" || status === "suspended") {
        try {
          const nmiPartnerService = createNMIPartnerService();
          if (merchant.nmiMerchantId) {
            await nmiPartnerService.updateMerchantStatus(
              merchant.nmiMerchantId,
              status
            );
          }
        } catch (nmiError) {
          console.error("Failed to update NMI merchant status:", nmiError);
          // Continue anyway - we updated our database
        }
      }

      // Trigger appropriate webhook based on status
      if (status === "active") {
        await webhookService.sendWebhookEvent(
          WebhookEventType.MERCHANT_APPROVED,
          merchant.platform,
          {
            merchantId: merchant.id,
            platformClientId: merchant.platformClientId,
            nmiMerchantId: merchant.nmiMerchantId,
            businessName: merchant.businessName,
            businessEmail: merchant.businessEmail,
            status: merchant.status,
          }
        );
      } else if (status === "suspended") {
        await webhookService.sendWebhookEvent(
          WebhookEventType.MERCHANT_SUSPENDED,
          merchant.platform,
          {
            merchantId: merchant.id,
            platformClientId: merchant.platformClientId,
            nmiMerchantId: merchant.nmiMerchantId,
            businessName: merchant.businessName,
            businessEmail: merchant.businessEmail,
            status: merchant.status,
          }
        );
      }

      res.json(merchant);
    } catch (error) {
      console.error("Error updating merchant status:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Invalid status",
          errors: error.errors,
        });
      }
      res.status(500).json({ message: "Failed to update merchant status" });
    }
  });

  // Check merchant application status with NMI
  app.get("/api/v1/merchants/:id/nmi-status", async (req, res) => {
    try {
      const merchant = await storage.getMerchant(req.params.id);
      if (!merchant) {
        return res.status(404).json({ message: "Merchant not found" });
      }

      if (!merchant.nmiMerchantId) {
        return res.status(400).json({
          message: "Merchant does not have an NMI merchant ID yet",
        });
      }

      const nmiPartnerService = createNMIPartnerService();
      const statusResponse = await nmiPartnerService.getMerchantStatus(
        merchant.nmiMerchantId
      );

      // Update our database with the latest status
      if (statusResponse.success && statusResponse.status) {
        await storage.updateMerchant(merchant.id, {
          nmiApplicationStatus: statusResponse.status,
        });
      }

      res.json({
        merchantId: merchant.id,
        nmiMerchantId: merchant.nmiMerchantId,
        status: statusResponse.status,
        message: statusResponse.message,
      });
    } catch (error) {
      console.error("Error checking NMI merchant status:", error);
      res.status(500).json({ message: "Failed to check merchant status" });
    }
  });

  // Partner Payment Processing API (requires API key authentication)

  // Process a payment on behalf of a merchant
  app.post("/api/v1/payments/process", requireApiKey, requirePermission("process_payments"), async (req, res) => {
    try {
      const authReq = req as AuthenticatedRequest;
      const platform = authReq.apiKey!.platform;

      // Validate payment request
      const paymentSchema = z.object({
        merchantId: z.string().uuid("Invalid merchant ID"),
        amount: z.number().positive("Amount must be positive"),
        currency: z.string().default("USD"),
        cardNumber: z.string().min(13, "Invalid card number"),
        cardName: z.string().min(1, "Cardholder name required"),
        expiry: z.string().regex(/^\d{4}$/, "Expiry must be MMYY format"),
        cvv: z.string().regex(/^\d{3,4}$/, "CVV must be 3-4 digits"),
        customerEmail: z.string().email("Valid email required"),
        customerName: z.string().optional(),
        billingAddress: z.object({
          address: z.string(),
          city: z.string(),
          state: z.string(),
          zip: z.string(),
          country: z.string().optional(),
        }).optional(),
        platformOrderId: z.string().optional(),
        metadata: z.record(z.any()).optional(),
        description: z.string().optional(),
        invoiceNumber: z.string().optional(),
      });

      const validatedData = paymentSchema.parse(req.body);

      // Get merchant
      const merchant = await storage.getMerchant(validatedData.merchantId);
      if (!merchant) {
        return res.status(404).json({
          error: "Merchant not found",
          message: "The specified merchant ID does not exist",
        });
      }

      // Verify merchant belongs to the requesting platform (unless internal)
      if (platform !== "internal" && merchant.platform !== platform) {
        return res.status(403).json({
          error: "Forbidden",
          message: "Cannot process payments for merchants from other platforms",
        });
      }

      // Validate card details
      const paymentService = createMerchantPaymentService();
      const validation = paymentService.validateCardDetails(validatedData as MerchantPaymentRequest);

      if (!validation.valid) {
        return res.status(400).json({
          error: "Invalid payment details",
          message: validation.errors.join(", "),
        });
      }

      // Process the payment
      const paymentResult = await paymentService.processPayment(merchant, validatedData as MerchantPaymentRequest);

      if (!paymentResult.success) {
        // Log failed transaction
        const failedTransaction = await storage.createPartnerPaymentTransaction({
          merchantId: merchant.id,
          platform: platform,
          platformOrderId: validatedData.platformOrderId || null,
          gatewayTransactionId: null,
          amount: validatedData.amount.toString(),
          currency: validatedData.currency,
          status: "failed",
          customerEmail: validatedData.customerEmail,
          customerName: validatedData.customerName || null,
          billingAddress: validatedData.billingAddress || null,
          errorMessage: paymentResult.errorMessage || null,
          gatewayResponse: paymentResult.rawResponse || null,
          metadata: validatedData.metadata || null,
          refundedAmount: "0",
          refundedAt: null,
        });

        // Trigger payment.failed webhook
        await webhookService.sendWebhookEvent(
          WebhookEventType.PAYMENT_FAILED,
          platform,
          {
            transactionId: failedTransaction.id,
            merchantId: merchant.id,
            platformOrderId: validatedData.platformOrderId || null,
            amount: validatedData.amount,
            currency: validatedData.currency,
            customerEmail: validatedData.customerEmail,
            errorMessage: paymentResult.errorMessage,
            metadata: validatedData.metadata,
          }
        );

        return res.status(400).json({
          success: false,
          error: "Payment failed",
          message: paymentResult.errorMessage || "Payment processing failed",
        });
      }

      // Extract card details from response
      const cardBrand = paymentResult.rawResponse?.cc_type || paymentResult.rawResponse?.card_type;
      const cardLastFour = paymentResult.rawResponse?.cc_number?.slice(-4);

      // Log successful transaction
      const transaction = await storage.createPartnerPaymentTransaction({
        merchantId: merchant.id,
        platform: platform,
        platformOrderId: validatedData.platformOrderId || null,
        gatewayTransactionId: paymentResult.transactionId || null,
        amount: validatedData.amount.toString(),
        currency: validatedData.currency,
        status: "success",
        paymentMethod: "credit_card",
        cardBrand: cardBrand || null,
        cardLastFour: cardLastFour || null,
        customerEmail: validatedData.customerEmail,
        customerName: validatedData.customerName || null,
        billingAddress: validatedData.billingAddress || null,
        errorMessage: null,
        gatewayResponse: paymentResult.rawResponse || null,
        metadata: validatedData.metadata || null,
        refundedAmount: "0",
        refundedAt: null,
      });

      // Trigger payment.success webhook
      await webhookService.sendWebhookEvent(
        WebhookEventType.PAYMENT_SUCCESS,
        platform,
        {
          transactionId: transaction.id,
          merchantId: merchant.id,
          platformOrderId: validatedData.platformOrderId || null,
          gatewayTransactionId: paymentResult.transactionId,
          authCode: paymentResult.authCode,
          amount: validatedData.amount,
          currency: validatedData.currency,
          cardBrand: cardBrand,
          cardLastFour: cardLastFour,
          customerEmail: validatedData.customerEmail,
          customerName: validatedData.customerName,
          metadata: validatedData.metadata,
        }
      );

      res.status(201).json({
        success: true,
        transactionId: transaction.id,
        gatewayTransactionId: paymentResult.transactionId,
        authCode: paymentResult.authCode,
        amount: validatedData.amount,
        currency: validatedData.currency,
        status: "success",
        cardBrand: cardBrand,
        cardLastFour: cardLastFour,
        message: paymentResult.message || "Payment processed successfully",
        createdAt: transaction.createdAt,
      });
    } catch (error) {
      console.error("Payment processing error:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: "Invalid payment request",
          message: "Validation failed",
          errors: error.errors,
        });
      }
      res.status(500).json({
        error: "Internal server error",
        message: "Failed to process payment",
      });
    }
  });

  // Process a refund
  app.post("/api/v1/payments/refund", requireApiKey, requirePermission("process_refunds"), async (req, res) => {
    try {
      const authReq = req as AuthenticatedRequest;
      const platform = authReq.apiKey!.platform;

      const refundSchema = z.object({
        transactionId: z.string().uuid("Invalid transaction ID"),
        amount: z.number().positive().optional(),
        reason: z.string().optional(),
      });

      const validatedData = refundSchema.parse(req.body);

      // Get the original transaction
      const transaction = await storage.getPartnerPaymentTransaction(validatedData.transactionId);

      if (!transaction) {
        return res.status(404).json({
          error: "Transaction not found",
          message: "The specified transaction ID does not exist",
        });
      }

      // Verify platform access
      if (platform !== "internal" && transaction.platform !== platform) {
        return res.status(403).json({
          error: "Forbidden",
          message: "Cannot refund transactions from other platforms",
        });
      }

      // Check if already fully refunded
      const refundedAmount = parseFloat(transaction.refundedAmount || "0");
      const transactionAmount = parseFloat(transaction.amount);

      if (refundedAmount >= transactionAmount) {
        return res.status(400).json({
          error: "Already refunded",
          message: "This transaction has already been fully refunded",
        });
      }

      // Get merchant
      const merchant = await storage.getMerchant(transaction.merchantId);
      if (!merchant) {
        return res.status(404).json({
          error: "Merchant not found",
        });
      }

      // Calculate refund amount
      const refundAmount = validatedData.amount || (transactionAmount - refundedAmount);

      if (refundAmount + refundedAmount > transactionAmount) {
        return res.status(400).json({
          error: "Invalid refund amount",
          message: "Refund amount exceeds available balance",
        });
      }

      // Process refund
      const paymentService = createMerchantPaymentService();
      const refundResult = await paymentService.processRefund(
        merchant,
        transaction.gatewayTransactionId!,
        refundAmount,
        validatedData.reason
      );

      if (!refundResult.success) {
        return res.status(400).json({
          success: false,
          error: "Refund failed",
          message: refundResult.errorMessage || "Refund processing failed",
        });
      }

      // Update transaction with refund info
      const newRefundedAmount = refundedAmount + refundAmount;
      const isFullyRefunded = newRefundedAmount >= transactionAmount;
      await storage.updatePartnerPaymentTransaction(transaction.id, {
        refundedAmount: newRefundedAmount.toString(),
        refundedAt: new Date(),
        status: isFullyRefunded ? "refunded" : "success",
      });

      // Trigger payment.refunded webhook
      await webhookService.sendWebhookEvent(
        WebhookEventType.PAYMENT_REFUNDED,
        platform,
        {
          transactionId: transaction.id,
          merchantId: merchant.id,
          platformOrderId: transaction.platformOrderId || null,
          gatewayTransactionId: refundResult.transactionId,
          originalAmount: parseFloat(transaction.amount),
          refundAmount: refundAmount,
          totalRefunded: newRefundedAmount,
          isFullyRefunded: isFullyRefunded,
          reason: validatedData.reason,
          customerEmail: transaction.customerEmail,
          metadata: transaction.metadata,
        }
      );

      res.json({
        success: true,
        transactionId: transaction.id,
        gatewayTransactionId: refundResult.transactionId,
        refundAmount: refundAmount,
        totalRefunded: newRefundedAmount,
        message: refundResult.message || "Refund processed successfully",
      });
    } catch (error) {
      console.error("Refund processing error:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: "Invalid refund request",
          errors: error.errors,
        });
      }
      res.status(500).json({
        error: "Internal server error",
        message: "Failed to process refund",
      });
    }
  });

  // Get transactions for a merchant
  app.get("/api/v1/payments/merchant/:merchantId", requireApiKey, async (req, res) => {
    try {
      const authReq = req as AuthenticatedRequest;
      const platform = authReq.apiKey!.platform;
      const { merchantId } = req.params;

      // Get merchant to verify platform access
      const merchant = await storage.getMerchant(merchantId);
      if (!merchant) {
        return res.status(404).json({ message: "Merchant not found" });
      }

      if (platform !== "internal" && merchant.platform !== platform) {
        return res.status(403).json({
          error: "Forbidden",
          message: "Cannot access transactions for merchants from other platforms",
        });
      }

      const transactions = await storage.getPartnerPaymentTransactionsByMerchant(merchantId);
      res.json(transactions);
    } catch (error) {
      console.error("Error fetching merchant transactions:", error);
      res.status(500).json({ message: "Failed to fetch transactions" });
    }
  });

  // Get transactions for a platform
  app.get("/api/v1/payments/platform/:platform", requireApiKey, async (req, res) => {
    try {
      const authReq = req as AuthenticatedRequest;
      const requestedPlatform = req.params.platform;

      // Verify platform access
      if (authReq.apiKey!.platform !== "internal" && authReq.apiKey!.platform !== requestedPlatform) {
        return res.status(403).json({
          error: "Forbidden",
          message: "Cannot access transactions from other platforms",
        });
      }

      const transactions = await storage.getPartnerPaymentTransactionsByPlatform(requestedPlatform);
      res.json(transactions);
    } catch (error) {
      console.error("Error fetching platform transactions:", error);
      res.status(500).json({ message: "Failed to fetch transactions" });
    }
  });

  // Get specific transaction details
  app.get("/api/v1/payments/:transactionId", requireApiKey, async (req, res) => {
    try {
      const authReq = req as AuthenticatedRequest;
      const platform = authReq.apiKey!.platform;
      const { transactionId } = req.params;

      const transaction = await storage.getPartnerPaymentTransaction(transactionId);
      if (!transaction) {
        return res.status(404).json({ message: "Transaction not found" });
      }

      // Verify platform access
      if (platform !== "internal" && transaction.platform !== platform) {
        return res.status(403).json({
          error: "Forbidden",
          message: "Cannot access transactions from other platforms",
        });
      }

      res.json(transaction);
    } catch (error) {
      console.error("Error fetching transaction:", error);
      res.status(500).json({ message: "Failed to fetch transaction" });
    }
  });

  // API Key Management Endpoints (internal use only)

  // Create a new API key
  app.post("/api/v1/api-keys/create", async (req, res) => {
    try {
      // TODO: Add admin authentication here
      // For now, anyone can create API keys (remove this in production!)

      const apiKeySchema = z.object({
        platform: z.enum(["businessblueprint", "hostsblue", "swipesblue", "internal"]),
        name: z.string().min(1, "Name is required"),
        permissions: z.array(z.string()).default(["*"]),
        metadata: z.record(z.any()).optional(),
      });

      const validatedData = apiKeySchema.parse(req.body);

      // Generate API key and secret
      const apiKey = generateApiKey();
      const apiSecret = generateApiSecret();

      // Create API key in database
      const createdKey = await storage.createApiKey({
        platform: validatedData.platform,
        name: validatedData.name,
        apiKey: apiKey,
        apiSecret: apiSecret,
        isActive: true,
        permissions: validatedData.permissions,
        metadata: validatedData.metadata || null,
        lastUsedAt: null,
      });

      res.status(201).json({
        id: createdKey.id,
        platform: createdKey.platform,
        name: createdKey.name,
        apiKey: apiKey, // Return the key only once!
        apiSecret: apiSecret,
        permissions: createdKey.permissions,
        isActive: createdKey.isActive,
        createdAt: createdKey.createdAt,
        message: "API key created successfully. Store these credentials securely - they won't be shown again.",
      });
    } catch (error) {
      console.error("Error creating API key:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: "Invalid API key data",
          errors: error.errors,
        });
      }
      res.status(500).json({ message: "Failed to create API key" });
    }
  });

  // List API keys (without exposing the actual keys)
  app.get("/api/v1/api-keys", async (_req, res) => {
    try {
      // TODO: Add admin authentication here
      const keys = await storage.getAllApiKeys();

      // Remove sensitive data
      const sanitizedKeys = keys.map(key => ({
        id: key.id,
        platform: key.platform,
        name: key.name,
        isActive: key.isActive,
        permissions: key.permissions,
        lastUsedAt: key.lastUsedAt,
        createdAt: key.createdAt,
        // Don't return apiKey or apiSecret
      }));

      res.json(sanitizedKeys);
    } catch (error) {
      console.error("Error fetching API keys:", error);
      res.status(500).json({ message: "Failed to fetch API keys" });
    }
  });

  // Deactivate an API key
  app.delete("/api/v1/api-keys/:id", async (req, res) => {
    try {
      // TODO: Add admin authentication here
      const deactivated = await storage.deactivateApiKey(req.params.id);
      if (!deactivated) {
        return res.status(404).json({ message: "API key not found" });
      }
      res.json({ message: "API key deactivated successfully" });
    } catch (error) {
      console.error("Error deactivating API key:", error);
      res.status(500).json({ message: "Failed to deactivate API key" });
    }
  });

  // Webhook Management API (requires API key authentication)

  // Register a new webhook endpoint
  app.post("/api/v1/webhooks/register", requireApiKey, async (req, res) => {
    try {
      const authReq = req as AuthenticatedRequest;
      const platform = authReq.apiKey!.platform;

      const webhookSchema = z.object({
        url: z.string().url("Invalid webhook URL"),
        events: z.array(z.nativeEnum(WebhookEventType)).min(1, "At least one event type required"),
      });

      const validatedData = webhookSchema.parse(req.body);

      // Register webhook
      const { endpoint, secret } = await webhookService.registerWebhook(
        platform,
        validatedData.url,
        validatedData.events
      );

      // Return webhook details with secret (only shown once)
      res.status(201).json({
        id: endpoint.id,
        platform: endpoint.platform,
        url: endpoint.url,
        events: endpoint.events,
        secret: secret, // This is the only time the secret is returned
        isActive: endpoint.isActive,
        createdAt: endpoint.createdAt,
        message: "Webhook registered successfully. Save the secret - it won't be shown again.",
      });
    } catch (error) {
      console.error("Error registering webhook:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: "Invalid webhook registration",
          message: "Validation failed",
          errors: error.errors,
        });
      }
      if (error instanceof Error && error.message.includes("Invalid")) {
        return res.status(400).json({
          error: "Invalid webhook data",
          message: error.message,
        });
      }
      res.status(500).json({
        error: "Internal server error",
        message: "Failed to register webhook",
      });
    }
  });

  // List webhooks for the authenticated platform
  app.get("/api/v1/webhooks", requireApiKey, async (req, res) => {
    try {
      const authReq = req as AuthenticatedRequest;
      const platform = authReq.apiKey!.platform;

      const endpoints = await storage.getWebhookEndpointsByPlatform(platform);

      // Remove secrets from response
      const sanitizedEndpoints = endpoints.map(endpoint => ({
        id: endpoint.id,
        platform: endpoint.platform,
        url: endpoint.url,
        events: endpoint.events,
        isActive: endpoint.isActive,
        createdAt: endpoint.createdAt,
        updatedAt: endpoint.updatedAt,
        // Don't return secret
      }));

      res.json(sanitizedEndpoints);
    } catch (error) {
      console.error("Error fetching webhooks:", error);
      res.status(500).json({
        error: "Internal server error",
        message: "Failed to fetch webhooks",
      });
    }
  });

  // Delete a webhook endpoint
  app.delete("/api/v1/webhooks/:id", requireApiKey, async (req, res) => {
    try {
      const authReq = req as AuthenticatedRequest;
      const platform = authReq.apiKey!.platform;

      // Get the webhook to verify it belongs to this platform
      const endpoint = await storage.getWebhookEndpoint(req.params.id);

      if (!endpoint) {
        return res.status(404).json({
          error: "Webhook not found",
          message: "The specified webhook endpoint does not exist",
        });
      }

      // Verify platform ownership (unless internal)
      if (platform !== "internal" && endpoint.platform !== platform) {
        return res.status(403).json({
          error: "Forbidden",
          message: "Cannot delete webhooks from other platforms",
        });
      }

      // Delete the webhook (this will also cascade delete all deliveries)
      const deleted = await storage.deleteWebhookEndpoint(req.params.id);

      if (!deleted) {
        return res.status(404).json({
          error: "Webhook not found",
          message: "Failed to delete webhook",
        });
      }

      res.json({
        success: true,
        message: "Webhook deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting webhook:", error);
      res.status(500).json({
        error: "Internal server error",
        message: "Failed to delete webhook",
      });
    }
  });

  // Test a webhook endpoint
  app.post("/api/v1/webhooks/:id/test", requireApiKey, async (req, res) => {
    try {
      const authReq = req as AuthenticatedRequest;
      const platform = authReq.apiKey!.platform;

      // Get the webhook to verify it belongs to this platform
      const endpoint = await storage.getWebhookEndpoint(req.params.id);

      if (!endpoint) {
        return res.status(404).json({
          error: "Webhook not found",
          message: "The specified webhook endpoint does not exist",
        });
      }

      // Verify platform ownership (unless internal)
      if (platform !== "internal" && endpoint.platform !== platform) {
        return res.status(403).json({
          error: "Forbidden",
          message: "Cannot test webhooks from other platforms",
        });
      }

      // Send test webhook
      const result = await webhookService.testWebhook(req.params.id);

      if (result.success) {
        res.json({
          success: true,
          status: result.status,
          message: result.message,
        });
      } else {
        res.status(400).json({
          success: false,
          message: result.message,
        });
      }
    } catch (error) {
      console.error("Error testing webhook:", error);
      res.status(500).json({
        error: "Internal server error",
        message: "Failed to test webhook",
      });
    }
  });

  // ========================================
  // Admin Authentication
  // ========================================
  
  const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "changeme123";

  // Admin login
  app.post("/api/admin/auth/login", (req, res) => {
    const { username, password } = req.body;
    
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      (req.session as any).isAdmin = true;
      res.json({ success: true, message: "Login successful" });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  });

  // Admin logout
  app.post("/api/admin/auth/logout", (req, res) => {
    (req.session as any).isAdmin = false;
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ success: false, message: "Logout failed" });
      } else {
        res.json({ success: true, message: "Logged out" });
      }
    });
  });

  // Check admin auth status
  app.get("/api/admin/auth/check", (req, res) => {
    const isAdmin = (req.session as any)?.isAdmin === true;
    res.json({ authenticated: isAdmin });
  });

  // Middleware to protect admin routes
  function requireAdmin(req: any, res: any, next: any) {
    if ((req.session as any)?.isAdmin === true) {
      next();
    } else {
      res.status(401).json({ error: "Unauthorized", message: "Admin authentication required" });
    }
  }

  // ========================================
  // Admin API Endpoints
  // ========================================
  // These endpoints provide admin functionality for the SwipesBlue admin dashboard

  // Get dashboard metrics
  app.get("/api/admin/metrics", requireAdmin, async (_req, res) => {
    try {
      // Get all transactions
      const allTransactions = await storage.getAllPartnerPaymentTransactions();

      // Calculate total processed
      const totalProcessed = allTransactions.reduce((sum, t) => {
        return sum + parseFloat(t.amount);
      }, 0);

      // Calculate this month's revenue
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const thisMonthTransactions = allTransactions.filter(t =>
        new Date(t.createdAt) >= startOfMonth && t.status === "success"
      );
      const thisMonth = thisMonthTransactions.reduce((sum, t) => {
        return sum + parseFloat(t.amount);
      }, 0);

      // Calculate success rate (last 30 days)
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      const recentTransactions = allTransactions.filter(t =>
        new Date(t.createdAt) >= thirtyDaysAgo
      );
      const successfulTransactions = recentTransactions.filter(t => t.status === "success");
      const successRate = recentTransactions.length > 0
        ? ((successfulTransactions.length / recentTransactions.length) * 100).toFixed(1)
        : "0.0";

      // Platform breakdown
      const platformStats = allTransactions
        .filter(t => t.status === "success")
        .reduce((acc, t) => {
          const platform = t.platform;
          if (!acc[platform]) {
            acc[platform] = 0;
          }
          acc[platform] += parseFloat(t.amount);
          return acc;
        }, {} as Record<string, number>);

      const platformBreakdown = Object.entries(platformStats).map(([name, value], index) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value: Math.round(value),
        color: index === 0 ? "#3b82f6" : "#8b5cf6",
      }));

      // Get merchant stats
      const allMerchants = await storage.getAllMerchants();
      const merchantStats = {
        active: allMerchants.filter(m => m.status === "active").length,
        pending: allMerchants.filter(m => m.status === "pending").length,
        suspended: allMerchants.filter(m => m.status === "suspended").length,
      };

      res.json({
        totalProcessed: `$${totalProcessed.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        thisMonth: `$${thisMonth.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        successRate: `${successRate}%`,
        platformBreakdown,
        merchantStats,
      });
    } catch (error) {
      console.error("Error fetching admin metrics:", error);
      res.status(500).json({ message: "Failed to fetch metrics" });
    }
  });

  // Get recent transactions for dashboard
  app.get("/api/admin/transactions/recent", requireAdmin, async (_req, res) => {
    try {
      const allTransactions = await storage.getAllPartnerPaymentTransactions();

      // Sort by date descending and take first 10
      const recentTransactions = allTransactions
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 10);

      res.json(recentTransactions);
    } catch (error) {
      console.error("Error fetching recent transactions:", error);
      res.status(500).json({ message: "Failed to fetch recent transactions" });
    }
  });

  // Get payment volume data (last 30 days)
  app.get("/api/admin/volume", requireAdmin, async (_req, res) => {
    try {
      const allTransactions = await storage.getAllPartnerPaymentTransactions();

      // Get transactions from last 30 days
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      const recentTransactions = allTransactions.filter(t =>
        new Date(t.createdAt) >= thirtyDaysAgo && t.status === "success"
      );

      // Group by date
      const volumeByDate = recentTransactions.reduce((acc, t) => {
        const date = new Date(t.createdAt).toISOString().split('T')[0];
        if (!acc[date]) {
          acc[date] = 0;
        }
        acc[date] += parseFloat(t.amount);
        return acc;
      }, {} as Record<string, number>);

      // Create array with all dates (fill missing dates with 0)
      const volumeData = [];
      for (let i = 29; i >= 0; i--) {
        const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
        const dateStr = date.toISOString().split('T')[0];
        const displayDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

        volumeData.push({
          date: displayDate,
          amount: Math.round(volumeByDate[dateStr] || 0),
        });
      }

      res.json(volumeData);
    } catch (error) {
      console.error("Error fetching volume data:", error);
      res.status(500).json({ message: "Failed to fetch volume data" });
    }
  });

  // Get all transactions (admin view - no platform filter)
  app.get("/api/admin/transactions", requireAdmin, async (_req, res) => {
    try {
      const allTransactions = await storage.getAllPartnerPaymentTransactions();

      // Sort by date descending
      const sortedTransactions = allTransactions.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      res.json(sortedTransactions);
    } catch (error) {
      console.error("Error fetching admin transactions:", error);
      res.status(500).json({ message: "Failed to fetch transactions" });
    }
  });

  // Get all webhooks (admin view - all platforms)
  app.get("/api/admin/webhooks", requireAdmin, async (_req, res) => {
    try {
      const allWebhooks = await storage.getAllWebhookEndpoints();
      res.json(allWebhooks);
    } catch (error) {
      console.error("Error fetching admin webhooks:", error);
      res.status(500).json({ message: "Failed to fetch webhooks" });
    }
  });

  // Register webhook (admin)
  app.post("/api/admin/webhooks/register", requireAdmin, async (req, res) => {
    try {
      const registerSchema = z.object({
        platform: z.string(),
        url: z.string().url(),
        events: z.array(z.string()).min(1),
      });

      const validatedData = registerSchema.parse(req.body);

      // Register webhook
      const { endpoint, secret } = await webhookService.registerWebhook(
        validatedData.platform,
        validatedData.url,
        validatedData.events as any
      );

      res.status(201).json({
        id: endpoint.id,
        platform: endpoint.platform,
        url: endpoint.url,
        events: endpoint.events,
        secret: secret,
        isActive: endpoint.isActive,
        createdAt: endpoint.createdAt,
        message: "Webhook registered successfully. Save the secret - it won't be shown again.",
      });
    } catch (error) {
      console.error("Error registering webhook:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: "Invalid webhook registration",
          message: "Validation failed",
          errors: error.errors,
        });
      }
      if (error instanceof Error && error.message.includes("Invalid")) {
        return res.status(400).json({
          error: "Invalid webhook data",
          message: error.message,
        });
      }
      res.status(500).json({
        error: "Internal server error",
        message: "Failed to register webhook",
      });
    }
  });

  // Test webhook (admin)
  app.post("/api/admin/webhooks/:id/test", requireAdmin, async (req, res) => {
    try {
      const endpoint = await storage.getWebhookEndpoint(req.params.id);

      if (!endpoint) {
        return res.status(404).json({
          error: "Webhook not found",
          message: "The specified webhook endpoint does not exist",
        });
      }

      // Send test webhook
      const result = await webhookService.testWebhook(req.params.id);

      if (result.success) {
        res.json({
          success: true,
          status: result.status,
          message: result.message,
        });
      } else {
        res.status(400).json({
          success: false,
          message: result.message,
        });
      }
    } catch (error) {
      console.error("Error testing webhook:", error);
      res.status(500).json({
        error: "Internal server error",
        message: "Failed to test webhook",
      });
    }
  });

  // Get webhook deliveries (admin)
  app.get("/api/admin/webhooks/:id/deliveries", requireAdmin, async (req, res) => {
    try {
      const deliveries = await storage.getWebhookDeliveriesByEndpoint(req.params.id);

      // Sort by date descending
      const sortedDeliveries = deliveries.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      res.json(sortedDeliveries);
    } catch (error) {
      console.error("Error fetching webhook deliveries:", error);
      res.status(500).json({ message: "Failed to fetch deliveries" });
    }
  });

  // Delete webhook (admin)
  app.delete("/api/admin/webhooks/:id", requireAdmin, async (req, res) => {
    try {
      const endpoint = await storage.getWebhookEndpoint(req.params.id);

      if (!endpoint) {
        return res.status(404).json({
          error: "Webhook not found",
          message: "The specified webhook endpoint does not exist",
        });
      }

      const deleted = await storage.deleteWebhookEndpoint(req.params.id);

      if (!deleted) {
        return res.status(404).json({
          error: "Webhook not found",
          message: "Failed to delete webhook",
        });
      }

      res.json({
        success: true,
        message: "Webhook deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting webhook:", error);
      res.status(500).json({
        error: "Internal server error",
        message: "Failed to delete webhook",
      });
    }
  });

  // ========================================
  // Rate Management API Endpoints
  // ========================================

  // Get all active rates
  app.get("/api/admin/rates", requireAdmin, async (_req, res) => {
    try {
      const rates = await storage.getAllRatesActive();
      res.json(rates);
    } catch (error) {
      console.error("Error fetching rates:", error);
      res.status(500).json({ error: "Failed to fetch rates" });
    }
  });

  // Get rates by tier type
  app.get("/api/admin/rates/type/:tierType", requireAdmin, async (req, res) => {
    try {
      const rates = await storage.getRatesByType(req.params.tierType);
      res.json(rates);
    } catch (error) {
      console.error("Error fetching rates by type:", error);
      res.status(500).json({ error: "Failed to fetch rates" });
    }
  });

  // Create new rate
  app.post("/api/admin/rates", requireAdmin, async (req, res) => {
    try {
      const rateSchema = z.object({
        tierName: z.string().min(1),
        tierType: z.enum(["ecommerce", "developer"]),
        monthlyFee: z.string().or(z.number()).transform(v => String(v)),
        transactionPercent: z.string().or(z.number()).transform(v => String(v)),
        transactionFlat: z.string().or(z.number()).transform(v => String(v)),
        description: z.string().optional(),
        features: z.array(z.string()).optional(),
        isActive: z.boolean().optional().default(true),
        displayOrder: z.number().optional().default(0),
      });

      const validated = rateSchema.parse(req.body);
      const rate = await storage.createRatesActive(validated);

      // Log the creation
      await storage.createRatesAuditLog({
        action: "create",
        tableName: "rates_active",
        recordId: rate.id,
        newValues: validated,
        changedBy: "admin",
      });

      res.json(rate);
    } catch (error) {
      console.error("Error creating rate:", error);
      res.status(500).json({ error: "Failed to create rate" });
    }
  });

  // Update rate
  app.patch("/api/admin/rates/:id", requireAdmin, async (req, res) => {
    try {
      const existingRate = await storage.getRatesActive(req.params.id);
      if (!existingRate) {
        return res.status(404).json({ error: "Rate not found" });
      }

      const rateSchema = z.object({
        tierName: z.string().min(1).optional(),
        tierType: z.enum(["ecommerce", "developer"]).optional(),
        monthlyFee: z.string().or(z.number()).transform(v => String(v)).optional(),
        transactionPercent: z.string().or(z.number()).transform(v => String(v)).optional(),
        transactionFlat: z.string().or(z.number()).transform(v => String(v)).optional(),
        description: z.string().optional(),
        features: z.array(z.string()).optional(),
        isActive: z.boolean().optional(),
        displayOrder: z.number().optional(),
      });

      const validated = rateSchema.parse(req.body);
      const rate = await storage.updateRatesActive(req.params.id, validated);

      // Log the update
      await storage.createRatesAuditLog({
        action: "update",
        tableName: "rates_active",
        recordId: req.params.id,
        previousValues: existingRate,
        newValues: validated,
        changedBy: "admin",
      });

      res.json(rate);
    } catch (error) {
      console.error("Error updating rate:", error);
      res.status(500).json({ error: "Failed to update rate" });
    }
  });

  // Delete rate
  app.delete("/api/admin/rates/:id", requireAdmin, async (req, res) => {
    try {
      const existingRate = await storage.getRatesActive(req.params.id);
      if (!existingRate) {
        return res.status(404).json({ error: "Rate not found" });
      }

      const deleted = await storage.deleteRatesActive(req.params.id);

      // Log the deletion
      await storage.createRatesAuditLog({
        action: "delete",
        tableName: "rates_active",
        recordId: req.params.id,
        previousValues: existingRate,
        changedBy: "admin",
      });

      res.json({ success: deleted });
    } catch (error) {
      console.error("Error deleting rate:", error);
      res.status(500).json({ error: "Failed to delete rate" });
    }
  });

  // Get costs baseline
  app.get("/api/admin/costs", requireAdmin, async (_req, res) => {
    try {
      const costs = await storage.getAllCostsBaseline();
      res.json(costs);
    } catch (error) {
      console.error("Error fetching costs:", error);
      res.status(500).json({ error: "Failed to fetch costs" });
    }
  });

  // Create/update cost baseline
  app.post("/api/admin/costs", requireAdmin, async (req, res) => {
    try {
      const costSchema = z.object({
        name: z.string().min(1),
        description: z.string().optional(),
        percentCost: z.string().or(z.number()).transform(v => v ? String(v) : null).optional(),
        flatCost: z.string().or(z.number()).transform(v => v ? String(v) : null).optional(),
        targetMarginPercent: z.string().or(z.number()).transform(v => v ? String(v) : null).optional(),
        notes: z.string().optional(),
      });

      const validated = costSchema.parse(req.body);
      const cost = await storage.createCostsBaseline(validated);
      res.json(cost);
    } catch (error) {
      console.error("Error creating cost:", error);
      res.status(500).json({ error: "Failed to create cost" });
    }
  });

  // Update cost baseline
  app.patch("/api/admin/costs/:id", requireAdmin, async (req, res) => {
    try {
      const costSchema = z.object({
        name: z.string().min(1).optional(),
        description: z.string().optional(),
        percentCost: z.string().or(z.number()).transform(v => v ? String(v) : null).optional(),
        flatCost: z.string().or(z.number()).transform(v => v ? String(v) : null).optional(),
        targetMarginPercent: z.string().or(z.number()).transform(v => v ? String(v) : null).optional(),
        notes: z.string().optional(),
      });

      const validated = costSchema.parse(req.body);
      const cost = await storage.updateCostsBaseline(req.params.id, validated);
      res.json(cost);
    } catch (error) {
      console.error("Error updating cost:", error);
      res.status(500).json({ error: "Failed to update cost" });
    }
  });

  // Get audit logs
  app.get("/api/admin/rates/audit", requireAdmin, async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 50;
      const logs = await storage.getRatesAuditLogs(limit);
      res.json(logs);
    } catch (error) {
      console.error("Error fetching audit logs:", error);
      res.status(500).json({ error: "Failed to fetch audit logs" });
    }
  });

  // ========================================
  // Staged Rates API Endpoints (5-Button Workflow)
  // ========================================

  // Get all staged rates
  app.get("/api/admin/rates/staged", requireAdmin, async (_req, res) => {
    try {
      const stagedRates = await storage.getAllRatesStaged();
      res.json(stagedRates);
    } catch (error) {
      console.error("Error fetching staged rates:", error);
      res.status(500).json({ error: "Failed to fetch staged rates" });
    }
  });

  // Upload rates to staging (Button 3: UPLOAD)
  app.post("/api/admin/rates/staged", requireAdmin, async (req, res) => {
    try {
      const rateSchema = z.object({
        tierName: z.string().min(1),
        tierType: z.string().min(1),
        monthlyFee: z.string().or(z.number()).transform(v => String(v)),
        transactionPercent: z.string().or(z.number()).transform(v => String(v)),
        transactionFlat: z.string().or(z.number()).transform(v => String(v)),
        description: z.string().optional().nullable(),
        features: z.array(z.string()).optional().nullable(),
        isActive: z.boolean().optional().default(true),
        displayOrder: z.number().optional().default(0),
        status: z.string().optional().default("pending"),
        createdBy: z.string().optional().nullable(),
      });

      const validated = rateSchema.parse(req.body);
      const stagedRate = await storage.createRatesStaged(validated);
      
      await storage.createRatesAuditLog({
        action: "stage",
        tableName: "rates_staged",
        recordId: stagedRate.id,
        newValues: stagedRate,
        changedBy: "admin",
        reason: "Rate staged for review",
      });

      res.json(stagedRate);
    } catch (error) {
      console.error("Error staging rate:", error);
      res.status(500).json({ error: "Failed to stage rate" });
    }
  });

  // Bulk upload rates to staging
  app.post("/api/admin/rates/staged/bulk", requireAdmin, async (req, res) => {
    try {
      const { rates } = req.body;
      if (!Array.isArray(rates)) {
        return res.status(400).json({ error: "rates must be an array" });
      }

      await storage.clearRatesStaged();

      const stagedRates = [];
      for (const rate of rates) {
        const stagedRate = await storage.createRatesStaged({
          tierName: rate.tierName,
          tierType: rate.tierType,
          monthlyFee: String(rate.monthlyFee),
          transactionPercent: String(rate.transactionPercent),
          transactionFlat: String(rate.transactionFlat),
          description: rate.description || null,
          features: rate.features || null,
          isActive: rate.isActive ?? true,
          displayOrder: rate.displayOrder ?? 0,
          status: "pending",
          createdBy: "admin",
        });
        stagedRates.push(stagedRate);
      }

      await storage.createRatesAuditLog({
        action: "bulk_stage",
        tableName: "rates_staged",
        recordId: "bulk",
        newValues: { count: stagedRates.length },
        changedBy: "admin",
        reason: "Bulk rates staged for review",
      });

      res.json({ success: true, staged: stagedRates.length, rates: stagedRates });
    } catch (error) {
      console.error("Error bulk staging rates:", error);
      res.status(500).json({ error: "Failed to bulk stage rates" });
    }
  });

  // Activate staged rates (Button 4: ACTIVATE)
  app.post("/api/admin/rates/staged/activate", requireAdmin, async (req, res) => {
    try {
      const stagedRates = await storage.getAllRatesStaged();
      if (stagedRates.length === 0) {
        return res.status(400).json({ error: "No staged rates to activate" });
      }

      const previousActiveRates = await storage.getAllRatesActive();
      const activatedRates = await storage.activateStagedRates();

      await storage.createRatesAuditLog({
        action: "activate",
        tableName: "rates_active",
        recordId: "bulk_activation",
        previousValues: { rates: previousActiveRates },
        newValues: { rates: activatedRates },
        changedBy: "admin",
        reason: "Staged rates activated and made live",
      });

      res.json({ 
        success: true, 
        activated: activatedRates.length,
        rates: activatedRates,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error activating staged rates:", error);
      res.status(500).json({ error: "Failed to activate staged rates" });
    }
  });

  // Clear staged rates
  app.delete("/api/admin/rates/staged", requireAdmin, async (_req, res) => {
    try {
      await storage.clearRatesStaged();
      res.json({ success: true });
    } catch (error) {
      console.error("Error clearing staged rates:", error);
      res.status(500).json({ error: "Failed to clear staged rates" });
    }
  });

  // Research rates with AI (Button 2: RESEARCH)
  app.post("/api/admin/rates/research", requireAdmin, async (req, res) => {
    try {
      const { draftRates } = req.body;
      if (!Array.isArray(draftRates)) {
        return res.status(400).json({ error: "draftRates must be an array" });
      }

      const costs = await storage.getAllCostsBaseline();
      const interchangeCost = costs.find(c => c.name === 'interchange_plus');
      const perTransactionCost = costs.find(c => c.name === 'per_transaction');
      
      const baseCostPercent = interchangeCost?.percentCost ? parseFloat(interchangeCost.percentCost) : 2.20;
      const baseCostFlat = perTransactionCost?.flatCost ? parseFloat(perTransactionCost.flatCost) : 0.30;
      const targetMargin = interchangeCost?.targetMarginPercent ? parseFloat(interchangeCost.targetMarginPercent) : 0.50;

      const competitors = {
        stripe: { name: "Stripe", percent: 2.90, flat: 0.30 },
        paypal: { name: "PayPal", percent: 2.99, flat: 0.49 },
        square: { name: "Square", percent: 2.90, flat: 0.30 },
      };

      const analysis = draftRates.map(rate => {
        const ratePercent = parseFloat(rate.transactionPercent);
        const rateFlat = parseFloat(rate.transactionFlat);
        const margin = ratePercent - baseCostPercent;
        const meetsTarget = margin >= targetMargin;

        const competitorComparison = Object.entries(competitors).map(([key, comp]) => {
          const testAmount = 100;
          const ourFee = (testAmount * ratePercent / 100) + rateFlat;
          const theirFee = (testAmount * comp.percent / 100) + comp.flat;
          const savings = theirFee - ourFee;
          return {
            provider: comp.name,
            rate: `${comp.percent}% + $${comp.flat.toFixed(2)}`,
            fee: theirFee.toFixed(2),
            savings: savings.toFixed(2),
            isLower: ourFee < theirFee,
          };
        });

        let status: "green" | "yellow" | "red" = "green";
        if (!meetsTarget) {
          status = "red";
        } else if (competitorComparison.some(c => !c.isLower)) {
          status = "yellow";
        }

        return {
          tierName: rate.tierName,
          tierType: rate.tierType,
          yourRate: `${ratePercent.toFixed(2)}% + $${rateFlat.toFixed(2)}`,
          yourCost: `${baseCostPercent.toFixed(2)}% + $${baseCostFlat.toFixed(2)}`,
          margin: `${margin.toFixed(2)}%`,
          targetMargin: `${targetMargin.toFixed(2)}%`,
          meetsTarget,
          status,
          competitors: competitorComparison,
        };
      });

      const allMeetTarget = analysis.every(a => a.meetsTarget);
      const allCompetitive = analysis.every(a => a.status !== "yellow");

      const timestamp = new Date().toISOString();
      const report = {
        timestamp,
        baseCosts: {
          interchangePlus: `${baseCostPercent.toFixed(2)}%`,
          perTransaction: `$${baseCostFlat.toFixed(2)}`,
          targetMargin: `${targetMargin.toFixed(2)}%`,
          minimumRateNeeded: `${(baseCostPercent + targetMargin).toFixed(2)}% + $${baseCostFlat.toFixed(2)}`,
        },
        tierAnalysis: analysis,
        competitorRates: {
          swipesBlue: "2.70% + $0.30",
          stripe: "2.90% + $0.30",
          paypal: "2.99% + $0.49",
          square: "2.90% + $0.30",
        },
        summary: {
          allMeetTarget,
          allCompetitive,
          readyToUpload: allMeetTarget,
          message: allMeetTarget 
            ? (allCompetitive 
              ? "All tiers meet target margin and are competitive. Ready to upload."
              : "All tiers meet target margin but some are higher than competitors. Ready to upload.")
            : "Some tiers do not meet target margin. Please adjust before uploading.",
        },
      };

      res.json(report);
    } catch (error) {
      console.error("Error researching rates:", error);
      res.status(500).json({ error: "Failed to research rates" });
    }
  });

  // Compare rates (Button 5: COMPARE)
  app.get("/api/admin/rates/compare", requireAdmin, async (_req, res) => {
    try {
      const activeRates = await storage.getAllRatesActive();
      const stagedRates = await storage.getAllRatesStaged();
      const costs = await storage.getAllCostsBaseline();

      const competitors = {
        stripe: { percent: 2.90, flat: 0.30 },
        paypal: { percent: 2.99, flat: 0.49 },
        square: { percent: 2.90, flat: 0.30 },
      };

      res.json({
        active: activeRates,
        staged: stagedRates,
        costs,
        competitors,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error comparing rates:", error);
      res.status(500).json({ error: "Failed to compare rates" });
    }
  });

  // ========================================
  // Add-On Products API Endpoints
  // ========================================

  // Get all add-ons (admin)
  app.get("/api/admin/addons", requireAdmin, async (_req, res) => {
    try {
      const addons = await storage.getAllAddOnProducts();
      res.json(addons);
    } catch (error) {
      console.error("Error fetching add-ons:", error);
      res.status(500).json({ error: "Failed to fetch add-ons" });
    }
  });

  // Create add-on (admin)
  app.post("/api/admin/addons", requireAdmin, async (req, res) => {
    try {
      const addOnSchema = z.object({
        name: z.string().min(1),
        slug: z.string().min(1),
        description: z.string().optional(),
        monthlyPrice: z.string().or(z.number()).transform(v => String(v)),
        yearlyPrice: z.string().or(z.number()).transform(v => v ? String(v) : null).optional(),
        features: z.array(z.string()).optional(),
        requiredTier: z.string().optional(),
        category: z.string().optional().default("general"),
        icon: z.string().optional(),
        isActive: z.boolean().optional().default(true),
        displayOrder: z.number().optional().default(0),
      });

      const validated = addOnSchema.parse(req.body);
      const addOn = await storage.createAddOnProduct(validated);
      res.json(addOn);
    } catch (error) {
      console.error("Error creating add-on:", error);
      res.status(500).json({ error: "Failed to create add-on" });
    }
  });

  // Update add-on (admin)
  app.patch("/api/admin/addons/:id", requireAdmin, async (req, res) => {
    try {
      const addOnSchema = z.object({
        name: z.string().min(1).optional(),
        slug: z.string().min(1).optional(),
        description: z.string().optional(),
        monthlyPrice: z.string().or(z.number()).transform(v => String(v)).optional(),
        yearlyPrice: z.string().or(z.number()).transform(v => v ? String(v) : null).optional(),
        features: z.array(z.string()).optional(),
        requiredTier: z.string().optional(),
        category: z.string().optional(),
        icon: z.string().optional(),
        isActive: z.boolean().optional(),
        displayOrder: z.number().optional(),
      });

      const validated = addOnSchema.parse(req.body);
      const addOn = await storage.updateAddOnProduct(req.params.id, validated);
      res.json(addOn);
    } catch (error) {
      console.error("Error updating add-on:", error);
      res.status(500).json({ error: "Failed to update add-on" });
    }
  });

  // Delete add-on (admin)
  app.delete("/api/admin/addons/:id", requireAdmin, async (req, res) => {
    try {
      const deleted = await storage.deleteAddOnProduct(req.params.id);
      res.json({ success: deleted });
    } catch (error) {
      console.error("Error deleting add-on:", error);
      res.status(500).json({ error: "Failed to delete add-on" });
    }
  });

  // Public API: Get active add-ons
  app.get("/api/addons", async (_req, res) => {
    try {
      const addons = await storage.getActiveAddOnProducts();
      res.json(addons);
    } catch (error) {
      console.error("Error fetching add-ons:", error);
      res.status(500).json({ error: "Failed to fetch add-ons" });
    }
  });

  // Public API: Get rates for pricing page (no auth required)
  app.get("/api/rates", async (_req, res) => {
    try {
      const rates = await storage.getAllRatesActive();
      // Only return active rates with public-facing fields
      const publicRates = rates
        .filter(r => r.isActive)
        .map(r => ({
          tierName: r.tierName,
          tierType: r.tierType,
          monthlyFee: r.monthlyFee,
          transactionPercent: r.transactionPercent,
          transactionFlat: r.transactionFlat,
          description: r.description,
          features: r.features,
        }));
      res.json(publicRates);
    } catch (error) {
      console.error("Error fetching public rates:", error);
      res.status(500).json({ error: "Failed to fetch rates" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
