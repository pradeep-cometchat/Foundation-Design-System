import type { ReactNode } from "react";

/** Arrow position relative to the tooltip body. */
export type TooltipArrow =
  | "top-center"
  | "top-left"
  | "top-right"
  | "bottom-center"
  | "bottom-left"
  | "bottom-right"
  | "left"
  | "right"
  | "none";

export interface TooltipProps {
  /** Primary tooltip text. */
  title: string;
  /** Optional supporting/description text. */
  supportingText?: string;
  /** Arrow position. Default: "top-center". */
  arrow?: TooltipArrow;
  /** The trigger element the tooltip wraps. */
  children: ReactNode;
  /** Force tooltip to be visible (for demos). */
  open?: boolean;
  /** Additional className. */
  className?: string;
}
