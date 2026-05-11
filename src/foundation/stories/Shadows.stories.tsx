import type { Meta, StoryObj } from "@storybook/react";
import { PageHeader } from "../components/PageHeader";
import { Section } from "../components/Section";
import { TokenTable } from "../components/TokenTable";
import { CopyButton } from "../components/CopyButton";
import { Callout } from "../components/Callout";
import { shadows, type ShadowKey } from "../tokens/shadows";

/**
 * Five elevation tokens from **xs** (subtle lift) to **xl** (modals).
 * Each token may stack multiple drop shadows for a more natural falloff.
 *
 * Pair elevation with borders and background tokens, not alone — shadows
 * alone are not a reliable visual cue in high-contrast modes.
 */
const meta: Meta<typeof ShadowPlayground> = {
  title: "Foundation/Effects/Shadows",
  component: ShadowPlayground,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  argTypes: {
    level: {
      control: "select",
      options: Object.keys(shadows) as ShadowKey[],
      description: "Elevation level.",
      table: { category: "Token" },
    },
  },
};
export default meta;

interface PlaygroundProps {
  level: ShadowKey;
}

function ShadowPlayground({ level }: PlaygroundProps) {
  const token = shadows[level];
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
          <div
            aria-label={`shadow-${level} preview`}
            style={{
              width: 280,
              height: 140,
              borderRadius: 14,
              background: "var(--color-white)",
              boxShadow: `var(--shadow-${level})`,
            }}
          />
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            borderTop: "1px solid var(--color-neutral-200)",
          }}
        >
          <Stat label="Token" value={token.name} />
          <Stat label="Layers" value={String(token.layers.length)} mono divider />
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <TokenTable
          searchable={false}
          title="Copy-ready value"
          rows={[
            {
              name: token.name,
              value: token.css,
              cssVar: `var(--shadow-${level})`,
            },
          ]}
        />
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
      }}
    >
      {value}
    </div>
  </div>
);

export const Playground: StoryObj<typeof ShadowPlayground> = {
  args: { level: "md" },
  parameters: { docs: { disable: true } },
};

/** All elevation tokens side by side. */
export const Scale: StoryObj = {
  parameters: { controls: { disable: true }, layout: "fullscreen" },
  render: () => (
    <div style={{ padding: 32, maxWidth: 1200, margin: "0 auto" }}>
      <PageHeader
        title="Elevation scale"
        description="Pick the smallest shadow that communicates the right intent. Over-elevating makes the UI feel noisy."
        meta={[{ label: "levels", value: "5" }]}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 20,
          padding: 32,
          background: "var(--color-neutral-25)",
          border: "1px solid var(--color-neutral-200)",
          borderRadius: 16,
        }}
      >
        {(Object.keys(shadows) as ShadowKey[]).map((key) => (
          <div
            key={key}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              alignItems: "center",
            }}
          >
            <div
              aria-label={`shadow-${key}`}
              style={{
                width: "100%",
                height: 100,
                borderRadius: 12,
                background: "var(--color-white)",
                boxShadow: `var(--shadow-${key})`,
              }}
            />
            <strong
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "var(--color-neutral-900)",
              }}
            >
              shadow-{key}
            </strong>
            <CopyButton
              value={`var(--shadow-${key})`}
              label="Copy"
              variant="solid"
            />
          </div>
        ))}
      </div>
    </div>
  ),
};

/** Shadow token reference. */
export const Reference: StoryObj = {
  parameters: { controls: { disable: true }, layout: "fullscreen" },
  render: () => (
    <div style={{ padding: 32, maxWidth: 1200, margin: "0 auto" }}>
      <PageHeader
        title="Shadow reference"
        description="Every elevation token with its layer count and full CSS value."
      />
      <TokenTable
        rows={(Object.keys(shadows) as ShadowKey[]).map((key) => {
          const s = shadows[key];
          return {
            name: s.name,
            value: `${s.layers.length} layer${s.layers.length > 1 ? "s" : ""}`,
            cssVar: `var(--shadow-${key})`,
            description: s.css,
            preview: (
              <div
                aria-hidden
                style={{
                  width: 64,
                  height: 32,
                  borderRadius: 6,
                  background: "var(--color-white)",
                  boxShadow: `var(--shadow-${key})`,
                }}
              />
            ),
          };
        })}
        previewHeader="Preview"
        valueHeader="Layers"
      />
    </div>
  ),
};

/** Suggested usage per level. */
export const UsageGuide: StoryObj = {
  parameters: { controls: { disable: true }, layout: "fullscreen" },
  render: () => (
    <div style={{ padding: 32, maxWidth: 1200, margin: "0 auto" }}>
      <PageHeader
        title="Usage guide"
        description="Guidelines for when to reach for each elevation. If in doubt, use the smaller one."
      />
      <Callout kind="warning" title="Don't rely on shadow alone">
        In high-contrast or forced-colors modes, shadows may be stripped. Pair
        elevation with borders and surface color changes so the boundary is
        still clear.
      </Callout>
      <div style={{ height: 24 }} />
      <Section title="When to use each level">
        <TokenTable
          searchable={false}
          rows={[
            {
              name: "shadow-xs",
              value: "Inputs, chips, subtle lift",
              cssVar: "var(--shadow-xs)",
              preview: (
                <div
                  aria-hidden
                  style={{
                    width: 56,
                    height: 28,
                    borderRadius: 6,
                    background: "var(--color-white)",
                    boxShadow: "var(--shadow-xs)",
                  }}
                />
              ),
            },
            {
              name: "shadow-sm",
              value: "Cards, list items",
              cssVar: "var(--shadow-sm)",
              preview: (
                <div
                  aria-hidden
                  style={{
                    width: 56,
                    height: 28,
                    borderRadius: 6,
                    background: "var(--color-white)",
                    boxShadow: "var(--shadow-sm)",
                  }}
                />
              ),
            },
            {
              name: "shadow-md",
              value: "Dropdowns, menus, floating buttons",
              cssVar: "var(--shadow-md)",
              preview: (
                <div
                  aria-hidden
                  style={{
                    width: 56,
                    height: 28,
                    borderRadius: 6,
                    background: "var(--color-white)",
                    boxShadow: "var(--shadow-md)",
                  }}
                />
              ),
            },
            {
              name: "shadow-lg",
              value: "Popovers, tooltips with elevation",
              cssVar: "var(--shadow-lg)",
              preview: (
                <div
                  aria-hidden
                  style={{
                    width: 56,
                    height: 28,
                    borderRadius: 6,
                    background: "var(--color-white)",
                    boxShadow: "var(--shadow-lg)",
                  }}
                />
              ),
            },
            {
              name: "shadow-xl",
              value: "Modals, sheets, dialogs",
              cssVar: "var(--shadow-xl)",
              preview: (
                <div
                  aria-hidden
                  style={{
                    width: 56,
                    height: 28,
                    borderRadius: 6,
                    background: "var(--color-white)",
                    boxShadow: "var(--shadow-xl)",
                  }}
                />
              ),
            },
          ]}
          previewHeader="Preview"
          valueHeader="Typical use"
        />
      </Section>
    </div>
  ),
};
