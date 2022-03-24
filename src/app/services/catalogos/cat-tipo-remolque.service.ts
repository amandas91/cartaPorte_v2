import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'app/../environments/environment';
import { createRequestOption } from 'app/shared/util/request-util';
import { env } from 'process';
import { ICatTipoRemolque } from 'app/models/catalogos/cat-tipo-remolque.model';



type EntityResponseType = HttpResponse<ICatTipoRemolque>;
type EntityArrayResponseType = HttpResponse<ICatTipoRemolque[]>;

@Injectable({ providedIn: 'root' })
export class CatTipoRemolqueService {
//   public resourceUrl = environment.apiUrl + '/api/owners';
    public resourceUrl = environment.apiUrlCartaPorte + '/tipoRemolque';
    public resourceUrlConfig = environment.apiUrlCartaPorte + '/tipoAutotransporte';


  constructor(protected http: HttpClient) {}


  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICatTipoRemolque>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any, type?:any): Observable<EntityArrayResponseType> {
    //console.log('---> test: ' )
    const options = createRequestOption(req);

    return this.http.get<ICatTipoRemolque[]>(`${this.resourceUrlConfig}`, {  observe: 'response' });
  }

}
