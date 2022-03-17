import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'app/../environments/environment';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICatOwners } from 'app/models/catalogos/cat-owners.model';
import { ICatPaises } from 'app/models/catalogos/cat-paises.model';
import { env } from 'process';


type EntityResponseType = HttpResponse<ICatPaises>;
type EntityArrayResponseType = HttpResponse<ICatPaises[]>;

@Injectable({ providedIn: 'root' })
export class CatPaisesService {
//   public resourceUrl = environment.apiUrl + '/api/owners';
    public resourceUrl = environment.apiUrlCartaPorte + '/pais';

  constructor(protected http: HttpClient) {}


  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICatPaises>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any, type?:any): Observable<EntityArrayResponseType> {
    //console.log('---> test: ' )
    const options = createRequestOption(req);

    return this.http.get<ICatPaises[]>(`${this.resourceUrl}`, {  observe: 'response' });
  }



}
