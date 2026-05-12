import type { ReactNode, ButtonHTMLAttributes } from "react";

/**
 * Button hierarchy (visual weight).
 * Maps to Figma: Primary, Secondary, Tertiary, Link color, Link gray.
 */
export type ButtonHierarchy =
  | "primary"
  | "secondary"
  | "tertiary"
  | "link-color"
  | "link-gray";

/**
 * Destructive variants share the same hierarchy scale but with error colors.
 */
export type ButtonDestructiveHierarchy =
  | "destructive-primary"
  | "destructive-secondary"
  | "destructive-tertiary"
  | "destructive-link";

export type ButtonVariant = ButtonHierarchy | ButtonDestructiveHierarchy;

/**
 * Size presets from Figma.
 * sm=36px, md=40px, lg=44px, xl=48px.
 */
export type ButtonSize = "sm" | "md" | "lg" | "xl";

/**
 * Interactive states (managed internally via CSS, exposed for stories).
 */
export type ButtonState = "default" | "hover" | "focused" | "disabled" | "loading";

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /** Visual hierarchy. Default: "primary". */
  variant?: ButtonVariant;
  /** Size preset. Default: "md". */
  size?: ButtonSize;
  /** Button label. Required unless `iconOnly` is true. */
  children?: ReactNode;
  /** Show a loading spinner and disable interaction. */
  loading?: boolean;
  /** Icon placed before the label. */
  iconLeft?: ReactNode;
  /** Icon placed after the label. */
  iconRight?: ReactNode;
  /** Render as icon-only (no label, square aspect). */
  iconOnly?: boolean;
  /** Render as full-width. */
  fullWidth?: boolean;
}
