import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';


import { FuseSharedModule } from '../../@fuse/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatDialogModule } from '@angular/material/dialog';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatStepperModule} from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { IconModule } from '@visurel/iconify-angular';
import {MatCardModule} from '@angular/material/card';

import { ChartsModule } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {MatDividerModule} from '@angular/material/divider';

import { NgxMaskModule } from 'ngx-mask';  // https://github.com/JsDaddy/ngx-mask
// import { MatCarouselModule } from 'ng-mat-carousel';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import {MatListModule} from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatChipsModule} from '@angular/material/chips';
import { GoogleMapsModule } from '@angular/google-maps'; // https://github.com/angular/components/tree/master/src/google-maps
import { GooglePlaceModule } from 'ngx-google-places-autocomplete'; // https://github.com/skynet2/ngx-google-places-autocomplete

import { NgxWebstorageModule } from 'ngx-webstorage';
import { FileSaverModule } from 'ngx-filesaver'; // https://github.com/cipchk/ngx-filesaver

import { DatePipe, UpperCasePipe, LowerCasePipe, registerLocaleData, CurrencyPipe} from '@angular/common';

import { MatRadioModule } from '@angular/material/radio';
import { AuthInterceptor } from './auth/interceptor/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ShortenPipe } from 'ngx-pipes';
import { NgPipesModule } from 'ngx-pipes'; // https://github.com/danrevah/ngx-pipes

import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { NgxIdleTimeoutModule } from 'ngx-idle-timeout';




@NgModule({
  declarations: [],
  imports: [
    FileSaverModule,
    CommonModule,
    BrowserAnimationsModule,
    NgPipesModule,

    NgxWebstorageModule.forRoot({ prefix: 'app', separator: '-' }),  

    NgxMaskModule.forRoot({
      validation: true,
    }),
    
    // MATERIAL
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMomentDateModule,
    MatTableModule,
    MatTabsModule,
    MatDialogModule,
    MatPaginatorModule,
    MatStepperModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCardModule,
    MatDividerModule,
    IvyCarouselModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatChipsModule,
    MatRadioModule,

    // ChartsModule
    ChartsModule,
    NgxChartsModule,

    TranslateModule,
    RouterModule,
    // google maps 
    GoogleMapsModule,
    GooglePlaceModule,

    //TimePicker
    NgxMaterialTimepickerModule,

    MatSlideToggleModule,

  ],
  exports: [
    CommonModule,
    BrowserAnimationsModule,
    NgPipesModule,

    NgxMaskModule,
    
    // MATERIAL
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMomentDateModule,
    MatTableModule,
    MatTabsModule,
    MatDialogModule,
    MatPaginatorModule,
    MatStepperModule,    
    MatSelectModule,
    MatDatepickerModule,
    MatCardModule,
    MatDividerModule,
    IvyCarouselModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatChipsModule,
    MatRadioModule,
    
    // ChartsModule
    ChartsModule,
    NgxChartsModule,

    TranslateModule,
    RouterModule,

    FuseSharedModule,
    IconModule, 

    // google maps 
    GoogleMapsModule,
    GooglePlaceModule,

    
    //TimePicker
    NgxMaterialTimepickerModule,

    MatSlideToggleModule,

    NgxIdleTimeoutModule

    // NGX-Pipes
    // BytesPipe,
    // SlugifyPipe,
    // ShortenPipe,
    // TimeAgoPipe,
    // UcFirstPipe,
    // UcWordsPipe,
    // ScanPipe,
  ],
  providers: [
    // Pipes
    DatePipe,
    LowerCasePipe,
    UpperCasePipe,
    CurrencyPipe,
    ShortenPipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class SharedModule {
  constructor() {}
}
