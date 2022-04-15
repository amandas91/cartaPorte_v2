import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

import { environment } from 'app/../environments/environment';
import { Login } from 'app/shared/models/login.model';

type JwtToken = {
  token: string;
  AccessToken: string;
  TokenType: string;
  UserId: string;
  Username: string;
  Roles: any;
  RefreshToken: string;
  ExpirationDate: string;

};

@Injectable({ providedIn: 'root' })
export class AuthServerProvider {
  constructor(private http: HttpClient, private $localStorage: LocalStorageService, private $sessionStorage: SessionStorageService) {}

  getToken(): string {
    return this.$localStorage.retrieve('authenticationToken') || this.$sessionStorage.retrieve('authenticationToken') || '';
  }

  login(credentials: Login): Observable<void> {
    
    return  this.http
    .post<JwtToken>(`${environment.apiUrlCartaPorte}/auth/signin`, credentials)
    .pipe(map(response => this.authenticateSuccess(response, credentials.rememberMe)));
  }

  refreshToken(credentials: any): Observable<void> {
    
    return  this.http
    .post<JwtToken>(`${environment.apiUrlCartaPorte}/auth/refreshtoken`, credentials)
    .pipe(map(response => this.authenticateSuccess(response, credentials.rememberMe)));
  }

  logout(): Observable<void> {
    return new Observable(observer => {
      this.$localStorage.clear('authenticationToken');
      this.$sessionStorage.clear('authenticationToken');
      observer.complete();
    });
  }

  private authenticateSuccess(response: JwtToken, rememberMe: boolean): void {
    // console.log("Aqui guarda el Token")
    const jwt = response.AccessToken;
    if (rememberMe) {
      this.$localStorage.store('authenticationToken', jwt)
      this.$localStorage.store('Username', response.Username)
      this.$localStorage.store('UserId', response.UserId)
      this.$localStorage.store('ExpirationDate', response.ExpirationDate)
    } else {
      this.$sessionStorage.store('authenticationToken', jwt)
      this.$localStorage.store('Username', response.Username)
      this.$localStorage.store('UserId', response.UserId)
      this.$localStorage.store('ExpirationDate', response.ExpirationDate)
    }
  }
}
