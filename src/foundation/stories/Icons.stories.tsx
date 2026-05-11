import { useMemo, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { PageHeader } from "../components/PageHeader";
import { Section } from "../components/Section";
import { Callout } from "../components/Callout";
import { CopyButton } from "../components/CopyButton";
import { Icon } from "../components/Icon";
import {
  iconRegistry,
  iconCategories,
  iconCount,
  iconVariants,
  iconVariantLabel,
  type IconCategory,
  type IconVariant,
} from "../tokens/icons";

/**
 * **Material Symbols** — Google's modern icon font, served as a single
 * variable font. Every icon can be tuned along four axes (fill, weight,
 * grade, optical size) and rendered in three style variants (Outlined,
 * Rounded, Sharp).
 *
 * Use the `<Icon />` component (typed props + ligature name) or apply the
 * `.icon-outlined` / `.icon-rounded` / `.icon-sharp` CSS classes. Any icon
 * name from fonts.google.com/icons will work — the Browse page shows a
 * curated selection for quick reference.
 */
const meta: Meta<typeof IconPlayground> = {
  title: "Foundation/Icons",
  component: IconPlayground,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  argTypes: {
    name: {
      control: "text",
      description:
        "Ligature name of the icon (e.g. `home`, `settings`, `arrow_back`).",
      table: { category: "Token" },
    },
    variant: {
      control: "select",
      options: iconVariants,
      description: "Visual style variant.",
      table: { category: "Token" },
    },
    size: {
      control: { type: "range", min: 16, max: 96, step: 4 },
      description: "Font-size in pixels.",
      table: { category: "Size" },
    },
    weight: {
      control: { type: "select" },
      options: [100, 200, 300, 400, 500, 600, 700],
      description: "Stroke weight (100 = thin, 700 = heavy).",
      table: { category: "Axes" },
    },
    fill: {
      control: "radio",
      options: [0, 1],
      description: "0 = outlined, 1 = filled.",
      table: { category: "Axes" },
    },
    grade: {
      control: { type: "range", min: -25, max: 200, step: 25 },
      description:
        "Grade adds subtle weight without changing the overall size.",
      table: { category: "Axes" },
    },
    opticalSize: {
      control: { type: "range", min: 20, max: 48, step: 4 },
      description: "Optical size. Should match `size` for best rendering.",
      table: { category: "Axes" },
    },
    color: {
      control: "color",
      description: "Icon color.",
      table: { category: "Style" },
    },
  },
};
export default meta;

interface PlaygroundProps {
  name: string;
  variant: IconVariant;
  size: number;
  weight: number;
  fill: 0 | 1;
  grade: number;
  opticalSize: number;
  color: string;
}

function IconPlayground(props: PlaygroundProps) {
  const jsxSnippet = `<Icon\n  name="${props.name}"\n  variant="${props.variant}"\n  size={${props.size}}\n  weight={${props.weight}}\n  fill={${props.fill}}\n  grade={${props.grade}}\n  opticalSize={${props.opticalSize}}\n/>`;

  const cssSnippet = `<span class="icon-${props.variant}" style="--icon-fill:${props.fill}; --icon-wght:${props.weight}; --icon-grad:${props.grade}; --icon-opsz:${props.opticalSize}; font-size:${props.size}px">
  ${props.name}
</span>`;

  return (
    <div style={{ padding: 32, maxWidth: 1200, margin: "0 auto" }}>
      <div
        style={{
          border: "1px solid var(--color-neutral-200)",
          borderRadius: 16,
          overflow: "hidden",
          background: "var(--color-white)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <div
          aria-label={`${props.name} preview`}
          style={{
            padding: 56,
            background:
              "repeating-linear-gradient(45deg, var(--color-neutral-25) 0 8px, var(--color-neutral-50) 8px 16px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 220,
          }}
        >
          <Icon {...props} />
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            borderTop: "1px solid var(--color-neutral-200)",
            background: "var(--color-neutral-25)",
          }}
        >
          <Stat label="Name" value={props.name} mono />
          <Stat
            label="Variant"
            value={iconVariantLabel[props.variant]}
            divider
          />
          <Stat label="Size" value={`${props.size}px`} mono divider />
          <Stat label="Weight" value={String(props.weight)} mono divider />
          <Stat
            label="Fill"
            value={props.fill === 1 ? "filled" : "outlined"}
            divider
          />
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 16,
          marginTop: 20,
        }}
      >
        <CodeCard language="TSX" code={jsxSnippet} />
        <CodeCard language="CSS" code={cssSnippet} />
      </div>
    </div>
  );
}

