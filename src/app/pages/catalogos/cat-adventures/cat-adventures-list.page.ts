import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TableColumn } from '@fuse/interfaces/table-column.interface';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { TranslateService } from '@ngx-translate/core';
import { ICatAdventures, CatAdventures } from 'app/models/catalogos/cat-adventures.model';
import { HeaderProperties } from 'app/models/core/header-properties.model';
import { ButtonProperties } from 'app/shared/models/button-properties.model';
import Swal from 'sweetalert2';
import { CatAdventuresService } from '../../../services/catalogos/cat-adventures.service';
import { locale as english } from "app/i18n/en/catalogs";
import { locale as spanish } from "app/i18n/es/catalogs";
import { CatAdventuresDialogPage } from './cat-adventures-dialog.page';

@Component({
  selector: 'app-cat-adventures-list',
  templateUrl: './cat-adventures-list.page.html'
})
export class CatAdventuresListPage implements OnInit {

  totalItems = 0;
  itemsPerPage = 5; // ITEMS_PER_PAGE;
  listCurentPage = 0;
  page!: number;
  data: any;
  pageSize: number;
  pageSizeOptions: number[] = [5, 10, 20, 50, 100];
  predicate!: string;
  ascending!: boolean;
  dialogConf = new MatDialogConfig();
  isLinear = false;

  headerProperties: HeaderProperties;
  columns: TableColumn<any>[] = [];
  buttons: ButtonProperties[];

  listPage: any[];

  list: any;
  title = "trip";

  
  @Input()
  hasDelete = false;

  constructor(
    private _fuseTranslationLoaderService: FuseTranslationLoaderService,
    private translate: TranslateService,
    public router: Router,
    private dialog: MatDialog,
    protected valueService: CatAdventuresService
  ) {
    this._fuseTranslationLoaderService.loadTranslations(english, spanish);
    // this.translate.get('TABS.FLIGHT').subscribe((text:string) => {console.log(text)});
    // new
    // this.translate.get('TABS.FLIGHT').subscribe((text:string) => {console.log(text)});
    // this.translate.onLangChange();
  }

  ngOnInit(): void {
    this.loadPage({});
    this.columns = this.getColumns(1);
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
      () => this.onError()
    );
  }

  protected onSuccess(data: any[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.listPage = data.length > 0 ? data :  [];
    this.listCurentPage = this.page;
  }

  onError() {
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
    const idx = value.idx;
    switch (event?.actionType) {
      case "delete":
        this.delete( idx, value);
        // console.log("DELTE");
        break;
      case "view":
        console.log("VIEW");
        this.view(value);
        break;
      case "update":
        console.log("UPDATE");
        // this.update(value.id);
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
      label: 'ID',
      property: "id",
      type: "text",
      visible: true,
    });
    columns.push({
      label: this.translate.instant('CATALOGS.COLUMNS.DESCRIPTION'),
      property: "name",
      type: "text",
      visible: true,
    });

    columns.push({
      label: this.translate.instant('CATALOGS.COLUMNS.ACTIONS'),
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
      actionType: "view",
      icon: "edit",
    });

    if (this.hasDelete) {
      buttons.push({ title: 'Borrar', actionType: 'delete', icon: 'delete' });
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

  newItem(): void {
    console.log("### crear nuevo registro de Catalogs");
    const value: ICatAdventures = new CatAdventures();
    const params = {
      value,
      title: this.translate.instant('CATALOGS.DIALOG.TITLE_CREATE'),
    };
    const dialogRef = this.dialog.open(CatAdventuresDialogPage, { data: params });
    dialogRef.updateSize('50%');
    dialogRef.afterClosed().subscribe((src: any) => {
      if (src) {
        this.loadPage();
        Swal.fire({
          icon: 'success',
          timer: 1500,
        });
        // this.message('Creado');
      }
    });
  }

  view(value: CatAdventures): void {
    let data = {
      title: this.translate.instant('CATALOGS.DIALOG.TITLE_UPDATE') ,
      catAdventures: value,
    };
    this.dialogConf.data = data;

    const dialogRef = this.dialog.open(CatAdventuresDialogPage,  this.dialogConf );
    dialogRef.updateSize('50%');
    dialogRef.afterClosed().subscribe((src: any) => {
      console.log('#### RETORNO DE DIALOG ');
      if (src) {
        this.loadPage();
        // this.message('Creado');
      }
    });
  }

  delete(idx: number, element: any): void {
    Swal.fire({
      title: `¿Estás Seguro de Borrar '${element.name}'?`,
      text: 'No Podrás Revertir esta Acción',
      icon: 'warning',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Sí, Borrar Registro',
    }).then(result => {
      if (!result || result.isConfirmed === false) { return; }
      if (element && element.id) {
        console.log('Delete value: ' + JSON.stringify(element));
        this.valueService.delete(element.id).subscribe(() => {
          // this.eventManager.broadcast('actividadListModification');
          this.messageDlg('La Actividad fué Eliminada');
          this.loadPage();
        });
      } else {
        // Solo se borra de la memoria
        this.list = [...this.list.splice(idx, 1)];
        console.log('Delete value: ' + JSON.stringify(this.list[idx]));
        this.loadPage();
      }
    });
  }

  messageDlg(mensaje: string) {
    Swal.fire({
      icon: 'success',
      title: mensaje,
      showConfirmButton: false,
      showCloseButton: true,
      timer: 1500,
    });
  }
}
