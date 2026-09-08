import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { TerritorySummary } from '../../../../content/content.models';
import { TERRITORIES } from '../../../../content/territories.data';

@Component({
  selector: 'app-territories-page',
  templateUrl: './territories-page.html',
  styleUrl: './territories-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TerritoriesPage {
  protected readonly territories = TERRITORIES;
  protected readonly selectedTerritory = signal(this.territories[0]);

  protected selectTerritory(territory: TerritorySummary): void {
    this.selectedTerritory.set(territory);
  }
}
