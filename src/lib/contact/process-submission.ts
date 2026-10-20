import { contactSchema, formFields, type ContactField, type ContactFormState, type ContactInput } from "./schema";

export interface SubmissionContext {
  formData: FormData;
  /** Client IP, used for rate limiting and Turnstile. */
  ip: string;
  /** Host of the Origin header vs. the host serving the request. */
  originHost: string | null;
  requestHost: string | null;
}

export interface SubmissionDeps {
  isAllowedByRateLimit: (key: string) => boolean;
  /** null = captcha not configured (only allowed outside production). */
  verifyCaptcha: ((token: string, ip: string) => Promise<boolean>) | null;
  /** null = e-mail delivery not configured. */
  deliver: ((input: ContactInput) => Promise<boolean>) | null;
  isProduction: boolean;
}

const fields: ContactField[] = ["name", "email", "message"];

function readString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

/**
 * The whole contact-form pipeline, kept free of Next.js APIs so it can be unit-tested.
 * Order: origin → honeypot → rate limit → validation → captcha → delivery.
 */
export async function processSubmission(ctx: SubmissionContext, deps: SubmissionDeps): Promise<ContactFormState> {
  const { formData } = ctx;
  const values = Object.fromEntries(
    fields.map((field) => [field, readString(formData, formFields[field]).slice(0, 5000)]),
  ) as Record<ContactField, string>;
  const fail = (error: Exclude<ContactFormState, { status: "idle" | "success" }>["error"], invalid: ContactField[] = []) =>
    ({ status: "error", error, fields: invalid, values }) as const;

  // Next.js already rejects cross-origin actions, but lets requests without an Origin through.
  if (!ctx.originHost || !ctx.requestHost || ctx.originHost !== ctx.requestHost) return fail("generic");

  // Bots fill every field. Pretend success so they don't learn anything.
  if (readString(formData, formFields.honeypot).length > 0) return { status: "success" };

  if (!deps.isAllowedByRateLimit(ctx.ip)) return fail("rateLimited");

  const parsed = contactSchema.safeParse({ ...values, locale: readString(formData, formFields.locale) });
  if (!parsed.success) {
    const invalid = fields.filter((field) => parsed.error.issues.some((issue) => issue.path[0] === field));
    return fail("validation", invalid);
  }

  if (deps.isProduction && (!deps.verifyCaptcha || !deps.deliver)) return fail("unavailable");

  if (deps.verifyCaptcha) {
    const token = readString(formData, formFields.captcha);
    if (!(await deps.verifyCaptcha(token, ctx.ip))) return fail("captcha");
  }

  if (!deps.deliver) {
    // Local development without e-mail credentials: accept the message without sending it.
    return { status: "success" };
  }

  return (await deps.deliver(parsed.data)) ? { status: "success" } : fail("unavailable");
}
