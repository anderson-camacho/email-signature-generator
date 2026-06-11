# Email Signature Generator

Email Signature Generator is an open-source engine for creating professional
HTML email signatures. The project is currently in its initial development
stage.

Spanish documentation: [README.es.md](README.es.md)

## Open-source license

The engine's covered source code is available under the
[Mozilla Public License 2.0](LICENSE) (`MPL-2.0`). You may use and modify it in
accordance with that license.

When you redistribute modifications to files covered by MPL-2.0, you must
preserve and comply with the applicable MPL-2.0 obligations. Review the complete
license text before distributing modified versions.

The official project may offer commercial support, implementations, add-ons,
and related services. These commercial offerings do not change the license
terms for covered open-source files.

## Trademarks and affiliation

The source code license does not automatically authorize use of the project's
official brand, definitive commercial name, logos, domain, or visual identity.
It also does not authorize anyone to claim or imply affiliation with,
endorsement by, or status as the official project.

See [TRADEMARKS.md](TRADEMARKS.md) for details.

## Source code license notice

Until principal source files are added, this repository-level notice is the
clearly visible license notice for the project:

> This Source Code Form is subject to the terms of the Mozilla Public License,
> v. 2.0. If a copy of the MPL was not distributed with this file, You can
> obtain one at https://mozilla.org/MPL/2.0/.

Principal source files added later should include this notice where practical,
or otherwise remain covered through a clearly visible equivalent location.

## Current MVP

The repository contains a static Astro and TypeScript MVP with no backend. It
provides four Gmail-oriented templates, live preview, rich clipboard copy, HTML
download, safe JSON import/export, local draft storage, public HTTPS image
support, local image preview warnings, localized public pages, SEO metadata,
tests, and CI.

Supported interface languages are Spanish, English, Brazilian Portuguese,
French, and German.

Screenshot: **pending final visual review and public deployment**.

## Local development

```sh
npm ci
npm run dev
```

Use Node from `.nvmrc`. Useful commands include `npm run check`,
`npm run lint`, `npm run test:unit`, `npm run test:e2e`, `npm run build`, and
`npm run validate`.

## Architecture and privacy

Astro generates the localized static pages. Browser TypeScript runs the editor,
while isolated core modules sanitize all user input and generate table-based
HTML with inline styles. Drafts remain in browser localStorage and can be
deleted from the generator. The application has no accounts, backend, remote
storage, analytics, or trackers.

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md),
[docs/PRIVACY_MODEL.md](docs/PRIVACY_MODEL.md), and
[docs/DEPLOYMENT_CLOUDFLARE_PAGES.md](docs/DEPLOYMENT_CLOUDFLARE_PAGES.md).

## Contributing, security, and roadmap

Read [CONTRIBUTING.md](CONTRIBUTING.md) before proposing changes. Report
vulnerabilities as described in [SECURITY.md](SECURITY.md). Future commercial
and team features are documented separately in
[docs/PHASE_2_BACKLOG.md](docs/PHASE_2_BACKLOG.md); they are not active in the
static MVP.

## Notices

Copyright and official-repository information is recorded in [NOTICE](NOTICE).
