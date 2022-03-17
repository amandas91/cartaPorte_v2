import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { Account } from 'app/shared/models/account.model';
import { AccountService } from './account.service';
import { AuthServerProvider } from './auth-jwt.service';
import { Login } from 'app/shared/models/login.model';

import { MatDialog } from '@angular/material/dialog';

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(
    private accountService: AccountService,
    private authServerProvider: AuthServerProvider,
    private dialogRef: MatDialog
  ) {}

  login(credentials: Login): Observable<Account | null> {

    console.log(this.authServerProvider.login(credentials).pipe(
      mergeMap(() => this.accountService.identity(true))
      ));
    return this.authServerProvider.login(credentials).pipe(
      mergeMap(() => this.accountService.identity(true))
      );


  }

  logout(): void {
    // Hack para cerrar todos los dialogos
    this.dialogRef.closeAll();
    this.authServerProvider.logout().subscribe(null, null, () => this.accountService.authenticate(null));
  }
}
