import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { LATIN_PATTERNS, ALPHA_NUMERIC_PATTERNS } from 'app/shared/constant/input.constants';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { fuseAnimations } from '../../../@fuse/animations/index';
import { ITrips } from '../../models/core/trips.model';
import { TripsService } from '../../services/operacion/trips.service';
import { CatOwnersService } from '../../services/catalogos/cat-owners.service';
import { ICatOwners } from 'app/models/catalogos/cat-owners.model';
import { map } from 'rxjs/operators';
import { CatInteroperabilityService } from 'app/services/catalogos/cat-interoperability.service';
import { CatInteroperability, ICatInteroperability } from 'app/models/catalogos/cat-interoperability.model';
import { Authority } from 'app/shared/constant/authority.constants';
import { AccountService } from 'app/shared/auth/account.service';


const MaxItems = 2000;
@Component({
  selector: 'app-trips-update',
  templateUrl: './trips-update.page.html',
  animations: fuseAnimations
})
export class TripsUpdatePage implements OnInit {
  editForm = this.fb.group({
    owner_id: [null, [Validators.required]],
    starting_date: [null, [Validators.required]],
    ending_date: [null, [Validators.required]],
    adventures: [null, []],
    name: [null, [Validators.required]],
    cat_interoperabilities_id: [null, []],
    reference: [null, []],
  });

  LATIN_PATTERNS = LATIN_PATTERNS;

  ALPHA_NUMERIC_PATTERNS = ALPHA_NUMERIC_PATTERNS;

  isSaving = false;

  onShow = false;
  
  Authority = Authority;

  @Output()
  auxSave: EventEmitter<boolean> = new EventEmitter();

  @Input()
  parentForm?: FormGroup;

  @Output()
  formChange: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  catOwners: ICatOwners[];
  
  catInteroperabilitys: ICatInteroperability[] = new Array<ICatInteroperability>();

  aux: CatInteroperability;

  constructor(private _fuseTranslationLoaderService: FuseTranslationLoaderService,
    private fb: FormBuilder,
    private catOwnersService: CatOwnersService,
    private catInteroperabilityService: CatInteroperabilityService,
    private valueService: TripsService,
    protected accountService: AccountService) { }

  ngOnInit(): void {
    this.aux  = new CatInteroperability();
    this.aux.id = 0;
    this.loadPage();
  }

  loadPage(){
    this.catOwnersService
    .query({ size: MaxItems }, (this.hasRol([Authority.DMC]) === true ? 2 : 1) )
    .pipe(
      map((res: HttpResponse<ICatOwners[]>) => {
        return res.body ? res.body : [];
      })
    )
    .subscribe((resBody: ICatOwners[]) => (this.catOwners = resBody));

    this.catInteroperabilityService.query({ size: MaxItems }).subscribe(
      result => this.onCatInterop(result.body),
      result => this.onErrorCatInperop(result)
    );

    this.editForm.valueChanges.subscribe(() => {
      // console.log('prueba de cambio de forma...')
      const eFrm = this.createFromForm();
      this.formChange.emit(this.editForm);
    });

    if (this.parentForm) {
      this.formChange.emit(this.editForm);
    }

  }
  
  protected onCatInterop(result: any): void {
    this.catInteroperabilitys.push(this.aux);
    this.catInteroperabilitys = this.catInteroperabilitys.concat(result);
    
    console.log('##### onCatInterop ##### ')
  }

  protected onErrorCatInperop(result: any): void {
    console.log('##### onError ##### ')
  }

  save() {
    Swal.fire({
      allowOutsideClick: false,
      text: 'Cargando...',
    });
    Swal.showLoading();
    const value = this.createFromForm();
    // console.log('save: ', value);
    this.subscribeToSaveResponse(this.valueService.create(value));

  }

  private createFromForm(): ITrips {
    return {
      ...this.editForm.value
    };
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

  adventures(src) {
    this.editForm.controls['adventures'].setValue(src);
  }

  selection(src: any){
    this.onShow = false
    
    this.editForm.controls['reference'].setValidators([]);
    if( src > 0 ){
      this.editForm.controls['reference'].setValue('');
      this.onShow = true; 
      this.editForm.controls['reference'].setValidators( [Validators.required] )
    }
    this.formChange.emit(this.editForm);
  }

  hasRol(authorities: string[] | string): boolean {
    return this.accountService.hasAnyAuthority(authorities);
  }

}
