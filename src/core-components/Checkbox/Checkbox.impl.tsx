import React from "react";
import type { CheckboxProps } from "./Checkbox.types";
import "./Checkbox.css";

/**
 * Checkbox & Radio — a selection control.
 *
 * Types: checkbox (rounded square with check/minus), radio (circle with dot).
 * Sizes: sm (16px), md (20px).
 * States: default, hover, focus, disabled, checked, indeterminate.
 *
 * @example
 * ```tsx
 * <Checkbox checked={on} onChange={setOn} label="Remember me" description="Save login details." />
 * <Checkbox type="radio" checked={selected === "a"} onChange={() => setSelected("a")} label="Option A" />
 * ```
 */
export const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  indeterminate = false,
  onChange,
  type = "checkbox",
  size = "md",
  label,
  description,
  disabled = false,
  className,
}) => {
  const isChecked = checked || indeterminate;

  const handleClick = () => {
    if (!disabled) onChange?.(!checked);
  };

  const wrapClasses = [
    "checkbox",
    disabled && "checkbox--disabled",
    className,
  ].filter(Boolean).join(" ");

  const boxClasses = [
    "checkbox__box",
    `checkbox__box--${size}`,
    type === "radio" && "checkbox__box--radio",
    isChecked && "checkbox__box--checked",
  ].filter(Boolean).join(" ");

  return (
    <div className={wrapClasses} onClick={handleClick}>
      <button
        type="button"
        role={type === "radio" ? "radio" : "checkbox"}
        aria-checked={indeterminate ? "mixed" : checked}
        aria-label={label ?? "Checkbox"}
        disabled={disabled}
        className={boxClasses}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
          }
        }}
      >
        {isChecked && (
          <span className="checkbox__icon">
            {type === "radio" ? (
              <RadioDot size={size} />
            ) : indeterminate ? (
              <MinusIcon size={size} />
            ) : (
              <CheckIcon size={size} />
            )}
          </span>
        )}
      </button>
      {(label || description) && (
        <div className="checkbox__text">
          {label && <span className="checkbox__label">{label}</span>}
          {description && <span className="checkbox__description">{description}</span>}
        </div>
      )}
    </div>
  );
};

const CheckIcon: React.FC<{ size: "sm" | "md" }> = ({ size }) => {
  const s = size === "sm" ? 10 : 12;
  return (
    <svg width={s} height={s} viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const MinusIcon: React.FC<{ size: "sm" | "md" }> = ({ size }) => {
  const s = size === "sm" ? 10 : 12;
  return (
    <svg width={s} height={s} viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M2.5 6h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};

const RadioDot: React.FC<{ size: "sm" | "md" }> = ({ size }) => {
  const s = size === "sm" ? 6 : 8;
  return (
    <svg width={s} height={s} viewBox="0 0 8 8" fill="none" aria-hidden>
      <circle cx="4" cy="4" r="3" fill="currentColor" />
    </svg>
  );
};
