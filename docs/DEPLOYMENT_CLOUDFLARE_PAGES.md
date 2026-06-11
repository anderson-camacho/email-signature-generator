# Cloudflare Pages Deployment

Prerequisites: Node from `.nvmrc`, npm, and a reviewed public repository.

1. Run `npm ci`, `npm run validate`, and `npm run build`.
2. In Cloudflare Pages, connect the repository.
3. Set build command to `npm run build` and output directory to `dist`.
4. Set `PUBLIC_SITE_URL` to the final HTTPS origin.
5. Deploy, verify localized routes, sitemap, CSP, and Gmail copy/paste.
6. Connect a custom domain when ready.
7. Cloudflare Web Analytics may be enabled manually from the dashboard later. Review CSP before enabling it; no analytics script is included now.
8. To revert, select a known-good deployment in the Cloudflare dashboard and promote or retry it.
