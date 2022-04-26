import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { navigation } from 'app/navigation/navigation';
import { locale as navigationEnglish } from 'app/navigation/i18n/en';
import { locale as navigationTurkish } from 'app/navigation/i18n/es';
import { IdleService,IdleWarningStates  } from 'ngx-idle-timeout';

import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { LoginService } from "app/shared/auth/login.service";
import { Router } from '@angular/router';
import { AuthServerProvider } from './shared/auth/auth-jwt.service';
import { moveCursor } from 'readline';



@Component({
    selector   : 'app',
    templateUrl: './app.component.html',
    template: `<login (propagar)="procesaPropagar($event)"></login>` ,
    styleUrls  : ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy
{
    fuseConfig: any;
    navigation: any;

    


    //timeout
    title = 'Tu sesión esta por vencer';
    idleTimer:boolean//this.localStorage.retrieve('Verified')
    modalTimeOut = "modalTimeOut"


    //Refresh
    fechaActual:any;
    fechaExpired:any;
    canRefreshToken:boolean;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {DOCUMENT} document
     * @param {FuseConfigService} _fuseConfigService
     * @param {FuseNavigationService} _fuseNavigationService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {FuseSplashScreenService} _fuseSplashScreenService
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     * @param {Platform} _platform
     * @param {TranslateService} _translateService
     */
    constructor(
        @Inject(DOCUMENT) private document: any,
        private _fuseConfigService: FuseConfigService,
        private _fuseNavigationService: FuseNavigationService,
        private _fuseSidebarService: FuseSidebarService,
        private _fuseSplashScreenService: FuseSplashScreenService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _translateService: TranslateService,
        private _platform: Platform,
        private _idleService: IdleService,
        private localStorage: LocalStorageService,
        private loginService: LoginService,
        private AuthServerProviderService: AuthServerProvider,
        protected router: Router,
    )
    {
        // Get default navigation
        this.navigation = navigation;

        // Register the navigation to the service
        this._fuseNavigationService.register('main', this.navigation);

        // Set the main navigation as our current navigation
        this._fuseNavigationService.setCurrentNavigation('main');

        // Add languages
        this._translateService.addLangs(['en', 'es']);

        // Set the default language
        this._translateService.setDefaultLang('en');

        // Set the navigation translations
        this._fuseTranslationLoaderService.loadTranslations(navigationEnglish, navigationTurkish);

        // Use a language
        this._translateService.use('en');

        /**
         * ----------------------------------------------------------------------------------------------------
         * ngxTranslate Fix Start
         * ----------------------------------------------------------------------------------------------------
         */

        /**
         * If you are using a language other than the default one, i.e. Turkish in this case,
         * you may encounter an issue where some of the components are not actually being
         * translated when your app first initialized.
         *
         * This is related to ngxTranslate module and below there is a temporary fix while we
         * are moving the multi language implementation over to the Angular's core language
         * service.
         */

        // Set the default language to 'en' and then back to 'tr'.
        // '.use' cannot be used here as ngxTranslate won't switch to a language that's already
        // been selected and there is no way to force it, so we overcome the issue by switching
        // the default language back and forth.
        /**
         * setTimeout(() => {
         * this._translateService.setDefaultLang('en');
         * this._translateService.setDefaultLang('tr');
         * });
         */

        /**
         * ----------------------------------------------------------------------------------------------------
         * ngxTranslate Fix End
         * ----------------------------------------------------------------------------------------------------
         */

        // Add is-mobile class to the body if the platform is mobile
        if ( this._platform.ANDROID || this._platform.IOS )
        {
            this.document.body.classList.add('is-mobile');
        }

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Subscribe to config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {

                this.fuseConfig = config;

                // Boxed
                if ( this.fuseConfig.layout.width === 'boxed' )
                {
                    this.document.body.classList.add('boxed');
                }
                else
                {
                    this.document.body.classList.remove('boxed');
                }

                // Color theme - Use normal for loop for IE11 compatibility
                for ( let i = 0; i < this.document.body.classList.length; i++ )
                {
                    const className = this.document.body.classList[i];

                    if ( className.startsWith('theme-') )
                    {
                        this.document.body.classList.remove(className);
                    }
                }

                this.document.body.classList.add(this.fuseConfig.colorTheme);
            });

            var timeout;
            var moveCursor;
            this.canRefreshToken = false;
            console.log(document.onmousemove)
            document.onmousemove = function(){
                /**
                 * Aqui el cursor esta en mivimiento
                 */

                clearTimeout(timeout);
                console.log("Si se mueve el cursor")
                moveCursor = true
                timeout = setTimeout(function(){
                    //No m ueve el cursor
                    console.log("No se mueve el cursor")
                    moveCursor = false
                }, 5000);
            }

             setInterval(() => {
                let fechaActual = Math.floor(Date.now()/1000);
                let fechaExpired = Date.parse(this.localStorage.retrieve('ExpirationDate')) /1000
                let fechaExpiredRefresh = (Date.parse(this.localStorage.retrieve('ExpirationDate')) /1000) + 500000
                if(this.localStorage.retrieve('Verified') && moveCursor){
                    if(fechaActual > fechaExpired && fechaExpiredRefresh > fechaActual){
                        this.refreshToken()
                    }
                }else{
                    if(this.localStorage.retrieve('Verified'))
                        this.idleTimer = true

                    if(fechaActual  > fechaExpired ){
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
                    }


                }
               
             }, 15000);


             
    }

    ngAfterViewInit() {
        this.timerSubscribe();
    }

    resubscribe(): void {
        this.idleTimer = true;
        this.timerSubscribe();
      }
    
    //   private timerSubscribe(): void {
    //     this._idleService
    //       .idleStateChanged()
    //       .subscribe(
    //         val => {
    //           if (val === IdleWarningStates.SecondaryTimerExpired) {
    //             this._idleService.stopTimer();
    //             this.idleTimer = false;
    //           }
    //         }
    //       );
    //   }

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
                    console.log("aqui que pasa")
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


    refreshToken(){
        console.log("Hace el refresh")
        const credentials = {
            refreshToken: this.localStorage.retrieve('RefreshToken'),
            userid: this.localStorage.retrieve('UserId')
        }

        this.AuthServerProviderService.refreshToken(credentials).subscribe(result => {
            console.log(result)
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpen(key): void
    {
        this._fuseSidebarService.getSidebar(key).toggleOpen();
    }
}
