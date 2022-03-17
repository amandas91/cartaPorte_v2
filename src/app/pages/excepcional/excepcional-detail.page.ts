import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { ALPHA_NUMERIC_PATTERNS, LATIN_PATTERNS, NATURAL_NUMBERS, UBICACION_PATTERNS } from '../../shared/constant/input.constants';
import { Excepcional, IExcepcional } from '../../models/core/excepcional.model';
import Swal from 'sweetalert2';
import { PaymentsService } from '../../services/operacion/payments.service';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CatCurrencyService } from '../../services/catalogos/cat-currency.service';
import { ICurrency } from 'app/models/catalogos/cat-currency.model';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { CatOrigen } from 'app/shared/util/cat-origen';
import { AccountService } from 'app/shared/auth/account.service';
import { Authority } from 'app/shared/constant/authority.constants';

const MaxItems = 2000;
@Component({
  selector: 'app-excepcional-detail',
  templateUrl: './excepcional-detail.page.html'
})
export class ExcepcionalDetailPage implements OnInit {

  editForm = this.fb.group({
    reference: [null, []],
    concept: [null, []],
    name: [null, []],
    ubication: [null, []],
    name_country: [null, []],
    amount: [null, []],
    currency_id: [null, []],
    status: [null, []],
    request_date: [null, []],
    starting_date: [null, []],
    ending_date: [null, []],
    vat: [{value: null, disabled: this.hasRol( [ Authority.DMC ] )}],
    id: [null, []],
  });

  @Input()
  value:Excepcional;

  @Input()
  origen = 0 ;

  isSaving = false;

  @Output()
  auxSave: EventEmitter<boolean> = new EventEmitter();
  
  LATIN_PATTERNS = LATIN_PATTERNS;
  ALPHA_NUMERIC_PATTERNS = ALPHA_NUMERIC_PATTERNS;
  NATURAL_NUMBERS = NATURAL_NUMBERS;
  UBICACION_PATTERNS = UBICACION_PATTERNS;
  
  catDemo: any[];
  catDemoTipo: any[];
  Authority = Authority;

  catCurrency: ICurrency[];

  constructor(private _fuseTranslationLoaderService: FuseTranslationLoaderService,
    private fb: FormBuilder, private valueService: PaymentsService, 
    private catCurrencyService: CatCurrencyService,
    protected accountService: AccountService
    ) { }

  ngOnInit(): void {

    this.catCurrencyService
    .query({ size: MaxItems })
    .pipe(
        map((res: HttpResponse<ICurrency[]>) => {
            return res.body ? res.body : [];
        })
    )
    .subscribe((resBody: ICurrency[]) => (this.catCurrency = resBody));

    if(this.value !=  undefined){
      console.log(this.value);
    }
    if (this.value !=  undefined ) {
      
      this.valueService.find(this.value.id)
        .pipe(map((res: HttpResponse<IExcepcional>) => {
          return res.body ? res.body : new Excepcional();
        }))
        .subscribe((resBody: IExcepcional) => {
          this.value = resBody;
          this.updateForm(this.value);
        });
    }
  }

  save() {
    Swal.fire({
      allowOutsideClick: false,
      text: 'Cargando...',
    });
    Swal.showLoading();
    const value = this.createFromForm();
    console.log('---> save: ', value);
    if( this.origen != CatOrigen.DCM ){
      this.subscribeToSaveResponse(this.valueService.create(value));
    }
    
    if( this.origen === CatOrigen.DCM ){
      // if( value.id === undefined || value.id === null ){
      //   this.subscribeToSaveResponse(this.valueService.createDMC(value));
      // }else {
      //   this.subscribeToSaveResponse(this.valueService.updateDmc(value));
      // }
    }
    

  }

  // FIXME VALIDAR EL TEMA DEL TRIP 
  private createFromForm(): IExcepcional {
    if(this.value != undefined) {
      if(this.value.trip_id === undefined){
        console.warn('No se cuenta con un trip_id: '), this.value;
      }
    }
    return {
      ...this.editForm.value,
      trip_id: this.value === undefined ? null : this.value.trip_id,

      // FIXME TEMPORAL HASTA QUITARLO DEL BACKEND.
      status: 1
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<any>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      (er) => this.onSaveError(er)
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    if (this.auxSave) {
      this.auxSave.emit(true);
      Swal.close();
    }
  }

  protected onSaveError(er:any): void {
    console.log(er);
    this.isSaving = false;
    if (this.auxSave) {
      this.auxSave.emit(false);
    }

    Swal.fire({
      title: 'Conflicto',
      text: 'No fue Posible Realizar la Acción, '+ er.error.error,
      icon: 'warning',
      showCloseButton: true,
      });
  }

  public onChange(address: Address) {
    if(address.photos && address.photos.length > 0){
        console.dir(address.photos[0].getUrl({maxHeight:500,maxWidth:500}));
    }

    console.log( 'formatted_address: ',  address.formatted_address);
    this.editForm.controls['ubication'].setValue(address.formatted_address);
    this.editForm.controls['name'].setValue(address.name);

      address.address_components.forEach(element => {
        let aux = element.types.indexOf("country");
        if(aux > -1){
          console.log(element.types[aux]);
          this.editForm.controls['name_country'].setValue(element.long_name );
        }
    });

    // FIXME PRUEBAS PARA LA CARGA DEL MAPA 
    let x = this.getComponentByType(address,"street_number");
    console.log(address.geometry.location.lng());
    console.log(address.geometry.location.lat());
    console.log(address.geometry.location.toJSON());
    console.log(address.geometry.viewport.getNorthEast());
}

public getComponentByType(address: Address, type: string): any {
  if(!type)
      return null;

  if (!address || !address.address_components || address.address_components.length == 0)
      return null;

  type = type.toLowerCase();

  for (let comp of address.address_components) {
      if(!comp.types || comp.types.length == 0)
          continue;

      if(comp.types.findIndex(x => x.toLowerCase() == type) > -1)
          return comp;
  }

  return null;
}

hasRol(authorities: string[] | string): boolean {
  return this.accountService.hasAnyAuthority(authorities);
}

private updateForm(value: any): void {
  this.editForm.patchValue({
    ...value,
  });
  if( this.hasRol( [ Authority.DMC ] ) ){
    this.editForm.disable();
  }
}


}
