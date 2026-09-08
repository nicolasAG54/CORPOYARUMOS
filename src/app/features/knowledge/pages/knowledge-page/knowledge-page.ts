import { ChangeDetectionStrategy, Component } from '@angular/core';

import { PUBLICATIONS } from '../../../../content/publications.data';

@Component({
  selector: 'app-knowledge-page',
  templateUrl: './knowledge-page.html',
  styleUrl: './knowledge-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KnowledgePage {
  protected readonly publications = PUBLICATIONS;
}
