import { Routes } from '@angular/router';

import { ErrorComponent } from './error.component';

export const errorPageRoute: Routes = [
  {
    path: 'pages/error',
    component: ErrorComponent,
    data: {
      authorities: [],
      pageTitle: 'Error desconocido',
      errorCode: 0x01,
      errorMessage: 'Error interno o desconocido',
      errorMessageHidden: 'Unknown or Internal Error',
    },
  },
  {
    path: 'pages/acceso-restringido',
    component: ErrorComponent,
    data: {
      authorities: [],
      pageTitle: 'Página restringida',
      errorCode: 0x403,
      errorMessage: 'No se tiene permisos suficientes para desplegar esta sección',
      errorMessageHidden: '403 http Error Code, Forbidden page',
    },
  },
  {
    path: 'pages/pagina-no-encontrada',
    component: ErrorComponent,
    data: {
      authorities: [],
      pageTitle: 'Error 404',
      errorCode: 0x404,
      errorMessage: 'Error pagina no encontrada',
      errorMessageHidden: '404 http Error Code, page not found',
    },
  },
  // {
  //   path: '**',
  //   redirectTo: '/404',
  // },
];
