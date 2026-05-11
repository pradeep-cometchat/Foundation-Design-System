import React from "react";

export interface SectionProps {
  title: string;
  description?: React.ReactNode;
  children: React.ReactNode;
  level?: 2 | 3;
  /** Optional small caption shown above the title, e.g. "Step 1". */
  eyebrow?: string;
  /** Right-aligned actions (e.g. a view-toggle). */
  actions?: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({
  title,
  description,
  children,
  level = 2,
  eyebrow,
  actions,
}) => {
  const Heading = (level === 2 ? "h2" : "h3") as keyof JSX.IntrinsicElements;
  return (
    <section style={{ marginBottom: 40 }}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 16,
          marginBottom: description ? 8 : 20,
          paddingBottom: 12,
          borderBottom: "1px solid var(--color-neutral-200)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {eyebrow && (
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
          )}
          <Heading
            style={{
              margin: 0,
              fontSize: level === 2 ? 22 : 16,
              fontWeight: 600,
              letterSpacing: "-0.01em",
              color: "var(--color-neutral-900)",
            }}
          >
            {title}
          </Heading>
        </div>
        {actions}
      </div>
      {description && (
        <p
          style={{
            margin: "0 0 20px",
            color: "var(--color-neutral-600)",
            maxWidth: 760,
            fontSize: 14,
            lineHeight: 1.6,
          }}
        >
          {description}
        </p>
      )}
      {children}
    </section>
  );
};
