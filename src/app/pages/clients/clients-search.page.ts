import { Component, OnInit } from '@angular/core';
import { locale as english } from 'app/i18n/en/clients';
import { locale as spanish } from 'app/i18n/es/clients';
import { FuseTranslationLoaderService } from '../../../@fuse/services/translation-loader.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-clients-search',
  templateUrl: './clients-search.page.html'
})
export class ClientsSearchPage implements OnInit {

  editForm = this.fb.group({
    name: [null, []],
    last_name: [null, []],
    email: [null, []],
    rfc: [null, []],
    fechaInicial: [null, []],
  });

  constructor(
    private _fuseTranslationLoaderService: FuseTranslationLoaderService,
    private fb: FormBuilder,
  ) {
    this._fuseTranslationLoaderService.loadTranslations(english, spanish);
  }

  ngOnInit(): void {
  }

  search() {

  }

  cancelar() {

  }

}
