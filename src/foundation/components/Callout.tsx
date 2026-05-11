import React from "react";

export type CalloutKind = "info" | "tip" | "warning" | "success";

export interface CalloutProps {
  kind?: CalloutKind;
  title?: string;
  children: React.ReactNode;
}

const palette: Record<
  CalloutKind,
  { bg: string; border: string; accent: string; icon: string }
> = {
  info: {
    bg: "var(--color-info-50)",
    border: "var(--color-info-200)",
    accent: "var(--color-info-700)",
    icon: "ⓘ",
  },
  tip: {
    bg: "var(--color-ep-50)",
    border: "var(--color-ep-200)",
    accent: "var(--color-ep-700)",
    icon: "✦",
  },
  warning: {
    bg: "var(--color-warning-50)",
    border: "var(--color-warning-200)",
    accent: "var(--color-warning-700)",
    icon: "⚠",
  },
  success: {
    bg: "var(--color-success-50)",
    border: "var(--color-success-200)",
    accent: "var(--color-success-700)",
    icon: "✓",
  },
};

export const Callout: React.FC<CalloutProps> = ({
  kind = "info",
  title,
  children,
}) => {
  const p = palette[kind];
  return (
    <aside
      style={{
        display: "flex",
        gap: 12,
        padding: "14px 16px",
        borderRadius: 10,
        background: p.bg,
        border: `1px solid ${p.border}`,
        color: "var(--color-neutral-800)",
        fontSize: 13,
        lineHeight: 1.6,
      }}
    >
      <span
        aria-hidden
        style={{
          flexShrink: 0,
          width: 20,
          height: 20,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 13,
          fontWeight: 700,
          color: p.accent,
        }}
      >
        {p.icon}
      </span>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {title && (
          <strong style={{ color: p.accent, fontSize: 13 }}>{title}</strong>
        )}
        <div>{children}</div>
      </div>
    </aside>
  );
};
