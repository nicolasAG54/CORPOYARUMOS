import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-corporation-page',
  templateUrl: './corporation-page.html',
  styleUrl: './corporation-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CorporationPage {}
