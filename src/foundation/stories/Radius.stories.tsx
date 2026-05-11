import type { Meta, StoryObj } from "@storybook/react";
import { PageHeader } from "../components/PageHeader";
import { Section } from "../components/Section";
import { Callout } from "../components/Callout";
import { CopyButton } from "../components/CopyButton";
import { radius, radiusOrder, pxToRem, type RadiusToken } from "../tokens/radius";

/**
 * Border radius tokens define how rounded a corner is. The scale ranges from
 * **none** (sharp) through **4xl** (very rounded), plus **full** for pills
 * and circles.
 *
 * Prefer semantic sizes for new components (inputs use `md`, cards use
 * `xl`, modals use `2xl`) rather than hand-picking a pixel value.
 */
const meta: Meta<typeof RadiusPlayground> = {
  title: "Foundation/Radius",
  component: RadiusPlayground,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  argTypes: {
    size: {
      control: "select",
      options: radiusOrder,
      description: "Radius token.",
      table: { category: "Token" },
    },
  },
};
export default meta;

interface PlaygroundProps {
  size: RadiusToken;
}

function RadiusPlayground({ size }: PlaygroundProps) {
  const value = radius[size];
  const cssVar = `var(--radius-${size})`;
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
            background:
              "repeating-linear-gradient(45deg, var(--color-neutral-25) 0 8px, var(--color-neutral-50) 8px 16px)",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            aria-label={`radius-${size} preview`}
            style={{
              width: 280,
              height: 140,
              background: "var(--color-ep-50)",
              border: "2px solid var(--color-ep-500)",
              borderRadius: value,
            }}
          />
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            borderTop: "1px solid var(--color-neutral-200)",
            background: "var(--color-neutral-25)",
          }}
        >
          <Stat label="Token" value={`radius-${size}`} />
          <Stat label="Pixels" value={`${value}px`} mono divider />
          <Stat
            label="Rem (16px base)"
            value={size === "full" ? "∞" : pxToRem(value)}
            mono
            divider
          />
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
      padding: "14px 16px",
      borderLeft: divider ? "1px solid var(--color-neutral-200)" : "none",
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
        fontSize: 13,
        fontWeight: 600,
        color: "var(--color-neutral-900)",
        wordBreak: "break-all",
      }}
    >
      {value}
    </div>
  </div>
);

export const Playground: StoryObj<typeof RadiusPlayground> = {
  args: { size: "md" },
  parameters: { docs: { disable: true } },
};

