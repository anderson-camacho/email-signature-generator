// This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
import type {
  SignatureConfig,
  SocialPlatform,
  TemplateId,
} from "../core/signature-types";
import { escapeHtml, sanitizeConfig } from "../core/signature-sanitizer";

const sizeScale: Record<SignatureConfig["size"], number> = {
  compact: 0.9,
  normal: 1,
  wide: 1.12,
};

const px = (value: number) => `${Math.round(value)}px`;
const scaled = (config: SignatureConfig, value: number) =>
  Math.round(value * sizeScale[config.size]);

const websiteLabel = (value: string) => {
  try {
    return new URL(value).hostname.replace(/^www\./, "");
  } catch {
    return value.replace(/^https?:\/\//, "");
  }
};

const safe = (value: string) => escapeHtml(value);

const link = (href: string, label: string, color: string) =>
  href
    ? `<a href="${safe(href)}" style="color:${color};text-decoration:none">${safe(label)}</a>`
    : "";

const image = (
  src: string,
  alt: string,
  width: number,
  extraStyle = "",
  fallbackLabel = "",
) =>
  src
    ? `<img src="${safe(src)}" alt="${safe(alt)}" width="${width}" style="display:block;width:${width}px;height:${width}px;object-fit:cover;${extraStyle}">`
    : `<div style="display:block;width:${width}px;height:${width}px;line-height:${width}px;text-align:center;background:#eef4f8;color:#6b7b8b;font-family:Arial,sans-serif;font-size:${Math.round(width / 3)}px;font-weight:bold;${extraStyle}">${safe(fallbackLabel)}</div>`;

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
  dribbble: { label: "Dribbble", short: "DB", color: "#ea4c89" },
  behance: { label: "Behance", short: "Be", color: "#1769ff" },
  pinterest: { label: "Pinterest", short: "P", color: "#e60023" },
};

const initials = (value: string) =>
  value
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("") || "ES";

const signatureName = (c: SignatureConfig) =>
  safe(c.fullName || c.department || c.company);

const detailLine = (
  label: string,
  value: string,
  color = "#425466",
  labelColor = "#1f2d3d",
) =>
  value
    ? `<div style="margin-top:4px;font-family:Arial,sans-serif;font-size:12px;line-height:1.55;color:${color}"><strong style="color:${labelColor}">${safe(label)}:</strong> ${safe(value)}</div>`
    : "";

const contactStack = (c: SignatureConfig, color = "#425466") =>
  [
    c.email ? detailLine("email", c.email, color, c.primaryColor) : "",
    c.phone ? detailLine("phone", c.phone, color, c.primaryColor) : "",
    c.website
      ? detailLine("website", websiteLabel(c.website), color, c.primaryColor)
      : "",
    c.address ? detailLine("address", c.address, color, c.primaryColor) : "",
  ]
    .filter(Boolean)
    .join("");

const contactInline = (c: SignatureConfig, color: string) =>
  [
    c.email ? link(`mailto:${c.email}`, c.email, color) : "",
    c.phone ? link(`tel:${c.phone}`, c.phone, color) : "",
    c.website ? link(c.website, websiteLabel(c.website), color) : "",
    c.address ? safe(c.address) : "",
  ]
    .filter(Boolean)
    .join(" &middot; ");

const socialRow = (
  c: SignatureConfig,
  options: {
    shape?: "circle" | "square" | "pill";
    size?: number;
    fill?: "solid" | "outline";
    forceColor?: string;
    textColor?: string;
    gap?: number;
  } = {},
) => {
  if (!c.socials.length) return "";
  const {
    shape = "circle",
    size = 30,
    fill = "solid",
    forceColor,
    textColor = "#ffffff",
    gap = 6,
  } = options;
  const radius =
    shape === "circle" ? "999px" : shape === "pill" ? "999px" : "8px";
  const buttons = c.socials
    .map((social) => {
      const meta = socialMeta[social.platform];
      const color = forceColor
        ? forceColor
        : social.iconStyle === "primary"
          ? c.primaryColor
          : meta.color;
      const background = fill === "solid" ? color : "transparent";
      const border = fill === "solid" ? "0" : `1px solid ${color}`;
      const foreground = fill === "solid" ? textColor : color;
      return `<td style="padding:${Math.round(gap / 2)}px ${gap}px 0 0"><a href="${safe(social.url)}" aria-label="${meta.label}" title="${meta.label}" style="display:block;min-width:${size}px;height:${size}px;line-height:${size}px;padding:0 ${shape === "pill" ? "12px" : "0"};border-radius:${radius};background:${background};border:${border};color:${foreground};text-align:center;text-decoration:none;font-family:Arial,sans-serif;font-size:${Math.max(
        10,
        Math.round(size / 2.6),
      )}px;font-weight:bold">${meta.short}</a></td>`;
    })
    .join("");
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:${gap}px"><tr>${buttons}</tr></table>`;
};

