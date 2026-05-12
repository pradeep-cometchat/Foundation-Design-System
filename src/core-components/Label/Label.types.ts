import type { ReactNode } from "react";

/** Visual type — badge (rounded rect), pill (full radius), or modern (white bg). */
export type LabelType = "badge" | "pill" | "modern";

/** Semantic color. */
export type LabelColor = "brand" | "gray" | "error" | "success" | "warning";

/** Size preset. */
export type LabelSize = "sm" | "md";

/** Icon slot position. */
export type LabelIcon = "none" | "avatar" | "close";

export interface LabelProps {
  /** Label text. */
  children: ReactNode;
  /** Visual type. Default: "badge". */
  type?: LabelType;
  /** Semantic color. Default: "gray". */
  color?: LabelColor;
  /** Size. Default: "sm". */
  size?: LabelSize;
  /** Leading avatar/dot element. */
  avatar?: ReactNode;
  /** Show a close/dismiss button. */
  onClose?: () => void;
  /** Additional className. */
  className?: string;
}
