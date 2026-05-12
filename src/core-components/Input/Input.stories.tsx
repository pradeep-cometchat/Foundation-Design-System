import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Input, TagInput, Textarea } from "./Input.impl";
import { avatarRegistry } from "../../foundation/tokens/avatars";

const maleAvatars = avatarRegistry["Male Avatar"];
const femaleAvatars = avatarRegistry["Female Avatar"];

const IconEl: React.FC<{ name: string }> = ({ name }) => (
  <span className="icon-outlined" data-icon="outlined" style={{ fontFamily: "Material Symbols Outlined", fontSize: 20, fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 20" }}>{name}</span>
);

/**
 * Text input field matching Figma specs exactly.
 *
 * **Types:** Default (single line), Tags (user chips with avatars), Textarea (multi-line).
 *
 * **Sizes:** sm (36px), md (40px), lg (44px — Figma default).
 *
 * **States:** Placeholder, Filled, Focused, Disabled, Error (Destructive).
 *
 * **Slots:** Label (with required * and info ?), leading icon, trailing icon, hint/error text.
 *
 * Uses foundation tokens and Avatars from the foundation tab for user images.
 */
const meta: Meta = {
  title: "Base Components/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    type: { control: "select", options: ["text", "email", "password", "number", "tel", "url", "search"], table: { category: "Appearance" } },
    size: { control: "select", options: ["sm", "md", "lg"], description: "sm=36px, md=40px, lg=44px", table: { category: "Appearance" } },
    label: { control: "text", table: { category: "Content" } },
    placeholder: { control: "text", table: { category: "Content" } },
    hint: { control: "text", table: { category: "Content" } },
    required: { control: "boolean", description: "Show required asterisk.", table: { category: "Content" } },
    info: { control: "boolean", description: "Show info (?) icon.", table: { category: "Content" } },
    disabled: { control: "boolean", table: { category: "State" } },
    error: { control: "boolean", table: { category: "State" } },
    errorMessage: { control: "text", table: { category: "State" } },
  },
};
export default meta;

type Story = StoryObj;

export const Playground: Story = {
  args: {
    type: "text",
    size: "lg",
    label: "Email",
    placeholder: "george@cometchat.com",
    hint: "This is a hint text to help user.",
    required: true,
    info: false,
    disabled: false,
    error: false,
    errorMessage: "This is an error message.",
  },
  parameters: { docs: { disable: true } },
  render: (args) => {
    const { info, ...rest } = args as any;
    return <Input {...rest} tooltip={info ? "More information" : undefined} iconLeft={<IconEl name="mail" />} iconRight={<IconEl name="help" />} />;
  },
};

/** All states for the default input. */
export const States: Story = {
  parameters: { controls: { disable: true }, layout: "padded" },
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
      <Section title="Placeholder">
        <Input label="Email" required placeholder="george@cometchat.com" iconLeft={<IconEl name="mail" />} iconRight={<IconEl name="help" />} hint="This is a hint text to help user." />
      </Section>
      <Section title="Filled">
        <Input label="Email" required defaultValue="george@cometchat.com" iconLeft={<IconEl name="mail" />} iconRight={<IconEl name="help" />} hint="This is a hint text to help user." />
      </Section>
      <Section title="Focused (click to see)">
        <Input label="Email" required defaultValue="george@cometchat.com" iconLeft={<IconEl name="mail" />} iconRight={<IconEl name="help" />} hint="This is a hint text to help user." />
      </Section>
      <Section title="Disabled">
        <Input label="Email" required placeholder="george@cometchat.com" iconLeft={<IconEl name="mail" />} iconRight={<IconEl name="help" />} disabled hint="This is a hint text to help user." />
      </Section>
      <Section title="Error (Destructive)">
        <Input label="Email" required defaultValue="george@cometchat.com" iconLeft={<IconEl name="mail" />} iconRight={<IconEl name="help" />} error errorMessage="This is an error message." />
      </Section>
      <Section title="Error + Focused">
        <Input label="Email" required defaultValue="george@cometchat.com" iconLeft={<IconEl name="mail" />} iconRight={<IconEl name="help" />} error errorMessage="This is an error message." />
      </Section>
    </div>
  ),
};

