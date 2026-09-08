import { PublicationSummary } from './content.models';

export const PUBLICATIONS: readonly PublicationSummary[] = [
  { title: 'Manual del Agricultor', year: '2014, actualización 2023', identifier: 'ISBN 9789585874206', authorship: 'Javier F. Amortegui y Anyela Peña; coautoría de Ignacio Amortegui y Humberto Alarcón', contentStatus: 'VERIFIED', tone: 'forest', coverAvif: 'images/editorial/publications/manual-agricultor-mock-v2.avif', coverWebp: 'images/editorial/publications/manual-agricultor-mock-v2.webp' },
  { title: 'Manejo eficiente de asociaciones', year: '2016, actualización 2023', identifier: 'Identificador por confirmar', authorship: 'Javier F. Amortegui y Anyela Peña', contentStatus: 'CONTENT_REVIEW_REQUIRED', tone: 'harvest', coverAvif: 'images/editorial/publications/manejo-asociaciones-mock-v2.avif', coverWebp: 'images/editorial/publications/manejo-asociaciones-mock-v2.webp' },
  { title: 'Revista Citricultura', year: '2019', identifier: 'ISSN 2665-6159', authorship: 'Agrosavia, Universidad del Tolima, UPL, Corpoyarumos y otros', contentStatus: 'VERIFIED', tone: 'water', coverAvif: 'images/editorial/publications/revista-citricultura-mock-v2.avif', coverWebp: 'images/editorial/publications/revista-citricultura-mock-v2.webp' },
];
