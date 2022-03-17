import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ICatExperiences } from 'app/models/catalogos/cat-experiences.model';
import { CatExperiencesService } from 'app/services/catalogos/cat-experiences.service';
import { LATIN_PATTERNS, ALPHA_NUMERIC_PATTERNS } from 'app/shared/constant/input.constants';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { CatMargin } from '../../../models/catalogos/cat-margin.model';
import { CatMarginService } from 'app/services/catalogos/cat-margin.service';

@Component({
  selector: 'app-cat-margin-detail',
  templateUrl: './cat-margin-detail.page.html'
})
export class CatMarginDetailPage implements OnInit {

  editForm = this.fb.group({
    id: [{ value: null, disabled: true }],
    name: [null, []],
  });

  @Input()
  value: CatMargin;

  @Output()
  auxSave: EventEmitter<boolean> = new EventEmitter();

  isSaving = false;

  LATIN_PATTERNS = LATIN_PATTERNS;
  ALPHA_NUMERIC_PATTERNS = ALPHA_NUMERIC_PATTERNS;

  constructor(private fb: FormBuilder, protected valueService: CatMarginService) {
    console.log('### VALUE: ', this.value);
  }

  ngOnInit(): void {

    console.log('### VALUE: ', this.value);
    if (this.value) {
      this.updateForm(this.value);
    }
  }

  save() {
    Swal.fire({
      allowOutsideClick: false,
      text: 'Cargando...',
    });
    Swal.showLoading();
    const value = this.createFromForm();
    if (value.id) {
      this.subscribeToSaveResponse(this.valueService.update(value));
    } else {
      this.subscribeToSaveResponse(this.valueService.create(value));
    }
  }

  private createFromForm(): ICatExperiences {
    return {
      ...this.editForm.value,
      id: this.value ? this.value.id : undefined
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
    this.isSaving = true;
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
