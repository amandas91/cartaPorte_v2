import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'app/../environments/environment';

import { CatIOperador } from 'app/models/catalogos/cat-operador.model';


type EntityResponseType = HttpResponse<CatIOperador>;
type EntityArrayResponseType = HttpResponse<CatIOperador[]>;

@Injectable({ providedIn: 'root' })
export class CatOperadorService {
//   public resourceUrl = environment.apiUrl + '/api/owners';
public resourceUrl = environment.apiUrlCartaPorte + '/operador';

  constructor(protected http: HttpClient) {}


  find(id: string): Observable<EntityResponseType> {
    return this.http.get<CatIOperador>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

}
