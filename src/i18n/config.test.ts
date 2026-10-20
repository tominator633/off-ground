import { describe, expect, it } from "vitest";
import { localizedPath, negotiateLocale, switchLocaleInPath } from "./config";

describe("negotiateLocale", () => {
  it("falls back to Czech", () => {
    expect(negotiateLocale(null)).toBe("cs");
    expect(negotiateLocale("de-DE,fr;q=0.8")).toBe("cs");
  });

  it("respects quality values", () => {
    expect(negotiateLocale("cs-CZ,cs;q=0.9,en;q=0.8")).toBe("cs");
    expect(negotiateLocale("en;q=0.5,cs;q=0.9")).toBe("cs");
    expect(negotiateLocale("de,en;q=0.7,cs;q=0.6")).toBe("en");
  });

  it("ignores languages with q=0", () => {
    expect(negotiateLocale("cs;q=0,en;q=0.1")).toBe("en");
    expect(negotiateLocale("en;q=0,de")).toBe("cs");
  });
});

describe("paths", () => {
  it("prefixes the locale", () => {
    expect(localizedPath("en")).toBe("/en");
    expect(localizedPath("cs", "/events")).toBe("/cs/events");
  });

  it("switches the locale and keeps the rest of the path", () => {
    expect(switchLocaleInPath("/en/events/off-ground-10-10-2026", "cs")).toBe("/cs/events/off-ground-10-10-2026");
    expect(switchLocaleInPath("/cs", "en")).toBe("/en");
  });
});
