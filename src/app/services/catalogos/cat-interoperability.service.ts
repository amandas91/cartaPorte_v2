import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'app/../environments/environment';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICatInteroperability } from 'app/models/catalogos/cat-interoperability.model';



type EntityResponseType = HttpResponse<ICatInteroperability>;
type EntityArrayResponseType = HttpResponse<ICatInteroperability[]>;

@Injectable({ providedIn: 'root' })
export class CatInteroperabilityService {
  public resourceUrl = environment.apiUrl + '/api/cat_interoperability';

  constructor(protected http: HttpClient) {}

  create(src: ICatInteroperability): Observable<EntityResponseType> {
    return this.http.post<ICatInteroperability>(this.resourceUrl, src, { observe: 'response' });
  }

  update(src: ICatInteroperability): Observable<EntityResponseType> {
    return this.http.put<ICatInteroperability>(this.resourceUrl, src, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICatInteroperability>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICatInteroperability[]>(`${this.resourceUrl}`, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