const Stat: React.FC<{
  label: string;
  value: string;
  mono?: boolean;
  divider?: boolean;
}> = ({ label, value, mono, divider }) => (
  <div
    style={{
      padding: "14px 16px",
      borderLeft: divider ? "1px solid var(--color-neutral-200)" : "none",
    }}
  >
    <div
      style={{
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        color: "var(--color-neutral-500)",
        marginBottom: 4,
      }}
    >
      {label}
    </div>
    <div
      style={{
        fontFamily: mono ? "var(--sb-font-mono)" : "inherit",
        fontSize: 13,
        fontWeight: 600,
        color: "var(--color-neutral-900)",
        wordBreak: "break-all",
      }}
    >
      {value}
    </div>
  </div>
);

const CodeCard: React.FC<{ language: string; code: string }> = ({
  language,
  code,
}) => (
  <div
    style={{
      border: "1px solid var(--color-neutral-200)",
      borderRadius: 12,
      overflow: "hidden",
      background: "var(--color-neutral-25)",
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
        {language}
      </span>
      <CopyButton value={code} label="Copy" variant="ghost" />
    </div>
    <pre
      style={{
        margin: 0,
        padding: 14,
        fontFamily: "var(--sb-font-mono)",
        fontSize: 12.5,
        lineHeight: 1.6,
        color: "var(--color-neutral-800)",
        overflowX: "auto",
      }}
    >
      <code>{code}</code>
    </pre>
  </div>
);

export const Playground: StoryObj<typeof IconPlayground> = {
  args: {
    name: "favorite",
    variant: "outlined",
    size: 64,
    weight: 400,
    fill: 0,
    grade: 0,
    opticalSize: 48,
    color: "var(--color-ep-700)",
  },
  parameters: { docs: { disable: true } },
};

// Shared state key for the Browse page query.
function useIconSearch() {
  const [query, setQuery] = useState("");
  const [variant, setVariant] = useState<IconVariant>("outlined");
  const [fill, setFill] = useState<0 | 1>(0);
  const [category, setCategory] = useState<IconCategory | "All">("All");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const source =
      category === "All"
        ? iconCategories.map((c) => ({ category: c, icons: iconRegistry[c] }))
        : [{ category, icons: iconRegistry[category] }];

    return source
      .map(({ category: cat, icons }) => ({
        category: cat,
        icons: q ? icons.filter((n) => n.toLowerCase().includes(q)) : icons,
      }))
      .filter((g) => g.icons.length > 0);
  }, [query, category]);

  return {
    query,
    setQuery,
    variant,
    setVariant,
    fill,
    setFill,
    category,
    setCategory,
    results,
  };
}

/** Searchable, categorized browser of the icon registry. */
export const Browse: StoryObj = {
  parameters: {
    controls: { disable: true },
    layout: "fullscreen",
    docs: { disable: true },
  },
  render: () => <BrowseView />,
};

