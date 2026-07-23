"use client";

import { getImageProps } from "next/image";
import type { StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, ScrollTrigger, EASE, DUR } from "@/lib/gsap";
import { splitIntoLines, lineRevealVars, LINE_FROM } from "@/lib/animation/lineReveal";
import { Button } from "@/components/Button";
import { WhatsAppIcon } from "@/components/site";
import styles from "./Hero.module.css";

interface HeroImage {
  src: StaticImageData;
  alt: string;
}

export interface HeroProps {
  /** Wide panoramic image (desktop). */
  image: HeroImage;
  /** Portrait crop used on the mobile breakpoint (art direction). */
  mobileImage: HeroImage;
  /** Small text over the H1 (not a heading). Default "Anta Estudio". */
  kicker?: string;
  /** Primary CTA destination. */
  primaryHref?: string;
  /** WhatsApp CTA destination. */
  whatsappHref?: string;
  /** Show ScrollTrigger markers. */
  debug?: boolean;
}

const DESKTOP_MQ = "(min-width: 601px)";
const MOBILE_MQ = "(max-width: 600px)";

// If the user scrolls past this (px) during the entrance, we snap the entrance
// to its end and hand off to the exit scrub immediately.
const SCROLL_HANDOFF = 60;

/**
 * Full-bleed hero (100vh). It's `position: sticky` and the rest of the page is
 * an opaque z-index:1 wrapper, so the next section scrolls up and over the hero
 * (the image "goes underneath" the following content) while the parallax runs.
 *
 * - Image: vertical PARALLAX (scrub, ease "none"). The media is ~120% tall and
 *   centered; travel is DERIVED from the measured overflow (single source of
 *   truth) so it self-adapts to the real viewport (incl. mobile svh). Lag sense:
 *   the image drifts down as you scroll → slower than the scroll.
 * - Text entrance: one-time timeline on load (kicker → H1 by lines → subtitle →
 *   CTAs).
 * - Text exit: a second scrub ScrollTrigger, reversible. The block leaves faster
 *   than the scroll and fades, staggered CTAs → subtitle → kicker → H1 (block).
 *
 * Entrance/exit share elements, so the exit is created ONLY after the entrance
 * finishes (or is snapped): loaded at top → entrance plays then arms the exit;
 * scrolled during the entrance → snap entrance to end + arm exit; loaded
 * mid-page → skip entrance, set visible, arm exit at once (the scrub takes over).
 *
 * ENHANCEMENT (documented, not implemented): the H1 could exit by lines back
 * into their masks. Cost: keep the SplitText alive (no revert) + re-split on
 * resize (autoSplit/onSplit) and rebuild the exit scrub on every re-split. Not
 * worth it for a sub-second exit — we exit the H1 as a block instead.
 *
 * A11y: nothing is hidden by CSS — initial hidden states are applied via
 * gsap.set/from inside the no-preference matchMedia branch, and the exit uses
 * immediateRender:false. No-JS / reduced-motion render everything visible.
 */
