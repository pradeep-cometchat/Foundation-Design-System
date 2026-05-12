import { useState, useMemo } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { PageHeader } from "../components/PageHeader";
import { Section } from "../components/Section";
import {
  socialIconsBrand,
  socialIconsGray,
  fileTypeIcons,
  fileTypeSized,
  countryFlags,
  featuredIcons,
  featuredIconsOutline,
  miscIconCategories,
  miscIconRegistry,
  miscIconTotalCount,
  type MiscIconCategory,
  type MiscIconAsset,
} from "../tokens/miscIcons";

const meta: Meta = {
  title: "Foundation/Misc Icons",
  tags: ["!autodocs"],
  parameters: { layout: "fullscreen" },
};
export default meta;

const SIZES = [16, 20, 24, 32, 40, 48] as const;
type IconSize = (typeof SIZES)[number];

export const All: StoryObj = { render: () => <BrowseAll /> };
export const SocialBrand: StoryObj = { name: "Social (Brand)", render: () => <IconGrid title="Social Icons — Brand" items={socialIconsBrand} /> };
export const SocialGray: StoryObj = { name: "Social (Gray)", render: () => <IconGrid title="Social Icons — Gray" items={socialIconsGray} /> };
export const FileTypes: StoryObj = { name: "File Types", render: () => <IconGrid title="File Type Icons" items={fileTypeIcons} /> };
export const FileTypesSized: StoryObj = { name: "File Types (Sized)", render: () => <IconGrid title="File Type — Sized" items={fileTypeSized} /> };
export const Flags: StoryObj = { name: "Country Flags", render: () => <IconGrid title="Country Flags" items={countryFlags} isFlag /> };
export const Featured: StoryObj = { name: "Featured Icons", render: () => <FeaturedGrid title="Featured Icons (Filled)" items={featuredIcons} /> };
export const FeaturedOutline: StoryObj = { name: "Featured Icons (Outline)", render: () => <FeaturedGrid title="Featured Icons (Outline)" items={featuredIconsOutline} /> };

/* ─── Size Selector ────────────────────────────────────────────────────────── */

function SizeBar({ size, onChange }: { size: IconSize; onChange: (s: IconSize) => void }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: 14, border: "1px solid var(--color-neutral-200)", borderRadius: 12, background: "var(--color-white)", boxShadow: "var(--shadow-xs)", marginBottom: 20 }}>
      <span style={{ fontSize: 12, fontWeight: 600, color: "var(--color-neutral-600)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Size</span>
      <div style={{ display: "inline-flex", padding: 3, borderRadius: 8, background: "var(--color-neutral-100)", gap: 2 }}>
        {SIZES.map((s) => (
          <button key={s} type="button" onClick={() => onChange(s)} style={{ padding: "4px 10px", fontSize: 12, fontWeight: 600, borderRadius: 6, border: "none", background: s === size ? "var(--color-white)" : "transparent", color: s === size ? "var(--color-neutral-900)" : "var(--color-neutral-600)", cursor: "pointer", fontFamily: "inherit", boxShadow: s === size ? "var(--shadow-xs)" : "none" }}>{s}</button>
        ))}
      </div>
      <span style={{ fontSize: 11, color: "var(--color-neutral-500)" }}>{size}px</span>
    </div>
  );
}

/* ─── Browse All ───────────────────────────────────────────────────────────── */

function BrowseAll() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<MiscIconCategory | "All">("All");
  const [size, setSize] = useState<IconSize>(24);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const cats = category === "All" ? miscIconCategories : [category];
    return cats.map((c) => ({ category: c, items: q ? miscIconRegistry[c].filter((i) => i.name.toLowerCase().includes(q)) : miscIconRegistry[c] })).filter((g) => g.items.length > 0);
  }, [query, category]);

  const totalShown = filtered.reduce((n, g) => n + g.items.length, 0);

  return (
    <div style={{ padding: 32, maxWidth: 1200, margin: "0 auto" }}>
      <PageHeader title="Miscellaneous Icons" description="All icons exported as SVG. Adjust size and click any tile to copy SVG code." meta={[{ label: "total", value: String(miscIconTotalCount) }]} />
      <SizeBar size={size} onChange={setSize} />
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 20, alignItems: "center" }}>
        <div style={{ position: "relative", flex: "1 1 260px", minWidth: 220 }}>
          <span aria-hidden style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--color-neutral-400)", fontSize: 14 }}>⌕</span>
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search icons" style={{ width: "100%", fontSize: 13, padding: "8px 12px 8px 32px", borderRadius: 8, border: "1px solid var(--color-neutral-200)", background: "var(--color-white)", outline: "none", fontFamily: "inherit", color: "var(--color-neutral-900)" }} />
        </div>
        <select value={category} onChange={(e) => setCategory(e.target.value as any)} style={{ fontSize: 13, padding: "8px 12px", borderRadius: 8, border: "1px solid var(--color-neutral-200)", background: "var(--color-white)", color: "var(--color-neutral-900)", fontFamily: "inherit", cursor: "pointer" }}>
          <option value="All">All categories</option>
          {miscIconCategories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <span style={{ fontSize: 12, color: "var(--color-neutral-600)", marginLeft: "auto" }}>{totalShown} icons</span>
      </div>
      {filtered.map(({ category: cat, items }) => (
        <Section key={cat} title={cat} description={`${items.length} icons`}>
          <TileGrid items={items} size={size} isFlag={cat === "Country Flags"} />
        </Section>
      ))}
    </div>
  );
}

