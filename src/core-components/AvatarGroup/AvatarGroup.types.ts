/** Avatar sizes: xs=24, sm=32, md=40, lg=48, xl=56, 2xl=64. */
export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

/** Status icon type shown on the avatar. */
export type AvatarStatusIcon = "none" | "online" | "offline" | "company" | "verified";

/** Company icon type. */
export type AvatarCompanyType = "company" | "private" | "protected";

export interface AvatarProps {
  /** Image source URL. */
  src?: string;
  /** Alt text. */
  alt?: string;
  /** Size. Default: "md". */
  size?: AvatarSize;
  /** Fallback text (initials) when no image. */
  fallback?: string;
  /** Show icon placeholder instead of image. */
  showIcon?: boolean;
  /** Status icon overlay. */
  statusIcon?: AvatarStatusIcon;
  /** Online status (for online indicator). */
  online?: boolean;
  /** Company icon type. */
  companyType?: AvatarCompanyType;
  /** Additional className. */
  className?: string;
}

export interface AvatarGroupProps {
  /** Avatar items. */
  avatars: Array<{ src?: string; alt?: string; fallback?: string }>;
  /** Size. Default: "md". */
  size?: "xs" | "sm" | "md";
  /** Max avatars to show before "+N" counter. Default: 5. */
  max?: number;
  /** Show add button at the end. */
  showAdd?: boolean;
  /** Add button click handler. */
  onAdd?: () => void;
  /** Additional className. */
  className?: string;
}

export interface AvatarLabelGroupProps {
  /** Avatar image source. */
  src?: string;
  /** Avatar alt text. */
  alt?: string;
  /** Avatar fallback initials. */
  fallback?: string;
  /** Size. Default: "md". */
  size?: "sm" | "md" | "lg" | "xl";
  /** Primary name/title. */
  name: string;
  /** Supporting text (email, role, etc). */
  supportingText?: string;
  /** Status icon. */
  statusIcon?: AvatarStatusIcon;
  /** Online status. */
  online?: boolean;
  /** Additional className. */
  className?: string;
}
