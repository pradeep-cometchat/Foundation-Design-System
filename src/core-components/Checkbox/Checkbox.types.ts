/** Type: checkbox (square) or radio (circle). */
export type CheckboxType = "checkbox" | "radio";

/** Size: sm (16px) or md (20px). */
export type CheckboxSize = "sm" | "md";

export interface CheckboxProps {
  /** Checked state. */
  checked?: boolean;
  /** Indeterminate state (checkbox only, overrides checked visually). */
  indeterminate?: boolean;
  /** Change handler. */
  onChange?: (checked: boolean) => void;
  /** Type. Default: "checkbox". */
  type?: CheckboxType;
  /** Size. Default: "md". */
  size?: CheckboxSize;
  /** Primary label text. */
  label?: string;
  /** Supporting description below the label. */
  description?: string;
  /** Disabled state. */
  disabled?: boolean;
  /** Additional className. */
  className?: string;
}
