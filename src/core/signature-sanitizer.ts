// This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
import type {
  SignatureConfig,
  SocialLink,
  SocialPlatform,
} from "./signature-types";
import {
  isEmail,
  normalizePhone,
  safeColor,
  safeHttpsUrl,
  safeImageUrl,
  safeReadableText,
} from "./validators";

const supportedSocialPlatforms: SocialPlatform[] = [
  "linkedin",
  "instagram",
  "facebook",
  "x",
  "youtube",
  "tiktok",
  "whatsapp",
  "github",
  "dribbble",
  "behance",
  "pinterest",
];

export const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character]!,
  );

export function sanitizeConfig(config: SignatureConfig): SignatureConfig {
  const text = (value: string) => safeReadableText(value, 500);
  const socials = Array.isArray(config.socials)
    ? config.socials
        .filter(
          (social): social is SocialLink =>
            Boolean(social) &&
            supportedSocialPlatforms.includes(social.platform),
        )
        .slice(0, 24)
        .map((social) => ({
          id: String(social.id || crypto.randomUUID()).slice(0, 500),
          platform: social.platform,
          url: safeHttpsUrl(String(social.url || "")),
          iconStyle:
            social.iconStyle === "primary"
              ? ("primary" as const)
              : ("original" as const),
        }))
        .filter((social) => social.url)
    : [];
  return {
    ...config,
    fullName: text(config.fullName),
    jobTitle: text(config.jobTitle),
    company: text(config.company),
    department: text(config.department),
    address: text(config.address),
    pronouns: text(config.pronouns),
    legalText: text(config.legalText),
    email: isEmail(config.email) ? config.email.trim() : "",
    phone: normalizePhone(config.phone),
    website: safeHttpsUrl(config.website),
    logoUrl: safeImageUrl(config.logoUrl),
    photoUrl: safeImageUrl(config.photoUrl),
    primaryColor: safeColor(config.primaryColor),
    secondaryColor: safeColor(config.secondaryColor, "#075d78"),
    socials,
  };
}
