import { DataSource } from '@angular/cdk/table';
import { Component } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { FuseUtils } from '@fuse/utils';

// import { locale as english } from 'app/i18n/en/en';
// import { locale as spanish } from 'app/i18n/es/es';
import { BehaviorSubject, Observable, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector   : 'fuse-sample',
    templateUrl: './sample.component.html',
    animations: fuseAnimations
})
export class SampleComponent{
    dataSource: FilesDataSource | null;
    displayedColumns = ['id', 'reference', 'customer', 'total', 'payment', 'status', 'date'];

    constructor(
        // private _fuseTranslationLoaderService: FuseTranslationLoaderService
    )
    {
        // this._fuseTranslationLoaderService.loadTranslations(english, spanish);
    }
}

export class FilesDataSource extends DataSource<any>
{
    // Private
    private _filterChange = new BehaviorSubject('');
    private _filteredDataChange = new BehaviorSubject('');
    dataSource: any[];

    /**
     * Constructor
     *
     * @param {EcommerceOrdersService} _ecommerceOrdersService
     * @param {MatPaginator} _matPaginator
     * @param {MatSort} _matSort
     */
    constructor(
        // private _ecommerceOrdersService: EcommerceOrdersService,
        private _matPaginator: MatPaginator,
        private _matSort: MatSort
    )
    {
        super();

        this.filteredData = [];
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    // Filtered data
    get filteredData(): any
    {
        return this._filteredDataChange.value;
    }

    set filteredData(value: any)
    {
        this._filteredDataChange.next(value);
    }

    // Filter
    get filter(): string
    {
        return this._filterChange.value;
    }

    set filter(filter: string)
    {
        this._filterChange.next(filter);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     *
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]>
    {
        const displayDataChanges = [
            // this._ecommerceOrdersService.onOrdersChanged,
            this._matPaginator.page,
            this._filterChange,
            this._matSort.sortChange
        ];

        return merge(...displayDataChanges).pipe(map(() => {

                // let data = this._ecommerceOrdersService.orders.slice();
                let data = [];

                data = this.filterData(data);

                this.filteredData = [...data];

                data = this.sortData(data);

                // Grab the page's slice of data.
                const startIndex = this._matPaginator.pageIndex * this._matPaginator.pageSize;
                return data.splice(startIndex, this._matPaginator.pageSize);
            })
        );

    }

    /**
     * Filter data
     *
     * @param data
     * @returns {any}
     */
    filterData(data): any
    {
        if ( !this.filter )
        {
            return data;
        }
        return FuseUtils.filterArrayByString(data, this.filter);
    }

    /**
     * Sort data
     *
     * @param data
     * @returns {any[]}
     */
    sortData(data): any[]
    {
        if ( !this._matSort.active || this._matSort.direction === '' )
        {
            return data;
        }

        return data.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';

            switch ( this._matSort.active )
            {
                case 'id':
                    [propertyA, propertyB] = [a.id, b.id];
                    break;
                case 'reference':
                    [propertyA, propertyB] = [a.reference, b.reference];
                    break;
                case 'customer':
                    [propertyA, propertyB] = [a.customer.firstName, b.customer.firstName];
                    break;
                case 'total':
                    [propertyA, propertyB] = [a.total, b.total];
                    break;
                case 'payment':
                    [propertyA, propertyB] = [a.payment.method, b.payment.method];
                    break;
                case 'status':
                    [propertyA, propertyB] = [a.status[0].name, b.status[0].name];
                    break;
                case 'date':
                    [propertyA, propertyB] = [a.date, b.date];
                    break;
            }

            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

            return (valueA < valueB ? -1 : 1) * (this._matSort.direction === 'asc' ? 1 : -1);
        });
    }

    /**
     * Disconnect
     */
    disconnect(): void
    {
    }
}
