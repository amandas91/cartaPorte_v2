import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'app/../environments/environment';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICatAdventures } from 'app/models/catalogos/cat-adventures.model';

type EntityResponseType = HttpResponse<ICatAdventures>;
type EntityArrayResponseType = HttpResponse<ICatAdventures[]>;

@Injectable({ providedIn: 'root' })
export class CatAdventuresService {
  public resourceUrl = environment.apiUrl + '/api/cat_adventures';

  constructor(protected http: HttpClient) {}

  create(catArea: ICatAdventures): Observable<EntityResponseType> {
    return this.http.post<ICatAdventures>(this.resourceUrl, catArea, { observe: 'response' });
  }

  update(catArea: ICatAdventures): Observable<EntityResponseType> {
    return this.http.put<ICatAdventures>(`${this.resourceUrl}/${catArea.id}`, catArea, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICatAdventures>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICatAdventures[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  queryByTrip(req?: any, id?: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICatAdventures[]>(`${this.resourceUrl}/trip/${id}`, { params: options, observe: 'response' });
  }

  updateByTrip(catArea: ICatAdventures[], id?: number): Observable<EntityResponseType> {
    return this.http.put<ICatAdventures>(`${this.resourceUrl}/trip/${id}`, catArea, { observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
