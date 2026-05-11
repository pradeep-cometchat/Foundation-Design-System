/**
 * Typography tokens.
 *
 * Font family is not yet resolved from Figma — a system stack is used as a
 * placeholder until the brand font is confirmed. Line heights are absolute
 * values in pixels, matching the Figma tokens.
 */

export const fontSize = {
  0: 10,
  1: 12,
  2: 14,
  3: 16,
  4: 18,
  5: 20,
  6: 24,
  7: 32,
} as const;

/**
 * Absolute line-height values (in pixels) per semantic text style.
 * Source: Figma Line Height tokens.
 */
export const lineHeight = {
  title: 40,
  h1: 32,
  h2: 30,
  h3: 28,
  h4: 24,
  body: 20,
  caption1: 18,
  caption2: 16,
} as const;

export type LineHeightToken = keyof typeof lineHeight;

export type FontSizeToken = keyof typeof fontSize;

export const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export type FontWeightToken = keyof typeof fontWeight;

export const letterSpacing = {
  0: "0%",
} as const;

export const textCase = { none: "none" } as const;
export const textDecoration = { none: "none", underline: "underline" } as const;

/**
 * Semantic text styles.
 * - `sizeKey` points to a `fontSize` step.
 * - `lineHeightKey` points to a `lineHeight` token.
 */
export type TextStyle = {
  name: string;
  sizeKey: FontSizeToken;
  sizePx: number;
  lineHeightKey: LineHeightToken;
  lineHeightPx: number;
  weights: FontWeightToken[];
  decoration?: keyof typeof textDecoration;
};

const makeStyle = (
  name: string,
  sizeKey: FontSizeToken,
  lineHeightKey: LineHeightToken,
  weights: FontWeightToken[] = ["bold", "semibold", "medium", "regular"],
  decoration?: keyof typeof textDecoration
): TextStyle => ({
  name,
  sizeKey,
  sizePx: fontSize[sizeKey],
  lineHeightKey,
  lineHeightPx: lineHeight[lineHeightKey],
  weights,
  decoration,
});

export const textStyles = {
  title: makeStyle("Title", 7, "title"),
  h1: makeStyle("Heading 1", 6, "h1"),
  h2: makeStyle("Heading 2", 5, "h2"),
  h3: makeStyle("Heading 3", 4, "h3"),
  h4: makeStyle("Heading 4", 3, "h4"),
  body: makeStyle("Body", 2, "body"),
  caption1: makeStyle("Caption 1", 1, "caption1"),
  caption2: makeStyle("Caption 2", 0, "caption2"),
  button: makeStyle("Button", 2, "body"),
  link: makeStyle("Link", 2, "body", ["regular"], "underline"),
} satisfies Record<string, TextStyle>;

export type TextStyleKey = keyof typeof textStyles;
