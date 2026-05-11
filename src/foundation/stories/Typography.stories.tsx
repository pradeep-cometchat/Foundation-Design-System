import type { Meta, StoryObj } from "@storybook/react";
import { Section } from "../components/Section";
import { PageHeader } from "../components/PageHeader";
import { TokenTable } from "../components/TokenTable";
import { CopyButton } from "../components/CopyButton";
import { Callout } from "../components/Callout";
import {
  fontSize,
  fontWeight,
  lineHeight,
  textStyles,
  type FontWeightToken,
  type TextStyleKey,
} from "../tokens/typography";

const lineHeightCssName: Record<keyof typeof lineHeight, string> = {
  title: "--line-height-title",
  h1: "--line-height-h1",
  h2: "--line-height-h2",
  h3: "--line-height-h3",
  h4: "--line-height-h4",
  body: "--line-height-body",
  caption1: "--line-height-caption-1",
  caption2: "--line-height-caption-2",
};

/**
 * Type styles are composed from four primitives: **font size**, **font weight**,
 * **line height**, and **letter spacing**. Use a semantic style (`body`, `h1`,
 * `caption1`, etc.) rather than hand-picking values so rhythm stays consistent
 * and future changes cascade automatically.
 *
 * Font family: **Inter** (loaded from Google Fonts), exposed as
 * `var(--font-family-heading)` and `var(--font-family-body)`.
 */
const meta: Meta<typeof TypePlayground> = {
  title: "Foundation/Typography",
  component: TypePlayground,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  argTypes: {
    style: {
      control: "select",
      options: Object.keys(textStyles),
      description: "Semantic text style.",
      table: { category: "Token" },
    },
    weight: {
      control: "select",
      options: Object.keys(fontWeight) as FontWeightToken[],
      description: "Font weight.",
      table: { category: "Token" },
    },
    sample: {
      control: "text",
      description: "Preview text.",
      table: { category: "Content" },
    },
  },
};
export default meta;

interface PlaygroundProps {
  style: TextStyleKey;
  weight: FontWeightToken;
  sample: string;
}

function TypePlayground({ style, weight, sample }: PlaygroundProps) {
  const token = textStyles[style];
  const cssSnippet = `font-size: var(--font-size-${token.sizeKey});\nline-height: var(${lineHeightCssName[token.lineHeightKey]});\nfont-weight: var(--font-weight-${weight});`;

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
            padding: "48px 40px",
            background:
              "linear-gradient(180deg, var(--color-neutral-25) 0%, var(--color-white) 100%)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-family-heading)",
              fontSize: token.sizePx,
              lineHeight: `${token.lineHeightPx}px`,
              fontWeight: fontWeight[weight],
              textDecoration: token.decoration ?? "none",
              color: "var(--color-neutral-900)",
            }}
          >
            {sample}
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            borderTop: "1px solid var(--color-neutral-200)",
            background: "var(--color-neutral-25)",
          }}
        >
          <Stat label="Style" value={token.name} />
          <Stat
            label="Font size"
            value={`${token.sizePx}px`}
            mono
            divider
          />
          <Stat
            label="Line height"
            value={`${token.lineHeightPx}px`}
            mono
            divider
          />
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <TokenTable
          searchable={false}
          title="Copy-ready CSS"
          rows={[
            {
              name: `${token.name} / ${weight}`,
              value: `${token.sizePx}px · ${token.lineHeightPx}px · ${fontWeight[weight]}`,
              cssVar: cssSnippet,
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
        fontSize: 15,
        fontWeight: 600,
        color: "var(--color-neutral-900)",
      }}
    >
      {value}
    </div>
  </div>
);

export const Playground: StoryObj<typeof TypePlayground> = {
  args: {
    style: "h1",
    weight: "semibold",
    sample: "The quick brown fox jumps over the lazy dog",
  },
  parameters: { docs: { disable: true } },
};

/** Every font-size step and what it maps to. */
export const Scale: StoryObj = {
  parameters: { controls: { disable: true }, layout: "fullscreen" },
  render: () => (
    <div style={{ padding: 32, maxWidth: 1200, margin: "0 auto" }}>
      <PageHeader
        title="Font size scale"
        description="Every font-size token, smallest to largest. Each row shows a live Aa preview alongside the CSS variable."
        meta={[
          { label: "steps", value: "8" },
          { label: "range", value: "10 → 32 px" },
        ]}
      />
      <TokenTable
        rows={Object.entries(fontSize).map(([key, value]) => ({
          name: `fontSize.${key}`,
          value: `${value}px`,
          cssVar: `var(--font-size-${key})`,
          preview: (
            <span
              style={{
                fontSize: value,
                fontFamily: "var(--font-family-heading)",
                fontWeight: 600,
                color: "var(--color-neutral-900)",
                lineHeight: 1,
              }}
            >
              Aa
            </span>
          ),
        }))}
        previewHeader="Preview"
        valueHeader="Size"
      />
    </div>
  ),
};

