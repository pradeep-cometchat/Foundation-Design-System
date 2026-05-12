import React from "react";

export interface FoundationCardProps {
  docsPath: string;
  children: React.ReactNode;
}

/**
 * Clickable card wrapper for the Introduction page.
 * Navigates the parent Storybook window to the target docs path.
 */
export const FoundationCard: React.FC<FoundationCardProps> = ({
  docsPath,
  children,
}) => {
  const handleClick = () => {
    try {
      const top = window.top ?? window;
      top.location.href = `${top.location.pathname}?path=/docs/${docsPath}`;
    } catch {
      window.location.href = `/?path=/docs/${docsPath}`;
    }
  };

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      style={{
        padding: 18,
        borderRadius: 14,
        border: "1px solid var(--color-neutral-200)",
        background: "var(--color-white)",
        boxShadow: "var(--shadow-xs)",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        cursor: "pointer",
        transition: "all 160ms ease",
        color: "inherit",
        textDecoration: "none",
      }}
      className="foundation-card"
    >
      {children}
    </div>
  );
};
