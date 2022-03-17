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
import { ICatOwners } from "app/models/catalogos/cat-owners.model";
import { CatOwnersService } from "app/services/catalogos/cat-owners.service";
import { AccountService } from "app/shared/auth/account.service";
import { Authority } from "app/shared/constant/authority.constants";


const MaxItems = 2000;
@Component({
  selector: 'app-clients-detail',
  templateUrl: './clients-detail.page.html'
})
export class ClientsDetailPage implements OnInit {

  editForm = this.fb.group({
    name: [null, []],
    last_name_father: [null, []],
    email: [null, []],
    owner: [null, []]
  });

  catOwners: ICatOwners[];
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
    private catOwnersService: CatOwnersService,
    protected accountService: AccountService) { }

  ngOnInit(): void {
    this.loadPage();
  }

  loadPage() {

    // console.log(this.value);
    if (this.value.id) {
      this.valueService.find(this.value.id)
        .pipe(map((res: HttpResponse<IClients>) => {
          return res.body ? res.body : new Clients();
        }))
        .subscribe((resBody: IClients) => {
          this.value = resBody;
          this.updateForm(this.value);
        });
    }

    this.catOwnersService
      .query({ size: MaxItems },  (this.hasRol([Authority.DMC]) === true ? 2 : 1))
      .pipe(
          map((res: HttpResponse<ICatOwners[]>) => {
              return res.body ? res.body : [];
          })
      )
      .subscribe((resBody: ICatOwners[]) => (this.catOwners = resBody));
  }

  save() {
    Swal.fire({
      allowOutsideClick: false,
      text: 'Cargando...',
    });
    Swal.showLoading();
    const value = this.createFromForm();
    console.log('save: ', JSON.stringify(value));
    if (this.value.id === undefined) {
      this.subscribeToSaveResponse(this.valueService.create(value));
    } else {
      this.subscribeToSaveResponse(this.valueService.update(value));
    }

  }

  private createFromForm(): IFlight {
    // FIXME quitar el pnr que aun no es obligatorio.
    return {
      ...this.editForm.value,
      pnr: 'test',
      // trip_id: this.value.trip_id,
      id: this.value.id
    };
  }

  private updateForm(value: any): void {
    this.editForm.patchValue({
      ...value,
    });
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<any>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    if (this.auxSave) {
      this.auxSave.emit(true);
      Swal.close();
    }
  }

  protected onSaveError(): void {
    this.isSaving = false;
    if (this.auxSave) {
      this.auxSave.emit(false);
    }

    Swal.fire({
      title: 'Conflicto',
      text: 'No fue Posible Realizar la Acción',
      icon: 'warning',
      showCloseButton: true,
    });
  }

  hasRol(authorities: string[] | string): boolean {
    return this.accountService.hasAnyAuthority(authorities);
  }


}
