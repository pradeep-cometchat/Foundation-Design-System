import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Dropdown } from "./Dropdown.impl";
import type { DropdownOption } from "./Dropdown.types";
import { avatarRegistry } from "../../foundation/tokens/avatars";

const maleAvatars = avatarRegistry["Male Avatar"];
const femaleAvatars = avatarRegistry["Female Avatar"];

const AvatarImg: React.FC<{ src: string; size?: number }> = ({ src, size = 36 }) => (
  <img src={src} alt="" style={{ width: size, height: size, borderRadius: "50%", objectFit: "cover" }} />
);

const IconEl: React.FC<{ name: string }> = ({ name }) => (
  <span className="icon-outlined" data-icon="outlined" style={{ fontFamily: "Material Symbols Outlined", fontSize: 20, fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 20" }}>{name}</span>
);

const basicOptions: DropdownOption[] = [
  { value: "opt1", label: "Option one" },
  { value: "opt2", label: "Option two" },
  { value: "opt3", label: "Option three" },
  { value: "opt4", label: "Option four" },
  { value: "opt5", label: "Option five" },
];

const teamOptions: DropdownOption[] = [
  { value: "ben", label: "Ben Scott", description: "Engineering", avatar: <AvatarImg src={maleAvatars[0].imageUrl} size={36} /> },
  { value: "emma", label: "Emma Rose", description: "Design", avatar: <AvatarImg src={femaleAvatars[0].imageUrl} size={36} /> },
  { value: "chris", label: "Chris Nolan", description: "Product", avatar: <AvatarImg src={maleAvatars[1].imageUrl} size={36} /> },
  { value: "lily", label: "Lily Anne", description: "Marketing", avatar: <AvatarImg src={femaleAvatars[1].imageUrl} size={36} /> },
  { value: "james", label: "James Anderson", description: "Engineering", avatar: <AvatarImg src={maleAvatars[2].imageUrl} size={36} /> },
];

const iconOptions: DropdownOption[] = [
  { value: "home", label: "Home", icon: <IconEl name="home" /> },
  { value: "settings", label: "Settings", icon: <IconEl name="settings" /> },
  { value: "notifications", label: "Notifications", icon: <IconEl name="notifications" /> },
  { value: "analytics", label: "Analytics", icon: <IconEl name="analytics" /> },
  { value: "help", label: "Help & Support", icon: <IconEl name="help" /> },
];

const countryOptions: DropdownOption[] = [
  { value: "us", label: "United States" },
  { value: "gb", label: "United Kingdom" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
  { value: "au", label: "Australia" },
  { value: "ca", label: "Canada" },
  { value: "br", label: "Brazil" },
  { value: "in", label: "India" },
  { value: "kr", label: "South Korea" },
];

/**
 * A form control for choosing from a list of options.
 *
 * **Features:** Single/multiple selection, search filtering, icons, avatars,
 * descriptions, disabled items, error state, keyboard navigation.
 *
 * **Trigger:** Input-like button with chevron indicator.
 * **Menu:** Floating panel with rounded items, check marks, and optional search.
 *
 * Uses foundation tokens: `--color-neutral-*`, `--color-primary`,
 * `--color-error`, `--radius-md`, `--radius-sm`, `--shadow-xs`, `--shadow-lg`,
 * `--focus-ring-xs`, `--focus-ring-error-xs`, `--font-size-2`, `--font-weight-medium`.
 */
const meta: Meta = {
  title: "Base Components/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    placeholder: { control: "text", table: { category: "Content" } },
    label: { control: "text", table: { category: "Content" } },
    hint: { control: "text", table: { category: "Content" } },
    required: { control: "boolean", description: "Show required asterisk (*) next to label.", table: { category: "Content" } },
    info: { control: "boolean", description: "Show the info (?) icon next to the label.", table: { category: "Content" } },
    multiple: { control: "boolean", table: { category: "Behavior" } },
    searchable: { control: "boolean", table: { category: "Behavior" } },
    disabled: { control: "boolean", table: { category: "State" } },
    error: { control: "boolean", table: { category: "State" } },
    errorMessage: { control: "text", table: { category: "State" } },
  },
};
export default meta;

type Story = StoryObj;

export const Playground: Story = {
  args: {
    label: "Label",
    placeholder: "Select an option",
    hint: "This is a hint text to help the user.",
    required: false,
    info: false,
    options: basicOptions,
    multiple: false,
    searchable: false,
    disabled: false,
    error: false,
  },
  parameters: { docs: { disable: true } },
  render: (args) => {
    const { info, ...rest } = args as any;
    return <ControlledDropdown {...rest} tooltip={info ? "More information" : undefined} />;
  },
};

/** Basic single select. */
export const Default: Story = {
  parameters: { controls: { disable: true } },
  render: () => <ControlledDropdown label="Team member" placeholder="Select team member" options={countryOptions} required tooltip="Select the team member to assign this task to." hint="This is a hint text to help user." />,
};

/** With search filtering. */
export const Searchable: Story = {
  parameters: { controls: { disable: true } },
  render: () => <ControlledDropdown label="Search" placeholder="Search" options={countryOptions} searchable required tooltip="Search and select from the list." hint="This is a hint text to help user." />,
};

/** Multiple selection with checkboxes. */
export const Multiple: Story = {
  parameters: { controls: { disable: true } },
  render: () => <ControlledDropdown label="Team members" placeholder="Select members" options={teamOptions} multiple hint="Select one or more team members." />,
};

/** Options with leading icons. */
export const WithIcons: Story = {
  parameters: { controls: { disable: true } },
  render: () => <ControlledDropdown label="Navigate to" placeholder="Choose a page" options={iconOptions} />,
};

/** Options with avatars and descriptions. */
export const WithAvatars: Story = {
  parameters: { controls: { disable: true } },
  render: () => <ControlledDropdown label="Assign to" placeholder="Select a person" options={teamOptions} searchable />,
};

/** Disabled and error states. */
export const States: Story = {
  parameters: { controls: { disable: true }, layout: "padded" },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Section title="Default">
        <Dropdown label="Label" placeholder="Select..." options={basicOptions} hint="Hint text" />
      </Section>
      <Section title="Disabled">
        <Dropdown label="Label" placeholder="Select..." options={basicOptions} disabled hint="This field is disabled." />
      </Section>
      <Section title="Error">
        <Dropdown label="Label" placeholder="Select..." options={basicOptions} error errorMessage="This field is required." />
      </Section>
      <Section title="With disabled options">
        <ControlledDropdown
          label="Options"
          placeholder="Some are disabled"
          options={[
            { value: "a", label: "Available" },
            { value: "b", label: "Also available" },
            { value: "c", label: "Disabled option", disabled: true },
            { value: "d", label: "Another available" },
          ]}
        />
      </Section>
    </div>
  ),
};

/* ─── Helpers ──────────────────────────────────────────────────────────────── */

function ControlledDropdown(props: React.ComponentProps<typeof Dropdown>) {
  const [value, setValue] = useState<string | string[]>(props.multiple ? [] : "");
  return <Dropdown {...props} value={value} onChange={setValue} />;
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
