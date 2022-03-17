import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'app/../environments/environment';
import { createRequestOption } from 'app/shared/util/request-util';
import { env } from 'process';

import { ICatTipoPermiso } from 'app/models/catalogos/cat-tipo-permiso.model';


type EntityResponseType = HttpResponse<ICatTipoPermiso>;
type EntityArrayResponseType = HttpResponse<ICatTipoPermiso[]>;

@Injectable({ providedIn: 'root' })
export class CatTipoPermisoService {
//   public resourceUrl = environment.apiUrl + '/api/owners';
    public resourceUrl = environment.apiUrlCartaPorte + '/tipoPermiso';

  constructor(protected http: HttpClient) {}


  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICatTipoPermiso>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any, type?:any): Observable<EntityArrayResponseType> {
    //console.log('---> test: ' )
    const options = createRequestOption(req);

    return this.http.get<ICatTipoPermiso[]>(`${this.resourceUrl}`, {  observe: 'response' });
  }

}
