import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { environment } from 'app/../environments/environment';
import { createRequestOption } from 'app/shared/util/request-util';
import { DATE_FORMAT } from 'app/shared/constant/input.constants';
import { IPayments } from 'app/models/core/payments.model';


type EntityResponseType = HttpResponse<IPayments>;
type EntityArrayResponseType = HttpResponse<IPayments[]>;

@Injectable({ providedIn: 'root' })
export class PaymentsService {
  public resourceUrl = environment.apiUrl + '/api/payment';
  // public resourceUrlDMC = environment.apiUrl + '/api/dmc/payments';
  constructor(protected http: HttpClient) {}

  create(src: IPayments): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(src);
    return this.http
      .post<IPayments>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(src: IPayments): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(src);
    return this.http
      .put<IPayments>(`${this.resourceUrl}/${src.id}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPayments>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPayments[]>(`${this.resourceUrl}`, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  queryByTrip(req?: any, trip_id?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPayments[]>(`${this.resourceUrl}/by_trip/${trip_id}`, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  findSumary(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPayments>(`${this.resourceUrl}/summary/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  // queryDMC(req?: any): Observable<EntityArrayResponseType> {
  //   const options = createRequestOption(req);
  //   return this.http
  //     .get<IPayments[]>(this.resourceUrlDMC, { params: options, observe: 'response' })
  //     .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  // }

  queryByType(req?: any, type?:any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPayments[]>(`${this.resourceUrl}/trip/${type.trip_id}/status/${type.origen}`, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  queryByClients(req?: any, id?: number,): Observable<EntityArrayResponseType> {
    console.log('get imp clients: ' + id);
    const options = createRequestOption(req);
    return this.http
      .get<IPayments[]>(`${this.resourceUrl}/clients/${id}`, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  queryByCommissions(req?: any, id?: number,): Observable<EntityArrayResponseType> {
    console.log('get imp commissions: ' + id);
    const options = createRequestOption(req);
    return this.http
      .get<IPayments[]>(`${this.resourceUrl}/commissions/${id}`, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(scr: IPayments): IPayments {
    const copy: IPayments = Object.assign({}, scr, {
      // checkin: moment(scr.checkin).isValid() ?
      // moment(scr.checkin).format(DATE_FORMAT) : undefined,
      // created_at: moment(scr.created_at).isValid() ?
      // moment(scr.created_at).format(DATE_FORMAT) : undefined,
      request_date: moment(scr.request_date).isValid() ?
      moment(scr.request_date).format(DATE_FORMAT) : undefined,
      starting_date: moment(scr.starting_date).isValid() ?
      moment(scr.starting_date).format(DATE_FORMAT) : undefined,
      ending_date: moment(scr.ending_date).isValid() ?
      moment(scr.ending_date).format(DATE_FORMAT) : undefined,
      due_date: moment(scr.due_date).isValid() ?
      moment(scr.due_date).format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      // res.body.checkin = res.body.checkin ? moment(res.body.checkin) : undefined;
      // res.body.created_at = res.body.created_at ? moment(res.body.created_at) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body && res.body.length > 0) {
      res.body.forEach((trip: IPayments) => {
        // trip.checkin = trip.checkin ? moment(trip.checkin) : undefined;
        // trip.created_at = trip.created_at ? moment(trip.created_at) : undefined;
      });
    }
    return res;
  }
}
