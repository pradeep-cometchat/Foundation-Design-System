import type { Meta, StoryObj } from "@storybook/react";
import { FoundationCard } from "../components/FoundationCard";
import { CardMeta, ConventionCard, HeroChip, cardPreview, cardDesc, panelStyle, panelLabel, panelP, codePre } from "../components/IntroHelpers";

const meta: Meta = {
  title: "Foundation/Introduction",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    actions: { disable: true },
  },
};
export default meta;

export const Overview: StoryObj = {
  render: () => <IntroductionPage />,
};

function IntroductionPage() {
  return (
    <div style={{ padding: "40px 48px 80px", maxWidth: 1100, margin: "0 auto" }}>
      {/* HERO */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "48px 40px",
          borderRadius: 20,
          background:
            "radial-gradient(120% 120% at 0% 0%, var(--color-ep-100) 0%, var(--color-ep-50) 35%, var(--color-white) 75%)",
          border: "1px solid var(--color-ep-100)",
          marginBottom: 40,
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 320,
            height: 320,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, var(--color-ep-200) 0%, transparent 70%)",
            opacity: 0.7,
          }}
        />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 720 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--color-ep-700)",
              background: "var(--color-white)",
              padding: "6px 12px",
              borderRadius: 999,
              border: "1px solid var(--color-ep-200)",
              boxShadow: "var(--shadow-xs)",
              marginBottom: 16,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--color-ep-500)",
              }}
            />
            Foundation · v0.1
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: 44,
              lineHeight: 1.08,
              fontWeight: 700,
              letterSpacing: "-0.025em",
              color: "var(--color-neutral-900)",
            }}
          >
            The foundation design system
          </h1>
          <p
            style={{
              margin: "16px 0 0",
              fontSize: 17,
              lineHeight: 1.55,
              color: "var(--color-neutral-700)",
            }}
          >
            Tokens for color, typography, spacing, radius, icons, and effects.
            The lowest-level decisions every component, pattern, and screen
            inherits from. Treat these as the single source of truth — if a
            value isn't here, it shouldn't be in a component.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 24 }}>
            <HeroChip label="foundations" value="7" />
            <HeroChip label="tokens" value="180+" />
            <HeroChip label="themes" value="Light · Dark" />
            <HeroChip label="font" value="Inter" />
          </div>
        </div>
      </div>

      {/* WHAT'S INSIDE */}
      <SectionHeading>What's inside</SectionHeading>
      <p style={{ color: "var(--color-neutral-600)", marginTop: 0, maxWidth: 720, fontSize: 14, lineHeight: 1.6 }}>
        Seven foundations work together. Click any card to open its docs.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 14,
          margin: "20px 0 40px",
        }}
      >
        <FoundationCard docsPath="foundation-colors--docs">
          <div style={cardPreview}>
            <div style={{ display: "flex", gap: 6 }}>
              {["#ebe9fe", "#9b8afb", "#6852d6", "#4a1fb8", "#27115f"].map((c) => (
                <div key={c} style={{ width: 36, height: 36, borderRadius: 8, background: c, border: "1px solid var(--color-neutral-200)" }} />
              ))}
            </div>
          </div>
          <CardMeta name="Colors" count="7 families · 74 tokens" />
          <div style={cardDesc}>Primary, Extended Primary, Neutral (light & dark), plus semantic palettes for Info, Warning, Success, and Error.</div>
        </FoundationCard>

        <FoundationCard docsPath="foundation-typography--docs">
          <div style={cardPreview}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--color-neutral-900)", lineHeight: 1 }}>Aa</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 2, color: "var(--color-neutral-600)", fontSize: 11 }}>
                <span>Title · 32/40</span>
                <span>Body · 14/20</span>
                <span>Caption · 12/18</span>
              </div>
            </div>
          </div>
          <CardMeta name="Typography" count="10 styles · 4 weights" />
          <div style={cardDesc}>8 font sizes, 8 matching line heights, 10 semantic text styles. Inter across the board.</div>
        </FoundationCard>

        <FoundationCard docsPath="foundation-spacing--docs">
          <div style={cardPreview}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {[12, 24, 48, 80, 120].map((w) => (
                <div key={w} style={{ width: w, height: 6, borderRadius: 2, background: "var(--color-ep-500)" }} />
              ))}
            </div>
          </div>
          <CardMeta name="Spacing" count="32 tokens" />
          <div style={cardDesc}>A 4px scale with half-steps at the small end. 0 through 1920 px — use for padding, margin, and gap.</div>
        </FoundationCard>

        <FoundationCard docsPath="foundation-radius--docs">
          <div style={cardPreview}>
            <div style={{ display: "flex" }}>
              {[0, 4, 8, 12, 20, 999].map((r) => (
                <div key={r} style={{ width: 26, height: 26, background: "var(--color-ep-100)", border: "1.5px solid var(--color-ep-500)", borderRadius: r, marginRight: 6 }} />
              ))}
            </div>
          </div>
          <CardMeta name="Radius" count="11 tokens" />
          <div style={cardDesc}>Rounding scale from <code>none</code> through <code>4xl</code>, plus <code>full</code> for pills and circles.</div>
        </FoundationCard>

        <FoundationCard docsPath="foundation-icons--docs">
          <div style={cardPreview}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
              {["home", "favorite", "search", "settings"].map((n) => (
                <span key={n} className="icon-outlined" data-icon="outlined" style={{ fontFamily: "Material Symbols Outlined", fontSize: 22, color: "var(--color-neutral-800)", fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>{n}</span>
              ))}
            </div>
          </div>
          <CardMeta name="Icons" count="3 variants · 4 axes" />
          <div style={cardDesc}>Material Symbols — a variable font with fill, weight, grade, and optical size axes. Outlined, Rounded, or Sharp.</div>
        </FoundationCard>

        <FoundationCard docsPath="foundation-effects-shadows--docs">
          <div style={cardPreview}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "center" }}>
              <div style={{ width: 48, height: 32, borderRadius: 6, background: "var(--color-white)", boxShadow: "var(--shadow-sm)" }} />
              <div style={{ width: 48, height: 32, borderRadius: 6, background: "var(--color-white)", boxShadow: "var(--shadow-md)" }} />
              <div style={{ width: 48, height: 32, borderRadius: 6, background: "var(--color-white)", boxShadow: "var(--shadow-lg)" }} />
            </div>
          </div>
          <CardMeta name="Effects" count="Shadows · Focus · Backdrop" />
          <div style={cardDesc}>5 elevations, 2 focus rings, and 4 backdrop blur sizes with paired light and dark tints.</div>
        </FoundationCard>
      </div>

      {/* HOW TO USE */}
      <SectionHeading>How to use tokens</SectionHeading>
      <p style={{ color: "var(--color-neutral-600)", marginTop: 0, maxWidth: 720, fontSize: 14, lineHeight: 1.6 }}>
        Tokens are exposed two ways. Pick whichever fits your stack — they point to the same values.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 16, margin: "20px 0 40px" }}>
        <div style={panelStyle}>
          <div style={panelLabel}>Recommended · CSS variables</div>
          <p style={panelP}>Every token is available as a CSS custom property.</p>
          <pre style={codePre}><code>{`.button {
  background: var(--color-ep-500);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  font-size: var(--font-size-2);
  font-weight: var(--font-weight-semibold);
}
.button:focus-visible {
  outline: none;
  box-shadow: var(--focus-ring-xs);
}`}</code></pre>
        </div>
        <div style={panelStyle}>
          <div style={panelLabel}>Also available · TypeScript</div>
          <p style={panelP}>Typed imports for runtime conditions, canvas, emails.</p>
          <pre style={codePre}><code>{`import { colors, spacing, radius } from "@foundation/tokens";

colors.extendedPrimary[500]; // "#7b70e4"
spacing[4];                  // 16
radius.md;                   // 8

import { Icon } from "@foundation/components/Icon";
<Icon name="favorite" variant="rounded" fill={1} />`}</code></pre>
        </div>
      </div>

      {/* CONVENTIONS */}
      <SectionHeading>Conventions</SectionHeading>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14, margin: "20px 0 40px" }}>
        <ConventionCard title="Naming" body={<><code>--color-&lt;family&gt;-&lt;shade&gt;</code>, <code>--space-&lt;n&gt;</code>, <code>--radius-&lt;size&gt;</code>, <code>--shadow-&lt;level&gt;</code>. Names match the TypeScript keys.</>} />
        <ConventionCard title="Dark mode" body={<>Use <code>var(--color-neutral-&lt;shade&gt;)</code> — it remaps automatically under <code>[data-theme="dark"]</code>. Toggle the theme from the toolbar.</>} />
        <ConventionCard title="Accessibility" body="Every color swatch shows its best WCAG contrast rating. Focus rings meet the 3:1 non-text contrast requirement." />
        <ConventionCard title="One source of truth" body={<>Don't hard-code <code>#6852d6</code> or <code>16px</code>. If you need a value that doesn't exist yet, add a token first — then use it.</>} />
      </div>

      {/* CONTRIBUTING */}
      <SectionHeading>Contributing</SectionHeading>
      <ol style={{ color: "var(--color-neutral-700)", lineHeight: 1.8, fontSize: 14 }}>
        <li>Edit the relevant <code>tokens/*.ts</code> file.</li>
        <li>Sync the matching CSS variables in <code>tokens/tokens.css</code>.</li>
        <li>Stories auto-update from the token exports.</li>
        <li>Run <code>npm run typecheck</code> and <code>npm run build-storybook</code> before opening a PR.</li>
      </ol>
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.01em", color: "var(--color-neutral-900)", borderBottom: "1px solid var(--color-neutral-200)", paddingBottom: 10, margin: "32px 0 8px" }}>
      {children}
    </h2>
  );
}
