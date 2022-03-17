import { Component, OnInit } from "@angular/core";
import { fuseAnimations } from "../../../@fuse/animations/index";
import { locale as english } from "app/i18n/en/admin-dashboard";
import { locale as spanish } from "app/i18n/es/admin-dashboard";
import { FuseTranslationLoaderService } from "../../../@fuse/services/translation-loader.service";

@Component({
    selector: "app-admin-dashboards",
    templateUrl: "./admin-dashboards.page.html",
    animations: fuseAnimations,
})
export class AdminDashboardsPage implements OnInit {
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, spanish);
    }
    ngOnInit(): void {}
}
