## Project

Starter template for React frontends, deployed to GitHub Pages by `.github/workflows/deploy.yml`.

- **Stack**: React 18 + Vite + TypeScript, Tailwind v4, Biome, Playwright for e2e/a11y/Lighthouse.
- **Layout**: `src/` is the app; `playwright/` is all tests.
- **Base path**: Pages serves the site from a subpath, so `site.config.ts` holds `BASE_PATH`/`SITE_URL` and is imported by `vite.config.ts` and `playwright.config.ts`. In app code, build asset URLs from `import.meta.env.BASE_URL` (see `Header.tsx`) — a leading-slash path like `/logo.svg` 404s once deployed.

## Code conventions

Conventions live outside this file, synced from https://github.com/bvandrc/bvandrc-conventions — follow all of them:

@conventions/typescript.md — language-level TypeScript/JavaScript rules
@conventions/react.md — component, JSX, and accessibility rules
@conventions/playwright.md — test layout, test IDs, and accessibility scans
@conventions/all.md — practice for every repo: branches, formatting, markdown, PR reviews

## Commands

- `pnpm dev` — dev server on port 5000. `pnpm build`, `pnpm preview`.
- `pnpm format` — Biome check/fix. `pnpm check` — the full gate: format plus `tsc` for the app and for `playwright/tsconfig.json`. Run before every commit; it's what CI runs.
- `pnpm preview:ci` — build and serve on port 4173. All three Playwright suites expect this server to already be running.
- `pnpm test:e2e`, `pnpm test:a11y`, `pnpm test:lighthouse` — the three Playwright projects. `pnpm pw:open` for the UI runner.

## Repo conventions

- **Package manager**: pnpm. `npm install` writes a competing `package-lock.json` that CI ignores.
- **package.json**: Linted in CI by `bvandrc/lint-package-json`, which enforces top-level key order, alphabetical `dependencies` and `devDependencies`, and exact-semver `version`. Adding a field in the wrong place, or a dependency out of order, fails the lint job.
- **Convention files**: `conventions/` is synced from https://github.com/bvandrc/bvandrc-conventions and overwritten on every sync. Edit a rule upstream, never in that directory.
