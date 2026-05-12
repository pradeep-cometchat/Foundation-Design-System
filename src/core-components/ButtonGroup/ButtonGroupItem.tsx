import React from "react";
import type { ButtonGroupItemProps } from "./ButtonGroup.types";

/**
 * Individual item within a ButtonGroup.
 */
export const ButtonGroupItem: React.FC<ButtonGroupItemProps> = ({
  children,
  current = false,
  icon,
  iconOnly = false,
  disabled,
  className,
  ...rest
}) => {
  const classes = [
    "btn-group__item",
    current && "btn-group__item--current",
    icon && !iconOnly && "btn-group__item--has-icon",
    iconOnly && "btn-group__item--icon-only",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={classes}
      disabled={disabled}
      aria-pressed={current}
      aria-label={iconOnly && typeof children === "string" ? children : undefined}
      {...rest}
    >
      {icon && (
        <span className="btn-group__icon" aria-hidden>
          {icon}
        </span>
      )}
      {!iconOnly && children}
      {iconOnly && !icon && children}
    </button>
  );
};
