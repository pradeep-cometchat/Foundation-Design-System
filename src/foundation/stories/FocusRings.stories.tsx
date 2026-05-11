import type { Meta, StoryObj } from "@storybook/react";
import { PageHeader } from "../components/PageHeader";
import { Section } from "../components/Section";
import { Callout } from "../components/Callout";
import { TokenTable } from "../components/TokenTable";
import { focusRings, type FocusRingKey } from "../tokens/shadows";

/**
 * Focus states stack three layers:
 * 1. The base elevation (matches `shadow-xs`).
 * 2. A 2px white halo to separate the ring from the control.
 * 3. A 4px colored outer ring — brand or error.
 *
 * Always apply a visible focus ring to interactive elements. Use the **error**
 * variant for destructive controls so the focus color matches intent.
 */
const meta: Meta<typeof FocusPlayground> = {
  title: "Foundation/Effects/Focus Rings",
  component: FocusPlayground,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  argTypes: {
    variant: {
      control: "radio",
      options: Object.keys(focusRings) as FocusRingKey[],
      description: "Focus ring style.",
      table: { category: "Token" },
    },
    label: {
      control: "text",
      description: "Button label.",
      table: { category: "Content" },
    },
  },
};
export default meta;

interface PlaygroundProps {
  variant: FocusRingKey;
  label: string;
}

function FocusPlayground({ variant, label }: PlaygroundProps) {
  const token = focusRings[variant];
  const cssVarName =
    variant === "error" ? "focus-ring-error-xs" : "focus-ring-xs";

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
          style={{
            padding: 56,
            background: "var(--color-neutral-25)",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            type="button"
            style={{
              padding: "10px 18px",
              borderRadius: 8,
              border: "1px solid transparent",
              background:
                variant === "error"
                  ? "var(--color-error-500)"
                  : "var(--color-ep-500)",
              color: "var(--color-white)",
              fontWeight: 600,
              fontSize: 14,
              cursor: "pointer",
              boxShadow: `var(--${cssVarName})`,
              fontFamily: "inherit",
            }}
          >
            {label}
          </button>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            borderTop: "1px solid var(--color-neutral-200)",
          }}
        >
          <Stat label="Token" value={token.name} />
          <Stat
            label="CSS variable"
            value={`var(--${cssVarName})`}
            mono
            divider
          />
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <Callout kind="tip" title="Try tabbing through the canvas">
          The preview above has the focus ring permanently applied for
          reference. In real usage, use <code>:focus-visible</code> so the ring
          only appears for keyboard users.
        </Callout>
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
      borderLeft: divider ? "1px solid var(--color-neutral-200)" : "none",
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
      }}
    >
      {value}
    </div>
  </div>
);

export const Playground: StoryObj<typeof FocusPlayground> = {
  args: { variant: "default", label: "Focused button" },
  parameters: { docs: { disable: true } },
};

/** Reference of focus ring tokens with descriptions. */
export const Reference: StoryObj = {
  parameters: { controls: { disable: true }, layout: "fullscreen" },
  render: () => (
    <div style={{ padding: 32, maxWidth: 1200, margin: "0 auto" }}>
      <PageHeader
        title="Focus ring reference"
        description="Two tokens cover all interactive states: a brand ring for standard controls and an error ring for destructive ones."
      />
      <TokenTable
        rows={(Object.keys(focusRings) as FocusRingKey[]).map((key) => {
          const t = focusRings[key];
          const cssVarName =
            key === "error" ? "focus-ring-error-xs" : "focus-ring-xs";
          return {
            name: t.name,
            value: t.description ?? "",
            cssVar: `var(--${cssVarName})`,
            preview: (
              <div
                aria-hidden
                style={{
                  width: 56,
                  height: 32,
                  borderRadius: 8,
                  background:
                    key === "error"
                      ? "var(--color-error-500)"
                      : "var(--color-ep-500)",
                  boxShadow: `var(--${cssVarName})`,
                  margin: 10,
                }}
              />
            ),
          };
        })}
        previewHeader="Preview"
        valueHeader="Use for"
      />
    </div>
  ),
};

/** Accessibility guidance. */
export const Accessibility: StoryObj = {
  parameters: { controls: { disable: true }, layout: "fullscreen" },
  render: () => (
    <div style={{ padding: 32, maxWidth: 1200, margin: "0 auto" }}>
      <PageHeader
        title="Accessibility notes"
        description="Focus indicators are required by WCAG 2.4.7. These tokens meet the 3:1 non-text contrast requirement (WCAG 1.4.11) on both light and dark surfaces."
      />
      <Section title="Do's and don'ts">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 16,
          }}
        >
          <Callout kind="success" title="Do">
            Use <code>:focus-visible</code> so the ring appears for keyboard
            users but not on mouse clicks.
          </Callout>
          <Callout kind="success" title="Do">
            Use the <strong>error</strong> variant only on destructive controls
            so color carries meaning consistently.
          </Callout>
          <Callout kind="warning" title="Don't">
            Don't remove focus rings with <code>outline: none</code> unless you
            provide an equivalent visible indicator.
          </Callout>
          <Callout kind="warning" title="Don't">
            Don't rely on the ring alone in forced-colors mode. Add a border
            state change as a backup.
          </Callout>
        </div>
      </Section>
    </div>
  ),
};
