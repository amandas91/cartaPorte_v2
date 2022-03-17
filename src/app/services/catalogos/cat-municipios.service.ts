import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'app/../environments/environment';
import { createRequestOption } from 'app/shared/util/request-util';
import { env } from 'process';
import { ICatMunicipios } from 'app/models/catalogos/cat-municipios.model';


type EntityResponseType = HttpResponse<ICatMunicipios>;
type EntityArrayResponseType = HttpResponse<ICatMunicipios[]>;

@Injectable({ providedIn: 'root' })
export class CatMunicipiosService {
//   public resourceUrl = environment.apiUrl + '/api/owners';
public resourceUrl = environment.apiUrlCartaPorte + '/municipio';

  constructor(protected http: HttpClient) {}


  find(nombre: string): Observable<EntityArrayResponseType> {
    return this.http.get<ICatMunicipios[]>(`${this.resourceUrl}?descripcionEstado=${nombre}`, { observe: 'response' });
  }

  query(req?: any, type?:any): Observable<EntityArrayResponseType> {
    //console.log('---> test: ' )
    const options = createRequestOption(req);

    return this.http.get<ICatMunicipios[]>(`${this.resourceUrl}`, {  observe: 'response' });
  }

}
