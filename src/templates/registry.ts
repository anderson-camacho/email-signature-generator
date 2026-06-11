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
const image = (src: string, alt: string, round = false) =>
  src
    ? `<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" width="72" style="display:block;width:72px;height:72px;object-fit:cover;${round ? "border-radius:50%;" : ""}">`
    : "";
const socialMeta: Record<
  SocialPlatform,
  { label: string; short: string; color: string }
> = {
  linkedin: { label: "LinkedIn", short: "in", color: "#0a66c2" },
  instagram: { label: "Instagram", short: "IG", color: "#c13584" },
  facebook: { label: "Facebook", short: "f", color: "#1877f2" },
  x: { label: "X", short: "X", color: "#111111" },
  youtube: { label: "YouTube", short: "▶", color: "#ff0000" },
  tiktok: { label: "TikTok", short: "♪", color: "#111111" },
  whatsapp: { label: "WhatsApp", short: "W", color: "#128c7e" },
  github: { label: "GitHub", short: "GH", color: "#24292f" },
};
const socialLinks = (c: SignatureConfig) => {
  if (!c.socials.length) return "";
  const buttons = c.socials
    .map((social) => {
      const meta = socialMeta[social.platform];
      const color =
        social.iconStyle === "primary" ? c.primaryColor : meta.color;
      return `<td style="padding:5px 5px 0 0"><a href="${escapeHtml(social.url)}" aria-label="${meta.label}" title="${meta.label}" style="display:block;width:28px;height:28px;line-height:28px;border-radius:50%;background:${color};color:#ffffff;text-align:center;text-decoration:none;font-family:Arial,sans-serif;font-size:11px;font-weight:bold">${meta.short}</a></td>`;
    })
    .join("");
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:5px"><tr>${buttons}</tr></table>`;
};
const details = (c: SignatureConfig) =>
  [
    c.email ? link(`mailto:${c.email}`, c.email, c.secondaryColor) : "",
    c.phone ? link(`tel:${c.phone}`, c.phone, c.secondaryColor) : "",
    c.website
      ? link(c.website, new URL(c.website).hostname, c.secondaryColor)
      : "",
    escapeHtml(c.address),
  ]
    .filter(Boolean)
    .join(" · ");

export type TemplateRenderer = (config: SignatureConfig) => string;
export const templates: Record<TemplateId, TemplateRenderer> = {
  minimal: (raw) => {
    const c = sanitizeConfig(raw);
    return `<table role="presentation" cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif;color:${c.primaryColor};font-size:14px"><tr><td style="padding:0"><strong style="font-size:18px">${escapeHtml(c.fullName)}</strong><br>${escapeHtml(c.jobTitle)}${c.company ? ` · ${escapeHtml(c.company)}` : ""}<br><span style="font-size:12px">${details(c)}</span>${socialLinks(c)}</td></tr></table>`;
  },
  "professional-logo": (raw) => {
    const c = sanitizeConfig(raw);
    return `<table role="presentation" cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif;color:${c.primaryColor};font-size:14px"><tr><td style="padding-right:16px;border-right:3px solid ${c.secondaryColor}">${image(c.logoUrl, `${c.company} logo`)}</td><td style="padding-left:16px"><strong style="font-size:18px">${escapeHtml(c.fullName)}</strong><br>${escapeHtml(c.jobTitle)} · ${escapeHtml(c.company)}<br><span style="font-size:12px">${details(c)}</span>${socialLinks(c)}</td></tr></table>`;
  },
  "professional-photo": (raw) => {
    const c = sanitizeConfig(raw);
    return `<table role="presentation" cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif;color:${c.primaryColor};font-size:14px"><tr><td style="padding-right:16px">${image(c.photoUrl, c.fullName, true)}</td><td style="padding-left:16px;border-left:3px solid ${c.secondaryColor}"><strong style="font-size:18px">${escapeHtml(c.fullName)}</strong><br>${escapeHtml(c.jobTitle)}<br>${escapeHtml(c.company)}<br><span style="font-size:12px">${details(c)}</span>${socialLinks(c)}</td></tr></table>`;
  },
  "administrative-area": (raw) => {
    const c = sanitizeConfig(raw);
    return `<table role="presentation" cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif;color:${c.primaryColor};font-size:14px;border-left:5px solid ${c.secondaryColor}"><tr><td style="padding-left:16px"><strong style="font-size:18px">${escapeHtml(c.department || c.fullName)}</strong><br>${escapeHtml(c.company)}<br><span style="font-size:12px">${details(c)}</span>${socialLinks(c)}${c.legalText ? `<br><span style="font-size:10px;color:#555">${escapeHtml(c.legalText)}</span>` : ""}</td></tr></table>`;
  },
};

export const renderSignature = (config: SignatureConfig) =>
  templates[config.template](config);
