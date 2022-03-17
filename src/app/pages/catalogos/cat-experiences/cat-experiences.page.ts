import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

import { fuseAnimations } from "@fuse/animations";
import { locale as english } from "app/i18n/en/trips";
import { locale as spanish } from "app/i18n/es/trips";
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

@Component({
    selector: "app-cat-experiences",
    templateUrl: "./cat-experiences.page.html",
    animations: fuseAnimations,
})
export class CatExperiencesPage implements OnInit {
    dialogRef: any;
    hasSelectedContacts: boolean;
    searchInput: FormControl;

    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;

    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, spanish);
    }

    ngOnInit(): void {}
}
