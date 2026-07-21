import type { CSSProperties, ReactNode } from "react";

/** Tracked uppercase eyebrow label ("Special Title" style), optional pink tick. */
export function SectionLabel({
  children,
  marker = true,
  tone = "ink",
  style = {},
}: {
  children?: ReactNode;
  marker?: boolean;
  tone?: "ink" | "inverse";
  style?: CSSProperties;
}) {
  const color = tone === "inverse" ? "var(--anta-white)" : "var(--anta-ink)";
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 12, ...style }}>
      {marker && <span style={{ width: 24, height: 1, background: "var(--anta-pink)" }} />}
      <span
        style={{
          fontFamily: "var(--font-text)",
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: "2px",
          textTransform: "uppercase",
          color,
          lineHeight: 1,
        }}
      >
        {children}
      </span>
    </span>
  );
}
