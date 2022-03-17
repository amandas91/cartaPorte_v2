import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'app/../environments/environment';
import { createRequestOption } from 'app/shared/util/request-util';
import { env } from 'process';
import { IReceptor } from 'app/models/core/receptor.model';


type EntityResponseType = HttpResponse<IReceptor>;
type EntityArrayResponseType = HttpResponse<IReceptor[]>;

@Injectable({ providedIn: 'root' })
export class ReceptorService {
//   public resourceUrl = environment.apiUrl + '/api/owners';
public resourceUrl = environment.apiUrlCartaPorte + '/receptor/primero';

  constructor(protected http: HttpClient) {}


  query(req?: any, type?:any): Observable<EntityArrayResponseType> {

    const options = createRequestOption(req);

    return this.http.get<IReceptor[]>(`${this.resourceUrl}`, {  observe: 'response' });
  }

}
