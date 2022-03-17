import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SampleComponent } from './sample/sample.component';
import { RecordPage } from './record/record.page';
import { TripsPage } from './trips/trips.page';
import { HomePage } from './home/home.page';
import { AdminDashboardsPage } from './admin-dashboards/admin-dashboards.page';
import { ClientsPage } from './clients/clients.page';
import { TripsDetailPage } from './trips/trips-detail.page';
import { CatExperiencesPage } from './catalogos/cat-experiences/cat-experiences.page';
import { CatRatesPage } from './catalogos/cat-rates/cat-rates.page';
import { CatAdventuresPage } from './catalogos/cat-adventures/cat-adventures.page';
import { CatMarginPage } from './catalogos/cat-margin/cat-margin.component';
import { UserRouteAccessService } from 'app/shared/auth/user-route-access-service';
import { ALL_ROLES, Authority } from 'app/shared/constant/authority.constants';
import { errorPageRoute } from 'app/layout/components/error/error.page.route';
import { CatOrigen } from 'app/shared/util/cat-origen';
import { ClientDeatilPage } from './clients/client-deatil.page';
import { ClientPage } from './clients/client.page';
import { RfcPage } from './rfc/rfc.page';
import { GenerarCartaPage } from './generar-carta/generar-carta/generar-carta.page';
import { MonitorPage } from './monitor/monitor.page';



@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'sample',
                component: SampleComponent,
                // data: { authorities: ALL_ROLES },
                canActivate: [UserRouteAccessService],
            },
            {
                path: 'record',
                component: RecordPage,
                data: { 
                  authorities: ALL_ROLES 
                },
                canActivate: [UserRouteAccessService],
            },
            {
              path: 'trips',
              component: TripsPage,
                data: { 
                  authorities: ALL_ROLES,
                },
                canActivate: [UserRouteAccessService],
            },
            {
              path: 'trip-detail/:id',
              component: TripsDetailPage,
                // data: { authorities: ALL_ROLES },
                canActivate: [UserRouteAccessService],
            },
            {
              path: 'generar-carta',
              component: GenerarCartaPage,
                // data: { authorities: ALL_ROLES },
                canActivate: [UserRouteAccessService],
            },
            {
              path: 'editar-carta/:folio',
              component: GenerarCartaPage,
                // data: { authorities: ALL_ROLES },
                canActivate: [UserRouteAccessService],
            },
            {
              path: 'monitor-carta',
              component: MonitorPage,
                // data: { authorities: ALL_ROLES },
                canActivate: [UserRouteAccessService],
            },
            {
              path: 'home',
              component: HomePage,
                // data: { authorities: ALL_ROLES },
                canActivate: [UserRouteAccessService],
            },
            {
              path: 'dashboard',
              component: AdminDashboardsPage,
                // data: { authorities: ALL_ROLES },
                canActivate: [UserRouteAccessService],
            },
            {
              path: 'clients',
              component: ClientsPage,
                data: { authorities: ALL_ROLES },
                canActivate: [UserRouteAccessService],
            },
            {
              path: 'client',
              component: ClientPage,
                data: { authorities: ALL_ROLES },
                canActivate: [UserRouteAccessService],
            },

            { path: '', redirectTo: '/login', pathMatch: 'full' },
            ...errorPageRoute,
            //     ],
            // },
        ]),
    ],
})
export class PagesRoutes {}
