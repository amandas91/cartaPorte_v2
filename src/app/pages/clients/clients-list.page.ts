import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { TableColumn } from "@fuse/interfaces/table-column.interface";
import { HeaderProperties } from "app/models/core/header-properties.model";
import { ButtonProperties } from "app/shared/models/button-properties.model";
import { Router } from "@angular/router";
import { CatOrigen } from "../../shared/util/cat-origen";
import { ClientsDialogPage } from "./clients-dialog.page";
import { MatDialog } from "@angular/material/dialog";
import { Clients } from "app/models/core/clients.model";
import { IClients } from "../../models/core/clients.model";
import { FuseTranslationLoaderService } from "../../../@fuse/services/translation-loader.service";
import { TranslateService } from "@ngx-translate/core";
import { locale as english } from "app/i18n/en/clients";
import { locale as spanish } from "app/i18n/es/clients";
import { ClientsService } from '../../services/operacion/client.service';
import { HttpResponse, HttpHeaders } from "@angular/common/http";
@Component({
    selector: "app-clients-list",
    templateUrl: "./clients-list.page.html",
})
export class ClientsListPage implements OnInit {
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

    @Output()
    clientSelect: EventEmitter<Clients> = new EventEmitter();


    constructor(
        public router: Router,
        private dialog: MatDialog,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private translate: TranslateService,
        private valueService:ClientsService
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, spanish);
    }

    ngOnInit(): void {
        this.loadPage();
        this.columns = this.getColumns(this.origen);
        this.headerProperties = this.getHeaderProperties();
        this.buttons = this.getButtons();
    }

    ngOnChanges(changes: any) {
        // Hack para regenerar los botones
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
            case "delete":
                // this.delete(value);
                console.log("DELTE");
                break;
            case "view":
                console.log("VIEW");
                // this.view(value);
                this.router.navigate([`/client`]);
                break;
            case "update":
                console.log("UPDATE");
                // this.update(value.id);
                break;
            case "select":
                console.log("select");
                this.select(value);
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
            label: "ID(DK)",
            property: "id",
            type: "text",
            visible: true,
        });

        columns.push({
            label: this.translate.instant('CLIENTS.COLUMNS.NAME'),
            property: "name",
            type: "text",
            visible: true,
        });
        columns.push({
            label: this.translate.instant('CLIENTS.COLUMNS.LAST_NAME'),
            property: "last_name_father",
            type: "text",
            visible: true,
        });
        
        if (origen === CatOrigen.CLIENTS) {
            columns.push({
                label: "EMAIL",
                property: "email",
                type: "text",
                visible: true,
            });
            columns.push({
                label: "RFC",
                property: "rfc",
                type: "text",
                visible: true,
            });
            columns.push({
                label: this.translate.instant('CLIENTS.COLUMNS.CONTACT'),
                property: "contacto",
                type: "text",
                visible: true,
            });
        }
        columns.push({
            label: this.translate.instant('CLIENTS.COLUMNS.ACTIONS'),
            property: "buttonsActions",
            type: "button",
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
        return columns;
    }

    getButtons(): ButtonProperties[] {
        const buttons: ButtonProperties[] = [];
        if( this.origen !== CatOrigen.BUDGET ){
            buttons.push({
                title: "Ver Detalle",
                actionType: "view",
                icon: "edit",
            });
        }

        if( this.origen === CatOrigen.BUDGET ){
            buttons.push({
                title: "Seleccionar",
                actionType: "select",
                icon: "touch_app",
            });
        }

        // if (this.hasRol([Authority.ADMIN, Authority.COORDINADOR]) && this.origen === CatOrigen.EXPEDIENTE) {
        // buttons.push({
        //     title: "Asignar",
        //     actionType: "assign",
        //     icon: "people_alt",
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

    view(value: Clients): void {
    const params = {
      value,
      title: "CLIENTS.UPDATE"
    };
    const dialogRef = this.dialog.open(ClientsDialogPage, { data: params });
        dialogRef.updateSize('100%');
        dialogRef.afterClosed().subscribe((src: any) => {
            if (src) {
                this.loadPage();
                // this.message('Creado');
            }
        });
    }

    select(value: Clients): void {
        this.clientSelect.emit(value);
    }

    newItem(): void {
        const value: IClients = new Clients();
        // value.trip_id = this.trip_id;
        const params = {
          value,
          title: "CLIENTS.NEW"
        };
        const dialogRef = this.dialog.open(ClientsDialogPage, { data: params });
        dialogRef.updateSize("100%");
        dialogRef.afterClosed().subscribe((src: any) => {
            if (src) {
                this.loadPage();
                // this.message('Creado');
            }
        });
    }
}