function BrowseView() {
  const {
    query,
    setQuery,
    variant,
    setVariant,
    fill,
    setFill,
    category,
    setCategory,
    results,
  } = useIconSearch();

  const totalShown = results.reduce((n, g) => n + g.icons.length, 0);

  return (
    <div style={{ padding: 32, maxWidth: 1200, margin: "0 auto" }}>
      <PageHeader
        title="Icon library"
        description="Browse a curated set of Material Symbols. Click any icon to copy its ligature name. The full catalog (~3,000 icons) is available at fonts.google.com/icons — any name from there will render correctly."
        meta={[
          { label: "curated", value: String(iconCount) },
          { label: "variants", value: "3" },
          { label: "axes", value: "4" },
        ]}
      />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          marginBottom: 20,
          padding: 14,
          border: "1px solid var(--color-neutral-200)",
          borderRadius: 12,
          background: "var(--color-white)",
          boxShadow: "var(--shadow-xs)",
          alignItems: "center",
        }}
      >
        <div style={{ position: "relative", flex: "1 1 260px", minWidth: 220 }}>
          <span
            aria-hidden
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--color-neutral-400)",
            }}
          >
            ⌕
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search icons"
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
            }}
          />
        </div>

        <SegmentedControl<IconVariant>
          value={variant}
          onChange={setVariant}
          options={iconVariants.map((v) => ({
            value: v,
            label: iconVariantLabel[v],
          }))}
        />

        <SegmentedControl<0 | 1>
          value={fill}
          onChange={setFill}
          options={[
            { value: 0, label: "Outlined" },
            { value: 1, label: "Filled" },
          ]}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as IconCategory | "All")}
          style={{
            fontSize: 13,
            padding: "8px 12px",
            borderRadius: 8,
            border: "1px solid var(--color-neutral-200)",
            background: "var(--color-white)",
            color: "var(--color-neutral-900)",
            fontFamily: "inherit",
            cursor: "pointer",
          }}
        >
          <option value="All">All categories</option>
          {iconCategories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <span
          style={{
            fontSize: 12,
            color: "var(--color-neutral-600)",
            marginLeft: "auto",
          }}
        >
          {totalShown} icon{totalShown === 1 ? "" : "s"}
        </span>
      </div>

      {results.length === 0 ? (
        <div
          style={{
            padding: 40,
            textAlign: "center",
            color: "var(--color-neutral-500)",
            border: "1px solid var(--color-neutral-200)",
            borderRadius: 12,
            background: "var(--color-neutral-25)",
          }}
        >
          No icons match "{query}".
        </div>
      ) : (
        results.map(({ category: cat, icons }) => (
          <Section
            key={cat}
            title={cat}
            description={`${icons.length} icon${icons.length === 1 ? "" : "s"}`}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(120px, 1fr))",
                gap: 10,
              }}
            >
              {icons.map((name) => (
                <IconTile
                  key={name}
                  name={name}
                  variant={variant}
                  fill={fill}
                />
              ))}
            </div>
          </Section>
        ))
      )}
    </div>
  );
}

const IconTile: React.FC<{
  name: string;
  variant: IconVariant;
  fill?: 0 | 1;
}> = ({ name, variant, fill = 0 }) => {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(name);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    } catch {
      /* ignore */
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`Copy icon name ${name}`}
      title={name}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        padding: "14px 8px",
        borderRadius: 10,
        border: `1px solid ${
          copied
            ? "var(--color-success-300)"
            : hovered
            ? "var(--color-ep-300)"
            : "var(--color-neutral-200)"
        }`,
        background: copied
          ? "var(--color-success-50)"
          : hovered
          ? "var(--color-ep-25)"
          : "var(--color-white)",
        cursor: "pointer",
        fontFamily: "inherit",
        transition: "all 120ms ease",
        boxShadow: hovered ? "var(--shadow-sm)" : "var(--shadow-xs)",
      }}
    >
      <Icon
        name={name}
        variant={variant}
        fill={fill}
        size={28}
        opticalSize={24}
        color={
          copied ? "var(--color-success-700)" : "var(--color-neutral-800)"
        }
      />
      <span
        style={{
          fontSize: 11,
          fontFamily: "var(--sb-font-mono)",
          color: copied
            ? "var(--color-success-700)"
            : "var(--color-neutral-600)",
          maxWidth: "100%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {copied ? "copied" : name}
      </span>
    </button>
  );
};

