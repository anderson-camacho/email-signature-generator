# OpenSign

OpenSign is an open-source web app for building professional HTML email
signatures with a fast, direct editing workflow.

The current product is a static Astro + TypeScript application with no backend.
Users land directly in the editor, preview signatures live, save versions in the
browser, and export HTML or JSON without creating an account.

Spanish notes: [README.es.md](README.es.md)

## What the app currently includes

- Direct-to-editor experience instead of a marketing landing page
- Multiple signature styles with live thumbnail previews
- Real-time preview with desktop and mobile presentation modes
- Local library page for saved signatures
- JSON import and export for portable configurations
- HTML export and clipboard copy for email clients
- Public HTTPS logo and profile photo support
- Local-only draft storage through browser `localStorage`
- Localized routes for Spanish, English, Brazilian Portuguese, French, and German
- Static public content for privacy, FAQ, templates, and installation guidance

## Product scope

OpenSign is designed as a general email signature builder, not a Gmail-only
tool. The exported HTML is meant to be copied into different email clients,
although rendering rules still depend on the target platform.

The current app is intentionally simple:

- no backend
- no user accounts
- no remote database
- no analytics or trackers
- no commercial billing flow inside the product

## Stack

- [Astro](https://astro.build/) for static site generation
- TypeScript for browser logic and core modules
- Vitest for unit tests
- Playwright for end-to-end coverage
- GitHub Actions for CI

## Local development

Use the Node version defined in `.nvmrc`.

```sh
npm ci
npm run dev
```

Common commands:

```sh
npm run check
npm run lint
npm run format:check
npm run test:unit
npm run build
npm run validate
```

## Project structure

```text
src/
  components/   UI building blocks
  core/         signature generation, sanitization, validation
  export/       JSON export helpers
  i18n/         localized strings
  pages/        Astro routes
  scripts/      browser-side editor behavior
  storage/      local browser persistence
  templates/    signature style registry
tests/
  unit/         core and storage tests
  e2e/          browser workflow tests
docs/           architecture, privacy, deployment, roadmap notes
```

## Architecture and privacy

Astro generates the static pages and route structure. Browser-side scripts run
the editor and saved-signature experience. Core modules sanitize user input and
produce table-based HTML with inline styles for email-client compatibility.

User data stays in the browser unless the user explicitly exports it. The app
does not send signature data to a server.

More detail:

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- [docs/PRIVACY_MODEL.md](docs/PRIVACY_MODEL.md)
- [docs/DEPLOYMENT_CLOUDFLARE_PAGES.md](docs/DEPLOYMENT_CLOUDFLARE_PAGES.md)

## License

The source code is available under the
[Mozilla Public License 2.0](LICENSE) (`MPL-2.0`).

If you redistribute modified MPL-covered files, keep the license notices and
follow the obligations of MPL-2.0.

## Trademarks and project identity

The source code license does not automatically grant rights to use the
project's official name, brand assets, logos, or domain as if they were your
own official release.

See [TRADEMARKS.md](TRADEMARKS.md) for details.

## Contributing and security

- Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening substantial changes
- Follow [SECURITY.md](SECURITY.md) for responsible disclosure
- Review [docs/PHASE_2_BACKLOG.md](docs/PHASE_2_BACKLOG.md) for ideas that are
  not part of the current shipped scope

## Notices

Copyright and repository notice information is recorded in [NOTICE](NOTICE).
