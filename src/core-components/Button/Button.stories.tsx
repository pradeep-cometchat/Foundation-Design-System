import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button.impl";
import type { ButtonVariant, ButtonSize } from "./Button.types";

/**
 * The primary interactive element. Triggers actions, submits forms, or
 * navigates within the product.
 *
 * **Hierarchies:** Primary, Secondary, Tertiary, Link color, Link gray,
 * plus destructive variants for each.
 *
 * **Sizes:** sm (36px), md (40px), lg (44px), xl (48px).
 *
 * **States:** Default, Hover, Focused, Disabled, Loading.
 *
 * All colors, spacing, radius, shadows, and typography use foundation
 * design tokens (`var(--color-*)`, `var(--radius-*)`, `var(--shadow-*)`, etc.)
 * so the button stays in sync with the design system automatically.
 */
const meta: Meta<typeof Button> = {
  title: "Base Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "tertiary",
        "link-color",
        "link-gray",
        "destructive-primary",
        "destructive-secondary",
        "destructive-tertiary",
        "destructive-link",
      ] satisfies ButtonVariant[],
      description: "Visual hierarchy.",
      table: { category: "Appearance" },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"] satisfies ButtonSize[],
      description: "Size preset (height: sm=36, md=40, lg=44, xl=48).",
      table: { category: "Appearance" },
    },
    children: {
      control: "text",
      description: "Button label.",
      table: { category: "Content" },
    },
    loading: {
      control: "boolean",
      description: "Show spinner and disable interaction.",
      table: { category: "State" },
    },
    disabled: {
      control: "boolean",
      description: "Disable the button.",
      table: { category: "State" },
    },
    iconOnly: {
      control: "boolean",
      description: "Render as icon-only (square).",
      table: { category: "Layout" },
    },
    fullWidth: {
      control: "boolean",
      description: "Render as full-width.",
      table: { category: "Layout" },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

const StarIcon = () => (
  <span className="icon-outlined" data-icon="outlined" style={{ fontFamily: "Material Symbols Outlined", fontSize: 20, fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 20" }}>
    star
  </span>
);

const AddIcon = () => (
  <span className="icon-outlined" data-icon="outlined" style={{ fontFamily: "Material Symbols Outlined", fontSize: 20, fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 20" }}>
    add
  </span>
);

const DeleteIcon = () => (
  <span className="icon-outlined" data-icon="outlined" style={{ fontFamily: "Material Symbols Outlined", fontSize: 20, fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 20" }}>
    delete
  </span>
);

export const Playground: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "Button",
    loading: false,
    disabled: false,
    iconOnly: false,
    fullWidth: false,
  },
  parameters: { docs: { disable: true } },
};

/** All hierarchy variants at default state. */
export const Hierarchies: Story = {
  parameters: { controls: { disable: true }, layout: "padded" },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Section title="Standard">
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="tertiary">Tertiary</Button>
          <Button variant="link-color">Link color</Button>
          <Button variant="link-gray">Link gray</Button>
        </div>
      </Section>
      <Section title="Destructive">
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
          <Button variant="destructive-primary">Primary</Button>
          <Button variant="destructive-secondary">Secondary</Button>
          <Button variant="destructive-tertiary">Tertiary</Button>
          <Button variant="destructive-link">Link</Button>
        </div>
      </Section>
    </div>
  ),
};

/** All four sizes. */
export const Sizes: Story = {
  parameters: { controls: { disable: true }, layout: "padded" },
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra large</Button>
    </div>
  ),
};

/** Interactive states for Primary. */
export const States: Story = {
  parameters: { controls: { disable: true }, layout: "padded" },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Section title="Primary states">
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Button variant="primary">Default</Button>
          <Button variant="primary" disabled>Disabled</Button>
          <Button variant="primary" loading>Loading</Button>
        </div>
      </Section>
      <Section title="Secondary states">
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Button variant="secondary">Default</Button>
          <Button variant="secondary" disabled>Disabled</Button>
          <Button variant="secondary" loading>Loading</Button>
        </div>
      </Section>
      <Section title="Destructive states">
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Button variant="destructive-primary">Default</Button>
          <Button variant="destructive-primary" disabled>Disabled</Button>
          <Button variant="destructive-primary" loading>Loading</Button>
        </div>
      </Section>
    </div>
  ),
};

/** Buttons with leading and trailing icons. */
export const WithIcons: Story = {
  parameters: { controls: { disable: true }, layout: "padded" },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Section title="Icon left">
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Button variant="primary" iconLeft={<StarIcon />}>Favorite</Button>
          <Button variant="secondary" iconLeft={<AddIcon />}>Add item</Button>
          <Button variant="destructive-primary" iconLeft={<DeleteIcon />}>Delete</Button>
        </div>
      </Section>
      <Section title="Icon right">
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Button variant="primary" iconRight={<StarIcon />}>Favorite</Button>
          <Button variant="secondary" iconRight={<AddIcon />}>Add item</Button>
        </div>
      </Section>
      <Section title="Icon only">
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Button variant="primary" size="sm" iconOnly><StarIcon /></Button>
          <Button variant="primary" size="md" iconOnly><StarIcon /></Button>
          <Button variant="primary" size="lg" iconOnly><StarIcon /></Button>
          <Button variant="primary" size="xl" iconOnly><StarIcon /></Button>
          <Button variant="secondary" size="md" iconOnly><AddIcon /></Button>
          <Button variant="destructive-primary" size="md" iconOnly><DeleteIcon /></Button>
        </div>
      </Section>
    </div>
  ),
};

/** Full-width buttons. */
export const FullWidth: Story = {
  parameters: { controls: { disable: true }, layout: "padded" },
  render: () => (
    <div style={{ width: 360, display: "flex", flexDirection: "column", gap: 12 }}>
      <Button variant="primary" fullWidth>Sign in</Button>
      <Button variant="secondary" fullWidth>Create account</Button>
      <Button variant="tertiary" fullWidth>Skip for now</Button>
    </div>
  ),
};

/** All sizes × all hierarchies matrix. */
export const Matrix: Story = {
  parameters: { controls: { disable: true }, layout: "padded" },
  render: () => {
    const variants: ButtonVariant[] = [
      "primary",
      "secondary",
      "tertiary",
      "destructive-primary",
      "destructive-secondary",
    ];
    const sizes: ButtonSize[] = ["sm", "md", "lg", "xl"];

    return (
      <div style={{ overflow: "auto" }}>
        <table style={{ borderCollapse: "separate", borderSpacing: "12px 16px" }}>
          <thead>
            <tr>
              <th style={thStyle} />
              {sizes.map((s) => (
                <th key={s} style={thStyle}>{s}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {variants.map((v) => (
              <tr key={v}>
                <td style={tdStyle}><code style={{ fontSize: 11 }}>{v}</code></td>
                {sizes.map((s) => (
                  <td key={s} style={tdStyle}>
                    <Button variant={v} size={s}>Button</Button>
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
