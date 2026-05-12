import React from "react";
import type { AvatarProps, AvatarGroupProps, AvatarLabelGroupProps, AvatarSize } from "./AvatarGroup.types";
import { avatarRegistry } from "../../foundation/tokens/avatars";
import "./AvatarGroup.css";

/**
 * Avatar — a circular user image with optional status indicator.
 */
export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "",
  size = "md",
  fallback,
  showIcon = false,
  statusIcon = "none",
  online = true,
  className,
}) => {
  const classes = ["avatar", `avatar--${size}`, className].filter(Boolean).join(" ");

  return (
    <div className={classes}>
      {src ? (
        <div className="avatar__img-wrap">
          <img src={src} alt={alt} className="avatar__img" />
        </div>
      ) : (showIcon || !fallback) ? (
        <div className="avatar__fallback-wrap">
          <span className="avatar__icon">
            <svg width="50%" height="50%" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M12 12c2.5 0 4.5-2 4.5-4.5S14.5 3 12 3 7.5 5 7.5 7.5 9.5 12 12 12zm0 2c-3 0-9 1.5-9 4.5V21h18v-2.5c0-3-6-4.5-9-4.5z" fill="currentColor" />
            </svg>
          </span>
        </div>
      ) : (
        <div className="avatar__fallback-wrap">
          <span className="avatar__fallback">{fallback}</span>
        </div>
      )}
      {(statusIcon === "online" || statusIcon === "offline") && (
        <span className={`avatar__status avatar__status--${online ? "online" : "offline"}`} />
      )}
      {statusIcon === "verified" && (
        <span className="avatar__verified">
          <VerifiedBadge size={size} />
        </span>
      )}
      {statusIcon === "company" && (
        <span className="avatar__company">
          <CompanyBadge size={size} />
        </span>
      )}
    </div>
  );
};

/**
 * AvatarGroup — a stack of overlapping avatars with optional counter and add button.
 */
