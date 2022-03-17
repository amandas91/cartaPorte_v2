import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { environment } from 'app/../environments/environment';
import { createRequestOption } from 'app/shared/util/request-util';
import { IFlight } from 'app/models/core/flight.model';
import { DATE_FORMAT } from 'app/shared/constant/input.constants';


type EntityResponseType = HttpResponse<IFlight>;
type EntityArrayResponseType = HttpResponse<IFlight[]>;

@Injectable({ providedIn: 'root' })
export class FlightService {
  public resourceUrl = environment.apiUrl + '/api/flight';

  constructor(protected http: HttpClient) { }

  create(hotel: IFlight): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(hotel);
    return this.http
      .post<IFlight>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(hotel: IFlight): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(hotel);
    return this.http
      .put<IFlight>(`${this.resourceUrl}/${copy.id}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IFlight>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IFlight[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  queryByflight(id: number, req?: any): Observable<EntityArrayResponseType> {
    console.log('queryByflight: ' + id);
    const options = createRequestOption(req);
    return this.http
      .get<IFlight[]>(`${this.resourceUrl}/all/${id}`, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(hotel: IFlight): IFlight {
    const copy: IFlight = Object.assign({}, hotel, {
      checkin: moment(hotel.checkin).isValid() ?
        moment(hotel.checkin).format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.checkin = res.body.checkin ? moment(res.body.checkin) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    
    if (res.body && res.body.length > 0) {
      res.body.forEach((hotel: IFlight) => {
        hotel.checkin = hotel.checkin ? moment(hotel.checkin) : undefined;
      });
    }
    return res;
  }
}

