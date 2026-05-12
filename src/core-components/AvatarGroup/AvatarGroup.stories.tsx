import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, AvatarGroup, AvatarLabelGroup } from "./AvatarGroup.impl";
import type { AvatarSize } from "./AvatarGroup.types";
import { avatarRegistry } from "../../foundation/tokens/avatars";

const maleAvatars = avatarRegistry["Male Avatar"];
const femaleAvatars = avatarRegistry["Female Avatar"];

/**
 * Avatar system — individual avatars, grouped stacks, and labeled profiles.
 *
 * **Components:** Avatar, Avatar Group, Avatar Label Group.
 *
 * **Sizes:** xs (24), sm (32), md (40), lg (48), xl (56), 2xl (64).
 *
 * **Status icons:** Online indicator, Offline, Verified tick, Company icon.
 *
 * **Features:** Fallback initials, icon placeholder, add button, overflow counter.
 *
 * Uses foundation tokens and Avatars from the foundation tab.
 */
const meta: Meta = {
  title: "Base Components/Avatar Group",
  component: Avatar,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl", "2xl"] satisfies AvatarSize[], table: { category: "Appearance" } },
    statusIcon: { control: "select", options: ["none", "online", "offline", "verified"], table: { category: "Appearance" } },
  },
};
export default meta;

type Story = StoryObj;

export const Playground: Story = {
  args: { size: "lg", statusIcon: "online" },
  parameters: { docs: { disable: true } },
  render: (args: any) => <Avatar src={maleAvatars[0].imageUrl} alt="Ben Scott" {...args} />,
};

