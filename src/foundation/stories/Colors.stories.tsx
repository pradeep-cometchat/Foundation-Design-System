import type { Meta, StoryObj } from "@storybook/react";
import { Swatch } from "../components/Swatch";
import { Section } from "../components/Section";
import { PageHeader } from "../components/PageHeader";
import { Callout } from "../components/Callout";
import { TokenTable } from "../components/TokenTable";
import { contrastRatio, wcagRating } from "../components/contrast";
import {
  extendedPrimary,
  neutralLight,
  neutralDark,
  info,
  warning,
  success,
  error,
  primaryColors,
} from "../tokens/colors";

/**
 * Seven color families power the product: Primary, Extended Primary, two
 * Neutral palettes (light & dark mode), and four semantic palettes for state
 * (Info, Warning, Success, Error).
 *
 * Pick a shade with the control on the Playground, or browse the full system
 * on "All palettes". The Accessibility audit shows WCAG contrast on every
 * shade against white and black.
 */
const meta: Meta<typeof ColorStory> = {
  title: "Foundation/Colors",
  component: ColorStory,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Pick a shade with the control. Copy the hex value or CSS variable directly from the swatch. The contrast badge shows the best WCAG rating against white or black.",
      },
    },
  },
  argTypes: {
    family: {
      control: "select",
      options: [
        "extendedPrimary",
        "neutralLight",
        "neutralDark",
        "info",
        "warning",
        "success",
        "error",
      ],
      description: "Color family to sample from.",
      table: { category: "Token" },
    },
    shade: {
      control: "select",
      options: [
        "25",
        "50",
        "100",
        "200",
        "300",
        "400",
        "500",
        "600",
        "700",
        "800",
        "900",
        "950",
      ],
      description: "Shade within the selected family.",
      table: { category: "Token" },
    },
  },
};
export default meta;

type FamilyKey =
  | "extendedPrimary"
  | "neutralLight"
  | "neutralDark"
  | "info"
  | "warning"
  | "success"
  | "error";

const familyMap: Record<FamilyKey, Record<string, string>> = {
  extendedPrimary,
  neutralLight,
  neutralDark,
  info,
  warning,
  success,
  error,
};

const cssPrefix: Record<FamilyKey, string> = {
  extendedPrimary: "--color-ep-",
  neutralLight: "--color-neutral-lm-",
  neutralDark: "--color-neutral-dm-",
  info: "--color-info-",
  warning: "--color-warning-",
  success: "--color-success-",
  error: "--color-error-",
};

const familyLabel: Record<FamilyKey, string> = {
  extendedPrimary: "Extended Primary",
  neutralLight: "Neutral (Light)",
  neutralDark: "Neutral (Dark)",
  info: "Info",
  warning: "Warning",
  success: "Success",
  error: "Error",
};

interface ColorStoryProps {
  family: FamilyKey;
  shade: string;
}

function ColorStory({ family, shade }: ColorStoryProps) {
  const palette = familyMap[family];
  const resolvedShade = palette[shade] ? shade : Object.keys(palette)[0];
  const value = palette[resolvedShade];
  const cssVar = `var(${cssPrefix[family]}${resolvedShade})`;
  const onWhite = contrastRatio(value, "#ffffff");
  const onBlack = contrastRatio(value, "#000000");
  const bestRatio = Math.max(onWhite, onBlack);
  const bestRating = wcagRating(bestRatio);
  const bestAgainst = onWhite >= onBlack ? "white" : "black";

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
          aria-label={`${familyLabel[family]} ${resolvedShade} preview`}
          style={{
            background: value,
            height: 200,
            display: "flex",
            alignItems: "flex-end",
            padding: 24,
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12,
              fontWeight: 600,
              padding: "5px 10px",
              borderRadius: 999,
              background: "var(--color-white)",
              color:
                bestRating === "AAA" || bestRating === "AA"
                  ? "var(--color-success-700)"
                  : bestRating === "AA Large"
                  ? "var(--color-warning-700)"
                  : "var(--color-error-700)",
              boxShadow: "var(--shadow-sm)",
            }}
            title={`Best against ${bestAgainst}: ${bestRatio.toFixed(2)}:1`}
          >
            {bestRating} · {bestRatio.toFixed(2)}:1
          </span>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            borderTop: "1px solid var(--color-neutral-200)",
            background: "var(--color-neutral-25)",
          }}
        >
          <Stat label="Family" value={familyLabel[family]} />
          <Stat label="Shade" value={resolvedShade} mono divider />
          <Stat label="Hex" value={value.toUpperCase()} mono divider />
          <Stat label="CSS variable" value={cssVar} mono divider />
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 16,
          marginTop: 20,
        }}
      >
        <Callout kind="tip" title="How to read the contrast">
          The pill on the preview shows the best WCAG 2.1 rating achievable
          against pure white or pure black. Aim for <strong>AA (4.5:1)</strong>{" "}
          for body text and <strong>AA Large (3:1)</strong> for icons and large
          text.
        </Callout>
        <Callout kind="info" title="Missing shades">
          Some semantic palettes omit <code>600</code> by design. When the
          selected shade doesn't exist, the Playground falls back to the first
          available shade.
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

