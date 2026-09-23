# Accesibilidad

## Medidas aplicadas
- **Foco visible por teclado**: regla global `:focus-visible` (contorno rosa
  2px) en links, botones, campos y el dropdown de Servicios (`app/globals.css`).
- **Formularios**: `id` + `htmlFor` asociados en los dos formularios (contacto y
  CTA de cierre).
- **Landmark `<main>`** en todas las páginas.

## Contraste (WCAG AA) — a vigilar
- **Rosa de marca** `--anta-pink` (#b5519e) sobre blanco: **4.52:1** — pasa AA
  para texto normal **por margen mínimo**. Si se ajusta la paleta, revisar que
  no baje de 4.5:1; para texto rosa chico existe `--anta-pink-dark` (#8e3f7c,
  **6.7:1**) como alternativa segura.
- `--anta-ink-30` solo debe usarse **sobre fondo tinta** (ahí da 8.9:1); sobre
  blanco falla (2:1).
- Etiquetas chicas sobre fondo claro usan `--anta-ink-70` (6.9:1). El footer usa
  `--anta-ink-50` sobre tinta (5:1 ✓); el tab de Integral usa `--anta-ink-50`
  pero es texto grande (pasa AA large).

## Pendiente de validar en navegador (no es código)
- Recorrer con **Tab** que el foco se vea en todos los interactivos.
- Prueba con lector de pantalla (orden de lectura, labels, landmarks).
