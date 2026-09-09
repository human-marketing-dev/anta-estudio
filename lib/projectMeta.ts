/**
 * Ficha técnica por proyecto (mantenido a mano). Se llena conforme haya datos;
 * los campos ausentes muestran un placeholder en la UI.
 *
 * Ejemplo:
 *   "oh-darling": {
 *     uso: "Comercial",
 *     servicio: { label: "Arquitectura e Interiorismo Comercial", href: "/servicios/arquitectura-comercial" },
 *     ubicacion: "Monterrey, Nuevo León",
 *     alcance: "Diseño y ejecución",
 *     superficie: "150 m²",
 *     colaboracion: "LOL Arquitectura",
 *   },
 */
export interface ProjectMeta {
  /** Comercial · Corporativo · Residencial (exactamente estas tres, para filtrar). */
  uso?: "Comercial" | "Corporativo" | "Residencial";
  /** Nombre completo del servicio + su service page. */
  servicio?: { label: string; href: string };
  /** "Ciudad, Estado" — ej. "Monterrey, Nuevo León". */
  ubicacion?: string;
  alcance?: "Diseño" | "Diseño y ejecución" | "Ejecución";
  /** Con espacio y ² real — ej. "150 m²". */
  superficie?: string;
  /** Opcional — solo cuando aplica. Ej. "LOL Arquitectura". */
  colaboracion?: string;
}

const COMERCIAL = { label: "Arquitectura e Interiorismo Comercial", href: "/servicios/arquitectura-comercial" };
const CORPORATIVO = { label: "Arquitectura e Interiorismo Corporativo", href: "/servicios/arquitectura-corporativa" };
const RESIDENCIAL = { label: "Arquitectura e Interiorismo Residencial", href: "/servicios/arquitectura-residencial" };

export const projectMeta: Record<string, ProjectMeta> = {
  // Comercial
  "cafe-laurel": { uso: "Comercial", servicio: COMERCIAL },
  "valle-alto-club-de-golf-areas-comunes": { uso: "Comercial", servicio: COMERCIAL },
  "valle-alto-club-de-golf-hoyo-19-damas": { uso: "Comercial", servicio: COMERCIAL },
  "valle-alto-club-de-golf-gimnasio": { uso: "Comercial", servicio: COMERCIAL },
  "ludoteca-valle-alto": { uso: "Comercial", servicio: COMERCIAL },
  "terraza-pangea": { uso: "Comercial", servicio: COMERCIAL },
  "casa-liebre": { uso: "Comercial", servicio: COMERCIAL },
  nailz: { uso: "Comercial", servicio: COMERCIAL },
  "crispy-pollo": { uso: "Comercial", servicio: COMERCIAL },
  kampai: { uso: "Comercial", servicio: COMERCIAL },
  // Corporativo
  "e-80": { uso: "Corporativo", servicio: CORPORATIVO },
  majadma: { uso: "Corporativo", servicio: CORPORATIVO },
  "majadma-cemex": { uso: "Corporativo", servicio: CORPORATIVO },
  "tp-zentralia": { uso: "Corporativo", servicio: CORPORATIVO },
  "edificio-vh": { uso: "Corporativo", servicio: CORPORATIVO },
  // Residencial
  "casa-arbol": { uso: "Residencial", servicio: RESIDENCIAL },
  mirasierra: { uso: "Residencial", servicio: RESIDENCIAL },
  colibri: { uso: "Residencial", servicio: RESIDENCIAL },
  livin: { uso: "Residencial", servicio: RESIDENCIAL },
  "departamente-bw-2204": { uso: "Residencial", servicio: RESIDENCIAL },
  "san-patricio": { uso: "Residencial", servicio: RESIDENCIAL },
  "casa-bosques": { uso: "Residencial", servicio: RESIDENCIAL },
  "casa-san-jeronimo": { uso: "Residencial", servicio: RESIDENCIAL },
};

export function getProjectMeta(slug: string): ProjectMeta {
  return projectMeta[slug] ?? {};
}
