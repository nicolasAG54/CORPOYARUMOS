# Plan del sistema de diseño

## Objetivo

Crear un sistema Angular/CSS propio, pequeño y coherente, que soporte contenido institucional, proyectos, mapas, publicaciones, documentos, convocatorias y formularios. No se parte de una librería visual genérica. Las primitivas accesibles pueden apoyarse en Angular CDK cuando aporten comportamiento, sin heredar una estética de dashboard.

## Capas

1. **Foundations:** color, tipografía, espacio, grid, foco, iconografía y movimiento.
2. **Primitives:** link, button, icon, input, textarea, select, checkbox, dialog/panel, disclosure.
3. **Editorial:** media, caption, pull quote, chapter header, metadata row, evidence figure.
4. **Domain:** project dossier, territory index, publication shelf, document ledger, call status, certificate result.
5. **Templates:** homepage, índice, proyecto, capacidad, publicación, transparencia, formulario.

## Tokens de color

```css
:root {
  --color-bg: #f3f4ed;
  --color-surface: #ffffff;
  --color-ink: #17241b;
  --color-ink-muted: #506057;
  --color-border: #c8cec4;
  --color-primary: #244b32;
  --color-primary-hover: #1b3b27;
  --color-secondary: #347d87;
  --color-leaf: #5e7f52;
  --color-accent: #e2b93f;
  --color-danger: #a63a32;
  --color-success: #386b45;
  --color-focus: #1268a5;
}
```

Los valores se validarán con contraste WCAG 2.2 AA en estados normales, hover, focus y disabled. Amarillo cosecha no se usa como texto sobre mineral sin prueba; funciona como regla, indicador o fondo con tinta.

## Tipografía

Hipótesis: Literata + Public Sans, máximo dos familias.

| Rol | Familia | Rango fluido sugerido | Uso |
|---|---|---:|---|
| Display | Literata | `clamp(3.25rem, 7vw, 7rem)` | Hero, máximo 2–3 líneas |
| H1 interno | Literata | `clamp(2.5rem, 5vw, 5rem)` | Título de página |
| H2 | Literata | `clamp(2rem, 3.4vw, 3.75rem)` | Capítulos |
| H3 | Literata/Public Sans | `clamp(1.5rem, 2vw, 2.25rem)` | Títulos de bloque |
| Lead | Public Sans | `clamp(1.125rem, 1.4vw, 1.375rem)` | Introducción |
| Body | Public Sans | `1rem–1.125rem` | 60–75 caracteres por línea |
| Small/data | Public Sans | `0.8125rem–0.9375rem` | Metadatos, nunca texto esencial diminuto |

Reglas:

- Cuerpo mínimo 16 px en móvil.
- `line-height` 1.5–1.7 en texto largo; 0.94–1.08 en display según prueba.
- Titulares con balance controlado; no llenar media pantalla con seis líneas.
- Mayúsculas con tracking solo para etiquetas breves.
- Cargar WOFF2 locales, `font-display: swap`, pesos 400/600 y solo los necesarios.

## Espaciado y grid

Escala base de 4 px:

```text
1: 4   2: 8   3: 12   4: 16   5: 20   6: 24
8: 32  10: 40  12: 48  16: 64  20: 80  24: 96
32: 128  40: 160
```

- Contenedor máximo inicial: 1440 px; ancho de lectura 720–780 px.
- Grid desktop: 12 columnas; tablet: 6; móvil: 4.
- Gutter fluido: 16 px móvil, 24–32 px tablet, 32–48 px desktop.
- Separación de secciones: `clamp(4.5rem, 9vw, 10rem)`, ajustada por densidad, no como valor universal.
- Las alineaciones rompen el grid solo con propósito: fotografía dominante, mapa o transición editorial.

## Breakpoints y pruebas

Los breakpoints responden al contenido, no a dispositivos específicos. Puntos iniciales:

- 360, 390, 430 px: móvil.
- 768, 820 px: tablet vertical.
- 1024 px: tablet horizontal/portátil pequeño.
- 1280, 1440 px: desktop.
- 1920 px: escritorio amplio.

Se probará también 320 px, zoom 200% y reflow a 400% donde corresponda. No se crearán componentes desktop y mobile duplicados si CSS puede recomponer uno semántico.

## Forma, bordes y elevación

- Control: radio 4 px.
- Medio editorial: 0–8 px según el componente, sin alternar arbitrariamente.
- Píldora: solo estado, etiqueta o filtro compacto.
- Bordes: 1 px para separación; 2 px para foco/selección cuando sea necesario.
- Sombras: una elevación suave solo para panel flotante o dialog; el resto usa color y reglas.
- Ningún efecto de vidrio o sombra negra profunda.

## Componentes base

### Navegación

- `SiteHeader`, `UtilityNav`, `PrimaryNav`, `MobileNavPanel`, `Breadcrumbs`.
- El menú móvil atrapa foco, se cierra con Escape, restaura foco y bloquea scroll correctamente.
- Estados actuales con texto/forma además de color.

