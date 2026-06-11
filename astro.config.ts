// This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL ?? "http://localhost:4321",
  output: "static",
  devToolbar: { enabled: false },
  integrations: [sitemap()],
});
