import type { APIRoute } from "astro";
import { publicSiteUrl } from "../seo/metadata";

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL(publicSiteUrl);
  const body = [
    "# Email Signature Generator crawl policy",
    "# Search indexing is welcome. Bulk copying, brand impersonation, and model-training reuse are not granted by this file.",
    "# robots.txt is a crawl hint, not a privacy or copyright enforcement mechanism.",
    "",
    "User-agent: *",
    "Allow: /",
    "Disallow: /api/",
    "Disallow: /_actions/",
    "",
    `Sitemap: ${new URL("sitemap.xml", origin)}`,
    `Sitemap: ${new URL("sitemap-index.xml", origin)}`,
    `Sitemap: ${new URL("sitemap-0.xml", origin)}`,
    `LLMs: ${new URL("llms.txt", origin)}`,
    `Host: ${origin.host}`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
