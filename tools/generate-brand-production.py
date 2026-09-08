"""Build the approved Corpoyarumos merchandise-production asset pack.

The source artwork is the approved V5 presentation board. This script keeps
the approved silhouettes, removes only the presentation background, flattens
the artwork to named spot colors, traces those separations to SVG paths, and
exports placement templates. It does not alter the website or its assets.
"""

from __future__ import annotations

from collections import deque
from dataclasses import dataclass
from pathlib import Path
import re

import cv2
import numpy as np
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT / "assets" / "brand-production" / "source-crops"
OUTPUT_DIR = ROOT / "assets" / "brand-production"


@dataclass(frozen=True)
class SpotColor:
    slug: str
    label: str
    rgb: tuple[int, int, int]

    @property
    def hex(self) -> str:
        return "#" + "".join(f"{channel:02X}" for channel in self.rgb)


SPOT_COLORS = (
    SpotColor("verde-oscuro", "Verde raíces", (35, 94, 44)),
    SpotColor("oliva-contorno", "Oliva lettering", (122, 113, 55)),
    SpotColor("amarillo-sol", "Amarillo sol", (245, 184, 23)),
    SpotColor("azul-agua", "Azul agua", (3, 156, 225)),
    SpotColor("verde-vivo", "Verde territorio", (108, 176, 39)),
    SpotColor("blanco", "Blanco", (255, 255, 255)),
)

BACKGROUND_RGB = np.array((247, 244, 241), dtype=np.int16)
BACKGROUND_DISTANCE = 30


@dataclass(frozen=True)
class CropSpec:
    source_name: str
    output_stem: str
    target_width_px: int
    white_region: str


CROPS = (
    CropSpec("stacked-source.png", "logo-apilado", 4500, "top-symbol"),
    CropSpec("symbol-source.png", "simbolo", 3000, "all"),
    CropSpec("horizontal-source.png", "logo-horizontal", 4500, "left-symbol"),
)


def load_rgb(path: Path) -> np.ndarray:
    image = cv2.imread(str(path), cv2.IMREAD_COLOR)
    if image is None:
        raise FileNotFoundError(path)
    return cv2.cvtColor(image, cv2.COLOR_BGR2RGB)


def background_candidates(rgb: np.ndarray) -> np.ndarray:
    distance = np.linalg.norm(rgb.astype(np.int16) - BACKGROUND_RGB, axis=2)
    return distance <= BACKGROUND_DISTANCE


def flood_exterior_background(candidates: np.ndarray) -> np.ndarray:
    height, width = candidates.shape
    exterior = np.zeros_like(candidates, dtype=np.uint8)
    queue: deque[tuple[int, int]] = deque()

    def seed(y: int, x: int) -> None:
        if candidates[y, x] and not exterior[y, x]:
            exterior[y, x] = 1
            queue.append((y, x))

    for x in range(width):
        seed(0, x)
        seed(height - 1, x)
    for y in range(height):
        seed(y, 0)
        seed(y, width - 1)

    while queue:
        y, x = queue.popleft()
        for next_y, next_x in ((y - 1, x), (y + 1, x), (y, x - 1), (y, x + 1)):
            if (
                0 <= next_y < height
                and 0 <= next_x < width
                and candidates[next_y, next_x]
                and not exterior[next_y, next_x]
            ):
                exterior[next_y, next_x] = 1
                queue.append((next_y, next_x))
    return exterior.astype(bool)


def white_region_mask(shape: tuple[int, int], mode: str) -> np.ndarray:
    height, width = shape
    mask = np.zeros(shape, dtype=bool)
    if mode == "all":
        mask[:] = True
    elif mode == "top-symbol":
        mask[: int(height * 0.76), :] = True
    elif mode == "left-symbol":
        mask[:, : int(width * 0.31)] = True
    else:
        raise ValueError(f"Unknown white-region mode: {mode}")
    return mask


