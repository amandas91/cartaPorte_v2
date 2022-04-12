import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { environment } from 'app/../environments/environment';
import { createRequestOption } from 'app/shared/util/request-util';
import { DATE_FORMAT } from 'app/shared/constant/input.constants';
import { IGenerarCata } from 'app/models/core/generar-carta.model';


type EntityResponseType = HttpResponse<IGenerarCata>;
type EntityArrayResponseType = HttpResponse<IGenerarCata[]>;

@Injectable({ providedIn: 'root' })
export class GenerarCartaService {
  public resourceUrl = environment.apiUrlCartaPorte + '/pac';

  constructor(protected http: HttpClient) { }

  create(generarCarta: any, timbrado:boolean): Observable<EntityResponseType> {
    //const copy = this.convertDateFromClient(generarCarta);
    //console.log("GENERAR CARTA");
    //console.log(copy);
    
    return this.http
      .post<any>(`${this.resourceUrl}/cartaporte?timbrar=${timbrado}`, generarCarta, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(serie:string, ): Observable<EntityResponseType> {
    return this.http
      .get<IGenerarCata>(`${this.resourceUrl}?serie=CPDSD&folio=51345`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IGenerarCata[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }



  protected convertDateFromClient(hotel: IGenerarCata): IGenerarCata {
    const copy: IGenerarCata = Object.assign({}, hotel, {
    //   checkin: moment(hotel.checkin).isValid() ?
    //     moment(hotel.checkin).format(DATE_FORMAT) : undefined,
    //   checkout: moment(hotel.checkout).isValid() ?
    //     moment(hotel.checkout).format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
    //   res.body.checkin = res.body.checkin ? moment(res.body.checkin) : undefined;
    //   res.body.checkout = res.body.checkout ? moment(res.body.checkout) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    
    if (res.body && res.body.length > 0) {
      res.body.forEach((cruise: IGenerarCata) => {
        // cruise.checkin = cruise.checkin ? moment(cruise.checkin) : undefined;
        // cruise.checkout = cruise.checkout ? moment(cruise.checkout) : undefined;
      });
    }
    return res;
  }
}

