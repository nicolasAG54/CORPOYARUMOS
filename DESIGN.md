---
name: "Corpoyarumos"
description: "Bitácora editorial de evidencia, territorio y conocimiento rural."
colors:
  mineral: "#f3f4ed"
  mineral-deep: "#e7e9df"
  ink: "#17241b"
  forest: "#244b32"
  leaf-dark: "#315e3f"
  leaf: "#5e7f52"
  water: "#347d87"
  water-dark: "#245f68"
  harvest: "#e2b93f"
  harvest-light: "#f0ca58"
  white: "#fff"
  text-muted: "#526157"
  line: "#c8cec5"
  mineral-muted: "#c9d0c8"
  forest-muted: "#d2ded4"
  water-muted: "#d7e7e9"
typography:
  display:
    fontFamily: "Literata Variable, Georgia, serif"
    fontSize: "clamp(3.4rem, 7vw, 6rem)"
    fontWeight: 620
    lineHeight: 0.95
    letterSpacing: "-0.045em"
  headline:
    fontFamily: "Literata Variable, Georgia, serif"
    fontSize: "clamp(2.5rem, 4.5vw, 4.3rem)"
    fontWeight: 610
    lineHeight: 1.01
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Literata Variable, Georgia, serif"
    fontSize: "clamp(1.3rem, 2.3vw, 2rem)"
    fontWeight: 600
    lineHeight: 1.14
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Public Sans Variable, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Public Sans Variable, Segoe UI, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 700
    lineHeight: 1
rounded:
  control: "0.375rem"
  panel: "0.625rem"
components:
  button-primary:
    backgroundColor: "{colors.harvest}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0.7rem 1.05rem"
    height: "3rem"
  button-primary-hover:
    backgroundColor: "{colors.harvest-light}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
  button-ghost:
    backgroundColor: "rgb(23 36 27 / 0.38)"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0.7rem 1.05rem"
    height: "3rem"
  button-dark:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0.7rem 1.05rem"
    height: "3rem"
  navigation-contact:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0.72rem 1rem"
  project-dossier:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.white}"
    padding: "clamp(2rem, 4.5vw, 5rem) clamp(1.5rem, 3.8vw, 4rem)"
  evidence-register:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.white}"
    padding: "1.25rem clamp(1rem, 3vw, 2.5rem)"
    height: "6.5rem"
  filter-chip:
    backgroundColor: "transparent"
    textColor: "{colors.text-muted}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 0.85rem"
    height: "2.6rem"
  territory-selector:
    backgroundColor: "transparent"
    textColor: "{colors.text-muted}"
    padding: "1.25rem 0"
    width: "100%"
  map-panel:
    backgroundColor: "{colors.water-dark}"
    textColor: "{colors.mineral}"
    rounded: "{rounded.panel}"
    padding: "clamp(1.5rem, 4vw, 3.5rem)"
  document-ledger:
    backgroundColor: "{colors.mineral}"
    textColor: "{colors.ink}"
    padding: "1.5rem 0"
    width: "100%"
---

# Design System: Corpoyarumos

## Overview

**Creative North Star: "Bitácora de trazabilidad territorial"**

Corpoyarumos se presenta como el expediente vivo de una organización que sabe estar en el territorio y también rendir cuentas. La experiencia combina panorama documental, datos verificables, registros editoriales y navegación territorial para que la evidencia preceda a la promesa.

El sistema es sobrio, humano y técnico: fondos minerales planos, bloques tonales oscuros, reglas finas, fotografía de archivo real y una jerarquía editorial amplia. La portada une panorama y expediente; Territorios funciona como atlas navegable con lista equivalente; Proyectos y Conocimiento adoptan capítulos, fichas y pies de fuente. El logo definitivo “Corporación los Yarumos” integra el símbolo H2O/fotosíntesis: una H humana con raíces, una gota de agua azul envolvente, el planeta América como O y una franja solar amarilla; incorpora el lema “Trabajando por el desarrollo sostenible”.

La interfaz evita el aspecto SaaS, las colecciones de tarjetas genéricas, el glassmorphism y los gradientes decorativos. El sombreado sobre fotografía se limita a asegurar legibilidad; no define superficies. La fotografía conceptual nunca se presenta como evidencia institucional.

**Key Characteristics:**

