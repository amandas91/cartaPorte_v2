import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'app/../environments/environment';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICurrency } from 'app/models/catalogos/cat-currency.model';


type EntityResponseType = HttpResponse<ICurrency>;
type EntityArrayResponseType = HttpResponse<ICurrency[]>;

@Injectable({ providedIn: 'root' })
export class CatCurrencyService {
  public resourceUrl = environment.apiUrl + '/api/cat_currency';

  constructor(protected http: HttpClient) {}

  create(catArea: ICurrency): Observable<EntityResponseType> {
    return this.http.post<ICurrency>(this.resourceUrl, catArea, { observe: 'response' });
  }

  update(catArea: ICurrency): Observable<EntityResponseType> {
    return this.http.put<ICurrency>(this.resourceUrl, catArea, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICurrency>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICurrency[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
