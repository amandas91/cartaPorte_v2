import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExcepcionalDetailPage } from './excepcional-detail.page';
import { Excepcional } from '../../models/core/excepcional.model';

@Component({
  selector: 'app-excepcional-dialog',
  templateUrl: './excepcional-dialog.page.html'
})
export class ExcepcionalDialogPage implements OnInit {

  parentForm: FormGroup;

  title:string;
  value: Excepcional;
  action: string;
  origen: number;

  @ViewChild(ExcepcionalDetailPage, { static: false })
  updateComponent?: ExcepcionalDetailPage;

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.parentForm = this.fb.group({});
    if (data) {
      console.log('#### DATA: ', data);
      this.title = data.title;
      this.value = data.value;
      this.action = data.action;
      this.origen = data.origen;
    }
   }
  ngOnInit(): void {
  }

  auxSave(scr: any): void {
    if (scr) {
      this.dialogRef.close(scr);
    }
  }

}