- Evidencia real antes que promesa o cifra agregada.
- Composición editorial asimétrica con densidad media-baja.
- Atlas territorial navegable acompañado por una lista equivalente.
- Material de archivo, portadas reales, metadatos, fechas y fuentes visibles.
- Movimiento breve, legible y completamente reducible.

## Colors

La paleta combina papel mineral, tinta vegetal, bosque, hoja, agua y cosecha; los tonos apagados sostienen lectura y registro, mientras agua y cosecha señalan interacción o evidencia clave.

### Primary

- **Bosque institucional:** superficie de expedientes, bloques de confianza y llamada de contacto principal.
- **Hoja profunda:** estado hover del contacto y transición entre bosque y vegetación.

### Secondary

- **Agua territorial:** red hídrica, cartografía y relaciones geográficas.
- **Agua profunda:** selección territorial, panel cartográfico, selección de texto y contorno de foco.

### Tertiary

- **Cosecha:** acciones principales, hitos, puntos seleccionados e iconografía de evidencia.
- **Cosecha clara:** respuesta hover de la acción principal.

### Neutral

- **Mineral:** fondo base de lectura y superficie alrededor del archivo.
- **Mineral profundo:** alternancia tonal para conocimiento, mapas claros y estados informativos.
- **Tinta:** texto principal, footer y acciones oscuras.
- **Texto apagado:** texto secundario, explicaciones y metadatos.
- **Línea de registro:** divisores, contornos y estructura tabular.
- **Blanco documental:** texto sobre fotografía o tonos oscuros y fondo de portadas.
- **Mineral apagado, bosque apagado y agua apagada:** texto secundario específico para sus respectivas superficies tonales.

**The Evidence Accent Rule.** Cosecha destaca una acción o un dato verificable; no rellena grandes superficies ni decora secciones sin función.

**The Water Navigation Rule.** Agua identifica navegación territorial, selección y foco; no sustituye indiscriminadamente al bosque institucional.

## Typography

**Display Font:** Literata Variable (con Georgia como respaldo)
**Body Font:** Public Sans Variable (con Segoe UI y sans-serif como respaldo)

**Character:** Literata aporta voz de crónica y expediente sin perder autoridad institucional. Public Sans mantiene navegación, datos, descripciones y controles nítidos en cualquier densidad.

### Hierarchy

- **Display** (620, escala fluida amplia, interlínea 0.95): titulares de portada y aperturas de sección con pocas líneas y fuerte presencia editorial.
- **Headline** (610, escala fluida media, interlínea cercana a 1): encabezados de capítulos, territorio y conocimiento.
- **Title** (600, escala fluida compacta, interlínea 1.14): títulos dentro de registros, proyectos y piezas documentales.
- **Body** (400, 1rem, interlínea 1.65): narración, contexto y explicaciones; los bloques principales se mantienen entre 55 y 67 caracteres aproximados por línea.
- **Label** (700, 0.9rem, interlínea 1): acciones, navegación y controles compactos.
- **Display metadata** (780, 0.78rem, tracking amplio, mayúsculas): rótulos de trayectoria y metadatos puntuales, no párrafos.

**The Editorial Pairing Rule.** Literata narra y jerarquiza; Public Sans opera, identifica y explica.

## Layout

El contenido comparte un contenedor máximo de 90rem con márgenes laterales mínimos de 1rem. La portada usa dos columnas desiguales —panorama y expediente—; los archivos usan filas con columnas de periodo, título, evidencia y acción; conocimiento alterna portada real y ficha editorial; territorios contrapone atlas y lista. Los espacios verticales son fluidos mediante `clamp()` y separan una idea dominante por sección.

La estructura se colapsa de forma progresiva en los quiebres implementados de 64rem, 56rem, 50rem, 48rem, 40rem y 36rem. La navegación principal pasa a menú bajo 64rem; las composiciones editoriales se vuelven de una columna entre 56rem y 48rem; las acciones ocupan todo el ancho y la banda de evidencia se apila bajo 40rem. Las estanterías de publicaciones pueden conservar ancho de lectura mediante desplazamiento horizontal con snap.

**The Equivalent Route Rule.** Toda abstracción territorial interactiva debe conservar una lista HTML que entregue la misma selección e información.

## Elevation & Depth

El sistema es plano por defecto y no usa sombras ambientales para levantar tarjetas. La profundidad se construye con contraste tonal, fotografía recortada, reglas de 1px, alternancia de columnas y solapamiento perceptivo entre evidencia y contenido. Las únicas sombras implementadas son anillos funcionales: el halo cosecha complementa el foco agua y un trazo exterior registra pines o hitos circulares.