/** Full radius scale as a reference table. */
export const Scale: StoryObj = {
  parameters: { controls: { disable: true }, layout: "fullscreen" },
  render: () => (
    <div style={{ padding: 32, maxWidth: 1200, margin: "0 auto" }}>
      <PageHeader
        title="Border radius"
        description="Rounding scale from sharp to fully rounded. Every row shows a corner preview at the true pixel value."
        meta={[
          { label: "tokens", value: String(radiusOrder.length) },
          { label: "range", value: "0 → 24 px · full" },
        ]}
      />

      <div
        style={{
          overflow: "auto",
          border: "1px solid var(--color-neutral-200)",
          borderRadius: 12,
          background: "var(--color-white)",
          boxShadow: "var(--shadow-xs)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "separate",
            borderSpacing: 0,
            fontSize: 13,
            color: "var(--color-neutral-900)",
          }}
        >
          <thead>
            <tr style={{ background: "var(--color-neutral-50)", textAlign: "left" }}>
              <th style={th}>Token</th>
              <th style={th}>Size (16px base)</th>
              <th style={th}>Pixels</th>
              <th style={th}>Radius</th>
              <th style={{ ...th, width: 1 }} aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {radiusOrder.map((key, i) => {
              const value = radius[key];
              const cssVar = `var(--radius-${key})`;
              return (
                <tr
                  key={key}
                  style={{
                    background:
                      i % 2 === 0
                        ? "var(--color-white)"
                        : "var(--color-neutral-25)",
                  }}
                >
                  <td style={td}>
                    <code style={codeStyle}>radius-{key}</code>
                  </td>
                  <td style={td}>
                    <code style={codeStyle}>
                      {key === "full" ? "∞" : pxToRem(value)}
                    </code>
                  </td>
                  <td style={td}>
                    <code style={codeStyle}>{value}px</code>
                  </td>
                  <td style={td}>
                    <RadiusCorner value={value} />
                  </td>
                  <td style={{ ...td, textAlign: "right" }}>
                    <CopyButton value={cssVar} label="Copy" variant="ghost" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  ),
};

/** Suggested usage per component type. */
export const UsageGuide: StoryObj = {
  parameters: { controls: { disable: true }, layout: "fullscreen" },
  render: () => (
    <div style={{ padding: 32, maxWidth: 1200, margin: "0 auto" }}>
      <PageHeader
        title="Usage guide"
        description="Rules of thumb for when to reach for each size. Keep radii consistent within a surface so nested shapes feel related."
      />

      <Callout kind="tip" title="Nested radii">
        When one rounded surface sits inside another, the inner radius should
        be smaller than the outer. A card at <code>radius-xl</code> (12px) with
        an avatar at <code>radius-lg</code> (10px) will feel balanced.
      </Callout>
      <div style={{ height: 24 }} />

      <Section title="Recommended pairings">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 14,
          }}
        >
          {[
            { token: "radius-none", use: "Tables, data grids, full-bleed bars" },
            { token: "radius-xs", use: "Tiny chips, tags, inline pills" },
            { token: "radius-sm", use: "Checkboxes, small badges" },
            { token: "radius-md", use: "Inputs, buttons, selects" },
            { token: "radius-lg", use: "Menus, dropdowns, toasts" },
            { token: "radius-xl", use: "Cards, list items, popovers" },
            { token: "radius-2xl", use: "Modals, sheets, large containers" },
            { token: "radius-3xl", use: "Hero sections, marketing cards" },
            { token: "radius-4xl", use: "Decorative hero tiles" },
            { token: "radius-full", use: "Pills, avatars, circular buttons" },
          ].map((item) => (
            <div
              key={item.token}
              style={{
                padding: "14px 16px",
                border: "1px solid var(--color-neutral-200)",
                borderRadius: 12,
                background: "var(--color-white)",
                boxShadow: "var(--shadow-xs)",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <code
                style={{
                  ...codeStyle,
                  alignSelf: "flex-start",
                  background: "var(--color-ep-50)",
                  borderColor: "var(--color-ep-200)",
                  color: "var(--color-ep-800)",
                }}
              >
                {item.token}
              </code>
              <div style={{ fontSize: 13, color: "var(--color-neutral-700)" }}>
                {item.use}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  ),
};

/** The curved corner preview used in the Scale table. */
const RadiusCorner: React.FC<{ value: number }> = ({ value }) => {
  const size = 72;
  // Clamp to the preview size so 9999 still shows as a full curve.
  const display = Math.min(value, size);
  return (
    <div
      aria-hidden
      style={{
        width: size,
        height: size / 2,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          background: "var(--color-ep-50)",
          border: "2px solid var(--color-ep-500)",
          borderTopLeftRadius: display,
        }}
      />
    </div>
  );
};

const th: React.CSSProperties = {
  padding: "11px 16px",
  fontWeight: 600,
  fontSize: 11,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "var(--color-neutral-600)",
  borderBottom: "1px solid var(--color-neutral-200)",
  whiteSpace: "nowrap",
};

const td: React.CSSProperties = {
  padding: "14px 16px",
  verticalAlign: "middle",
  borderBottom: "1px solid var(--color-neutral-100)",
};

const codeStyle: React.CSSProperties = {
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
  fontSize: 12,
  color: "var(--color-neutral-800)",
  background: "var(--color-neutral-50)",
  padding: "4px 8px",
  borderRadius: 4,
  border: "1px solid var(--color-neutral-200)",
  display: "inline-block",
};
