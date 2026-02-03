import { db } from "./db";
import {
  type User,
  type InsertUser,
  type Product,
  type InsertProduct,
  type CartItem,
  type InsertCartItem,
  type Order,
  type InsertOrder,
  type OrderItem,
  type InsertOrderItem,
  type PaymentGateway,
  type InsertPaymentGateway,
  type PaymentTransaction,
  type InsertPaymentTransaction,
  type Merchant,
  type InsertMerchant,
  type ApiKey,
  type InsertApiKey,
  type PartnerPaymentTransaction,
  type InsertPartnerPaymentTransaction,
  type WebhookEndpoint,
  type InsertWebhookEndpoint,
  type WebhookDelivery,
  type InsertWebhookDelivery,
  type RatesActive,
  type InsertRatesActive,
  type RatesStaged,
  type InsertRatesStaged,
  type CostsBaseline,
  type InsertCostsBaseline,
  type RatesAuditLog,
  type InsertRatesAuditLog,
  type AddOnProduct,
  type InsertAddOnProduct,
  type MerchantAccount,
  type InsertMerchantAccount,
  users,
  products,
  cartItems,
  orders,
  orderItems,
  paymentGateways,
  paymentTransactions,
  merchants,
  apiKeys,
  partnerPaymentTransactions,
  webhookEndpoints,
  webhookDeliveries,
  ratesActive,
  ratesStaged,
  costsBaseline,
  ratesAuditLog,
  addOnProducts,
  merchantAccounts,
} from "@shared/schema";
import { eq, and, desc, like, or, lte } from "drizzle-orm";
import { randomUUID } from "crypto";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Merchant Account operations
  getMerchantAccountByEmail(email: string): Promise<MerchantAccount | undefined>;
  createMerchantAccount(account: InsertMerchantAccount): Promise<MerchantAccount>;
  updateMerchantAccountLastLogin(id: string): Promise<MerchantAccount | undefined>;

  // Product operations
  getProduct(id: string): Promise<Product | undefined>;
  getAllProducts(): Promise<Product[]>;
  searchProducts(query: string): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: string): Promise<boolean>;

  // Cart operations
  getCartItems(sessionId: string): Promise<CartItem[]>;
  getCartItemsWithProducts(sessionId: string): Promise<(CartItem & { product: Product })[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartItemQuantity(id: string, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: string): Promise<boolean>;
  clearCart(sessionId: string): Promise<boolean>;

  // Order operations
  getOrder(id: string): Promise<Order | undefined>;
  getOrderByNumber(orderNumber: string): Promise<Order | undefined>;
  getOrdersBySession(sessionId: string): Promise<Order[]>;
  getOrderItems(orderId: string): Promise<OrderItem[]>;
  createOrder(order: InsertOrder, items: Omit<InsertOrderItem, 'orderId'>[]): Promise<Order>;
  updateOrderStatus(id: string, status: string): Promise<Order | undefined>;
  updateOrderPaymentStatus(id: string, paymentStatus: string): Promise<Order | undefined>;
  getAllOrders(): Promise<Order[]>;

  // Payment gateway operations
  getPaymentGateway(id: string): Promise<PaymentGateway | undefined>;
  getDefaultPaymentGateway(): Promise<PaymentGateway | undefined>;
  getAllPaymentGateways(): Promise<PaymentGateway[]>;
  createPaymentGateway(gateway: InsertPaymentGateway): Promise<PaymentGateway>;
  updatePaymentGateway(id: string, gateway: Partial<InsertPaymentGateway>): Promise<PaymentGateway | undefined>;
  setDefaultGateway(id: string): Promise<PaymentGateway | undefined>;

  // Payment transaction operations
  getPaymentTransaction(id: string): Promise<PaymentTransaction | undefined>;
  getTransactionsByOrder(orderId: string): Promise<PaymentTransaction[]>;
  createPaymentTransaction(transaction: InsertPaymentTransaction): Promise<PaymentTransaction>;
  updatePaymentTransaction(id: string, transaction: Partial<InsertPaymentTransaction>): Promise<PaymentTransaction | undefined>;
  getAllTransactions(): Promise<PaymentTransaction[]>;

  // Merchant operations
  getMerchant(id: string): Promise<Merchant | undefined>;
  getMerchantByPlatformClientId(platform: string, platformClientId: string): Promise<Merchant | undefined>;
  getMerchantByNmiMerchantId(nmiMerchantId: string): Promise<Merchant | undefined>;
  getMerchantsByPlatform(platform: string): Promise<Merchant[]>;
  getAllMerchants(): Promise<Merchant[]>;
  createMerchant(merchant: InsertMerchant): Promise<Merchant>;
  updateMerchant(id: string, merchant: Partial<InsertMerchant>): Promise<Merchant | undefined>;
  updateMerchantStatus(id: string, status: string): Promise<Merchant | undefined>;

  // API Key operations
  getApiKey(id: string): Promise<ApiKey | undefined>;
  getApiKeyByKey(apiKey: string): Promise<ApiKey | undefined>;
  getApiKeysByPlatform(platform: string): Promise<ApiKey[]>;
  getAllApiKeys(): Promise<ApiKey[]>;
  createApiKey(apiKey: InsertApiKey): Promise<ApiKey>;
  updateApiKey(id: string, apiKey: Partial<InsertApiKey>): Promise<ApiKey | undefined>;
  deactivateApiKey(id: string): Promise<ApiKey | undefined>;
  updateApiKeyLastUsed(id: string): Promise<void>;

  // Partner Payment Transaction operations
  getPartnerPaymentTransaction(id: string): Promise<PartnerPaymentTransaction | undefined>;
  getPartnerPaymentTransactionByGatewayId(gatewayTransactionId: string): Promise<PartnerPaymentTransaction | undefined>;
  getPartnerPaymentTransactionsByMerchant(merchantId: string): Promise<PartnerPaymentTransaction[]>;
  getPartnerPaymentTransactionsByPlatform(platform: string): Promise<PartnerPaymentTransaction[]>;
  getAllPartnerPaymentTransactions(): Promise<PartnerPaymentTransaction[]>;
  createPartnerPaymentTransaction(transaction: InsertPartnerPaymentTransaction): Promise<PartnerPaymentTransaction>;
  updatePartnerPaymentTransaction(id: string, transaction: Partial<InsertPartnerPaymentTransaction>): Promise<PartnerPaymentTransaction | undefined>;

  // Webhook Endpoint operations
  getWebhookEndpoint(id: string): Promise<WebhookEndpoint | undefined>;
  getWebhookEndpointsByPlatform(platform: string): Promise<WebhookEndpoint[]>;
  getAllWebhookEndpoints(): Promise<WebhookEndpoint[]>;
  createWebhookEndpoint(endpoint: InsertWebhookEndpoint): Promise<WebhookEndpoint>;
  updateWebhookEndpoint(id: string, endpoint: Partial<InsertWebhookEndpoint>): Promise<WebhookEndpoint | undefined>;
  deleteWebhookEndpoint(id: string): Promise<boolean>;

  // Webhook Delivery operations
  getWebhookDelivery(id: string): Promise<WebhookDelivery | undefined>;
  getWebhookDeliveriesByEndpoint(endpointId: string): Promise<WebhookDelivery[]>;
  getPendingWebhookDeliveries(before: Date): Promise<WebhookDelivery[]>;
  createWebhookDelivery(delivery: InsertWebhookDelivery): Promise<WebhookDelivery>;
  updateWebhookDelivery(id: string, delivery: Partial<InsertWebhookDelivery>): Promise<WebhookDelivery | undefined>;

  // Rates Active operations
  getRatesActive(id: string): Promise<RatesActive | undefined>;
  getRatesByTierName(tierName: string): Promise<RatesActive | undefined>;
  getRatesByType(tierType: string): Promise<RatesActive[]>;
  getAllRatesActive(): Promise<RatesActive[]>;
  createRatesActive(rate: InsertRatesActive): Promise<RatesActive>;
  updateRatesActive(id: string, rate: Partial<InsertRatesActive>): Promise<RatesActive | undefined>;
  deleteRatesActive(id: string): Promise<boolean>;

  // Rates Staged operations
  getRatesStaged(id: string): Promise<RatesStaged | undefined>;
  getAllRatesStaged(): Promise<RatesStaged[]>;
  createRatesStaged(rate: InsertRatesStaged): Promise<RatesStaged>;
  updateRatesStaged(id: string, rate: Partial<InsertRatesStaged>): Promise<RatesStaged | undefined>;
  deleteRatesStaged(id: string): Promise<boolean>;
  clearRatesStaged(): Promise<boolean>;
  activateStagedRates(): Promise<RatesActive[]>;

  // Costs Baseline operations
  getCostsBaseline(id: string): Promise<CostsBaseline | undefined>;
  getAllCostsBaseline(): Promise<CostsBaseline[]>;
  createCostsBaseline(cost: InsertCostsBaseline): Promise<CostsBaseline>;
  updateCostsBaseline(id: string, cost: Partial<InsertCostsBaseline>): Promise<CostsBaseline | undefined>;

  // Rates Audit Log operations
  createRatesAuditLog(log: InsertRatesAuditLog): Promise<RatesAuditLog>;
  getRatesAuditLogs(limit?: number): Promise<RatesAuditLog[]>;

  // Add-On Products operations
  getAddOnProduct(id: string): Promise<AddOnProduct | undefined>;
  getAddOnProductBySlug(slug: string): Promise<AddOnProduct | undefined>;
  getAllAddOnProducts(): Promise<AddOnProduct[]>;
  getActiveAddOnProducts(): Promise<AddOnProduct[]>;
  createAddOnProduct(addOn: InsertAddOnProduct): Promise<AddOnProduct>;
  updateAddOnProduct(id: string, addOn: Partial<InsertAddOnProduct>): Promise<AddOnProduct | undefined>;
  deleteAddOnProduct(id: string): Promise<boolean>;
}

