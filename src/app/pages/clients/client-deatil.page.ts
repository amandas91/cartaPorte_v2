import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as english } from 'app/i18n/en/clients';
import { locale as spanish } from 'app/i18n/es/clients';

@Component({
  selector: 'app-client-deatil',
  templateUrl: './client-deatil.page.html'
})
export class ClientDeatilPage implements OnInit {

  editForm = this.fb.group({
    name:  [null, []],
    second_name:  [null, []],
    last_name_father:  [null, []],
    last_name_mother:  [null, []],
    email:  [null, []]
  });

  constructor(
    private _fuseTranslationLoaderService: FuseTranslationLoaderService,
    private fb: FormBuilder,
  ) {
    this._fuseTranslationLoaderService.loadTranslations(english, spanish);
  }

  ngOnInit(): void {
  }

}
