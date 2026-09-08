# Auditoría del sitio actual

Fecha de corte: 24 de agosto de 2026  
Sitio: [corpoyarumos.org](https://corpoyarumos.org/)  
Alcance: diagnóstico previo al rediseño; no incluye implementación.

## Método y cobertura

Se recorrieron con Playwright las rutas públicas detectadas, se inspeccionó su DOM y se tomaron capturas de la página de inicio en 1440 × 900 y 390 × 844. Se revisaron encabezados, enlaces, formularios, imágenes, iframes, metadatos y contenido visible. Las métricas de laboratorio de Core Web Vitals quedan pendientes: el entorno del navegador no expuso una medición fiable de `performance`, por lo que este documento no inventa valores.

Rutas auditadas:

- `/`
- `/about`
- `/proyectos`
- `/servicios`
- `/contacts`
- `/blog`
- `/fommurl3`
- `/about-copy--UEM8ou4TO8tnsnWHyQ-K`
- `/convocatorias-`
- `/proyectoelroble`

## Diagnóstico ejecutivo

El sitio conserva una cantidad valiosa de evidencia institucional —proyectos, contratos, montos, territorios, publicaciones y documentos de transparencia—, pero la interfaz no la convierte en confianza. La portada reparte demasiadas acciones con el mismo peso, carece de un H1 semántico y en móvil extiende el hero y la sección de proyectos a alturas desproporcionadas. El resultado se percibe como una página construida por bloques, no como una organización con trayectoria verificable.

La oportunidad no es “modernizar colores”: es reorganizar el sitio alrededor de tres promesas comprobables.

1. Conocimiento aplicado al desarrollo rural.
2. Capacidad de ejecución documentada por proyecto y territorio.
3. Transparencia para instituciones, aliados, comunidades y participantes.

## Auditoría por página

| Página actual | Lo que aporta | Problema principal | Decisión propuesta |
|---|---|---|---|
| Inicio | Presentación institucional, trabajo desde 2011, tres líneas de servicio | Sin H1; siete botones naranjas en el hero; jerarquía débil; vacíos extremos; móvil sobredimensionado | Reescribir y recomponer completamente, conservando la proposición institucional |
| Nosotros | Misión, visión, Pacto Global, ODS y documentos corporativos | Información valiosa fragmentada; recursos visuales de baja calidad o texto incrustado en imágenes | Integrar en “La Corporación” y “Sostenibilidad”; convertir principios en HTML accesible |
| Proyectos | Archivo sustantivo de proyectos 2013–2023 con contratos, montos, municipios y población | Bloques largos, sin filtros, taxonomía ni lectura comparativa; poca conexión con resultados | Convertir en índice filtrable y fichas de proyecto con evidencia contextual |
| Servicios | Extensión, formulación/gestión, registros y capacidades | Lenguaje interno y siglas sin progresión de lectura; resolución EPSEA no enlazada | Reescribir como capacidades orientadas a necesidades y adjuntar habilitaciones verificables |
| Contacto | Formulario de contacto y verificación de certificados | Etiquetas en inglés; `GET`; campos sin `name`, `required` ni evidencia de backend; iframe anidado | Reconstruir con formularios accesibles y contratos de integración definidos |
| Blog | Caso PDEA Chaparral, publicaciones y aprendizajes | Mezcla noticias, biblioteca y proyectos; URLs y jerarquía pobres | Separar “Actualidad” de “Conocimiento” |
| FOMMUR Línea 3 | Mensaje a beneficiarias y consulta de etapa | No se detectó formulario visible en el recorrido; flujo y fuente de datos no están definidos | Mantener como programa especial, sujeto a auditoría funcional y legal |
| RTE | Nueve documentos de régimen tributario especial | URL opaca derivada de una copia de página; documentos dependen de Google Drive | Crear sección estable de Transparencia con año, tipo, formato y fecha |
| Convocatorias | Historial TR05–TR16 y documentos | TR15 y TR16 aún aparecen abiertas pese a vencer en julio de 2024 | Convertir a archivo; exigir estado y fechas como datos, no como texto libre |
| El Roble | Caso detallado, 101 familias, código, veredas, financiación | Ruta no semántica; contenido visual en banner; falta estructura de resultados/fuentes | Elevar a caso emblemático con ficha trazable |

## Hallazgos de UX y diseño visual

### Jerarquía y conversión

- La portada presenta demasiadas acciones primarias; el usuario no distingue entre conocer la organización, contactar, ver proyectos o acceder a servicios especiales.
- El logo se percibe pequeño frente a una navegación negra de alta presencia.
- Los iconos sociales ocupan un peso visual impropio de una acción secundaria.
- Las secciones alternan negro y blanco con grandes vacíos que no responden a una narrativa.
- El sistema actual usa bloques repetidos y no diferencia una cifra, un servicio, una noticia o un proyecto por su función.

### Responsive

- En 390 px, el titular del hero corta “rural” de forma incómoda y los siete botones se apilan en una columna muy larga.
- El hero móvil supera aproximadamente una pantalla y media antes de entregar contexto.
- La sección de proyectos contiene un gran tramo negro vacío, indicio de alturas fijas, activos que no cargan o composición duplicada por breakpoint.
- No se aprecia una estrategia específica para navegación, densidad editorial, tablas, mapas o documentos en pantallas pequeñas.

### Accesibilidad

- El atributo `lang` está configurado como `en` aunque el contenido es español.
- Inicio, Nosotros, Blog, Convocatorias y El Roble no exponen un H1 claro en la inspección.
- Las imágenes observadas usan `alt` vacío; la excepción es una foto de Unsplash en FOMMUR, que tampoco aporta contexto territorial propio.
- Los enlaces de redes sociales carecen de nombre accesible visible en el DOM inspeccionado.
- Los formularios no marcan campos obligatorios ni tienen nombres de envío; las etiquetas y placeholders están en inglés.
- No se encontró una estructura de breadcrumbs ni una navegación de teclado documentada.

### SEO y descubrimiento

- Títulos de página genéricos y ausencia observable de descripciones canónicas consistentes.
- No se detectó imagen Open Graph en la portada.
- URLs opacas o accidentales: `/about-copy--UEM8ou4TO8tnsnWHyQ-K`, `/convocatorias-`, `/fommurl3`.
- Falta una arquitectura explícita para Organization, Project, Article, Publication, BreadcrumbList y ContactPoint.
- La mezcla entre blog, publicaciones, proyectos y convocatorias dificulta intención de búsqueda y enlazado interno.

### Rendimiento: riesgos, no métricas

- El sitio sirve originales fotográficos de 1–4.7 MB y varios PNG de 1–3.8 MB.
- Hay imágenes de 4K que necesitan `srcset`, AVIF/WebP y recortes por relación de aspecto.
- El constructor actual parece emitir transformaciones CDN y nodos responsivos duplicados; debe verificarse qué descarga realmente cada viewport.
- Las fuentes, scripts de terceros, YouTube, Google Drive y redes sociales deben cargarse con presupuesto y consentimiento definidos.
- Se requiere una medición reproducible posterior con Lighthouse/Playwright en frío y caliente; no se publican cifras hasta entonces.

## Formularios y sistemas especiales

| Flujo | Estado observado | Riesgo | Requisito antes de construir |
|---|---|---|---|
| Contacto | `GET`, sin nombres de campo ni `required` | Datos en URL, envío no confiable, spam | Definir destinatario, API, consentimiento, retención y respuesta de éxito/error |
| Verificación de certificados | Campos para código, titular/razón social, correo y solicitante; mismo patrón técnico débil | Posible exposición de datos o enumeración de registros | Definir contrato API, límites, mensajes neutros, auditoría y política de datos |
| FOMMUR Línea 3 | No se detectó consulta funcional visible | Dependencia externa o estado incompleto | Identificar fuente de datos, responsable y ciclo de actualización |
| Convocatorias | Estados escritos manualmente | Información vencida presentada como vigente | Modelo con `opensAt`, `closesAt`, `status`, anexos y resolución de adjudicación |

## Conservar, reorganizar y retirar

### Conservar

- Misión, visión, historia desde 2011 y objeto institucional.
- Detalle verificable de proyectos: año, contrato, monto, municipio, población y aliado.
- Caso El Roble y aprendizajes del PDEA Chaparral.
- Publicaciones, documentos corporativos, RTE, PTEES y política de datos.
- Accesos a FOMMUR Línea 3 y verificación de certificados, si sus sistemas se validan.

### Reorganizar y reescribir

- Servicios como capacidades orientadas a problemas y resultados.
- Proyectos como archivo navegable y no como muro cronológico.
- Blog en dos espacios: actualidad y conocimiento.
- Sostenibilidad como compromisos, prácticas y documentos, no una cuadrícula de logos ODS.
- Contacto en rutas claras para alianzas, comunidades, proveedores y soporte.

### Retirar o archivar

- Botonera masiva del hero.
- Imágenes que contienen texto que debe ser HTML.
- TR15 y TR16 como convocatorias “abiertas”; deben aparecer cerradas o archivadas salvo confirmación documental posterior.
- Imágenes de baja resolución como fondos de gran formato.
- URLs de copia y slugs accidentales, después de publicar redirecciones 301.

## Revisiones de contenido obligatorias

Marcadas `CONTENT_REVIEW_REQUIRED` para la siguiente fase:

- Resolución ADR 537 citada para la habilitación EPSEA: enlazar fuente oficial y confirmar vigencia.
- ISBN `9789585874206`, mostrado en dos publicaciones distintas: confirmar si es un duplicado de carga.
- Estados actuales de FOMMUR Línea 3 y del verificador de certificados.
- TR15 y TR16: confirmar cierre/adjudicación y publicar resultado.
- Datos institucionales completos de contacto, redes oficiales y horarios.
- Permisos de uso de personas fotografiadas y de imágenes con GPS, fecha o mapa incrustado.
- Vigencia de cada documento enlazado en Google Drive y existencia de una copia institucional estable.

## Criterio de salida de la auditoría

La auditoría habilita diseño, pero no autoriza publicación. Antes del lanzamiento se deben resolver el contenido marcado, los contratos de los tres formularios/sistemas especiales, las redirecciones, la titularidad de activos y la medición de rendimiento.

