/**
 * Merchant Payment Processing Service
 *
 * Processes payments on behalf of merchants using the NMI gateway.
 * Part of SwipesBlue's Partner Payment API for BusinessBlueprint and HostsBlue.
 *
 * All card data comes as Collect.js payment tokens — raw card numbers never reach this server.
 */

import type { Merchant } from "@shared/schema";
import { NMIPaymentGateway, type NMIResponse } from "../payment-gateways/nmi";

// ── Request / Response Types ────────────────────────────────────────────────

export interface MerchantPaymentRequest {
  merchantId: string;
  amount: number;
  currency?: string;
  paymentToken: string;
  customerEmail: string;
  customerName?: string;
  billingAddress?: {
    address: string;
    city: string;
    state: string;
    zip: string;
    country?: string;
  };
  platformOrderId?: string;
  metadata?: Record<string, any>;
  description?: string;
  invoiceNumber?: string;
}

export interface MerchantPaymentResponse {
  success: boolean;
  transactionId?: string;
  gatewayTransactionId?: string;
  authCode?: string;
  amount: number;
  currency: string;
  status: string;
  cardBrand?: string;
  cardLastFour?: string;
  message?: string;
  errorMessage?: string;
  createdAt: Date;
}

// ── Service Class ───────────────────────────────────────────────────────────

export class MerchantPaymentService {
  private gateway: NMIPaymentGateway;

  constructor() {
    this.gateway = new NMIPaymentGateway();
  }

  /**
   * Process a sale on behalf of a merchant.
   */
  async processPayment(
    merchant: Merchant,
    request: MerchantPaymentRequest,
  ): Promise<NMIResponse> {
    const validation = this.validateMerchant(merchant);
    if (validation) return validation;

    const nameParts = this.splitName(request.customerName);

    const result = await this.gateway.sale({
      paymentToken: request.paymentToken,
      amount: request.amount,
      email: request.customerEmail,
      firstName: nameParts.firstName,
      lastName: nameParts.lastName,
      address1: request.billingAddress?.address,
      city: request.billingAddress?.city,
      state: request.billingAddress?.state,
      zip: request.billingAddress?.zip,
      country: request.billingAddress?.country,
      description: request.description,
      orderId: request.platformOrderId,
      invoiceNumber: request.invoiceNumber,
    });

    return result;
  }

  /**
   * Authorize a payment without capturing (2-step processing).
   */
  async authorizePayment(
    merchant: Merchant,
    request: MerchantPaymentRequest,
  ): Promise<NMIResponse> {
    const validation = this.validateMerchant(merchant);
    if (validation) return validation;

    const nameParts = this.splitName(request.customerName);

    return this.gateway.authorize({
      paymentToken: request.paymentToken,
      amount: request.amount,
      email: request.customerEmail,
      firstName: nameParts.firstName,
      lastName: nameParts.lastName,
      address1: request.billingAddress?.address,
      city: request.billingAddress?.city,
      state: request.billingAddress?.state,
      zip: request.billingAddress?.zip,
      country: request.billingAddress?.country,
      description: request.description,
      orderId: request.platformOrderId,
    });
  }

  /**
   * Capture a previously authorized payment.
   */
  async capturePayment(
    merchant: Merchant,
    gatewayTransactionId: string,
    amount?: number,
  ): Promise<NMIResponse> {
    const validation = this.validateMerchant(merchant);
    if (validation) return validation;

    return this.gateway.capture({
      transactionId: gatewayTransactionId,
      amount,
    });
  }

  /**
   * Void a transaction before settlement.
   */
  async voidPayment(
    merchant: Merchant,
    gatewayTransactionId: string,
  ): Promise<NMIResponse> {
    const validation = this.validateMerchant(merchant);
    if (validation) return validation;

    return this.gateway.void({
      transactionId: gatewayTransactionId,
    });
  }

  /**
   * Refund a settled transaction (full or partial).
   */
  async processRefund(
    merchant: Merchant,
    gatewayTransactionId: string,
    amount?: number,
    _reason?: string,
  ): Promise<NMIResponse> {
    const validation = this.validateMerchant(merchant);
    if (validation) return validation;

    return this.gateway.refund({
      transactionId: gatewayTransactionId,
      amount,
    });
  }

  // ── Private Helpers ─────────────────────────────────────────────────────

  private validateMerchant(merchant: Merchant): NMIResponse | null {
    if (merchant.status !== "active") {
      return {
        success: false,
        errorMessage: `Merchant account is ${merchant.status}. Only active merchants can process payments.`,
      };
    }

    if (!merchant.nmiMerchantId) {
      return {
        success: false,
        errorMessage: "Merchant does not have an NMI merchant account yet.",
      };
    }

    return null;
  }

  private splitName(name?: string): {
    firstName: string;
    lastName: string;
  } {
    if (!name) return { firstName: "", lastName: "" };
    const parts = name.trim().split(/\s+/);
    return {
      firstName: parts[0] || "",
      lastName: parts.slice(1).join(" ") || "",
    };
  }
}
