
## Conventions

- **Package manager**: pnpm. `npm install` writes a competing `package-lock.json` that CI ignores.
- **File naming**: kebab-case for utils (`auth-utils.ts`), PascalCase for component primitives (`DropdownMenu.tsx`), camelCase for hooks (`useSession.tsx`, `useSettings.ts`); use `.tsx` when the file exports JSX.
- **Components**: Arrow-function `const` with a named export; no default exports.
- **Variant styling**: Map variants to classes in a module-level constant (`satisfies Record<Variant, string>`) and index into it — not conditionals inside JSX. See `VARIANT_CLASSES` in `Button.tsx`, `TONE_CLASSES` in `Badge.tsx`.
- **Tailwind sizing**: Use `size-X` Tailwind class, not `w-X h-X`.
- **Constant objects**: UPPER_CASE for names, UPPER_CASE for keys that name entries (namespace/enum-style, e.g. `ROUTES.HOME`, `SELECTORS.TASK_FORM.SUBMIT_BTN`), camelCase for keys that are typed properties of an entry (e.g. `color`, `icon` in `FEATURES`) and for function-valued keys (e.g. `SELECTORS.TASK_CARD.rankFieldBadge(field)`).
- **Comments/JSDoc**: Describe *what* and *why* from the caller's perspective. Don't restate implementation. Keep to 1–2 lines. No hedge prefixes. Don't repeat what the type signature conveys.
- **es-toolkit**: Use `es-toolkit`functions when simpler than using builtin functions-- especially `omit`/`pick`.
- **usehooks-ts**: Keep in mind that we can use this package for hooks.
- **Formatting**: Run `pnpm format` after making edits. Run `pnpm check` (format + both type checks) before every commit — it's what CI runs.
- **Test IDs**: Use `data-testid` as the HTML attribute and as the prop name in component interfaces (not `testId`). Define every value in `playwright/support/constants/selectors.ts` before using it in a test: nest by component, build strings with the `testId()` helper (never a hand-written `[data-testid="..."]`), and name a container's own testid `SELF`.
- **Accessible names**: If an `aria-label`'s value would just repeat text already visible in a nearby element (e.g. a row label, column header, or adjacent title), use `aria-labelledby` pointing at that existing element's `id` (add one via React's `useId` if it doesn't have one) instead of duplicating the string. Note: Don't introduce a new `sr-only` element just to make this work — if there's no existing visible text to point to, a plain `aria-label` is fine.
- **Accessibility tests**: axe runs at WCAG 2.1 AA plus best-practice on desktop and mobile, and violations fail CI. Cover each new meaningful UI state with a `checkA11y(page)` scan in `playwright/a11y/`.
- **Branch naming**: Name work branches `feat/<slug>`, `fix/<slug>`, or `chore/<slug>`, with a short kebab-case slug describing the change. Never use a `claude/` prefix or a random session suffix. This overrides the branch name a session is assigned by default — if you were given one, rename it before the first push.
- **PR review threads**: Always reply on the thread with what changed (or why it wasn't changed), then mark the thread resolved. Do this for every thread you act on, not just the ones that needed discussion.
