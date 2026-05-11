/**
 * Backdrop blur tokens — translucent surfaces for panels, sheets, and
 * floating UI placed over content (photos, video, or colored backgrounds).
 *
 * Each token is a *pair*: a light-theme tint and a dark-theme tint. The tint
 * color and opacity stay the same across sizes; only the blur radius changes.
 * Consumers should apply `backdrop-filter: blur(<radius>)` along with the
 * corresponding background color.
 *
 * CSS variable shape:
 *   --backdrop-blur-<size>            → e.g. "8px"
 *   --backdrop-bg-light               → rgba(255,255,255,0.6)
 *   --backdrop-bg-dark                → rgba(0,0,0,0.6)
 */

export type BackdropBlurSize = "sm" | "md" | "lg" | "xl";

export type BackdropBlurTheme = "light" | "dark";

export interface BackdropBlurToken {
  size: BackdropBlurSize;
  /** Blur radius in pixels. */
  blur: number;
  /** Shared across light & dark themes. */
  opacity: number;
  /** Per-theme tint color (hex). */
  tint: Record<BackdropBlurTheme, string>;
}

const SHARED_OPACITY = 0.6;
const LIGHT_TINT = "#ffffff";
const DARK_TINT = "#000000";

export const backdropBlur: Record<BackdropBlurSize, BackdropBlurToken> = {
  sm: {
    size: "sm",
    blur: 8,
    opacity: SHARED_OPACITY,
    tint: { light: LIGHT_TINT, dark: DARK_TINT },
  },
  md: {
    size: "md",
    blur: 16,
    opacity: SHARED_OPACITY,
    tint: { light: LIGHT_TINT, dark: DARK_TINT },
  },
  lg: {
    size: "lg",
    blur: 24,
    opacity: SHARED_OPACITY,
    tint: { light: LIGHT_TINT, dark: DARK_TINT },
  },
  xl: {
    size: "xl",
    blur: 40,
    opacity: SHARED_OPACITY,
    tint: { light: LIGHT_TINT, dark: DARK_TINT },
  },
};

/**
 * Convert a hex color + opacity to an rgba() string.
 */
export const hexToRgba = (hex: string, opacity: number): string => {
  const h = hex.replace("#", "");
  const value =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  const int = parseInt(value, 16);
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const backdropBlurOrder: BackdropBlurSize[] = ["sm", "md", "lg", "xl"];
