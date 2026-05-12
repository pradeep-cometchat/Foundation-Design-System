import type { ReactNode, InputHTMLAttributes, TextareaHTMLAttributes } from "react";

export type InputType = "text" | "email" | "password" | "number" | "tel" | "url" | "search";

/** Size presets: sm (36px), md (40px), lg (44px). */
export type InputSize = "sm" | "md" | "lg";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  /** Input type. Default: "text". */
  type?: InputType;
  /** Size preset. Default: "lg" (44px, matches Figma default). */
  size?: InputSize;
  /** Label above the input. */
  label?: string;
  /** Show required asterisk (*) in primary color. */
  required?: boolean;
  /** Show info (?) icon with tooltip text. */
  tooltip?: string;
  /** Hint text below the input. */
  hint?: string;
  /** Error state (destructive). */
  error?: boolean;
  /** Error message (replaces hint when error is true). */
  errorMessage?: string;
  /** Leading icon inside the input. */
  iconLeft?: ReactNode;
  /** Trailing icon inside the input. */
  iconRight?: ReactNode;
  /** Additional className on the wrapper. */
  wrapperClassName?: string;
}

export interface TagInputProps {
  /** Label above the input. */
  label?: string;
  /** Show required asterisk. */
  required?: boolean;
  /** Show info (?) icon with tooltip. */
  tooltip?: string;
  /** Hint text below the input. */
  hint?: string;
  /** Error state. */
  error?: boolean;
  /** Error message. */
  errorMessage?: string;
  /** Size preset. Default: "lg". */
  size?: InputSize;
  /** Current tags (user objects with name and avatar URL). */
  tags: Array<{ id: string; name: string; avatarUrl?: string }>;
  /** Called when a tag is removed. */
  onRemove?: (id: string) => void;
  /** Placeholder when no tags. */
  placeholder?: string;
  /** Input value for typing new tags. */
  inputValue?: string;
  /** Input change handler. */
  onInputChange?: (value: string) => void;
  /** Disabled state. */
  disabled?: boolean;
  /** Additional className. */
  className?: string;
}

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "children"> {
  /** Label above the textarea. */
  label?: string;
  /** Show required asterisk. */
  required?: boolean;
  /** Show info (?) icon with tooltip. */
  tooltip?: string;
  /** Hint text below the textarea. */
  hint?: string;
  /** Error state. */
  error?: boolean;
  /** Error message. */
  errorMessage?: string;
  /** Additional className on the wrapper. */
  wrapperClassName?: string;
}