/** Avatar online indicator — all sizes, online and offline. */
export const OnlineIndicator: Story = {
  name: "Online Indicator",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Section title="Offline (all sizes)">
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          {(["xs", "sm", "md", "lg", "xl", "2xl"] as AvatarSize[]).map((sz) => (
            <div key={sz} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <OnlineDot size={sz} online={false} />
              <span style={{ fontSize: 10, color: "var(--color-neutral-600)", fontFamily: "var(--sb-font-mono)" }}>{sz}</span>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Online (all sizes)">
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          {(["xs", "sm", "md", "lg", "xl", "2xl"] as AvatarSize[]).map((sz) => (
            <div key={sz} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <OnlineDot size={sz} online={true} />
              <span style={{ fontSize: 10, color: "var(--color-neutral-600)", fontFamily: "var(--sb-font-mono)" }}>{sz}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  ),
};

/** Avatar company icon — Company, Private, Protected types at all sizes. */
export const CompanyIcon: Story = {
  name: "Company Icon",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Section title="Company (all sizes)">
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {(["xs", "sm", "md", "lg", "xl", "2xl"] as AvatarSize[]).map((sz) => (
            <div key={sz} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <CompanyBadge size={sz} type="company" />
              <span style={{ fontSize: 10, color: "var(--color-neutral-600)", fontFamily: "var(--sb-font-mono)" }}>{sz}</span>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Private (all sizes)">
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {(["xs", "sm", "md", "lg", "xl", "2xl"] as AvatarSize[]).map((sz) => (
            <div key={sz} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <CompanyBadge size={sz} type="private" />
              <span style={{ fontSize: 10, color: "var(--color-neutral-600)", fontFamily: "var(--sb-font-mono)" }}>{sz}</span>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Protected (all sizes)">
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {(["xs", "sm", "md", "lg", "xl", "2xl"] as AvatarSize[]).map((sz) => (
            <div key={sz} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <CompanyBadge size={sz} type="protected" />
              <span style={{ fontSize: 10, color: "var(--color-neutral-600)", fontFamily: "var(--sb-font-mono)" }}>{sz}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  ),
};

/** Verified tick — all sizes. */
export const VerifiedTick: Story = {
  name: "Verified Tick",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Section title="All sizes">
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {([10, 12, 14, 16, 18, 20, 24, 28] as const).map((px) => (
            <div key={px} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <VerifiedIcon size={px} />
              <span style={{ fontSize: 10, color: "var(--color-neutral-600)", fontFamily: "var(--sb-font-mono)" }}>{px}px</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  ),
};

/** Avatar add button — all sizes and states. */
export const AddButton: Story = {
  name: "Add Button",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Section title="Default (all sizes)">
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <AvatarAddBtn size={24} />
          <AvatarAddBtn size={32} />
          <AvatarAddBtn size={40} />
        </div>
      </Section>
      <Section title="Hover state (simulated with primary color)">
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <AvatarAddBtn size={24} hovered />
          <AvatarAddBtn size={32} hovered />
          <AvatarAddBtn size={40} hovered />
        </div>
      </Section>
      <Section title="Focus state">
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <AvatarAddBtn size={24} focused />
          <AvatarAddBtn size={32} focused />
          <AvatarAddBtn size={40} focused />
        </div>
      </Section>
      <Section title="Disabled">
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <AvatarAddBtn size={24} disabled />
          <AvatarAddBtn size={32} disabled />
          <AvatarAddBtn size={40} disabled />
        </div>
      </Section>
    </div>
  ),
};

/** Avatar — all sizes with image, all status icon variants. Matches Figma node 17282-60230. */
export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <Section title="With image — no status icon">
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          {(["xs", "sm", "md", "lg", "xl", "2xl"] as AvatarSize[]).map((sz) => (
            <Avatar key={sz} src={maleAvatars[0].imageUrl} size={sz} />
          ))}
        </div>
      </Section>
      <Section title="With image — online indicator">
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          {(["xs", "sm", "md", "lg", "xl", "2xl"] as AvatarSize[]).map((sz) => (
            <Avatar key={sz} src={maleAvatars[0].imageUrl} size={sz} statusIcon="online" />
          ))}
        </div>
      </Section>
      <Section title="With image — company icon">
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          {(["xs", "sm", "md", "lg", "xl", "2xl"] as AvatarSize[]).map((sz) => (
            <Avatar key={sz} src={maleAvatars[0].imageUrl} size={sz} statusIcon="company" />
          ))}
        </div>
      </Section>
      <Section title="With image — verified tick">
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          {(["xs", "sm", "md", "lg", "xl", "2xl"] as AvatarSize[]).map((sz) => (
            <Avatar key={sz} src={maleAvatars[0].imageUrl} size={sz} statusIcon="verified" />
          ))}
        </div>
      </Section>
      <Section title="Icon placeholder — no status">
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          {(["xs", "sm", "md", "lg", "xl", "2xl"] as AvatarSize[]).map((sz) => (
            <Avatar key={sz} size={sz} showIcon />
          ))}
        </div>
      </Section>
      <Section title="Icon placeholder — online indicator">
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          {(["xs", "sm", "md", "lg", "xl", "2xl"] as AvatarSize[]).map((sz) => (
            <Avatar key={sz} size={sz} showIcon statusIcon="online" />
          ))}
        </div>
      </Section>
      <Section title="Icon placeholder — company icon">
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          {(["xs", "sm", "md", "lg", "xl", "2xl"] as AvatarSize[]).map((sz) => (
            <Avatar key={sz} size={sz} showIcon statusIcon="company" />
          ))}
        </div>
      </Section>
      <Section title="Text (initials) — no status">
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          {(["xs", "sm", "md", "lg", "xl", "2xl"] as AvatarSize[]).map((sz) => (
            <Avatar key={sz} size={sz} fallback="OR" />
          ))}
        </div>
      </Section>
      <Section title="Text (initials) — online indicator">
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          {(["xs", "sm", "md", "lg", "xl", "2xl"] as AvatarSize[]).map((sz) => (
            <Avatar key={sz} size={sz} fallback="OR" statusIcon="online" />
          ))}
        </div>
      </Section>
      <Section title="Text (initials) — company icon">
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          {(["xs", "sm", "md", "lg", "xl", "2xl"] as AvatarSize[]).map((sz) => (
            <Avatar key={sz} size={sz} fallback="OR" statusIcon="company" />
          ))}
        </div>
      </Section>
    </div>
  ),
};

/** Avatar group — all sizes with counter and add button. Matches Figma node 17282-60462. */
export const Group: Story = {
  name: "Avatar Group",
  parameters: { controls: { disable: true } },
  render: () => {
    const avatars = [
      { src: maleAvatars[0].imageUrl },
      { src: femaleAvatars[0].imageUrl },
      { src: maleAvatars[1].imageUrl },
      { src: femaleAvatars[1].imageUrl },
      { src: maleAvatars[2].imageUrl },
      { src: femaleAvatars[2].imageUrl },
      { src: maleAvatars[3].imageUrl },
      { src: femaleAvatars[3].imageUrl },
      { src: maleAvatars[4].imageUrl },
      { src: femaleAvatars[4].imageUrl },
    ];
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <Section title="Extra small (xs)">
          <AvatarGroup avatars={avatars} size="xs" max={5} showAdd onAdd={() => {}} />
        </Section>
        <Section title="Small (sm)">
          <AvatarGroup avatars={avatars} size="sm" max={5} showAdd onAdd={() => {}} />
        </Section>
        <Section title="Medium (md)">
          <AvatarGroup avatars={avatars} size="md" max={5} showAdd onAdd={() => {}} />
        </Section>
      </div>
    );
  },
};

/** Avatar label group — all sizes × all status icons. Matches Figma node 17282-60149. */
export const LabelGroup: Story = {
  name: "Avatar Label Group",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
      <Section title="Small — no status">
        <AvatarLabelGroup src={maleAvatars[0].imageUrl} size="sm" name="Olivia Rhye" supportingText="olivia@untitledui.com" />
      </Section>
      <Section title="Small — online">
        <AvatarLabelGroup src={maleAvatars[0].imageUrl} size="sm" name="Olivia Rhye" supportingText="olivia@untitledui.com" statusIcon="online" />
      </Section>
      <Section title="Small — company">
        <AvatarLabelGroup src={maleAvatars[0].imageUrl} size="sm" name="Olivia Rhye" supportingText="olivia@untitledui.com" statusIcon="company" />
      </Section>
      <Section title="Small — verified">
        <AvatarLabelGroup src={maleAvatars[0].imageUrl} size="sm" name="Olivia Rhye" supportingText="olivia@untitledui.com" statusIcon="verified" />
      </Section>
      <Section title="Medium — no status">
        <AvatarLabelGroup src={maleAvatars[0].imageUrl} size="md" name="Olivia Rhye" supportingText="olivia@untitledui.com" />
      </Section>
      <Section title="Medium — online">
        <AvatarLabelGroup src={maleAvatars[0].imageUrl} size="md" name="Olivia Rhye" supportingText="olivia@untitledui.com" statusIcon="online" />
      </Section>
      <Section title="Medium — company">
        <AvatarLabelGroup src={maleAvatars[0].imageUrl} size="md" name="Olivia Rhye" supportingText="olivia@untitledui.com" statusIcon="company" />
      </Section>
      <Section title="Medium — verified">
        <AvatarLabelGroup src={maleAvatars[0].imageUrl} size="md" name="Olivia Rhye" supportingText="olivia@untitledui.com" statusIcon="verified" />
      </Section>
      <Section title="Large — no status">
        <AvatarLabelGroup src={maleAvatars[0].imageUrl} size="lg" name="Olivia Rhye" supportingText="olivia@untitledui.com" />
      </Section>
      <Section title="Large — online">
        <AvatarLabelGroup src={maleAvatars[0].imageUrl} size="lg" name="Olivia Rhye" supportingText="olivia@untitledui.com" statusIcon="online" />
      </Section>
      <Section title="Large — company">
        <AvatarLabelGroup src={maleAvatars[0].imageUrl} size="lg" name="Olivia Rhye" supportingText="olivia@untitledui.com" statusIcon="company" />
      </Section>
      <Section title="Large — verified">
        <AvatarLabelGroup src={maleAvatars[0].imageUrl} size="lg" name="Olivia Rhye" supportingText="olivia@untitledui.com" statusIcon="verified" />
      </Section>
      <Section title="XL — no status">
        <AvatarLabelGroup src={maleAvatars[0].imageUrl} size="xl" name="Olivia Rhye" supportingText="olivia@untitledui.com" />
      </Section>
      <Section title="XL — online">
        <AvatarLabelGroup src={maleAvatars[0].imageUrl} size="xl" name="Olivia Rhye" supportingText="olivia@untitledui.com" statusIcon="online" />
      </Section>
      <Section title="XL — company">
        <AvatarLabelGroup src={maleAvatars[0].imageUrl} size="xl" name="Olivia Rhye" supportingText="olivia@untitledui.com" statusIcon="company" />
      </Section>
      <Section title="XL — verified">
        <AvatarLabelGroup src={maleAvatars[0].imageUrl} size="xl" name="Olivia Rhye" supportingText="olivia@untitledui.com" statusIcon="verified" />
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

/* Sub-component renders for the dedicated stories */

const indicatorSizeMap: Record<string, number> = { xs: 6, sm: 8, md: 10, lg: 12, xl: 14, "2xl": 16 };

function OnlineDot({ size, online }: { size: AvatarSize; online: boolean }) {
  const px = indicatorSizeMap[size] ?? 10;
  return (
    <div style={{ width: px, height: px, borderRadius: "50%", background: online ? "var(--color-success-500)" : "var(--color-neutral-lm-300)", border: "1.5px solid var(--color-white)", boxSizing: "content-box" }} />
  );
}

const companySizeMap: Record<string, number> = { xs: 10, sm: 12, md: 14, lg: 16, xl: 18, "2xl": 20 };

const companyLogos = avatarRegistry["Avatar company logo"];

function CompanyBadge({ size, type }: { size: AvatarSize; type: "company" | "private" | "protected" }) {
  const px = companySizeMap[size] ?? 14;

  if (type === "private") {
    return (
      <svg width={px} height={px} viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8.5" cy="8.5" r="7.9" fill="#079455" stroke="white" strokeWidth="1.17" />
        <path d="M6.03 12.62c-.22 0-.4-.08-.55-.23a.75.75 0 0 1-.23-.55V7.77c0-.22.08-.4.23-.55a.75.75 0 0 1 .55-.24h.52V6.11c0-.54.19-1 .57-1.38.38-.38.84-.57 1.38-.57.54 0 1 .19 1.38.57.38.38.57.84.57 1.38v.87h.52c.22 0 .4.08.55.23.15.15.23.34.23.55v4.07c0 .22-.08.4-.23.55a.75.75 0 0 1-.55.23H6.03zM8.5 10.56c.21 0 .39-.07.54-.22.15-.15.22-.33.22-.54 0-.21-.07-.39-.22-.54a.73.73 0 0 0-.54-.22.73.73 0 0 0-.54.22.73.73 0 0 0-.22.54c0 .21.07.39.22.54.15.15.33.22.54.22zM7.2 6.98h2.6V6.11c0-.36-.13-.67-.38-.92a1.25 1.25 0 0 0-.92-.38c-.36 0-.67.13-.92.38-.25.25-.38.56-.38.92v.87z" fill="white" />
      </svg>
    );
  }

  if (type === "protected") {
    return (
      <svg width={px} height={px} viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8.5" cy="8.5" r="7.9" fill="#DC6803" stroke="white" strokeWidth="1.17" />
        <path d="M8.5 12.56c-.05 0-.09 0-.13-.01a.6.6 0 0 1-.13-.03c-.91-.33-1.64-.9-2.18-1.73-.54-.83-.81-1.72-.81-2.68V6.16c0-.16.05-.31.14-.44a.7.7 0 0 1 .37-.29l2.47-.92a.8.8 0 0 1 .27-.05c.09 0 .18.02.27.05l2.47.92c.15.06.27.16.37.29.1.13.14.28.14.44v1.95c0 .96-.27 1.85-.81 2.68-.54.83-1.27 1.4-2.18 1.73a.6.6 0 0 1-.13.03c-.04.01-.09.01-.13.01z" fill="white" />
      </svg>
    );
  }

  // Company type — circular company logo image (from foundation avatars)
  // Uses the actual company logo from the foundation avatar registry
  const logoUrl = companyLogos[0]?.imageUrl;
  return (
    <div style={{
      width: px,
      height: px,
      borderRadius: "50%",
      overflow: "hidden",
      border: "1.5px solid white",
      boxSizing: "content-box",
      flexShrink: 0,
    }}>
      <img
        src={logoUrl}
        alt="Company"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    </div>
  );
}

function VerifiedIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.3553 2.83363C12.5073 3.20115 12.7989 3.49327 13.1662 3.64579L14.4541 4.17925C14.8217 4.33149 15.1137 4.6235 15.2659 4.99104C15.4182 5.35858 15.4182 5.77155 15.2659 6.13909L14.7328 7.42606C14.5805 7.79376 14.5803 8.20715 14.7333 8.57467L15.2655 9.86125C15.3409 10.0433 15.3798 10.2384 15.3798 10.4355C15.3799 10.6325 15.3411 10.8277 15.2657 11.0097C15.1902 11.1918 15.0797 11.3572 14.9403 11.4966C14.801 11.6359 14.6355 11.7464 14.4534 11.8217L13.1665 12.3548C12.7989 12.5068 12.5068 12.7985 12.3543 13.1657L11.8208 14.4536C11.6686 14.8212 11.3766 15.1132 11.009 15.2654C10.6415 15.4177 10.2285 15.4177 9.86099 15.2654L8.57403 14.7323C8.20648 14.5805 7.79366 14.5808 7.42634 14.7332L6.13845 15.2659C5.77111 15.4178 5.3585 15.4177 4.99126 15.2655C4.62402 15.1134 4.33217 14.8218 4.17982 14.4546L3.6462 13.1663C3.49424 12.7988 3.20256 12.5067 2.83527 12.3542L1.54739 11.8207C1.18 11.6686 0.88808 11.3767 0.735782 11.0094C0.583485 10.6421 0.583278 10.2293 0.735208 9.86181L1.26829 8.57484C1.42015 8.20729 1.41984 7.79447 1.26742 7.42715L0.735111 6.13834C0.659639 5.9563 0.620778 5.76117 0.620746 5.56411C0.620714 5.36704 0.659514 5.1719 0.734926 4.98984C0.81034 4.80778 0.920888 4.64236 1.06026 4.50304C1.19962 4.36371 1.36508 4.25322 1.54716 4.17786L2.83413 3.64479C3.20132 3.49296 3.49327 3.20164 3.6459 2.83478L4.17936 1.54689C4.3316 1.17935 4.62361 0.887337 4.99115 0.735096C5.3587 0.582855 5.77166 0.582855 6.1392 0.735096L7.42617 1.26817C7.79372 1.42004 8.20654 1.41973 8.57386 1.26731L9.86229 0.735923C10.2298 0.583767 10.6427 0.583799 11.0101 0.736009C11.3776 0.88822 11.6696 1.18015 11.8218 1.54759L12.3555 2.83587L12.3553 2.83363Z" fill="#528BFF" />
      <path fillRule="evenodd" clipRule="evenodd" d="M11.1333 5.90291C11.2401 5.73503 11.276 5.53157 11.2328 5.33728C11.1897 5.14299 11.0711 4.9738 10.9033 4.86691C10.7354 4.76003 10.5319 4.72422 10.3376 4.76735C10.1433 4.81048 9.97414 4.92903 9.86726 5.09691L6.93026 9.71191L5.58626 8.03191C5.46201 7.8765 5.2811 7.7768 5.08335 7.75477C4.88559 7.73273 4.68718 7.79016 4.53176 7.91441C4.37634 8.03867 4.27665 8.21957 4.25462 8.41733C4.23258 8.61508 4.29001 8.8135 4.41426 8.96891L6.41426 11.4689C6.4888 11.5622 6.58453 11.6363 6.6935 11.6852C6.80246 11.734 6.92152 11.7561 7.04075 11.7497C7.15998 11.7432 7.27595 11.7084 7.37901 11.6481C7.48207 11.5877 7.56923 11.5037 7.63326 11.4029L11.1333 5.90291Z" fill="white" />
    </svg>
  );
}

function AvatarAddBtn({ size, hovered, focused, disabled }: { size: number; hovered?: boolean; focused?: boolean; disabled?: boolean }) {
  return (
    <button
      type="button"
      disabled={disabled}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "var(--color-white)",
        border: `1.5px dashed ${hovered ? "var(--color-primary)" : "var(--color-neutral-lm-300)"}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        color: hovered ? "var(--color-primary)" : "var(--color-neutral-lm-500)",
        boxShadow: focused ? "var(--focus-ring-xs)" : "none",
        padding: 0,
        outline: "none",
      }}
    >
      <svg width={size * 0.4} height={size * 0.4} viewBox="0 0 16 16" fill="none">
        <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </button>
  );
}
