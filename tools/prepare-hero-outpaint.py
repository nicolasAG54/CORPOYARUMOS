"""Create and finish a left-outpainted 16:9 hero from the original photograph."""

from argparse import ArgumentParser
from pathlib import Path

import numpy as np
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE = (
    ROOT
    / "public"
    / "images"
    / "editorial"
    / "hero-jornada-campo-original-retouched-v1-1920.webp"
)
WORK = ROOT / "assets" / "images" / "work"
BASE = WORK / "hero-jornada-campo-outpaint-left-base-v2.png"
OUTPUT = ROOT / "public" / "images" / "editorial"
STEM = "hero-jornada-campo-outpaint-left-v2"
WIDTH = 1920
HEIGHT = 1080
SHIFT = 320
FEATHER = 80


def create_base() -> None:
    source = Image.open(SOURCE).convert("RGBA")
    canvas = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    canvas.paste(source.crop((0, 0, WIDTH - SHIFT, HEIGHT)), (SHIFT, 0))
    WORK.mkdir(parents=True, exist_ok=True)
    canvas.save(BASE, optimize=True)


def save_variant(image: Image.Image, width: int) -> None:
    height = round(image.height * width / image.width)
    resized = image.resize((width, height), Image.Resampling.LANCZOS)
    resized.save(OUTPUT / f"{STEM}-{width}.webp", format="WEBP", quality=88, method=6)
    resized.save(OUTPUT / f"{STEM}-{width}.avif", format="AVIF", quality=78, speed=6)


def compose(generated_path: Path) -> None:
    generated = Image.open(generated_path).convert("RGB").resize(
        (WIDTH, HEIGHT), Image.Resampling.LANCZOS
    )
    source = Image.open(SOURCE).convert("RGB")

    original_shifted = Image.new("RGB", (WIDTH, HEIGHT))
    original_shifted.paste(source.crop((0, 0, WIDTH - SHIFT, HEIGHT)), (SHIFT, 0))

    generated_array = np.asarray(generated, dtype=np.float32)
    original_array = np.asarray(original_shifted, dtype=np.float32)
    blend = np.zeros((HEIGHT, WIDTH, 1), dtype=np.float32)
    blend[:, SHIFT + FEATHER :, 0] = 1.0
    ramp = np.linspace(0.0, 1.0, FEATHER, dtype=np.float32)
    blend[:, SHIFT : SHIFT + FEATHER, 0] = ramp

    final = generated_array * (1.0 - blend) + original_array * blend
    final_image = Image.fromarray(np.clip(final, 0, 255).round().astype(np.uint8), mode="RGB")
    OUTPUT.mkdir(parents=True, exist_ok=True)
    save_variant(final_image, 1920)
    save_variant(final_image, 960)


def main() -> None:
    parser = ArgumentParser()
    parser.add_argument("--compose", type=Path, help="Generated outpaint used for the left fill")
    args = parser.parse_args()
    if args.compose:
        compose(args.compose)
    else:
        create_base()


if __name__ == "__main__":
    main()
