import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TableColumn } from '@fuse/interfaces/table-column.interface';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { TranslateService } from '@ngx-translate/core';
import { HeaderProperties } from 'app/models/core/header-properties.model';
import { IRfc, Rfc } from 'app/models/core/rfc.model';
import { RfcService } from 'app/services/operacion/rfc.service';
import { ButtonProperties } from 'app/shared/models/button-properties.model';
import Swal from 'sweetalert2';
import { RfcDialogComponent } from './rfc-dialog.component';
import { locale as english } from "app/i18n/en/rfc";
import { locale as spanish } from "app/i18n/es/rfc";

@Component({
  selector: 'app-rfc-list',
  templateUrl: './rfc-list.page.html'
})
export class RfcListPage implements OnInit {

  totalItems = 0;
    itemsPerPage = 5; // ITEMS_PER_PAGE;
    listCurentPage = 0;
    page!: number;
    data: any;
    pageSize: number;
    pageSizeOptions: number[] = [5, 10, 20, 50, 100];
    predicate!: string;
    ascending!: boolean;

    isLinear = false;

    headerProperties: HeaderProperties;
    columns: TableColumn<any>[] = [];
    buttons: ButtonProperties[];

    listPage: any[];

    list: any;

    @Input()
    origen: number;


  constructor(private _fuseTranslationLoaderService: FuseTranslationLoaderService,
    private translate: TranslateService,
    public router: Router,
    private dialog: MatDialog,
    private valueService: RfcService) { 
        this._fuseTranslationLoaderService.loadTranslations(english, spanish);
    }

  ngOnInit(): void {
    this.loadPage();
    this.columns = this.getColumns(1);
    this.headerProperties = this.getHeaderProperties();
    this.buttons = this.getButtons();
}



loadPage(page?: any): void {
    if (this.list) {
        // TODO Implementar paginacion para cuando sea una lista proporcionada
        this.listPage = [...this.list];
        return;
    }

    if (page?.pageSize && page?.pageSize !== this.itemsPerPage) {
        this.page = 0;
        this.itemsPerPage = page.pageSize;
    }

    const pageToLoad: number =
        page && page.pageIndex !== undefined
            ? page.pageIndex
            : this.page
                ? this.page
                : 0;

    const params: any = {
        page: pageToLoad,
        size: this.itemsPerPage,
        sort: this.sort(),
    };

    this.valueService.query(params).subscribe(
        (res: HttpResponse<any[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
        (err) => this.onError(err)
    );
}

protected onSuccess(data: any[] | null, headers: HttpHeaders, page: number): void {
    // console.log('onSuccess data: ', data);
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.listPage = data.length > 0 ? data :  [];
    this.listCurentPage = this.page;
}

onError(err: HttpResponse<any>) {
    console.error('onError data: ', err);
    this.listCurentPage = this.page || 0;
}

sort(): string[] {
    const result = [
        this.predicate + "," + (this.ascending ? "asc" : "desc"),
    ];
    if (this.predicate !== "id") {
        result.push("id");
    }
    return result;
}

buttonsEvents(event: any): void {
    console.log("Event: " + JSON.stringify(event));
    const value = event?.row;
    switch (event?.actionType) {
        case "update":
            this.update(value);
            break;
        case "view":
            console.log("view");
            break;
        case "cancel":
            console.log("cancel");
            this.cancel(value.id);
            break;
        case "collections":
            this.router.navigate([`/collectionsByTrip/`, value.id]);
            break;
        case "payments":
            this.router.navigate([`/paymentsByTrip/`, value.id]);
            break;
        default:
            break;
    }
}

// FIXME AJUSTAR CON BASE AL MODELO QUE LE CORRESPONDA TableColumn<?>
getColumns(origen: number): TableColumn<any>[] {
    const columns: TableColumn<any>[] = [];
    // columns.push({ label: 'Núm. Folio', property: 'numeroExpediente', type: 'text', visible: true });
   
    columns.push({
        label: 'id',
        property: "id",
        type: "text",
        visible: true,
        // cssClasses: ['detail', 'test'], 
    });
    columns.push({
        label: 'RFC',
        property: "rfc",
        type: "text",
        visible: true,
    });
    columns.push({
        label: 'Razón social',
        property: "razon_social",
        type: "text",
        visible: true,
    });

    columns.push({
        label: " 'Edit' ",
        property: "buttonsActions",
        type: "button",
        visible: true,
    });

    return columns;
}

getButtons(): ButtonProperties[] {
    const buttons: ButtonProperties[] = [];

    buttons.push({
        title: "Ver Detalle",
        actionType: "update",
        icon: "edit",
    });

    return buttons;
}

getHeaderProperties(): HeaderProperties {
    const prop: HeaderProperties = {
        header: true,
        search: true,
        filterColumns: true,
        addButton: true,
    };
    return prop;
}



cancel(element: any): void {
    Swal.fire({
        title: 'En construcción',
        text: 'La acción de CANCELAR se enceuntra en construcción',
        icon: 'warning',
        showCloseButton: true,
      });
}

update(value): void {
    const params = {
        value,
        title: "RFC.UPDATE",
        accion: 'RFC.BUTTONS.UPDATE'

    };
    const dialogRef = this.dialog.open(RfcDialogComponent, { data: params });
    
    // dialogRef.updateSize('40%');
    dialogRef.afterClosed().subscribe((src: any) => {
        if (src) {
            
            Swal.fire({
                title: 'Completed',
                icon: 'success',
                showConfirmButton: false,
                timer: 1800,
                });
            this.loadPage();
        }
    });
}

newItem(): void {
    const value: IRfc = new Rfc();
    // value.trip_id = this.trip_id;
    const params = {
        value,
        title: "RFC.NEW",
        accion: 'RFC.BUTTONS.ADD'
    };
    const dialogRef = this.dialog.open(RfcDialogComponent, { data: params });
    
    // dialogRef.updateSize('40%');
    dialogRef.afterClosed().subscribe((src: any) => {
        if (src) {
            
            Swal.fire({
                title: 'Completed',
                icon: 'success',
                showConfirmButton: false,
                timer: 1800,
                });
            this.loadPage({});
        }
    });
}

}
