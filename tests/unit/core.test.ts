import { describe, expect, it } from "vitest";
import { defaultConfig } from "../../src/core/signature-types";
import { escapeHtml, sanitizeConfig } from "../../src/core/signature-sanitizer";
import {
  isEmail,
  normalizePhone,
  safeHttpsUrl,
} from "../../src/core/validators";
import { renderSignature, templates } from "../../src/templates/registry";
import { exportConfig, importConfig } from "../../src/export/json-config";

describe("security and validation", () => {
  it("escapes HTML and scripts", () =>
    expect(escapeHtml('<script>alert("x")</script>')).not.toContain(
      "<script>",
    ));
  it.each([
    "javascript:alert(1)",
    "data:text/html,x",
    "blob:test",
    "file:///x",
    "http://example.com",
  ])("rejects unsafe URL %s", (url) => expect(safeHttpsUrl(url)).toBe(""));
  it("accepts HTTPS", () =>
    expect(safeHttpsUrl("https://example.com")).toBe("https://example.com/"));
  it("validates email and normalizes phone", () => {
    expect(isEmail("alex@example.com")).toBe(true);
    expect(normalizePhone("+1 555 010 0000")).toBe("+15550100000");
  });
  it("removes malicious values from config", () => {
    const value = sanitizeConfig({
      ...defaultConfig,
      website: "javascript:alert(1)",
      fullName: "<img onerror=x>",
    });
    expect(value.website).toBe("");
    expect(renderSignature(value)).not.toContain("<img onerror");
  });
});

describe("templates and JSON", () => {
  it("renders all templates with tables and inline styles", () =>
    Object.keys(templates).forEach((template) => {
      const html = renderSignature({
        ...defaultConfig,
        template: template as keyof typeof templates,
      });
      expect(html).toContain("<table");
      expect(html).toContain('style="');
      expect(html).not.toContain("class=");
    }));
  it("round trips versioned JSON and excludes blob URLs", () => {
    const json = exportConfig({ ...defaultConfig, logoUrl: "blob:test" });
    expect(json).not.toContain("blob:");
    expect(importConfig(json).version).toBe(1);
  });
  it("renders repeated social buttons with original and primary colors", () => {
    const html = renderSignature({
      ...defaultConfig,
      primaryColor: "#123456",
      socials: [
        {
          id: "1",
          platform: "instagram",
          url: "https://instagram.com/one",
          iconStyle: "original",
        },
        {
          id: "2",
          platform: "instagram",
          url: "https://instagram.com/two",
          iconStyle: "primary",
        },
      ],
    });
    expect(html.match(/Instagram/g)).toHaveLength(4);
    expect(html).toContain("#c13584");
    expect(html).toContain("#123456");
  });
  it("rejects invalid JSON and versions", () => {
    expect(() => importConfig("{")).toThrow();
    expect(() => importConfig('{"version":2}')).toThrow();
  });
});
