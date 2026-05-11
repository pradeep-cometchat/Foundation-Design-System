/**
 * Spacing tokens — 4px base scale with half-steps (2px, 6px) at the small end.
 *
 * CSS variable format: --space-<key>   e.g. --space-4 → 16px
 * The key matches the multiplier of 4px; half-steps keep their Figma name
 * (0.5 and 1.5) for parity with the design file.
 */

export const spacing = {
  0: 0,
  "0.5": 2,
  1: 4,
  "1.5": 6,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
  24: 96,
  32: 128,
  40: 160,
  48: 192,
  56: 224,
  64: 256,
  80: 320,
  96: 384,
  120: 480,
  140: 560,
  160: 640,
  180: 720,
  192: 768,
  256: 1024,
  320: 1280,
  360: 1440,
  400: 1600,
  480: 1920,
} as const;

export type SpacingToken = keyof typeof spacing;

/**
 * Spacing entries sorted by numeric value.
 *
 * JavaScript object key ordering lists integer-like strings first in numeric
 * order, then non-integer string keys in insertion order. That means plain
 * `Object.entries(spacing)` puts "0.5" and "1.5" at the bottom. Always use
 * `spacingEntries` when rendering tokens so the UI stays in true numeric
 * order.
 */
export const spacingEntries: ReadonlyArray<[SpacingToken, number]> = (
  Object.entries(spacing) as [SpacingToken, number][]
).sort(([, a], [, b]) => a - b);
