import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { FileSaverService } from 'ngx-filesaver';
import Swal from 'sweetalert2';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { environment } from 'app/../environments/environment';
import { createRequestOption } from 'app/shared/util/request-util';

import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedService } from 'app/services/shared.service';

import { IArchivo } from 'app/models/core/archivo.model';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IArchivoResponse, ArchivoResponse } from 'app/models/core/archivo-response.model';
import { IArchivoConfig } from 'app/models/core/archivo-config.model';

type EntityResponseType = HttpResponse<IArchivoResponse>;
type EntityResponseConfType = HttpResponse<IArchivoConfig>;
type EntityArrayResponseType = HttpResponse<IArchivo[]>;

@Injectable({ providedIn: 'root' })
export class FileManagerService {
  public resourceUrl = environment.apiUrl + '/api/archivos';
  // public resourceFmUrl = environment.apiUrl + '/api/filemanager';
  // FIXME URL TEMPORAL PARA PRUEBAS DE DESCARGA.
  public resourceFmUrl = environment.apiUrl + '/api/invoicing';

  constructor(
    protected http: HttpClient,
    private _FileSaverService: FileSaverService,
    private snackbar: MatSnackBar,
    public sharedService: SharedService,
  ) {}

  create(archivo: IArchivo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(archivo);
    return this.http
      .post<IArchivoResponse>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(archivo: IArchivo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(archivo);
    return this.http
      .put<IArchivoResponse>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IArchivoResponse>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  getConfiguraciones(grupo: string): Observable<EntityResponseConfType> {
    return this.http
      .get<IArchivoConfig>(`${this.resourceFmUrl}/config/${grupo}`, { observe: 'response' })
      .pipe(map((res: EntityResponseConfType) => res));
  }

  getArchivoById(id: number, name?: string, mime?: string): any {
    Swal.fire({
      allowOutsideClick: false,
      text: 'Solicitando documento...',
    });
    Swal.showLoading();
    return this.http.get(`${this.resourceFmUrl}/${id}`, { observe: 'response', responseType: 'blob' }).subscribe(
      response => {
        const fileTxtHeader = response.headers.get('content-disposition');
        let mediaType = response.headers.get('content-type') || 'binary/octet-stream';

        // Por si hay error
        if (!mediaType && mime) {
          mediaType = mime;
        }

        if (fileTxtHeader) {
          const tokens = /(attachment;\sfilename=")(.*)"/.exec(fileTxtHeader);
          // eslint-disable-next-line no-console
          // console.log('Archivo token: ' + JSON.stringify(tokens));

          if (tokens) {
            const fileName = tokens[2];

            // eslint-disable-next-line no-console
            // console.log('Reporte Generado: ' + fileName);
            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
            const file = new Blob([(response).body], { type: mediaType });
            this._FileSaverService.save(file, fileName);
          }
        } else {
          // TODO Fix, Workaround
          const file = new Blob([(response).body], { type: mime });
          console.log('###### name: ', name);
          this._FileSaverService.save(file, name);
        }
        Swal.close();
      },
      err => {
        // eslint-disable-next-line no-console
        console.log(`Error al solicitar el archivo: ${JSON.stringify(err)}`);
        Swal.close();
        // throwError(e);
        this.sharedService.log(err);
        this.snackbar.open('No fue posible obtener el archivo', this.sharedService.tipoMensaje.error, {
          duration: this.sharedService.duracionTipoMensaje.error
        });
      }
    );
  }

  getArchivo(value: IArchivo, forceName?: boolean): any {
    Swal.fire({
      allowOutsideClick: false,
      text: 'Solicitando documento...',
    });
    Swal.showLoading();
    return this.http.get(`${this.resourceFmUrl}/file/${value.id}`, { observe: 'response', responseType: 'blob' }).subscribe(
      response => {
        const fileTxtHeader = response.headers.get('content-disposition');
        let mediaType = response.headers.get('content-type') || 'binary/octet-stream';

        // Por si hay error
        if (mediaType) {
          mediaType = value.mimeType;
        }

        if (fileTxtHeader) {
          const tokens = /(attachment;\sfilename=")(.*)"/.exec(fileTxtHeader);
          // eslint-disable-next-line no-console
          // console.log('Archivo token: ' + JSON.stringify(tokens));

          if (tokens) {
            const fileName = forceName ? value.name : tokens[2];

            // eslint-disable-next-line no-console
            // console.log('Reporte Generado: ' + fileName);
            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
            const file = new Blob([(response).body], { type: mediaType });
            this._FileSaverService.save(file, fileName);
          }
        } else {
          // TODO Fix, Workaround
          const file = new Blob([(response).body], { type: value.mimeType });
          this._FileSaverService.save(file, value.name);
        }
        Swal.close();
      },
      err => {
        // eslint-disable-next-line no-console
        console.log(`Error al solicitar el archivo: ${JSON.stringify(err)}`);
        Swal.close();
        // throwError(e);
        this.sharedService.log(err);
        this.snackbar.open('No fue posible obtener el archivo', this.sharedService.tipoMensaje.error, {
          duration: this.sharedService.duracionTipoMensaje.error
        });
      }
    );
  }

  getArchivoTmp(value: IArchivo): any {
    Swal.fire({
      allowOutsideClick: false,
      text: 'Solicitando...',
    });
    Swal.showLoading();
    return this.http.post(`${this.resourceFmUrl}/filetmp`, value, { observe: 'response', responseType: 'blob' }).subscribe(
      response => {
        const fileTxtHeader = response.headers.get('content-disposition');
        let mediaType = response.headers.get('content-type') || 'binary/octet-stream';

        // Por si hay error
        if (mediaType) {
          mediaType = value.mimeType;
        }

        if (fileTxtHeader) {
          const tokens = /(attachment;\sfilename=")(.*)"/.exec(fileTxtHeader);
          // eslint-disable-next-line no-console
          // console.log('Archivo token: ' + JSON.stringify(tokens));

          if (tokens) {
            const fileName = tokens[2];

            // eslint-disable-next-line no-console
            // console.log('Reporte Generado: ' + fileName);
            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
            const file = new Blob([(response).body], { type: mediaType });
            this._FileSaverService.save(file, fileName);
          }
        } else {
          // TODO Fix, Workaround
          const file = new Blob([(response).body], { type: value.mimeType });
          this._FileSaverService.save(file, value.name);
        }
        Swal.close();
      },
      err => {
        // eslint-disable-next-line no-console
        console.log(`Error al solicitar el archivo: ${JSON.stringify(err)}`);
        Swal.close();
        // throwError(e);
        this.sharedService.log(err);
        this.snackbar.open('No fue posible obtener el archivo', this.sharedService.tipoMensaje.error, {
          duration: this.sharedService.duracionTipoMensaje.error
        });
      }
    );
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IArchivo[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  getListGroup(grupo: string, subGrupo: string): Observable<EntityArrayResponseType> {
    const options = createRequestOption({ grupo, subGrupo });
    return this.http
      .get<IArchivo[]>(`${this.resourceFmUrl}/grupo-list`, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(archivo: IArchivo): IArchivo {
    const copy: IArchivo = Object.assign({}, archivo, {
      date: archivo.date && archivo.date.isValid() ? archivo.date.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      if (res.body.archivo) {
        res.body.archivo.date = res.body.archivo.date ? moment(res.body.archivo.date) : undefined;
      }
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((archivo: IArchivo) => {
        archivo.date = archivo.date ? moment(archivo.date) : undefined;
      });
    }
    return res;
  }
}