/** Line-height tokens. */
export const LineHeights: StoryObj = {
  parameters: { controls: { disable: true }, layout: "fullscreen" },
  render: () => (
    <div style={{ padding: 32, maxWidth: 1200, margin: "0 auto" }}>
      <PageHeader
        title="Line heights"
        description="Absolute line heights per text tier. Pair each font-size step with its matching line-height for correct rhythm."
        meta={[{ label: "tokens", value: "8" }]}
      />
      <TokenTable
        rows={Object.entries(lineHeight).map(([key, value]) => ({
          name: `lineHeight.${key}`,
          value: `${value}px`,
          cssVar: `var(${lineHeightCssName[key as keyof typeof lineHeight]})`,
          preview: (
            <span
              aria-hidden
              style={{
                display: "inline-block",
                width: value,
                height: 8,
                borderRadius: 2,
                background: "var(--color-ep-500)",
              }}
            />
          ),
        }))}
        previewHeader="Preview"
        valueHeader="Value"
      />
    </div>
  ),
};

/** All semantic text styles rendered with every available weight. */
export const Styles: StoryObj = {
  parameters: { controls: { disable: true }, layout: "fullscreen" },
  render: () => (
    <div style={{ padding: 32, maxWidth: 1200, margin: "0 auto" }}>
      <PageHeader
        title="Text styles"
        description="Every semantic style paired with every supported weight. Copy a ready-to-paste CSS snippet from any row."
        meta={[
          { label: "styles", value: String(Object.keys(textStyles).length) },
          { label: "weights", value: String(Object.keys(fontWeight).length) },
        ]}
      />
      <Callout kind="tip">
        Prefer semantic styles (<code>body</code>, <code>h1</code>,{" "}
        <code>caption1</code>) over hand-picking font-size and line-height.
        Swapping a style later is one edit; swapping a magic number is many.
      </Callout>
      <div style={{ height: 24 }} />
      {Object.entries(textStyles).map(([key, token]) => (
        <Section
          key={key}
          title={token.name}
          description={
            <>
              <code>{token.sizePx}px</code> ·{" "}
              <code>line-height: {token.lineHeightPx}px</code> · weights:{" "}
              {token.weights.join(", ")}
              {token.decoration ? ` · ${token.decoration}` : ""}
            </>
          }
        >
          <div style={{ display: "grid", gap: 10 }}>
            {token.weights.map((w) => (
              <div
                key={w}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto auto",
                  alignItems: "center",
                  gap: 16,
                  padding: "14px 18px",
                  border: "1px solid var(--color-neutral-200)",
                  borderRadius: 10,
                  background: "var(--color-white)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-family-heading)",
                    fontSize: token.sizePx,
                    lineHeight: `${token.lineHeightPx}px`,
                    fontWeight: fontWeight[w],
                    textDecoration: token.decoration ?? "none",
                    color: "var(--color-neutral-900)",
                    minWidth: 0,
                  }}
                >
                  {token.name} · {w}
                </span>
                <span
                  style={{
                    fontFamily: "var(--sb-font-mono)",
                    fontSize: 12,
                    color: "var(--color-neutral-600)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {token.sizePx}px / {token.lineHeightPx}px · {fontWeight[w]}
                </span>
                <CopyButton
                  value={`font-size: var(--font-size-${token.sizeKey}); line-height: var(${lineHeightCssName[token.lineHeightKey]}); font-weight: var(--font-weight-${w});`}
                  label="Copy CSS"
                  variant="solid"
                />
              </div>
            ))}
          </div>
        </Section>
      ))}
    </div>
  ),
};

/** Font weight reference. */
export const Weights: StoryObj = {
  parameters: { controls: { disable: true }, layout: "fullscreen" },
  render: () => (
    <div style={{ padding: 32, maxWidth: 1200, margin: "0 auto" }}>
      <PageHeader
        title="Font weights"
        description="Four weights map to CSS numeric values. Apply via var(--font-weight-<key>)."
        meta={[{ label: "weights", value: "4" }]}
      />
      <TokenTable
        rows={Object.entries(fontWeight).map(([key, value]) => ({
          name: `fontWeight.${key}`,
          value: String(value),
          cssVar: `var(--font-weight-${key})`,
          preview: (
            <span
              style={{
                fontFamily: "var(--font-family-heading)",
                fontWeight: value,
                fontSize: 18,
                color: "var(--color-neutral-900)",
              }}
            >
              Aa
            </span>
          ),
        }))}
        previewHeader="Preview"
        valueHeader="Weight"
      />
    </div>
  ),
};