**The Tonal Depth Rule.** Una superficie se separa por tono, borde o composición; nunca por una sombra genérica de tarjeta.

## Shapes

Los controles usan esquinas discretamente curvas de 6px y los paneles o portadas usan 10px. Los expedientes, listados y registros prefieren líneas horizontales y bordes rectos; los círculos se reservan para pines, hitos de trayectoria e iconografía localizada. El símbolo H2O/fotosíntesis aporta la silueta orgánica de marca sin trasladar curvas excesivas a todos los componentes.

**The Reserved Roundness Rule.** Los radios suavizan interacción y material documental, pero no convierten cada sección en una tarjeta flotante.

## Components

### Buttons

- **Shape:** control compacto y casi cuadrado (6px), con altura mínima táctil de 3rem.
- **Primary:** tinta sobre cosecha, relleno compacto y peso alto; el hover aclara la cosecha.
- **Ghost:** blanco sobre tinta translúcida con borde blanco; en hover invierte a blanco con tinta.
- **Dark:** blanco sobre tinta para acciones documentales sobre fondos claros.
- **Active / Focus:** escala a 0.97 al presionar; foco visible con contorno agua profundo y halo cosecha. Las transiciones se reducen a 0.01ms cuando se solicita movimiento reducido.

### Chips

- **Style:** filtros de proyecto transparentes, con texto apagado, 6px de radio y altura mínima de 2.6rem.
- **State:** la selección se confirma con tinta y borde de tinta; el hover usa la línea de registro y no agrega relleno.

### Cards / Containers

- **Project dossier:** bloque bosque de alto contraste con título Literata, definición tabular y reglas blancas translúcidas.
- **Evidence band:** franja bosque compacta, dividida en tres registros con iconos cosecha y metadatos bosque apagado; se apila en móvil.
- **Publication cover:** portada real completa, borde de registro y radio de panel; nunca se reemplaza por una ilustración conceptual presentada como publicación.
- **Document ledger:** fila editorial sin sombra, separada por reglas y organizada por categoría, título, estado y acción.

### Navigation

La cabecera combina una barra utilitaria en tinta con navegación primaria sobre mineral. Los enlaces revelan una línea de 1px de derecha a izquierda; “Conversemos” usa bosque y 6px. Bajo 64rem el menú aparece como panel mineral, mantiene divisores y comunica su estado con `aria-expanded`.

### Territorial Explorer

El atlas es una abstracción interactiva y explícitamente sin escala. Agua profunda crea el panel; cosecha identifica río o selección; el municipio activo se refleja en texto vivo y en la lista equivalente. Los puntos se amplían mediante transformación breve, sin sugerir precisión cartográfica.

### Motion

Las entradas de portada usan opacidad y desplazamientos de 0.65–1rem durante 560–700ms con la curva de salida del sistema. Los estados de control duran 140–180ms. No hay movimiento continuo; `prefers-reduced-motion` elimina desplazamiento suave y reduce transiciones.

## Do's and Don'ts

### Do:

- **Do** abrir con evidencia reconocible: fotografía de archivo, una ficha, una fecha, un territorio o una fuente.
- **Do** mantener fondos planos o tonales, reglas finas y jerarquía editorial clara.
- **Do** usar el recorte real del banner de El Roble y las portadas reales con pies y metadatos que expliquen su origen.
- **Do** mantener atlas y lista sincronizados, accesibles por teclado y explícitamente descritos como abstracción sin escala.
- **Do** reservar agua y cosecha para selección, foco, acción o evidencia relevante.
- **Do** conservar el logo definitivo “Corporación los Yarumos”, su símbolo H2O/fotosíntesis y el lema “Trabajando por el desarrollo sostenible”.

### Don't:

- **Don't** presentar fotografía conceptual, generada o de stock como evidencia de trabajo territorial.
- **Don't** inventar cifras, resultados, cobertura, fuentes, testimonios o precisión cartográfica.
- **Don't** usar glassmorphism, gradientes decorativos, sombras de tarjeta o bento genérico.
- **Don't** convertir cada dato o sección en una tarjeta redondeada.
- **Don't** animar por espectáculo ni ocultar información esencial dentro de una imagen o del mapa.
