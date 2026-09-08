import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Corpoyarumos | Territorio, conocimiento e impacto',
    loadComponent: () =>
      import('./features/home/pages/home-page/home-page').then(
        (component) => component.HomePage,
      ),
  },
  {
    path: 'proyectos',
    title: 'Proyectos | Corpoyarumos',
    loadComponent: () =>
      import('./features/projects/pages/projects-page/projects-page').then(
        (component) => component.ProjectsPage,
      ),
  },
  {
    path: 'proyectos/el-roble',
    title: 'Proyecto El Roble | Corpoyarumos',
    loadComponent: () =>
      import('./features/projects/pages/project-detail-page/project-detail-page').then(
        (component) => component.ProjectDetailPage,
      ),
  },
  {
    path: 'territorios',
    title: 'Territorios | Corpoyarumos',
    loadComponent: () =>
      import('./features/territories/pages/territories-page/territories-page').then(
        (component) => component.TerritoriesPage,
      ),
  },
  {
    path: 'conocimiento',
    title: 'Conocimiento | Corpoyarumos',
    loadComponent: () =>
      import('./features/knowledge/pages/knowledge-page/knowledge-page').then(
        (component) => component.KnowledgePage,
      ),
  },
  {
    path: 'corporacion',
    title: 'La Corporación | Corpoyarumos',
    loadComponent: () =>
      import('./features/corporation/pages/corporation-page/corporation-page').then(
        (component) => component.CorporationPage,
      ),
  },
  {
    path: 'transparencia',
    title: 'Transparencia | Corpoyarumos',
    loadComponent: () =>
      import('./features/transparency/pages/transparency-page/transparency-page').then(
        (component) => component.TransparencyPage,
      ),
  },
  {
    path: 'contacto',
    title: 'Contacto | Corpoyarumos',
    loadComponent: () =>
      import('./features/contact/pages/contact-page/contact-page').then(
        (component) => component.ContactPage,
      ),
  },
  {
    path: 'verificar-certificados',
    title: 'Verificar certificados | Corpoyarumos',
    data: {
      title: 'Verificación de certificados',
      summary: 'El servicio permitirá verificar documentos emitidos por Corpoyarumos sin exponer registros ni datos personales.',
      requirements: ['Contrato y documentación de API', 'Reglas de coincidencia y no enumeración', 'Límites de consulta y auditoría', 'Política de privacidad y retención'],
    },
    loadComponent: () =>
      import('./features/services/pages/service-status-page/service-status-page').then(
        (component) => component.ServiceStatusPage,
      ),
  },
  {
    path: 'fommur',
    title: 'Consulta FOMMUR | Corpoyarumos',
    data: {
      title: 'Consulta FOMMUR Línea 3',
      summary: 'La consulta de etapa se conectará a una fuente institucional verificable antes de habilitarse al público.',
      requirements: ['Confirmar responsabilidad institucional', 'Definir fuente única de estado', 'Acordar campos mínimos de consulta', 'Crear mensajes de soporte y recuperación'],
    },
    loadComponent: () =>
      import('./features/services/pages/service-status-page/service-status-page').then(
        (component) => component.ServiceStatusPage,
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
