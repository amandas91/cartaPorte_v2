import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'app/../environments/environment';
import { createRequestOption } from 'app/shared/util/request-util';
import { env } from 'process';
import { IEamFlota } from 'app/models/core/eam-flota.model';


type EntityResponseType = HttpResponse<IEamFlota>;
type EntityArrayResponseType = HttpResponse<IEamFlota[]>;

@Injectable({ providedIn: 'root' })
export class EamFlotaService {

public resourceUrl = environment.apiUrlCartaPorte + '/eamFlota';

constructor(protected http: HttpClient) {}


    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IEamFlota>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }


    query(req?: any, type?:any): Observable<EntityArrayResponseType> {
    //console.log('---> test: ' )
    const options = createRequestOption(req);

    return this.http.get<IEamFlota[]>(`${this.resourceUrl}`, {  observe: 'response' });
    }

}
