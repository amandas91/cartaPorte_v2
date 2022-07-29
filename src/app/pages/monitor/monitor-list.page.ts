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
import { MonitorDialogPages } from "./monitor-dialog.pages";
import { FormBuilder } from "@angular/forms";
import { map } from "rxjs/operators";
import Swal from "sweetalert2";
import { DatePipe } from "@angular/common";
import { property } from "lodash";



@Component({
  selector: 'app-monitor-list',
  templateUrl: './monitor-list.page.html',
  styleUrls: ['./monitor-list.page.scss']
})


export class MonitorListPage implements OnInit {

    editForm = this.fb.group({
        comprobante: [null, []],
        fechaEntrega: [null, []],
        estatus: [null, []],
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


  constructor(
    private fb: FormBuilder,
    public router: Router,
      private dialog: MatDialog,
      private _fuseTranslationLoaderService: FuseTranslationLoaderService,
      private translate: TranslateService,
      private valueService:MonitoreoService
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

      this.valueService.findByUser(params).subscribe(
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
            case "delete":
                // this.delete(value);
                this.newItem(value);
                break;
            case "view":
                console.log("VIEW");
                // this.view(value);
                this.router.navigate([`/editar-carta/${value.Folio}`]);
                break;
            case "pdf":
                this.valueService.findPDF(value.Referencia, "ejemplo.pdf").subscribe((resBody: any) => {
                    if (resBody.error) {
                        Swal.fire({
                            title: 'Conflicto',
                            text: resBody.error,
                            icon: 'warning',
                            showCloseButton: true,
                          });
                    } else {

                        const source = `data:application/pdf;base64,${resBody.data}`;
                        const link = document.createElement("a");
                        link.href = source;
                        link.download =`${value.Referencia}.pdf`
                        link.click();
                        Swal.close()
        
                    }
        
        
                  });
             break;
            case "xml":
                this.valueService.findXML(value.Referencia, "ejemplo.xml").subscribe((resBody: any) => {
                    if (resBody.error) {
                        Swal.fire({
                            title: 'Conflicto',
                            text: resBody.error,
                            icon: 'warning',
                            showCloseButton: true,
                          });
                    } else {
                        const source = `data:application/xml;base64,${resBody.data}`;
                        const link = document.createElement("a");
                        link.href = source;
                        link.download =`${value.Referencia}.xml`
                        link.click();
                        Swal.close()
        
                    }
        
        
                  });
                break;
          case "update":
              console.log("UPDATE");
              // this.update(value.id);
              break;
          case "select":
              console.log("select");
              this.select(value);
              break;
            case "observacion":
                this.observacion(value.Cancelacion);
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
            label: "Folio Temporal",
            property: "Folio",
            type: "text",
            visible: true,
        });

        columns.push({
            label: "Folio Timbrado",
            property: "FolioTimbrado",
            type: "text",
            visible: true,
        });

        columns.push({
            label: "Referencia",
            property: "Referencia",
            type: "text",
            visible: true,
        });

        // columns.push({
        //     label: "Origen",
        //     property: "CPDRP",
        //     type: "text",
        //     visible: true,
        // });

        columns.push({
            label: "Estatus",
            property:  "Estatus",
            type: "text",
            visible: true
           
        });
        
       
        columns.push({
            label: "Fecha Creación ",
            property: "CreateDate",
            type: "text",
            visible: true,
        });

        columns.push({
            label: "Cancelación",
            property: "Cancelacion.estatus",
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
            title: "XML",
            actionType: "xml",
            icon: "file_copy",
            canDisplay: "Referencia"
        });

        buttons.push({
            title: "PDF",
            actionType: "pdf",
            icon: "picture_as_pdf",
            canDisplay: "Referencia"
        });

        buttons.push({
            title: "Ver Detalle",
            actionType: "view",
            icon: "edit",
            canDisplay: "!Historico"
        });

        buttons.push({
            title: "Cancelar",
            actionType: "delete",
            icon: "cancel",
            canDisplay: "Referencia"
        });
        
        buttons.push({
            title: "Observación",
            actionType: "observacion",
            icon: "contact_support",
            canDisplay: "Cancelacion"
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

  view(value: Clients): void {
  const params = {
    value,
    title: "CLIENTS.UPDATE"
  };

  const dialogRef = this.dialog.open(MonitorDialogPages, { data: params });
      dialogRef.updateSize('100%');
      dialogRef.afterClosed().subscribe((src: any) => {
          if (src) {
              this.loadPage();
              // this.message('Creado');
          }
      });
  }

  select(value: Monitoreo): void {
      this.clientSelect.emit(value);
     
  }

 

  newItem(value: Monitoreo): void {
    //   console.log("AQUI ENTRA");
    //   console.log(value);
      // value.trip_id = this.trip_id;
      const params = {
        value,
        title: "CLIENTS.NEW"
      };
      const dialogRef = this.dialog.open(MonitorDialogPages, { data: params });
      dialogRef.updateSize("100%");
      dialogRef.afterClosed().subscribe((src: any) => {
        this.loadPage();
          if (src) {
              this.loadPage();
              // this.message('Creado');
          }
      });
  }

  search(page?: any): void {
      
    const estatus = this.editForm.controls['estatus'].value;
    const fechaEntrega =  this.datepipe.transform(this.editForm.controls['fechaEntrega'].value, 'YYYY-MM-dd');
   
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


    this.valueService.findByFechaEstatus(estatus,fechaEntrega).subscribe(
        (res: HttpResponse<any[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
        (err) => this.onError(err)
      );
  }

  observacion(observacion){
    let html = `<p>Id Comprobante: ${observacion.idComprobante}</p>
    <p>Fecha Cancelación: ${observacion.fechaCancelacion}</p>`

    if(observacion.folioSustitucion != null){
       
        html +=  `<p>Folio Sustitución: ${observacion.folioSustitucion}</p>`
    }

    if(observacion.error != null){
        html += `<p>${observacion.error}</p>`
    }
    Swal.fire({
        title: 'Observación',
        text: '',
        html: html,
        icon: 'warning',
        showCloseButton: true,
      });
  }
}