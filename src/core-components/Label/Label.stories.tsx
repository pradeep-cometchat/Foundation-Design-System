import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "./Label.impl";
import type { LabelColor, LabelType, LabelSize } from "./Label.types";
import { avatarRegistry } from "../../foundation/tokens/avatars";

// Pull a few avatars from the foundation registry
const maleAvatars = avatarRegistry["Male Avatar"];
const femaleAvatars = avatarRegistry["Female Avatar"];

const AvatarImg: React.FC<{ src: string; size?: number }> = ({ src, size = 16 }) => (
  <img
    src={src}
    alt=""
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      objectFit: "cover",
      flexShrink: 0,
    }}
  />
);

/**
 * A small status indicator, tag, or category marker.
 *
 * **Types:** Badge (rounded rect), Pill (full radius), Modern (white bg).
 *
 * **Colors:** Brand, Gray, Error, Success, Warning.
 *
 * **Sizes:** sm (22px), md (24px).
 *
 * **Slots:** Optional leading avatar/dot, optional dismiss (close) button.
 *
 * All colors, spacing, radius, and typography use foundation design tokens.
 */
const meta: Meta<typeof Label> = {
  title: "Base Components/Label",
  component: Label,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    type: {
      control: "select",
      options: ["badge", "pill", "modern"] satisfies LabelType[],
      description: "Visual shape.",
      table: { category: "Appearance" },
    },
    color: {
      control: "select",
      options: ["brand", "gray", "error", "success", "warning"] satisfies LabelColor[],
      description: "Semantic color.",
      table: { category: "Appearance" },
    },
    size: {
      control: "select",
      options: ["sm", "md"] satisfies LabelSize[],
      description: "Size preset.",
      table: { category: "Appearance" },
    },
    children: {
      control: "text",
      description: "Label text.",
      table: { category: "Content" },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Label>;

export const Playground: Story = {
  args: {
    type: "badge",
    color: "brand",
    size: "sm",
    children: "Label",
  },
  parameters: { docs: { disable: true } },
};

/** All five colors in badge type. */
export const Colors: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Section title="Badge">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Label color="brand">Brand</Label>
          <Label color="gray">Gray</Label>
          <Label color="error">Error</Label>
          <Label color="success">Success</Label>
          <Label color="warning">Warning</Label>
        </div>
      </Section>
      <Section title="Pill">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Label type="pill" color="brand">Brand</Label>
          <Label type="pill" color="gray">Gray</Label>
          <Label type="pill" color="error">Error</Label>
          <Label type="pill" color="success">Success</Label>
          <Label type="pill" color="warning">Warning</Label>
        </div>
      </Section>
      <Section title="Modern">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Label type="modern" color="gray">Modern</Label>
        </div>
      </Section>
    </div>
  ),
};

/** Both sizes. */
export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Section title="Small (22px)">
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Label size="sm" color="brand">Brand</Label>
          <Label size="sm" color="gray">Gray</Label>
          <Label size="sm" color="success">Success</Label>
        </div>
      </Section>
      <Section title="Medium (24px)">
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Label size="md" color="brand">Brand</Label>
          <Label size="md" color="gray">Gray</Label>
          <Label size="md" color="success">Success</Label>
        </div>
      </Section>
    </div>
  ),
};

