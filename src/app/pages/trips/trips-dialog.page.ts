import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { TripsUpdatePage } from './trips-update.page';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { fuseAnimations } from '../../../@fuse/animations/index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trips-dialog',
  templateUrl: './trips-dialog.page.html',
  animations: fuseAnimations,
})
export class TripsDialogPage implements OnInit {


  parentForm: FormGroup;

  title: string;

  origen: number;

  @ViewChild(TripsUpdatePage, { static: false })
  updateComponent?: TripsUpdatePage;

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.parentForm = this.fb.group({});
    this.title = data.title;
    this.origen = data.origen;
  }

  ngOnInit(): void {
  }

  auxSave(scr: any): void {
    if (scr) {
      this.dialogRef.close(scr);
    }
    // this.eventManager.broadcast('expedienteListModification');
  }

  formChange(name: string, form: FormGroup): void {
    if (this.parentForm) {
      this.parentForm.setControl(name, form);
    }
}

}
