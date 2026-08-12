"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import styles from "./HorizontalGallery.module.css";

/**
 * Landscape gallery that scrolls to the right. On desktop the section pins and
 * vertical scroll is translated into horizontal movement (scrub). On mobile /
 * reduced motion it falls back to a native horizontal swipe with scroll-snap.
 */
export function HorizontalGallery({ images, alt }: { images: StaticImageData[]; alt: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const mm = gsap.matchMedia();
      mm.add("(min-width: 861px) and (prefers-reduced-motion: no-preference)", () => {
        // offsetWidth (border-box) includes BOTH paddings; scrollWidth drops the
        // trailing one, which would pull the last image flush to the right edge.
        const distance = () => Math.max(0, track.offsetWidth - window.innerWidth);
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => "+=" + distance(),
            pin: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className={styles.section}>
      <div ref={trackRef} className={styles.track}>
        {images.map((img, i) => (
          <div key={i} className={styles.item}>
            <Image
              src={img}
              alt={`${alt} — fotografía ${i + 1}`}
              fill
              placeholder="blur"
              sizes="(max-width: 860px) 85vw, 62vw"
              className={styles.img}
              priority={i === 0}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
