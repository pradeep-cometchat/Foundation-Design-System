/**
 * Color tokens — extracted from Figma design tokens.
 *
 * Naming convention: <family>.<shade>
 * CSS variable:      --color-<family>-<shade>
 *
 * Scale: 25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950
 * Note:  Semantic palettes (Info / Warning / Success / Error) omit 600 in the
 *        current export. The "base" token is treated as the brand anchor.
 */

export const primaryColors = {
  primary: "#6852d6",
  white: "#ffffff",
} as const;

export const extendedPrimary = {
  25: "#fafaff",
  50: "#f4f3ff",
  100: "#ebe9fe",
  200: "#d9d6fe",
  300: "#bdb4fe",
  400: "#9b8afb",
  500: "#7b70e4",
  600: "#6852d6",
  700: "#5925dc",
  800: "#4a1fb8",
  900: "#3e1c96",
  950: "#27115f",
} as const;

export const neutralLight = {
  25: "#fdfdfd",
  50: "#fafafa",
  100: "#f5f5f5",
  200: "#e9eaeb",
  300: "#d5d7da",
  400: "#a4a7ae",
  500: "#717680",
  600: "#535862",
  700: "#414651",
  800: "#252b37",
  900: "#181d27",
  950: "#0a0d12",
} as const;

export const neutralDark = {
  25: "#fafafa",
  50: "#f7f7f7",
  100: "#f0f0f1",
  200: "#ececed",
  300: "#cecfd2",
  400: "#94979c",
  500: "#85888e",
  600: "#61656c",
  700: "#373a41",
  800: "#22262f",
  900: "#13161b",
  950: "#0c0e12",
} as const;

export const info = {
  base: "#155eef",
  25: "#f5f8ff",
  50: "#eff4ff",
  100: "#d1e0ff",
  200: "#b2ccff",
  300: "#84adff",
  400: "#528bff",
  500: "#2970ff",
  700: "#004eeb",
  800: "#0040c1",
  900: "#00359e",
  950: "#002266",
} as const;

export const warning = {
  base: "#dc6803",
  25: "#fffcf5",
  50: "#fffaeb",
  100: "#fef0c7",
  200: "#fedf89",
  300: "#fec84b",
  400: "#fdb022",
  500: "#f79009",
  700: "#b54708",
  800: "#93370d",
  900: "#7a2e0e",
  950: "#4e1d09",
} as const;

export const success = {
  base: "#079455",
  25: "#f6fef9",
  50: "#ecfdf3",
  100: "#dcfae6",
  200: "#abefc6",
  300: "#75e0a7",
  400: "#47cd89",
  500: "#17b26a",
  700: "#067647",
  800: "#085d3a",
  900: "#074d31",
  950: "#053321",
} as const;

export const error = {
  base: "#d92d20",
  25: "#fffbfa",
  50: "#fef3f2",
  100: "#fee4e2",
  200: "#fecdca",
  300: "#fda29b",
  400: "#f97066",
  500: "#f04438",
  700: "#b42318",
  800: "#912018",
  900: "#7a271a",
  950: "#55160c",
} as const;

export const colors = {
  primary: primaryColors,
  extendedPrimary,
  neutralLight,
  neutralDark,
  info,
  warning,
  success,
  error,
} as const;

export type ColorFamily = keyof typeof colors;
export type ColorShade<F extends ColorFamily> = keyof (typeof colors)[F];
