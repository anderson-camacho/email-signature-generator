// This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
export const isEmail = (value: string) =>
  /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]{2,}$/.test(value.trim());

export function safeHttpsUrl(value: string): string {
  if (!value.trim()) return "";
  try {
    const url = new URL(value.trim());
    return url.protocol === "https:" && url.hostname.includes(".")
      ? url.toString()
      : "";
  } catch {
    return "";
  }
}

export function safeImageUrl(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^data:image\/(png|jpe?g|webp|gif);base64,[a-z0-9+/=]+$/i.test(trimmed)) {
    return trimmed;
  }
  return safeHttpsUrl(trimmed);
}

export const normalizePhone = (value: string) => {
  const normalized = value.trim().replace(/[^\d+]/g, "");
  const digits = normalized.replace(/\D/g, "");
  return /^\+?\d+$/.test(normalized) &&
    digits.length >= 7 &&
    digits.length <= 15
    ? normalized
    : "";
};

const unsafeTextCharacters = new Set(["<", ">", "{", "}", "[", "]", "\\", "`"]);
const readableTextPattern =
  /^[\p{L}\p{M}\p{N}\p{Zs}\p{P}\p{Sc}&+@#%°ºª/()-]*$/u;

export const isReadableText = (value: string) => {
  const text = value.trim();
  return (
    !Array.from(text).some((character) =>
      unsafeTextCharacters.has(character),
    ) &&
    readableTextPattern.test(text) &&
    !/\s{4,}/u.test(text)
  );
};

export const safeReadableText = (value: string, limit = 500) => {
  const text = value.slice(0, limit);
  return isReadableText(text) ? text : "";
};

export const safeColor = (value: string, fallback = "#17324d") =>
  /^#[0-9a-f]{6}$/i.test(value) ? value : fallback;
