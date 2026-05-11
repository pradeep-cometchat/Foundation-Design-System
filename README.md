# Foundation Design System

Tokens and Storybook docs for the foundation layer: colors, typography,
spacing, elevation, and focus.

## Getting started

```bash
npm install
npm run storybook
```

Storybook runs at http://localhost:6006.

## Scripts

| Command | What it does |
| ------- | ------------ |
| `npm run storybook`       | Start the Storybook dev server. |
| `npm run build-storybook` | Build the static Storybook for hosting. |
| `npm run typecheck`       | Run `tsc --noEmit` across the project. |

## Project layout

```
src/foundation/
├── tokens/        # source of truth (TS) + CSS variables
├── components/    # internal helpers used by the docs
└── stories/       # MDX intro + per-foundation stories
```

## Using tokens in app code

Via CSS variables (recommended):

```css
.button {
  background: var(--color-ep-500);
  padding: var(--space-2) var(--space-4);
  border-radius: 8px;
  box-shadow: var(--shadow-sm);
}
.button:focus-visible {
  box-shadow: var(--focus-ring-xs);
  outline: none;
}
```

Via TypeScript:

```ts
import { colors, spacing } from "@foundation/tokens";

const primary = colors.extendedPrimary[500]; // "#7b70e4"
const gap = spacing[4];                      // 16
```

## Storybook addons enabled

- **@storybook/addon-essentials** — docs, controls, actions, viewport, backgrounds, measure, outline.
- **@storybook/addon-a11y** — axe-powered accessibility panel.
- **@storybook/addon-themes** — toggle light/dark via `data-theme`.
- **@storybook/addon-designs** — link stories to Figma frames.
- **@storybook/addon-interactions** — step through play functions.
- **@storybook/addon-links** — cross-link stories.

## Known gaps (to resolve)

- Font family, numeric font weights, and line heights were referenced but
  not resolved in the current token export. Placeholders are in place; the
  stories clearly mark line-height as `TBD`.
- Border radius, border widths, opacity, z-index, breakpoints, motion, and
  icons are not yet part of the foundation.
