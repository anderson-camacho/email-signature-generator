// This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
import type {
  SignatureConfig,
  SocialPlatform,
  TemplateId,
} from "../core/signature-types";
import { escapeHtml, sanitizeConfig } from "../core/signature-sanitizer";

const link = (href: string, label: string, color: string) =>
  href
    ? `<a href="${escapeHtml(href)}" style="color:${color};text-decoration:none">${escapeHtml(label)}</a>`
    : "";

const image = (
  src: string,
  alt: string,
  width: number,
  extraStyle = "",
  fallbackLabel = "",
) =>
  src
    ? `<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" width="${width}" style="display:block;width:${width}px;height:${width}px;object-fit:cover;${extraStyle}">`
    : `<div style="display:block;width:${width}px;height:${width}px;line-height:${width}px;text-align:center;background:#eef4f8;color:#6b7b8b;font-family:Arial,sans-serif;font-size:${Math.round(width / 3)}px;font-weight:bold;${extraStyle}">${escapeHtml(fallbackLabel)}</div>`;

const socialMeta: Record<
  SocialPlatform,
  { label: string; short: string; color: string }
> = {
  linkedin: { label: "LinkedIn", short: "in", color: "#0a66c2" },
  instagram: { label: "Instagram", short: "IG", color: "#c13584" },
  facebook: { label: "Facebook", short: "f", color: "#1877f2" },
  x: { label: "X", short: "X", color: "#111111" },
  youtube: { label: "YouTube", short: "YT", color: "#ff0000" },
  tiktok: { label: "TikTok", short: "TT", color: "#111111" },
  whatsapp: { label: "WhatsApp", short: "WA", color: "#128c7e" },
  github: { label: "GitHub", short: "GH", color: "#24292f" },
};

const textCell = (label: string, value: string) =>
  value
    ? `<tr><td style="padding:0 0 5px 0;font-family:Arial,sans-serif;font-size:12px;color:#667789"><strong style="color:#1f2d3d">${escapeHtml(label)}:</strong> ${escapeHtml(value)}</td></tr>`
    : "";

const contactLines = (c: SignatureConfig) =>
  [
    c.email ? link(`mailto:${c.email}`, c.email, c.secondaryColor) : "",
    c.phone ? link(`tel:${c.phone}`, c.phone, c.secondaryColor) : "",
    c.website
      ? link(c.website, new URL(c.website).hostname, c.secondaryColor)
      : "",
    c.address ? escapeHtml(c.address) : "",
  ]
    .filter(Boolean)
    .join(" &middot; ");

const socialRow = (
  c: SignatureConfig,
  shape: "circle" | "square" = "circle",
) => {
  if (!c.socials.length) return "";
  const radius = shape === "circle" ? "999px" : "8px";
  const buttons = c.socials
    .map((social) => {
      const meta = socialMeta[social.platform];
      const color =
        social.iconStyle === "primary" ? c.primaryColor : meta.color;
      return `<td style="padding:6px 6px 0 0"><a href="${escapeHtml(social.url)}" aria-label="${meta.label}" title="${meta.label}" style="display:block;width:30px;height:30px;line-height:30px;border-radius:${radius};background:${color};color:#ffffff;text-align:center;text-decoration:none;font-family:Arial,sans-serif;font-size:11px;font-weight:bold">${meta.short}</a></td>`;
    })
    .join("");
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:6px"><tr>${buttons}</tr></table>`;
};

const signatureName = (c: SignatureConfig) =>
  escapeHtml(c.fullName || c.department || c.company);

const initials = (value: string) =>
  value
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("") || "ES";

