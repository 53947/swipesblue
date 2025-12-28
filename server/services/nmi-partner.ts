/**
 * NMI Partner API Service
 *
 * Handles merchant boarding and sub-merchant account creation via NMI Partner API
 * For partners with NMI affiliate/ISO relationships
 */

export interface MerchantBoardingRequest {
  // Business Information
  businessName: string;
  businessEmail: string;
  businessPhone?: string;
  businessAddress?: string;
  businessCity?: string;
  businessState?: string;
  businessZip?: string;
  businessCountry?: string;

  // Platform Information
  platform: 'businessblueprint' | 'hostsblue' | 'swipesblue';
  platformClientId: string;

  // Additional merchant data
  dba?: string; // Doing Business As
  website?: string;
  taxId?: string; // EIN or SSN
  businessType?: string; // corporation, llc, sole_proprietor, etc.
  merchantCategoryCode?: string; // MCC code
  annualVolume?: number;
  averageTicket?: number;
  highTicket?: number;
}

export interface MerchantBoardingResponse {
  success: boolean;
  merchantId?: string; // NMI sub-merchant ID
  applicationId?: string; // Application tracking ID
  status?: string; // pending, approved, rejected
  message?: string;
  errorMessage?: string;
  rawResponse?: any;
}

export class NMIPartnerService {
  private partnerId: string;
  private merchantBoardingKey: string;
  private apiUrl: string;

  constructor(config: {
    partnerId: string;
    merchantBoardingKey: string;
    apiUrl?: string;
  }) {
    this.partnerId = config.partnerId;
    this.merchantBoardingKey = config.merchantBoardingKey;
    this.apiUrl = config.apiUrl || "https://secure.nmi.com/api/v1/boarding";
  }

