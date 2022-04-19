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
import { IdleService, IdleWarningStates } from "ngx-idle-timeout";
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { DatePipe } from "@angular/common";
import { AuthServerProvider } from "app/shared/auth/auth-jwt.service";
import { LoginService } from "app/shared/auth/login.service";


@Component({
  selector: 'app-generar-carta',
  templateUrl: './generar-carta.page.html',
  animations: fuseAnimations,
  styleUrls: ['./generar-carta.page.scss']
})
export class GenerarCartaPage implements OnInit {

    isLinear = false;
    index = 0;
    extras: any;
    trip_id: number;
    nameTrip: string;
    record: string;
    CatOrigen = CatOrigen;
    Authority = Authority;

    //timeout
  title = 'test-area';
  idleTimer = true;
  showTimer = true
  datepipe: DatePipe = new DatePipe('en-US')

    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        protected router: Router,
        protected activatedRoute: ActivatedRoute,
        protected accountService: AccountService,
        private localStorage: LocalStorageService,
        private _idleService: IdleService,
        private AuthServerProviderService: AuthServerProvider,
        private loginService: LoginService,
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, spanish);
        this.extras = this.router.getCurrentNavigation().extras;
    }

    ngOnInit(): void {
        this.timerSubscribe()
       

        this.activatedRoute.params.subscribe(params => {
            // console.log('params: ', params);
            this.trip_id = params.id;
        });
    }

    dateSeconds(){
        let fechaActual = Math.floor(Date.now()/1000);
        let fechaExpired = Date.parse(this.localStorage.retrieve('ExpirationDate')) /1000
        var diffSeconds = (fechaExpired - fechaActual)
        return diffSeconds
    }

    resubscribe(): void {
        this.idleTimer = true;
        this.timerSubscribe();

    }
    
    private timerSubscribe(): void {
        this._idleService
        .idleStateChanged()
        .subscribe(
            val => {
                if (val === IdleWarningStates.SecondaryTimerExpired) {
                        this._idleService.stopTimer();
                        this.idleTimer = false;
                        this.loginService.logout()
                        this.localStorage.clear('authenticationToken')
                        this.localStorage.clear('Username');
                        this.localStorage.clear('UserId');
                        this.localStorage.clear('ExpirationDate');
                        this.localStorage.clear('Verified');
                        sessionStorage.removeItem('authenticationToken')
                        sessionStorage.removeItem('Username')
                        sessionStorage.removeItem('UserId')
                        sessionStorage.removeItem('ExpirationDate')
                        sessionStorage.removeItem('Verified')
                        this.router.navigate(['/login']);
                }else if(val === IdleWarningStates.SecondaryTimerCancelled){
                    const credentials = {
                        refreshToken: this.localStorage.retrieve('RefreshToken'),
                        userid: this.localStorage.retrieve('UserId')
                    }
                
                    this.AuthServerProviderService.refreshToken(credentials).subscribe(result => {
                        console.log(result)
                    });
                }
            }
        );
    } 

    ngAfterContentInit(): void {
        if (this.extras.state) {
            console.log('ngAfterContentInit ');
            this.index = this.extras.state.index;
        }
    }


}
