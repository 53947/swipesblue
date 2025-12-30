import crypto from "crypto";
import { storage } from "../storage";
import type { WebhookEndpoint, WebhookDelivery } from "../../shared/schema";

/**
 * Available webhook event types
 */
export enum WebhookEventType {
  PAYMENT_SUCCESS = "payment.success",
  PAYMENT_FAILED = "payment.failed",
  PAYMENT_REFUNDED = "payment.refunded",
  MERCHANT_CREATED = "merchant.created",
  MERCHANT_APPROVED = "merchant.approved",
  MERCHANT_SUSPENDED = "merchant.suspended",
}

/**
 * Webhook event payload structure
 */
export interface WebhookEventPayload {
  event: WebhookEventType;
  timestamp: string;
  platform: string;
  data: Record<string, any>;
}

/**
 * Webhook delivery configuration
 */
interface WebhookDeliveryConfig {
  maxAttempts: number;
  initialRetryDelay: number; // milliseconds
  maxRetryDelay: number; // milliseconds
  timeout: number; // milliseconds
}

const DEFAULT_CONFIG: WebhookDeliveryConfig = {
  maxAttempts: 5,
  initialRetryDelay: 60000, // 1 minute
  maxRetryDelay: 3600000, // 1 hour
  timeout: 30000, // 30 seconds
};

/**
 * Webhook Service - handles webhook registration, delivery, and retry logic
 */
export class WebhookService {
  private config: WebhookDeliveryConfig;

  constructor(config?: Partial<WebhookDeliveryConfig>) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Register a new webhook endpoint
   * @param platform - The platform registering the webhook
   * @param url - The webhook endpoint URL
   * @param events - Array of event types to subscribe to
   * @returns The registered webhook endpoint with generated secret
   */
  async registerWebhook(
    platform: string,
    url: string,
    events: WebhookEventType[]
  ): Promise<{ endpoint: WebhookEndpoint; secret: string }> {
    // Validate URL
    try {
      const urlObj = new URL(url);
      if (!["http:", "https:"].includes(urlObj.protocol)) {
        throw new Error("Webhook URL must use HTTP or HTTPS protocol");
      }
      // Recommend HTTPS in production
      if (urlObj.protocol === "http:" && process.env.NODE_ENV === "production") {
        console.warn(`Warning: Webhook URL ${url} uses HTTP instead of HTTPS`);
      }
    } catch (error) {
      throw new Error(`Invalid webhook URL: ${error instanceof Error ? error.message : String(error)}`);
    }

    // Validate events
    const validEvents = Object.values(WebhookEventType);
    const invalidEvents = events.filter((event) => !validEvents.includes(event));
    if (invalidEvents.length > 0) {
      throw new Error(`Invalid event types: ${invalidEvents.join(", ")}`);
    }

    if (events.length === 0) {
      throw new Error("At least one event type must be specified");
    }

    // Generate secure secret for HMAC signing
    const secret = this.generateSecret();

    // Store webhook endpoint
    const endpoint = await storage.createWebhookEndpoint({
      platform,
      url,
      events: events as any, // JSON field
      secret,
      isActive: true,
    });

    return { endpoint, secret };
  }

  /**
   * Send a webhook event to all subscribed endpoints
   * @param event - The event type
   * @param platform - The platform that triggered the event
   * @param data - The event data payload
   */
  async sendWebhookEvent(
    event: WebhookEventType,
    platform: string,
    data: Record<string, any>
  ): Promise<void> {
    // Find all active webhook endpoints subscribed to this event
    const endpoints = await storage.getWebhookEndpointsByPlatform(platform);
    const subscribedEndpoints = endpoints.filter(
      (endpoint) =>
        endpoint.isActive &&
        Array.isArray(endpoint.events) &&
        endpoint.events.includes(event)
    );

    if (subscribedEndpoints.length === 0) {
      console.log(`No webhook endpoints subscribed to ${event} for platform ${platform}`);
      return;
    }

    // Prepare event payload
    const payload: WebhookEventPayload = {
      event,
      timestamp: new Date().toISOString(),
      platform,
      data,
    };

    // Send to all subscribed endpoints (fire and forget with tracking)
    const deliveryPromises = subscribedEndpoints.map((endpoint) =>
      this.deliverWebhook(endpoint, payload)
    );

    // Don't await - let deliveries happen asynchronously
    Promise.allSettled(deliveryPromises).catch((error) => {
      console.error("Error in webhook delivery batch:", error);
    });
  }

