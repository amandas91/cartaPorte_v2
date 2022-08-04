import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'app/../environments/environment';
import { createRequestOption } from 'app/shared/util/request-util';
import { env } from 'process';
import { IMonitoreo } from 'app/models/core/monitoreo.model';
import Swal from 'sweetalert2';
import { FileSaverService } from 'ngx-filesaver';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedService } from '../shared.service';


type EntityResponseType = HttpResponse<IMonitoreo>;
type EntityArrayResponseType = HttpResponse<IMonitoreo[]>;

@Injectable({ providedIn: 'root' })
export class MonitoreoService {
//   public resourceUrl = environment.apiUrl + '/api/owners';
public resourceUrl = environment.apiUrlCartaPorte + '/pac';
public resourceUrlUser = environment.apiUrlCartaPorte + '/cartaPorteMonitor';
//pac?serie=CP&folio=00000018

  constructor(protected http: HttpClient,
    private _FileSaverService: FileSaverService,
    private snackbar: MatSnackBar,
    public sharedService: SharedService,) {}

  find(id: string): Observable<EntityArrayResponseType> {
    return this.http.get<IMonitoreo[]>(`${this.resourceUrl}/cancelacion/${id}`, { observe: 'response' });
  }

  findByFechaEstatus(estatus: string, fechaEntrega:string): Observable<EntityArrayResponseType> {
    return this.http.get<IMonitoreo[]>(`${this.resourceUrlUser}?createUser=4&estatus=${estatus}&fechaEntrega=${fechaEntrega}`, { observe: 'response' });
  }

  findByUser(id: string, user:number): Observable<EntityArrayResponseType> {
    return this.http.get<IMonitoreo[]>(`${this.resourceUrlUser}?createUser=${user}`, { observe: 'response' });
  }

  query(req?: any, type?:any): Observable<EntityArrayResponseType> {
    //console.log('---> test: ' )
    const options = createRequestOption(req);

    return this.http.get<IMonitoreo[]>(`${this.resourceUrl}/CPDSD5332`, {  observe: 'response' });
  }

  findMotivo(serie: string, folio:string): Observable<EntityResponseType> {
    return this.http.get<IMonitoreo>(`${this.resourceUrl}?serie=${serie}&folio=${folio}`, { observe: 'response' });
  }

  create(cancel: IMonitoreo): Observable<EntityResponseType> {
    return this.http.post<IMonitoreo>(`${this.resourceUrl}/cancelacion`, cancel, { observe: 'response' });
  }

  findXML(id: string, name?: string, mime?: string): any {
    Swal.fire({
      allowOutsideClick: false,
      text: 'Solicitando documento...',
    });
    Swal.showLoading();
    return this.http.post<any>(`${this.resourceUrl}/obtener/xml?uuid=${id}`, { observe: 'response', responseType: 'blob' });
  }


  findPDF(id: string, name?: string, mime?: string): any {
    Swal.fire({
      allowOutsideClick: false,
      text: 'Solicitando documento...',
    });
    Swal.showLoading();
    return this.http.post<any>(`${this.resourceUrl}/obtener/pdf?uuid=${id}`, { observe: 'response', responseType: 'blob' });
  }

}
