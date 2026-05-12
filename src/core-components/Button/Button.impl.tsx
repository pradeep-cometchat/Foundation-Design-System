import React from "react";
import type { ButtonProps } from "./Button.types";
import "./Button.css";

/**
 * Button — the primary interactive element.
 *
 * Built from Figma specs (160 variants). Uses foundation design tokens
 * for colors, spacing, radius, shadows, focus rings, and typography.
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md">Save changes</Button>
 * <Button variant="secondary" size="sm" iconLeft={<Icon name="add" />}>Add item</Button>
 * <Button variant="destructive-primary" loading>Deleting...</Button>
 * ```
 */
export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  loading = false,
  iconLeft,
  iconRight,
  iconOnly = false,
  fullWidth = false,
  disabled,
  className,
  ...rest
}) => {
  const classes = [
    "btn",
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth && "btn--full",
    iconOnly && "btn--icon-only",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      aria-label={iconOnly && typeof children === "string" ? children : undefined}
      {...rest}
    >
      {loading && <span className="btn__spinner" aria-hidden />}
      {!loading && iconLeft && (
        <span className="btn__icon btn__icon--left" aria-hidden>
          {iconLeft}
        </span>
      )}
      {!iconOnly && !loading && (
        <span className="btn__label">{children}</span>
      )}
      {iconOnly && !loading && children}
      {!loading && iconRight && (
        <span className="btn__icon btn__icon--right" aria-hidden>
          {iconRight}
        </span>
      )}
    </button>
  );
};
