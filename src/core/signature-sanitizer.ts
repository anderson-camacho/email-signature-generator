// This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
import type {
  SignatureConfig,
  SocialLink,
  SocialPlatform,
} from "./signature-types";
import { isEmail, normalizePhone, safeColor, safeHttpsUrl } from "./validators";

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
  const text = (value: string) => value.slice(0, 500);
  const platforms: SocialPlatform[] = [
    "linkedin",
    "instagram",
    "facebook",
    "x",
    "youtube",
    "tiktok",
    "whatsapp",
    "github",
  ];
  const socials = Array.isArray(config.socials)
    ? config.socials
        .filter(
          (social): social is SocialLink =>
            Boolean(social) && platforms.includes(social.platform),
        )
        .slice(0, 24)
        .map((social) => ({
          id: text(String(social.id || crypto.randomUUID())),
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
    logoUrl: safeHttpsUrl(config.logoUrl),
    photoUrl: safeHttpsUrl(config.photoUrl),
    primaryColor: safeColor(config.primaryColor),
    secondaryColor: safeColor(config.secondaryColor, "#075d78"),
    socials,
  };
}
