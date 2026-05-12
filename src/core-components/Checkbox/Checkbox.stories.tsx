import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox.impl";
import type { CheckboxType, CheckboxSize } from "./Checkbox.types";

/**
 * A selection control — checkbox (square with check/minus) or radio (circle with dot).
 *
 * **Types:** Checkbox, Radio.
 *
 * **Sizes:** sm (16px), md (20px).
 *
 * **States:** Default, Hover, Focus, Disabled, Checked, Indeterminate.
 *
 * **Text:** Optional label (16px/500) and description (14px/400).
 *
 * Uses foundation tokens: `--color-primary`, `--color-ep-700`, `--color-neutral-lm-*`,
 * `--radius-xs` (sm), `--radius-sm` (md), `--radius-full` (radio), `--focus-ring-xs`.
 */
const meta: Meta = {
  title: "Base Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    type: { control: "select", options: ["checkbox", "radio"] satisfies CheckboxType[], table: { category: "Appearance" } },
    size: { control: "select", options: ["sm", "md"] satisfies CheckboxSize[], table: { category: "Appearance" } },
    checked: { control: "boolean", table: { category: "State" } },
    indeterminate: { control: "boolean", table: { category: "State" } },
    label: { control: "text", table: { category: "Content" } },
    description: { control: "text", table: { category: "Content" } },
    disabled: { control: "boolean", table: { category: "State" } },
  },
};
export default meta;

type Story = StoryObj;

export const Playground: Story = {
  args: { type: "checkbox", size: "md", checked: false, indeterminate: false, label: "Remember me", description: "Save my login details for next time.", disabled: false },
  parameters: { docs: { disable: true } },
  render: (args) => <ControlledCheckbox {...(args as any)} />,
};

/** All checkbox states. */
export const CheckboxStates: Story = {
  name: "Checkbox States",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Section title="Unchecked">
        <div style={{ display: "flex", gap: 24 }}>
          <Checkbox size="sm" />
          <Checkbox size="md" />
          <Checkbox size="md" disabled />
        </div>
      </Section>
      <Section title="Checked">
        <div style={{ display: "flex", gap: 24 }}>
          <Checkbox size="sm" checked />
          <Checkbox size="md" checked />
          <Checkbox size="md" checked disabled />
        </div>
      </Section>
      <Section title="Indeterminate">
        <div style={{ display: "flex", gap: 24 }}>
          <Checkbox size="sm" indeterminate />
          <Checkbox size="md" indeterminate />
          <Checkbox size="md" indeterminate disabled />
        </div>
      </Section>
    </div>
  ),
};

/** All radio states. */
export const RadioStates: Story = {
  name: "Radio States",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Section title="Unchecked">
        <div style={{ display: "flex", gap: 24 }}>
          <Checkbox type="radio" size="sm" />
          <Checkbox type="radio" size="md" />
          <Checkbox type="radio" size="md" disabled />
        </div>
      </Section>
      <Section title="Checked">
        <div style={{ display: "flex", gap: 24 }}>
          <Checkbox type="radio" size="sm" checked />
          <Checkbox type="radio" size="md" checked />
          <Checkbox type="radio" size="md" checked disabled />
        </div>
      </Section>
    </div>
  ),
};

/** With label and description. */
export const WithText: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 400 }}>
      <Section title="Checkbox with text">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <ControlledCheckbox label="Remember me" description="Save my login details for next time." />
          <ControlledCheckbox checked label="Email notifications" description="Get notified when someone sends you a message." />
          <Checkbox checked disabled label="Auto-save" description="This setting is managed by your admin." />
        </div>
      </Section>
      <Section title="Radio with text">
        <RadioGroup />
      </Section>
    </div>
  ),
};

/** Sizes comparison. */
export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Section title="Small (16px)">
        <div style={{ display: "flex", gap: 24 }}>
          <Checkbox size="sm" />
          <Checkbox size="sm" checked />
          <Checkbox size="sm" indeterminate />
          <Checkbox type="radio" size="sm" />
          <Checkbox type="radio" size="sm" checked />
        </div>
      </Section>
      <Section title="Medium (20px)">
        <div style={{ display: "flex", gap: 24 }}>
          <Checkbox size="md" />
          <Checkbox size="md" checked />
          <Checkbox size="md" indeterminate />
          <Checkbox type="radio" size="md" />
          <Checkbox type="radio" size="md" checked />
        </div>
      </Section>
    </div>
  ),
};

/** Real-world examples. */
export const Examples: Story = {
  parameters: { controls: { disable: true }, layout: "padded" },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 400 }}>
      <Section title="Settings list">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <ControlledCheckbox checked label="Push notifications" description="Receive alerts on your device." />
          <ControlledCheckbox label="Marketing emails" description="Tips, product updates, and inspiration." />
          <ControlledCheckbox checked label="Security alerts" description="Get notified about suspicious activity." />
          <Checkbox checked disabled label="Two-factor auth" description="Enforced by your organization." />
        </div>
      </Section>
      <Section title="Radio group">
        <RadioGroup />
      </Section>
    </div>
  ),
};

/* ─── Helpers ──────────────────────────────────────────────────────────────── */

function ControlledCheckbox(props: React.ComponentProps<typeof Checkbox>) {
  const [on, setOn] = useState(props.checked ?? false);
  return <Checkbox {...props} checked={on} onChange={setOn} />;
}

function RadioGroup() {
  const [selected, setSelected] = useState("a");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Checkbox type="radio" checked={selected === "a"} onChange={() => setSelected("a")} label="Option A" description="First option description." />
      <Checkbox type="radio" checked={selected === "b"} onChange={() => setSelected("b")} label="Option B" description="Second option description." />
      <Checkbox type="radio" checked={selected === "c"} onChange={() => setSelected("c")} label="Option C" description="Third option description." />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ fontSize: 12, fontWeight: 600, color: "var(--color-neutral-600)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>{title}</div>
      {children}
    </div>
  );
}
