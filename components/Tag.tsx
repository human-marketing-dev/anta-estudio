import type { CSSProperties, ReactNode } from "react";

type Tone = "ink" | "accent" | "filled";

/** Small squared category tag / label. */
export function Tag({
  tone = "ink",
  children,
  style = {},
}: {
  tone?: Tone;
  children?: ReactNode;
  style?: CSSProperties;
}) {
  const tones: Record<Tone, CSSProperties> = {
    ink: { background: "transparent", color: "var(--anta-ink)", borderColor: "var(--anta-ink)" },
    accent: { background: "transparent", color: "var(--anta-pink)", borderColor: "var(--anta-pink)" },
    filled: { background: "var(--anta-ink)", color: "var(--anta-white)", borderColor: "var(--anta-ink)" },
  };
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        height: 26,
        padding: "0 12px",
        fontFamily: "var(--font-text)",
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: "0.8px",
        textTransform: "uppercase",
        lineHeight: 1,
        border: "1px solid",
        borderRadius: 0,
        ...tones[tone],
        ...style,
      }}
    >
      {children}
    </span>
  );
}