const socialColumn = (c: SignatureConfig, color: string) => {
  if (!c.socials.length) return "";
  const items = c.socials
    .map((social) => {
      const meta = socialMeta[social.platform];
      const iconColor =
        social.iconStyle === "primary" ? c.primaryColor : meta.color;
      return `<tr><td style="padding:0 0 8px 0"><a href="${safe(social.url)}" aria-label="${meta.label}" title="${meta.label}" style="display:block;width:26px;height:26px;line-height:26px;border-radius:999px;border:1px solid ${color};color:${iconColor};text-align:center;text-decoration:none;font-family:Arial,sans-serif;font-size:10px;font-weight:bold">${meta.short}</a></td></tr>`;
    })
    .join("");
  return `<table role="presentation" cellpadding="0" cellspacing="0">${items}</table>`;
};

const ctaLink = (
  href: string,
  label: string,
  background: string,
  color = "#ffffff",
  borderColor = background,
) =>
  href
    ? `<a href="${safe(href)}" style="display:inline-block;padding:10px 18px;border-radius:999px;background:${background};border:1px solid ${borderColor};color:${color};font-family:Arial,sans-serif;font-size:12px;font-weight:bold;text-decoration:none">${safe(label)}</a>`
    : "";

const websiteCta = (
  c: SignatureConfig,
  label: string,
  background: string,
  color = "#ffffff",
  borderColor = background,
) => ctaLink(c.website || `mailto:${c.email}`, label, background, color, borderColor);

const divider = (color: string, width = "100%") =>
  `<div style="width:${width};height:1px;background:${color};font-size:0;line-height:0"></div>`;

export type TemplateRenderer = (config: SignatureConfig) => string;