  /**
   * Create a sub-merchant account via NMI Partner API
   * This initiates the merchant boarding process
   */
  async createSubMerchant(request: MerchantBoardingRequest): Promise<MerchantBoardingResponse> {
    try {
      // Build the boarding request payload
      const formData = new URLSearchParams();

      // Authentication
      formData.append("partner_id", this.partnerId);
      formData.append("merchant_boarding_key", this.merchantBoardingKey);

      // Required business information
      formData.append("legal_name", request.businessName);
      formData.append("email", request.businessEmail);

      // Optional business details
      if (request.dba) formData.append("dba", request.dba);
      if (request.businessPhone) formData.append("phone", request.businessPhone);
      if (request.website) formData.append("website", request.website);
      if (request.taxId) formData.append("tax_id", request.taxId);
      if (request.businessType) formData.append("business_type", request.businessType);
      if (request.merchantCategoryCode) formData.append("mcc", request.merchantCategoryCode);

      // Business address
      if (request.businessAddress) {
        formData.append("address", request.businessAddress);
        formData.append("city", request.businessCity || "");
        formData.append("state", request.businessState || "");
        formData.append("zip", request.businessZip || "");
        formData.append("country", request.businessCountry || "US");
      }

      // Processing volume expectations
      if (request.annualVolume) formData.append("annual_volume", request.annualVolume.toString());
      if (request.averageTicket) formData.append("average_ticket", request.averageTicket.toString());
      if (request.highTicket) formData.append("high_ticket", request.highTicket.toString());

      // Platform metadata for tracking
      formData.append("custom_field_1", request.platform); // Track which platform
      formData.append("custom_field_2", request.platformClientId); // Platform's client ID

      // Make the API request
      const response = await fetch(this.apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      const responseText = await response.text();
      const parsedResponse = this.parseNMIResponse(responseText);

      // Check if boarding was successful
      if (parsedResponse.response === "1" || parsedResponse.result === "success") {
        return {
          success: true,
          merchantId: parsedResponse.merchant_id || parsedResponse.merchantid,
          applicationId: parsedResponse.application_id || parsedResponse.applicationid,
          status: parsedResponse.status || "pending",
          message: parsedResponse.responsetext || parsedResponse.message || "Merchant application submitted successfully",
          rawResponse: parsedResponse,
        };
      } else {
        return {
          success: false,
          errorMessage: parsedResponse.responsetext || parsedResponse.message || "Merchant boarding failed",
          status: parsedResponse.status || "rejected",
          rawResponse: parsedResponse,
        };
      }
    } catch (error) {
      console.error("NMI merchant boarding error:", error);
      return {
        success: false,
        errorMessage: error instanceof Error ? error.message : "Merchant boarding request failed",
      };
    }
  }

  /**
   * Check the status of a merchant boarding application
   */
  async getMerchantStatus(merchantId: string): Promise<MerchantBoardingResponse> {
    try {
      const formData = new URLSearchParams();
      formData.append("partner_id", this.partnerId);
      formData.append("merchant_boarding_key", this.merchantBoardingKey);
      formData.append("merchant_id", merchantId);
      formData.append("action", "status");

      const response = await fetch(this.apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      const responseText = await response.text();
      const parsedResponse = this.parseNMIResponse(responseText);

      return {
        success: parsedResponse.response === "1",
        merchantId: merchantId,
        status: parsedResponse.status,
        message: parsedResponse.responsetext || parsedResponse.message,
        rawResponse: parsedResponse,
      };
    } catch (error) {
      console.error("NMI merchant status check error:", error);
      return {
        success: false,
        errorMessage: error instanceof Error ? error.message : "Status check failed",
      };
    }
  }

  /**
   * Update merchant account information
   */
  async updateMerchant(merchantId: string, updates: Partial<MerchantBoardingRequest>): Promise<MerchantBoardingResponse> {
    try {
      const formData = new URLSearchParams();
      formData.append("partner_id", this.partnerId);
      formData.append("merchant_boarding_key", this.merchantBoardingKey);
      formData.append("merchant_id", merchantId);
      formData.append("action", "update");

      // Add any fields that are being updated
      if (updates.businessEmail) formData.append("email", updates.businessEmail);
      if (updates.businessPhone) formData.append("phone", updates.businessPhone);
      if (updates.website) formData.append("website", updates.website);
      // ... add other updatable fields as needed

      const response = await fetch(this.apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      const responseText = await response.text();
      const parsedResponse = this.parseNMIResponse(responseText);

      return {
        success: parsedResponse.response === "1",
        merchantId: merchantId,
        message: parsedResponse.responsetext || parsedResponse.message,
        rawResponse: parsedResponse,
      };
    } catch (error) {
      console.error("NMI merchant update error:", error);
      return {
        success: false,
        errorMessage: error instanceof Error ? error.message : "Merchant update failed",
      };
    }
  }

  /**
   * Suspend or reactivate a merchant account
   */
  async updateMerchantStatus(merchantId: string, status: 'active' | 'suspended'): Promise<MerchantBoardingResponse> {
    try {
      const formData = new URLSearchParams();
      formData.append("partner_id", this.partnerId);
      formData.append("merchant_boarding_key", this.merchantBoardingKey);
      formData.append("merchant_id", merchantId);
      formData.append("action", status === 'active' ? 'activate' : 'suspend');

      const response = await fetch(this.apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      const responseText = await response.text();
      const parsedResponse = this.parseNMIResponse(responseText);

      return {
        success: parsedResponse.response === "1",
        merchantId: merchantId,
        status: status,
        message: parsedResponse.responsetext || parsedResponse.message,
        rawResponse: parsedResponse,
      };
    } catch (error) {
      console.error("NMI merchant status update error:", error);
      return {
        success: false,
        errorMessage: error instanceof Error ? error.message : "Status update failed",
      };
    }
  }

  /**
   * Parse NMI's URL-encoded response format
   */
  private parseNMIResponse(responseText: string): any {
    const params = new URLSearchParams(responseText);
    const result: any = {};
    params.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }
}

/**
 * Create NMI Partner Service instance from environment variables
 */
export function createNMIPartnerService(): NMIPartnerService {
  const partnerId = process.env.NMI_PARTNER_ID;
  const merchantBoardingKey = process.env.NMI_MERCHANT_BOARDING_KEY;
  const apiUrl = process.env.NMI_PARTNER_API_URL;

  if (!partnerId || !merchantBoardingKey) {
    throw new Error("NMI Partner credentials not configured. Set NMI_PARTNER_ID and NMI_MERCHANT_BOARDING_KEY environment variables.");
  }

  return new NMIPartnerService({
    partnerId,
    merchantBoardingKey,
    apiUrl,
  });
}