export class DbStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  // Merchant Account operations
  async getMerchantAccountByEmail(email: string): Promise<MerchantAccount | undefined> {
    const result = await db.select().from(merchantAccounts).where(eq(merchantAccounts.email, email));
    return result[0];
  }

  async createMerchantAccount(account: InsertMerchantAccount): Promise<MerchantAccount> {
    const result = await db.insert(merchantAccounts).values(account).returning();
    return result[0];
  }

  async updateMerchantAccountLastLogin(id: string): Promise<MerchantAccount | undefined> {
    const result = await db
      .update(merchantAccounts)
      .set({ lastLoginAt: new Date() })
      .where(eq(merchantAccounts.id, id))
      .returning();
    return result[0];
  }

  // Product operations
  async getProduct(id: string): Promise<Product | undefined> {
    const result = await db.select().from(products).where(eq(products.id, id));
    return result[0];
  }

  async getAllProducts(): Promise<Product[]> {
    return await db.select().from(products).where(eq(products.isActive, true)).orderBy(desc(products.createdAt));
  }

  async searchProducts(query: string): Promise<Product[]> {
    return await db
      .select()
      .from(products)
      .where(
        and(
          eq(products.isActive, true),
          or(
            like(products.name, `%${query}%`),
            like(products.description, `%${query}%`)
          )
        )
      );
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return await db
      .select()
      .from(products)
      .where(and(eq(products.isActive, true), eq(products.category, category)));
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const result = await db.insert(products).values(product).returning();
    return result[0];
  }

  async updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product | undefined> {
    const result = await db.update(products).set(product).where(eq(products.id, id)).returning();
    return result[0];
  }

  async deleteProduct(id: string): Promise<boolean> {
    const result = await db.update(products).set({ isActive: false }).where(eq(products.id, id)).returning();
    return result.length > 0;
  }

  // Cart operations
  async getCartItems(sessionId: string): Promise<CartItem[]> {
    return await db.select().from(cartItems).where(eq(cartItems.sessionId, sessionId));
  }

  async getCartItemsWithProducts(sessionId: string): Promise<(CartItem & { product: Product })[]> {
    const items = await db
      .select()
      .from(cartItems)
      .leftJoin(products, eq(cartItems.productId, products.id))
      .where(eq(cartItems.sessionId, sessionId));

    return items.map(item => ({
      ...item.cart_items,
      product: item.products!,
    }));
  }

  async addToCart(item: InsertCartItem): Promise<CartItem> {
    const existing = await db
      .select()
      .from(cartItems)
      .where(
        and(
          eq(cartItems.sessionId, item.sessionId),
          eq(cartItems.productId, item.productId)
        )
      );

    if (existing.length > 0) {
      const updated = await db
        .update(cartItems)
        .set({ 
          quantity: (existing[0].quantity || 0) + (item.quantity || 1),
          updatedAt: new Date(),
        })
        .where(eq(cartItems.id, existing[0].id))
        .returning();
      return updated[0];
    }

    const result = await db.insert(cartItems).values(item).returning();
    return result[0];
  }

  async updateCartItemQuantity(id: string, quantity: number): Promise<CartItem | undefined> {
    const result = await db
      .update(cartItems)
      .set({ quantity, updatedAt: new Date() })
      .where(eq(cartItems.id, id))
      .returning();
    return result[0];
  }

  async removeFromCart(id: string): Promise<boolean> {
    const result = await db.delete(cartItems).where(eq(cartItems.id, id)).returning();
    return result.length > 0;
  }

  async clearCart(sessionId: string): Promise<boolean> {
    const result = await db.delete(cartItems).where(eq(cartItems.sessionId, sessionId)).returning();
    return result.length > 0;
  }

  // Order operations
  async getOrder(id: string): Promise<Order | undefined> {
    const result = await db.select().from(orders).where(eq(orders.id, id));
    return result[0];
  }

  async getOrderByNumber(orderNumber: string): Promise<Order | undefined> {
    const result = await db.select().from(orders).where(eq(orders.orderNumber, orderNumber));
    return result[0];
  }

  async getOrdersBySession(sessionId: string): Promise<Order[]> {
    return await db.select().from(orders).where(eq(orders.sessionId, sessionId)).orderBy(desc(orders.createdAt));
  }

  async getOrderItems(orderId: string): Promise<OrderItem[]> {
    return await db.select().from(orderItems).where(eq(orderItems.orderId, orderId));
  }

  async createOrder(order: InsertOrder, items: Omit<InsertOrderItem, 'orderId'>[]): Promise<Order> {
    return await db.transaction(async (tx) => {
      const result = await tx.insert(orders).values(order).returning();
      const createdOrder = result[0];

      const itemsWithOrderId = items.map(item => ({
        ...item,
        orderId: createdOrder.id,
      }));

      await tx.insert(orderItems).values(itemsWithOrderId);

      return createdOrder;
    });
  }

  async updateOrderStatus(id: string, status: string): Promise<Order | undefined> {
    const result = await db
      .update(orders)
      .set({ status, updatedAt: new Date() })
      .where(eq(orders.id, id))
      .returning();
    return result[0];
  }

  async updateOrderPaymentStatus(id: string, paymentStatus: string): Promise<Order | undefined> {
    const result = await db
      .update(orders)
      .set({ paymentStatus, updatedAt: new Date() })
      .where(eq(orders.id, id))
      .returning();
    return result[0];
  }

  async getAllOrders(): Promise<Order[]> {
    return await db.select().from(orders).orderBy(desc(orders.createdAt));
  }

  // Payment gateway operations
  async getPaymentGateway(id: string): Promise<PaymentGateway | undefined> {
    const result = await db.select().from(paymentGateways).where(eq(paymentGateways.id, id));
    return result[0];
  }

  async getDefaultPaymentGateway(): Promise<PaymentGateway | undefined> {
    const result = await db.select().from(paymentGateways).where(eq(paymentGateways.isDefault, true));
    return result[0];
  }

  async getAllPaymentGateways(): Promise<PaymentGateway[]> {
    return await db.select().from(paymentGateways).orderBy(desc(paymentGateways.createdAt));
  }

  async createPaymentGateway(gateway: InsertPaymentGateway): Promise<PaymentGateway> {
    const result = await db.insert(paymentGateways).values(gateway).returning();
    return result[0];
  }

  async updatePaymentGateway(id: string, gateway: Partial<InsertPaymentGateway>): Promise<PaymentGateway | undefined> {
    const result = await db
      .update(paymentGateways)
      .set({ ...gateway, updatedAt: new Date() })
      .where(eq(paymentGateways.id, id))
      .returning();
    return result[0];
  }

  async setDefaultGateway(id: string): Promise<PaymentGateway | undefined> {
    await db.update(paymentGateways).set({ isDefault: false });
    const result = await db
      .update(paymentGateways)
      .set({ isDefault: true, updatedAt: new Date() })
      .where(eq(paymentGateways.id, id))
      .returning();
    return result[0];
  }

  // Payment transaction operations
  async getPaymentTransaction(id: string): Promise<PaymentTransaction | undefined> {
    const result = await db.select().from(paymentTransactions).where(eq(paymentTransactions.id, id));
    return result[0];
  }

  async getTransactionsByOrder(orderId: string): Promise<PaymentTransaction[]> {
    return await db.select().from(paymentTransactions).where(eq(paymentTransactions.orderId, orderId)).orderBy(desc(paymentTransactions.createdAt));
  }

  async createPaymentTransaction(transaction: InsertPaymentTransaction): Promise<PaymentTransaction> {
    const result = await db.insert(paymentTransactions).values(transaction).returning();
    return result[0];
  }

  async updatePaymentTransaction(id: string, transaction: Partial<InsertPaymentTransaction>): Promise<PaymentTransaction | undefined> {
    const result = await db
      .update(paymentTransactions)
      .set(transaction)
      .where(eq(paymentTransactions.id, id))
      .returning();
    return result[0];
  }

  async getAllTransactions(): Promise<PaymentTransaction[]> {
    return await db.select().from(paymentTransactions).orderBy(desc(paymentTransactions.createdAt));
  }

  // Merchant operations
  async getMerchant(id: string): Promise<Merchant | undefined> {
    const result = await db.select().from(merchants).where(eq(merchants.id, id));
    return result[0];
  }

  async getMerchantByPlatformClientId(platform: string, platformClientId: string): Promise<Merchant | undefined> {
    const result = await db
      .select()
      .from(merchants)
      .where(
        and(
          eq(merchants.platform, platform),
          eq(merchants.platformClientId, platformClientId)
        )
      );
    return result[0];
  }

  async getMerchantByNmiMerchantId(nmiMerchantId: string): Promise<Merchant | undefined> {
    const result = await db.select().from(merchants).where(eq(merchants.nmiMerchantId, nmiMerchantId));
    return result[0];
  }

  async getMerchantsByPlatform(platform: string): Promise<Merchant[]> {
    return await db
      .select()
      .from(merchants)
      .where(eq(merchants.platform, platform))
      .orderBy(desc(merchants.createdAt));
  }

  async getAllMerchants(): Promise<Merchant[]> {
    return await db.select().from(merchants).orderBy(desc(merchants.createdAt));
  }

  async createMerchant(merchant: InsertMerchant): Promise<Merchant> {
    const result = await db.insert(merchants).values(merchant).returning();
    return result[0];
  }

  async updateMerchant(id: string, merchant: Partial<InsertMerchant>): Promise<Merchant | undefined> {
    const result = await db
      .update(merchants)
      .set({ ...merchant, updatedAt: new Date() })
      .where(eq(merchants.id, id))
      .returning();
    return result[0];
  }

  async updateMerchantStatus(id: string, status: string): Promise<Merchant | undefined> {
    const result = await db
      .update(merchants)
      .set({ status, updatedAt: new Date() })
      .where(eq(merchants.id, id))
      .returning();
    return result[0];
  }

  // API Key operations
  async getApiKey(id: string): Promise<ApiKey | undefined> {
    const result = await db.select().from(apiKeys).where(eq(apiKeys.id, id));
    return result[0];
  }

  async getApiKeyByKey(apiKey: string): Promise<ApiKey | undefined> {
    const result = await db.select().from(apiKeys).where(eq(apiKeys.apiKey, apiKey));
    return result[0];
  }

  async getApiKeysByPlatform(platform: string): Promise<ApiKey[]> {
    return await db
      .select()
      .from(apiKeys)
      .where(eq(apiKeys.platform, platform))
      .orderBy(desc(apiKeys.createdAt));
  }

  async getAllApiKeys(): Promise<ApiKey[]> {
    return await db.select().from(apiKeys).orderBy(desc(apiKeys.createdAt));
  }

  async createApiKey(apiKey: InsertApiKey): Promise<ApiKey> {
    const result = await db.insert(apiKeys).values(apiKey).returning();
    return result[0];
  }

  async updateApiKey(id: string, apiKey: Partial<InsertApiKey>): Promise<ApiKey | undefined> {
    const result = await db
      .update(apiKeys)
      .set({ ...apiKey, updatedAt: new Date() })
      .where(eq(apiKeys.id, id))
      .returning();
    return result[0];
  }

  async deactivateApiKey(id: string): Promise<ApiKey | undefined> {
    const result = await db
      .update(apiKeys)
      .set({ isActive: false, updatedAt: new Date() })
      .where(eq(apiKeys.id, id))
      .returning();
    return result[0];
  }

  async updateApiKeyLastUsed(id: string): Promise<void> {
    await db
      .update(apiKeys)
      .set({ lastUsedAt: new Date() })
      .where(eq(apiKeys.id, id));
  }

  // Partner Payment Transaction operations
  async getPartnerPaymentTransaction(id: string): Promise<PartnerPaymentTransaction | undefined> {
    const result = await db.select().from(partnerPaymentTransactions).where(eq(partnerPaymentTransactions.id, id));
    return result[0];
  }

  async getPartnerPaymentTransactionByGatewayId(gatewayTransactionId: string): Promise<PartnerPaymentTransaction | undefined> {
    const result = await db
      .select()
      .from(partnerPaymentTransactions)
      .where(eq(partnerPaymentTransactions.gatewayTransactionId, gatewayTransactionId));
    return result[0];
  }

  async getPartnerPaymentTransactionsByMerchant(merchantId: string): Promise<PartnerPaymentTransaction[]> {
    return await db
      .select()
      .from(partnerPaymentTransactions)
      .where(eq(partnerPaymentTransactions.merchantId, merchantId))
      .orderBy(desc(partnerPaymentTransactions.createdAt));
  }

  async getPartnerPaymentTransactionsByPlatform(platform: string): Promise<PartnerPaymentTransaction[]> {
    return await db
      .select()
      .from(partnerPaymentTransactions)
      .where(eq(partnerPaymentTransactions.platform, platform))
      .orderBy(desc(partnerPaymentTransactions.createdAt));
  }

  async getAllPartnerPaymentTransactions(): Promise<PartnerPaymentTransaction[]> {
    return await db.select().from(partnerPaymentTransactions).orderBy(desc(partnerPaymentTransactions.createdAt));
  }

  async createPartnerPaymentTransaction(transaction: InsertPartnerPaymentTransaction): Promise<PartnerPaymentTransaction> {
    const result = await db.insert(partnerPaymentTransactions).values(transaction).returning();
    return result[0];
  }

  async updatePartnerPaymentTransaction(id: string, transaction: Partial<InsertPartnerPaymentTransaction>): Promise<PartnerPaymentTransaction | undefined> {
    const result = await db
      .update(partnerPaymentTransactions)
      .set({ ...transaction, updatedAt: new Date() })
      .where(eq(partnerPaymentTransactions.id, id))
      .returning();
    return result[0];
  }

  // Webhook Endpoint operations
  async getWebhookEndpoint(id: string): Promise<WebhookEndpoint | undefined> {
    const result = await db.select().from(webhookEndpoints).where(eq(webhookEndpoints.id, id));
    return result[0];
  }

  async getWebhookEndpointsByPlatform(platform: string): Promise<WebhookEndpoint[]> {
    return await db
      .select()
      .from(webhookEndpoints)
      .where(eq(webhookEndpoints.platform, platform))
      .orderBy(desc(webhookEndpoints.createdAt));
  }

  async getAllWebhookEndpoints(): Promise<WebhookEndpoint[]> {
    return await db.select().from(webhookEndpoints).orderBy(desc(webhookEndpoints.createdAt));
  }

  async createWebhookEndpoint(endpoint: InsertWebhookEndpoint): Promise<WebhookEndpoint> {
    const result = await db.insert(webhookEndpoints).values(endpoint).returning();
    return result[0];
  }

  async updateWebhookEndpoint(id: string, endpoint: Partial<InsertWebhookEndpoint>): Promise<WebhookEndpoint | undefined> {
    const result = await db
      .update(webhookEndpoints)
      .set({ ...endpoint, updatedAt: new Date() })
      .where(eq(webhookEndpoints.id, id))
      .returning();
    return result[0];
  }

  async deleteWebhookEndpoint(id: string): Promise<boolean> {
    const result = await db.delete(webhookEndpoints).where(eq(webhookEndpoints.id, id)).returning();
    return result.length > 0;
  }

  // Webhook Delivery operations
  async getWebhookDelivery(id: string): Promise<WebhookDelivery | undefined> {
    const result = await db.select().from(webhookDeliveries).where(eq(webhookDeliveries.id, id));
    return result[0];
  }

  async getWebhookDeliveriesByEndpoint(endpointId: string): Promise<WebhookDelivery[]> {
    return await db
      .select()
      .from(webhookDeliveries)
      .where(eq(webhookDeliveries.endpointId, endpointId))
      .orderBy(desc(webhookDeliveries.createdAt));
  }

  async getPendingWebhookDeliveries(before: Date): Promise<WebhookDelivery[]> {
    return await db
      .select()
      .from(webhookDeliveries)
      .where(
        and(
          eq(webhookDeliveries.status, "pending"),
          lte(webhookDeliveries.nextRetry, before)
        )
      )
      .orderBy(webhookDeliveries.nextRetry);
  }

  async createWebhookDelivery(delivery: InsertWebhookDelivery): Promise<WebhookDelivery> {
    const result = await db.insert(webhookDeliveries).values(delivery).returning();
    return result[0];
  }

  async updateWebhookDelivery(id: string, delivery: Partial<InsertWebhookDelivery>): Promise<WebhookDelivery | undefined> {
    const result = await db
      .update(webhookDeliveries)
      .set({ ...delivery, updatedAt: new Date() })
      .where(eq(webhookDeliveries.id, id))
      .returning();
    return result[0];
  }

  // Rates Active operations
  async getRatesActive(id: string): Promise<RatesActive | undefined> {
    const result = await db.select().from(ratesActive).where(eq(ratesActive.id, id));
    return result[0];
  }

  async getRatesByTierName(tierName: string): Promise<RatesActive | undefined> {
    const result = await db.select().from(ratesActive).where(eq(ratesActive.tierName, tierName));
    return result[0];
  }

  async getRatesByType(tierType: string): Promise<RatesActive[]> {
    return await db
      .select()
      .from(ratesActive)
      .where(eq(ratesActive.tierType, tierType))
      .orderBy(ratesActive.displayOrder);
  }

  async getAllRatesActive(): Promise<RatesActive[]> {
    return await db.select().from(ratesActive).orderBy(ratesActive.displayOrder);
  }

  async createRatesActive(rate: InsertRatesActive): Promise<RatesActive> {
    const result = await db.insert(ratesActive).values(rate).returning();
    return result[0];
  }

  async updateRatesActive(id: string, rate: Partial<InsertRatesActive>): Promise<RatesActive | undefined> {
    const result = await db
      .update(ratesActive)
      .set({ ...rate, updatedAt: new Date() })
      .where(eq(ratesActive.id, id))
      .returning();
    return result[0];
  }

  async deleteRatesActive(id: string): Promise<boolean> {
    const result = await db.delete(ratesActive).where(eq(ratesActive.id, id)).returning();
    return result.length > 0;
  }

  // Rates Staged operations
  async getRatesStaged(id: string): Promise<RatesStaged | undefined> {
    const result = await db.select().from(ratesStaged).where(eq(ratesStaged.id, id));
    return result[0];
  }

  async getAllRatesStaged(): Promise<RatesStaged[]> {
    return await db.select().from(ratesStaged).orderBy(ratesStaged.displayOrder);
  }

  async createRatesStaged(rate: InsertRatesStaged): Promise<RatesStaged> {
    const result = await db.insert(ratesStaged).values(rate).returning();
    return result[0];
  }

  async updateRatesStaged(id: string, rate: Partial<InsertRatesStaged>): Promise<RatesStaged | undefined> {
    const result = await db
      .update(ratesStaged)
      .set({ ...rate, updatedAt: new Date() })
      .where(eq(ratesStaged.id, id))
      .returning();
    return result[0];
  }

  async deleteRatesStaged(id: string): Promise<boolean> {
    const result = await db.delete(ratesStaged).where(eq(ratesStaged.id, id)).returning();
    return result.length > 0;
  }

  async clearRatesStaged(): Promise<boolean> {
    await db.delete(ratesStaged);
    return true;
  }

  async activateStagedRates(): Promise<RatesActive[]> {
    const stagedRates = await this.getAllRatesStaged();
    const activatedRates: RatesActive[] = [];

    for (const staged of stagedRates) {
      const existingRate = await this.getRatesByTierName(staged.tierName);
      
      if (existingRate) {
        const updated = await this.updateRatesActive(existingRate.id, {
          monthlyFee: staged.monthlyFee,
          transactionPercent: staged.transactionPercent,
          transactionFlat: staged.transactionFlat,
          description: staged.description,
          features: staged.features as string[] | null,
          isActive: staged.isActive,
          displayOrder: staged.displayOrder,
        });
        if (updated) activatedRates.push(updated);
      } else {
        const created = await this.createRatesActive({
          tierName: staged.tierName,
          tierType: staged.tierType,
          monthlyFee: staged.monthlyFee,
          transactionPercent: staged.transactionPercent,
          transactionFlat: staged.transactionFlat,
          description: staged.description,
          features: staged.features as string[] | null,
          isActive: staged.isActive,
          displayOrder: staged.displayOrder,
        });
        activatedRates.push(created);
      }
    }

    await this.clearRatesStaged();
    return activatedRates;
  }

  // Costs Baseline operations
  async getCostsBaseline(id: string): Promise<CostsBaseline | undefined> {
    const result = await db.select().from(costsBaseline).where(eq(costsBaseline.id, id));
    return result[0];
  }

  async getAllCostsBaseline(): Promise<CostsBaseline[]> {
    return await db.select().from(costsBaseline);
  }

  async createCostsBaseline(cost: InsertCostsBaseline): Promise<CostsBaseline> {
    const result = await db.insert(costsBaseline).values(cost).returning();
    return result[0];
  }

  async updateCostsBaseline(id: string, cost: Partial<InsertCostsBaseline>): Promise<CostsBaseline | undefined> {
    const result = await db
      .update(costsBaseline)
      .set({ ...cost, updatedAt: new Date() })
      .where(eq(costsBaseline.id, id))
      .returning();
    return result[0];
  }

  // Rates Audit Log operations
  async createRatesAuditLog(log: InsertRatesAuditLog): Promise<RatesAuditLog> {
    const result = await db.insert(ratesAuditLog).values(log).returning();
    return result[0];
  }

  async getRatesAuditLogs(limit: number = 50): Promise<RatesAuditLog[]> {
    return await db
      .select()
      .from(ratesAuditLog)
      .orderBy(desc(ratesAuditLog.createdAt))
      .limit(limit);
  }

  // Add-On Products operations
  async getAddOnProduct(id: string): Promise<AddOnProduct | undefined> {
    const result = await db.select().from(addOnProducts).where(eq(addOnProducts.id, id));
    return result[0];
  }

  async getAddOnProductBySlug(slug: string): Promise<AddOnProduct | undefined> {
    const result = await db.select().from(addOnProducts).where(eq(addOnProducts.slug, slug));
    return result[0];
  }

  async getAllAddOnProducts(): Promise<AddOnProduct[]> {
    return await db.select().from(addOnProducts).orderBy(addOnProducts.displayOrder);
  }

  async getActiveAddOnProducts(): Promise<AddOnProduct[]> {
    return await db
      .select()
      .from(addOnProducts)
      .where(eq(addOnProducts.isActive, true))
      .orderBy(addOnProducts.displayOrder);
  }

  async createAddOnProduct(addOn: InsertAddOnProduct): Promise<AddOnProduct> {
    const result = await db.insert(addOnProducts).values(addOn).returning();
    return result[0];
  }

  async updateAddOnProduct(id: string, addOn: Partial<InsertAddOnProduct>): Promise<AddOnProduct | undefined> {
    const result = await db
      .update(addOnProducts)
      .set({ ...addOn, updatedAt: new Date() })
      .where(eq(addOnProducts.id, id))
      .returning();
    return result[0];
  }

  async deleteAddOnProduct(id: string): Promise<boolean> {
    const result = await db.delete(addOnProducts).where(eq(addOnProducts.id, id)).returning();
    return result.length > 0;
  }
}

export const storage = new DbStorage();
