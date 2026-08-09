## Project

Starter template for React frontends, deployed to GitHub Pages by
`.github/workflows/deploy.yml`.

- **Stack**: React 18 + Vite + TypeScript, Tailwind v4, Biome, Playwright for
  e2e/a11y/Lighthouse.
- **Layout**: `src/` is the app; `playwright/` is all tests, with shared
  helpers and selectors under `playwright/support/`.
- **Base path**: Pages serves the site from a subpath, so `site.config.ts`
  holds `BASE_PATH`/`SITE_URL` and is imported by `vite.config.ts` and
  `playwright.config.ts`. In app code, build asset URLs from
  `import.meta.env.BASE_URL` (see `Header.tsx`) — a leading-slash path like
  `/logo.svg` 404s once deployed.

## Code conventions

React and TypeScript conventions live outside this file — follow both for all
app and test code:

@conventions/typescript.md — language-level TypeScript/JavaScript rules
@conventions/react.md — component, JSX, and accessibility rules

## Commands

- `pnpm dev` — dev server on port 5000. `pnpm build`, `pnpm preview`.
- `pnpm format` — Biome check/fix. `pnpm check` — the full gate: format plus
  `tsc` for the app and for `playwright/tsconfig.json`. Run before every
  commit; it's what CI runs.
- `pnpm preview:ci` — build and serve on port 4173, which is what the
  Playwright suites expect.
- `pnpm test:e2e`, `pnpm test:a11y`, `pnpm test:lighthouse` — the three
  Playwright projects, all against a running preview server. `pnpm pw:open`
  for the UI runner.

## Repo conventions

- **Package manager**: pnpm. `npm install` writes a competing
  `package-lock.json` that CI ignores.
- **package.json**: Key order is enforced in CI by
  `bvandrc/lint-package-json`. Adding a field in the wrong place fails the
  lint job.
- **Linting and formatting**: Biome is the linter *and* formatter — no
  eslint/prettier here. Style is single quotes, no semicolons, 2-space indent,
  80 columns; run `pnpm format` after making edits instead of hand-formatting,
  and `pnpm check` (format + both type checks) before every commit — it's what
  CI runs. Notable rules that are errors: `noFloatingPromises`,
  `noImportCycles`, `noShadow`, `noUndeclaredDependencies`, `noTsIgnore` — fix
  the cause, don't suppress.
- **Test ID registry**: Define every `data-testid` value in
  `playwright/support/constants/selectors.ts` before using it in a test: nest
  by component, build strings with the `testId()` helper (never a hand-written
  `[data-testid="..."]`), and name a container's own testid `SELF`.
- **Accessibility tests**: axe runs at WCAG 2.1 AA plus best-practice on
  desktop and mobile, and violations fail CI. Cover each new meaningful UI
  state with a `checkA11y(page)` scan in `playwright/a11y/`.
- **Branch naming**: Name work branches `feat/<slug>`, `fix/<slug>`, or
  `chore/<slug>`, with a short kebab-case slug describing the change. Never
  use a `claude/` prefix or a random session suffix. This overrides the branch
  name a session is assigned by default — if you were given one, rename it
  before the first push.
- **PR review threads**: Always reply on the thread with what changed (or why
  it wasn't changed), then mark the thread resolved. Do this for every thread
  you act on, not just the ones that needed discussion.
