import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "./Tag.impl";
import type { TagSize } from "./Tag.types";
import { avatarRegistry } from "../../foundation/tokens/avatars";

const maleAvatars = avatarRegistry["Male Avatar"];
const femaleAvatars = avatarRegistry["Female Avatar"];

const AvatarImg: React.FC<{ src: string; size?: number }> = ({ src, size = 16 }) => (
  <img src={src} alt="" style={{ width: size, height: size, borderRadius: "50%", objectFit: "cover" }} />
);

/**
 * A compact, interactive chip for filtering, categorization, or selection.
 *
 * Unlike Label (passive status indicator), Tags are interactive — they can
 * be checked (checkbox), dismissed (close), and carry avatars.
 *
 * **Sizes:** sm (24px), md (28px), lg (32px).
 *
 * **Slots:** Checkbox, Avatar, Close button — any combination.
 *
 * Uses foundation tokens: `--color-neutral-*`, `--color-primary`,
 * `--radius-sm`, `--radius-xs`, `--font-size-2`, `--font-weight-medium`,
 * `--focus-ring-xs`.
 */
const meta: Meta<typeof Tag> = {
  title: "Base Components/Tag",
  component: Tag,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"] satisfies TagSize[],
      description: "Size preset.",
      table: { category: "Appearance" },
    },
    children: {
      control: "text",
      description: "Tag text.",
      table: { category: "Content" },
    },
    checkbox: {
      control: "boolean",
      description: "Show checkbox.",
      table: { category: "Slots" },
    },
    checked: {
      control: "boolean",
      description: "Checkbox checked state.",
      table: { category: "Slots" },
    },
    disabled: {
      control: "boolean",
      description: "Disabled state.",
      table: { category: "State" },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Tag>;

export const Playground: Story = {
  args: {
    size: "md",
    children: "Tag",
    checkbox: false,
    checked: false,
    disabled: false,
  },
  parameters: { docs: { disable: true } },
};

/** All three sizes. */
export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
      <Tag size="sm">Small</Tag>
      <Tag size="md">Medium</Tag>
      <Tag size="lg">Large</Tag>
    </div>
  ),
};

/** Tags with avatar from foundation. */
export const WithAvatar: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Section title="Small">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Tag size="sm" avatar={<AvatarImg src={maleAvatars[0].imageUrl} size={14} />}>Ben Scott</Tag>
          <Tag size="sm" avatar={<AvatarImg src={femaleAvatars[0].imageUrl} size={14} />}>Nora Claire</Tag>
        </div>
      </Section>
      <Section title="Medium">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Tag size="md" avatar={<AvatarImg src={maleAvatars[1].imageUrl} />}>Chris Nolan</Tag>
          <Tag size="md" avatar={<AvatarImg src={femaleAvatars[1].imageUrl} />}>Emma Rose</Tag>
          <Tag size="md" avatar={<AvatarImg src={maleAvatars[2].imageUrl} />}>James Anderson</Tag>
        </div>
      </Section>
      <Section title="Large">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Tag size="lg" avatar={<AvatarImg src={femaleAvatars[2].imageUrl} size={20} />}>Isabella Fleur</Tag>
          <Tag size="lg" avatar={<AvatarImg src={maleAvatars[3].imageUrl} size={20} />}>Daniel Brooks</Tag>
        </div>
      </Section>
    </div>
  ),
};

/** Tags with checkbox. */
export const WithCheckbox: Story = {
  parameters: { controls: { disable: true } },
  render: () => <CheckboxDemo />,
};