export type TemplateRenderer = (config: SignatureConfig) => string;
export const templates: Record<TemplateId, TemplateRenderer> = {
  minimal: (raw) => {
    const c = sanitizeConfig(raw);
    return `<table role="presentation" cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif;color:${c.primaryColor};font-size:14px;max-width:520px"><tr><td style="padding:0 18px 0 0;vertical-align:top"><div style="width:56px;height:56px;line-height:56px;border-radius:16px;background:${c.primaryColor};color:#ffffff;text-align:center;font-size:22px;font-weight:bold">${initials(c.fullName)}</div></td><td style="padding:0;vertical-align:top"><div style="font-size:22px;font-weight:bold;line-height:1.1;color:${c.primaryColor}">${signatureName(c)}</div><div style="margin-top:4px;font-size:14px;font-weight:bold;color:${c.secondaryColor}">${escapeHtml(c.jobTitle)}${c.company ? ` &middot; ${escapeHtml(c.company)}` : ""}</div><div style="margin-top:10px;font-size:12px;line-height:1.7;color:#5b6b7c">${contactLines(c)}</div>${socialRow(c, "square")}</td></tr></table>`;
  },
  "professional-logo": (raw) => {
    const c = sanitizeConfig(raw);
    return `<table role="presentation" cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif;font-size:14px;max-width:560px;border:1px solid #dbe5ee;border-radius:18px;background:#ffffff"><tr><td colspan="2" style="height:8px;background:linear-gradient(90deg, ${c.primaryColor}, ${c.secondaryColor})"></td></tr><tr><td style="padding:20px 18px;width:110px;vertical-align:top;border-right:1px solid #e7eef4">${image(c.logoUrl, `${c.company} logo`, 72, "border-radius:18px;", initials(c.company || c.fullName))}<div style="margin-top:12px;font-size:11px;font-weight:bold;letter-spacing:0.08em;color:#8090a0;text-transform:uppercase">${escapeHtml(c.company || "Brand")}</div></td><td style="padding:20px 20px 18px 18px;vertical-align:top"><div style="font-size:21px;font-weight:bold;line-height:1.1;color:${c.primaryColor}">${signatureName(c)}</div><div style="margin-top:5px;font-size:13px;font-weight:bold;color:${c.secondaryColor}">${escapeHtml(c.jobTitle)}</div><div style="margin-top:14px"><table role="presentation" cellpadding="0" cellspacing="0">${textCell("Email", c.email)}${textCell("Phone", c.phone)}${textCell("Web", c.website ? new URL(c.website).hostname : "")}${textCell("Area", c.department)}</table></div>${socialRow(c, "square")}</td></tr></table>`;
  },
  "professional-photo": (raw) => {
    const c = sanitizeConfig(raw);
    return `<table role="presentation" cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif;font-size:14px;max-width:560px;background:#fff7fb;border-radius:20px;border:1px solid #f0d9e5"><tr><td style="padding:22px;width:110px;vertical-align:top">${image(c.photoUrl, c.fullName, 82, "border-radius:50%;border:4px solid #ffffff;box-shadow:0 8px 24px rgba(0,0,0,0.08);", initials(c.fullName))}</td><td style="padding:22px 22px 22px 0;vertical-align:top"><div style="display:inline-block;padding:4px 10px;border-radius:999px;background:#ffffff;color:${c.secondaryColor};font-size:11px;font-weight:bold;letter-spacing:0.05em;text-transform:uppercase">${escapeHtml(c.pronouns || "Founder Profile")}</div><div style="margin-top:10px;font-size:24px;font-weight:bold;line-height:1.05;color:${c.primaryColor}">${signatureName(c)}</div><div style="margin-top:5px;font-size:14px;color:#7a5b73">${escapeHtml(c.jobTitle)}${c.company ? ` at ${escapeHtml(c.company)}` : ""}</div><div style="margin-top:12px;font-size:12px;line-height:1.7;color:#6c6170">${contactLines(c)}</div>${socialRow(c, "circle")}${c.legalText ? `<div style="margin-top:14px;font-size:10px;line-height:1.5;color:#8a7a84">${escapeHtml(c.legalText)}</div>` : ""}</td></tr></table>`;
  },
  "administrative-area": (raw) => {
    const c = sanitizeConfig(raw);
    return `<table role="presentation" cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif;font-size:14px;max-width:620px;background:#fbfcfe;border:1px solid #d8e3ed"><tr><td style="padding:0;width:10px;background:${c.secondaryColor}"></td><td style="padding:18px 20px"><table role="presentation" cellpadding="0" cellspacing="0" width="100%"><tr><td style="vertical-align:top;padding-right:18px"><div style="font-size:12px;font-weight:bold;letter-spacing:0.08em;text-transform:uppercase;color:${c.secondaryColor}">${escapeHtml(c.department || "Operations")}</div><div style="margin-top:8px;font-size:22px;font-weight:bold;color:${c.primaryColor}">${escapeHtml(c.company || c.fullName)}</div><div style="margin-top:6px;font-size:14px;color:#5c6c7c">${escapeHtml(c.fullName)}${c.jobTitle ? ` &middot; ${escapeHtml(c.jobTitle)}` : ""}</div></td><td style="vertical-align:top;width:180px;border-left:1px solid #d8e3ed;padding-left:18px"><div style="font-size:11px;font-weight:bold;text-transform:uppercase;color:#8090a0">Contact</div><div style="margin-top:8px;font-size:12px;line-height:1.8;color:#435261">${c.email ? link(`mailto:${c.email}`, c.email, c.primaryColor) : ""}${c.email && c.phone ? "<br>" : ""}${c.phone ? link(`tel:${c.phone}`, c.phone, c.primaryColor) : ""}${(c.email || c.phone) && c.website ? "<br>" : ""}${c.website ? link(c.website, new URL(c.website).hostname, c.primaryColor) : ""}</div></td></tr></table>${socialRow(c, "square")}${c.legalText ? `<div style="margin-top:12px;padding-top:12px;border-top:1px solid #d8e3ed;font-size:10px;line-height:1.5;color:#6f7c89">${escapeHtml(c.legalText)}</div>` : ""}</td></tr></table>`;
  },
};

export const renderSignature = (config: SignatureConfig) =>
  templates[config.template](config);
