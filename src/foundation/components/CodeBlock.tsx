import React from "react";
import { CopyButton } from "./CopyButton";

export interface CodeBlockProps {
  code: string;
  language?: string;
  /** Label shown in the top-right. Defaults to the language. */
  label?: string;
}

/**
 * Formatted code block with a copy button and language badge.
 */
export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = "css",
  label,
}) => {
  return (
    <div
      style={{
        position: "relative",
        borderRadius: 10,
        border: "1px solid var(--color-neutral-200)",
        background: "var(--color-neutral-25)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px 12px",
          borderBottom: "1px solid var(--color-neutral-200)",
          background: "var(--color-neutral-50)",
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "var(--color-neutral-600)",
          }}
        >
          {label ?? language}
        </span>
        <CopyButton value={code} label="Copy" />
      </div>
      <pre
        style={{
          margin: 0,
          padding: 14,
          overflowX: "auto",
          fontFamily:
            "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
          fontSize: 12.5,
          lineHeight: 1.6,
          color: "var(--color-neutral-800)",
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
};
