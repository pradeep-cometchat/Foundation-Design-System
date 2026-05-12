import React from "react";
import type { LabelProps } from "./Label.types";
import "./Label.css";

/**
 * Label (Badge) — a small status indicator or tag.
 *
 * Three shapes: badge (rounded rect), pill (full radius), modern (white bg).
 * Five semantic colors: brand, gray, error, success, warning.
 * Two sizes: sm (22px), md (24px).
 * Optional avatar slot and dismissible close button.
 *
 * @example
 * ```tsx
 * <Label color="success">Active</Label>
 * <Label type="pill" color="brand" size="md">New</Label>
 * <Label color="error" onClose={() => {}}>Failed</Label>
 * ```
 */
export const Label: React.FC<LabelProps> = ({
  children,
  type = "badge",
  color = "gray",
  size = "sm",
  avatar,
  onClose,
  className,
}) => {
  const classes = [
    "label",
    `label--${type}`,
    `label--${color}`,
    `label--${size}`,
    avatar && "label--has-avatar",
    onClose && "label--has-close",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes}>
      {avatar && <span className="label__avatar">{avatar}</span>}
      <span className="label__text">{children}</span>
      {onClose && (
        <button
          type="button"
          className="label__close"
          onClick={onClose}
          aria-label="Dismiss"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path
              d="M9 3L3 9M3 3l6 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </span>
  );
};
