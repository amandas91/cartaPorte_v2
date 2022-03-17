import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'app/../environments/environment';
import { createRequestOption } from 'app/shared/util/request-util';
import { env } from 'process';
import { ICatCP } from 'app/models/catalogos/cat.cp.model';


type EntityResponseType = HttpResponse<ICatCP>;
type EntityArrayResponseType = HttpResponse<ICatCP[]>;

@Injectable({ providedIn: 'root' })
export class CatCPService {
//   public resourceUrl = environment.apiUrl + '/api/owners';
public resourceUrl = environment.apiUrlCartaPorte + '/codigoPostal';

  constructor(protected http: HttpClient) {}


  find(estado: string, municipio:string, localidad:string): Observable<EntityArrayResponseType> {
    return this.http.get<ICatCP[]>(`${this.resourceUrl}?estado=${estado}&municipio=${municipio}&localidad=${localidad}`, { observe: 'response' });
  }

  findByCodigoPostal(cp: string): Observable<EntityResponseType> {
    return this.http.get<ICatCP>(`${this.resourceUrl}?cp=${cp}`, { observe: 'response' });
  }

  query(req?: any, type?:any): Observable<EntityArrayResponseType> {
    //console.log('---> test: ' )
    const options = createRequestOption(req);

    return this.http.get<ICatCP[]>(`${this.resourceUrl}`, {  observe: 'response' });
  }

}
