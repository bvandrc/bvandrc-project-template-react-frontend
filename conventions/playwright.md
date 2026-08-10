# Playwright conventions

Builds on the language-level rules in `./typescript.md` — follow those too.

- **Test ID registry**: Define every `data-testid` value in
  `playwright/support/constants/selectors.ts` before using it in a test: nest
  by component, build strings with the `testId()` helper (never a hand-written
  `[data-testid="..."]`), and name a container's own testid `SELF`.
- **Accessibility tests**: axe runs at WCAG 2.1 AA plus best-practice on
  desktop and mobile, and violations fail CI. Cover each new meaningful UI
  state with a `checkA11y(page)` scan in `playwright/a11y/`.
