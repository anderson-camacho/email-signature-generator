import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("edits, changes template, warns for local image, and navigates languages", async ({
  page,
}) => {
  await page.addInitScript(() => localStorage.clear());
  await page.goto("/es/generator/");
  await page.getByLabel("Full name").fill("Taylor Example");
  await page.getByLabel("Template").selectOption("professional-logo");
  await page.getByRole("button", { name: "Add social network" }).click();
  await page
    .getByLabel("Public HTTPS URL")
    .fill("https://instagram.com/example");
  await page.getByRole("button", { name: "Add social network" }).click();
  await expect(page.locator(".social-card")).toHaveCount(2);
  await expect(page.locator("#preview")).toContainText("Taylor Example");
  await page.locator("summary", { hasText: "Photo and logo" }).click();
  await page.locator("#local-image").setInputFiles({
    name: "preview.png",
    mimeType: "image/png",
    buffer: Buffer.from("fake"),
  });
  await expect(page.locator("#local-warning")).toBeVisible();
  await expect(page.getByLabel("Idioma")).toContainText("Español");
  await expect(page.getByLabel("Idioma")).toContainText("English");
  await page.getByLabel("Idioma").selectOption("en");
  await expect(page).toHaveURL(/\/en\/generator\//);
});
test("exports, clears, rejects unsafe URL, and passes basic accessibility", async ({
  page,
}) => {
  await page.addInitScript(() => localStorage.clear());
  await page.goto("/en/generator/");
  await page.getByLabel("Website HTTPS").fill("javascript:alert(1)");
  await expect(page.locator("#preview")).not.toContainText("javascript:");
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: "Export JSON" }).click();
  await download;
  await page.getByRole("button", { name: "Clear local data" }).click();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
test("localized public routes respond", async ({ page }) => {
  for (const locale of ["es", "en", "pt-BR", "fr", "de"]) {
    await page.goto(`/${locale}/privacy/`);
    await expect(page.locator("main h1")).toBeVisible();
  }
});
