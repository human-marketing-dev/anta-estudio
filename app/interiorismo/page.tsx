import type { Metadata } from "next";
import Link from "next/link";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import { WhatsAppIcon } from "@/components/site";
import { RevealLines, StaggerReveal, ParallaxImage, ProcessTimeline } from "@/components/anim";
import { IntegralSection } from "@/components/home/IntegralSection";
import { ClientsSection } from "@/components/home/ClientsSection";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { ClosingCta } from "@/components/home/ClosingCta";
import { getProject } from "@/lib/projects";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbList } from "@/lib/seo";
import shared from "@/components/home/home.module.css";
// Same design as the service pages — reuse the module so they stay in sync.
import styles from "../servicios/arquitectura-comercial/arquitectura-comercial.module.css";

export const metadata: Metadata = {
  title: "Interiorismo en Monterrey | Anta Estudio",
  description:
    "Interiorismo en Monterrey: diseño de interiores para oficinas, restaurantes y casas. Ambiente, materialidad y mobiliario con criterio arquitectónico. +15 años.",
};

const navLinks = [
  { label: "Nosotros", href: "/#nosotros" },
  { label: "Proyectos", href: "/proyectos" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Contacto", href: "/contacto" },
];

const pic = (slug: string, i = 0) => {
  const p = getProject(slug)!;
  return p.galeria[i] ?? p.cover;
};

const linkStyle = { color: "var(--anta-pink)", fontWeight: 600 } as const;

const especialidades = [
  {
    title: "Diseño de Oficinas",
    desc: (
      <>
        Espacios de trabajo que reflejan la identidad de la empresa y hacen más fácil el día a día
        del equipo. Conoce a detalle nuestro servicio de{" "}
        <Link href="/interiorismo/diseno-de-oficinas" style={linkStyle}>
          diseño de oficinas
        </Link>
        .
      </>
    ),
    image: pic("majadma", 0),
  },
  {
    title: "Diseño de Restaurantes",
    desc: (
      <>
        Restaurantes, cafés y espacios de hospitalidad donde el ambiente acompaña al concepto y la
        operación fluye. Así abordamos el{" "}
        <Link href="/interiorismo/diseno-de-restaurantes" style={linkStyle}>
          diseño de restaurantes
        </Link>
        .
      </>
    ),
    image: pic("kampai", 0),
  },
  {
    title: "Diseño de Interiores de Casas",
    desc: (
      <>
        Salas, recámaras y cocinas con carácter propio, pensadas para tu forma de habitar. Todo sobre
        nuestro{" "}
        <Link href="/interiorismo/diseno-de-interiores-casas" style={linkStyle}>
          diseño de interiores de casas
        </Link>
        .
      </>
    ),
    image: pic("terraza-pangea", 0),
  },
];

const pasos = [
  { title: "Diagnóstico y objetivos", desc: "Entendemos cómo se usa el espacio, qué necesitas resolver y qué quieres transmitir." },
  { title: "Concepto y anteproyecto", desc: "Definimos la dirección estética y el acomodo de cada área." },
  { title: "Alcance y especificaciones", desc: "Aterrizamos materiales, acabados, iluminación y mobiliario con propuestas concretas." },
  { title: "Presupuesto y calendario", desc: "Presentamos un presupuesto preciso y tiempos realistas." },
  { title: "Ejecución, supervisión y entrega", desc: "Coordinamos la implementación de principio a fin y entregamos listo para usar." },
];

const diferenciadores = [
  { title: "Diseño + ejecución", desc: "Un solo estándar de principio a fin, sin fragmentar responsabilidades." },
  { title: "Planeación y precisión", desc: "Claridad de alcances que permite presupuestos precisos." },
  { title: "Materialidad y detalle", desc: "Acabados, texturas e iluminación elegidos con criterio para dar carácter y durabilidad a cada espacio." },
  { title: "Coordinación integral", desc: "Menos fricción entre proveedores, más control de tiempos y calidad." },
];

const subInk = { color: "var(--anta-ink-30)" };

export default function InteriorismoPage() {
  const heroImg = getProject("e-80")!.cover;
  const queEsImg = getProject("cafe-laurel")!.cover;

  return (
    <>
      <JsonLd
        data={breadcrumbList([
          { name: "Inicio", path: "/" },
          { name: "Interiorismo", path: "/interiorismo" },
        ])}
      />

      <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 20 }}>
        <NavBar theme="dark" links={navLinks} cta="Solicitar propuesta" />
      </div>

      {/* 1 · HERO */}
      <header className={styles.hero}>
        <ParallaxImage src={heroImg} alt="Interiorismo de Anta Estudio en Monterrey" priority sizes="100vw" className={styles.heroMedia} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <RevealLines as="h1" className={styles.heroTitle}>
            Interiorismo en Monterrey
          </RevealLines>
          <StaggerReveal>
            <p className={styles.heroSub}>
              Diseñamos interiores que se ven bien y funcionan todos los días. Para oficinas,
              restaurantes y casas, trabajamos el ambiente, la materialidad y el mobiliario con
              criterio arquitectónico. Más de 15 años de experiencia.
            </p>
            <div className={styles.ctas}>
              <Button as="a" href="/contacto">
                Solicitar propuesta
              </Button>
              <Button as="a" href="https://wa.me/528100000000" variant="outline" style={{ borderColor: "#fff", color: "#fff" }}>
                <WhatsAppIcon />
                Hablar por WhatsApp
              </Button>
            </div>
          </StaggerReveal>
        </div>
      </header>

      {/* 2 · ¿QUÉ ES? */}
      <section className={shared.section}>
        <div className={styles.queEs}>
          <div className={styles.queEsText}>
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowTick} />
              Diseño de interiores en Monterrey
            </p>
            <RevealLines as="h2" className={shared.h2}>
              ¿Qué es el Interiorismo?
            </RevealLines>
            <p className={`${shared.body} ${styles.lead}`}>
              El interiorismo es el diseño del interior de un espacio: cómo se distribuye, qué
              materiales y colores conviven, cómo entra la luz y qué mobiliario hace que todo funcione
              para quien lo usa. Es lo que hace que un mismo espacio se sienta frío o acogedor,
              genérico o con carácter propio.
            </p>
            <p className={`${shared.body} ${styles.leadBody}`}>
              En Anta Estudio trabajamos el interiorismo con criterio arquitectónico: cada decisión de
              acabado, iluminación o mobiliario considera también la técnica y la durabilidad, para
              que el resultado se vea bien hoy y siga funcionando en unos años. Diseñamos y ejecutamos
              bajo un mismo estándar, en proyectos{" "}
              <Link href="/servicios/arquitectura-corporativa" style={linkStyle}>
                corporativos
              </Link>
              ,{" "}
              <Link href="/servicios/arquitectura-comercial" style={linkStyle}>
                comerciales
              </Link>{" "}
              y{" "}
              <Link href="/servicios/arquitectura-residencial" style={linkStyle}>
                residenciales
              </Link>
              .
            </p>
          </div>

          <div className={styles.queEsMedia}>
            <ParallaxImage
              src={queEsImg}
              alt="Interiorismo de Anta Estudio"
              className={styles.queEsImg}
              sizes="(max-width: 860px) 100vw, 50vw"
            />
            <span className={styles.composeTag}>+15 años</span>
          </div>
        </div>
      </section>

      {/* 3 · NUESTRAS ESPECIALIDADES — tabs (mismo diseño que "Servicio Integral") */}
      <IntegralSection
        id="especialidades"
        tone="mist"
        heading="Nuestras Especialidades"
        intro="Tres formas de trabajar el interiorismo, según el tipo de espacio y cómo se vive o se opera."
        items={especialidades}
      />

      {/* 4 · NUESTRO PROCESO */}
      <section className={`${shared.section} ${shared.sectionInk}`}>
        <div className={shared.wrap}>
          <div className={styles.headText}>
            <RevealLines as="h2" className={shared.h2}>
              Nuestro Proceso
            </RevealLines>
            <p className={`${shared.sub} ${styles.headSub}`} style={subInk}>
              Un proceso claro para alinear expectativas, definir alcances y ejecutar con control.
            </p>
          </div>
          <div className={styles.listWrap}>
            <ProcessTimeline steps={pasos} />
          </div>
        </div>
      </section>

      {/* 5 · POR QUÉ ANTA ESTUDIO */}
      <section className={shared.section}>
        <div className={shared.wrap}>
          <div className={styles.headText}>
            <RevealLines as="h2" className={shared.h2}>
              Por qué Anta Estudio
            </RevealLines>
            <p className={`${shared.sub} ${styles.headSub}`}>
              Por qué nuestros clientes nos eligen para el interiorismo de su espacio.
            </p>
          </div>
          <StaggerReveal className={styles.whyStrip} childSelector={`.${styles.whyItem}`} stagger={0.1}>
            {diferenciadores.map((d) => (
              <div key={d.title} className={styles.whyItem}>
                <span className={styles.whyDash} aria-hidden="true" />
                <span className={styles.whyTitle}>{d.title}</span>
                <p className={styles.whyDesc}>{d.desc}</p>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* 6 · NUESTROS CLIENTES */}
      <ClientsSection />

      {/* 7 · RESEÑAS */}
      <ReviewsSection />

      {/* 8 · CTA DE CIERRE */}
      <ClosingCta
        title="¿Buscas Interiorismo en Monterrey?"
        body="Nos encantaría conocer tu proyecto. En Anta Estudio combinamos diseño, criterio arquitectónico y más de 15 años de experiencia para crear interiores con carácter propio, cómodos de usar y pensados para durar."
      />

      <Footer />
    </>
  );
}