export const Playground: StoryObj<typeof ColorStory> = {
  args: { family: "extendedPrimary", shade: "500" },
  parameters: { docs: { disable: true } },
};

/** Full palette reference — every family, every shade. */
export const AllPalettes: StoryObj = {
  parameters: { controls: { disable: true }, layout: "fullscreen" },
  render: () => (
    <div style={{ padding: 32, maxWidth: 1200, margin: "0 auto" }}>
      <PageHeader
        title="Colors"
        description="The complete color system. Hover any swatch to see the hex value, click to copy. Badges reflect the best WCAG contrast against white or black."
        meta={[
          { label: "families", value: "7" },
          { label: "tokens", value: "74" },
          { label: "scale", value: "25 → 950" },
        ]}
      />

      <Section
        title="Primary"
        description="The brand anchor. Use Primary for your main CTA and key brand moments."
      >
        <SwatchGrid
          entries={Object.entries(primaryColors)}
          cssVarOf={(k) =>
            k === "primary"
              ? "var(--color-primary)"
              : "var(--color-white)"
          }
          labelOf={(k) => (k === "primary" ? "primary" : "white")}
        />
      </Section>

      <Section
        title="Extended Primary"
        description="The full 12-step tint/shade of the brand. Use for hovers, backgrounds, and subtle surfaces."
      >
        <SwatchGrid
          entries={Object.entries(extendedPrimary)}
          cssVarOf={(k) => `var(--color-ep-${k})`}
          labelOf={(k) => `ep-${k}`}
        />
      </Section>

      <Section
        title="Neutral · Light Mode"
        description="Surfaces, text, and dividers for light backgrounds. In app code, prefer --color-neutral-<shade>; it automatically swaps to dark values under [data-theme='dark']."
      >
        <SwatchGrid
          entries={Object.entries(neutralLight)}
          cssVarOf={(k) => `var(--color-neutral-lm-${k})`}
          labelOf={(k) => `neutral-lm-${k}`}
        />
      </Section>

      <Section
        title="Neutral · Dark Mode"
        description="Paired values for dark backgrounds."
      >
        <SwatchGrid
          entries={Object.entries(neutralDark)}
          cssVarOf={(k) => `var(--color-neutral-dm-${k})`}
          labelOf={(k) => `neutral-dm-${k}`}
        />
      </Section>

      <Section
        title="Info"
        description="Informational states: links, banners, non-destructive notices."
      >
        <SemanticGrid scale={info} family="info" />
      </Section>

      <Section
        title="Warning"
        description="Non-blocking cautions. Use sparingly to avoid normalization."
      >
        <SemanticGrid scale={warning} family="warning" />
      </Section>

      <Section
        title="Success"
        description="Confirmation, completed states, positive outcomes."
      >
        <SemanticGrid scale={success} family="success" />
      </Section>

      <Section
        title="Error"
        description="Destructive actions and blocking error states."
      >
        <SemanticGrid scale={error} family="error" />
      </Section>
    </div>
  ),
};

