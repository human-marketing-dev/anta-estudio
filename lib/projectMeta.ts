/**
 * Ficha técnica por proyecto (mantenido a mano). Se llena conforme haya datos;
 * los campos ausentes muestran un placeholder en la UI (excepto Colaboración,
 * que solo aparece cuando el proyecto la tiene).
 *
 * Ejemplo:
 *   "oh-darling": {
 *     uso: "Comercial",
 *     servicio: { label: "Arquitectura e Interiorismo Comercial", href: "/servicios/arquitectura-comercial" },
 *     ubicacion: "Monterrey, Nuevo León",
 *     colaboracion: "LOL Arquitectura",
 *   },
 */
export interface ProjectMeta {
  /** Comercial · Corporativo · Residencial (exactamente estas tres, para filtrar). */
  uso?: "Comercial" | "Corporativo" | "Residencial";
  /** Nombre completo del servicio + su service page. */
  servicio?: { label: string; href: string };
  /** "Ciudad, Estado" — ej. "Monterrey, N.L.". */
  ubicacion?: string;
  /** Opcional — solo cuando aplica. Ej. "LOL Arquitectura". */
  colaboracion?: string;
}

const COMERCIAL = { label: "Arquitectura e Interiorismo Comercial", href: "/servicios/arquitectura-comercial" };
const CORPORATIVO = { label: "Arquitectura e Interiorismo Corporativo", href: "/servicios/arquitectura-corporativa" };
const RESIDENCIAL = { label: "Arquitectura e Interiorismo Residencial", href: "/servicios/arquitectura-residencial" };

export const projectMeta: Record<string, ProjectMeta> = {
  // Comercial
  "cafe-laurel": { uso: "Comercial", servicio: COMERCIAL, ubicacion: "San Pedro Garza García, N.L.", colaboracion: "Arquitectura 911" },
  "valle-alto-club-de-golf-areas-comunes": { uso: "Comercial", servicio: COMERCIAL, ubicacion: "Monterrey, N.L." },
  "valle-alto-club-de-golf-hoyo-19-damas": { uso: "Comercial", servicio: COMERCIAL, ubicacion: "Monterrey, N.L." },
  "valle-alto-club-de-golf-gimnasio": { uso: "Comercial", servicio: COMERCIAL, ubicacion: "Monterrey, N.L." },
  "ludoteca-valle-alto": { uso: "Comercial", servicio: COMERCIAL, ubicacion: "Monterrey, N.L." },
  "terraza-pangea": { uso: "Comercial", servicio: COMERCIAL, ubicacion: "San Pedro Garza García, N.L.", colaboracion: "Arquitectura 911" },
  "casa-liebre": { uso: "Comercial", servicio: COMERCIAL },
  nailz: { uso: "Comercial", servicio: COMERCIAL, ubicacion: "San Pedro Garza García, N.L." },
  "crispy-pollo": { uso: "Comercial", servicio: COMERCIAL },
  kampai: { uso: "Comercial", servicio: COMERCIAL, ubicacion: "San Pedro Garza García, N.L." },
  // Corporativo
  "e-80": { uso: "Corporativo", servicio: CORPORATIVO, ubicacion: "Monterrey, N.L." },
  majadma: { uso: "Corporativo", servicio: CORPORATIVO, ubicacion: "Santa Catarina, N.L." },
  "majadma-cemex": { uso: "Corporativo", servicio: CORPORATIVO, ubicacion: "Santa Catarina, N.L." },
  "tp-zentralia": { uso: "Corporativo", servicio: CORPORATIVO },
  "edificio-vh": { uso: "Corporativo", servicio: CORPORATIVO },
  "rivero-gonzalez": { uso: "Corporativo", servicio: CORPORATIVO, ubicacion: "San Pedro Garza García, N.L.", colaboracion: "LOL Arquitectura" },
  // Residencial
  "casa-arbol": { uso: "Residencial", servicio: RESIDENCIAL, ubicacion: "San Pedro Garza García, N.L.", colaboracion: "Herbert Carrington" },
  mirasierra: { uso: "Residencial", servicio: RESIDENCIAL, ubicacion: "San Pedro Garza García, N.L." },
  colibri: { uso: "Residencial", servicio: RESIDENCIAL, ubicacion: "Monterrey, N.L." },
  livin: { uso: "Residencial", servicio: RESIDENCIAL, ubicacion: "Monterrey, N.L." },
  "departamente-bw-2204": { uso: "Residencial", servicio: RESIDENCIAL },
  "san-patricio": { uso: "Residencial", servicio: RESIDENCIAL, ubicacion: "San Pedro Garza García, N.L." },
  "casa-bosques": { uso: "Residencial", servicio: RESIDENCIAL, ubicacion: "San Pedro Garza García, N.L." },
  "casa-san-jeronimo": { uso: "Residencial", servicio: RESIDENCIAL, ubicacion: "Monterrey, N.L." },
  "torre-shiro": { uso: "Residencial", servicio: RESIDENCIAL, ubicacion: "Monterrey, N.L." },
};

export function getProjectMeta(slug: string): ProjectMeta {
  return projectMeta[slug] ?? {};
}
