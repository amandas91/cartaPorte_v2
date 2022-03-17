import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'app/../environments/environment';
import { createRequestOption } from 'app/shared/util/request-util';
import { env } from 'process';

import { ICatTipoFiguraTransporte } from 'app/models/catalogos/cat-tipo-figura-transporte.model';


type EntityResponseType = HttpResponse<ICatTipoFiguraTransporte>;
type EntityArrayResponseType = HttpResponse<ICatTipoFiguraTransporte[]>;

@Injectable({ providedIn: 'root' })
export class CatTipoFiguraTransporteService {
//   public resourceUrl = environment.apiUrl + '/api/owners';
    public resourceUrl = environment.apiUrlCartaPorte + '/tipoFiguraTransporte';

  constructor(protected http: HttpClient) {}


  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICatTipoFiguraTransporte>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any, type?:any): Observable<EntityArrayResponseType> {
    //console.log('---> test: ' )
    const options = createRequestOption(req);

    return this.http.get<ICatTipoFiguraTransporte[]>(`${this.resourceUrl}`, {  observe: 'response' });
  }

}
