"""Extract the approved mockup logo onto a transparent PNG canvas.

The source is a screenshot crop, so this script removes only its warm neutral
background. It deliberately does not redraw or reinterpret the logo geometry.
"""

from pathlib import Path

import numpy as np
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "qa" / "references" / "mock-logo-reference.png"
PUBLIC_BRAND = ROOT / "public" / "brand"
ARCHIVE_BRAND = ROOT / "assets" / "brand" / "final" / "raster"

# Representative flat colors sampled from the approved mockup. They are used
# only to estimate edge coverage and remove the neutral screenshot background.
BACKGROUND = np.array([238.0, 236.0, 233.0], dtype=np.float32)
FOREGROUND_RAYS = np.array(
    [
        [23.0, 52.0, 35.0],
        [44.0, 105.0, 108.0],
        [223.0, 168.0, 18.0],
    ],
    dtype=np.float32,
)


def extract_alpha(image: Image.Image) -> Image.Image:
    rgb = np.asarray(image.convert("RGB"), dtype=np.float32)
    offset = rgb - BACKGROUND
    rays = FOREGROUND_RAYS - BACKGROUND

    # Classify each foreground family without allowing screenshot noise to tint
    # the green wordmark teal or yellow. The wordmark is always forest green;
    # the symbol's two accent colors remain identifiable after background blend.
    height, width, _ = rgb.shape
    x = np.broadcast_to(np.arange(width), (height, width))
    yellow = (rgb[..., 0] - rgb[..., 1] > 14.0) & (rgb[..., 1] - rgb[..., 2] > 24.0)
    teal = (rgb[..., 1] - rgb[..., 0] > 18.0) & (rgb[..., 2] - rgb[..., 1] > -7.0)
    best_ray = np.zeros((height, width), dtype=np.intp)
    best_ray[(x < 105) & teal] = 1
    best_ray[(x < 105) & yellow] = 2

    selected_rays = rays[best_ray]
    coverage = np.clip(
        np.sum(offset * selected_rays, axis=2) / np.sum(selected_rays * selected_rays, axis=2),
        0.0,
        1.0,
    )

    # Suppress the tiny variations in the mockup's neutral paper background.
    distance = np.linalg.norm(offset, axis=2)
    coverage[distance < 7.0] = 0.0
    coverage = np.clip((coverage - 0.025) / 0.975, 0.0, 1.0)

    # The mockup crop carries a broad screenshot anti-alias. Tighten that
    # transition around the same 50% contour, keeping the silhouette intact
    # while producing a much crisper small-size browser render.
    coverage = np.clip((coverage - 0.28) / 0.44, 0.0, 1.0)
    coverage = coverage * coverage * (3.0 - 2.0 * coverage)

    # Use the foreground hues sampled from the mockup at every coverage level.
    # This removes the paper-colored fringe while preserving the crop's exact
    # silhouettes and anti-aliased edge coverage.
    selected_colors = FOREGROUND_RAYS[best_ray]
    recovered = selected_colors

    rgba = np.dstack((recovered, coverage[..., None] * 255.0)).round().astype(np.uint8)
    return Image.fromarray(rgba, mode="RGBA")


def save_scaled(image: Image.Image, filename: str, scale: int = 2) -> None:
    scaled = image.resize((image.width * scale, image.height * scale), Image.Resampling.LANCZOS)
    for directory in (PUBLIC_BRAND, ARCHIVE_BRAND):
        directory.mkdir(parents=True, exist_ok=True)
        scaled.save(directory / filename, optimize=True)


def main() -> None:
    extracted = extract_alpha(Image.open(SOURCE))
    save_scaled(extracted, "corpoyarumos-lockup-mock-crisp-v7.png", scale=4)

    # The symbol occupies columns 0..101 in the approved lockup; the remaining
    # transparent padding is retained so its placement matches the mockup.
    symbol = extracted.crop((0, 0, 102, extracted.height))
    save_scaled(symbol, "corpoyarumos-symbol-mock-crisp-v7.png", scale=8)


if __name__ == "__main__":
    main()
