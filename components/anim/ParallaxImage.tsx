"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import styles from "./ParallaxImage.module.css";

/**
 * Image that drifts vertically as it scrolls through the viewport (contained
 * parallax). The inner image is taller than the frame; travel derives from the
 * measured overflow. Reduced motion / no-JS render it static.
 */
export function ParallaxImage({
  src,
  alt,
  className,
  sizes = "100vw",
  priority = false,
}: {
  src: StaticImageData | string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const inner = innerRef.current;
      if (!root || !inner) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const half = () => {
          const overflow = inner.offsetHeight - root.offsetHeight;
          return overflow > 0 ? (overflow / 2 / inner.offsetHeight) * 100 : 0;
        };
        gsap.fromTo(
          inner,
          { yPercent: () => -half() },
          {
            yPercent: () => half(),
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );
      });
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className={[styles.frame, className].filter(Boolean).join(" ")}>
      <div ref={innerRef} className={styles.inner}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          placeholder={typeof src === "string" ? "empty" : "blur"}
          style={{ objectFit: "cover" }}
        />
      </div>
    </div>
  );
}
