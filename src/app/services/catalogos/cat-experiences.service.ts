import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'app/../environments/environment';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICatExperiences } from 'app/models/catalogos/cat-experiences.model';



type EntityResponseType = HttpResponse<ICatExperiences>;
type EntityArrayResponseType = HttpResponse<ICatExperiences[]>;

@Injectable({ providedIn: 'root' })
export class CatExperiencesService {
  public resourceUrl = environment.apiUrl + '/api/cat_experiences';
  
  constructor(protected http: HttpClient) {}

  create(scr: ICatExperiences): Observable<EntityResponseType> {
    return this.http.post<ICatExperiences>(this.resourceUrl, scr, { observe: 'response' });
  }

  update(scr: ICatExperiences): Observable<EntityResponseType> {
    return this.http.put<ICatExperiences>(`${this.resourceUrl}/${scr.id}`, scr, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICatExperiences>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICatExperiences[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
