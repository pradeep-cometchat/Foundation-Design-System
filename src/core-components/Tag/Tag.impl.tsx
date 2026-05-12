import React from "react";
import type { TagProps } from "./Tag.types";
import "./Tag.css";

/**
 * Tag — a compact, interactive chip for filtering, categorization, or selection.
 *
 * Unlike Label (which is a passive status indicator), Tags are interactive:
 * they can be checked (via checkbox), dismissed (via close), and carry avatars.
 *
 * Three sizes: sm (24px), md (28px), lg (32px).
 * Optional slots: checkbox, avatar, close button.
 *
 * @example
 * ```tsx
 * <Tag>Design</Tag>
 * <Tag checkbox checked onCheckedChange={setChecked}>Selected</Tag>
 * <Tag avatar={<img src="..." />} onClose={handleRemove}>User</Tag>
 * ```
 */
export const Tag: React.FC<TagProps> = ({
  children,
  size = "md",
  avatar,
  checkbox = false,
  checked = false,
  onCheckedChange,
  onClose,
  disabled = false,
  className,
}) => {
  const classes = [
    "tag",
    `tag--${size}`,
    avatar && "tag--has-avatar",
    checkbox && "tag--has-checkbox",
    onClose && "tag--has-close",
    disabled && "tag--disabled",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes}>
      {checkbox && (
        <span
          className={`tag__checkbox ${checked ? "tag__checkbox--checked" : ""}`}
          role="checkbox"
          aria-checked={checked}
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          onClick={() => !disabled && onCheckedChange?.(!checked)}
          onKeyDown={(e) => {
            if (!disabled && (e.key === "Enter" || e.key === " ")) {
              e.preventDefault();
              onCheckedChange?.(!checked);
            }
          }}
        >
          {checked && (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
              <path
                d="M2 5l2.5 2.5L8 3"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>
      )}
      {avatar && <span className="tag__avatar">{avatar}</span>}
      <span className="tag__text">{children}</span>
      {onClose && (
        <button
          type="button"
          className="tag__close"
          onClick={() => !disabled && onClose()}
          aria-label="Remove"
          disabled={disabled}
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
