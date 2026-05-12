export type ProgressBarLabel = "right" | "top-floating" | "none";

export interface ProgressBarProps {
  /** Progress value from 0 to 100 */
  value: number;
  /** Label position: right, top-floating, or none */
  label?: ProgressBarLabel;
  /** Custom class name */
  className?: string;
}

export type ProgressCircleSize = "xxs" | "xs" | "sm";

export interface ProgressCircleProps {
  /** Progress value from 0 to 100 */
  value: number;
  /** Size variant */
  size?: ProgressCircleSize;
  /** Label text shown above the percentage (sm/xs only) */
  label?: string;
  /** Custom class name */
  className?: string;
}