export const templates: Record<TemplateId, TemplateRenderer> = {
  minimal: (raw) => {
    const c = sanitizeConfig(raw);
    const avatar = scaled(c, 56);
    return `<table role="presentation" cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif;color:${c.primaryColor};font-size:14px;max-width:${px(
      scaled(c, 520),
    )}"><tr><td style="padding:0 ${px(scaled(c, 18))} 0 0;vertical-align:top"><div style="width:${px(
      avatar,
    )};height:${px(avatar)};line-height:${px(avatar)};border-radius:16px;background:${c.primaryColor};color:#ffffff;text-align:center;font-size:${px(
      scaled(c, 22),
    )};font-weight:bold">${initials(c.fullName)}</div></td><td style="padding:0;vertical-align:top"><div style="font-size:${px(
      scaled(c, 22),
    )};font-weight:bold;line-height:1.1;color:${c.primaryColor}">${signatureName(
      c,
    )}</div><div style="margin-top:4px;font-size:${px(
      scaled(c, 14),
    )};font-weight:bold;color:${c.secondaryColor}">${safe(c.jobTitle)}${
      c.company ? ` &middot; ${safe(c.company)}` : ""
    }</div><div style="margin-top:10px;font-size:12px;line-height:1.7;color:#5b6b7c">${contactInline(
      c,
      c.secondaryColor,
    )}</div>${socialRow(c, { shape: "square" })}</td></tr></table>`;
  },
  "professional-logo": (raw) => {
    const c = sanitizeConfig(raw);
    const logo = scaled(c, 72);
    return `<table role="presentation" cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif;font-size:14px;max-width:${px(
      scaled(c, 560),
    )};border:1px solid #dbe5ee;border-radius:18px;background:#ffffff"><tr><td colspan="2" style="height:8px;background:linear-gradient(90deg, ${c.primaryColor}, ${c.secondaryColor})"></td></tr><tr><td style="padding:${px(
      scaled(c, 20),
    )} ${px(scaled(c, 18))};width:${px(
      scaled(c, 110),
    )};vertical-align:top;border-right:1px solid #e7eef4">${image(
      c.logoUrl,
      `${c.company} logo`,
      logo,
      "border-radius:18px;",
      initials(c.company || c.fullName),
    )}<div style="margin-top:12px;font-size:11px;font-weight:bold;letter-spacing:0.08em;color:#8090a0;text-transform:uppercase">${safe(
      c.company || "Brand",
    )}</div></td><td style="padding:${px(scaled(c, 20))} ${px(
      scaled(c, 20),
    )} ${px(scaled(c, 18))} ${px(
      scaled(c, 18),
    )};vertical-align:top"><div style="font-size:${px(
      scaled(c, 21),
    )};font-weight:bold;line-height:1.1;color:${c.primaryColor}">${signatureName(
      c,
    )}</div><div style="margin-top:5px;font-size:13px;font-weight:bold;color:${c.secondaryColor}">${safe(
      c.jobTitle,
    )}</div><div style="margin-top:14px">${contactStack(c)}</div>${socialRow(c, {
      shape: "square",
    })}</td></tr></table>`;
  },
  "professional-photo": (raw) => {
    const c = sanitizeConfig(raw);
    const photo = scaled(c, 82);
    return `<table role="presentation" cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif;font-size:14px;max-width:${px(
      scaled(c, 560),
    )};background:#fff7fb;border-radius:20px;border:1px solid #f0d9e5"><tr><td style="padding:${px(
      scaled(c, 22),
    )};width:${px(scaled(c, 110))};vertical-align:top">${image(
      c.photoUrl,
      c.fullName,
      photo,
      "border-radius:50%;border:4px solid #ffffff;box-shadow:0 8px 24px rgba(0,0,0,0.08);",
      initials(c.fullName),
    )}</td><td style="padding:${px(scaled(c, 22))} ${px(
      scaled(c, 22),
    )} ${px(scaled(c, 22))} 0;vertical-align:top"><div style="display:inline-block;padding:4px 10px;border-radius:999px;background:#ffffff;color:${c.secondaryColor};font-size:11px;font-weight:bold;letter-spacing:0.05em;text-transform:uppercase">${safe(
      c.pronouns || "Founder Profile",
    )}</div><div style="margin-top:10px;font-size:${px(
      scaled(c, 24),
    )};font-weight:bold;line-height:1.05;color:${c.primaryColor}">${signatureName(
      c,
    )}</div><div style="margin-top:5px;font-size:14px;color:#7a5b73">${safe(
      c.jobTitle,
    )}${c.company ? ` at ${safe(c.company)}` : ""}</div><div style="margin-top:12px;font-size:12px;line-height:1.7;color:#6c6170">${contactInline(
      c,
      c.secondaryColor,
    )}</div>${socialRow(c)}${
      c.legalText
        ? `<div style="margin-top:14px;font-size:10px;line-height:1.5;color:#8a7a84">${safe(
            c.legalText,
          )}</div>`
        : ""
    }</td></tr></table>`;
  },
  "administrative-area": (raw) => {
    const c = sanitizeConfig(raw);
    return `<table role="presentation" cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif;font-size:14px;max-width:${px(
      scaled(c, 620),
    )};background:#fbfcfe;border:1px solid #d8e3ed"><tr><td style="padding:0;width:10px;background:${c.secondaryColor}"></td><td style="padding:${px(
      scaled(c, 18),
    )} ${px(scaled(c, 20))}"><table role="presentation" cellpadding="0" cellspacing="0" width="100%"><tr><td style="vertical-align:top;padding-right:${px(
      scaled(c, 18),
    )}"><div style="font-size:12px;font-weight:bold;letter-spacing:0.08em;text-transform:uppercase;color:${c.secondaryColor}">${safe(
      c.department || "Operations",
    )}</div><div style="margin-top:8px;font-size:${px(
      scaled(c, 22),
    )};font-weight:bold;color:${c.primaryColor}">${safe(
      c.company || c.fullName,
    )}</div><div style="margin-top:6px;font-size:14px;color:#5c6c7c">${safe(
      c.fullName,
    )}${c.jobTitle ? ` &middot; ${safe(c.jobTitle)}` : ""}</div></td><td style="vertical-align:top;width:${px(
      scaled(c, 180),
    )};border-left:1px solid #d8e3ed;padding-left:${px(
      scaled(c, 18),
    )}"><div style="font-size:11px;font-weight:bold;text-transform:uppercase;color:#8090a0">Contact</div><div style="margin-top:8px;font-size:12px;line-height:1.8;color:#435261">${c.email ? link(
      `mailto:${c.email}`,
      c.email,
      c.primaryColor,
    ) : ""}${c.email && c.phone ? "<br>" : ""}${c.phone ? link(
      `tel:${c.phone}`,
      c.phone,
      c.primaryColor,
    ) : ""}${(c.email || c.phone) && c.website ? "<br>" : ""}${c.website ? link(
      c.website,
      websiteLabel(c.website),
      c.primaryColor,
    ) : ""}</div></td></tr></table>${socialRow(c, {
      shape: "square",
    })}${
      c.legalText
        ? `<div style="margin-top:12px;padding-top:12px;border-top:1px solid #d8e3ed;font-size:10px;line-height:1.5;color:#6f7c89">${safe(
            c.legalText,
          )}</div>`
        : ""
    }</td></tr></table>`;
  },
  "scripted-intro": (raw) => {
    const c = sanitizeConfig(raw);
    const photo = scaled(c, 84);
    return `<table role="presentation" cellpadding="0" cellspacing="0" style="font-family:Georgia, 'Times New Roman', serif;font-size:14px;max-width:${px(
      scaled(c, 560),
    )};background:#ffffff"><tr><td colspan="3" style="padding:0 0 12px 0;color:${c.secondaryColor};font-size:${px(
      scaled(c, 26),
    )};font-style:italic">Best regards,</td></tr><tr><td style="width:${px(
      photo + scaled(c, 8),
    )};padding-right:${px(scaled(c, 14))};vertical-align:top">${image(
      c.photoUrl,
      c.fullName,
      photo,
      `border-radius:50%;border:3px solid ${c.secondaryColor}22;`,
      initials(c.fullName),
    )}</td><td style="width:2px;background:${c.secondaryColor};font-size:0;line-height:0"></td><td style="padding-left:${px(
      scaled(c, 16),
    )};vertical-align:top"><div style="font-family:Arial,sans-serif;font-size:${px(
      scaled(c, 23),
    )};font-weight:bold;color:${c.primaryColor}">${signatureName(c)}</div><div style="margin-top:4px;font-family:Arial,sans-serif;font-size:14px;color:#5b5965">${safe(
      c.jobTitle,
    )}${c.company ? ` | ${safe(c.company)}` : ""}</div><div style="margin-top:8px;font-family:Arial,sans-serif;font-size:12px;line-height:1.8;color:#445064">${contactStack(
      c,
    )}</div>${socialRow(c, {
      shape: "circle",
      size: scaled(c, 28),
      fill: "outline",
    })}</td></tr></table>`;
  },
  "bold-banner": (raw) => {
    const c = sanitizeConfig(raw);
    const photo = scaled(c, 90);
    const logo = scaled(c, 74);
    return `<table role="presentation" cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif;max-width:${px(
      scaled(c, 620),
    )};background:#ffffff;border:1px solid #e5e1ec"><tr><td style="padding:${px(
      scaled(c, 18),
    )};width:${px(
      scaled(c, 190),
    )};background:linear-gradient(135deg, ${c.primaryColor}, ${c.secondaryColor});color:#ffffff;vertical-align:top">${image(
      c.logoUrl,
      `${c.company} logo`,
      logo,
      "border-radius:18px;background:#ffffff;",
      initials(c.company || c.fullName),
    )}<div style="margin-top:14px;font-size:${px(
      scaled(c, 20),
    )};font-weight:bold;color:#ffffff">${signatureName(c)}</div><div style="margin-top:4px;font-size:13px;color:#eef4ff">${safe(
      c.jobTitle,
    )}</div><div style="margin-top:10px;font-size:12px;line-height:1.7;color:#ffffff">${contactInline(
      c,
      "#ffffff",
    )}</div>${socialRow(c, {
      shape: "square",
      size: scaled(c, 26),
      forceColor: "#ffffff",
      textColor: c.primaryColor,
    })}</td><td style="padding:${px(scaled(c, 18))};vertical-align:top"><table role="presentation" cellpadding="0" cellspacing="0" width="100%"><tr><td style="vertical-align:top;padding-right:${px(
      scaled(c, 16),
    )}"><div style="font-size:12px;font-weight:bold;letter-spacing:0.12em;text-transform:uppercase;color:${c.secondaryColor}">${safe(
      c.company || "Studio",
    )}</div><div style="margin-top:10px;font-size:${px(
      scaled(c, 28),
    )};font-weight:bold;color:${c.primaryColor}">${signatureName(c)}</div><div style="margin-top:6px;font-size:15px;color:#5c6572">${safe(
      c.jobTitle,
    )}</div><div style="margin-top:14px">${divider(
      `${c.primaryColor}22`,
      "48px",
    )}</div><div style="margin-top:14px">${contactStack(c)}</div><div style="margin-top:16px">${websiteCta(
      c,
      "Visit website",
      c.primaryColor,
    )}</div></td><td style="width:${px(photo)};vertical-align:top">${image(
      c.photoUrl,
      c.fullName,
      photo,
      "border-radius:50%;box-shadow:0 10px 26px rgba(0,0,0,0.12);",
      initials(c.fullName),
    )}</td></tr></table></td></tr></table>`;
  },
  "promo-banner": (raw) => {
    const c = sanitizeConfig(raw);
    const photo = scaled(c, 78);
    return `<table role="presentation" cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif;max-width:${px(
      scaled(c, 560),
    )};background:#ffffff"><tr><td colspan="2" style="padding:0 0 12px 0;color:#8c6c7a;font-size:${px(
      scaled(c, 24),
    )};font-style:italic">Sincerely,</td></tr><tr><td style="padding-right:${px(
      scaled(c, 16),
    )};vertical-align:top">${image(
      c.photoUrl,
      c.fullName,
      photo,
      "border-radius:50%;",
      initials(c.fullName),
    )}</td><td style="vertical-align:top"><div style="font-size:${px(
      scaled(c, 22),
    )};font-weight:bold;color:${c.primaryColor}">${signatureName(c)}</div><div style="margin-top:4px;font-size:14px;color:#635564">${safe(
      c.jobTitle,
    )}${c.company ? ` · ${safe(c.company)}` : ""}</div><div style="margin-top:10px">${detailLine(
      "phone",
      c.phone,
    )}${detailLine("email", c.email)}${detailLine(
      "website",
      c.website ? websiteLabel(c.website) : "",
    )}</div>${socialRow(c, {
      shape: "circle",
      size: scaled(c, 26),
      fill: "outline",
    })}</td></tr><tr><td colspan="2" style="padding-top:${px(
      scaled(c, 16),
    )}"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-radius:16px;overflow:hidden;background:linear-gradient(135deg, ${c.primaryColor}, ${c.secondaryColor})"><tr><td style="padding:${px(
      scaled(c, 18),
    )};color:#ffffff"><div style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase">Promotion</div><div style="margin-top:6px;font-size:${px(
      scaled(c, 24),
    )};font-weight:bold">Meet our experts</div><div style="margin-top:8px">${websiteCta(
      c,
      "Join now",
      "#ffffff",
      c.primaryColor,
      "#ffffff",
    )}</div></td></tr></table></td></tr></table>`;
  },
  "team-column": (raw) => {
    const c = sanitizeConfig(raw);
    const media = c.photoUrl || c.logoUrl;
    const box = scaled(c, 78);
    return `<table role="presentation" cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif;max-width:${px(
      scaled(c, 420),
    )};background:#ffffff;border:1px solid #dde5ef;border-radius:16px"><tr><td colspan="3" style="height:5px;background:${c.secondaryColor}"></td></tr><tr><td style="padding:${px(
      scaled(c, 16),
    )};width:${px(box)};vertical-align:top">${image(
      media,
      c.fullName,
      box,
      "border-radius:12px;",
      initials(c.fullName || c.company),
    )}</td><td style="padding:${px(scaled(c, 16))} ${px(
      scaled(c, 18),
    )} ${px(scaled(c, 14))} 0;vertical-align:top"><div style="font-size:${px(
      scaled(c, 18),
    )};font-weight:bold;color:${c.primaryColor}">${signatureName(c)}</div><div style="margin-top:3px;font-size:13px;color:#6d7683">${safe(
      c.jobTitle,
    )}${c.company ? ` · ${safe(c.company)}` : ""}</div><div style="margin-top:10px;font-size:12px;line-height:1.7;color:#4f5967">${contactInline(
      c,
      c.primaryColor,
    )}</div>${socialRow(c, {
      shape: "square",
      size: scaled(c, 24),
      gap: 4,
    })}</td></tr></table>`;
  },
  "orb-profile": (raw) => {
    const c = sanitizeConfig(raw);
    const orb = scaled(c, 100);
    return `<table role="presentation" cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif;max-width:${px(
      scaled(c, 540),
    )};background:#ffffff;border:1px solid #ebe2f3;border-radius:22px"><tr><td style="padding:${px(
      scaled(c, 22),
    )};width:${px(orb + 8)};vertical-align:top"><div style="width:${px(
      orb,
    )};height:${px(orb)};border-radius:999px;background:radial-gradient(circle at 35% 35%, ${c.secondaryColor}, ${c.primaryColor});display:grid;place-items:center;color:#ffffff;font-size:${px(
      scaled(c, 34),
    )};font-weight:bold">${c.logoUrl ? image(
      c.logoUrl,
      `${c.company} logo`,
      scaled(c, 86),
      "border-radius:50%;",
      initials(c.company),
    ) : initials(c.company || c.fullName)}</div></td><td style="padding:${px(
      scaled(c, 22),
    )} ${px(scaled(c, 22))} ${px(scaled(c, 22))} 0;vertical-align:middle"><div style="font-size:${px(
      scaled(c, 25),
    )};font-weight:bold;color:${c.secondaryColor}">${safe(c.company || c.fullName)}</div><div style="margin-top:6px;font-size:16px;color:#615c67">${safe(
      c.jobTitle || c.department,
    )}</div><div style="margin-top:10px">${detailLine(
      "website",
      c.website ? websiteLabel(c.website) : "",
      "#675f70",
      c.secondaryColor,
    )}${detailLine("email", c.email, "#675f70", c.secondaryColor)}${detailLine(
      "phone",
      c.phone,
      "#675f70",
      c.secondaryColor,
    )}</div>${socialRow(c, {
      shape: "circle",
      size: scaled(c, 28),
      forceColor: c.secondaryColor,
    })}</td></tr></table>`;
  },
  "scholar-strip": (raw) => {
    const c = sanitizeConfig(raw);
    const photo = scaled(c, 72);
    return `<table role="presentation" cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif;max-width:${px(
      scaled(c, 520),
    )};background:#ffffff;border:1px solid #dfe8f3;border-radius:18px"><tr><td style="padding:${px(
      scaled(c, 20),
    )};text-align:center">${image(
      c.photoUrl,
      c.fullName,
      photo,
      "border-radius:50%;margin:0 auto 10px;",
      initials(c.fullName),
    )}<div style="font-size:${px(
      scaled(c, 20),
    )};font-weight:bold;color:${c.primaryColor}">${signatureName(c)}</div><div style="margin-top:5px;font-size:14px;color:#4d5565">${safe(
      c.company,
    )}</div><div style="margin-top:3px;font-size:12px;color:#7c8796">${safe(
      c.department || c.jobTitle,
    )}</div><table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-top:${px(
      scaled(c, 14),
    )};background:#eaf1f8"><tr><td style="padding:${px(
      scaled(c, 12),
    )};font-size:12px;color:#38526b">${contactInline(c, c.primaryColor)}</td></tr></table>${socialRow(
      c,
      { shape: "square", size: scaled(c, 24) },
    )}</td></tr></table>`;
  },
  "property-cta": (raw) => {
    const c = sanitizeConfig(raw);
    const photo = scaled(c, 82);
    return `<table role="presentation" cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif;max-width:${px(
      scaled(c, 560),
    )};background:#ffffff;border:1px solid #dae3ef;border-radius:22px"><tr><td style="padding:${px(
      scaled(c, 20),
    )};width:42px;vertical-align:top;border-right:1px solid #e6edf5">${socialColumn(
      c,
      "#1b2f4b",
    )}</td><td style="padding:${px(scaled(c, 20))};vertical-align:top"><table role="presentation" cellpadding="0" cellspacing="0" width="100%"><tr><td style="vertical-align:top;padding-right:${px(
      scaled(c, 16),
    )}"><div style="font-size:${px(
      scaled(c, 22),
    )};font-weight:bold;color:#111111">${signatureName(c)}</div><div style="margin-top:4px;font-size:14px;color:${c.secondaryColor}">${safe(
      c.jobTitle,
    )}</div><div style="margin-top:10px;font-size:12px;line-height:1.8;color:#35507a">${contactStack(
      c,
      "#35507a",
    )}</div></td><td style="width:${px(photo)};vertical-align:top">${image(
      c.photoUrl,
      c.fullName,
      photo,
      "border-radius:18px;",
      initials(c.fullName),
    )}</td></tr></table><table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-top:${px(
      scaled(c, 16),
    )};border-radius:18px;overflow:hidden;background:linear-gradient(135deg, ${c.primaryColor}, ${c.secondaryColor})"><tr><td style="padding:${px(
      scaled(c, 16),
    )};color:#ffffff"><div style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase">Property spotlight</div><div style="margin-top:6px;font-size:${px(
      scaled(c, 22),
    )};font-weight:bold">Let's find your perfect fit</div><div style="margin-top:10px">${websiteCta(
      c,
      "View listings",
      "#ffffff",
      c.primaryColor,
      "#ffffff",
    )}</div></td></tr></table></td></tr></table>`;
  },
  "social-stack": (raw) => {
    const c = sanitizeConfig(raw);
    const badge = scaled(c, 78);
    return `<table role="presentation" cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif;max-width:${px(
      scaled(c, 520),
    )};background:#ffffff;border:1px solid #eadff1;border-radius:20px"><tr><td style="padding:${px(
      scaled(c, 18),
    )};width:40px;vertical-align:top">${socialColumn(c, c.secondaryColor)}</td><td style="padding:${px(
      scaled(c, 18),
    )} ${px(scaled(c, 18))} ${px(scaled(c, 18))} 0;vertical-align:top"><table role="presentation" cellpadding="0" cellspacing="0" width="100%"><tr><td style="width:${px(
      badge + 8,
    )};vertical-align:top"><div style="width:${px(
      badge,
    )};height:${px(badge)};line-height:${px(badge)};border-radius:999px;border:2px solid ${c.secondaryColor};text-align:center;color:${c.secondaryColor};font-size:${px(
      scaled(c, 34),
    )};font-weight:bold">${initials(c.company || c.fullName)}</div></td><td style="padding-left:${px(
      scaled(c, 14),
    )};vertical-align:top"><div style="font-size:${px(
      scaled(c, 22),
    )};font-weight:bold;color:${c.primaryColor}">${signatureName(c)}</div><div style="margin-top:4px;font-size:14px;color:#63556c">${safe(
      c.jobTitle,
    )}</div><div style="margin-top:10px">${divider(
      `${c.secondaryColor}55`,
      "100%",
    )}</div><div style="margin-top:10px;font-size:12px;line-height:1.8;color:#4b5565">${contactInline(
      c,
      c.primaryColor,
    )}</div><div style="margin-top:${px(scaled(c, 14))}">${websiteCta(
      c,
      "Follow my work",
      c.secondaryColor,
    )}</div></td></tr></table></td></tr></table>`;
  },
  "executive-card": (raw) => {
    const c = sanitizeConfig(raw);
    const photo = scaled(c, 76);
    return `<table role="presentation" cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif;max-width:${px(
      scaled(c, 520),
    )};background:#ffffff;border:1px solid #d9e1ea;border-radius:18px"><tr><td style="padding:${px(
      scaled(c, 18),
    )}">${divider(c.primaryColor, "56px")}<div style="margin-top:10px;font-size:${px(
      scaled(c, 22),
    )};font-weight:bold;color:${c.primaryColor}">${signatureName(c)}</div><div style="margin-top:4px;font-size:14px;color:#4f5865">${safe(
      c.jobTitle,
    )}${c.company ? ` · ${safe(c.company)}` : ""}</div><table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-top:${px(
      scaled(c, 14),
    )}"><tr><td style="vertical-align:top;padding-right:${px(
      scaled(c, 14),
    )}">${image(
      c.photoUrl,
      c.fullName,
      photo,
      "border-radius:14px;",
      initials(c.fullName),
    )}</td><td style="vertical-align:top">${contactStack(c)}</td></tr></table>${socialRow(
      c,
      { shape: "square", size: scaled(c, 24) },
    )}<div style="margin-top:${px(scaled(c, 14))}">${websiteCta(
      c,
      "Book a call",
      c.primaryColor,
    )}</div></td></tr></table>`;
  },
  "legal-brief": (raw) => {
    const c = sanitizeConfig(raw);
    const photo = scaled(c, 94);
    return `<table role="presentation" cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif;max-width:${px(
      scaled(c, 590),
    )};background:#fffdf9;border:1px solid #eadfca;border-radius:18px"><tr><td style="padding:${px(
      scaled(c, 18),
    )};vertical-align:top"><table role="presentation" cellpadding="0" cellspacing="0" width="100%"><tr><td style="vertical-align:top;padding-right:${px(
      scaled(c, 18),
    )}"><div style="font-size:12px;font-weight:bold;letter-spacing:0.12em;text-transform:uppercase;color:#9d6c2d">${safe(
      c.company || "Counsel",
    )}</div><div style="margin-top:8px;font-size:${px(
      scaled(c, 24),
    )};font-weight:bold;color:#37291c">${signatureName(c)}</div><div style="margin-top:5px;font-size:14px;color:#6a5848">${safe(
      c.jobTitle,
    )}</div><div style="margin-top:12px">${contactStack(
      c,
      "#5a4b3a",
    )}</div>${socialRow(c, {
      shape: "square",
      size: scaled(c, 24),
      forceColor: "#b77821",
    })}</td><td style="width:${px(photo)};vertical-align:top">${image(
      c.photoUrl,
      c.fullName,
      photo,
      "border-radius:16px;",
      initials(c.fullName),
    )}</td></tr></table><table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-top:${px(
      scaled(c, 16),
    )};background:linear-gradient(135deg, #6f4b1d, #c88a2f);border-radius:14px"><tr><td style="padding:${px(
      scaled(c, 14),
    )};color:#fff7eb"><div style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase">Legal advisory</div><div style="margin-top:5px;font-size:${px(
      scaled(c, 20),
    )};font-weight:bold">Need legal guidance?</div><div style="margin-top:10px">${websiteCta(
      c,
      "Schedule consultation",
      "#fff7eb",
      "#6f4b1d",
      "#fff7eb",
    )}</div></td></tr></table>${
      c.legalText
        ? `<div style="margin-top:10px;font-size:10px;line-height:1.5;color:#7d7064">${safe(
            c.legalText,
          )}</div>`
        : ""
    }</td></tr></table>`;
  },
  "medical-profile": (raw) => {
    const c = sanitizeConfig(raw);
    const photo = scaled(c, 82);
    return `<table role="presentation" cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif;max-width:${px(
      scaled(c, 520),
    )};background:#ffffff;border:1px solid #d9e8f5;border-radius:22px"><tr><td style="padding:${px(
      scaled(c, 22),
    )};text-align:center">${image(
      c.photoUrl,
      c.fullName,
      photo,
      `border-radius:50%;border:3px solid ${c.secondaryColor}55;margin:0 auto;`,
      initials(c.fullName),
    )}<div style="margin-top:10px;font-size:${px(
      scaled(c, 24),
    )};font-weight:bold;color:${c.secondaryColor}">${signatureName(c)}</div><div style="margin-top:4px;font-size:14px;font-weight:bold;color:${c.primaryColor}">${safe(
      c.jobTitle || "Healthcare Specialist",
    )}</div><div style="margin-top:12px;font-size:12px;line-height:1.8;color:#39516a">${contactInline(
      c,
      c.primaryColor,
    )}</div>${socialRow(c, {
      shape: "circle",
      size: scaled(c, 24),
      forceColor: c.secondaryColor,
      fill: "outline",
    })}<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-top:${px(
      scaled(c, 16),
    )};border-top:1px solid #d9e8f5"><tr><td style="padding-top:${px(
      scaled(c, 14),
    )};text-align:center">${websiteCta(
      c,
      "Schedule consultation",
      "#eef7ff",
      c.secondaryColor,
      "#c4def6",
    )}</td></tr></table></td></tr></table>`;
  },
  "holiday-postcard": (raw) => {
    const c = sanitizeConfig(raw);
    const photo = scaled(c, 76);
    return `<table role="presentation" cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif;max-width:${px(
      scaled(c, 540),
    )};background:#fffdfd;border:1px solid #f2d8df;border-radius:22px"><tr><td colspan="2" style="padding:0 0 14px 0;color:#b56f83;font-size:${px(
      scaled(c, 24),
    )};font-style:italic">Happy Holidays!</td></tr><tr><td style="padding-right:${px(
      scaled(c, 16),
    )};vertical-align:top">${image(
      c.photoUrl,
      c.fullName,
      photo,
      `border-radius:50%;border:6px solid ${c.secondaryColor}22;`,
      initials(c.fullName),
    )}</td><td style="vertical-align:top"><div style="font-size:${px(
      scaled(c, 21),
    )};font-weight:bold;color:${c.primaryColor}">${signatureName(c)}</div><div style="margin-top:4px;font-size:14px;color:#8c6d78">${safe(
      c.company || c.jobTitle,
    )}</div><div style="margin-top:10px">${detailLine(
      "email",
      c.email,
      "#6c5860",
      c.primaryColor,
    )}${detailLine("website", c.website ? websiteLabel(c.website) : "", "#6c5860", c.primaryColor)}${detailLine(
      "address",
      c.address,
      "#6c5860",
      c.primaryColor,
    )}</div>${socialRow(c, {
      shape: "circle",
      size: scaled(c, 24),
      forceColor: "#d68aa0",
    })}</td></tr><tr><td colspan="2" style="padding-top:${px(
      scaled(c, 16),
    )}"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-radius:18px;overflow:hidden;background:linear-gradient(135deg, #ffd9e6, #fff0c9)"><tr><td style="padding:${px(
      scaled(c, 12),
    )} ${px(scaled(c, 18))};text-align:center;color:#8a4760;font-size:${px(
      scaled(c, 20),
    )};font-style:italic;font-weight:bold">I'm doing my best</td></tr></table></td></tr></table>`;
  },
};

export const renderSignature = (config: SignatureConfig) =>
  templates[config.template](config);
