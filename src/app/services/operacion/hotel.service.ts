import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { environment } from 'app/../environments/environment';
import { createRequestOption } from 'app/shared/util/request-util';
import { IHotel } from 'app/models/core/hotel.model';
import { DATE_FORMAT } from 'app/shared/constant/input.constants';


type EntityResponseType = HttpResponse<IHotel>;
type EntityArrayResponseType = HttpResponse<IHotel[]>;

@Injectable({ providedIn: 'root' })
export class HotelService {
  public resourceUrl = environment.apiUrl + '/api/hotel';

  constructor(protected http: HttpClient) {}

  create(hotel: IHotel): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(hotel);
    return this.http
      .post<IHotel>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(hotel: IHotel): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(hotel);
    return this.http
      .put<IHotel>(`${this.resourceUrl}/${copy.id}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IHotel>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IHotel[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  queryByflight(id: number, req?: any): Observable<EntityArrayResponseType> {
    console.log('get imp expediente: ' + id);
    const options = createRequestOption(req);
    return this.http
      .get<IHotel[]>(`${this.resourceUrl}/all/${id}`, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(hotel: IHotel): IHotel {
    const copy: IHotel = Object.assign({}, hotel, {
      checkin: moment(hotel.checkin).isValid() ?
      moment(hotel.checkin).format(DATE_FORMAT) : undefined,
      checkout: moment(hotel.checkout).isValid() ?
      moment(hotel.checkout).format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.checkin = res.body.checkin ? moment(res.body.checkin) : undefined;
      res.body.checkout = res.body.checkout ? moment(res.body.checkout) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    
    if (res.body && res.body.length > 0) {
      res.body.forEach((hotel: IHotel) => {
        hotel.checkin = hotel.checkin ? moment(hotel.checkin) : undefined;
        hotel.checkout = hotel.checkout ? moment(hotel.checkout) : undefined;
      });
    }
    return res;
  }
}

