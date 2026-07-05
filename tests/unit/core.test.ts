import { describe, expect, it } from "vitest";
import { defaultConfig } from "../../src/core/signature-types";
import { escapeHtml, sanitizeConfig } from "../../src/core/signature-sanitizer";
import {
  isEmail,
  isReadableText,
  normalizePhone,
  safeReadableText,
  safeHttpsUrl,
  safeImageUrl,
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
  it("accepts optimized local image data URLs for image fields", () => {
    const dataUrl = "data:image/webp;base64,aaaa";
    expect(safeImageUrl(dataUrl)).toBe(dataUrl);
    expect(
      sanitizeConfig({ ...defaultConfig, photoUrl: dataUrl }).photoUrl,
    ).toBe(dataUrl);
  });
  it("validates email and normalizes phone", () => {
    expect(isEmail("alex@example.com")).toBe(true);
    expect(isEmail("not-an-email")).toBe(false);
    expect(normalizePhone("+1 555 010 0000")).toBe("+15550100000");
    expect(normalizePhone("phone-text")).toBe("");
    expect(normalizePhone("+57 300 123 4567")).toBe("+573001234567");
  });
  it("validates public HTTPS URLs and readable international text", () => {
    expect(safeHttpsUrl("https://example.com/path")).toBe(
      "https://example.com/path",
    );
    expect(safeHttpsUrl("https://example")).toBe("");
    expect(isReadableText("José 山田太郎 김민준 محمد")).toBe(true);
    expect(isReadableText("<script>")).toBe(false);
    expect(safeReadableText("Valid Company 3M")).toBe("Valid Company 3M");
    expect(safeReadableText("{bad}")).toBe("");
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
