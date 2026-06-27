import type { SignatureConfig } from "../core/signature-types";
import { importConfig, exportConfig } from "../export/json-config";

export const STORAGE_KEY = "email-signature-generator:v1";
export const SAVED_SIGNATURES_KEY =
  "email-signature-generator:saved-signatures:v1";
export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}
export const saveDraft = (storage: StorageLike, config: SignatureConfig) =>
  storage.setItem(STORAGE_KEY, exportConfig(config));
export const loadDraft = (storage: StorageLike) => {
  const value = storage.getItem(STORAGE_KEY);
  return value ? importConfig(value) : null;
};
export const clearDraft = (storage: StorageLike) =>
  storage.removeItem(STORAGE_KEY);

export interface SavedSignatureRecord {
  id: string;
  name: string;
  updatedAt: string;
  config: SignatureConfig;
}

export const loadSavedSignatures = (storage: StorageLike) => {
  const value = storage.getItem(SAVED_SIGNATURES_KEY);
  if (!value) return [] as SavedSignatureRecord[];
  const parsed = JSON.parse(value) as SavedSignatureRecord[];
  return parsed.map((entry) => ({
    ...entry,
    config: importConfig(JSON.stringify(entry.config)),
  }));
};

export const saveSavedSignatures = (
  storage: StorageLike,
  signatures: SavedSignatureRecord[],
) => storage.setItem(SAVED_SIGNATURES_KEY, JSON.stringify(signatures));
