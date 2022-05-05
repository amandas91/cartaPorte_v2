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
      if(resBody.estatus >= 1){
        let html = '<div>'
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
      }else{
        if(resBody.RespuestaTimbrado != null){
          if(resBody.RespuestaTimbrado.error == null){
            if(resBody.RespuestaCancelacion == null){
              let html ='<div>' +
              '<p>Folio Timbrado <b>' + resBody.folioTimbrado + '</b> </p>' + 
              '<p>Folio <b>' + resBody.folio + '</b> </p>' +
              '<p>Fecha <b>' + resBody.RespuestaTimbrado.fechaTimbre + '</b></p> ' +
              '<p>uuid <b>' + resBody.RespuestaTimbrado.uuid + '</b></p></div>'

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
              if(resBody.RespuestaCancelacion.Error != null){
                let html ='<div>' + 
                '<p>Folio <b>' + resBody.folio + '</b> </p>' +
                '<p>Fecha <b>' + resBody.RespuestaTimbrado.fechaTimbre + '</b></p> ' +
                '<p>uuid <b>' + resBody.RespuestaTimbrado.uuid + '</b></p>'+
                '<p>Fecha de Cancelación <b>' + resBody.RespuestaCancelacion.FechaCancelacion + '</b></p>'+
                '<p>Error <b>' +  resBody.RespuestaCancelacion.Error + '</b></p></div>'

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
                let html ='<div>' + 
                '<p>Folio <b>' + resBody.folio + '</b> </p>' +
                '<p>Fecha <b>' + resBody.RespuestaTimbrado.fechaTimbre + '</b></p> ' +
                '<p>uuid <b>' + resBody.RespuestaTimbrado.uuid + '</b></p>'+
                '<p>Fecha de Cancelación <b>' + resBody.RespuestaCancelacion.FechaCancelacion + '</b></p>'


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
              }
              

             
            }
           

          }else{
            let html ='<div>' + 
            '<p><b>Error:</b>' + resBody.RespuestaTimbrado.error + '</p></div>'

            Swal.close()
            Swal.fire({
              icon: 'warning',
              text: 'Guardado',
              showCancelButton: false,
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Ok',
              html: html,
              showCloseButton: true,
              })
          }
          
        }else{
          Swal.fire({
            title: 'Conflicto',
            text: resBody.message,
            icon: 'warning',
            showCloseButton: true,
          });
        }
      }
      
      
    })
  }

  

}
