/**
 * Border radius tokens.
 *
 * Rounding scale from `none` through `4xl`, plus `full` for pills & circles.
 * Values are in pixels; the rem value is provided for reference only.
 *
 * CSS variable: `--radius-<key>`   e.g. `var(--radius-md)` → 8px
 */

export const radius = {
  none: 0,
  xxs: 2,
  xs: 4,
  sm: 6,
  md: 8,
  lg: 10,
  xl: 12,
  "2xl": 16,
  "3xl": 20,
  "4xl": 24,
  full: 9999,
} as const;

export type RadiusToken = keyof typeof radius;

/** Fixed display order (matches the design file, not key iteration order). */
export const radiusOrder: RadiusToken[] = [
  "none",
  "xxs",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "4xl",
  "full",
];

/**
 * Convert px → rem using a 16px base. Used in docs only; app code should
 * consume the CSS variable directly.
 */
export const pxToRem = (px: number): string =>
  px === 0 ? "0rem" : `${(px / 16).toFixed(3).replace(/\.?0+$/, "")}rem`;
