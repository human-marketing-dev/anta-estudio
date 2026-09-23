import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { RevealLines } from "@/components/anim";
import { CONTACT } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import shared from "@/components/home/home.module.css";
import styles from "./contacto.module.css";
import { ContactForm } from "./ContactForm";

export const metadata = buildMetadata({
  title: "Contacto | Anta Estudio — Arquitectura e Interiorismo en Monterrey",
  description:
    "Conversemos sobre tu proyecto de arquitectura o interiorismo en Monterrey. Escríbenos por WhatsApp o llena el formulario y te contactamos en menos de 48 horas hábiles.",
  path: "/contacto",
});

const navLinks = [
  { label: "Nosotros", href: "/nosotros" },
  { label: "Proyectos", href: "/proyectos" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Contacto", href: "/contacto" },
];

const detalles: { key: string; value: string; href?: string }[] = [
  { key: "Correo", value: CONTACT.correo, href: `mailto:${CONTACT.correo}` },
  { key: "WhatsApp", value: CONTACT.telefonoDisplay, href: CONTACT.whatsapp },
  { key: "Ubicación", value: CONTACT.direccion.completa, href: CONTACT.direccion.mapsUrl },
  { key: "Instagram", value: CONTACT.instagramHandle, href: CONTACT.instagram },
];

export default function ContactPage() {
  return (
    <>
      <NavBar theme="light" links={navLinks} cta="Solicitar propuesta" />

      <main>
        <section className={shared.section}>
          <div className={shared.wrap}>
            <div className={styles.grid}>
              {/* Left — info */}
              <div>
                <p className={styles.eyebrow}>
                  <span className={styles.eyebrowTick} />
                  Contacto
                </p>
                <RevealLines as="h1" className={styles.title}>
                  Conversemos sobre tu proyecto.
                </RevealLines>
                <p className={styles.lead}>
                  Cuéntanos qué tienes en mente. Somos un despacho de arquitectura e interiorismo en
                  Monterrey y te acompañamos desde la idea hasta la obra terminada. Respondemos en un
                  plazo máximo de 48 horas hábiles.
                </p>

                <dl className={styles.details}>
                  {detalles.map((d) => (
                    <div key={d.key} className={styles.detailRow}>
                      <dt className={styles.detailKey}>{d.key}</dt>
                      <dd style={{ margin: 0 }}>
                        {d.href ? (
                          <a
                            className={styles.detailVal}
                            href={d.href}
                            target={d.href.startsWith("http") ? "_blank" : undefined}
                            rel={d.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          >
                            {d.value}
                          </a>
                        ) : (
                          <span className={styles.detailVal}>{d.value}</span>
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Right — form */}
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