export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatars,
  size = "md",
  max = 5,
  showAdd = false,
  onAdd,
  className,
}) => {
  const visible = avatars.slice(0, max);
  const remaining = avatars.length - max;

  const sizeMap = { xs: "xs" as const, sm: "sm" as const, md: "md" as const };

  return (
    <div className={`avatar-group avatar-group--${size} ${className ?? ""}`}>
      {visible.map((a, i) => (
        <Avatar key={i} src={a.src} alt={a.alt} fallback={a.fallback} size={sizeMap[size]} />
      ))}
      {remaining > 0 && (
        <span className="avatar-group__counter">+{remaining}</span>
      )}
      {showAdd && (
        <button type="button" className="avatar-group__add" onClick={onAdd} aria-label="Add user">
          <svg width="40%" height="40%" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
};

/**
 * AvatarLabelGroup — avatar with name and supporting text beside it.
 */
export const AvatarLabelGroup: React.FC<AvatarLabelGroupProps> = ({
  src,
  alt,
  fallback,
  size = "md",
  name,
  supportingText,
  statusIcon = "none",
  online = true,
  className,
}) => {
  const avatarSizeMap = { sm: "sm" as const, md: "md" as const, lg: "lg" as const, xl: "xl" as const };

  return (
    <div className={`avatar-label-group avatar-label-group--${size} ${className ?? ""}`}>
      <Avatar src={src} alt={alt} fallback={fallback} size={avatarSizeMap[size]} statusIcon={statusIcon} online={online} />
      <div className="avatar-label-group__text">
        <span className="avatar-label-group__name">{name}</span>
        {supportingText && <span className="avatar-label-group__supporting">{supportingText}</span>}
      </div>
    </div>
  );
};


/* ─── Verified Badge (blue seal shape from Figma) ──────────────────────────── */

const verifiedSizeMap: Record<AvatarSize, number> = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  "2xl": 20,
};

const VerifiedBadge: React.FC<{ size: AvatarSize }> = ({ size }) => {
  const px = verifiedSizeMap[size];
  return (
    <svg width={px} height={px} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M12.3553 2.83363C12.5073 3.20115 12.7989 3.49327 13.1662 3.64579L14.4541 4.17925C14.8217 4.33149 15.1137 4.6235 15.2659 4.99104C15.4182 5.35858 15.4182 5.77155 15.2659 6.13909L14.7328 7.42606C14.5805 7.79376 14.5803 8.20715 14.7333 8.57467L15.2655 9.86125C15.3409 10.0433 15.3798 10.2384 15.3798 10.4355C15.3799 10.6325 15.3411 10.8277 15.2657 11.0097C15.1902 11.1918 15.0797 11.3572 14.9403 11.4966C14.801 11.6359 14.6355 11.7464 14.4534 11.8217L13.1665 12.3548C12.7989 12.5068 12.5068 12.7985 12.3543 13.1657L11.8208 14.4536C11.6686 14.8212 11.3766 15.1132 11.009 15.2654C10.6415 15.4177 10.2285 15.4177 9.86099 15.2654L8.57403 14.7323C8.20648 14.5805 7.79366 14.5808 7.42634 14.7332L6.13845 15.2659C5.77111 15.4178 5.3585 15.4177 4.99126 15.2655C4.62402 15.1134 4.33217 14.8218 4.17982 14.4546L3.6462 13.1663C3.49424 12.7988 3.20256 12.5067 2.83527 12.3542L1.54739 11.8207C1.18 11.6686 0.88808 11.3767 0.735782 11.0094C0.583485 10.6421 0.583278 10.2293 0.735208 9.86181L1.26829 8.57484C1.42015 8.20729 1.41984 7.79447 1.26742 7.42715L0.735111 6.13834C0.659639 5.9563 0.620778 5.76117 0.620746 5.56411C0.620714 5.36704 0.659514 5.1719 0.734926 4.98984C0.81034 4.80778 0.920888 4.64236 1.06026 4.50304C1.19962 4.36371 1.36508 4.25322 1.54716 4.17786L2.83413 3.64479C3.20132 3.49296 3.49327 3.20164 3.6459 2.83478L4.17936 1.54689C4.3316 1.17935 4.62361 0.887337 4.99115 0.735096C5.3587 0.582855 5.77166 0.582855 6.1392 0.735096L7.42617 1.26817C7.79372 1.42004 8.20654 1.41973 8.57386 1.26731L9.86229 0.735923C10.2298 0.583767 10.6427 0.583799 11.0101 0.736009C11.3776 0.88822 11.6696 1.18015 11.8218 1.54759L12.3555 2.83587L12.3553 2.83363Z" fill="#528BFF" />
      <path fillRule="evenodd" clipRule="evenodd" d="M11.1333 5.90291C11.2401 5.73503 11.276 5.53157 11.2328 5.33728C11.1897 5.14299 11.0711 4.9738 10.9033 4.86691C10.7354 4.76003 10.5319 4.72422 10.3376 4.76735C10.1433 4.81048 9.97414 4.92903 9.86726 5.09691L6.93026 9.71191L5.58626 8.03191C5.46201 7.8765 5.2811 7.7768 5.08335 7.75477C4.88559 7.73273 4.68718 7.79016 4.53176 7.91441C4.37634 8.03867 4.27665 8.21957 4.25462 8.41733C4.23258 8.61508 4.29001 8.8135 4.41426 8.96891L6.41426 11.4689C6.4888 11.5622 6.58453 11.6363 6.6935 11.6852C6.80246 11.734 6.92152 11.7561 7.04075 11.7497C7.15998 11.7432 7.27595 11.7084 7.37901 11.6481C7.48207 11.5877 7.56923 11.5037 7.63326 11.4029L11.1333 5.90291Z" fill="white" />
    </svg>
  );
};


/* ─── Company Badge (circular company logo from Figma) ─────────────────────── */

const companySizeMap: Record<AvatarSize, number> = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  "2xl": 20,
};

const companyLogos = avatarRegistry["Avatar company logo"];

const CompanyBadge: React.FC<{ size: AvatarSize }> = ({ size }) => {
  const px = companySizeMap[size];
  const logoUrl = companyLogos[0]?.imageUrl;
  return (
    <div
      style={{
        width: px,
        height: px,
        borderRadius: "50%",
        overflow: "hidden",
        border: "1.5px solid white",
        boxSizing: "content-box",
        flexShrink: 0,
      }}
      aria-hidden
    >
      <img
        src={logoUrl}
        alt=""
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    </div>
  );
};
