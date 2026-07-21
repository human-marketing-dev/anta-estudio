"use client";

import { getImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, EASE, DUR } from "@/lib/gsap";
import { splitIntoLines, lineRevealVars, LINE_FROM } from "@/lib/animation/lineReveal";
import { Button } from "@/components/Button";
import { WhatsAppIcon } from "@/components/site";
import styles from "./Hero.module.css";

interface HeroImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface HeroProps {
  /** Wide panoramic image (desktop pan). */
  image: HeroImage;
  /** Portrait crop used on the mobile breakpoint (art direction). */
  mobileImage: HeroImage;
  /** Small text over the H1 (not a heading). Default "Anta Estudio". */
  kicker?: string;
  /** Pinned scroll distance. Default "150%". */
  scrollDistance?: string;
  /** Primary CTA destination. */
  primaryHref?: string;
  /** WhatsApp CTA destination. */
  whatsappHref?: string;
  /** Show ScrollTrigger markers. */
  debug?: boolean;
}

/** Desktop breakpoint boundary — kept in one place, shared by <source> and CSS intent. */
const DESKTOP_MQ = "(min-width: 601px)";
const MOBILE_MQ = "(max-width: 600px)";

const isSvg = (s: string) => s.endsWith(".svg");

/**
 * Full-bleed hero. On scroll the section pins (~150%) and ONLY the image pans
 * (scrub); the text runs a one-time entrance timeline on load
 * (kicker → H1 by lines → subtitle → CTAs). A <picture> (built with
 * getImageProps) serves the panorama on desktop and an art-directed portrait on
 * mobile, so ONLY the active breakpoint's image is fetched — the hero is the LCP.
 * Reduced motion / no-JS keep everything visible and static.
 */
export function Hero({
  image,
  mobileImage,
  kicker = "Anta Estudio",
  scrollDistance = "150%",
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
      if (!root || !media || !fontsReady) return;

      const mm = gsap.matchMedia();

      // TEXT — one-time entrance on load (any width, motion allowed).
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const title = titleRef.current;
        const split = title ? splitIntoLines(title) : null;
        if (split) gsap.set(split.lines, LINE_FROM);

        const tl = gsap.timeline({ defaults: { ease: EASE, duration: DUR.base } });
        tl.from(kickerRef.current, { autoAlpha: 0, y: 12 }, 0);
        if (split) tl.to(split.lines, lineRevealVars(), 0.18);
        tl.from(subtitleRef.current, { autoAlpha: 0, y: 16 }, ">-0.2");
        if (ctasRef.current) {
          tl.from(
            gsap.utils.toArray<Element>(ctasRef.current.children),
            { autoAlpha: 0, y: 12, stagger: 0.08 },
            ">-0.25",
          );
        }
        tl.eventCallback("onComplete", () => split?.revert());

        return () => split?.revert();
      });

      // IMAGE — desktop: horizontal pan (scrub) while pinned. The travel is
      // DERIVED from the measured overflow, so the CSS width of `.media` is the
      // single source of truth — editing it alone can never desync the pan.
      mm.add(`${DESKTOP_MQ} and (prefers-reduced-motion: no-preference)`, () => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: `+=${scrollDistance}`,
              scrub: true,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              markers: debug,
            },
          })
          .to(media, {
            // xPercent is relative to the element's own width; overflow / ownWidth
            // gives the exact shift that reveals the far edge. Re-evaluated on
            // refresh thanks to invalidateOnRefresh.
            xPercent: () => {
              const overflow = media.offsetWidth - root.offsetWidth;
              return overflow > 0 ? -(overflow / media.offsetWidth) * 100 : 0;
            },
            ease: "none",
          });
      });

      // IMAGE — mobile: art-directed portrait with a contained vertical parallax.
      mm.add(`${MOBILE_MQ} and (prefers-reduced-motion: no-preference)`, () => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: `+=${scrollDistance}`,
              scrub: true,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              markers: debug,
            },
          })
          .fromTo(media, { yPercent: -5 }, { yPercent: 5, ease: "none" });
      });
    },
    { scope: rootRef, dependencies: [fontsReady] },
  );

  // Art direction via <picture>: only the matching breakpoint's image is fetched.
  const shared = { priority: true as const };
  const { props: desktop } = getImageProps({
    ...shared,
    src: image.src,
    alt: image.alt,
    width: image.width,
    height: image.height,
    sizes: "120vw",
    unoptimized: isSvg(image.src),
  });
  const { props: mobile } = getImageProps({
    ...shared,
    src: mobileImage.src,
    alt: mobileImage.alt,
    width: mobileImage.width,
    height: mobileImage.height,
    sizes: "100vw",
    unoptimized: isSvg(mobileImage.src),
  });

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
