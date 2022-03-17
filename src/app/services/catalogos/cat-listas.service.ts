import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'app/../environments/environment';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICatLista } from 'app/models/catalogos/cat-lista.model';

type EntityResponseType = HttpResponse<ICatLista>;
type EntityArrayResponseType = HttpResponse<ICatLista[]>;

@Injectable({ providedIn: 'root' })
export class ListaService {
    public resourceUrl = environment.apiUrlCartaPorte + '/lista?tipoLista=';

  constructor(protected http: HttpClient) {}


  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICatLista>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any, type?: string): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICatLista[]>(`${this.resourceUrl}${type}`, { params: options, observe: 'response' });
  }

}
