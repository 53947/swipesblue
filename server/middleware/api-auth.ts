/**
 * API Authentication Middleware
 *
 * Validates API keys for partner platform requests to SwipesBlue payment API
 */

import type { Request, Response, NextFunction } from "express";
import { db } from "../db";
import { apiKeys } from "@shared/schema";
import { eq, and } from "drizzle-orm";
import crypto from "crypto";

// Extend Express Request to include API key data
export interface AuthenticatedRequest extends Request {
  apiKey?: {
    id: string;
    platform: string;
    name: string;
    permissions: string[];
  };
}

/**
 * Middleware to require API key authentication
 * Usage: app.post('/api/v1/payments/process', requireApiKey, handler)
 */
export async function requireApiKey(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // Extract API key from Authorization header or query parameter
    const authHeader = req.headers["authorization"];
    const apiKeyFromQuery = req.query.api_key as string;

    let apiKeyValue: string | undefined;

    if (authHeader) {
      // Support both "Bearer token" and "ApiKey token" formats
      const parts = authHeader.split(" ");
      if (parts.length === 2 && (parts[0] === "Bearer" || parts[0] === "ApiKey")) {
        apiKeyValue = parts[1];
      } else {
        apiKeyValue = authHeader; // Direct API key
      }
    } else if (apiKeyFromQuery) {
      apiKeyValue = apiKeyFromQuery;
    }

    if (!apiKeyValue) {
      res.status(401).json({
        error: "Unauthorized",
        message: "API key is required. Provide via Authorization header or api_key query parameter.",
      });
      return;
    }

    // Look up API key in database
    const results = await db
      .select()
      .from(apiKeys)
      .where(eq(apiKeys.apiKey, apiKeyValue))
      .limit(1);

    const apiKey = results[0];

    if (!apiKey) {
      res.status(401).json({
        error: "Unauthorized",
        message: "Invalid API key",
      });
      return;
    }

    // Check if API key is active
    if (!apiKey.isActive) {
      res.status(403).json({
        error: "Forbidden",
        message: "API key has been deactivated",
      });
      return;
    }

    // Update last used timestamp (fire and forget)
    db.update(apiKeys)
      .set({ lastUsedAt: new Date() })
      .where(eq(apiKeys.id, apiKey.id))
      .execute()
      .catch((err) => console.error("Failed to update API key last used:", err));

    // Attach API key info to request
    (req as AuthenticatedRequest).apiKey = {
      id: apiKey.id,
      platform: apiKey.platform,
      name: apiKey.name,
      permissions: (apiKey.permissions as string[]) || [],
    };

    next();
  } catch (error) {
    console.error("API authentication error:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to authenticate API key",
    });
  }
}

/**
 * Middleware to check if API key has specific permission
 * Usage: app.post('/api/v1/payments/process', requireApiKey, requirePermission('process_payments'), handler)
 */
export function requirePermission(permission: string) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authReq = req as AuthenticatedRequest;

    if (!authReq.apiKey) {
      res.status(401).json({
        error: "Unauthorized",
        message: "API key authentication required",
      });
      return;
    }

    const permissions = authReq.apiKey.permissions || [];

    // Check for wildcard permission or specific permission
    if (permissions.includes("*") || permissions.includes(permission)) {
      next();
      return;
    }

    res.status(403).json({
      error: "Forbidden",
      message: `API key does not have permission: ${permission}`,
    });
  };
}

/**
 * Middleware to restrict API key to specific platform
 * Usage: app.get('/api/v1/merchants/platform/businessblueprint', requireApiKey, requirePlatform('businessblueprint'), handler)
 */
export function requirePlatform(allowedPlatform: string) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authReq = req as AuthenticatedRequest;

    if (!authReq.apiKey) {
      res.status(401).json({
        error: "Unauthorized",
        message: "API key authentication required",
      });
      return;
    }

    // Allow 'internal' platform to access everything
    if (authReq.apiKey.platform === "internal" || authReq.apiKey.platform === allowedPlatform) {
      next();
      return;
    }

    res.status(403).json({
      error: "Forbidden",
      message: `API key is not authorized for platform: ${allowedPlatform}`,
    });
  };
}

/**
 * Generate a secure random API key
 */
export function generateApiKey(): string {
  // Generate format: sb_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx (32 random chars)
  const randomBytes = crypto.randomBytes(24);
  const randomString = randomBytes.toString("base64url");
  return `sb_live_${randomString}`;
}

/**
 * Generate a secure random API secret
 */
export function generateApiSecret(): string {
  // Generate format: sb_secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx (48 random chars)
  const randomBytes = crypto.randomBytes(36);
  const randomString = randomBytes.toString("base64url");
  return `sb_secret_${randomString}`;
}

/**
 * Hash API key for secure storage (optional - for production use)
 */
export function hashApiKey(apiKey: string): string {
  return crypto.createHash("sha256").update(apiKey).digest("hex");
}

/**
 * Verify HMAC signature for webhook requests
 */
export function verifyHmacSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}
