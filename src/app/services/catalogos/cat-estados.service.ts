import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'app/../environments/environment';
import { createRequestOption } from 'app/shared/util/request-util';
import { env } from 'process';
import { ICatEstados } from 'app/models/catalogos/cat-estados.model';


type EntityResponseType = HttpResponse<ICatEstados>;
type EntityArrayResponseType = HttpResponse<ICatEstados[]>;

@Injectable({ providedIn: 'root' })
export class CatEstadosService {
//   public resourceUrl = environment.apiUrl + '/api/owners';
public resourceUrl = environment.apiUrlCartaPorte + '/estado';

  constructor(protected http: HttpClient) {}


  find(id: number): Observable<EntityArrayResponseType> {
    return this.http.get<ICatEstados[]>(`${this.resourceUrl}?idPais=${id}`, { observe: 'response' });
  }

  query(req?: any, type?:any): Observable<EntityArrayResponseType> {
    //console.log('---> test: ' )
    const options = createRequestOption(req);

    return this.http.get<ICatEstados[]>(`${this.resourceUrl}`, {  observe: 'response' });
  }

}
