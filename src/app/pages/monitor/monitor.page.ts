import { Component, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as english } from 'app/i18n/en/clients';
import { locale as spanish } from 'app/i18n/es/clients';
import { CatOrigen } from 'app/shared/util/cat-origen';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.page.html',
  styleUrls: ['./monitor.page.scss']
})
export class MonitorPage implements OnInit {

  CatOrigen = CatOrigen;
  
  constructor(private _fuseTranslationLoaderService: FuseTranslationLoaderService) 
  {
    this._fuseTranslationLoaderService.loadTranslations(english, spanish);
  }

  ngOnInit(): void {
  }

}
