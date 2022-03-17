import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { LoginService } from '../../shared/auth/login.service';
import { Authority } from 'app/shared/constant/authority.constants';
import { Router } from '@angular/router';
import { AccountService } from '../../shared/auth/account.service';
import { SharedService } from '../../shared/shared.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LoginComponent implements OnInit {
    
    @ViewChild('passFormInput', { static: true })
    passFormInput: ElementRef;

    isLoading = false;

  form = this.fb.group({
    Username: ['', Validators.required],
    Password: ['', Validators.required],
  });

    constructor(
        private _fuseConfigService: FuseConfigService,
        private fb: FormBuilder,
        private loginService: LoginService,
        private router: Router,
        protected accountService: AccountService,
        // private snackbar: MatSnackBar,
        private sharedService: SharedService,
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }
    ngOnInit(): void {

    }

    
  send() {
    Swal.fire({
      title: 'Loading...',
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      }
      
    })
    this.isLoading = true;
    console.log('obj: ' + JSON.stringify(this.form.value));

    this.loginService.login(this.form.value).subscribe(
      result => this.onLoginSuccess(result),
      result => this.onLoginError(result)
    );

  }

  protected onLoginSuccess(result: any): void {
    // console.log('##### onLoginSuccess ##### ')
    let loginPage = 'generar-carta'
    // if (!this.hasRol( [ Authority.LEISURE, Authority.LEISURE_DMC, ] )) {
      loginPage = 'generar-carta';
    //} 
    // console.log('loginPage: ' , loginPage);
    this.router.navigate([loginPage]);
    this.isLoading = false;
    Swal.close();
  }

  hasRol(authorities: string[] | string): boolean {
    return this.accountService.hasAnyAuthority(authorities);
  }

  protected onLoginError(result: any): void {
    this.isLoading = false;
    // console.log('Error: ' + this.isLoading);
    // this.passFormInput.nativeElement.focus();
    // this.passFormInput.nativeElement.blur();
    console.log(" del loigin");
    console.log(result);
    this.sharedService.log(result);
    Swal.fire({
      title: 'Conflicto',
      text: 'No fue Posible Realizar la Acción',
      icon: 'warning',
      showCloseButton: true,
    });
  }
}
