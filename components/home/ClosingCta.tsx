"use client";

import { RevealLines } from "@/components/anim";
import { Button } from "@/components/Button";
import { WhatsAppIcon } from "@/components/site";
import shared from "./home.module.css";
import styles from "./ClosingCta.module.css";

interface ClosingCtaProps {
  primaryHref?: string;
  whatsappHref?: string;
}

/**
 * Section 8 · CTA de cierre. H2 uses the hero's line reveal.
 *
 * NOTE (per docs/references/home-copy-seo.md): the copy section renders this H2 as
 * "¿Necesitas un Despacho de Arquitectura en Monterrey?" while the original doc's
 * heading map lists "Comienza tu Proyecto con un Despacho de Arquitectura en
 * Monterrey". We use the copy-section version; if SEO confirms the other, change
 * ONLY this H2.
 */
export function ClosingCta({
  primaryHref = "/contacto",
  whatsappHref = "https://wa.me/528100000000",
}: ClosingCtaProps) {
  return (
    <section id="cta" className={shared.section}>
      <div className={shared.wrap}>
        <div className={styles.inner}>
          <RevealLines as="h2" className={`${shared.h2} ${styles.title}`}>
            ¿Necesitas un Despacho de Arquitectura en Monterrey?
          </RevealLines>
          <p className={`${shared.sub} ${styles.body}`}>
            Nos encantaría conocer tu proyecto. En Anta Estudio combinamos diseño, ejecución y más de
            15 años de experiencia para llevarlo a la realidad con la mayor tranquilidad.
          </p>
          <div className={styles.ctas}>
            <Button as="a" href={primaryHref}>
              Solicitar propuesta
            </Button>
            <Button as="a" href={whatsappHref} variant="outline">
              <WhatsAppIcon />
              Hablar por WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
