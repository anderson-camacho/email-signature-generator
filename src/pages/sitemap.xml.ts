import type { APIRoute } from "astro";
import { publicSiteUrl } from "../seo/metadata";

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL(publicSiteUrl);
  const sitemap = new URL("sitemap-0.xml", origin).toString();

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>` +
      `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
      `<sitemap><loc>${sitemap}</loc></sitemap>` +
      `</sitemapindex>`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
};
