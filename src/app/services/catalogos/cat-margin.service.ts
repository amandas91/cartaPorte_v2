import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'app/../environments/environment';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICatMargin } from '../../models/catalogos/cat-margin.model';



type EntityResponseType = HttpResponse<ICatMargin>;
type EntityArrayResponseType = HttpResponse<ICatMargin[]>;

@Injectable({ providedIn: 'root' })
export class CatMarginService {
  public resourceUrl = environment.apiUrl + '/api/cat_margins';

  constructor(protected http: HttpClient) {}

  create(src: ICatMargin): Observable<EntityResponseType> {
    return this.http.post<ICatMargin>(this.resourceUrl, src, { observe: 'response' });
  }

  update(src: ICatMargin): Observable<EntityResponseType> {
    return this.http.put<ICatMargin>(`${this.resourceUrl}/${src.id}`, src, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICatMargin>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICatMargin[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
