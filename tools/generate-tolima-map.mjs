import { mkdir, writeFile } from 'node:fs/promises';

const endpoint = new URL(
  'https://mapas2.igac.gov.co/server/rest/services/limites/limites/FeatureServer/1/query',
);
endpoint.search = new URLSearchParams({
  where: "Depto='Tolima'",
  outFields: 'MpNombre,MpCodigo,Depto',
  returnGeometry: 'true',
  outSR: '4326',
  f: 'geojson',
}).toString();

const response = await fetch(endpoint);
if (!response.ok) throw new Error(`IGAC request failed: ${response.status}`);
const geojson = await response.json();

const departmentEndpoint = new URL(
  'https://mapas2.igac.gov.co/server/rest/services/limites/limites/FeatureServer/2/query',
);
departmentEndpoint.search = new URLSearchParams({
  where: "DeNombre='Tolima'",
  outFields: 'DeNombre,DeCodigo',
  returnGeometry: 'true',
  outSR: '4326',
  f: 'geojson',
}).toString();
const departmentResponse = await fetch(departmentEndpoint);
if (!departmentResponse.ok) throw new Error(`IGAC department request failed: ${departmentResponse.status}`);
const departmentGeojson = await departmentResponse.json();

const allRings = geojson.features.flatMap((feature) =>
  feature.geometry.type === 'Polygon'
    ? feature.geometry.coordinates
    : feature.geometry.coordinates.flat(),
);
const allPoints = allRings.flat();
const bounds = allPoints.reduce(
  (current, [x, y]) => ({
    minX: Math.min(current.minX, x),
    maxX: Math.max(current.maxX, x),
    minY: Math.min(current.minY, y),
    maxY: Math.max(current.maxY, y),
  }),
  { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity },
);
const { minX, maxX, minY, maxY } = bounds;
const scale = Math.min(88 / (maxX - minX), 94 / (maxY - minY));
const renderedWidth = (maxX - minX) * scale;
const renderedHeight = (maxY - minY) * scale;
const offsetX = (100 - renderedWidth) / 2;
const offsetY = (100 - renderedHeight) / 2;

function project([x, y]) {
  return [offsetX + (x - minX) * scale, offsetY + (maxY - y) * scale];
}

function perpendicularDistance(point, start, end) {
  const [x, y] = point;
  const [x1, y1] = start;
  const [x2, y2] = end;
  const dx = x2 - x1;
  const dy = y2 - y1;
  if (dx === 0 && dy === 0) return Math.hypot(x - x1, y - y1);
  const t = Math.max(0, Math.min(1, ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy)));
  return Math.hypot(x - (x1 + t * dx), y - (y1 + t * dy));
}

function simplify(points, tolerance = 0.09) {
  if (points.length <= 3) return points;
  let maxDistance = 0;
  let index = 0;
  for (let i = 1; i < points.length - 1; i += 1) {
    const distance = perpendicularDistance(points[i], points[0], points.at(-1));
    if (distance > maxDistance) {
      index = i;
      maxDistance = distance;
    }
  }
  if (maxDistance <= tolerance) return [points[0], points.at(-1)];
  const left = simplify(points.slice(0, index + 1), tolerance);
  const right = simplify(points.slice(index), tolerance);
  return [...left.slice(0, -1), ...right];
}

function ringToPath(ring) {
  const points = simplify(ring.map(project));
  return `${points.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(2)} ${y.toFixed(2)}`).join('')}Z`;
}

function featurePath(feature) {
  const polygons = feature.geometry.type === 'Polygon'
    ? [feature.geometry.coordinates]
    : feature.geometry.coordinates;
  return polygons.flatMap((polygon) => polygon.map(ringToPath)).join('');
}

const departmentOutline = featurePath(departmentGeojson.features[0]);

const features = geojson.features
  .sort((a, b) => a.properties.MpNombre.localeCompare(b.properties.MpNombre, 'es'))
  .map((feature) =>
    `<path data-municipio="${feature.properties.MpNombre}" d="${featurePath(feature)}"/>`,
  )
  .join('\n  ');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" role="img" aria-labelledby="title desc">
  <title id="title">Mapa municipal de Tolima</title>
  <desc id="desc">Límites de los 47 municipios del departamento de Tolima.</desc>
  <metadata>Geometría municipal: IGAC, servicio Límites/FeatureServer/1, consultado el 2026-08-25. Reducción geométrica para visualización web, sin alterar la topología municipal.</metadata>
  <defs><clipPath id="tolima-clip"><path d="${departmentOutline}"/></clipPath></defs>
  <g fill="#eef0e9" stroke="#c5d0c6" stroke-width="0.12" stroke-linejoin="round">
  ${features}
  </g>
  <g fill="none" stroke="#b8d4dc" stroke-width="0.28" stroke-linecap="round" opacity="0.72" clip-path="url(#tolima-clip)">
    <path d="M68 7C66 18 69 28 65 39S62 57 67 69 69 82 66 94"/>
    <path d="M39 20C49 24 57 31 65 40M34 45C46 46 56 51 63 58M29 66C44 65 55 70 67 78M53 88C57 82 62 79 67 78"/>
  </g>
  <path d="${departmentOutline}" fill="none" stroke="#667d65" stroke-width="0.48" stroke-linejoin="round"/>
</svg>
`;

function polygonCentroid(ring) {
  let twiceArea = 0;
  let x = 0;
  let y = 0;
  for (let i = 0; i < ring.length - 1; i += 1) {
    const [x1, y1] = ring[i];
    const [x2, y2] = ring[i + 1];
    const cross = x1 * y2 - x2 * y1;
    twiceArea += cross;
    x += (x1 + x2) * cross;
    y += (y1 + y2) * cross;
  }
  const factor = 1 / (3 * twiceArea);
  return [x * factor, y * factor];
}

const requested = new Set(['Ataco', 'Cajamarca', 'Chaparral', 'Falan', 'Fresno', 'Ibagué', 'Lérida']);
const positions = Object.fromEntries(
  geojson.features
    .filter((feature) => requested.has(feature.properties.MpNombre))
    .map((feature) => {
      const polygons = feature.geometry.type === 'Polygon'
        ? [feature.geometry.coordinates]
        : feature.geometry.coordinates;
      const largestOuterRing = polygons
        .map(([outerRing]) => outerRing)
        .sort((a, b) => b.length - a.length)[0];
      const [x, y] = project(polygonCentroid(largestOuterRing));
      return [feature.properties.MpNombre, { x: Number(x.toFixed(1)), y: Number(y.toFixed(1)) }];
    }),
);

await mkdir('public/maps', { recursive: true });
await writeFile('public/maps/tolima-editorial-mock-v3.svg', svg);
await writeFile('qa/references/tolima-map-positions.json', `${JSON.stringify(positions, null, 2)}\n`);
console.log(`Generated ${geojson.features.length} municipalities from IGAC.`);
console.log(positions);
