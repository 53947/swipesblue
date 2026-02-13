/**
 * NMI Payment Gateway — Transaction Processing
 *
 * Handles all payment operations via the NMI Direct Post API:
 * sale, authorize, capture, void, refund, and Customer Vault operations.
 *
 * Uses SWIPESBLUE_PROCESSING env var for authentication.
 * Accepts Collect.js payment_token — raw card data never reaches this server.
 */

// ── Response Types ──────────────────────────────────────────────────────────

export interface NMIResponse {
  success: boolean;
  transactionId?: string;
  authCode?: string;
  message?: string;
  errorMessage?: string;
  rawResponse?: Record<string, string>;
}

export interface NMIVaultResponse extends NMIResponse {
  customerVaultId?: string;
}

// ── Parameter Types ─────────────────────────────────────────────────────────

export interface SaleParams {
  paymentToken?: string;
  customerVaultId?: string;
  amount: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  address1?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  description?: string;
  orderId?: string;
  invoiceNumber?: string;
}

export interface AuthorizeParams {
  paymentToken: string;
  amount: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  address1?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  description?: string;
  orderId?: string;
}

export interface CaptureParams {
  transactionId: string;
  amount?: number;
}

export interface VoidParams {
  transactionId: string;
}

export interface RefundParams {
  transactionId: string;
  amount?: number;
}

export interface VaultAddParams {
  paymentToken: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  address1?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
}

export interface VaultChargeParams {
  customerVaultId: string;
  amount: number;
  description?: string;
  orderId?: string;
}

// ── Gateway Class ───────────────────────────────────────────────────────────

export class NMIPaymentGateway {
  private securityKey: string;
  private apiUrl: string;

  constructor() {
    const key = process.env.SWIPESBLUE_PROCESSING;
    if (!key) {
      throw new Error("SWIPESBLUE_PROCESSING environment variable not set");
    }
    this.securityKey = key;
    this.apiUrl = "https://swipesblue.transactiongateway.com/api/transact.php";
  }

  /**
   * Sale — charge a card immediately.
   * Accepts either a Collect.js paymentToken OR a customerVaultId (not both).
   */
  async sale(params: SaleParams): Promise<NMIResponse> {
    const fields: Record<string, string> = {
      type: "sale",
      amount: params.amount.toFixed(2),
    };

    if (params.paymentToken) {
      fields.payment_token = params.paymentToken;
    } else if (params.customerVaultId) {
      fields.customer_vault_id = params.customerVaultId;
    } else {
      return {
        success: false,
        errorMessage: "Either paymentToken or customerVaultId is required",
      };
    }

    this.addOptionalFields(fields, params);
    return this.sendRequest(fields);
  }

  /**
   * Authorize — place a hold without capturing.
   */
  async authorize(params: AuthorizeParams): Promise<NMIResponse> {
    const fields: Record<string, string> = {
      type: "auth",
      payment_token: params.paymentToken,
      amount: params.amount.toFixed(2),
    };

    this.addOptionalFields(fields, params);
    return this.sendRequest(fields);
  }

  /**
   * Capture — settle a previously authorized transaction.
   * Amount is optional; if omitted, captures the full auth amount.
   */
  async capture(params: CaptureParams): Promise<NMIResponse> {
    const fields: Record<string, string> = {
      type: "capture",
      transactionid: params.transactionId,
    };

    if (params.amount !== undefined) {
      fields.amount = params.amount.toFixed(2);
    }

    return this.sendRequest(fields);
  }

  /**
   * Void — cancel a transaction before settlement.
   */
  async void(params: VoidParams): Promise<NMIResponse> {
    const fields: Record<string, string> = {
      type: "void",
      transactionid: params.transactionId,
    };

    return this.sendRequest(fields);
  }

  /**
   * Refund — return funds after settlement.
   * Amount is optional for partial refunds.
   */
  async refund(params: RefundParams): Promise<NMIResponse> {
    const fields: Record<string, string> = {
      type: "refund",
      transactionid: params.transactionId,
    };

    if (params.amount !== undefined) {
      fields.amount = params.amount.toFixed(2);
    }

    return this.sendRequest(fields);
  }

