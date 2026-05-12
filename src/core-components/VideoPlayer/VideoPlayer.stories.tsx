import type { Meta, StoryObj } from "@storybook/react";
import { VideoPlayer } from "./VideoPlayer.impl";

const POSTER = "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=720&h=405&fit=crop&q=80";

/**
 * Video Player 16:9 — a media player with controls overlay.
 *
 * **Sizes:** lg (720×405, 12px radius), md (560×315, 8px radius), sm (320×180, 8px radius).
 *
 * **States:** Playing (controls bar only), Paused (play button overlay + controls bar).
 *
 * **Controls:** Play/Pause, Volume slider, Progress timeline, Playback speed, Airplay, Fullscreen.
 *
 * **sm variant:** Simplified controls (play/pause, volume, fullscreen only).
 *
 * Uses foundation tokens for colors, radius, and typography.
 */
const meta: Meta = {
  title: "Base Components/Video Player",
  component: VideoPlayer,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;

type Story = StoryObj;

export const Playground: Story = {
  args: { size: "lg", playing: false, progress: 35, buffered: 60, volume: 80 },
  parameters: { docs: { disable: true } },
  render: (args: any) => <VideoPlayer {...args} poster={POSTER} />,
};

/** All sizes — paused state with play button overlay. */
export const Sizes: Story = {
  name: "Sizes",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32, alignItems: "center" }}>
      <Section title="Large (720×405)">
        <VideoPlayer size="lg" poster={POSTER} progress={0} buffered={20} />
      </Section>
      <Section title="Medium (560×315)">
        <VideoPlayer size="md" poster={POSTER} progress={0} buffered={20} />
      </Section>
      <Section title="Small (320×180)">
        <VideoPlayer size="sm" poster={POSTER} progress={0} buffered={20} />
      </Section>
    </div>
  ),
};

/** Playing state — no play overlay, controls bar visible. */
export const Playing: Story = {
  name: "Playing",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32, alignItems: "center" }}>
      <Section title="Large — Playing">
        <VideoPlayer size="lg" playing poster={POSTER} progress={45} buffered={70} currentTime="03:42" remainingTime="-04:42" />
      </Section>
      <Section title="Medium — Playing">
        <VideoPlayer size="md" playing poster={POSTER} progress={60} buffered={85} currentTime="05:00" remainingTime="-03:24" />
      </Section>
      <Section title="Small — Playing">
        <VideoPlayer size="sm" playing poster={POSTER} progress={30} buffered={50} />
      </Section>
    </div>
  ),
};

/** Paused state — play button overlay visible. */
export const Paused: Story = {
  name: "Paused",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32, alignItems: "center" }}>
      <Section title="Large — Paused at 50%">
        <VideoPlayer size="lg" poster={POSTER} progress={50} buffered={75} currentTime="04:12" remainingTime="-04:12" />
      </Section>
      <Section title="Medium — Paused at 25%">
        <VideoPlayer size="md" poster={POSTER} progress={25} buffered={50} currentTime="02:06" remainingTime="-06:18" />
      </Section>
      <Section title="Small — Paused">
        <VideoPlayer size="sm" poster={POSTER} progress={10} buffered={40} />
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
