## Commands

- `pnpm dev` — dev server on port 5000.
- `pnpm check` — format + both type checks. Run before every commit; it's what CI runs.
- `pnpm preview:ci` — build and serve on port 4173, which is what the Playwright suites expect.
- `pnpm test:e2e` / `pnpm test:a11y` / `pnpm test:lighthouse` — the three suites, against a running preview server.

## Conventions

- **Package manager**: pnpm. `npm install` writes a competing `package-lock.json` that CI ignores.
- **package.json**: Key order is enforced in CI by `bvandrc/lint-package-json`. Adding a field in the wrong place fails the lint job.
- **Base path**: The site is served from a GitHub Pages subpath, not the domain root — `BASE_PATH` and `SITE_URL` in `site.config.ts` are the single source for it, consumed by `vite.config.ts`, `playwright.config.ts`, and CI. Build runtime asset URLs with `import.meta.env.BASE_URL` (see `Header.tsx`); a root-absolute `/logo.svg` 404s in production.
- **File naming**: kebab-case for utils (`auth-utils.ts`), PascalCase for component primitives (`DropdownMenu.tsx`), camelCase for hooks (`useSession.tsx`, `useSettings.ts`); use `.tsx` when the file exports JSX.
- **Components**: Arrow-function `const` with a named export; no default exports, unless something requires one (e.g. page components for lazy-loaded routes).
- **Variant styling**: Map variants to classes in a module-level constant (`satisfies Record<Variant, string>`) and index into it — not conditionals inside JSX. See `VARIANT_CLASSES` in `Button.tsx`, `TONE_CLASSES` in `Badge.tsx`.
- **Tailwind sizing**: Use `size-X` Tailwind class, not `w-X h-X`.
- **Theme tokens**: Tailwind v4 with no `tailwind.config.js` — the palette lives in the `@theme` block in `src/styles/index.css`. Style with the semantic tokens it defines (`bg-surface`, `text-ink-muted`, `border-border`, `text-accent`) rather than stock palette classes like `bg-slate-800`, and add a new token there instead of hardcoding a hex.
- **Conditional classes**: `classNames` from `classnames`. There is no `cn`/`clsx` helper — don't add one.
- **Constant objects**: UPPER_CASE for names, UPPER_CASE for keys that name entries (namespace/enum-style, e.g. `ROUTES.HOME`, `SELECTORS.TASK_FORM.SUBMIT_BTN`), camelCase for keys that are typed properties of an entry (e.g. `color`, `icon` in `FEATURES`) and for function-valued keys (e.g. `SELECTORS.TASK_CARD.rankFieldBadge(field)`).
- **Enums**: String enums with each member initialized to its own key (`STABLE = 'STABLE'`), as in `FeatureStatus` — Biome's `useEnumInitializers` rejects implicit numeric members.
- **Comments/JSDoc**: Describe *what* and *why* from the caller's perspective. Don't restate implementation. Keep to 1–2 lines. No hedge prefixes. Don't repeat what the type signature conveys.
- **es-toolkit**: Use `es-toolkit`functions when simpler than using builtin functions-- especially `omit`/`pick`.
- **usehooks-ts**: Keep in mind that we can use this package for hooks.
- **Formatting**: Run `pnpm format` after making edits. Run `pnpm check` (format + both type checks) before every commit — it's what CI runs.
- **Linting**: Biome is the only linter and formatter (`biome.jsonc`) — never add ESLint or Prettier. `pnpm format` won't fix everything: `noFloatingPromises`, `noShadow`, `noImportCycles`, `noTsIgnore`, and `useAwait` are errors you have to resolve by hand. Suppress only with `biome-ignore <rule>: <reason>`; the reason is required and should say why, not what.
- **Tests**: Playwright is the only test layer — there's no unit runner, so don't reach for Vitest or Jest. Suites are scoped by directory (`playwright/e2e`, `/a11y`, `/lighthouse`) and run against the built output on the preview server, not `pnpm dev`.
- **Test IDs**: Use `data-testid` as the HTML attribute and as the prop name in component interfaces (not `testId`). Define every value in `playwright/support/constants/selectors.ts` before using it in a test: nest by component, build strings with the `testId()` helper (never a hand-written `[data-testid="..."]`), and name a container's own testid `SELF`.
- **Accessible names**: If an `aria-label`'s value would just repeat text already visible in a nearby element (e.g. a row label, column header, or adjacent title), use `aria-labelledby` pointing at that existing element's `id` (add one via React's `useId` if it doesn't have one) instead of duplicating the string. Note: Don't introduce a new `sr-only` element just to make this work — if there's no existing visible text to point to, a plain `aria-label` is fine.
- **Accessibility tests**: axe runs at WCAG 2.1 AA plus best-practice on desktop and mobile, and violations fail CI. Cover each new meaningful UI state with a `checkA11y(page)` scan in `playwright/a11y/`.
- **Branch naming**: Name work branches `feat/<slug>`, `fix/<slug>`, or `chore/<slug>`, with a short kebab-case slug describing the change. Never use a `claude/` prefix or a random session suffix. This overrides the branch name a session is assigned by default — if you were given one, rename it before the first push.
- **PR review threads**: Always reply on the thread with what changed (or why it wasn't changed), then mark the thread resolved. Do this for every thread you act on, not just the ones that needed discussion.
