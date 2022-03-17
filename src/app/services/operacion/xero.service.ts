import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { environment } from 'app/../environments/environment';
import { createRequestOption } from 'app/shared/util/request-util';
import { DATE_FORMAT } from 'app/shared/constant/input.constants';
import { ICollections } from 'app/models/core/collections.model';


type EntityResponseType = HttpResponse<ICollections>;
type EntityArrayResponseType = HttpResponse<ICollections[]>;

@Injectable({ providedIn: 'root' })
export class XeroService {
  public resourceUrl = environment.apiUrl + '/api/xero';

  constructor(protected http: HttpClient) {}

  create(src: any): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(src);
    return this.http
      .post<ICollections>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  createRequest(src: ICollections): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(src);
    return this.http
      .post<ICollections>(`${environment.apiUrl}/api/request/collections`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  donwload(id): Observable<EntityArrayResponseType> {
    // const options = createRequestOption(req);
    return this.http
      .get<any[]>(`${environment.apiUrl}/api/invoicing/${id}`, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  update(scr: any): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(scr);
    return this.http
      .put<ICollections>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICollections>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  queryByInvoice(): Observable<EntityArrayResponseType> {
    // const options = createRequestOption(req);
    return this.http
      .get<ICollections[]>(`${this.resourceUrl}/invoice`, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(scr: ICollections): ICollections {
    const copy: ICollections = Object.assign({}, scr, {
      starting_date: moment(scr.starting_date).isValid() ?
      moment(scr.starting_date).format(DATE_FORMAT) : undefined,
      created_at: moment(scr.created_at).isValid() ?
      moment(scr.created_at).format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.starting_date = res.body.starting_date ? moment(res.body.starting_date) : undefined;
      res.body.created_at = res.body.created_at ? moment(res.body.created_at) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body && res.body.length > 0) {
      res.body.forEach((trip: ICollections) => {
        trip.starting_date = trip.starting_date ? moment(trip.starting_date) : undefined;
        trip.created_at = trip.created_at ? moment(trip.created_at) : undefined;
      });
    }
    return res;
  }
}
