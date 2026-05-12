import type { ReactNode } from "react";

/** Size presets: sm (24px), md (28px), lg (32px). */
export type TagSize = "sm" | "md" | "lg";

export interface TagProps {
  /** Tag text. */
  children: ReactNode;
  /** Size preset. Default: "md". */
  size?: TagSize;
  /** Leading avatar image element. */
  avatar?: ReactNode;
  /** Show a checkbox. */
  checkbox?: boolean;
  /** Checkbox checked state (controlled). */
  checked?: boolean;
  /** Checkbox change handler. */
  onCheckedChange?: (checked: boolean) => void;
  /** Show a close/dismiss button. */
  onClose?: () => void;
  /** Disabled state. */
  disabled?: boolean;
  /** Additional className. */
  className?: string;
}
