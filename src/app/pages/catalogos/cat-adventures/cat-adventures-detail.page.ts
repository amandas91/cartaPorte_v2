import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LATIN_PATTERNS, ALPHA_NUMERIC_PATTERNS } from 'app/shared/constant/input.constants';
import { FormBuilder } from '@angular/forms';
import { CatAdventures, ICatAdventures } from 'app/models/catalogos/cat-adventures.model';
import { CatAdventuresService } from '../../../services/catalogos/cat-adventures.service';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cat-adventures-detail',
  templateUrl: './cat-adventures-detail.page.html'
})
export class CatAdventuresDetailPage implements OnInit {

  editForm = this.fb.group({
    id: [{ value: null, disabled: true }],
    name: [null, []],
  });

  @Input()
  value: CatAdventures;

  @Output()
  auxSave: EventEmitter<boolean> = new EventEmitter();

  isSaving = false;

  LATIN_PATTERNS = LATIN_PATTERNS;
  ALPHA_NUMERIC_PATTERNS = ALPHA_NUMERIC_PATTERNS;

  constructor(private fb: FormBuilder, protected valueService: CatAdventuresService) {
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

  private createFromForm(): ICatAdventures {
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
