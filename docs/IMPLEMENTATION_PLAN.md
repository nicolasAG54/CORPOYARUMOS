# Plan de implementación

## Estado de partida

El repositorio estaba vacío al iniciar la auditoría: no había aplicación Angular, `package.json`, Git ni índice `.codegraph/`. La base de producción ya fue inicializada y la primera entrega navegable quedó implementada.

Entorno observado:

- Windows / PowerShell.
- Node.js 24.13.0.
- npm 11.6.2.

La matriz oficial confirmó que Angular 22 exige Node.js `^24.15.0`, mientras Angular 21 admite `^24.0.0`. Se fijó Angular 21.2.21, compatible con el Node 24.13.0 disponible, sin modificar el toolchain del sistema.

## Decisión técnica propuesta

### Angular

- Angular standalone components, strict mode y TypeScript estricto.
- Signals para estado local derivado; RxJS para flujos asíncronos reales, no como contenedor universal.
- Angular Router con lazy loading por dominio.
- Formularios reactivos tipados.
- Angular CDK solo para primitives complejas accesibles cuando aporte valor.
- CSS nativo moderno, custom properties y capas; sin framework visual genérico.

La versión exacta se bloquea al empezar la fase de construcción, después de revisar compatibilidad oficial y estrategia de despliegue.

### Renderizado

Recomendación: **híbrido con prerender/SSG como base**.

- Prerender: inicio, corporación, capacidades, proyectos publicados, publicaciones, transparencia y páginas legales.
- SSR bajo demanda: solo si convocatorias, contenidos o metadatos cambian fuera del ciclo de despliegue y existe backend/CMS.
- CSR puntual: filtros, mapa, buscador, formularios y consultas autenticadas/no indexables.
- FOMMUR y certificados no deben incrustarse en HTML estático; consumen un contrato seguro.

Ventajas: HTML indexable, buen tiempo de primera lectura, resiliencia y costo operativo predecible. La decisión final depende del hosting y de quién actualiza contenido.

## Fuentes de contenido

### Primera entrega

Archivos de datos tipados y versionados en el repositorio (`content/` o JSON validado por schema) permiten migrar con control antes de decidir CMS. Esto evita hardcodear textos dentro de componentes.

### Evolución

Adoptar CMS solo si se confirman:

- frecuencia de publicación;
- número y perfil de editores;
- revisión/aprobación;
- historial y rollback;
- presupuesto de operación;
- necesidad de publicar sin despliegue.

El modelo debe preservar source/status/reviewedAt para cifras y documentos.

## Fases

### Fase 1 — Aprobación de dirección

- Comp A — Panorama + expediente aprobado el 24 de agosto de 2026.
- Dirección de identidad Abrazo territorial aprobada; refinamiento v1 y SVG provisional producidos.
- Composición híbrida confirmada: B gobierna Territorios y C gobierna proyectos/conocimiento.
- Homepage híbrida A+B+C v1 aprobada el 25 de agosto de 2026 como referencia visual de implementación.
- Trasladar a Figma la composición elegida cuando se restablezca la cuota. El reintento del 25 de agosto de 2026 continuó bloqueado y no modificó el archivo.
- Validar tipografía, logo vectorial, fotografía hero y responsive.

**Gate:** superado el 25 de agosto de 2026. La implementación puede comenzar.

### Fase 2 — Fundaciones y contenido

- Inicializar Angular con versión/Node compatibles.
- Configurar lint, formatting, tests y Playwright.
- Implementar tokens, tipografía, layout, imagen responsive y foco.
- Crear schemas de Organization, Project, Publication, Document y Call.
- Migrar contenido verificado y marcar pendientes.
- Producir manifiesto de imágenes, licencias y créditos.

**Gate:** build, typecheck y pruebas base verdes; cero datos inventados.

### Fase 3 — Shell y homepage

- Header/utilidad/nav responsive.
- Hero seleccionado traducido a HTML semántico, no rasterizado.
- Evidencia, El Roble, capacidades, territorios, conocimiento, actualidad, CTA y footer.
- Integrar fotografía real aprobada; no usar imágenes generadas como prueba.
- Implementar reduced motion y estados de carga/error/vacío.

**Gate:** comparación visual desktop/móvil y revisión WCAG sobre la homepage.

### Fase 4 — Plantillas internas

- La Corporación y sostenibilidad.
- Qué hacemos/capacidades.
- Índice y ficha de proyectos.
- Conocimiento/publicaciones.
- Actualidad/convocatorias.
- Transparencia/documentos.

**Gate:** una plantilla por dominio aprobada y contenido fuente trazable.

### Fase 5 — Sistemas especiales

- Contacto.
- Verificación de certificados.
- FOMMUR Línea 3.
- Antispam, rate limit, auditoría, privacidad y mensajes.

**Gate:** contratos backend escritos, threat review y pruebas de abuso; si no existe backend, publicar solo información y soporte, no un formulario ficticio.

### Fase 6 — Migración, SEO y lanzamiento

- Redirecciones 301 y canonicals.
- Sitemap, robots, Open Graph y JSON-LD.
- Copias institucionales de documentos.
- Analítica mínima con consentimiento.
- Auditoría de contenido vencido.
- Plan de rollback y monitoreo.

**Gate:** checklist de lanzamiento y aprobación institucional.

## Estructura sugerida

```text
src/app/
  core/              # configuración, SEO, servicios transversales
  shell/             # header, nav, footer
  shared/
    ui/               # primitives
    editorial/        # componentes de contenido
    data/             # schemas, adapters
  features/
    organization/
    capabilities/
    projects/
    knowledge/
    news/
    transparency/
    contact/
    certificate/
    fommur/
content/
public/
  images/
  documents/
e2e/
docs/
```

