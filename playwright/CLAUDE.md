## Tests

All Playwright tests, split by project: `e2e/`, `a11y/`, `lighthouse/`, with
shared helpers and selectors under `support/`. Type checking for this
directory uses `playwright/tsconfig.json`, which `pnpm check` runs alongside
the app's.

Test conventions are shared across projects and live outside this file:

@../conventions/playwright.md — test-ID registry and accessibility scans

## Commands

- `pnpm preview:ci` — build and serve on port 4173. All three suites expect
  this server to already be running.
- `pnpm test:e2e`, `pnpm test:a11y`, `pnpm test:lighthouse` — the three
  Playwright projects. `pnpm pw:open` for the UI runner.
