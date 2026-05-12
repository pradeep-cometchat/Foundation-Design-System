import type { ReactNode, ButtonHTMLAttributes } from "react";

export interface ButtonGroupProps {
  /** The group items. Use `<ButtonGroupItem>` children. */
  children: ReactNode;
  /** Accessible label for the group. */
  ariaLabel?: string;
  /** Additional className. */
  className?: string;
}

export interface ButtonGroupItemProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /** Item label. Required unless `iconOnly` is true. */
  children?: ReactNode;
  /** Whether this item is the currently active/selected one. */
  current?: boolean;
  /** Icon placed before the label. */
  icon?: ReactNode;
  /** Render as icon-only (no label). */
  iconOnly?: boolean;
}
