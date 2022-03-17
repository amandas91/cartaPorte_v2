import { Component } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as english } from 'app/i18n/en/home';
import { locale as spanish } from 'app/i18n/es/home';
import { fuseAnimations } from '@fuse/animations';
import { TableColumn } from '../../../@fuse/interfaces/table-column.interface';
import { ButtonProperties } from '../../shared/models/button-properties.model';
import { HeaderProperties } from '../../models/core/header-properties.model';
import { FormGroup } from '@angular/forms';

@Component({
    selector   : 'app-home',
    templateUrl: './home.page.html',
    animations: fuseAnimations
})
export class HomePage{



    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService
    )
    {
        this._fuseTranslationLoaderService.loadTranslations(english, spanish);
    }

    dataGraphic(src){
        console.log('Retorno de datos para grafica: ' , src);
    }


}
