import { describe, expect, it, vi } from "vitest";
import { processSubmission, type SubmissionContext, type SubmissionDeps } from "./process-submission";

function form(overrides: Record<string, string> = {}): FormData {
  const data = new FormData();
  const values = {
    name: "Jan",
    email: "jan@example.com",
    message: "Hello, I would like to know more about the battle.",
    locale: "en",
    website: "",
    "cf-turnstile-response": "token",
    ...overrides,
  };
  for (const [key, value] of Object.entries(values)) data.set(key, value);
  return data;
}

function context(formData = form(), overrides: Partial<SubmissionContext> = {}): SubmissionContext {
  return { formData, ip: "1.2.3.4", originHost: "example.com", requestHost: "example.com", ...overrides };
}

function deps(overrides: Partial<SubmissionDeps> = {}): SubmissionDeps {
  return {
    isAllowedByRateLimit: () => true,
    verifyCaptcha: vi.fn(async () => true),
    deliver: vi.fn(async () => true),
    isProduction: true,
    ...overrides,
  };
}

describe("processSubmission", () => {
  it("delivers a valid message", async () => {
    const d = deps();
    expect(await processSubmission(context(), d)).toEqual({ status: "success" });
    expect(d.verifyCaptcha).toHaveBeenCalledWith("token", "1.2.3.4");
    expect(d.deliver).toHaveBeenCalledWith(expect.objectContaining({ name: "Jan", locale: "en" }));
  });

  it("rejects a missing or foreign Origin", async () => {
    const d = deps();
    expect((await processSubmission(context(form(), { originHost: null }), d)).status).toBe("error");
    expect((await processSubmission(context(form(), { originHost: "evil.test" }), d)).status).toBe("error");
    expect(d.deliver).not.toHaveBeenCalled();
  });

  it("silently drops honeypot submissions", async () => {
    const d = deps();
    expect(await processSubmission(context(form({ website: "https://spam.test" })), d)).toEqual({ status: "success" });
    expect(d.deliver).not.toHaveBeenCalled();
  });

  it("enforces the rate limit before doing any work", async () => {
    const d = deps({ isAllowedByRateLimit: () => false });
    const result = await processSubmission(context(), d);
    expect(result).toMatchObject({ status: "error", error: "rateLimited" });
    expect(d.verifyCaptcha).not.toHaveBeenCalled();
  });

  it("reports invalid fields and keeps the values", async () => {
    const result = await processSubmission(context(form({ email: "nope", message: "short" })), deps());
    expect(result).toMatchObject({
      status: "error",
      error: "validation",
      fields: ["email", "message"],
      values: { email: "nope", message: "short" },
    });
  });

  it("rejects header injection and control characters", async () => {
    const injected = await processSubmission(context(form({ name: "Jan\r\nBcc: victim@example.com" })), deps());
    expect(injected).toMatchObject({ error: "validation", fields: ["name"] });
    const control = await processSubmission(context(form({ message: "Hello there\u0000 friend" })), deps());
    expect(control).toMatchObject({ error: "validation", fields: ["message"] });
  });

  it("rejects link-stuffed messages", async () => {
    const message = "Buy now https://a.test https://b.test https://c.test https://d.test";
    expect(await processSubmission(context(form({ message })), deps())).toMatchObject({ fields: ["message"] });
  });

  it("rejects an unknown locale", async () => {
    expect(await processSubmission(context(form({ locale: "de" })), deps())).toMatchObject({ error: "validation" });
  });

  it("fails when the captcha fails", async () => {
    const d = deps({ verifyCaptcha: async () => false });
    expect(await processSubmission(context(), d)).toMatchObject({ error: "captcha" });
    expect(d.deliver).not.toHaveBeenCalled();
  });

  it("fails closed in production without captcha or e-mail config", async () => {
    expect(await processSubmission(context(), deps({ verifyCaptcha: null }))).toMatchObject({ error: "unavailable" });
    expect(await processSubmission(context(), deps({ deliver: null }))).toMatchObject({ error: "unavailable" });
  });

  it("accepts messages locally without configuration", async () => {
    const result = await processSubmission(context(), deps({ verifyCaptcha: null, deliver: null, isProduction: false }));
    expect(result).toEqual({ status: "success" });
  });

  it("reports a delivery failure", async () => {
    expect(await processSubmission(context(), deps({ deliver: async () => false }))).toMatchObject({
      error: "unavailable",
    });
  });
});
