import { Component, OnInit, OnDestroy, Input, ViewChild, AfterContentInit, Output, EventEmitter } from '@angular/core';
import { ImportarExcelService } from 'app/services/core/import-excel.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-import-excel',
  templateUrl: './import-excel.pages.html',
  styleUrls: ['./import-excel.pages.scss']
})


export class ImportExcelPages implements OnInit {
  fileToUpload:File | null = null;
  constructor(private importService:ImportarExcelService) { }

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
        Swal.fire({
          title: 'No se pudo realizar la acción',
          text: '',
          icon: 'warning',
          html: '<p>' + resBody.mensajes + '</p>',
          showCloseButton: true,
        });
      }else{
        if(resBody.message){
          Swal.fire({
            title: 'No se pudo realizar la acción',
            text: resBody.message,
            icon: 'warning',
            showCloseButton: true,
          });
        }else{
          if(resBody.RespuestaTimbrado.error == null){
            Swal.close(),
            Swal.fire({
              icon: 'success',
              text: 'Guardado',
              showCancelButton: false,
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Ok',
              html: '<p>Folio <b>' + resBody.folio + '</b> </p>' +
                '<p>Fecha <b>' + resBody.RespuestaTimbrado.fechaTimbre + '</b></p> ' +
                '<p>uuid <b>' + resBody.RespuestaTimbrado.uuid + '</b></p>',
              showCloseButton: true,
              })
          }else{
            Swal.fire({
              title: 'Conflicto',
              text: resBody.message,
              icon: 'warning',
              showCloseButton: true,
            });
          }
        }
      }
      
      
    })
  }

  

}
