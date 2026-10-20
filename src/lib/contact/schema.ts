import { z } from "zod";
import { locales } from "@/i18n/config";

// Shared between the client form (types only) and the server action.

export const contactLimits = {
  nameMax: 100,
  emailMax: 254,
  messageMin: 10,
  messageMax: 3000,
  maxLinks: 3,
} as const;

/** Control characters; a name must not contain any (incl. line breaks). */
const anyControlChar = /[\u0000-\u001F\u007F]/;
/** Control characters except tab and line breaks, which a message may contain. */
const unsafeControlChar = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/;
const linkPattern = /(https?:\/\/|www\.)/gi;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1)
    .max(contactLimits.nameMax)
    .refine((value) => !anyControlChar.test(value)),
  email: z.string().trim().max(contactLimits.emailMax).pipe(z.email()),
  message: z
    .string()
    .trim()
    .min(contactLimits.messageMin)
    .max(contactLimits.messageMax)
    .refine((value) => !unsafeControlChar.test(value))
    .refine((value) => (value.match(linkPattern)?.length ?? 0) <= contactLimits.maxLinks),
  locale: z.enum(locales),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = "name" | "email" | "message";

export type ContactErrorKey = "validation" | "captcha" | "rateLimited" | "unavailable" | "generic";

export type ContactFormState =
  | { status: "idle" }
  | { status: "success" }
  | {
      status: "error";
      error: ContactErrorKey;
      fields: ContactField[];
      /** Submitted values, so the form can be refilled after a failed attempt. */
      values: Partial<Record<ContactField, string>>;
    };

export const initialContactState: ContactFormState = { status: "idle" };

/** Field names in the HTML form. */
export const formFields = {
  name: "name",
  email: "email",
  message: "message",
  locale: "locale",
  honeypot: "website",
  captcha: "cf-turnstile-response",
} as const;
