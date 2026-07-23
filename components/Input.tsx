"use client";

import { useState } from "react";
import type { CSSProperties, InputHTMLAttributes } from "react";

type InputProps = {
  label?: string;
  error?: string;
  /** "ink" inverts the colors for dark sections. */
  tone?: "light" | "ink";
  style?: CSSProperties;
} & InputHTMLAttributes<HTMLInputElement>;

/** Square text input with a bottom-focus underline. */
export function Input({ label, id, error, tone = "light", style = {}, ...rest }: InputProps) {
  const [focus, setFocus] = useState(false);
  const inverse = tone === "ink";
  const fg = inverse ? "var(--anta-white)" : "var(--anta-ink)";
  const idle = inverse ? "rgba(255,255,255,0.25)" : "var(--color-border-subtle)";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
      {label && (
        <label
          htmlFor={id}
          style={{
            fontFamily: "var(--font-text)",
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.5px",
            color: fg,
          }}
        >
          {label}
        </label>
      )}
      <input
        id={id}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          fontFamily: "var(--font-text)",
          fontSize: 16,
          color: fg,
          background: "transparent",
          padding: "12px 0",
          borderRadius: 0,
          border: "none",
          borderBottom: `1px solid ${error ? "var(--anta-pink)" : focus ? fg : idle}`,
          outline: "none",
          transition: "border-color var(--dur-fast) var(--ease)",
          ...style,
        }}
        {...rest}
      />
      {error && (
        <span style={{ fontFamily: "var(--font-text)", fontSize: 12, color: "var(--anta-pink)" }}>
          {error}
        </span>
      )}
    </div>
  );
}
