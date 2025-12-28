/**
 * Merchant Payment Processing Service
 *
 * Processes payments on behalf of merchants using their NMI sub-merchant accounts
 * Part of SwipesBlue's Partner Payment API for BusinessBlueprint and HostsBlue
 */

import type { Merchant } from "@shared/schema";
import { NMIPaymentGateway, type PaymentRequest, type PaymentResponse } from "../payment-gateways/nmi";

export interface MerchantPaymentRequest {
  // Merchant identification
  merchantId: string;

  // Payment details
  amount: number;
  currency?: string; // Default: USD

  // Card details (direct)
  cardNumber?: string;
  cardName?: string;
  expiry?: string; // MMYY format
  cvv?: string;

  // Or tokenized payment
  paymentToken?: string; // For future tokenization support

  // Customer information
  customerEmail: string;
  customerName?: string;

  // Billing address
  billingAddress?: {
    address: string;
    city: string;
    state: string;
    zip: string;
    country?: string;
  };

  // Partner-specific data
  platformOrderId?: string; // Order ID from BB/HB
  metadata?: Record<string, any>; // Additional tracking data

  // Transaction options
  description?: string;
  invoiceNumber?: string;
}

export interface MerchantPaymentResponse {
  success: boolean;
  transactionId?: string; // Our internal transaction ID
  gatewayTransactionId?: string; // NMI transaction ID
  authCode?: string;
  amount: number;
  currency: string;
  status: string; // 'success' | 'failed' | 'pending'
  cardBrand?: string;
  cardLastFour?: string;
  message?: string;
  errorMessage?: string;
  createdAt: Date;
}

export interface MerchantRefundRequest {
  transactionId: string; // Our internal transaction ID
  amount?: number; // Optional partial refund amount
  reason?: string;
}

export interface MerchantRefundResponse {
  success: boolean;
  refundId?: string;
  gatewayTransactionId?: string;
  amount: number;
  message?: string;
  errorMessage?: string;
}

export class MerchantPaymentService {
  /**
   * Process a payment on behalf of a merchant
   */
  async processPayment(
    merchant: Merchant,
    request: MerchantPaymentRequest
  ): Promise<PaymentResponse> {
    // Validate merchant status
    if (merchant.status !== 'active') {
      return {
        success: false,
        errorMessage: `Merchant account is ${merchant.status}. Only active merchants can process payments.`,
      };
    }

    if (!merchant.nmiMerchantId) {
      return {
        success: false,
        errorMessage: 'Merchant does not have an NMI merchant account yet.',
      };
    }

    // Get merchant's NMI credentials from metadata or use partner credentials
    // In a real implementation, each merchant might have their own NMI credentials
    // For now, we'll use the partner's credentials and route via merchant ID
    const nmiApiKey = this.getMerchantNmiApiKey(merchant);

    if (!nmiApiKey) {
      return {
        success: false,
        errorMessage: 'Merchant NMI credentials not configured.',
      };
    }

    // Create NMI gateway instance
    const nmiGateway = new NMIPaymentGateway({
      apiKey: nmiApiKey,
    });

    // Build payment request
    const paymentRequest: PaymentRequest = {
      amount: request.amount,
      email: request.customerEmail,
      cardNumber: request.cardNumber || '',
      cardName: request.cardName || request.customerName || '',
      expiry: request.expiry || '',
      cvv: request.cvv || '',
      billingAddress: request.billingAddress,
    };

    // Process the payment through NMI
    const result = await nmiGateway.processPayment(paymentRequest);

    // Extract card information from response if available
    if (result.success && result.rawResponse) {
      const cardBrand = result.rawResponse.cc_type || result.rawResponse.card_type;
      const cardLastFour = result.rawResponse.cc_number?.slice(-4);

      return {
        ...result,
        rawResponse: {
          ...result.rawResponse,
          cardBrand,
          cardLastFour,
        },
      };
    }

    return result;
  }

