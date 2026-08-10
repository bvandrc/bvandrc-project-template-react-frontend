## Project

Starter template for React frontends, deployed to GitHub Pages by
`.github/workflows/deploy.yml`.

- **Stack**: React 18 + Vite + TypeScript, Tailwind v4, Biome, Playwright for
  e2e/a11y/Lighthouse.
- **Layout**: `src/` is the app; `playwright/` is all tests.
- **Base path**: Pages serves the site from a subpath, so `site.config.ts`
  holds `BASE_PATH`/`SITE_URL` and is imported by `vite.config.ts` and
  `playwright.config.ts`. In app code, build asset URLs from
  `import.meta.env.BASE_URL` (see `Header.tsx`) — a leading-slash path like
  `/logo.svg` 404s once deployed.

## Code conventions

Code conventions live outside this file — follow all three for app and test
code:

@conventions/typescript.md — language-level TypeScript/JavaScript rules
@conventions/react.md — component, JSX, and accessibility rules
@conventions/playwright.md — test layout, test IDs, and accessibility scans

## Commands

- `pnpm dev` — dev server on port 5000. `pnpm build`, `pnpm preview`.
- `pnpm format` — Biome check/fix. `pnpm check` — the full gate: format plus
  `tsc` for the app and for `playwright/tsconfig.json`. Run before every
  commit; it's what CI runs.
- `pnpm preview:ci` — build and serve on port 4173. All three Playwright
  suites expect this server to already be running.
- `pnpm test:e2e`, `pnpm test:a11y`, `pnpm test:lighthouse` — the three
  Playwright projects. `pnpm pw:open` for the UI runner.

## Repo conventions

- **Package manager**: pnpm. `npm install` writes a competing
  `package-lock.json` that CI ignores.
- **package.json**: Linted in CI by `bvandrc/lint-package-json`, which
  enforces top-level key order, alphabetical `dependencies` and
  `devDependencies`, and exact-semver `version`. Adding a field in the wrong
  place, or a dependency out of order, fails the lint job.
- **Linting and formatting**: Biome is the linter *and* formatter — no
  eslint/prettier here. Style is single quotes, no semicolons, 2-space indent,
  80 columns; run `pnpm format` after making edits instead of hand-formatting,
  and `pnpm check` (format + both type checks) before every commit — it's what
  CI runs. Notable rules that are errors: `noFloatingPromises`,
  `noImportCycles`, `noShadow`, `noUndeclaredDependencies`, `noTsIgnore` — fix
  the cause, don't suppress.
- **Branch naming**: Name work branches `<type>/<slug>`, where `<type>` is a
  Conventional Commits type — `feat`, `fix`, `chore`, `refactor`, `ci`,
  `docs`, `style`, `test`, `perf`, or `build` — and `<slug>` is a short
  kebab-case description of the change. Never use a `claude/` prefix or a
  random session suffix. This overrides the branch name a session is assigned
  by default — if you were given one, rename it before the first push.
- **PR review threads**: Always reply on the thread with what changed (or why
  it wasn't changed), then mark the thread resolved. Do this for every thread
  you act on, not just the ones that needed discussion.
