# Auditoría de imágenes y activos visuales

Fecha de corte: 24 de agosto de 2026. Se extrajeron las variantes publicadas por el CDN del sitio y, cuando fue posible, se recuperó el original eliminando el segmento `/cdn-cgi/image/.../`. Las dimensiones y pesos siguientes corresponden al archivo original descargado, no a una captura.

## Convenciones

- `KEEP_MASTER`: suficiente calidad para conservar como original.
- `KEEP_SUPPORTING`: útil en galería, ficha o contenido, no necesariamente como hero.
- `THUMBNAIL_ONLY`: no ampliar.
- `VECTOR_REQUIRED`: reemplazar raster por SVG oficial.
- `REPLACEMENT_RECOMMENDED`: el contenido o la calidad no representan la nueva dirección.
- `PRIVACY_REVIEW`: revisar autorizaciones, matrículas, nombres, GPS, fecha o ubicación visible.

Los activos Zyro siguen el patrón `https://assets.zyrosite.com/YZ95Rknr0PFEe4EE/<archivo>`. El nombre transformado puede diferir del original; se debe construir un manifiesto final durante la migración, no enlazar directamente el CDN del constructor.

## Inventario principal

| Archivo / referencia | Página o función | Original medido | Calidad y observación | Decisión |
|---|---|---:|---|---|
| `img-m7VLaagGjDi4Z68D.jpg` | Inicio / fotografía de grupo | 4160×2340, 4.63 MB | Muy buena resolución; composición ocupada y poco espacio para texto | KEEP_MASTER; usar en historia/impacto, no como hero dominante |
| `img-AwvZVG2QwVsJr6Zk.jpg` | Inicio / trabajo territorial | 4160×2340, 1.96 MB | Buena base para recorte editorial; revisar identidad y autorización | KEEP_MASTER + PRIVACY_REVIEW |
| `banner-roble-YleW2LGb6DuEbXZz.png` | El Roble | 3780×1890, 2.48 MB | Banner compuesto con textos/logos; documenta el proyecto pero no es fotografía limpia | KEEP_SUPPORTING; conservar en archivo, reconstruir la ficha en HTML |
| `Cascada…jpg` | Ambiente / paisaje | 2340×4160, 3.88 MB | Vertical de alta resolución, útil para narrativa ambiental | KEEP_MASTER; generar recortes verticales, crédito pendiente |
| `PANORAMA-FINCA-MURILLO…jpg` | Proyecto/paisaje | 2304×1728, 0.84 MB | Imagen antigua y sobreexpuesta; sello de fecha 24/12/2006 visible | KEEP_SUPPORTING; nunca hero; no borrar contexto histórico |
| `Paisaje…jpg` | Proyecto/paisaje | 2048×1536, 0.95 MB | Resolución media útil; revisar color y nitidez antes de ampliar | KEEP_SUPPORTING |
| `Collage-con-marco…png` | Proyecto / evidencia | 2000×1600, 2.88 MB | Collage pesado y difícil de hacer accesible | KEEP_SUPPORTING como archivo; migrar fotos fuente si existen |
| `Collage…png` | Proyecto / evidencia | 2000×1600, 2.47 MB | Mismo problema: información visual compuesta | KEEP_SUPPORTING; no hero |
| fotos PDEA Chaparral `2880×2160` | Blog / proyecto | 1.0–2.1 MB cada una | Auténticas y útiles; algunas llevan GPS, fecha y mapa incrustado | KEEP_MASTER + PRIVACY_REVIEW; separar las que tengan overlays |
| foto de grupo con ubicación/GPS/mapa | Blog PDEA | 2880×2160 aprox. | Buena evidencia, pero publica ubicación y fecha exactas | KEEP_SUPPORTING + PRIVACY_REVIEW; no recortar el aviso sin conservar original |
| fotografías de campo `2880×2160` sin overlay | Blog PDEA | 1.0–2.1 MB | Mejor banco documental disponible | KEEP_MASTER; candidatos para fichas, artículos y mosaicos editoriales |
| `portada-revista…png` | Publicaciones | 1414×2000, 3.67 MB | Portada legible de buena resolución, archivo pesado | KEEP_MASTER; exportar AVIF/WebP de preview y enlazar PDF |
| `caratula manual asociaciones…png` | Publicaciones | 937×1079, 1.03 MB | Suficiente para cubierta mediana | KEEP_SUPPORTING; buscar PDF/arte fuente para 2× |
| `caratula manual 2015…png` | Publicaciones | 838×1077, 1.59 MB | Suficiente para listado, limitada para gran formato | KEEP_SUPPORTING; no ampliar más allá de tamaño nativo |
| `Proyectos…png` | Proyectos | 960×720, 1.31 MB | Gráfico/collage pesado; semántica no clara | KEEP_SUPPORTING o retirar cuando existan fotografías fuente |
| `Pisicultura…jpg` | Proyectos/servicios | 639×479, 94 KB | Baja resolución para pantallas modernas | THUMBNAIL_ONLY; REPLACEMENT_RECOMMENDED para uso editorial |
| `img-dJo…png` | Bloque actual | 373×249, 221 KB | Demasiado pequeño para nueva interfaz | THUMBNAIL_ONLY / REPLACEMENT_RECOMMENDED |
| `Contacto…png` | Contacto | 357×247 | Genérica y pequeña | RETIRE; el contacto no necesita foto decorativa de baja calidad |
| `img-mnle…png` | Bloque actual | 284×213 | Insuficiente | THUMBNAIL_ONLY / REPLACEMENT_RECOMMENDED |
| `img-mP49…jpg` | Bloque actual | 225×225 | Insuficiente salvo avatar acreditado | THUMBNAIL_ONLY |
| `logo…jpg` | Marca | 1491×368, 43 KB | Raster horizontal; útil como referencia, no como maestro | VECTOR_REQUIRED; solicitar SVG/AI/PDF oficial |
| `Pacto-Global…png` | Sostenibilidad | 345×129 | Logo de baja resolución | VECTOR_REQUIRED; descargar versión oficial permitida |
| `Principios…png` | Sostenibilidad | 478×287 | Texto/infografía dentro de imagen | RETIRE en UI; reconstruir contenido como HTML |
| gráficos ODS | Sostenibilidad | 1500×1500 aprox. | Resolución suficiente, pero una pared de logos no explica contribución | Usar solo logos oficiales y en contexto; no como sección principal |
| foto Unsplash `photo-158444…` | FOMMUR | 570×624 / 569×458 | Genérica, no representa evidencia territorial propia | REPLACEMENT_RECOMMENDED; sustituir por foto autorizada del programa |
| miniatura YouTube | Inicio/contenido | 480×360 | Solo sirve como thumbnail del video | THUMBNAIL_ONLY; cargar bajo interacción |

