"use client";

import { useState } from "react";
import type { CSSProperties, InputHTMLAttributes } from "react";

type InputProps = {
  label?: string;
  error?: string;
  style?: CSSProperties;
} & InputHTMLAttributes<HTMLInputElement>;

/** Square text input with a bottom-focus pink underline. */
export function Input({ label, id, error, style = {}, ...rest }: InputProps) {
  const [focus, setFocus] = useState(false);
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
            color: "var(--anta-ink)",
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
          color: "var(--anta-ink)",
          background: "transparent",
          padding: "12px 0",
          borderRadius: 0,
          border: "none",
          borderBottom: `1px solid ${
            error ? "var(--anta-pink)" : focus ? "var(--anta-ink)" : "var(--color-border-subtle)"
          }`,
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
