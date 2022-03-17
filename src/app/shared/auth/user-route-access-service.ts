import { Injectable, isDevMode } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AccountService } from './account.service';
// import { LoginModalService } from 'app/core/login/login-modal.service';
import { StateStorageService } from './state-storage.service';

@Injectable({ providedIn: 'root' })
export class UserRouteAccessService implements CanActivate {
  constructor(
    private router: Router,
    // private loginModalService: LoginModalService,
    private accountService: AccountService,
    private stateStorageService: StateStorageService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const authorities = route.data['authorities'];

    // console.log('##################  Route Data: '+ JSON.stringify(route.data['authorities']));

    // We need to call the checkLogin / and so the accountService.identity() function, to ensure,
    // that the client has a principal too, if they already logged in by the server.
    // This could happen on a page refresh.
    return this.checkLogin(authorities, state.url);
  }

  checkLogin(authorities: string[], url: string): Observable<boolean> {
    return this.accountService.identity().pipe(
      map(account => {
        console.log('#################### account: ' + JSON.stringify(account));
        // console.log('authorities: ' + JSON.stringify(authorities));
        if( account['status'] === 'Authorization Token not found'
            || account['status'] === 'Token is Expired'
            || account['status'] === 'Token has expired' ){
          this.router.navigate(['/login']);
          return false;
        }
        if (account && (!authorities || authorities.length === 0)) {
          return true;
        }

        if (account) {
          const hasAnyAuthority = this.accountService.hasAnyAuthority(authorities);
          if (hasAnyAuthority) {
            return true;
          }
          if (isDevMode()) {
            console.error('User has not any of required authorities: ', authorities);
          }
          // TODO validar si esta logueado el usuario
          // this.router.navigate(['acceso-restringido']);
          this.router.navigate(['pages/acceso-restringido']);
          return false;
        }

        this.stateStorageService.storeUrl(url);
        this.router.navigate(['/login']);
        // Fix para evitar el dialogo de autenticacion
        // this.loginModalService.open();
        return false;
      })
    );
  }
}
