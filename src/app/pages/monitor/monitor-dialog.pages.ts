import { Component, Inject, Input, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as english } from "app/i18n/en/clients";
import { locale as spanish } from "app/i18n/es/clients";
import { ICatLista } from 'app/models/catalogos/cat-lista.model';
import { ListaService } from 'app/services/catalogos/cat-listas.service';
import { ClientsDetailPage } from '../clients/clients-detail.page';
import { map } from "rxjs/operators";
import { HttpResponse, HttpHeaders } from "@angular/common/http";
import { IMonitoreo, Monitoreo } from 'app/models/core/monitoreo.model';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { MonitoreoService } from 'app/services/core/monitoreo.servce';
import { DatePipe } from '@angular/common';


export interface Cancelacion {
  
  IdComprobante: number;
  TipoComprobante: string;
  RfcEmisor: string;
  RfcReceptor: string;
  FechaCFDI: string;
  UUID: string;
  Total: number;
  Motivo: string;
  FolioSustitucion: string;
  Serie: string;
  Folio: string;
  
}

const MaxItems = 2000;
@Component({
  selector: 'app-monitor-dialog',
  templateUrl: './monitor-dialog.pages.html',
  styleUrls: ['./monitor-dialog.pages.scss']
})




export class MonitorDialogPages implements OnInit {
  parentForm: FormGroup;
  title:string;
  monitoreo:any;
  cancelacion: Cancelacion;
  getPac:any;
  showFolioSustitucion:boolean=false;

  editForm = this.fb.group({
    motivo: [null, [Validators.required]],
    FolioSustitucion:[null, []],
  });

  @Input()
  value: Monitoreo;

  @Output()
  auxSaves: EventEmitter<boolean> = new EventEmitter();


  isSaving = false;

  @ViewChild(ClientsDetailPage, { static: false })
  updateComponent?: ClientsDetailPage;
  tipoMotivo:ICatLista[];



  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _fuseTranslationLoaderService: FuseTranslationLoaderService,
    private catTipoListaService:ListaService,
    private valueService:MonitoreoService
  ) {
    this.parentForm = this.fb.group({});
    this._fuseTranslationLoaderService.loadTranslations(english, spanish);
    if (data) {
     
      this.title = data.title;
      this.value = data.value;
      this.monitoreo = this.value;
    }
  }
  ngOnInit(): void {
    this.editForm.controls['FolioSustitucion'].disable();
    //this.editForm.controls['FolioSustitucion'].setValue(this.monitoreo.Referencia);
    this.catTipoListaService.query({ size: MaxItems },  "MOTIVO_CANCELACION")
    .pipe(
        map((res: HttpResponse<ICatLista[]>) => {
            return res.body ? res.body : [];
        })
    )
    .subscribe((resBody: ICatLista[]) => (
        this.tipoMotivo = resBody
        
    ));

    this.valueService.findMotivo('T', this.monitoreo.Folio)
    .pipe(
        map((res: HttpResponse<any>) => {
            return res.body ? res.body : [];
        })
    )
    .subscribe((resBody: any) => (
      this.getPac = resBody
    ));


  }

  auxSave(scr: any): void {
    if (scr) {
      this.dialogRef.close(scr);
    }
  }

  saveCancel(){
    Swal.fire({
      allowOutsideClick: false,
      text: 'Cargando...',
    });

    

    Swal.showLoading();
    const value = this.createFromForm();

    this.subscribeToSaveResponse(this.valueService.create(value));
    
  }

  private createFromForm(): any {
    let tmpDate =this.getPac.Fecha;
    const datepipe: DatePipe = new DatePipe('en-US');
    let formattedDate = datepipe.transform(tmpDate, 'dd/MM/YYYY');
    this.cancelacion  = {
      IdComprobante: this.monitoreo.SerieTimbrado+this.monitoreo.FolioTimbrado,
      TipoComprobante: 'T',//this.getPac.Serie,
      RfcEmisor: this.getPac.Emisor.Rfc,
      RfcReceptor: this.getPac.Receptor.Rfc,
      FechaCFDI: formattedDate,
      UUID: this.monitoreo.Referencia,
      Total: 0,
      Motivo:  this.editForm.controls['motivo'].value,
      FolioSustitucion: this.editForm.controls['FolioSustitucion'].value,
      Serie: this.monitoreo.SerieTimbrado,
      Folio: this.monitoreo.FolioTimbrado
    };

    let aux = {Cancelacion: this.cancelacion};
    return {
      ...aux
    };
  }

  onSelectEvent(value: any){
    this.monitoreo.Motivo = value.Valor;
    if(value == 1){
      this.editForm.controls['FolioSustitucion'].enable();
    }else{
      this.editForm.controls['FolioSustitucion'].disable();
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<any>>): void {
    result.subscribe(
      (res) => this.onSaveSuccess(res),
      () => this.onSaveError()
    );
  }


  protected onSaveSuccess(res): void {
    this.isSaving = true;
    
    if (this.auxSaves) {
      Swal.close();
      let message:string;
      message=res.body.Error;
      if(res.body.Estatus != null){
        if(message == null){
          Swal.fire({
            icon: 'success',
            html: '<p><b>Fecha de Cancelación:</b>'+ res.body.FechaCancelacion + '</p>'+
            '<p><b>Estatus:</b>'+ res.body.Estatus + '</p>',
            showCloseButton: true,
          });
        }else{
          Swal.fire({
            icon: 'success',
            html: '<p><b>Fecha de Cancelación:</b>'+ res.body.FechaCancelacion + '</p>'+
             '<p> <b>' + message + '</b> </p>',
            showCloseButton: true,
          });
        }
        
      }else{
        Swal.fire({
          icon: 'warning',
          html: '<p> <b>' + message + '</b> </p>',
          showCloseButton: true,
        });
      }
      this.auxSaves.emit(true);
    }
  }

  

  protected onSaveError(): void {
    this.isSaving = false;
    if (this.auxSaves) {
      this.auxSaves.emit(false);
    }

    Swal.fire({
      title: 'Conflicto',
      text: 'No fue Posible Realizar la Acción',
      icon: 'warning',
      
      });
  }


}
