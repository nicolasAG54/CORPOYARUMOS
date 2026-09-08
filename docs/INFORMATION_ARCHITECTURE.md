# Arquitectura de información propuesta

## Principio

La arquitectura debe responder, en este orden, las preguntas de un aliado o comunidad:

1. ¿Quiénes son y qué pueden demostrar?
2. ¿Qué hacen y para quién?
3. ¿Dónde y con qué resultados?
4. ¿Qué conocimiento producen?
5. ¿Cómo verifico, participo o contacto?

## Navegación global

### Barra de utilidad

- Verificar certificados
- FOMMUR Línea 3

Son sistemas especiales, no llamados comerciales. Deben permanecer visibles pero separados de la navegación editorial.

### Navegación principal

- **La Corporación**
  - Quiénes somos
  - Misión, visión e historia
  - Gobierno y equipo
  - Sostenibilidad
- **Qué hacemos**
  - Extensión agropecuaria
  - Gestión de proyectos
  - Ambiente e investigación
  - Capacidades y habilitaciones
- **Proyectos e impacto**
  - Todos los proyectos
  - Territorios
  - Caso El Roble
  - Metodología de resultados
- **Conocimiento**
  - Publicaciones
  - Aprendizajes de proyectos
  - Recursos técnicos
- **Actualidad**
  - Noticias
  - Convocatorias
- **Transparencia**
  - Régimen Tributario Especial
  - Gobierno corporativo
  - PTEES
  - Tratamiento de datos
  - Informes y estados financieros
- Acción destacada: **Conversemos**

“Territorios” se expone como entrada visible dentro de Proyectos e impacto y como interfaz cartográfica; no se agrega como séptimo ítem principal para evitar una navegación saturada.

## Mapa de rutas canónicas

```text
/
/la-corporacion
  /historia
  /gobierno
  /sostenibilidad
/que-hacemos
  /extension-agropecuaria
  /gestion-de-proyectos
  /ambiente-y-conocimiento
/proyectos
  /territorios
  /:projectSlug
/conocimiento
  /publicaciones
  /aprendizajes
  /:contentSlug
/actualidad
  /noticias
  /convocatorias
  /convocatorias/:callSlug
/transparencia
  /rte
  /documentos
/programas/fommur-linea-3
/verificar-certificado
/contacto
/privacidad
/accesibilidad
```

## Redirecciones

| Ruta actual | Ruta propuesta | Regla |
|---|---|---|
| `/about` | `/la-corporacion` | 301 |
| `/proyectos` | `/proyectos` | Conservar canónica |
| `/servicios` | `/que-hacemos` | 301 |
| `/contacts` | `/contacto` | 301 |
| `/blog` | `/conocimiento` | 301 al índice; redirecciones individuales según pieza |
| `/fommurl3` | `/programas/fommur-linea-3` | 301 |
| `/about-copy--UEM8ou4TO8tnsnWHyQ-K` | `/transparencia/rte` | 301 |
| `/convocatorias-` | `/actualidad/convocatorias` | 301 |
| `/proyectoelroble` | `/proyectos/fortalecimiento-agronegocio-cafe-el-roble` | 301 |

Antes de publicar, se extraerán todas las URLs indexadas y enlazadas para evitar pérdidas. Las piezas actuales de Blog se mapearán individualmente a conocimiento, actualidad o proyecto.

## Homepage: narrativa y jerarquía

### Apertura

**H1:** Territorio, conocimiento e impacto.  
**Apoyo:** Desarrollo rural con evidencia, alianzas y conocimiento aplicado.  
**CTA primario:** Conocer proyectos.  
**CTA secundario:** Qué hacemos.

La fotografía o el mapa debe ser dominante; los accesos utilitarios permanecen en la barra superior.

### Evidencia temprana

Tres datos seguros y no agregados:

- Desde 2011.
- Trayectoria documentada 2013–2023.
- Proyectos verificables en Tolima.

No se mostrará una suma global de beneficiarios o inversión hasta validar metodología.

### Proyecto destacado

El Roble funciona como prueba: 101 familias cafeteras, Ataco, código, veredas, financiador/aliados, valor y documentos. La composición debe permitir entender contexto y abrir el expediente.

### Capacidades

Tres entradas editoriales, no tarjetas idénticas:

- Extensión agropecuaria.
- Gestión de proyectos.
- Ambiente y conocimiento.

Cada una responde “qué problema resolvemos”, “cómo trabajamos” y “qué evidencia existe”.

