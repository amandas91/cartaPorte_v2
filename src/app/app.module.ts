import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import {
    FuseProgressBarModule,
    FuseSidebarModule,
    FuseThemeOptionsModule,
} from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { PageModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppRoutingModule } from './app.routes';
import { ErrorComponent } from './layout/components/error/error.component';
import { errorRoute } from './layout/components/error/error.route';

const LAYOUT_ROUTES = [...errorRoute];

@NgModule({
    declarations: [AppComponent, ErrorComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        // RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' }),
        AppRoutingModule,
        TranslateModule.forRoot(),

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        PageModule,
        MatFormFieldModule,
        SharedModule        
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
