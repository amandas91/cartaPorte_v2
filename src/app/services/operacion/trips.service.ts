import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { environment } from 'app/../environments/environment';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITrips } from 'app/models/core/trips.model';
import { DATE_FORMAT } from 'app/shared/constant/input.constants';


type EntityResponseType = HttpResponse<ITrips>;
type EntityArrayResponseType = HttpResponse<ITrips[]>;

@Injectable({ providedIn: 'root' })
export class TripsService {
  public resourceUrl = environment.apiUrl + '/api/trip';
  public resourceUrlTC = environment.apiUrl + '/api/travel/compositor/updateTrips';
  public resourceUrlTCU = environment.apiUrl + '/api/travel/compositor/getBooking';

  constructor(protected http: HttpClient) {}

  create(trip: ITrips): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(trip);
    return this.http
      .post<ITrips>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(trip: ITrips, trip_id: number): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(trip);
    return this.http
      .put<ITrips>(`${this.resourceUrl}/${trip_id}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }


  
  find(id: number): Observable<EntityResponseType> {
    this.http
      .get<ITrips>(`${this.resourceUrlTCU}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));

    return this.http
      .get<ITrips>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  findTC(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITrips>(`${this.resourceUrlTC}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITrips[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  queryByExpediente(id: number, req?: any): Observable<EntityArrayResponseType> {
    console.log('get imp expediente: ' + id);
    const options = createRequestOption(req);
    return this.http
      .get<ITrips[]>(`${this.resourceUrl}/expediente/${id}`, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(trip: ITrips): ITrips {
    const copy: ITrips = Object.assign({}, trip, {
      starting_date: moment(trip.starting_date).isValid() ?
      moment(trip.starting_date).format(DATE_FORMAT) : undefined,
      ending_date: moment(trip.ending_date).isValid() ?
      moment(trip.ending_date).format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.starting_date = res.body.starting_date ? moment(res.body.starting_date) : undefined;
      res.body.ending_date = res.body.ending_date ? moment(res.body.ending_date) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body && res.body.length > 0) {
      res.body.forEach((trip: ITrips) => {
        trip.starting_date = trip.starting_date ? moment(trip.starting_date) : undefined;
        trip.ending_date = trip.ending_date ? moment(trip.ending_date) : undefined;
      });
    }
    return res;
  }
}