function SegmentedControl<T extends string | number>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: Array<{ value: T; label: string }>;
}) {
  return (
    <div
      role="tablist"
      style={{
        display: "inline-flex",
        padding: 3,
        borderRadius: 8,
        background: "var(--color-neutral-100)",
        gap: 2,
      }}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={String(opt.value)}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.value)}
            type="button"
            style={{
              padding: "5px 12px",
              fontSize: 12,
              fontWeight: 600,
              borderRadius: 6,
              border: "none",
              background: active ? "var(--color-white)" : "transparent",
              color: active
                ? "var(--color-neutral-900)"
                : "var(--color-neutral-600)",
              cursor: "pointer",
              fontFamily: "inherit",
              boxShadow: active ? "var(--shadow-xs)" : "none",
              transition: "all 120ms ease",
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

/** Side-by-side comparison of the three style variants. */
export const Variants: StoryObj = {
  parameters: { controls: { disable: true }, layout: "fullscreen" },
  render: () => (
    <div style={{ padding: 32, maxWidth: 1200, margin: "0 auto" }}>
      <PageHeader
        title="Style variants"
        description="Three sibling fonts share every ligature name — only the geometry differs. Pick one variant for your product and stick to it."
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
          marginBottom: 32,
        }}
      >
        {iconVariants.map((v) => (
          <div
            key={v}
            style={{
              padding: 24,
              borderRadius: 12,
              border: "1px solid var(--color-neutral-200)",
              background: "var(--color-white)",
              boxShadow: "var(--shadow-xs)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 14,
            }}
          >
            <Icon name="favorite" variant={v} size={72} opticalSize={48} />
            <strong
              style={{ fontSize: 14, color: "var(--color-neutral-900)" }}
            >
              {iconVariantLabel[v]}
            </strong>
            <span
              style={{
                fontSize: 11,
                fontFamily: "var(--sb-font-mono)",
                color: "var(--color-neutral-600)",
              }}
            >
              .icon-{v}
            </span>
          </div>
        ))}
      </div>

      <Section
        title="Outlined vs filled"
        description="Every variant supports both outlined and filled states via the FILL axis. Use filled for selected or active states, outlined for default."
      >
        <div
          style={{
            border: "1px solid var(--color-neutral-200)",
            borderRadius: 12,
            overflow: "hidden",
            background: "var(--color-white)",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "separate",
              borderSpacing: 0,
              fontSize: 13,
            }}
          >
            <thead>
              <tr style={{ background: "var(--color-neutral-50)" }}>
                <th style={th}>Name</th>
                {iconVariants.map((v) => (
                  <th key={`${v}-o`} style={th}>
                    {iconVariantLabel[v]} · outlined
                  </th>
                ))}
                {iconVariants.map((v) => (
                  <th key={`${v}-f`} style={th}>
                    {iconVariantLabel[v]} · filled
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                "home",
                "settings",
                "favorite",
                "delete",
                "notifications",
                "search",
                "cloud_upload",
                "visibility",
                "lock",
                "shopping_cart",
              ].map((name, i) => (
                <tr
                  key={name}
                  style={{
                    background:
                      i % 2 === 0
                        ? "var(--color-white)"
                        : "var(--color-neutral-25)",
                  }}
                >
                  <td style={td}>
                    <code
                      style={{
                        fontFamily: "var(--sb-font-mono)",
                        fontSize: 12,
                        padding: "3px 7px",
                        borderRadius: 4,
                        background: "var(--color-neutral-50)",
                        border: "1px solid var(--color-neutral-200)",
                      }}
                    >
                      {name}
                    </code>
                  </td>
                  {iconVariants.map((v) => (
                    <td key={`${v}-o`} style={td}>
                      <Icon name={name} variant={v} size={24} fill={0} />
                    </td>
                  ))}
                  {iconVariants.map((v) => (
                    <td key={`${v}-f`} style={td}>
                      <Icon name={name} variant={v} size={24} fill={1} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  ),
};

/** Axis reference — weight, fill, grade, optical size. */
export const Axes: StoryObj = {
  parameters: { controls: { disable: true }, layout: "fullscreen" },
  render: () => (
    <div style={{ padding: 32, maxWidth: 1200, margin: "0 auto" }}>
      <PageHeader
        title="Variable axes"
        description="Material Symbols ship as a single variable font with four live axes. Tune them with font-variation-settings or the Icon component props."
      />

      <Section
        title="Weight"
        description="Stroke thickness. 100 is thinnest, 700 is heaviest. Default is 400."
      >
        <AxisRow values={[100, 200, 300, 400, 500, 600, 700]} axis="wght" />
      </Section>

      <Section
        title="Fill"
        description="0 is outlined, 1 is filled. Use filled icons for emphasis or selected states; outlined for neutral or default states."
      >
        <AxisRow values={[0, 1]} axis="FILL" />
      </Section>

      <Section
        title="Grade"
        description="Adjusts stroke thickness without changing overall size. Useful for low-contrast surfaces (dark mode can benefit from a lower grade)."
      >
        <AxisRow
          values={[-25, 0, 100, 200]}
          axis="GRAD"
          labelFormat={(v) => (v > 0 ? `+${v}` : String(v))}
        />
      </Section>

      <Section
        title="Optical size"
        description="Optimizes the icon's geometry for its rendered size. Match `opsz` to your `font-size` for best results."
      >
        <AxisRow
          values={[20, 24, 40, 48]}
          axis="opsz"
          size={40}
          labelFormat={(v) => `${v}px`}
        />
      </Section>
    </div>
  ),
};

const AxisRow: React.FC<{
  values: number[];
  axis: "wght" | "FILL" | "GRAD" | "opsz";
  size?: number;
  labelFormat?: (v: number) => string;
}> = ({ values, axis, size = 48, labelFormat }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: `repeat(${values.length}, 1fr)`,
      gap: 10,
    }}
  >
    {values.map((v) => (
      <div
        key={v}
        style={{
          padding: "20px 10px 14px",
          borderRadius: 10,
          border: "1px solid var(--color-neutral-200)",
          background: "var(--color-white)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          boxShadow: "var(--shadow-xs)",
        }}
      >
        <Icon
          name="favorite"
          size={size}
          opticalSize={axis === "opsz" ? v : 48}
          weight={axis === "wght" ? v : 400}
          fill={axis === "FILL" ? (v as 0 | 1) : 0}
          grade={axis === "GRAD" ? v : 0}
        />
        <span
          style={{
            fontSize: 11,
            fontFamily: "var(--sb-font-mono)",
            color: "var(--color-neutral-600)",
          }}
        >
          {labelFormat ? labelFormat(v) : v}
        </span>
      </div>
    ))}
  </div>
);

/** Implementation guide. */
export const Usage: StoryObj = {
  parameters: { controls: { disable: true }, layout: "fullscreen" },
  render: () => (
    <div style={{ padding: 32, maxWidth: 1200, margin: "0 auto" }}>
      <PageHeader
        title="Using icons"
        description="Two ways to render an icon: the typed React component, or the CSS utility class."
      />

      <Callout kind="info" title="Font delivery">
        The three style variants (Outlined, Rounded, Sharp) are loaded from
        Google Fonts as a single <code>&lt;link&gt;</code> in Storybook's
        preview head. In your app, include the same stylesheet, or self-host
        the variable font files for offline support.
      </Callout>
      <div style={{ height: 24 }} />

      <Section title="React component">
        <CodeCard
          language="TSX"
          code={`import { Icon } from "@foundation/components/Icon";

<Icon name="home" />
<Icon name="favorite" variant="rounded" fill={1} color="var(--color-error-500)" />
<Icon name="settings" size={32} weight={500} opticalSize={24} />`}
        />
      </Section>

      <Section title="CSS utility class">
        <CodeCard
          language="HTML"
          code={`<span class="icon-outlined">home</span>

<span
  class="icon-rounded"
  style="--icon-fill: 1; --icon-wght: 500; font-size: 32px"
>
  favorite
</span>`}
        />
      </Section>

      <Section title="Accessibility">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 16,
          }}
        >
          <Callout kind="success" title="Meaningful icons">
            Pass an <code>ariaLabel</code> describing the action. The Icon
            component sets <code>role="img"</code> and the label automatically.
          </Callout>
          <Callout kind="success" title="Decorative icons">
            When the icon sits next to a visible label (e.g. a button with
            text), pass <code>ariaLabel=""</code>. The component renders{" "}
            <code>aria-hidden</code> so screen readers skip it.
          </Callout>
          <Callout kind="warning" title="Don't use emoji as icons">
            Material Symbols are vector, weight-tunable, and theme-aware.
            Emoji aren't — they render inconsistently across platforms.
          </Callout>
          <Callout kind="warning" title="Match optical size">
            Set <code>opticalSize</code> close to the rendered <code>size</code>
            . Mismatched values make strokes look too thin or too thick.
          </Callout>
        </div>
      </Section>
    </div>
  ),
};

const th: React.CSSProperties = {
  padding: "11px 16px",
  fontWeight: 600,
  fontSize: 11,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "var(--color-neutral-600)",
  borderBottom: "1px solid var(--color-neutral-200)",
  textAlign: "left",
};

const td: React.CSSProperties = {
  padding: "12px 16px",
  verticalAlign: "middle",
  borderBottom: "1px solid var(--color-neutral-100)",
};
