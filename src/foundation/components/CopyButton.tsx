import React, { useCallback, useEffect, useState } from "react";

export interface CopyButtonProps {
  value: string;
  label?: string;
  ariaLabel?: string;
  /** "ghost" is a subtle link-like button; "solid" is a bordered chip. */
  variant?: "ghost" | "solid";
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  value,
  label,
  ariaLabel,
  variant = "solid",
}) => {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1200);
    return () => clearTimeout(t);
  }, [copied]);

  const onClick = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      /* clipboard unavailable */
    }
  }, [value]);

  const base: React.CSSProperties = {
    fontFamily:
      "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
    fontSize: 12,
    fontWeight: 500,
    padding: variant === "ghost" ? "2px 6px" : "5px 10px",
    borderRadius: 6,
    cursor: "pointer",
    transition: "all 120ms ease",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    lineHeight: 1.2,
    whiteSpace: "nowrap",
  };

  const style: React.CSSProperties =
    variant === "ghost"
      ? {
          ...base,
          background: copied
            ? "var(--color-success-50)"
            : hovered
            ? "var(--color-neutral-100)"
            : "transparent",
          color: copied
            ? "var(--color-success-700)"
            : "var(--color-neutral-700)",
          border: "1px solid transparent",
        }
      : {
          ...base,
          background: copied
            ? "var(--color-success-50)"
            : hovered
            ? "var(--color-neutral-50)"
            : "var(--color-white)",
          color: copied
            ? "var(--color-success-700)"
            : "var(--color-neutral-800)",
          border: `1px solid ${
            copied
              ? "var(--color-success-200)"
              : "var(--color-neutral-200)"
          }`,
          boxShadow: "var(--shadow-xs)",
        };

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={ariaLabel ?? `Copy ${value}`}
      style={style}
    >
      <CopyIcon copied={copied} />
      <span>{copied ? "Copied" : label ?? value}</span>
    </button>
  );
};

const CopyIcon: React.FC<{ copied: boolean }> = ({ copied }) =>
  copied ? (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12l5 5L20 7"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="8"
        y="8"
        width="12"
        height="12"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M4 16V6a2 2 0 0 1 2-2h10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
