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
import shared from "@/components/home/home.module.css";
// Same design as Arquitectura Comercial — reuse its module so both stay in sync.
import styles from "../arquitectura-comercial/arquitectura-comercial.module.css";

export const metadata: Metadata = {
  title: "Arquitectura Residencial en Monterrey y San Pedro | Anta Estudio",
  description:
    "Arquitectura residencial en Monterrey y San Pedro. Diseñamos y construimos casas y residencias premium, del plano a la obra, con más de 15 años de experiencia.",
};

const navLinks = [
  { label: "Nosotros", href: "/#nosotros" },
  { label: "Proyectos", href: "/proyectos" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Contacto", href: "/contacto" },
];

const perfiles = [
  { title: "Familias que construyen su hogar", desc: "Quieren una casa diseñada a su medida, pensada para cómo viven y crecen." },
  { title: "Propietarios que van a remodelar", desc: "Buscan renovar o ampliar su residencia con control de diseño, tiempos y obra." },
  { title: "Compradores de departamento premium", desc: "Necesitan adaptar y personalizar su espacio para reflejar su estilo de vida." },
  { title: "Clientes que valoran el detalle", desc: "Esperan materialidad, acabados y un nivel de ejecución acorde a un proyecto de alto nivel." },
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
  // Familias / hogar — house
  <svg key="hogar" {...svgProps}>
    <path d="M3 11 12 4l9 7" />
    <path d="M5 10v10h14V10" />
    <path d="M10 20v-6h4v6" />
  </svg>,
  // Remodelar — refresh
  <svg key="remodelar" {...svgProps}>
    <polyline points="21 4 21 9 16 9" />
    <polyline points="3 20 3 15 8 15" />
    <path d="M19.5 9A8 8 0 0 0 6 5.7L3 9m18 6-3 3.3A8 8 0 0 1 4.5 15" />
  </svg>,
  // Departamento premium — building
  <svg key="departamento" {...svgProps}>
    <path d="M4 3h10v18H4z" />
    <path d="M14 8h6v13h-6" />
    <path d="M7 7h4M7 11h4M7 15h4" />
  </svg>,
  // Detalle — sparkle
  <svg key="detalle" {...svgProps}>
    <path d="M12 3c.6 4 1.9 5.4 6 6-4.1.6-5.4 2-6 6-.6-4-1.9-5.4-6-6 4.1-.6 5.4-2 6-6Z" />
  </svg>,
];

const pasos = [
  { title: "Diagnóstico y objetivos", desc: "Entendemos tu operación, tu marca y la meta del proyecto." },
  { title: "Concepto y anteproyecto", desc: "Definimos la dirección estética y el layout del espacio." },
  { title: "Alcance y especificaciones", desc: "Aterrizamos materiales, acabados y detalles para decidir con claridad." },
  { title: "Presupuesto y calendario", desc: "Presentamos un presupuesto preciso y un calendario de obra realista." },
  { title: "Ejecución, supervisión y entrega", desc: "Coordinamos la obra de principio a fin y entregamos listo para operar." },
];

const pic = (slug: string, i = 0) => {
  const p = getProject(slug)!;
  return p.galeria[i] ?? p.cover;
};

const alcances = [
  { title: "Diseño Arquitectónico Residencial", desc: "Proyecto y distribución de la casa o residencia, del concepto a los planos ejecutivos.", image: pic("terraza-pangea", 0) },
  { title: "Diseño de Interiores de Casas", desc: "Materiales, acabados, iluminación y mobiliario que dan carácter a cada espacio del hogar.", image: pic("edificio-vh", 0) },
  { title: "Diseño de Fachadas", desc: "Renovación y diseño de la imagen exterior, integrando la vivienda a su entorno.", image: pic("tp-zentralia", 0) },
  { title: "Remodelación y Adecuaciones", desc: "Renovación de residencias existentes, optimizando lo que ya funciona sin perder control.", image: pic("valle-alto-club-de-golf", 0) },
  { title: "Mobiliario a Medida", desc: "Piezas y carpinterías especiales diseñadas para el espacio y el estilo de vida del cliente.", image: pic("edificio-vh", 1) },
  { title: "Ejecución y Coordinación de Obra", desc: "Administración, supervisión y gestión de obra para entregar la residencia en tiempo y presupuesto.", image: pic("terraza-pangea", 1) },
];

const diferenciadores = [
  { title: "Diseño + ejecución", desc: "Un solo estándar de principio a fin, sin fragmentar responsabilidades." },
  { title: "Planeación y precisión", desc: "Claridad de alcances que permite presupuestos precisos." },
  { title: "Enfoque premium", desc: "Detalle, materialidad y coherencia estética." },
  { title: "Coordinación integral", desc: "Menos fricción entre proveedores, más control de tiempos y calidad." },
];

const subInk = { color: "var(--anta-ink-30)" };

export default function ArquitecturaResidencialPage() {
  const heroImg = getProject("terraza-pangea")!.cover;
  const queEsImg = getProject("edificio-vh")!.cover;
  const nosotrosImg = getProject("tp-zentralia")!.cover;
  // TODO: placeholder — reemplazar por proyectos residenciales reales cuando existan.
  const residencial = ["terraza-pangea", "edificio-vh", "tp-zentralia", "valle-alto-club-de-golf"].flatMap((s) => {
    const p = getProject(s);
    return p ? [p as Project] : [];
  });

  return (
    <>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 20 }}>
        <NavBar theme="dark" links={navLinks} cta="Solicitar propuesta" />
      </div>

      {/* 1 · HERO */}
      <header className={styles.hero}>
        <ParallaxImage src={heroImg} alt="Residencia — arquitectura residencial de Anta Estudio" priority sizes="100vw" className={styles.heroMedia} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <RevealLines as="h1" className={styles.heroTitle}>
            Arquitectura Residencial
          </RevealLines>
          <StaggerReveal>
            <p className={styles.heroSub}>
              Diseñamos y construimos casas, departamentos y residencias premium en Monterrey y San
              Pedro. Un proyecto integral —del plano a la obra terminada— donde la arquitectura, el
              interiorismo y el detalle se integran en una experiencia coherente de habitar. Más de 15
              años de experiencia.
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
              Arquitectura e interiorismo residencial
            </p>
            <RevealLines as="h2" className={shared.h2}>
              ¿Qué es la Arquitectura Residencial?
            </RevealLines>
            <p className={`${shared.body} ${styles.lead}`}>
              La arquitectura residencial es el diseño y la construcción de una casa o residencia como
              un proyecto completo, desde la conceptualización y los planos hasta la ejecución de la
              obra. No se trata solo de cómo se ve un espacio, sino de cómo se vive: la distribución,
              la luz, los materiales y el detalle trabajando juntos para crear un hogar a la medida de
              quien lo habita. En Anta Estudio acompañamos cada residencia de principio a fin,
              cuidando tanto el diseño como la calidad de la obra.
            </p>
            <p className={`${shared.body} ${styles.leadBody}`}>
              Diseñamos casas, departamentos y residencias premium en Monterrey y San Pedro Garza
              García, integrando arquitectura, interiorismo y ejecución bajo un mismo estándar para
              que el resultado final sea fiel a la intención original.
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
                Diseñado para familias y propietarios que construyen, remodelan o personalizan su
                hogar — y para quienes valoran el detalle y la calidad de obra en cada espacio.
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

      {/* 4 · PROYECTOS RESIDENCIALES */}
      <section className={shared.section}>
        <div className={shared.wrap}>
          <div className={styles.headRow}>
            <div className={styles.headText}>
              <RevealLines as="h2" className={shared.h2}>
                Proyectos Residenciales
              </RevealLines>
              <p className={`${shared.sub} ${styles.headSub}`}>
                Una selección de casas y residencias donde la arquitectura, los interiores y la
                ejecución se integran en una experiencia coherente de habitar.
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
          {residencial.map((p) => (
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

      {/* 6 · ALCANCE DEL SERVICIO — tabs (mismo diseño que "Servicio Integral") */}
      <IntegralSection
        id="alcance"
        tone="white"
        heading="Alcance del Servicio"
        intro="Contigo en cada etapa: nos encargamos de todo lo que tu proyecto residencial necesita, bajo un mismo estándar de calidad."
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
              Por qué nuestros clientes nos eligen para construir su hogar.
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
              alt="Proyecto residencial de Anta Estudio"
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
              desarrollado proyectos residenciales, corporativos y comerciales, acompañando a nuestros
              clientes desde el análisis y la conceptualización hasta la gerencia y supervisión de
              obra. En el ámbito residencial, esto significa hogares diseñados a la medida de cada
              familia y construidos con un estándar que perdura.
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
        title="¿Buscas Arquitectura Residencial en Monterrey?"
        body="Nos encantaría conocer tu proyecto. En Anta Estudio combinamos diseño, ejecución y más de 15 años de experiencia para crear hogares a la medida de quien los habita, cuidando cada detalle del plano a la obra."
      />

      <Footer />
    </>
  );
}
