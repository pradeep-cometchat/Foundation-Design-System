import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Toggle } from "./Toggle.impl";
import type { ToggleSize } from "./Toggle.types";

/**
 * A binary on/off switch control.
 *
 * **Sizes:** sm (36×20 track), md (44×24 track).
 *
 * **States:** Default, Hover, Focus, Disabled.
 *
 * **Text:** Optional label (16px/500) and description (14px/400).
 *
 * Uses foundation tokens: `--color-primary` (on), `--color-ep-700` (hover on),
 * `--color-neutral-lm-100` (off), `--radius-full`, `--shadow-xs`, `--focus-ring-xs`,
 * `--font-size-*`, `--font-weight-*`.
 */
const meta: Meta = {
  title: "Base Components/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    size: { control: "select", options: ["sm", "md"] satisfies ToggleSize[], description: "sm=36×20, md=44×24", table: { category: "Appearance" } },
    pressed: { control: "boolean", description: "On/off state.", table: { category: "State" } },
    label: { control: "text", table: { category: "Content" } },
    description: { control: "text", table: { category: "Content" } },
    disabled: { control: "boolean", table: { category: "State" } },
  },
};
export default meta;

type Story = StoryObj;

export const Playground: Story = {
  args: {
    size: "md",
    pressed: false,
    label: "Remember me",
    description: "Save my login details for next time.",
    disabled: false,
  },
  parameters: { docs: { disable: true } },
  render: (args) => <ControlledToggle {...(args as any)} />,
};

/** Both sizes, on and off. */
export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Section title="Small (sm)">
        <div style={{ display: "flex", gap: 24 }}>
          <ControlledToggle size="sm" />
          <ControlledToggle size="sm" pressed />
        </div>
      </Section>
      <Section title="Medium (md)">
        <div style={{ display: "flex", gap: 24 }}>
          <ControlledToggle size="md" />
          <ControlledToggle size="md" pressed />
        </div>
      </Section>
    </div>
  ),
};

/** All states. */
export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Section title="Default (off)">
        <Toggle size="md" pressed={false} />
      </Section>
      <Section title="Default (on)">
        <Toggle size="md" pressed={true} />
      </Section>
      <Section title="Disabled (off)">
        <Toggle size="md" pressed={false} disabled />
      </Section>
      <Section title="Disabled (on)">
        <Toggle size="md" pressed={true} disabled />
      </Section>
      <Section title="Focus (tab to see)">
        <ControlledToggle size="md" />
      </Section>
    </div>
  ),
};

/** With label and description text. */
export const WithText: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 400 }}>
      <Section title="Label only">
        <ControlledToggle size="md" label="Dark mode" />
      </Section>
      <Section title="Label + description">
        <ControlledToggle size="md" label="Remember me" description="Save my login details for next time." />
      </Section>
      <Section title="Small with text">
        <ControlledToggle size="sm" label="Notifications" description="Receive push notifications for new messages." />
      </Section>
      <Section title="Disabled with text">
        <Toggle size="md" pressed={true} disabled label="Auto-save" description="This setting is managed by your admin." />
      </Section>
    </div>
  ),
};

/** Real-world examples. */
export const Examples: Story = {
  parameters: { controls: { disable: true }, layout: "padded" },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 400 }}>
      <ControlledToggle size="md" pressed label="Email notifications" description="Get notified when someone sends you a message." />
      <ControlledToggle size="md" label="Push notifications" description="Receive alerts on your device." />
      <ControlledToggle size="md" pressed label="Marketing emails" description="Receive tips, product updates, and inspiration." />
      <Toggle size="md" pressed disabled label="Two-factor authentication" description="Enforced by your organization." />
    </div>
  ),
};

/* ─── Helpers ──────────────────────────────────────────────────────────────── */

function ControlledToggle(props: React.ComponentProps<typeof Toggle>) {
  const [on, setOn] = useState(props.pressed ?? false);
  return <Toggle {...props} pressed={on} onChange={setOn} />;
}

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
