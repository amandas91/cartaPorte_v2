import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { Rfc } from 'app/models/core/rfc.model';
import { RfcDetailPage } from './rfc-detail.page';

@Component({
  selector: 'app-rfc-dialog',
  templateUrl: './rfc-dialog.component.html'
})
export class RfcDialogComponent implements OnInit {

  parentForm: FormGroup;

  title: string;
  accion: string;
  value: Rfc;

  @ViewChild(RfcDetailPage, { static: false })
  updateComponent?: RfcDetailPage;

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _fuseTranslationLoaderService: FuseTranslationLoaderService,
  ) {
    this.parentForm = this.fb.group({});
    // this._fuseTranslationLoaderService.loadTranslations(english, spanish);
    if (data) {
      console.log('#### DATA: ', data);
      this.title = data.title;
      this.accion = data.accion;
      this.value = data.value;
    }
  }
  ngOnInit(): void {
  }

  auxSave(scr: any): void {
    if (scr) {
      this.dialogRef.close(scr);
    }
  }

  formChange(name: string, form: FormGroup): void {
    if (this.parentForm) {
      this.parentForm.setControl(name, form);
    }
  }
}
