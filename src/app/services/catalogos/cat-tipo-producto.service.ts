import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'app/../environments/environment';
import { createRequestOption } from 'app/shared/util/request-util';
import { env } from 'process';

import { ICatTipoProducto } from 'app/models/catalogos/cat-tipo-producto.model';


type EntityResponseType = HttpResponse<ICatTipoProducto>;
type EntityArrayResponseType = HttpResponse<ICatTipoProducto[]>;

@Injectable({ providedIn: 'root' })
export class CatTipoProductoService {
    public resourceUrl = environment.apiUrlCartaPorte;

  constructor(protected http: HttpClient) {}


  find(id: string): Observable<EntityArrayResponseType> {
    return this.http.get<ICatTipoProducto[]>(`${this.resourceUrl}/producto?tipoProducto=${id}`, { observe: 'response' });
  }

  query(req?: any, type?:any): Observable<EntityArrayResponseType> {
    //console.log('---> test: ' )
    const options = createRequestOption(req);

    return this.http.get<ICatTipoProducto[]>(`${this.resourceUrl}/tipoProducto`, {  observe: 'response' });
  }

}
