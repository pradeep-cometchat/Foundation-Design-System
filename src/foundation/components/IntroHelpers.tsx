import React from "react";

export const CardMeta: React.FC<{ name: string; count: string }> = ({
  name,
  count,
}) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      gap: 8,
    }}
  >
    <strong style={{ fontSize: 15, color: "var(--color-neutral-900)" }}>
      {name}
    </strong>
    <span
      style={{
        fontSize: 11,
        color: "var(--color-ep-700)",
        fontWeight: 600,
        letterSpacing: "0.02em",
      }}
    >
      {count}
    </span>
  </div>
);

export const ConventionCard: React.FC<{
  title: string;
  body: React.ReactNode;
}> = ({ title, body }) => (
  <div
    style={{
      padding: "16px 18px",
      borderRadius: 12,
      border: "1px solid var(--color-neutral-200)",
      background: "var(--color-white)",
      boxShadow: "var(--shadow-xs)",
    }}
  >
    <strong
      style={{
        display: "block",
        fontSize: 14,
        color: "var(--color-neutral-900)",
        marginBottom: 6,
      }}
    >
      {title}
    </strong>
    <div
      style={{
        fontSize: 13,
        lineHeight: 1.55,
        color: "var(--color-neutral-600)",
      }}
    >
      {body}
    </div>
  </div>
);

export const HeroChip: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      padding: "8px 14px",
      borderRadius: 999,
      background: "var(--color-white)",
      border: "1px solid var(--color-neutral-200)",
      fontSize: 12,
      color: "var(--color-neutral-700)",
    }}
  >
    <strong style={{ color: "var(--color-neutral-900)" }}>{value}</strong>
    <span style={{ color: "var(--color-neutral-500)" }}>{label}</span>
  </span>
);

export const cardPreview: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: 90,
  borderRadius: 10,
  background:
    "linear-gradient(180deg, var(--color-neutral-25) 0%, var(--color-white) 100%)",
  border: "1px solid var(--color-neutral-100)",
  padding: 12,
  overflow: "hidden",
};

export const cardDesc: React.CSSProperties = {
  fontSize: 13,
  lineHeight: 1.55,
  color: "var(--color-neutral-600)",
};

export const cardLinkStyle: React.CSSProperties = {
  padding: 18,
  borderRadius: 14,
  border: "1px solid var(--color-neutral-200)",
  background: "var(--color-white)",
  boxShadow: "var(--shadow-xs)",
  display: "flex",
  flexDirection: "column",
  gap: 12,
  transition: "all 160ms ease",
  textDecoration: "none",
  color: "inherit",
  cursor: "pointer",
};

export const panelStyle: React.CSSProperties = {
  padding: 20,
  borderRadius: 14,
  border: "1px solid var(--color-neutral-200)",
  background: "var(--color-white)",
  boxShadow: "var(--shadow-xs)",
  display: "flex",
  flexDirection: "column",
  gap: 10,
};

export const panelLabel: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--color-ep-700)",
};

export const panelP: React.CSSProperties = {
  margin: 0,
  fontSize: 13,
  lineHeight: 1.55,
  color: "var(--color-neutral-600)",
};

export const codePre: React.CSSProperties = {
  margin: 0,
  padding: 14,
  borderRadius: 10,
  background: "var(--color-neutral-50)",
  border: "1px solid var(--color-neutral-200)",
  fontFamily:
    "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace",
  fontSize: 12.5,
  lineHeight: 1.65,
  color: "var(--color-neutral-800)",
  overflowX: "auto",
};
