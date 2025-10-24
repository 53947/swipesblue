import type { PaymentGateway } from "@shared/schema";

export interface PaymentRequest {
  amount: number;
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvv: string;
  email: string;
  billingAddress?: {
    address: string;
    city: string;
    state: string;
    zip: string;
  };
}

export interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  authCode?: string;
  message?: string;
  errorMessage?: string;
  rawResponse?: any;
}

export class NMIPaymentGateway {
  private apiKey: string;
  private apiUrl: string;

  constructor(config: { apiKey: string; apiUrl?: string }) {
    this.apiKey = config.apiKey;
    this.apiUrl = config.apiUrl || "https://secure.networkmerchants.com/api/transact.php";
  }

  async processPayment(request: PaymentRequest): Promise<PaymentResponse> {
    try {
      const formData = new URLSearchParams();
      formData.append("security_key", this.apiKey);
      formData.append("type", "sale");
      formData.append("amount", request.amount.toFixed(2));
      formData.append("ccnumber", request.cardNumber.replace(/\s/g, ""));
      formData.append("ccexp", request.expiry.replace(/\//g, ""));
      formData.append("cvv", request.cvv);
      formData.append("firstname", request.cardName.split(" ")[0] || request.cardName);
      formData.append("lastname", request.cardName.split(" ").slice(1).join(" ") || "");
      formData.append("email", request.email);

      if (request.billingAddress) {
        formData.append("address1", request.billingAddress.address);
        formData.append("city", request.billingAddress.city);
        formData.append("state", request.billingAddress.state);
        formData.append("zip", request.billingAddress.zip);
      }

      const response = await fetch(this.apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      const responseText = await response.text();
      const parsedResponse = this.parseNMIResponse(responseText);

      if (parsedResponse.response === "1") {
        return {
          success: true,
          transactionId: parsedResponse.transactionid,
          authCode: parsedResponse.authcode,
          message: parsedResponse.responsetext,
          rawResponse: parsedResponse,
        };
      } else {
        return {
          success: false,
          errorMessage: parsedResponse.responsetext || "Payment declined",
          rawResponse: parsedResponse,
        };
      }
    } catch (error) {
      console.error("NMI payment error:", error);
      return {
        success: false,
        errorMessage: error instanceof Error ? error.message : "Payment processing failed",
      };
    }
  }

  private parseNMIResponse(responseText: string): any {
    const params = new URLSearchParams(responseText);
    const result: any = {};
    params.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }

  async refundPayment(transactionId: string, amount?: number): Promise<PaymentResponse> {
    try {
      const formData = new URLSearchParams();
      formData.append("security_key", this.apiKey);
      formData.append("type", "refund");
      formData.append("transactionid", transactionId);
      if (amount) {
        formData.append("amount", amount.toFixed(2));
      }

      const response = await fetch(this.apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      const responseText = await response.text();
      const parsedResponse = this.parseNMIResponse(responseText);

      if (parsedResponse.response === "1") {
        return {
          success: true,
          transactionId: parsedResponse.transactionid,
          message: parsedResponse.responsetext,
          rawResponse: parsedResponse,
        };
      } else {
        return {
          success: false,
          errorMessage: parsedResponse.responsetext || "Refund failed",
          rawResponse: parsedResponse,
        };
      }
    } catch (error) {
      console.error("NMI refund error:", error);
      return {
        success: false,
        errorMessage: error instanceof Error ? error.message : "Refund processing failed",
      };
    }
  }
}

export function createPaymentGateway(gateway: PaymentGateway): NMIPaymentGateway | null {
  if (gateway.type !== "nmi") {
    return null;
  }

  const config = gateway.config as any;
  if (!config?.apiKey) {
    throw new Error("NMI gateway configuration missing API key");
  }

  return new NMIPaymentGateway({
    apiKey: config.apiKey,
    apiUrl: config.apiUrl,
  });
}
