import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'app/../environments/environment';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICatPaises } from 'app/models/catalogos/cat-paises.model';
import { env } from 'process';
import { ICatTipoUnidad } from 'app/models/catalogos/cat-tipo-unidad.mode.';


type EntityResponseType = HttpResponse<ICatTipoUnidad>;
type EntityArrayResponseType = HttpResponse<ICatTipoUnidad[]>;

@Injectable({ providedIn: 'root' })
export class CatTipoUnidadService {
//   public resourceUrl = environment.apiUrl + '/api/owners';
    public resourceUrl = environment.apiUrlCartaPorte + '/tipoUnidad';

  constructor(protected http: HttpClient) {}


  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICatTipoUnidad>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any, type?:any): Observable<EntityArrayResponseType> {
    //console.log('---> test: ' )
    const options = createRequestOption(req);

    return this.http.get<ICatTipoUnidad[]>(`${this.resourceUrl}`, {  observe: 'response' });
  }

}
