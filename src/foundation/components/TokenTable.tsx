import React, { useMemo, useState } from "react";
import { CopyButton } from "./CopyButton";

export type TokenRow = {
  name: string;
  value: string | number;
  cssVar: string;
  preview?: React.ReactNode;
  description?: string;
};

export interface TokenTableProps {
  rows: TokenRow[];
  title?: string;
  searchable?: boolean;
  previewHeader?: string;
  valueHeader?: string;
}

export const TokenTable: React.FC<TokenTableProps> = ({
  rows,
  title,
  searchable = true,
  previewHeader = "Preview",
  valueHeader = "Value",
}) => {
  const [query, setQuery] = useState("");
  const [hovered, setHovered] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.cssVar.toLowerCase().includes(q) ||
        String(r.value).toLowerCase().includes(q)
    );
  }, [rows, query]);

  return (
    <section
      aria-label={title ?? "Token table"}
      style={{ display: "flex", flexDirection: "column", gap: 14 }}
    >
      {(title || searchable) && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          {title && (
            <h3
              style={{
                margin: 0,
                fontSize: 14,
                fontWeight: 600,
                color: "var(--color-neutral-900)",
              }}
            >
              {title}
            </h3>
          )}
          {searchable && (
            <div style={{ position: "relative", width: "100%", maxWidth: 320 }}>
              <span
                aria-hidden
                style={{
                  position: "absolute",
                  left: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--color-neutral-400)",
                  fontSize: 14,
                  lineHeight: 1,
                }}
              >
                ⌕
              </span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tokens"
                style={{
                  width: "100%",
                  fontSize: 13,
                  padding: "8px 12px 8px 32px",
                  borderRadius: 8,
                  border: "1px solid var(--color-neutral-200)",
                  background: "var(--color-white)",
                  outline: "none",
                  fontFamily: "inherit",
                  color: "var(--color-neutral-900)",
                  boxShadow: "var(--shadow-xs)",
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor = "var(--color-ep-400)")
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor =
                    "var(--color-neutral-200)")
                }
              />
            </div>
          )}
        </div>
      )}
      <div
        style={{
          overflow: "auto",
          border: "1px solid var(--color-neutral-200)",
          borderRadius: 12,
          background: "var(--color-white)",
          boxShadow: "var(--shadow-xs)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "separate",
            borderSpacing: 0,
            fontSize: 13,
            color: "var(--color-neutral-900)",
          }}
        >
          <thead>
            <tr style={{ background: "var(--color-neutral-50)", textAlign: "left" }}>
              <th style={th}>{previewHeader}</th>
              <th style={th}>Token</th>
              <th style={th}>{valueHeader}</th>
              <th style={th}>CSS variable</th>
              <th style={{ ...th, width: 1 }} aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => (
              <tr
                key={row.name}
                onMouseEnter={() => setHovered(row.name)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background:
                    hovered === row.name
                      ? "var(--color-ep-25)"
                      : i % 2 === 0
                      ? "var(--color-white)"
                      : "var(--color-neutral-25)",
                  transition: "background 120ms ease",
                }}
              >
                <td style={td}>{row.preview}</td>
                <td style={td}>
                  <code style={codeStyle}>{row.name}</code>
                  {row.description && (
                    <div
                      style={{
                        fontSize: 11,
                        color: "var(--color-neutral-600)",
                        marginTop: 3,
                      }}
                    >
                      {row.description}
                    </div>
                  )}
                </td>
                <td style={td}>
                  <code style={codeStyle}>{row.value}</code>
                </td>
                <td style={td}>
                  <code style={codeStyle}>{row.cssVar}</code>
                </td>
                <td style={{ ...td, textAlign: "right" }}>
                  <CopyButton value={row.cssVar} label="Copy" variant="ghost" />
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  style={{
                    ...td,
                    textAlign: "center",
                    color: "var(--color-neutral-500)",
                    padding: 24,
                  }}
                >
                  No tokens match "{query}".
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

const th: React.CSSProperties = {
  padding: "11px 16px",
  fontWeight: 600,
  fontSize: 11,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "var(--color-neutral-600)",
  borderBottom: "1px solid var(--color-neutral-200)",
  whiteSpace: "nowrap",
};

const td: React.CSSProperties = {
  padding: "12px 16px",
  verticalAlign: "middle",
  borderBottom: "1px solid var(--color-neutral-100)",
};

const codeStyle: React.CSSProperties = {
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
  fontSize: 12,
  color: "var(--color-neutral-800)",
  background: "var(--color-neutral-50)",
  padding: "2px 6px",
  borderRadius: 4,
  border: "1px solid var(--color-neutral-200)",
};
