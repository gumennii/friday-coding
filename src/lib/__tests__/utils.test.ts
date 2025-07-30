import { describe, it, expect } from "vitest";
import { formatPhoneNumber, truncateText } from "../utils";

describe("formatPhoneNumber", () => {
  it("formats valid 10-digit phone numbers", () => {
    expect(formatPhoneNumber("1234567890")).toBe("123-456-7890");
    expect(formatPhoneNumber("(212) 555-1234")).toBe("212-555-1234");
  });

  it("returns original for invalid phone numbers", () => {
    expect(formatPhoneNumber("123")).toBe("123");
    expect(formatPhoneNumber("+11234567890")).toBe("+11234567890");
  });
});

describe("truncateText", () => {
  it("preserves text shorter than max length", () => {
    expect(truncateText("Hello", 10)).toBe("Hello");
  });

  it("truncates text longer than max length", () => {
    expect(truncateText("This is a very long text", 10)).toBe("This is a ...");
  });
});
