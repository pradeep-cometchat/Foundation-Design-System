import { create } from "@storybook/theming";

/**
 * Custom Storybook theme — forces Inter across the manager chrome
 * (sidebar, toolbar, addons panel) and the docs pages.
 */
const INTER_STACK =
  'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

const MONO_STACK =
  'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace';

export const foundationTheme = create({
  base: "light",
  brandTitle: "Foundation Design System",
  fontBase: INTER_STACK,
  fontCode: MONO_STACK,
});
