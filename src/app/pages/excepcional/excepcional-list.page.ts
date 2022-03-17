import { Component, Inject, Input, OnInit } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { TableColumn } from "@fuse/interfaces/table-column.interface";
import { IExcepcional, Excepcional } from "app/models/core/excepcional.model";
import { HeaderProperties } from "app/models/core/header-properties.model";
import { ButtonProperties } from "app/shared/models/button-properties.model";
import { ExcepcionalDialogPage } from "./excepcional-dialog.page";
import { FuseTranslationLoaderService } from "../../../@fuse/services/translation-loader.service";
import { TranslateService } from "@ngx-translate/core";
import { locale as english } from "app/i18n/en/payments";
import { locale as spanish } from "app/i18n/es/payments";
import { PaymentsService } from '../../services/operacion/payments.service';
import { HttpResponse, HttpHeaders } from "@angular/common/http";
import { CatRatesService } from 'app/services/catalogos/cat-rates.service';
import { ICatRates } from 'app/models/catalogos/cat-rates.model';
@Component({
    selector: "app-excepcional-list",
    templateUrl: "./excepcional-list.page.html",
})
export class ExcepcionalListPage implements OnInit {
    listPage: any[];
    headerProperties: HeaderProperties;
    columns: TableColumn<any>[] = [];
    buttons: ButtonProperties[] = [];
    totalItems = 0;
    itemsPerPage = 5; // ITEMS_PER_PAGE;
    listCurentPage = 0;
    page!: number;
    pageSizeOptions: number[] = [5, 10, 20, 50, 100];
    // data: any;
    pageSize: number;
    predicate!: string;
    ascending!: boolean;
    list: any;
    outstanding: string;

    @Input()
    trip_id: number;

    @Input()
    origen: number;

    constructor(
        private dialog: MatDialog,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private translate: TranslateService,
        public router: Router,
        private valueService: PaymentsService
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, spanish);
    }

    ngOnInit(): void {
        this.loadPage();
        // this.registerChangeInList();
        this.columns = this.getColumns(1);
        this.headerProperties = this.getHeaderProperties();
        // console.log('headerProperties: ', this.headerProperties);
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

        const paramsSearch: any = {
            trip_id: this.trip_id,
            origen: this.origen,
        };

        this.valueService.queryByType(params, paramsSearch).subscribe(
          (res: HttpResponse<any[]>) => this.onSuccess(res.body['data'], res.body['outstanding'], res.headers, pageToLoad),
          (err) => this.onError(err)
        );
    }

    protected onSuccess(data: any[] | null, outstanding:string , headers: HttpHeaders, page: number): void {
        // console.log('onSuccess data: ', data);
        this.outstanding = outstanding;
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
            case "delete":
                // this.delete(value);
                console.log("DELTE");
                break;
            case "view":
                // this.view(value.id);
                console.log("VIEW");
                break;
            case "upload":
                console.log("upload");
                // this.download(value.id);
                break;
            default:
                break;
        }
    }

    // FIXME AJUSTAR CON BASE AL MODELO QUE LE CORRESPONDA TableColumn<?>
    getColumns(origen: number): TableColumn<any>[] {
        const columns: TableColumn<any>[] = [];
        // columns.push({ label: 'Núm. Folio', property: 'numeroExpediente', type: 'text', visible: true });
        // columns.push({
        //     label: this.translate.instant("PAYMENTS.OUTSTANDING_COLUMNS.STATUS"),
        //     property: "id",
        //     type: "text",
        //     visible: true,
        // });
        columns.push({
            label: this.translate.instant("PAYMENTS.OUTSTANDING_COLUMNS.CONCEPT"),
            property: "concept",
            type: "text",
            visible: true,
        });
        columns.push({
            label: this.translate.instant("PAYMENTS.OUTSTANDING_COLUMNS.SUPPLIER"),
            property: "name",
            type: "text",
            visible: true,
        });

        columns.push({
            label: this.translate.instant("PAYMENTS.OUTSTANDING_COLUMNS.AMOUNT"),
            property: "amount",
            type: "text",
            visible: true,
        });
        columns.push({
            label: this.translate.instant("PAYMENTS.OUTSTANDING_COLUMNS.CUR"),
            property: "currency_id",
            type: "text",
            visible: true,
        });
        columns.push({
            label: this.translate.instant("PAYMENTS.OUTSTANDING_COLUMNS.LOCATION"),
            property: "ubication",
            type: "text",
            visible: true,
        });
        // columns.push({
        //     label: this.translate.instant("PAYMENTS.OUTSTANDING_COLUMNS.VAT"),
        //     property: "margin",
        //     type: "text",
        //     visible: true,
        // });
        columns.push({
            label: this.translate.instant("PAYMENTS.OUTSTANDING_COLUMNS.REQUEST_DATE"),
            property: "request_date",
            type: "text",
            visible: true,
        });

        // columns.push({ label: 'Fecha Solicitud', property: 'fechaHoraRecibido', type: 'pipe',
        //   pipe: DatePipe, pipeArgs: ['shortDate'], visible: true });

        // if (origen === CatOrigen.EXPEDIENTE) {
        //   columns.push({ label: 'Notificación', property: 'notificacion', valueAsTooltip: true, type: 'pipe',
        //     pipe: ShortenPipe, pipeArgs: ['15', '...'], visible: true });
        // }

        // columns.push({ label: 'Asesor', property: 'imputado', valueAsTooltip: true, type: 'pipe',
        //   pipe: ShortenPipe, pipeArgs: ['15', '...'], visible: true });
        // columns.push({ label: 'Estatus', property: 'estado', type: 'text', visible: true });
        columns.push({
            label: this.translate.instant("PAYMENTS.OUTSTANDING_COLUMNS.ACTIONS"),
            property: "buttonsActions",
            type: "button",
            visible: true,
        });

        return columns;
    }

    getButtons(): ButtonProperties[] {
        const buttons: ButtonProperties[] = [];
        // console.log('View: ' + this.hasView);

        buttons.push({
            title: "Descargar",
            actionType: "upload",
            icon: "cloud_upload",
        });

        // if (this.hasRol([Authority.ADMIN, Authority.COORDINADOR]) && this.origen === CatOrigen.EXPEDIENTE) {
        // buttons.push({
        //   title: "Asignar",
        //   actionType: "assign",
        //   icon: "people_alt",
        // });
        // }
        // buttons.push({ title: 'Solo lectura', actionType: 'readOnly', icon: 'chrome_reader_mode' });

        // if (this.origen !== CatOrigen.CONCLUIDOS) {
        //   buttons.push({ title: 'Tiene mensajes no Leídos', canDisplay: 'leidos', actionType: 'none', icon: 'notifications' });
        // }

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

    newItem(): void {
        const value: IExcepcional = new Excepcional();
        value.trip_id = this.trip_id;
        const params = {
            value,
            title: "PAYMENTS.NEW",
            action: "PAYMENTS.BUTTONS.ADD",
        };
        const dialogRef = this.dialog.open(ExcepcionalDialogPage, { data: params });
        dialogRef.updateSize('100%');
        dialogRef.afterClosed().subscribe((src: any) => {
            if (src) {
                this.loadPage();
            }
        });
    }

}
