import type { Meta, StoryObj } from "@storybook/react";
import { PageHeader } from "../components/PageHeader";
import { Section } from "../components/Section";
import { Callout } from "../components/Callout";
import { TokenTable } from "../components/TokenTable";
import { CopyButton } from "../components/CopyButton";
import {
  backdropBlur,
  backdropBlurOrder,
  hexToRgba,
  type BackdropBlurSize,
  type BackdropBlurTheme,
} from "../tokens/backdropBlur";

/**
 * Backdrop blur creates a frosted-glass effect for panels, sheets, and
 * overlays placed over content (photos, video, colored backgrounds).
 *
 * Each token pairs a **blur radius** with a theme-specific **tint + opacity**.
 * Use the light tint on light-mode surfaces, the dark tint on dark-mode
 * surfaces. The blur radius stays the same across themes — only the tint
 * flips.
 */
const meta: Meta<typeof BlurPlayground> = {
  title: "Foundation/Effects/Backdrop Blur",
  component: BlurPlayground,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  argTypes: {
    size: {
      control: "select",
      options: backdropBlurOrder,
      description: "Blur size token.",
      table: { category: "Token" },
    },
    theme: {
      control: "radio",
      options: ["light", "dark"],
      description: "Theme tint to apply.",
      table: { category: "Token" },
    },
    label: {
      control: "text",
      description: "Card label.",
      table: { category: "Content" },
    },
  },
};
export default meta;

// High-quality Unsplash image, royalty-free, used purely as a visual backdrop.
const BACKDROP_IMAGE =
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1600&q=80";

interface PlaygroundProps {
  size: BackdropBlurSize;
  theme: BackdropBlurTheme;
  label: string;
}

