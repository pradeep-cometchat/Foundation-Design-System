import React from "react";

export interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: React.ReactNode;
  meta?: Array<{ label: string; value: string }>;
}

/**
 * Page header with eyebrow, title, description, and optional metadata chips.
 * Drop at the top of every foundation docs page for a consistent hero.
 */
export const PageHeader: React.FC<PageHeaderProps> = ({
  eyebrow = "Foundation",
  title,
  description,
  meta,
}) => {
  return (
    <header
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        padding: "32px 32px 28px",
        margin: "0 0 32px",
        borderRadius: 16,
        background:
          "linear-gradient(135deg, var(--color-ep-50) 0%, var(--color-white) 100%)",
        border: "1px solid var(--color-ep-100)",
      }}
    >
      <span
        style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--color-ep-700)",
        }}
      >
        {eyebrow}
      </span>
      <h1
        style={{
          margin: 0,
          fontSize: 36,
          lineHeight: 1.1,
          fontWeight: 700,
          letterSpacing: "-0.02em",
          color: "var(--color-neutral-900)",
        }}
      >
        {title}
      </h1>
      {description && (
        <p
          style={{
            margin: 0,
            fontSize: 16,
            lineHeight: 1.55,
            color: "var(--color-neutral-600)",
            maxWidth: 720,
          }}
        >
          {description}
        </p>
      )}
      {meta && meta.length > 0 && (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 4 }}>
          {meta.map((m) => (
            <span
              key={m.label}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 12px",
                borderRadius: 999,
                background: "var(--color-white)",
                border: "1px solid var(--color-ep-100)",
                fontSize: 12,
                color: "var(--color-neutral-700)",
              }}
            >
              <strong style={{ color: "var(--color-neutral-900)" }}>
                {m.value}
              </strong>
              <span style={{ color: "var(--color-neutral-500)" }}>{m.label}</span>
            </span>
          ))}
        </div>
      )}
    </header>
  );
};
