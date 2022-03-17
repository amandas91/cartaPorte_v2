import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as english } from 'app/i18n/en/clients';
import { locale as spanish } from 'app/i18n/es/clients';

@Component({
  selector: 'app-rfc',
  templateUrl: './rfc.page.html'
})
export class RfcPage implements OnInit {

  constructor(    
    private _fuseTranslationLoaderService: FuseTranslationLoaderService,
    private fb: FormBuilder,) { 
    this._fuseTranslationLoaderService.loadTranslations(english, spanish);
  }

  ngOnInit(): void {
  }

}
