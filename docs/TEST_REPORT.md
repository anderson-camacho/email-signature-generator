# Test Report

Validated locally on June 8, 2026.

| Command            | Result                                                                                                                                                                                          |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm install`      | Passed; generated `package-lock.json`. npm reported six moderate dependency audit findings and Node engine warnings because the local runtime is Node 20.12.2 while `.nvmrc` specifies Node 22. |
| `npm run validate` | Passed. Astro Check: 0 errors and 0 warnings; ESLint passed; Prettier check passed; 16 unit tests passed; build passed.                                                                         |
| `npm run test:e2e` | Passed: 3 Playwright tests, including a basic axe accessibility scan.                                                                                                                           |
| `npm run build`    | Passed; generated 31 static pages, `dist`, and `dist/sitemap-index.xml`.                                                                                                                        |

During validation, the initial static-route implementation was corrected to use isolated `getStaticPaths()` data, and the default secondary color was darkened after the accessibility test identified insufficient contrast.

The social media editor was later validated with repeated platforms, removable buttons, original platform colors, primary-color buttons, and migration of the previous single-link social format.

Manual Gmail copy/paste and cross-client email rendering remain owner tasks.
