import { Component, OnInit } from "@angular/core";
import { fuseAnimations } from "../../../@fuse/animations/index";
import { FuseTranslationLoaderService } from '../../../@fuse/services/translation-loader.service';
import { locale as english } from 'app/i18n/en/clients';
import { locale as spanish } from 'app/i18n/es/clients';
import { CatOrigen } from '../../shared/util/cat-origen';

@Component({
    selector: "app-clients",
    templateUrl: "./clients.page.html",
    animations: fuseAnimations,
})
export class ClientsPage implements OnInit {

    CatOrigen = CatOrigen;

    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, spanish);
    }
    ngOnInit(): void {}
}
