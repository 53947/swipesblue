/**
 * NMI Merchant Boarding API Service
 *
 * 3-step boarding flow via the real Merchant Boarding API:
 *   1. Create a Gateway Account
 *   2. Configure a Processor
 *   3. Configure Services
 *
 * Uses SWIPESBLUE_BOARDING_API env var for authentication (Authorization header).
 * All requests are JSON — NOT form-encoded.
 */

// ── Request Types ───────────────────────────────────────────────────────────

export interface CreateGatewayParams {
  company: string;
  address_1: string;
  address_2?: string;
  city: string;
  state: string;
  postal: string;
  country: string;
  url?: string;
  timezone_id: number;
  contact_first_name: string;
  contact_last_name: string;
  contact_phone: string;
  contact_email: string;
  account_number?: string;
  routing_number?: string;
  username: string;
  fee_plan?: number;
  external_identifier?: string;
  locale?: string;
  account_type?: "checking" | "savings";
  account_holder_type?: "business" | "personal";
  merchant_type?: "gateway" | "split";
  features?: {
    capture_higher_than_authed?: boolean;
    tsys?: { allow_payment_facilitator_fields?: boolean };
  };
}

export interface ProcessorConfigParams {
  platform: string;
  default_industry_classification?: "ecommerce" | "moto" | "retail";
  max_transaction_amount?: string;
  max_monthly_volume: string;
  enable_duplicate_checking: boolean;
  allow_duplicate_checking_override: boolean;
  duplicate_checking_seconds: number;
  processor_description: string;
  mcc: number;
  currencies?: string;
  payment_types?: string;
  required_fields?: string;
  precheck_method?: "void" | "preauth";
  settlement_time?: string;
  descriptor?: string;
  descriptor_phone?: string;
  // Processor-specific config fields
  processor_config_1?: string;
  processor_config_2?: string;
  processor_config_3?: string | boolean;
  processor_config_4?: string | boolean;
  processor_config_5?: string | boolean;
  processor_config_6?: string | boolean;
  processor_config_7?: string | boolean;
  processor_config_8?: string;
  processor_config_9?: string;
  processor_config_10?: string;
  // FACe legal entity (for Vantiv/Worldpay platforms)
  legal_entity?: Record<string, any>;
  legal_entity_id?: string;
  sub_merchant?: Record<string, any>;
  // ProPay-specific
  propay_merchant_account?: Record<string, any>;
  propay_business_account?: Record<string, any>;
  // Payment facilitation
  payment_facilitation_data?: Record<string, any>;
  split_funding?: {
    split_type: "surcharge" | "fees";
    split_rate: "percent" | "fixed";
    split_amount: string;
    split_merchant: number;
  };
}

export interface ServiceConfigParams {
  automatic_card_updater?: { status: ServiceStatus; run_immediately_after_activation?: boolean };
  customer_vault?: { status: ServiceStatus };
  ispyfraud?: { status: ServiceStatus };
  payer_authentication_2?: { status: ServiceStatus; payment_types_allowed?: string[] };
  centinel_2?: {
    status: ServiceStatus;
    payment_types_allowed?: string[];
    org_unit_id?: string;
    api_identifier?: string;
    api_key?: string;
    centinel_url?: string;
  };
  airline_industry?: { status: ServiceStatus };
  certifypci?: { status: ServiceStatus; insurance?: boolean };
  encrypted_devices?: { status: ServiceStatus };
  enhanced_data?: { status: ServiceStatus };
  invoicing?: { status: ServiceStatus };
  mobile_payments?: { status: ServiceStatus };
  quickbooks_syncpay?: { status: ServiceStatus };
}

type ServiceStatus = "active" | "not_offered" | "offered";

export interface FullBoardingParams {
  gateway: CreateGatewayParams;
  processor: ProcessorConfigParams;
  services?: ServiceConfigParams;
}

// ── Response Types ──────────────────────────────────────────────────────────

export interface GatewayAccountResponse {
  id: number;
  company: string;
  address_1?: string;
  address_2?: string;
  city?: string;
  state?: string;
  postal?: string;
  country?: string;
  url?: string;
  timezone_id?: string;
  contact_first_name?: string;
  contact_last_name?: string;
  contact_phone?: string;
  contact_email?: string;
  account_number?: string;
  routing_number?: string;
  username?: string;
  fee_plan?: string;
  external_identifier?: string;
  locale?: string;
  status?: string;
  [key: string]: any;
}

export interface ProcessorResponse {
  id: number;
  processor_id: string;
  platform: string;
  status: string;
  [key: string]: any;
}

export interface ServiceResponse {
  [serviceName: string]: {
    status: string;
    service_id?: string;
    reason?: string;
    [key: string]: any;
  };
}

