import type { IncomingMessage } from "http";
import { kv } from "@vercel/kv";
import {
  ALLOWED_ORIGINS,
  RATE_LIMIT_WINDOW,
  MAX_REQUESTS_PER_WINDOW,
  MAX_REQUEST_SIZE,
} from "./constants";

export function getClientIp(req: IncomingMessage): string {
  return (
    (req.headers["x-forwarded-for"] as string)?.split(",")[0].trim() ||
    req.socket.remoteAddress ||
    "unknown"
  );
}

export async function checkRateLimit(clientIp: string): Promise<boolean> {
  if (clientIp === "unknown") return true;

  const key = `rate-limit:${clientIp}`;

  try {
    const current = await kv.incr(key);

    if (current === 1) {
      await kv.expire(key, RATE_LIMIT_WINDOW);
    }

    return current <= MAX_REQUESTS_PER_WINDOW;
  } catch (err) {
    console.error("Error checking rate limit:", err);
    return true;
  }
}

export function validateOrigin(req: IncomingMessage): boolean {
  const origin = req.headers.origin || req.headers.referer;

  if (!origin) return false;

  return ALLOWED_ORIGINS.some((allowed) => origin.startsWith(allowed));
}

export function validateContentType(req: IncomingMessage): boolean {
  const contentType = req.headers["content-type"];
  return contentType?.includes("application/json") ?? false;
}

export function validateRequestSize(
  contentLength: string | undefined,
): boolean {
  if (!contentLength) return false;
  return parseInt(contentLength, 10) <= MAX_REQUEST_SIZE;
}

export function validateAuthHeader(
  authHeader: string | undefined,
  expectedToken: string,
): boolean {
  return authHeader === `Bearer ${expectedToken}`;
}

export async function verifyRecaptcha(token: string): Promise<boolean> {
  if (!token || typeof token !== "string" || token.length > 5000) {
    console.error(
      "reCAPTCHA validation failed: Invalid token format or length.",
    );
    return false;
  }

  try {
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
      },
    );

    const data = (await response.json()) as {
      success: boolean;
      score?: number;
      "error-codes"?: string[];
    };

    if (process.env.NODE_ENV === "development") {
      console.log("reCAPTCHA Google Response:", data);
    }

    if (data.score !== undefined) {
      return data.success && data.score > 0.5; // v3
    }

    return data.success; // v2
  } catch (err) {
    console.error("Error verifying reCAPTCHA:", err);
    return false;
  }
}