def separate_colors(rgb: np.ndarray, white_mode: str) -> tuple[np.ndarray, dict[str, np.ndarray]]:
    candidate_background = background_candidates(rgb)
    channel_min = rgb.min(axis=2)
    channel_max = rgb.max(axis=2)
    neutral_white = (channel_min >= 205) & ((channel_max - channel_min) <= 48)
    exterior_background = flood_exterior_background(candidate_background)
    foreground = ~exterior_background
    white_allowed = white_region_mask(foreground.shape, white_mode)

    palette = np.array([spot.rgb for spot in SPOT_COLORS[:-1]], dtype=np.float32)
    distances = ((rgb[:, :, None, :].astype(np.float32) - palette[None, None, :, :]) ** 2).sum(axis=3)
    labels = distances.argmin(axis=2)

    masks: dict[str, np.ndarray] = {}
    colored_foreground = foreground & ~candidate_background
    for index, spot in enumerate(SPOT_COLORS[:-1]):
        masks[spot.slug] = ((labels == index) & colored_foreground).astype(np.uint8) * 255

    # White parts of the approved mark connect visually to the presentation
    # background at the open arms and roots. Build a conventional screen-print
    # underbase from the symbol's exterior contours, then subtract every spot
    # color. This retains the white H, roots, numeral and globe boundaries on
    # garments of any color without adding white inside the wordmark counters.
    colored_union = np.zeros_like(foreground, dtype=np.uint8)
    for mask in masks.values():
        colored_union = cv2.bitwise_or(colored_union, mask)
    symbol_colors = cv2.bitwise_and(colored_union, white_allowed.astype(np.uint8) * 255)
    internal_white = foreground & neutral_white & white_allowed & (colored_union == 0)

    # Preserve narrow white separations that are intentionally open to the
    # background (sun/Water seam and root gaps). A neutral pixel qualifies only
    # when printable color brackets it on a horizontal or vertical axis.
    colored_binary = symbol_colors > 0
    radius = max(8, round(symbol_colors.shape[1] * 0.035))
    image_height, image_width = colored_binary.shape
    row_sum = np.pad(np.cumsum(colored_binary, axis=1), ((0, 0), (1, 0)))
    x_axis = np.arange(image_width)
    left_start = np.maximum(0, x_axis - radius)
    right_end = np.minimum(image_width, x_axis + radius + 1)
    seen_left = (row_sum[:, x_axis] - row_sum[:, left_start]) > 0
    seen_right = (row_sum[:, right_end] - row_sum[:, x_axis + 1]) > 0
    column_sum = np.pad(np.cumsum(colored_binary, axis=0), ((1, 0), (0, 0)))
    y_axis = np.arange(image_height)
    top_start = np.maximum(0, y_axis - radius)
    bottom_end = np.minimum(image_height, y_axis + radius + 1)
    seen_top = (column_sum[y_axis, :] - column_sum[top_start, :]) > 0
    seen_bottom = (column_sum[bottom_end, :] - column_sum[y_axis + 1, :]) > 0
    bracketed_neutral = neutral_white & ((seen_left & seen_right) | (seen_top & seen_bottom))

    # The white H is open toward the roots, so part of it is not returned as an
    # enclosed contour. Recover those original neutral pixels through a tight,
    # proportional silhouette that follows the approved H. The source pixels,
    # rather than the polygon, still define the final edge.
    y_values, x_values = np.where(symbol_colors > 0)
    if len(x_values):
        left, right = int(x_values.min()), int(x_values.max())
        top, bottom = int(y_values.min()), int(y_values.max())
        box_width = right - left
        box_height = bottom - top
        h_points = np.array(
            [
                (0.060, 0.280),
                (0.140, 0.520),
                (0.140, 0.845),
                (0.355, 0.845),
                (0.355, 0.520),
                (0.425, 0.280),
                (0.320, 0.455),
                (0.245, 0.480),
                (0.175, 0.455),
            ],
            dtype=np.float32,
        )
        h_points[:, 0] = left + h_points[:, 0] * box_width
        h_points[:, 1] = top + h_points[:, 1] * box_height
        h_zone = np.zeros_like(symbol_colors)
        cv2.fillPoly(h_zone, [h_points.astype(np.int32)], 255)
        open_h_white = (
            (h_zone > 0)
            & neutral_white
            & white_allowed
        )
        internal_white |= open_h_white

        root_zone = np.zeros_like(symbol_colors)
        cv2.rectangle(
            root_zone,
            (left, top + round(box_height * 0.765)),
            (left + round(box_width * 0.52), bottom),
            255,
            thickness=cv2.FILLED,
        )
        internal_white |= bracketed_neutral & (root_zone > 0) & white_allowed
    masks[SPOT_COLORS[-1].slug] = internal_white.astype(np.uint8) * 255

    # Remove isolated compression noise without softening approved silhouettes.
    for slug, mask in masks.items():
        minimum_area = 100 if slug == "blanco" else (8 if slug == "verde-vivo" else 5)
        count, component_map, stats, _ = cv2.connectedComponentsWithStats(mask, 8)
        cleaned = np.zeros_like(mask)
        for component in range(1, count):
            if stats[component, cv2.CC_STAT_AREA] >= minimum_area:
                cleaned[component_map == component] = 255
        masks[slug] = cleaned

    alpha = foreground.astype(np.uint8) * 255
    return alpha, masks


