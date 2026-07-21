import type { CSSProperties } from "react";

type LogoColor = "white" | "black" | "accent";

const TINT: Record<LogoColor, string> = {
  white: "var(--anta-white)",
  black: "var(--anta-ink)",
  accent: "var(--anta-pink)",
};

/**
 * Anta brand wordmark. Rendered as a tracked type "logotype" so it stays crisp
 * at any size and inherits the brand ink / white / pink tints.
 *
 * To use the real raster logotype instead, drop the files into
 * `public/assets/` and swap this span for a `next/image`.
 */
export function Logo({
  color = "black",
  height = 24,
  style = {},
}: {
  color?: LogoColor;
  height?: number;
  style?: CSSProperties;
}) {
  return (
    <span
      aria-label="Anta Estudio"
      style={{
        fontFamily: "var(--font-display)",
        fontWeight: 300,
        fontSize: height,
        lineHeight: 1,
        letterSpacing: "0.34em",
        textTransform: "uppercase",
        color: TINT[color],
        display: "inline-block",
        // balance the trailing letter-spacing so the mark reads centered
        paddingLeft: "0.34em",
        ...style,
      }}
    >
      anta
    </span>
  );
}
