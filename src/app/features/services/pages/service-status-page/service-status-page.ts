import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface ServiceRouteData {
  readonly title: string;
  readonly summary: string;
  readonly requirements: readonly string[];
}

@Component({
  selector: 'app-service-status-page',
  templateUrl: './service-status-page.html',
  styleUrl: './service-status-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceStatusPage {
  private readonly route = inject(ActivatedRoute);
  protected readonly service = this.route.snapshot.data as ServiceRouteData;
}
