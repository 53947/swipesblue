import { sql } from "drizzle-orm";
import {
  pgTable,
  text,
  varchar,
  decimal,
  integer,
  timestamp,
  boolean,
  json,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session table for express-session
export const session = pgTable("session", {
  sid: varchar("sid").primaryKey(),
  sess: json("sess").notNull(),
  expire: timestamp("expire").notNull(),
});

// Users table
export const users = pgTable("users", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Products table
export const products = pgTable("products", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  image: text("image"),
  category: text("category"),
  stock: integer("stock").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
  createdAt: true,
});

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

// Cart items table
export const cartItems = pgTable("cart_items", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  sessionId: text("session_id").notNull(),
  productId: varchar("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  quantity: integer("quantity").notNull().default(1),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertCartItemSchema = createInsertSchema(cartItems).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertCartItem = z.infer<typeof insertCartItemSchema>;
export type CartItem = typeof cartItems.$inferSelect;

// Orders table
export const orders = pgTable("orders", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  orderNumber: text("order_number").notNull().unique(),
  sessionId: text("session_id").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerName: text("customer_name").notNull(),
  shippingAddress: text("shipping_address").notNull(),
  shippingCity: text("shipping_city").notNull(),
  shippingState: text("shipping_state").notNull(),
  shippingZip: text("shipping_zip").notNull(),
  subtotal: decimal("subtotal", { precision: 10, scale: 2 }).notNull(),
  tax: decimal("tax", { precision: 10, scale: 2 }).notNull(),
  shipping: decimal("shipping", { precision: 10, scale: 2 }).notNull(),
  discount: decimal("discount", { precision: 10, scale: 2 })
    .notNull()
    .default("0"),
  total: decimal("total", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull().default("pending"),
  paymentStatus: text("payment_status").notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;

// Order items table
export const orderItems = pgTable("order_items", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  orderId: varchar("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  productId: varchar("product_id")
    .notNull()
    .references(() => products.id),
  productName: text("product_name").notNull(),
  productPrice: decimal("product_price", { precision: 10, scale: 2 }).notNull(),
  quantity: integer("quantity").notNull(),
  subtotal: decimal("subtotal", { precision: 10, scale: 2 }).notNull(),
});

export const insertOrderItemSchema = createInsertSchema(orderItems).omit({
  id: true,
});

export type InsertOrderItem = z.infer<typeof insertOrderItemSchema>;
export type OrderItem = typeof orderItems.$inferSelect;

// Payment gateways configuration table
export const paymentGateways = pgTable("payment_gateways", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  type: text("type").notNull(),
  isActive: boolean("is_active").notNull().default(false),
  isDefault: boolean("is_default").notNull().default(false),
  config: json("config"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertPaymentGatewaySchema = createInsertSchema(
  paymentGateways,
).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertPaymentGateway = z.infer<typeof insertPaymentGatewaySchema>;
export type PaymentGateway = typeof paymentGateways.$inferSelect;

// Payment transactions table (internal orders)
export const paymentTransactions = pgTable("payment_transactions", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  orderId: varchar("order_id")
    .notNull()
    .references(() => orders.id),
  gatewayId: varchar("gateway_id")
    .notNull()
    .references(() => paymentGateways.id),
  gatewayTransactionId: text("gateway_transaction_id"),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull(),
  paymentMethod: text("payment_method"),
  errorMessage: text("error_message"),
  gatewayResponse: json("gateway_response"),
  merchantId: varchar("merchant_id").references(() => merchants.id), // Link to merchant if applicable
  platform: text("platform"), // Which platform initiated this transaction
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertPaymentTransactionSchema = createInsertSchema(
  paymentTransactions,
).omit({
  id: true,
  createdAt: true,
});

export type InsertPaymentTransaction = z.infer<
  typeof insertPaymentTransactionSchema
>;
export type PaymentTransaction = typeof paymentTransactions.$inferSelect;

// Merchants table - NMI sub-merchant accounts for partner platforms
export const merchants = pgTable("merchants", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  platform: text("platform").notNull(), // 'businessblueprint' | 'hostsblue' | 'swipesblue'
  platformClientId: text("platform_client_id").notNull(), // BB/HB client ID
  nmiMerchantId: text("nmi_merchant_id"), // NMI sub-merchant ID (null until approved)
  partnerId: text("partner_id").notNull(), // Our NMI Partner ID
  businessName: text("business_name").notNull(),
  businessEmail: text("business_email").notNull(),
  businessPhone: text("business_phone"),
  businessAddress: text("business_address"),
  businessCity: text("business_city"),
  businessState: text("business_state"),
  businessZip: text("business_zip"),
  businessCountry: text("business_country").notNull().default("US"),
  status: text("status").notNull().default("pending"), // 'pending' | 'active' | 'suspended' | 'rejected'
  nmiApplicationStatus: text("nmi_application_status"), // Status from NMI boarding process
  nmiApplicationData: json("nmi_application_data"), // Full NMI boarding response
  metadata: json("metadata"), // Additional platform-specific data
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertMerchantSchema = createInsertSchema(merchants).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertMerchant = z.infer<typeof insertMerchantSchema>;
export type Merchant = typeof merchants.$inferSelect;

// API Keys table - for partner platform authentication
export const apiKeys = pgTable("api_keys", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  platform: text("platform").notNull(), // 'businessblueprint' | 'hostsblue' | 'swipesblue' | 'internal'
  name: text("name").notNull(), // Friendly name for the key
  apiKey: text("api_key").notNull().unique(), // The actual API key (hashed in production)
  apiSecret: text("api_secret"), // Optional secret for HMAC signing
  isActive: boolean("is_active").notNull().default(true),
  permissions: json("permissions"), // Array of permitted operations
  metadata: json("metadata"), // Additional platform-specific data
  lastUsedAt: timestamp("last_used_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertApiKeySchema = createInsertSchema(apiKeys).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertApiKey = z.infer<typeof insertApiKeySchema>;
export type ApiKey = typeof apiKeys.$inferSelect;

// Partner Payment Transactions table - for external partner payments
export const partnerPaymentTransactions = pgTable(
  "partner_payment_transactions",
  {
    id: varchar("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    merchantId: varchar("merchant_id")
      .notNull()
      .references(() => merchants.id),
    platform: text("platform").notNull(), // Which platform initiated this payment
    platformOrderId: text("platform_order_id"), // Order ID from the partner platform (BB/HB)
    gatewayTransactionId: text("gateway_transaction_id"), // NMI transaction ID
    amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
    currency: text("currency").notNull().default("USD"),
    status: text("status").notNull(), // 'success' | 'failed' | 'pending' | 'refunded'
    paymentMethod: text("payment_method"), // 'credit_card' | 'debit_card' | etc.
    cardBrand: text("card_brand"), // 'visa' | 'mastercard' | 'amex' | etc.
    cardLastFour: text("card_last_four"), // Last 4 digits of card
    customerEmail: text("customer_email"),
    customerName: text("customer_name"),
    billingAddress: json("billing_address"), // Billing address details
    errorMessage: text("error_message"),
    gatewayResponse: json("gateway_response"), // Full NMI response
    metadata: json("metadata"), // Additional transaction data from partner
    refundedAmount: decimal("refunded_amount", {
      precision: 10,
      scale: 2,
    }).default("0"),
    refundedAt: timestamp("refunded_at"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
);

export const insertPartnerPaymentTransactionSchema = createInsertSchema(
  partnerPaymentTransactions,
).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertPartnerPaymentTransaction = z.infer<
  typeof insertPartnerPaymentTransactionSchema
>;
export type PartnerPaymentTransaction =
  typeof partnerPaymentTransactions.$inferSelect;

// Webhook Endpoints table - for storing webhook subscription configurations
export const webhookEndpoints = pgTable("webhook_endpoints", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  platform: text("platform").notNull(), // 'businessblueprint' | 'hostsblue' | 'swipesblue'
  url: text("url").notNull(), // Webhook endpoint URL
  events: json("events").notNull(), // Array of subscribed event types
  secret: text("secret").notNull(), // HMAC secret for signature verification
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertWebhookEndpointSchema = createInsertSchema(
  webhookEndpoints,
).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertWebhookEndpoint = z.infer<typeof insertWebhookEndpointSchema>;
export type WebhookEndpoint = typeof webhookEndpoints.$inferSelect;

// Webhook Deliveries table - for tracking webhook delivery attempts and status
export const webhookDeliveries = pgTable("webhook_deliveries", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  endpointId: varchar("endpoint_id")
    .notNull()
    .references(() => webhookEndpoints.id, { onDelete: "cascade" }),
  event: text("event").notNull(), // Event type (e.g., 'payment.success')
  payload: json("payload").notNull(), // The event payload sent to webhook
  status: text("status").notNull().default("pending"), // 'pending' | 'success' | 'failed'
  attempts: integer("attempts").notNull().default(0), // Number of delivery attempts
  nextRetry: timestamp("next_retry"), // When to retry next (null if not retrying)
  responseStatus: integer("response_status"), // HTTP status code from webhook endpoint
  responseBody: text("response_body"), // Response from webhook endpoint
  errorMessage: text("error_message"), // Error message if failed
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertWebhookDeliverySchema = createInsertSchema(
  webhookDeliveries,
).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertWebhookDelivery = z.infer<typeof insertWebhookDeliverySchema>;
export type WebhookDelivery = typeof webhookDeliveries.$inferSelect;

// Rates Active table - current live transaction rates for each tier
export const ratesActive = pgTable("rates_active", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  tierName: text("tier_name").notNull(), // 'FREE' | 'Starter' | 'Pro' | 'Enterprise' | 'API' | 'API Pro'
  tierType: text("tier_type").notNull(), // 'ecommerce' | 'developer'
  monthlyFee: decimal("monthly_fee", { precision: 10, scale: 2 })
    .notNull()
    .default("0"),
  transactionPercent: decimal("transaction_percent", {
    precision: 5,
    scale: 3,
  }).notNull(), // e.g., 2.900 for 2.9%
  transactionFlat: decimal("transaction_flat", {
    precision: 10,
    scale: 2,
  }).notNull(), // e.g., 0.30 for 30¢
  description: text("description"),
  features: json("features"), // Array of feature strings
  isActive: boolean("is_active").notNull().default(true),
  displayOrder: integer("display_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertRatesActiveSchema = createInsertSchema(ratesActive).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertRatesActive = z.infer<typeof insertRatesActiveSchema>;
export type RatesActive = typeof ratesActive.$inferSelect;

// Rates Staged table - pending rate changes waiting for approval
export const ratesStaged = pgTable("rates_staged", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  tierName: text("tier_name").notNull(),
  tierType: text("tier_type").notNull(),
  monthlyFee: decimal("monthly_fee", { precision: 10, scale: 2 })
    .notNull()
    .default("0"),
  transactionPercent: decimal("transaction_percent", {
    precision: 5,
    scale: 3,
  }).notNull(),
  transactionFlat: decimal("transaction_flat", {
    precision: 10,
    scale: 2,
  }).notNull(),
  description: text("description"),
  features: json("features"),
  isActive: boolean("is_active").notNull().default(true),
  displayOrder: integer("display_order").notNull().default(0),
  status: text("status").notNull().default("pending"), // 'pending' | 'approved' | 'rejected'
  createdBy: text("created_by"),
  approvedBy: text("approved_by"),
  effectiveDate: timestamp("effective_date"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertRatesStagedSchema = createInsertSchema(ratesStaged).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertRatesStaged = z.infer<typeof insertRatesStagedSchema>;
export type RatesStaged = typeof ratesStaged.$inferSelect;

// Costs Baseline table - base costs from payment processor (NMI)
export const costsBaseline = pgTable("costs_baseline", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text("name").notNull(), // 'interchange_plus' | 'per_transaction' | 'monthly_gateway'
  description: text("description"),
  percentCost: decimal("percent_cost", { precision: 5, scale: 3 }), // e.g., 1.800 for 1.8%
  flatCost: decimal("flat_cost", { precision: 10, scale: 2 }), // e.g., 0.10 for 10¢
  targetMarginPercent: decimal("target_margin_percent", {
    precision: 5,
    scale: 2,
  }), // Target profit margin
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertCostsBaselineSchema = createInsertSchema(costsBaseline).omit(
  {
    id: true,
    createdAt: true,
    updatedAt: true,
  },
);

export type InsertCostsBaseline = z.infer<typeof insertCostsBaselineSchema>;
export type CostsBaseline = typeof costsBaseline.$inferSelect;

// Rates Audit Log table - tracks all rate changes
export const ratesAuditLog = pgTable("rates_audit_log", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  action: text("action").notNull(), // 'create' | 'update' | 'delete' | 'approve' | 'reject'
  tableName: text("table_name").notNull(), // Which table was modified
  recordId: text("record_id").notNull(), // ID of the modified record
  previousValues: json("previous_values"), // Values before change
  newValues: json("new_values"), // Values after change
  changedBy: text("changed_by"),
  reason: text("reason"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertRatesAuditLogSchema = createInsertSchema(ratesAuditLog).omit(
  {
    id: true,
    createdAt: true,
  },
);

export type InsertRatesAuditLog = z.infer<typeof insertRatesAuditLogSchema>;
export type RatesAuditLog = typeof ratesAuditLog.$inferSelect;

// Add-On Products table - optional add-ons for e-commerce tiers
export const addOnProducts = pgTable("add_on_products", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  monthlyPrice: decimal("monthly_price", { precision: 10, scale: 2 }).notNull(),
  yearlyPrice: decimal("yearly_price", { precision: 10, scale: 2 }),
  features: json("features"), // Array of feature strings
  requiredTier: text("required_tier"), // Minimum tier required (null = any tier)
  category: text("category").notNull().default("general"), // 'marketing' | 'analytics' | 'security' | 'integration' | 'general'
  icon: text("icon"), // Lucide icon name
  isActive: boolean("is_active").notNull().default(true),
  displayOrder: integer("display_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertAddOnProductSchema = createInsertSchema(addOnProducts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertAddOnProduct = z.infer<typeof insertAddOnProductSchema>;
export type AddOnProduct = typeof addOnProducts.$inferSelect;
