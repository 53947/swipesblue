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
} from "@shared/schema";
import { eq, and, desc, like, or } from "drizzle-orm";
import { randomUUID } from "crypto";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

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
}

export const storage = new DbStorage();
