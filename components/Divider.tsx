import type { CSSProperties } from "react";

type Tone = "subtle" | "strong" | "accent";

/** Hairline rule. Horizontal by default. */
export function Divider({
  orientation = "horizontal",
  tone = "subtle",
  style = {},
}: {
  orientation?: "horizontal" | "vertical";
  tone?: Tone;
  style?: CSSProperties;
}) {
  const color =
    tone === "strong"
      ? "var(--anta-ink)"
      : tone === "accent"
        ? "var(--anta-pink)"
        : "var(--color-border-subtle)";
  const s: CSSProperties =
    orientation === "vertical"
      ? { width: 1, alignSelf: "stretch", background: color }
      : { height: 1, width: "100%", background: color, border: "none" };
  return <div role="separator" style={{ ...s, ...style }} />;
}