/* ─── Icon Grid ────────────────────────────────────────────────────────────── */

function IconGrid({ title, items, isFlag }: { title: string; items: MiscIconAsset[]; isFlag?: boolean }) {
  const [size, setSize] = useState<IconSize>(24);
  return (
    <div style={{ padding: 32, maxWidth: 1200, margin: "0 auto" }}>
      <PageHeader title={title} description={`${items.length} SVG icons. Click any tile to copy SVG code.`} meta={[{ label: "icons", value: String(items.length) }]} />
      <SizeBar size={size} onChange={setSize} />
      <TileGrid items={items} size={size} isFlag={isFlag} />
    </div>
  );
}

/* ─── Featured Grid (grouped by size) ─────────────────────────────────────── */

function FeaturedGrid({ title, items }: { title: string; items: MiscIconAsset[] }) {
  const [size, setSize] = useState<IconSize>(32);
  const sizeOrder = ["sm", "md", "lg", "xl"];
  const grouped = sizeOrder.map((sz) => ({ size: sz, items: items.filter((i) => i.size === sz) })).filter((g) => g.items.length > 0);
  const sizeLabels: Record<string, string> = { sm: "Small (sm)", md: "Medium (md)", lg: "Large (lg)", xl: "Extra Large (xl)" };

  return (
    <div style={{ padding: 32, maxWidth: 1200, margin: "0 auto" }}>
      <PageHeader title={title} description={`${items.length} SVG icons grouped by size.`} meta={[{ label: "icons", value: String(items.length) }]} />
      <SizeBar size={size} onChange={setSize} />
      {grouped.map(({ size: sz, items: sizeItems }) => (
        <Section key={sz} title={sizeLabels[sz] ?? sz} description={`${sizeItems.length} icons`}>
          <TileGrid items={sizeItems} size={size} />
        </Section>
      ))}
    </div>
  );
}

/* ─── Tile Grid ────────────────────────────────────────────────────────────── */

function TileGrid({ items, size, isFlag }: { items: MiscIconAsset[]; size: IconSize; isFlag?: boolean }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(auto-fill, minmax(${Math.max(size + 60, 140)}px, 1fr))`, gap: 10 }}>
      {items.map((item) => <IconTile key={item.name} item={item} size={size} isFlag={isFlag} />)}
    </div>
  );
}

/* ─── Icon Tile ────────────────────────────────────────────────────────────── */

function IconTile({ item, size, isFlag }: { item: MiscIconAsset; size: IconSize; isFlag?: boolean }) {
  const [copied, setCopied] = useState(false);
  const [copying, setCopying] = useState(false);

  const copy = async () => {
    try {
      setCopying(true);
      const resp = await fetch(item.svgUrl);
      const svgText = await resp.text();
      await navigator.clipboard.writeText(svgText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      try { await navigator.clipboard.writeText(item.svgUrl); setCopied(true); setTimeout(() => setCopied(false), 1200); } catch {}
    } finally { setCopying(false); }
  };

  const w = isFlag ? size * 1.4 : size;
  const h = size;

  return (
    <div style={{ display: "flex", flexDirection: "column", borderRadius: 10, border: `1px solid ${copied ? "var(--color-success-300)" : "var(--color-neutral-200)"}`, background: copied ? "var(--color-success-50)" : "var(--color-white)", overflow: "hidden", boxShadow: "var(--shadow-xs)", transition: "all 120ms ease" }}>
      <button type="button" onClick={copy} title={`Copy SVG for ${item.name}`} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: 12, cursor: "pointer", fontFamily: "inherit", border: "none", background: "transparent" }}>
        <div style={{ width: w, height: h, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img src={item.svgUrl} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} loading="lazy" />
        </div>
        <span style={{ fontSize: 10, fontFamily: "var(--sb-font-mono)", color: copied ? "var(--color-success-700)" : "var(--color-neutral-600)", maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", textAlign: "center" }}>
          {item.name}
        </span>
      </button>
      <div style={{ borderTop: "1px solid var(--color-neutral-100)", padding: "6px 10px", display: "flex", justifyContent: "center" }}>
        <button type="button" onClick={copy} style={{ fontSize: 11, fontWeight: 600, color: copied ? "var(--color-success-700)" : "var(--color-ep-700)", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", padding: "2px 8px", borderRadius: 4 }}>
          {copied ? "✓ Copied" : copying ? "..." : "Copy SVG"}
        </button>
      </div>
    </div>
  );
}
