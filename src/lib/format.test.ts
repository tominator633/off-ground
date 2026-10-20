import { describe, expect, it } from "vitest";
import { formatEventDate, formatPosterDate, formatTimeRange } from "./format";

describe("formatEventDate", () => {
  it("formats in both languages", () => {
    expect(formatEventDate("en", "2026-12-19")).toBe("Saturday, 19 December 2026");
    expect(formatEventDate("cs", "2026-12-19")).toBe("sobota 19. prosince 2026");
  });
});

describe("formatTimeRange", () => {
  it("handles missing times", () => {
    expect(formatTimeRange("14:00", "19:00")).toBe("14:00–19:00");
    expect(formatTimeRange("14:00", null)).toBe("14:00");
    expect(formatTimeRange(null, null)).toBeNull();
  });
});

describe("formatPosterDate", () => {
  it("uses the poster style", () => {
    expect(formatPosterDate("2026-10-10")).toBe("10/10/2026");
  });
});
