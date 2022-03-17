import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CatExperiences } from 'app/models/catalogos/cat-experiences.model';
import { CatMarginDetailPage } from './cat-margin-detail.page';

@Component({
  selector: 'app-cat-margin-dialog',
  templateUrl: './cat-margin-dialog.page.html'
})
export class CatMarginDialogPage implements OnInit {

  parentForm: FormGroup;

  title: string;

  value: CatExperiences;

  @ViewChild(CatMarginDetailPage, { static: false })
  updateComponent?: CatMarginDetailPage;

  constructor(
      public dialogRef: MatDialogRef<any>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private fb: FormBuilder
    ) {
      if (data) {
        console.log('ENTRA: ', data);
        this.title = data.title;
        this.value = data.catExperiences;
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
