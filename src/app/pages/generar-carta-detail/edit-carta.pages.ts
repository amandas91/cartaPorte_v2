
import { Component, OnInit } from "@angular/core";
import { locale as english } from "app/i18n/en/trips";
import { locale as spanish } from "app/i18n/es/trips";
import { MAT_STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";
import { ActivatedRoute, Router } from '@angular/router';
import { ICatOwners } from "app/models/catalogos/cat-owners.model";
import { CatOrigen } from "app/shared/util/cat-origen";
import { Authority } from "app/shared/constant/authority.constants";
import { AccountService } from "app/shared/auth/account.service";
import { FuseTranslationLoaderService } from "@fuse/services/translation-loader.service";
import { fuseAnimations } from "@fuse/animations";


@Component({
  selector: 'app-generar-carta',
  templateUrl: './generar-carta.page.html',
  animations: fuseAnimations,
  styleUrls: ['./generar-carta.page.scss']
})
export class EditCartaPages implements OnInit {

    isLinear = false;
    index = 0;
    extras: any;
    trip_id: number;
    nameTrip: string;
    record: string;
    CatOrigen = CatOrigen;
    Authority = Authority;

    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        protected router: Router,
        protected activatedRoute: ActivatedRoute,
        protected accountService: AccountService,
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, spanish);
        this.extras = this.router.getCurrentNavigation().extras;
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(params => {
            console.log('params: ', params);
            this.trip_id = params.id;
        });
    }

    ngAfterContentInit(): void {
        if (this.extras.state) {
            console.log('ngAfterContentInit ');
            this.index = this.extras.state.index;
        }
    }


}
