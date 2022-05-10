import { Component, OnInit, OnDestroy, Input, ViewChild, AfterContentInit, Output, EventEmitter } from '@angular/core';
import { ImportarExcelService } from 'app/services/core/import-excel.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-import-excel',
  templateUrl: './import-excel.pages.html',
  styleUrls: ['./import-excel.pages.scss']
})


export class ImportExcelPages implements OnInit {
  editForm = this.fb.group({
    fileInput: [null, []]
  })

  fileToUpload:File | null = null;
  constructor(private fb: FormBuilder, private importService:ImportarExcelService) { }

  ngOnInit(): void {
  }

  onFileInput(files: FileList,): void {
    Swal.fire({
      title: 'Importando',
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      }
      
    })
    
    this.fileToUpload = files.item(0);
    const formData = new FormData(); 
    // Store form name as "file" with file data
    formData.append("file", this.fileToUpload, this.fileToUpload.name);
  
    let timerInterval

    const params = {
      formData
    }

    this.importService.upload(params).subscribe((resBody: any) => {
      if(resBody.estatus > 0){
        let html = '<div>'
          if(resBody.RespuestaTimbrado != null){
            if( resBody.folioTimbrado != null){
              html += '<p>Folio Timbrado <b>' + resBody.folioTimbrado + '</b> </p>'
            }
            if( resBody.folio != null){
              html += '<p>Folio <b>' + resBody.folio + '</b> </p>'
            } 

            if( resBody.fechaTimbre != null){
              html += '<p>Fecha <b>' + resBody.RespuestaTimbrado.fechaTimbre + '</b></p> ' 
            }
            
            if( resBody.fechaTimbre != null){
              html += '<p>uuid <b>' + resBody.RespuestaTimbrado.fechaTimbre + '</b></p>'
            }
           
            
          }

          resBody.mensajes.forEach(value => {
            html += '<p><b>* </b>' + value + '</p>'
          }) 

          html += '</div>'
          Swal.fire({
            title: 'No se pudo realizar la acción',
            text: '',
            icon: 'warning',
            html: html,
            showCloseButton: true,
          })
          this.editForm.controls['fileInput'].setValue("")
      }else if(resBody.estatus == 0){
        let html ='<div>' 
        if(resBody.RespuestaTimbrado != null){

          if( resBody.folioTimbrado != null){
            html += '<p>Folio Timbrado <b>' + resBody.folioTimbrado + '</b> </p>'
          }
          if( resBody.folio != null){
            html += '<p>Folio <b>' + resBody.folio + '</b> </p>'
          } 

          if( resBody.fechaTimbre != null){
            html += '<p>Fecha <b>' + resBody.RespuestaTimbrado.fechaTimbre + '</b></p> ' 
          }
          
          if( resBody.fechaTimbre != null){
            html += '<p>uuid <b>' + resBody.RespuestaTimbrado.uuid + '</b></p>'
          }

          if( resBody.RespuestaTimbrado.error != null){
            html += '<p>uuid <b>' + resBody.RespuestaTimbrado.error + '</b></p>'
          }
        }



        if(resBody.RespuestaCancelacion != null){
          html += '<p>Fecha de Cancelación <b>' + resBody.RespuestaCancelacion.FechaCancelacion + '</b></p>'
          if(resBody.RespuestaCancelacion.Estatus != null){
            html += '<p>Estatus <b>' + resBody.RespuestaCancelacion.Estatus + '</b></p>'
          }
          if(resBody.RespuestaCancelacion.Error != null){
            html += '<p>Error <b>' + resBody.RespuestaCancelacion.Error + '</b></p>'
          }
        }
        html += '</div>'
        Swal.close()
        Swal.fire({
          icon: 'success',
          title: 'Guardado',
          text: '',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok',
          html:html,
          showCloseButton: true,
          })
          this.editForm.controls['fileInput'].setValue("")
        
      }else{
        Swal.fire({
          title: 'Conflicto',
          text: resBody.message,
          icon: 'warning',
          showCloseButton: true,
        });
      }
      
      
    })
  }

  

}
