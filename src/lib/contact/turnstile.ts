import "server-only";

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
export const TURNSTILE_ACTION = "contact";

/** Verifies a Cloudflare Turnstile token on the server. Any failure counts as "not verified". */
export async function verifyTurnstile(token: string, secret: string, remoteIp?: string): Promise<boolean> {
  if (!token || token.length > 2048) return false;

  const body = new URLSearchParams({ secret, response: token, idempotency_key: crypto.randomUUID() });
  if (remoteIp) body.set("remoteip", remoteIp);

  try {
    const response = await fetch(VERIFY_URL, {
      method: "POST",
      body,
      signal: AbortSignal.timeout(5000),
      cache: "no-store",
    });
    if (!response.ok) return false;
    const result = (await response.json()) as { success?: boolean; action?: string };
    // Cloudflare's test keys return no action; real tokens must come from our own widget.
    return result.success === true && (!result.action || result.action === TURNSTILE_ACTION);
  } catch {
    return false;
  }
}
