import { webhookService } from "../services/webhook";

/**
 * Background worker for retrying failed webhook deliveries
 * Runs periodically to process pending webhook deliveries that are due for retry
 */
export class WebhookRetryWorker {
  private intervalId: NodeJS.Timeout | null = null;
  private isRunning = false;
  private retryInterval: number;

  /**
   * Create a new webhook retry worker
   * @param retryInterval - How often to check for pending deliveries (in milliseconds)
   */
  constructor(retryInterval: number = 60000) {
    // Default: check every 60 seconds
    this.retryInterval = retryInterval;
  }

  /**
   * Start the background worker
   */
  start(): void {
    if (this.isRunning) {
      console.warn("Webhook retry worker is already running");
      return;
    }

    console.log(
      `Starting webhook retry worker (checking every ${this.retryInterval / 1000} seconds)`
    );

    this.isRunning = true;

    // Run immediately on start
    this.processRetries().catch((error) => {
      console.error("Error in initial webhook retry processing:", error);
    });

    // Then run periodically
    this.intervalId = setInterval(() => {
      this.processRetries().catch((error) => {
        console.error("Error in webhook retry worker:", error);
      });
    }, this.retryInterval);
  }

  /**
   * Stop the background worker
   */
  stop(): void {
    if (!this.isRunning) {
      console.warn("Webhook retry worker is not running");
      return;
    }

    console.log("Stopping webhook retry worker");

    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    this.isRunning = false;
  }

  /**
   * Process pending webhook deliveries
   */
  private async processRetries(): Promise<void> {
    try {
      await webhookService.retryFailedDeliveries();
    } catch (error) {
      console.error("Error processing webhook retries:", error);
      // Don't throw - we'll try again on the next interval
    }
  }

  /**
   * Check if the worker is currently running
   */
  isWorkerRunning(): boolean {
    return this.isRunning;
  }

  /**
   * Update the retry interval (requires restart)
   * @param newInterval - New interval in milliseconds
   */
  updateInterval(newInterval: number): void {
    const wasRunning = this.isRunning;

    if (wasRunning) {
      this.stop();
    }

    this.retryInterval = newInterval;

    if (wasRunning) {
      this.start();
    }
  }
}

// Export singleton instance
// Default configuration: check every 60 seconds
export const webhookRetryWorker = new WebhookRetryWorker(60000);

// Handle graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received, stopping webhook retry worker");
  webhookRetryWorker.stop();
});

process.on("SIGINT", () => {
  console.log("SIGINT received, stopping webhook retry worker");
  webhookRetryWorker.stop();
});
