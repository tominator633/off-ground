import { describe, expect, it } from "vitest";
import { createRateLimiter } from "./rate-limit";

describe("createRateLimiter", () => {
  it("blocks after the limit and frees up after the window", () => {
    const check = createRateLimiter([{ limit: 2, windowMs: 1000 }]);
    expect(check("ip", 0)).toBe(true);
    expect(check("ip", 100)).toBe(true);
    expect(check("ip", 200)).toBe(false);
    expect(check("other-ip", 200)).toBe(true);
    expect(check("ip", 1150)).toBe(true);
  });

  it("applies every rule", () => {
    const check = createRateLimiter([
      { limit: 5, windowMs: 1000 },
      { limit: 2, windowMs: 10_000 },
    ]);
    expect(check("ip", 0)).toBe(true);
    expect(check("ip", 2000)).toBe(true);
    expect(check("ip", 4000)).toBe(false);
  });

  it("keeps memory bounded", () => {
    const check = createRateLimiter([{ limit: 1, windowMs: 1000 }], 2);
    check("a", 0);
    check("b", 0);
    check("c", 0);
    // "a" was evicted, so it is allowed again
    expect(check("a", 1)).toBe(true);
  });
});