## Familias de activos detectadas

El recorrido arrojó aproximadamente cincuenta originales únicos entre el inicio, Nosotros, Proyectos, Blog, FOMMUR y El Roble. La tabla anterior enumera todos los activos de función editorial relevante y agrupa la serie fotográfica PDEA, cuyos archivos comparten 2880×2160 y el mismo tratamiento. En la fase de migración se debe producir un manifiesto automático con:

```text
sourceUrl, originalFilename, page, width, height, bytes, mime,
peopleVisible, locationOverlay, rightsOwner, credit, consent,
contentRole, cropFocalPoint, migrationStatus
```

No se debe asumir que las imágenes que comparten prefijo o hash son duplicados; se compararán por hash perceptual y por archivo.

## Aptitud por uso

### Candidatos a hero

No hay una fotografía que pueda aprobarse automáticamente como hero. Las mejores fuentes son `img-AwvZVG2QwVsJr6Zk.jpg`, algunas fotos PDEA sin overlay y determinados paisajes 4K. La selección final exige:

- autorización de personas y crédito;
- sujeto claramente rural y territorial, no pose corporativa genérica;
- área de lectura compatible con texto y recorte móvil;
- ausencia de fecha/GPS/mapa incrustado;
- archivo original y no una variante CDN.

La imagen generada de los comps es una referencia compositiva y **no** puede publicarse como fotografía documental.

### Galerías y fichas

Las fotos PDEA, el grupo de 4160×2340, cascada, paisajes y banner de El Roble pueden sostener galerías o líneas de tiempo con pies de foto. Se evitará mezclar fotos históricas y actuales sin fecha visible en el pie.

### Publicaciones

Las tres portadas existentes se conservan. Deben mostrar título, autoría, año, formato, peso y enlace de descarga en HTML; la portada no sustituye esos datos.

### Logos y diagramas

Solicitar:

- logo Corpoyarumos vectorial y manual básico de marca;
- logos oficiales de aliados con permisos de uso;
- Pacto Global/ODS en SVG oficial;
- mapa base de Colombia/Tolima con licencia y fuente geográfica.

## Pipeline propuesto

1. Guardar el original inmutable con hash y metadatos.
2. Corregir orientación y eliminar metadatos sensibles de las **derivadas**, conservándolos en el maestro controlado.
3. Definir punto focal por imagen.
4. Generar AVIF y WebP, con JPEG como fallback cuando corresponda.
5. Anchos objetivo: 640, 960, 1280, 1600, 1920 y hasta 2560/3840 solo si el original lo justifica.
6. Usar `sizes` específico por componente; nunca descargar 4K para una miniatura.
7. Reservar `width`, `height` y `aspect-ratio` para evitar layout shift.
8. Cargar el hero con prioridad controlada; diferir galerías, videos y mapas.
9. Mantener `alt` contextual; las imágenes decorativas deben ser realmente decorativas y tener `alt=""`.

## Reemplazo y upscale

| Grupo | Acción |
|---|---|
| Logos raster | Reemplazar por vector; no hacer upscale con IA |
| 225–373 px | Sustituir por original o nueva fotografía; si no existe, limitar a thumbnail |
| 639×479 | No ampliar; reemplazar para usos sobre 600 px CSS |
| Portadas 838–937 px | Mantener tamaño moderado; solicitar arte/PDF fuente antes de upscale |
| Fotos 2K–4K | No requieren upscale; sí compresión, recorte y color coherente |
| Foto Unsplash FOMMUR | Sustituir por evidencia autorizada del programa |
| Collages | Conservar como documento histórico; no mejorar artificialmente; migrar fotos fuente |

## Criterios de aprobación visual

- Ninguna foto generada o stock se presenta como proyecto real.
- Toda persona identificable tiene autorización o base de uso documentada.
- Cada imagen informativa tiene pie, fecha aproximada, lugar y crédito cuando estén disponibles.
- La deriva de color no borra condiciones reales del territorio.
- La versión móvil conserva sujeto y contexto; no recorta manos, rostros o acciones esenciales.

