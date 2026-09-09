import type { Metadata } from "next";
import Link from "next/link";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import { WhatsAppIcon, Arrow } from "@/components/site";
import { RevealLines, StaggerReveal, ParallaxImage, ProcessTimeline } from "@/components/anim";
import { ProjectTile } from "@/components/ProjectTile";
import { IntegralSection } from "@/components/home/IntegralSection";
import { ClientsSection } from "@/components/home/ClientsSection";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { ClosingCta } from "@/components/home/ClosingCta";
import { getProject, type Project } from "@/lib/projects";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbList } from "@/lib/seo";
import shared from "@/components/home/home.module.css";
// Same design as the service pages — reuse the module so they stay in sync.
import styles from "../../servicios/arquitectura-comercial/arquitectura-comercial.module.css";

export const metadata: Metadata = {
  title: "Diseño de Interiores de Casas en Monterrey | Anta Estudio",
  description:
    "Diseño de interiores de casas en Monterrey y San Pedro. Salas, recámaras y cocinas con materialidad, luz y mobiliario a medida. +15 años de experiencia.",
};

const navLinks = [
  { label: "Nosotros", href: "/#nosotros" },
  { label: "Proyectos", href: "/proyectos" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Contacto", href: "/contacto" },
];

const perfiles = [
  { title: "Quienes acaban de mudarse", desc: "Tienen la casa o el departamento y quieren darle carácter desde el principio." },
  { title: "Familias que quieren renovar", desc: "Buscan actualizar ambientes que ya no acompañan su forma de vivir." },
  { title: "Espacios puntuales por resolver", desc: "Una cocina, una recámara principal o una sala que necesita una propuesta completa." },
  { title: "Quienes valoran el detalle", desc: "Esperan materialidad, luz y acabados con un nivel de cuidado poco común." },
];

// Line icons per profile (outline, inherit color from .perfilIcon → pink).
const svgProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};
const perfilIconos = [
  // Acaban de mudarse — house
  <svg key="mudarse" {...svgProps}>
    <path d="M3 11 12 4l9 7" />
    <path d="M5 10v10h14V10" />
    <path d="M10 20v-6h4v6" />
  </svg>,
  // Renovar — refresh
  <svg key="renovar" {...svgProps}>
    <polyline points="21 4 21 9 16 9" />
    <polyline points="3 20 3 15 8 15" />
    <path d="M19.5 9A8 8 0 0 0 6 5.7L3 9m18 6-3 3.3A8 8 0 0 1 4.5 15" />
  </svg>,
  // Espacios puntuales — floor plan / layout
  <svg key="espacios" {...svgProps}>
    <path d="M4 4h16v16H4z" />
    <path d="M4 10h16" />
    <path d="M11 10v10" />
  </svg>,
  // Detalle — sparkle
  <svg key="detalle" {...svgProps}>
    <path d="M12 3c.6 4 1.9 5.4 6 6-4.1.6-5.4 2-6 6-.6-4-1.9-5.4-6-6 4.1-.6 5.4-2 6-6Z" />
  </svg>,
];

const pasos = [
  { title: "Diagnóstico y objetivos", desc: "Entendemos cómo vives, qué te gusta y qué necesita resolver cada espacio." },
  { title: "Concepto y anteproyecto", desc: "Definimos la dirección estética y el acomodo de cada estancia." },
  { title: "Alcance y especificaciones", desc: "Aterrizamos materiales, acabados, iluminación y mobiliario con propuestas concretas." },
  { title: "Presupuesto y calendario", desc: "Presentamos un presupuesto preciso y tiempos realistas." },
  { title: "Ejecución, supervisión y entrega", desc: "Coordinamos la implementación de principio a fin y entregamos listo para usar." },
];

const pic = (slug: string, i = 0) => {
  const p = getProject(slug)!;
  return p.galeria[i] ?? p.cover;
};

const alcances = [
  { title: "Salas y Áreas Sociales", desc: "Los espacios donde recibes: acomodo, confort y una atmósfera que invita a quedarse.", image: pic("terraza-pangea", 0) },
  { title: "Diseño de Interiores de Recámaras", desc: "Descanso, guardado y luz bien resueltos, con materiales cálidos y duraderos.", image: pic("edificio-vh", 0) },
  { title: "Cocinas y Comedores", desc: "El corazón de la casa: funcionalidad diaria con acabados que aguantan el uso.", image: pic("tp-zentralia", 0) },
  { title: "Materialidad e Iluminación", desc: "Selección de acabados, texturas y luz que definen el carácter de cada estancia.", image: pic("valle-alto-club-de-golf-areas-comunes", 0) },
  { title: "Mobiliario a Medida", desc: "Clósets, libreros y piezas especiales diseñadas para tu espacio y tus cosas.", image: pic("edificio-vh", 1) },
  { title: "Implementación y Coordinación", desc: "Supervisión de proveedores y seguimiento en sitio para que el diseño se ejecute tal como se planeó.", image: pic("terraza-pangea", 1) },
];

