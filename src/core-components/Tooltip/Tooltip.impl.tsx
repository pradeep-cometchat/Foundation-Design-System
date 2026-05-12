import React from "react";
import type { TooltipProps } from "./Tooltip.types";
import "./Tooltip.css";

/**
 * Tooltip — a small popup that shows contextual information on hover.
 */
export const Tooltip: React.FC<TooltipProps> = ({
  title,
  supportingText,
  arrow = "top-center",
  children,
  open = false,
  className,
}) => {
  const posClass =
    arrow === "left"
      ? "tooltip--left-pos"
      : arrow === "right"
      ? "tooltip--right-pos"
      : `tooltip--${arrow}`;

  const tooltipClasses = [
    "tooltip",
    posClass,
    supportingText && "tooltip--has-supporting",
    open && "tooltip--open",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="tooltip-wrap">
      {children}
      <div className={tooltipClasses} role="tooltip">
        <div className="tooltip__content">
          <div className="tooltip__title">{title}</div>
          {supportingText && (
            <div className="tooltip__supporting">{supportingText}</div>
          )}
        </div>
        {arrow !== "none" && <span className="tooltip__arrow" />}
      </div>
    </div>
  );
};