def composite_spot_rgba(masks: dict[str, np.ndarray]) -> np.ndarray:
    shape = next(iter(masks.values())).shape
    rgba = np.zeros((*shape, 4), dtype=np.uint8)
    for spot in SPOT_COLORS:
        mask = masks[spot.slug] > 0
        rgba[mask, :3] = spot.rgb
        rgba[mask, 3] = 255
    return rgba


def save_large_png(rgba: np.ndarray, path: Path, target_width: int) -> None:
    image = Image.fromarray(rgba, mode="RGBA")
    target_height = round(image.height * target_width / image.width)
    resized = image.resize((target_width, target_height), Image.Resampling.LANCZOS)
    path.parent.mkdir(parents=True, exist_ok=True)
    resized.save(path, optimize=True, dpi=(300, 300))


def contour_path(mask: np.ndarray, epsilon: float = 0.75) -> str:
    contours, _ = cv2.findContours(mask, cv2.RETR_TREE, cv2.CHAIN_APPROX_NONE)
    commands: list[str] = []
    for contour in contours:
        area = abs(cv2.contourArea(contour))
        if area < 4:
            continue
        simplified = cv2.approxPolyDP(contour, epsilon, True).reshape(-1, 2)
        if len(simplified) < 3:
            continue
        commands.append(f"M{simplified[0][0]} {simplified[0][1]}")
        commands.extend(f"L{x} {y}" for x, y in simplified[1:])
        commands.append("Z")
    return "".join(commands)


def svg_document(width: int, height: int, title: str, layers: list[tuple[str, str, str]]) -> str:
    layer_markup = "\n  ".join(
        f'<path id="{slug}" fill="{fill}" fill-rule="evenodd" d="{path}"/>'
        for slug, fill, path in layers
        if path
    )
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" role="img" aria-labelledby="title desc">
  <title id="title">{title}</title>
  <desc id="desc">Identidad de Corporación los Yarumos: persona raíz, agua, sol y planeta.</desc>
  {layer_markup}
