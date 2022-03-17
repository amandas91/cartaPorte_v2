import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'app/../environments/environment';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICatOwners } from 'app/models/catalogos/cat-owners.model';


type EntityResponseType = HttpResponse<ICatOwners>;
type EntityArrayResponseType = HttpResponse<ICatOwners[]>;

@Injectable({ providedIn: 'root' })
export class CatOwnersService {
  public resourceUrl = environment.apiUrl + '/api/owners';

  constructor(protected http: HttpClient) {}

  create(catArea: ICatOwners): Observable<EntityResponseType> {
    return this.http.post<ICatOwners>(this.resourceUrl, catArea, { observe: 'response' });
  }

  update(catArea: ICatOwners): Observable<EntityResponseType> {
    return this.http.put<ICatOwners>(this.resourceUrl, catArea, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICatOwners>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any, type?:any): Observable<EntityArrayResponseType> {
    console.log('---> test: ' )
    const options = createRequestOption(req);
    return this.http.get<ICatOwners[]>(`${this.resourceUrl}/${type}`, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
