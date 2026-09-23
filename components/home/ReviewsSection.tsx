"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { gsap, useGSAP, EASE, DUR } from "@/lib/gsap";
import { RevealLines } from "@/components/anim";
import shared from "./home.module.css";
import styles from "./ReviewsSection.module.css";

interface Review {
  name: string;
  meta: string;
  when: string;
  text: string;
  rating: number;
}

// Reseñas reales del perfil de Google Business (estáticas por ahora; a futuro
// se reemplazan por la API de Google Places / Business Profile).
const reviews: Review[] = [
  {
    name: "Abraham Castellanos",
    meta: "Local Guide",
    when: "Hace 7 meses",
    rating: 5,
    text: "Excelente despacho, me ayudaron con una remodelación y quedó increíble, no tuve que preocuparme por nada, y quedó tal cual lo pactado, sin lugar a duda los volveré a contratar cuando requiera hacer algún otro cambio.",
  },
  {
    name: "Francisco Soriano",
    meta: "1 opinión",
    when: "2 semanas atrás",
    rating: 5,
    text: "Excelente atención y servicio, me sentí muy satisfecho con los resultados de la remodelación de mi casa, un trato muy amigable y un excelente gusto para cada detalle, quedé encantado con mi casa. Muy recomendable!!!",
  },
  {
    name: "Suzzete Gonzalez",
    meta: "4 opiniones",
    when: "2 semanas atrás",
    rating: 5,
    text: "Muy buen servicio al cliente. Atención personalizada y siempre buscando la mejor solución en diseño, presupuesto y práctico.",
  },
  {
    name: "Marcelo Elizondo",
    meta: "6 opiniones",
    when: "Hace 2 años",
    rating: 5,
    text: "Muy buena experiencia. Muy atentos todos. Mucha atención a detalle. Buena comunicación. 100% recomendado.",
  },
];

const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

function Stars({ n }: { n: number }) {
  return (
    <span className={styles.stars} aria-label={`${n} de 5 estrellas`}>
      {"★★★★★".slice(0, n)}
    </span>
  );
}

const GoogleG = () => (
  <svg className={styles.googleG} width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.4a5.5 5.5 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.6-5.2 3.6-8.8z" />
    <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1 .7-2.4 1.1-4.1 1.1-3.1 0-5.8-2.1-6.7-5H1.3v3.1A12 12 0 0 0 12 24z" />
    <path fill="#FBBC05" d="M5.3 14.2a7.2 7.2 0 0 1 0-4.6V6.5H1.3a12 12 0 0 0 0 10.8l4-3.1z" />
    <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.3 6.5l4 3.1C6.2 6.8 8.9 4.8 12 4.8z" />
  </svg>
);

/** Section 7 · Reseñas de Google. Real reviews (static for now). */
export function ReviewsSection() {
  const rootRef = useRef<HTMLElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Scroll the slider so card `i` is centered. Instant when the user prefers
  // reduced motion, smooth otherwise.
  const go = useCallback((i: number) => {
    const idx = Math.max(0, Math.min(i, reviews.length - 1));
    setActiveIndex(idx);
    const scroller = scrollerRef.current;
    const card = scroller?.querySelectorAll<HTMLElement>(`.${styles.card}`)[idx];
    if (!scroller || !card) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scRect = scroller.getBoundingClientRect();
    const cRect = card.getBoundingClientRect();
    const delta = cRect.left - scRect.left - (scroller.clientWidth - card.clientWidth) / 2;
    scroller.scrollTo({ left: scroller.scrollLeft + delta, behavior: reduce ? "auto" : "smooth" });
  }, []);

  // Light the dot of whichever card is currently centered in the slider.
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const cards = Array.from(scroller.querySelectorAll<HTMLElement>(`.${styles.card}`));
    if (cards.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio >= 0.6) {
            const idx = cards.indexOf(e.target as HTMLElement);
            if (idx >= 0) setActiveIndex(idx);
          }
        });
      },
      { root: scroller, threshold: [0.6] },
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  // Keyboard navigation for the focusable slider.
  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(activeIndex + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(activeIndex - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        go(0);
      } else if (e.key === "End") {
        e.preventDefault();
        go(reviews.length - 1);
      }
    },
    [activeIndex, go],
  );

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(q(`.${styles.card}`), {
          y: 26,
          autoAlpha: 0,
          duration: DUR.base,
          ease: EASE,
          stagger: 0.09,
          scrollTrigger: { trigger: q(`.${styles.grid}`)[0], start: "top 84%", once: true },
        });
      });
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} id="resenas" className={`${shared.section} ${shared.sectionMist}`}>
      <div className={shared.wrap}>
        <div className={styles.head}>
          <div className={styles.headText}>
            <RevealLines as="h2" className={shared.h2}>
              Lo que Dicen Nuestros Clientes
            </RevealLines>
            <p className={`${shared.sub} ${styles.headSub}`}>
              Testimonios reales de clientes que han vivido el proceso de principio a fin.
            </p>
          </div>

          {/* Static rating badge. The link to the Google profile is intentionally
              omitted until the real Business Profile URL is available (a generic
              search link was removed to avoid sending users to wrong results). */}
          <div className={styles.summary}>
            <span className={styles.score}>{avg}</span>
            <span className={styles.summaryRight}>
              <Stars n={5} />
              <span className={styles.summaryLabel}>
                <GoogleG />
                Reseñas de Google
              </span>
            </span>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className={styles.grid}
          role="group"
          aria-roledescription="carrusel"
          aria-label="Reseñas de clientes"
          tabIndex={0}
          onKeyDown={onKeyDown}
        >
          {reviews.map((r) => (
            <figure key={r.name} className={styles.card}>
              <span className={styles.quote} aria-hidden="true">
                &rdquo;
              </span>
              <div className={styles.cardTop}>
                <span className={styles.avatar}>{r.name.trim().charAt(0).toUpperCase()}</span>
                <span className={styles.who}>
                  <span className={styles.name}>{r.name}</span>
                  <span className={styles.meta}>
                    {r.meta} · {r.when}
                  </span>
                </span>
              </div>
              <Stars n={r.rating} />
              <blockquote className={styles.text}>{r.text}</blockquote>
            </figure>
          ))}
        </div>

        {/* Position dots — visible only on phone, where the slider exists. */}
        <div className={styles.dots} role="group" aria-label="Ir a una reseña">
          {reviews.map((r, i) => (
            <button
              key={r.name}
              type="button"
              className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ""}`}
              aria-label={`Ir a la reseña ${i + 1} de ${reviews.length}`}
              aria-current={i === activeIndex ? "true" : undefined}
              onClick={() => go(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
