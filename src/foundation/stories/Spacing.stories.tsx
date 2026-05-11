import type { Meta, StoryObj } from "@storybook/react";
import { PageHeader } from "../components/PageHeader";
import { Section } from "../components/Section";
import { Callout } from "../components/Callout";
import { TokenTable } from "../components/TokenTable";
import { spacing, spacingEntries } from "../tokens/spacing";

/**
 * A 4px scale with half-steps at the small end. Use spacing tokens for
 * padding, margin, and gap so layout rhythm stays consistent across the
 * product.
 */
const meta: Meta<typeof SpacingPlayground> = {
  title: "Foundation/Spacing",
  component: SpacingPlayground,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  argTypes: {
    token: {
      control: "select",
      options: spacingEntries.map(([k]) => k),
      description: "Spacing token key.",
      table: { category: "Token" },
    },
    axis: {
      control: "radio",
      options: ["horizontal", "vertical"],
      description: "Direction of the visual ruler.",
      table: { category: "Preview" },
    },
  },
};
export default meta;

interface PlaygroundProps {
  token: keyof typeof spacing;
  axis: "horizontal" | "vertical";
}

function SpacingPlayground({ token, axis }: PlaygroundProps) {
  const size = spacing[token];
  const cssVar = `var(--space-${String(token).replace(".", "-")})`;

  return (
    <div style={{ padding: 32, maxWidth: 1200, margin: "0 auto" }}>
      <div
        style={{
          border: "1px solid var(--color-neutral-200)",
          borderRadius: 16,
          overflow: "hidden",
          background: "var(--color-white)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <div
          aria-label={`Spacing ${size}px preview`}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 40,
            background:
              "repeating-linear-gradient(45deg, var(--color-neutral-25) 0 8px, var(--color-neutral-50) 8px 16px)",
            minHeight: axis === "vertical" ? 240 : 120,
          }}
        >
          <div
            style={{
              background: "var(--color-ep-500)",
              width: axis === "horizontal" ? size : 6,
              height: axis === "vertical" ? size : 18,
              borderRadius: 3,
              boxShadow: "var(--shadow-sm)",
            }}
          />
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            borderTop: "1px solid var(--color-neutral-200)",
          }}
        >
          <Stat label="Token" value={`spacing.${String(token)}`} />
          <Stat label="Value" value={`${size}px`} mono divider />
          <Stat label="CSS variable" value={cssVar} mono divider />
        </div>
      </div>
    </div>
  );
}

const Stat: React.FC<{
  label: string;
  value: string;
  mono?: boolean;
  divider?: boolean;
}> = ({ label, value, mono, divider }) => (
  <div
    style={{
      padding: "16px 20px",
      borderLeft: divider
        ? "1px solid var(--color-neutral-200)"
        : "none",
      background: "var(--color-neutral-25)",
    }}
  >
    <div
      style={{
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        color: "var(--color-neutral-500)",
        marginBottom: 4,
      }}
    >
      {label}
    </div>
    <div
      style={{
        fontFamily: mono ? "var(--sb-font-mono)" : "inherit",
        fontSize: 14,
        fontWeight: 600,
        color: "var(--color-neutral-900)",
        wordBreak: "break-all",
      }}
    >
      {value}
    </div>
  </div>
);

export const Playground: StoryObj<typeof SpacingPlayground> = {
  args: { token: 4, axis: "horizontal" },
  parameters: { docs: { disable: true } },
};

/** Full spacing scale with a visual ruler. */
export const Scale: StoryObj = {
  parameters: { controls: { disable: true }, layout: "fullscreen" },
  render: () => (
    <div style={{ padding: 32, maxWidth: 1200, margin: "0 auto" }}>
      <PageHeader
        title="Spacing scale"
        description="A 4px scale with half-steps at the small end. Bars are truncated at 200px for layout purposes."
        meta={[
          { label: "tokens", value: String(spacingEntries.length) },
          { label: "range", value: "0 → 1920 px" },
        ]}
      />

      <Callout kind="tip" title="Naming convention">
        Half-steps keep their Figma name (<code>0.5</code>, <code>1.5</code>),
        integer steps match the 4px multiplier. CSS variables use a hyphen in
        place of the dot, e.g. <code>var(--space-0-5)</code>.
      </Callout>
      <div style={{ height: 24 }} />

      <TokenTable
        rows={spacingEntries.map(([key, value]) => ({
          name: `spacing.${key}`,
          value: `${value}px`,
          cssVar: `var(--space-${String(key).replace(".", "-")})`,
          preview: (
            <div
              aria-hidden
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                minWidth: 220,
              }}
            >
              <div
                style={{
                  background: "var(--color-ep-500)",
                  width: Math.min(value, 200),
                  height: 10,
                  borderRadius: 2,
                }}
              />
            </div>
          ),
        }))}
        previewHeader="Ruler"
        valueHeader="Value"
      />
    </div>
  ),
};

/** Example layout using real tokens. */
export const LayoutExample: StoryObj = {
  parameters: { controls: { disable: true }, layout: "fullscreen" },
  render: () => (
    <div style={{ padding: 32, maxWidth: 1200, margin: "0 auto" }}>
      <PageHeader
        title="Layout example"
        description="A card using spacing tokens directly. Every inset, gap, and margin is a variable — nothing is magic."
      />
      <Section title="Stack and inline">
        <div
          style={{
            padding: "var(--space-6)",
            background: "var(--color-white)",
            border: "1px solid var(--color-neutral-200)",
            borderRadius: 12,
            boxShadow: "var(--shadow-sm)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-3)",
          }}
        >
          {([4, 8, 12, 16, 24] as const).map((key) => (
            <div
              key={key}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-2)",
              }}
            >
              <div
                style={{
                  width: spacing[key],
                  height: 16,
                  background: "var(--color-ep-500)",
                  borderRadius: 2,
                }}
              />
              <code
                style={{
                  fontFamily: "var(--sb-font-mono)",
                  fontSize: 12,
                  color: "var(--color-neutral-700)",
                }}
              >
                var(--space-{key}) → {spacing[key]}px
              </code>
            </div>
          ))}
        </div>
      </Section>
    </div>
  ),
};
