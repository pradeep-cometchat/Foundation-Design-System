import type { Meta, StoryObj } from "@storybook/react";
import { ButtonGroup } from "./ButtonGroup.impl";
import { ButtonGroupItem } from "./ButtonGroupItem";

const ListIcon = () => (
  <span className="icon-outlined" data-icon="outlined" style={{ fontFamily: "Material Symbols Outlined", fontSize: 20, fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 20" }}>view_list</span>
);
const GridIcon = () => (
  <span className="icon-outlined" data-icon="outlined" style={{ fontFamily: "Material Symbols Outlined", fontSize: 20, fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 20" }}>grid_view</span>
);
const BoardIcon = () => (
  <span className="icon-outlined" data-icon="outlined" style={{ fontFamily: "Material Symbols Outlined", fontSize: 20, fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 20" }}>view_kanban</span>
);

/**
 * A segmented control that groups related actions into a single row.
 * Items share a border and radius. One item can be marked `current` to
 * indicate the active selection.
 *
 * **Variants:** Text only, Icon + text, Icon only.
 *
 * **States:** Default, Hover, Focused, Disabled, Current (active).
 *
 * Uses foundation tokens: `--color-neutral-*`, `--radius-md`, `--shadow-xs`,
 * `--focus-ring-xs`, `--font-size-2`, `--font-weight-semibold`.
 */
const meta: Meta<typeof ButtonGroup> = {
  title: "Base Components/Button Group",
  component: ButtonGroup,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;

type Story = StoryObj<typeof ButtonGroup>;

export const Playground: Story = {
  parameters: { docs: { disable: true } },
  render: () => (
    <ButtonGroup ariaLabel="View options">
      <ButtonGroupItem current>List</ButtonGroupItem>
      <ButtonGroupItem>Grid</ButtonGroupItem>
      <ButtonGroupItem>Board</ButtonGroupItem>
    </ButtonGroup>
  ),
};

/** Text-only items with one selected. */
export const TextOnly: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <ButtonGroup ariaLabel="Time range">
      <ButtonGroupItem>12 months</ButtonGroupItem>
      <ButtonGroupItem current>30 days</ButtonGroupItem>
      <ButtonGroupItem>7 days</ButtonGroupItem>
    </ButtonGroup>
  ),
};

/** Items with a leading icon. */
export const WithIcons: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <ButtonGroup ariaLabel="View options">
      <ButtonGroupItem icon={<ListIcon />} current>List</ButtonGroupItem>
      <ButtonGroupItem icon={<GridIcon />}>Grid</ButtonGroupItem>
      <ButtonGroupItem icon={<BoardIcon />}>Board</ButtonGroupItem>
    </ButtonGroup>
  ),
};

/** Icon-only items. */
export const IconOnly: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <ButtonGroup ariaLabel="View options">
      <ButtonGroupItem iconOnly icon={<ListIcon />} current>List view</ButtonGroupItem>
      <ButtonGroupItem iconOnly icon={<GridIcon />}>Grid view</ButtonGroupItem>
      <ButtonGroupItem iconOnly icon={<BoardIcon />}>Board view</ButtonGroupItem>
    </ButtonGroup>
  ),
};

/** Showing disabled items. */
export const States: Story = {
  parameters: { controls: { disable: true }, layout: "padded" },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Section title="Default with current">
        <ButtonGroup ariaLabel="Options">
          <ButtonGroupItem>One</ButtonGroupItem>
          <ButtonGroupItem current>Two</ButtonGroupItem>
          <ButtonGroupItem>Three</ButtonGroupItem>
        </ButtonGroup>
      </Section>
      <Section title="With disabled items">
        <ButtonGroup ariaLabel="Options">
          <ButtonGroupItem>Active</ButtonGroupItem>
          <ButtonGroupItem disabled>Disabled</ButtonGroupItem>
          <ButtonGroupItem current>Current</ButtonGroupItem>
        </ButtonGroup>
      </Section>
      <Section title="All disabled">
        <ButtonGroup ariaLabel="Options">
          <ButtonGroupItem disabled>One</ButtonGroupItem>
          <ButtonGroupItem disabled>Two</ButtonGroupItem>
          <ButtonGroupItem disabled>Three</ButtonGroupItem>
        </ButtonGroup>
      </Section>
    </div>
  ),
};

/** Multiple groups showing different content types. */
export const Examples: Story = {
  parameters: { controls: { disable: true }, layout: "padded" },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Section title="Navigation tabs">
        <ButtonGroup ariaLabel="Navigation">
          <ButtonGroupItem current>Overview</ButtonGroupItem>
          <ButtonGroupItem>Analytics</ButtonGroupItem>
          <ButtonGroupItem>Reports</ButtonGroupItem>
          <ButtonGroupItem>Notifications</ButtonGroupItem>
        </ButtonGroup>
      </Section>
      <Section title="Alignment controls">
        <ButtonGroup ariaLabel="Text alignment">
          <ButtonGroupItem iconOnly icon={<AlignIcon name="format_align_left" />} current>Left</ButtonGroupItem>
          <ButtonGroupItem iconOnly icon={<AlignIcon name="format_align_center" />}>Center</ButtonGroupItem>
          <ButtonGroupItem iconOnly icon={<AlignIcon name="format_align_right" />}>Right</ButtonGroupItem>
          <ButtonGroupItem iconOnly icon={<AlignIcon name="format_align_justify" />}>Justify</ButtonGroupItem>
        </ButtonGroup>
      </Section>
      <Section title="Date range picker">
        <ButtonGroup ariaLabel="Date range">
          <ButtonGroupItem>Today</ButtonGroupItem>
          <ButtonGroupItem>Yesterday</ButtonGroupItem>
          <ButtonGroupItem current>Last 7 days</ButtonGroupItem>
          <ButtonGroupItem>Last 30 days</ButtonGroupItem>
          <ButtonGroupItem>This year</ButtonGroupItem>
        </ButtonGroup>
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

function AlignIcon({ name }: { name: string }) {
  return (
    <span className="icon-outlined" data-icon="outlined" style={{ fontFamily: "Material Symbols Outlined", fontSize: 20, fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 20" }}>
      {name}
    </span>
  );
}