### Acciones

- `Button` primario, secundario y text-link.
- No más de una acción primaria por región.
- Área táctil mínima 44×44 px; feedback de presión `scale(.97)`.

### Formularios

- Label visible, descripción, error y ayuda asociados por ID.
- Estados: default, hover, focus, filled, invalid, disabled, loading, success.
- No usar placeholder como label.
- Mensajes de error específicos y resumen al enviar.
- Honeypot/rate limit donde aplique; captcha solo si el riesgo lo justifica y con alternativa accesible.

### Contenido editorial

- `ResponsiveImage` con fuente, alt, caption, credit y focal point.
- `ChapterHeader` con título y apoyo; sin numeración decorativa obligatoria.
- `MetadataList` semántica `<dl>`.
- `EvidenceFigure` con valor, unidad, alcance, periodo y fuente.
- `PublicationItem` con cubierta, metadatos y descarga.

### Dominio

| Componente | Responsabilidad | Semántica clave |
|---|---|---|
| ProjectDossier | Resumen verificable de proyecto | `<article>`, `<dl>`, fuentes |
| ProjectIndex | Listado y filtros | URL sincronizada, `aria-live` mesurado |
| TerritoryIndex | Mapa + lista equivalente | SVG/canvas no reemplaza enlaces HTML |
| DocumentLedger | Documentos por año/tipo | tabla/lista según viewport, tamaño/formato |
| CallStatus | Estado por fechas | texto, icono y fecha; no solo color |
| CertificateLookup | Consulta segura | privacidad, límites y resultado neutro |
| FommurStatus | Estado de programa | fuente/fecha de actualización visibles |

## Iconografía

- Una sola familia lineal, preferiblemente Lucide cuando cubra el dominio.
- Tamaños 16/20/24 px y trazo consistente.
- SVG inline controlado para mapas, hojas, agua y símbolos territoriales específicos.
- Todo icono de acción tiene label accesible; los decorativos usan `aria-hidden="true"`.

## Movimiento

Basado en los principios de Emil Kowalski:

| Interacción | Duración | Curva | Propiedades |
|---|---:|---|---|
| Hover/focus visual | 120–180 ms | ease-out | color, border, opacity |
| Menú/panel entra | 200–240 ms | ease-out | transform + opacity |
| Menú/panel sale | 160–200 ms | ease-in | transform + opacity |
| Reordenamiento/filtro | 180–260 ms | ease-in-out | transform; View Transitions si es progresivo |
| Revelado editorial puntual | 500–700 ms | cubic-bezier suave | clip-path/opacity, sin bloquear lectura |
| Press | 80–120 ms | ease-out | transform scale(.97) |

Reglas:

- No animar `height`, `width`, `top` o `left` en secuencias frecuentes.
- No iniciar desde `scale(0)`.
- Transform-origin coincide con el disparador en popovers.
- Hover solo para puntero fino.
- Las animaciones son interrumpibles y no bloquean entrada.
- Reduced motion elimina movimiento espacial y scroll-linked; estados siguen siendo comprensibles.

## Accesibilidad

- Objetivo WCAG 2.2 AA.
- Foco visible de 2–3 px con offset suficiente en todos los fondos.
- Skip link, landmarks, H1 único y jerarquía continua.
- Texto alternativo contextual y captions separados.
- Contraste 4.5:1 para texto normal, 3:1 para texto grande y UI esencial.
- Reflow sin pérdida a 320 px y zoom.
- Formularios compatibles con autofill/autocomplete apropiado.
- Mapas, gráficas y filtros con equivalente textual.
- Estados y errores no dependen solo de color.
- Navegación completa por teclado y lector de pantalla en Playwright + pruebas manuales.

## Temas

Se adopta un tema claro institucional para la primera versión. No se añadirá modo oscuro por obligación estética: incrementaría superficie de QA sin una necesidad de usuario documentada. Sí se respetarán preferencias de contraste y reduced motion. Un tema oscuro solo entra con requisito y validación de fotografía, documentos, mapas y marca.

## Documentación en Figma y código

Una vez restablecida la cuota y aprobado un comp:

- Figma: variables de color/espacio/tipo, grid, componentes y estados, desktop/tablet/mobile.
- Código: custom properties, Angular standalone components, Storybook o catálogo equivalente solo si compensa el tamaño del sistema.
- Nombres compartidos entre diseño y código: `color.primary`, `space.6`, `type.h2`, `motion.panel.enter`.
- Cada componente documenta propósito, contenido permitido, estados, accesibilidad y ejemplos reales.

## Criterios de madurez

El sistema está listo cuando:

- la homepage y dos plantillas internas se construyen sin tokens ad hoc;
- formularios, mapa/lista y navegación funcionan con teclado;
- los estados de convocatoria y documentos no requieren estilos específicos por página;
- no hay más de dos familias tipográficas ni radios/sombras improvisados;
- Playwright cubre viewport, navegación y flujos críticos;
- el diseño aprobado en Figma y el código comparten estructura y no solo paleta.

