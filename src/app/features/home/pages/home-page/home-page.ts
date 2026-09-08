import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { TerritorySummary } from '../../../../content/content.models';
import { PUBLICATIONS } from '../../../../content/publications.data';
import { TERRITORIES } from '../../../../content/territories.data';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  protected readonly territories = TERRITORIES;
  protected readonly publications = PUBLICATIONS;

  protected readonly selectedTerritory = signal(this.territories[0]);

  protected selectTerritory(territory: TerritorySummary): void {
    this.selectedTerritory.set(territory);
  }
}
