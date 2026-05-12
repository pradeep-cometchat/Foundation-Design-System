import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./Tooltip.impl";
import type { TooltipArrow } from "./Tooltip.types";

/**
 * A small popup that shows contextual information on hover or focus.
 *
 * **Background:** #0a0d12, **text:** white 12px/600, **supporting:** white 12px/400.
 *
 * **Arrow positions:** Top (center/left/right), Bottom (center/left/right), Left, Right, None.
 *
 * **Padding:** 8px 12px (title only), 12px (with supporting text).
 *
 * Uses foundation tokens: `--color-neutral-lm-950`, `--color-white`, `--radius-md`,
 * `--font-size-1`, `--font-weight-semibold`, `--font-weight-regular`.
 */
const meta: Meta = {
  title: "Base Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    title: { control: "text", table: { category: "Content" } },
    supportingText: { control: "text", table: { category: "Content" } },
    arrow: { control: "select", options: ["top-center", "top-left", "top-right", "bottom-center", "bottom-left", "bottom-right", "left", "right", "none"] satisfies TooltipArrow[], table: { category: "Appearance" } },
    open: { control: "boolean", table: { category: "State" } },
  },
};
export default meta;

type Story = StoryObj;

export const Playground: Story = {
  args: { title: "This is a tooltip", supportingText: "", arrow: "bottom-center", open: true },
  parameters: { docs: { disable: true }, layout: "centered" },
  render: (args: any) => (
    <div style={{ padding: 120 }}>
      <Tooltip {...args}>
        <TriggerBtn />
      </Tooltip>
    </div>
  ),
};

/** All arrow positions — rendered as static tooltip previews (no clipping). */
export const ArrowPositions: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <Section title="Arrow at bottom (tooltip appears above trigger)">
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          <StaticTooltip title="This is a tooltip" arrow="bottom-left" label="Bottom left" />
          <StaticTooltip title="This is a tooltip" arrow="bottom-center" label="Bottom center" />
          <StaticTooltip title="This is a tooltip" arrow="bottom-right" label="Bottom right" />
        </div>
      </Section>
      <Section title="Arrow at top (tooltip appears below trigger)">
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          <StaticTooltip title="This is a tooltip" arrow="top-left" label="Top left" arrowOnTop />
          <StaticTooltip title="This is a tooltip" arrow="top-center" label="Top center" arrowOnTop />
          <StaticTooltip title="This is a tooltip" arrow="top-right" label="Top right" arrowOnTop />
        </div>
      </Section>
      <Section title="Arrow on sides">
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          <StaticTooltip title="This is a tooltip" arrow="right" label="Arrow right" side="right" />
          <StaticTooltip title="This is a tooltip" arrow="left" label="Arrow left" side="left" />
          <StaticTooltip title="This is a tooltip" arrow="none" label="No arrow" />
        </div>
      </Section>
    </div>
  ),
};

/** With supporting text — all positions. */
export const WithSupportingText: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <Section title="Bottom arrow (tooltip above)">
        <StaticTooltip
          title="This is a tooltip"
          supportingText="Tooltips are used to describe or identify an element. In most scenarios, tooltips help the user understand meaning."
          arrow="bottom-center"
          label="Bottom center"
        />
      </Section>
      <Section title="Top arrow (tooltip below)">
        <StaticTooltip
          title="This is a tooltip"
          supportingText="Tooltips are used to describe or identify an element. In most scenarios, tooltips help the user understand meaning."
          arrow="top-center"
          label="Top center"
          arrowOnTop
        />
      </Section>
      <Section title="Side arrows">
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          <StaticTooltip
            title="This is a tooltip"
            supportingText="Tooltips are used to describe or identify an element."
            arrow="right"
            label="Arrow right"
            side="right"
          />
          <StaticTooltip
            title="This is a tooltip"
            supportingText="Tooltips are used to describe or identify an element."
            arrow="left"
            label="Arrow left"
            side="left"
          />
        </div>
      </Section>
    </div>
  ),
};

