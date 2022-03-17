import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CatRates } from 'app/models/catalogos/cat-rates.model';
import { CatRatesDetailPage } from './cat-rates-detail.page';

@Component({
  selector: 'app-cat-rates-dialog',
  templateUrl: './cat-rates-dialog.page.html'
})
export class CatRatesDialogPage implements OnInit {

  parentForm: FormGroup;

  title: string;

  
  value: CatRates;

  @ViewChild(CatRatesDetailPage, { static: false })
  updateComponent?: CatRatesDetailPage;

  constructor(
      public dialogRef: MatDialogRef<any>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private fb: FormBuilder
    ) {
      if (data) {
        console.log('ENTRA: ', data);
        this.title = data.title;
        this.value = data.catRates;
      }
    }
  
    ngOnInit(): void {
      this.parentForm = this.fb.group({});
      this.title = this.data.title;
    }
  
    auxSave(scr: any): void {
      if(scr){
        this.dialogRef.close(scr);
      }
      // this.eventManager.broadcast('expedienteListModification');
    }

}