  /**
   * Deliver a webhook to a specific endpoint
   * @param endpoint - The webhook endpoint
   * @param payload - The event payload
   */
  private async deliverWebhook(
    endpoint: WebhookEndpoint,
    payload: WebhookEventPayload
  ): Promise<void> {
    // Create delivery record
    const delivery = await storage.createWebhookDelivery({
      endpointId: endpoint.id,
      event: payload.event,
      payload: payload as any, // JSON field
      status: "pending",
      attempts: 0,
    });

    // Attempt delivery
    await this.attemptDelivery(delivery, endpoint, payload);
  }

  /**
   * Attempt to deliver a webhook
   * @param delivery - The delivery record
   * @param endpoint - The webhook endpoint
   * @param payload - The event payload
   */
  private async attemptDelivery(
    delivery: WebhookDelivery,
    endpoint: WebhookEndpoint,
    payload: WebhookEventPayload
  ): Promise<void> {
    const attempts = delivery.attempts + 1;

    try {
      // Generate HMAC signature
      const signature = this.generateSignature(payload, endpoint.secret);

      // Prepare request
      const payloadString = JSON.stringify(payload);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

      // Send webhook
      const response = await fetch(endpoint.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Webhook-Signature": signature,
          "X-Webhook-Event": payload.event,
          "X-Webhook-Timestamp": payload.timestamp,
          "User-Agent": "SwipesBlue-Webhook/1.0",
        },
        body: payloadString,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Read response body (limit to 10KB to prevent abuse)
      const responseText = await response.text().then((text) => text.slice(0, 10000));

      // Check if delivery was successful (2xx status codes)
      if (response.ok) {
        await storage.updateWebhookDelivery(delivery.id, {
          status: "success",
          attempts,
          responseStatus: response.status,
          responseBody: responseText,
        });
        console.log(`Webhook delivered successfully to ${endpoint.url} (attempt ${attempts})`);
      } else {
        // Non-2xx response - schedule retry
        await this.scheduleRetry(delivery, attempts, response.status, responseText);
      }
    } catch (error) {
      // Network error, timeout, or other failure - schedule retry
      const errorMessage = error instanceof Error ? error.message : String(error);
      await this.scheduleRetry(delivery, attempts, undefined, errorMessage);
    }
  }

  /**
   * Schedule a retry for a failed delivery
   * @param delivery - The delivery record
   * @param attempts - Number of attempts made so far
   * @param responseStatus - HTTP response status (if any)
   * @param errorMessage - Error message or response body
   */
  private async scheduleRetry(
    delivery: WebhookDelivery,
    attempts: number,
    responseStatus?: number,
    errorMessage?: string
  ): Promise<void> {
    // Check if max attempts reached
    if (attempts >= this.config.maxAttempts) {
      await storage.updateWebhookDelivery(delivery.id, {
        status: "failed",
        attempts,
        responseStatus,
        errorMessage,
        nextRetry: null,
      });
      console.error(
        `Webhook delivery failed permanently after ${attempts} attempts: ${errorMessage}`
      );
      return;
    }

    // Calculate exponential backoff delay
    const delay = Math.min(
      this.config.initialRetryDelay * Math.pow(2, attempts - 1),
      this.config.maxRetryDelay
    );
    const nextRetry = new Date(Date.now() + delay);

    await storage.updateWebhookDelivery(delivery.id, {
      status: "pending",
      attempts,
      responseStatus,
      errorMessage,
      nextRetry,
    });

    console.log(
      `Webhook delivery failed (attempt ${attempts}), scheduling retry at ${nextRetry.toISOString()}: ${errorMessage}`
    );
  }

