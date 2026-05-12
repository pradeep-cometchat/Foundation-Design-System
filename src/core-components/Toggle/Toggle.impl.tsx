import React from "react";
import type { ToggleProps } from "./Toggle.types";
import "./Toggle.css";

/**
 * Toggle / Switch — a binary on/off control.
 *
 * Two sizes: sm (36×20 track, 16px thumb), md (44×24 track, 20px thumb).
 * Optional label and description text.
 * States: default, hover, focus, disabled.
 *
 * @example
 * ```tsx
 * <Toggle pressed={on} onChange={setOn} label="Remember me" description="Save my login details." />
 * ```
 */
export const Toggle: React.FC<ToggleProps> = ({
  pressed = false,
  onChange,
  size = "md",
  label,
  description,
  disabled = false,
  className,
}) => {
  const handleClick = () => {
    if (!disabled) onChange?.(!pressed);
  };

  const wrapClasses = [
    "toggle",
    disabled && "toggle--disabled",
    className,
  ].filter(Boolean).join(" ");

  const trackClasses = [
    "toggle__track",
    `toggle__track--${size}`,
    pressed && "toggle__track--pressed",
  ].filter(Boolean).join(" ");

  return (
    <div className={wrapClasses} onClick={handleClick}>
      <button
        type="button"
        role="switch"
        aria-checked={pressed}
        aria-label={label ?? "Toggle"}
        disabled={disabled}
        className={trackClasses}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
          }
        }}
      >
        <span className={`toggle__thumb toggle__thumb--${size}`} />
      </button>
      {(label || description) && (
        <div className="toggle__text">
          {label && <span className="toggle__label">{label}</span>}
          {description && <span className="toggle__description">{description}</span>}
        </div>
      )}
    </div>
  );
};