function CheckboxDemo() {
  const [checks, setChecks] = useState([true, false, true, false]);
  const toggle = (i: number) => setChecks((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Section title="Interactive checkboxes">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Tag checkbox checked={checks[0]} onCheckedChange={() => toggle(0)}>Design</Tag>
          <Tag checkbox checked={checks[1]} onCheckedChange={() => toggle(1)}>Engineering</Tag>
          <Tag checkbox checked={checks[2]} onCheckedChange={() => toggle(2)}>Product</Tag>
          <Tag checkbox checked={checks[3]} onCheckedChange={() => toggle(3)}>Marketing</Tag>
        </div>
      </Section>
      <Section title="With avatar + checkbox">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Tag checkbox checked avatar={<AvatarImg src={maleAvatars[4].imageUrl} />}>Ben Scott</Tag>
          <Tag checkbox checked={false} avatar={<AvatarImg src={femaleAvatars[3].imageUrl} />}>Lily Anne</Tag>
        </div>
      </Section>
    </div>
  );
}

/** Tags with close button. */
export const WithClose: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Section title="Dismissible tags">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Tag onClose={() => {}}>React</Tag>
          <Tag onClose={() => {}}>TypeScript</Tag>
          <Tag onClose={() => {}}>Storybook</Tag>
          <Tag onClose={() => {}}>Figma</Tag>
        </div>
      </Section>
      <Section title="With avatar + close">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Tag avatar={<AvatarImg src={maleAvatars[5].imageUrl} />} onClose={() => {}}>David Miller</Tag>
          <Tag avatar={<AvatarImg src={femaleAvatars[4].imageUrl} />} onClose={() => {}}>Mia Ward</Tag>
        </div>
      </Section>
      <Section title="Large with all slots">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Tag size="lg" checkbox checked avatar={<AvatarImg src={maleAvatars[6].imageUrl} size={20} />} onClose={() => {}}>Full combo</Tag>
          <Tag size="lg" checkbox checked={false} avatar={<AvatarImg src={femaleAvatars[5].imageUrl} size={20} />} onClose={() => {}}>Another</Tag>
        </div>
      </Section>
    </div>
  ),
};

/** All combinations matrix. */
export const Matrix: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const sizes: TagSize[] = ["sm", "md", "lg"];
    return (
      <div style={{ overflow: "auto" }}>
        <table style={{ borderCollapse: "separate", borderSpacing: "8px 12px" }}>
          <thead>
            <tr>
              <th style={thStyle} />
              <th style={thStyle}>Text only</th>
              <th style={thStyle}>Avatar</th>
              <th style={thStyle}>Checkbox</th>
              <th style={thStyle}>Close</th>
              <th style={thStyle}>All slots</th>
            </tr>
          </thead>
          <tbody>
            {sizes.map((s, i) => (
              <tr key={s}>
                <td style={tdStyle}><code style={{ fontSize: 11 }}>{s}</code></td>
                <td style={tdStyle}><Tag size={s}>Tag</Tag></td>
                <td style={tdStyle}><Tag size={s} avatar={<AvatarImg src={maleAvatars[i].imageUrl} size={s === "lg" ? 20 : 16} />}>Tag</Tag></td>
                <td style={tdStyle}><Tag size={s} checkbox checked>Tag</Tag></td>
                <td style={tdStyle}><Tag size={s} onClose={() => {}}>Tag</Tag></td>
                <td style={tdStyle}><Tag size={s} checkbox checked avatar={<AvatarImg src={femaleAvatars[i].imageUrl} size={s === "lg" ? 20 : 16} />} onClose={() => {}}>Tag</Tag></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
};

/** Disabled state. */
export const Disabled: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Tag disabled>Disabled</Tag>
      <Tag disabled checkbox checked>Checked disabled</Tag>
      <Tag disabled avatar={<AvatarImg src={maleAvatars[7].imageUrl} />} onClose={() => {}}>With slots</Tag>
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
  fontSize: 11, fontWeight: 600, color: "var(--color-neutral-600)",
  textTransform: "uppercase", letterSpacing: "0.06em", textAlign: "left", padding: "4px 8px",
};
const tdStyle: React.CSSProperties = { padding: "4px 8px", verticalAlign: "middle" };