### Territorios

Mapa o índice accesible de municipios mencionados en proyectos. Un filtro modifica una lista semántica equivalente; el mapa no es la única forma de acceso.

### Resultados en contexto

Un carrusel o secuencia editorial de **proyectos individuales**, no una cifra global: por ejemplo 420 familias en PDEA Chaparral o 46 ha en la reforestación Cortolima, cada una con periodo y fuente.

### Sostenibilidad

Relato breve de compromisos y prácticas con enlaces a políticas. Los ODS se muestran solo donde exista una relación explicada.

### Conocimiento que circula

Las tres publicaciones existentes abren el repositorio. Se incluyen autoría, año, formato y descarga.

### Actualidad y convocatorias

Noticias recientes y convocatoria activa real. Si no hay convocatorias abiertas, la interfaz lo expresa y enlaza el archivo; nunca conserva una convocatoria vencida como abierta.

### Cierre

CTA para instituciones, comunidades y aliados: “Conversemos sobre el territorio”. Incluye rutas de contacto y expectativas de respuesta verificadas.

## Plantillas internas

### Proyecto

1. Título, territorio, periodo y estado.
2. Resumen y rol de Corpoyarumos.
3. Problema y contexto.
4. Metodología/intervención.
5. Resultados con unidad, periodo y fuente.
6. Mapa y municipios.
7. Galería acreditada.
8. Aliados y documentos.
9. Aprendizajes relacionados.
10. Proyectos afines.

### Capacidad

1. Problema que aborda.
2. Qué hace Corpoyarumos.
3. Para quién.
4. Proceso.
5. Proyectos que lo demuestran.
6. Habilitaciones/documentos.
7. Contacto contextual.

### Publicación

1. Portada y título.
2. Resumen.
3. Autoría, año, edición, ISBN/ISSN.
4. Proyecto/tema relacionado.
5. Formato y peso.
6. Descarga y versión accesible si existe.

### Convocatoria

1. Estado calculado.
2. Código, objeto, apertura y cierre con zona horaria.
3. Responsable y canal oficial.
4. Términos, anexos, aclaraciones y adendas.
5. Resultado/adjudicación.
6. Archivo inmutable.

### Documento de transparencia

1. Tipo y año.
2. Fecha de publicación/actualización.
3. Formato, peso y descarga.
4. Versión histórica.
5. Responsable institucional.

## Recorridos prioritarios

### Institución o financiador

Inicio → Proyectos e impacto → filtros por territorio/capacidad → ficha con fuentes → Transparencia → Contacto.

### Comunidad o productor

Inicio → Qué hacemos → capacidad pertinente → proyectos cercanos → contacto con lenguaje claro.

### Participante FOMMUR

Barra de utilidad → FOMMUR Línea 3 → información del programa → consulta segura de estado → soporte/privacidad.

### Verificación de certificado

Barra de utilidad → formulario mínimo → resultado neutro → canal de soporte; nunca permite enumerar registros.

### Investigador o técnico

Conocimiento → filtro por tema/tipo → publicación → proyecto relacionado → descarga/cita.

## Búsqueda y filtros

El lanzamiento puede comenzar sin buscador global si el corpus es pequeño. Los filtros de proyectos sí son prioritarios:

- municipio/territorio;
- año o rango;
- capacidad;
- actividad productiva;
- estado.

Los filtros deben reflejarse en la URL, anunciar resultados a tecnologías de asistencia y conservar una lista HTML debajo del mapa.

## SEO estructural

- Un H1 por página y jerarquía de encabezados continua.
- `lang="es-CO"`.
- Títulos y descripciones únicos.
- Canonical y Open Graph por pieza.
- JSON-LD: `Organization`, `WebSite`, `BreadcrumbList`, `Article`, `Report`/`CreativeWork`, `ContactPoint`; el modelo de proyecto se expresa con entidades soportadas y campos explícitos, sin inventar tipos.
- Sitemap segmentado, robots revisado y redirecciones probadas.
- Pies de imagen y enlaces de descarga rastreables.

## Taxonomía controlada

No se publican etiquetas libres sin gobierno. Vocabularios iniciales:

- Capacidades: extensión, gestión de proyectos, ambiente, investigación.
- Actividades: café, plátano, gulupa, cítricos, ganadería, acuicultura, reforestación.
- Territorio: departamento, municipio y vereda en campos separados.
- Tipo de contenido: proyecto, publicación, aprendizaje, noticia, convocatoria, documento.

