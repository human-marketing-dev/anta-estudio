import Image from "next/image";
import type { CSSProperties } from "react";
import antaLogo from "@/public/anta-logo.webp";

type LogoColor = "white" | "black" | "accent";

// The asset is a white wordmark. Recolor with a filter for light backgrounds.
const FILTER: Record<LogoColor, string> = {
  white: "none",
  black: "brightness(0)",
  accent: "none",
};

const RATIO = 350 / 100;

/** Anta brand wordmark (raster). `color` tints it for light / dark backgrounds. */
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
    <Image
      src={antaLogo}
      alt="Anta Estudio"
      height={height}
      width={Math.round(height * RATIO)}
      priority
      style={{ display: "block", filter: FILTER[color], ...style }}
    />
  );
}
