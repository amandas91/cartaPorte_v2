import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
    name: string;
    position: string;
    weight: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    { position: '1MX', name: 'Turquija - Ana Laura', weight: '04-09-2020 al 15-10-2020'},
    { position: '2MX', name: 'China - Cristina ', weight: '04-09-2020 al 15-10-2020' },
    { position: '3MX', name: 'Cabos - Soledad Lopez', weight: '04-09-2020 al 15-10-2020'},
    { position: '4MX', name: 'Grecia - Ramon Solano', weight: '04-09-2020 al 15-10-2020' },
    { position: '5MX', name: 'Tailandoa - Amanda', weight: '04-09-2020 al 15-10-2020'},
    { position: '6MX', name: 'Estados Unidos - Mari carmen', weight: '04-09-2020 al 15-10-2020'},
    { position: '7MX', name: 'España - Patricia ', weight: '04-09-2020 al 15-10-2020' },
];

@Component({
    selector: 'app-record',
    templateUrl: './record.page.html'
})
export class RecordPage implements OnInit {
    displayedColumns: string[] = ['position', 'name', 'weight'];
    dataSource = ELEMENT_DATA;

    constructor() {}

    ngOnInit(): void {}
}
