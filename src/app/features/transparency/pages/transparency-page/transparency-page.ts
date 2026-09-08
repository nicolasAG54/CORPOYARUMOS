import { ChangeDetectionStrategy, Component } from '@angular/core';

import { INSTITUTIONAL_DOCUMENTS } from '../../../../content/documents.data';

@Component({
  selector: 'app-transparency-page',
  templateUrl: './transparency-page.html',
  styleUrl: './transparency-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransparencyPage {
  protected readonly documents = INSTITUTIONAL_DOCUMENTS;
}
