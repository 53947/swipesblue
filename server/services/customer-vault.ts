/**
 * Customer Vault Service
 *
 * Orchestrates between NMI's Customer Vault (card tokenization)
 * and our local database (customer + payment method records).
 *
 * Flow:
 *   1. Tokenize card via NMI (paymentToken → customerVaultId)
 *   2. Store customer record in local DB
 *   3. Store payment method record with NMI vault token
 *   4. Charge stored cards via NMI customerVaultId
 */

import { NMIPaymentGateway, type NMIVaultResponse, type NMIResponse } from "../payment-gateways/nmi";
import { storage } from "../storage";
import type { CustomerVaultRecord, VaultPaymentMethod } from "@shared/schema";

// ── Request / Response Types ────────────────────────────────────────────────

export interface AddToVaultRequest {
  paymentToken: string;
  merchantId?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  billingAddress?: string;
  billingCity?: string;
  billingState?: string;
  billingZip?: string;
  billingCountry?: string;
  sourcePlatform?: string;
  nickname?: string;
}

export interface VaultChargeRequest {
  customerId: string;
  paymentMethodId?: string;
  amount: number;
  description?: string;
  orderId?: string;
}

export interface AddToVaultResponse {
  success: boolean;
  customer?: CustomerVaultRecord;
  paymentMethod?: VaultPaymentMethod;
  nmiVaultId?: string;
  errorMessage?: string;
}

export interface VaultChargeResponse {
  success: boolean;
  transactionId?: string;
  authCode?: string;
  amount?: number;
  message?: string;
  errorMessage?: string;
}

// ── Service Class ───────────────────────────────────────────────────────────

export class CustomerVaultService {
  private gateway: NMIPaymentGateway;

  constructor() {
    this.gateway = new NMIPaymentGateway();
  }

  /**
   * Add a card to the vault: tokenize via NMI, then store locally.
   */
  async addToVault(request: AddToVaultRequest): Promise<AddToVaultResponse> {
    // Step 1: Tokenize card via NMI Customer Vault (validate + store)
    const vaultResult: NMIVaultResponse = await this.gateway.addCustomerToVault({
      paymentToken: request.paymentToken,
      email: request.email,
      firstName: request.firstName,
      lastName: request.lastName,
      address1: request.billingAddress,
      city: request.billingCity,
      state: request.billingState,
      zip: request.billingZip,
      country: request.billingCountry,
    });

    if (!vaultResult.success || !vaultResult.customerVaultId) {
      return {
        success: false,
        errorMessage: vaultResult.errorMessage || "Failed to add card to NMI vault",
      };
    }

    // Step 2: Create or find the customer record in our DB
    let customer: CustomerVaultRecord;

    // Check if customer already exists by email + merchant
    const existingCustomers = request.merchantId
      ? await storage.getCustomerVaultByMerchant(request.merchantId)
      : [];
    const existing = existingCustomers.find((c) => c.email === request.email);

    if (existing) {
      customer = existing;
    } else {
      customer = await storage.createCustomerVaultRecord({
        merchantId: request.merchantId || null,
        sourcePlatform: request.sourcePlatform || "swipesblue",
        firstName: request.firstName,
        lastName: request.lastName,
        email: request.email,
        phone: request.phone || null,
        company: request.company || null,
        billingAddress: request.billingAddress || null,
        billingCity: request.billingCity || null,
        billingState: request.billingState || null,
        billingZip: request.billingZip || null,
        billingCountry: request.billingCountry || "US",
        customerId: vaultResult.customerVaultId,
        status: "active",
      });
    }

    // Step 3: Store the payment method with the NMI vault token
    const cardInfo = vaultResult.rawResponse;
    const paymentMethod = await storage.createVaultPaymentMethod({
      customerId: customer.id,
      type: "credit_card",
      cardBrand: cardInfo?.cc_type || cardInfo?.card_type || null,
      cardLastFour: cardInfo?.cc_number?.slice(-4) || null,
      cardExpMonth: null,
      cardExpYear: null,
      nmiToken: vaultResult.customerVaultId,
      isDefault: true,
      nickname: request.nickname || null,
    });

    return {
      success: true,
      customer,
      paymentMethod,
      nmiVaultId: vaultResult.customerVaultId,
    };
  }

  /**
   * Charge a stored card from the vault.
   */
  async chargeVaultCustomer(request: VaultChargeRequest): Promise<VaultChargeResponse> {
    // Look up the customer
    const customer = await storage.getCustomerVaultRecord(request.customerId);
    if (!customer) {
      return { success: false, errorMessage: "Customer not found in vault" };
    }

    // Get the payment method (specific or default)
    let paymentMethod: VaultPaymentMethod | undefined;
    if (request.paymentMethodId) {
      paymentMethod = await storage.getVaultPaymentMethod(request.paymentMethodId);
    } else {
      const methods = await storage.getVaultPaymentMethodsByCustomer(customer.id);
      paymentMethod = methods.find((m) => m.isDefault) || methods[0];
    }

    if (!paymentMethod?.nmiToken) {
      return { success: false, errorMessage: "No payment method found for this customer" };
    }

    // Charge via NMI
    const result: NMIResponse = await this.gateway.chargeVaultCustomer({
      customerVaultId: paymentMethod.nmiToken,
      amount: request.amount,
      description: request.description,
      orderId: request.orderId,
    });

    if (!result.success) {
      return {
        success: false,
        errorMessage: result.errorMessage || "Vault charge declined",
      };
    }

    // Update customer stats
    await storage.updateCustomerVaultRecord(customer.id, {
      transactionCount: (customer.transactionCount || 0) + 1,
      lifetimeValue: (customer.lifetimeValue || 0) + Math.round(request.amount * 100),
      lastTransactionAt: new Date(),
    });

    return {
      success: true,
      transactionId: result.transactionId,
      authCode: result.authCode,
      amount: request.amount,
      message: result.message || "Payment processed successfully",
    };
  }

  /**
   * Get all customers for a merchant.
   */
  async getCustomersByMerchant(merchantId: string): Promise<CustomerVaultRecord[]> {
    return storage.getCustomerVaultByMerchant(merchantId);
  }

  /**
   * Get payment methods for a customer.
   */
  async getPaymentMethods(customerId: string): Promise<VaultPaymentMethod[]> {
    return storage.getVaultPaymentMethodsByCustomer(customerId);
  }

  /**
   * Remove a payment method from the vault.
   */
  async removePaymentMethod(paymentMethodId: string): Promise<boolean> {
    return storage.deleteVaultPaymentMethod(paymentMethodId);
  }

  /**
   * Delete a customer and all their payment methods.
   */
  async deleteCustomer(customerId: string): Promise<boolean> {
    return storage.deleteCustomerVaultRecord(customerId);
  }
}
