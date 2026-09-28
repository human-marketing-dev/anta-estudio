import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { CONTACT } from "@/lib/site";
import { buildMetadata, breadcrumbList } from "@/lib/seo";
import shared from "@/components/home/home.module.css";
import styles from "./aviso.module.css";

export const metadata = buildMetadata({
  title: "Aviso de Privacidad | Anta Estudio",
  description:
    "Aviso de privacidad de Anta Estudio: qué datos personales recabamos en nuestros formularios, para qué los usamos, cookies y analítica, y cómo ejercer tus derechos ARCO.",
  path: "/aviso-de-privacidad",
});

// Actualizar esta fecha cada vez que cambie el contenido del aviso.
const ULTIMA_ACTUALIZACION = "28 de septiembre de 2026";

export default function AvisoDePrivacidadPage() {
  const correo = (
    <a href={`mailto:${CONTACT.correo}`} className={styles.link}>
      {CONTACT.correo}
    </a>
  );

  return (
    <>
      <JsonLd
        data={breadcrumbList([
          { name: "Inicio", path: "/" },
          { name: "Aviso de privacidad", path: "/aviso-de-privacidad" },
        ])}
      />
      <NavBar theme="light" cta="Solicitar propuesta" />

      <main>
        <section className={shared.section}>
          <div className={shared.wrap}>
            <article className={styles.doc}>
              <header>
                <p className={styles.eyebrow}>
                  <span className={styles.eyebrowTick} />
                  Legal
                </p>
                <h1 className={styles.title}>Aviso de privacidad</h1>
                <p className={`${shared.body} ${styles.updated}`}>
                  Última actualización: {ULTIMA_ACTUALIZACION}
                </p>
                <p className={`${shared.body} ${styles.p}`}>
                  En Anta Estudio cuidamos los datos personales que nos compartes. Este aviso explica
                  qué datos recabamos, para qué los usamos, con quién los compartimos y cómo puedes
                  ejercer tus derechos, conforme a la Ley Federal de Protección de Datos Personales en
                  Posesión de los Particulares.
                </p>
              </header>

              <section className={styles.block}>
                <h2 className={shared.h3}>1. Quién es responsable de tus datos</h2>
                <p className={`${shared.body} ${styles.p}`}>
                  Anta Estudio, con domicilio en {CONTACT.direccion.completa}, es responsable del uso
                  y protección de tus datos personales. Para cualquier tema relacionado con este aviso
                  puedes escribirnos a {correo}.
                </p>
              </section>

              <section className={styles.block}>
                <h2 className={shared.h3}>2. Qué datos recabamos</h2>
                <p className={`${shared.body} ${styles.p}`}>
                  Cuando llenas uno de los formularios de contacto del sitio, recabamos:
                </p>
                <ul className={`${shared.body} ${styles.list}`}>
                  <li>Nombre.</li>
                  <li>Correo electrónico.</li>
                  <li>Teléfono (opcional).</li>
                  <li>Tipo de proyecto (opcional).</li>
                  <li>El mensaje que nos escribes (opcional).</li>
                </ul>
                <p className={`${shared.body} ${styles.p}`}>
                  No solicitamos datos personales sensibles. Te pedimos no incluirlos en el mensaje.
                  Además, al navegar el sitio se recaban datos técnicos de forma automática, que se
                  describen en la sección 5.
                </p>
              </section>

              <section className={styles.block}>
                <h2 className={shared.h3}>3. Para qué usamos tus datos</h2>
                <p className={`${shared.body} ${styles.p}`}>
                  Usamos tus datos personales para:
                </p>
                <ul className={`${shared.body} ${styles.list}`}>
                  <li>Atender tu solicitud de contacto y responder tus preguntas.</li>
                  <li>
                    Dar seguimiento comercial a tu solicitud: preparar una propuesta, enviarte una
                    cotización y mantenerte al tanto del proceso.
                  </li>
                </ul>
                <p className={`${shared.body} ${styles.p}`}>
                  Estas finalidades son necesarias para atender lo que nos pides. No vendemos tus
                  datos ni los usamos para enviarte publicidad ajena a tu solicitud. Conservamos tus
                  datos solo el tiempo necesario para cumplir estas finalidades.
                </p>
              </section>

              <section className={styles.block}>
                <h2 className={shared.h3}>4. Con quién compartimos tus datos</h2>
                <p className={`${shared.body} ${styles.p}`}>
                  Para operar el sitio nos apoyamos en proveedores que tratan datos por cuenta de
                  Anta Estudio, solo para prestarnos su servicio y bajo nuestras instrucciones:
                </p>
                <ul className={`${shared.body} ${styles.list}`}>
                  <li>
                    El servicio de envío de correo (Brevo), que nos hace llegar el contenido de los
                    formularios.
                  </li>
                  <li>
                    Las herramientas de analítica web (Google Tag Manager y Google Analytics), que
                    miden cómo se usa el sitio.
                  </li>
                </ul>
                <p className={`${shared.body} ${styles.p}`}>
                  Estos proveedores pueden almacenar la información en servidores fuera de México.
                  Fuera de ellos, no compartimos tus datos con terceros, salvo cuando una autoridad
                  competente lo requiera conforme a la ley.
                </p>
              </section>

              <section className={styles.block}>
                <h2 className={shared.h3}>5. Cookies y analítica web</h2>
                <p className={`${shared.body} ${styles.p}`}>
                  El sitio usa cookies y tecnologías similares de Google Analytics, administradas a
                  través de Google Tag Manager. Nos permiten saber cuántas personas visitan el sitio,
                  qué páginas consultan y cómo llegan a él, para mejorar su contenido. Con ellas se
                  recaban datos como:
                </p>
                <ul className={`${shared.body} ${styles.list}`}>
                  <li>Dirección IP y ubicación aproximada (ciudad o región).</li>
                  <li>Tipo de navegador, sistema operativo y dispositivo.</li>
                  <li>Páginas visitadas, tiempo de permanencia y sitio de procedencia.</li>
                </ul>
                <p className={`${shared.body} ${styles.p}`}>
                  Usamos esta información de forma agregada y no la relacionamos con los datos de los
                  formularios. Puedes bloquear o borrar las cookies desde la configuración de tu
                  navegador, o evitar que Google Analytics registre tu visita con el{" "}
                  <a
                    href="https://tools.google.com/dlpage/gaoptout"
                    className={styles.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    complemento de inhabilitación de Google Analytics
                  </a>
                  . El sitio sigue funcionando sin ellas.
                </p>
              </section>

              <section className={styles.block}>
                <h2 className={shared.h3}>6. Tus derechos ARCO</h2>
                <p className={`${shared.body} ${styles.p}`}>
                  Tienes derecho a conocer qué datos tenemos y cómo los usamos (Acceso), a pedir que
                  los corrijamos si son incorrectos o están incompletos (Rectificación), a pedir que
                  los eliminemos (Cancelación) y a oponerte a que los usemos para ciertos fines
                  (Oposición).
                </p>
                <p className={`${shared.body} ${styles.p}`}>
                  Para ejercerlos, envía un correo a {correo} con lo siguiente:
                </p>
                <ul className={`${shared.body} ${styles.list}`}>
                  <li>Tu nombre y el correo o medio por el que quieres recibir la respuesta.</li>
                  <li>
                    Una copia de tu identificación oficial o, si actúa un representante, la de éste y
                    el documento que acredite su representación.
                  </li>
                  <li>El derecho que quieres ejercer y una descripción clara de tu solicitud.</li>
                  <li>Cualquier dato que nos ayude a localizar tu información.</li>
                </ul>
                <p className={`${shared.body} ${styles.p}`}>
                  Te responderemos en un máximo de 20 días hábiles a partir de que recibamos tu
                  solicitud. Si procede, la haremos efectiva dentro de los 15 días hábiles
                  siguientes a nuestra respuesta.
                </p>
              </section>

              <section className={styles.block}>
                <h2 className={shared.h3}>7. Cómo revocar tu consentimiento o limitar el uso de tus datos</h2>
                <p className={`${shared.body} ${styles.p}`}>
                  Puedes revocar en cualquier momento el consentimiento que nos diste para usar tus
                  datos, o pedirnos que limitemos su uso o divulgación, escribiendo a {correo} con los
                  mismos requisitos de la sección anterior. Responderemos en los mismos plazos.
                </p>
                <p className={`${shared.body} ${styles.p}`}>
                  Ten en cuenta que, si revocas tu consentimiento, es posible que ya no podamos dar
                  seguimiento a tu solicitud. La revocación no tiene efectos sobre el uso que se haya
                  hecho antes de ella.
                </p>
              </section>

              <section className={styles.block}>
                <h2 className={shared.h3}>8. Cambios a este aviso</h2>
                <p className={`${shared.body} ${styles.p}`}>
                  Podemos actualizar este aviso por cambios en la ley, en nuestros servicios o en las
                  herramientas que usamos. Cualquier cambio se publicará en esta página, con la fecha
                  de última actualización al inicio.
                </p>
              </section>

              <section className={styles.block}>
                <h2 className={shared.h3}>9. Tu consentimiento</h2>
                <p className={`${shared.body} ${styles.p}`}>
                  Al enviarnos tus datos por medio de los formularios del sitio, confirmas que
                  leíste este aviso y que estás de acuerdo con el uso de tus datos descrito en él. Si
                  consideras que tu derecho a la protección de datos personales fue vulnerado, puedes
                  acudir a la autoridad competente en la materia.
                </p>
              </section>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
