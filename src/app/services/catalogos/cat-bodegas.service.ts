import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'app/../environments/environment';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICatLista } from 'app/models/catalogos/cat-lista.model';
import Swal from 'sweetalert2';

type EntityResponseType = HttpResponse<any>;
type EntityArrayResponseType = HttpResponse<any[]>;

@Injectable({ providedIn: 'root' })
export class BodegasService {
    public resourceUrl = environment.apiUrlCartaPorte + '/bodegaCedis';
    
  constructor(protected http: HttpClient) {}


  find(id: number): Observable<EntityResponseType> {
    return this.http.get<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findByNombreDireccion(nombre: string, direccion:string): Observable<EntityArrayResponseType> {
    return this.http.get<any[]>(`${this.resourceUrl}?nombre=${nombre}&direccion=`, { observe: 'response' });
  }

  query(req?: any, type?: string): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    //return this.http.get<any[]>(`${this.resourceUrl}`, { params: options, observe: 'response' });
    return this.http.get<any[]>(`${this.resourceUrl}?nombre=EJEMPLONOBUSCAR&direccion=`, { observe: 'response' });
  }

}
