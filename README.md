# React Frontend Template

A starting point for a static React frontend deployed to Cloudflare (Workers static assets), with a preview for every PR.

- **Vite 8** + **React 18** + **TypeScript**
- **Tailwind CSS 4** via `@tailwindcss/vite`, with theme tokens in [src/styles/index.css](src/styles/index.css)
- **Biome** for formatting, linting, and import sorting
- **Vitest** + **Testing Library** for unit and component tests
- **Playwright** suites for end-to-end, accessibility (axe), and Lighthouse checks
- **GitHub Actions** for CI, Cloudflare deploys, per-PR previews, and post-deploy Lighthouse audits

The committed app is a placeholder. Replace it with your own.

## Scripts

| Script                 | What it does                                       |
| ---------------------- | -------------------------------------------------- |
| `pnpm dev`             | Vite dev server on port 5000                       |
| `pnpm build`           | Production build into `dist`                       |
| `pnpm preview`         | Build, then serve `dist`                           |
| `pnpm check`           | Format + lint + type check (app and Playwright)    |
| `pnpm test`            | Vitest unit tests, once                            |
| `pnpm test:watch`      | Vitest in watch mode                               |
| `pnpm test:e2e`        | End-to-end smoke tests                             |
| `pnpm test:a11y`       | axe scans, desktop and mobile viewports            |
| `pnpm test:lighthouse` | Lighthouse audits against the local preview server |
| `pnpm pw:open`         | Playwright UI mode                                 |
| `pnpm pw:report`       | Open the last HTML report                          |

The Playwright suites run against `vite preview`, so build first (`pnpm build`) and start it with `pnpm preview:ci`, or let CI do it.

## Layout

```
.github/
  actions/
    setup/            Composite action: pnpm + Node + install
    setup-playwright/ Composite action: Playwright browser cache + install
    build-and-serve/  Composite action: build, start `vite preview`, wait for it
  workflows/      CI, PR-only CI, deploy, previews, and production Lighthouse
public/
  favicon.svg     Browser tab icon
  logo.svg        In-app logo
  preview.svg     og:image / social preview
  robots.txt      Crawler rules
  sitemap.xml     Sitemap
  llms.txt        LLM-readable site summary
src/
  components/
    primitives/   Presentational building blocks (Button, Card, Badge)
    ...           Feature components composed from primitives
    __tests__/    Unit tests, beside the modules they cover (in every src/ folder)
  constants/      Shared enums and constants
  hooks/          camelCase files, e.g. useSettings.ts (check @bvandrc/react-toolkit first)
  styles/         Tailwind entrypoint and theme tokens
  types/          Shared types
  utils/          Shared helpers
playwright/
  e2e/            e2e tests
  a11y/           axe accessibility tests
  lighthouse/     google lighthouse tests
shared/
  test-support/   Test helpers either suite can import
    selectors.ts  The data-testid registry
tsconfig.json     App TypeScript config
site.config.ts    Base path, site URL, and the security headers (CSP and others)
wrangler.jsonc    Cloudflare Workers config (Worker name, assets directory, preview URLs)
vite.config.ts    Vite config (port, Tailwind plugin, build options)
vitest.config.ts  Vitest config (happy-dom, globals, aliases)
biome.jsonc       Formatter, linter, and import sorter config
index.html        HTML entry point (title, meta, og tags)
```

## CI

- **CI** — lint, type check, unit tests, and the three Playwright suites on every push and PR
- **PR CI** — pull-request-only jobs: the changed-line count, written to the run's job summary
- **Deploy** — once CI passes on the default branch, build and publish `dist` to Cloudflare with Wrangler
- **Preview** — on every PR, upload the build as a Cloudflare Worker Preview named `pr-<number>` (not deployed) and link its URL from the PR's "View deployment" button, stable per PR
- **Preview Cleanup** — once a PR closes, delete its Worker Preview so its `pr-<number>` URL stops serving
- **Production Lighthouse** — audits the live site 15 minutes after each deploy

## Cloudflare setup

The deploy and preview workflows need, for a repo made from this template:

1. A Cloudflare account with a workers.dev subdomain, and the repo secrets `CLOUDFLARE_API_TOKEN` (a token with the Workers Scripts edit permission) and `CLOUDFLARE_ACCOUNT_ID`.
2. The Worker's `name` in [wrangler.jsonc](wrangler.jsonc) set to the new project's, and `SITE_URL` in [site.config.ts](site.config.ts), the URLs in `public/` and `index.html`, and the deploy, detect-deploy, and production Lighthouse workflows set to its URL.
3. One deploy from `main` before the first preview: Cloudflare only returns a preview URL once a deploy has applied `preview_urls: true` to the Worker.

The headers in `SECURITY_HEADERS` ([site.config.ts](site.config.ts)) are written to `dist/_headers`, which Cloudflare sends with every response. A new third-party script, font, image, frame, or request origin must be added to the CSP there, or the browser blocks it in production.
