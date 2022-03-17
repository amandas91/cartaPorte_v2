import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { ClientsDetailPage } from './clients-detail.page';
import { locale as english } from "app/i18n/en/clients";
import { locale as spanish } from "app/i18n/es/clients";
import { Clients } from '../../models/core/clients.model';

@Component({
  selector: 'app-clients-dialog',
  templateUrl: './clients-dialog.page.html'
})
export class ClientsDialogPage implements OnInit {

  parentForm: FormGroup;

  title:string;
  value: Clients;

  @ViewChild(ClientsDetailPage, { static: false })
  updateComponent?: ClientsDetailPage;

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _fuseTranslationLoaderService: FuseTranslationLoaderService,
  ) {
    this.parentForm = this.fb.group({});
    this._fuseTranslationLoaderService.loadTranslations(english, spanish);
    if (data) {
      console.log('#### DATA: ', data);
      this.title = data.title;
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

}
