import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PROJECTS } from '../../../../content/projects.data';

@Component({
  selector: 'app-project-detail-page',
  imports: [RouterLink],
  templateUrl: './project-detail-page.html',
  styleUrl: './project-detail-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetailPage {
  protected readonly project = PROJECTS.find((item) => item.slug === 'el-roble')!;
  protected readonly villages = ['El Roble', 'Agua Fría', 'Buena Vista', 'Lindosa', 'Moras', 'Reforma', 'San Luis'];
}
