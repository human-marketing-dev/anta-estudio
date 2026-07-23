"use client";

import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";

type Variant = "solid" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  as?: "button" | "a";
  href?: string;
  disabled?: boolean;
  children?: ReactNode;
  style?: CSSProperties;
} & Record<string, unknown>;

/**
 * Anta Estudio primary action. Square, flat, monochrome with a pink press.
 */
export function Button({
  variant = "solid",
  size = "md",
  as = "button",
  href,
  disabled = false,
  children,
  style = {},
  ...rest
}: ButtonProps) {
  const pad = size === "sm" ? "10px 20px" : size === "lg" ? "18px 40px" : "14px 30px";
  const fontSize = size === "sm" ? 13 : 14;

  const base: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    fontFamily: "var(--font-text)",
    fontSize,
    fontWeight: 600,
    letterSpacing: "0.5px",
    textTransform: "uppercase",
    lineHeight: 1,
    padding: pad,
    border: "1px solid var(--anta-ink)",
    borderRadius: 0,
    cursor: disabled ? "not-allowed" : "pointer",
    textDecoration: "none",
    transition:
      "background var(--dur-fast) var(--ease), color var(--dur-fast) var(--ease), border-color var(--dur-fast) var(--ease)",
    opacity: disabled ? 0.4 : 1,
    boxSizing: "border-box",
    WebkitFontSmoothing: "antialiased",
  };

  const variants: Record<Variant, CSSProperties> = {
    solid: {
      background: "var(--anta-pink)",
      color: "var(--anta-white)",
      borderColor: "var(--anta-pink)",
    },
    outline: {
      background: "transparent",
      color: "var(--anta-ink)",
      borderColor: "var(--anta-ink)",
    },
    ghost: {
      background: "transparent",
      color: "var(--anta-ink)",
      borderColor: "transparent",
      padding: size === "sm" ? "10px 8px" : "14px 10px",
    },
  };

  const [hover, setHover] = useState(false);
  const hoverStyle: CSSProperties =
    !disabled && hover
      ? variant === "solid"
        ? { background: "var(--anta-ink)", borderColor: "var(--anta-ink)" }
        : variant === "outline"
          ? { background: "var(--anta-ink)", color: "var(--anta-white)" }
          : { color: "var(--anta-pink)" }
      : {};

  const Tag = as === "a" || href ? "a" : "button";
  return (
    <Tag
      href={href}
      disabled={Tag === "button" ? disabled : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ ...base, ...variants[variant], ...hoverStyle, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
