import React, { useState } from "react";
import { CopyButton } from "./CopyButton";
import { contrastRatio, wcagRating, type WcagRating } from "./contrast";

export interface SwatchProps {
  value: string;
  name: string;
  cssVar: string;
  showContrast?: boolean;
  description?: string;
}

/**
 * Polished color swatch: large preview, quick hex readout, and
 * contrast-on-hover with on-click copy for both hex and CSS variable.
 */
export const Swatch: React.FC<SwatchProps> = ({
  value,
  name,
  cssVar,
  showContrast = true,
  description,
}) => {
  const [hovered, setHovered] = useState(false);
  const onWhite = contrastRatio(value, "#ffffff");
  const onBlack = contrastRatio(value, "#000000");
  const bestRatio = Math.max(onWhite, onBlack);
  const bestAgainst: "white" | "black" = onWhite >= onBlack ? "white" : "black";
  const bestRating: WcagRating = wcagRating(bestRatio);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="group"
      aria-label={`${name} color swatch`}
      style={{
        display: "flex",
        flexDirection: "column",
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid var(--color-neutral-200)",
        background: "var(--color-white)",
        boxShadow: hovered ? "var(--shadow-md)" : "var(--shadow-xs)",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        transition: "all 160ms ease",
      }}
    >
      <div
        aria-hidden
        style={{
          background: value,
          height: 88,
          position: "relative",
        }}
      >
        {showContrast && (
          <span
            title={`Best against ${bestAgainst}: ${bestRatio.toFixed(2)}:1 (${bestRating})`}
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.04em",
              padding: "3px 7px",
              borderRadius: 999,
              background: "var(--color-white)",
              color:
                bestRating === "AAA" || bestRating === "AA"
                  ? "var(--color-success-700)"
                  : bestRating === "AA Large"
                  ? "var(--color-warning-700)"
                  : "var(--color-error-700)",
              boxShadow: "var(--shadow-xs)",
            }}
          >
            {bestRating}
          </span>
        )}
      </div>
      <div
        style={{
          padding: "12px 14px 14px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <strong
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "var(--color-neutral-900)",
              letterSpacing: "-0.005em",
            }}
          >
            {name}
          </strong>
          <span
            style={{
              fontSize: 12,
              fontFamily:
                "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
              color: "var(--color-neutral-500)",
              textTransform: "uppercase",
            }}
          >
            {value}
          </span>
        </div>
        {description && (
          <div style={{ fontSize: 11, color: "var(--color-neutral-600)" }}>
            {description}
          </div>
        )}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <CopyButton value={value} label="HEX" variant="solid" />
          <CopyButton value={cssVar} label="CSS" variant="solid" />
        </div>
      </div>
    </div>
  );
};