/** Interactive — hover to see tooltip appear. */
export const Interactive: Story = {
  parameters: { controls: { disable: true }, layout: "centered" },
  render: () => (
    <div style={{ display: "flex", gap: 32, padding: 100 }}>
      <Tooltip title="Add to favorites" arrow="bottom-center">
        <TriggerBtn label="Favorite" icon="favorite" />
      </Tooltip>
      <Tooltip title="Share this item" supportingText="Copy a link or share via email." arrow="bottom-center">
        <TriggerBtn label="Share" icon="share" />
      </Tooltip>
      <Tooltip title="Delete permanently" supportingText="This action cannot be undone." arrow="bottom-center">
        <TriggerBtn label="Delete" icon="delete" />
      </Tooltip>
    </div>
  ),
};

/* ─── Helpers ──────────────────────────────────────────────────────────────── */

function TriggerBtn({ label = "Hover me", icon }: { label?: string; icon?: string }) {
  return (
    <button type="button" style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid var(--color-neutral-lm-300)", background: "var(--color-white)", fontFamily: "inherit", fontSize: 14, fontWeight: 500, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}>
      {icon && <span className="icon-outlined" data-icon="outlined" style={{ fontFamily: "Material Symbols Outlined", fontSize: 18, fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 20" }}>{icon}</span>}
      {label}
    </button>
  );
}

/**
 * Static tooltip preview — renders the tooltip inline (not positioned absolutely)
 * so it doesn't clip or overflow the story frame.
 */
function StaticTooltip({ title, supportingText, arrow, label, arrowOnTop, side }: {
  title: string;
  supportingText?: string;
  arrow: TooltipArrow;
  label: string;
  arrowOnTop?: boolean;
  side?: "left" | "right";
}) {
  // Determine arrow horizontal alignment based on arrow position name
  const arrowAlign: "flex-start" | "center" | "flex-end" =
    arrow.includes("left") ? "flex-start" :
    arrow.includes("right") ? "flex-end" : "center";

  const arrowMargin: React.CSSProperties =
    arrowAlign === "flex-start" ? { marginLeft: 12 } :
    arrowAlign === "flex-end" ? { marginRight: 12 } : {};

  const arrowEl = arrow !== "none" && (
    <span style={{
      width: 0,
      height: 0,
      borderStyle: "solid",
      display: "block",
      alignSelf: side ? "center" : arrowAlign,
      ...(side ? {} : arrowMargin),
      ...(side === "right" ? {
        borderWidth: "6px 6px 6px 0",
        borderColor: "transparent var(--color-neutral-lm-950) transparent transparent",
        marginLeft: -1,
      } : side === "left" ? {
        borderWidth: "6px 0 6px 6px",
        borderColor: "transparent transparent transparent var(--color-neutral-lm-950)",
        marginRight: -1,
      } : arrowOnTop ? {
        borderWidth: "0 6px 6px 6px",
        borderColor: "transparent transparent var(--color-neutral-lm-950) transparent",
      } : {
        borderWidth: "6px 6px 0 6px",
        borderColor: "var(--color-neutral-lm-950) transparent transparent transparent",
      }),
    }} />
  );

  const content = (
    <div style={{
      background: "var(--color-neutral-lm-950)",
      borderRadius: 8,
      padding: supportingText ? 12 : "8px 12px",
      width: supportingText ? 320 : "max-content",
      maxWidth: 320,
    }}>
      <div style={{ fontFamily: "var(--font-family-heading)", fontSize: 12, fontWeight: 600, color: "var(--color-white)", lineHeight: "18px" }}>
        {title}
      </div>
      {supportingText && (
        <div style={{ fontFamily: "var(--font-family-heading)", fontSize: 12, fontWeight: 400, color: "var(--color-white)", lineHeight: "18px", marginTop: 4, opacity: 0.9 }}>
          {supportingText}
        </div>
      )}
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 4 }}>
      <span style={{ fontSize: 11, fontWeight: 600, color: "var(--color-neutral-600)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>{label}</span>
      {side ? (
        <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
          {side === "left" && content}
          {side === "left" && arrowEl}
          {side === "right" && arrowEl}
          {side === "right" && content}
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "stretch", gap: 0 }}>
          {arrowOnTop && arrowEl}
          {content}
          {!arrowOnTop && arrowEl}
        </div>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ fontSize: 12, fontWeight: 600, color: "var(--color-neutral-600)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>{title}</div>
      {children}
    </div>
  );
}
