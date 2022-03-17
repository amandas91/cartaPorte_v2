import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CatAdventuresDetailPage } from './cat-adventures-detail.page';
import { CatAdventures } from 'app/models/catalogos/cat-adventures.model';

@Component({
  selector: 'app-cat-adventures-dialog',
  templateUrl: './cat-adventures-dialog.page.html'
})
export class CatAdventuresDialogPage implements OnInit {
  parentForm: FormGroup;

  title: string;

  value: CatAdventures;

  @ViewChild(CatAdventuresDetailPage, { static: false })
  updateComponent?: CatAdventuresDetailPage;

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    if (data) {
      console.log('ENTRA: ', data);
      this.title = data.title;
      this.value = data.catAdventures;
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
