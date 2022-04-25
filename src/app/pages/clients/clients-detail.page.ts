import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LATIN_PATTERNS, ALPHA_NUMERIC_PATTERNS } from 'app/shared/constant/input.constants';
import { Clients, IClients } from 'app/models/core/clients.model';
import { FormBuilder } from '@angular/forms';
import { ClientsService } from '../../services/operacion/client.service';
import { map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { IFlight } from 'app/models/core/flight.model';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { AccountService } from "app/shared/auth/account.service";
import { Authority } from "app/shared/constant/authority.constants";


const MaxItems = 2000;
@Component({
  selector: 'app-clients-detail',
  templateUrl: './clients-detail.page.html'
})
export class ClientsDetailPage implements OnInit {

  editForm = this.fb.group({
    GeppId:  [null, []],
    Username:  [null, []],
    Role:  [null, []],
    Password:  [null, []],
    FirstName:  [null, []],
    MiddleName:  [null, []],
    LastName:  [null, []],
    SecondLastName:  [null, []],
    Email:  [null, []]
  });

  Authority = Authority;

  LATIN_PATTERNS = LATIN_PATTERNS;
  ALPHA_NUMERIC_PATTERNS = ALPHA_NUMERIC_PATTERNS;

  @Input()
  value:Clients;

  @Output()
  auxSave: EventEmitter<boolean> = new EventEmitter();

  isSaving = false;

  constructor(
    private fb: FormBuilder,
    private valueService: ClientsService,
    protected accountService: AccountService) { }

  ngOnInit(): void {
    this.loadPage();
  }

  loadPage() {

    // // console.log(this.value);
    // if (this.value.GeppId) {
    //   this.valueService.find(this.value.GeppId)
    //     .pipe(map((res: HttpResponse<IClients>) => {
    //       return res.body ? res.body : new Clients();
    //     }))
    //     .subscribe((resBody: IClients) => {
    //       this.value = resBody;
    //       this.updateForm(this.value);
    //     });
    // }

  }

  save() {
    Swal.fire({
      allowOutsideClick: false,
      text: 'Cargando...',
    });
    Swal.showLoading();
    const value = this.createFromForm();
    value.Role = [value.Role]
    console.log('save: ', JSON.stringify(value));
    if (this.value.GeppId === undefined) {
      this.subscribeToSaveResponse(this.valueService.create(value));
    } else {
      //this.subscribeToSaveResponse(this.valueService.update(value));
      this.subscribeToSaveResponse(this.valueService.create(value));
    }

  }

  private createFromForm(): IClients {
    // FIXME quitar el pnr que aun no es obligatorio.
    return {
      ...this.editForm.value
    };
  }

  

  private updateForm(value: any): void {
    this.editForm.patchValue({
      ...value,
    });
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<any>>): void {
    result.subscribe(
      (res) => this.onSaveSuccess(res),
      (res) => this.onSaveError(res)
    );
  }

  protected onSaveSuccess(res): void {
    if(res.body.status == 400){
      this.isSaving = false;
      if (this.auxSave) {
        this.auxSave.emit(false);
      }

      Swal.fire({
        icon: 'warning',
        title: 'Conflicto al Guardar',
        text: res.error.Message,
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
        showCloseButton: true,
        })

    }else{
      Swal.fire({
        icon: 'success',
        title: 'Guardado',
        text: '',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
        showCloseButton: true,
        })
    }
    // this.isSaving = false;
    // if (this.auxSave) {
    //   this.auxSave.emit(true);
    //   Swal.close();
    // }
  }

  protected onSaveError(res): void {
    this.isSaving = false;
    // if (this.auxSave) {
    //   this.auxSave.emit(false);
    // }

    console.log(res)
    Swal.fire({
      icon: 'warning',
      title: 'Conflicto al Guardar',
      text: res.error.Message,
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Ok',
      showCloseButton: true,
      })
  }

  hasRol(authorities: string[] | string): boolean {
    return this.accountService.hasAnyAuthority(authorities);
  }


}
