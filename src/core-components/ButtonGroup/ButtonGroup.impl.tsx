import React from "react";
import type { ButtonGroupProps } from "./ButtonGroup.types";
import "./ButtonGroup.css";

/**
 * ButtonGroup — a segmented control that groups related actions.
 *
 * Items share a single border and radius. One item can be marked `current`
 * to indicate the active selection.
 *
 * @example
 * ```tsx
 * <ButtonGroup ariaLabel="View options">
 *   <ButtonGroupItem current>List</ButtonGroupItem>
 *   <ButtonGroupItem>Grid</ButtonGroupItem>
 *   <ButtonGroupItem>Board</ButtonGroupItem>
 * </ButtonGroup>
 * ```
 */
export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  ariaLabel,
  className,
}) => {
  return (
    <div
      className={`btn-group ${className ?? ""}`}
      role="group"
      aria-label={ariaLabel}
    >
      {children}
    </div>
  );
};