function BlurPlayground({ size, theme, label }: PlaygroundProps) {
  const token = backdropBlur[size];
  const bg = hexToRgba(token.tint[theme], token.opacity);
  const cssSnippet = `background: ${bg};
backdrop-filter: blur(var(--backdrop-blur-${size}));
-webkit-backdrop-filter: blur(var(--backdrop-blur-${size}));`;

  return (
    <div style={{ padding: 32, maxWidth: 1200, margin: "0 auto" }}>
      <div
        style={{
          borderRadius: 16,
          overflow: "hidden",
          border: "1px solid var(--color-neutral-200)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <div
          style={{
            padding: 40,
            backgroundImage: `url(${BACKDROP_IMAGE})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: 280,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <BlurCard theme={theme} size={size} label={label} />
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            background: "var(--color-neutral-25)",
            borderTop: "1px solid var(--color-neutral-200)",
          }}
        >
          <Stat label="Token" value={`backdrop-blur-${size}`} />
          <Stat label="Blur" value={`${token.blur}px`} mono divider />
          <Stat
            label="Opacity"
            value={`${Math.round(token.opacity * 100)}%`}
            mono
            divider
          />
          <Stat label="Theme" value={theme} mono divider />
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <TokenTable
          searchable={false}
          title="Copy-ready CSS"
          rows={[
            {
              name: `backdrop-blur-${size}`,
              value: `${token.blur}px · ${theme}`,
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
        textTransform: mono && label === "Theme" ? "capitalize" : "none",
      }}
    >
      {value}
    </div>
  </div>
);

interface BlurCardProps {
  size: BackdropBlurSize;
  theme: BackdropBlurTheme;
  label?: string;
}

/**
 * A single frosted-glass card. Exported so the Gallery can reuse it.
 */
const BlurCard: React.FC<BlurCardProps> = ({ size, theme, label }) => {
  const token = backdropBlur[size];
  const tint = token.tint[theme];
  const bg = hexToRgba(tint, token.opacity);
  const textColor = theme === "light" ? "#181d27" : "#fafafa";
  const mutedColor = theme === "light" ? "#535862" : "#cecfd2";
  const borderColor =
    theme === "light" ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.08)";

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 420,
        padding: "22px 24px",
        borderRadius: 14,
        background: bg,
        border: `1px solid ${borderColor}`,
        backdropFilter: `blur(${token.blur}px)`,
        WebkitBackdropFilter: `blur(${token.blur}px)`,
        color: textColor,
        boxShadow:
          theme === "light"
            ? "0 8px 24px -6px rgba(10,13,18,0.25)"
            : "0 8px 24px -6px rgba(0,0,0,0.5)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 28,
          gap: 12,
        }}
      >
        <strong style={{ fontSize: 15, fontWeight: 600 }}>
          {label ?? `backdrop-blur-${size}`}
        </strong>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 12,
            color: mutedColor,
            fontWeight: 500,
          }}
        >
          <ThemeGlyph theme={theme} />
          {theme}
        </span>
      </div>
      <div style={{ fontSize: 11, color: mutedColor, fontFamily: "var(--sb-font-mono)" }}>
        Color: {tint.toUpperCase()} · Opacity:{" "}
        {Math.round(token.opacity * 100)}% · Blur: {token.blur}
      </div>
    </div>
  );
};

const ThemeGlyph: React.FC<{ theme: BackdropBlurTheme }> = ({ theme }) =>
  theme === "light" ? (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="4" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M12 3v2" />
        <path d="M12 19v2" />
        <path d="M3 12h2" />
        <path d="M19 12h2" />
        <path d="M5.6 5.6l1.4 1.4" />
        <path d="M17 17l1.4 1.4" />
        <path d="M5.6 18.4l1.4-1.4" />
        <path d="M17 7l1.4-1.4" />
      </g>
    </svg>
  ) : (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"
        fill="currentColor"
      />
    </svg>
  );

export const Playground: StoryObj<typeof BlurPlayground> = {
  args: { size: "md", theme: "light", label: "Frosted card" },
  parameters: { docs: { disable: true } },
};

/** Every size, rendered in light and dark, over a real photo backdrop. */
export const Gallery: StoryObj = {
  parameters: { controls: { disable: true }, layout: "fullscreen" },
  render: () => (
    <div style={{ padding: 32, maxWidth: 1200, margin: "0 auto" }}>
      <PageHeader
        title="Backdrop blur"
        description="Translucent surfaces for panels, sheets, and floating UI placed over content. Four sizes × two theme tints, rendered over a photo so you can see how each combination reads."
        meta={[
          { label: "sizes", value: "4" },
          { label: "themes", value: "2" },
          { label: "range", value: "8 → 40 px" },
        ]}
      />

      <Callout kind="info" title="Browser support">
        <code>backdrop-filter</code> is supported in all modern browsers.
        Include <code>-webkit-backdrop-filter</code> for older Safari. Provide a
        solid-color fallback (no blur) so the surface still reads on unsupported
        browsers.
      </Callout>
      <div style={{ height: 24 }} />

      <div
        style={{
          borderRadius: 16,
          overflow: "hidden",
          border: "1px solid var(--color-neutral-200)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <div
          style={{
            padding: 40,
            backgroundImage: `url(${BACKDROP_IMAGE})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 20,
            }}
          >
            {backdropBlurOrder.map((size) => (
              <div
                key={size}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                }}
              >
                <BlurCard size={size} theme="light" />
                <BlurCard size={size} theme="dark" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
};

/** Token reference table. */
export const Reference: StoryObj = {
  parameters: { controls: { disable: true }, layout: "fullscreen" },
  render: () => (
    <div style={{ padding: 32, maxWidth: 1200, margin: "0 auto" }}>
      <PageHeader
        title="Backdrop blur reference"
        description="Every size with its blur radius and CSS variable."
      />
      <Section
        title="Blur sizes"
        description="The radius is theme-agnostic. Apply it with a matching tint from the token pair."
      >
        <TokenTable
          rows={backdropBlurOrder.map((size) => {
            const t = backdropBlur[size];
            return {
              name: `backdrop-blur-${size}`,
              value: `${t.blur}px`,
              cssVar: `var(--backdrop-blur-${size})`,
              preview: (
                <div
                  aria-hidden
                  style={{
                    position: "relative",
                    width: 84,
                    height: 48,
                    borderRadius: 8,
                    overflow: "hidden",
                    backgroundImage: `url(${BACKDROP_IMAGE})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      margin: "auto",
                      width: 56,
                      height: 28,
                      borderRadius: 6,
                      background: "rgba(255,255,255,0.6)",
                      backdropFilter: `blur(${t.blur}px)`,
                      WebkitBackdropFilter: `blur(${t.blur}px)`,
                      top: 10,
                      left: 14,
                    }}
                  />
                </div>
              ),
            };
          })}
          previewHeader="Preview"
          valueHeader="Blur"
          searchable={false}
        />
      </Section>

      <Section
        title="Theme tints"
        description="Shared across every blur size. Swap based on surface theme; don't hand-pick a custom alpha."
      >
        <TokenTable
          searchable={false}
          rows={[
            {
              name: "backdrop-bg-light",
              value: "rgba(255, 255, 255, 0.6)",
              cssVar: "var(--backdrop-bg-light)",
              preview: (
                <TintSwatch color="#ffffff" opacity={0.6} label="light" />
              ),
            },
            {
              name: "backdrop-bg-dark",
              value: "rgba(0, 0, 0, 0.6)",
              cssVar: "var(--backdrop-bg-dark)",
              preview: (
                <TintSwatch color="#000000" opacity={0.6} label="dark" />
              ),
            },
          ]}
          previewHeader="Preview"
          valueHeader="rgba()"
        />
      </Section>

      <Section
        title="Usage"
        description="Apply blur + matching tint + a subtle border. Always include a fallback background for unsupported browsers."
      >
        <div
          style={{
            border: "1px solid var(--color-neutral-200)",
            borderRadius: 12,
            overflow: "hidden",
            background: "var(--color-neutral-25)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 14px",
              borderBottom: "1px solid var(--color-neutral-200)",
              background: "var(--color-neutral-50)",
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "var(--color-neutral-600)",
              }}
            >
              CSS
            </span>
            <CopyButton
              value={`.glass-panel {
  background: var(--backdrop-bg-light);
  backdrop-filter: blur(var(--backdrop-blur-md));
  -webkit-backdrop-filter: blur(var(--backdrop-blur-md));
  border: 1px solid var(--backdrop-border-light);
  border-radius: 12px;
}

[data-theme="dark"] .glass-panel {
  background: var(--backdrop-bg-dark);
  border-color: var(--backdrop-border-dark);
}`}
              label="Copy"
            />
          </div>
          <pre
            style={{
              margin: 0,
              padding: 16,
              fontFamily: "var(--sb-font-mono)",
              fontSize: 12.5,
              lineHeight: 1.65,
              color: "var(--color-neutral-800)",
              overflowX: "auto",
            }}
          >
            <code>{`.glass-panel {
  background: var(--backdrop-bg-light);
  backdrop-filter: blur(var(--backdrop-blur-md));
  -webkit-backdrop-filter: blur(var(--backdrop-blur-md));
  border: 1px solid var(--backdrop-border-light);
  border-radius: 12px;
}

[data-theme="dark"] .glass-panel {
  background: var(--backdrop-bg-dark);
  border-color: var(--backdrop-border-dark);
}`}</code>
          </pre>
        </div>
      </Section>
    </div>
  ),
};

const TintSwatch: React.FC<{ color: string; opacity: number; label: string }> = ({
  color,
  opacity,
  label,
}) => (
  <div
    aria-label={`${label} tint`}
    style={{
      position: "relative",
      width: 84,
      height: 48,
      borderRadius: 8,
      overflow: "hidden",
      backgroundImage: `url(${BACKDROP_IMAGE})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: hexToRgba(color, opacity),
      }}
    />
  </div>
);
