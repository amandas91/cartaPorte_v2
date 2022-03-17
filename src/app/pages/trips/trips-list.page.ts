import { Component, Input, OnInit } from "@angular/core";
import { HeaderProperties } from "../../models/core/header-properties.model";
import { TableColumn } from "../../../@fuse/interfaces/table-column.interface";
import { ButtonProperties } from "../../shared/models/button-properties.model";
import { locale as english } from "app/i18n/en/trips";
import { locale as spanish } from "app/i18n/es/trips";
import { FuseTranslationLoaderService } from "../../../@fuse/services/translation-loader.service";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { TripsService } from '../../services/operacion/trips.service';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ITrips, Trips } from "app/models/core/trips.model";
import Swal from "sweetalert2";
import { TripsDialogPage } from "./trips-dialog.page";
import { CurrencyPipe } from "@angular/common";
import { AccountService } from "app/shared/auth/account.service";
import { Authority } from "app/shared/constant/authority.constants";

@Component({
    selector: "app-trips-list",
    templateUrl: "./trips-list.page.html",
})
export class TripsListPage implements OnInit {
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
    hasCollections = false;
    
    @Input()
    hasPayments = false;

    @Input()
    hasEdit = false;

    @Input()
    hasNew = false;

    Authority = Authority;

    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private translate: TranslateService,
        public router: Router,
        private dialog: MatDialog,
        private valueService: TripsService,
        protected accountService: AccountService,
    ) {
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
                this.router.navigate([`/trip-detail/`, value.id]);
                break;
            case "view":
                console.log("view");
                // this.update(value.id);
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
            label: this.translate.instant('TRIPS.RECORD'),
            property: "record",
            type: "text",
            visible: true
        });

        if( this.hasRol( [ Authority.LEISURE_DMC, Authority.ADMIN] ) ){
            columns.push({
                label: 'Type trip',
                property: "type",
                type: "text",
                visible: true
            });
        }
        columns.push({
            label: this.translate.instant('TRIPS.TRIP_NAME'),
            property: "name",
            type: "text",
            visible: true,
        });
        columns.push({
            label: this.translate.instant('TRIPS.COLUMNS.COLLECTIONS'),
            property: "collections",
            type: "pipe",
            visible: true,
            pipe: CurrencyPipe, pipeArgs: ['$ ']
        });
        columns.push({
            label: this.translate.instant('TRIPS.COLUMNS.PAYMENTS'),
            property: "payments",
            type: "pipe",
            visible: true,
            pipe: CurrencyPipe, pipeArgs: ['$ ']
        });

        columns.push({
            label: "Status",
            property: "status",
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

        // if(this.hasCollections){
            buttons.push({
                title: "Collections",
                actionType: "collections",
                icon: "collections_bookmark",
                canDisplay: "canCollection"
            });
        // }

        // if(this.hasPayments){
            buttons.push({
                title: "Payments",
                actionType: "payments",
                icon: "payments",
                canDisplay: "canPayment"
            });
        // }

        

        // if (this.hasEdit) {
            buttons.push({
                title: "Ver Detalle",
                actionType: "update",
                icon: "edit",
                canDisplay: "canEdit"
            });
        // }

        return buttons;
    }

    getHeaderProperties(): HeaderProperties {
        const prop: HeaderProperties = {
            header: true,
            search: true,
            filterColumns: true,
            addButton: this.hasNew,
            updateButton: true,
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

    newItem(): void {
        const value: ITrips = new Trips();
        // value.trip_id = this.trip_id;
        const params = {
            value,
            title: "TRIPS.NEW"
        };
        const dialogRef = this.dialog.open(TripsDialogPage, { data: params });
        
        dialogRef.updateSize('40%');
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

    
  hasRol(authorities: string[] | string): boolean {
    return this.accountService.hasAnyAuthority(authorities);
  }
}