/** With avatar and close button. */
export const WithSlots: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Section title="With avatar (sm)">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Label color="gray" size="sm" avatar={<AvatarImg src={maleAvatars[0].imageUrl} size={14} />}>Label</Label>
          <Label color="brand" size="sm" avatar={<AvatarImg src={femaleAvatars[0].imageUrl} size={14} />}>Label</Label>
          <Label color="error" size="sm" avatar={<AvatarImg src={maleAvatars[1].imageUrl} size={14} />}>Label</Label>
          <Label color="success" size="sm" avatar={<AvatarImg src={femaleAvatars[1].imageUrl} size={14} />}>Label</Label>
          <Label color="warning" size="sm" avatar={<AvatarImg src={maleAvatars[2].imageUrl} size={14} />}>Label</Label>
        </div>
      </Section>
      <Section title="With avatar (md)">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Label color="gray" size="md" avatar={<AvatarImg src={maleAvatars[3].imageUrl} />}>Label</Label>
          <Label color="brand" size="md" avatar={<AvatarImg src={femaleAvatars[2].imageUrl} />}>Label</Label>
          <Label color="error" size="md" avatar={<AvatarImg src={maleAvatars[4].imageUrl} />}>Label</Label>
          <Label color="success" size="md" avatar={<AvatarImg src={femaleAvatars[3].imageUrl} />}>Label</Label>
          <Label color="warning" size="md" avatar={<AvatarImg src={maleAvatars[5].imageUrl} />}>Label</Label>
        </div>
      </Section>
      <Section title="Pill with avatar">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Label type="pill" color="gray" size="md" avatar={<AvatarImg src={femaleAvatars[4].imageUrl} />}>Label</Label>
          <Label type="pill" color="brand" size="md" avatar={<AvatarImg src={maleAvatars[6].imageUrl} />}>Label</Label>
          <Label type="pill" color="error" size="md" avatar={<AvatarImg src={femaleAvatars[5].imageUrl} />}>Label</Label>
          <Label type="pill" color="success" size="md" avatar={<AvatarImg src={maleAvatars[7].imageUrl} />}>Label</Label>
          <Label type="pill" color="warning" size="md" avatar={<AvatarImg src={femaleAvatars[6].imageUrl} />}>Label</Label>
        </div>
      </Section>
      <Section title="With close button">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Label color="brand" size="md" onClose={() => {}}>Removable</Label>
          <Label color="gray" size="md" onClose={() => {}}>Tag</Label>
          <Label color="error" size="md" onClose={() => {}}>Error</Label>
          <Label color="success" size="md" onClose={() => {}}>Done</Label>
        </div>
      </Section>
      <Section title="Avatar + close combined">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Label color="brand" size="md" avatar={<AvatarImg src={maleAvatars[8].imageUrl} />} onClose={() => {}}>Filter</Label>
          <Label color="success" size="md" avatar={<AvatarImg src={femaleAvatars[7].imageUrl} />} onClose={() => {}}>Active</Label>
        </div>
      </Section>
      <Section title="Modern with avatar">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Label type="modern" color="gray" size="sm" avatar={<AvatarImg src={maleAvatars[9].imageUrl} size={14} />}>Label</Label>
          <Label type="modern" color="gray" size="md" avatar={<AvatarImg src={femaleAvatars[8].imageUrl} />}>Label</Label>
        </div>
      </Section>
    </div>
  ),
};

/** All types × all colors matrix. */
export const Matrix: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const types: LabelType[] = ["badge", "pill", "modern"];
    const colors: LabelColor[] = ["brand", "gray", "error", "success", "warning"];

    return (
      <div style={{ overflow: "auto" }}>
        <table style={{ borderCollapse: "separate", borderSpacing: "8px 12px" }}>
          <thead>
            <tr>
              <th style={thStyle} />
              {colors.map((c) => (
                <th key={c} style={thStyle}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {types.map((t) => (
              <tr key={t}>
                <td style={tdStyle}><code style={{ fontSize: 11 }}>{t}</code></td>
                {colors.map((c) => (
                  <td key={c} style={tdStyle}>
                    <Label type={t} color={c} size="md">Label</Label>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
};

/** Real-world usage examples. */
export const Examples: Story = {
  parameters: { controls: { disable: true }, layout: "padded" },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Section title="Status indicators with avatars">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Label color="success" avatar={<AvatarImg src={maleAvatars[0].imageUrl} size={14} />}>Online</Label>
          <Label color="warning" avatar={<AvatarImg src={femaleAvatars[0].imageUrl} size={14} />}>Away</Label>
          <Label color="gray" avatar={<AvatarImg src={maleAvatars[1].imageUrl} size={14} />}>Offline</Label>
          <Label color="error" avatar={<AvatarImg src={femaleAvatars[1].imageUrl} size={14} />}>Busy</Label>
        </div>
      </Section>
      <Section title="Category tags">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Label type="pill" color="brand">Design</Label>
          <Label type="pill" color="gray">Engineering</Label>
          <Label type="pill" color="success">Shipped</Label>
          <Label type="pill" color="warning">In review</Label>
          <Label type="pill" color="error">Blocked</Label>
        </div>
      </Section>
      <Section title="Removable filters">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Label color="brand" size="md" onClose={() => {}}>React</Label>
          <Label color="brand" size="md" onClose={() => {}}>TypeScript</Label>
          <Label color="brand" size="md" onClose={() => {}}>Storybook</Label>
        </div>
      </Section>
    </div>
  ),
};

/* ─── Helpers ──────────────────────────────────────────────────────────────── */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ fontSize: 12, fontWeight: 600, color: "var(--color-neutral-600)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>
        {title}
      </div>
      {children}
    </div>
  );
}

const thStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  color: "var(--color-neutral-600)",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  textAlign: "left",
  padding: "4px 8px",
};

const tdStyle: React.CSSProperties = {
  padding: "4px 8px",
  verticalAlign: "middle",
};
