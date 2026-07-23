"use client";

import { useRef } from "react";
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

          <a
            className={styles.summary}
            href="https://www.google.com/search?q=Anta+Estudio+Monterrey"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={styles.score}>{avg}</span>
            <span className={styles.summaryRight}>
              <Stars n={5} />
              <span className={styles.summaryLabel}>
                <GoogleG />
                Reseñas de Google ↗
              </span>
            </span>
          </a>
        </div>

        <div className={styles.grid}>
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
      </div>
    </section>
  );
}
