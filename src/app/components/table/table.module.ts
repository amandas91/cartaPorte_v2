import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { PageLayoutModule } from 'src/@vex/components/page-layout/page-layout.module';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { BreadcrumbsModule } from 'src/@vex/components/breadcrumbs/breadcrumbs.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { IconModule } from '@visurel/iconify-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
// import { ContainerModule } from 'src/@vex/directives/container/container.module';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';

import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { TableComponent } from './table.component';
// import { PageLayoutModule } from '../../../@vex/components/page-layout/page-layout.module';
// import { BreadcrumbsModule } from '../../../@vex/components/breadcrumbs/breadcrumbs.module';
// import { ContainerModule } from '../../../@vex/directives/container/container.module';
// import { ColorFadeModule } from 'src/@vex/pipes/color/color-fade.module';

import { DynamicPipe } from 'app/shared/pipe/dynamic.pipe';
// import { SlugifyPipe } from 'ngx-pipes';

@NgModule({
  declarations: [
    TableComponent,
    DynamicPipe,
  ],
  imports: [
    MatInputModule,
    MatSnackBarModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    CommonModule,
    // PageLayoutModule,
    FlexLayoutModule,
    // BreadcrumbsModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    IconModule,
    FormsModule,
    MatTooltipModule,
    ReactiveFormsModule,
    // ContainerModule,
    MatSelectModule,
    // ColorFadeModule,
    MatButtonToggleModule,
    MatListModule,
    MatDialogModule,
  ],
  exports: [TableComponent],
  providers: [
    // SlugifyPipe,
  ]
})
export class TableModule {}
