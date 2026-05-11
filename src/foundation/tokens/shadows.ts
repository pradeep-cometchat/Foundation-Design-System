/**
 * Elevation and focus-ring tokens.
 *
 * Each elevation may stack multiple drop shadows. The `css` field is the
 * ready-to-use `box-shadow` string.
 */

export type ShadowLayer = {
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
};

export type ShadowToken = {
  name: string;
  layers: ShadowLayer[];
  css: string;
  description?: string;
};

const compose = (layers: ShadowLayer[]): string =>
  layers
    .map((l) => `${l.x}px ${l.y}px ${l.blur}px ${l.spread}px ${l.color}`)
    .join(", ");

const xsLayers: ShadowLayer[] = [
  { x: 0, y: 1, blur: 2, spread: 0, color: "#0a0d120d" },
];
const smLayers: ShadowLayer[] = [
  { x: 0, y: 1, blur: 3, spread: 0, color: "#0a0d121a" },
  { x: 0, y: 1, blur: 2, spread: 0, color: "#0a0d120f" },
];
const mdLayers: ShadowLayer[] = [
  { x: 0, y: 4, blur: 6, spread: -1, color: "#0a0d121a" },
  { x: 0, y: 2, blur: 4, spread: -2, color: "#0a0d120f" },
];
const lgLayers: ShadowLayer[] = [
  { x: 0, y: 12, blur: 16, spread: -4, color: "#0a0d1214" },
  { x: 0, y: 4, blur: 6, spread: -2, color: "#0a0d1208" },
  { x: 0, y: 2, blur: 2, spread: -1, color: "#0a0d120a" },
];
const xlLayers: ShadowLayer[] = [
  { x: 0, y: 20, blur: 24, spread: -4, color: "#10182814" },
  { x: 0, y: 8, blur: 8, spread: -4, color: "#10182808" },
  { x: 0, y: 3, blur: 3, spread: -1.5, color: "#0a0d120a" },
];

export const shadows: Record<string, ShadowToken> = {
  xs: { name: "shadow-xs", layers: xsLayers, css: compose(xsLayers) },
  sm: { name: "shadow-sm", layers: smLayers, css: compose(smLayers) },
  md: { name: "shadow-md", layers: mdLayers, css: compose(mdLayers) },
  lg: { name: "shadow-lg", layers: lgLayers, css: compose(lgLayers) },
  xl: { name: "shadow-xl", layers: xlLayers, css: compose(xlLayers) },
};

const focusRingLayers: ShadowLayer[] = [
  { x: 0, y: 1, blur: 2, spread: 0, color: "#0a0d120d" },
  { x: 0, y: 0, blur: 0, spread: 2, color: "#ffffff" },
  { x: 0, y: 0, blur: 0, spread: 4, color: "#7b70e4" },
];

const focusRingErrorLayers: ShadowLayer[] = [
  { x: 0, y: 1, blur: 2, spread: 0, color: "#0a0d120d" },
  { x: 0, y: 0, blur: 0, spread: 2, color: "#ffffff" },
  { x: 0, y: 0, blur: 0, spread: 4, color: "#f04438" },
];

export const focusRings: Record<string, ShadowToken> = {
  default: {
    name: "focus-ring-xs",
    layers: focusRingLayers,
    css: compose(focusRingLayers),
    description:
      "Focus state for components that also carry an elevation. For example, buttons and tabs.",
  },
  error: {
    name: "focus-ring-error-xs",
    layers: focusRingErrorLayers,
    css: compose(focusRingErrorLayers),
    description:
      "Destructive or error focus state. For example, destructive buttons.",
  },
};

export type ShadowKey = keyof typeof shadows;
export type FocusRingKey = keyof typeof focusRings;
