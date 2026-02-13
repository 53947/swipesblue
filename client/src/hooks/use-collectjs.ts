/**
 * Collect.js Integration Hook
 *
 * Loads the Collect.js tokenization script from the swipesblue white-label gateway,
 * configures secure iframes for card number / expiry / CVV, and provides a
 * requestToken() function that returns a PCI-safe payment_token.
 *
 * Usage:
 *   const { isReady, error, requestToken } = useCollectJs();
 *
 * Your component must render three container divs:
 *   <div id="collect-ccnumber" />
 *   <div id="collect-ccexp" />
 *   <div id="collect-cvv" />
 *
 * On submit, call requestToken() which returns a Promise<CollectJsTokenResponse>.
 */

import { useEffect, useRef, useState, useCallback } from "react";

declare global {
  interface Window {
    CollectJS?: {
      configure: (config: any) => void;
      startPaymentRequest: () => void;
    };
  }
}

export interface CollectJsTokenResponse {
  token: string;
  card?: {
    number: string;
    bin: string;
    exp: string;
    hash: string;
    type: string;
  };
}

const GATEWAY_URL =
  "https://swipesblue.transactiongateway.com/token/Collect.js";

let scriptLoadPromise: Promise<void> | null = null;
let cachedTokenizationKey: string | null = null;

function loadScript(tokenizationKey: string): Promise<void> {
  if (scriptLoadPromise) return scriptLoadPromise;

  scriptLoadPromise = new Promise<void>((resolve, reject) => {
    if (window.CollectJS) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = GATEWAY_URL;
    script.setAttribute("data-tokenization-key", tokenizationKey);
    script.onload = () => resolve();
    script.onerror = () => {
      scriptLoadPromise = null;
      reject(new Error("Failed to load Collect.js"));
    };
    document.head.appendChild(script);
  });

  return scriptLoadPromise;
}

export function useCollectJs() {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const callbackRef = useRef<
    ((response: CollectJsTokenResponse) => void) | null
  >(null);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        // Fetch the public tokenization key from the server
        if (!cachedTokenizationKey) {
          const res = await fetch("/api/config/public-key");
          if (!res.ok) throw new Error("Payment system not configured");
          const data = await res.json();
          cachedTokenizationKey = data.tokenizationKey;
        }

        // Load the Collect.js script (no-op if already loaded)
        await loadScript(cachedTokenizationKey!);
        if (cancelled) return;

        // Brief delay for the CollectJS global to fully initialize
        await new Promise((r) => setTimeout(r, 200));
        if (cancelled || !window.CollectJS) return;

        // Configure secure iframes — targets the container divs in the component
        window.CollectJS.configure({
          variant: "inline",
          styleSniffer: true,
          fields: {
            ccnumber: {
              selector: "#collect-ccnumber",
              title: "Card Number",
              placeholder: "0000 0000 0000 0000",
            },
            ccexp: {
              selector: "#collect-ccexp",
              title: "Expiration Date",
              placeholder: "MM / YY",
            },
            cvv: {
              selector: "#collect-cvv",
              title: "CVV",
              placeholder: "CVV",
            },
          },
          customCss: {
            "border-color": "#e2e8f0",
            "border-style": "solid",
            "border-width": "1px",
            "border-radius": "7px",
            padding: "8px 12px",
            "font-size": "14px",
            color: "#09080e",
            height: "40px",
            "background-color": "transparent",
          },
          focusCss: {
            "border-color": "#1844A6",
            outline: "none",
          },
          invalidCss: {
            "border-color": "#dc2626",
          },
          fieldsAvailableCallback: () => {
            if (!cancelled) setIsReady(true);
          },
          callback: (response: CollectJsTokenResponse) => {
            callbackRef.current?.(response);
          },
        });
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Payment initialization failed",
          );
        }
      }
    }

    init();

    return () => {
      cancelled = true;
    };
  }, []);

  const requestToken = useCallback((): Promise<CollectJsTokenResponse> => {
    return new Promise((resolve, reject) => {
      if (!window.CollectJS) {
        reject(new Error("Payment form not initialized"));
        return;
      }

      callbackRef.current = (response) => {
        if (response.token) {
          resolve(response);
        } else {
          reject(new Error("Tokenization failed"));
        }
      };

      try {
        window.CollectJS.startPaymentRequest();
      } catch (err) {
        reject(
          err instanceof Error ? err : new Error("Tokenization request failed"),
        );
      }
    });
  }, []);

  return { isReady, error, requestToken };
}
