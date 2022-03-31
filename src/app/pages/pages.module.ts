import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { SampleComponent } from './sample/sample.component';
import { LoginComponent } from '../components/login/login.component';
import { SharedModule } from '../shared/shared.module';
import { PagesRoutes } from './pages.routes';
import { RecordPage } from './record/record.page';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePage } from './home/home.page';
import { BrowserModule } from '@angular/platform-browser';
import { TripsPage } from './trips/trips.page';
import { AdminDashboardsPage } from './admin-dashboards/admin-dashboards.page';
import { ClientsPage } from './clients/clients.page';
import { TripsListPage } from './trips/trips-list.page';
import { TripsDetailPage } from './trips/trips-detail.page';
import { ClientsListPage } from './clients/clients-list.page';
import { ExcepcionalPage } from './excepcional/excepcional.page';
import { ExcepcionalListPage } from './excepcional/excepcional-list.page';
import { ClientsSearchPage } from './clients/clients-search.page';
import { TripsDialogPage } from './trips/trips-dialog.page';
import { TripsUpdatePage } from './trips/trips-update.page';
import { ClientsDialogPage } from './clients/clients-dialog.page';
import { ClientsDetailPage } from './clients/clients-detail.page';
import { ExcepcionalDialogPage } from './excepcional/excepcional-dialog.page';
import { ExcepcionalDetailPage } from './excepcional/excepcional-detail.page';
import { HeaderPagePage } from '../components/header-page/header-page.page';
import { TripsTypeAdventurePage } from './trips/trips-type-adventure.page';
import { SkeletonLoaderTableComponent } from '../components/skeleton/skeleton-loader-table.component';
import { CatExperiencesDetailPage } from './catalogos/cat-experiences/cat-experiences-detail.page';
import { CatExperiencesDialogPage } from './catalogos/cat-experiences/cat-experiences-dialog.page';
import { CatalogsListPage } from './catalogos/cat-experiences/cat-experiences-list.page';
import { CatExperiencesPage } from './catalogos/cat-experiences/cat-experiences.page';
import { CatRatesPage } from './catalogos/cat-rates/cat-rates.page';

import { CatRatesDialogPage } from './catalogos/cat-rates/cat-rates-dialog.page';
import { CatRatesDetailPage } from './catalogos/cat-rates/cat-rates-detail.page';
import { CatRatesListPage } from './catalogos/cat-rates/cat-rates-list.page';
import { CatAdventuresPage } from './catalogos/cat-adventures/cat-adventures.page';
import { CatAdventuresListPage } from './catalogos/cat-adventures/cat-adventures-list.page';
import { CatAdventuresDialogPage } from './catalogos/cat-adventures/cat-adventures-dialog.page';
import { CatAdventuresDetailPage } from './catalogos/cat-adventures/cat-adventures-detail.page';
import { CatMarginPage } from './catalogos/cat-margin/cat-margin.component';
import { CatMarginListPage } from './catalogos/cat-margin/cat-margin-list.page';
import { CatMarginDialogPage } from './catalogos/cat-margin/cat-margin-dialog.page';
import { CatMarginDetailPage } from './catalogos/cat-margin/cat-margin-detail.page';

import { ClientDeatilPage } from './clients/client-deatil.page';
import { ClientPage } from './clients/client.page';
import { RfcPage } from './rfc/rfc.page';
import { RfcListPage } from './rfc/rfc-list.page';
import { RfcDetailPage } from './rfc/rfc-detail.page';
import { RfcDialogComponent } from './rfc/rfc-dialog.component';
import { GenerarCartaPage } from './generar-carta/generar-carta/generar-carta.page';
import { MonitorPage } from './monitor/monitor.page';
import { MonitorSearchPage } from './monitor/monitor-search.page';
import { MonitorListPage } from './monitor/monitor-list.page';
import { MonitorDialogPages } from './monitor/monitor-dialog.pages';
import { GenerarCartaDetailPage } from './generar-carta/generar-carta-detail/generar-carta-detail.page';
import { ImportExcelPages } from './import-excel/import-excel.pages';




@NgModule({
    declarations: [
        CatExperiencesDialogPage,
        CatalogsListPage,
        SampleComponent,
        LoginComponent,
        RecordPage,
        TripsPage,
        HomePage,
        AdminDashboardsPage,
        ClientsPage,
        TripsListPage,
        TripsDetailPage,
        ClientsListPage,
        ExcepcionalPage,
        ExcepcionalListPage,
        ClientsSearchPage,
        TripsDialogPage,
        TripsUpdatePage,
        ClientsDialogPage,
        ClientsDetailPage,
        ExcepcionalDialogPage,
        ExcepcionalDetailPage,
        HeaderPagePage,
        TripsTypeAdventurePage,
        CatExperiencesDetailPage,
        CatExperiencesPage,
        SkeletonLoaderTableComponent,
        CatRatesPage,
        CatRatesListPage,
        CatRatesDialogPage,
        CatRatesDetailPage,
        CatAdventuresPage,
        CatAdventuresListPage,
        CatAdventuresDialogPage,
        CatAdventuresDetailPage,
        CatMarginPage,
        CatMarginListPage,
        CatMarginDialogPage,
        CatMarginDetailPage,
        ClientDeatilPage,
        ClientPage,
        RfcPage,
        RfcListPage,
        RfcDetailPage,
        RfcDialogComponent,
        GenerarCartaPage,
        GenerarCartaDetailPage,
        MonitorPage,
        MonitorSearchPage,
        MonitorListPage,
        MonitorDialogPages,
        ImportExcelPages
    ],
    imports: [
        PagesRoutes,
        TranslateModule,
        FuseSharedModule,
        // FuseSharedModule,
        SharedModule,
        BrowserModule,
        BrowserAnimationsModule,
    ],
    exports: [SampleComponent],
})
export class PageModule {}