  /**
   * Process a refund for a merchant transaction
   */
  async processRefund(
    merchant: Merchant,
    gatewayTransactionId: string,
    amount?: number,
    reason?: string
  ): Promise<PaymentResponse> {
    // Validate merchant status
    if (merchant.status !== 'active') {
      return {
        success: false,
        errorMessage: `Merchant account is ${merchant.status}. Only active merchants can process refunds.`,
      };
    }

    const nmiApiKey = this.getMerchantNmiApiKey(merchant);

    if (!nmiApiKey) {
      return {
        success: false,
        errorMessage: 'Merchant NMI credentials not configured.',
      };
    }

    // Create NMI gateway instance
    const nmiGateway = new NMIPaymentGateway({
      apiKey: nmiApiKey,
    });

    // Process the refund through NMI
    return await nmiGateway.refundPayment(gatewayTransactionId, amount);
  }

  /**
   * Get merchant's NMI API key
   *
   * In production, this might:
   * 1. Return merchant-specific NMI credentials from metadata
   * 2. Return partner's master API key (current implementation)
   * 3. Fetch credentials from secure vault
   */
  private getMerchantNmiApiKey(merchant: Merchant): string | undefined {
    // Check if merchant has custom NMI credentials in metadata
    const metadata = merchant.metadata as any;
    if (metadata?.nmiApiKey) {
      return metadata.nmiApiKey;
    }

    // Fall back to partner's NMI API key
    // This allows processing on behalf of sub-merchants
    return process.env.NMI_API_KEY;
  }

  /**
   * Authorize a payment without capturing (for 2-step processing)
   */
  async authorizePayment(
    merchant: Merchant,
    request: MerchantPaymentRequest
  ): Promise<PaymentResponse> {
    // Validate merchant
    if (merchant.status !== 'active' || !merchant.nmiMerchantId) {
      return {
        success: false,
        errorMessage: 'Merchant is not active or not configured.',
      };
    }

    const nmiApiKey = this.getMerchantNmiApiKey(merchant);
    if (!nmiApiKey) {
      return {
        success: false,
        errorMessage: 'Merchant NMI credentials not configured.',
      };
    }

    // For authorization, we'd use NMI's "auth" transaction type
    // This is a placeholder for future implementation
    return {
      success: false,
      errorMessage: 'Authorization transactions not yet implemented. Use processPayment for direct sales.',
    };
  }

  /**
   * Capture a previously authorized payment
   */
  async capturePayment(
    merchant: Merchant,
    authorizationId: string,
    amount?: number
  ): Promise<PaymentResponse> {
    // Placeholder for future implementation
    return {
      success: false,
      errorMessage: 'Capture transactions not yet implemented.',
    };
  }

  /**
   * Void a transaction (cancel before settlement)
   */
  async voidPayment(
    merchant: Merchant,
    transactionId: string
  ): Promise<PaymentResponse> {
    // Placeholder for future implementation
    return {
      success: false,
      errorMessage: 'Void transactions not yet implemented. Use refund for settled transactions.',
    };
  }

  /**
   * Validate card details before processing
   */
  validateCardDetails(request: MerchantPaymentRequest): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!request.cardNumber) {
      errors.push('Card number is required');
    } else if (request.cardNumber.replace(/\s/g, '').length < 13) {
      errors.push('Card number is too short');
    }

    if (!request.expiry) {
      errors.push('Card expiry is required');
    } else if (!/^\d{4}$/.test(request.expiry.replace(/\//g, ''))) {
      errors.push('Card expiry must be in MMYY format');
    }

    if (!request.cvv) {
      errors.push('CVV is required');
    } else if (!/^\d{3,4}$/.test(request.cvv)) {
      errors.push('CVV must be 3 or 4 digits');
    }

    if (!request.customerEmail) {
      errors.push('Customer email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(request.customerEmail)) {
      errors.push('Invalid email format');
    }

    if (request.amount <= 0) {
      errors.push('Amount must be greater than 0');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}

/**
 * Create merchant payment service instance
 */
export function createMerchantPaymentService(): MerchantPaymentService {
  return new MerchantPaymentService();
}
