import type { ReactNode } from "react";

export interface DropdownOption {
  /** Unique value for this option. */
  value: string;
  /** Display label. */
  label: string;
  /** Optional supporting text below the label. */
  description?: string;
  /** Leading icon element. */
  icon?: ReactNode;
  /** Leading avatar element. */
  avatar?: ReactNode;
  /** Disabled state. */
  disabled?: boolean;
}

export type DropdownSize = "sm" | "md";

export interface DropdownProps {
  /** Available options. */
  options: DropdownOption[];
  /** Currently selected value(s). */
  value?: string | string[];
  /** Change handler. */
  onChange?: (value: string | string[]) => void;
  /** Placeholder text when nothing is selected. */
  placeholder?: string;
  /** Label above the input. */
  label?: string;
  /** Show a required asterisk (*) next to the label. */
  required?: boolean;
  /** Tooltip text shown on hover of the info icon next to the label. */
  tooltip?: string;
  /** Hint text below the input. */
  hint?: string;
  /** Size preset. Default: "sm". */
  size?: DropdownSize;
  /** Allow multiple selection (checkboxes). */
  multiple?: boolean;
  /** Show search input in the dropdown. */
  searchable?: boolean;
  /** Disabled state. */
  disabled?: boolean;
  /** Error state. */
  error?: boolean;
  /** Error message. */
  errorMessage?: string;
  /** Additional className. */
  className?: string;
}
