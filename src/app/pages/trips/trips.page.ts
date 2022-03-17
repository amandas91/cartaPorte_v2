import { Component, OnInit } from "@angular/core";
import { locale as english } from "app/i18n/en/trips";
import { locale as spanish } from "app/i18n/es/trips";
import { FuseTranslationLoaderService } from "../../../@fuse/services/translation-loader.service";
import { fuseAnimations } from '../../../@fuse/animations/index';
import { AccountService } from "app/shared/auth/account.service";
import { Authority } from "app/shared/constant/authority.constants";

@Component({
    selector: "app-trips",
    templateUrl: "./trips.page.html",
    animations: fuseAnimations,
})
export class TripsPage implements OnInit {
    Authority = Authority;

    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        protected accountService: AccountService,
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, spanish);
    }

    ngOnInit(): void {}

    hasRol(authorities: string[] | string): boolean {
        return this.accountService.hasAnyAuthority(authorities);
      }
}
