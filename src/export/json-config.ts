import { defaultConfig, type SignatureConfig } from "../core/signature-types";
import { sanitizeConfig } from "../core/signature-sanitizer";
import { templateIds } from "../templates/catalog";

export const exportConfig = (config: SignatureConfig) =>
  JSON.stringify(sanitizeConfig(config), null, 2);

export function importConfig(value: string): SignatureConfig {
  const parsed: unknown = JSON.parse(value);
  if (
    !parsed ||
    typeof parsed !== "object" ||
    (parsed as { version?: unknown }).version !== 1
  )
    throw new Error("Unsupported or invalid configuration version.");
  const raw = parsed as Partial<SignatureConfig> & { socials?: unknown };
  const migratedSocials = Array.isArray(raw.socials)
    ? raw.socials
    : Object.entries((raw.socials as Record<string, string> | undefined) ?? {})
        .filter(([, url]) => Boolean(url))
        .map(([platform, url], index) => ({
          id: `migrated-${index}`,
          platform,
          url,
          iconStyle: "original",
        }));
  const candidate = {
    ...defaultConfig,
    ...raw,
    socials: migratedSocials,
  };
  if (!templateIds.includes(candidate.template))
    throw new Error("Unknown template.");
  return sanitizeConfig(candidate as SignatureConfig);
}