</svg>
'''


def save_svg_variants(
    masks: dict[str, np.ndarray],
    stem: str,
    width: int,
    height: int,
) -> None:
    master_dir = OUTPUT_DIR / "master"
    one_color_dir = OUTPUT_DIR / "one-color"
    master_dir.mkdir(parents=True, exist_ok=True)
    one_color_dir.mkdir(parents=True, exist_ok=True)

    paths = {slug: contour_path(mask) for slug, mask in masks.items()}
    ordered_layers = [(spot.slug, spot.hex, paths[spot.slug]) for spot in SPOT_COLORS]
    (master_dir / f"corporacion-los-yarumos-{stem}-full-color.svg").write_text(
        svg_document(width, height, f"Corporación los Yarumos — {stem}", ordered_layers),
        encoding="utf-8",
    )

    colored_union = np.zeros((height, width), dtype=np.uint8)
    for spot in SPOT_COLORS[:-1]:
        colored_union = cv2.bitwise_or(colored_union, masks[spot.slug])
    union_path = contour_path(colored_union, epsilon=0.8)
    for suffix, fill in (("verde", "#235E2C"), ("negativo", "#FFFFFF"), ("negro", "#000000")):
        (one_color_dir / f"corporacion-los-yarumos-{stem}-{suffix}.svg").write_text(
            svg_document(width, height, f"Corporación los Yarumos — {stem} {suffix}", [(suffix, fill, union_path)]),
            encoding="utf-8",
        )


def save_separations(masks: dict[str, np.ndarray], target_width: int, stem: str) -> None:
    separation_dir = OUTPUT_DIR / "screen-print" / "separations" / stem
    separation_dir.mkdir(parents=True, exist_ok=True)
    source_height, source_width = next(iter(masks.values())).shape
    target_height = round(source_height * target_width / source_width)

    for index, spot in enumerate(SPOT_COLORS, start=1):
        mask = Image.fromarray(masks[spot.slug], mode="L").resize(
            (target_width, target_height), Image.Resampling.LANCZOS
        )
        rgba = Image.new("RGBA", mask.size, (*spot.rgb, 0))
        rgba.putalpha(mask)
        rgba.save(separation_dir / f"{index:02d}-{spot.slug}.png", dpi=(300, 300), optimize=True)


def one_color_symbol() -> None:
    source = load_rgb(SOURCE_DIR / "one-color-symbol-source.png")
    candidates = background_candidates(source)
    exterior = flood_exterior_background(candidates)
    green_mask = ((~exterior) & ~candidates).astype(np.uint8) * 255
    path = contour_path(green_mask, epsilon=0.75)
    height, width = green_mask.shape
    embroidery_dir = OUTPUT_DIR / "embroidery"
    embroidery_dir.mkdir(parents=True, exist_ok=True)
    for suffix, fill in (("verde", "#235E2C"), ("blanco", "#FFFFFF"), ("negro", "#000000")):
        (embroidery_dir / f"simbolo-bordado-1-tinta-{suffix}.svg").write_text(
            svg_document(width, height, f"Símbolo para bordado — {suffix}", [(suffix, fill, path)]),
            encoding="utf-8",
        )


def placement_template(
    filename: str,
    title: str,
    canvas: tuple[int, int],
    safe: tuple[int, int, int, int],
    logo: tuple[int, int, int, int],
    href: str,
    note: str,
    circle: bool = False,
    surface_fill: str = "#F7F4F1",
) -> None:
    width, height = canvas
    safe_x, safe_y, safe_width, safe_height = safe
    logo_x, logo_y, logo_width, logo_height = logo
    asset_path = (OUTPUT_DIR / "templates" / href).resolve()
    asset_source = asset_path.read_text(encoding="utf-8")
    view_box_match = re.search(r'viewBox="([^"]+)"', asset_source)
    if view_box_match is None:
        raise ValueError(f"Missing viewBox in {asset_path}")
    embedded_paths = "\n    ".join(re.findall(r"<path\b[^>]*/>", asset_source))
    embedded_logo = (
        f'<svg x="{logo_x}" y="{logo_y}" width="{logo_width}" height="{logo_height}" '
        f'viewBox="{view_box_match.group(1)}" preserveAspectRatio="xMidYMid meet">\n'
        f'    {embedded_paths}\n  </svg>'
    )
    if circle:
        surface = f'<circle cx="{width / 2}" cy="{height / 2}" r="{min(width, height) / 2 - 2}" fill="{surface_fill}" stroke="#9EA89F" stroke-width="0.7"/>'
    else:
        surface = f'<rect x="1" y="1" width="{width - 2}" height="{height - 2}" rx="4" fill="{surface_fill}" stroke="#9EA89F" stroke-width="0.7"/>'
    content = f'''<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{width}mm" height="{height}mm" viewBox="0 0 {width} {height}" role="img" aria-labelledby="title desc">
  <title id="title">{title}</title>
  <desc id="desc">{note}</desc>
  {surface}
  <rect x="{safe_x}" y="{safe_y}" width="{safe_width}" height="{safe_height}" fill="none" stroke="#03A0DE" stroke-width="0.6" stroke-dasharray="3 2"/>
  {embedded_logo}
  <text x="{width / 2}" y="{height - 5}" text-anchor="middle" fill="#235E2C" font-family="Arial, sans-serif" font-size="4">{note}</text>
