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

## Conventions

- **Package manager**: pnpm. `npm install` writes a competing `package-lock.json` that CI ignores.
- **package.json**: Key order is enforced in CI by `bvandrc/lint-package-json`. Adding a field in the wrong place fails the lint job.
- **File naming**: kebab-case for utils (`auth-utils.ts`), PascalCase for component primitives (`DropdownMenu.tsx`), camelCase for hooks (`useSession.tsx`, `useSettings.ts`); use `.tsx` when the file exports JSX.
- **Components**: Arrow-function `const` with a named export; no default exports, unless something requires one (e.g. page components for lazy-loaded routes).
- **Prop types**: Compose from DOM prop types — extend them, or `Pick`/`Omit`
  the parts you need — and spread the rest onto the element (see `Button.tsx`)
  rather than re-declaring `className`, `type`, `href`, etc. Use `import type`
  for type-only imports.
- **Variant styling**: Map variants to classes in a module-level constant (`satisfies Record<Variant, string>`) and index into it — not conditionals inside JSX. See `VARIANT_CLASSES` in `Button.tsx`, `TONE_CLASSES` in `Badge.tsx`.
- **Styling**: Tailwind v4 is configured **in CSS** — `@theme` and friends in
  `src/styles/index.css`. There is no `tailwind.config.js` and none should be
  added. New design tokens (colors, fonts, shadows) go in `@theme`.
- **Theme tokens over stock palette**: Use the semantic tokens
  (`bg-canvas`, `bg-surface`, `text-ink`, `text-ink-muted`, `border-border`,
  `bg-accent`) rather than stock Tailwind colors like `bg-slate-900`, so a
  palette change stays a one-file edit.
- **Conditional classes**: Use `classnames` (imported as `classNames`), not
  template-literal concatenation.
- **Tailwind sizing**: Use `size-X` Tailwind class, not `w-X h-X`.
- **Constant objects**: UPPER_CASE for names, UPPER_CASE for keys that name entries (namespace/enum-style, e.g. `ROUTES.HOME`, `SELECTORS.TASK_FORM.SUBMIT_BTN`), camelCase for keys that are typed properties of an entry (e.g. `color`, `icon` in `FEATURES`) and for function-valued keys (e.g. `SELECTORS.TASK_CARD.rankFieldBadge(field)`).
- **Comments/JSDoc**: Describe *what* and *why* from the caller's perspective. Don't restate implementation. Keep to 1–2 lines. No hedge prefixes. Don't repeat what the type signature conveys.
- **es-toolkit**: Use `es-toolkit`functions when simpler than using builtin functions-- especially `omit`/`pick`.
- **usehooks-ts**: Keep in mind that we can use this package for hooks.
- **Linting**: Biome is the linter *and* formatter — no eslint/prettier here.
  Style is single quotes, no semicolons, 2-space indent, 80 columns; let
  `pnpm format` apply it instead of hand-formatting. Notable rules that are
  errors: `noFloatingPromises`, `noImportCycles`, `noShadow`,
  `noUndeclaredDependencies`, `noTsIgnore` — fix the cause, don't suppress.
- **Formatting**: Run `pnpm format` after making edits. Run `pnpm check` (format + both type checks) before every commit — it's what CI runs.
- **Test IDs**: Use `data-testid` as the HTML attribute and as the prop name in component interfaces (not `testId`). Define every value in `playwright/support/constants/selectors.ts` before using it in a test: nest by component, build strings with the `testId()` helper (never a hand-written `[data-testid="..."]`), and name a container's own testid `SELF`.
- **Accessible names**: If an `aria-label`'s value would just repeat text already visible in a nearby element (e.g. a row label, column header, or adjacent title), use `aria-labelledby` pointing at that existing element's `id` (add one via React's `useId` if it doesn't have one) instead of duplicating the string. Note: Don't introduce a new `sr-only` element just to make this work — if there's no existing visible text to point to, a plain `aria-label` is fine.
- **Accessibility tests**: axe runs at WCAG 2.1 AA plus best-practice on desktop and mobile, and violations fail CI. Cover each new meaningful UI state with a `checkA11y(page)` scan in `playwright/a11y/`.
- **Branch naming**: Name work branches `feat/<slug>`, `fix/<slug>`, or `chore/<slug>`, with a short kebab-case slug describing the change. Never use a `claude/` prefix or a random session suffix. This overrides the branch name a session is assigned by default — if you were given one, rename it before the first push.
- **PR review threads**: Always reply on the thread with what changed (or why it wasn't changed), then mark the thread resolved. Do this for every thread you act on, not just the ones that needed discussion.