/** Three size variants. */
export const Sizes: Story = {
  parameters: { controls: { disable: true }, layout: "padded" },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Section title="Small (36px)">
        <Input size="sm" label="Email" required placeholder="george@cometchat.com" iconLeft={<IconEl name="mail" />} hint="This is a hint text to help user." />
      </Section>
      <Section title="Medium (40px)">
        <Input size="md" label="Email" required placeholder="george@cometchat.com" iconLeft={<IconEl name="mail" />} hint="This is a hint text to help user." />
      </Section>
      <Section title="Large (44px — Figma default)">
        <Input size="lg" label="Email" required placeholder="george@cometchat.com" iconLeft={<IconEl name="mail" />} hint="This is a hint text to help user." />
      </Section>
    </div>
  ),
};

/** Tags input with user avatars from foundation. */
export const Tags: Story = {
  name: "Tags (Users)",
  parameters: { controls: { disable: true }, layout: "padded" },
  render: () => <TagInputDemo />,
};

function TagInputDemo() {
  const [tags, setTags] = useState([
    { id: "1", name: "George", avatarUrl: maleAvatars[0].imageUrl },
    { id: "2", name: "Jennifer", avatarUrl: femaleAvatars[0].imageUrl },
  ]);
  const [input, setInput] = useState("Tessa");

  const handleRemove = (id: string) => setTags((prev) => prev.filter((t) => t.id !== id));

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
      <Section title="Placeholder">
        <TagInput label="Users" required tags={[]} placeholder="Add users" hint="This is a hint text to help user." />
      </Section>
      <Section title="Filled">
        <TagInput label="Users" required tags={tags} onRemove={handleRemove} inputValue={input} onInputChange={setInput} hint="This is a hint text to help user." />
      </Section>
      <Section title="Focused (click to see)">
        <TagInput label="Users" required tags={tags} onRemove={handleRemove} inputValue={input} onInputChange={setInput} hint="This is a hint text to help user." />
      </Section>
      <Section title="Disabled">
        <TagInput label="Users" required tags={[]} placeholder="Add users" disabled hint="This is a hint text to help user." />
      </Section>
      <Section title="Error">
        <TagInput label="Users" required tags={tags} onRemove={handleRemove} inputValue={input} onInputChange={setInput} error errorMessage="This is an error message." />
      </Section>
      <Section title="Error + Focused">
        <TagInput label="Users" required tags={tags} onRemove={handleRemove} inputValue={input} onInputChange={setInput} error errorMessage="This is an error message." />
      </Section>
    </div>
  );
}

/** Textarea variant. */
export const TextareaStory: Story = {
  name: "Textarea",
  parameters: { controls: { disable: true }, layout: "padded" },
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
      <Section title="Placeholder">
        <Textarea label="Description" required tooltip="Describe the issue" placeholder="Enter a description..." hint="This is a hint text to help user." />
      </Section>
      <Section title="Error (Placeholder)">
        <Textarea label="Description" required tooltip="Describe the issue" placeholder="Enter a description..." error errorMessage="This is an error message." />
      </Section>
      <Section title="Filled">
        <Textarea label="Description" required tooltip="Describe the issue" defaultValue="A little about the company and the team that you'll be working with." hint="This is a hint text to help user." />
      </Section>
      <Section title="Error (Filled)">
        <Textarea label="Description" required tooltip="Describe the issue" defaultValue="A little about the company and the team that you'll be working with." error errorMessage="This is an error message." />
      </Section>
      <Section title="Disabled">
        <Textarea label="Description" required tooltip="Describe the issue" placeholder="Enter a description..." disabled hint="This is a hint text to help user." />
      </Section>
    </div>
  ),
};

/** With icons. */
export const WithIcons: Story = {
  parameters: { controls: { disable: true }, layout: "padded" },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Section title="Leading icon">
        <Input label="Email" required placeholder="george@cometchat.com" iconLeft={<IconEl name="mail" />} hint="With mail icon." />
      </Section>
      <Section title="Trailing icon">
        <Input label="Website" placeholder="https://example.com" iconRight={<IconEl name="link" />} />
      </Section>
      <Section title="Both icons">
        <Input label="Email" required placeholder="george@cometchat.com" iconLeft={<IconEl name="mail" />} iconRight={<IconEl name="help" />} hint="This is a hint text to help user." />
      </Section>
      <Section title="Password">
        <Input label="Password" type="password" placeholder="Enter password" iconRight={<IconEl name="visibility_off" />} />
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
