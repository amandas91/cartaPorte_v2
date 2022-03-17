import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'app/../environments/environment';
import { createRequestOption } from 'app/shared/util/request-util';
import { env } from 'process';
import { IEmisor } from 'app/models/core/emisor.model';
import { IDomicilioFiscal } from 'app/models/catalogos/cat-domicilio-fiscal.model';


type EntityResponseType = HttpResponse<IDomicilioFiscal>;
type EntityArrayResponseType = HttpResponse<IDomicilioFiscal[]>;

@Injectable({ providedIn: 'root' })
export class DomicilioFiscalService {
//   public resourceUrl = environment.apiUrl + '/api/owners';
public resourceUrl = environment.apiUrlCartaPorte + '/domicilioFiscal?rfc=';

  constructor(protected http: HttpClient) {}


  query(req?: any, type?:any): Observable<EntityArrayResponseType> {

    const options = createRequestOption(req);

    return this.http.get<IEmisor[]>(`${this.resourceUrl}`, {  observe: 'response' });
  }

  findDomicilioFiscal(rfc: string): Observable<EntityArrayResponseType> {
    return this.http.get<IDomicilioFiscal[]>(`${this.resourceUrl}${rfc}`, { observe: 'response' });
  }

}
