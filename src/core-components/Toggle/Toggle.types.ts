/** Size presets: sm (36×20 track), md (44×24 track). */
export type ToggleSize = "sm" | "md";

export interface ToggleProps {
  /** Controlled pressed/on state. */
  pressed?: boolean;
  /** Change handler. */
  onChange?: (pressed: boolean) => void;
  /** Size preset. Default: "md". */
  size?: ToggleSize;
  /** Primary label text. */
  label?: string;
  /** Supporting description text below the label. */
  description?: string;
  /** Disabled state. */
  disabled?: boolean;
  /** Additional className. */
  className?: string;
}
