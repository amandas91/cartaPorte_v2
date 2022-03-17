import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { environment } from 'app/../environments/environment';
import { createRequestOption } from 'app/shared/util/request-util';
import { DATE_FORMAT } from 'app/shared/constant/input.constants';
import { ICommissions } from '../../models/core/commissions.model';


type EntityResponseType = HttpResponse<ICommissions>;
type EntityArrayResponseType = HttpResponse<ICommissions[]>;

@Injectable({ providedIn: 'root' })
export class CommissionsService {
  public resourceUrl = environment.apiUrl + '/api/commission';

  constructor(protected http: HttpClient) {}

  create(trip: ICommissions): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(trip);
    return this.http
      .post<ICommissions>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }
  
  seand(src: any): Observable<EntityResponseType> {
    // const copy = this.convertDateFromClient(src);
    return this.http
      .post<ICommissions>(`${this.resourceUrl}/request`, src, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  claim(src: any): Observable<EntityResponseType> {
    // const copy = this.convertDateFromClient(src);
    return this.http
      .post<ICommissions>(`${this.resourceUrl}/claim`, src, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(trip: ICommissions, trip_id: number): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(trip);
    return this.http
      .put<ICommissions>(`${this.resourceUrl}/${trip_id}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }
  
  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICommissions>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICommissions[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  queryByPaid(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICommissions[]>(`${this.resourceUrl}_paid`, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  queryByTrip(req?: any, id?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICommissions[]>(`${this.resourceUrl}/${id}`, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  queryByExpediente(id: number, req?: any): Observable<EntityArrayResponseType> {
    console.log('get imp expediente: ' + id);
    const options = createRequestOption(req);
    return this.http
      .get<ICommissions[]>(`${this.resourceUrl}/expediente/${id}`, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(trip: ICommissions): ICommissions {
    const copy: ICommissions = Object.assign({}, trip, {
      created_at: moment(trip.created_at).isValid() ?
      moment(trip.created_at).format(DATE_FORMAT) : undefined,
      updated_at: moment(trip.updated_at).isValid() ?
      moment(trip.updated_at).format(DATE_FORMAT) : undefined,
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
      res.body.forEach((trip: ICommissions) => {
        trip.created_at = trip.created_at ? moment(trip.created_at) : undefined;
        trip.updated_at = trip.updated_at ? moment(trip.updated_at) : undefined;
      });
    }
    return res;
  }
}
