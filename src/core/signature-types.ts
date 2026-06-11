// This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
export type TemplateId =
  | "minimal"
  | "professional-logo"
  | "professional-photo"
  | "administrative-area";
export type Size = "compact" | "normal" | "wide";
export type SocialPlatform =
  | "linkedin"
  | "instagram"
  | "facebook"
  | "x"
  | "youtube"
  | "tiktok"
  | "whatsapp"
  | "github";
export type SocialIconStyle = "original" | "primary";

export interface SocialLink {
  id: string;
  platform: SocialPlatform;
  url: string;
  iconStyle: SocialIconStyle;
}

export interface SignatureConfig {
  version: 1;
  template: TemplateId;
  fullName: string;
  jobTitle: string;
  company: string;
  department: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  pronouns: string;
  legalText: string;
  logoUrl: string;
  photoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  size: Size;
  socials: SocialLink[];
}

export const defaultConfig: SignatureConfig = {
  version: 1,
  template: "minimal",
  fullName: "Alex Morgan",
  jobTitle: "Product Designer",
  company: "Example Studio",
  department: "",
  email: "alex@example.com",
  phone: "+1 555 010 0000",
  website: "https://example.com",
  address: "",
  pronouns: "",
  legalText: "",
  logoUrl: "",
  photoUrl: "",
  primaryColor: "#17324d",
  secondaryColor: "#075d78",
  size: "normal",
  socials: [],
};