/** Contrast reference — every shade against #fff and #000. */
export const AccessibilityAudit: StoryObj = {
  parameters: { controls: { disable: true }, layout: "fullscreen" },
  render: () => (
    <div style={{ padding: 32, maxWidth: 1200, margin: "0 auto" }}>
      <PageHeader
        title="Accessibility audit"
        description="Contrast ratios against white and black for every shade. Use this to pick safe foreground/background pairings without guessing."
        meta={[
          { label: "AAA", value: "≥ 7:1" },
          { label: "AA", value: "≥ 4.5:1" },
          { label: "AA Large", value: "≥ 3:1" },
        ]}
      />
      <Section title="Extended Primary">
        <TokenTable
          rows={toContrastRows(extendedPrimary, "--color-ep-")}
          previewHeader="Shade"
          valueHeader="Hex"
          searchable={false}
        />
      </Section>
      <Section title="Neutral (Light Mode)">
        <TokenTable
          rows={toContrastRows(neutralLight, "--color-neutral-lm-")}
          previewHeader="Shade"
          valueHeader="Hex"
          searchable={false}
        />
      </Section>
      <Section title="Info">
        <TokenTable
          rows={toContrastRows(info, "--color-info-")}
          previewHeader="Shade"
          valueHeader="Hex"
          searchable={false}
        />
      </Section>
      <Section title="Warning">
        <TokenTable
          rows={toContrastRows(warning, "--color-warning-")}
          previewHeader="Shade"
          valueHeader="Hex"
          searchable={false}
        />
      </Section>
      <Section title="Success">
        <TokenTable
          rows={toContrastRows(success, "--color-success-")}
          previewHeader="Shade"
          valueHeader="Hex"
          searchable={false}
        />
      </Section>
      <Section title="Error">
        <TokenTable
          rows={toContrastRows(error, "--color-error-")}
          previewHeader="Shade"
          valueHeader="Hex"
          searchable={false}
        />
      </Section>
    </div>
  ),
};

function SwatchGrid({
  entries,
  cssVarOf,
  labelOf,
}: {
  entries: [string, string][];
  cssVarOf: (key: string) => string;
  labelOf: (key: string) => string;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        gap: 14,
      }}
    >
      {entries.map(([key, value]) => (
        <Swatch
          key={key}
          name={labelOf(key)}
          value={value}
          cssVar={cssVarOf(key)}
        />
      ))}
    </div>
  );
}

function SemanticGrid({
  scale,
  family,
}: {
  scale: Record<string, string>;
  family: string;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        gap: 14,
      }}
    >
      {sortSemanticEntries(scale).map(([key, value]) => {
        const label = key === "base" ? family : `${family}-${key}`;
        const cssVar =
          key === "base"
            ? `var(--color-${family})`
            : `var(--color-${family}-${key})`;
        return <Swatch key={key} name={label} value={value} cssVar={cssVar} />;
      })}
    </div>
  );
}

/**
 * Order semantic palette entries: `base` first, then numeric shades ascending.
 * Needed because JS object iteration puts integer-like keys before string keys.
 */
function sortSemanticEntries(scale: Record<string, string>) {
  return Object.entries(scale).sort(([a], [b]) => {
    if (a === "base") return -1;
    if (b === "base") return 1;
    return Number(a) - Number(b);
  });
}

function toContrastRows(scale: Record<string, string>, prefix: string) {
  return sortSemanticEntries(scale).map(([key, value]) => {
    const onWhite = contrastRatio(value, "#ffffff");
    const onBlack = contrastRatio(value, "#000000");
    return {
      name:
        key === "base"
          ? prefix.replace(/-$/, "").replace(/^--color-/, "")
          : `${prefix.replace(/^--color-/, "")}${key}`,
      value,
      cssVar:
        key === "base"
          ? `var(${prefix.replace(/-$/, "")})`
          : `var(${prefix}${key})`,
      preview: (
        <div
          aria-hidden
          style={{
            width: 56,
            height: 28,
            borderRadius: 6,
            background: value,
            border: "1px solid var(--color-neutral-200)",
          }}
        />
      ),
      description: `On white ${onWhite.toFixed(2)}:1 (${wcagRating(
        onWhite
      )}) · On black ${onBlack.toFixed(2)}:1 (${wcagRating(onBlack)})`,
    };
  });
}
