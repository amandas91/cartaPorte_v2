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
  public resourceUrl = environment.apiUrl + '/api/client';

  constructor(protected http: HttpClient) {}

  create(client: IClients): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(client);
    return this.http
      .post<IClients>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(client: IClients): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(client);
    return this.http
      .put<IClients>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IClients>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IClients[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  queryByExpediente(id: number, req?: any): Observable<EntityArrayResponseType> {
    console.log('get imp expediente: ' + id);
    const options = createRequestOption(req);
    return this.http
      .get<IClients[]>(`${this.resourceUrl}/expediente/${id}`, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(client: IClients): IClients {
    const copy: IClients = Object.assign({}, client, {
      created_at: moment(client.created_at).isValid() ?
      moment(client.created_at).format(DATE_FORMAT) : undefined,
      updated_at: moment(client.updated_at).isValid() ?
      moment(client.updated_at).format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.created_at = res.body.created_at ? moment(res.body.created_at) : undefined;
      res.body.updated_at = res.body.updated_at ? moment(res.body.updated_at) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    
    if (res.body && res.body.length > 0) {
      res.body.forEach((client: IClients) => {
        client.created_at = client.created_at ? moment(client.created_at) : undefined;
        client.updated_at = client.updated_at ? moment(client.updated_at) : undefined;
      });
    }
    return res;
  }
}
