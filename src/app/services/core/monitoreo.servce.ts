import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'app/../environments/environment';
import { createRequestOption } from 'app/shared/util/request-util';
import { env } from 'process';
import { IMonitoreo } from 'app/models/core/monitoreo.model';


type EntityResponseType = HttpResponse<IMonitoreo>;
type EntityArrayResponseType = HttpResponse<IMonitoreo[]>;

@Injectable({ providedIn: 'root' })
export class MonitoreoService {
//   public resourceUrl = environment.apiUrl + '/api/owners';
public resourceUrl = environment.apiUrlCartaPorte + '/pac';
public resourceUrlUser = environment.apiUrlCartaPorte + '/cartaPorteMonitor';
//pac?serie=CP&folio=00000018

  constructor(protected http: HttpClient) {}

  find(id: string): Observable<EntityArrayResponseType> {
    return this.http.get<IMonitoreo[]>(`${this.resourceUrl}/cancelacion/${id}`, { observe: 'response' });
  }

  findByUser(id: string): Observable<EntityArrayResponseType> {
    return this.http.get<IMonitoreo[]>(`${this.resourceUrlUser}?createUser=4`, { observe: 'response' });
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

}
