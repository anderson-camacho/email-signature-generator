// This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
export const isEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export function safeHttpsUrl(value: string): string {
  if (!value.trim()) return "";
  try {
    const url = new URL(value.trim());
    return url.protocol === "https:" ? url.toString() : "";
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
  return /^\+?\d{7,15}$/.test(normalized) ? normalized : "";
};

export const safeColor = (value: string, fallback = "#17324d") =>
  /^#[0-9a-f]{6}$/i.test(value) ? value : fallback;
