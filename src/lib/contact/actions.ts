"use server";

import { headers } from "next/headers";
import { createRateLimiter } from "./rate-limit";
import { processSubmission } from "./process-submission";
import type { ContactFormState } from "./schema";
import { sendContactEmail } from "./send-email";
import { verifyTurnstile } from "./turnstile";

// Per IP: at most 3 messages in 10 minutes and 10 per day (per server instance).
const isAllowedByRateLimit = createRateLimiter([
  { limit: 3, windowMs: 10 * 60 * 1000 },
  { limit: 10, windowMs: 24 * 60 * 60 * 1000 },
]);

function hostOf(origin: string | null): string | null {
  if (!origin) return null;
  try {
    return new URL(origin).host;
  } catch {
    return null;
  }
}

export async function sendContactMessage(_prev: ContactFormState, formData: FormData): Promise<ContactFormState> {
  const requestHeaders = await headers();
  const ip =
    requestHeaders.get("x-real-ip") ??
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";

  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  const resendApiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;

  try {
    return await processSubmission(
      {
        formData,
        ip,
        originHost: hostOf(requestHeaders.get("origin")),
        requestHost: requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host"),
      },
      {
        isAllowedByRateLimit,
        verifyCaptcha: turnstileSecret ? (token, remoteIp) => verifyTurnstile(token, turnstileSecret, remoteIp) : null,
        deliver:
          resendApiKey && from && to
            ? (input) => sendContactEmail(input, { apiKey: resendApiKey, from, to })
            : null,
        isProduction: process.env.NODE_ENV === "production",
      },
    );
  } catch {
    // Never leak internal errors to the client.
    return { status: "error", error: "generic", fields: [], values: {} };
  }
}
