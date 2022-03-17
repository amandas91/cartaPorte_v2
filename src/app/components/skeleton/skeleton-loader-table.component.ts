import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { of, ReplaySubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import icSearch from '@iconify/icons-ic/twotone-search';
import icFilterList from '@iconify/icons-ic/twotone-filter-list';
import { MatTableDataSource } from '@angular/material/table';

import { TableColumn } from '@fuse/interfaces/table-column.interface';
import { fuseAnimations } from '../../../@fuse/animations/index';


@Component({
  selector: 'skeleton-loader-table',
  templateUrl: './skeleton-loader-table.component.html',
  animations: fuseAnimations,
})
export class SkeletonLoaderTableComponent implements OnInit {

  layoutCtrl = new FormControl('boxed');
  dataSource: MatTableDataSource<any> | null;
  subject$: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  data$: Observable<any[]> = this.subject$.asObservable();
  columns: TableColumn<any>[] = [
    { label: 'id', property: 'id', type: 'text', visible: true},
    { label: 'Col1', property: 'col1', type: 'text', visible: true},
    { label: 'Col2', property: 'col2', type: 'text', visible: true},
    { label: 'Col3', property: 'col3', type: 'text', visible: true}
  ];
  icSearch = icSearch;
  icFilterList = icFilterList;
  dataSkeleton: any[];

  constructor() { }

  ngOnInit(): void {
    this.getData().subscribe(dataSkeleton => {
      this.subject$.next(dataSkeleton);
    });

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(
      filter<any[]>(Boolean)
    ).subscribe(dataSkeleton => {
      this.dataSkeleton = dataSkeleton;
      this.dataSource.data = dataSkeleton;
    });
  }

  getData() {
    return of([
      {id: '', col1: '', col2: '', col3: ''},
      {id: '', col1: '', col2: '', col3: ''},
      {id: '', col1: '', col2: '', col3: ''}
    ]);
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

}
