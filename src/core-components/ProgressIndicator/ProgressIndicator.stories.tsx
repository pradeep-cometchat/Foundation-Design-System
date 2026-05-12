import type { Meta, StoryObj } from "@storybook/react";
import { ProgressBar, ProgressCircle } from "./ProgressIndicator.impl";

/**
 * Progress Indicators — visual feedback for ongoing operations.
 *
 * **Components:** Progress Bar, Progress Circle.
 *
 * **Progress Bar variants:**
 * - Label Right — percentage text on the right
 * - Top Floating — white pill label floating above the fill endpoint
 * - Slider (no label) — bar with a circular thumb at the progress point
 *
 * **Progress Circle sizes:** sm (200px), xs (160px), xxs (64px).
 *
 * Uses foundation tokens for colors, typography, and spacing.
 */
const meta: Meta = {
  title: "Base Components/Progress Indicator",
  component: ProgressBar,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;

type Story = StoryObj;

export const Playground: Story = {
  args: { value: 50, label: "right" },
  parameters: { docs: { disable: true } },
  render: (args: any) => (
    <div style={{ width: 320 }}>
      <ProgressBar {...args} />
    </div>
  ),
};

/** Progress Bar — label on the right side showing percentage. */
export const BarLabelRight: Story = {
  name: "Progress Bar — Label Right",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, width: 320 }}>
      <ProgressBar value={0} label="right" />
      <ProgressBar value={10} label="right" />
      <ProgressBar value={20} label="right" />
      <ProgressBar value={30} label="right" />
      <ProgressBar value={40} label="right" />
      <ProgressBar value={50} label="right" />
      <ProgressBar value={60} label="right" />
      <ProgressBar value={70} label="right" />
      <ProgressBar value={80} label="right" />
      <ProgressBar value={90} label="right" />
      <ProgressBar value={100} label="right" />
    </div>
  ),
};

/** Progress Bar — white floating pill label above the progress fill endpoint. */
export const BarLabelTopFloating: Story = {
  name: "Progress Bar — Top Floating",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 48, width: 320 }}>
      <ProgressBar value={0} label="top-floating" />
      <ProgressBar value={10} label="top-floating" />
      <ProgressBar value={20} label="top-floating" />
      <ProgressBar value={30} label="top-floating" />
      <ProgressBar value={40} label="top-floating" />
      <ProgressBar value={50} label="top-floating" />
      <ProgressBar value={60} label="top-floating" />
      <ProgressBar value={70} label="top-floating" />
      <ProgressBar value={80} label="top-floating" />
      <ProgressBar value={90} label="top-floating" />
      <ProgressBar value={100} label="top-floating" />
    </div>
  ),
};

/** Progress Bar — slider style with circular thumb, no label. */
export const BarSlider: Story = {
  name: "Progress Bar — Slider",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32, width: 320 }}>
      <ProgressBar value={10} label="none" />
      <ProgressBar value={25} label="none" />
      <ProgressBar value={40} label="none" />
      <ProgressBar value={50} label="none" />
      <ProgressBar value={75} label="none" />
      <ProgressBar value={100} label="none" />
    </div>
  ),
};

/** Progress Circle — all sizes with various progress values. */
export const CircleSizes: Story = {
  name: "Progress Circle",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <Section title="Small (200px)">
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <ProgressCircle value={0} size="sm" label="Active users" />
          <ProgressCircle value={40} size="sm" label="Active users" />
          <ProgressCircle value={75} size="sm" label="Completed" />
          <ProgressCircle value={100} size="sm" label="Done" />
        </div>
      </Section>
      <Section title="Extra Small (160px)">
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <ProgressCircle value={0} size="xs" label="Progress" />
          <ProgressCircle value={40} size="xs" label="Progress" />
          <ProgressCircle value={75} size="xs" label="Completed" />
          <ProgressCircle value={100} size="xs" label="Done" />
        </div>
      </Section>
      <Section title="Extra Extra Small (64px)">
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <ProgressCircle value={0} size="xxs" label="0%" />
          <ProgressCircle value={40} size="xxs" label="40%" />
          <ProgressCircle value={75} size="xxs" label="75%" />
          <ProgressCircle value={100} size="xxs" label="100%" />
        </div>
      </Section>
    </div>
  ),
};

/* ─── Helpers ──────────────────────────────────────────────────────────────── */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ fontSize: 12, fontWeight: 600, color: "var(--color-neutral-600)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>{title}</div>
      {children}
    </div>
  );
}