No se crearán abstracciones por anticipación: un componente se extrae cuando tiene responsabilidad estable y al menos dos usos reales o complejidad propia.

## Imágenes

- Descargar maestros del sitio actual y calcular hashes.
- No hotlink a Zyro, Google Drive o Unsplash.
- Generar derivados en build o pipeline reproducible.
- `ResponsiveImage` exige dimensiones, focal point, `alt`, caption y credit.
- Preload solo del recurso LCP de cada plantilla.
- Lazy-load de mapa, YouTube y galerías.
- Nunca hacer upscale automático de originales pequeños; solicitar reemplazo.

## Rendimiento

Presupuestos iniciales a validar con datos reales:

- HTML y CSS críticos pequeños y estables.
- JavaScript de homepage sin mapa avanzado en el bundle inicial; la cartografía se difiere.
- Hero optimizado y adecuado al viewport; no servir PNG de varios MB.
- Fuentes: dos familias, pocos pesos y subconjuntos.
- Sin animaciones que ejecuten layout por frame.

Las metas de Core Web Vitals se fijarán como objetivos de campo y laboratorio tras tener un prototipo desplegado. El plan debe registrar LCP/INP/CLS, tamaño transferido y número de requests por plantilla.

## Accesibilidad y QA con Playwright

Matriz mínima:

| Área | Casos |
|---|---|
| Viewports | 320, 390, 768, 1024, 1440, 1920 px |
| Navegación | teclado, Escape, restauración de foco, ruta activa, skip link |
| Responsive | sin overflow, reflow, orientación, zoom |
| Proyectos | filtros en URL, mapa/lista equivalentes, estados vacíos |
| Documentos | enlaces, tipo/peso, descarga, fallos |
| Convocatorias | futura/abierta/cerrada/adjudicada según fechas |
| Contacto | validación, error red, éxito, spam/rate limit |
| Certificados | válido, inválido, incompleto, rate limit, no enumeración |
| Motion | reduced motion, puntero táctil, animación interrumpible |
| SEO | H1, title, description, canonical, JSON-LD, sitemap |

Se combinarán:

- pruebas de componentes/lógica;
- Playwright end-to-end;
- axe u otra verificación automática;
- revisión manual de teclado, lector de pantalla, zoom y contraste;
- screenshots de regresión con tolerancia controlada.

La automatización no sustituye revisión visual ni lectura de contenido.

## Flujo Figma → Angular → Playwright

1. Aprobar comp y registrar restricciones de verdad.
2. Construir en Figma tokens, componentes y tres breakpoints.
3. Documentar cada región como HTML/CSS/SVG, imagen existente, imagen a producir o integración.
4. Implementar el shell y la homepage en Angular.
5. Comparar capturas en los viewports objetivo; corregir composición, no solo pixeles.
6. Ejecutar accesibilidad, interacción y rendimiento.
7. Volver a Figma únicamente cuando haya un cambio de sistema, no para ocultar una desviación de código.

## Riesgos y mitigación

| Riesgo | Mitigación |
|---|---|
| Figma Starter sin cuota MCP | Mantener comps/prompt en repo; escribir nodos cuando se restablezca cuota; no afirmar trabajo inexistente |
| Contenido vencido o duplicado | Estados `CONTENT_REVIEW_REQUIRED` y responsable de aprobación |
| Backend desconocido | Contrato antes de UI transaccional; fallback informativo |
| Dependencia de Google Drive/Zyro | Copias institucionales y URLs durables |
| Derechos de imagen | Manifiesto, créditos, autorizaciones y sustituciones |
| Mapa inaccesible/pesado | Lista HTML equivalente, carga diferida, geografía simplificada |
| Node/Angular incompatibles | Seleccionar versión estable con matriz oficial antes de scaffold |
| Diseño convertido en cards genéricas | Inventario de composición y comparación visual contra comp aprobado |
| Datos agregados engañosos | No sumar; contexto y fuente por cifra |

## Definición de terminado del rediseño

- Arquitectura y redirecciones publicadas sin enlaces rotos.
- Contenido aprobado y marcado con fuente/fecha.
- Homepage y plantillas coherentes con el comp aprobado.
- Sistemas especiales seguros o explícitamente diferidos.
- WCAG 2.2 AA verificado en flujos críticos.
- Rendimiento medido y dentro de presupuestos acordados.
- Imágenes con derechos, créditos, variantes y alt.
- Documentos descargables y versionados.
- Playwright, typecheck, build y pruebas unitarias verdes.
- QA visual desktop/móvil documentado.

## Estado de ejecución

Entrega navegable completada el 25 de agosto de 2026:

- Angular 21.2.21 standalone, TypeScript estricto, SSR y prerender.
- Diez rutas estáticas: inicio, proyectos, caso El Roble, territorios, conocimiento, corporación, transparencia, contacto, certificados y FOMMUR.
- Homepage híbrida aprobada: A como columna vertebral, mapa/lista de B y lenguaje editorial de C.
- Contenido estructurado con estados de verificación y revisión editorial.
- Fotografía documental real optimizada en AVIF/WebP y logo Abrazo territorial en SVG provisional.
- Build de producción verde con diez rutas prerenderizadas.
- Vitest: 2 pruebas superadas.
- Playwright: 9 pruebas superadas y 1 caso móvil omitido de forma intencional en el proyecto desktop.
- QA visual desktop y móvil sin overflow horizontal ni errores de consola.

Pendientes explícitos para la siguiente iteración:

- Transferir el sistema a Figma cuando se restablezca la cuota MCP del plan Starter.
- Sustituir el SVG provisional por el trazado óptico final del logo aprobado.
- Confirmar canales institucionales antes de publicar datos de contacto.
- Conectar certificados y FOMMUR únicamente cuando exista un contrato backend seguro.
