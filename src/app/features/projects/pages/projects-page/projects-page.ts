import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ProjectSummary } from '../../../../content/content.models';
import { PROJECTS } from '../../../../content/projects.data';

type ProjectField = ProjectSummary['field'];
type ProjectFilter = 'Todos' | ProjectField;

@Component({
  selector: 'app-projects-page',
  imports: [RouterLink],
  templateUrl: './projects-page.html',
  styleUrl: './projects-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsPage {
  protected readonly filters: readonly ProjectFilter[] = [
    'Todos',
    'Extensión agropecuaria',
    'Alianzas productivas',
    'Desarrollo productivo',
    'Ambiente',
  ];
  protected readonly selectedFilter = signal<ProjectFilter>('Todos');
  protected readonly projects = computed(() => {
    const filter = this.selectedFilter();
    return filter === 'Todos' ? PROJECTS : PROJECTS.filter((project) => project.field === filter);
  });

  protected setFilter(filter: ProjectFilter): void {
    this.selectedFilter.set(filter);
  }
}