export function Hero({
  image,
  mobileImage,
  kicker = "Anta Estudio",
  primaryHref = "/contacto",
  whatsappHref = "https://wa.me/528100000000",
  debug = false,
}: HeroProps) {
  const rootRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const kickerRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);

  const [fontsReady, setFontsReady] = useState(false);
  useEffect(() => {
    let alive = true;
    const done = () => alive && setFontsReady(true);
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(done);
    } else {
      done();
    }
    return () => {
      alive = false;
    };
  }, []);

  useGSAP(
    () => {
      const root = rootRef.current;
      const media = mediaRef.current;
      const title = titleRef.current;
      if (!root || !media || !fontsReady) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // ---- IMAGE: vertical parallax (independent), lag sense ----
        // Safe symmetric range derived from the centered overflow.
        const halfRange = () => {
          const overflow = media.offsetHeight - root.offsetHeight;
          return overflow > 0 ? (overflow / 2 / media.offsetHeight) * 100 : 0;
        };
        // Numeric start/end (absolute scroll px) — immune to the sticky hero's
        // shifting rect. 0 → one viewport of scroll.
        const parallax = gsap.timeline({
          scrollTrigger: {
            start: 0,
            end: () => window.innerHeight,
            scrub: true,
            invalidateOnRefresh: true,
            markers: debug,
          },
        });
        parallax.fromTo(
          media,
          { yPercent: () => -halfRange() },
          { yPercent: () => halfRange(), ease: "none" },
        );

        // ---- TEXT: entrance → exit handoff ----
        let split: ReturnType<typeof splitIntoLines> | null = null;
        let exitTween: gsap.core.Timeline | null = null;
        let finalized = false;

        const buildExit = () => {
          if (exitTween) return;
          exitTween = gsap.timeline({
            scrollTrigger: {
              start: 0,
              end: () => window.innerHeight * 0.6,
              scrub: true,
              invalidateOnRefresh: true,
              markers: debug,
            },
          });
          const gone = (y: number) => ({ autoAlpha: 0, y, ease: EASE, immediateRender: false });
          const here = { autoAlpha: 1, y: 0 };
          // Staggered: CTAs first → subtitle → kicker → H1 last.
          exitTween
            .fromTo(ctasRef.current, here, gone(-140), 0.0)
            .fromTo(subtitleRef.current, here, gone(-140), 0.08)
            .fromTo(kickerRef.current, here, gone(-140), 0.16)
            .fromTo(titleRef.current, here, gone(-170), 0.24);
          // Page height changed (no pin) — make sure everything is measured.
          ScrollTrigger.refresh();
        };

        const onScroll = () => {
          if (window.scrollY > SCROLL_HANDOFF) finalize();
        };
        const removeScroll = () => window.removeEventListener("scroll", onScroll);

        function finalize() {
          if (finalized) return;
          finalized = true;
          removeScroll();
          entrance?.progress(1); // snap entrance to its end (idempotent if done)
          split?.revert(); // H1 back to clean text for the block exit
          buildExit();
        }

        const atTop = window.scrollY <= SCROLL_HANDOFF;
        let entrance: gsap.core.Timeline | null = null;

        if (atTop) {
          split = title ? splitIntoLines(title) : null;
          if (split) gsap.set(split.lines, LINE_FROM);
          entrance = gsap.timeline({
            defaults: { ease: EASE, duration: DUR.base },
            onComplete: finalize,
          });
          entrance.from(kickerRef.current, { autoAlpha: 0, y: 12 }, 0);
          if (split) entrance.to(split.lines, lineRevealVars(), 0.18);
          entrance.from(subtitleRef.current, { autoAlpha: 0, y: 16 }, ">-0.2");
          if (ctasRef.current) {
            entrance.from(
              gsap.utils.toArray<Element>(ctasRef.current.children),
              { autoAlpha: 0, y: 12, stagger: 0.08 },
              ">-0.25",
            );
          }
          window.addEventListener("scroll", onScroll, { passive: true });
        } else {
          // Mid-page reload: skip the entrance, the scrub takes over.
          buildExit();
        }

        ScrollTrigger.refresh();

        return () => {
          removeScroll();
          split?.revert();
          exitTween?.scrollTrigger?.kill();
          exitTween?.kill();
        };
      });
    },
    { scope: rootRef, dependencies: [fontsReady] },
  );

  // Art direction via <picture>: only the matching breakpoint's image is fetched.
  const shared = { priority: true as const };
  const { props: desktop } = getImageProps({ ...shared, src: image.src, alt: image.alt, sizes: "100vw" });
  const { props: mobile } = getImageProps({ ...shared, src: mobileImage.src, alt: mobileImage.alt, sizes: "100vw" });

  return (
    <section ref={rootRef} className={styles.hero}>
      <div ref={mediaRef} className={styles.media}>
        <picture>
          <source media={DESKTOP_MQ} srcSet={desktop.srcSet ?? desktop.src} sizes={desktop.sizes} />
          <source media={MOBILE_MQ} srcSet={mobile.srcSet ?? mobile.src} sizes={mobile.sizes} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img {...mobile} alt={image.alt} className={styles.img} />
        </picture>
      </div>

      <div className={styles.overlay} />

      <div className={styles.content}>
        <p ref={kickerRef} className={styles.kicker}>
          <span className={styles.tick} />
          {kicker}
        </p>
        <h1 ref={titleRef} className={styles.title}>
          Despacho de Arquitectura en Monterrey
        </h1>
        <p ref={subtitleRef} className={styles.subtitle}>
          Diseñamos y ejecutamos espacios comerciales, corporativos y residenciales que integran
          funcionalidad, identidad y experiencia. Del concepto a la obra terminada, con más de 15
          años de experiencia.
        </p>
        <div ref={ctasRef} className={styles.ctas}>
          <Button as="a" href={primaryHref}>
            Solicitar propuesta
          </Button>
          <Button as="a" href={whatsappHref} variant="outline" style={{ borderColor: "#fff", color: "#fff" }}>
            <WhatsAppIcon />
            Hablar por WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
}
