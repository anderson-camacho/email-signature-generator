# Architecture

The application is a static Astro site. Astro renders localized public pages, while browser TypeScript powers the editor. `src/core` validates and sanitizes untrusted input, `src/templates` creates Gmail-oriented table HTML with inline styles, `src/export` handles versioned JSON, and `src/storage` isolates localStorage access. There is no backend or remote persistence.
