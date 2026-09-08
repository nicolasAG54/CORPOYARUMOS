export type ContentStatus = 'VERIFIED' | 'CONTENT_REVIEW_REQUIRED';

export interface ProjectSummary {
  readonly slug: string;
  readonly period: string;
  readonly title: string;
  readonly territory: string;
  readonly evidence: string;
  readonly field: 'Alianzas productivas' | 'Extensión agropecuaria' | 'Ambiente' | 'Desarrollo productivo';
  readonly contentStatus: ContentStatus;
  readonly reviewedAt: string;
}

export interface InstitutionalDocument {
  readonly title: string;
  readonly category: 'Gobierno' | 'Ética y cumplimiento' | 'Datos personales' | 'Régimen tributario';
  readonly url: string;
  readonly contentStatus: ContentStatus;
}

export interface TerritorySummary {
  readonly name: string;
  readonly note: string;
  readonly projects: string;
  readonly x: number;
  readonly y: number;
}

export interface PublicationSummary {
  readonly title: string;
  readonly year: string;
  readonly identifier: string;
  readonly authorship: string;
  readonly contentStatus: ContentStatus;
  readonly tone: 'forest' | 'water' | 'harvest';
  readonly coverAvif: string;
  readonly coverWebp: string;
}
