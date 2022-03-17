import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRfc, Rfc } from 'app/models/core/rfc.model';
import { RfcService } from 'app/services/operacion/rfc.service';
import { LATIN_PATTERNS, NATURAL_NUMBERS, NUMBERS_LETTERS } from 'app/shared/constant/input.constants';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rfc-detail',
  templateUrl: './rfc-detail.page.html'
})
export class RfcDetailPage implements OnInit {
  
  @Input()
  value: Rfc;
  
  @Input()
  parentForm?: FormGroup;

  @Output()
  formChange: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  
  @Output()
  auxSave: EventEmitter<boolean> = new EventEmitter();

  isSaving = false;

  editForm = this.fb.group({
    id: [null, []],
    rfc: [null, [Validators.required]],
    razon_social: [null, [Validators.required]],
    postal_code: [null, [Validators.required]],
    address: [null, [Validators.required]],
    municipality: [null, [Validators.required]]
  });

  LATIN_PATTERNS = LATIN_PATTERNS;
  NUMBERS_LETTERS = NUMBERS_LETTERS;
  NATURAL_NUMBERS = NATURAL_NUMBERS;

    constructor(private fb: FormBuilder,
    private valueService: RfcService) { }

  ngOnInit(): void {
    this.loadPage();
  }

  loadPage() {
    const MaxItems = 2000;
    console.log('-----> value: ' , this.value)
    if (this.value && this.value.id) {
      this.valueService.find(this.value.id)
        .pipe(map((res: HttpResponse<IRfc>) => {
          return res.body ? res.body : new Rfc();
        }))
        .subscribe((resBody: IRfc) => {
          this.value = resBody;
          this.updateForm(this.value);
        });
    }

    this.editForm.valueChanges.subscribe(() => {
      // console.log('prueba de cambio de forma...')
      const eFrm = this.createFromForm();
      this.formChange.emit(this.editForm);
    });

    if (this.parentForm) {
      this.formChange.emit(this.editForm);
    }
    
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

  private createFromForm(): IRfc {
    return {
      ...this.editForm.value,
      client_id: 1
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
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(res): void {
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

}
