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
export class CollectionsService {
  public resourceUrl = environment.apiUrl + '/api/collections';

  constructor(protected http: HttpClient) {}

  create(src: ICollections): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(src);
    return this.http
      .post<ICollections>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  createMissing(src: ICollections): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(src);
    return this.http
      .post<ICollections>(`${environment.apiUrl}/api/send/mail/missing`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  createRequest(src: ICollections): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(src);
    return this.http
      .post<ICollections>(`${environment.apiUrl}/api/collections/request`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  donwload(id): Observable<EntityArrayResponseType> {
    // const options = createRequestOption(req);
    return this.http
      .get<any[]>(`${environment.apiUrl}/api/invoicing/${id}`, { observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  update(src: ICollections): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(src);
    return this.http
      .put<ICollections>(`${this.resourceUrl}/${src.id}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICollections>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  findByRequest(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICollections>(`${this.resourceUrl}/request/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICollections[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  queryByType(req?: any, id?: number, trip_id?: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICollections[]>(`${this.resourceUrl}/request/by_type/${id}/by_trip/${trip_id}`, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  queryByClients(req?: any, id?: number,): Observable<EntityArrayResponseType> {
    console.log('get imp clients: ' + id);
    const options = createRequestOption(req);
    return this.http
      .get<ICollections[]>(`${this.resourceUrl}/clients/${id}`, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  queryByTrip(req?: any, id?: number): Observable<EntityArrayResponseType> {
    console.log('get imp clients: ' + id);
    const options = createRequestOption(req);
    return this.http
      .get<ICollections[]>(`${this.resourceUrl}/by_trip/${id}`, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  queryByCommissions(req?: any, id?: number,): Observable<EntityArrayResponseType> {
    console.log('get imp commissions: ' + id);
    const options = createRequestOption(req);
    return this.http
      .get<ICollections[]>(`${this.resourceUrl}/commissions/${id}`, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(scr: ICollections): ICollections {
    const copy: ICollections = Object.assign({}, scr, {
      checkin: moment(scr.checkin).isValid() ?
      moment(scr.checkin).format(DATE_FORMAT) : undefined,
      created_at: moment(scr.created_at).isValid() ?
      moment(scr.created_at).format(DATE_FORMAT) : undefined,
      due_date: moment(scr.due_date).isValid() ?
      moment(scr.due_date).format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.checkin = res.body.checkin ? moment(res.body.checkin) : undefined;
      res.body.created_at = res.body.created_at ? moment(res.body.created_at) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    
    if (res.body && res.body.length > 0) {
      res.body.forEach((trip: ICollections) => {
        trip.checkin = trip.checkin ? moment(trip.checkin) : undefined;
        trip.created_at = trip.created_at ? moment(trip.created_at) : undefined;
      });
    }
    return res;
  }
}
