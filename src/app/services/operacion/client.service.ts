import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { environment } from 'app/../environments/environment';
import { createRequestOption } from 'app/shared/util/request-util';
import { DATE_FORMAT } from 'app/shared/constant/input.constants';
import { IClients } from 'app/models/core/clients.model';


type EntityResponseType = HttpResponse<IClients>;
type EntityArrayResponseType = HttpResponse<IClients[]>;

@Injectable({ providedIn: 'root' })
export class ClientsService {
  public resourceUrl = environment.apiUrlCartaPorte  + '/auth/signup';
  public resourceUrlUsuers = environment.apiUrlCartaPorte  + '/usuarios';
  public resourceUrlUpdate = environment.apiUrlCartaPorte  + '/auth/signupdate';

  constructor(protected http: HttpClient) {}

  create(client: IClients): Observable<EntityResponseType> {
      
      return this.http
      .post<IClients>(`${this.resourceUrl}`, client, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
      
  }


  update(client: IClients): Observable<EntityResponseType> {
      
    return this.http
    .post<IClients>(`${this.resourceUrlUpdate}`, client, { observe: 'response' })
    .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    
}


  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IClients[]>(this.resourceUrlUsuers, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }


  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrlUsuers}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(client: IClients): IClients {
    const copy: IClients = Object.assign({}, client, {
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    
    if (res.body && res.body.length > 0) {
      res.body.forEach((client: IClients) => {
      });
    }
    return res;
  }
}
