import "server-only";
import type { ContactInput } from "./schema";

export interface EmailConfig {
  apiKey: string;
  from: string;
  to: string;
}

/**
 * Sends the message through the Resend REST API as plain text only
 * (no HTML, user input never goes into the subject or headers).
 */
export async function sendContactEmail(input: ContactInput, config: EmailConfig): Promise<boolean> {
  const text = [
    `Name: ${input.name}`,
    `E-mail: ${input.email}`,
    `Language: ${input.locale}`,
    "",
    input.message,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: config.from,
        to: [config.to],
        reply_to: input.email,
        subject: "Nová zpráva z webu Off Ground",
        text,
      }),
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });
    return response.ok;
  } catch {
    return false;
  }
}
