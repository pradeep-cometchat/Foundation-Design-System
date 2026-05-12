import React from "react";
import type { InputProps, TagInputProps, TextareaProps } from "./Input.types";
import "./Input.css";

/**
 * Input — a text input field matching Figma specs exactly.
 *
 * Sizes: sm (36px), md (40px), lg (44px — Figma default).
 * States: Placeholder, Filled, Focused, Disabled, Error (Destructive).
 * Slots: Label (with * and ?), leading icon, trailing icon, hint/error.
 */
export const Input: React.FC<InputProps> = ({
  type = "text",
  size = "lg",
  label,
  required = false,
  tooltip,
  hint,
  error = false,
  errorMessage,
  iconLeft,
  iconRight,
  disabled,
  wrapperClassName,
  className,
  ...rest
}) => {
  const wrapClasses = [
    "input-field__input-wrap",
    `input-field__input-wrap--${size}`,
    error && "input-field__input-wrap--error",
    disabled && "input-field__input-wrap--disabled",
  ].filter(Boolean).join(" ");

  return (
    <div className={`input-field ${wrapperClassName ?? ""}`}>
      <LabelRow label={label} required={required} tooltip={tooltip} />
      <div className={wrapClasses}>
        {iconLeft && <span className="input-field__icon">{iconLeft}</span>}
        <input
          type={type}
          className={`input-field__input ${className ?? ""}`}
          disabled={disabled}
          aria-invalid={error || undefined}
          {...rest}
        />
        {iconRight && <span className="input-field__icon">{iconRight}</span>}
      </div>
      <HintRow hint={hint} error={error} errorMessage={errorMessage} />
    </div>
  );
};

/**
 * TagInput — input with user tags (chips with avatars) inside.
 * Uses the Tag component from foundation and Avatars for user images.
 */
export const TagInput: React.FC<TagInputProps> = ({
  label,
  required = false,
  tooltip,
  hint,
  error = false,
  errorMessage,
  size = "lg",
  tags,
  onRemove,
  placeholder = "Add users",
  inputValue = "",
  onInputChange,
  disabled = false,
  className,
}) => {
  const wrapClasses = [
    "input-field__input-wrap",
    `input-field__input-wrap--${size}`,
    error && "input-field__input-wrap--error",
    disabled && "input-field__input-wrap--disabled",
  ].filter(Boolean).join(" ");

  return (
    <div className={`input-field ${className ?? ""}`}>
      <LabelRow label={label} required={required} tooltip={tooltip} />
      <div className={wrapClasses} style={{ flexWrap: "wrap", minHeight: size === "sm" ? 36 : size === "md" ? 40 : 44 }}>
        <div className="input-field__tags-content">
          {tags.length > 0 && (
            <div className="input-field__tags-list">
              {tags.map((tag) => (
                <span
                  key={tag.id}
                  className="tag tag--sm tag--has-avatar tag--has-close"
                  style={{ height: 28, padding: "4px 4px 4px 5px", gap: 3, display: "inline-flex", alignItems: "center", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-neutral-lm-300)", background: "var(--color-white)", fontSize: "var(--font-size-2)", fontWeight: 500, color: "var(--color-neutral-lm-700)" }}
                >
                  {tag.avatarUrl && (
                    <img
                      src={tag.avatarUrl}
                      alt=""
                      style={{ width: 18, height: 18, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
                    />
                  )}
                  <span style={{ padding: "0 2px" }}>{tag.name}</span>
                  {onRemove && (
                    <button
                      type="button"
                      onClick={() => !disabled && onRemove(tag.id)}
                      disabled={disabled}
                      aria-label={`Remove ${tag.name}`}
                      style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 16, height: 16, border: "none", background: "transparent", color: "var(--color-neutral-lm-500)", cursor: disabled ? "not-allowed" : "pointer", padding: 0, borderRadius: "var(--radius-xs)" }}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                        <path d="M9 3L3 9M3 3l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  )}
                </span>
              ))}
            </div>
          )}
          <input
            type="text"
            className="input-field__tag-input"
            placeholder={tags.length === 0 ? placeholder : ""}
            value={inputValue}
            onChange={(e) => onInputChange?.(e.target.value)}
            disabled={disabled}
          />
        </div>
      </div>
      <HintRow hint={hint} error={error} errorMessage={errorMessage} />
    </div>
  );
};

/**
 * Textarea — multi-line text input.
 */
export const Textarea: React.FC<TextareaProps> = ({
  label,
  required = false,
  tooltip,
  hint,
  error = false,
  errorMessage,
  disabled,
  wrapperClassName,
  className,
  ...rest
}) => {
  const wrapClasses = [
    "input-field__textarea-wrap",
    error && "input-field__textarea-wrap--error",
    disabled && "input-field__textarea-wrap--disabled",
  ].filter(Boolean).join(" ");

  return (
    <div className={`input-field ${wrapperClassName ?? ""}`}>
      <LabelRow label={label} required={required} tooltip={tooltip} />
      <div className={wrapClasses}>
        <textarea
          className={`input-field__textarea ${className ?? ""}`}
          disabled={disabled}
          aria-invalid={error || undefined}
          {...rest}
        />
      </div>
      <HintRow hint={hint} error={error} errorMessage={errorMessage} />
    </div>
  );
};

/* ─── Shared sub-components ────────────────────────────────────────────────── */

const LabelRow: React.FC<{ label?: string; required?: boolean; tooltip?: string }> = ({
  label,
  required,
  tooltip,
}) => {
  if (!label) return null;
  return (
    <label className="input-field__label">
      {label}
      {required && <span className="input-field__required">*</span>}
      {tooltip && (
        <span className="input-field__tooltip" title={tooltip}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.25" />
            <path d="M6.5 6.5a1.5 1.5 0 1 1 1.5 1.5v1" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="8" cy="11.5" r="0.5" fill="currentColor" />
          </svg>
        </span>
      )}
    </label>
  );
};

const HintRow: React.FC<{ hint?: string; error?: boolean; errorMessage?: string }> = ({
  hint,
  error,
  errorMessage,
}) => {
  if (!hint && !errorMessage) return null;
  return (
    <span className={`input-field__hint ${error ? "input-field__hint--error" : ""}`}>
      {error ? errorMessage : hint}
    </span>
  );
};