  /**
   * Retry failed webhook deliveries that are due for retry
   * This should be called periodically by a background worker
   */
  async retryFailedDeliveries(): Promise<void> {
    const now = new Date();
    const pendingDeliveries = await storage.getPendingWebhookDeliveries(now);

    if (pendingDeliveries.length === 0) {
      return;
    }

    console.log(`Retrying ${pendingDeliveries.length} pending webhook deliveries`);

    for (const delivery of pendingDeliveries) {
      try {
        // Get the endpoint
        const endpoint = await storage.getWebhookEndpoint(delivery.endpointId);
        if (!endpoint || !endpoint.isActive) {
          // Endpoint no longer exists or is inactive - mark delivery as failed
          await storage.updateWebhookDelivery(delivery.id, {
            status: "failed",
            errorMessage: "Webhook endpoint is inactive or was deleted",
            nextRetry: null,
          });
          continue;
        }

        // Parse the stored payload
        const payload = delivery.payload as unknown as WebhookEventPayload;

        // Attempt delivery
        await this.attemptDelivery(delivery, endpoint, payload);
      } catch (error) {
        console.error(`Error retrying webhook delivery ${delivery.id}:`, error);
      }
    }
  }

  /**
   * Validate a webhook signature (for incoming webhooks from external services)
   * @param payload - The webhook payload (as string)
   * @param signature - The signature to validate
   * @param secret - The secret key used to generate the signature
   * @returns True if signature is valid
   */
  validateWebhookSignature(payload: string, signature: string, secret: string): boolean {
    const expectedSignature = this.generateSignature(payload, secret);
    // Use timing-safe comparison to prevent timing attacks
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  }

  /**
   * Generate HMAC signature for a payload
   * @param payload - The payload to sign (object or string)
   * @param secret - The secret key
   * @returns HMAC signature as hex string
   */
  private generateSignature(payload: WebhookEventPayload | string, secret: string): string {
    const payloadString = typeof payload === "string" ? payload : JSON.stringify(payload);
    return crypto.createHmac("sha256", secret).update(payloadString).digest("hex");
  }

  /**
   * Generate a secure random secret for webhook signing
   * @returns A base64url-encoded random secret (256 bits)
   */
  private generateSecret(): string {
    return crypto.randomBytes(32).toString("base64url");
  }

  /**
   * Test a webhook endpoint by sending a test event
   * @param endpointId - The webhook endpoint ID
   * @returns Delivery result
   */
  async testWebhook(endpointId: string): Promise<{
    success: boolean;
    status?: number;
    message: string;
  }> {
    const endpoint = await storage.getWebhookEndpoint(endpointId);
    if (!endpoint) {
      throw new Error("Webhook endpoint not found");
    }

    const testPayload: WebhookEventPayload = {
      event: WebhookEventType.PAYMENT_SUCCESS,
      timestamp: new Date().toISOString(),
      platform: endpoint.platform,
      data: {
        test: true,
        message: "This is a test webhook event",
      },
    };

    try {
      const signature = this.generateSignature(testPayload, endpoint.secret);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

      const response = await fetch(endpoint.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Webhook-Signature": signature,
          "X-Webhook-Event": testPayload.event,
          "X-Webhook-Timestamp": testPayload.timestamp,
          "User-Agent": "SwipesBlue-Webhook/1.0",
        },
        body: JSON.stringify(testPayload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      return {
        success: response.ok,
        status: response.status,
        message: response.ok
          ? "Test webhook delivered successfully"
          : `Webhook endpoint returned ${response.status} ${response.statusText}`,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to deliver test webhook: ${error instanceof Error ? error.message : String(error)}`,
      };
    }
  }
}

// Export singleton instance
export const webhookService = new WebhookService();
