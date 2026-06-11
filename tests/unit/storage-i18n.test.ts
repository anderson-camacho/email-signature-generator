import { describe, expect, it } from "vitest";
import {
  clearDraft,
  loadDraft,
  saveDraft,
  STORAGE_KEY,
  type StorageLike,
} from "../../src/storage/local-storage-adapter";
import { defaultConfig } from "../../src/core/signature-types";
import { dictionaries, locales } from "../../src/i18n/dictionaries";

const memory = (): StorageLike => {
  const values = new Map<string, string>();
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key),
  };
};
describe("local storage", () => {
  it("writes, reads and clears", () => {
    const storage = memory();
    saveDraft(storage, defaultConfig);
    expect(storage.getItem(STORAGE_KEY)).toBeTruthy();
    expect(loadDraft(storage)?.fullName).toBe("Alex Morgan");
    clearDraft(storage);
    expect(loadDraft(storage)).toBeNull();
  });
  it("surfaces unavailable storage safely to caller", () => {
    const storage = {
      getItem() {
        throw Error("disabled");
      },
      setItem() {
        throw Error("disabled");
      },
      removeItem() {
        throw Error("disabled");
      },
    };
    expect(() => loadDraft(storage)).toThrow("disabled");
  });
});
describe("i18n", () => {
  it("has identical keys in every dictionary", () => {
    const expected = Object.keys(dictionaries.es).sort();
    locales.forEach((locale) =>
      expect(Object.keys(dictionaries[locale]).sort()).toEqual(expected),
    );
  });
});
