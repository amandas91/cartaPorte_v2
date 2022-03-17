import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'app/../environments/environment';
import { createRequestOption } from 'app/shared/util/request-util';
import { env } from 'process';
import { IEmisor } from 'app/models/core/emisor.model';
import { IDomicilioFiscal } from 'app/models/catalogos/cat-domicilio-fiscal.model';


type EntityResponseType = HttpResponse<IEmisor>;
type EntityArrayResponseType = HttpResponse<IEmisor[]>;

@Injectable({ providedIn: 'root' })
export class EmisorService {
//   public resourceUrl = environment.apiUrl + '/api/owners';
public resourceUrl = environment.apiUrlCartaPorte + '/emisor';

  constructor(protected http: HttpClient) {}


  query(req?: any, type?:any): Observable<EntityArrayResponseType> {

    const options = createRequestOption(req);

    return this.http.get<IEmisor[]>(`${this.resourceUrl}`, {  observe: 'response' });
  }

  findDomicilioFiscal(id: number): Observable<EntityResponseType> {
    return this.http.get<IDomicilioFiscal>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

}
