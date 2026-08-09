## Tests

All Playwright tests, split by project: `e2e/`, `a11y/`, `lighthouse/`, with
shared helpers and selectors under `support/`. Type checking for this
directory uses `playwright/tsconfig.json`, which `pnpm check` runs alongside
the app's.

## Commands

- `pnpm preview:ci` — build and serve on port 4173. All three suites expect
  this server to already be running.
- `pnpm test:e2e`, `pnpm test:a11y`, `pnpm test:lighthouse` — the three
  Playwright projects. `pnpm pw:open` for the UI runner.

## Conventions

- **Test ID registry**: Define every `data-testid` value in
  `support/constants/selectors.ts` before using it in a test: nest by
  component, build strings with the `testId()` helper (never a hand-written
  `[data-testid="..."]`), and name a container's own testid `SELF`.
- **Accessibility tests**: axe runs at WCAG 2.1 AA plus best-practice on
  desktop and mobile, and violations fail CI. Cover each new meaningful UI
  state with a `checkA11y(page)` scan in `a11y/`.
