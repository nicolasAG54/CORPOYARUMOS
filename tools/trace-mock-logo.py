from pathlib import Path

import cv2
import numpy as np


SOURCE = Path("qa/references/mock-logo-reference.png")
SYMBOL_OUTPUT = Path("qa/references/mock-logo-traced-symbol.svg")
LOCKUP_OUTPUT = Path("qa/references/mock-logo-traced-lockup.svg")

image_bgr = cv2.imread(str(SOURCE), cv2.IMREAD_COLOR)
if image_bgr is None:
    raise FileNotFoundError(SOURCE)

# The approved reference places the complete symbol in the first 108 pixels.
symbol_rgb = cv2.cvtColor(image_bgr[:, :108], cv2.COLOR_BGR2RGB)
anchors = np.array(
    [
        [238, 236, 233],  # mineral background
        [28, 56, 40],     # forest mark / wordmark
        [57, 106, 104],   # water territory
        [223, 170, 27],   # harvest sun
    ],
    dtype=np.float32,
)

pixels = symbol_rgb.astype(np.float32)
distances = ((pixels[:, :, None, :] - anchors[None, None, :, :]) ** 2).sum(axis=3)
labels = distances.argmin(axis=2)
yy, xx = np.indices(labels.shape)
# Compression in the approved mockup shifts the small head toward teal. Its
# position is unambiguous, so keep that upper-left component in the forest layer.
labels[(labels == 2) & (yy < 55) & (xx < 58)] = 1


def paths_for_label(label: int) -> list[str]:
    mask = np.where(labels == label, 255, 0).astype(np.uint8)
    mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, np.ones((3, 3), np.uint8))
    mask = cv2.GaussianBlur(mask, (5, 5), 0)
    _, mask = cv2.threshold(mask, 127, 255, cv2.THRESH_BINARY)
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
    paths: list[str] = []
    for contour in sorted(contours, key=cv2.contourArea, reverse=True):
        if cv2.contourArea(contour) < 10:
            continue
        simplified = cv2.approxPolyDP(contour, 0.75, True).reshape(-1, 2)
        commands = [f"M{simplified[0][0]} {simplified[0][1]}"]
        commands.extend(f"L{x} {y}" for x, y in simplified[1:])
        paths.append("".join(commands) + "Z")
    return paths


green_paths = paths_for_label(1)
teal_paths = paths_for_label(2)
yellow_paths = paths_for_label(3)


def path_elements(paths: list[str], fill: str) -> str:
    return "\n  ".join(f'<path fill="{fill}" d="{path}"/>' for path in paths)


symbol_layers = "\n  ".join(
    [
        path_elements(yellow_paths, "#E8B719"),
        path_elements(green_paths, "#174A31"),
        path_elements(teal_paths, "#2E858C"),
    ]
)

symbol_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 108 124" role="img" aria-labelledby="title desc">
  <title id="title">Símbolo Corpoyarumos</title>
  <desc id="desc">Figura humana, sol y territorio unidos por un cauce.</desc>
  {symbol_layers}
</svg>
'''

lockup_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 124" role="img" aria-labelledby="title desc">
  <title id="title">Corpoyarumos</title>
  <desc id="desc">Símbolo del mockup aprobado y wordmark Corpoyarumos.</desc>
  {symbol_layers}
  <text x="111" y="78" fill="#174A31" font-family="'Public Sans', Arial, Helvetica, sans-serif" font-size="25.5" font-weight="700" letter-spacing="1.3">CORPOYARUMOS</text>
</svg>
'''

SYMBOL_OUTPUT.write_text(symbol_svg, encoding="utf-8")
LOCKUP_OUTPUT.write_text(lockup_svg, encoding="utf-8")
print(SYMBOL_OUTPUT)
print(LOCKUP_OUTPUT)
