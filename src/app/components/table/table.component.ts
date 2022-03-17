import { Component, OnInit, OnDestroy, Input, ViewChild, AfterContentInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import icview_headline from '@iconify/icons-ic/twotone-view-headline';
import icSearch from '@iconify/icons-ic/twotone-search';
import icFilterList from '@iconify/icons-ic/twotone-filter-list';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icAdd from '@iconify/icons-ic/twotone-add';

import { HeaderProperties } from 'app/models/core/header-properties.model';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { TableColumn } from '@fuse/interfaces/table-column.interface';
import { fuseAnimations } from '@fuse/animations';

import { Router, NavigationEnd,ActivatedRoute} from "@angular/router";

import { TripsService } from '../../services/operacion/trips.service';
import { ITrips, Trips } from "../../models/core/trips.model";
import { HttpResponse } from "@angular/common/http";
import { map } from "rxjs/operators";
import Swal from 'sweetalert2';


@Component({
  selector: 'fuse-table',
  templateUrl: './table.component.html',
  animations: fuseAnimations
})
export class TableComponent implements OnInit, AfterContentInit, OnDestroy {
  private _data: any[];

  @Input()
  set data(value: any[]) {
    this._data = value;
    this.subject$.next(this._data);
    this.isLoading = false;
  }

  @Input()
  columns: TableColumn<any>[];

  @Input()
  totalItems = 0;

  @Input()
  pageSize = 10;

  @Input()
  pageSizeOptions: number[] = [5, 10, 20, 50];

  @Input()
  headerProperties: HeaderProperties = { header: true, search: true, filterColumns: true, refreshButton: true, refreshTitle: 'Recargar', addButton: true, addTitle: 'Agregar',  updateButton: true};

  @Input()
  buttons: any[] = [];

  @Input()
  buttonsExt: any[] = [];

  @Input()
  cssRow: any;

  @Input()
  headerTitle: string;

  @Input()
  headerTitleNotData: string;

  @Input()
  showFirstLastButtons = false;

  @Input()
  autoHidePageButtons = false;

  @Input()
  tableHeight = 400;

  @Input()
  stickyActionButtons = false;

  @Output()
  paginatorEvents: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  buttonsEvents: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  buttonsExtEvents: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  addEvent: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  refreshEvent: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  layoutCtrl = new FormControl('boxed');
  subject$: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  @Input()
  data$: Observable<any[]> = this.subject$.asObservable();
  elements: any[];
  dataSource: MatTableDataSource<any> | null;
  searchCtrl = new FormControl();

  icview_headline = icview_headline;
  icSearch = icSearch;
  icFilterList = icFilterList;
  icEdit = icEdit;
  icAdd = icAdd;
  fileToUpload: File | null = null;
  isLoading = false;
  value: Trips;
  update = true;
  @Output()
    trip: EventEmitter<Trips> = new EventEmitter<Trips>();


  constructor(public router: Router,protected valueService: TripsService) {}

  ngOnInit(): void {}

  ngAfterContentInit(): void {
    if (this.totalItems > this.pageSize) { this.autoHidePageButtons = false; }
    if (this.paginator) {
      this.paginator.pageSize = this.pageSize;

      // this.paginator._intl.itemsPerPageLabel = 'Registros por Página:';
      // this.paginator._intl.nextPageLabel = 'Página Siguiente';
      // this.paginator._intl.previousPageLabel = 'Página Anterior';
      // this.paginator._intl.firstPageLabel = 'Primera Página';
      // this.paginator._intl.lastPageLabel = 'Última Página';

      // this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      //   if (length === 0 || pageSize === 0) { return `0 de ${length}`; }

      //   length = Math.max(length, 0);
      //   const startIndex = page * pageSize;

      //   const endIndex = startIndex < length ?
      //   Math.min(startIndex + pageSize, length) :
      //   startIndex + pageSize;

      //   return `${startIndex + 1} - ${endIndex} de ${length}`;
      // };
    }

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(filter<any[]>(Boolean)).subscribe(elements => {
      this.elements = elements;
      this.dataSource.data = elements;
    });

    this.searchCtrl.valueChanges.pipe(untilDestroyed(this)).subscribe(value => this.onFilterChange(value));

    this.dataSource.sort = this.sort;
  }

  onFilterChange(value: string): void {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  toggleColumnVisibility(column: any, event: any): void {
    event.stopPropagation();
    event.stopImmediatePropagation();
    column.visible = !column.visible;
  }

  trackByProperty<T>(index: number, column: TableColumn<T>): any {
    return column.property;
  }

  ngOnDestroy() {}

  handlePage(event: any): void {
    this.isLoading = true;
    this.paginatorEvents.emit(event);
  }

  handleActions(row: any, actionType: any, idx: number): void {
    this.buttonsEvents.emit({ row, actionType, idx });
  }

  onFileInput(row: any, actionType: any, idx: number, files: FileList,): void {
    console.log('files: ' + files)
    this.fileToUpload = files.item(0);
    const formData = new FormData(); 
    // Store form name as "file" with file data
    formData.append("file", this.fileToUpload, this.fileToUpload.name);
    this.buttonsEvents.emit({row, actionType, idx, formData });
  }

  handleExtActions(row: any, actionType: any, idx: number): void {
    // console.log('Extra action..');
    this.buttonsExtEvents.emit({ row, actionType, idx });
  }

  eventAdd(): void {
    this.addEvent.emit();
  }

  refreshAdd(): void {
    this.refreshEvent.emit();
  }

  eventUpdate(): void{
    Swal.fire({
      title: 'Loading...',
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      }
      
    })
    
    //this.isLoading = true;
    this.valueService
      .findTC(1)
      .pipe(
          map((res: HttpResponse<ITrips>) => {
              return res.body ? res.body : new Trips();
          })
      )
      .subscribe((resBody: ITrips) => {
          this.value = resBody;
          this.trip.emit(this.value);
          //this.isLoading = false;
          Swal.close();
          window.location.reload();
          return this.router.navigateByUrl('/trips');

          // this.router.navigate([`/trips/`]);

      });
    
  }


  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  // tslint:disable-next-line: adjacent-overload-signatures
  get data() {
    return this._data;
  }

  getClass(evt: any): string {
    // console.log(evt);
    return undefined;
  }

  validateField(field: string, data: any): boolean {
    if (field === undefined || field === null) {
      return true;
    }

    if (field.indexOf('!=') >= 0) {
      const oper = field.split('!=');
      const val = data[oper[0].replace('!', '')];
      const val2 = parseInt(oper[1], 10);
      return val !== val2;
    }

    if (field.indexOf('&') >= 0) {
      const oper = field.split('&');
      const val = data[oper[0]];
      const val2 = oper[1];
      return val === val2;
    }

    if (field.indexOf('=') >= 0) {
      const oper = field.split('=');
      const val = data[oper[0]];
      const val2 = parseInt(oper[1], 10);
      return val === val2;
    }

    if (field.indexOf('>') >= 0) {
      const oper = field.split('>');
      const val = data[oper[0]];
      const val2 = parseInt(oper[1], 10);
      return val > val2;
    }
    if (field.indexOf('<') >= 0) {
      const oper = field.split('<');
      const val = data[oper[0]];
      const val2 = parseInt(oper[1], 10);
      return val < val2;
    }

    if (field.indexOf('!') >= 0) {
      const val = data[field.replace('!', '')];
      return val === undefined || val === null || val === false;
    } else {
      const val = data[field];
      return val !== undefined && val !== null && val;
    }
  }

  getValue(row: any, path: string): any {
    if (row === undefined || row === null) { return; }
    const pathX = path.split(/[\.\[\]\"\']{1,2}/);
    let obj = row;
    for (let i = 0, l = pathX.length; i < l; i++) {
        if (pathX[i] === '') { continue; }
        obj = obj[pathX[i]];
        if (obj === undefined || obj === null) { return; }
    }
    return obj;
  }
}
