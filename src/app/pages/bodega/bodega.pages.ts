import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { TableColumn } from "@fuse/interfaces/table-column.interface";
import { HeaderProperties } from "app/models/core/header-properties.model";
import { ButtonProperties } from "app/shared/models/button-properties.model";
import { Router } from "@angular/router";
import { CatOrigen } from "../../shared/util/cat-origen";
import { MatDialog } from "@angular/material/dialog";
import { Clients } from "app/models/core/clients.model";
import { IClients } from "../../models/core/clients.model";
import { FuseTranslationLoaderService } from "../../../@fuse/services/translation-loader.service";
import { TranslateService } from "@ngx-translate/core";
import { locale as english } from "app/i18n/en/clients";
import { locale as spanish } from "app/i18n/es/clients";
import { HttpResponse, HttpHeaders } from "@angular/common/http";
import { MonitoreoService } from "app/services/core/monitoreo.servce";
import { IMonitoreo, Monitoreo } from "app/models/core/monitoreo.model";
import { FormBuilder } from "@angular/forms";
import { map } from "rxjs/operators";
import Swal from "sweetalert2";
import { DatePipe } from "@angular/common";
import { MonitorDialogPages } from "../monitor/monitor-dialog.pages";
import { BodegasService } from "app/services/catalogos/cat-bodegas.service";

@Component({
  selector: 'app-bodega',
  templateUrl: './bodega.pages.html',
  styleUrls: ['./bodega.pages.scss']
})
export class BodegaPages implements OnInit {

  editForm = this.fb.group({
    nombre: [null, []],
    direccion: [null, []],
});


datepipe: DatePipe = new DatePipe('en-US')
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
clientSelect: EventEmitter<Monitoreo> = new EventEmitter();

@Output()
bodegatSelect: EventEmitter<any> = new EventEmitter();



constructor(
private fb: FormBuilder,
public router: Router,
  private dialog: MatDialog,
  private _fuseTranslationLoaderService: FuseTranslationLoaderService,
  private bodegaService:BodegasService
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

  this.bodegaService.query(params).subscribe(
    (res: HttpResponse<any[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
    (err) => this.onError(err)
  );
}

protected onSuccess(data: any[] | null, headers: HttpHeaders, page: number): void {
  console.log('onSuccess data: ', data);
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
      case "select":
          this.selectBodega(value);
          break;
      default:
          break;
  }
}

// FIXME AJUSTAR CON BASE AL MODELO QUE LE CORRESPONDA TableColumn<?>
getColumns(origen: number): TableColumn<any>[] {
  const columns: TableColumn<any>[] = [];
  //columns.push({ XML: 'Núm. PDF', property: 'IdComprobante', type: 'text', visible: true });
  
    columns.push({
        label: "Nombre",
        property: "Nombre",
        type: "text",
        visible: true,
    });

    columns.push({
      label: "Domicilio 1",
      property: "LineaDomicilio1",
      type: "text",
      visible: true,
  });

    columns.push({
        label: "Domicilio 2",
        property: "LineaDomicilio2",
        type: "text",
        visible: true,
    });

    columns.push({
        label: "CP",
        property: "CodigoPostal",
        type: "text",
        visible: true,
    });

    columns.push({
        label: "Ciudad",
        property: "Ciudad",
        type: "text",
        visible: true,
    });

    columns.push({
        label: "Estado",
        property: "Estado",
        type: "text",
        visible: true,
    });

   

  
  columns.push({
      label: 'action',
      property: "buttonsActions",
      type: "button",
      visible: true,
  });
  
  return columns;
}

getButtons(): ButtonProperties[] {
  const buttons: ButtonProperties[] = [];
   
    buttons.push({
      title: "Seleccionar",
      actionType: "select",
      icon: "touch_app",
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

selectBodega(value: any): void {
  this.bodegatSelect.emit(value);
}


search(page?: any): void {
 
const nombre = this.editForm.controls['nombre'].value;
const direccion = this.editForm.controls['direccion'].value;

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


  this.bodegaService.findByNombreDireccion(nombre, direccion).subscribe(
    (res: HttpResponse<any[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
    (err) => this.onError(err),
    
  );


  // this.bodegaService.findByNombreDireccion(nombre, direccion).pipe(
  //   map((res: HttpResponse<any[]>) => {
  //     return res.body ? res.body : [];
  //   })
  // )
  // .subscribe((resBody: any[]) => (
  //   console.log()
  //   ));



}


}
