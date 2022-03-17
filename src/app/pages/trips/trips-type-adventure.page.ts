import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CatAdventuresService } from '../../services/catalogos/cat-adventures.service';
import { ICatAdventures } from '../../models/catalogos/cat-adventures.model';
import { HttpResponse } from '@angular/common/http';
import { MatListOption } from '@angular/material/list/selection-list';


@Component({
  selector: 'app-trips-type-adventure',
  templateUrl: './trips-type-adventure.page.html',
  animations: fuseAnimations
})
export class TripsTypeAdventurePage implements OnInit {

  catAdventures: ICatAdventures[] = [];
  catAdventuresTrip: ICatAdventures[];
  selectedOptions = [];

  @Input()
  trip_id: number;


  @Output()
  adventures: EventEmitter<any> = new EventEmitter<any>();

  constructor(private catAdventuresService: CatAdventuresService) { }

  ngOnInit(): void {
    this.loadPage();
  }

  private loadPage() {
    const MaxItems = 2000;
    this.catAdventuresService
      .query({ size: MaxItems })
      .subscribe((res: HttpResponse<ICatAdventures[]>) => (this.catAdventures = res.body || []));
      if( this.trip_id ){
        this.catAdventuresService
          .queryByTrip({ size: MaxItems }, this.trip_id)
          .subscribe((res: HttpResponse<ICatAdventures[]>) => (this.catAdventuresTrip = res.body || []));
      }
  }

  onNgModelChange($event) {
    // console.log("#### ",  $event); 
    this.adventures.emit($event); 
  }

  getSelect(item): boolean{
    let aux = false;
    // console.log('getSelect: ', item);
    if(this.catAdventuresTrip && this.catAdventuresTrip.length > 0){
      
        this.catAdventuresTrip.forEach(scr => {
          if (item.id === scr.id) {
            
            aux = true;        
          } 
        });
        
    }
    return aux;
  }

}
