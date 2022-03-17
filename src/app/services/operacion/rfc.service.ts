import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { environment } from 'app/../environments/environment';
import { createRequestOption } from 'app/shared/util/request-util';
import { DATE_FORMAT } from 'app/shared/constant/input.constants';
import { IRfc } from 'app/models/core/rfc.model';


type EntityResponseType = HttpResponse<IRfc>;
type EntityArrayResponseType = HttpResponse<IRfc[]>;

@Injectable({ providedIn: 'root' })
export class RfcService {
  public resourceUrl = environment.apiUrl + '/api/rfc';

  constructor(protected http: HttpClient) {}

  create(src: IRfc): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(src);
    return this.http
      .post<IRfc>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(src: IRfc): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(src);
    return this.http
      .put<IRfc>(`${this.resourceUrl}/${copy.id}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }
  
  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IRfc>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IRfc[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  queryByExpediente(id: number, req?: any): Observable<EntityArrayResponseType> {
    console.log('get imp expediente: ' + id);
    const options = createRequestOption(req);
    return this.http
      .get<IRfc[]>(`${this.resourceUrl}/expediente/${id}`, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(src: IRfc): IRfc {
    const copy: IRfc = Object.assign({}, src, {
      starting_date: moment(src.updated_at).isValid() ?
      moment(src.updated_at).format(DATE_FORMAT) : undefined,
      // ending_date: moment(src.ending_date).isValid() ?
      // moment(src.ending_date).format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.updated_at = res.body.updated_at ? moment(res.body.updated_at) : undefined;
      // res.body.ending_date = res.body.ending_date ? moment(res.body.ending_date) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body && res.body.length > 0) {
      res.body.forEach((src: IRfc) => {
        src.updated_at = src.updated_at ? moment(src.updated_at) : undefined;
        // src.ending_date = src.ending_date ? moment(src.ending_date) : undefined;
      });
    }
    return res;
  }
}