export interface BoardingResult {
  gateway: GatewayAccountResponse;
  processor: ProcessorResponse;
  services?: ServiceResponse;
}

// ── Service Class ───────────────────────────────────────────────────────────

export class NMIPartnerService {
  private boardingKey: string;
  private baseUrl: string;

  constructor() {
    const key = process.env.SWIPESBLUE_BOARDING_API;
    if (!key) {
      throw new Error("SWIPESBLUE_BOARDING_API environment variable not set");
    }
    this.boardingKey = key;
    this.baseUrl = "https://swipesblue.transactiongateway.com/api/v3/affiliate";
  }

  /**
   * Step 1: Create a new Gateway Account for a merchant.
   * Returns the gateway ID used in subsequent steps.
   */
  async createGatewayAccount(
    params: CreateGatewayParams,
  ): Promise<GatewayAccountResponse> {
    return this.request("POST", "/gateways", params);
  }

  /**
   * Step 2: Configure a processor on the gateway account.
   */
  async configureProcessor(
    gatewayId: number,
    params: ProcessorConfigParams,
  ): Promise<ProcessorResponse> {
    return this.request("POST", `/gateways/${gatewayId}/processors`, params);
  }

  /**
   * Step 3: Enable services (Customer Vault, invoicing, fraud, etc.).
   */
  async configureServices(
    gatewayId: number,
    services: ServiceConfigParams,
  ): Promise<ServiceResponse> {
    return this.request("POST", `/gateways/${gatewayId}/services`, services);
  }

  /**
   * Full boarding: runs all 3 steps in sequence.
   * If any step fails, the error propagates immediately.
   */
  async boardMerchant(params: FullBoardingParams): Promise<BoardingResult> {
    // Step 1 — Create gateway account
    const gateway = await this.createGatewayAccount(params.gateway);

    // Step 2 — Configure processor
    const processor = await this.configureProcessor(gateway.id, params.processor);

    // Step 3 — Configure services (optional)
    let services: ServiceResponse | undefined;
    if (params.services) {
      services = await this.configureServices(gateway.id, params.services);
    }

    return { gateway, processor, services };
  }

  // ── Account Management ──────────────────────────────────────────────────

  /**
   * Retrieve details for a gateway account.
   */
  async getGatewayAccount(gatewayId: number): Promise<GatewayAccountResponse> {
    return this.request("GET", `/gateways/${gatewayId}`);
  }

  /**
   * Update fields on an existing gateway account.
   */
  async updateGatewayAccount(
    gatewayId: number,
    updates: Partial<CreateGatewayParams>,
  ): Promise<GatewayAccountResponse> {
    return this.request("PATCH", `/gateways/${gatewayId}`, updates);
  }

  /**
   * Change the status of a merchant gateway account.
   * Valid values: active, closed, restricted, deleted.
   * Warning: deleted cannot be undone.
   */
  async setMerchantStatus(
    gatewayId: number,
    status: "active" | "closed" | "restricted" | "deleted",
  ): Promise<{ status: string }> {
    return this.request("POST", `/gateways/${gatewayId}/status`, {
      set_merchant_status: status,
    });
  }

  /**
   * List all gateway accounts associated with the affiliate API key.
   */
  async listGatewayAccounts(): Promise<GatewayAccountResponse[]> {
    return this.request("GET", "/gateways");
  }

  /**
   * Update processor status (active/disabled) or delete a processor.
   */
  async setProcessorStatus(
    gatewayId: number,
    processorId: number,
    status: "active" | "disabled",
    rerouteProcessorId?: string,
  ): Promise<{ status: string }> {
    const body: Record<string, string> = { set_processor_status: status };
    if (rerouteProcessorId) {
      body.set_processor_reroute = rerouteProcessorId;
    }
    return this.request(
      "PATCH",
      `/gateways/${gatewayId}/processors/${processorId}`,
      body,
    );
  }

  // ── Private Request Helper ──────────────────────────────────────────────

  private async request<T = any>(
    method: string,
    path: string,
    body?: any,
  ): Promise<T> {
    const url = `${this.baseUrl}${path}`;

    const headers: Record<string, string> = {
      Authorization: this.boardingKey,
      "Content-Type": "application/json",
    };

    const options: RequestInit = { method, headers };

    if (body && method !== "GET") {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      let errorData: any;
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: response.statusText };
      }

      const errorMessage =
        errorData.message || errorData.type || "Unknown error";
      throw new Error(
        `NMI Boarding API error ${response.status}: ${errorMessage}`,
      );
    }

    return response.json() as Promise<T>;
  }
}