const diferenciadores = [
  { title: "Diseño + ejecución", desc: "Un solo estándar de principio a fin, sin fragmentar responsabilidades." },
  { title: "Planeación y precisión", desc: "Claridad de alcances que permite presupuestos precisos." },
  { title: "Enfoque premium", desc: "Detalle, materialidad y coherencia estética." },
  { title: "Coordinación integral", desc: "Menos fricción entre proveedores, más control de tiempos y calidad." },
];

const subInk = { color: "var(--anta-ink-30)" };

export default function DisenoDeInterioresCasasPage() {
  const heroImg = getProject("terraza-pangea")!.cover;
  const queEsImg = getProject("edificio-vh")!.cover;
  const nosotrosImg = getProject("tp-zentralia")!.cover;
  // TODO: placeholder — reemplazar por proyectos residenciales reales cuando existan.
  const proyectos = ["terraza-pangea", "edificio-vh", "tp-zentralia", "valle-alto-club-de-golf-areas-comunes"].flatMap((s) => {
    const p = getProject(s);
    return p ? [p as Project] : [];
  });

  return (
    <>
      <JsonLd
        data={breadcrumbList([
          { name: "Inicio", path: "/" },
          { name: "Interiorismo", path: "/interiorismo" },
          { name: "Diseño de Interiores de Casas", path: "/interiorismo/diseno-de-interiores-casas" },
        ])}
      />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 20 }}>
        <NavBar theme="dark" links={navLinks} cta="Solicitar propuesta" />
      </div>

      {/* 1 · HERO */}
      <header className={styles.hero}>
        <ParallaxImage src={heroImg} alt="Interior de casa — diseño de Anta Estudio" priority sizes="100vw" className={styles.heroMedia} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <RevealLines as="h1" className={styles.heroTitle}>
            Diseño de Interiores de Casas
          </RevealLines>
          <StaggerReveal>
            <p className={styles.heroSub}>
              Damos carácter a los espacios donde vives. Salas, recámaras, cocinas y áreas comunes
              pensadas para tu forma de habitar, con materiales, luz y mobiliario elegidos con
              criterio. Interiorismo residencial en Monterrey y San Pedro, con más de 15 años de
              experiencia.
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
              Interiorismo residencial
            </p>
            <RevealLines as="h2" className={shared.h2}>
              ¿Qué es el Diseño de Interiores de Casas?
            </RevealLines>
            <p className={`${shared.body} ${styles.lead}`}>
              El diseño de interiores de casas es lo que convierte una construcción en un hogar.
              Define cómo se acomoda cada estancia, qué materiales y colores conviven, cómo entra la
              luz a lo largo del día y qué mobiliario hace que el espacio funcione para quien vive ahí.
              Dos casas idénticas por fuera pueden sentirse completamente distintas por dentro: esa
              diferencia es el interiorismo.
            </p>
            <p className={`${shared.body} ${styles.leadBody}`}>
              En Anta Estudio trabajamos el interiorismo residencial con criterio arquitectónico: cada
              decisión de acabado, iluminación o mobiliario considera también la técnica y la
              durabilidad, para que el resultado se vea bien hoy y siga funcionando en unos años.
            </p>
            <p className={`${shared.body} ${styles.leadBody}`}>
              ¿Vas a construir o remodelar a fondo tu casa?{" "}
              <Link href="/servicios/arquitectura-residencial" style={{ color: "var(--anta-pink)", fontWeight: 600, textDecoration: "none" }}>
                Conoce nuestro servicio de Arquitectura Residencial →
              </Link>
            </p>
          </div>

          <div className={styles.queEsMedia}>
            <ParallaxImage
              src={queEsImg}
              alt="Interiorismo residencial de Anta Estudio"
              className={styles.queEsImg}
              sizes="(max-width: 860px) 100vw, 50vw"
            />
            <span className={styles.composeTag}>+15 años</span>
          </div>
        </div>
      </section>

      {/* 3 · ¿PARA QUIÉN? */}
      <section className={`${shared.section} ${shared.sectionMist}`}>
        <div className={shared.wrap}>
          <div className={styles.perfilSplit}>
            <div className={styles.perfilAside}>
              <RevealLines as="h2" className={shared.h2}>
                ¿Para quién es este servicio?
              </RevealLines>
              <p className={`${shared.body} ${styles.perfilIntro}`}>
                Pensado para quienes ya tienen su casa y quieren que se sienta suya: recién mudados,
                familias que renuevan y quienes buscan resolver una estancia con cuidado del detalle.
              </p>
            </div>
            <StaggerReveal
              as="ul"
              className={styles.perfilStack}
              childSelector={`.${styles.perfilItem}`}
              stagger={0.08}
              start="top 82%"
            >
              {perfiles.map((p, i) => (
                <li key={p.title} className={styles.perfilItem}>
                  <span className={styles.perfilIcon} aria-hidden="true">
                    {perfilIconos[i]}
                  </span>
                  <div className={styles.perfilBody}>
                    <h3 className={styles.perfilItemTitle}>{p.title}</h3>
                    <p className={styles.perfilItemDesc}>{p.desc}</p>
                  </div>
                </li>
              ))}
            </StaggerReveal>
          </div>
        </div>
      </section>

      {/* 4 · CASAS QUE HEMOS DISEÑADO */}
      <section className={shared.section}>
        <div className={shared.wrap}>
          <div className={styles.headRow}>
            <div className={styles.headText}>
              <RevealLines as="h2" className={shared.h2}>
                Casas que Hemos Diseñado
              </RevealLines>
              <p className={`${shared.sub} ${styles.headSub}`}>
                Una selección de interiores residenciales donde los materiales, la luz y el mobiliario
                acompañan la forma de vivir de cada familia.
              </p>
            </div>
            <Link href="/proyectos" className={shared.link}>
              Ver más proyectos residenciales
              <span className={shared.arrow}>
                <Arrow s={15} />
              </span>
            </Link>
          </div>
        </div>
        <div className={styles.projectsGrid}>
          {proyectos.map((p) => (
            <ProjectTile key={p.slug} project={p} />
          ))}
        </div>
      </section>

      {/* 5 · NUESTRO PROCESO */}
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

      {/* 6 · ALCANCE DEL SERVICIO */}
      <IntegralSection
        id="alcance"
        tone="white"
        heading="Alcance del Servicio"
        intro="Contigo en cada etapa: nos encargamos de todo lo que el interiorismo de tu casa necesita, bajo un mismo estándar de calidad."
        items={alcances}
      />

      {/* 7 · POR QUÉ ANTA ESTUDIO */}
      <section className={`${shared.section} ${shared.sectionMist}`}>
        <div className={shared.wrap}>
          <div className={styles.headText}>
            <RevealLines as="h2" className={shared.h2}>
              Por qué Anta Estudio
            </RevealLines>
            <p className={`${shared.sub} ${styles.headSub}`}>
              Por qué nuestros clientes nos eligen para el interiorismo de su casa.
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

      {/* 8 · SOBRE NOSOTROS */}
      <section className={shared.section}>
        <div className={styles.queEsRev}>
          <div className={styles.queEsMedia}>
            <ParallaxImage
              src={nosotrosImg}
              alt="Interior residencial diseñado por Anta Estudio"
              className={styles.queEsImg}
              sizes="(max-width: 860px) 100vw, 50vw"
            />
          </div>
          <div className={styles.queEsText}>
            <RevealLines as="h2" className={shared.h2}>
              Sobre Nosotros
            </RevealLines>
            <RevealLines as="h3" className={`${shared.h3big} ${styles.aboutSub}`}>
              Un despacho de arquitectura e interiorismo con más de 15 años de experiencia
            </RevealLines>
            <p className={`${shared.body} ${styles.aboutBody}`}>
              Somos un equipo de arquitectos en Monterrey y San Pedro Garza García especializado en el
              diseño de espacios que funcionan, comunican y perduran. Durante más de 15 años hemos
              desarrollado proyectos residenciales, corporativos y comerciales, con una misma forma de
              trabajar: entender primero cómo se usa el espacio y después darle forma. En el
              interiorismo residencial, esto significa hogares con carácter propio, cómodos de habitar
              y hechos con materiales que envejecen bien.
            </p>
          </div>
        </div>
      </section>

      {/* 9 · NUESTROS CLIENTES */}
      <ClientsSection />

      {/* 10 · RESEÑAS */}
      <ReviewsSection />

      {/* 11 · CTA DE CIERRE */}
      <ClosingCta
        title="¿Buscas Diseño de Interiores en Monterrey?"
        body="Nos encantaría conocer tu proyecto. En Anta Estudio combinamos diseño, criterio arquitectónico y más de 15 años de experiencia para crear espacios con carácter propio, cómodos de habitar y pensados para acompañarte muchos años."
      />

      <Footer />
    </>
  );
}
