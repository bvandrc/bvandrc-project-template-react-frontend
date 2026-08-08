
## Conventions

- **Package manager**: pnpm. Never `npm`/`yarn` — the repo pins `packageManager` and CI installs with pnpm.
- **File naming**: kebab-case for utils (`auth-utils.ts`), PascalCase for component primitives (`DropdownMenu.tsx`), camelCase for hooks (`useSession.tsx`, `useSettings.ts`); use `.tsx` when the file exports JSX.
- **Components**: Arrow-function `const` with a named export; no default exports. Type props as an `interface` extending the DOM attributes type (e.g. `ButtonHTMLAttributes<HTMLButtonElement>`) and spread `...props` onto the root element so `className` and `data-testid` pass through. Primitives merge the incoming `className` last via `classnames`.
- **Variant styling**: Map variants to classes in a module-level constant (`satisfies Record<Variant, string>`) and index into it — not conditionals inside JSX. See `VARIANT_CLASSES` in `Button.tsx`, `TONE_CLASSES` in `Badge.tsx`.
- **Theme tokens**: Colors come from the `@theme` block in `src/styles/index.css` (`canvas`, `surface`, `border`, `ink`, `ink-muted`, `accent`, `accent-hover`, `accent-ink`, `tone-*`). Use those token classes; never stock Tailwind palette classes like `text-gray-500`. The app is dark-only, so a stock class breaks the design silently. Add a token rather than a raw hex.
- **Tailwind sizing**: Use `size-X` Tailwind class, not `w-X h-X`.
- **Class merging**: Use `classnames`. Don't add `clsx` or `tailwind-merge`.
- **Base path**: The site is served from a subpath, so `BASE_PATH`/`SITE_URL` in `site.config.ts` are the single source of truth for `vite.config.ts`, `playwright.config.ts`, and CI. Reference `public/` assets as `` `${import.meta.env.BASE_URL}logo.svg` ``. A leading-slash path builds fine locally and 404s only once deployed.
- **Constant objects**: UPPER_CASE for names, UPPER_CASE for keys that name entries (namespace/enum-style, e.g. `ROUTES.HOME`, `SELECTORS.TASK_FORM.SUBMIT_BTN`), camelCase for keys that are typed properties of an entry (e.g. `color`, `icon` in `FEATURES`) and for function-valued keys (e.g. `SELECTORS.TASK_CARD.rankFieldBadge(field)`).
- **Enums**: String enums whose value repeats the key (`STABLE = 'STABLE'`); initializers are required. Key lookup tables off the enum with computed members (`[FeatureStatus.STABLE]: 'positive'`).
- **Comments/JSDoc**: Describe *what* and *why* from the caller's perspective. Don't restate implementation. Keep to 1–2 lines. No hedge prefixes. Don't repeat what the type signature conveys.
- **es-toolkit**: Use `es-toolkit`functions when simpler than using builtin functions-- especially `omit`/`pick`.
- **usehooks-ts**: Keep in mind that we can use this package for hooks.
- **Tooling**: Biome is the only formatter/linter — no ESLint, no Prettier. `noUndeclaredDependencies` is an error, so anything imported needs a `package.json` entry. `noTsIgnore` is an error; fix the type instead of suppressing it.
- **Formatting**: Run `pnpm format` after making edits. Run `pnpm check` (format + both type checks) before every commit — it's what CI runs.
- **Test IDs**: Use `data-testid` as the HTML attribute and as the prop name in component interfaces (not `testId`). Define every value in `playwright/support/constants/selectors.ts` before using it in a test: nest by component, build strings with the `testId()` helper (never a hand-written `[data-testid="..."]`), and name a container's own testid `SELF`.
- **Accessible names**: If an `aria-label`'s value would just repeat text already visible in a nearby element (e.g. a row label, column header, or adjacent title), use `aria-labelledby` pointing at that existing element's `id` (add one via React's `useId` if it doesn't have one) instead of duplicating the string. Note: Don't introduce a new `sr-only` element just to make this work — if there's no existing visible text to point to, a plain `aria-label` is fine.
- **Accessibility tests**: axe runs at WCAG 2.1 AA plus best-practice on desktop and mobile, and violations fail CI. Cover each new meaningful UI state with a `checkA11y(page)` scan in `playwright/a11y/`.
- **Running Playwright locally**: The suites target `vite preview`, not the dev server. Run `pnpm build`, start `pnpm preview:ci` in a separate shell, then run the test script.
- **Branch naming**: Name work branches `feat/<slug>`, `fix/<slug>`, or `chore/<slug>`, with a short kebab-case slug describing the change. Never use a `claude/` prefix or a random session suffix. This overrides the branch name a session is assigned by default — if you were given one, rename it before the first push.
- **PR review threads**: Always reply on the thread with what changed (or why it wasn't changed), then mark the thread resolved. Do this for every thread you act on, not just the ones that needed discussion.
