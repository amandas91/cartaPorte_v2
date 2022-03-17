import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'app/../environments/environment';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICatRates } from '../../models/catalogos/cat-rates.model';


type EntityResponseType = HttpResponse<ICatRates>;
type EntityArrayResponseType = HttpResponse<ICatRates[]>;

@Injectable({ providedIn: 'root' })
export class CatRatesService {
  public resourceUrl = environment.apiUrl + '/api/cat_rates';

  constructor(protected http: HttpClient) {}

  create(catArea: ICatRates): Observable<EntityResponseType> {
    return this.http.post<ICatRates>(this.resourceUrl, catArea, { observe: 'response' });
  }

  update(catArea: ICatRates): Observable<EntityResponseType> {
    return this.http.put<ICatRates>(`${this.resourceUrl}/${catArea.id}`, catArea, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICatRates>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICatRates[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