</svg>
'''
    template_dir = OUTPUT_DIR / "templates"
    template_dir.mkdir(parents=True, exist_ok=True)
    (template_dir / filename).write_text(content, encoding="utf-8")


def save_templates() -> None:
    placement_template(
        "camiseta-frente-centro.svg",
        "Plantilla camiseta — frente centrado",
        (380, 480),
        (30, 45, 320, 360),
        (50, 105, 280, 198),
        "../master/corporacion-los-yarumos-logo-apilado-full-color.svg",
        "Ancho recomendado: 260–280 mm",
    )
    placement_template(
        "camiseta-pecho-izquierdo.svg",
        "Plantilla camiseta — pecho izquierdo",
        (120, 120),
        (10, 10, 100, 100),
        (18, 20, 84, 62),
        "../master/corporacion-los-yarumos-simbolo-full-color.svg",
        "Ancho recomendado: 75–85 mm",
    )
    placement_template(
        "gorra-frente-bordado.svg",
        "Plantilla gorra — bordado frontal",
        (130, 60),
        (10, 8, 110, 44),
        (37, 9, 56, 40),
        "../embroidery/simbolo-bordado-1-tinta-blanco.svg",
        "Símbolo 1 tinta: 50–58 mm",
        surface_fill="#235E2C",
    )
    placement_template(
        "tote-bag-frente.svg",
        "Plantilla tote bag — frente",
        (300, 350),
        (25, 55, 250, 250),
        (40, 100, 220, 155),
        "../master/corporacion-los-yarumos-logo-apilado-full-color.svg",
        "Ancho recomendado: 200–220 mm",
    )
    placement_template(
        "termo-envolvente.svg",
        "Plantilla termo — aplicación horizontal",
        (210, 90),
        (10, 10, 190, 70),
        (20, 23, 170, 40),
        "../master/corporacion-los-yarumos-logo-horizontal-full-color.svg",
        "Ancho recomendado: 150–170 mm",
    )
    placement_template(
        "parche-bordado-75mm.svg",
        "Plantilla parche bordado — 75 mm",
        (75, 75),
        (7, 7, 61, 61),
        (9, 11, 57, 48),
        "../embroidery/simbolo-bordado-1-tinta-verde.svg",
        "Parche terminado: 75 mm",
        circle=True,
    )


def main() -> None:
    for crop in CROPS:
        rgb = load_rgb(SOURCE_DIR / crop.source_name)
        _, masks = separate_colors(rgb, crop.white_region)
        rgba = composite_spot_rgba(masks)
        height, width = rgb.shape[:2]

        save_large_png(
            rgba,
            OUTPUT_DIR / "master" / f"corporacion-los-yarumos-{crop.output_stem}-300dpi.png",
            crop.target_width_px,
        )
        save_svg_variants(masks, crop.output_stem, width, height)
        save_separations(masks, crop.target_width_px, crop.output_stem)

    one_color_symbol()
    save_templates()
    print(OUTPUT_DIR)


if __name__ == "__main__":
    main()
