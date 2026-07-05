// This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
import { defineConfig } from "astro/config";
import sitemap, { ChangeFreqEnum } from "@astrojs/sitemap";

const productionSite =
  process.env.PUBLIC_SITE_URL ??
  "https://email-signature-generator.anderson-camacho-palacios.workers.dev";

export default defineConfig({
  // SEO: never let production builds publish localhost canonicals or sitemap URLs.
  site: productionSite,
  output: "static",
  devToolbar: { enabled: false },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "es",
        locales: {
          es: "es",
          en: "en",
          "pt-BR": "pt-BR",
          fr: "fr",
          de: "de",
          it: "it",
          ja: "ja",
          ko: "ko",
          ar: "ar",
          hi: "hi",
          "zh-CN": "zh-CN",
          ru: "ru",
        },
      },
      filter(page) {
        const pathname = new URL(page).pathname;
        return (
          pathname !== "/" &&
          !pathname.endsWith(".xml") &&
          !pathname.endsWith(".txt")
        );
      },
      changefreq: ChangeFreqEnum.WEEKLY,
      priority: 0.8,
      serialize(item) {
        const url = new URL(item.url);
        const isHome =
          /^\/(?:es|en|pt-BR|fr|de|it|ja|ko|ar|hi|zh-CN|ru)\/?$/.test(
            url.pathname,
          );
        const isRootRedirect = url.pathname === "/";

        return {
          ...item,
          priority: isRootRedirect ? 0.5 : isHome ? 1 : 0.72,
          changefreq: isHome ? ChangeFreqEnum.WEEKLY : ChangeFreqEnum.MONTHLY,
        };
      },
    }),
  ],
});
