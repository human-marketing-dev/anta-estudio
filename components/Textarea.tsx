"use client";

import { useState } from "react";
import type { CSSProperties, TextareaHTMLAttributes } from "react";

type TextareaProps = {
  label?: string;
  style?: CSSProperties;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

/** Square multi-line text field, matching Input's underline treatment. */
export function Textarea({ label, id, rows = 4, style = {}, ...rest }: TextareaProps) {
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
      <textarea
        id={id}
        rows={rows}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          fontFamily: "var(--font-text)",
          fontSize: 16,
          color: "var(--anta-ink)",
          lineHeight: 1.5,
          background: "transparent",
          padding: "12px 0",
          borderRadius: 0,
          resize: "vertical",
          border: "none",
          borderBottom: `1px solid ${focus ? "var(--anta-ink)" : "var(--color-border-subtle)"}`,
          outline: "none",
          transition: "border-color var(--dur-fast) var(--ease)",
          ...style,
        }}
        {...rest}
      />
    </div>
  );
}