  /**
   * Add a customer's card to the NMI Customer Vault.
   * Uses a $0.00 validate transaction to tokenize without charging.
   */
  async addCustomerToVault(params: VaultAddParams): Promise<NMIVaultResponse> {
    const fields: Record<string, string> = {
      type: "validate",
      payment_token: params.paymentToken,
      customer_vault: "add_customer",
      amount: "0.00",
    };

    if (params.email) fields.email = params.email;
    if (params.firstName) fields.firstname = params.firstName;
    if (params.lastName) fields.lastname = params.lastName;
    if (params.address1) fields.address1 = params.address1;
    if (params.city) fields.city = params.city;
    if (params.state) fields.state = params.state;
    if (params.zip) fields.zip = params.zip;
    if (params.country) fields.country = params.country;

    const response = await this.sendRequest(fields);

    return {
      ...response,
      customerVaultId: response.rawResponse?.customer_vault_id,
    };
  }

  /**
   * Charge a customer already stored in the vault.
   */
  async chargeVaultCustomer(params: VaultChargeParams): Promise<NMIResponse> {
    const fields: Record<string, string> = {
      type: "sale",
      customer_vault_id: params.customerVaultId,
      amount: params.amount.toFixed(2),
    };

    if (params.description) fields.order_description = params.description;
    if (params.orderId) fields.orderid = params.orderId;

    return this.sendRequest(fields);
  }

  // ── Private Helpers ─────────────────────────────────────────────────────

  private addOptionalFields(
    fields: Record<string, string>,
    params: {
      email?: string;
      firstName?: string;
      lastName?: string;
      address1?: string;
      city?: string;
      state?: string;
      zip?: string;
      country?: string;
      description?: string;
      orderId?: string;
      invoiceNumber?: string;
    },
  ): void {
    if (params.email) fields.email = params.email;
    if (params.firstName) fields.firstname = params.firstName;
    if (params.lastName) fields.lastname = params.lastName;
    if (params.address1) fields.address1 = params.address1;
    if (params.city) fields.city = params.city;
    if (params.state) fields.state = params.state;
    if (params.zip) fields.zip = params.zip;
    if (params.country) fields.country = params.country;
    if (params.description) fields.order_description = params.description;
    if (params.orderId) fields.orderid = params.orderId;
    if ("invoiceNumber" in params && params.invoiceNumber) {
      fields.ponumber = params.invoiceNumber;
    }
  }

  /**
   * Send a form-encoded POST to the NMI Direct Post API.
   * security_key is injected automatically.
   */
  private async sendRequest(
    fields: Record<string, string>,
  ): Promise<NMIResponse> {
    try {
      const formData = new URLSearchParams();
      formData.append("security_key", this.securityKey);

      for (const [key, value] of Object.entries(fields)) {
        formData.append(key, value);
      }

      const response = await fetch(this.apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      });

      const responseText = await response.text();
      const parsed = this.parseResponse(responseText);

      // response=1 → Approved, response=2 → Declined, response=3 → Error
      if (parsed.response === "1") {
        return {
          success: true,
          transactionId: parsed.transactionid,
          authCode: parsed.authcode,
          message: parsed.responsetext,
          rawResponse: parsed,
        };
      }

      return {
        success: false,
        transactionId: parsed.transactionid,
        errorMessage: parsed.responsetext || "Transaction declined",
        rawResponse: parsed,
      };
    } catch (error) {
      console.error("NMI request error:", error);
      return {
        success: false,
        errorMessage:
          error instanceof Error ? error.message : "Payment processing failed",
      };
    }
  }

  /**
   * Parse NMI's URL-encoded key=value response into an object.
   */
  private parseResponse(responseText: string): Record<string, string> {
    const params = new URLSearchParams(responseText);
    const result: Record<string, string> = {};
    params.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }
}
