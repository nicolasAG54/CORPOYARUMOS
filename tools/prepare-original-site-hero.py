"""Prepare the original Corpoyarumos photograph for the homepage hero.

The treatment is intentionally restrained and deterministic: it preserves every
person and object while improving tone, color balance, and perceived detail.
"""

from pathlib import Path

import numpy as np
from PIL import Image, ImageEnhance, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "assets" / "images" / "source" / "corpoyarumos-original-site-hero.jpg"
OUTPUT = ROOT / "public" / "images" / "editorial"
STEM = "hero-jornada-campo-original-retouched-v1"


def tone_image(image: Image.Image) -> Image.Image:
    rgb = np.asarray(image.convert("RGB"), dtype=np.float32) / 255.0

    # Gently open deep shadows and compress harsh midday highlights while
    # leaving midtones essentially unchanged.
    toned = rgb + 0.014 * (1.0 - rgb) - 0.030 * rgb * rgb
    toned = np.clip((toned - 0.5) * 1.025 + 0.5, 0.0, 1.0)

    # Reduce the slight yellow cast without neutralizing the natural greens.
    toned[..., 0] *= 0.997
    toned[..., 2] *= 1.025
    toned = np.clip(toned * 255.0, 0.0, 255.0).round().astype(np.uint8)

    restored = Image.fromarray(toned, mode="RGB")
    restored = ImageEnhance.Color(restored).enhance(1.035)
    return restored.filter(ImageFilter.UnsharpMask(radius=1.15, percent=55, threshold=3))


def save_variant(image: Image.Image, width: int) -> None:
    height = round(image.height * width / image.width)
    resized = image.resize((width, height), Image.Resampling.LANCZOS)
    resized.save(OUTPUT / f"{STEM}-{width}.webp", format="WEBP", quality=88, method=6)
    resized.save(OUTPUT / f"{STEM}-{width}.avif", format="AVIF", quality=78, speed=6)


def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    restored = tone_image(Image.open(SOURCE))
    save_variant(restored, 1920)
    save_variant(restored, 960)


if __name__ == "__main__":
    main()
