import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'app/../environments/environment';
import { createRequestOption } from 'app/shared/util/request-util';
import { env } from 'process';
import { IMaterialPeligroso } from 'app/models/core/material-peligroso.model';


type EntityResponseType = HttpResponse<IMaterialPeligroso>;
type EntityArrayResponseType = HttpResponse<IMaterialPeligroso[]>;

@Injectable({ providedIn: 'root' })
export class MaterialPeligrosoService {

public resourceUrl = environment.apiUrlCartaPorte + '/materialPeligroso';

  constructor(protected http: HttpClient) {}


  query(req?: any, type?:any): Observable<EntityArrayResponseType> {

    const options = createRequestOption(req);

    return this.http.get<IMaterialPeligroso[]>(`${this.resourceUrl}`, {  observe: 'response' });
  }

}
